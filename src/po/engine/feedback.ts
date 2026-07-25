import type { ProfessionalFeedbackTemplate } from '@/po/types';
import { gradeArtifact, gradeOpenAnswer } from './scoring';

export interface FeedbackResult {
  score: number;
  whatCorrect: string;
  whatIncorrect: string;
  whatUnclear: string;
  whatMissing: string;
  whyMissingMatters: string;
  solvingVsRepeating: string;
  userBusinessValue: string;
  testable: string;
  businessRules: string;
  permissionsEdgeCases: string;
  correctResponsibility: string;
  betterVersion: string;
  modelAnswer: string;
  recommendedRevision: string;
  nextPracticeStep: string;
  isPassing: boolean;
}

function containsAny(text: string, terms: string[]): boolean {
  const lower = text.toLowerCase();
  return terms.some((t) => lower.includes(t.toLowerCase()));
}

export function buildProfessionalFeedback(params: {
  answer: string;
  modelAnswer: string;
  scoringCriteria: string[];
  requiredFields?: string[];
  template?: ProfessionalFeedbackTemplate;
  activityType: 'exercise' | 'artifact' | 'scenario' | 'active_learning';
}): FeedbackResult {
  const { answer, modelAnswer, scoringCriteria, requiredFields = [], template, activityType } = params;
  const trimmed = answer.trim();

  const artifactResult = requiredFields.length
    ? gradeArtifact(trimmed, modelAnswer, scoringCriteria, requiredFields)
    : null;
  const score = artifactResult
    ? artifactResult.score
    : gradeOpenAnswer(trimmed, modelAnswer, scoringCriteria);

  const missing = artifactResult?.missingFields ?? [];
  const missedCriteria = artifactResult?.criteriaMissed
    ?? scoringCriteria.filter((c) => !containsAny(trimmed, c.split(/\s+/).filter((w) => w.length > 3)));

  const hasUser = containsAny(trimmed, ['user', 'customer', 'warehouse', 'operator', 'planner', 'agent']);
  const hasValue = containsAny(trimmed, ['value', 'outcome', 'reduce', 'improve', 'accuracy', 'stockout', 'time', 'cost', 'risk']);
  const hasTestable = containsAny(trimmed, ['given', 'when', 'then', 'accept', 'verify', 'measure', 'criteria', 'must', 'shall']);
  const hasRules = containsAny(trimmed, ['rule', 'permission', 'role', 'exception', 'status', 'validation', 'cannot', 'only if']);
  const hasEdge = containsAny(trimmed, ['edge', 'exception', 'error', 'empty', 'zero', 'duplicate', 'concurrent', 'offline']);
  const soundsCopied = trimmed.length > 0 && modelAnswer.length > 0
    && trimmed.toLowerCase().replace(/\s+/g, ' ') === modelAnswer.toLowerCase().replace(/\s+/g, ' ');

  const whatCorrect = score >= 70
    ? `Your response addresses several professional expectations for this ${activityType}. Strengths include coverage of: ${(artifactResult?.criteriaHit ?? scoringCriteria.filter((c) => containsAny(trimmed, [c.split(' ')[0]]))).slice(0, 3).join('; ') || 'core ideas'}.`
    : score >= 40
      ? 'Some relevant Product Owner thinking is present, but the answer is incomplete for professional use.'
      : 'The answer does not yet demonstrate professional Product Owner reasoning for this activity.';

  const whatIncorrect = score < 70
    ? (missedCriteria.slice(0, 3).map((c) => `Weak or missing: ${c}`).join(' ')
      || 'Key professional expectations were not met.')
    : 'No major factual contradictions detected against the model answer.';

  const whatUnclear = trimmed.length < 80
    ? 'The answer is too short or vague for a professional reviewer to act on.'
    : !hasValue
      ? 'Business or user value is not clearly stated.'
      : 'Clarity is acceptable; tighten language where decisions or ownership are implied.';

  const whatMissing = [
    ...missing.map((f) => `Required field/section missing: ${f}`),
    ...(!hasUser ? ['User or stakeholder perspective'] : []),
    ...(!hasValue ? ['Clear business/user value'] : []),
    ...(activityType === 'artifact' && !hasTestable ? ['Testable conditions or success measures'] : []),
  ].join('; ') || 'No critical structural fields missing.';

  const whyMissingMatters =
    'Missing value, users, testability, or ownership creates delivery risk: teams build the wrong thing, stakeholders argue about "done," and the Product Owner cannot defend decisions.';

  const solvingVsRepeating = soundsCopied
    ? 'The submission appears copied from the model answer. Professional mastery requires original analysis applied to the scenario, not repetition.'
    : score >= 60
      ? 'You appear to be solving the problem with your own reasoning rather than only restating a template.'
      : 'The response still leans toward describing the ask instead of making a Product Owner decision.';

  return {
    score,
    whatCorrect,
    whatIncorrect,
    whatUnclear,
    whatMissing,
    whyMissingMatters,
    solvingVsRepeating,
    userBusinessValue: hasUser && hasValue
      ? 'User and business value are sufficiently visible.'
      : 'Strengthen who benefits and what measurable outcome improves.',
    testable: hasTestable
      ? 'Testable language or verification cues are present.'
      : 'Add clear conditions that QA, users, or the Product Owner can verify.',
    businessRules: hasRules
      ? 'Business rules or constraints are considered.'
      : 'Important business rules are missing or only implied.',
    permissionsEdgeCases: hasEdge
      ? 'Edge cases or exceptions are considered.'
      : 'Permissions, exceptions, and edge cases need more attention.',
    correctResponsibility: containsAny(trimmed, ['product owner', 'backlog', 'value', 'priority', 'accept', 'goal'])
      ? 'You are operating largely within Product Owner accountability.'
      : 'Check whether you are doing PO work (value/ordering/acceptance) or drifting into Project Manager, Developer, or Scrum Master work.',
    betterVersion: template?.betterVersion ?? `Improve your answer by covering: ${scoringCriteria.slice(0, 4).join('; ')}.`,
    modelAnswer,
    recommendedRevision: missedCriteria.length
      ? `Revise to explicitly address: ${missedCriteria.slice(0, 4).join('; ')}.`
      : 'Polish wording for professional stakeholder communication and re-submit for a higher score.',
    nextPracticeStep: template?.nextPracticeStep
      ?? 'Retry this activity, then explain your decision aloud as if presenting to a sponsor.',
    isPassing: score >= 70,
  };
}
