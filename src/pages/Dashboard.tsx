import { Link } from 'react-router-dom';
import { ClipboardCheck, ArrowRight, Lock, CheckCircle, AlertTriangle } from 'lucide-react';
import { useProgressStore } from '@/store/useProgress';
import { DAY_SUMMARIES } from '@/curriculum/roadmap';
import { t } from '@/i18n';

export function Dashboard() {
  const { settings, assessmentCompleted, assessmentScore, skillProfile, days, xp, level, currentDay } = useProgressStore();
  const lang = settings.language;

  const completedDays = Object.values(days).filter((d) => d.status === 'complete').length;
  const day1 = days[1];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">{t('welcomeBack', lang)}</h1>
        <p className="text-text-secondary mt-1">{t('appSubtitle', lang)}</p>
      </div>

      {!assessmentCompleted && (
        <div className="card border-accent/50 bg-accent-muted/10 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-text-primary">{t('assessmentRequired', lang)}</h2>
            <p className="text-sm text-text-secondary mt-1">{t('assessmentDesc', lang)}</p>
          </div>
          <Link to="/assessment" className="btn-primary flex items-center gap-2 shrink-0">
            {t('startAssessment', lang)} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <p className="text-2xl font-bold text-accent">{level}</p>
          <p className="text-sm text-text-muted">{t('level', lang)}</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-accent">{xp}</p>
          <p className="text-sm text-text-muted">{t('xp', lang)}</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-accent">{completedDays}/20</p>
          <p className="text-sm text-text-muted">{t('progress', lang)}</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-accent">{assessmentCompleted ? `${assessmentScore}%` : '—'}</p>
          <p className="text-sm text-text-muted">{t('assessment', lang)}</p>
        </div>
      </div>

      {skillProfile && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card">
            <h3 className="section-title">{t('strengths', lang)}</h3>
            <div className="flex flex-wrap gap-2">
              {skillProfile.strongAreas.length > 0 ? skillProfile.strongAreas.map((a) => (
                <span key={a} className="badge bg-success/20 text-success">{a.replace(/_/g, ' ')}</span>
              )) : <span className="text-text-muted text-sm">Complete more activities to identify strengths</span>}
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
          <h3 className="section-title flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-warning" />
            {t('criticalGaps', lang)}
          </h3>
          <ul className="space-y-1">
            {skillProfile.criticalGaps.map((gap, i) => (
              <li key={i} className="text-sm text-text-secondary">• {gap}</li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">{t('todaysFocus', lang)}</h2>
          <Link to="/roadmap" className="text-sm text-accent hover:underline">{t('allDays', lang)} →</Link>
        </div>

        {assessmentCompleted ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {DAY_SUMMARIES.slice(0, 6).map((day) => {
              const progress = days[day.dayNumber];
              const isLocked = progress.status === 'locked';
              const isComplete = progress.status === 'complete';
              const isRevision = progress.status === 'needs_revision';

              return (
                <Link
                  key={day.dayNumber}
                  to={isLocked ? '#' : `/day/${day.dayNumber}`}
                  className={`card transition-all hover:border-accent/50 ${isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}`}
                  onClick={(e) => isLocked && e.preventDefault()}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-accent">{t('day', lang)} {day.dayNumber}</span>
                    {isLocked && <Lock className="w-4 h-4 text-text-muted" />}
                    {isComplete && <CheckCircle className="w-4 h-4 text-success" />}
                    {isRevision && <AlertTriangle className="w-4 h-4 text-warning" />}
                  </div>
                  <h3 className="font-semibold text-text-primary">{lang === 'ar' ? day.titleAr : day.title}</h3>
                  <p className="text-sm text-text-muted mt-1">{lang === 'ar' ? day.subtitleAr : day.subtitle}</p>
                  {progress.dailyScore > 0 && (
                    <p className="text-sm text-accent mt-2">{t('score', lang)}: {progress.dailyScore}%</p>
                  )}
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="card text-center py-8 text-text-muted">
            <ClipboardCheck className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>{t('completeAssessmentFirst', lang)}</p>
          </div>
        )}
      </div>

      {assessmentCompleted && day1.status !== 'locked' && (
        <Link
          to={`/day/${currentDay}`}
          className="card flex items-center justify-between hover:border-accent transition-colors"
        >
          <div>
            <p className="font-semibold text-text-primary">
              {day1.status === 'complete' ? t('reviewDay', lang) : t('continueDay', lang)} — {t('day', lang)} {currentDay}
            </p>
            <p className="text-sm text-text-muted">{DAY_SUMMARIES[currentDay - 1]?.title}</p>
          </div>
          <ArrowRight className="w-5 h-5 text-accent" />
        </Link>
      )}
    </div>
  );
}
