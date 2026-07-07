import { useState } from 'react';
import type { FormEvent } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/useAuth';
import type { RatingSchema } from '../lib/types';

interface Props {
  schoolId: string;
  onSubmitted?: () => void;
}

function StarPicker({
  value, onChange, label, required,
}: { value: number; onChange: (n: number) => void; label: string; required?: boolean }) {
  return (
    <div>
      <div className="label">
        {label}{required && <span className="text-brand-burgundy">*</span>}
      </div>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            aria-label={`${label} ${n} 星`}
            className={`w-8 h-8 rounded text-xl transition-colors ${
              n <= value
                ? 'text-brand-gold'
                : 'text-border-strong hover:text-brand-gold-hover'
            }`}
          >
            ★
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ReviewForm({ schoolId, onSubmitted }: Props) {
  const { user } = useAuth();
  // Phase A: 只開 overall + teaching + environment 三個維度作為橋接。
  // Phase C 會擴至 6 維並全部走同一 JSONB。
  const [overall, setOverall] = useState(0);
  const [teaching, setTeaching] = useState(0);
  const [environment, setEnvironment] = useState(0);
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const canSubmit =
    overall >= 1 &&
    text.trim().length >= 5 &&
    text.trim().length <= 1000 &&
    !submitting;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    setErr(null);

    const stars: RatingSchema = { overall };
    if (teaching > 0) stars.teaching = teaching;
    if (environment > 0) stars.environment = environment;

    const { error } = await supabase.from('school_reviews').insert({
      school_id: schoolId,
      user_id: user.id,
      stars,
      comment_text: text.trim(),
    });
    setSubmitting(false);
    if (error) { setErr(error.message); return; }
    setOverall(0); setTeaching(0); setEnvironment(0); setText('');
    onSubmitted?.();
  };

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      <StarPicker value={overall} onChange={setOverall} label="整體" required />

      <div className="grid grid-cols-2 gap-4">
        <StarPicker value={teaching} onChange={setTeaching} label="教學" />
        <StarPicker value={environment} onChange={setEnvironment} label="環境" />
      </div>

      <div>
        <label className="label" htmlFor="review-text">心得（5–1000 字）</label>
        <textarea
          id="review-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          className="input resize-none"
          placeholder="上過的課程、老師、你的收穫或不推薦的原因…"
        />
        <div className="mt-1 text-xs text-content-muted text-right">
          {text.trim().length} / 1000
        </div>
      </div>

      {err && <div className="text-sm text-state-danger">送出失敗：{err}</div>}

      <div className="flex items-center justify-between">
        <div className="text-xs text-content-muted">
          評價一經送出無法編輯，只能刪除重發（避免竄改）。
        </div>
        <button type="submit" disabled={!canSubmit} className="btn-primary">
          {submitting ? '送出中…' : '送出評價'}
        </button>
      </div>
    </form>
  );
}
