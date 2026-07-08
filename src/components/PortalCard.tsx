import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

interface Props {
  to: string;
  title: string;
  description: string;
  icon: ReactNode;
}

/**
 * DS v4.0 Portal Card · 4:3 aspect (spec §六 320×240)
 * Hover: -translate-y-0.5 + border-strong + icon scale 105% · 150ms
 * 無 shadow · 無多按鈕 · 無 tag · 無排行榜
 */
export default function PortalCard({ to, title, description, icon }: Props) {
  return (
    <Link
      to={to}
      className="group card-interactive aspect-[4/3]
                 flex flex-col justify-between no-underline p-5"
    >
      <div className="text-brand-burgundy transition-transform duration-150
                      group-hover:scale-105 origin-top-left
                      w-14 h-14 sm:w-16 sm:h-16">
        {icon}
      </div>

      <div className="space-y-1.5">
        <div className="text-base sm:text-lg font-semibold text-content-primary leading-tight">
          {title}
        </div>
        <div className="text-xs sm:text-sm text-content-secondary leading-snug line-clamp-2">
          {description}
        </div>
        <div className="pt-1 text-xs text-brand-burgundy font-medium">
          進入 →
        </div>
      </div>
    </Link>
  );
}
