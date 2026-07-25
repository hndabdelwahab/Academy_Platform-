import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ASSESSMENT_QUESTIONS } from '@/curriculum/assessment';
import { evaluateAssessment } from '@/engine/assessment';
import { useProgressStore } from '@/store/useProgress';
import { QuizEngine } from '@/components/quiz/QuizEngine';
import { t } from '@/i18n';
import type { QuizQuestion } from '@/types';
import { ArrowRight, BarChart3 } from 'lucide-react';

export function Assessment() {
  const { settings, assessmentCompleted, skillProfile, assessmentScore, completeAssessment } = useProgressStore();
  const lang = settings.language;
  const navigate = useNavigate();
  const [phase, setPhase] = useState<'intro' | 'exam' | 'results'>(assessmentCompleted ? 'results' : 'intro');

  const quizQuestions: QuizQuestion[] = ASSESSMENT_QUESTIONS.map((q) => ({
    id: q.id,
    type: q.type,
    question: q.question,
    code: q.code,
    language: q.language,
    options: q.options,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
    topic: q.topic,
    points: q.points,
  }));

  const handleComplete = (score: number, answers: Record<string, string>) => {
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
            <h3 className="font-semibold text-text-primary">What this assessment covers:</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
              {[
                'Programming Fundamentals', 'Python', 'OOP', 'SQL', 'Database Concepts',
                'JavaScript', 'HTML/CSS', 'XML', 'APIs', 'Git',
                'Architecture', 'Odoo', 'ERP Analysis', 'Debugging', 'Code Reading',
              ].map((topic) => (
                <span key={topic} className="badge bg-surface-hover text-text-secondary">{topic}</span>
              ))}
            </div>
          </div>

          <div className="mt-6 p-4 bg-accent-muted/10 rounded-md">
            <p className="text-sm text-text-secondary">
              <strong>{ASSESSMENT_QUESTIONS.length} questions</strong> including multiple choice, code explanation,
              error finding, output prediction, code writing, SQL queries, ERP analysis, and architecture identification.
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
          onComplete={handleComplete}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="card text-center py-6">
        <BarChart3 className="w-12 h-12 text-accent mx-auto mb-3" />
        <h1 className="text-2xl font-bold text-text-primary">Your Technical Skill Profile</h1>
        <p className="text-4xl font-bold text-accent mt-2">{assessmentScore}%</p>
        <p className="text-text-secondary mt-1">
          {t('overallLevel', lang)}: <strong className="capitalize">{skillProfile?.overallLevel}</strong>
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <p className="text-xl font-bold text-accent">{skillProfile?.programmingConfidence}%</p>
          <p className="text-xs text-text-muted mt-1">{t('programmingConfidence', lang)}</p>
        </div>
        <div className="card text-center">
          <p className="text-xl font-bold text-accent">{skillProfile?.codeReadingLevel}%</p>
          <p className="text-xs text-text-muted mt-1">{t('codeReadingLevel', lang)}</p>
        </div>
        <div className="card text-center">
          <p className="text-xl font-bold text-accent">{skillProfile?.debuggingLevel}%</p>
          <p className="text-xs text-text-muted mt-1">{t('debuggingLevel', lang)}</p>
        </div>
        <div className="card text-center">
          <p className="text-xl font-bold text-accent">{skillProfile?.erpTechnicalLevel}%</p>
          <p className="text-xs text-text-muted mt-1">{t('erpTechnicalLevel', lang)}</p>
        </div>
      </div>

      {skillProfile && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card">
              <h3 className="section-title">{t('strengths', lang)}</h3>
              <div className="flex flex-wrap gap-2">
                {skillProfile.strongAreas.map((a) => (
                  <span key={a} className="badge bg-success/20 text-success">{a.replace(/_/g, ' ')}</span>
                ))}
                {skillProfile.strongAreas.length === 0 && (
                  <p className="text-sm text-text-muted">Keep learning — strengths will emerge</p>
                )}
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

          {skillProfile.criticalGaps.length > 0 && (
            <div className="card border-warning/30">
              <h3 className="section-title">{t('criticalGaps', lang)}</h3>
              <ul className="space-y-2">
                {skillProfile.criticalGaps.map((gap, i) => (
                  <li key={i} className="text-sm text-text-secondary">• {gap}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="card">
            <h3 className="section-title">Personalized Learning Path</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {skillProfile.personalizedPath.slice(0, 10).map((p) => (
                <div key={p.dayNumber} className="flex items-center gap-3 text-sm py-1 border-b border-border last:border-0">
                  <span className="badge bg-accent-muted text-accent shrink-0">Day {p.dayNumber}</span>
                  <span className="text-text-secondary">{p.emphasis}</span>
                  {p.additionalFocus && (
                    <span className="badge bg-warning/20 text-warning text-[10px] shrink-0">Extra focus</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="flex gap-3">
        <button onClick={() => setPhase('exam')} className="btn-secondary">{t('retakeAssessment', lang)}</button>
        <button onClick={() => navigate('/day/1')} className="btn-primary flex items-center gap-2">
          Start Day 1 <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
