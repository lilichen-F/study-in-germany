export default function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"
         className={className} role="img" aria-label="評價達人"
         fill="none" stroke="currentColor" strokeWidth="1.5"
         strokeLinecap="round" strokeLinejoin="round">
      {/* 五角星 · 象徵評價 */}
      <path d="M 30 6 L 35 22 L 52 22 L 38 32 L 42 48 L 30 40 L 18 48 L 22 32 L 8 22 L 25 22 Z"
            fill="currentColor" opacity="0.15" stroke="none" />
      <path d="M 30 6 L 35 22 L 52 22 L 38 32 L 42 48 L 30 40 L 18 48 L 22 32 L 8 22 L 25 22 Z" />
      {/* 內圈裝飾 */}
      <circle cx="30" cy="30" r="4" fill="currentColor" opacity="0.6" />
    </svg>
  );
}
