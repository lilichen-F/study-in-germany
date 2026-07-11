import type { FC } from 'react';
import PioneerIcon from './PioneerIcon';
import StarIcon from './StarIcon';
import QuillIcon from './QuillIcon';
import HandshakeIcon from './HandshakeIcon';
import ChatIcon from './ChatIcon';
import CrownIcon from './CrownIcon';
import ApplicationIcon from '../edu/ApplicationIcon'; // 沿用 Edu · 語校達人
import type { BadgeId } from '../../../lib/badges';

const REGISTRY: Record<BadgeId, FC<{ className?: string }>> = {
  pioneer: PioneerIcon,
  review_expert: StarIcon,
  post_expert: QuillIcon,
  contribution_expert: HandshakeIcon,
  discussion_expert: ChatIcon,
  school_expert: ApplicationIcon, // 沿用 Edu ApplicationIcon
  omni_expert: CrownIcon,
};

export function BadgeIcon({
  badgeId,
  className,
}: {
  badgeId: BadgeId;
  className?: string;
}) {
  const Icon = REGISTRY[badgeId];
  if (!Icon) return null;
  return <Icon className={className} />;
}
