-- ============================================
-- v2 → v4.0 遷移（既有 DB 專用）
-- 事實：v2 schema 已於 2026-07-07 部署至本專案（httksnqnxaeacmockphr），
--       三表皆 0 筆資料 → 直接 DROP 重建，無資料搬移需求。
-- 執行順序：本檔全文 Run → 再 Run schema.sql 全文。
-- ============================================

DROP TABLE IF EXISTS public.listings;
DROP TABLE IF EXISTS public.school_reviews;
DROP TABLE IF EXISTS public.profiles;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Storage policies 若曾建立過（本案 v2 未建，防重跑用）
DROP POLICY IF EXISTS "listings_photo_auth_upload" ON storage.objects;
DROP POLICY IF EXISTS "listings_photo_own_delete" ON storage.objects;
DROP POLICY IF EXISTS "listings_photo_public_read" ON storage.objects;
