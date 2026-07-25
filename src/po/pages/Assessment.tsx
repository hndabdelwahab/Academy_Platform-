import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ASSESSMENT_QUESTIONS } from '@/po/curriculum/assessment';
import { evaluateAssessment } from '@/po/engine/assessment';
import { useProgressStore } from '@/po/store/useProgress';
import { QuizEngine } from '@/po/components/quiz/QuizEngine';
import { t } from '@/po/i18n';
import type { QuizQuestion } from '@/po/types';
import { ArrowRight } from 'lucide-react';

export function Assessment() {
  const { settings, assessmentCompleted, skillProfile, assessmentScore, completeAssessment } = useProgressStore();
  const lang = settings.language;
  const navigate = useNavigate();
  const [phase, setPhase] = useState<'intro' | 'exam' | 'results'>(assessmentCompleted ? 'results' : 'intro');

  const quizQuestions: QuizQuestion[] = ASSESSMENT_QUESTIONS.map((q) => ({
    id: q.id,
    type: q.type,
    question: q.question,
    options: q.options,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
    topic: q.topic,
    points: q.points,
  }));

  const handleComplete = (_score: number, answers: Record<string, string>) => {
    const result = evaluateAssessment(ASSESSMENT_QUESTIONS, answers);
    completeAssessment(result);
    setPhase('results');
  };

  if (phase === 'intro') {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="card">
          <h1 className="text-2xl font-bold text-text-primary">{t('assessmentTitle', lang)}</h1>
          <p className="text-text-secondary mt-2">{t('assessmentDesc', lang)}</p>

          <div className="mt-6 space-y-3">
            <h3 className="font-semibold text-text-primary">
              {lang === 'ar' ? 'ما يغطيه هذا التقييم:' : 'What this assessment covers:'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
              {[
                'Product Ownership', 'Agile Mindset', 'Scrum Framework', 'Roles',
                'Vision & Goals', 'Stakeholders', 'Discovery', 'User Stories',
                'Acceptance Criteria', 'Backlog', 'Prioritization', 'Sprints',
                'Quality & UAT', 'Reviews', 'Roadmaps & Metrics', 'Professional Practice',
              ].map((topic) => (
                <span key={topic} className="badge bg-surface-hover text-text-secondary">{topic}</span>
              ))}
            </div>
          </div>

          <div className="mt-6 p-4 bg-accent-muted/10 rounded-md">
            <p className="text-sm text-text-secondary">
              <strong>{ASSESSMENT_QUESTIONS.length} questions</strong>
              {lang === 'ar'
                ? ' — لا يُشترط أي خبرة سابقة في ملكية المنتج أو أجايل أو سكرم.'
                : ' — no prior Product Owner, Agile, or Scrum experience required. Completing this unlocks Day 1.'}
            </p>
          </div>

          <button onClick={() => setPhase('exam')} className="btn-primary mt-6 flex items-center gap-2">
            {t('startAssessment', lang)} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'exam') {
    return (
      <div className="max-w-3xl mx-auto">
        <QuizEngine
          questions={quizQuestions}
          title={t('assessmentTitle', lang)}
          allowRetry={false}
          onComplete={handleComplete}
        />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="card text-center py-8">
        <h1 className="text-2xl font-bold">{t('viewResults', lang)}</h1>
        <p className="text-4xl font-bold text-accent mt-4">{assessmentScore}%</p>
        <p className="text-text-secondary mt-2">{t('overallLevel', lang)}: {skillProfile?.overallLevel}</p>
      </div>

      {skillProfile && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="card">
            <h3 className="section-title">{t('strengths', lang)}</h3>
            <div className="flex flex-wrap gap-2">
              {skillProfile.strongAreas.map((a) => (
                <span key={a} className="badge bg-success/20 text-success">{a.replace(/_/g, ' ')}</span>
              ))}
            </div>
          </div>
          <div className="card">
            <h3 className="section-title">{t('weaknesses', lang)}</h3>
            <div className="flex flex-wrap gap-2">
              {skillProfile.weakAreas.map((a) => (
                <span key={a} className="badge bg-danger/20 text-danger">{a.replace(/_/g, ' ')}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {skillProfile?.criticalGaps && skillProfile.criticalGaps.length > 0 && (
        <div className="card border-warning/30">
          <h3 className="section-title">{t('criticalGaps', lang)}</h3>
          <ul className="space-y-1 text-sm text-text-secondary">
            {skillProfile.criticalGaps.map((gap) => <li key={gap}>• {gap}</li>)}
          </ul>
        </div>
      )}

      <div className="flex gap-3">
        <button className="btn-primary" onClick={() => navigate('/day/1')}>
          {t('startDay', lang)} 1
        </button>
        <button className="btn-secondary" onClick={() => navigate('/roadmap')}>
          {t('roadmap', lang)}
        </button>
        <button className="btn-ghost" onClick={() => setPhase('intro')}>
          {t('retakeAssessment', lang)}
        </button>
      </div>
    </div>
  );
}
