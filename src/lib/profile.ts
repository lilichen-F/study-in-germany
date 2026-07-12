export interface UserProfile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  registration_seq: number | null;
  badges: string[]; // Phase K-2 具體結構
  created_at: string;
}

/**
 * 3 種 display_name 選項：
 * - google: 使用 Google 帳號的顯示名（現況、預設）
 * - anonymous: 使用「User_{registration_seq 9位數字補零}」匿名編號
 * - custom: 自訂
 */
export type DisplayNameOption = 'google' | 'anonymous' | 'custom';

export function computeDisplayName(
  option: DisplayNameOption,
  profile: Pick<UserProfile, 'display_name' | 'registration_seq'>,
  googleName: string | null,
  customName: string
): string {
  if (option === 'anonymous' && profile.registration_seq !== null) {
    return formatAnonymousName(profile.registration_seq);
  }
  if (option === 'custom') {
    return customName.trim();
  }
  return googleName ?? profile.display_name ?? '匿名';
}

/**
 * 匿名編號格式：User_{9位數字補零}
 * 例：registration_seq=1 → "User_000000001"
 */
export function formatAnonymousName(registrationSeq: number): string {
  return `User_${String(registrationSeq).padStart(9, '0')}`;
}
