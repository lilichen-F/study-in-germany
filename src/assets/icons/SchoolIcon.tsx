/** @deprecated Phase AH：已改用 Tabler Icons，此手繪 SVG 檔案零引用，僅保留供考古參考（PAT-122） */
export default function SchoolIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"
         className={className} role="img" aria-label="語言學校"
         fill="none" stroke="currentColor" strokeWidth="1.5"
         strokeLinecap="round" strokeLinejoin="round">
      {/* 屋頂 · 實心打底 */}
      <polygon points="10,26 30,10 50,26" fill="currentColor" opacity="0.7" stroke="none" />
      {/* 校舍主體 */}
      <rect x="14" y="26" width="32" height="26" />
      {/* 窗戶 */}
      <rect x="18" y="30" width="8" height="8" opacity="0.4" fill="currentColor" stroke="none" />
      <rect x="34" y="30" width="8" height="8" opacity="0.4" fill="currentColor" stroke="none" />
      {/* 門 */}
      <rect x="26" y="40" width="8" height="12" />
      {/* 屋頂旗桿 · 區隔校舍與一般住宅意象 */}
      <line x1="30" y1="10" x2="30" y2="2" />
      <path d="M 30 2 L 38 5 L 30 8 Z" fill="currentColor" opacity="0.6" stroke="none" />
    </svg>
  );
}
