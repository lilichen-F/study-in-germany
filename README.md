# 留德華站

德國留學生活資訊入口 · MVP · 現行版本 v0.7.0

- **線上**：https://si-kui-a.github.io/study-in-germany/
- **技術棧**：Vite + React 19 + TypeScript + Tailwind CSS v4 + react-router-dom（HashRouter）+ Supabase（Auth / Postgres / Storage）
- **設計系統**：DS v4.1 Morandi 色票 + DS v4.2 Workflow Pattern（Edu 板塊）

## 功能

### 路由

| 路徑 | 頁面 |
|---|---|
| `/` | Portal 首頁（Hero + 5 卡 + 熱門語校 + 最新公告） |
| `/schools` | 語校列表 |
| `/schools/:id` | 語校詳情（含 6 維評價 breakdown、住宿資訊） |
| `/board` | 生活佈告欄（4 類：二手交易 / 出租 / 求租 / 討論區） |
| `/faq` | 常見問答（5 題快速常問） |
| `/edu` | 作戰手冊 Hub（7 大主題） |
| `/edu/:slug` | 各主題 Workflow（`visa` `arrival` `renewal` `application` `scholarship` `policy` `exit`） |
| `/my-posts` | 個人資料管理 |
| `/privacy` | 隱私政策 |

### 核心功能

- **6 維評分系統** — 教學品質 / 學習環境 / 教材 / 行政效率 / 交通便利性 / 性價比，使用者填其中任意幾維，overall 於 client 自動計算（`src/lib/ratings.ts`）
- **Edu Workflow** — 7 主題、共 53 個 step，Priority Badge + Accordion 展開（文件 / 流程 / 常見錯誤 / 官方資源）
- **生活佈告欄 4 類** — 二手交易 / 出租 / 求租 / 討論區（討論區目前於 UI 端以 title 前綴標記，DB 層仍為既有 3 類 CHECK constraint，見 `Meta_Dev_Knowledge.md` PAT-48）
- **全站搜尋** — Cmd/Ctrl+K，client-side substring 掃描 schools + faq + announcements + 7 個 Edu 主題
- **深淺主題** — Morandi 對稱色票，system 偏好 + localStorage 覆寫
- **繁體中文（台灣）** — 全站台灣用語，德文專有名詞僅首次出現附中文說明

所有寫入操作（評價 / 貼文）皆由 Postgres Row Level Security 於資料庫層強制執行，前端 `AuthGate` 僅為 UX 引導。

## 開始使用

```bash
npm install
npm run dev        # http://localhost:5173/
npm run build      # production build（tsc -b + vite build）
npm run typecheck  # tsc -b（noEmit）
```

環境變數（複製 `.env.example` 為 `.env.local`）：

```
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon key>
```

DB / OAuth 未就緒時可另加一行進入 Mock Mode（不打 Supabase，改用 `src/lib/mockData.ts`）：

```
VITE_MOCK_MODE=1
```

首次 Supabase 設定、GitHub Pages 部署步驟見 [docs/local-dev.md](docs/local-dev.md)。

## 開發文件

- [15 分鐘上手](docs/onboarding-15min.md) — 新開發者最短路徑
- [本地開發指南](docs/local-dev.md) — 環境設定、疑難排解
- [PAT 快速索引](docs/pat-index.md) — 50 條架構決策速查表
- [Meta_Dev_Knowledge.md](Meta_Dev_Knowledge.md) — PAT 完整明細
- [Meta_User_Feedback.md](Meta_User_Feedback.md) — 需求方回饋累積

## 受保護檔案

以下檔案動了需重跑整輪 governance，一般開發勿直接修改：

- `src/lib/supabase.ts` / `useAuth.ts` / `storage.ts` / `types.ts`
- `supabase/*.sql`

## CI / CD

- GitHub Actions：`build` → `deploy`（GitHub Pages）→ `verify`（smoke test）
- Dependabot：monthly，npm + github-actions 兩生態系，忽略 major bump（見 PAT-43）

## 授權

MIT License，詳見 [LICENSE](./LICENSE) 檔案。

**開源範圍**：目前 v0.7.x 全部程式碼皆 MIT 開源，含 UI 元件、資料契約、workflow 資料。

**未來規劃**：若日後推出付費進階功能（如 admin dashboard、詳細分析、匯出功能等），將另存為閉源專案，不納入本 repo。
