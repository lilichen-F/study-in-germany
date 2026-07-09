export default function RenewalIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"
         className={className} role="img" aria-label="延簽流程"
         fill="none" stroke="currentColor" strokeWidth="1.5"
         strokeLinecap="round" strokeLinejoin="round">
      {/* 循環箭頭 · 外圈 */}
      <path d="M 12 30 A 18 18 0 0 1 48 30" />
      <polyline points="42,24 48,30 42,36" />
      <path d="M 48 30 A 18 18 0 0 1 12 30" opacity="0.5" />
      <polyline points="18,36 12,30 18,24" opacity="0.5" />
      {/* 中央時鐘 */}
      <circle cx="30" cy="30" r="8" fill="currentColor" opacity="0.15" stroke="none" />
      <circle cx="30" cy="30" r="8" />
      <line x1="30" y1="30" x2="30" y2="25" />
      <line x1="30" y1="30" x2="34" y2="30" />
    </svg>
  );
}
