import type { RecommendationCategory } from '../../lib/recommendation';

/**
 * 赴德指南板塊 → 資源分類捷徑對照表（Phase BR.d）。
 *
 * 人工審核建立，非執行期關鍵字模糊比對——每筆對應關係皆對應赴德指南
 * 該板塊某個具體步驟中「明確引用的品牌/工具」與資源分類收錄項目為
 * 同一實體，而非僅主題相近就收錄（如「戶籍登記」Anmeldung 辦理機構是
 * Bürgeramt，與資源「外事局」分類收錄的 Ausländerbehörde 是不同機關，
 * 故未建立對應——避免同名「政府機關」表面相似造成誤導性捷徑）。
 *
 * reason 欄位記錄依據，供程式碼可讀性與報告引用，不在 UI 顯示。
 */

export interface GuideResourceLink {
  category: RecommendationCategory;
  /** ?sub= 深連結值；分類無子板塊時省略 */
  subboard?: string;
  /** 按鈕顯示文字 */
  label: string;
  reason: string;
}

export interface GuideResourceMapping {
  /** 對應 Edu.tsx TOPICS 的 slug */
  guideSlug: string;
  links: GuideResourceLink[];
}

export const GUIDE_RESOURCE_LINKS: GuideResourceMapping[] = [
  {
    guideSlug: 'visa',
    links: [
      {
        category: 'finance',
        label: '金融',
        reason: '「開限制提領帳戶＋個人帳戶」步驟明確引用 Fintiba/Expatrio/N26/Revolut/Wise/Sparkasse，皆收錄於資源金融分類',
      },
      {
        category: 'expense',
        label: '支出',
        reason: '「買保險」步驟明確引用 Mawista/Care Concept，兩者皆為資源支出分類收錄的留學生保險品牌',
      },
    ],
  },
  {
    guideSlug: 'arrival',
    links: [
      {
        category: 'housing',
        label: '找房',
        reason: '「如何找房」「辨識好壞租屋處」步驟為找房主題，資源找房分類收錄 10 個房源平台',
      },
      {
        category: 'finance',
        label: '金融',
        reason: '「個人銀行帳戶」步驟明確引用 N26/Sparkasse，皆收錄於資源金融分類',
      },
      {
        category: 'telecom',
        label: '電信',
        reason: '「SIM 卡」步驟明確引用 Aldi Talk，收錄於資源電信分類',
      },
      {
        category: 'expense',
        label: '支出',
        reason: '「電視稅登記」步驟明確引用 Rundfunkbeitrag，與資源支出分類收錄項目為同一官方連結',
      },
    ],
  },
  {
    guideSlug: 'renewal',
    links: [
      {
        category: 'immigration',
        label: '外事局',
        reason: '「線上預約 Termin」步驟 meta.location 為 Ausländerbehörde，official_sources 引用 Berlin 移民局，與資源外事局分類收錄機關相符',
      },
      {
        category: 'finance',
        label: '金融',
        reason: '「準備財力證明」步驟涉及限制提領帳戶財力證明，與資源金融分類 Fintiba/Expatrio 為同性質服務',
      },
    ],
  },
  {
    guideSlug: 'application',
    links: [
      {
        category: 'lookup',
        label: '查詢',
        reason: '多個步驟明確引用 uni-assist/DAAD 課程資料庫，皆收錄於資源查詢分類',
      },
    ],
  },
  {
    guideSlug: 'scholarship',
    links: [
      {
        category: 'scholarship',
        label: '獎學金',
        reason: '模組副標「DAAD·Erasmus·教育部·各基金會」與資源獎學金分類收錄項目（DAAD/Erasmus+/教育部）直接對應',
      },
    ],
  },
  {
    guideSlug: 'policy',
    links: [
      {
        category: 'lookup',
        label: '查詢',
        reason: '「DSH 與其他語言考試」步驟引用 TestDaF/telc、「Anerkennung 學歷認可」步驟引用 anabin 資料庫，三者皆收錄於資源查詢分類',
      },
    ],
  },
  {
    guideSlug: 'exit',
    links: [
      {
        category: 'immigration',
        label: '外事局',
        reason: '「通知移民局」步驟 title_de 為 Ausländerbehörde 通知，official_sources 引用 Berlin Ausländerbehörde，與資源外事局分類相符',
      },
      {
        category: 'finance',
        label: '金融',
        reason: '「關閉帳戶」步驟引用 N26，「取回限制提領帳戶餘款」步驟涉及 Sperrkonto 服務，皆為資源金融分類收錄項目',
      },
      {
        category: 'expense',
        label: '支出',
        reason: '「解除電視稅」步驟引用 Rundfunkbeitrag，與資源支出分類收錄項目為同一官方連結',
      },
    ],
  },
  // 'visa-selector'：14 張簽證比較卡為選擇簽證類型之用，與現行 11 個資源
  // 分類（含子板塊）皆無具體、可驗證的對應關係，依 BR.d 指示不強制附加，
  // 保持原樣（查無對應清單見完成報告）。
];

export function getGuideResourceLinks(guideSlug: string): GuideResourceLink[] {
  return GUIDE_RESOURCE_LINKS.find((m) => m.guideSlug === guideSlug)?.links ?? [];
}
