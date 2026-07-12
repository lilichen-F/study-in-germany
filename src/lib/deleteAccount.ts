import { supabase } from './supabase';

export interface DeleteAccountResult {
  success: boolean;
  error?: string;
}

const GRACE_PERIOD_DAYS = 7;

/**
 * 帳號軟刪除（7 天寬限期）
 *
 * 限制：本專案僅有 anon key，無法從 client 端真正刪除 auth.users。
 *
 * 策略：
 * - 立即清空 display_name/avatar_url（隱藏個人識別）+ 記錄 deletion_requested_at
 * - 使用者產生的內容（評價/貼文/建議文字）保留
 * - 若使用者在 7 天內重新登入，可選擇「恢復帳號」→ 用 Google 帳號的姓名/頭像重建 profile
 * - 超過 7 天未恢復，deletion_requested_at 會於下次登入時被靜默清除（視為定案），
 *   不再提示恢復選項（但技術上 auth.users 記錄依然存在）
 */
export async function deleteAccountData(userId: string): Promise<DeleteAccountResult> {
  const { error } = await supabase
    .from('profiles')
    .update({
      display_name: '已刪除的使用者',
      avatar_url: null,
      deletion_requested_at: new Date().toISOString(),
    })
    .eq('id', userId);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

export interface DeletionStatus {
  isPendingDeletion: boolean;
  daysRemaining: number;
  requestedAt: string | null;
}

/**
 * 檢查使用者是否處於刪除寬限期內
 */
export function computeDeletionStatus(deletionRequestedAt: string | null): DeletionStatus {
  if (!deletionRequestedAt) {
    return { isPendingDeletion: false, daysRemaining: 0, requestedAt: null };
  }

  const requestedTime = new Date(deletionRequestedAt).getTime();
  const now = Date.now();
  const elapsedDays = (now - requestedTime) / (1000 * 60 * 60 * 24);
  const daysRemaining = Math.max(0, GRACE_PERIOD_DAYS - elapsedDays);

  return {
    isPendingDeletion: daysRemaining > 0,
    daysRemaining: Math.ceil(daysRemaining),
    requestedAt: deletionRequestedAt,
  };
}

/**
 * 恢復帳號 · 用 Google metadata 重建 display_name/avatar_url
 */
export async function restoreAccount(
  userId: string,
  googleName: string | null,
  googleAvatarUrl: string | null
): Promise<DeleteAccountResult> {
  const { error } = await supabase
    .from('profiles')
    .update({
      display_name: googleName ?? '匿名',
      avatar_url: googleAvatarUrl,
      deletion_requested_at: null,
    })
    .eq('id', userId);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * 靜默定案（超過寬限期後清除 deletion_requested_at，不再提示）
 */
export async function finalizeDeletion(userId: string): Promise<void> {
  await supabase
    .from('profiles')
    .update({ deletion_requested_at: null })
    .eq('id', userId);
}
