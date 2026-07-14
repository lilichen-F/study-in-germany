/** @deprecated Phase AH：已改用 Tabler Icons，此手繪 SVG 檔案零引用，僅保留供考古參考（PAT-122） */
export default function MyPostsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"
         className={className} role="img" aria-label="我的資料"
         fill="none" stroke="currentColor" strokeWidth="1.5"
         strokeLinecap="round" strokeLinejoin="round">
      {/* 文件夾 · 大面積實心色塊 */}
      <path d="M 12 20 L 24 20 L 28 26 L 48 26 L 48 46 L 12 46 Z"
            fill="currentColor" opacity="0.3" stroke="currentColor" />
      {/* 人形頭 · 更深色塊 */}
      <circle cx="30" cy="16" r="6" fill="currentColor" opacity="0.5" stroke="currentColor" />
      {/* 肩膀線條點綴 */}
      <path d="M 20 24 Q 30 18 40 24" opacity="0.6" />
    </svg>
  );
}
