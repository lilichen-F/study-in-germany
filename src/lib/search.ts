import schoolsData from '../data/schools.json';
import faqData from '../data/faq.json';
import announcementsData from '../data/announcements.json';
import type { School, FaqItem } from './types';

interface Announcement {
  id: string; date: string; title: string; body: string;
}

export type SearchHit =
  | { kind: 'school'; id: string; title: string; subtitle: string; url: string }
  | { kind: 'faq'; id: string; title: string; subtitle: string; url: string }
  | { kind: 'announcement'; id: string; title: string; subtitle: string; url: string };

/**
 * 純 client · 純 substring match（後續可換 fuse.js 若需模糊）
 * 全站搜尋範圍：schools + faq + announcements
 * 資料量小（<100 筆）substring 已足夠。
 */
export function searchAll(query: string): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (q.length < 1) return [];

  const hits: SearchHit[] = [];

  for (const s of schoolsData as School[]) {
    const hay = `${s.name_zh} ${s.name_de} ${s.city} ${s.level}`.toLowerCase();
    if (hay.includes(q)) {
      hits.push({
        kind: 'school',
        id: s.id,
        title: s.name_zh,
        subtitle: `${s.city} · ${s.level}`,
        url: `/schools/${s.id}`,
      });
    }
  }

  for (let i = 0; i < (faqData as FaqItem[]).length; i++) {
    const f = (faqData as FaqItem[])[i];
    const hay = `${f.q} ${f.a}`.toLowerCase();
    if (hay.includes(q)) {
      hits.push({
        kind: 'faq',
        id: String(i),
        title: f.q,
        subtitle: f.a.slice(0, 60) + (f.a.length > 60 ? '…' : ''),
        url: `/faq`,
      });
    }
  }

  for (const a of announcementsData as unknown as Announcement[]) {
    const hay = `${a.title} ${a.body}`.toLowerCase();
    if (hay.includes(q)) {
      hits.push({
        kind: 'announcement',
        id: a.id,
        title: a.title,
        subtitle: a.body.slice(0, 60) + (a.body.length > 60 ? '…' : ''),
        url: `/`,
      });
    }
  }

  return hits.slice(0, 30);
}
