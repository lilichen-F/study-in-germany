/** @deprecated Phase AH：已改用 Tabler Icons，此手繪 SVG 檔案零引用，僅保留供考古參考（PAT-122） */
export default function GeneralIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"
         className={className} role="img" aria-label="通用推薦"
         fill="none" stroke="currentColor" strokeWidth="1.5"
         strokeLinecap="round" strokeLinejoin="round">
      {/* 星形（多用途、萬用工具）+ 光芒 */}
      <path d="M 30 8 L 34 22 L 48 22 L 37 30 L 41 44 L 30 36 L 19 44 L 23 30 L 12 22 L 26 22 Z"
            fill="currentColor" opacity="0.15" stroke="none" />
      <path d="M 30 8 L 34 22 L 48 22 L 37 30 L 41 44 L 30 36 L 19 44 L 23 30 L 12 22 L 26 22 Z" />
      {/* 光芒射線 · 8 方向 */}
      <line x1="30" y1="2" x2="30" y2="4" opacity="0.5" />
      <line x1="54" y1="8" x2="52" y2="10" opacity="0.5" />
      <line x1="58" y1="30" x2="56" y2="30" opacity="0.5" />
      <line x1="54" y1="52" x2="52" y2="50" opacity="0.5" />
      <line x1="30" y1="58" x2="30" y2="56" opacity="0.5" />
      <line x1="6" y1="52" x2="8" y2="50" opacity="0.5" />
      <line x1="2" y1="30" x2="4" y2="30" opacity="0.5" />
      <line x1="6" y1="8" x2="8" y2="10" opacity="0.5" />
    </svg>
  );
}
