export default function RecommendationIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" fill="none"
         stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
         strokeLinejoin="round" className={className} role="img" aria-label="推薦">
      {/* 星形推薦 · 五角星 */}
      <path d="M 30 8 L 36 22 L 52 24 L 40 34 L 44 50 L 30 42 L 16 50 L 20 34 L 8 24 L 24 22 Z" />
      {/* 光芒線 */}
      <line x1="30" y1="2" x2="30" y2="5" opacity="0.5" />
      <line x1="54" y1="22" x2="57" y2="21" opacity="0.5" />
      <line x1="52" y1="50" x2="54" y2="52" opacity="0.5" />
      <line x1="8" y1="50" x2="6" y2="52" opacity="0.5" />
      <line x1="6" y1="22" x2="3" y2="21" opacity="0.5" />
    </svg>
  );
}
