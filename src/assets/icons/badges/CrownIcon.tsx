export default function CrownIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"
         className={className} role="img" aria-label="全能達人"
         fill="none" stroke="currentColor" strokeWidth="1.5"
         strokeLinecap="round" strokeLinejoin="round">
      {/* 皇冠 */}
      <path d="M 10 40 L 12 22 L 22 30 L 30 15 L 38 30 L 48 22 L 50 40 Z"
            fill="currentColor" opacity="0.2" stroke="currentColor" />
      {/* 底座 */}
      <rect x="10" y="40" width="40" height="6"
            fill="currentColor" opacity="0.15" stroke="currentColor" />
      {/* 3 顆寶石 */}
      <circle cx="22" cy="30" r="1.5" fill="currentColor" />
      <circle cx="30" cy="18" r="1.5" fill="currentColor" />
      <circle cx="38" cy="30" r="1.5" fill="currentColor" />
    </svg>
  );
}
