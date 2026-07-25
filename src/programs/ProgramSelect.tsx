import { Code2, Target, ArrowRight } from 'lucide-react';
import { useProgramStore, type ProgramId } from './programStore';

const PROGRAMS: {
  id: ProgramId;
  title: string;
  titleAr: string;
  subtitle: string;
  subtitleAr: string;
  points: string[];
  pointsAr: string[];
  storageKey: string;
  accent: string;
  Icon: typeof Code2;
}[] = [
  {
    id: 'erp',
    title: 'ERP Developer Mastery Academy',
    titleAr: 'أكاديمية إتقان مطور ERP',
    subtitle: 'Professional ERP software developer training',
    subtitleAr: 'تدريب احترافي لمطوري برمجيات ERP',
    points: [
      '20-day developer journey with Python, SQL, Odoo, and architecture',
      'Technical assessment, code playgrounds, and debugging labs',
      'Progress saved separately under erp-academy-progress',
    ],
    pointsAr: [
      'رحلة مطور لمدة 20 يوماً مع Python وSQL وOdoo والهندسة',
      'تقييم تقني وبيئات برمجة ومختبرات تصحيح الأخطاء',
      'التقدم محفوظ بشكل مستقل في erp-academy-progress',
    ],
    storageKey: 'erp-academy-progress',
    accent: 'border-accent/40 hover:border-accent',
    Icon: Code2,
  },
  {
    id: 'po',
    title: 'Product Owner Mastery Academy',
    titleAr: 'أكاديمية إتقان مالك المنتج',
    subtitle: 'Beginner-to-professional Product Ownership, Agile, and Scrum',
    subtitleAr: 'ملكية المنتج وأجايل وسكرم من المبتدئ إلى المستوى المهني',
    points: [
      '20-day Product Owner journey from foundation to job-ready simulation',
      'Artifacts, stakeholder scenarios, quizzes, and professional feedback',
      'Progress saved separately under po-academy-progress',
    ],
    pointsAr: [
      'رحلة مالك منتج لمدة 20 يوماً من الأساسيات إلى المحاكاة المهنية',
      'مخرجات وسيناريوهات أصحاب المصلحة واختبارات وتغذية راجعة مهنية',
      'التقدم محفوظ بشكل مستقل في po-academy-progress',
    ],
    storageKey: 'po-academy-progress',
    accent: 'border-info/40 hover:border-info',
    Icon: Target,
  },
];

export function ProgramSelect() {
  const selectProgram = useProgramStore((s) => s.selectProgram);
  // Prefer document language; default English for the chooser
  const lang = (typeof document !== 'undefined' && document.documentElement.lang === 'ar') ? 'ar' : 'en';
  const rtl = lang === 'ar';

  return (
    <div className="min-h-screen bg-surface text-text-primary" dir={rtl ? 'rtl' : 'ltr'}>
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-10">
        <div className="text-center space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            {rtl ? 'منصة التعلم' : 'Learning Platform'}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold">
            {rtl ? 'اختر برنامج التعلم' : 'Choose Your Learning Program'}
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto">
            {rtl
              ? 'كل برنامج مستقل بالكامل: منهجه وتقييمه ولوحة تقدمه وأدواته ومفتاح التخزين الخاص به. يمكنك التبديل في أي وقت دون فقدان التقدم.'
              : 'Each program is fully independent: its own curriculum, assessment, dashboard, tools, and progress storage. You can switch anytime without losing progress.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {PROGRAMS.map((program) => {
            const Icon = program.Icon;
            return (
              <button
                key={program.id}
                type="button"
                onClick={() => selectProgram(program.id)}
                className={`card text-start border-2 transition-all hover:shadow-lg ${program.accent} space-y-4`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-md bg-accent flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold leading-tight">
                      {rtl ? program.titleAr : program.title}
                    </h2>
                    <p className="text-sm text-text-secondary mt-1">
                      {rtl ? program.subtitleAr : program.subtitle}
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-text-secondary">
                  {(rtl ? program.pointsAr : program.points).map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="text-accent mt-0.5">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-text-muted font-mono">{program.storageKey}</p>
                <span className="inline-flex items-center gap-2 text-accent font-semibold text-sm">
                  {rtl ? 'ابدأ هذا البرنامج' : 'Enter this program'}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
