import type { Listing } from '../lib/types';
import { LISTING_TYPE_LABEL } from '../lib/types';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/useAuth';
import { deletePhoto } from '../lib/storage';
import PhotoGallery from './PhotoGallery';

interface Props {
  listings: Listing[];
  onDeleted?: () => void;
}

export default function BoardList({ listings, onDeleted }: Props) {
  const { user } = useAuth();

  if (listings.length === 0) {
    return (
      <div className="card text-sm text-content-muted">目前沒有符合條件的貼文。</div>
    );
  }

  const handleDelete = async (l: Listing) => {
    if (!confirm('確定刪除這則貼文？照片會一併移除，此動作無法復原。')) return;
    // 先刪照片（best-effort），再刪 row
    await Promise.all(l.photo_urls.map((u) => deletePhoto(u).catch(() => null)));
    const { error } = await supabase.from('listings').delete().eq('id', l.id);
    if (error) {
      alert(`刪除失敗：${error.message}`);
      return;
    }
    onDeleted?.();
  };

  return (
    <div className="space-y-3">
      {listings.map((l) => (
        <div key={l.id} className="card">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2 py-0.5 rounded bg-brand-gold/15 text-brand-burgundy font-medium">
              {LISTING_TYPE_LABEL[l.type]}
            </span>
            <span className="text-content-muted">{l.region}</span>
            <span className="text-content-muted">·</span>
            <span className="text-content-muted">
              {new Date(l.created_at).toLocaleDateString('zh-Hant')}
            </span>
            {l.price && (
              <span className="ml-auto text-brand-burgundy font-medium">{l.price}</span>
            )}
          </div>

          <h3 className="mt-2 font-semibold text-content-primary">{l.title}</h3>
          <p className="mt-1 text-sm text-content-secondary whitespace-pre-wrap">
            {l.description}
          </p>

          {l.photo_urls.length > 0 && (
            <div className="mt-3">
              <PhotoGallery photos={l.photo_urls} />
            </div>
          )}

          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="text-xs">
              <span className="text-content-muted">聯絡：</span>
              <span className="text-content-primary break-all">{l.contact_info}</span>
            </div>
            {user?.id === l.user_id && (
              <button onClick={() => handleDelete(l)} className="btn-danger text-xs px-2 py-1 shrink-0">
                刪除
              </button>
            )}
          </div>

          <div className="mt-2 text-xs text-content-muted">
            到期：{new Date(l.expires_at).toLocaleDateString('zh-Hant')}
          </div>
        </div>
      ))}
    </div>
  );
}
