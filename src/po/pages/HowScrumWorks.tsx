import { VISUAL_FLOWS } from '@/po/curriculum/visual-flows';
import { useProgressStore } from '@/po/store/useProgress';

export function HowScrumWorks() {
  const lang = useProgressStore((s) => s.settings.language);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          {lang === 'ar' ? 'كيف يعمل سكرم' : 'How Scrum Works'}
        </h1>
        <p className="text-text-secondary mt-1">
          {lang === 'ar'
            ? 'مسارات بصرية للأحداث والمخرجات ودورة ملكية المنتج.'
            : 'Visual flows for Scrum events, artifacts, and the Product Owner decision loop.'}
        </p>
      </div>
      {VISUAL_FLOWS.map((flow) => (
        <div key={flow.id} className="card space-y-4">
          <div>
            <h2 className="text-lg font-bold">{flow.title}</h2>
            <p className="text-sm text-text-secondary">{flow.description}</p>
          </div>
          <ol className="space-y-3">
            {flow.steps.map((step: { id: string; label: string; description: string; detail?: string }, i: number) => (
              <li key={step.id} className="flex gap-3">
                <span className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center shrink-0 text-sm font-bold">
                  {i + 1}
                </span>
                <div>
                  <p className="font-medium">{step.label}</p>
                  <p className="text-sm text-text-secondary">{step.description}</p>
                  {step.detail && <p className="text-xs text-text-muted mt-1">{step.detail}</p>}
                </div>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}
