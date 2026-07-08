export default function DuesseldorfIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"
         className={className} role="img" aria-label="Düsseldorf · Rheinturm">
      <path d="M 20 258 Q 100 253 200 258 T 380 258" stroke="currentColor"
            strokeWidth="2" fill="none" opacity="0.4" />
      <path d="M 20 272 Q 100 267 200 272 T 380 272" stroke="currentColor"
            strokeWidth="2" fill="none" opacity="0.3" />
      <rect x="245" y="90" width="10" height="158" fill="currentColor" />
      <ellipse cx="250" cy="90" rx="25" ry="10" fill="currentColor" />
      <rect x="230" y="90" width="40" height="15" fill="currentColor" />
      <rect x="248" y="30" width="4" height="60" fill="currentColor" />
      <rect x="80"  y="200" width="30" height="48" fill="currentColor" opacity="0.5" />
      <rect x="115" y="180" width="40" height="68" fill="currentColor" opacity="0.5" />
      <rect x="160" y="210" width="30" height="38" fill="currentColor" opacity="0.5" />
      <rect x="290" y="190" width="35" height="58" fill="currentColor" opacity="0.5" />
      <rect x="330" y="220" width="30" height="28" fill="currentColor" opacity="0.5" />
    </svg>
  );
}
