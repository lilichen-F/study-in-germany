-- ============================================
-- study-in-germany · schema v4.0
-- 執行方式：Supabase Dashboard → SQL Editor → 貼上全文 → Run
-- 先決條件：Authentication → Providers 啟用 Google
-- 本案 pre-deployment，可直接執行 v4.0 全量 SQL。
-- 若已部署 v2，請先 DROP 舊表（見 migrate_v2_to_v4.sql）。
-- ============================================

-- 1. profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_public_read" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "profiles_own_update" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 2. school_reviews (v4: JSONB stars)
CREATE TABLE public.school_reviews (
  id BIGSERIAL PRIMARY KEY,
  school_id TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stars JSONB NOT NULL,
  comment_text TEXT NOT NULL CHECK (char_length(comment_text) BETWEEN 5 AND 1000),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT stars_has_overall CHECK (
    stars ? 'overall' AND (stars->>'overall')::int BETWEEN 1 AND 5
  )
);

CREATE INDEX school_reviews_school_id_idx ON public.school_reviews(school_id);
CREATE INDEX school_reviews_user_id_idx ON public.school_reviews(user_id);

ALTER TABLE public.school_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "reviews_public_read" ON public.school_reviews FOR SELECT USING (true);
CREATE POLICY "reviews_auth_insert" ON public.school_reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "reviews_own_delete" ON public.school_reviews FOR DELETE USING (auth.uid() = user_id);

-- 3. listings (v4: 3-way type + photo_urls)
CREATE TABLE public.listings (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('secondhand','rental_offer','rental_seek')),
  region TEXT NOT NULL,
  title TEXT NOT NULL CHECK (char_length(title) BETWEEN 2 AND 100),
  description TEXT NOT NULL CHECK (char_length(description) BETWEEN 5 AND 2000),
  price TEXT,
  contact_info TEXT NOT NULL,
  photo_urls TEXT[] NOT NULL DEFAULT '{}'
    CHECK (array_length(photo_urls,1) IS NULL OR array_length(photo_urls,1) <= 6),
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '60 days'),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX listings_type_idx ON public.listings(type);
CREATE INDEX listings_created_at_idx ON public.listings(created_at DESC);

ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "listings_public_read" ON public.listings FOR SELECT USING (expires_at > NOW());
CREATE POLICY "listings_auth_insert" ON public.listings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "listings_own_update" ON public.listings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "listings_own_delete" ON public.listings FOR DELETE USING (auth.uid() = user_id);

-- 4. Storage bucket + RLS (照片上傳)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('listings','listings', true, 4194304,
        ARRAY['image/jpeg','image/png','image/webp'])
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "listings_photo_auth_upload" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'listings'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "listings_photo_own_delete" ON storage.objects
  FOR DELETE TO authenticated
  USING (
    bucket_id = 'listings'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "listings_photo_public_read" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'listings');

-- ==========================================
-- Phase J-2 · user_submissions 表
-- 使用者主動提交的建議、新學校、新推薦、通用回饋
-- Lily 於 Supabase Dashboard 手動審核（無 client-side admin UI）
-- ==========================================

CREATE TABLE IF NOT EXISTS public.user_submissions (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  submission_type TEXT NOT NULL
    CHECK (submission_type IN (
      'school_edit',
      'new_school',
      'new_recommendation',
      'general_feedback'
    )),
  target_id TEXT,
  title TEXT NOT NULL CHECK (char_length(title) >= 2 AND char_length(title) <= 100),
  content TEXT NOT NULL CHECK (char_length(content) >= 5 AND char_length(content) <= 2000),
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'rejected', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  reviewer_note TEXT
);

CREATE INDEX IF NOT EXISTS user_submissions_created_at_idx
  ON public.user_submissions (created_at DESC);
CREATE INDEX IF NOT EXISTS user_submissions_status_type_idx
  ON public.user_submissions (status, submission_type);

ALTER TABLE public.user_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_submissions_anon_insert" ON public.user_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "user_submissions_public_read_visible" ON public.user_submissions
  FOR SELECT USING (status IN ('pending', 'approved'));

CREATE POLICY "user_submissions_author_delete_pending" ON public.user_submissions
  FOR DELETE USING (auth.uid() = user_id AND status = 'pending');
