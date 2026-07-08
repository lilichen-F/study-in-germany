export default function FallbackIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"
         className={className} role="img" aria-label="德國城市">
      <rect x="20" y="248" width="360" height="4" fill="currentColor" />
      <polygon points="140,150 200,90 260,150" fill="currentColor" />
      <rect x="150" y="150" width="100" height="98" fill="currentColor" opacity="0.7" />
      <rect x="188" y="200" width="24" height="48" fill="currentColor" opacity="0.4" />
      <rect x="165" y="170" width="20" height="20" fill="currentColor" opacity="0.4" />
      <rect x="215" y="170" width="20" height="20" fill="currentColor" opacity="0.4" />
    </svg>
  );
}
