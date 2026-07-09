export default function VisaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"
         className={className} role="img" aria-label="簽證流程"
         fill="none" stroke="currentColor" strokeWidth="1.5"
         strokeLinecap="round" strokeLinejoin="round">
      {/* 護照本體 */}
      <rect x="14" y="10" width="32" height="42" rx="2" />
      {/* 護照內頁 */}
      <line x1="18" y1="14" x2="18" y2="48" />
      {/* 徽章圓形 */}
      <circle cx="30" cy="24" r="6" />
      <circle cx="30" cy="24" r="2" fill="currentColor" opacity="0.4" stroke="none" />
      {/* 資料線 */}
      <line x1="22" y1="36" x2="38" y2="36" opacity="0.5" />
      <line x1="22" y1="40" x2="38" y2="40" opacity="0.5" />
      <line x1="22" y1="44" x2="34" y2="44" opacity="0.5" />
      {/* 蓋章 · 右上角 */}
      <rect x="42" y="16" width="12" height="8" rx="1" opacity="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}
