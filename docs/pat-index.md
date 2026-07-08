# PAT 快速索引

| ID | 分類 | 一句話摘要 |
|---|---|---|
| PAT-01 | CORE_IMMUTABLE | HashRouter + PKCE OAuth 相容性（`redirectTo` 顯式指定） |
| PAT-02 | CORE_IMMUTABLE | PostgREST 無法 auto-embed auth.users FK → 用 attachProfiles() |
| PAT-03 | DEPRECATE_MARK | listings_public_read 對本人也套 expires_at > NOW() |
| PAT-04 | CORE_IMMUTABLE | GH Pages base './' 相對路徑（子路徑 `/study-in-germany/`） |
| PAT-05 | CORE_IMMUTABLE | Build-time env 注入，anon key 進 bundle 是預期 |
| PAT-06 | CORE_IMMUTABLE | ThemeProvider CSS var 驅動主題 |
| PAT-07 | CORE_IMMUTABLE | 評分維度用 JSONB stars 儲存，加維度不改 schema |
| PAT-08 | CORE_IMMUTABLE | listings.type = enum('secondhand','rental_offer','rental_seek') |
| PAT-09 | CORE_IMMUTABLE | 照片：client 壓縮 + Storage RLS 驗 foldername[0] = auth.uid |
| PAT-10 | DEPRECATE_MARK | v2 舊 stars_teaching/environment 欄位（v4 已 DROP） |
| PAT-11 | KNOWN_ISSUE | deletePhoto best-effort，孤兒照片會累積 |
| PAT-12 | KNOWN_ISSUE | tsconfig verbatimModuleSyntax 下需 `import type` |
| PAT-13 | CORE_IMMUTABLE | Tailwind v4 @theme inline 語法（本專案） |
| PAT-14 | CORE_IMMUTABLE | Mock Mode 隔離（VITE_MOCK_MODE=1） |
| PAT-15 | CORE_IMMUTABLE | __APP_VERSION__ build-time 注入 |
| PAT-16 | CORE_IMMUTABLE | 錯誤翻譯層 errorMessages.ts |
| PAT-17 | CORE_IMMUTABLE | DevBadge production 自動剝離（OfflineBanner 為 runtime 保留） |
| PAT-18 | CORE_IMMUTABLE | Vite manualChunks: react-vendor / supabase-vendor |

## 分類語意
- **CORE_IMMUTABLE**: 動搖此決策會連鎖影響多檔，須整輪重新 governance
- **DEPRECATE_MARK**: 現行決策標記過期候選，需求方裁決後升級或降級
- **KNOWN_ISSUE**: 已知問題，暫不修，記錄以免重複踩

## 查找路徑
明細於 Meta_Dev_Knowledge.md，PAT-XX 為錨點。
