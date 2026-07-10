import { RATING_DIMENSIONS } from '../lib/ratings';
import type { RatingDimension } from '../lib/ratings';

interface Props {
  stars: Partial<Record<RatingDimension | 'overall', number>>;
  compact?: boolean;
}

/**
 * 單則 review 或 school 平均的 6 維 breakdown
 * compact = true · 顯示於評價卡片內 · 一行 · 只顯示已填維度
 * compact = false · 顯示於學校詳情 Banner · bar chart · 全 5 維
 */
export default function RatingBreakdown({ stars, compact = false }: Props) {
  if (compact) {
    const filled = RATING_DIMENSIONS.filter(
      (d) => typeof stars[d.key] === 'number' && (stars[d.key] as number) > 0
    );
    if (filled.length === 0) return null;
    return (
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-content-muted">
        {filled.map((d) => (
          <span key={d.key}>
            {d.label}{' '}
            <span className="text-brand-gold font-medium">
              {(stars[d.key] as number).toFixed(1)}
            </span>
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {RATING_DIMENSIONS.map((d) => {
        const v = stars[d.key];
        const percent = typeof v === 'number' ? (v / 5) * 100 : 0;
        return (
          <div key={d.key} className="flex items-center gap-3">
            <div className="text-xs text-content-secondary w-20 shrink-0">
              {d.label}
            </div>
            <div className="flex-1 h-2 bg-surface-hover rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-gold transition-all duration-300"
                style={{ width: `${percent}%` }}
              />
            </div>
            <div className="text-xs text-content-primary font-medium w-10 text-right shrink-0">
              {typeof v === 'number' ? v.toFixed(1) : '—'}
            </div>
          </div>
        );
      })}
    </div>
  );
}
