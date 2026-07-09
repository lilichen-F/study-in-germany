export default function PolicyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"
         className={className} role="img" aria-label="教育政策"
         fill="none" stroke="currentColor" strokeWidth="1.5"
         strokeLinecap="round" strokeLinejoin="round">
      {/* 法典本體 */}
      <rect x="14" y="14" width="32" height="38" />
      {/* 書脊 */}
      <rect x="14" y="14" width="4" height="38" fill="currentColor" opacity="0.4" stroke="none" />
      {/* 資料線 */}
      <line x1="22" y1="24" x2="42" y2="24" opacity="0.5" />
      <line x1="22" y1="30" x2="42" y2="30" opacity="0.5" />
      <line x1="22" y1="36" x2="38" y2="36" opacity="0.5" />
      <line x1="22" y1="42" x2="42" y2="42" opacity="0.5" />
      {/* 天平 · 頂部 */}
      <line x1="20" y1="6" x2="40" y2="6" />
      <line x1="30" y1="6" x2="30" y2="14" />
      <circle cx="20" cy="6" r="2" fill="currentColor" stroke="none" />
      <circle cx="40" cy="6" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}
