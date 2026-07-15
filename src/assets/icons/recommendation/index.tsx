import {
  IconCoin,
  IconTrain,
  IconDeviceMobile,
  IconHome2,
  IconSearch,
  IconMedal,
  IconReceipt,
  IconBuildingBank,
  IconApps,
  type Icon as TablerIcon,
} from '@tabler/icons-react';

/**
 * Phase AQ：分類重組為 8 新分類（PAT-145），圖示比照 Tabler Icons 家族（PAT-122）
 * Phase AR：新增第 9 分類 immigration（外事局），見 PAT-146
 */
const REGISTRY: Record<string, TablerIcon> = {
  finance: IconCoin,
  transport: IconTrain,
  telecom: IconDeviceMobile,
  housing: IconHome2,
  lookup: IconSearch,
  scholarship: IconMedal,
  expense: IconReceipt,
  immigration: IconBuildingBank,
  general: IconApps,
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
