import type { DaySummary } from '@/types';

export const DAY_SUMMARIES: DaySummary[] = [
  { dayNumber: 1, title: 'How Software Works', titleAr: 'كيف تعمل البرمجيات', subtitle: "The Developer's Mental Model", subtitleAr: 'النموذج الذهني للمطوّر', topics: ['programming_fundamentals', 'python'], estimatedHours: 4, week: 1 },
  { dayNumber: 2, title: 'Control Flow & Logic', titleAr: 'تدفق التحكم والمنطق', subtitle: 'Conditions, Loops, Functions', subtitleAr: 'الشروط والحلقات والدوال', topics: ['python', 'debugging'], estimatedHours: 4, week: 1 },
  { dayNumber: 3, title: 'Data Structures', titleAr: 'هياكل البيانات', subtitle: 'How Programs Hold Information', subtitleAr: 'كيف تحتفظ البرامج بالمعلومات', topics: ['python', 'sql'], estimatedHours: 4, week: 1 },
  { dayNumber: 4, title: 'Modules & Packages', titleAr: 'الوحدات والحزم', subtitle: 'Project Structure', subtitleAr: 'هيكل المشروع', topics: ['python', 'git'], estimatedHours: 3, week: 1 },
  { dayNumber: 5, title: 'Classes & OOP', titleAr: 'الفئات والبرمجة كائنية التوجه', subtitle: 'OOP in ERP Systems', subtitleAr: 'OOP في أنظمة ERP', topics: ['python', 'odoo'], estimatedHours: 4, week: 1 },
  { dayNumber: 6, title: 'SQL Foundations', titleAr: 'أساسيات SQL', subtitle: 'The Language of Data', subtitleAr: 'لغة البيانات', topics: ['sql', 'erp_analysis'], estimatedHours: 4, week: 2 },
  { dayNumber: 7, title: 'SQL Relationships', titleAr: 'علاقات SQL', subtitle: 'JOINs and Aggregates', subtitleAr: 'الربط والتجميعات', topics: ['sql'], estimatedHours: 4, week: 2 },
  { dayNumber: 8, title: 'Advanced SQL', titleAr: 'SQL المتقدم', subtitle: 'Analytics, Optimization, Safety', subtitleAr: 'التحليل والتحسين والسلامة', topics: ['sql', 'production_safety'], estimatedHours: 4, week: 2 },
  { dayNumber: 9, title: 'APIs', titleAr: 'واجهات البرمجة API', subtitle: 'How Systems Communicate', subtitleAr: 'كيف تتواصل الأنظمة', topics: ['api'], estimatedHours: 4, week: 2 },
  { dayNumber: 10, title: 'JSON & Serialization', titleAr: 'JSON والتسلسل', subtitle: 'Data Exchange Formats', subtitleAr: 'صيغ تبادل البيانات', topics: ['api', 'javascript'], estimatedHours: 3, week: 2 },
  { dayNumber: 11, title: 'HTML & CSS', titleAr: 'HTML و CSS', subtitle: 'Frontend Foundations', subtitleAr: 'أساسيات الواجهة الأمامية', topics: ['html_css'], estimatedHours: 4, week: 3 },
  { dayNumber: 12, title: 'JavaScript', titleAr: 'JavaScript', subtitle: 'How the Browser Thinks', subtitleAr: 'كيف يفكر المتصفح', topics: ['javascript'], estimatedHours: 4, week: 3 },
  { dayNumber: 13, title: 'React', titleAr: 'React', subtitle: 'Building ERP Interfaces', subtitleAr: 'بناء واجهات ERP', topics: ['react', 'javascript'], estimatedHours: 5, week: 3 },
  { dayNumber: 14, title: 'C# & .NET', titleAr: 'C# و .NET', subtitle: 'ERP Backend Alternative', subtitleAr: 'بديل باكند ERP', topics: ['csharp', 'architecture'], estimatedHours: 4, week: 3 },
  { dayNumber: 15, title: 'XML Deep Dive', titleAr: 'تعمق في XML', subtitle: 'The Language of ERP Views', subtitleAr: 'لغة عروض ERP', topics: ['xml', 'odoo'], estimatedHours: 4, week: 3 },
  { dayNumber: 16, title: 'Odoo Module Architecture', titleAr: 'هندسة وحدات Odoo', subtitle: 'Models, Views, Security', subtitleAr: 'النماذج والعروض والأمان', topics: ['odoo'], estimatedHours: 5, week: 4 },
  { dayNumber: 17, title: 'Odoo Advanced', titleAr: 'Odoo المتقدم', subtitle: 'Controllers, Cron, APIs', subtitleAr: 'المتحكمات والمهام المجدولة وواجهات API', topics: ['odoo', 'api'], estimatedHours: 4, week: 4 },
  { dayNumber: 18, title: 'Software Architecture', titleAr: 'هندسة البرمجيات', subtitle: 'Seeing the Whole System', subtitleAr: 'رؤية النظام بالكامل', topics: ['architecture'], estimatedHours: 4, week: 4 },
  { dayNumber: 19, title: 'AI-Assisted Development', titleAr: 'التطوير بمساعدة الذكاء الاصطناعي', subtitle: 'Professional AI Usage', subtitleAr: 'استخدام احترافي للذكاء الاصطناعي', topics: ['ai_dev'], estimatedHours: 3, week: 4 },
  { dayNumber: 20, title: 'Final Integration', titleAr: 'التكامل النهائي', subtitle: 'Professional Practice', subtitleAr: 'الممارسة المهنية', topics: ['erp_analysis', 'debugging', 'code_reading'], estimatedHours: 5, week: 4 },
];

export const TOPIC_LABELS_AR: Record<string, string> = {
  programming_fundamentals: 'أساسيات البرمجة',
  python: 'بايثون',
  csharp: 'سي شارب',
  javascript: 'جافاسكربت',
  react: 'رياكت',
  html_css: 'HTML و CSS',
  xml: 'XML',
  sql: 'SQL',
  odoo: 'أودو',
  debugging: 'التصحيح',
  code_reading: 'قراءة الشيفرة',
  erp_analysis: 'تحليل ERP',
  ai_dev: 'تطوير بالذكاء الاصطناعي',
  architecture: 'الهندسة المعمارية',
  git: 'Git',
  api: 'API',
  technical_communication: 'التواصل التقني',
  production_safety: 'سلامة الإنتاج',
};

export function getDaySummary(dayNumber: number): DaySummary | undefined {
  return DAY_SUMMARIES.find((d) => d.dayNumber === dayNumber);
}

export function getWeekDays(week: number): DaySummary[] {
  return DAY_SUMMARIES.filter((d) => d.week === week);
}

export function topicLabel(topic: string, lang: 'en' | 'ar'): string {
  if (lang === 'ar' && TOPIC_LABELS_AR[topic]) return TOPIC_LABELS_AR[topic];
  return topic.replace(/_/g, ' ');
}
