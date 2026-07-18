/**
 * 簽證快速配對問卷對照表（Phase BT.b）。
 *
 * 比照 BR.d guideResourceLinks.ts 方法論：靜態顯式對照表，非執行期
 * 模糊比對／關鍵字推論。每筆 reason 引用該簽證卡 visaCards.ts 的
 * eligibility/degreeRecognition 等既有欄位原文，可一眼核對依據。
 *
 * 設計取捨：Q1（赴德目的）已依 14 張卡的 eligibility 語意切得夠細
 * （如「求學」拆為「已獲大學入學許可」與「純學語言」兩個獨立選項），
 * 使大多數目的天然對應單一或小範圍候選卡，不需再靠 Q2/Q3 做複雜的
 * 交叉推論；Q2（財力）與 Q3（學歷/經驗）僅在有明確、可引用依據時才
 * 進一步收斂候選（見 NARROWING_RULES），其餘情況維持 Q1 決定的候選
 * 集合不變——避免為了「湊出更精準結果」而發明沒有根據的規則。
 */

export type Purpose =
  | 'work' | 'research' | 'university' | 'language' | 'family' | 'marriage'
  | 'workingholiday' | 'aupair' | 'training' | 'volunteer' | 'exchange' | 'unsure';

export interface PurposeOption {
  value: Purpose;
  label: string;
  hint: string;
  /** 空陣列＝查無對應（僅 unsure），前端須顯示友善訊息而非牽強推薦 */
  candidateCardIds: string[];
  reason: string;
}

export const PURPOSE_OPTIONS: PurposeOption[] = [
  {
    value: 'work', label: '工作', hint: '已有德國企業僱用合約，或想去工作',
    candidateCardIds: ['visa-01', 'visa-02'],
    reason: '卡01 eligibility「已取得德國企業僱用合約...之專業人士」；卡02 eligibility「高階外籍人才...稀缺職業人才」',
  },
  {
    value: 'research', label: '學術研究／客座', hint: '受邀進行研究、授課或學術交流',
    candidateCardIds: ['visa-08'],
    reason: '卡08 eligibility「受德國研究機構、大學或認證學術單位邀請，進行學術交流、授課或計畫研究者」',
  },
  {
    value: 'university', label: '已獲大學/科大入學許可', hint: '已收到 Zulassungsbescheid',
    candidateCardIds: ['visa-11'],
    reason: '卡11 eligibility「已取得德國大學、科技大學或同等高等教育機構正式入學許可(Zulassungsbescheid)者」',
  },
  {
    value: 'language', label: '純學語言（尚未升學）', hint: '單純去語言學校，無升學意圖',
    candidateCardIds: ['visa-10'],
    reason: '卡10 eligibility「純粹赴德語言學校(Sprachschule)學習德文，無升學意圖」',
  },
  {
    value: 'family', label: '依親（家人已在德國）', hint: '配偶、子女或父母已在德國',
    candidateCardIds: ['visa-04', 'visa-05', 'visa-06'],
    reason: '卡04/05/06 eligibility 皆為與已在德配偶/子女/父母團聚情境（依角色不同對應不同卡）',
  },
  {
    value: 'marriage', label: '結婚（尚未登記，赴德完婚）', hint: '要去德國辦理結婚或伴侶登記',
    candidateCardIds: ['visa-03'],
    reason: '卡03 eligibility「尚未結婚，欲赴德與德籍或已居留德國之未婚夫/妻完婚，或辦理同性伴侶登記者」',
  },
  {
    value: 'workingholiday', label: '打工度假', hint: '想去體驗生活並打工籌旅費',
    candidateCardIds: ['visa-12'],
    reason: '卡12 eligibility「台灣青年赴德度假旅遊，並藉短期工作籌措旅費」',
  },
  {
    value: 'aupair', label: '互惠生（Au-Pair）', hint: '協助接待家庭照顧孩童並學德語',
    candidateCardIds: ['visa-13'],
    reason: '卡13 eligibility「赴德接待家庭協助照顧孩童、分擔簡單家務，藉此體驗生活並學習德語」',
  },
  {
    value: 'training', label: '職訓／實習', hint: '雙軌制職業培訓或企業實習',
    candidateCardIds: ['visa-07'],
    reason: '卡07 eligibility「實習：大學在學或畢業不超過2年...；②受訓：赴德參加雙軌制職業培訓(Ausbildung)」',
  },
  {
    value: 'volunteer', label: '志願服務', hint: 'BFD／FSJ／FÖJ／EFD',
    candidateCardIds: ['visa-14'],
    reason: '卡14 eligibility「赴德參加聯邦志願服務(BFD)、志願社會年(FSJ)、志願生態年(FÖJ)或歐盟志願服務(EFD)」',
  },
  {
    value: 'exchange', label: '中學交換生', hint: '國高中生透過交換計畫赴德',
    candidateCardIds: ['visa-09'],
    reason: '卡09 eligibility「台灣國高中生透過合格交換計畫，赴德中學進行文化與學術交流」',
  },
  {
    value: 'unsure', label: '沒有想法', hint: '先看看全部類型，之後再決定',
    candidateCardIds: [],
    reason: '無對應——依指示不得為了給出結果而牽強推薦，顯示友善訊息即可',
  },
];

export type FinanceTier =
  | 'sponsored' | 'save-4000' | 'save-1000' | 'save-992' | 'family-formula' | 'unsure';

export interface FinanceTierOption {
  value: FinanceTier;
  label: string;
}

export const FINANCE_TIER_OPTIONS: FinanceTierOption[] = [
  { value: 'sponsored', label: '有金援（他人擔保／獎學金／合約薪資）' },
  { value: 'save-4000', label: '可自備約 €4,000（一次性存款）' },
  { value: 'save-1000', label: '可自備約 €1,000+／月' },
  { value: 'save-992', label: '可自備約 €992／月' },
  { value: 'family-formula', label: '依親財力，需按家戶人數精算' },
  { value: 'unsure', label: '還不確定' },
];

export type Qualification =
  | 'degree-recognized' | 'degree-unrecognized' | 'work-experience' | 'studying' | 'none';

export interface QualificationOption {
  value: Qualification;
  label: string;
}

export const QUALIFICATION_OPTIONS: QualificationOption[] = [
  { value: 'degree-recognized', label: '高等學歷（已 ANABIN/ZAB 認證）' },
  { value: 'degree-unrecognized', label: '高等學歷（尚未認證）' },
  { value: 'work-experience', label: '專業工作經驗（無學歷）' },
  { value: 'studying', label: '目前在學中' },
  { value: 'none', label: '無特定資格' },
];

export interface NarrowingRule {
  id: string;
  appliesToPurpose: Purpose;
  /** 條件：Q3 複選須包含此值，且不得包含 degree-recognized（避免與一般學歷路徑衝突） */
  requiresQualification: Qualification;
  excludesQualification?: Qualification;
  narrowTo: string[];
  reason: string;
}

/**
 * 收斂規則——刻意只有一條：卡01/02 之間，「無學歷但有IT專業經驗」是
 * 唯一有明確、可引用依據可收斂候選的情境（卡02 學歷承認欄位明文承認
 * 此路徑，卡01 無對應條款）。其餘目的的候選集合已由 Q1 唯一或小範圍
 * 決定，Q2/Q3 不再收斂，避免發明沒有根據的規則。
 */
export const NARROWING_RULES: NarrowingRule[] = [
  {
    id: 'work-it-experience',
    appliesToPurpose: 'work',
    requiresQualification: 'work-experience',
    excludesQualification: 'degree-recognized',
    narrowTo: ['visa-02'],
    reason: '卡02 degreeRecognition「無學歷之IT專家可憑7年內3年以上專業經驗申請」；卡01 degreeRecognition 僅列學歷/職業培訓路徑，無此彈性條款',
  },
];

/** 依親/結婚類目的的財力門檻為 Bürgergeld 公式（非固定級距），提示導向 BS/BT.a 已建立的財力估算器 */
export const FINANCE_ESTIMATOR_PURPOSES: Purpose[] = ['family', 'marriage'];

export interface MatchResult {
  cardIds: string[];
  showFinanceEstimatorHint: boolean;
}

export function matchVisas(
  purpose: Purpose,
  qualifications: Qualification[],
): MatchResult {
  const option = PURPOSE_OPTIONS.find((o) => o.value === purpose);
  if (!option || option.candidateCardIds.length === 0) {
    return { cardIds: [], showFinanceEstimatorHint: false };
  }

  let cardIds = option.candidateCardIds;
  for (const rule of NARROWING_RULES) {
    if (rule.appliesToPurpose !== purpose) continue;
    if (!qualifications.includes(rule.requiresQualification)) continue;
    if (rule.excludesQualification && qualifications.includes(rule.excludesQualification)) continue;
    cardIds = cardIds.filter((id) => rule.narrowTo.includes(id));
  }

  return {
    cardIds,
    showFinanceEstimatorHint: FINANCE_ESTIMATOR_PURPOSES.includes(purpose),
  };
}
