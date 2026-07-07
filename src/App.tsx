import { HashRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { SchoolDetail } from './components/SchoolDetail'
import { Home } from './pages/Home'
import { Schools } from './pages/Schools'
import { Board } from './pages/Board'
import { Privacy } from './pages/Privacy'
import { MyPosts } from './pages/MyPosts'

// HashRouter：GitHub Pages 無 server-side rewrite，
// 以 #/path 路由避免直接存取子路徑時的 404
export default function App() {
  return (
    <HashRouter>
      <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
        <Header />
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/schools" element={<Schools />} />
            <Route path="/schools/:id" element={<SchoolDetail />} />
            <Route path="/board" element={<Board />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/my-posts" element={<MyPosts />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  )
}
