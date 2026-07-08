import { HashRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import Schools from './pages/Schools';
import SchoolDetail from './components/SchoolDetail';
import Board from './pages/Board';
import Privacy from './pages/Privacy';
import MyPosts from './pages/MyPosts';
import Faq from './pages/Faq';

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container-content py-8">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/schools" element={<Schools />} />
              <Route path="/schools/:id" element={<SchoolDetail />} />
              <Route path="/board" element={<Board />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/my-posts" element={<MyPosts />} />
              <Route path="*" element={
                <div className="text-center py-20 text-content-secondary">找不到頁面。</div>
              } />
            </Routes>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}
