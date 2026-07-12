import { supabase } from './supabase';

export interface DeleteAccountResult {
  success: boolean;
  error?: string;
}

/**
 * 帳號自助匿名化
 *
 * 限制：本專案僅有 anon key，無法從 client 端真正刪除 auth.users。
 * 策略：清空 profiles 內的識別性資訊（display_name/avatar_url），
 * 使用者產生的內容（評價/貼文/建議文字）保留但不再顯示個人識別，
 * 因為 UI 讀取 display_name 時本來就會顯示「匿名」（現行 fallback 邏輯）。
 *
 * auth.users 記錄本身不受影響，使用者可重新登入，
 * 但重新登入後會看到自己 profiles 已被清空的狀態。
 * 若需要徹底刪除 auth.users 記錄，需 Lily 手動於 Supabase Dashboard 處理。
 */
export async function deleteAccountData(userId: string): Promise<DeleteAccountResult> {
  const { error } = await supabase
    .from('profiles')
    .update({
      display_name: '已刪除的使用者',
      avatar_url: null,
    })
    .eq('id', userId);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
