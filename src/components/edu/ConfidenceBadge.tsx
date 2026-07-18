import type { Confidence } from '../../data/edu/visaCards';
import { CONFIDENCE_LABEL, CONFIDENCE_LABEL_SHORT } from '../../data/edu/visaCards';

/**
 * 信心分級徽章共用元件（原為 VisaCardItem.tsx 內部元件，Phase BS 抽出
 * 供 FinanceEstimator.tsx 共用同一套顏色/圖示視覺信號系統，避免複製
 * 貼上——PAT-179 建立的「精簡不得犧牲視覺信號系統」原則延伸適用）。
 */
export const CONFIDENCE_STYLE: Record<Confidence, string> = {
  official: 'bg-state-success/15 border-state-success text-state-success',
  'alt-high': 'bg-brand-gold text-white border-brand-gold',
  'alt-medium': 'bg-brand-gold-soft border-brand-gold/50 text-content-primary',
  gap: 'bg-surface-hover border-border-subtle border-dashed text-content-muted',
};

export const CONFIDENCE_ICON: Record<Confidence, string> = {
  official: '✓',
  'alt-high': '◐',
  'alt-medium': '~',
  gap: '?',
};

export function ConfidenceBadge({ confidence }: { confidence: Confidence }) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] font-medium px-1.5 py-0.5
                  rounded border shrink-0 ${CONFIDENCE_STYLE[confidence]}`}
    >
      <span aria-hidden>{CONFIDENCE_ICON[confidence]}</span>
      {CONFIDENCE_LABEL[confidence]}
    </span>
  );
}

export function SummaryConfidenceBadge({ confidence }: { confidence: Confidence }) {
  return (
    <span
      className={`inline-flex items-center gap-0.5 text-[10px] font-medium px-1 py-0.5
                  rounded border shrink-0 whitespace-nowrap ${CONFIDENCE_STYLE[confidence]}`}
    >
      <span aria-hidden>{CONFIDENCE_ICON[confidence]}</span>
      {CONFIDENCE_LABEL_SHORT[confidence]}
    </span>
  );
}
