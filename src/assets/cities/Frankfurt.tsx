export default function FrankfurtIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"
         className={className} role="img" aria-label="Frankfurt · Skyline">
      <rect x="20" y="248" width="360" height="4" fill="currentColor" />
      <rect x="30" y="180" width="50" height="68" fill="currentColor" opacity="0.55" />
      <rect x="85" y="120" width="45" height="128" fill="currentColor" />
      <rect x="135" y="150" width="35" height="98" fill="currentColor" opacity="0.7" />
      <rect x="175" y="80" width="55" height="168" fill="currentColor" />
      <rect x="200" y="50" width="4" height="30" fill="currentColor" />
      <rect x="235" y="140" width="40" height="108" fill="currentColor" opacity="0.7" />
      <rect x="280" y="100" width="50" height="148" fill="currentColor" />
      <rect x="335" y="170" width="40" height="78" fill="currentColor" opacity="0.55" />
    </svg>
  );
}
