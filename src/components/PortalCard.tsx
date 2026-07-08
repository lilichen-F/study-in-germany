import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

interface Props {
  to: string;
  title: string;
  description: string;
  icon: ReactNode;
}

/** 4:3 aspect (per DS v4.0 spec). Hover: -translate-y-0.5 + border-strong + icon 105%. */
export default function PortalCard({ to, title, description, icon }: Props) {
  return (
    <Link
      to={to}
      className="group card-interactive aspect-[4/3] flex flex-col justify-between
                 no-underline"
    >
      <div className="text-brand-burgundy transition-transform duration-150
                      group-hover:scale-105 w-12 h-12">
        {icon}
      </div>
      <div>
        <div className="text-lg font-semibold text-content-primary">{title}</div>
        <div className="mt-1 text-sm text-content-secondary">{description}</div>
        <div className="mt-3 text-xs text-brand-burgundy">進入 →</div>
      </div>
    </Link>
  );
}
