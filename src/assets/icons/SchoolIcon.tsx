export default function SchoolIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none"
         stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
         strokeLinejoin="round" className={className}>
      <path d="M3 21h18M4 21V10l8-4 8 4v11M9 21v-6h6v6" />
    </svg>
  );
}
