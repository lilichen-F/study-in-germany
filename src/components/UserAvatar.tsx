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
export function BadgeChip({
  badgeId, size = 'md',
}: {
  badgeId: BadgeId;
  size?: 'sm' | 'md' | 'lg';
}) {
  const meta = getBadgeById(badgeId);
  if (!meta) return null;

  const tierClass = {
    gold: 'bg-brand-gold-soft text-brand-gold-hover border-brand-gold',
    silver: 'bg-surface-hover text-content-secondary border-content-secondary',
    general: 'bg-surface-canvas text-content-muted border-border-subtle',
  }[meta.tier];

  const sizeClass = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-3 py-1.5 text-sm gap-1.5',
    lg: 'px-4 py-2 text-base gap-2',
  }[size];

  const iconSize = {
    sm: 'w-3.5 h-3.5',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }[size];

  return (
    <span className={`inline-flex items-center rounded-lg
                      border font-medium ${tierClass} ${sizeClass}`}>
      <span className={iconSize}>
        <BadgeIcon badgeId={badgeId} className="w-full h-full" />
      </span>
      <span>{meta.label}</span>
    </span>
  );
}
