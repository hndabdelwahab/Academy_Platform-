import type { AssessmentResult, SkillProfile, TopicKey, PersonalizedDay } from '@/po/types';
import { ALL_TOPICS } from '@/po/types';

export function buildSkillProfile(
  topicScores: Record<TopicKey, number>,
  totalScore: number,
): SkillProfile {
  const entries = ALL_TOPICS.map((t) => ({ topic: t, score: topicScores[t] ?? 0 }));
  const sorted = [...entries].sort((a, b) => b.score - a.score);
  const strongAreas = sorted.filter((e) => e.score >= 70).slice(0, 5).map((e) => e.topic);
  const weakAreas = sorted.filter((e) => e.score < 60).slice(-5).map((e) => e.topic);

  const criticalGaps: string[] = [];
  if ((topicScores.product_ownership ?? 0) < 50) {
    criticalGaps.push('Product Ownership accountability — start with Day 1 responsibility boundaries');
  }
  if ((topicScores.agile_mindset ?? 0) < 50) {
    criticalGaps.push('Agile mindset and empiricism — focus on Day 2 feedback loops and outcomes');
  }
  if ((topicScores.scrum_framework ?? 0) < 50) {
    criticalGaps.push('Scrum framework literacy — Day 3 map events, artifacts, and commitments');
  }
  if ((topicScores.user_stories ?? 0) < 50 && (topicScores.requirements ?? 0) < 50) {
    criticalGaps.push('Requirements and User Story craft — Days 8–10 need extra practice');
  }
  if ((topicScores.prioritization ?? 0) < 50) {
    criticalGaps.push('Prioritization judgment — Day 12 decision rationale practice');
  }

  const overallLevel: SkillProfile['overallLevel'] =
    totalScore >= 75 ? 'advanced' : totalScore >= 45 ? 'intermediate' : 'beginner';

  const topicLevels = {} as Record<TopicKey, number>;
  for (const t of ALL_TOPICS) topicLevels[t] = topicScores[t] ?? 0;

  const personalizedPath: PersonalizedDay[] = [];
  for (let day = 1; day <= 20; day++) {
    const emphasis = DAY_EMPHASIS[day] ?? 'product_ownership';
    const weak = weakAreas.includes(emphasis);
    personalizedPath.push({
      dayNumber: day,
      emphasis,
      additionalFocus: weak ? `Extra practice on ${emphasis.replace(/_/g, ' ')}` : undefined,
    });
  }

  return {
    overallLevel,
    productOwnershipConfidence: topicScores.product_ownership ?? 0,
    agileScrumLevel: Math.round(((topicScores.agile_mindset ?? 0) + (topicScores.scrum_framework ?? 0)) / 2),
    backlogCraftLevel: Math.round(((topicScores.user_stories ?? 0) + (topicScores.backlog_management ?? 0) + (topicScores.acceptance_criteria ?? 0)) / 3),
    stakeholderLevel: topicScores.stakeholders ?? 0,
    strongAreas: strongAreas.length ? strongAreas : ['product_ownership'],
    weakAreas: weakAreas.length ? weakAreas : ['professional_practice'],
    criticalGaps,
    topicLevels,
    personalizedPath,
  };
}

const DAY_EMPHASIS: Record<number, TopicKey> = {
  1: 'product_ownership',
  2: 'agile_mindset',
  3: 'scrum_framework',
  4: 'roles_collaboration',
  5: 'vision_strategy',
  6: 'stakeholders',
  7: 'product_discovery',
  8: 'requirements',
  9: 'user_stories',
  10: 'acceptance_criteria',
  11: 'backlog_management',
  12: 'prioritization',
  13: 'estimation_forecasting',
  14: 'refinement',
  15: 'sprint_planning',
  16: 'sprint_execution',
  17: 'quality_acceptance',
  18: 'review_retrospective',
  19: 'roadmaps_metrics',
  20: 'professional_practice',
};

export function evaluateAssessment(
  questions: { id: string; topic: TopicKey; correctAnswer: string; points: number }[],
  answers: Record<string, string>,
): AssessmentResult {
  const topicTotals: Record<string, { earned: number; possible: number }> = {};
  let earned = 0;
  let possible = 0;

  for (const q of questions) {
    possible += q.points;
    const ok = (answers[q.id] ?? '').trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();
    if (ok) earned += q.points;
    if (!topicTotals[q.topic]) topicTotals[q.topic] = { earned: 0, possible: 0 };
    topicTotals[q.topic].possible += q.points;
    if (ok) topicTotals[q.topic].earned += q.points;
  }

  const topicScores = {} as Record<TopicKey, number>;
  for (const t of ALL_TOPICS) {
    const agg = topicTotals[t];
    topicScores[t] = agg && agg.possible > 0 ? Math.round((agg.earned / agg.possible) * 100) : 0;
  }

  const totalScore = possible > 0 ? Math.round((earned / possible) * 100) : 0;
  return {
    totalScore,
    topicScores,
    skillProfile: buildSkillProfile(topicScores, totalScore),
    answers,
  };
}
