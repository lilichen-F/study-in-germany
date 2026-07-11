import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import { computeBadges } from './badges';
import type { BadgeId } from './badges';
import { useContributions } from './useContributions';

interface Props {
  userId: string | null;
  registrationSeq: number | null;
}

/**
 * 統計 + 判定 + sync 使用者徽章
 * Phase K-2 · 頁面載入時計算 · 若比 DB 現存徽章有新 · sync 回 profiles.badges
 */
export function useBadges({ userId, registrationSeq }: Props) {
  const [badges, setBadges] = useState<BadgeId[]>([]);
  const [loading, setLoading] = useState(true);
  const { counts, loading: countsLoading } = useContributions(userId);

  useEffect(() => {
    if (!userId || countsLoading) {
      setLoading(true);
      return;
    }

    (async () => {
      // 計算 discussion 類貼文數
      const { count: discussionCount } = await supabase
        .from('listings')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', userId)
        .in('type', ['discussion', 'discussion_study', 'discussion_longterm']);

      // 計算不同語校評價數
      const { data: reviews } = await supabase
        .from('school_reviews')
        .select('school_id')
        .eq('user_id', userId);
      const uniqueSchoolCount = new Set((reviews ?? []).map((r) => r.school_id)).size;

      // 計算徽章
      const earned = computeBadges(
        registrationSeq,
        counts,
        uniqueSchoolCount,
        discussionCount ?? 0
      );

      setBadges(earned);

      // sync 至 DB（若不同才寫）
      const { data: currentProfile } = await supabase
        .from('profiles')
        .select('badges')
        .eq('id', userId)
        .single();

      const currentBadges = (currentProfile?.badges as BadgeId[]) ?? [];
      const sortedNew = [...earned].sort();
      const sortedCurrent = [...currentBadges].sort();

      if (JSON.stringify(sortedNew) !== JSON.stringify(sortedCurrent)) {
        await supabase
          .from('profiles')
          .update({ badges: earned })
          .eq('id', userId);
      }

      setLoading(false);
    })();
  }, [userId, registrationSeq, counts, countsLoading]);

  return { badges, loading };
}
