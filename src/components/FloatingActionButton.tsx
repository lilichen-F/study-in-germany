interface Props {
  onClick: () => void;
}

export default function FloatingActionButton({ onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="刊登新貼文"
      className="fixed bottom-6 right-6 z-40
                 w-14 h-14 rounded-full
                 bg-brand-burgundy text-white
                 shadow-lg hover:shadow-xl hover:scale-105
                 transition-all flex items-center justify-center"
    >
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none"
           stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    </button>
  );
}
