import {
  IconId,
  IconHome,
  IconClockHour4,
  IconSchool,
  IconAward,
  IconFileText,
  IconDoorExit,
  type Icon as TablerIcon,
} from '@tabler/icons-react';

const REGISTRY: Record<string, TablerIcon> = {
  visa: IconId,
  arrival: IconHome,
  renewal: IconClockHour4,
  application: IconSchool,
  scholarship: IconAward,
  policy: IconFileText,
  exit: IconDoorExit,
};

export function EduTopicIcon({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const Icon = REGISTRY[slug];
  if (!Icon) return null;
  return <Icon className={className} stroke={1.5} />;
}
