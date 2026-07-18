import { Link } from 'react-router-dom';
import { IconListCheck } from '@tabler/icons-react';
import VisaMatcherQuiz from '../components/edu/VisaMatcherQuiz';

/**
 * 簽證快速配對問卷頁（Phase BT.b）。
 * 獨立路由，供新手導覽「還不清楚」選項與其他入口導向；完成後導向
 * /edu/visa-selector?recommend=... 呈現推薦卡片，不在本頁自行渲染卡片內容。
 */
export default function VisaMatcher() {
  return (
    <div className="space-y-8">
      <div>
        <Link to="/edu" className="text-xs no-underline">
          ← 回赴德指南
        </Link>
      </div>

      <header className="flex items-start gap-4">
        <div className="text-module-edu w-14 h-14 sm:w-16 sm:h-16 shrink-0">
          <IconListCheck className="w-full h-full" stroke={1.5} />
        </div>
        <div>
          <div className="text-xs text-content-muted uppercase tracking-wider mb-1">
            3 個問題，快速找到方向
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-content-primary">
            簽證快速配對
          </h1>
          <p className="text-sm text-content-secondary mt-2 max-w-2xl leading-relaxed">
            回答幾個問題，我們幫你標出可能適用的簽證卡——這只是建議起點，
            全部 14 種類型隨時可以自行瀏覽比對。
          </p>
        </div>
      </header>

      <VisaMatcherQuiz />
    </div>
  );
}
