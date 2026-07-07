import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import schools from '../data/schools.json'
import type { School } from '../lib/types'
import { AuthGate } from './AuthGate'
import { ReviewForm } from './ReviewForm'
import { ReviewList } from './ReviewList'

export function SchoolDetail() {
  const { id } = useParams<{ id: string }>()
  const [refreshKey, setRefreshKey] = useState(0)

  const school = (schools as School[]).find((s) => s.id === id)

  if (!school) {
    return (
      <div className="py-12 text-center">
        <p className="text-slate-600">找不到這間學校。</p>
        <Link to="/schools" className="mt-2 inline-block text-blue-700 underline">
          回學校列表
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <Link to="/schools" className="text-sm text-blue-700 hover:underline">
          ← 回學校列表
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">{school.name}</h1>
        <p className="mt-1 text-slate-500">
          {school.city} · {school.priceRange}
        </p>
        <p className="mt-3 text-slate-700">{school.description}</p>
        <a
          href={school.website}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-block text-sm text-blue-700 underline"
        >
          官方網站 ↗
        </a>
      </div>

      <section>
        <h2 className="mb-3 text-lg font-semibold text-slate-900">學生評價</h2>
        <ReviewList schoolId={school.id} refreshKey={refreshKey} />
      </section>

      <section>
        <AuthGate action="發表評價">
          <ReviewForm
            schoolId={school.id}
            onSubmitted={() => setRefreshKey((k) => k + 1)}
          />
        </AuthGate>
      </section>
    </div>
  )
}
