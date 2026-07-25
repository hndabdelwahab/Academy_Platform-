import { useProgressStore } from '@/po/store/useProgress';
import { getMasteryLevel, getMasteryColor, getScoreBreakdown } from '@/po/engine/scoring';
import { ALL_TOPICS } from '@/po/types';
import { t } from '@/po/i18n';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';

export function ScoresPage() {
  const { settings, topicScores, thinkingScores, days, assessmentScore } = useProgressStore();
  const lang = settings.language;

  const topicData = ALL_TOPICS.map((topic) => ({
    topic: topic.replace(/_/g, ' '),
    score: topicScores[topic]?.score ?? 0,
  })).filter((d) => d.score > 0);

  const thinkingData = [
    { skill: 'Value Focus', score: thinkingScores.valueFocus },
    { skill: 'Stakeholders', score: thinkingScores.stakeholderEmpathy },
    { skill: 'Problem Analysis', score: thinkingScores.problemAnalysis },
    { skill: 'Prioritization', score: thinkingScores.prioritizationJudgment },
    { skill: 'Communication', score: thinkingScores.communicationClarity },
    { skill: 'Decision Ownership', score: thinkingScores.decisionOwnership },
    { skill: 'Outcomes', score: thinkingScores.outcomeThinking },
    { skill: 'Professional Practice', score: thinkingScores.professionalPractice },
  ];

  const dayScores = Object.values(days)
    .filter((d) => d.dailyScore > 0 || d.bestScore > 0)
    .map((d) => ({
      day: `D${d.dayNumber}`,
      score: Math.max(d.dailyScore, d.bestScore),
      breakdown: getScoreBreakdown(d),
    }));

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">{t('scores', lang)}</h1>
        <p className="text-text-secondary mt-1">
          {lang === 'ar' ? 'معرفة المنتج وأنماط تفكير مالك المنتج' : 'Product knowledge and Product Owner thinking patterns'}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ScoreCard label={t('technicalKnowledge', lang)} value={assessmentScore} />
        <ScoreCard label={t('codingScore', lang)} value={days[1]?.artifactScore ?? 0} />
        <ScoreCard label={t('sqlInvestigation', lang)} value={topicScores.product_discovery?.score ?? 0} />
        <ScoreCard label={t('productionSafety', lang)} value={topicScores.sprint_execution?.score ?? 0} />
      </div>

      {topicData.length > 0 && (
        <div className="card">
          <h3 className="section-title">{t('topicScores', lang)}</h3>
          <ResponsiveContainer width="100%" height={360}>
            <BarChart data={topicData} layout="vertical">
              <XAxis type="number" domain={[0, 100]} />
              <YAxis type="category" dataKey="topic" width={140} tick={{ fontSize: 10 }} />
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
          <h3 className="section-title">{t('dailyScore', lang)}</h3>
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
        <h3 className="section-title">{t('topicScores', lang)} — Mastery</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {ALL_TOPICS.map((topic) => {
            const score = topicScores[topic]?.score ?? 0;
            const level = getMasteryLevel(score);
            return (
              <div key={topic} className="p-2 rounded-md bg-surface">
                <p className="text-xs text-text-muted truncate">{topic.replace(/_/g, ' ')}</p>
                <p className={`text-sm font-semibold ${getMasteryColor(level)}`}>{score}% · {level}</p>
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
      <p className="text-2xl font-bold text-accent">{value}%</p>
      <p className="text-xs text-text-muted mt-1">{label}</p>
    </div>
  );
}
