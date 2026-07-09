export default function ScholarshipIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"
         className={className} role="img" aria-label="獎學金"
         fill="none" stroke="currentColor" strokeWidth="1.5"
         strokeLinecap="round" strokeLinejoin="round">
      {/* 緞帶左 */}
      <polygon points="20,8 20,30 24,26 28,30 28,8" fill="currentColor" opacity="0.6" stroke="none" />
      {/* 緞帶右 */}
      <polygon points="32,8 32,30 36,26 40,30 40,8" fill="currentColor" opacity="0.6" stroke="none" />
      {/* 獎章 */}
      <circle cx="30" cy="40" r="12" fill="currentColor" opacity="0.2" stroke="none" />
      <circle cx="30" cy="40" r="12" />
      <circle cx="30" cy="40" r="7" />
      {/* 星星 · 獎章中央 */}
      <polygon points="30,35 31.5,39 35,39 32,41.5 33,45 30,42.5 27,45 28,41.5 25,39 28.5,39"
               fill="currentColor" stroke="none" />
    </svg>
  );
}
