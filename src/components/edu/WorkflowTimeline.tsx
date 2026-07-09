import type { WorkflowStep } from '../../data/edu/workflow';

interface Props {
  steps: WorkflowStep[];
  currentStep?: number;
  onStepClick?: (step: number) => void;
}

/**
 * DS v4.2 §七 · 流程 Timeline
 * Desktop: ○────○────○ 水平（step + label 下方）
 * Mobile: 橫向滾動 · scroll-snap
 * 純 CSS · 零 SVG · 零 JS 動畫
 */
export default function WorkflowTimeline({ steps, currentStep, onStepClick }: Props) {
  return (
    <div className="overflow-x-auto snap-x scroll-smooth
                    [scrollbar-width:thin]
                    [scrollbar-color:rgb(var(--border-strong))_transparent]">
      <ol className="flex items-start gap-2 sm:gap-0 sm:justify-between
                     min-w-max sm:min-w-full pb-3 pt-2 relative">
        {/* 背景橫線 · 連結所有 step */}
        <div
          className="hidden sm:block absolute top-[10px] left-0 right-0 h-0.5
                     bg-border-subtle -z-0"
          aria-hidden="true"
        />
        {steps.map((s) => {
          const isActive = s.step === currentStep;
          return (
            <li
              key={s.step}
              className="flex-shrink-0 snap-start flex flex-col items-center
                         w-24 sm:w-auto sm:flex-1 relative z-10"
            >
              <button
                onClick={() => onStepClick?.(s.step)}
                aria-current={isActive ? 'step' : undefined}
                aria-label={`Step ${s.step} · ${s.title_zh}`}
                className={`w-5 h-5 rounded-full border-2 flex items-center
                            justify-center transition-all duration-150
                            ${
                              isActive
                                ? 'bg-brand-burgundy border-brand-burgundy scale-110'
                                : 'bg-surface-canvas border-border-strong hover:border-brand-burgundy'
                            }`}
              >
                <span className="sr-only">Step {s.step}</span>
              </button>
              <div className="mt-2 text-center">
                <div className={`text-xs font-medium
                                ${isActive ? 'text-brand-burgundy' : 'text-content-muted'}`}>
                  STEP {String(s.step).padStart(2, '0')}
                </div>
                <div className={`text-xs mt-0.5 leading-tight
                                ${isActive ? 'text-content-primary font-medium' : 'text-content-secondary'}`}>
                  {s.title_zh}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
