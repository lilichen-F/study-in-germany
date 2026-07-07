import { useState, type FormEvent } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../lib/useAuth'
import type { ListingType } from '../lib/types'
import { PrivacyNotice } from './PrivacyNotice'

export function BoardForm({ onSubmitted }: { onSubmitted?: () => void }) {
  const { user } = useAuth()
  const [type, setType] = useState<ListingType>('secondhand')
  const [region, setRegion] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [contactInfo, setContactInfo] = useState('')
  const [consented, setConsented] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!user) {
      setError('請先登入')
      return
    }
    if (!consented) {
      setError('請先勾選同意公開聯絡方式')
      return
    }
    setSubmitting(true)
    // RLS policy listings_auth_insert 在資料庫層強制 auth.uid() = user_id
    const { error } = await supabase.from('listings').insert({
      user_id: user.id,
      type,
      region: region.trim(),
      title: title.trim(),
      description: description.trim(),
      price: price.trim() || null,
      contact_info: contactInfo.trim(),
    })
    setSubmitting(false)
    if (error) {
      setError(`送出失敗：${error.message}`)
      return
    }
    setRegion('')
    setTitle('')
    setDescription('')
    setPrice('')
    setContactInfo('')
    setConsented(false)
    onSubmitted?.()
  }

  const inputClass =
    'w-full rounded-md border border-slate-300 p-2 text-sm focus:border-blue-500 focus:outline-none'

  return (
    <form
      onSubmit={(e) => void handleSubmit(e)}
      className="space-y-4 rounded-lg border border-slate-200 bg-white p-4"
    >
      <h3 className="font-semibold text-slate-900">刊登貼文</h3>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block text-slate-700">類型</span>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as ListingType)}
            className={inputClass}
          >
            <option value="secondhand">二手交易</option>
            <option value="accommodation">找房 / 出租</option>
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-slate-700">地區</span>
          <input
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            placeholder="例如：Berlin、München"
            required
            className={inputClass}
          />
        </label>
      </div>

      <label className="block text-sm">
        <span className="mb-1 block text-slate-700">標題（2–100 字）</span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          minLength={2}
          maxLength={100}
          required
          className={inputClass}
        />
      </label>

      <label className="block text-sm">
        <span className="mb-1 block text-slate-700">內容（5–2000 字）</span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          minLength={5}
          maxLength={2000}
          rows={4}
          required
          className={inputClass}
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block text-slate-700">價格（選填）</span>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="例如：€50、面議"
            className={inputClass}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-slate-700">聯絡方式</span>
          <input
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            placeholder="Email、Telegram、LINE ID…"
            required
            className={inputClass}
          />
        </label>
      </div>

      <PrivacyNotice
        checked={consented}
        onChange={setConsented}
        message="我同意將上方填寫的聯絡方式公開顯示於佈告欄（任何訪客皆可見），且貼文將於 60 天後自動下架。"
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={submitting || !consented}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        {submitting ? '送出中…' : '刊登貼文'}
      </button>
    </form>
  )
}
