import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getDayCurriculum, isDayFullyBuilt } from '@/curriculum/days';
import { useProgressStore } from '@/store/useProgress';
import { TheorySection } from '@/components/lessons/TheorySection';
import { QuizEngine } from '@/components/quiz/QuizEngine';
import { CodeEditor } from '@/components/editor/CodeEditor';
import { OutputPanel } from '@/components/editor/OutputPanel';
import { runPython } from '@/python/pyodide-runner';
import { gradeCodeReading, runPythonTests, getProgressionStatus } from '@/engine/scoring';
import { t } from '@/i18n';
import {
  BookOpen, Code2, Bug, Eye, HelpCircle, FileCheck, ArrowLeft,
  CheckCircle, Lightbulb,
} from 'lucide-react';
import type { CodeReadingExercise, DayCurriculum } from '@/types';

type Tab = 'lesson' | 'reading' | 'challenge' | 'debug' | 'quiz' | 'exam';

export function DayPage() {
  const { dayNumber: dayParam } = useParams();
  const dayNumber = parseInt(dayParam ?? '1', 10);
  const curriculum = getDayCurriculum(dayNumber);
  const navigate = useNavigate();
  const store = useProgressStore();
  const lang = store.settings.language;
  const dayProgress = store.days[dayNumber];

  const [activeTab, setActiveTab] = useState<Tab>('lesson');
  const [sectionIndex, setSectionIndex] = useState(0);

  useEffect(() => {
    if (dayProgress?.status === 'locked') {
      navigate('/roadmap');
      return;
    }
    store.startDay(dayNumber);
  }, [dayNumber]);

  if (!curriculum) return <div>Day not found</div>;

  if (!isDayFullyBuilt(dayNumber)) {
    return (
      <div className="max-w-3xl mx-auto card text-center py-12">
        <h2 className="text-xl font-bold">Day {dayNumber}: {curriculum.title}</h2>
        <p className="text-text-secondary mt-2">Full interactive content for this day will be available in the next implementation phase.</p>
        <Link to="/roadmap" className="btn-primary mt-4 inline-block">Back to Roadmap</Link>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: typeof BookOpen }[] = [
    { id: 'lesson', label: t('lesson', lang), icon: BookOpen },
    { id: 'reading', label: t('codeReading', lang), icon: Eye },
    { id: 'challenge', label: t('challenge', lang), icon: Code2 },
    { id: 'debug', label: t('debugging', lang), icon: Bug },
    { id: 'quiz', label: t('quiz', lang), icon: HelpCircle },
    { id: 'exam', label: t('exam', lang), icon: FileCheck },
  ];

  const section = curriculum.sections[sectionIndex];

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <div className="flex items-center gap-3">
        <Link to="/roadmap" className="btn-ghost"><ArrowLeft className="w-4 h-4" /></Link>
        <div>
          <p className="text-xs text-accent font-medium">{t('day', lang)} {dayNumber}</p>
          <h1 className="text-xl font-bold text-text-primary">{curriculum.title}</h1>
          <p className="text-sm text-text-muted">{curriculum.subtitle}</p>
        </div>
      </div>

      <div className="card">
        <h3 className="text-sm font-semibold text-text-primary mb-2">{t('objectives', lang)}</h3>
        <ul className="space-y-1">
          {curriculum.objectives.map((obj, i) => (
            <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              {obj}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-1 overflow-x-auto pb-1">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm whitespace-nowrap transition-colors ${
              activeTab === id ? 'bg-accent text-white' : 'bg-surface-hover text-text-secondary hover:text-text-primary'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'lesson' && section && (
        <div>
          <div className="flex items-center gap-2 mb-4 text-sm text-text-muted">
            Section {sectionIndex + 1} of {curriculum.sections.length}
            {dayProgress.sectionProgress[section.id] && (
              <CheckCircle className="w-4 h-4 text-success" />
            )}
          </div>
          <TheorySection
            title={section.title}
            content={section.content}
            requiresAnswer={section.requiresAnswer}
            sectionId={section.id}
            savedAnswer={dayProgress.activeLearningAnswers?.[section.id]}
            onSaveAnswer={(answer) => store.saveActiveLearningAnswer(dayNumber, section.id, answer)}
            onComplete={() => {
              store.completeSection(dayNumber, section.id);
              if (sectionIndex < curriculum.sections.length - 1) {
                setSectionIndex(sectionIndex + 1);
              }
            }}
          />
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setSectionIndex(Math.max(0, sectionIndex - 1))}
              disabled={sectionIndex === 0}
              className="btn-secondary"
            >
              Previous Section
            </button>
            <button
              onClick={() => setSectionIndex(Math.min(curriculum.sections.length - 1, sectionIndex + 1))}
              disabled={sectionIndex === curriculum.sections.length - 1}
              className="btn-secondary"
            >
              Next Section
            </button>
          </div>
        </div>
      )}

      {activeTab === 'reading' && (
        <CodeReadingTab
          exercise={curriculum.codeReadingExercise}
          onComplete={(score) => {
            store.updateDayScores(dayNumber, { readingScore: score });
            store.updateThinkingScore('codeUnderstanding', score > 70 ? 5 : 2);
          }}
        />
      )}

      {activeTab === 'challenge' && (
        <ChallengeTab
          challenges={curriculum.challenges}
          onComplete={(score) => {
            store.updateDayScores(dayNumber, { codeScore: score });
            store.updateThinkingScore('logicalThinking', score > 70 ? 5 : 2);
          }}
        />
      )}

      {activeTab === 'debug' && (
        <DebugTab
          challenge={curriculum.debuggingChallenge}
          onComplete={(score) => {
            store.updateDayScores(dayNumber, { debugScore: score });
            store.updateThinkingScore('debuggingDiscipline', score > 70 ? 5 : 2);
          }}
        />
      )}

      {activeTab === 'quiz' && (
        <QuizEngine
          questions={curriculum.quiz}
          title={`${t('day', lang)} ${dayNumber} ${t('quiz', lang)}`}
          onComplete={(score) => {
            store.updateDayScores(dayNumber, { quizScore: score });
            store.updateTopicScore('programming_fundamentals', score);
            store.updateTopicScore('python', score);
          }}
        />
      )}

      {activeTab === 'exam' && (
        <QuizEngine
          questions={curriculum.exam}
          title={`${t('day', lang)} ${dayNumber} ${t('exam', lang)}`}
          onComplete={(score) => {
            const termScore = Math.min(100, score + (dayProgress.termScore || 0)) / 2;
            store.updateDayScores(dayNumber, { termScore: Math.round(termScore) });
            store.completeDay(dayNumber);
            const status = getProgressionStatus(store.days[dayNumber].dailyScore);
            if (status === 'revision') {
              alert(t('revisionMode', lang));
            }
          }}
        />
      )}

      {dayProgress.dailyScore > 0 && (
        <div className="card flex items-center justify-between">
          <span className="text-text-secondary">{t('dailyScore', lang)}</span>
          <span className="text-2xl font-bold text-accent">{dayProgress.dailyScore}%</span>
        </div>
      )}
    </div>
  );
}

function CodeReadingTab({
  exercise,
  onComplete,
}: {
  exercise: CodeReadingExercise;
  onComplete: (score: number) => void;
}) {
  const lang = useProgressStore((s) => s.settings.language);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  if (!exercise) return null;

  const handleSubmit = () => {
    const s = gradeCodeReading(exercise.questions, answers);
    setScore(s);
    setSubmitted(true);
    onComplete(s);
  };

  return (
    <div className="space-y-4">
      <div className="card">
        <h2 className="text-lg font-bold">{exercise.title}</h2>
        <p className="text-text-secondary mt-1">{exercise.description}</p>
      </div>
      <CodeEditor value={exercise.code} language={exercise.language} readOnly height="350px" />
      {exercise.questions.map((q) => (
        <div key={q.id} className="card">
          <p className="font-medium text-text-primary mb-2">{q.question}</p>
          <textarea
            className="input-field min-h-[80px] font-mono text-sm"
            value={answers[q.id] ?? ''}
            onChange={(e) => setAnswers((p) => ({ ...p, [q.id]: e.target.value }))}
            disabled={submitted}
            placeholder="Read the code and answer based on what you see..."
          />
          {submitted && (
            <div className="mt-2 p-3 bg-surface rounded-md text-sm">
              <p className="text-accent font-medium">{t('modelAnswer', 'en')}: {q.modelAnswer}</p>
            </div>
          )}
        </div>
      ))}
      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={exercise.questions.some((q) => !(answers[q.id]?.trim()))}
          className="btn-primary"
        >
          Submit Code Reading Answers
        </button>
      )}
      {submitted && <p className="text-accent font-bold">{t('score', lang)}: {score}%</p>}
    </div>
  );
}

function ChallengeTab({
  challenges,
  onComplete,
}: {
  challenges: DayCurriculum['challenges'];
  onComplete: (score: number) => void;
}) {
  const [activeChallenge, setActiveChallenge] = useState(0);
  const [code, setCode] = useState(challenges[0]?.starterCode ?? '');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [running, setRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [completed, setCompleted] = useState<boolean[]>(challenges.map(() => false));

  const challenge = challenges[activeChallenge];
  if (!challenge) return null;

  const runCode = async () => {
    setRunning(true);
    setOutput('');
    setError('');
    const result = await runPython(code);
    setOutput(result.output);
    setError(result.error);
    setRunning(false);

    if (result.success) {
      const score = runPythonTests(result.output, challenge.testCases);
      if (score >= 70) {
        const newCompleted = [...completed];
        newCompleted[activeChallenge] = true;
        setCompleted(newCompleted);
        const avgScore = newCompleted.filter(Boolean).length / challenges.length * 100;
        if (newCompleted.every(Boolean)) onComplete(Math.round(avgScore));
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {challenges.map((c, i) => (
          <button
            key={c.id}
            onClick={() => { setActiveChallenge(i); setCode(c.starterCode); setShowHint(false); setHintIndex(0); }}
            className={`badge ${i === activeChallenge ? 'bg-accent text-white' : completed[i] ? 'bg-success/20 text-success' : 'bg-surface-hover text-text-secondary'}`}
          >
            {c.title}
          </button>
        ))}
      </div>
      <div className="card">
        <h3 className="font-bold">{challenge.title}</h3>
        <p className="text-text-secondary mt-1">{challenge.description}</p>
        {challenge.erpContext && (
          <p className="text-sm text-accent mt-2 flex items-start gap-1">
            <Lightbulb className="w-4 h-4 shrink-0" /> {challenge.erpContext}
          </p>
        )}
      </div>
      <CodeEditor value={code} onChange={setCode} language="python" height="300px" />
      <div className="flex gap-2">
        <button onClick={runCode} disabled={running} className="btn-primary">Run & Test</button>
        <button
          onClick={() => { setShowHint(true); setHintIndex((i) => Math.min(i + 1, challenge.hints.length)); }}
          className="btn-secondary"
        >
          Hint ({hintIndex}/{challenge.hints.length})
        </button>
      </div>
      {showHint && hintIndex > 0 && (
        <div className="card border-warning/30 text-sm text-text-secondary">
          {challenge.hints[hintIndex - 1]}
        </div>
      )}
      <OutputPanel output={output} error={error} loading={running} />
    </div>
  );
}

function DebugTab({
  challenge,
  onComplete,
}: {
  challenge: DayCurriculum['debuggingChallenge'];
  onComplete: (score: number) => void;
}) {
  const [selectedSteps, setSelectedSteps] = useState<string[]>([]);
  const [showFix, setShowFix] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!challenge) return null;

  const toggleStep = (action: string) => {
    setSelectedSteps((prev) =>
      prev.includes(action) ? prev.filter((s) => s !== action) : [...prev, action],
    );
  };

  const handleSubmit = () => {
    const optimal = challenge.investigationSteps.filter((s) => s.isOptimal).map((s) => s.action);
    let score = 0;
    for (const step of optimal) {
      if (selectedSteps.includes(step)) score += 20;
    }
    setSubmitted(true);
    onComplete(score);
  };

  return (
    <div className="space-y-4">
      <div className="card border-danger/30">
        <h3 className="font-bold flex items-center gap-2">
          <Bug className="w-5 h-5 text-danger" /> {challenge.title}
        </h3>
        <p className="text-text-secondary mt-2">{challenge.scenario}</p>
      </div>
      <CodeEditor value={challenge.brokenCode} language="python" readOnly height="300px" />
      <div className="card border-danger/30">
        <p className="font-mono text-sm text-danger">{challenge.errorMessage}</p>
        <p className="text-sm text-text-muted mt-1">Error Type: {challenge.errorType}</p>
      </div>
      <div className="card">
        <h4 className="font-semibold mb-3">Select your investigation steps (in order you would perform them):</h4>
        <div className="space-y-2">
          {challenge.investigationSteps.map((step) => (
            <button
              key={step.action}
              onClick={() => toggleStep(step.action)}
              disabled={submitted}
              className={`w-full text-left px-4 py-3 rounded-md border text-sm transition-colors ${
                selectedSteps.includes(step.action)
                  ? 'border-accent bg-accent-muted'
                  : 'border-border hover:border-accent/50'
              }`}
            >
              {step.action}
            </button>
          ))}
        </div>
        {!submitted && (
          <button onClick={handleSubmit} disabled={selectedSteps.length === 0} className="btn-primary mt-4">
            Submit Investigation
          </button>
        )}
      </div>
      {submitted && (
        <div className="space-y-3">
          {challenge.investigationSteps.map((step) => (
            <div key={step.action} className={`card text-sm ${step.isOptimal ? 'border-success/30' : ''}`}>
              <p className="font-medium">{step.action}</p>
              <p className="text-text-secondary mt-1">{step.result}</p>
            </div>
          ))}
          <button onClick={() => setShowFix(!showFix)} className="btn-secondary">Show Fix</button>
          {showFix && (
            <div className="card border-success/30">
              <CodeEditor value={challenge.fix} language="python" readOnly height="100px" />
              <p className="text-sm text-text-secondary mt-2">{challenge.explanation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
