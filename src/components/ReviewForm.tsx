import { useState, type FormEvent } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../lib/useAuth'
import { PrivacyNotice } from './PrivacyNotice'

const starOptions = [1, 2, 3, 4, 5]

function StarSelect({
  label,
  value,
  onChange,
}: {
  label: string
  value: number
  onChange: (v: number) => void
}) {
  return (
    <label className="flex items-center gap-3 text-sm">
      <span className="w-16 text-slate-700">{label}</span>
      <span className="flex gap-1">
        {starOptions.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            aria-label={`${label} ${n} 星`}
            className={`text-xl ${n <= value ? 'text-amber-500' : 'text-slate-300'} hover:scale-110`}
          >
            ★
          </button>
        ))}
      </span>
    </label>
  )
}

export function ReviewForm({
  schoolId,
  onSubmitted,
}: {
  schoolId: string
  onSubmitted?: () => void
}) {
  const { user } = useAuth()
  const [starsTeaching, setStarsTeaching] = useState(5)
  const [starsEnvironment, setStarsEnvironment] = useState(5)
  const [comment, setComment] = useState('')
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
      setError('請先勾選同意隱私政策')
      return
    }
    if (comment.trim().length < 5) {
      setError('評價內容至少 5 個字')
      return
    }
    setSubmitting(true)
    // RLS policy reviews_auth_insert 要求 auth.uid() = user_id，
    // 未登入或冒用他人 id 的寫入會被資料庫直接拒絕
    const { error } = await supabase.from('school_reviews').insert({
      school_id: schoolId,
      user_id: user.id,
      stars_teaching: starsTeaching,
      stars_environment: starsEnvironment,
      comment_text: comment.trim(),
    })
    setSubmitting(false)
    if (error) {
      setError(`送出失敗：${error.message}`)
      return
    }
    setComment('')
    setConsented(false)
    onSubmitted?.()
  }

  return (
    <form
      onSubmit={(e) => void handleSubmit(e)}
      className="space-y-4 rounded-lg border border-slate-200 bg-white p-4"
    >
      <h3 className="font-semibold text-slate-900">發表評價</h3>
      <StarSelect label="教學品質" value={starsTeaching} onChange={setStarsTeaching} />
      <StarSelect label="環境設備" value={starsEnvironment} onChange={setStarsEnvironment} />
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="分享你的就讀經驗（5–1000 字）"
        minLength={5}
        maxLength={1000}
        rows={4}
        required
        className="w-full rounded-md border border-slate-300 p-2 text-sm focus:border-blue-500 focus:outline-none"
      />
      <PrivacyNotice
        checked={consented}
        onChange={setConsented}
        message="我了解此評價將公開顯示，且我的 Google 顯示名稱與頭像會一併公開。"
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={submitting || !consented}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        {submitting ? '送出中…' : '送出評價'}
      </button>
    </form>
  )
}
