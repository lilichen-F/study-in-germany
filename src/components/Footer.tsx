import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:justify-between">
        <p>留德資訊 MVP — 非官方社群平台，內容由使用者提供</p>
        <nav className="flex gap-4">
          <Link to="/privacy" className="hover:text-slate-700">
            隱私政策
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-slate-700"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  )
}
