# 留德資訊 MVP（v2）

德國留學資訊平台：語言學校評價、二手交易與找房佈告欄。
v2 在純靜態原型上加入 **Google OAuth 登入** 與 **資料庫層級權限控制（Supabase RLS）**。

## 技術棧

Vite + React 19 + TypeScript + Tailwind CSS v4 + react-router-dom（HashRouter）+ Supabase（Auth + Postgres）

## 文件

- [15 分鐘上手](docs/onboarding-15min.md)
- [本地開發指南](docs/local-dev.md)
- [PAT 快速索引](docs/pat-index.md)
- [Meta_Dev_Knowledge](Meta_Dev_Knowledge.md) — 完整 PAT 明細
- [Meta_User_Feedback](Meta_User_Feedback.md) — 需求方回饋累積

## 權限模型

| 操作 | 訪客 | 登入者 |
|------|------|--------|
| 瀏覽評價 / 貼文 | ✅ | ✅ |
| 新增評價 / 貼文 | ❌ | ✅（只能以自己的 user_id） |
| 修改評價 | ❌ | ❌（DB 層禁止，維持公信力） |
| 修改 / 刪除貼文 | ❌ | ✅（僅限本人） |
| 刪除評價 | ❌ | ✅（僅限本人） |

所有權限由 Postgres **Row Level Security** 強制執行（見 `supabase/schema.sql`），
前端的 `AuthGate` 只是 UX 引導 — 繞過前端直接打 API 一樣會被資料庫拒絕。

## DS v4.0 追加 (Phase A)

| # | 追加項 | 實作 |
|---|---|---|
| 7 | 主題雙軌 | ThemeProvider · system pref · localStorage 覆寫 |
| 8 | German palette | src/index.css CSS vars（Tailwind v4 @theme inline） |
| 9 | 6 維評分基礎 | JSONB stars column · Phase A 開放 overall/teaching/environment |
| 10 | listings 3 類 | secondhand / rental_offer / rental_seek |
| 11 | 照片上傳 | Storage bucket + RLS + client 壓縮（1600px/JPEG q0.85/6 張上限） |

## 初次設定

### 1. Supabase

1. 建立 Supabase 專案，到 **SQL Editor** 執行 `supabase/schema.sql`（一次即可）。
   **既有 v2 DB（本專案現況）**：先執行 `supabase/migrate_v2_to_v4.sql`（DROP v2 空表），再執行 `schema.sql`。
   - Storage → 檢查 bucket `listings` 已建（schema.sql 執行完應自動建）
   - Storage → Policies 確認四條 policy 已生效（若 SQL 建立遇權限錯誤，改用 Dashboard Policies UI）
2. **Authentication → Providers → Google**：啟用並填入 Google Cloud Console 的
   OAuth Client ID / Secret（Google 端的 Authorized redirect URI 填
   `https://<project-ref>.supabase.co/auth/v1/callback`）。
3. **Authentication → URL Configuration**：
   - Site URL：`https://<你的帳號>.github.io/study-in-germany/`
   - Redirect URLs 加入上述網址與 `http://localhost:5173`（本地開發用）。

### 2. 本地開發

```bash
cp .env.example .env.local   # 填入 Supabase URL 與 anon key
npm install
npm run dev
```

### 3. GitHub Pages 部署

1. Repo **Settings → Secrets and variables → Actions** 新增兩個 Secret：
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
2. Repo **Settings → Pages → Source** 選 **GitHub Actions**。
3. Push 到 `main` 即自動 build + deploy（見 `.github/workflows/deploy.yml`）。

anon key 由 workflow 注入為 build-time 環境變數，不 commit 進程式碼；
它本來就設計為可公開（權限控制在 RLS），Secrets 化是為了避免散落與方便輪替。

## Phase A.5 · Non-DB Preparation

新增（零 DB 依賴，可獨立部署）：
- 4 座城市幾何 SVG（Berlin / Frankfurt / Munich / Düsseldorf）+ fallback
- 6 個功能圖示（Schools / Board / FAQ / MyPosts / Search / Bell）
- Portal 首頁結構（Hero + 4 卡 + Announcements）
- /faq 獨立路由
- ErrorBoundary + Skeleton loaders
- announcements.json 種子（3 筆）
- favicon.svg（酒紅底 + 金字「留」）

未動：Supabase / OAuth / Storage / schema。

## Phase B.2 · DS v4.1 Morandi + HotSchools + Search + Portal 5-card

- Morandi 色票遷移（burgundy #9B5F5F / gold #B8A27A / dark #1E1B19，禁純黑）
- 新 token：surface-section、brand-*-surface/soft、module-* 五模組識別色
- HotSchools Carousel（scroll-snap 純 CSS，評價數 desc 排序）
- 全站搜尋 modal（zero-dep substring，Cmd/Ctrl+K）
- Portal 4→5 卡（新增「學用板塊」/edu 骨架）

功能零變動、DB 零觸碰、依賴零新增。
