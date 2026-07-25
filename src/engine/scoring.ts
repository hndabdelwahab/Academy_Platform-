import type { DayProgress, ScoreBreakdown } from '@/types';
import { SCORE_WEIGHTS } from '@/types';

export function calculateDailyScore(day: Pick<DayProgress, 'quizScore' | 'codeScore' | 'debugScore' | 'readingScore' | 'termScore'>): number {
  return Math.round(
    day.quizScore * SCORE_WEIGHTS.quiz +
    day.codeScore * SCORE_WEIGHTS.code +
    day.debugScore * SCORE_WEIGHTS.debug +
    day.readingScore * SCORE_WEIGHTS.reading +
    day.termScore * SCORE_WEIGHTS.terminology,
  );
}

export function getProgressionStatus(totalScore: number): ScoreBreakdown['status'] {
  if (totalScore < 70) return 'revision';
  if (totalScore < 85) return 'reinforcement';
  return 'progression';
}

export function getScoreBreakdown(day: DayProgress): ScoreBreakdown {
  return {
    quiz: Math.round(day.quizScore * SCORE_WEIGHTS.quiz),
    code: Math.round(day.codeScore * SCORE_WEIGHTS.code),
    debug: Math.round(day.debugScore * SCORE_WEIGHTS.debug),
    reading: Math.round(day.readingScore * SCORE_WEIGHTS.reading),
    terminology: Math.round(day.termScore * SCORE_WEIGHTS.terminology),
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

export function gradeQuiz(questions: { id: string; correctAnswer: string; points: number }[], answers: Record<string, string>): { score: number; details: Record<string, boolean> } {
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

export function gradeCodeReading(
  questions: { id: string; modelAnswer: string; scoringCriteria: string[] }[],
  answers: Record<string, string>,
): number {
  if (questions.length === 0) return 0;
  let totalScore = 0;
  for (const q of questions) {
    const answer = (answers[q.id] ?? '').toLowerCase();
    const model = q.modelAnswer.toLowerCase();
    const keywords = model.split(/\s+/).filter((w) => w.length > 4);
    const matched = keywords.filter((kw) => answer.includes(kw)).length;
    const keywordScore = keywords.length > 0 ? (matched / keywords.length) * 60 : 0;
    const lengthScore = answer.length > 20 ? 20 : answer.length > 5 ? 10 : 0;
    const criteriaScore = q.scoringCriteria.filter((c) =>
      answer.includes(c.toLowerCase().split(' ')[0]),
    ).length / Math.max(q.scoringCriteria.length, 1) * 20;
    totalScore += Math.min(100, keywordScore + lengthScore + criteriaScore);
  }
  return Math.round(totalScore / questions.length);
}

export function gradeDebugging(stepsTaken: string[], optimalSteps: string[]): number {
  if (optimalSteps.length === 0) return 0;
  let score = 0;
  const pointsPerStep = 100 / optimalSteps.length;
  for (const step of optimalSteps) {
    if (stepsTaken.includes(step)) score += pointsPerStep;
  }
  const extraPenalty = Math.max(0, stepsTaken.length - optimalSteps.length - 2) * 5;
  return Math.max(0, Math.round(score - extraPenalty));
}

export function runPythonTests(
  output: string,
  testCases: { expectedOutput: string }[],
): number {
  if (testCases.length === 0) return 0;
  const normalizedOutput = output.trim();
  let passed = 0;
  for (const tc of testCases) {
    if (normalizedOutput.includes(tc.expectedOutput.trim())) passed++;
  }
  return Math.round((passed / testCases.length) * 100);
}
