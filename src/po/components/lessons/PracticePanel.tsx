import { useState } from 'react';
import type { ArtifactActivity, DecisionScenario, PracticeExercise } from '@/po/types';
import { buildProfessionalFeedback, type FeedbackResult } from '@/po/engine/feedback';
import { useProgressStore } from '@/po/store/useProgress';
import { pickLang } from '@/po/curriculum/localize';
import { t } from '@/po/i18n';
import { FeedbackCard } from './TheorySection';

export function ExercisePanel({
  exercise,
  onScored,
}: {
  exercise: PracticeExercise;
  onScored: (score: number) => void;
}) {
  const lang = useProgressStore((s) => s.settings.language);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<FeedbackResult | null>(null);
  const [showModel, setShowModel] = useState(false);

  const title = pickLang(lang, exercise.title, exercise.titleAr);
  const instructions = pickLang(lang, exercise.instructions, exercise.instructionsAr);
  const hints = pickLang(lang, exercise.hints, exercise.hintsAr);
  const modelAnswer = pickLang(lang, exercise.modelAnswer, exercise.modelAnswerAr);

  const submit = () => {
    const fb = buildProfessionalFeedback({
      answer,
      modelAnswer: exercise.modelAnswer,
      scoringCriteria: exercise.scoringCriteria,
      activityType: 'exercise',
    });
    setFeedback(fb);
    onScored(fb.score);
  };

  return (
    <div className="space-y-4">
      <div className="card">
        <p className="text-xs uppercase tracking-wide text-accent font-semibold">
          {lang === 'ar' ? `تمرين ${exercise.difficulty}` : `${exercise.difficulty} exercise`}
        </p>
        <h2 className="text-lg font-bold mt-1">{title}</h2>
        <p className="text-text-secondary mt-2 whitespace-pre-wrap">{instructions}</p>
        {hints && hints.length > 0 && (
          <ul className="mt-3 text-sm text-warning list-disc ps-5 space-y-1">
            {hints.map((h) => <li key={h}>{h}</li>)}
          </ul>
        )}
      </div>
      <textarea
        className="input-field min-h-[180px]"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder={lang === 'ar' ? 'اكتب ردًا مهنيًا كاملاً...' : 'Write a complete professional response...'}
      />
      <div className="flex gap-2">
        <button className="btn-primary" onClick={submit} disabled={answer.trim().length < 30}>
          {lang === 'ar' ? 'إرسال للملاحظات' : 'Submit for Feedback'}
        </button>
        <button className="btn-secondary" onClick={() => setShowModel((s) => !s)}>
          {showModel
            ? (lang === 'ar' ? 'إخفاء الإجابة النموذجية' : 'Hide Model Answer')
            : (lang === 'ar' ? 'عرض الإجابة النموذجية' : 'Show Model Answer')}
        </button>
      </div>
      {showModel && (
        <div className="card text-sm whitespace-pre-wrap text-text-secondary">{modelAnswer}</div>
      )}
      {feedback && <FeedbackCard feedback={feedback} />}
    </div>
  );
}

export function ScenarioPanel({
  scenario,
  onScored,
}: {
  scenario: DecisionScenario;
  onScored: (score: number) => void;
}) {
  const lang = useProgressStore((s) => s.settings.language);
  const [answer, setAnswer] = useState('');
  const [selected, setSelected] = useState('');
  const [feedback, setFeedback] = useState<FeedbackResult | null>(null);

  const title = pickLang(lang, scenario.title, scenario.titleAr);
  const context = pickLang(lang, scenario.context, scenario.contextAr);
  const conflict = pickLang(lang, scenario.conflict, scenario.conflictAr);
  const question = pickLang(lang, scenario.question, scenario.questionAr);
  const options = pickLang(lang, scenario.options, scenario.optionsAr);
  const modelAnswer = pickLang(lang, scenario.modelAnswer, scenario.modelAnswerAr);

  const submit = () => {
    const combined = scenario.options
      ? `Selected: ${selected}\n\nJustification:\n${answer}`
      : answer;
    const fb = buildProfessionalFeedback({
      answer: combined,
      modelAnswer: scenario.modelAnswer,
      scoringCriteria: scenario.feedbackRubric,
      activityType: 'scenario',
    });
    setFeedback(fb);
    onScored(fb.score);
  };

  return (
    <div className="space-y-4">
      <div className="card space-y-2">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-text-secondary whitespace-pre-wrap">{context}</p>
        {conflict && (
          <p className="text-sm border-l-4 border-warning ps-3 text-text-secondary">{conflict}</p>
        )}
        <p className="font-medium text-text-primary mt-2">{question}</p>
      </div>
      {scenario.options && options && (
        <div className="space-y-2">
          {scenario.options.map((opt, i) => {
            const label = options[i] ?? opt;
            return (
              <button
                key={opt}
                onClick={() => setSelected(opt)}
                className={`w-full text-start px-4 py-3 rounded-md border ${
                  selected === opt ? 'border-accent bg-accent-muted text-accent' : 'border-border'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}
      <textarea
        className="input-field min-h-[140px]"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder={lang === 'ar'
          ? 'برّر قرار مالك المنتج بشكل مهني...'
          : 'Justify your Product Owner decision professionally...'}
      />
      <button
        className="btn-primary"
        onClick={submit}
        disabled={answer.trim().length < 30 || (!!scenario.options && !selected)}
      >
        {lang === 'ar' ? 'إرسال القرار' : 'Submit Decision'}
      </button>
      {feedback && <FeedbackCard feedback={feedback} />}
      {feedback && (
        <div className="card text-sm whitespace-pre-wrap text-text-secondary">
          <p className="font-medium text-text-primary mb-2">{t('modelAnswer', lang)}</p>
          {modelAnswer}
        </div>
      )}
    </div>
  );
}

export function ArtifactPanel({
  artifact,
  saved,
  onScored,
}: {
  artifact: ArtifactActivity;
  saved?: string;
  onScored: (submission: string, score: number) => void;
}) {
  const lang = useProgressStore((s) => s.settings.language);
  const title = pickLang(lang, artifact.title, artifact.titleAr);
  const description = pickLang(lang, artifact.description, artifact.descriptionAr);
  const instructions = pickLang(lang, artifact.instructions, artifact.instructionsAr);
  const template = pickLang(lang, artifact.template, artifact.templateAr);
  const modelArtifact = pickLang(lang, artifact.modelArtifact, artifact.modelArtifactAr);

  const [answer, setAnswer] = useState(saved || template);
  const [feedback, setFeedback] = useState<FeedbackResult | null>(null);
  const [showModel, setShowModel] = useState(false);

  const submit = () => {
    const fb = buildProfessionalFeedback({
      answer,
      modelAnswer: artifact.modelArtifact,
      scoringCriteria: artifact.scoringCriteria,
      requiredFields: artifact.requiredFields,
      activityType: 'artifact',
    });
    setFeedback(fb);
    onScored(answer, fb.score);
  };

  return (
    <div className="space-y-4">
      <div className="card space-y-2">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-text-secondary">{description}</p>
        <p className="text-sm text-text-muted whitespace-pre-wrap">{instructions}</p>
      </div>
      <textarea
        className="input-field min-h-[320px] font-mono text-sm"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <div className="flex gap-2">
        <button className="btn-primary" onClick={submit} disabled={answer.trim().length < 80}>
          {lang === 'ar' ? 'إرسال المخرج' : 'Submit Artifact'}
        </button>
        <button className="btn-secondary" onClick={() => setShowModel((s) => !s)}>
          {showModel
            ? (lang === 'ar' ? 'إخفاء المخرج النموذجي' : 'Hide Model Artifact')
            : (lang === 'ar' ? 'عرض المخرج النموذجي' : 'Show Model Artifact')}
        </button>
      </div>
      {showModel && (
        <div className="card text-sm whitespace-pre-wrap font-mono text-text-secondary">{modelArtifact}</div>
      )}
      {feedback && <FeedbackCard feedback={feedback} />}
    </div>
  );
}
