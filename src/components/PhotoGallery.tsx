import { useEffect, useState } from 'react';

interface Props {
  photos: string[];
}

export default function PhotoGallery({ photos }: Props) {
  const [idx, setIdx] = useState<number | null>(null);

  useEffect(() => {
    if (idx === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIdx(null);
      else if (e.key === 'ArrowLeft' && idx > 0) setIdx(idx - 1);
      else if (e.key === 'ArrowRight' && idx < photos.length - 1) setIdx(idx + 1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [idx, photos.length]);

  if (photos.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {photos.map((url, i) => (
          <button
            key={url}
            onClick={() => setIdx(i)}
            aria-label={`檢視第 ${i + 1} 張照片`}
            className="aspect-square rounded-lg overflow-hidden border border-border-subtle
                       hover:border-border-strong transition-colors"
          >
            <img src={url} alt="" loading="lazy" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
      {idx !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIdx(null)}
          role="dialog"
          aria-label="照片檢視"
        >
          <img
            src={photos[idx]}
            alt=""
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={() => setIdx(null)}
            aria-label="關閉"
          >
            ✕
          </button>
          {idx > 0 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl
                         bg-black/40 rounded-full w-10 h-10 flex items-center justify-center"
              onClick={(e) => { e.stopPropagation(); setIdx(idx - 1); }}
              aria-label="上一張"
            >
              ‹
            </button>
          )}
          {idx < photos.length - 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl
                         bg-black/40 rounded-full w-10 h-10 flex items-center justify-center"
              onClick={(e) => { e.stopPropagation(); setIdx(idx + 1); }}
              aria-label="下一張"
            >
              ›
            </button>
          )}
        </div>
      )}
    </>
  );
}
