export default function FaqIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"
         className={className} role="img" aria-label="常見問答"
         fill="none" stroke="currentColor" strokeWidth="1.5"
         strokeLinecap="round" strokeLinejoin="round">
      {/* 對話框 · 大面積實心色塊 */}
      <path d="M 10 14 L 46 14 Q 50 14 50 18 L 50 36 Q 50 40 46 40 L 26 40 L 16 48 L 16 40 L 14 40 Q 10 40 10 36 L 10 18 Q 10 14 14 14 Z"
            fill="currentColor" opacity="0.35" stroke="currentColor" />
      {/* 問號 · 線條點綴 */}
      <path d="M 25 24 Q 25 19 30 19 Q 35 19 35 24 Q 35 27 30 29 L 30 31"
            strokeWidth="2.5" fill="none" />
      <circle cx="30" cy="35" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
