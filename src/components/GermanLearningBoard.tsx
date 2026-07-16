import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type {
  Recommendation, GermanLearningBoard as BoardKey, GermanLearningLevel,
  GermanLearningStatus, GermanLearningAudience,
} from '../lib/recommendation';
import {
  GERMAN_LEARNING_BOARD_LABEL, GERMAN_LEARNING_BOARD_ORDER, GERMAN_LEARNING_LEVEL_ORDER,
  GERMAN_LEARNING_STATUS_LABEL, GERMAN_LEARNING_AUDIENCE_LABEL,
} from '../lib/recommendation';

type LevelFilter = 'all' | GermanLearningLevel;
type StatusFilter = 'all' | GermanLearningStatus;

const AUDIENCE_OPTIONS = Object.keys(GERMAN_LEARNING_AUDIENCE_LABEL) as GermanLearningAudience[];
const NON_ACTIVE_STATUS_OPTIONS = (Object.keys(GERMAN_LEARNING_STATUS_LABEL) as GermanLearningStatus[])
  .filter((s) => s !== 'active');

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
 * 9 子板塊 tab + 三維篩選（等級/適合族群/狀態），抽成獨立元件而非塞進
 * RecommendationCategory.tsx 的通用渲染路徑——後者服務其餘 9 個單層分類，
 * 這裡的兩層結構複雜度明顯更高，獨立元件可避免通用路徑被拖得難以維護。
 *
 * 子板塊選取透過 URL query param `sub` 記錄（沿用 Board.tsx 已建立的
 * useSearchParams 慣例，見 PAT-130），支援分享連結直接回到指定子板塊。
 */
export default function GermanLearningBoard({ items }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [board, setBoard] = useState<BoardKey>(() => {
    const s = searchParams.get('sub');
    return (GERMAN_LEARNING_BOARD_ORDER as string[]).includes(s ?? '')
      ? (s as BoardKey)
      : GERMAN_LEARNING_BOARD_ORDER[0];
  });
  // 預設僅顯示「正常運作」，比照指令書「使用者應能一鍵篩出僅正常運作資源」
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('active');
  const [levelFilter, setLevelFilter] = useState<LevelFilter>('all');
  const [audienceFilter, setAudienceFilter] = useState<GermanLearningAudience[]>([]);

  useEffect(() => {
    const s = searchParams.get('sub');
    if (s && (GERMAN_LEARNING_BOARD_ORDER as string[]).includes(s)) {
      setBoard(s as BoardKey);
    }
  }, [searchParams]);

  const handleBoardClick = (key: BoardKey) => {
    setBoard(key);
    setSearchParams({ sub: key }, { replace: true });
  };

  const toggleAudience = (a: GermanLearningAudience) => {
    setAudienceFilter((prev) => (prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]));
  };

  const visibleItems = useMemo(() => {
    return items.filter((item) => {
      if (!item.board?.includes(board)) return false;
      if (levelFilter !== 'all' && !item.level?.includes(levelFilter)) return false;
      if (statusFilter !== 'all' && item.resource_status !== statusFilter) return false;
      if (audienceFilter.length > 0 && !audienceFilter.some((a) => item.audience?.includes(a))) return false;
      return true;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, board, levelFilter, statusFilter, audienceFilter]);

  return (
    <div className="space-y-4">
      {/* 9 子板塊 tab */}
      <div className="flex flex-wrap gap-2 border-b border-border-subtle pb-3">
        {GERMAN_LEARNING_BOARD_ORDER.map((b) => (
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
            {GERMAN_LEARNING_BOARD_LABEL[b]}
          </button>
        ))}
      </div>

      {/* 篩選列：等級/狀態單選下拉（比照 Schools.tsx），適合族群多選 chip（比照 Phase BD 找房頁先例） */}
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
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
          className="text-sm px-3 py-2 rounded-lg border border-border-subtle
                     bg-surface-canvas text-content-primary
                     focus:outline-none focus:border-brand-burgundy
                     hover:border-brand-gold transition-colors"
        >
          <option value="active">狀態：僅正常運作</option>
          <option value="all">狀態：全部</option>
          {NON_ACTIVE_STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{GERMAN_LEARNING_STATUS_LABEL[s]}</option>
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
