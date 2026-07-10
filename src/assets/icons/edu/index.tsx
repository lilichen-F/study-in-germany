import type { FC } from 'react';
import VisaIcon from './VisaIcon';
import ArrivalIcon from './ArrivalIcon';
import RenewalIcon from './RenewalIcon';
import ApplicationIcon from './ApplicationIcon';
import ScholarshipIcon from './ScholarshipIcon';
import PolicyIcon from './PolicyIcon';
import ExitIcon from './ExitIcon';

const REGISTRY: Record<string, FC<{ className?: string }>> = {
  visa: VisaIcon,
  arrival: ArrivalIcon,
  renewal: RenewalIcon,
  application: ApplicationIcon,
  scholarship: ScholarshipIcon,
  policy: PolicyIcon,
  exit: ExitIcon,
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
  return <Icon className={className} />;
}
