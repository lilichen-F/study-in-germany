import { useState } from 'react';
import { IconTrash } from '@tabler/icons-react';
import { SummaryConfidenceBadge } from './ConfidenceBadge';

/**
 * 財力估算小工具（Phase BS）。
 *
 * 忠實轉譯 Lily 提供之 buergergeld_calculator.html 交接文件的
 * RATES_CONFIG 資料與 calc() 邏輯為 React 元件，不改動公式本身、
 * 不改動目前生效數字。資料與邏輯分離的架構決策予以保留——未來官方
 * 數字調整只需改 BUERGERGELD_RATES，不動下方計算邏輯。
 *
 * 簡化範圍（比照原文件「簡易小型」定位）：不沿用原版 navy/cream/gold
 * 自訂配色（改用站內 ZenTheme）；不逐項展開兒童個別級距明細，僅顯示
 * 總額＋一行簡短說明。免責聲明與信心度標示為硬性保留項目，未簡化。
 *
 * 無 localStorage、零外部 API 呼叫（暖房租金與匯率皆手動輸入），
 * 沿用原文件刻意排除的設計決策——重新整理即清空。
 */

interface ChildRow {
  id: number;
  age: number | '';
}

export const BUERGERGELD_RATES = {
  version: '2025/26 v2（統一級距）',
  lastUpdated: '2026-07-18',
  adultSingle: 563,
  children: [
    { min: 0, max: 5, amount: 390 },
    { min: 6, max: 17, amount: 471 },
  ],
};

function findBracket(age: number) {
  return BUERGERGELD_RATES.children.find((b) => age >= b.min && age <= b.max) ?? null;
}

/** 千分位一律用逗號（en-US），避免與下方 TWD 顯示的分隔符號不一致造成誤讀 */
function fmtEUR(n: number) {
  return `€${n.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
}

function fmtTWD(n: number) {
  return `NT$${Math.round(n).toLocaleString('zh-TW')}`;
}

let nextChildRowId = 1;

export default function FinanceEstimator() {
  const [open, setOpen] = useState(false);
  const [adultCount, setAdultCount] = useState(1);
  const [adultRate, setAdultRate] = useState<number>(BUERGERGELD_RATES.adultSingle);
  const [children, setChildren] = useState<ChildRow[]>([]);
  const [heatingRent, setHeatingRent] = useState<number | ''>('');
  const [fxRate, setFxRate] = useState<number | ''>('');

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-xs text-brand-burgundy hover:text-brand-burgundy-hover"
      >
        快速試算 ▾
      </button>
    );
  }

  const addChild = () => setChildren((prev) => [...prev, { id: nextChildRowId++, age: '' }]);
  const removeChild = (id: number) => setChildren((prev) => prev.filter((c) => c.id !== id));
  const updateChildAge = (id: number, age: number | '') =>
    setChildren((prev) => prev.map((c) => (c.id === id ? { ...c, age } : c)));

  const adultTotal = adultCount * adultRate;
  const childTotal = children.reduce((sum, c) => {
    if (c.age === '') return sum;
    const bracket = findBracket(Number(c.age));
    return sum + (bracket ? bracket.amount : 0);
  }, 0);
  const heating = heatingRent === '' ? 0 : Number(heatingRent);
  const totalEUR = adultTotal + childTotal + heating;
  const totalTWD = fxRate === '' ? null : totalEUR * Number(fxRate);

  return (
    <div className="border border-border-subtle rounded-lg p-3 space-y-3 bg-surface-section">
      <button
        type="button"
        onClick={() => setOpen(false)}
        className="text-xs text-brand-burgundy hover:text-brand-burgundy-hover"
      >
        收起試算 ▴
      </button>

      <div className="flex items-start gap-1.5 flex-wrap">
        <span className="text-xs text-content-secondary">Bürgergeld 標準需求估算</span>
        <SummaryConfidenceBadge confidence="alt-medium" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="label">成人人數</label>
          <input
            type="number"
            min={0}
            value={adultCount}
            onChange={(e) => setAdultCount(Math.max(0, Number(e.target.value)))}
            className="input"
          />
        </div>
        <div>
          <label className="label">每人每月需求（€）</label>
          <input
            type="number"
            min={0}
            value={adultRate}
            onChange={(e) => setAdultRate(Math.max(0, Number(e.target.value)))}
            className="input"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="label mb-0">兒童（依年齡自動對應級距）</label>
          <button
            type="button"
            onClick={addChild}
            className="text-xs text-brand-burgundy hover:text-brand-burgundy-hover"
          >
            + 新增兒童
          </button>
        </div>
        {children.map((c) => {
          const bracket = c.age === '' ? null : findBracket(Number(c.age));
          return (
            <div key={c.id} className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                max={17}
                placeholder="年齡"
                value={c.age}
                onChange={(e) =>
                  updateChildAge(c.id, e.target.value === '' ? '' : Number(e.target.value))
                }
                className="input flex-1"
              />
              <span className="text-xs text-content-muted shrink-0 w-20">
                {bracket ? `${fmtEUR(bracket.amount)}/月` : c.age === '' ? '' : '超出範圍'}
              </span>
              <button
                type="button"
                onClick={() => removeChild(c.id)}
                aria-label="移除此筆兒童"
                className="shrink-0 p-1 text-content-muted hover:text-state-danger"
              >
                <IconTrash className="w-4 h-4" stroke={1.5} />
              </button>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="label">暖房租金（€/月）</label>
          <input
            type="number"
            min={0}
            placeholder="例如 1000"
            value={heatingRent}
            onChange={(e) => setHeatingRent(e.target.value === '' ? '' : Number(e.target.value))}
            className="input"
          />
        </div>
        <div>
          <label className="label">台幣匯率（自行輸入）</label>
          <input
            type="number"
            min={0}
            step="0.01"
            placeholder="例如 35.5"
            value={fxRate}
            onChange={(e) => setFxRate(e.target.value === '' ? '' : Number(e.target.value))}
            className="input"
          />
        </div>
      </div>

      <div className="pt-2 border-t border-border-subtle space-y-1">
        <div className="text-lg font-semibold text-content-primary">
          {fmtEUR(totalEUR)}
          <span className="text-sm font-normal text-content-secondary">
            {' '}/ 月
          </span>
        </div>
        <div className="text-sm text-content-secondary">
          {totalTWD === null ? '請輸入匯率以換算台幣' : `約 ${fmtTWD(totalTWD)}/月`}
        </div>
        <div className="text-xs text-content-muted">
          {adultCount} 位成人×{fmtEUR(adultRate)} ＋ {children.length} 位兒童 ＋ 暖房 {fmtEUR(heating)} = 總額
        </div>
      </div>

      <p className="text-xs text-content-secondary italic pl-3 py-0.5
                   border-l-2 border-brand-gold/50 leading-relaxed">
        此為方向性試算工具，非官方數字，正式門檻仍以外事局(Ausländerbehörde)個案核定為準。
        資料版本：{BUERGERGELD_RATES.version}（{BUERGERGELD_RATES.lastUpdated}）。
      </p>
    </div>
  );
}
