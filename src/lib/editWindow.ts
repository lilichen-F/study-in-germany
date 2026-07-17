/**
 * 貼文/評價 15 分鐘編輯窗（Phase BI，見 PAT-170）。
 * 前端僅用於決定是否顯示編輯入口，真正防線是 listings/school_reviews
 * 的 UPDATE policy（USING 子句內含相同的 15 分鐘限制）。
 */
export const EDIT_WINDOW_MINUTES = 15;

export function isWithinEditWindow(createdAt: string): boolean {
  const createdMs = new Date(createdAt).getTime();
  return Date.now() - createdMs < EDIT_WINDOW_MINUTES * 60 * 1000;
}
