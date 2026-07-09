import type { WorkflowTopic } from './workflow';

export const arrivalWorkflow: WorkflowTopic = {
  slug: 'arrival',
  title: '落地指南',
  subtitle: 'Anmeldung · Konto · KV · SIM',
  description:
    '落地前 30 天最忙的行政事項。順序有優先級，前三項必須兩週內完成，否則影響後續所有事。',
  steps: [
    {
      step: 1,
      title_zh: '確認住宿',
      title_de: 'Wohnung / WG',
      meta: { timing: '落地當週', priority: 'required' },
      outcome: ['取得長期地址 · 進行 STEP 2'],
      detail: {
        documents: ['租約（Mietvertrag）', '房東確認書（Wohnungsgeberbestätigung）'],
        procedure: [
          '落地前若能簽好正式租約最佳',
          '無法者先訂 hostel / Airbnb 兩週作為過渡',
          '過渡期同時上 wg-gesucht.de / immobilienscout24.de 找長租',
        ],
        common_mistakes: [
          '「請先匯定金再看房」= 100% 詐騙，直接封鎖',
          '簽了無 Anmeldung 資格的短租，14 天內辦不了戶籍',
        ],
        official_sources: [
          { name: 'wg-gesucht.de', url: 'https://www.wg-gesucht.de/' },
          { name: 'immobilienscout24.de', url: 'https://www.immobilienscout24.de/' },
        ],
      },
    },
    {
      step: 2,
      title_zh: '戶籍登記',
      title_de: 'Anmeldung',
      meta: { location: 'Bürgeramt', timing: '落地後 14 天內', docs_count: 4, priority: 'required' },
      outcome: ['開銀行帳戶 · 辦保險 · 取得稅號'],
      detail: {
        documents: [
          '護照',
          '租約（Mietvertrag）',
          '房東確認書（Wohnungsgeberbestätigung）',
          'Anmeldung 表單',
        ],
        procedure: [
          '線上預約 Bürgeramt Termin',
          '準時到場，帶齊文件',
          '簽名並繳表格',
          '收 Meldebescheinigung（戶籍證明）',
        ],
        common_mistakes: [
          '柏林/慕尼黑 Termin 難搶，落地前一週就要開始盯',
          '資料填錯地址（未來所有事都會出錯）',
          'Meldebescheinigung 遺失（要重辦）',
        ],
        official_sources: [
          { name: 'Berlin Bürgeramt', url: 'https://service.berlin.de/dienstleistung/120686/' },
          { name: 'München Bürgerbüro', url: 'https://muenchen.de/de/rathaus/verwaltung/kreisverwaltungsreferat/buergerbuero' },
        ],
      },
    },
    {
      step: 3,
      title_zh: '開銀行帳戶',
      title_de: 'Konto',
      meta: { timing: '有 Meldebescheinigung 後', priority: 'required' },
      outcome: ['接收薪水／獎學金 · 繳費'],
      detail: {
        documents: ['護照', 'Meldebescheinigung', '學生證（可選）'],
        procedure: [
          'Neobank（N26/Revolut/Vivid）：手機 App 開戶、5 分鐘',
          '傳統銀行（Sparkasse）：預約 Termin，現場開戶',
          '建議：Neobank 為主帳戶、Sparkasse 為備用',
        ],
        common_mistakes: [
          '只開 Neobank 帳戶，遇到房東要求本地 IBAN 才發現不夠',
          'SCHUFA 剛到德國無紀錄可能被拒（改用 Neobank 繞過）',
        ],
        official_sources: [
          { name: 'N26', url: 'https://n26.com/' },
          { name: 'Sparkasse', url: 'https://www.sparkasse.de/' },
        ],
      },
    },
    {
      step: 4,
      title_zh: '健康保險',
      title_de: 'Krankenversicherung',
      meta: { timing: '有 Meldebescheinigung 後', priority: 'required' },
      outcome: ['滿足居留申請要件 · 就醫可用'],
      detail: {
        documents: ['Meldebescheinigung', '護照', '學生身分證明'],
        procedure: [
          '語校生：續用出發前買的私人保險（PKV）',
          '正式大學生：TK/AOK/Barmer 等公保（GKV），約 €120/月',
          '收保單作為之後 Aufenthaltstitel 文件',
        ],
        common_mistakes: [
          '語校期間強行加入公保被拒（Studienvisum 才可）',
          '保單有效期未涵蓋居留申請的時間',
        ],
        official_sources: [
          { name: 'TK', url: 'https://www.tk.de/' },
          { name: 'AOK', url: 'https://www.aok.de/' },
        ],
      },
    },
    {
      step: 5,
      title_zh: 'SIM 卡',
      title_de: 'Mobilfunk',
      meta: { timing: '有帳戶後', priority: 'recommended' },
      outcome: ['本地電話號碼 · 收德國銀行/官方簡訊'],
      detail: {
        documents: ['護照（Prepaid）', '銀行帳戶 + SCHUFA（後付）'],
        procedure: [
          'Prepaid：Aldi Talk / Lidl Connect / Callya，超市買，€10-20/月',
          '後付：O2/Vodafone/Telekom，綁 24 個月',
          '建議：先 Prepaid，住定後再考慮後付',
        ],
        common_mistakes: [
          '一到德國就簽 24 個月合約，之後搬走無法解約',
          '不知道 Prepaid 也可以，浪費錢',
        ],
        official_sources: [
          { name: 'Aldi Talk', url: 'https://www.alditalk.de/' },
        ],
      },
    },
    {
      step: 6,
      title_zh: '電視稅登記',
      title_de: 'Rundfunkbeitrag',
      meta: { timing: '住定 2 週內會自動收到通知', priority: 'required' },
      outcome: ['避免罰款 · 合規'],
      detail: {
        documents: ['Meldebescheinigung'],
        procedure: [
          '到 rundfunkbeitrag.de 註冊',
          '每戶每月 €18.36（2024/25）',
          '一戶只需一人繳',
        ],
        common_mistakes: [
          '以為學生免除（其實不能）',
          '同 WG 每人都繳（重複繳費）',
        ],
        official_sources: [
          { name: 'Rundfunkbeitrag', url: 'https://www.rundfunkbeitrag.de/' },
        ],
      },
    },
  ],
  general_notes: [
    '各邦 Bürgeramt 執行細節與費用略有差異，正式辦理前請查詢所在邦官方公告。',
  ],
};
