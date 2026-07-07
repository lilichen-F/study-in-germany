import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../lib/useAuth'

const navItems = [
  { to: '/', label: '首頁' },
  { to: '/schools', label: '語言學校' },
  { to: '/board', label: '佈告欄' },
]

export function Header() {
  const { user, loading, signInWithGoogle, signOut } = useAuth()

  const displayName =
    (user?.user_metadata?.full_name as string | undefined) ??
    user?.email?.split('@')[0] ??
    ''
  const avatarUrl = user?.user_metadata?.avatar_url as string | undefined

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-lg font-bold text-slate-900">
            🇩🇪 留德資訊
          </Link>
          <nav className="flex gap-4 text-sm">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  isActive
                    ? 'font-semibold text-blue-700'
                    : 'text-slate-600 hover:text-slate-900'
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3 text-sm">
          {loading ? (
            <span className="text-slate-400">…</span>
          ) : user ? (
            <>
              <NavLink
                to="/my-posts"
                className={({ isActive }) =>
                  isActive
                    ? 'font-semibold text-blue-700'
                    : 'text-slate-600 hover:text-slate-900'
                }
              >
                我的發文
              </NavLink>
              <span className="flex items-center gap-2 text-slate-700">
                {avatarUrl && (
                  <img
                    src={avatarUrl}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="h-7 w-7 rounded-full"
                  />
                )}
                <span className="hidden sm:inline">{displayName}</span>
              </span>
              <button
                onClick={() => void signOut()}
                className="rounded-md border border-slate-300 px-3 py-1.5 text-slate-700 hover:bg-slate-50"
              >
                登出
              </button>
            </>
          ) : (
            <button
              onClick={() => void signInWithGoogle()}
              className="rounded-md bg-blue-600 px-3 py-1.5 font-medium text-white hover:bg-blue-700"
            >
              使用 Google 登入
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
