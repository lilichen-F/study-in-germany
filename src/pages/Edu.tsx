import { Link } from 'react-router-dom';
import EduIcon from '../assets/icons/EduIcon';
import { EDU_TOPICS } from '../data/edu/config';

const ICON_MAP: Record<string, string> = {
  visa: '🛂',
  arrival: '🏠',
  renewal: '🔄',
  application: '🎓',
  scholarship: '💰',
  policy: '📜',
};

/**
 * DS v4.1 · Edu Hub · 學用板塊入口
 * 六子板塊卡片矩陣（3×2 或 2×3 依螢幕）
 * 每卡進入獨立 /edu/:slug 頁面
 */
export default function Edu() {
  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs text-content-muted uppercase tracking-wider mb-2">
          German Study Hub
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold flex items-center gap-3">
          <span className="text-module-edu w-8 h-8 sm:w-10 sm:h-10 inline-flex">
            <EduIcon className="w-full h-full" />
          </span>
          學用板塊
        </h1>
        <p className="text-sm text-content-secondary mt-3 max-w-2xl leading-relaxed">
          給留德新手與正在申請中的你——簽證、落地、延簽、學程申請、獎學金、教育政策
          六個主題整理成可查、可讀、可帶著走的實用筆記。內容以官方公開資料為基礎，
          正式辦理前請務必確認最新政策。
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {EDU_TOPICS.map((t) => (
          <Link
            key={t.slug}
            to={`/edu/${t.slug}`}
            className="card-interactive p-5 no-underline aspect-[4/3]
                       flex flex-col justify-between"
          >
            <div className="text-2xl" aria-hidden>{ICON_MAP[t.icon]}</div>
            <div>
              <div className="font-semibold text-content-primary">{t.title}</div>
              <div className="text-xs text-content-muted mt-1 leading-relaxed">
                {t.hint}
              </div>
              <div className="pt-2 text-xs text-brand-burgundy font-medium">
                進入 →
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="card bg-brand-gold-soft border-brand-gold/30">
        <div className="text-sm text-content-primary font-medium mb-2">
          📝 貢獻你的經驗
        </div>
        <p className="text-sm text-content-secondary leading-relaxed">
          內容仍在持續補充中。若你有實用資訊或想校正某段，請於
          <Link to="/board" className="mx-1">佈告欄</Link>
          留言，或直接開 GitHub issue。留言功能將於後續版本上線。
        </p>
      </div>
    </div>
  );
}
