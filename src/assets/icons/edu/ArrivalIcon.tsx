export default function ArrivalIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"
         className={className} role="img" aria-label="落地指南"
         fill="none" stroke="currentColor" strokeWidth="1.5"
         strokeLinecap="round" strokeLinejoin="round">
      {/* 建築屋頂 */}
      <polygon points="10,26 30,10 50,26" fill="currentColor" opacity="0.7" stroke="none" />
      {/* 建築主體 */}
      <rect x="14" y="26" width="32" height="26" />
      {/* 窗戶 */}
      <rect x="18" y="30" width="8" height="8" opacity="0.4" fill="currentColor" stroke="none" />
      <rect x="34" y="30" width="8" height="8" opacity="0.4" fill="currentColor" stroke="none" />
      <rect x="18" y="42" width="8" height="8" opacity="0.4" fill="currentColor" stroke="none" />
      {/* 門 */}
      <rect x="32" y="40" width="10" height="12" />
      <circle cx="40" cy="46" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}
