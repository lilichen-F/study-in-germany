import type { ReactNode } from 'react'
import { useAuth } from '../lib/useAuth'

interface AuthGateProps {
  children: ReactNode
  /** 未登入時顯示的動作說明，例如「發表評價」 */
  action?: string
}

/**
 * 包裹需要登入才能操作的區塊。未登入時顯示登入提示。
 * 注意：這只是 UX 層的引導 — 真正的權限控制在資料庫 RLS policy，
 * 即使繞過此元件直接呼叫 API，未登入的寫入也會被 Postgres 拒絕。
 */
export function AuthGate({ children, action = '進行此操作' }: AuthGateProps) {
  const { user, loading, signInWithGoogle } = useAuth()

  if (loading) {
    return (
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-400">
        載入登入狀態…
      </div>
    )
  }

  if (!user) {
    return (
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 text-center">
        <p className="mb-3 text-sm text-slate-600">請先登入才能{action}</p>
        <button
          onClick={() => void signInWithGoogle()}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          使用 Google 登入
        </button>
      </div>
    )
  }

  return <>{children}</>
}
