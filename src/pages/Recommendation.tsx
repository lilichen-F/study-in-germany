import { Link } from 'react-router-dom';
import RecommendationIcon from '../assets/icons/RecommendationIcon';
import { RecommendationCategoryIcon } from '../assets/icons/recommendation';
import { RECOMMENDATION_CATEGORIES } from '../lib/recommendation';
import SubmissionForm from '../components/SubmissionForm';
import UserSubmissionsList from '../components/UserSubmissionsList';
import generalData from '../data/recommendations/general.json';
import visaData from '../data/recommendations/visa.json';
import arrivalData from '../data/recommendations/arrival.json';
import eduData from '../data/recommendations/edu.json';
import scholarshipData from '../data/recommendations/scholarship.json';
import taiwanData from '../data/recommendations/taiwan.json';

const COUNT_MAP: Record<string, number> = {
  general: generalData.length,
  visa: visaData.length,
  arrival: arrivalData.length,
  edu: eduData.length,
  scholarship: scholarshipData.length,
  taiwan: taiwanData.length,
};

/**
 * DS v4.2 · 推薦專區 Hub · 對齊 Edu Hub 佈局（PAT-64）
 * 6 個子分類卡矩陣 · 圖示置中 · 文字置中
 */
export default function Recommendation() {
  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs text-content-muted uppercase tracking-wider mb-2">
          Recommendations
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold flex items-center gap-3">
          <span className="text-module-recommendation w-8 h-8 sm:w-10 sm:h-10 inline-flex">
            <RecommendationIcon className="w-full h-full" />
          </span>
          推薦專區
        </h1>
        <p className="text-sm text-content-secondary mt-3 max-w-2xl leading-relaxed">
          給留德新手與在德華人的實用工具、方案、平台清單。
          內容以可查證的官方連結為主，不寫時效性資訊（價格、優惠碼）。
          正式使用前請至各平台查詢最新細節。
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {RECOMMENDATION_CATEGORIES.map((c) => (
          <Link
            key={c.key}
            to={`/recommendation/${c.key}`}
            className="card-interactive block p-5 no-underline aspect-[4/3]
                       flex flex-col justify-between"
          >
            <div className="text-module-recommendation w-20 h-20 sm:w-24 sm:h-24
                            mt-auto mb-3 mx-auto flex items-center justify-center">
              <RecommendationCategoryIcon slug={c.key} className="w-full h-full" />
            </div>

            <div className="space-y-1 text-center">
              <div className="text-base font-semibold text-content-primary">
                {c.title}
              </div>
              <div className="text-xs text-content-muted italic">
                {c.subtitle}
              </div>
              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-content-secondary">
                  {COUNT_MAP[c.key]} 項
                </span>
                <span className="text-brand-burgundy font-medium">進入 →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 提交推薦 · user_submissions form（PAT-67/68/69） */}
      <section className="card bg-brand-gold-soft border-brand-gold/30 max-w-2xl">
        <details>
          <summary className="cursor-pointer flex items-center justify-between gap-3
                              hover:text-brand-burgundy transition-colors">
            <div>
              <div className="text-sm font-medium text-content-primary">
                📝 有推薦想貢獻？
              </div>
              <div className="text-xs text-content-muted mt-1 leading-relaxed">
                歡迎提交你認為有用的工具、方案、平台。
              </div>
            </div>
            <span className="text-xs text-brand-burgundy shrink-0">展開 →</span>
          </summary>
          <div className="pt-4 mt-3 border-t border-border-subtle">
            <SubmissionForm
              submissionType="new_recommendation"
              titlePlaceholder="推薦名稱"
              contentPlaceholder="推薦的類別、用途、官網、你的體驗"
            />
          </div>
        </details>
      </section>

      <UserSubmissionsList
        submissionType="new_recommendation"
        title="尚未分類的使用者推薦"
      />
    </div>
  );
}
