import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../lib/useAuth'
import { attachProfiles, type Profile, type SchoolReview } from '../lib/types'

function Stars({ value, label }: { value: number | null; label: string }) {
  if (value == null) return null
  return (
    <span className="text-sm text-slate-600">
      {label}：<span className="text-amber-500">{'★'.repeat(value)}</span>
      <span className="text-slate-300">{'★'.repeat(5 - value)}</span>
    </span>
  )
}

export function ReviewList({
  schoolId,
  refreshKey = 0,
}: {
  schoolId: string
  /** 父層在新增評價後遞增此值以觸發重新載入 */
  refreshKey?: number
}) {
  const { user } = useAuth()
  const [reviews, setReviews] = useState<SchoolReview[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    const { data, error } = await supabase
      .from('school_reviews')
      .select('*')
      .eq('school_id', schoolId)
      .order('created_at', { ascending: false })
    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }
    const withProfiles = await attachProfiles(data as SchoolReview[], async (ids) => {
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, display_name, avatar_url')
        .in('id', ids)
      return (profiles ?? []) as Profile[]
    })
    setReviews(withProfiles)
    setLoading(false)
  }, [schoolId])

  useEffect(() => {
    void load()
  }, [load, refreshKey])

  const handleDelete = async (id: number) => {
    if (!window.confirm('確定刪除這則評價？刪除後無法復原。')) return
    const { error } = await supabase.from('school_reviews').delete().eq('id', id)
    if (error) {
      alert(`刪除失敗：${error.message}`)
      return
    }
    setReviews((prev) => prev.filter((r) => r.id !== id))
  }

  if (loading) return <p className="text-sm text-slate-400">載入評價中…</p>
  if (error) return <p className="text-sm text-red-600">評價載入失敗：{error}</p>
  if (reviews.length === 0)
    return <p className="text-sm text-slate-500">目前還沒有評價，成為第一個分享的人吧！</p>

  return (
    <ul className="space-y-4">
      {reviews.map((review) => (
        <li key={review.id} className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {review.profile?.avatar_url && (
                <img
                  src={review.profile.avatar_url}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="h-6 w-6 rounded-full"
                />
              )}
              <span className="text-sm font-medium text-slate-800">
                {review.profile?.display_name ?? '匿名使用者'}
              </span>
              <span className="text-xs text-slate-400">
                {new Date(review.created_at).toLocaleDateString('zh-TW')}
              </span>
            </div>
            {user?.id === review.user_id && (
              <button
                onClick={() => void handleDelete(review.id)}
                className="text-xs text-red-600 hover:underline"
              >
                刪除
              </button>
            )}
          </div>
          <div className="mt-2 flex flex-wrap gap-4">
            <Stars value={review.stars_teaching} label="教學" />
            <Stars value={review.stars_environment} label="環境" />
          </div>
          <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">
            {review.comment_text}
          </p>
        </li>
      ))}
    </ul>
  )
}
