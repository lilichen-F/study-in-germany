/** @deprecated Phase AH：已改用 Tabler Icons，此手繪 SVG 檔案零引用，僅保留供考古參考（PAT-122） */
export default function QuillIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"
         className={className} role="img" aria-label="貼文達人"
         fill="none" stroke="currentColor" strokeWidth="1.5"
         strokeLinecap="round" strokeLinejoin="round">
      {/* 書卷 · 象徵發文 */}
      <rect x="12" y="10" width="36" height="42" rx="2"
            fill="currentColor" opacity="0.1" stroke="currentColor" />
      {/* 內頁 · 3 條裝飾線 */}
      <line x1="18" y1="18" x2="42" y2="18" opacity="0.5" />
      <line x1="18" y1="25" x2="42" y2="25" opacity="0.5" />
      <line x1="18" y1="32" x2="42" y2="32" opacity="0.5" />
      {/* 筆尖 · 於右下 */}
      <path d="M 38 40 L 45 33 L 47 35 L 40 42 Z"
            fill="currentColor" opacity="0.4" stroke="currentColor" />
    </svg>
  );
}
