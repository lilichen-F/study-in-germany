import { useState } from 'react'
import { AuthGate } from '../components/AuthGate'
import { BoardForm } from '../components/BoardForm'
import { BoardList } from '../components/BoardList'

export function Board() {
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 text-2xl font-bold text-slate-900">生活佈告欄</h1>
        <p className="text-sm text-slate-500">
          二手交易與找房資訊。瀏覽免登入；刊登需先以 Google 登入，貼文 60 天後自動下架。
        </p>
      </div>

      <BoardList refreshKey={refreshKey} />

      <AuthGate action="刊登貼文">
        <BoardForm onSubmitted={() => setRefreshKey((k) => k + 1)} />
      </AuthGate>
    </div>
  )
}
