import type { Language, SectionContent, SectionContentLocale } from '@/po/types';

const TEXT_KEYS: (keyof SectionContentLocale)[] = [
  'conceptIntroduction', 'simpleExplanation', 'businessProblem', 'professionalDefinition',
  'whyImportant', 'lifecycleLocation', 'howItWorks', 'whoResponsible', 'whoParticipates',
  'requiredInputs', 'activities', 'expectedOutputs', 'simpleExample', 'softwareExample',
  'erpExample', 'workedExample', 'comparison', 'commonMisunderstandings', 'poorExample',
  'correctExample', 'guidedPractice', 'independentPractice', 'scenarioDecision',
  'reflectionQuestion', 'professionalTerminology', 'interviewQuestion', 'interviewModelAnswer',
  'markdown',
];

/** Resolve a teaching paragraph for the active language. */
export function localizedSectionText(
  content: SectionContent,
  key: keyof SectionContentLocale,
  lang: Language,
): string | undefined {
  if (lang === 'ar' && content.ar?.[key] && typeof content.ar[key] === 'string') {
    return content.ar[key] as string;
  }
  const value = content[key as keyof SectionContent];
  return typeof value === 'string' ? value : undefined;
}

export function localizedMistakes(
  content: SectionContent,
  kind: 'beginnerMistakes' | 'workplaceMistakes',
  lang: Language,
) {
  if (lang === 'ar' && content.ar?.[kind]?.length) return content.ar[kind]!;
  return content[kind];
}

export function localizedTable(content: SectionContent, lang: Language) {
  if (lang === 'ar' && content.ar?.comparisonTable) return content.ar.comparisonTable;
  return content.comparisonTable;
}

export function localizedSteps(content: SectionContent, lang: Language) {
  if (lang === 'ar' && content.ar?.processSteps?.length) return content.ar.processSteps;
  return content.processSteps;
}

export function pickLang<T>(lang: Language, en: T, ar?: T): T {
  return lang === 'ar' && ar !== undefined ? ar : en;
}

/** Ensure Arabic locale object exists when building curriculum. */
export function withArabic(content: SectionContent, ar: SectionContentLocale): SectionContent {
  return { ...content, ar };
}

export function hasArabicBody(content: SectionContent): boolean {
  return TEXT_KEYS.some((key) => typeof content.ar?.[key] === 'string');
}
