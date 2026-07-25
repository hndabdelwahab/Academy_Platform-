import { useState, useEffect } from 'react';
import { VISUAL_FLOWS } from '@/curriculum/visual-flows';
import { useProgressStore } from '@/store/useProgress';
import { t } from '@/i18n';
import { ChevronRight, Play, Pause, RotateCcw } from 'lucide-react';

export function HowCodeWorks() {
  const lang = useProgressStore((s) => s.settings.language);
  const [activeFlow, setActiveFlow] = useState(VISUAL_FLOWS[0].id);
  const [stepIndex, setStepIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  const flow = VISUAL_FLOWS.find((f) => f.id === activeFlow)!;
  const currentStep = flow.steps[stepIndex];

  const nextStep = () => {
    if (stepIndex < flow.steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      setPlaying(false);
    }
  };

  const handlePlay = () => {
    setPlaying(true);
    setStepIndex(0);
  };

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => {
      setStepIndex((i) => {
        if (i >= flow.steps.length - 1) {
          setPlaying(false);
          return i;
        }
        return i + 1;
      });
    }, 2000);
    return () => clearInterval(timer);
  }, [playing, flow.steps.length]);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">{t('howCodeWorks', lang)}</h1>
        <p className="text-text-secondary mt-1">Interactive step-by-step visual execution flows</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {VISUAL_FLOWS.map((f) => (
          <button
            key={f.id}
            onClick={() => { setActiveFlow(f.id); setStepIndex(0); setPlaying(false); }}
            className={`badge text-sm px-3 py-1.5 ${activeFlow === f.id ? 'bg-accent text-white' : 'bg-surface-hover text-text-secondary'}`}
          >
            {f.title}
          </button>
        ))}
      </div>

      <div className="card">
        <h2 className="text-lg font-bold text-text-primary">{flow.title}</h2>
        <p className="text-text-secondary mt-1">{flow.description}</p>

        <div className="flex gap-2 mt-4">
          <button onClick={handlePlay} className="btn-primary flex items-center gap-1 text-sm">
            <Play className="w-4 h-4" /> Auto Play
          </button>
          <button onClick={() => setStepIndex(Math.max(0, stepIndex - 1))} className="btn-secondary text-sm">
            <Pause className="w-4 h-4" />
          </button>
          <button onClick={nextStep} className="btn-secondary flex items-center gap-1 text-sm">
            Next <ChevronRight className="w-4 h-4" />
          </button>
          <button onClick={() => { setStepIndex(0); setPlaying(false); }} className="btn-ghost text-sm">
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="relative">
        {flow.steps.map((step, i) => (
          <div
            key={step.id}
            className={`flex items-start gap-4 mb-4 transition-all duration-500 ${
              i <= stepIndex ? 'opacity-100' : 'opacity-30'
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-sm ${
              i === stepIndex ? 'bg-accent text-white scale-110' :
              i < stepIndex ? 'bg-success text-white' :
              'bg-surface-hover text-text-muted'
            }`}>
              {i + 1}
            </div>
            <div className={`card flex-1 ${i === stepIndex ? 'border-accent shadow-lg' : ''}`}>
              <h3 className="font-semibold text-text-primary">{step.label}</h3>
              <p className="text-text-secondary mt-1">{step.description}</p>
              {step.detail && i <= stepIndex && (
                <p className="text-sm text-accent mt-2 font-mono">{step.detail}</p>
              )}
            </div>
            {i < flow.steps.length - 1 && (
              <div className="absolute left-5 top-12 w-0.5 h-8 bg-border" style={{ marginTop: `${i * 96}px` }} />
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-1">
        {flow.steps.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i <= stepIndex ? 'bg-accent' : 'bg-border'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
