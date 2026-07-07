import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../lib/useAuth'
import { attachProfiles, type Listing, type ListingType, type Profile } from '../lib/types'

const typeLabels: Record<ListingType, string> = {
  secondhand: '二手交易',
  accommodation: '找房 / 出租',
}

export function BoardList({ refreshKey = 0 }: { refreshKey?: number }) {
  const { user } = useAuth()
  const [filter, setFilter] = useState<ListingType | 'all'>('all')
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    // 過期貼文由 RLS policy（expires_at > NOW()）在資料庫層過濾，前端不需再判斷
    let query = supabase
      .from('listings')
      .select('*')
      .order('created_at', { ascending: false })
    if (filter !== 'all') query = query.eq('type', filter)
    const { data, error } = await query
    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }
    const withProfiles = await attachProfiles(data as Listing[], async (ids) => {
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, display_name, avatar_url')
        .in('id', ids)
      return (profiles ?? []) as Profile[]
    })
    setListings(withProfiles)
    setLoading(false)
  }, [filter])

  useEffect(() => {
    void load()
  }, [load, refreshKey])

  const handleDelete = async (id: number) => {
    if (!window.confirm('確定刪除這則貼文？刪除後無法復原。')) return
    const { error } = await supabase.from('listings').delete().eq('id', id)
    if (error) {
      alert(`刪除失敗：${error.message}`)
      return
    }
    setListings((prev) => prev.filter((l) => l.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(['all', 'secondhand', 'accommodation'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`rounded-full px-3 py-1 text-sm ${
              filter === t
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {t === 'all' ? '全部' : typeLabels[t]}
          </button>
        ))}
      </div>

      {loading && <p className="text-sm text-slate-400">載入貼文中…</p>}
      {error && <p className="text-sm text-red-600">貼文載入失敗：{error}</p>}
      {!loading && !error && listings.length === 0 && (
        <p className="text-sm text-slate-500">目前沒有貼文。</p>
      )}

      <ul className="space-y-4">
        {listings.map((listing) => (
          <li key={listing.id} className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="mr-2 rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                  {typeLabels[listing.type]}
                </span>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                  {listing.region}
                </span>
                <h3 className="mt-2 font-semibold text-slate-900">{listing.title}</h3>
              </div>
              {user?.id === listing.user_id && (
                <button
                  onClick={() => void handleDelete(listing.id)}
                  className="shrink-0 text-xs text-red-600 hover:underline"
                >
                  刪除
                </button>
              )}
            </div>
            <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">
              {listing.description}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
              {listing.price && (
                <span className="font-medium text-emerald-700">{listing.price}</span>
              )}
              <span className="text-slate-600">聯絡方式：{listing.contact_info}</span>
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
              {listing.profile?.avatar_url && (
                <img
                  src={listing.profile.avatar_url}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="h-5 w-5 rounded-full"
                />
              )}
              <span>{listing.profile?.display_name ?? '匿名使用者'}</span>
              <span>· {new Date(listing.created_at).toLocaleDateString('zh-TW')}</span>
              <span>
                · 有效至 {new Date(listing.expires_at).toLocaleDateString('zh-TW')}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
