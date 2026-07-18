import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/useAuth';
import {
  PERSONA_STAGE_LABELS,
  PERSONA_MODULE_MAP,
  markOnboardingCompleted,
  markSkippedOnboardingBefore,
  setLocalPersonaStage,
} from '../lib/onboarding';
import type { PersonaStage } from '../lib/onboarding';

interface Props {
  open: boolean;
  onClose: () => void;
  /** Phase AX：僅在使用者「選定階段」完成導覽時觸發，略過導覽（skip）不觸發 */
  onStageSelected?: () => void;
}

type Step = 'stage' | 'closing';

/**
 * DS v4.2 · 新手導覽（精簡版）
 * Step 1 階段判斷 → Step 5 收尾，中間跳過期限/推播（功能本體未建）
 */
export default function OnboardingModal({ open, onClose, onStageSelected }: Props) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('stage');
  const [selectedStage, setSelectedStage] = useState<PersonaStage | null>(null);

  /** Phase BA：略過導覽的統一出口——略過按鈕／ESC／背景點擊／關閉 X 皆走這裡，
   * 一律寫入 has_skipped_onboarding_before 永久旗標（見 PAT-161）。與
   * handleFinish（選定階段完成）路徑完全分開，不影響 AX 既有 Path A 邏輯 */
  const handleSkipClose = () => {
    markOnboardingCompleted();
    markSkippedOnboardingBefore();
    onClose();
  };

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkipClose();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  const handleSelectStage = async (stage: PersonaStage | 'skip') => {
    if (stage === 'skip') {
      handleSkipClose();
      return;
    }

    setSelectedStage(stage);
    setLocalPersonaStage(stage);

    if (user) {
      await supabase.from('profiles').update({ persona_stage: stage }).eq('id', user.id);
    }

    setStep('closing');
  };

  const handleFinish = () => {
    markOnboardingCompleted();
    onClose();
    if (selectedStage) {
      onStageSelected?.();
      navigate(`/edu/${PERSONA_MODULE_MAP[selectedStage]}`);
    }
  };

  /**
   * Phase BT.b：「還不清楚，先看看適合的簽證」——視為 Path A 的一種
   * （積極參與,非略過)：呼叫 markOnboardingCompleted（非
   * markSkippedOnboardingBefore)+ onStageSelected（觸發既有
   * PostOnboardingLoginPrompt 一次性提示,與選定階段完全同一組訊號),
   * 但沒有對應的 PersonaStage 可設定,故不呼叫 setLocalPersonaStage／
   * 不寫入 profiles.persona_stage,直接導向簽證配對問卷（獨立元件,
   * 見 VisaMatcherQuiz.tsx),不經過既有「closing」步驟的階段確認畫面
   * （該畫面文案「好的,我們幫你安排好了」是針對選定具體階段設計,問卷
   * 才是這個選項自然的下一步)。
   */
  const handleStartQuiz = () => {
    markOnboardingCompleted();
    onClose();
    onStageSelected?.();
    navigate('/edu/visa-matcher');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center
                    bg-black/40 backdrop-blur-sm" onClick={handleSkipClose}>
      <div
        className="relative w-full sm:max-w-md bg-surface-canvas rounded-t-2xl sm:rounded-2xl
                   border border-border-subtle shadow-xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Phase BA：關閉 X（略過導覽的其中一種出口，見 handleSkipClose） */}
        <button
          type="button"
          onClick={handleSkipClose}
          aria-label="關閉"
          className="absolute top-3 right-3 text-content-muted hover:text-content-primary
                     transition-colors p-1"
        >
          ✕
        </button>

        {step === 'stage' && (
          <>
            <h2 className="text-lg font-semibold text-content-primary mb-1">
              你目前在哪個階段？
            </h2>
            <p className="text-xs text-content-muted mb-4">
              我們會幫你把最相關的內容放在前面
            </p>
            <div className="space-y-2">
              {(Object.keys(PERSONA_STAGE_LABELS) as PersonaStage[]).map((stage) => (
                <button
                  key={stage}
                  type="button"
                  onClick={() => handleSelectStage(stage)}
                  className="w-full text-left p-3 rounded-lg border border-border-subtle
                             hover:border-brand-gold transition-colors"
                >
                  <div className="text-sm font-medium text-content-primary">
                    {PERSONA_STAGE_LABELS[stage].label}
                  </div>
                  <div className="text-xs text-content-muted mt-0.5">
                    {PERSONA_STAGE_LABELS[stage].hint}
                  </div>
                </button>
              ))}
              {/* Phase BT.b：獨立於既有 PersonaStage 按鈕之外，但視覺樣式
                  一致（積極參與選項，非略過），與下方「跳過」連結明確區隔 */}
              <button
                type="button"
                onClick={handleStartQuiz}
                className="w-full text-left p-3 rounded-lg border border-border-subtle
                           hover:border-brand-gold transition-colors"
              >
                <div className="text-sm font-medium text-content-primary">還不清楚</div>
                <div className="text-xs text-content-muted mt-0.5">先看看適合我的簽證有哪些</div>
              </button>
            </div>
            <button
              type="button"
              onClick={() => handleSelectStage('skip')}
              className="w-full mt-3 text-xs text-content-muted hover:text-content-secondary"
            >
              跳過，直接瀏覽
            </button>
          </>
        )}

        {step === 'closing' && selectedStage && (
          <>
            <h2 className="text-lg font-semibold text-content-primary mb-2">
              好的，我們幫你安排好了
            </h2>
            <p className="text-sm text-content-secondary mb-4">
              之後可以隨時從導覽列「赴德指南」回到這裡，
              或於「我的資料」頁面重新設定你的階段。
            </p>
            <button
              type="button"
              onClick={handleFinish}
              className="btn-primary w-full"
            >
              開始瀏覽
            </button>
          </>
        )}
      </div>
    </div>
  );
}
