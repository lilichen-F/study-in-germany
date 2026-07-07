export interface Profile {
  id: string
  display_name: string
  avatar_url: string | null
}

export interface SchoolReview {
  id: number
  school_id: string
  user_id: string
  stars_teaching: number | null
  stars_environment: number | null
  comment_text: string
  created_at: string
  /** 前端以 user_id 另查 profiles 後合併（schema 無 reviews→profiles 外鍵，無法用 PostgREST embed） */
  profile?: Profile
}

export type ListingType = 'secondhand' | 'accommodation'

export interface Listing {
  id: number
  user_id: string
  type: ListingType
  region: string
  title: string
  description: string
  price: string | null
  contact_info: string
  expires_at: string
  created_at: string
  profile?: Profile
}

export interface School {
  id: string
  name: string
  city: string
  priceRange: string
  website: string
  description: string
}

export interface FaqItem {
  question: string
  answer: string
}

/** 依 user_id 批次撈 profiles 並合併到列表資料上 */
export async function attachProfiles<T extends { user_id: string; profile?: Profile }>(
  rows: T[],
  fetchProfiles: (ids: string[]) => Promise<Profile[]>,
): Promise<T[]> {
  const ids = [...new Set(rows.map((r) => r.user_id))]
  if (ids.length === 0) return rows
  const profiles = await fetchProfiles(ids)
  const byId = new Map(profiles.map((p) => [p.id, p]))
  return rows.map((r) => ({ ...r, profile: byId.get(r.user_id) }))
}
