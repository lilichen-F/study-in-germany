import type { WorkflowTopic } from './workflow';

export const visaWorkflow: WorkflowTopic = {
  slug: 'visa',
  title: '簽證流程',
  subtitle: 'Sprach · Studien · Aupair · Ausbildung',
  description:
    '進德國前必須申請對應簽證，落地後 90 天內轉換為長期居留許可（Aufenthaltstitel）。',
  steps: [
    {
      step: 1,
      title_zh: '確認簽證類型',
      meta: { timing: '啟動點', priority: 'required' },
      outcome: ['選擇正確簽證，避免申請流程重來'],
      detail: {
        documents: [],
        procedure: [
          '純學語言 → 語言簽證（Sprachvisum）',
          '已錄取德國大學 → 學生簽證（Studienvisum）',
          '18-26 歲 A1+ 家庭幫手 → Au-pair 簽證',
          '德國職訓錄取 → 職訓簽證（Ausbildungsvisum）',
        ],
        common_mistakes: [
          '想留學一年結果辦觀光簽入境（觀光簽不能延簽學習）',
          '語言簽證想在德國轉學生簽證（原則不允許，需返台重申）',
        ],
        official_sources: [
          {
            name: 'Auswärtiges Amt 官方簽證資訊',
            url: 'https://www.auswaertiges-amt.de/de/visa-service',
          },
        ],
      },
    },
    {
      step: 2,
      title_zh: '收語校錄取',
      title_de: 'Aufnahmebestätigung',
      meta: { timing: '進申請流程第一件事', docs_count: 1, priority: 'required' },
      outcome: ['取得簽證申請必需文件'],
      detail: {
        documents: ['語校錄取通知（含課程時長與時數證明）'],
        procedure: [
          '在語校網站報名並繳報名費',
          '選定課程（每週 ≥ 18 小時、6-12 個月）',
          '匯學費並保留匯款收據',
        ],
        common_mistakes: [
          '選課程 < 18 小時／週（不符簽證要求）',
          '未確認課程時長是否適用你目標簽證類型',
        ],
        official_sources: [
          {
            name: 'DAAD 語校搜尋',
            url: 'https://www.daad.de/',
          },
        ],
      },
    },
    {
      step: 3,
      title_zh: '開封鎖帳戶',
      title_de: 'Sperrkonto',
      meta: { timing: '簽證申請前必備', docs_count: 3, priority: 'required' },
      outcome: ['提供財力證明 · 每月自動撥款'],
      detail: {
        documents: ['護照掃描', '在台地址證明', '起始資金入帳證明'],
        procedure: [
          '選擇 Sperrkonto 服務商（Fintiba / Expatrio / Deutsche Bank）',
          '線上申請 → 收 IBAN',
          '匯入當年度金額（2024/25：€11,904）',
          '收確認信作為簽證申請文件',
        ],
        common_mistakes: [
          '金額不到位（未達當年度標準會被拒）',
          '想落地後補財力（不算）',
        ],
        official_sources: [
          { name: 'Fintiba', url: 'https://www.fintiba.com/' },
          { name: 'Expatrio', url: 'https://www.expatrio.com/' },
        ],
      },
    },
    {
      step: 4,
      title_zh: '買保險',
      title_de: 'Krankenversicherung',
      meta: { timing: '簽證有效期涵蓋', docs_count: 1, priority: 'required' },
      outcome: ['滿足簽證與居留申請條件'],
      detail: {
        documents: ['保險保單（涵蓋簽證有效期）'],
        procedure: [
          '語校學生：私人保險（Care Concept / Mawista / DR-WALTER），€30-60/月',
          '確認保單涵蓋期間延伸至簽證結束',
          '收保單 PDF 作為簽證文件',
        ],
        common_mistakes: [
          '買最便宜的保險，續簽時發現不涵蓋長期病被拒',
          '保單涵蓋期不夠長',
        ],
        official_sources: [
          { name: 'Mawista', url: 'https://www.mawista.com/' },
          { name: 'Care Concept', url: 'https://www.care-concept.de/' },
        ],
      },
    },
    {
      step: 5,
      title_zh: '線上預約遞件',
      title_de: 'Terminvereinbarung',
      meta: { location: '德國在台協會', priority: 'required' },
      outcome: ['取得面談時間'],
      detail: {
        documents: [],
        procedure: [
          '進德國在台協會網站選簽證類型',
          '選最近可行的 Termin（旺季 4-6 週後）',
          '收確認信',
        ],
        common_mistakes: [
          '搶不到 Termin 又不知還可以現場排 backup',
          '約錯類型（Sprachvisum vs Studienvisum）',
        ],
        official_sources: [
          {
            name: '德國在台協會',
            url: 'https://taipei.diplo.de/',
          },
        ],
      },
    },
    {
      step: 6,
      title_zh: '準備文件夾',
      meta: { timing: 'Termin 前一週', docs_count: 8, priority: 'required' },
      outcome: ['避免遞件當日補件'],
      detail: {
        documents: [
          '護照 + 影本',
          '證件照（生物特徵規格）',
          '語校錄取通知',
          '學費繳費證明',
          'Sperrkonto 開戶確認',
          '保險保單',
          '住宿證明（暫時 Airbnb 也可）',
          '動機信 + 履歷（德文或英文）',
        ],
        procedure: [
          '依協會清單逐項準備',
          '每份備一份正本 + 一份影本',
          '文件夾按清單順序排列',
        ],
        common_mistakes: [
          '照片規格錯（German biometric spec 有嚴格要求）',
          '動機信只寫「想學德文」（過度空泛易被拒）',
        ],
        official_sources: [
          {
            name: '在台協會簽證文件清單',
            url: 'https://taipei.diplo.de/tw-zh/service/visum-einreise',
          },
        ],
      },
    },
    {
      step: 7,
      title_zh: '面談 + 遞件',
      meta: { location: '德國在台協會', timing: '約需 30-60 分鐘', priority: 'required' },
      outcome: ['正式送出申請'],
      detail: {
        documents: ['所有 STEP 6 準備的文件'],
        procedure: [
          '準時到協會',
          '面談官會問：為何學德文、動機、財源、回台計畫',
          '文件審核',
          '收取件收據（有 case number）',
        ],
        common_mistakes: [
          '面談答不出「回台計畫」（他們最在意你不會非法移民）',
          '文件備份不全',
        ],
        official_sources: [],
      },
    },
    {
      step: 8,
      title_zh: '等結果',
      meta: { timing: '6-12 週', priority: 'required' },
      outcome: ['取得簽證貼紙 · 開始行前準備'],
      detail: {
        documents: [],
        procedure: [
          '協會通知後回去取件',
          '簽證黏在護照上',
          '確認有效期涵蓋你的預定行程',
        ],
        common_mistakes: [
          '沒注意到簽證核發日≠入境日',
          '簽證只給部分時長（意外情況需重申）',
        ],
        official_sources: [],
      },
    },
  ],
  general_notes: [
    'Sperrkonto 每年金額可能調整，正式辦理前請核對 Auswärtiges Amt 官方最新公告。',
    '語言簽證原則不能在德轉學生簽證，計畫進大學者建議一開始就辦學生簽證。',
  ],
};
