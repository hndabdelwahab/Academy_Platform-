import type {
  ActiveLearningPrompt,
  ArtifactActivity,
  CaseStudyUpdate,
  ComparisonTable,
  DecisionScenario,
  DifficultyLevel,
  InterviewPrep,
  LessonSection,
  Mistake,
  PracticeExercise,
  ProcessStep,
  QuizQuestion,
  SectionContent,
  TopicKey,
} from '@/po/types';

/** Build a deep teaching section covering the academy's required teaching depth. */
export function deepConcept(params: {
  id: string;
  title: string;
  titleAr?: string;
  type?: LessonSection['type'];
  content: SectionContent;
  requiresAnswer?: ActiveLearningPrompt;
}): LessonSection {
  return {
    id: params.id,
    title: params.title,
    titleAr: params.titleAr,
    type: params.type ?? 'theory',
    content: params.content,
    requiresAnswer: params.requiresAnswer,
  };
}

export function mcq(
  id: string,
  topic: TopicKey,
  question: string,
  options: string[],
  correctAnswer: string,
  explanation: string,
  points = 10,
): QuizQuestion {
  return {
    id,
    type: 'multiple_choice',
    topic,
    question,
    options,
    correctAnswer,
    explanation,
    points,
  };
}

export function scenarioQ(
  id: string,
  topic: TopicKey,
  question: string,
  options: string[],
  correctAnswer: string,
  explanation: string,
  points = 15,
): QuizQuestion {
  return {
    id,
    type: 'scenario',
    topic,
    question,
    options,
    correctAnswer,
    explanation,
    points,
  };
}

export function shortAnswer(
  id: string,
  topic: TopicKey,
  question: string,
  correctAnswer: string,
  explanation: string,
  points = 15,
): QuizQuestion {
  return {
    id,
    type: 'short_answer',
    topic,
    question,
    correctAnswer,
    explanation,
    points,
  };
}

export function exercise(params: PracticeExercise): PracticeExercise {
  return params;
}

export function artifact(params: ArtifactActivity): ArtifactActivity {
  return params;
}

export function decision(params: DecisionScenario): DecisionScenario {
  return params;
}

export function interview(params: InterviewPrep): InterviewPrep {
  return params;
}

export function caseUpdate(params: CaseStudyUpdate): CaseStudyUpdate {
  return params;
}

export function table(title: string, headers: string[], rows: string[][]): ComparisonTable {
  return { title, headers, rows };
}

export function steps(...items: { id: string; label: string; description: string }[]): ProcessStep[] {
  return items;
}

export function mistakes(...items: Mistake[]): Mistake[] {
  return items;
}

export function prompt(
  question: string,
  type: ActiveLearningPrompt['type'],
  modelAnswer: string,
  hint?: string,
  scoringKeywords?: string[],
): ActiveLearningPrompt {
  return {
    question,
    type,
    modelAnswer,
    hint,
    scoringKeywords,
    minLength: type === 'write' ? 40 : 20,
  };
}

export function difficultyForDay(day: number): DifficultyLevel {
  if (day <= 5) return 'foundation';
  if (day <= 10) return 'guided_practitioner';
  if (day <= 15) return 'independent_practitioner';
  if (day <= 19) return 'professional';
  return 'simulation';
}

export function hintLevel(day: number): 'full' | 'partial' | 'minimal' | 'none' {
  if (day <= 5) return 'full';
  if (day <= 10) return 'partial';
  if (day <= 15) return 'minimal';
  return 'none';
}
