import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthGate } from '../components/AuthGate'
import { supabase } from '../lib/supabase'
import { useAuth } from '../lib/useAuth'
import type { Listing, SchoolReview, School } from '../lib/types'
import schools from '../data/schools.json'

function schoolName(schoolId: string): string {
  return (schools as School[]).find((s) => s.id === schoolId)?.name ?? schoolId
}

function MyPostsContent() {
  const { user } = useAuth()
  const [reviews, setReviews] = useState<SchoolReview[]>([])
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    if (!user) return
    setLoading(true)
    setError(null)
    const [reviewsRes, listingsRes] = await Promise.all([
      supabase
        .from('school_reviews')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false }),
      supabase
        .from('listings')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false }),
    ])
    if (reviewsRes.error || listingsRes.error) {
      setError(reviewsRes.error?.message ?? listingsRes.error?.message ?? '載入失敗')
      setLoading(false)
      return
    }
    setReviews(reviewsRes.data as SchoolReview[])
    setListings(listingsRes.data as Listing[])
    setLoading(false)
  }, [user])

  useEffect(() => {
    void load()
  }, [load])

  const deleteReview = async (id: number) => {
    if (!window.confirm('確定刪除這則評價？刪除後無法復原。')) return
    const { error } = await supabase.from('school_reviews').delete().eq('id', id)
    if (error) {
      alert(`刪除失敗：${error.message}`)
      return
    }
    setReviews((prev) => prev.filter((r) => r.id !== id))
  }

  const deleteListing = async (id: number) => {
    if (!window.confirm('確定刪除這則貼文？刪除後無法復原。')) return
    const { error } = await supabase.from('listings').delete().eq('id', id)
    if (error) {
      alert(`刪除失敗：${error.message}`)
      return
    }
    setListings((prev) => prev.filter((l) => l.id !== id))
  }

  if (loading) return <p className="text-sm text-slate-400">載入中…</p>
  if (error) return <p className="text-sm text-red-600">載入失敗：{error}</p>

  return (
    <div className="space-y-10">
      <section>
        <h2 className="mb-3 text-lg font-semibold text-slate-900">
          我的評價（{reviews.length}）
        </h2>
        {reviews.length === 0 ? (
          <p className="text-sm text-slate-500">
            還沒有發表過評價。
            <Link to="/schools" className="ml-1 text-blue-700 underline">
              去看看學校列表
            </Link>
          </p>
        ) : (
          <ul className="space-y-3">
            {reviews.map((review) => (
              <li
                key={review.id}
                className="flex items-start justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4"
              >
                <div className="min-w-0">
                  <Link
                    to={`/schools/${review.school_id}`}
                    className="text-sm font-medium text-blue-700 hover:underline"
                  >
                    {schoolName(review.school_id)}
                  </Link>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-600">
                    {review.comment_text}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    {new Date(review.created_at).toLocaleDateString('zh-TW')}
                  </p>
                </div>
                <button
                  onClick={() => void deleteReview(review.id)}
                  className="shrink-0 rounded-md border border-red-200 px-3 py-1 text-xs text-red-600 hover:bg-red-50"
                >
                  刪除
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold text-slate-900">
          我的佈告欄貼文（{listings.length}）
        </h2>
        {listings.length === 0 ? (
          <p className="text-sm text-slate-500">
            還沒有刊登過貼文。
            <Link to="/board" className="ml-1 text-blue-700 underline">
              去佈告欄刊登
            </Link>
          </p>
        ) : (
          <ul className="space-y-3">
            {listings.map((listing) => (
              <li
                key={listing.id}
                className="flex items-start justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900">{listing.title}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-600">
                    {listing.description}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    {new Date(listing.created_at).toLocaleDateString('zh-TW')} · 有效至{' '}
                    {new Date(listing.expires_at).toLocaleDateString('zh-TW')}
                  </p>
                </div>
                <button
                  onClick={() => void deleteListing(listing.id)}
                  className="shrink-0 rounded-md border border-red-200 px-3 py-1 text-xs text-red-600 hover:bg-red-50"
                >
                  刪除
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

export function MyPosts() {
  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold text-slate-900">我的發文</h1>
      <p className="mb-6 text-sm text-slate-500">
        管理你發布過的評價與貼文。刪除為永久動作（資料庫層級刪除），無法復原。
      </p>
      <AuthGate action="查看自己的發文">
        <MyPostsContent />
      </AuthGate>
    </div>
  )
}
