import { Link } from 'react-router-dom';
import { Lock, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { useProgressStore } from '@/po/store/useProgress';
import { DAY_SUMMARIES, getWeekDays } from '@/po/curriculum/roadmap';
import { isDayFullyBuilt } from '@/po/curriculum/days';
import { t } from '@/po/i18n';
import { PASS_THRESHOLD } from '@/po/types';

export function Roadmap() {
  const { settings, days, getLockReason } = useProgressStore();
  const lang = settings.language;

  const weekLabels = lang === 'ar'
    ? ['أساسيات المبتدئ', 'ممارس موجّه', 'ممارس مستقل', 'صانع قرار مهني + محاكاة']
    : ['Beginner Foundation', 'Guided Practitioner', 'Independent Practitioner', 'Professional + Simulation'];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">{t('roadmap', lang)}</h1>
        <p className="text-text-secondary mt-1">
          {lang === 'ar'
            ? 'رحلة إتقان مالك المنتج لمدة 20 يوماً — الفتح التسلسلي عند 70%+'
            : `20-Day Product Owner Mastery Journey — sequential unlock at ${PASS_THRESHOLD}%+`}
        </p>
      </div>

      {[1, 2, 3, 4].map((week) => (
        <div key={week}>
          <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
            <span className="badge bg-accent-muted text-accent">{t('week', lang)} {week}</span>
            <span className="text-sm text-text-muted font-normal">{weekLabels[week - 1]}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            {getWeekDays(week).map((day) => {
              const progress = days[day.dayNumber];
              const isLocked = progress.status === 'locked';
              const isComplete = progress.status === 'complete';
              const isRevision = progress.status === 'needs_revision';
              const isBuilt = isDayFullyBuilt(day.dayNumber);
              const lockReason = getLockReason(day.dayNumber);
              const title = lang === 'ar' ? day.titleAr : day.title;
              const subtitle = lang === 'ar' ? day.subtitleAr : day.subtitle;

              return (
                <Link
                  key={day.dayNumber}
                  to={isLocked ? '#' : `/day/${day.dayNumber}`}
                  onClick={(e) => isLocked && e.preventDefault()}
                  title={isLocked ? lockReason ?? t('dayLocked', lang) : day.artifactName}
                  className={`card relative transition-all ${
                    isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:border-accent hover:shadow-md'
                  } ${isComplete ? 'border-success/30' : ''} ${isRevision ? 'border-warning/30' : ''}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-accent">D{day.dayNumber}</span>
                    <div className="flex items-center gap-1">
                      {!isBuilt && (
                        <span className="badge bg-surface-hover text-text-muted text-[10px]">Building</span>
                      )}
                      {isLocked && <Lock className="w-3.5 h-3.5 text-text-muted" />}
                      {isComplete && <CheckCircle className="w-3.5 h-3.5 text-success" />}
                      {isRevision && <AlertTriangle className="w-3.5 h-3.5 text-warning" />}
                    </div>
                  </div>
                  <h3 className="font-semibold text-sm text-text-primary leading-tight">{title}</h3>
                  <p className="text-xs text-text-muted mt-1">{subtitle}</p>
                  {isLocked && lockReason && (
                    <p className="text-[10px] text-warning mt-2 leading-snug">{lockReason}</p>
                  )}
                  <div className="flex items-center gap-2 mt-3 text-xs text-text-muted">
                    <Clock className="w-3 h-3" />
                    {day.estimatedHours}h
                  </div>
                  {(progress.bestScore > 0 || progress.dailyScore > 0) && (
                    <div className="mt-2">
                      <div className="h-1.5 bg-surface rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${Math.max(progress.dailyScore, progress.bestScore) >= 85 ? 'bg-success' : Math.max(progress.dailyScore, progress.bestScore) >= 70 ? 'bg-info' : 'bg-danger'}`}
                          style={{ width: `${Math.max(progress.dailyScore, progress.bestScore)}%` }}
                        />
                      </div>
                      <p className="text-xs text-text-muted mt-1">
                        {progress.dailyScore}% · {t('bestScore', lang)} {progress.bestScore}%
                      </p>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
