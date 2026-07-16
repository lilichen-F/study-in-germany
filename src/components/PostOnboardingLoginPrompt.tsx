import { useEffect, useState } from 'react';
import { useAuth } from '../lib/useAuth';

const DISMISSED_KEY = 'post_onboarding_login_prompt_dismissed';
const EVENT_NAME = 'onboarding-stage-selected';

export function isPostOnboardingLoginPromptDismissed(): boolean {
  return localStorage.getItem(DISMISSED_KEY) === 'true';
}

function dismiss(): void {
  localStorage.setItem(DISMISSED_KEY, 'true');
}

/** OnboardingModal 呼叫此函式通知「使用者選定階段完成導覽」（略過導覽不呼叫） */
export function notifyOnboardingStageSelected(): void {
  window.dispatchEvent(new Event(EVENT_NAME));
}

/**
 * Phase AX · 新手導覽「選定階段」完成後緊接彈出的登入提示（可略過）。
 *
 * 掛載於 App.tsx 根層級（比照 WorkflowProgressProvider 的既有模式），而非
 * Home.tsx 內部——因為 OnboardingModal 完成導覽後會呼叫 navigate() 導向
 * /edu/:slug，若本元件的開關狀態存在於 Home.tsx，Home 會在同一個事件處理
 * 常式內被導覽卸載，狀態更新永遠來不及渲染。改用 window CustomEvent
 * （notifyOnboardingStageSelected）通知，本元件常駐監聽，不受路由切換影響。
 *
 * 略過導覽（skip）不會觸發此提示；已登入者不會觸發；點擊「稍後再說」／
 * 背景／ESC 皆視為永久略過（寫入 DISMISSED_KEY），後續造訪不再自動彈出；
 * 完成登入後 user 變為 truthy，元件自行隱藏，不需額外旗標。
 * 沿用 OnboardingModal 既有的 modal 容器樣式（ZenTheme class 一致），不新
 * 起版型；未使用瀏覽器原生 alert/confirm。
 */
export default function PostOnboardingLoginPrompt() {
  const { user, signInWithGoogle } = useAuth();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => {
      if (!user && !isPostOnboardingLoginPromptDismissed()) {
        setOpen(true);
      }
    };
    window.addEventListener(EVENT_NAME, handler);
    return () => window.removeEventListener(EVENT_NAME, handler);
  }, [user]);

  const visible = open && !user;

  useEffect(() => {
    if (!visible) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dismiss();
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [visible]);

  if (!visible) return null;

  const handleDismiss = () => {
    dismiss();
    setOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center
                 bg-black/40 backdrop-blur-sm"
      onClick={handleDismiss}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="post-onboarding-login-prompt-title"
        className="w-full sm:max-w-md bg-surface-canvas rounded-t-2xl sm:rounded-2xl
                   border border-border-subtle shadow-xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="post-onboarding-login-prompt-title"
          className="text-lg font-semibold text-content-primary mb-4"
        >
          登入即可儲存你的進度、留言與追蹤
        </h2>
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => signInWithGoogle()}
            className="btn-primary w-full"
          >
            Google 登入
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            className="w-full text-xs text-content-muted hover:text-content-secondary"
          >
            稍後再說
          </button>
        </div>
      </div>
    </div>
  );
}
