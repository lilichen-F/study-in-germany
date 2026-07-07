import type { ReactNode } from 'react';
import { useAuth } from '../lib/useAuth';

interface Props {
  children: ReactNode;
  /** 未登入時顯示的說明文字 */
  message?: string;
}

/**
 * 包裹需要登入才能操作的區塊。
 * 僅為 UX 引導 — 真正的權限控制在資料庫 RLS policy，
 * 繞過此元件直接呼叫 API，未登入寫入仍會被 Postgres 拒絕。
 */
export default function AuthGate({ children, message = '請先登入才能進行此操作。' }: Props) {
  const { user, loading, signInWithGoogle } = useAuth();

  if (loading) {
    return <div className="card text-sm text-content-muted text-center">載入登入狀態…</div>;
  }

  if (!user) {
    return (
      <div className="card text-center space-y-3">
        <p className="text-sm text-content-secondary">{message}</p>
        <button onClick={() => signInWithGoogle()} className="btn-primary">
          Google 登入
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
