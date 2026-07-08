import { Link } from 'react-router-dom';
import { useHotSchools } from '../lib/useHotSchools';
import { CityIllustration } from '../assets/cities';
import { SkeletonBox } from './Skeleton';

/**
 * DS v4.0 spec §十 · scroll-snap 純 CSS Carousel
 * Desktop: 4 張 · Mobile: 1.2 張
 * 排序按評價數 desc（無評價則顯示於後）
 * 無新第三方依賴
 */
export default function HotSchoolsCarousel() {
  const { hot, loading } = useHotSchools();

  if (loading) {
    return (
      <div className="flex gap-4 overflow-x-hidden">
        <SkeletonBox className="h-52 shrink-0 basis-[80%] sm:basis-[45%] lg:basis-[23%]" />
        <SkeletonBox className="h-52 shrink-0 basis-[80%] sm:basis-[45%] lg:basis-[23%]" />
        <SkeletonBox className="h-52 shrink-0 basis-[80%] sm:basis-[45%] lg:basis-[23%]" />
        <SkeletonBox className="h-52 shrink-0 basis-[80%] sm:basis-[45%] lg:basis-[23%]" />
      </div>
    );
  }

  if (hot.length === 0) return null;

  return (
    <div
      className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3
                 scroll-smooth
                 [scrollbar-color:rgb(var(--border-strong))_transparent]
                 [scrollbar-width:thin]"
    >
      {hot.map((s) => (
        <Link
          key={s.id}
          to={`/schools/${s.id}`}
          className="group snap-start no-underline shrink-0
                     basis-[80%] sm:basis-[45%] lg:basis-[23%]
                     card-interactive p-0 overflow-hidden"
        >
          <div className="h-24 bg-surface-section flex items-center justify-center px-6
                          text-module-schools">
            <CityIllustration cityKey={s.city_key} className="w-full h-full opacity-80" />
          </div>
          <div className="p-4">
            <div className="text-xs text-content-muted mb-1">{s.city}</div>
            <div className="font-semibold text-content-primary leading-tight
                            line-clamp-2 min-h-[2.5em]">
              {s.name_zh}
            </div>
            <div className="mt-3 flex items-center justify-between text-xs">
              {s.avg_overall !== null ? (
                <span className="text-brand-gold font-medium">
                  ★ {s.avg_overall}
                </span>
              ) : (
                <span className="text-content-muted">尚無評價</span>
              )}
              <span className="text-content-secondary">
                {s.review_count > 0 ? `${s.review_count} 則` : '—'}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
