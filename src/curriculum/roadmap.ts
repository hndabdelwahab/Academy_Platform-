import type { DaySummary } from '@/types';

export const DAY_SUMMARIES: DaySummary[] = [
  { dayNumber: 1, title: 'How Software Works', subtitle: "The Developer's Mental Model", topics: ['programming_fundamentals', 'python'], estimatedHours: 4, week: 1 },
  { dayNumber: 2, title: 'Control Flow & Logic', subtitle: 'Conditions, Loops, Functions', topics: ['python', 'debugging'], estimatedHours: 4, week: 1 },
  { dayNumber: 3, title: 'Data Structures', subtitle: 'How Programs Hold Information', topics: ['python', 'sql'], estimatedHours: 4, week: 1 },
  { dayNumber: 4, title: 'Modules & Packages', subtitle: 'Project Structure', topics: ['python', 'git'], estimatedHours: 3, week: 1 },
  { dayNumber: 5, title: 'Classes & OOP', subtitle: 'OOP in ERP Systems', topics: ['python', 'odoo'], estimatedHours: 4, week: 1 },
  { dayNumber: 6, title: 'SQL Foundations', subtitle: 'The Language of Data', topics: ['sql', 'erp_analysis'], estimatedHours: 4, week: 2 },
  { dayNumber: 7, title: 'SQL Relationships', subtitle: 'JOINs and Aggregates', topics: ['sql'], estimatedHours: 4, week: 2 },
  { dayNumber: 8, title: 'Advanced SQL', subtitle: 'Analytics, Optimization, Safety', topics: ['sql', 'production_safety'], estimatedHours: 4, week: 2 },
  { dayNumber: 9, title: 'APIs', subtitle: 'How Systems Communicate', topics: ['api'], estimatedHours: 4, week: 2 },
  { dayNumber: 10, title: 'JSON & Serialization', subtitle: 'Data Exchange Formats', topics: ['api', 'javascript'], estimatedHours: 3, week: 2 },
  { dayNumber: 11, title: 'HTML & CSS', subtitle: 'Frontend Foundations', topics: ['html_css'], estimatedHours: 4, week: 3 },
  { dayNumber: 12, title: 'JavaScript', subtitle: 'How the Browser Thinks', topics: ['javascript'], estimatedHours: 4, week: 3 },
  { dayNumber: 13, title: 'React', subtitle: 'Building ERP Interfaces', topics: ['react', 'javascript'], estimatedHours: 5, week: 3 },
  { dayNumber: 14, title: 'C# & .NET', subtitle: 'ERP Backend Alternative', topics: ['csharp', 'architecture'], estimatedHours: 4, week: 3 },
  { dayNumber: 15, title: 'XML Deep Dive', subtitle: 'The Language of ERP Views', topics: ['xml', 'odoo'], estimatedHours: 4, week: 3 },
  { dayNumber: 16, title: 'Odoo Module Architecture', subtitle: 'Models, Views, Security', topics: ['odoo'], estimatedHours: 5, week: 4 },
  { dayNumber: 17, title: 'Odoo Advanced', subtitle: 'Controllers, Cron, APIs', topics: ['odoo', 'api'], estimatedHours: 4, week: 4 },
  { dayNumber: 18, title: 'Software Architecture', subtitle: 'Seeing the Whole System', topics: ['architecture'], estimatedHours: 4, week: 4 },
  { dayNumber: 19, title: 'AI-Assisted Development', subtitle: 'Professional AI Usage', topics: ['ai_dev'], estimatedHours: 3, week: 4 },
  { dayNumber: 20, title: 'Final Integration', subtitle: 'Professional Practice', topics: ['erp_analysis', 'debugging', 'code_reading'], estimatedHours: 5, week: 4 },
];

export function getDaySummary(dayNumber: number): DaySummary | undefined {
  return DAY_SUMMARIES.find((d) => d.dayNumber === dayNumber);
}

export function getWeekDays(week: number): DaySummary[] {
  return DAY_SUMMARIES.filter((d) => d.week === week);
}
