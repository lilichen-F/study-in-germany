import { Link } from 'react-router-dom';
import { useHotListings } from '../lib/useHotListings';
import { boardTypeOf, isDiscussionType } from '../lib/board';
import ListingCardBody from './ListingCardBody';
import { SkeletonBox } from './Skeleton';

/**
 * 首頁「熱門討論區」區塊（Phase BB 建立，Phase BC 改為原貼文形式，見 PAT-163）
 * 卡片內容改用 ListingCardBody（與 BoardList.tsx 共用同一份貼文渲染邏輯），
 * 內文截斷於 4 行 + 展開/收合；照片相簿/續期倒數為 Board.tsx 全頁情境專屬，
 * 首頁預覽卡片不重複顯示（改以頂部單張縮圖呈現，維持卡片精簡密度）。
 * 讚數/留言數統計 footer 為「熱門」排序依據的被動指標，非互動元件——
 * 跟隨/按讚/留言/檢舉/續期/刪除等頁面級管理操作維持在 Board.tsx，不重複套用。
 *
 * Phase BI：移除「無照片時」的預設佔位圖示（原為 IconSpeakerphone，僅本元件
 * 專屬，未與 BoardList.tsx／ListingCardBody 共用邏輯，移除前已逐一確認，
 * 見 PAT-170）。真實貼文照片（l.photo_urls[0]）不受影響，仍照常顯示；
 * 無照片的貼文改為完全不渲染頂部縮圖區塊，卡片直接從分類標籤+日期開始。
 */
export default function HotBoardCarousel() {
  const { hot, loading } = useHotListings();

  if (loading) {
    return (
      <div className="flex gap-4 overflow-x-hidden">
        <SkeletonBox className="h-52 shrink-0 basis-[80%] sm:basis-[45%] lg:basis-[23%]" />
        <SkeletonBox className="h-52 shrink-0 basis-[80%] sm:basis-[45%] lg:basis-[23%]" />
        <SkeletonBox className="h-52 shrink-0 basis-[80%] sm:basis-[45%] lg:basis-[23%]" />
        <SkeletonBox className="h-52 shrink-0 basis-[80%] sm:basis-[45%] lg:basis-[23%]" />
      </div>
    );
  }

  if (hot.length === 0) return null;

  return (
    <div
      className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3
                 scroll-smooth
                 [scrollbar-color:rgb(var(--border-strong))_transparent]
                 [scrollbar-width:thin]"
    >
      {hot.map((l) => {
        const kindIsDiscussion = isDiscussionType(boardTypeOf(l));
        return (
          <Link
            key={l.id}
            to="/board"
            className={`group snap-start no-underline shrink-0
                       basis-[80%] sm:basis-[45%] lg:basis-[23%]
                       card-interactive p-0 overflow-hidden
                       ${kindIsDiscussion ? 'bg-surface-section border-brand-gold/30' : ''}`}
          >
            {l.photo_urls?.[0] && (
              <div className="h-24 bg-surface-section overflow-hidden">
                <img src={l.photo_urls[0]} alt="" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-4">
              <ListingCardBody listing={l} truncateDescription showPhotos={false} />
              <div className="mt-3 flex items-center justify-between text-xs">
                {l.like_count > 0 ? (
                  <span className="text-brand-gold font-medium">
                    ♥ {l.like_count}
                  </span>
                ) : (
                  <span className="text-content-muted">尚無按讚</span>
                )}
                <span className="text-content-secondary">
                  {l.comment_count > 0 ? `${l.comment_count} 則留言` : '—'}
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
