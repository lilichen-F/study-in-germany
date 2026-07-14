import {
  IconCompass,
  IconFileCertificate,
  IconLuggage,
  IconSearch,
  IconMedal,
  IconMapPin,
  type Icon as TablerIcon,
} from '@tabler/icons-react';

const REGISTRY: Record<string, TablerIcon> = {
  general: IconCompass,
  visa: IconFileCertificate,
  arrival: IconLuggage,
  edu: IconSearch,
  scholarship: IconMedal,
  taiwan: IconMapPin,
};

export function RecommendationCategoryIcon({
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
