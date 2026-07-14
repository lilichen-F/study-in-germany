/** @deprecated Phase AH：已改用 Tabler Icons，此手繪 SVG 檔案零引用，僅保留供考古參考（PAT-122） */
export default function ApplicationIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"
         className={className} role="img" aria-label="學程申請"
         fill="none" stroke="currentColor" strokeWidth="1.5"
         strokeLinecap="round" strokeLinejoin="round">
      {/* 學士帽頂 */}
      <polygon points="10,20 30,10 50,20 30,30" fill="currentColor" opacity="0.7" stroke="none" />
      <polyline points="10,20 30,30 50,20" />
      {/* 學士帽穗 */}
      <line x1="50" y1="20" x2="52" y2="30" />
      <circle cx="52" cy="32" r="1.5" fill="currentColor" stroke="none" />
      {/* 建築底座 */}
      <rect x="16" y="36" width="28" height="16" />
      {/* 柱子 */}
      <line x1="20" y1="40" x2="20" y2="52" opacity="0.5" />
      <line x1="26" y1="40" x2="26" y2="52" opacity="0.5" />
      <line x1="34" y1="40" x2="34" y2="52" opacity="0.5" />
      <line x1="40" y1="40" x2="40" y2="52" opacity="0.5" />
    </svg>
  );
}
