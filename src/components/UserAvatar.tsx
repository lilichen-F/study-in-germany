import { getBadgeById, frameTierClass, computeFrameTier } from '../lib/badges';
import type { BadgeId } from '../lib/badges';
import { BadgeIcon } from '../assets/icons/badges';

interface Props {
  avatarUrl: string | null | undefined;
  displayName: string | null | undefined;
  badges?: BadgeId[];
  size?: 'sm' | 'md' | 'lg';
}

/**
 * DS v4.2 · 使用者頭像 + 頭框
 * 頭框依最高等級徽章著色
 */
export default function UserAvatar({
  avatarUrl, displayName, badges = [], size = 'md',
}: Props) {
  const sizeClass = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-16 h-16 text-xl',
  }[size];

  const tier = computeFrameTier(badges);
  const frameClass = frameTierClass(tier);

  return (
    <div className="inline-flex items-center gap-2">
      <div className={`${sizeClass} rounded-full ${frameClass}
                       flex items-center justify-center overflow-hidden
                       bg-brand-gold-soft relative`}>
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={displayName ?? '使用者頭像'}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-brand-gold">👤</span>
        )}
      </div>
    </div>
  );
}

/**
 * DS v4.2 · 顯示徽章 chip
 */
export function BadgeChip({ badgeId }: { badgeId: BadgeId }) {
  const meta = getBadgeById(badgeId);
  if (!meta) return null;

  const tierClass = {
    gold: 'bg-brand-gold-soft text-brand-gold-hover border-brand-gold',
    silver: 'bg-surface-hover text-content-secondary border-content-secondary',
    general: 'bg-surface-canvas text-content-muted border-border-subtle',
  }[meta.tier];

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded
                      border text-xs ${tierClass}`}>
      <span className="w-3.5 h-3.5">
        <BadgeIcon badgeId={badgeId} className="w-full h-full" />
      </span>
      <span>{meta.label}</span>
    </span>
  );
}
