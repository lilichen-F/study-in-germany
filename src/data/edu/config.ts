export interface EduSubTopic {
  slug: string;
  title: string;
  hint: string;
  icon: 'visa' | 'arrival' | 'renewal' | 'application' | 'scholarship' | 'policy';
}

export const EDU_TOPICS: EduSubTopic[] = [
  { slug: 'visa',         title: '簽證流程',   hint: 'Sprach / Studien / Aupair / Ausbildung', icon: 'visa' },
  { slug: 'arrival',      title: '落地指南',   hint: 'Anmeldung · Konto · KV · SIM',           icon: 'arrival' },
  { slug: 'renewal',      title: '延簽流程',   hint: 'Aufenthaltstitel 續簽與轉換',            icon: 'renewal' },
  { slug: 'application',  title: '學程申請',   hint: 'Kolleg · Bachelor · Master · PhD',      icon: 'application' },
  { slug: 'scholarship',  title: '獎學金',     hint: 'DAAD · Erasmus · 教育部 · 各基金會',    icon: 'scholarship' },
  { slug: 'policy',       title: '教育政策',   hint: 'Bologna · DSH · 學費政策',              icon: 'policy' },
];
