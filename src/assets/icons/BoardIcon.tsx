export default function BoardIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"
         className={className} role="img" aria-label="生活佈告欄"
         fill="none" stroke="currentColor" strokeWidth="1.5"
         strokeLinecap="round" strokeLinejoin="round">
      {/* 主板 */}
      <rect x="8" y="12" width="44" height="38" rx="2" />
      {/* 3 張便利貼 · 實心打底 */}
      <rect x="14" y="18" width="14" height="12" fill="currentColor" opacity="0.5" stroke="none" />
      <rect x="32" y="18" width="14" height="12" fill="currentColor" opacity="0.3" stroke="none" />
      <rect x="14" y="34" width="14" height="12" fill="currentColor" opacity="0.4" stroke="none" />
      {/* 圖釘 */}
      <circle cx="39" cy="40" r="3" fill="currentColor" opacity="0.7" stroke="none" />
      {/* 掛環 */}
      <path d="M 24 12 Q 24 5 30 5 Q 36 5 36 12" />
    </svg>
  );
}
