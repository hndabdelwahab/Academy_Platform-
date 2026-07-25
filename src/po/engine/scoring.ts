import type { DayProgress, ScoreBreakdown } from '@/po/types';
import { SCORE_WEIGHTS, PASS_THRESHOLD } from '@/po/types';

export function calculateDailyScore(day: Pick<
  DayProgress,
  'quizScore' | 'exerciseScore' | 'artifactScore' | 'scenarioScore' | 'examScore'
>): number {
  return Math.round(
    day.quizScore * SCORE_WEIGHTS.quiz +
    day.exerciseScore * SCORE_WEIGHTS.exercise +
    day.artifactScore * SCORE_WEIGHTS.artifact +
    day.scenarioScore * SCORE_WEIGHTS.scenario +
    day.examScore * SCORE_WEIGHTS.exam,
  );
}

export function getProgressionStatus(totalScore: number): ScoreBreakdown['status'] {
  if (totalScore < PASS_THRESHOLD) return 'revision';
  if (totalScore < 85) return 'reinforcement';
  return 'progression';
}

export function getScoreBreakdown(day: DayProgress): ScoreBreakdown {
  return {
    quiz: Math.round(day.quizScore * SCORE_WEIGHTS.quiz),
    exercise: Math.round(day.exerciseScore * SCORE_WEIGHTS.exercise),
    artifact: Math.round(day.artifactScore * SCORE_WEIGHTS.artifact),
    scenario: Math.round(day.scenarioScore * SCORE_WEIGHTS.scenario),
    exam: Math.round(day.examScore * SCORE_WEIGHTS.exam),
    total: day.dailyScore,
    status: getProgressionStatus(day.dailyScore),
  };
}

export function getMasteryLevel(score: number): 'needs_attention' | 'developing' | 'proficient' | 'mastered' {
  if (score >= 90) return 'mastered';
  if (score >= 75) return 'proficient';
  if (score >= 60) return 'developing';
  return 'needs_attention';
}

export function getMasteryColor(level: ReturnType<typeof getMasteryLevel>): string {
  switch (level) {
    case 'mastered': return 'text-success';
    case 'proficient': return 'text-info';
    case 'developing': return 'text-warning';
    default: return 'text-danger';
  }
}

export function gradeQuizAnswer(correct: string, userAnswer: string): boolean {
  const normalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, ' ');
  return normalize(correct) === normalize(userAnswer);
}

export function gradeQuiz(
  questions: { id: string; correctAnswer: string; points: number }[],
  answers: Record<string, string>,
): { score: number; details: Record<string, boolean> } {
  let earned = 0;
  let total = 0;
  const details: Record<string, boolean> = {};
  for (const q of questions) {
    total += q.points;
    const correct = gradeQuizAnswer(q.correctAnswer, answers[q.id] ?? '');
    details[q.id] = correct;
    if (correct) earned += q.points;
  }
  return { score: total > 0 ? Math.round((earned / total) * 100) : 0, details };
}

/** Keyword/criteria grader for open Product Owner answers and artifacts. */
export function gradeOpenAnswer(
  answer: string,
  modelAnswer: string,
  scoringCriteria: string[],
  minLength = 40,
): number {
  const text = answer.trim();
  if (text.length < Math.min(minLength, 10)) return 0;

  const lower = text.toLowerCase();
  const model = modelAnswer.toLowerCase();
  const modelWords = model.split(/\s+/).filter((w) => w.length > 4);
  const uniqueModel = [...new Set(modelWords)];
  const matchedModel = uniqueModel.filter((w) => lower.includes(w)).length;
  const keywordScore = uniqueModel.length > 0 ? (matchedModel / uniqueModel.length) * 45 : 0;

  const criteriaHits = scoringCriteria.filter((c) => {
    const tokens = c.toLowerCase().split(/\s+/).filter((w) => w.length > 3);
    return tokens.some((t) => lower.includes(t));
  }).length;
  const criteriaScore = scoringCriteria.length > 0
    ? (criteriaHits / scoringCriteria.length) * 40
    : 0;

  const lengthScore = text.length >= 200 ? 15 : text.length >= 100 ? 10 : text.length >= minLength ? 5 : 0;
  return Math.min(100, Math.round(keywordScore + criteriaScore + lengthScore));
}

export function gradeArtifact(
  submission: string,
  modelArtifact: string,
  scoringCriteria: string[],
  requiredFields: string[],
): { score: number; missingFields: string[]; criteriaHit: string[]; criteriaMissed: string[] } {
  const lower = submission.toLowerCase();
  const missingFields = requiredFields.filter((f) => !lower.includes(f.toLowerCase()));
  const criteriaHit = scoringCriteria.filter((c) => {
    const tokens = c.toLowerCase().split(/\s+/).filter((w) => w.length > 3);
    return tokens.some((t) => lower.includes(t));
  });
  const criteriaMissed = scoringCriteria.filter((c) => !criteriaHit.includes(c));
  const base = gradeOpenAnswer(submission, modelArtifact, scoringCriteria, 80);
  const fieldPenalty = requiredFields.length > 0
    ? Math.round((missingFields.length / requiredFields.length) * 30)
    : 0;
  return {
    score: Math.max(0, base - fieldPenalty),
    missingFields,
    criteriaHit,
    criteriaMissed,
  };
}
