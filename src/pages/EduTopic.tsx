import { Link, useParams } from 'react-router-dom';
import { EDU_TOPICS } from '../data/edu/config';
import { renderMarkdown } from '../lib/markdown';

// MD import · Vite ?raw 契約
import visaMd from '../data/edu/visa.md?raw';
import arrivalMd from '../data/edu/arrival.md?raw';
import renewalMd from '../data/edu/renewal.md?raw';
import applicationMd from '../data/edu/application.md?raw';
import scholarshipMd from '../data/edu/scholarship.md?raw';
import policyMd from '../data/edu/policy.md?raw';

const MD_MAP: Record<string, string> = {
  visa: visaMd,
  arrival: arrivalMd,
  renewal: renewalMd,
  application: applicationMd,
  scholarship: scholarshipMd,
  policy: policyMd,
};

export default function EduTopic() {
  const { slug } = useParams<{ slug: string }>();
  const topic = EDU_TOPICS.find((t) => t.slug === slug);
  const md = slug ? MD_MAP[slug] : null;

  if (!topic || !md) {
    return (
      <div className="py-16 text-center text-content-secondary">
        找不到這個主題。
        <Link to="/edu" className="ml-2">回學用板塊</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Link to="/edu" className="text-xs no-underline">
          ← 回學用板塊
        </Link>
      </div>

      {/* 內容源為 static asset（src/data/edu/*.md），非使用者輸入 · 見 PAT-28 */}
      <article
        className="max-w-3xl"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(md) }}
      />

      <div className="pt-6 border-t border-border-subtle max-w-3xl">
        <div className="text-xs text-content-muted">
          內容以 2024/25 年度公開資料為基礎，僅供參考，正式辦理前請確認官方最新公告。
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {EDU_TOPICS.filter((t) => t.slug !== slug).map((t) => (
            <Link
              key={t.slug}
              to={`/edu/${t.slug}`}
              className="text-xs px-3 py-1.5 rounded-lg border border-border-subtle
                         hover:border-brand-gold hover:text-brand-burgundy
                         no-underline transition-colors"
            >
              {t.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
