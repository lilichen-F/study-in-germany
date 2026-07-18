import { Link } from 'react-router-dom';
import { getGuideResourceLinks } from '../../data/edu/guideResourceLinks';
import { RECOMMENDATION_CATEGORIES } from '../../lib/recommendation';

/**
 * 赴德指南板塊資源捷徑入口（Phase BR.d）。
 *
 * 樣式刻意與既有「資料來源」文字內嵌超連結（text-brand-burgundy +
 * ↗ 尾碼）明顯不同——採按鈕式填色卡片、→ 前綴箭頭、金色系配色，
 * 避免使用者誤把「捷徑」看成單純外部參考連結。
 */
export default function GuideResourceShortcuts({ guideSlug }: { guideSlug: string }) {
  const links = getGuideResourceLinks(guideSlug);
  if (links.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs text-content-muted shrink-0">資源捷徑：</span>
      {links.map((link) => {
        const meta = RECOMMENDATION_CATEGORIES.find((c) => c.key === link.category);
        const to = `/recommendation/${link.category}${link.subboard ? `?sub=${link.subboard}` : ''}`;
        return (
          <Link
            key={`${link.category}-${link.subboard ?? ''}`}
            to={to}
            className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg
                       bg-brand-gold-soft border border-brand-gold/40 text-content-primary
                       hover:bg-brand-gold/20 hover:border-brand-gold
                       no-underline transition-colors"
          >
            <span aria-hidden>→</span>
            {meta?.title ?? link.label}
          </Link>
        );
      })}
    </div>
  );
}
