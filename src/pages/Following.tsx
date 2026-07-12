import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/useAuth';
import { useFollowingList } from '../lib/useFollow';

type FeedItem =
  | { kind: 'review'; id: number; school_id: string; comment_text: string; created_at: string; user_id: string }
  | { kind: 'listing'; id: number; title: string; type: string; created_at: string; user_id: string };

/**
 * DS v4.2 · 追蹤動態獨立頁面
 * 抽取自 MyProfile 原本內嵌的 FollowingFeed 邏輯，獨立成頁面、呈現更完整（30 則）
 */
export default function Following() {
  const { user, loading: authLoading } = useAuth();
  const { followingIds, loading: followingLoading } = useFollowingList(user?.id ?? null);
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (followingLoading) return;
    if (followingIds.length === 0) {
      setLoading(false);
      return;
    }

    (async () => {
      const [reviewsRes, listingsRes] = await Promise.all([
        supabase
          .from('school_reviews')
          .select('id, school_id, comment_text, created_at, user_id')
          .in('user_id', followingIds)
          .order('created_at', { ascending: false })
          .limit(30),
        supabase
          .from('listings')
          .select('id, title, type, created_at, user_id')
          .in('user_id', followingIds)
          .order('created_at', { ascending: false })
          .limit(30),
      ]);

      const combined: FeedItem[] = [
        ...((reviewsRes.data ?? []) as Omit<Extract<FeedItem, { kind: 'review' }>, 'kind'>[]).map((r) => ({ ...r, kind: 'review' as const })),
        ...((listingsRes.data ?? []) as Omit<Extract<FeedItem, { kind: 'listing' }>, 'kind'>[]).map((l) => ({ ...l, kind: 'listing' as const })),
      ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 30);

      setFeed(combined);
      setLoading(false);
    })();
  }, [followingIds, followingLoading]);

  if (authLoading) {
    return <div className="py-16 text-center text-content-muted">載入中…</div>;
  }

  if (!user) {
    return (
      <div className="py-16 text-center text-content-secondary space-y-3">
        <p>請先登入以查看追蹤動態</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <div className="text-xs text-content-muted uppercase tracking-wider mb-2">
          Following
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-content-primary">
          追蹤動態
        </h1>
      </div>

      {followingLoading || loading ? (
        <div className="text-sm text-content-muted">載入動態…</div>
      ) : followingIds.length === 0 ? (
        <div className="card text-center py-8">
          <p className="text-sm text-content-secondary">
            你還沒有追蹤任何人
          </p>
          <p className="text-xs text-content-muted mt-2">
            於評價、貼文旁點「+ 追蹤」開始關注其他使用者
          </p>
        </div>
      ) : feed.length === 0 ? (
        <div className="card text-center py-8">
          <p className="text-sm text-content-muted">
            你追蹤的人還沒有新動態
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {feed.map((item) => (
            <article key={`${item.kind}-${item.id}`} className="card">
              {item.kind === 'review' ? (
                <div className="text-sm">
                  <Link to={`/schools/${item.school_id}`} className="text-content-primary font-medium">
                    於 {item.school_id} 發表了評價
                  </Link>
                  <p className="text-content-secondary mt-1">{item.comment_text}</p>
                </div>
              ) : (
                <div className="text-sm">
                  <Link to="/board" className="text-content-primary font-medium">
                    發表了貼文「{item.title}」
                  </Link>
                </div>
              )}
              <div className="text-xs text-content-muted mt-2">
                {new Date(item.created_at).toLocaleDateString('zh-TW')}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
