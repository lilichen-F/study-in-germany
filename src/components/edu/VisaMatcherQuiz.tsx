import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PURPOSE_OPTIONS, FINANCE_TIER_OPTIONS, QUALIFICATION_OPTIONS,
  matchVisas,
} from '../../data/edu/visaMatcherRules';
import type { Purpose, FinanceTier, Qualification } from '../../data/edu/visaMatcherRules';
import { VISA_CARDS } from '../../data/edu/visaCards';

type QuizStep = 'purpose' | 'finance' | 'qualification' | 'result';

/**
 * 簽證快速配對問卷（Phase BT.b）。
 *
 * 獨立元件，非塞進 OnboardingModal.tsx——避免既有導覽元件複雜度失控
 * （見指令書 BT.b）。配對邏輯全數委派給 visaMatcherRules.ts 的靜態
 * 對照表，本元件僅負責收集答案與呈現，不含任何模糊推論。
 *
 * 「其餘卡片必須維持完整可見與可互動」的硬性要求由呼叫端（VisaSelector
 * 透過 ?recommend= 查詢參數）落實：本元件完成問卷後僅傳遞推薦卡片 id
 * 清單，不做任何篩選或隱藏，那些邏輯完全不在本元件的職責範圍內。
 */
export default function VisaMatcherQuiz() {
  const navigate = useNavigate();
  const [step, setStep] = useState<QuizStep>('purpose');
  const [purpose, setPurpose] = useState<Purpose | null>(null);
  const [financeTier, setFinanceTier] = useState<FinanceTier | null>(null);
  const [qualifications, setQualifications] = useState<Qualification[]>([]);

  const handlePickPurpose = (p: Purpose) => {
    setPurpose(p);
    if (p === 'unsure') {
      setStep('result');
      return;
    }
    setStep('finance');
  };

  const toggleQualification = (q: Qualification) => {
    setQualifications((prev) => (prev.includes(q) ? prev.filter((x) => x !== q) : [...prev, q]));
  };

  const handleViewResult = () => setStep('result');

  const result = purpose ? matchVisas(purpose, qualifications) : { cardIds: [], showFinanceEstimatorHint: false };
  const recommendedCards = VISA_CARDS.filter((c) => result.cardIds.includes(c.id));

  const goToVisaSelector = () => {
    if (result.cardIds.length === 0) {
      navigate('/edu/visa-selector');
      return;
    }
    navigate(`/edu/visa-selector?recommend=${result.cardIds.join(',')}`);
  };

  const restart = () => {
    setPurpose(null);
    setFinanceTier(null);
    setQualifications([]);
    setStep('purpose');
  };

  return (
    <div className="card space-y-4 max-w-xl">
      {step === 'purpose' && (
        <>
          <div>
            <h2 className="text-lg font-semibold text-content-primary">Q1. 你這次赴德的目的是？</h2>
            <p className="text-xs text-content-muted mt-1">選一個最接近你情況的選項</p>
          </div>
          <div className="space-y-2">
            {PURPOSE_OPTIONS.map((o) => (
              <button
                key={o.value}
                type="button"
                onClick={() => handlePickPurpose(o.value)}
                className="w-full text-left p-3 rounded-lg border border-border-subtle
                           hover:border-brand-gold transition-colors"
              >
                <div className="text-sm font-medium text-content-primary">{o.label}</div>
                <div className="text-xs text-content-muted mt-0.5">{o.hint}</div>
              </button>
            ))}
          </div>
        </>
      )}

      {step === 'finance' && (
        <>
          <div>
            <h2 className="text-lg font-semibold text-content-primary">Q2. 財力狀況大概是？</h2>
            <p className="text-xs text-content-muted mt-1">僅供方向參考，不會判定你「不合格」</p>
          </div>
          <div className="space-y-2">
            {FINANCE_TIER_OPTIONS.map((o) => (
              <button
                key={o.value}
                type="button"
                onClick={() => { setFinanceTier(o.value); setStep('qualification'); }}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  financeTier === o.value
                    ? 'border-brand-burgundy text-brand-burgundy bg-brand-burgundy/5'
                    : 'border-border-subtle hover:border-brand-gold'
                }`}
              >
                <div className="text-sm font-medium text-content-primary">{o.label}</div>
              </button>
            ))}
          </div>
        </>
      )}

      {step === 'qualification' && (
        <>
          <div>
            <h2 className="text-lg font-semibold text-content-primary">Q3. 學歷／經驗（可複選）</h2>
            <p className="text-xs text-content-muted mt-1">選完後點「查看結果」</p>
          </div>
          <div className="space-y-2">
            {QUALIFICATION_OPTIONS.map((o) => (
              <button
                key={o.value}
                type="button"
                onClick={() => toggleQualification(o.value)}
                aria-pressed={qualifications.includes(o.value)}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  qualifications.includes(o.value)
                    ? 'border-brand-burgundy text-brand-burgundy bg-brand-burgundy/5'
                    : 'border-border-subtle hover:border-brand-gold'
                }`}
              >
                <div className="text-sm font-medium">{o.label}</div>
              </button>
            ))}
          </div>
          <button type="button" onClick={handleViewResult} className="btn-primary w-full">
            查看結果
          </button>
        </>
      )}

      {step === 'result' && (
        <>
          {purpose === 'unsure' || recommendedCards.length === 0 ? (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-content-primary">
                建議先瀏覽全部簽證類型
              </h2>
              <p className="text-sm text-content-secondary leading-relaxed">
                目前答案組合沒有明確對應到特定簽證卡，14 種類型各有不同適用情境，
                直接逐一比對條件可能更準確，不勉強給你一個答案。
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-content-primary">
                建議看看這{recommendedCards.length > 1 ? '幾張' : '張'}卡
              </h2>
              <ul className="space-y-1.5">
                {recommendedCards.map((c) => (
                  <li key={c.id} className="text-sm text-content-primary">
                    <span className="text-xs font-mono text-content-muted mr-1.5">{c.number}</span>
                    {c.title}
                  </li>
                ))}
              </ul>
              {result.showFinanceEstimatorHint && (
                <p className="text-xs text-content-secondary italic pl-3 py-0.5
                             border-l-2 border-brand-gold/50 leading-relaxed">
                  此類簽證財力門檻為 Bürgergeld 公式估算（依家戶人數與租金而定），
                  卡片內建有「快速試算」小工具可協助估算。
                </p>
              )}
              <p className="text-xs text-content-muted">
                其餘簽證卡仍完整可見，這只是建議起點，不是篩選結果。
              </p>
            </div>
          )}
          <div className="flex gap-2 pt-2">
            <button type="button" onClick={goToVisaSelector} className="btn-primary flex-1">
              {recommendedCards.length > 0 ? '查看推薦卡片' : '瀏覽全部簽證類型'}
            </button>
            <button
              type="button"
              onClick={restart}
              className="text-xs text-content-muted hover:text-content-secondary shrink-0 px-3"
            >
              重新填寫
            </button>
          </div>
        </>
      )}
    </div>
  );
}
