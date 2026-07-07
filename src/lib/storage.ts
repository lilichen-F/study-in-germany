import { supabase } from './supabase';

export const PHOTO_CONFIG = {
  MAX_PER_LISTING: 6,
  MAX_BYTES_ORIGINAL: 8 * 1024 * 1024, // 8 MB 前端接受上限
  MAX_WIDTH: 1600,
  JPEG_QUALITY: 0.85,
  ACCEPTED: ['image/jpeg', 'image/png', 'image/webp'] as const,
  BUCKET: 'listings',
} as const;

/**
 * Client-side 壓縮：downscale + JPEG 轉檔。
 * 回傳壓縮後 Blob（image/jpeg）。
 */
export async function compressImage(file: File): Promise<Blob> {
  if (!(PHOTO_CONFIG.ACCEPTED as readonly string[]).includes(file.type)) {
    throw new Error(`不支援的格式：${file.type}`);
  }
  if (file.size > PHOTO_CONFIG.MAX_BYTES_ORIGINAL) {
    throw new Error(`檔案過大（> ${PHOTO_CONFIG.MAX_BYTES_ORIGINAL / 1024 / 1024} MB）`);
  }

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, PHOTO_CONFIG.MAX_WIDTH / bitmap.width);
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 建立失敗');
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close?.();

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, 'image/jpeg', PHOTO_CONFIG.JPEG_QUALITY)
  );
  if (!blob) throw new Error('壓縮失敗');
  return blob;
}

/**
 * 上傳至 Storage。Path 格式：<user_id>/<uuid>.jpg
 * Storage RLS 會驗證 foldername 第一段 === auth.uid()。
 */
export async function uploadPhoto(userId: string, blob: Blob): Promise<string> {
  const filename = `${crypto.randomUUID()}.jpg`;
  const path = `${userId}/${filename}`;

  const { error } = await supabase.storage
    .from(PHOTO_CONFIG.BUCKET)
    .upload(path, blob, { contentType: 'image/jpeg', upsert: false });
  if (error) throw error;

  const { data } = supabase.storage.from(PHOTO_CONFIG.BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

/**
 * 從 public URL 反解路徑刪除。
 * 若 URL 非本人上傳，Storage RLS 會回 403（本函數 swallow error）。
 */
export async function deletePhoto(url: string): Promise<void> {
  const marker = `/${PHOTO_CONFIG.BUCKET}/`;
  const idx = url.indexOf(marker);
  if (idx < 0) return;
  const path = url.slice(idx + marker.length);
  await supabase.storage.from(PHOTO_CONFIG.BUCKET).remove([path]);
}
