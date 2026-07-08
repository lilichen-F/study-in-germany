import announcementsData from '../data/announcements.json';

interface Announcement {
  id: string;
  date: string;
  title: string;
  body: string;
  tag?: 'update' | 'notice' | 'community';
}

const TAG_LABEL: Record<NonNullable<Announcement['tag']>, string> = {
  update: '更新',
  notice: '公告',
  community: '社群',
};

// JSON import 的 tag 推導為 string，與字面量 union 不可直接互轉（TS2352）→ 經 unknown 過渡
const items = announcementsData as unknown as Announcement[];

export default function Announcements() {
  if (items.length === 0) return null;
  return (
    <div className="space-y-2">
      {items.slice(0, 5).map((a) => (
        <div key={a.id} className="card">
          <div className="flex items-center gap-2 text-xs">
            {a.tag && (
              <span className="px-2 py-0.5 rounded bg-brand-gold/15 text-brand-burgundy font-medium">
                {TAG_LABEL[a.tag]}
              </span>
            )}
            <span className="text-content-muted">{a.date}</span>
          </div>
          <div className="mt-2 font-medium text-content-primary">{a.title}</div>
          <p className="mt-1 text-sm text-content-secondary whitespace-pre-wrap">{a.body}</p>
        </div>
      ))}
    </div>
  );
}
