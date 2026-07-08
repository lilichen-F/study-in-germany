import { useState } from 'react';
import { MOCK_MODE } from '../lib/mockMode';
import { useTheme } from '../lib/theme';
import { useOnlineStatus } from '../lib/useOnlineStatus';

/**
 * 只於 dev 模式（import.meta.env.DEV）顯示。生產 build 因條件式在 return 頂端而被
 * dead-code eliminated。展開後顯示：mock 狀態、主題、線上/離線、build 版本。
 */
export default function DevBadge() {
  const [open, setOpen] = useState(false);
  const { theme, preference } = useTheme();
  const online = useOnlineStatus();
  if (!import.meta.env.DEV) return null;

  return (
    <div className="fixed bottom-4 left-4 z-40 text-xs font-mono select-none">
      <button
        onClick={() => setOpen((v) => !v)}
        className="px-2 py-1 rounded bg-content-primary/85 text-surface-canvas
                   opacity-40 hover:opacity-100 transition-opacity"
        aria-expanded={open}
        aria-label="開發資訊"
      >
        {open ? '×' : 'dev'}
      </button>
      {open && (
        <div className="mt-1 p-2 rounded card space-y-1 min-w-[10rem]">
          <div>version: {__APP_VERSION__}</div>
          <div>mock: {MOCK_MODE ? 'on' : 'off'}</div>
          <div>theme: {theme} ({preference})</div>
          <div>net: {online ? 'online' : 'offline'}</div>
        </div>
      )}
    </div>
  );
}
