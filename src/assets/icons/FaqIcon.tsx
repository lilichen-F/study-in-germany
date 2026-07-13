export default function FaqIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"
         className={className} role="img" aria-label="常見問答"
         fill="none" stroke="currentColor" strokeWidth="1.5"
         strokeLinecap="round" strokeLinejoin="round">
      {/* 對話框 · 實心打底 + 清晰邊線（雙繪法，比照 StarIcon 手法） */}
      <path d="M 10 12 L 46 12 Q 52 12 52 18 L 52 36 Q 52 42 46 42 L 26 42 L 16 52 L 16 42 L 14 42 Q 8 42 8 36 L 8 18 Q 8 12 14 12 Z"
            fill="currentColor" opacity="0.15" stroke="none" />
      <path d="M 10 12 L 46 12 Q 52 12 52 18 L 52 36 Q 52 42 46 42 L 26 42 L 16 52 L 16 42 L 14 42 Q 8 42 8 36 L 8 18 Q 8 12 14 12 Z" />
      {/* 問號 */}
      <path d="M 24 22 Q 24 16 30 16 Q 36 16 36 22 Q 36 26 30 28 L 30 31"
            strokeWidth="2.5" fill="none" />
      <circle cx="30" cy="36" r="1.8" fill="currentColor" stroke="none" />
    </svg>
  );
}
