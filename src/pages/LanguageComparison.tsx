import { useState } from 'react';
import { COMPARISONS } from '@/curriculum/language-comparison';
import { CodeEditor } from '@/components/editor/CodeEditor';
import { useProgressStore } from '@/store/useProgress';
import { t } from '@/i18n';

export function LanguageComparison() {
  const lang = useProgressStore((s) => s.settings.language);
  const [activeIndex, setActiveIndex] = useState(0);
  const comparison = COMPARISONS[activeIndex];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">{t('languageComparison', lang)}</h1>
        <p className="text-text-secondary mt-1">Same concept, different syntax and runtime — Python, C#, JavaScript</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {COMPARISONS.map((c, i) => (
          <button
            key={c.concept}
            onClick={() => setActiveIndex(i)}
            className={`badge text-sm px-3 py-1.5 ${i === activeIndex ? 'bg-accent text-white' : 'bg-surface-hover text-text-secondary'}`}
          >
            {c.concept}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card">
          <h3 className="text-sm font-bold text-accent mb-2">Python</h3>
          <CodeEditor value={comparison.python.code} language="python" readOnly height="180px" />
          <p className="text-xs text-text-secondary mt-2">{comparison.python.notes}</p>
        </div>
        <div className="card">
          <h3 className="text-sm font-bold text-accent mb-2">C#</h3>
          <CodeEditor value={comparison.csharp.code} language="csharp" readOnly height="180px" />
          <p className="text-xs text-text-secondary mt-2">{comparison.csharp.notes}</p>
        </div>
        <div className="card">
          <h3 className="text-sm font-bold text-accent mb-2">JavaScript</h3>
          <CodeEditor value={comparison.javascript.code} language="javascript" readOnly height="180px" />
          <p className="text-xs text-text-secondary mt-2">{comparison.javascript.notes}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: 'Same Concept', text: comparison.sameConcept },
          { label: 'Syntax Difference', text: comparison.syntaxDifference },
          { label: 'Runtime Difference', text: comparison.runtimeDifference },
          { label: 'Type System Difference', text: comparison.typeSystemDifference },
          { label: 'Typical Use Case', text: comparison.typicalUseCase },
          { label: 'ERP Use Case', text: comparison.erpUseCase },
        ].map(({ label, text }) => (
          <div key={label} className="card">
            <p className="content-label">{label}</p>
            <p className="text-sm text-text-secondary mt-1">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
