export default function BoardIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none"
         stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
         strokeLinejoin="round" className={className}>
      <rect x="4" y="4" width="16" height="16" rx="1" />
      <line x1="4" y1="9" x2="20" y2="9" />
      <rect x="7" y="12" width="4" height="3" fill="currentColor" stroke="none" opacity="0.35" />
      <rect x="13" y="12" width="4" height="3" fill="currentColor" stroke="none" opacity="0.35" />
    </svg>
  );
}
