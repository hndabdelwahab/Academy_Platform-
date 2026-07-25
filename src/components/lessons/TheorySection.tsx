import { useState } from 'react';
import type { SectionContent, ActiveLearningPrompt } from '@/types';
import { CodeEditor } from '@/components/editor/CodeEditor';
import { OutputPanel } from '@/components/editor/OutputPanel';
import { runPython } from '@/python/pyodide-runner';
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

const CONTENT_SECTIONS: { key: keyof SectionContent; label: string }[] = [
  { key: 'simpleExplanation', label: 'Simple Explanation' },
  { key: 'professionalDefinition', label: 'Professional Definition' },
  { key: 'whyItExists', label: 'Why It Exists' },
  { key: 'howItWorks', label: 'How It Works' },
  { key: 'erpExample', label: 'ERP Example' },
  { key: 'odooConnection', label: 'Odoo Connection' },
  { key: 'realProjectRecognition', label: 'Real Project Recognition' },
  { key: 'interviewTerminology', label: 'Interview Terminology' },
];

export function TheorySection({
  title,
  content,
  requiresAnswer,
  sectionId,
  onComplete,
  savedAnswer,
  onSaveAnswer,
}: TheorySectionProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ simpleExplanation: true });
  const [answer, setAnswer] = useState(savedAnswer ?? '');
  const [answered, setAnswered] = useState(!!savedAnswer);
  const [showModel, setShowModel] = useState(false);
  const [codeOutput, setCodeOutput] = useState('');
  const [codeError, setCodeError] = useState('');
  const [running, setRunning] = useState(false);

  const toggle = (key: string) => setExpanded((p) => ({ ...p, [key]: !p[key] }));

  const handleSubmitAnswer = () => {
    if (answer.trim().length < 10) return;
    onSaveAnswer(answer);
    setAnswered(true);
  };

  const handleContinue = () => {
    onComplete();
  };

  const runCode = async () => {
    if (!content.codeExample) return;
    setRunning(true);
    setCodeOutput('');
    setCodeError('');
    const result = await runPython(content.codeExample.code);
    setCodeOutput(result.output);
    setCodeError(result.error);
    setRunning(false);
  };

  const canContinue = !requiresAnswer || answered;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-text-primary">{title}</h2>

      {CONTENT_SECTIONS.map(({ key, label }) => {
        const text = content[key];
        if (!text || typeof text !== 'string') return null;
        return (
          <div key={key} className="content-block">
            <button
              onClick={() => toggle(key)}
              className="flex items-center gap-2 w-full text-left"
            >
              {expanded[key] ? <ChevronDown className="w-4 h-4 text-accent" /> : <ChevronRight className="w-4 h-4 text-text-muted" />}
              <span className="content-label mb-0">{label}</span>
            </button>
            {expanded[key] && (
              <p className="text-text-secondary leading-relaxed mt-2 whitespace-pre-wrap">{text}</p>
            )}
          </div>
        );
      })}

      {content.syntax && content.syntax.length > 0 && (
        <div className="content-block">
          <p className="content-label">Syntax</p>
          <div className="space-y-2 mt-2">
            {content.syntax.map((s, i) => (
              <div key={i} className="flex gap-3">
                <code className="font-mono text-sm bg-surface px-2 py-1 rounded text-accent shrink-0">{s.piece}</code>
                <span className="text-text-secondary text-sm">{s.explanation}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {content.codeExample && (
        <div className="content-block">
          <p className="content-label">Code Example</p>
          <CodeEditor
            value={content.codeExample.code}
            language={content.codeExample.language}
            readOnly
            height="250px"
          />
          {content.codeExample.runnable && (
            <button onClick={runCode} disabled={running} className="btn-primary mt-2 flex items-center gap-2">
              <Play className="w-4 h-4" /> Run Code
            </button>
          )}
          <OutputPanel output={codeOutput} error={codeError} loading={running} />
          {content.codeExample.breakdown.length > 0 && (
            <div className="mt-4">
              <p className="content-label">Code Breakdown</p>
              {content.codeExample.breakdown.map((b, i) => (
                <div key={i} className="mt-2 text-sm">
                  <span className="font-mono text-accent">Lines {b.lineRange}:</span>{' '}
                  <span className="text-text-secondary">{b.explanation}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {content.commonMistakes && content.commonMistakes.length > 0 && (
        <div className="content-block border-warning/30">
          <p className="content-label text-warning">Common Mistakes</p>
          {content.commonMistakes.map((m, i) => (
            <div key={i} className="mt-3 text-sm space-y-1">
              <div><span className="text-danger line-through">{m.wrong}</span></div>
              <div><span className="text-success">{m.right}</span></div>
              <div className="text-text-muted">{m.explanation}</div>
            </div>
          ))}
        </div>
      )}

      {content.debugging && content.debugging.length > 0 && (
        <div className="content-block border-danger/30">
          <p className="content-label text-danger">Debugging</p>
          {content.debugging.map((d, i) => (
            <div key={i} className="mt-3 text-sm space-y-2">
              <div><span className="badge bg-danger/20 text-danger">{d.errorType}</span></div>
              <CodeEditor value={d.code} language="python" readOnly height="80px" />
              <div className="text-danger font-mono text-xs">{d.error}</div>
              <div><strong className="text-text-primary">Investigation:</strong> <span className="text-text-secondary">{d.investigation}</span></div>
              <div><strong className="text-text-primary">Fix:</strong> <span className="text-success">{d.fix}</span></div>
            </div>
          ))}
        </div>
      )}

      {requiresAnswer && (
        <div className="content-block border-accent/50 bg-accent-muted/10">
          <div className="flex items-center gap-2 mb-3">
            <Lock className="w-4 h-4 text-accent" />
            <p className="content-label mb-0 text-accent">Active Learning — Answer Required</p>
          </div>
          <p className="text-text-primary font-medium mb-2">{requiresAnswer.question}</p>
          {requiresAnswer.hint && !answered && (
            <p className="text-text-muted text-sm mb-2">Hint: {requiresAnswer.hint}</p>
          )}
          <textarea
            className="input-field min-h-[100px] font-mono text-sm"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={answered}
            placeholder="Write your answer here before continuing..."
          />
          {!answered && (
            <button
              onClick={handleSubmitAnswer}
              disabled={answer.trim().length < 10}
              className="btn-primary mt-2"
            >
              Submit Answer
            </button>
          )}
          {answered && (
            <div className="mt-3">
              <button onClick={() => setShowModel(!showModel)} className="btn-secondary text-sm">
                {showModel ? 'Hide' : 'Show'} Model Answer
              </button>
              {showModel && requiresAnswer.modelAnswer && (
                <div className="mt-2 p-3 bg-surface rounded-md text-sm text-text-secondary">
                  <strong>Model Answer:</strong> {requiresAnswer.modelAnswer}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleContinue}
          disabled={!canContinue}
          className="btn-primary flex items-center gap-2"
        >
          {!canContinue && <Lock className="w-4 h-4" />}
          Mark Section Complete
        </button>
      </div>
    </div>
  );
}
