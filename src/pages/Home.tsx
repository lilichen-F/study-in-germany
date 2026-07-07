import { Link } from 'react-router-dom';
import FAQ from '../components/FAQ';

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="card text-center py-12 px-6">
        <h1 className="text-3xl font-semibold text-content-primary">留德資訊平台</h1>
        <p className="mx-auto mt-3 max-w-xl text-content-secondary">
          由留德學生社群共同維護的資訊站 —
          真實的語言學校評價、二手交易與找房佈告欄，幫你少走冤枉路。
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/schools" className="btn-primary no-underline">瀏覽語言學校</Link>
          <Link to="/board" className="btn-ghost no-underline">逛佈告欄</Link>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-medium text-content-primary">常見問題</h2>
        <FAQ />
      </section>
    </div>
  );
}
