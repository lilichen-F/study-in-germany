export default function PioneerIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"
         className={className} role="img" aria-label="先鋒徽章"
         fill="none" stroke="currentColor" strokeWidth="1.5"
         strokeLinecap="round" strokeLinejoin="round">
      {/* 六角星 · 象徵領先 */}
      <path d="M 30 8
               L 34 18 L 45 18 L 37 26 L 40 37 L 30 30
               L 20 37 L 23 26 L 15 18 L 26 18 Z"
            fill="currentColor" opacity="0.15" stroke="none" />
      <path d="M 30 8
               L 34 18 L 45 18 L 37 26 L 40 37 L 30 30
               L 20 37 L 23 26 L 15 18 L 26 18 Z" />
      {/* 光芒 · 4 方向 */}
      <line x1="30" y1="2" x2="30" y2="4" opacity="0.5" />
      <line x1="52" y1="30" x2="54" y2="30" opacity="0.5" />
      <line x1="30" y1="52" x2="30" y2="54" opacity="0.5" />
      <line x1="8" y1="30" x2="6" y2="30" opacity="0.5" />
    </svg>
  );
}
