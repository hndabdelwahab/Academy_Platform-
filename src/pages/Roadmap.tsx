import { Link } from 'react-router-dom';
import { Lock, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { useProgressStore } from '@/store/useProgress';
import { DAY_SUMMARIES, getWeekDays, topicLabel } from '@/curriculum/roadmap';
import { isDayFullyBuilt } from '@/curriculum/days';
import { t } from '@/i18n';

export function Roadmap() {
  const { settings, days } = useProgressStore();
  const lang = settings.language;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">{t('roadmap', lang)}</h1>
        <p className="text-text-secondary mt-1">
          {lang === 'ar' ? 'رحلة إتقان مطوّر ERP لمدة 20 يومًا' : '20-Day ERP Developer Mastery Journey'}
        </p>
      </div>

      {[1, 2, 3, 4].map((week) => (
        <div key={week}>
          <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
            <span className="badge bg-accent-muted text-accent">{t('week', lang)} {week}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            {getWeekDays(week).map((day) => {
              const progress = days[day.dayNumber];
              const isLocked = progress.status === 'locked';
              const isComplete = progress.status === 'complete';
              const isRevision = progress.status === 'needs_revision';
              const isBuilt = isDayFullyBuilt(day.dayNumber);

              return (
                <Link
                  key={day.dayNumber}
                  to={isLocked ? '#' : `/day/${day.dayNumber}`}
                  onClick={(e) => isLocked && e.preventDefault()}
                  className={`card relative transition-all ${
                    isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:border-accent hover:shadow-md'
                  } ${isComplete ? 'border-success/30' : ''} ${isRevision ? 'border-warning/30' : ''}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-accent">D{day.dayNumber}</span>
                    <div className="flex items-center gap-1">
                      {!isBuilt && day.dayNumber > 1 && (
                        <span className="badge bg-surface-hover text-text-muted text-[10px]">
                          {lang === 'ar' ? 'قريبًا' : 'Soon'}
                        </span>
                      )}
                      {isLocked && <Lock className="w-3.5 h-3.5 text-text-muted" />}
                      {isComplete && <CheckCircle className="w-3.5 h-3.5 text-success" />}
                      {isRevision && <AlertTriangle className="w-3.5 h-3.5 text-warning" />}
                    </div>
                  </div>
                  <h3 className="font-semibold text-sm text-text-primary leading-tight">
                    {lang === 'ar' ? day.titleAr : day.title}
                  </h3>
                  <p className="text-xs text-text-muted mt-1">
                    {lang === 'ar' ? day.subtitleAr : day.subtitle}
                  </p>
                  <div className="flex items-center gap-2 mt-3 text-xs text-text-muted">
                    <Clock className="w-3 h-3" />
                    {day.estimatedHours}h
                  </div>
                  {progress.dailyScore > 0 && (
                    <div className="mt-2">
                      <div className="h-1.5 bg-surface rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${progress.dailyScore >= 85 ? 'bg-success' : progress.dailyScore >= 70 ? 'bg-info' : 'bg-danger'}`}
                          style={{ width: `${progress.dailyScore}%` }}
                        />
                      </div>
                      <p className="text-xs text-text-muted mt-1">{progress.dailyScore}%</p>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {day.topics.slice(0, 2).map((topic) => (
                      <span key={topic} className="badge bg-surface-hover text-text-muted text-[10px]">
                        {topicLabel(topic, lang)}
                      </span>
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
