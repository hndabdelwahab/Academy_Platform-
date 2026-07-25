// ============================================================
// CORE TYPE DEFINITIONS — Product Owner Mastery Academy
// ============================================================

export type Language = 'en' | 'ar';
export type Theme = 'dark' | 'light';

export type MasteryLevel = 'not_started' | 'needs_attention' | 'developing' | 'proficient' | 'mastered';
export type DayStatus = 'locked' | 'not_started' | 'in_progress' | 'needs_revision' | 'complete';
export type DifficultyLevel = 'foundation' | 'guided_practitioner' | 'independent_practitioner' | 'professional' | 'simulation';

export interface TopicScore {
  topic: TopicKey;
  score: number;
  attempts: number;
  lastAttempt?: string;
}

export type TopicKey =
  | 'product_ownership'
  | 'agile_mindset'
  | 'scrum_framework'
  | 'roles_collaboration'
  | 'vision_strategy'
  | 'stakeholders'
  | 'product_discovery'
  | 'requirements'
  | 'user_stories'
  | 'acceptance_criteria'
  | 'backlog_management'
  | 'prioritization'
  | 'estimation_forecasting'
  | 'refinement'
  | 'sprint_planning'
  | 'sprint_execution'
  | 'quality_acceptance'
  | 'review_retrospective'
  | 'roadmaps_metrics'
  | 'professional_practice';

export interface DayProgress {
  dayNumber: number;
  status: DayStatus;
  dailyScore: number;
  quizScore: number;
  exerciseScore: number;
  artifactScore: number;
  scenarioScore: number;
  examScore: number;
  startedAt?: string;
  completedAt?: string;
  sectionProgress: Record<string, boolean>;
  quizAnswers?: Record<string, string>;
  examAnswers?: Record<string, string>;
  completedActivities: string[];
  activeLearningAnswers?: Record<string, string>;
  artifactSubmission?: string;
  attemptHistory: AttemptRecord[];
  bestScore: number;
}

export interface AttemptRecord {
  at: string;
  activity: 'quiz' | 'exam' | 'artifact' | 'exercise' | 'scenario';
  score: number;
}

export interface UserProgress {
  userId: string;
  assessmentCompleted: boolean;
  assessmentScore: number;
  skillProfile?: SkillProfile;
  currentDay: number;
  xp: number;
  level: number;
  days: Record<number, DayProgress>;
  topicScores: Record<TopicKey, TopicScore>;
  terminologyMastery: Record<string, TermMastery>;
  achievements: string[];
  thinkingScores: ThinkingScores;
  settings: UserSettings;
  caseStudyNotes: Record<string, string>;
}

export interface ThinkingScores {
  valueFocus: number;
  stakeholderEmpathy: number;
  problemAnalysis: number;
  prioritizationJudgment: number;
  communicationClarity: number;
  decisionOwnership: number;
  outcomeThinking: number;
  professionalPractice: number;
}

export interface UserSettings {
  language: Language;
  theme: Theme;
  apiKey?: string;
}

export interface SkillProfile {
  overallLevel: 'beginner' | 'intermediate' | 'advanced';
  productOwnershipConfidence: number;
  agileScrumLevel: number;
  backlogCraftLevel: number;
  stakeholderLevel: number;
  strongAreas: TopicKey[];
  weakAreas: TopicKey[];
  criticalGaps: string[];
  topicLevels: Record<TopicKey, number>;
  personalizedPath: PersonalizedDay[];
}

export interface PersonalizedDay {
  dayNumber: number;
  emphasis: string;
  additionalFocus?: string;
}

export interface DayCurriculum {
  dayNumber: number;
  title: string;
  titleAr: string;
  subtitle: string;
  subtitleAr: string;
  difficulty: DifficultyLevel;
  estimatedHours: number;
  prerequisites: string[];
  topics: TopicKey[];
  objectives: string[];
  objectivesAr: string[];
  keyTerminology: string[];
  sections: LessonSection[];
  productOwnerResponsibility: string[];
  notProductOwnerResponsibility: string[];
  guidedExercise: PracticeExercise;
  independentExercise: PracticeExercise;
  stakeholderScenario: DecisionScenario;
  productDecisionChallenge: DecisionScenario;
  artifactActivity: ArtifactActivity;
  caseStudyUpdate: CaseStudyUpdate;
  quiz: QuizQuestion[];
  exam: QuizQuestion[];
  interviewPrep: InterviewPrep;
  lessonSummary: string[];
  revisionChecklist: string[];
  additionalPractice: PracticeExercise;
  professionalFeedbackNotes: string[];
}

export interface LessonSection {
  id: string;
  title: string;
  titleAr?: string;
  type: 'theory' | 'comparison' | 'process' | 'worked_example' | 'responsibility' | 'terminology' | 'practice';
  content: SectionContent;
  requiresAnswer?: ActiveLearningPrompt;
}

export interface SectionContent {
  conceptIntroduction?: string;
  simpleExplanation?: string;
  businessProblem?: string;
  professionalDefinition?: string;
  whyImportant?: string;
  lifecycleLocation?: string;
  howItWorks?: string;
  whoResponsible?: string;
  whoParticipates?: string;
  requiredInputs?: string;
  activities?: string;
  expectedOutputs?: string;
  simpleExample?: string;
  softwareExample?: string;
  erpExample?: string;
  workedExample?: string;
  comparison?: string;
  commonMisunderstandings?: string;
  beginnerMistakes?: Mistake[];
  workplaceMistakes?: Mistake[];
  poorExample?: string;
  correctExample?: string;
  guidedPractice?: string;
  independentPractice?: string;
  scenarioDecision?: string;
  reflectionQuestion?: string;
  professionalTerminology?: string;
  interviewQuestion?: string;
  interviewModelAnswer?: string;
  markdown?: string;
  comparisonTable?: ComparisonTable;
  processSteps?: ProcessStep[];
}

export interface ComparisonTable {
  title: string;
  headers: string[];
  rows: string[][];
}

export interface ProcessStep {
  id: string;
  label: string;
  description: string;
}

export interface Mistake {
  wrong: string;
  right: string;
  explanation: string;
}

export interface ActiveLearningPrompt {
  question: string;
  type: 'predict' | 'explain' | 'identify' | 'write' | 'decide' | 'compare';
  hint?: string;
  modelAnswer?: string;
  scoringKeywords?: string[];
  minLength?: number;
}

export interface PracticeExercise {
  id: string;
  title: string;
  instructions: string;
  hints?: string[];
  modelAnswer: string;
  scoringCriteria: string[];
  difficulty: 'guided' | 'independent' | 'professional';
}

export interface DecisionScenario {
  id: string;
  title: string;
  context: string;
  conflict?: string;
  question: string;
  options?: string[];
  modelAnswer: string;
  feedbackRubric: string[];
}

export interface ArtifactActivity {
  id: string;
  title: string;
  description: string;
  template: string;
  instructions: string;
  modelArtifact: string;
  scoringCriteria: string[];
  requiredFields: string[];
}

export interface CaseStudyUpdate {
  dayFocus: string;
  narrative: string;
  newInformation: string;
  requiredAction: string;
  modelResponse: string;
}

export interface QuizQuestion {
  id: string;
  type: 'multiple_choice' | 'scenario' | 'short_answer' | 'identify' | 'prioritize' | 'compare';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  topic: TopicKey;
  points: number;
  feedback?: ProfessionalFeedbackTemplate;
}

export interface ProfessionalFeedbackTemplate {
  whatCorrectLooksLike: string;
  commonIncorrect: string;
  whyItMatters: string;
  betterVersion: string;
  nextPracticeStep: string;
}

export interface InterviewPrep {
  question: string;
  modelAnswer: string;
  followUps: string[];
  scoringCriteria: string[];
}

export type TermMastery = 'unknown' | 'learning' | 'understood' | 'mastered';

export interface Term {
  key: string;
  term: string;
  termAr: string;
  simpleMeaning: string;
  simpleMeaningAr: string;
  professionalDefinition: string;
  purpose: string;
  lifecycleLocation: string;
  responsibleRole: string;
  participants: string;
  inputs: string;
  outputs: string;
  example: string;
  softwareExample: string;
  erpExample: string;
  relatedTerms: string[];
  confusedWith?: string;
  incorrectUsage: string;
  correctUsage: string;
  category: string;
}

export interface AssessmentQuestion {
  id: string;
  type: QuizQuestion['type'];
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  topic: TopicKey;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

export interface AssessmentResult {
  totalScore: number;
  topicScores: Record<TopicKey, number>;
  skillProfile: SkillProfile;
  answers: Record<string, string>;
}

export interface DaySummary {
  dayNumber: number;
  title: string;
  titleAr: string;
  subtitle: string;
  subtitleAr: string;
  topics: TopicKey[];
  estimatedHours: number;
  week: number;
  difficulty: DifficultyLevel;
  artifactName: string;
}

export interface ScoreBreakdown {
  quiz: number;
  exercise: number;
  artifact: number;
  scenario: number;
  exam: number;
  total: number;
  status: 'revision' | 'reinforcement' | 'progression';
}

export const ALL_TOPICS: TopicKey[] = [
  'product_ownership',
  'agile_mindset',
  'scrum_framework',
  'roles_collaboration',
  'vision_strategy',
  'stakeholders',
  'product_discovery',
  'requirements',
  'user_stories',
  'acceptance_criteria',
  'backlog_management',
  'prioritization',
  'estimation_forecasting',
  'refinement',
  'sprint_planning',
  'sprint_execution',
  'quality_acceptance',
  'review_retrospective',
  'roadmaps_metrics',
  'professional_practice',
];

export const SCORE_WEIGHTS = {
  quiz: 0.20,
  exercise: 0.20,
  artifact: 0.25,
  scenario: 0.15,
  exam: 0.20,
} as const;

export const PASS_THRESHOLD = 70;

export interface VisualFlowStep {
  id: string;
  label: string;
  description: string;
  detail?: string;
}

export interface VisualFlow {
  id: string;
  title: string;
  description: string;
  steps: VisualFlowStep[];
}

export interface LanguageComparison {
  concept: string;
  python: { code: string; notes: string };
  csharp: { code: string; notes: string };
  javascript: { code: string; notes: string };
  sameConcept: string;
  syntaxDifference: string;
  runtimeDifference: string;
  typeSystemDifference: string;
  typicalUseCase: string;
  erpUseCase: string;
}
