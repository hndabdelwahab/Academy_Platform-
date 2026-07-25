import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  UserProgress, DayProgress, TopicKey, TopicScore, TermMastery,
  SkillProfile, UserSettings, ThinkingScores, DayStatus,
} from '@/types';
import { ALL_TOPICS } from '@/types';
import { calculateDailyScore, getProgressionStatus } from '@/engine/scoring';
import { buildSkillProfile } from '@/engine/assessment';
import type { AssessmentResult } from '@/types';

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
      codeScore: 0,
      debugScore: 0,
      readingScore: 0,
      termScore: 0,
      sectionProgress: {},
      completedChallenges: [],
      activeLearningAnswers: {},
    };
  }
  return days;
}

const initialThinkingScores: ThinkingScores = {
  investigationApproach: 0,
  logicalThinking: 0,
  codeUnderstanding: 0,
  terminology: 0,
  debuggingDiscipline: 0,
  databaseSafety: 0,
  architectureUnderstanding: 0,
  erpBusinessUnderstanding: 0,
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
  updateDayScores: (dayNumber: number, scores: Partial<Pick<DayProgress, 'quizScore' | 'codeScore' | 'debugScore' | 'readingScore' | 'termScore'>>) => void;
  completeDay: (dayNumber: number) => void;
  updateTopicScore: (topic: TopicKey, score: number) => void;
  updateTermMastery: (termKey: string, status: TermMastery) => void;
  updateThinkingScore: (key: keyof ThinkingScores, delta: number) => void;
  addXp: (amount: number) => void;
  getDayStatus: (dayNumber: number) => DayStatus;
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

      setLanguage: (language) =>
        set((s) => ({ settings: { ...s.settings, language } })),

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
        if (days[dayNumber].status === 'not_started' || days[dayNumber].status === 'locked') {
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
        days[dayNumber] = updated;
        set({ days });
      },

      completeDay: (dayNumber) => {
        const days = { ...get().days };
        const day = days[dayNumber];
        const status = getProgressionStatus(day.dailyScore);
        days[dayNumber] = {
          ...day,
          status: status === 'revision' ? 'needs_revision' : 'complete',
          completedAt: new Date().toISOString(),
        };
        if (status !== 'revision' && dayNumber < 20) {
          const next = days[dayNumber + 1];
          if (next.status === 'locked') {
            days[dayNumber + 1] = { ...next, status: 'not_started' };
          }
        }
        const xpGain = Math.round(day.dailyScore * 1.5);
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

      addXp: (amount) => {
        const xp = get().xp + amount;
        const level = Math.floor(xp / 500) + 1;
        set({ xp, level });
      },

      getDayStatus: (dayNumber) => get().days[dayNumber]?.status ?? 'locked',

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
        }),
    }),
    {
      name: 'erp-academy-progress',
      onRehydrateStorage: () => (state) => {
        if (state?.settings.theme === 'dark') {
          document.documentElement.classList.add('dark');
        }
      },
    },
  ),
);
