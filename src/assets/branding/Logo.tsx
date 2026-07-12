interface Props {
  className?: string;
  variant?: 'mark' | 'full';  // mark = 純圖 · full = 圖 + 文字
}

/**
 * 留德華 · Logo Mark
 *
 * 設計語言：
 *   - Brandenburger Tor 抽象化（開放拱形 = 留德入口）
 *   - 拱下一個上升書本符號（往上、學習）
 *   - 酒紅為主體、金為點綴（DS v4.1 Morandi）
 *   - 8 個基本幾何圖形完成（符合 DS v4.1 spec §七「幾何化」5-10 個原則）
 *
 * 使用：
 *   <Logo />                    → 純圖 mark（Header 用）
 *   <Logo variant="full" />     → 圖 + 文字（Footer / 空狀態 / 分享圖用）
 */
export default function Logo({ className, variant = 'mark' }: Props) {
  if (variant === 'full') {
    return (
      <span className={`inline-flex items-center gap-2 ${className ?? ''}`}>
        <LogoMark className="w-8 h-8" />
        <span className="font-semibold text-content-primary tracking-tight">
          留德華
        </span>
      </span>
    );
  }
  return <LogoMark className={className} />;
}

function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="留德華"
    >
      {/* 拱形頂（Brandenburger Tor 抽象化） */}
      <path
        d="M 6 14 Q 20 4 34 14 L 34 18 L 6 18 Z"
        fill="rgb(var(--brand-burgundy))"
      />
      {/* 柱 · 左 */}
      <rect x="7" y="18" width="4" height="14" fill="rgb(var(--brand-burgundy))" />
      {/* 柱 · 中左 */}
      <rect x="13" y="18" width="4" height="14" fill="rgb(var(--brand-burgundy))" opacity="0.65" />
      {/* 柱 · 中右 */}
      <rect x="23" y="18" width="4" height="14" fill="rgb(var(--brand-burgundy))" opacity="0.65" />
      {/* 柱 · 右 */}
      <rect x="29" y="18" width="4" height="14" fill="rgb(var(--brand-burgundy))" />
      {/* 底座 */}
      <rect x="4" y="32" width="32" height="3" fill="rgb(var(--brand-burgundy))" />
      {/* 金色書本 · 拱下中央（往上學習意象） */}
      <path
        d="M 17 22 L 20 20 L 23 22 L 23 28 L 20 26 L 17 28 Z"
        fill="rgb(var(--brand-gold))"
      />
      {/* 書本中線 */}
      <line x1="20" y1="20" x2="20" y2="26" stroke="rgb(var(--surface-canvas))" strokeWidth="0.8" />
    </svg>
  );
}
