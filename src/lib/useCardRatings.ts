import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from './supabase';
import { fetchWithRetry } from './fetchWithRetry';
import { translateError } from './errorMessages';
import { useToast } from './toast';
import { useAuth } from './useAuth';

interface RatingRow {
  card_id: string;
  user_id: string;
  rating: number;
}

export interface CardRatingStats {
  avg: number;
  count: number;
}

/**
 * 資源卡片五星評分（Phase BH，見 PAT-169）。
 *
 * 一次查詢整個分類的 card_ratings（比照 useHotSchools/useHotListings
 * 的「整表 SELECT + client 端聚合」模式），而非每張卡片各自查一次——
 * 一個分類頁面可能同時渲染 40+ 張卡片，逐卡查詢會是明顯的 N+1。
 *
 * 評分為寫入動作，依 PAT-150 既有規則不套用 fetchWithRetry（重試寫入
 * 有造成重複寫入的風險）；讀取（初次載入與送出後重新整理）則套用。
 */
export function useCardRatingsMap(category: string) {
  const { user, signInWithGoogle } = useAuth();
  const { push } = useToast();
  const [rows, setRows] = useState<RatingRow[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const { data, error } = await fetchWithRetry(
      () => supabase
        .from('card_ratings')
        .select('card_id, user_id, rating')
        .eq('category', category)
        .retry(false),
      { table: 'card_ratings', source: 'useCardRatingsMap' },
    );
    if (!error && data) {
      setRows(data as RatingRow[]);
    }
    setLoading(false);
  }, [category]);

  useEffect(() => { refresh(); }, [refresh]);

  const statsMap = useMemo(() => {
    const byCard = new Map<string, number[]>();
    for (const r of rows) {
      if (!byCard.has(r.card_id)) byCard.set(r.card_id, []);
      byCard.get(r.card_id)!.push(r.rating);
    }
    const map = new Map<string, CardRatingStats>();
    for (const [cardId, ratings] of byCard) {
      map.set(cardId, {
        avg: ratings.reduce((a, b) => a + b, 0) / ratings.length,
        count: ratings.length,
      });
    }
    return map;
  }, [rows]);

  const myRatingsMap = useMemo(() => {
    const map = new Map<string, number>();
    if (!user) return map;
    for (const r of rows) {
      if (r.user_id === user.id) map.set(r.card_id, r.rating);
    }
    return map;
  }, [rows, user]);

  /**
   * 未登入點擊：既有的 toast 提示系統 + useAuth().signInWithGoogle() 直接
   * 觸發既有登入流程（沿用既有機制，不新建一套 UI），不阻斷其餘內容瀏覽。
   */
  const submitRating = async (cardId: string, rating: number) => {
    if (!user) {
      push('info', '請先登入才能評分');
      signInWithGoogle();
      return;
    }
    const { error } = await supabase.from('card_ratings').upsert(
      {
        card_id: cardId,
        category,
        user_id: user.id,
        rating,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'card_id,user_id' },
    );
    if (error) {
      push('error', translateError(error).message);
      return;
    }
    refresh();
  };

  return { statsMap, myRatingsMap, submitRating, loading };
}
