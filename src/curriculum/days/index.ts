import type { DayCurriculum } from '@/types';
import { day01 } from './day-01';

const PLACEHOLDER_SECTION = {
  id: 'placeholder',
  title: 'Content',
  type: 'theory' as const,
  content: {
    simpleExplanation: 'This day\'s comprehensive content will be added in the next implementation phase.',
    professionalDefinition: 'Structured curriculum content pending.',
  },
};

function createPlaceholder(dayNumber: number, title: string, subtitle: string, topics: DayCurriculum['topics']): DayCurriculum {
  return {
    dayNumber,
    title,
    subtitle,
    topics,
    estimatedHours: 4,
    objectives: [`Complete Day ${dayNumber} objectives`],
    sections: [PLACEHOLDER_SECTION],
    codeReadingExercise: { id: `cr-d${dayNumber}`, title: 'TBD', description: 'TBD', code: '# TBD', language: 'python', questions: [] },
    challenges: [],
    debuggingChallenge: { id: `dbg-d${dayNumber}`, title: 'TBD', scenario: 'TBD', brokenCode: '# TBD', language: 'python', errorMessage: '', errorType: '', investigationSteps: [], fix: '', explanation: '' },
    erpScenario: { id: `erp-d${dayNumber}`, title: 'TBD', businessContext: 'TBD', technicalChallenge: 'TBD', questions: [], connection: '' },
    quiz: [],
    exam: [],
    terminology: [],
  };
}

const curriculumMap: Record<number, DayCurriculum> = {
  1: day01,
  2: createPlaceholder(2, 'Control Flow & Logic', 'Conditions, Loops, Functions', ['python', 'debugging']),
  3: createPlaceholder(3, 'Data Structures', 'How Programs Hold Information', ['python', 'sql']),
  4: createPlaceholder(4, 'Modules & Packages', 'Project Structure', ['python', 'git']),
  5: createPlaceholder(5, 'Classes & OOP', 'OOP in ERP Systems', ['python', 'odoo']),
  6: createPlaceholder(6, 'SQL Foundations', 'The Language of Data', ['sql', 'erp_analysis']),
  7: createPlaceholder(7, 'SQL Relationships', 'JOINs and Aggregates', ['sql']),
  8: createPlaceholder(8, 'Advanced SQL', 'Analytics, Optimization, Safety', ['sql', 'production_safety']),
  9: createPlaceholder(9, 'APIs', 'How Systems Communicate', ['api']),
  10: createPlaceholder(10, 'JSON & Serialization', 'Data Exchange Formats', ['api', 'javascript']),
  11: createPlaceholder(11, 'HTML & CSS', 'Frontend Foundations', ['html_css']),
  12: createPlaceholder(12, 'JavaScript', 'How the Browser Thinks', ['javascript']),
  13: createPlaceholder(13, 'React', 'Building ERP Interfaces', ['react', 'javascript']),
  14: createPlaceholder(14, 'C# & .NET', 'ERP Backend Alternative', ['csharp', 'architecture']),
  15: createPlaceholder(15, 'XML Deep Dive', 'The Language of ERP Views', ['xml', 'odoo']),
  16: createPlaceholder(16, 'Odoo Module Architecture', 'Models, Views, Security', ['odoo']),
  17: createPlaceholder(17, 'Odoo Advanced', 'Controllers, Cron, APIs', ['odoo', 'api']),
  18: createPlaceholder(18, 'Software Architecture', 'Seeing the Whole System', ['architecture']),
  19: createPlaceholder(19, 'AI-Assisted Development', 'Professional AI Usage', ['ai_dev']),
  20: createPlaceholder(20, 'Final Integration', 'Professional Practice', ['erp_analysis', 'debugging', 'code_reading']),
};

export function getDayCurriculum(dayNumber: number): DayCurriculum | undefined {
  return curriculumMap[dayNumber];
}

export function isDayFullyBuilt(dayNumber: number): boolean {
  return dayNumber === 1;
}
