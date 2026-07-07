# Meta_User_Feedback — study-in-germany

## 已解決
- [x] 決策：listings 3-way split（secondhand / rental_offer / rental_seek）— Phase A 完成
- [x] 決策：照片上傳限這 3 類、上限 6 張/貼文 — Phase A 完成
- [x] 決策：評分 JSONB `stars`、必填僅 overall — Phase A 完成
- [x] 決策：主題預設 system prefers-color-scheme + localStorage 覆寫 — Phase A 完成

## 保留待辦
- [ ] schools.json / faq.json 需覆蓋真實內容（現為 5 校 / 6 題示意資料，資料契約已符 v4）
- [ ] 【阻斷中】Google OAuth：`Unable to exchange external code`——Supabase Google provider 的 Client Secret 待使用者更新（Google Console 重產 GOCSPX-* → 貼回 Supabase → Save）。修復前所有寫入功能無法實測。
- [ ] 【使用者手動】既有 DB 執行 `supabase/migrate_v2_to_v4.sql` → 再執行 `supabase/schema.sql`（v2 表已部署，直接跑 v4 全量會撞 already exists）
- [ ] 【使用者手動】Storage：確認 bucket `listings` 與 4 條 policy 生效；若 SQL Editor 建 storage.objects policy 遇權限錯誤，改用 Dashboard → Storage → Policies UI 建立

## Phase B 待決
- [ ] 熱門語校排序演算法是否用「評價數 desc」（LOCKED #4 已預定，實作前最後確認）
