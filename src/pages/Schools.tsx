import SchoolList from '../components/SchoolList';

const NEW_SCHOOL_ISSUE_URL = `https://github.com/lilichen-F/study-in-germany/issues/new?${new URLSearchParams(
  {
    title: '[新增語校] ',
    labels: 'new-school',
    body: '## 學校中文名稱\n\n## 學校德文名稱\n\n## 所在城市\n\n## 官網\n\n## 是否有你想推薦的點\n\n## 是否曾就讀\n- [ ] 是\n- [ ] 否\n\n## 其他資訊\n',
  }
).toString()}`;

export default function Schools() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-content-primary">語言學校</h1>
        <p className="mt-1 text-sm text-content-secondary">
          點進學校可查看學生評價；登入後即可發表自己的評價。
        </p>
      </div>
      <SchoolList />

      {/* 提交新學校 · GitHub Issues 整合（PAT-52） */}
      <section className="card bg-brand-gold-soft border-brand-gold/30 max-w-2xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-medium text-content-primary">
              🏫 有學校漏掉了？
            </div>
            <div className="text-xs text-content-muted mt-1 leading-relaxed">
              德國語言學校眾多，我們只列了部分主流與老牌。
              若你知道其他值得推薦的語校，歡迎提交，我們會審核加入。
            </div>
          </div>
          <a
            href={NEW_SCHOOL_ISSUE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost text-xs no-underline shrink-0"
          >
            提交新學校 →
          </a>
        </div>
      </section>
    </div>
  );
}
