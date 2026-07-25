import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  UserProgress, DayProgress, TopicKey, TopicScore, TermMastery,
  SkillProfile, UserSettings, ThinkingScores, DayStatus, AttemptRecord,
} from '@/po/types';
import { ALL_TOPICS, PASS_THRESHOLD } from '@/po/types';
import { calculateDailyScore, getProgressionStatus } from '@/po/engine/scoring';
import type { AssessmentResult } from '@/po/types';

function createUserId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `user-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function createInitialTopicScores(): Record<TopicKey, TopicScore> {
  const scores = {} as Record<TopicKey, TopicScore>;
  for (const topic of ALL_TOPICS) {
    scores[topic] = { topic, score: 0, attempts: 0 };
  }
  return scores;
}

function createInitialDays(): Record<number, DayProgress> {
  const days: Record<number, DayProgress> = {};
  for (let i = 1; i <= 20; i++) {
    days[i] = {
      dayNumber: i,
      status: i === 1 ? 'not_started' : 'locked',
      dailyScore: 0,
      quizScore: 0,
      exerciseScore: 0,
      artifactScore: 0,
      scenarioScore: 0,
      examScore: 0,
      sectionProgress: {},
      completedActivities: [],
      activeLearningAnswers: {},
      attemptHistory: [],
      bestScore: 0,
    };
  }
  return days;
}

const initialThinkingScores: ThinkingScores = {
  valueFocus: 0,
  stakeholderEmpathy: 0,
  problemAnalysis: 0,
  prioritizationJudgment: 0,
  communicationClarity: 0,
  decisionOwnership: 0,
  outcomeThinking: 0,
  professionalPractice: 0,
};

const defaultSettings: UserSettings = {
  language: 'en',
  theme: 'dark',
};

interface ProgressStore extends UserProgress {
  setLanguage: (lang: 'en' | 'ar') => void;
  setTheme: (theme: 'dark' | 'light') => void;
  setApiKey: (key: string) => void;
  completeAssessment: (result: AssessmentResult) => void;
  startDay: (dayNumber: number) => void;
  completeSection: (dayNumber: number, sectionId: string) => void;
  saveActiveLearningAnswer: (dayNumber: number, sectionId: string, answer: string) => void;
  updateDayScores: (dayNumber: number, scores: Partial<Pick<DayProgress, 'quizScore' | 'exerciseScore' | 'artifactScore' | 'scenarioScore' | 'examScore'>>) => void;
  recordAttempt: (dayNumber: number, activity: AttemptRecord['activity'], score: number) => void;
  saveArtifact: (dayNumber: number, submission: string, score: number) => void;
  markActivityComplete: (dayNumber: number, activityId: string) => void;
  completeDay: (dayNumber: number) => void;
  updateTopicScore: (topic: TopicKey, score: number) => void;
  updateTermMastery: (termKey: string, status: TermMastery) => void;
  updateThinkingScore: (key: keyof ThinkingScores, delta: number) => void;
  saveCaseStudyNote: (key: string, value: string) => void;
  addXp: (amount: number) => void;
  getDayStatus: (dayNumber: number) => DayStatus;
  getLockReason: (dayNumber: number) => string | null;
  resetProgress: () => void;
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      userId: createUserId(),
      assessmentCompleted: false,
      assessmentScore: 0,
      currentDay: 1,
      xp: 0,
      level: 1,
      days: createInitialDays(),
      topicScores: createInitialTopicScores(),
      terminologyMastery: {},
      achievements: [],
      thinkingScores: { ...initialThinkingScores },
      settings: { ...defaultSettings },
      caseStudyNotes: {},

      setLanguage: (language) => {
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        set((s) => ({ settings: { ...s.settings, language } }));
      },

      setTheme: (theme) => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        set((s) => ({ settings: { ...s.settings, theme } }));
      },

      setApiKey: (apiKey) =>
        set((s) => ({ settings: { ...s.settings, apiKey } })),

      completeAssessment: (result) => {
        const topicScores = { ...get().topicScores };
        for (const [topic, score] of Object.entries(result.topicScores)) {
          topicScores[topic as TopicKey] = {
            topic: topic as TopicKey,
            score,
            attempts: 1,
            lastAttempt: new Date().toISOString(),
          };
        }
        set({
          assessmentCompleted: true,
          assessmentScore: result.totalScore,
          skillProfile: result.skillProfile,
          topicScores,
          days: {
            ...get().days,
            1: { ...get().days[1], status: 'not_started' },
          },
        });
      },

      startDay: (dayNumber) => {
        const days = { ...get().days };
        if (days[dayNumber]?.status === 'locked') return;
        if (days[dayNumber].status === 'not_started') {
          days[dayNumber] = {
            ...days[dayNumber],
            status: 'in_progress',
            startedAt: new Date().toISOString(),
          };
        }
        set({ days, currentDay: dayNumber });
      },

      completeSection: (dayNumber, sectionId) => {
        const days = { ...get().days };
        days[dayNumber] = {
          ...days[dayNumber],
          sectionProgress: { ...days[dayNumber].sectionProgress, [sectionId]: true },
        };
        set({ days });
      },

      saveActiveLearningAnswer: (dayNumber, sectionId, answer) => {
        const days = { ...get().days };
        days[dayNumber] = {
          ...days[dayNumber],
          activeLearningAnswers: {
            ...days[dayNumber].activeLearningAnswers,
            [sectionId]: answer,
          },
        };
        set({ days });
      },

      updateDayScores: (dayNumber, scores) => {
        const days = { ...get().days };
        const current = days[dayNumber];
        const updated = { ...current, ...scores };
        updated.dailyScore = calculateDailyScore(updated);
        updated.bestScore = Math.max(updated.bestScore, updated.dailyScore);
        days[dayNumber] = updated;
        set({ days });
      },

      recordAttempt: (dayNumber, activity, score) => {
        const days = { ...get().days };
        const day = days[dayNumber];
        days[dayNumber] = {
          ...day,
          attemptHistory: [
            ...day.attemptHistory,
            { at: new Date().toISOString(), activity, score },
          ],
        };
        set({ days });
      },

      saveArtifact: (dayNumber, submission, score) => {
        const days = { ...get().days };
        const day = days[dayNumber];
        const updated = {
          ...day,
          artifactSubmission: submission,
          artifactScore: Math.max(day.artifactScore, score),
        };
        updated.dailyScore = calculateDailyScore(updated);
        updated.bestScore = Math.max(updated.bestScore, updated.dailyScore);
        updated.attemptHistory = [
          ...day.attemptHistory,
          { at: new Date().toISOString(), activity: 'artifact', score },
        ];
        days[dayNumber] = updated;
        set({ days });
      },

      markActivityComplete: (dayNumber, activityId) => {
        const days = { ...get().days };
        const completed = new Set(days[dayNumber].completedActivities);
        completed.add(activityId);
        days[dayNumber] = {
          ...days[dayNumber],
          completedActivities: [...completed],
        };
        set({ days });
      },

      completeDay: (dayNumber) => {
        const days = { ...get().days };
        const day = days[dayNumber];
        const scoreForProgression = Math.max(day.dailyScore, day.bestScore);
        const status = getProgressionStatus(scoreForProgression);
        days[dayNumber] = {
          ...day,
          status: status === 'revision' ? 'needs_revision' : 'complete',
          completedAt: new Date().toISOString(),
          bestScore: Math.max(day.bestScore, day.dailyScore),
        };
        if (scoreForProgression >= PASS_THRESHOLD && dayNumber < 20) {
          const next = days[dayNumber + 1];
          if (next.status === 'locked') {
            days[dayNumber + 1] = { ...next, status: 'not_started' };
          }
        }
        const xpGain = Math.round(scoreForProgression * 1.5);
        get().addXp(xpGain);
        set({ days, currentDay: Math.min(dayNumber + 1, 20) });
      },

      updateTopicScore: (topic, score) => {
        const topicScores = { ...get().topicScores };
        const existing = topicScores[topic];
        const attempts = existing.attempts + 1;
        const newScore = existing.attempts === 0
          ? score
          : Math.round((existing.score * existing.attempts + score) / attempts);
        topicScores[topic] = { topic, score: newScore, attempts, lastAttempt: new Date().toISOString() };
        set({ topicScores });
      },

      updateTermMastery: (termKey, status) => {
        set((s) => ({
          terminologyMastery: { ...s.terminologyMastery, [termKey]: status },
        }));
      },

      updateThinkingScore: (key, delta) => {
        set((s) => ({
          thinkingScores: {
            ...s.thinkingScores,
            [key]: Math.min(100, Math.max(0, s.thinkingScores[key] + delta)),
          },
        }));
      },

      saveCaseStudyNote: (key, value) => {
        set((s) => ({ caseStudyNotes: { ...s.caseStudyNotes, [key]: value } }));
      },

      addXp: (amount) => {
        const xp = get().xp + amount;
        const level = Math.floor(xp / 500) + 1;
        set({ xp, level });
      },

      getDayStatus: (dayNumber) => get().days[dayNumber]?.status ?? 'locked',

      getLockReason: (dayNumber) => {
        if (!get().assessmentCompleted) {
          return 'Complete the initial Product Owner assessment to unlock Day 1.';
        }
        const day = get().days[dayNumber];
        if (!day) return 'Day not found.';
        if (day.status !== 'locked') return null;
        if (dayNumber === 1) return 'Complete the initial assessment to open Day 1.';
        const prev = get().days[dayNumber - 1];
        if (!prev || prev.status === 'locked' || prev.status === 'not_started') {
          return `Complete Day ${dayNumber - 1} first.`;
        }
        if (prev.status === 'needs_revision' || Math.max(prev.dailyScore, prev.bestScore) < PASS_THRESHOLD) {
          return `Score at least ${PASS_THRESHOLD}% on Day ${dayNumber - 1} (exercises, artifact, quiz, and exam required). Best score: ${prev.bestScore}%.`;
        }
        return `Complete Day ${dayNumber - 1} with at least ${PASS_THRESHOLD}% to unlock.`;
      },

      resetProgress: () =>
        set({
          assessmentCompleted: false,
          assessmentScore: 0,
          skillProfile: undefined,
          currentDay: 1,
          xp: 0,
          level: 1,
          days: createInitialDays(),
          topicScores: createInitialTopicScores(),
          terminologyMastery: {},
          achievements: [],
          thinkingScores: { ...initialThinkingScores },
          caseStudyNotes: {},
        }),
    }),
    {
      name: 'po-academy-progress',
      version: 2,
      migrate: () => ({
        userId: createUserId(),
        assessmentCompleted: false,
        assessmentScore: 0,
        currentDay: 1,
        xp: 0,
        level: 1,
        days: createInitialDays(),
        topicScores: createInitialTopicScores(),
        terminologyMastery: {},
        achievements: [],
        thinkingScores: { ...initialThinkingScores },
        settings: { ...defaultSettings },
        caseStudyNotes: {},
      }) as UserProgress,
      onRehydrateStorage: () => (state) => {
        if (state?.settings.theme === 'dark') {
          document.documentElement.classList.add('dark');
        }
        if (state?.settings.language) {
          document.documentElement.lang = state.settings.language;
          document.documentElement.dir = state.settings.language === 'ar' ? 'rtl' : 'ltr';
        }
      },
    },
  ),
);
