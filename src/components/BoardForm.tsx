import { useState } from 'react';
import type { FormEvent } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/useAuth';
import { LISTING_TYPE_LABEL } from '../lib/types';
import type { ListingType } from '../lib/types';
import PrivacyNotice from './PrivacyNotice';
import PhotoUploader from './PhotoUploader';

interface Props {
  onSubmitted?: () => void;
}

const TYPE_HINT: Record<ListingType, string> = {
  secondhand: '二手物品轉讓（家具、電器、教材等）',
  rental_offer: '出租房屋、轉租、找室友（房屋限定）',
  rental_seek: '求租房屋、找住宿（房屋限定）',
};

export default function BoardForm({ onSubmitted }: Props) {
  const { user } = useAuth();
  const [type, setType] = useState<ListingType>('secondhand');
  const [region, setRegion] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [contact, setContact] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const canSubmit =
    consent &&
    region.trim().length > 0 &&
    title.trim().length >= 2 &&
    title.trim().length <= 100 &&
    description.trim().length >= 5 &&
    description.trim().length <= 2000 &&
    contact.trim().length > 0 &&
    !submitting;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    setErr(null);
    const { error } = await supabase.from('listings').insert({
      user_id: user.id,
      type,
      region: region.trim(),
      title: title.trim(),
      description: description.trim(),
      price: price.trim() || null,
      contact_info: contact.trim(),
      photo_urls: photos,
    });
    setSubmitting(false);
    if (error) {
      setErr(error.message);
      return;
    }
    setTitle(''); setDescription(''); setPrice('');
    setContact(''); setRegion(''); setPhotos([]); setConsent(false);
    onSubmitted?.();
  };

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      <div>
        <div className="label">類型</div>
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(LISTING_TYPE_LABEL) as ListingType[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`px-3 py-2 rounded-lg border text-sm transition-colors ${
                type === t
                  ? 'border-brand-burgundy text-brand-burgundy bg-brand-burgundy/5'
                  : 'border-border-subtle text-content-secondary hover:border-border-strong'
              }`}
            >
              {LISTING_TYPE_LABEL[t]}
            </button>
          ))}
        </div>
        <div className="mt-1 text-xs text-content-muted">{TYPE_HINT[type]}</div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label" htmlFor="region">城市／區域</label>
          <input
            id="region"
            className="input"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            placeholder="Berlin / München-Schwabing…"
          />
        </div>
        <div>
          <label className="label" htmlFor="price">
            {type === 'rental_seek' ? '預算（選填）' : '價格（選填）'}
          </label>
          <input
            id="price"
            className="input"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder={type === 'secondhand' ? '€50' : '€600 warm'}
          />
        </div>
      </div>

      <div>
        <label className="label" htmlFor="title">標題（2–100 字）</label>
        <input
          id="title"
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label className="label" htmlFor="desc">內容（5–2000 字）</label>
        <textarea
          id="desc"
          rows={5}
          className="input resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={
            type === 'secondhand'
              ? '物品狀況、購買時間、面交／寄送方式…'
              : type === 'rental_offer'
              ? '坪數、房型、租期、押金、可搬遷時間、家具家電…'
              : '需求區域、房型、預算上限、可入住時間、有無寵物…'
          }
        />
      </div>

      <PhotoUploader value={photos} onChange={setPhotos} />

      <div>
        <label className="label" htmlFor="contact">聯絡方式（將公開顯示）</label>
        <input
          id="contact"
          className="input"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="Telegram @xxx / Email"
        />
      </div>

      <PrivacyNotice checked={consent} onChange={setConsent} variant="listing" />

      {err && <div className="text-sm text-state-danger">送出失敗：{err}</div>}

      <div className="flex items-center justify-between">
        <div className="text-xs text-content-muted">貼文於 60 天後自動下架。</div>
        <button type="submit" disabled={!canSubmit} className="btn-primary">
          {submitting ? '送出中…' : '公開發布'}
        </button>
      </div>
    </form>
  );
}
