import type { WorkflowTopic } from './workflow';

export const applicationWorkflow: WorkflowTopic = {
  slug: 'application',
  title: '學程申請',
  subtitle: 'Studienkolleg · Bachelor · Master · PhD',
  description:
    '四大路徑：學院預備班、學士、碩士、博士。時程差異大，越早規劃越好。',
  steps: [
    {
      step: 1,
      title_zh: '確認申請路徑',
      meta: { timing: '起點', priority: 'required' },
      outcome: ['選對路徑，避免走冤枉路'],
      detail: {
        documents: [],
        procedure: [
          '高中畢業無大學學歷 → Studienkolleg + FSP',
          '大學讀一年以上 → 直接申請 Bachelor（需 APS）',
          '大學畢業 → Master',
          '碩士畢業 → PhD',
        ],
        common_mistakes: [
          '學歷未達門檻卻直接申請大學（拒信直接來）',
          '不知道 APS 是必經流程（台灣/中國/越南申請人必須）',
        ],
        official_sources: [
          { name: 'DAAD 課程搜尋', url: 'https://www.daad.de/en/studying-in-germany/' },
          { name: 'Uni-assist', url: 'https://www.uni-assist.de/' },
        ],
      },
    },
    {
      step: 2,
      title_zh: '通過 APS 審核',
      meta: { docs_count: 6, priority: 'required' },
      outcome: ['取得申請所需的學歷公證'],
      detail: {
        documents: [
          '護照',
          '身分證',
          '高中畢業證書 + 成績',
          '大學/碩士學位證 + 成績（若有）',
          '英文/德文 CV',
          'APS 申請費（約 US$300）',
        ],
        procedure: [
          '線上申請 APS',
          '準備審核面談（中德文皆可）',
          '面談內容：個人資訊、學術背景、未來計畫',
          '收 APS 證書（10 份）',
        ],
        common_mistakes: [
          '沒帶所有原本文件（審核官需親眼看）',
          '面談答不出「為何選這個學校」',
        ],
        official_sources: [
          { name: 'APS 台灣', url: 'https://www.aps.tw/' },
        ],
      },
    },
    {
      step: 3,
      title_zh: '達到語言門檻',
      meta: { timing: '申請截止前 3-6 個月完成', priority: 'required' },
      outcome: ['滿足入學語言要求'],
      detail: {
        documents: ['語言證書'],
        procedure: [
          '德文授課：DSH-2 / TestDaF 4×4 / telc C1 Hochschule 三選一',
          '英文授課：IELTS 6.5+ / TOEFL 90+',
          '部分課程要求德+英雙語',
          '考試日期：提前 2-3 個月報名（尤其 TestDaF）',
        ],
        common_mistakes: [
          '想著「先申請再考」（多數學程要求申請時已有證書）',
          'DSH 只有目標學校承認，TestDaF 較通用',
        ],
        official_sources: [
          { name: 'TestDaF 官方', url: 'https://www.testdaf.de/' },
          { name: 'telc 官方', url: 'https://www.telc.net/' },
        ],
      },
    },
    {
      step: 4,
      title_zh: '選校 + 準備文件',
      meta: { timing: '截止前 3 個月', docs_count: 8, priority: 'required' },
      outcome: ['申請包完整'],
      detail: {
        documents: [
          '護照',
          'APS 證書',
          '學位證書 + 成績單',
          '語言證書',
          'CV（英/德）',
          '動機信（英/德）',
          '推薦信 2-3 封',
          '其他學程要求（作品集/研究計畫等）',
        ],
        procedure: [
          '在 DAAD/uni-assist 搜索目標學程',
          '確認申請截止（多數冬季學期 7 月中）',
          '準備各校要求的獨特文件',
          '動機信客製化每所學校',
        ],
        common_mistakes: [
          '所有學校用同一份動機信（招生官看得出來）',
          '推薦信找不熟教授寫（內容空泛）',
        ],
        official_sources: [
          { name: 'DAAD 課程資料庫', url: 'https://www2.daad.de/deutschland/studienangebote/international-programmes/en/' },
        ],
      },
    },
    {
      step: 5,
      title_zh: '透過 Uni-assist 遞件',
      meta: { location: 'uni-assist.de', priority: 'required' },
      outcome: ['申請進入審核'],
      detail: {
        documents: ['STEP 4 所有文件'],
        procedure: [
          '註冊 uni-assist 帳號',
          '選擇學校與學程',
          '上傳所有文件',
          '繳費（每個學程 €75）',
          '寄實體副本到 uni-assist',
          '等 uni-assist 初審 → 轉學校',
        ],
        common_mistakes: [
          '文件掃描品質差被要求重上傳',
          '截止日前才動作，來不及寄實體件',
        ],
        official_sources: [
          { name: 'Uni-assist', url: 'https://www.uni-assist.de/' },
        ],
      },
    },
    {
      step: 6,
      title_zh: '面試（部分學程）',
      meta: { timing: '收到通知後', priority: 'recommended' },
      outcome: ['最後篩選階段'],
      detail: {
        documents: [],
        procedure: [
          'MBA/國際碩士常有 Zoom 面試',
          '準備動機信重點',
          '對學程與教授研究背景做功課',
          '準備自問問題',
        ],
        common_mistakes: [
          '沒對學程做功課（問超基本問題）',
          '面試答太空泛',
        ],
        official_sources: [],
      },
    },
    {
      step: 7,
      title_zh: '收 Zulassung + 註冊',
      meta: { timing: '8-9 月', priority: 'required' },
      outcome: ['正式取得學生身分'],
      detail: {
        documents: ['錄取通知（Zulassungsbescheid）', '學費/Semesterbeitrag 匯款'],
        procedure: [
          '收多所錄取後選一',
          '按時繳 Semesterbeitrag（€150-350）',
          '完成 Immatrikulation（正式註冊）',
          '收學生證 + Semesterticket',
        ],
        common_mistakes: [
          '錯過註冊截止 → 位置作廢',
          '未確認住宿就選校（大城市住宿極缺）',
        ],
        official_sources: [],
      },
    },
  ],
  general_notes: [
    'Uni-assist 為多數學校統一遞件平台，少數學校自辦。',
    '各校招生辦要求略有差異，最終以目標校官網為準。',
    '冬季學期截止多在 7 月中、夏季學期截止多在 1 月中。',
  ],
};
