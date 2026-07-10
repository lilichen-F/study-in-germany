import { useState } from 'react';

interface Props {
  value: number;
  onChange: (v: number) => void;
  label: string;
  hint?: string;
}

/**
 * 半星選擇器 · 純 CSS
 * 點左半 → x.5、點右半 → x.0
 * 支援 hover preview
 */
export default function StarSlider({ value, onChange, label, hint }: Props) {
  const [hover, setHover] = useState<number | null>(null);
  const displayValue = hover ?? value;

  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between">
        <label className="text-sm font-medium text-content-primary">
          {label}
        </label>
        <span className="text-xs text-content-muted">
          {value > 0 ? `${value.toFixed(1)} ★` : '未評'}
        </span>
      </div>
      {hint && (
        <div className="text-xs text-content-muted leading-relaxed">
          {hint}
        </div>
      )}
      <div
        className="flex items-center gap-1 pt-1"
        onMouseLeave={() => setHover(null)}
      >
        {[1, 2, 3, 4, 5].map((n) => {
          const filled = displayValue >= n;
          const half = displayValue >= n - 0.5 && displayValue < n;
          return (
            <div key={n} className="relative w-6 h-6 flex">
              <button
                type="button"
                onMouseEnter={() => setHover(n - 0.5)}
                onClick={() => onChange(n - 0.5)}
                className="w-3 h-6 flex items-center justify-start
                           hover:scale-110 transition-transform"
                aria-label={`${label} · ${n - 0.5} 星`}
              >
                <StarHalf filled={filled || half} side="left" />
              </button>
              <button
                type="button"
                onMouseEnter={() => setHover(n)}
                onClick={() => onChange(n)}
                className="w-3 h-6 flex items-center justify-end
                           hover:scale-110 transition-transform"
                aria-label={`${label} · ${n} 星`}
              >
                <StarHalf filled={filled} side="right" />
              </button>
            </div>
          );
        })}
        {value > 0 && (
          <button
            type="button"
            onClick={() => onChange(0)}
            className="ml-3 text-xs text-content-muted hover:text-content-primary"
          >
            清除
          </button>
        )}
      </div>
    </div>
  );
}

function StarHalf({ filled, side }: { filled: boolean; side: 'left' | 'right' }) {
  const path = 'M 12 2 L 15.09 8.26 L 22 9.27 L 17 14.14 L 18.18 21.02 L 12 17.77 L 5.82 21.02 L 7 14.14 L 2 9.27 L 8.91 8.26 Z';
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-6 h-6"
      style={{ clipPath: side === 'left' ? 'inset(0 50% 0 0)' : 'inset(0 0 0 50%)' }}
    >
      <path
        d={path}
        fill={filled ? 'rgb(var(--brand-gold))' : 'rgb(var(--border-strong))'}
        stroke={filled ? 'rgb(var(--brand-gold-hover))' : 'transparent'}
        strokeWidth="0.5"
      />
    </svg>
  );
}
