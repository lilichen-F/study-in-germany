import { Link } from 'react-router-dom';
import EduIcon from '../assets/icons/EduIcon';

/**
 * Phase B.2 · /edu 骨架 placeholder
 * Phase B.3 會展開為 6 子板塊：
 *   簽證 / 落地 / 延簽 / 學程 / 獎學金 / 政策
 */
export default function Edu() {
  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs text-content-muted uppercase tracking-wider mb-2">
          German Study Hub
        </div>
        <h1 className="text-2xl font-semibold flex items-center gap-3">
          <span className="text-module-edu w-8 h-8 inline-flex">
            <EduIcon className="w-full h-full" />
          </span>
          學用板塊
        </h1>
        <p className="text-sm text-content-secondary mt-2 max-w-2xl leading-relaxed">
          給留德新手與正在申請中的你——把簽證、落地、延簽、學程申請、獎學金、
          教育政策六個主題整理成可查、可讀、可帶著走的實用筆記。
        </p>
      </div>

      <div className="card bg-surface-section space-y-3">
        <div className="text-sm text-content-primary font-medium">
          🚧 內容正在整理中
        </div>
        <p className="text-sm text-content-secondary leading-relaxed">
          此板塊將於 Phase B.3 開放六個子板塊骨架、Phase B.4-B.5 逐批填充內容。
          若你希望某個主題優先，或有想貢獻的心得，請於
          <Link to="/board" className="mx-1">佈告欄</Link>
          留言告訴我，或直接開 GitHub issue。
        </p>
        <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          {[
            { label: '簽證流程', hint: 'Sprach / Studien / Aupair / Ausbildung' },
            { label: '落地指南', hint: 'Anmeldung · Konto · KV · SIM' },
            { label: '延簽流程', hint: 'Aufenthaltstitel 續簽' },
            { label: '學程申請', hint: 'Kolleg · Bachelor · Master · PhD' },
            { label: '獎學金', hint: 'DAAD · Erasmus · 教育部' },
            { label: '教育政策', hint: 'Bologna · DSH · 學費' },
          ].map((s) => (
            <div
              key={s.label}
              className="p-3 rounded-lg border border-border-subtle bg-surface-card"
            >
              <div className="font-medium text-content-primary">{s.label}</div>
              <div className="text-content-muted mt-0.5">{s.hint}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
