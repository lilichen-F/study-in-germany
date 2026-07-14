import type { PersonaStage } from './onboarding';

/**
 * 依 persona_stage 對應到作戰手冊某個具體 step 的「下一步」提示
 * 零資料庫查詢，純靜態對照表；stepTitle 逐一核對 src/data/edu/*.ts 的實際
 * step 1 title_zh，確保與作戰手冊頁面內容一致（Phase AN pre-flight 核對）
 */
export interface NextStepSuggestion {
  moduleSlug: string;
  moduleName: string;
  stepNumber: number;
  stepTitle: string;
}

const STAGE_NEXT_STEP: Record<PersonaStage, NextStepSuggestion> = {
  visa_prep: {
    moduleSlug: 'visa',
    moduleName: '簽證流程',
    stepNumber: 1,
    stepTitle: '確認簽證類型',
  },
  landing: {
    moduleSlug: 'arrival',
    moduleName: '落地指南',
    stepNumber: 1,
    stepTitle: '如何找房',
  },
  settled: {
    moduleSlug: 'policy',
    moduleName: '教育政策',
    stepNumber: 1,
    stepTitle: 'Bologna 進程 + ECTS',
  },
  leaving: {
    moduleSlug: 'exit',
    moduleName: '離開指南',
    stepNumber: 1,
    stepTitle: '通知移民局',
  },
};

export function getNextStepSuggestion(stage: PersonaStage): NextStepSuggestion {
  return STAGE_NEXT_STEP[stage];
}
