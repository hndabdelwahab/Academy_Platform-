import { useState } from 'react';
import type { ArtifactActivity, DecisionScenario, PracticeExercise } from '@/po/types';
import { buildProfessionalFeedback, type FeedbackResult } from '@/po/engine/feedback';
import { FeedbackCard } from './TheorySection';

export function ExercisePanel({
  exercise,
  onScored,
}: {
  exercise: PracticeExercise;
  onScored: (score: number) => void;
}) {
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<FeedbackResult | null>(null);
  const [showModel, setShowModel] = useState(false);

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
        <p className="text-xs uppercase tracking-wide text-accent font-semibold">{exercise.difficulty} exercise</p>
        <h2 className="text-lg font-bold mt-1">{exercise.title}</h2>
        <p className="text-text-secondary mt-2 whitespace-pre-wrap">{exercise.instructions}</p>
        {exercise.hints && exercise.hints.length > 0 && (
          <ul className="mt-3 text-sm text-warning list-disc ps-5 space-y-1">
            {exercise.hints.map((h) => <li key={h}>{h}</li>)}
          </ul>
        )}
      </div>
      <textarea
        className="input-field min-h-[180px]"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Write a complete professional response..."
      />
      <div className="flex gap-2">
        <button className="btn-primary" onClick={submit} disabled={answer.trim().length < 30}>Submit for Feedback</button>
        <button className="btn-secondary" onClick={() => setShowModel((s) => !s)}>
          {showModel ? 'Hide Model Answer' : 'Show Model Answer'}
        </button>
      </div>
      {showModel && (
        <div className="card text-sm whitespace-pre-wrap text-text-secondary">{exercise.modelAnswer}</div>
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
  const [answer, setAnswer] = useState('');
  const [selected, setSelected] = useState('');
  const [feedback, setFeedback] = useState<FeedbackResult | null>(null);

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
        <h2 className="text-lg font-bold">{scenario.title}</h2>
        <p className="text-text-secondary whitespace-pre-wrap">{scenario.context}</p>
        {scenario.conflict && (
          <p className="text-sm border-l-4 border-warning ps-3 text-text-secondary">{scenario.conflict}</p>
        )}
        <p className="font-medium text-text-primary mt-2">{scenario.question}</p>
      </div>
      {scenario.options && (
        <div className="space-y-2">
          {scenario.options.map((opt) => (
            <button
              key={opt}
              onClick={() => setSelected(opt)}
              className={`w-full text-left px-4 py-3 rounded-md border ${
                selected === opt ? 'border-accent bg-accent-muted text-accent' : 'border-border'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
      <textarea
        className="input-field min-h-[140px]"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Justify your Product Owner decision professionally..."
      />
      <button
        className="btn-primary"
        onClick={submit}
        disabled={answer.trim().length < 30 || (!!scenario.options && !selected)}
      >
        Submit Decision
      </button>
      {feedback && <FeedbackCard feedback={feedback} />}
      {feedback && (
        <div className="card text-sm whitespace-pre-wrap text-text-secondary">
          <p className="font-medium text-text-primary mb-2">Model Answer</p>
          {scenario.modelAnswer}
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
  const [answer, setAnswer] = useState(saved || artifact.template);
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
        <h2 className="text-lg font-bold">{artifact.title}</h2>
        <p className="text-text-secondary">{artifact.description}</p>
        <p className="text-sm text-text-muted whitespace-pre-wrap">{artifact.instructions}</p>
      </div>
      <textarea
        className="input-field min-h-[320px] font-mono text-sm"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <div className="flex gap-2">
        <button className="btn-primary" onClick={submit} disabled={answer.trim().length < 80}>
          Submit Artifact
        </button>
        <button className="btn-secondary" onClick={() => setShowModel((s) => !s)}>
          {showModel ? 'Hide Model Artifact' : 'Show Model Artifact'}
        </button>
      </div>
      {showModel && (
        <div className="card text-sm whitespace-pre-wrap font-mono text-text-secondary">{artifact.modelArtifact}</div>
      )}
      {feedback && <FeedbackCard feedback={feedback} />}
    </div>
  );
}
