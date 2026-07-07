import { Link } from 'react-router-dom';
import schools from '../data/schools.json';
import type { School } from '../lib/types';

export default function SchoolList() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {(schools as School[]).map((school) => (
        <Link
          key={school.id}
          to={`/schools/${school.id}`}
          className="card-interactive block no-underline"
        >
          <h3 className="font-semibold text-content-primary">{school.name_zh}</h3>
          <p className="text-sm text-content-muted">{school.name_de}</p>
          <p className="mt-1 text-sm text-content-secondary">
            {school.city} · {school.level}
          </p>
          {school.note && (
            <p className="mt-2 line-clamp-2 text-sm text-content-secondary">{school.note}</p>
          )}
        </Link>
      ))}
    </div>
  );
}
