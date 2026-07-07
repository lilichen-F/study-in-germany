import { useRef, useState } from 'react';
import { PHOTO_CONFIG, compressImage, uploadPhoto, deletePhoto } from '../lib/storage';
import { useAuth } from '../lib/useAuth';

interface Props {
  value: string[];
  onChange: (urls: string[]) => void;
  disabled?: boolean;
}

export default function PhotoUploader({ value, onChange, disabled }: Props) {
  const { user } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const canAddMore = value.length < PHOTO_CONFIG.MAX_PER_LISTING && !disabled;

  const handleFiles = async (files: FileList | null) => {
    if (!files || !user) return;
    setErr(null);
    const remaining = PHOTO_CONFIG.MAX_PER_LISTING - value.length;
    const toUpload = Array.from(files).slice(0, remaining);

    setUploading(true);
    const added: string[] = [];
    for (const file of toUpload) {
      try {
        const blob = await compressImage(file);
        const url = await uploadPhoto(user.id, blob);
        added.push(url);
      } catch (e) {
        setErr((e as Error).message);
      }
    }
    setUploading(false);
    if (added.length > 0) onChange([...value, ...added]);
    if (inputRef.current) inputRef.current.value = '';
  };

  const removeAt = async (i: number) => {
    const url = value[i];
    deletePhoto(url).catch(() => { /* orphan acceptable */ });
    onChange(value.filter((_, idx) => idx !== i));
  };

  return (
    <div className="space-y-2">
      <div className="label">
        照片（最多 {PHOTO_CONFIG.MAX_PER_LISTING} 張，自動壓縮至 {PHOTO_CONFIG.MAX_WIDTH}px）
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {value.map((url, i) => (
          <div
            key={url}
            className="relative aspect-square rounded-lg overflow-hidden border border-border-subtle"
          >
            <img src={url} alt="" className="w-full h-full object-cover" />
            {!disabled && (
              <button
                type="button"
                onClick={() => removeAt(i)}
                aria-label={`移除第 ${i + 1} 張照片`}
                className="absolute top-1 right-1 bg-black/60 text-white text-xs rounded px-1.5 py-0.5"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        {canAddMore && (
          <label className="aspect-square rounded-lg border-2 border-dashed border-border-subtle
                            flex items-center justify-center cursor-pointer text-xs
                            text-content-secondary hover:border-brand-burgundy hover:text-brand-burgundy
                            transition-colors">
            {uploading ? '上傳中…' : '+ 加照片'}
            <input
              ref={inputRef}
              type="file"
              accept={PHOTO_CONFIG.ACCEPTED.join(',')}
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
              disabled={uploading}
            />
          </label>
        )}
      </div>
      {err && <div className="text-xs text-state-danger">{err}</div>}
      <div className="text-xs text-content-muted">
        支援 JPEG / PNG / WebP，單檔 ≤ {PHOTO_CONFIG.MAX_BYTES_ORIGINAL / 1024 / 1024} MB。
      </div>
    </div>
  );
}
