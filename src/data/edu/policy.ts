import type { WorkflowTopic } from './workflow';

export const policyWorkflow: WorkflowTopic = {
  slug: 'policy',
  title: '教育政策',
  subtitle: 'Bologna · DSH · 學費 · Anerkennung',
  description:
    '知道規則邊界才能規劃策略。以下六個政策議題直接影響留德決策。',
  steps: [
    {
      step: 1,
      title_zh: 'Bologna 進程',
      meta: { priority: 'supplementary' },
      outcome: ['理解德國學位體系'],
      detail: {
        documents: [],
        procedure: [
          '德國自 2000 年代逐步實施 Bologna',
          '舊制 Diplom / Magister 已停招',
          '新制：Bachelor (3年) + Master (2年) + PhD (3-4年)',
          '學位歐盟互通、ECTS 學分制',
        ],
        common_mistakes: [
          '把舊制 Diplom 當現行學位（誤解學歷）',
          '不知道 ECTS 換算方式',
        ],
        official_sources: [
          { name: 'Bologna Process 官方', url: 'https://www.ehea.info/' },
        ],
      },
    },
    {
      step: 2,
      title_zh: 'DSH 與其他語言考試',
      meta: { priority: 'required' },
      outcome: ['選對語言考試'],
      detail: {
        documents: [],
        procedure: [
          'DSH-2 = C1，多校認可但由目標大學辦',
          'TestDaF 4x4 = C1，全德統一考、國際通用',
          'telc C1 Hochschule = C1，考試較靈活',
          'DSH-1 = B2 上限，多數學程不接受',
        ],
        common_mistakes: [
          '考 DSH 前沒申請目標大學（必先錄取才能考）',
          '以為 telc 沒 DSH 官方，其實多數學程接受',
        ],
        official_sources: [
          { name: 'DAAD 語言證書比較', url: 'https://www.daad.de/en/study-and-research-in-germany/plan-your-studies/language-requirements/' },
        ],
      },
    },
    {
      step: 3,
      title_zh: '學費政策',
      meta: { priority: 'recommended' },
      outcome: ['預估留學成本'],
      detail: {
        documents: [],
        procedure: [
          '公立大學基本免學費（僅 Semesterbeitrag €150-350/學期）',
          'Baden-Württemberg 對非歐盟每學期 €1,500',
          '私立大學 €5,000-30,000/年',
          '部分邦討論「精英碩士學程收費」',
        ],
        common_mistakes: [
          '以為所有德國大學免費（未查所在邦政策）',
          '忽略 Semesterbeitrag 也是一筆錢',
        ],
        official_sources: [
          { name: 'DAAD 學費資訊', url: 'https://www.daad.de/en/study-and-research-in-germany/plan-your-studies/tuition-fees/' },
        ],
      },
    },
    {
      step: 4,
      title_zh: 'Duale Studium',
      meta: { priority: 'supplementary' },
      outcome: ['理解另一條路徑'],
      detail: {
        documents: [],
        procedure: [
          '大學 + 企業實習同時進行',
          '3-4 年、有薪資（€900-1500/月）',
          '需先被企業錄取才能申請學校',
          '畢業多數留原企業',
        ],
        common_mistakes: [
          '以為 Duale = 學徒制（其實有學位）',
          '不知道要先找企業合作',
        ],
        official_sources: [
          { name: 'BIBB 職業教育', url: 'https://www.bibb.de/' },
        ],
      },
    },
    {
      step: 5,
      title_zh: 'Anerkennung 學歷認可',
      meta: { priority: 'required' },
      outcome: ['台灣學歷用於德國職業'],
      detail: {
        documents: [
          '學位證 + 成績單',
          '護照',
          '認證申請費 €200-1000',
        ],
        procedure: [
          '非受管制職業 → KMK Zentralstelle 認證',
          '醫師/律師/教師等 → 各邦專門機構',
          '處理 4-16 週',
        ],
        common_mistakes: [
          '不知道自己職業需不需要認證（處理順序錯）',
          '沒認證就找工作（雇主會拒）',
        ],
        official_sources: [
          { name: 'anabin 資料庫', url: 'https://anabin.kmk.org/anabin.html' },
          { name: 'Anerkennung in Deutschland', url: 'https://www.anerkennung-in-deutschland.de/' },
        ],
      },
    },
    {
      step: 6,
      title_zh: '打工政策與工作許可',
      meta: { priority: 'required' },
      outcome: ['合法賺錢 · 不違反學生簽證'],
      detail: {
        documents: [],
        procedure: [
          '學生簽證：140 全天/280 半天 上限 每年',
          '超過需另申請工作許可',
          '學校內助教職不計入配額',
          'Mini-Job（€520/月以下）不繳所得稅但仍計入配額',
        ],
        common_mistakes: [
          '打黑工被抓 → 影響續簽甚至遣返',
          '沒記錄工時 → 超過上限自己不知道',
        ],
        official_sources: [
          { name: 'BAMF 學生工作規則', url: 'https://www.bamf.de/' },
        ],
      },
    },
  ],
  general_notes: [
    '政策每年可能調整，本資料為 2024/25 學年狀態。',
    'GDPR 是歐盟法規，未來若在德國做網站或 App 需符合，可先了解。',
  ],
};
