export default function PortalRecommendationIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"
         className={className} role="img" aria-label="推薦"
         fill="none" stroke="currentColor" strokeWidth="1.5"
         strokeLinecap="round" strokeLinejoin="round">
      {/* 五角星 · 大面積實心填色 */}
      <path d="M 30 8 L 35 22 L 50 22 L 38 31 L 42 46 L 30 37 L 18 46 L 22 31 L 10 22 L 25 22 Z"
            fill="currentColor" opacity="0.4" stroke="currentColor" />
      {/* 中心點綴 */}
      <circle cx="30" cy="28" r="3" fill="currentColor" opacity="0.7" stroke="none" />
    </svg>
  );
}
