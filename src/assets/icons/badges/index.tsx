import {
  IconRocket,
  IconStarFilled,
  IconPencil,
  IconGift,
  IconMessageCircle,
  IconSchool,
  IconCrown,
  type Icon as TablerIcon,
} from '@tabler/icons-react';
import type { BadgeId } from '../../../lib/badges';

const REGISTRY: Record<BadgeId, TablerIcon> = {
  pioneer: IconRocket,
  review_expert: IconStarFilled,
  post_expert: IconPencil,
  contribution_expert: IconGift,
  discussion_expert: IconMessageCircle,
  school_expert: IconSchool, // 沿用作戰手冊「學程申請」同一圖標，語意相通
  omni_expert: IconCrown,
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
  return <Icon className={className} stroke={1.5} />;
}
