-- ============================================
-- 留德資訊 MVP v2 — Supabase schema + RLS
-- 在 Supabase Dashboard → SQL Editor 執行一次
-- ============================================

-- ============================================
-- 0. 啟用 Google OAuth 後，auth.users 由 Supabase 內建管理，不需自己建表
-- ============================================

-- 1. 使用者公開個人資料（避免直接暴露 auth.users 的 email 等敏感欄位）
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 使用者第一次用 Google 登入時，自動建立 profile
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

-- ============================================
-- 2. 語言學校評價表
-- ============================================
CREATE TABLE public.school_reviews (
  id BIGSERIAL PRIMARY KEY,
  school_id TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stars_teaching INT CHECK (stars_teaching BETWEEN 1 AND 5),
  stars_environment INT CHECK (stars_environment BETWEEN 1 AND 5),
  comment_text TEXT NOT NULL CHECK (char_length(comment_text) BETWEEN 5 AND 1000),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.school_reviews ENABLE ROW LEVEL SECURITY;

-- 任何人（含未登入訪客）可讀
CREATE POLICY "reviews_public_read" ON public.school_reviews
  FOR SELECT USING (true);

-- 僅登入者可新增，且只能以自己的 user_id 新增
CREATE POLICY "reviews_auth_insert" ON public.school_reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 僅本人可刪除自己的評價（GDPR 可攜權/刪除權需求）
CREATE POLICY "reviews_own_delete" ON public.school_reviews
  FOR DELETE USING (auth.uid() = user_id);

-- 明確禁止 UPDATE（避免評價被事後竄改失去公信力；要改就刪除重發）
-- 不建立 UPDATE policy = 預設拒絕

-- ============================================
-- 3. 生活佈告欄
-- ============================================
CREATE TABLE public.listings (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('secondhand', 'accommodation')),
  region TEXT NOT NULL,
  title TEXT NOT NULL CHECK (char_length(title) BETWEEN 2 AND 100),
  description TEXT NOT NULL CHECK (char_length(description) BETWEEN 5 AND 2000),
  price TEXT,
  contact_info TEXT NOT NULL,
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '60 days'), -- GDPR：資料最小化，自動過期
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "listings_public_read" ON public.listings
  FOR SELECT USING (expires_at > NOW());  -- 過期貼文自動對外隱藏

CREATE POLICY "listings_auth_insert" ON public.listings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "listings_own_update" ON public.listings
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "listings_own_delete" ON public.listings
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- 4. profiles 的 RLS
-- ============================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_public_read" ON public.profiles
  FOR SELECT USING (true);  -- display_name/avatar 可公開顯示於評價旁

CREATE POLICY "profiles_own_update" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);
