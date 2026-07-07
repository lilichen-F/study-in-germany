import type { SchoolReview } from '../lib/types';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/useAuth';

interface Props {
  reviews: SchoolReview[];
  onDeleted?: () => void;
}

function Stars({ n, label }: { n: number; label: string }) {
  return (
    <div className="flex items-center gap-1 text-xs">
      <span className="text-content-muted">{label}</span>
      <span className="text-brand-gold">
        {'★'.repeat(n)}
        <span className="text-border-strong">{'★'.repeat(5 - n)}</span>
      </span>
    </div>
  );
}

const DIM_LABEL: Record<string, string> = {
  overall: '整體',
  teaching: '教學',
  material: '教材',
  admin: '行政',
  environment: '環境',
  transport: '交通',
  price: '價格',
};

export default function ReviewList({ reviews, onDeleted }: Props) {
  const { user } = useAuth();

  if (reviews.length === 0) {
    return (
      <div className="card text-sm text-content-muted">
        還沒有評價。第一個留下心得吧。
      </div>
    );
  }

  const handleDelete = async (id: number) => {
    if (!confirm('確定刪除這則評價？此動作無法復原。')) return;
    const { error } = await supabase.from('school_reviews').delete().eq('id', id);
    if (error) { alert(`刪除失敗：${error.message}`); return; }
    onDeleted?.();
  };

  return (
    <div className="space-y-3">
      {reviews.map((r) => {
        const entries = Object.entries(r.stars).filter(
          ([, v]) => typeof v === 'number'
        ) as [string, number][];
        return (
          <div key={r.id} className="card">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                {r.profile?.avatar_url ? (
                  <img
                    src={r.profile.avatar_url}
                    alt=""
                    className="w-8 h-8 rounded-full"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-surface-hover" />
                )}
                <div className="min-w-0">
                  <div className="text-sm text-content-primary truncate">
                    {r.profile?.display_name ?? '匿名使用者'}
                  </div>
                  <div className="text-xs text-content-muted">
                    {new Date(r.created_at).toLocaleDateString('zh-Hant')}
                  </div>
                </div>
              </div>
              {user?.id === r.user_id && (
                <button
                  onClick={() => handleDelete(r.id)}
                  className="btn-danger text-xs px-2 py-1"
                >
                  刪除
                </button>
              )}
            </div>

            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
              {entries.map(([key, v]) => (
                <Stars key={key} n={v} label={DIM_LABEL[key] ?? key} />
              ))}
            </div>

            <p className="mt-3 text-sm text-content-secondary whitespace-pre-wrap">
              {r.comment_text}
            </p>
          </div>
        );
      })}
    </div>
  );
}
