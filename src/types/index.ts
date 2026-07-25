// ============================================================
// CORE TYPE DEFINITIONS — ERP Developer Mastery Academy
// ============================================================

export type Language = 'en' | 'ar';
export type Theme = 'dark' | 'light';

export type MasteryLevel = 'not_started' | 'needs_attention' | 'developing' | 'proficient' | 'mastered';
export type DayStatus = 'locked' | 'not_started' | 'in_progress' | 'needs_revision' | 'complete';

export interface TopicScore {
  topic: TopicKey;
  score: number;
  attempts: number;
  lastAttempt?: string;
}

export type TopicKey =
  | 'programming_fundamentals'
  | 'python'
  | 'csharp'
  | 'javascript'
  | 'react'
  | 'html_css'
  | 'xml'
  | 'sql'
  | 'odoo'
  | 'debugging'
  | 'code_reading'
  | 'erp_analysis'
  | 'ai_dev'
  | 'architecture'
  | 'git'
  | 'api'
  | 'technical_communication'
  | 'production_safety';

export interface DayProgress {
  dayNumber: number;
  status: DayStatus;
  dailyScore: number;
  quizScore: number;
  codeScore: number;
  debugScore: number;
  readingScore: number;
  termScore: number;
  startedAt?: string;
  completedAt?: string;
  sectionProgress: Record<string, boolean>;
  quizAnswers?: Record<string, string>;
  completedChallenges: string[];
  activeLearningAnswers?: Record<string, string>;
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
}

export interface ThinkingScores {
  investigationApproach: number;
  logicalThinking: number;
  codeUnderstanding: number;
  terminology: number;
  debuggingDiscipline: number;
  databaseSafety: number;
  architectureUnderstanding: number;
  erpBusinessUnderstanding: number;
}

export interface UserSettings {
  language: Language;
  theme: Theme;
  apiKey?: string;
}

export interface SkillProfile {
  overallLevel: 'beginner' | 'intermediate' | 'advanced';
  programmingConfidence: number;
  codeReadingLevel: number;
  debuggingLevel: number;
  erpTechnicalLevel: number;
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
  subtitle: string;
  topics: TopicKey[];
  estimatedHours: number;
  objectives: string[];
  sections: LessonSection[];
  codeReadingExercise: CodeReadingExercise;
  challenges: CodingChallenge[];
  debuggingChallenge: DebuggingChallenge;
  erpScenario: ERPScenario;
  quiz: QuizQuestion[];
  exam: QuizQuestion[];
  terminology: string[];
}

export interface LessonSection {
  id: string;
  title: string;
  type: 'theory' | 'code_example' | 'interactive' | 'visual' | 'comparison' | 'erp_connection';
  content: SectionContent;
  requiresAnswer?: ActiveLearningPrompt;
}

export interface SectionContent {
  simpleExplanation?: string;
  professionalDefinition?: string;
  whyItExists?: string;
  howItWorks?: string;
  syntax?: SyntaxItem[];
  codeExample?: CodeExample;
  erpExample?: string;
  odooConnection?: string;
  realProjectRecognition?: string;
  commonMistakes?: Mistake[];
  debugging?: DebugCase[];
  interviewTerminology?: string;
  markdown?: string;
}

export interface SyntaxItem {
  piece: string;
  explanation: string;
}

export interface CodeExample {
  language: string;
  code: string;
  breakdown: CodeBreakdown[];
  runnable?: boolean;
  expectedOutput?: string;
}

export interface CodeBreakdown {
  lineRange: string;
  explanation: string;
}

export interface Mistake {
  wrong: string;
  right: string;
  explanation: string;
}

export interface DebugCase {
  errorType: string;
  code: string;
  error: string;
  investigation: string;
  fix: string;
}

export interface ActiveLearningPrompt {
  question: string;
  type: 'predict' | 'explain' | 'identify' | 'write';
  hint?: string;
  modelAnswer?: string;
}

export interface CodeReadingExercise {
  id: string;
  title: string;
  description: string;
  code: string;
  language: string;
  questions: CodeReadingQuestion[];
}

export interface CodeReadingQuestion {
  id: string;
  question: string;
  type: 'identify' | 'explain' | 'predict' | 'find';
  modelAnswer: string;
  scoringCriteria: string[];
}

export interface CodingChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'foundation' | 'standard' | 'advanced';
  language: string;
  starterCode: string;
  testCases: TestCase[];
  hints: string[];
  solution: string;
  erpContext?: string;
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  description: string;
}

export interface DebuggingChallenge {
  id: string;
  title: string;
  scenario: string;
  brokenCode: string;
  language: string;
  errorMessage: string;
  errorType: string;
  investigationSteps: InvestigationStep[];
  fix: string;
  explanation: string;
}

export interface InvestigationStep {
  action: string;
  result: string;
  isOptimal: boolean;
  points: number;
}

export interface ERPScenario {
  id: string;
  title: string;
  businessContext: string;
  technicalChallenge: string;
  questions: string[];
  connection: string;
}

export interface QuizQuestion {
  id: string;
  type: 'multiple_choice' | 'explain_code' | 'find_error' | 'predict_output' | 'write_code' | 'write_query' | 'analyze_erp' | 'identify_architecture';
  question: string;
  code?: string;
  language?: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  topic: TopicKey;
  points: number;
}

export type TermMastery = 'unknown' | 'learning' | 'understood' | 'mastered';

export interface Term {
  key: string;
  term: string;
  simpleMeaning: string;
  professionalDefinition: string;
  example: string;
  erpExample: string;
  odooExample?: string;
  relatedTerms: string[];
  category: string;
}

export interface AssessmentQuestion {
  id: string;
  type: QuizQuestion['type'];
  question: string;
  code?: string;
  language?: string;
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
  subtitle: string;
  topics: TopicKey[];
  estimatedHours: number;
  week: number;
}

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

export interface ScoreBreakdown {
  quiz: number;
  code: number;
  debug: number;
  reading: number;
  terminology: number;
  total: number;
  status: 'revision' | 'reinforcement' | 'progression';
}

export const ALL_TOPICS: TopicKey[] = [
  'programming_fundamentals', 'python', 'csharp', 'javascript', 'react',
  'html_css', 'xml', 'sql', 'odoo', 'debugging', 'code_reading',
  'erp_analysis', 'ai_dev', 'architecture', 'git', 'api',
  'technical_communication', 'production_safety',
];

export const SCORE_WEIGHTS = {
  quiz: 0.30,
  code: 0.30,
  debug: 0.20,
  reading: 0.10,
  terminology: 0.10,
} as const;
