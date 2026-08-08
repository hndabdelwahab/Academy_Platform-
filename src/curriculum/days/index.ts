import type { DayCurriculum } from '@/types';
import { finalizeDay01 } from './day-01-ar';
import { day01 as day01Raw } from './day-01';
import { DAY_SUMMARIES } from '@/curriculum/roadmap';
import { enrichDayArabic } from '@/curriculum/enrichArabic';

const PLACEHOLDER_SECTION = {
  id: 'placeholder',
  title: 'Content',
  titleAr: 'المحتوى',
  type: 'theory' as const,
  content: {
    simpleExplanation: 'This day\'s comprehensive content will be added in the next implementation phase.',
    professionalDefinition: 'Structured curriculum content pending.',
    ar: {
      simpleExplanation: 'المحتوى التفاعلي الشامل لهذا اليوم سيُضاف في مرحلة التنفيذ التالية.',
      professionalDefinition: 'محتوى المنهج المنظم قيد الإعداد.',
    },
  },
};

function createPlaceholder(dayNumber: number): DayCurriculum {
  const summary = DAY_SUMMARIES.find((d) => d.dayNumber === dayNumber);
  if (!summary) throw new Error(`Missing day summary ${dayNumber}`);
  return enrichDayArabic({
    dayNumber,
    title: summary.title,
    titleAr: summary.titleAr,
    subtitle: summary.subtitle,
    subtitleAr: summary.subtitleAr,
    topics: summary.topics,
    estimatedHours: summary.estimatedHours,
    objectives: [`Complete Day ${dayNumber} objectives`],
    objectivesAr: [`أكمل أهداف اليوم ${dayNumber}`],
    sections: [PLACEHOLDER_SECTION],
    codeReadingExercise: { id: `cr-d${dayNumber}`, title: 'TBD', titleAr: 'قريبًا', description: 'TBD', descriptionAr: 'قريبًا', code: '# TBD', language: 'python', questions: [] },
    challenges: [],
    debuggingChallenge: { id: `dbg-d${dayNumber}`, title: 'TBD', titleAr: 'قريبًا', scenario: 'TBD', scenarioAr: 'قريبًا', brokenCode: '# TBD', language: 'python', errorMessage: '', errorType: '', investigationSteps: [], fix: '', explanation: '', explanationAr: '' },
    erpScenario: { id: `erp-d${dayNumber}`, title: 'TBD', titleAr: 'قريبًا', businessContext: 'TBD', businessContextAr: 'قريبًا', technicalChallenge: 'TBD', technicalChallengeAr: 'قريبًا', questions: [], questionsAr: [], connection: '', connectionAr: '' },
    quiz: [],
    exam: [],
    terminology: [],
  });
}

const day01 = finalizeDay01(day01Raw);

const curriculumMap: Record<number, DayCurriculum> = {
  1: day01,
  2: createPlaceholder(2),
  3: createPlaceholder(3),
  4: createPlaceholder(4),
  5: createPlaceholder(5),
  6: createPlaceholder(6),
  7: createPlaceholder(7),
  8: createPlaceholder(8),
  9: createPlaceholder(9),
  10: createPlaceholder(10),
  11: createPlaceholder(11),
  12: createPlaceholder(12),
  13: createPlaceholder(13),
  14: createPlaceholder(14),
  15: createPlaceholder(15),
  16: createPlaceholder(16),
  17: createPlaceholder(17),
  18: createPlaceholder(18),
  19: createPlaceholder(19),
  20: createPlaceholder(20),
};

export function getDayCurriculum(dayNumber: number): DayCurriculum | undefined {
  return curriculumMap[dayNumber];
}

export function isDayFullyBuilt(dayNumber: number): boolean {
  return dayNumber === 1;
}
