import { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getDayCurriculum, isDayFullyBuilt, getDayCompletionRequirements } from '@/po/curriculum/days';
import { useProgressStore } from '@/po/store/useProgress';
import { TheorySection } from '@/po/components/lessons/TheorySection';
import { ExercisePanel, ScenarioPanel, ArtifactPanel } from '@/po/components/lessons/PracticePanel';
import { QuizEngine } from '@/po/components/quiz/QuizEngine';
import { t } from '@/po/i18n';
import {
  BookOpen, PenLine, Users, Scale, FileBadge, HelpCircle, FileCheck,
  ArrowLeft, CheckCircle, ListChecks, Briefcase, Lock, Newspaper,
} from 'lucide-react';

type Tab =
  | 'lesson'
  | 'guided'
  | 'independent'
  | 'stakeholder'
  | 'decision'
  | 'artifact'
  | 'case'
  | 'quiz'
  | 'exam'
  | 'interview'
  | 'summary';

export function DayPage() {
  const { dayNumber: dayParam } = useParams();
  const dayNumber = parseInt(dayParam ?? '1', 10);
  const curriculum = getDayCurriculum(dayNumber);
  const navigate = useNavigate();
  const store = useProgressStore();
  const lang = store.settings.language;
  const dayProgress = store.days[dayNumber];
  const lockReason = store.getLockReason(dayNumber);

  const [activeTab, setActiveTab] = useState<Tab>('lesson');
  const [sectionIndex, setSectionIndex] = useState(0);

  useEffect(() => {
    if (!dayProgress || dayProgress.status === 'locked') {
      navigate('/roadmap');
      return;
    }
    store.startDay(dayNumber);
  }, [dayNumber]);

  const requirements = useMemo(
    () => (curriculum ? getDayCompletionRequirements(curriculum, dayProgress) : null),
    [curriculum, dayProgress],
  );

  if (!curriculum) return <div className="card">Day not found</div>;

  if (lockReason && dayProgress?.status === 'locked') {
    return (
      <div className="max-w-3xl mx-auto card text-center py-12 space-y-3">
        <Lock className="w-10 h-10 text-warning mx-auto" />
        <h2 className="text-xl font-bold">Day {dayNumber} is locked</h2>
        <p className="text-text-secondary">{lockReason}</p>
        <Link to="/roadmap" className="btn-primary inline-block">Back to Roadmap</Link>
      </div>
    );
  }

  if (!isDayFullyBuilt(dayNumber)) {
    return (
      <div className="max-w-3xl mx-auto card text-center py-12">
        <h2 className="text-xl font-bold">Day {dayNumber}: {curriculum.title}</h2>
        <p className="text-text-secondary mt-2">This day is still being assembled. Please refresh shortly.</p>
        <Link to="/roadmap" className="btn-primary mt-4 inline-block">Back to Roadmap</Link>
      </div>
    );
  }

  const title = lang === 'ar' ? curriculum.titleAr : curriculum.title;
  const subtitle = lang === 'ar' ? curriculum.subtitleAr : curriculum.subtitle;
  const objectives = lang === 'ar' ? curriculum.objectivesAr : curriculum.objectives;

  const tabs: { id: Tab; label: string; icon: typeof BookOpen }[] = [
    { id: 'lesson', label: t('lesson', lang), icon: BookOpen },
    { id: 'guided', label: t('guidedExercise', lang), icon: PenLine },
    { id: 'independent', label: t('independentExercise', lang), icon: Briefcase },
    { id: 'stakeholder', label: t('stakeholderScenario', lang), icon: Users },
    { id: 'decision', label: t('decisionChallenge', lang), icon: Scale },
    { id: 'artifact', label: t('artifact', lang), icon: FileBadge },
    { id: 'case', label: t('caseStudy', lang), icon: Newspaper },
    { id: 'quiz', label: t('quiz', lang), icon: HelpCircle },
    { id: 'exam', label: t('exam', lang), icon: FileCheck },
    { id: 'interview', label: t('interviewPrep', lang), icon: Users },
    { id: 'summary', label: t('summary', lang), icon: ListChecks },
  ];

  const section = curriculum.sections[sectionIndex];
  const canCompleteDay = requirements?.allRequiredComplete && (dayProgress.dailyScore >= 70 || dayProgress.bestScore >= 70);

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <div className="flex items-center gap-3">
        <Link to="/roadmap" className="btn-ghost"><ArrowLeft className="w-4 h-4" /></Link>
        <div>
          <p className="text-xs text-accent font-medium">{t('day', lang)} {dayNumber} · {curriculum.difficulty.replace(/_/g, ' ')} · {curriculum.estimatedHours}h</p>
          <h1 className="text-xl font-bold text-text-primary">{title}</h1>
          <p className="text-sm text-text-muted">{subtitle}</p>
        </div>
      </div>

      <div className="card">
        <h3 className="text-sm font-semibold text-text-primary mb-2">{t('objectives', lang)}</h3>
        <ul className="space-y-1">
          {objectives.map((obj) => (
            <li key={obj} className="text-sm text-text-secondary flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              {obj}
            </li>
          ))}
        </ul>
      </div>

      {requirements && (
        <div className="card text-sm space-y-1">
          <p className="font-semibold">{t('completionRequirements', lang)}</p>
          {requirements.items.map((item) => (
            <p key={item.id} className={item.done ? 'text-success' : 'text-warning'}>
              {item.done ? '✓' : '○'} {item.label}
            </p>
          ))}
          <p className="text-text-muted pt-1">
            {t('bestScore', lang)}: {dayProgress.bestScore}% · {t('dailyScore', lang)}: {dayProgress.dailyScore}%
          </p>
        </div>
      )}

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
            {dayProgress.sectionProgress[section.id] && <CheckCircle className="w-4 h-4 text-success" />}
          </div>
          <TheorySection
            title={lang === 'ar' && section.titleAr ? section.titleAr : section.title}
            content={section.content}
            requiresAnswer={section.requiresAnswer}
            sectionId={section.id}
            savedAnswer={dayProgress.activeLearningAnswers?.[section.id]}
            onSaveAnswer={(answer) => store.saveActiveLearningAnswer(dayNumber, section.id, answer)}
            onComplete={() => {
              store.completeSection(dayNumber, section.id);
              if (sectionIndex < curriculum.sections.length - 1) setSectionIndex(sectionIndex + 1);
            }}
          />
          <div className="flex justify-between mt-4">
            <button onClick={() => setSectionIndex(Math.max(0, sectionIndex - 1))} disabled={sectionIndex === 0} className="btn-secondary">Previous Section</button>
            <button onClick={() => setSectionIndex(Math.min(curriculum.sections.length - 1, sectionIndex + 1))} disabled={sectionIndex === curriculum.sections.length - 1} className="btn-secondary">Next Section</button>
          </div>
        </div>
      )}

      {activeTab === 'guided' && (
        <ExercisePanel
          exercise={curriculum.guidedExercise}
          onScored={(score) => {
            store.updateDayScores(dayNumber, { exerciseScore: Math.max(dayProgress.exerciseScore, score) });
            store.recordAttempt(dayNumber, 'exercise', score);
            store.markActivityComplete(dayNumber, curriculum.guidedExercise.id);
            store.updateThinkingScore('communicationClarity', score > 70 ? 4 : 1);
          }}
        />
      )}

      {activeTab === 'independent' && (
        <ExercisePanel
          exercise={curriculum.independentExercise}
          onScored={(score) => {
            const blended = Math.round((Math.max(dayProgress.exerciseScore, score) + score) / 2);
            store.updateDayScores(dayNumber, { exerciseScore: Math.max(dayProgress.exerciseScore, blended) });
            store.recordAttempt(dayNumber, 'exercise', score);
            store.markActivityComplete(dayNumber, curriculum.independentExercise.id);
            store.updateThinkingScore('decisionOwnership', score > 70 ? 4 : 1);
          }}
        />
      )}

      {activeTab === 'stakeholder' && (
        <ScenarioPanel
          scenario={curriculum.stakeholderScenario}
          onScored={(score) => {
            store.updateDayScores(dayNumber, { scenarioScore: Math.max(dayProgress.scenarioScore, score) });
            store.recordAttempt(dayNumber, 'scenario', score);
            store.markActivityComplete(dayNumber, curriculum.stakeholderScenario.id);
            store.updateThinkingScore('stakeholderEmpathy', score > 70 ? 5 : 2);
          }}
        />
      )}

      {activeTab === 'decision' && (
        <ScenarioPanel
          scenario={curriculum.productDecisionChallenge}
          onScored={(score) => {
            store.updateDayScores(dayNumber, { scenarioScore: Math.max(dayProgress.scenarioScore, score) });
            store.recordAttempt(dayNumber, 'scenario', score);
            store.markActivityComplete(dayNumber, curriculum.productDecisionChallenge.id);
            store.updateThinkingScore('prioritizationJudgment', score > 70 ? 5 : 2);
          }}
        />
      )}

      {activeTab === 'artifact' && (
        <ArtifactPanel
          artifact={curriculum.artifactActivity}
          saved={dayProgress.artifactSubmission}
          onScored={(submission, score) => {
            store.saveArtifact(dayNumber, submission, score);
            store.markActivityComplete(dayNumber, curriculum.artifactActivity.id);
            store.updateThinkingScore('professionalPractice', score > 70 ? 5 : 2);
            store.updateTopicScore(curriculum.topics[0], score);
          }}
        />
      )}

      {activeTab === 'case' && (
        <div className="space-y-4">
          <div className="card space-y-2">
            <h2 className="text-lg font-bold">{t('caseStudy', lang)}</h2>
            <p className="text-accent text-sm font-medium">{curriculum.caseStudyUpdate.dayFocus}</p>
            <p className="text-text-secondary whitespace-pre-wrap">{curriculum.caseStudyUpdate.narrative}</p>
            <p className="text-sm border-l-4 border-accent ps-3">{curriculum.caseStudyUpdate.newInformation}</p>
            <p className="font-medium">{curriculum.caseStudyUpdate.requiredAction}</p>
          </div>
          <CaseStudyResponse
            dayNumber={dayNumber}
            model={curriculum.caseStudyUpdate.modelResponse}
            onDone={(score) => {
              store.markActivityComplete(dayNumber, `case-${dayNumber}`);
              store.updateThinkingScore('problemAnalysis', score > 70 ? 4 : 1);
            }}
          />
        </div>
      )}

      {activeTab === 'quiz' && (
        <QuizEngine
          questions={curriculum.quiz}
          title={`${t('day', lang)} ${dayNumber} ${t('quiz', lang)}`}
          allowRetry
          onComplete={(score) => {
            store.updateDayScores(dayNumber, { quizScore: Math.max(dayProgress.quizScore, score) });
            store.recordAttempt(dayNumber, 'quiz', score);
            store.markActivityComplete(dayNumber, `quiz-${dayNumber}`);
            store.updateTopicScore(curriculum.topics[0], score);
          }}
        />
      )}

      {activeTab === 'exam' && (
        <QuizEngine
          questions={curriculum.exam}
          title={`${t('day', lang)} ${dayNumber} ${t('exam', lang)}`}
          allowRetry
          onComplete={(score) => {
            store.updateDayScores(dayNumber, { examScore: Math.max(dayProgress.examScore, score) });
            store.recordAttempt(dayNumber, 'exam', score);
            store.markActivityComplete(dayNumber, `exam-${dayNumber}`);
            if (score < 70) {
              alert(t('revisionMode', lang));
            }
          }}
        />
      )}

      {activeTab === 'interview' && (
        <div className="card space-y-3">
          <h2 className="text-lg font-bold">{t('interviewPrep', lang)}</h2>
          <p className="font-medium">{curriculum.interviewPrep.question}</p>
          <details className="text-sm">
            <summary className="cursor-pointer text-accent">Show model answer</summary>
            <p className="mt-2 text-text-secondary whitespace-pre-wrap">{curriculum.interviewPrep.modelAnswer}</p>
          </details>
          <div>
            <p className="text-sm font-medium mb-1">Follow-ups</p>
            <ul className="list-disc ps-5 text-sm text-text-secondary space-y-1">
              {curriculum.interviewPrep.followUps.map((f) => <li key={f}>{f}</li>)}
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'summary' && (
        <div className="space-y-4">
          <div className="card">
            <h3 className="font-semibold mb-2">{t('summary', lang)}</h3>
            <ul className="list-disc ps-5 text-sm text-text-secondary space-y-1">
              {curriculum.lessonSummary.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="card">
              <h3 className="font-semibold mb-2 text-success">Product Owner Responsibility</h3>
              <ul className="list-disc ps-5 text-sm space-y-1">{curriculum.productOwnerResponsibility.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
            <div className="card">
              <h3 className="font-semibold mb-2 text-danger">Not the Product Owner's Responsibility</h3>
              <ul className="list-disc ps-5 text-sm space-y-1">{curriculum.notProductOwnerResponsibility.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          </div>
          <div className="card">
            <h3 className="font-semibold mb-2">{t('revisionChecklist', lang)}</h3>
            <ul className="space-y-1 text-sm">
              {curriculum.revisionChecklist.map((item) => <li key={item}>☐ {item}</li>)}
            </ul>
          </div>
          <ExercisePanel
            exercise={curriculum.additionalPractice}
            onScored={() => store.markActivityComplete(dayNumber, curriculum.additionalPractice.id)}
          />
          <button
            className="btn-primary"
            disabled={!canCompleteDay}
            onClick={() => {
              store.completeDay(dayNumber);
              navigate('/roadmap');
            }}
          >
            {canCompleteDay ? t('completeDay', lang) : t('completeRequirementsFirst', lang)}
          </button>
        </div>
      )}
    </div>
  );
}

function CaseStudyResponse({
  dayNumber,
  model,
  onDone,
}: {
  dayNumber: number;
  model: string;
  onDone: (score: number) => void;
}) {
  const store = useProgressStore();
  const [answer, setAnswer] = useState(store.caseStudyNotes[`day-${dayNumber}`] ?? '');
  const [done, setDone] = useState(false);

  return (
    <div className="space-y-3">
      <textarea className="input-field min-h-[160px]" value={answer} onChange={(e) => setAnswer(e.target.value)} />
      <button
        className="btn-primary"
        disabled={answer.trim().length < 40}
        onClick={() => {
          store.saveCaseStudyNote(`day-${dayNumber}`, answer);
          const score = answer.length > 200 ? 85 : 70;
          setDone(true);
          onDone(score);
        }}
      >
        Save Case Study Response
      </button>
      {done && (
        <div className="card text-sm whitespace-pre-wrap text-text-secondary">
          <p className="font-medium text-text-primary mb-2">Model Response</p>
          {model}
        </div>
      )}
    </div>
  );
}
