import { Link } from 'react-router-dom'
import { FAQ } from '../components/FAQ'

export function Home() {
  return (
    <div className="space-y-12">
      <section className="rounded-2xl bg-gradient-to-br from-blue-50 to-amber-50 px-6 py-12 text-center">
        <h1 className="text-3xl font-bold text-slate-900">留德資訊平台</h1>
        <p className="mx-auto mt-3 max-w-xl text-slate-600">
          由留德學生社群共同維護的資訊站 —
          真實的語言學校評價、二手交易與找房佈告欄，幫你少走冤枉路。
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link
            to="/schools"
            className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            瀏覽語言學校
          </Link>
          <Link
            to="/board"
            className="rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            逛佈告欄
          </Link>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold text-slate-900">常見問題</h2>
        <FAQ />
      </section>
    </div>
  )
}
