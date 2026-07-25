import { useProgressStore } from '@/store/useProgress';
import { getMasteryLevel, getMasteryColor, getScoreBreakdown } from '@/engine/scoring';
import { ALL_TOPICS } from '@/types';
import { t } from '@/i18n';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';

export function ScoresPage() {
  const { settings, topicScores, thinkingScores, days, assessmentScore } = useProgressStore();
  const lang = settings.language;

  const topicData = ALL_TOPICS.map((topic) => ({
    topic: topic.replace(/_/g, ' '),
    score: topicScores[topic]?.score ?? 0,
  })).filter((d) => d.score > 0);

  const thinkingData = [
    { skill: 'Investigation', score: thinkingScores.investigationApproach },
    { skill: 'Logic', score: thinkingScores.logicalThinking },
    { skill: 'Code Reading', score: thinkingScores.codeUnderstanding },
    { skill: 'Terminology', score: thinkingScores.terminology },
    { skill: 'Debugging', score: thinkingScores.debuggingDiscipline },
    { skill: 'DB Safety', score: thinkingScores.databaseSafety },
    { skill: 'Architecture', score: thinkingScores.architectureUnderstanding },
    { skill: 'ERP Business', score: thinkingScores.erpBusinessUnderstanding },
  ];

  const dayScores = Object.values(days)
    .filter((d) => d.dailyScore > 0)
    .map((d) => ({
      day: `D${d.dayNumber}`,
      score: d.dailyScore,
      breakdown: getScoreBreakdown(d),
    }));

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">{t('scores', lang)}</h1>
        <p className="text-text-secondary mt-1">Technical knowledge and thinking pattern analysis</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ScoreCard label={t('technicalKnowledge', lang)} value={assessmentScore} />
        <ScoreCard label={t('codingScore', lang)} value={days[1]?.codeScore ?? 0} />
        <ScoreCard label={t('sqlInvestigation', lang)} value={topicScores.sql?.score ?? 0} />
        <ScoreCard label={t('productionSafety', lang)} value={topicScores.production_safety?.score ?? 0} />
      </div>

      {topicData.length > 0 && (
        <div className="card">
          <h3 className="section-title">{t('topicScores', lang)}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topicData} layout="vertical">
              <XAxis type="number" domain={[0, 100]} />
              <YAxis type="category" dataKey="topic" width={120} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="score" fill="var(--color-accent)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="card">
        <h3 className="section-title">{t('thinkingScores', lang)}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={thinkingData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11 }} />
            <Radar dataKey="score" stroke="var(--color-accent)" fill="var(--color-accent)" fillOpacity={0.3} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {dayScores.length > 0 && (
        <div className="card">
          <h3 className="section-title">{t('dailyScore', lang)} Breakdown</h3>
          <div className="space-y-3">
            {dayScores.map((d) => (
              <div key={d.day} className="flex items-center gap-4">
                <span className="font-mono text-accent w-8">{d.day}</span>
                <div className="flex-1 h-3 bg-surface rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${d.score >= 85 ? 'bg-success' : d.score >= 70 ? 'bg-info' : 'bg-danger'}`}
                    style={{ width: `${d.score}%` }}
                  />
                </div>
                <span className="text-sm font-medium w-12 text-right">{d.score}%</span>
                <span className={`badge text-[10px] ${
                  d.breakdown.status === 'progression' ? 'bg-success/20 text-success' :
                  d.breakdown.status === 'reinforcement' ? 'bg-warning/20 text-warning' :
                  'bg-danger/20 text-danger'
                }`}>
                  {d.breakdown.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card">
        <h3 className="section-title">All Topic Mastery Levels</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {ALL_TOPICS.map((topic) => {
            const score = topicScores[topic]?.score ?? 0;
            const level = score > 0 ? getMasteryLevel(score) : 'not_started';
            return (
              <div key={topic} className="flex items-center justify-between p-2 bg-surface rounded-md">
                <span className="text-sm text-text-secondary">{topic.replace(/_/g, ' ')}</span>
                <span className={`text-sm font-medium ${score > 0 ? getMasteryColor(getMasteryLevel(score)) : 'text-text-muted'}`}>
                  {score > 0 ? `${score}%` : '—'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ScoreCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="card text-center">
      <p className="text-2xl font-bold text-accent">{value > 0 ? `${value}%` : '—'}</p>
      <p className="text-xs text-text-muted mt-1">{label}</p>
    </div>
  );
}
