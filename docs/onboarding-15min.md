# 15 分鐘上手：留德資訊站

## 前 3 分鐘：這是什麼

留德資訊站 v4.0：Vite + React + TS + Tailwind + Supabase 的 SPA，
部署於 GitHub Pages。三大功能：
1. 語校評價（讀公開、寫需登入）
2. 生活佈告欄（3 分類：出租/求租/二手，可附照片）
3. 常見問答（靜態）

架構鐵律：**DB RLS 才是真權限層，前端 AuthGate 只是 UX**。

## 3–5 分鐘：分支結構

```
main                          Phase A baseline（已部署）
  └── phase-a5-prep           Portal + SVG + FAQ 拆頁
      └── phase-a75-blocked-period    Mock Mode + a11y
          └── phase-a100-wiring       元件接線 + 錯誤翻譯
              └── phase-a125-final    Print + Docs
```

當前所有分支尚未合 main，等 DB 遷移與 OAuth 修復後一起驗收。

## 5–8 分鐘：本地跑起來

```powershell
cd C:\Projects\study-in-germany
npm install
Copy-Item .env.example .env.local

# 若 DB / OAuth 未就緒，用 mock mode：
Add-Content -Path .env.local -Value "VITE_MOCK_MODE=1"

npm run dev
# http://localhost:5173/（base './'，dev server 無子路徑）
```

左下角 `dev` 按鈕展開看：mock 狀態、主題、網路、build 版本。

## 8–12 分鐘：關鍵檔案

**永遠不動**（動了要重跑整輪 governance）：
- `src/lib/supabase.ts` — client 單例，PKCE + detectSessionInUrl
- `src/lib/useAuth.ts` — Google OAuth hook，redirectTo 修正
- `src/lib/storage.ts` — 照片壓縮 + upload + delete
- `src/lib/types.ts` — 契約層（Listing / SchoolReview / RatingSchema）
- `supabase/*.sql` — schema + RLS

**產品邏輯集中**：
- `src/pages/Board.tsx` — 佈告欄，3-way filter
- `src/pages/MyPosts.tsx` — 個人管理
- `src/components/SchoolDetail.tsx` — 語校詳情 + 評價
- `src/components/BoardForm.tsx` — 3 類型分開的發文表單
- `src/components/PhotoUploader.tsx` — 6 張上限、client canvas 壓縮

**設計 token 集中**：
- `src/index.css` — CSS vars（light + dark）+ component tokens + print stylesheet；Tailwind v4 @theme inline

## 12–15 分鐘：常見任務對應檔

| 想做 | 動哪 |
|---|---|
| 加語校 | `src/data/schools.json` + 可能加 `src/assets/cities/<新城>.tsx` 並註冊於 `cities/index.tsx` |
| 改主色 | `src/index.css` 的 `--brand-burgundy` / `--brand-gold` |
| 加評分維度 | `src/lib/types.ts` 的 `RatingDimension` + `ReviewForm.tsx` StarPicker 一組 |
| 加佈告欄類型 | ⚠️ 這是 schema 變更，動 `supabase/schema.sql` CHECK + `types.ts` `ListingType` + `LISTING_TYPE_LABEL`；需求方確認 |
| 換 favicon | `public/favicon.svg` |
| 加公告 | `src/data/announcements.json` prepend |
| 加 FAQ | `src/data/faq.json` |
| 加錯誤翻譯 | `src/lib/errorMessages.ts` 的 `CODE_MAP` 或 `MESSAGE_PATTERNS` |

## 出問題找誰
- Build 錯誤 → `work/error.log`
- 設計問題 → PAT 索引 `docs/pat-index.md`
- DB 遷移 → `supabase/schema.sql` + `supabase/migrate_v2_to_v4.sql`
- OAuth `Unable to exchange external code` → Supabase Google Client Secret 待修（見 `docs/local-dev.md` 疑難排解）
