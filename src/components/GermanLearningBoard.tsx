import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type {
  Recommendation, GermanLearningBoard as BoardKey, GermanLearningLevel,
  GermanLearningStatus, GermanLearningAudience, GermanLearningFee,
} from '../lib/recommendation';
import {
  GERMAN_LEARNING_BOARD_LABEL, GERMAN_LEARNING_BOARD_ORDER, GERMAN_LEARNING_LEVEL_ORDER,
  GERMAN_LEARNING_STATUS_LABEL, GERMAN_LEARNING_AUDIENCE_LABEL, GERMAN_LEARNING_FEE_LABEL,
} from '../lib/recommendation';
import { useCardRatingsMap } from '../lib/useCardRatings';
import CardRating from './CardRating';

type LevelFilter = 'all' | GermanLearningLevel;
type FeeFilter = 'all' | GermanLearningFee;
/**
 * Phase BJ：費用篩選選項須含「未標示」且不得被預設值悄悄篩掉——'all'
 * 為「不篩選」，顯示全部（含 unknown）；使用者也可主動選「未標示」單獨
 * 查看，兩者皆不會讓 unknown 資源從畫面消失，見 PAT-171。
 */
const FEE_OPTIONS = Object.keys(GERMAN_LEARNING_FEE_LABEL) as GermanLearningFee[];

/**
 * Phase BF：新增「全部」虛擬子板塊，值為 'all'——與 GermanLearningLevel
 * 篩選沿用同一個 'all' 字面值慣例（該處也是「不篩選 = all」），保持全檔
 * 一致的命名習慣，非另創新詞彙。'all' 只在 UI／URL 層存在，不寫入
 * recommendation.ts 的 GermanLearningBoard 型別，因為它不是資料本身的
 * 分類標籤，只是「不過濾 board 維度」的操作語意。
 */
type BoardTabKey = BoardKey | 'all';
const BOARD_TAB_ORDER: BoardTabKey[] = ['all', ...GERMAN_LEARNING_BOARD_ORDER];
const BOARD_TAB_LABEL: Record<BoardTabKey, string> = {
  all: '全部',
  ...GERMAN_LEARNING_BOARD_LABEL,
};

const AUDIENCE_OPTIONS = Object.keys(GERMAN_LEARNING_AUDIENCE_LABEL) as GermanLearningAudience[];

/** 非正常運作狀態的視覺分級：changed/stopped-but-usable 為輕度提醒，outdated/unconfirmed 為較強提醒 */
const STATUS_BADGE_CLASS: Record<Exclude<GermanLearningStatus, 'active'>, string> = {
  changed: 'bg-brand-gold-soft text-brand-gold-hover',
  discontinued_usable: 'bg-brand-gold-soft text-brand-gold-hover',
  outdated: 'bg-state-danger/10 text-state-danger',
  unconfirmed: 'bg-state-danger/10 text-state-danger',
};

interface Props {
  items: Recommendation[];
}

/**
 * 德文學習大分類的「子板塊」導覽（Phase BE，見 PAT-165）。
 * 9 子板塊 tab + 篩選（等級/適合族群），抽成獨立元件而非塞進
 * RecommendationCategory.tsx 的通用渲染路徑——後者服務其餘 9 個單層分類，
 * 這裡的兩層結構複雜度明顯更高，獨立元件可避免通用路徑被拖得難以維護。
 *
 * 子板塊選取透過 URL query param `sub` 記錄（沿用 Board.tsx 已建立的
 * useSearchParams 慣例，見 PAT-130），支援分享連結直接回到指定子板塊。
 *
 * Phase BF：移除「狀態」篩選下拉（原預設僅顯示正常運作，會預先過濾掉
 * 使用者可能想看到的非正常項目）。狀態改為純標籤，僅以卡片上既有的
 * 兩級視覺徽章呈現（見 STATUS_BADGE_CLASS），由使用者自行判斷，不再由
 * 篩選機制預先篩掉。
 *
 * Phase BF：新增「全部」子板塊並設為預設（原預設是「綜合」）——與上述
 * 「不預先篩掉使用者可能想看的內容」是同一個設計方向的延伸：讓使用者
 * 一進頁面就看到全部資源，再自行用 tab／篩選縮小範圍，而非被指定看
 * 一個武斷的起始子板塊。
 *
 * Phase BJ：新增費用篩選（免費/付費/未標示，見 PAT-171，只有原文明確
 * 提及費用性質者才標註 free/paid，其餘一律 unknown）；適合族群「初學者」
 * 更名為「入門」並新增「中級」「高級」（依既有 level CEFR 欄位機械推導，
 * 非人工重新判斷）。
 */
export default function GermanLearningBoard({ items }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [board, setBoard] = useState<BoardTabKey>(() => {
    const s = searchParams.get('sub');
    return (BOARD_TAB_ORDER as string[]).includes(s ?? '') ? (s as BoardTabKey) : 'all';
  });
  const [levelFilter, setLevelFilter] = useState<LevelFilter>('all');
  const [feeFilter, setFeeFilter] = useState<FeeFilter>('all');
  const [audienceFilter, setAudienceFilter] = useState<GermanLearningAudience[]>([]);

  // Phase BH：資源卡片五星評分（見 PAT-169）
  const { statsMap, submitRating } = useCardRatingsMap('german_learning');

  useEffect(() => {
    const s = searchParams.get('sub');
    if (s && (BOARD_TAB_ORDER as string[]).includes(s)) {
      setBoard(s as BoardTabKey);
    }
  }, [searchParams]);

  const handleBoardClick = (key: BoardTabKey) => {
    setBoard(key);
    setSearchParams({ sub: key }, { replace: true });
  };

  const toggleAudience = (a: GermanLearningAudience) => {
    setAudienceFilter((prev) => (prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]));
  };

  const visibleItems = useMemo(() => {
    // 'all' 直接疊代 items 本身（每筆資源在陣列中只存在一次，不論 board
    // 陣列包含幾個子板塊標籤），故聯集顯示天然不會重複，不需額外去重邏輯
    return items.filter((item) => {
      if (board !== 'all' && !item.board?.includes(board)) return false;
      if (levelFilter !== 'all' && !item.level?.includes(levelFilter)) return false;
      if (feeFilter !== 'all' && item.fee !== feeFilter) return false;
      if (audienceFilter.length > 0 && !audienceFilter.some((a) => item.audience?.includes(a))) return false;
      return true;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, board, levelFilter, feeFilter, audienceFilter]);

  return (
    <div className="space-y-4">
      {/* 「全部」＋ 9 子板塊 tab */}
      <div className="flex flex-wrap gap-2 border-b border-border-subtle pb-3">
        {BOARD_TAB_ORDER.map((b) => (
          <button
            key={b}
            type="button"
            onClick={() => handleBoardClick(b)}
            className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
              board === b
                ? 'border-brand-burgundy text-brand-burgundy bg-brand-burgundy/5'
                : 'border-border-subtle text-content-secondary hover:border-border-strong'
            }`}
          >
            {BOARD_TAB_LABEL[b]}
          </button>
        ))}
      </div>

      {/* 篩選列：等級/費用單選下拉（比照 Schools.tsx），適合族群多選 chip（比照 Phase BD 找房頁先例）。
          Phase BJ 新增費用維度：「任意」預設值不篩選，unknown 資源正常顯示不被悄悄隱藏；
          「未標示」為明確選項，使用者可主動篩選查看（見 PAT-171） */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value as LevelFilter)}
          className="text-sm px-3 py-2 rounded-lg border border-border-subtle
                     bg-surface-canvas text-content-primary
                     focus:outline-none focus:border-brand-burgundy
                     hover:border-brand-gold transition-colors"
        >
          <option value="all">等級：任意</option>
          {GERMAN_LEARNING_LEVEL_ORDER.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>

        <select
          value={feeFilter}
          onChange={(e) => setFeeFilter(e.target.value as FeeFilter)}
          className="text-sm px-3 py-2 rounded-lg border border-border-subtle
                     bg-surface-canvas text-content-primary
                     focus:outline-none focus:border-brand-burgundy
                     hover:border-brand-gold transition-colors"
        >
          <option value="all">費用：任意</option>
          {FEE_OPTIONS.map((f) => (
            <option key={f} value={f}>{GERMAN_LEARNING_FEE_LABEL[f]}</option>
          ))}
        </select>

        <div className="flex flex-wrap gap-2">
          {AUDIENCE_OPTIONS.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => toggleAudience(a)}
              className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                audienceFilter.includes(a)
                  ? 'border-brand-burgundy text-brand-burgundy bg-brand-burgundy/5'
                  : 'border-border-subtle text-content-secondary hover:border-border-strong'
              }`}
            >
              {GERMAN_LEARNING_AUDIENCE_LABEL[a]}
            </button>
          ))}
        </div>

        <span className="text-xs text-content-muted ml-auto">
          共 {visibleItems.length} 項
        </span>
      </div>

      {visibleItems.length === 0 ? (
        <div className="card text-center text-content-muted py-8">
          沒有符合條件的資源，試試調整篩選條件。
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {visibleItems.map((item) => (
            <div key={item.id} className="card space-y-2">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-semibold text-content-primary leading-snug">
                  {item.title}
                </h3>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-brand-burgundy no-underline hover:text-brand-burgundy-hover shrink-0"
                >
                  官網 ↗
                </a>
              </div>

              {item.is_physical && (
                <span className="inline-block text-xs px-2 py-0.5 rounded font-medium bg-brand-burgundy-surface text-brand-burgundy">
                  📘 實體教材
                </span>
              )}

              {item.resource_status && item.resource_status !== 'active' && (
                <span
                  className={`inline-block text-xs px-2 py-0.5 rounded font-medium ${STATUS_BADGE_CLASS[item.resource_status]}`}
                >
                  ⚠ {GERMAN_LEARNING_STATUS_LABEL[item.resource_status]}
                </span>
              )}

              {item.summary && (
                <p className="text-sm text-content-secondary leading-relaxed">{item.summary}</p>
              )}
              {item.points && (
                <ul className="space-y-1 pl-4 list-disc text-xs text-content-secondary marker:text-content-muted">
                  {item.points.map((p, i) => (
                    <li key={i} className="leading-relaxed">{p}</li>
                  ))}
                </ul>
              )}
              {item.detail && (
                <details className="text-xs">
                  <summary className="cursor-pointer text-content-muted hover:text-content-primary">
                    查看完整說明
                  </summary>
                  <p className="mt-1.5 text-content-secondary leading-relaxed">{item.detail}</p>
                </details>
              )}

              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-1 pt-1">
                  {item.tags.map((tag) => (
                    <span key={tag} className="text-xs px-1.5 py-0.5 rounded bg-surface-hover text-content-muted">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Phase BI：評分元件移至卡片最後一列並靠右（見 PAT-170） */}
              <CardRating
                category="german_learning"
                cardTitle={item.title}
                cardUrl={item.url}
                stats={statsMap.get(item.id)}
                onRate={(r) => submitRating(item.id, r)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
