/** @deprecated Phase AH：已改用 Tabler Icons，此手繪 SVG 檔案零引用，僅保留供考古參考（PAT-122） */
export default function HandshakeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"
         className={className} role="img" aria-label="貢獻達人"
         fill="none" stroke="currentColor" strokeWidth="1.5"
         strokeLinecap="round" strokeLinejoin="round">
      {/* 十字 · 象徵貢獻 · 於圓框內 */}
      <circle cx="30" cy="30" r="18"
              fill="currentColor" opacity="0.15" stroke="currentColor" />
      <line x1="30" y1="16" x2="30" y2="44" strokeWidth="2" />
      <line x1="16" y1="30" x2="44" y2="30" strokeWidth="2" />
    </svg>
  );
}
