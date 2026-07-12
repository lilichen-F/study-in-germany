import { useAuth } from '../lib/useAuth';
import { useFollow } from '../lib/useFollow';

interface Props {
  targetUserId: string;
  size?: 'sm' | 'md';
}

export default function FollowButton({ targetUserId, size = 'sm' }: Props) {
  const { user } = useAuth();
  const { isFollowing, followerCount, loading, busy, toggleFollow } =
    useFollow(targetUserId, user?.id ?? null);

  // 不對自己顯示 follow 按鈕
  if (user?.id === targetUserId) return null;
  if (loading) return null;

  const sizeClass = size === 'sm'
    ? 'px-2.5 py-1 text-xs'
    : 'px-4 py-2 text-sm';

  return (
    <button
      type="button"
      onClick={toggleFollow}
      disabled={!user || busy}
      className={`rounded-lg border transition-colors ${sizeClass} ${
        isFollowing
          ? 'border-border-subtle text-content-secondary hover:border-state-danger hover:text-state-danger'
          : 'border-brand-burgundy text-brand-burgundy hover:bg-brand-burgundy-surface'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
      title={!user ? '請先登入' : undefined}
    >
      {isFollowing ? '取消追蹤' : '+ 追蹤'}
      {followerCount > 0 && (
        <span className="ml-1 text-content-muted">({followerCount})</span>
      )}
    </button>
  );
}
