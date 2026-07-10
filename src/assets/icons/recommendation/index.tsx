import type { FC } from 'react';
import VisaIcon from '../edu/VisaIcon';
import ArrivalIcon from '../edu/ArrivalIcon';
import ApplicationIcon from '../edu/ApplicationIcon';
import ScholarshipIcon from '../edu/ScholarshipIcon';
import GeneralIcon from './GeneralIcon';
import TaiwanIcon from './TaiwanIcon';

const REGISTRY: Record<string, FC<{ className?: string }>> = {
  general: GeneralIcon,        // 新畫
  visa: VisaIcon,               // 沿用 Edu
  arrival: ArrivalIcon,         // 沿用 Edu
  edu: ApplicationIcon,         // 沿用 Edu（學程 → 大學帽）
  scholarship: ScholarshipIcon, // 沿用 Edu
  taiwan: TaiwanIcon,           // 新畫
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
  return <Icon className={className} />;
}
