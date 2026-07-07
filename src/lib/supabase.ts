import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    '缺少 VITE_SUPABASE_URL 或 VITE_SUPABASE_ANON_KEY 環境變數。' +
      '本地開發請建立 .env.local（參考 .env.example）；' +
      'CI 部署由 GitHub Actions 從 repo Secrets 注入。',
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // OAuth callback 會把授權碼帶回網址（PKCE flow 的 ?code=...），
    // detectSessionInUrl 讓 client 在載入時自動交換 session
    detectSessionInUrl: true,
    flowType: 'pkce',
    persistSession: true,
    autoRefreshToken: true,
  },
})
