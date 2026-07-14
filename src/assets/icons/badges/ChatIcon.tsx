/** @deprecated Phase AH：已改用 Tabler Icons，此手繪 SVG 檔案零引用，僅保留供考古參考（PAT-122） */
export default function ChatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"
         className={className} role="img" aria-label="討論家"
         fill="none" stroke="currentColor" strokeWidth="1.5"
         strokeLinecap="round" strokeLinejoin="round">
      {/* 對話框 */}
      <path d="M 10 15 L 46 15 Q 50 15 50 19 L 50 37 Q 50 41 46 41 L 22 41 L 14 48 L 14 41 L 10 41 Q 6 41 6 37 L 6 19 Q 6 15 10 15 Z"
            fill="currentColor" opacity="0.15" stroke="currentColor" />
      {/* 3 個對話點 */}
      <circle cx="20" cy="28" r="1.5" fill="currentColor" />
      <circle cx="28" cy="28" r="1.5" fill="currentColor" />
      <circle cx="36" cy="28" r="1.5" fill="currentColor" />
    </svg>
  );
}
