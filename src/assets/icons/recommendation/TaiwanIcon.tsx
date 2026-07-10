export default function TaiwanIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"
         className={className} role="img" aria-label="台灣海外方案"
         fill="none" stroke="currentColor" strokeWidth="1.5"
         strokeLinecap="round" strokeLinejoin="round">
      {/* 抽象化的台灣島 · 簡化為長橢圓 */}
      <path d="M 25 8
               Q 32 10 34 20
               Q 36 30 32 42
               Q 30 50 26 52
               Q 22 50 22 42
               Q 20 30 22 20
               Q 22 12 25 8 Z"
            fill="currentColor" opacity="0.6" stroke="none" />
      <path d="M 25 8
               Q 32 10 34 20
               Q 36 30 32 42
               Q 30 50 26 52
               Q 22 50 22 42
               Q 20 30 22 20
               Q 22 12 25 8 Z" />
      {/* 台灣位置的星星 · 象徵台北 */}
      <path d="M 27 22 L 28.5 25 L 32 25 L 29.5 27.5 L 30.5 31 L 27.5 29 L 24.5 31 L 25.5 27.5 L 23 25 L 26.5 25 Z"
            fill="currentColor" opacity="0.4" stroke="none" strokeWidth="0.5" />
    </svg>
  );
}
