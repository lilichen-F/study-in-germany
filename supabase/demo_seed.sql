-- ============================================
-- Demo seed data · 執行前警告
-- ============================================
-- 用途：讓 production 站看起來不空曠，方便截圖 / demo。
-- 執行時機：DB 遷移完、S3/S4 你自己實測完之後，再灌 demo 資料。
-- 移除方式：本檔含末尾清除 SQL，複製最後區塊執行即可。
--
-- ⚠️ 執行前決策：
-- (A) 用你自己的 uid 灌 → 資料為你所有，能在 /my-posts 管理
-- (B) 用假 uid 灌 → 需先關閉 listings 的 FK constraint（不建議）
-- 本檔採 (A) 方案。
-- ============================================

DO $$
DECLARE
  demo_user_id UUID;
BEGIN
  -- 抓 profiles 表第一個 user 當種子擁有者
  SELECT id INTO demo_user_id FROM public.profiles ORDER BY created_at LIMIT 1;

  IF demo_user_id IS NULL THEN
    RAISE EXCEPTION '找不到任何 profile，請先 Google 登入至少一次';
  END IF;

  RAISE NOTICE 'Seeding with user_id: %', demo_user_id;

  -- 語校評價 × 3
  INSERT INTO public.school_reviews (school_id, user_id, stars, comment_text) VALUES
    ('goethe-berlin', demo_user_id,
     '{"overall":4,"teaching":5,"environment":3}'::jsonb,
     'A2 課程老師很棒，教材偏舊但夠用。校舍在市中心交通方便，但空間偏小，午休沒地方吃飯。整體推薦。'),
    ('goethe-berlin', demo_user_id,
     '{"overall":3,"teaching":3,"environment":4}'::jsonb,
     '課程結構還算完整，但班上人數偏多（15+ 人），每個人發言機會不多。建議選小班制。'),
    ('did-frankfurt', demo_user_id,
     '{"overall":5,"teaching":5,"environment":5}'::jsonb,
     '貴但值得。B2 課程準備 TestDaF 完全對點，老師都是母語者且有教學執照。如果預算允許強烈推薦。');

  -- 佈告欄貼文 × 3（三種類型都有）
  INSERT INTO public.listings (user_id, type, region, title, description, price, contact_info, photo_urls) VALUES
    (demo_user_id, 'rental_offer', 'Berlin-Neukölln',
     'WG-Zimmer 出租，可短租 3 個月',
     '4 人 WG，房間 12 平米附家具。近 U8 Boddinstraße，走路 5 分鐘到地鐵。押金 2 個月，可協商。無寵物、不吸菸。',
     '€480 warm', 'Telegram @demo_offer', '{}'),
    (demo_user_id, 'rental_seek', 'München',
     '9 月起找單間套房，預算 €700 內',
     '女性台灣學生在讀 Sprachcaffe München。作息正常無寵物。希望簽約至少 6 個月，短期不考慮。',
     '€700 max', 'wechat: demo_seeker', '{}'),
    (demo_user_id, 'secondhand', 'Frankfurt',
     'IKEA MALM 書桌 + 檯燈，€25 一起',
     '搬家出清。書桌白色 140x65 cm，狀況良好，僅使用 8 個月。檯燈可調光。近 Hauptbahnhof 面交。',
     '€25', 'demo@example.com', '{}');

  RAISE NOTICE '✅ Demo seed 完成：3 reviews + 3 listings';
END $$;

-- 驗證
SELECT 'seeded_reviews' AS what, COUNT(*)::text AS value FROM public.school_reviews
UNION ALL
SELECT 'seeded_listings', COUNT(*)::text FROM public.listings;

-- ============================================
-- 清除 demo（測完後執行）
-- ============================================
-- DELETE FROM public.school_reviews WHERE comment_text LIKE '%整體推薦%'
--   OR comment_text LIKE '%建議選小班制%'
--   OR comment_text LIKE '%強烈推薦%';
-- DELETE FROM public.listings WHERE contact_info LIKE 'Telegram @demo_%'
--   OR contact_info LIKE 'wechat: demo_%'
--   OR contact_info = 'demo@example.com';
