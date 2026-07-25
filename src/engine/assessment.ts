import type { AssessmentQuestion, AssessmentResult, SkillProfile, TopicKey } from '@/types';
import { ALL_TOPICS } from '@/types';
import { gradeQuizAnswer } from './scoring';

export function evaluateAssessment(
  questions: AssessmentQuestion[],
  answers: Record<string, string>,
): AssessmentResult {
  const topicTotals: Record<string, { earned: number; total: number }> = {};
  for (const topic of ALL_TOPICS) {
    topicTotals[topic] = { earned: 0, total: 0 };
  }

  let totalEarned = 0;
  let totalPoints = 0;

  for (const q of questions) {
    totalPoints += q.points;
    topicTotals[q.topic].total += q.points;
    const isCorrect = gradeQuizAnswer(q.correctAnswer, answers[q.id] ?? '');
    if (isCorrect) {
      totalEarned += q.points;
      topicTotals[q.topic].earned += q.points;
    }
  }

  const topicScores = {} as Record<TopicKey, number>;
  for (const topic of ALL_TOPICS) {
    const t = topicTotals[topic];
    topicScores[topic] = t.total > 0 ? Math.round((t.earned / t.total) * 100) : 50;
  }

  const totalScore = totalPoints > 0 ? Math.round((totalEarned / totalPoints) * 100) : 0;
  const skillProfile = buildSkillProfile(topicScores, totalScore);

  return { totalScore, topicScores, skillProfile, answers };
}

export function buildSkillProfile(
  topicScores: Record<TopicKey, number>,
  totalScore: number,
): SkillProfile {
  const sorted = ALL_TOPICS
    .map((t) => ({ topic: t, score: topicScores[t] }))
    .sort((a, b) => b.score - a.score);

  const strongAreas = sorted.filter((s) => s.score >= 75).map((s) => s.topic).slice(0, 5);
  const weakAreas = sorted.filter((s) => s.score < 60).map((s) => s.topic).slice(0, 5);

  const criticalGaps: string[] = [];
  if (topicScores.programming_fundamentals < 50) criticalGaps.push('Programming fundamentals — start with Day 1 mental models');
  if (topicScores.python < 50) criticalGaps.push('Python syntax and execution flow');
  if (topicScores.sql < 50) criticalGaps.push('SQL query writing and database investigation');
  if (topicScores.debugging < 50) criticalGaps.push('Systematic debugging methodology');
  if (topicScores.code_reading < 50) criticalGaps.push('Reading and understanding unfamiliar code');
  if (topicScores.odoo < 50) criticalGaps.push('Odoo module architecture and ORM');
  if (topicScores.architecture < 50) criticalGaps.push('Software architecture and layer separation');

  let overallLevel: SkillProfile['overallLevel'] = 'beginner';
  if (totalScore >= 70) overallLevel = 'advanced';
  else if (totalScore >= 45) overallLevel = 'intermediate';

  const personalizedPath = buildPersonalizedPath(topicScores);

  return {
    overallLevel,
    programmingConfidence: topicScores.programming_fundamentals,
    codeReadingLevel: topicScores.code_reading,
    debuggingLevel: topicScores.debugging,
    erpTechnicalLevel: Math.round(
      (topicScores.erp_analysis + topicScores.odoo + topicScores.sql) / 3,
    ),
    strongAreas,
    weakAreas,
    criticalGaps,
    topicLevels: topicScores,
    personalizedPath,
  };
}

function buildPersonalizedPath(topicScores: Record<TopicKey, number>): SkillProfile['personalizedPath'] {
  const path: SkillProfile['personalizedPath'] = [];
  const weakTopics = ALL_TOPICS.filter((t) => topicScores[t] < 60);

  const dayEmphasis: Record<number, string> = {
    1: 'programming_fundamentals',
    2: 'python',
    3: 'python',
    5: 'python',
    6: 'sql',
    7: 'sql',
    8: 'sql',
    9: 'api',
    11: 'html_css',
    12: 'javascript',
    13: 'react',
    14: 'csharp',
    15: 'xml',
    16: 'odoo',
    17: 'odoo',
    18: 'architecture',
    19: 'ai_dev',
    20: 'erp_analysis',
  };

  for (let day = 1; day <= 20; day++) {
    const emphasis = dayEmphasis[day] ?? 'programming_fundamentals';
    const isWeak = weakTopics.includes(emphasis as TopicKey);
    path.push({
      dayNumber: day,
      emphasis: `Focus: ${emphasis.replace(/_/g, ' ')}`,
      additionalFocus: isWeak ? 'Extra reinforcement exercises recommended based on your assessment' : undefined,
    });
  }
  return path;
}
