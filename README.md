# 留德資訊 MVP（v2）

德國留學資訊平台：語言學校評價、二手交易與找房佈告欄。
v2 在純靜態原型上加入 **Google OAuth 登入** 與 **資料庫層級權限控制（Supabase RLS）**。

## 技術棧

Vite + React 19 + TypeScript + Tailwind CSS v4 + react-router-dom（HashRouter）+ Supabase（Auth + Postgres）

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

## 初次設定

### 1. Supabase

1. 建立 Supabase 專案，到 **SQL Editor** 執行 `supabase/schema.sql`（一次即可）。
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
