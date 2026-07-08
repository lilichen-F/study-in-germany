export default function EduIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none"
         stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
         strokeLinejoin="round" className={className}>
      {/* 開書 · 學術意象 */}
      <path d="M3 5.5c3-1 6-1 9 0v14c-3-1-6-1-9 0z" />
      <path d="M21 5.5c-3-1-6-1-9 0v14c3-1 6-1 9 0z" />
      <path d="M12 5.5v14" />
    </svg>
  );
}
