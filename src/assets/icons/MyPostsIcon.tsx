export default function MyPostsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"
         className={className} role="img" aria-label="我的資料"
         fill="none" stroke="currentColor" strokeWidth="1.5"
         strokeLinecap="round" strokeLinejoin="round">
      {/* 文件夾 · 實心打底 */}
      <path d="M 10 18 L 24 18 L 28 24 L 50 24 L 50 46 L 10 46 Z"
            fill="currentColor" opacity="0.15" stroke="currentColor" />
      {/* 人形頭 · 實心 */}
      <circle cx="30" cy="14" r="7" fill="currentColor" opacity="0.6" stroke="none" />
      {/* 人形肩膀 */}
      <path d="M 18 24 Q 30 15 42 24" />
      {/* 文字列 */}
      <line x1="18" y1="34" x2="42" y2="34" opacity="0.5" />
      <line x1="18" y1="39" x2="34" y2="39" opacity="0.5" />
    </svg>
  );
}
