/** @deprecated Phase AH：已改用 Tabler Icons，此手繪 SVG 檔案零引用，僅保留供考古參考（PAT-122） */
export default function EduIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"
         className={className} role="img" aria-label="作戰手冊"
         fill="none" stroke="currentColor" strokeWidth="1.5"
         strokeLinecap="round" strokeLinejoin="round">
      {/* 左頁 · 實心色塊 */}
      <path d="M 30 16 L 30 46 L 12 42 L 12 20 Z"
            fill="currentColor" opacity="0.3" stroke="currentColor" />
      {/* 右頁 · 較深實心色塊 */}
      <path d="M 30 16 L 30 46 L 48 42 L 48 20 Z"
            fill="currentColor" opacity="0.45" stroke="currentColor" />
      {/* 書脊線條點綴 */}
      <line x1="30" y1="16" x2="30" y2="46" strokeWidth="2" />
    </svg>
  );
}
