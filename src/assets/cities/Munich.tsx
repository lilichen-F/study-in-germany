export default function MunichIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"
         className={className} role="img" aria-label="München · Frauenkirche">
      <rect x="20" y="248" width="360" height="4" fill="currentColor" />
      <rect x="130" y="140" width="140" height="108" fill="currentColor" opacity="0.6" />
      <rect x="130" y="80" width="50" height="80" fill="currentColor" />
      <rect x="220" y="80" width="50" height="80" fill="currentColor" />
      <ellipse cx="155" cy="65" rx="30" ry="35" fill="currentColor" />
      <ellipse cx="245" cy="65" rx="30" ry="35" fill="currentColor" />
      <rect x="153" y="15" width="4" height="20" fill="currentColor" />
      <rect x="243" y="15" width="4" height="20" fill="currentColor" />
      <rect x="180" y="180" width="40" height="68" fill="currentColor" opacity="0.4" />
    </svg>
  );
}
