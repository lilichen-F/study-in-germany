import { Link } from 'react-router-dom'
import schools from '../data/schools.json'
import type { School } from '../lib/types'

export function SchoolList() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {(schools as School[]).map((school) => (
        <Link
          key={school.id}
          to={`/schools/${school.id}`}
          className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-300 hover:shadow"
        >
          <h3 className="font-semibold text-slate-900">{school.name}</h3>
          <p className="mt-1 text-sm text-slate-500">
            {school.city} · {school.priceRange}
          </p>
          <p className="mt-2 line-clamp-2 text-sm text-slate-600">{school.description}</p>
        </Link>
      ))}
    </div>
  )
}
