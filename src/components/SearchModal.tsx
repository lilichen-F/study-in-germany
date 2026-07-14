import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchAll, type SearchHit } from '../lib/search';
import SearchIcon from '../assets/icons/SearchIcon';

interface Props {
  open: boolean;
  onClose: () => void;
}

const KIND_LABEL: Record<SearchHit['kind'], string> = {
  school: '語校',
  faq: 'FAQ',
  announcement: '公告',
  edu: '作戰手冊',
};

export default function SearchModal({ open, onClose }: Props) {
  const [q, setQ] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const hits = searchAll(q);

  useEffect(() => {
    if (open) {
      setQ('');
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => setSelected(0), [q]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'ArrowDown' && hits.length > 0) {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, hits.length - 1));
      }
      if (e.key === 'ArrowUp' && hits.length > 0) {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      }
      if (e.key === 'Enter' && hits[selected]) {
        e.preventDefault();
        navigate(hits[selected].url);
        onClose();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, hits, selected, navigate, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label="全站搜尋"
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm
                 flex items-start justify-center pt-20 sm:pt-32 px-4"
      onClick={onClose}
    >
      <div
        className="bg-surface-card border border-border-subtle rounded-card
                   w-full max-w-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border-subtle">
          <SearchIcon className="w-4 h-4 text-content-muted shrink-0" />
          <input
            ref={inputRef}
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="搜尋語校、FAQ、公告…"
            className="flex-1 bg-transparent outline-none text-sm text-content-primary
                       placeholder:text-content-muted"
          />
          <kbd className="text-xs text-content-muted border border-border-subtle
                         rounded px-1.5 py-0.5">
            ESC
          </kbd>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {q.length === 0 ? (
            <div className="p-8 text-center text-sm text-content-muted">
              輸入關鍵字開始搜尋
            </div>
          ) : hits.length === 0 ? (
            <div className="p-8 text-center text-sm text-content-muted">
              找不到「{q}」相關結果
            </div>
          ) : (
            <div className="divide-y divide-border-subtle">
              {hits.map((h, i) => (
                <button
                  key={`${h.kind}-${h.id}`}
                  onClick={() => { navigate(h.url); onClose(); }}
                  onMouseEnter={() => setSelected(i)}
                  className={`w-full text-left px-4 py-3 transition-colors
                              ${i === selected ? 'bg-surface-hover' : ''}`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-1.5 py-0.5 rounded bg-brand-gold-soft
                                    text-brand-burgundy font-medium">
                      {KIND_LABEL[h.kind]}
                    </span>
                    <span className="text-sm text-content-primary font-medium truncate">
                      {h.title}
                    </span>
                  </div>
                  <div className="text-xs text-content-muted mt-1 truncate">
                    {h.subtitle}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {hits.length > 0 && (
          <div className="px-4 py-2 border-t border-border-subtle
                          flex items-center justify-between text-xs text-content-muted">
            <div className="flex gap-3">
              <span>↑↓ 移動</span>
              <span>↵ 前往</span>
            </div>
            <span>{hits.length} 項</span>
          </div>
        )}
      </div>
    </div>
  );
}
