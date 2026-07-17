import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { translateError } from '../lib/errorMessages';
import { useToast } from '../lib/toast';
import type { CardRatingStats } from '../lib/useCardRatings';

const LOW_RATING_MIN_COUNT = 5;
const LOW_RATING_THRESHOLD = 3.5;

interface Props {
  category: string;
  cardTitle: string;
  cardUrl: string;
  stats?: CardRatingStats;
  onRate: (rating: number) => void;
}

/**
 * 資源卡片五星評分 + 低分自動回饋信箱（Phase BH，見 PAT-169）。
 *
 * 星星呈現目前平均分數（非使用者自己的評分），點擊送出/更改自己的評分
 * （UPSERT，由父層 useCardRatingsMap 提供的 onRate 處理，含未登入時導向
 * 既有登入流程的邏輯）。標籤文字永久顯示，不依賴 hover。
 *
 * 達門檻（5 人以上評分且平均低於 3.5）才顯示低分回饋信箱，單次提交、
 * 不即時公開顯示——複用既有 user_submissions 表（general_feedback），
 * Lily 透過既有「使用者建議」後台流程查看，不新建管理介面。
 */
export default function CardRating({ category, cardTitle, cardUrl, stats, onRate }: Props) {
  const { push } = useToast();
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const avg = stats?.avg ?? 0;
  const count = stats?.count ?? 0;
  const filledStars = Math.round(avg);
  const showLowRatingFeedback = count >= LOW_RATING_MIN_COUNT && avg < LOW_RATING_THRESHOLD;

  const submitFeedback = async () => {
    const content = feedback.trim();
    if (content.length < 5 || submitting) return;
    setSubmitting(true);
    const { error } = await supabase.from('user_submissions').insert({
      submission_type: 'general_feedback',
      target_category: category,
      target_url: cardUrl,
      title: `低分回饋：${cardTitle}`.slice(0, 100),
      content,
    });
    setSubmitting(false);
    if (error) {
      push('error', translateError(error).message);
      return;
    }
    push('success', '回饋已送出，謝謝你的意見');
    setFeedback('');
    setSubmitted(true);
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-xs text-content-muted shrink-0">這對你有幫助嗎？</span>
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => onRate(n)}
              aria-label={`評 ${n} 顆星`}
              className={`text-base leading-none transition-colors ${
                n <= filledStars ? 'text-brand-gold' : 'text-content-muted hover:text-brand-gold/60'
              }`}
            >
              ★
            </button>
          ))}
        </div>
        {count > 0 && (
          <span className="text-xs text-content-muted">
            {avg.toFixed(1)}（{count} 人評分）
          </span>
        )}
      </div>

      {showLowRatingFeedback && !submitted && (
        <div className="text-xs bg-brand-gold-soft border border-brand-gold/30 rounded-lg p-2 space-y-1.5">
          <p className="text-content-secondary">
            這則資源評價偏低，能告訴我們為什麼嗎？你的意見會送到我們的回饋信箱。
          </p>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={2}
            maxLength={2000}
            placeholder="請描述你遇到的問題（至少 5 字）"
            className="w-full px-2 py-1.5 rounded border border-border-subtle
                       bg-surface-canvas text-content-primary text-xs
                       focus:outline-none focus:border-brand-burgundy resize-none"
          />
          <button
            type="button"
            onClick={submitFeedback}
            disabled={feedback.trim().length < 5 || submitting}
            className="text-xs px-3 py-1 rounded bg-brand-burgundy text-white
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? '送出中…' : '送出回饋'}
          </button>
        </div>
      )}

      {showLowRatingFeedback && submitted && (
        <p className="text-xs text-content-muted">已收到你的回饋，謝謝。</p>
      )}
    </div>
  );
}
