# Meta_Dev_Knowledge — study-in-germany

> PAT-01..05 於 Phase A.5 依實際專案歷史補齊（原標 N/A-external，2026-07-08 修正）。

## PAT-01 [CORE_IMMUTABLE]: HashRouter + PKCE OAuth callback 相容性
根因：GH Pages `/study-in-germany/` 子路徑，PKCE `?code=` 於 query，
HashRouter `#/` 於 fragment，兩者不衝突但 `redirectTo` 必須顯式指定
`window.location.origin + window.location.pathname`。

## PAT-02 [CORE_IMMUTABLE]: PostgREST 無法 auto-embed auth.users FK
根因：school_reviews.user_id / listings.user_id 外鍵指向 auth.users 而非
public.profiles。前端以 attachProfiles() 於 types.ts 批次補齊。

## PAT-03 [DEPRECATE_MARK]: listings_public_read policy 對本人也生效
`expires_at > NOW()` 條件使本人於 /my-posts 也看不到過期貼文。
若需放寬：USING (expires_at > NOW() OR auth.uid() = user_id)。

## PAT-04 [CORE_IMMUTABLE]: GH Pages base 子路徑
vite.config.ts base 必須等於 repo 名稱（本專案採 base './' 相對路徑等效）。改 repo 名要同步：base、index.html favicon href、
Supabase Redirect URLs whitelist。

## PAT-05 [CORE_IMMUTABLE]: build-time env 注入
.env.local 僅本機用。GH Actions 於 build 前將 SUPABASE_URL/SUPABASE_ANON_KEY 注入為
VITE_* 環境變數。anon key 進 bundle 為預期（RLS 才是權限層）。
絕不 commit .env.local。

- PAT-06 [CORE_IMMUTABLE]: ThemeProvider CSS var 驅動主題。本專案為 Tailwind **v4**：以 `@theme inline { --color-x: rgb(var(--x)); }` + `@custom-variant dark (&:where(.dark, .dark *))` 實作（v3 的 `rgb(var(--x) / <alpha-value>)` config 語法不適用；opacity modifier 由 v4 color-mix 處理）。
- PAT-07 [CORE_IMMUTABLE]: 評分維度用 JSONB `stars` 儲存（必含 `overall`，DB CHECK 強制），加維度不改 schema——只改前端 UI + `RatingDimension` Type Union。
- PAT-08 [CORE_IMMUTABLE]: `listings.type` = enum('secondhand','rental_offer','rental_seek')，未來加類型需同步改 DB CHECK 與 Type Union + `LISTING_TYPE_LABEL`。
- PAT-09 [CORE_IMMUTABLE]: 照片上傳全鏈路：client Canvas 壓縮（1600px/q0.85/JPEG）→ Storage bucket `listings/<user_id>/<uuid>.jpg` → Storage RLS 驗 `(storage.foldername(name))[1] = auth.uid()::text`。
- PAT-10 [DEPRECATE_MARK]: v2 舊 `stars_teaching`/`stars_environment` 欄位——v4 已改 JSONB；既有 DB 需跑 `supabase/migrate_v2_to_v4.sql`（DROP 重建，v2 資料 0 筆無搬移需求）。
- PAT-11 [KNOWN_ISSUE]: `deletePhoto` 為 best-effort，失敗不阻斷 row 刪除 → 孤兒照片會累積 → 記於 DEBT。
- PAT-12 [KNOWN_ISSUE]: tsconfig `verbatimModuleSyntax: true`——所有 type-only import（ReactNode/FormEvent 等）必須 `import type`，否則編譯失敗。外來 spec 程式碼須先過此檢查。
- PAT-13 [CORE_IMMUTABLE]: Tailwind v4 `@apply` 不能引用自訂 component class（v3 可）——共用基底改用群組選擇器 `.btn, .btn-primary, ... { @apply ... }`。

## PAT-16 [CORE_IMMUTABLE]: 錯誤翻譯層集中於 errorMessages.ts
所有 Supabase 錯誤透過 translateError() 過濾，避免生 raw 錯誤直接展示給使用者。
未命中的 code 保留原文，raw 訊息一律 console.error 供除錯。

## PAT-17 [CORE_IMMUTABLE]: DevBadge / OfflineBanner 於 production 自動剝離
DevBadge 條件 `import.meta.env.DEV` 於 build 時常量摺疊，dead-code elimination
會移除整個元件，不影響 bundle。（OfflineBanner 為 runtime 條件，production 保留——離線提示為正式功能。）

## PAT-18 [CORE_IMMUTABLE]: Vite manualChunks 拆 supabase-vendor
supabase-js 約 30+ KB gzip，獨立 chunk 允許業務代碼變動時保留 vendor cache。

## PAT-19 [CORE_IMMUTABLE]: Hero 天際線 · 4 城 SVG 橫向拼組
HeroSection 用 flex + `flex-1 min-w-0` 讓 4 城 CityIllustration 平均拼組。
opacity 淺色 0.08 / 深色 0.12 確保背景不搶焦。currentColor 對接主題自動適配。
若未來加城市，於 index.tsx 註冊後 HeroSection 手動選取 4 個代表，非自動遍歷。

## PAT-20 [CORE_IMMUTABLE]: SchoolDetail Banner overlay 漸層蓋層
`bg-gradient-to-t from-surface-card via-surface-card/95 to-transparent` 在 SVG 底部
產生可讀性蓋層。淺深模式各自對接 surface-card token。整合時保留 MOCK_MODE fallback
（B.1 banner 版原漏，phase-b-integrated 補回）。

## PAT-21 [CORE_IMMUTABLE]: PortalCard 4:3 aspect 硬鎖
`aspect-[4/3]` 對齊 DS v4.0 spec §六。Icon `w-14 sm:w-16`、line-clamp-2 防爆版。
block+flex display 衝突沿用 DEV-9 移除 block。

## PAT-22 [CORE_IMMUTABLE]: DS v4.1 Morandi 色票 + module 識別色
CSS var 全站遷移：burgundy #B71C1C→#9B5F5F、gold #D9A300→#B8A27A、dark base
#121212→#1E1B19（禁純黑）。新增 surface-section / brand-*-surface / brand-*-soft /
module-{schools,board,faq,edu,myposts} 五模組識別色（僅圖示與識別用，不作主品牌色）。
@theme inline 同步 --color-* 對接。改膚只動 :root/.dark 兩區塊。

## PAT-23 [CORE_IMMUTABLE]: HotSchools 聚合於 client（無 DB 聚合函式）
useHotSchools 撈 school_reviews(school_id, stars) 全量，於 JS Map 聚合 count/avg，
按 review_count desc 排序（決策 4）。無評價語校 count=0 仍回傳排於後。
不建 Postgres view/RPC（維持 supabase 檔零改動 + RLS 公開讀已足夠）。

## PAT-24 [CORE_IMMUTABLE]: 全站搜尋純 client substring（search.ts）
schools+faq+announcements 三來源 substring match，資料量 <100 筆無需 fuse.js。
SearchModal Cmd/Ctrl+K 觸發、↑↓ 導航、Enter 前往、ESC 關閉。零新依賴。
未來若需模糊比對再換 fuse.js（介面已抽象為 searchAll(query)）。

## PAT-25 [KNOWN_ISSUE]: /edu 為 Phase B.2 骨架
placeholder + 6 子板塊預覽卡（簽證/落地/延簽/學程/獎學金/政策）。
Phase B.3 展開子板塊骨架、B.4-B.5 填內容。route 與 Portal 第 5 卡已接。

## PAT-26 [CORE_IMMUTABLE]: MD 契約 · Vite ?raw import
Edu 板塊採 `import md from './x.md?raw'` 純字串 import + 自寫輕量 renderer（src/lib/markdown.ts）。
零新依賴。若日後 MD 內需寫 JSX（互動元件、動態 shortcode）改用 @mdx-js/rollup，
但目前七類語法（heading/list/link/code/blockquote/hr/inline）已涵蓋 Edu 內容需求。
（spec B3d-3 原標 PAT-22，撞既有 Morandi PAT-22 → 順延 26。）

## PAT-27 [CORE_IMMUTABLE]: FAQ 資訊層級分工
FAQ = 快速常問（新手第一次會問的 5 題）；Edu = 深入流程手冊（各子主題 400-800 字）。
兩者互相引導，避免內容重疊。深度問題於 FAQ 頁底部指引至 Edu 對應子板塊。

## PAT-28 [CORE_IMMUTABLE]: dangerouslySetInnerHTML 於 Edu Topic 使用
本站唯一使用 dangerouslySetInnerHTML 的位置：src/pages/EduTopic.tsx。
輸入源是可信的（src/data/edu/*.md 為 static asset），不從使用者輸入吃內容。
markdown.ts 的 inline() 對文字先 escapeHtml() 再套白名單標籤，無 raw HTML 通道。
若日後開放使用者 commit MD（如貢獻 PR），需審核流程或用 sanitizer。
