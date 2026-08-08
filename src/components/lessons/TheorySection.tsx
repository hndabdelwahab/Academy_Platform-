import { useState } from 'react';
import type { SectionContent, ActiveLearningPrompt } from '@/types';
import { CodeEditor } from '@/components/editor/CodeEditor';
import { OutputPanel } from '@/components/editor/OutputPanel';
import { runPython } from '@/python/pyodide-runner';
import { useProgressStore } from '@/store/useProgress';
import {
  localizedCodeExample,
  localizedDebugging,
  localizedMistakes,
  localizedSectionText,
  localizedSyntax,
  pickLang,
} from '@/curriculum/localize';
import { t } from '@/i18n';
import { ChevronDown, ChevronRight, Play, Lock } from 'lucide-react';

interface TheorySectionProps {
  title: string;
  content: SectionContent;
  requiresAnswer?: ActiveLearningPrompt;
  sectionId: string;
  onComplete: () => void;
  savedAnswer?: string;
  onSaveAnswer: (answer: string) => void;
}

const CONTENT_SECTIONS: { key: 'simpleExplanation' | 'professionalDefinition' | 'whyItExists' | 'howItWorks' | 'erpExample' | 'odooConnection' | 'realProjectRecognition' | 'interviewTerminology'; label: string; labelAr: string }[] = [
  { key: 'simpleExplanation', label: 'Simple Explanation', labelAr: 'شرح بسيط' },
  { key: 'professionalDefinition', label: 'Professional Definition', labelAr: 'التعريف المهني' },
  { key: 'whyItExists', label: 'Why It Exists', labelAr: 'لماذا يوجد' },
  { key: 'howItWorks', label: 'How It Works', labelAr: 'كيف يعمل' },
  { key: 'erpExample', label: 'ERP Example', labelAr: 'مثال ERP' },
  { key: 'odooConnection', label: 'Odoo Connection', labelAr: 'الربط مع Odoo' },
  { key: 'realProjectRecognition', label: 'Real Project Recognition', labelAr: 'التعرّف في مشروع حقيقي' },
  { key: 'interviewTerminology', label: 'Interview Terminology', labelAr: 'مصطلحات المقابلة' },
];

export function TheorySection({
  title,
  content,
  requiresAnswer,
  onComplete,
  savedAnswer,
  onSaveAnswer,
}: TheorySectionProps) {
  const lang = useProgressStore((s) => s.settings.language);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ simpleExplanation: true });
  const [answer, setAnswer] = useState(savedAnswer ?? '');
  const [answered, setAnswered] = useState(!!savedAnswer);
  const [showModel, setShowModel] = useState(false);
  const [codeOutput, setCodeOutput] = useState('');
  const [codeError, setCodeError] = useState('');
  const [running, setRunning] = useState(false);

  const toggle = (key: string) => setExpanded((p) => ({ ...p, [key]: !p[key] }));
  const codeExample = localizedCodeExample(content, lang);
  const syntax = localizedSyntax(content, lang);
  const mistakes = localizedMistakes(content, lang);
  const debugging = localizedDebugging(content, lang);
  const promptQuestion = pickLang(lang, requiresAnswer?.question ?? '', requiresAnswer?.questionAr);
  const promptHint = pickLang(lang, requiresAnswer?.hint, requiresAnswer?.hintAr);
  const promptModel = pickLang(lang, requiresAnswer?.modelAnswer, requiresAnswer?.modelAnswerAr);

  const handleSubmitAnswer = () => {
    if (answer.trim().length < 10) return;
    onSaveAnswer(answer);
    setAnswered(true);
  };

  const runCode = async () => {
    if (!codeExample) return;
    setRunning(true);
    setCodeOutput('');
    setCodeError('');
    const result = await runPython(codeExample.code);
    setCodeOutput(result.output);
    setCodeError(result.error);
    setRunning(false);
  };

  const canContinue = !requiresAnswer || answered;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-text-primary">{title}</h2>

      {CONTENT_SECTIONS.map(({ key, label, labelAr }) => {
        const text = localizedSectionText(content, key, lang);
        if (!text) return null;
        return (
          <div key={key} className="content-block">
            <button onClick={() => toggle(key)} className="flex items-center gap-2 w-full text-start">
              {expanded[key] ? <ChevronDown className="w-4 h-4 text-accent" /> : <ChevronRight className="w-4 h-4 text-text-muted" />}
              <span className="content-label mb-0">{lang === 'ar' ? labelAr : label}</span>
            </button>
            {expanded[key] && (
              <p className="text-text-secondary leading-relaxed mt-2 whitespace-pre-wrap">{text}</p>
            )}
          </div>
        );
      })}

      {syntax && syntax.length > 0 && (
        <div className="content-block">
          <p className="content-label">{lang === 'ar' ? 'الصياغة' : 'Syntax'}</p>
          <div className="space-y-2 mt-2">
            {syntax.map((s, i) => (
              <div key={i} className="flex gap-3">
                <code className="font-mono text-sm bg-surface px-2 py-1 rounded text-accent shrink-0">{s.piece}</code>
                <span className="text-text-secondary text-sm">{s.explanation}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {codeExample && (
        <div className="content-block">
          <p className="content-label">{lang === 'ar' ? 'مثال شيفرة' : 'Code Example'}</p>
          <CodeEditor
            value={codeExample.code}
            language={codeExample.language}
            readOnly
            height="250px"
          />
          {codeExample.runnable && (
            <button onClick={runCode} disabled={running} className="btn-primary mt-2 flex items-center gap-2">
              <Play className="w-4 h-4" /> {lang === 'ar' ? 'تشغيل الشيفرة' : 'Run Code'}
            </button>
          )}
          <OutputPanel output={codeOutput} error={codeError} loading={running} />
          {codeExample.breakdown.length > 0 && (
            <div className="mt-4">
              <p className="content-label">{lang === 'ar' ? 'تفصيل الشيفرة' : 'Code Breakdown'}</p>
              {codeExample.breakdown.map((b, i) => (
                <div key={i} className="mt-2 text-sm">
                  <span className="font-mono text-accent">{lang === 'ar' ? `الأسطر ${b.lineRange}:` : `Lines ${b.lineRange}:`}</span>{' '}
                  <span className="text-text-secondary">{b.explanation}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {mistakes && mistakes.length > 0 && (
        <div className="content-block border-warning/30">
          <p className="content-label text-warning">{lang === 'ar' ? 'أخطاء شائعة' : 'Common Mistakes'}</p>
          {mistakes.map((m, i) => (
            <div key={i} className="mt-3 text-sm space-y-1">
              <div><span className="text-danger line-through">{m.wrong}</span></div>
              <div><span className="text-success">{m.right}</span></div>
              <div className="text-text-muted">{m.explanation}</div>
            </div>
          ))}
        </div>
      )}

      {debugging && debugging.length > 0 && (
        <div className="content-block border-danger/30">
          <p className="content-label text-danger">{lang === 'ar' ? 'التصحيح' : 'Debugging'}</p>
          {debugging.map((d, i) => (
            <div key={i} className="mt-3 text-sm space-y-2">
              <div><span className="badge bg-danger/20 text-danger">{d.errorType}</span></div>
              <CodeEditor value={d.code} language="python" readOnly height="80px" />
              <div className="text-danger font-mono text-xs">{d.error}</div>
              <div><strong className="text-text-primary">{lang === 'ar' ? 'التحقيق:' : 'Investigation:'}</strong> <span className="text-text-secondary">{d.investigation}</span></div>
              <div><strong className="text-text-primary">{lang === 'ar' ? 'الإصلاح:' : 'Fix:'}</strong> <span className="text-success">{d.fix}</span></div>
            </div>
          ))}
        </div>
      )}

      {requiresAnswer && (
        <div className="content-block border-accent/50 bg-accent-muted/10">
          <div className="flex items-center gap-2 mb-3">
            <Lock className="w-4 h-4 text-accent" />
            <p className="content-label mb-0 text-accent">
              {lang === 'ar' ? 'تعلم نشط — الإجابة مطلوبة' : 'Active Learning — Answer Required'}
            </p>
          </div>
          <p className="text-text-primary font-medium mb-2">{promptQuestion}</p>
          {promptHint && !answered && (
            <p className="text-text-muted text-sm mb-2">{lang === 'ar' ? `تلميح: ${promptHint}` : `Hint: ${promptHint}`}</p>
          )}
          <textarea
            className="input-field min-h-[100px] font-mono text-sm"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={answered}
            placeholder={lang === 'ar' ? 'اكتب إجابتك هنا قبل المتابعة...' : 'Write your answer here before continuing...'}
          />
          {!answered && (
            <button
              onClick={handleSubmitAnswer}
              disabled={answer.trim().length < 10}
              className="btn-primary mt-2"
            >
              {t('submit', lang)}
            </button>
          )}
          {answered && (
            <div className="mt-3">
              <button onClick={() => setShowModel(!showModel)} className="btn-secondary text-sm">
                {showModel
                  ? (lang === 'ar' ? 'إخفاء الإجابة النموذجية' : 'Hide Model Answer')
                  : (lang === 'ar' ? 'عرض الإجابة النموذجية' : 'Show Model Answer')}
              </button>
              {showModel && promptModel && (
                <div className="mt-2 p-3 bg-surface rounded-md text-sm text-text-secondary">
                  <strong>{t('modelAnswer', lang)}:</strong> {promptModel}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={onComplete}
          disabled={!canContinue}
          className="btn-primary flex items-center gap-2"
        >
          {!canContinue && <Lock className="w-4 h-4" />}
          {lang === 'ar' ? 'إكمال القسم' : 'Mark Section Complete'}
        </button>
      </div>
    </div>
  );
}
