import { useOnlineStatus } from '../lib/useOnlineStatus';

export default function OfflineBanner() {
  const online = useOnlineStatus();
  if (online) return null;
  return (
    <div
      role="alert"
      className="bg-state-danger/15 border-b border-state-danger/40
                 text-state-danger text-xs text-center py-1.5 font-medium"
    >
      目前離線，無法讀取或送出資料。恢復連線後功能自動恢復。
    </div>
  );
}
