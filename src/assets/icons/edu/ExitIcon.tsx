/** @deprecated Phase AH：已改用 Tabler Icons，此手繪 SVG 檔案零引用，僅保留供考古參考（PAT-122） */
export default function ExitIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"
         className={className} role="img" aria-label="離開指南"
         fill="none" stroke="currentColor" strokeWidth="1.5"
         strokeLinecap="round" strokeLinejoin="round">
      {/* 門框 */}
      <path d="M 12 12 L 12 48 L 48 48 L 48 12 Z" opacity="0.3" />
      {/* 開門的一片 */}
      <path d="M 12 12 L 12 48 L 30 44 L 30 16 Z" fill="currentColor" opacity="0.7" stroke="none" />
      {/* 門邊框強調 */}
      <line x1="30" y1="16" x2="30" y2="44" strokeWidth="2" />
      {/* 出口箭頭 */}
      <polyline points="38,25 46,30 38,35" />
      <line x1="30" y1="30" x2="46" y2="30" />
      {/* 台灣方向的箭頭 */}
      <line x1="52" y1="24" x2="55" y2="24" opacity="0.5" />
      <line x1="52" y1="30" x2="55" y2="30" opacity="0.5" />
      <line x1="52" y1="36" x2="55" y2="36" opacity="0.5" />
    </svg>
  );
}
