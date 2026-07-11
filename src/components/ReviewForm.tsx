import { useState } from 'react';
import type { FormEvent } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/useAuth';
import { translateError } from '../lib/errorMessages';
import { useToast } from '../lib/toast';
import { RATING_DIMENSIONS, calculateOverall } from '../lib/ratings';
import type { RatingDimension } from '../lib/ratings';
import StarSlider from './StarSlider';

interface Props {
  schoolId: string;
  onSubmitted?: () => void;
}

export default function ReviewForm({ schoolId, onSubmitted }: Props) {
  const { user } = useAuth();
  const { push } = useToast();

  const [stars, setStars] = useState<Partial<Record<RatingDimension, number>>>({});
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const overall = calculateOverall(stars);
  const canSubmit = overall > 0 && comment.trim().length >= 5;

  const setStar = (key: RatingDimension, v: number) =>
    setStars((s) => ({ ...s, [key]: v > 0 ? v : undefined }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!canSubmit) {
      push('error', '請至少填 1 個評分維度、心得 5 字以上');
      return;
    }

    setSubmitting(true);

    // UI 顯示 overall 為 x.x（保留 1 位小數）
    // DB 端 stars JSONB 內數字 round 為整數避免 CHECK 拒絕（PAT-65）
    const roundedStars: Record<string, number> = {};
    for (const [key, value] of Object.entries(stars)) {
      if (typeof value === 'number' && value > 0) {
        roundedStars[key] = Math.round(value);
      }
    }

    const payload = {
      school_id: schoolId,
      user_id: user.id,
      stars: {
        overall: Math.round(overall),
        ...roundedStars,
      },
      comment_text: comment.trim(),
    };

    const { error } = await supabase.from('school_reviews').insert(payload);
    setSubmitting(false);

    if (error) {
      const f = translateError(error);
      push('error', f.message);
      // eslint-disable-next-line no-console
      console.error('[ReviewForm] insert failed:', f.raw);
      return;
    }

    push('success', '評價已送出');
    setStars({});
    setComment('');
    onSubmitted?.();
  };

  return (
    <form onSubmit={submit} className="card space-y-5">
      <div className="space-y-4">
        {RATING_DIMENSIONS.map((d) => (
          <StarSlider
            key={d.key}
            value={stars[d.key] ?? 0}
            onChange={(v) => setStar(d.key, v)}
            label={d.label}
            hint={d.hint}
          />
        ))}
      </div>

      {overall > 0 && (
        <div className="pt-2 border-t border-border-subtle
                        flex items-baseline justify-between">
          <span className="text-sm text-content-secondary">
            整體評分（自動計算）
          </span>
          <span className="text-lg font-semibold text-brand-gold">
            {overall.toFixed(1)} ★
          </span>
        </div>
      )}

      <div className="space-y-1.5">
        <label htmlFor="review-text" className="text-sm font-medium text-content-primary">
          心得（5 字以上）
        </label>
        <textarea
          id="review-text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          maxLength={1000}
          placeholder="分享你的實際體驗、優缺點、建議"
          className="input resize-none"
        />
        <div className="text-xs text-content-muted text-right">
          {comment.trim().length} / 1000
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xs text-content-muted">
          評價一經送出無法編輯，只能刪除重發（避免竄改）。
        </div>
        <button
          type="submit"
          disabled={!canSubmit || submitting}
          className="btn-primary"
        >
          {submitting ? '送出中…' : '送出評價'}
        </button>
      </div>
    </form>
  );
}
