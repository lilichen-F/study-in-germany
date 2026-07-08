export default function BerlinIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"
         className={className} role="img" aria-label="Berlin · Brandenburger Tor">
      <rect x="20" y="240" width="360" height="8" fill="currentColor" />
      <rect x="30" y="60" width="340" height="12" fill="currentColor" opacity="0.6" />
      <rect x="20" y="80" width="360" height="20" fill="currentColor" />
      <rect x="170" y="45" width="60" height="18" fill="currentColor" opacity="0.55" />
      <rect x="192" y="28" width="16" height="17" fill="currentColor" opacity="0.55" />
      <rect x="50" y="100" width="18" height="140" fill="currentColor" />
      <rect x="110" y="100" width="18" height="140" fill="currentColor" />
      <rect x="170" y="100" width="18" height="140" fill="currentColor" />
      <rect x="212" y="100" width="18" height="140" fill="currentColor" />
      <rect x="272" y="100" width="18" height="140" fill="currentColor" />
      <rect x="332" y="100" width="18" height="140" fill="currentColor" />
    </svg>
  );
}
