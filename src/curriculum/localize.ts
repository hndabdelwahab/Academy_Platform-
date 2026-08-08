import type { Language, SectionContent, SectionContentLocale } from '@/types';

const TEXT_KEYS: (keyof SectionContentLocale)[] = [
  'simpleExplanation', 'professionalDefinition', 'whyItExists', 'howItWorks',
  'erpExample', 'odooConnection', 'realProjectRecognition', 'interviewTerminology', 'markdown',
];

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

export function localizedMistakes(content: SectionContent, lang: Language) {
  if (lang === 'ar' && content.ar?.commonMistakes?.length) return content.ar.commonMistakes;
  return content.commonMistakes;
}

export function localizedSyntax(content: SectionContent, lang: Language) {
  if (lang === 'ar' && content.ar?.syntax?.length) return content.ar.syntax;
  return content.syntax;
}

export function localizedDebugging(content: SectionContent, lang: Language) {
  if (lang === 'ar' && content.ar?.debugging?.length) return content.ar.debugging;
  return content.debugging;
}

export function localizedCodeExample(content: SectionContent, lang: Language) {
  if (lang === 'ar' && content.ar?.codeExample) {
    return {
      ...content.codeExample!,
      ...content.ar.codeExample,
      code: content.codeExample?.code ?? content.ar.codeExample.code,
      language: content.codeExample?.language ?? content.ar.codeExample.language,
      breakdown: content.ar.codeExample.breakdown?.length
        ? content.ar.codeExample.breakdown
        : content.codeExample?.breakdown ?? [],
    };
  }
  return content.codeExample;
}

export function pickLang<T>(lang: Language, en: T, ar?: T): T {
  return lang === 'ar' && ar !== undefined ? ar : en;
}

export function hasArabicBody(content: SectionContent): boolean {
  return TEXT_KEYS.some((key) => typeof content.ar?.[key] === 'string');
}
