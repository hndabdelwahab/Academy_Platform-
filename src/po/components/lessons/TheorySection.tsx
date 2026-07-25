import { useState } from 'react';
import type { SectionContent, ActiveLearningPrompt } from '@/po/types';
import { buildProfessionalFeedback } from '@/po/engine/feedback';
import { ChevronDown, ChevronRight, Lock } from 'lucide-react';

interface TheorySectionProps {
  title: string;
  content: SectionContent;
  requiresAnswer?: ActiveLearningPrompt;
  sectionId: string;
  onComplete: () => void;
  savedAnswer?: string;
  onSaveAnswer: (answer: string) => void;
}

const TEXT_BLOCKS: { key: keyof SectionContent; label: string; labelAr: string }[] = [
  { key: 'conceptIntroduction', label: 'Concept Introduction', labelAr: 'مقدمة المفهوم' },
  { key: 'simpleExplanation', label: 'Simple Explanation', labelAr: 'شرح بسيط' },
  { key: 'businessProblem', label: 'Business / Delivery Problem', labelAr: 'مشكلة العمل أو التسليم' },
  { key: 'professionalDefinition', label: 'Professional Definition', labelAr: 'التعريف المهني' },
  { key: 'whyImportant', label: 'Why It Is Important', labelAr: 'لماذا هو مهم' },
  { key: 'lifecycleLocation', label: 'Where It Appears in the Product Lifecycle', labelAr: 'مكانه في دورة حياة المنتج' },
  { key: 'howItWorks', label: 'How It Works Step by Step', labelAr: 'كيف يعمل خطوة بخطوة' },
  { key: 'whoResponsible', label: 'Who Is Responsible', labelAr: 'من المسؤول' },
  { key: 'whoParticipates', label: 'Who Participates', labelAr: 'من يشارك' },
  { key: 'requiredInputs', label: 'Required Inputs', labelAr: 'المدخلات المطلوبة' },
  { key: 'activities', label: 'Activities Performed', labelAr: 'الأنشطة المنفذة' },
  { key: 'expectedOutputs', label: 'Expected Outputs', labelAr: 'المخرجات المتوقعة' },
  { key: 'simpleExample', label: 'Simple Non-Technical Example', labelAr: 'مثال بسيط غير تقني' },
  { key: 'softwareExample', label: 'Realistic Software Example', labelAr: 'مثال برمجي واقعي' },
  { key: 'erpExample', label: 'Detailed ERP Example', labelAr: 'مثال ERP مفصل' },
  { key: 'workedExample', label: 'Complete Worked Example', labelAr: 'مثال عملي كامل' },
  { key: 'comparison', label: 'Comparison with Similar Concepts', labelAr: 'مقارنة مع مفاهيم مشابهة' },
  { key: 'commonMisunderstandings', label: 'Common Misunderstandings', labelAr: 'سوء الفهم الشائع' },
  { key: 'poorExample', label: 'Poor Example', labelAr: 'مثال ضعيف' },
  { key: 'correctExample', label: 'Correct Professional Example', labelAr: 'مثال مهني صحيح' },
  { key: 'guidedPractice', label: 'Guided Practice', labelAr: 'تمرين موجّه' },
  { key: 'independentPractice', label: 'Independent Practice', labelAr: 'تمرين مستقل' },
  { key: 'scenarioDecision', label: 'Scenario-Based Decision', labelAr: 'قرار قائم على سيناريو' },
  { key: 'reflectionQuestion', label: 'Reflection Question', labelAr: 'سؤال للتأمل' },
  { key: 'professionalTerminology', label: 'Professional Terminology', labelAr: 'المصطلحات المهنية' },
  { key: 'interviewQuestion', label: 'Interview Question', labelAr: 'سؤال مقابلة' },
  { key: 'interviewModelAnswer', label: 'Interview Model Answer', labelAr: 'إجابة نموذجية للمقابلة' },
  { key: 'markdown', label: 'Additional Depth', labelAr: 'عمق إضافي' },
];

export function TheorySection({
  title,
  content,
  requiresAnswer,
  onComplete,
  savedAnswer,
  onSaveAnswer,
}: TheorySectionProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    conceptIntroduction: true,
    simpleExplanation: true,
  });
  const [answer, setAnswer] = useState(savedAnswer ?? '');
  const [answered, setAnswered] = useState(!!savedAnswer);
  const [showModel, setShowModel] = useState(false);
  const [feedback, setFeedback] = useState<ReturnType<typeof buildProfessionalFeedback> | null>(null);
  const lang = (typeof document !== 'undefined' && document.documentElement.dir === 'rtl') ? 'ar' : 'en';

  const toggle = (key: string) => setExpanded((p) => ({ ...p, [key]: !p[key] }));

  const handleSubmitAnswer = () => {
    const min = requiresAnswer?.minLength ?? 20;
    if (answer.trim().length < min) return;
    onSaveAnswer(answer);
    setAnswered(true);
    if (requiresAnswer?.modelAnswer) {
      setFeedback(buildProfessionalFeedback({
        answer,
        modelAnswer: requiresAnswer.modelAnswer,
        scoringCriteria: requiresAnswer.scoringKeywords?.map((k) => `Uses idea: ${k}`) ?? ['Clear reasoning', 'Applies case context', 'Uses professional terms'],
        activityType: 'active_learning',
      }));
    }
  };

  const canContinue = !requiresAnswer || answered;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-text-primary">{title}</h2>

      {TEXT_BLOCKS.map(({ key, label, labelAr }) => {
        const text = content[key];
        if (!text || typeof text !== 'string') return null;
        return (
          <div key={key} className="content-block">
            <button onClick={() => toggle(key)} className="flex items-center gap-2 w-full text-left">
              {expanded[key] ? <ChevronDown className="w-4 h-4 text-accent" /> : <ChevronRight className="w-4 h-4 text-text-muted" />}
              <span className="content-label mb-0">{lang === 'ar' ? labelAr : label}</span>
            </button>
            {expanded[key] && (
              <p className="text-text-secondary leading-relaxed mt-2 whitespace-pre-wrap">{text}</p>
            )}
          </div>
        );
      })}

      {content.processSteps && content.processSteps.length > 0 && (
        <div className="content-block">
          <p className="content-label">Process / Lifecycle</p>
          <ol className="mt-3 space-y-3">
            {content.processSteps.map((step, i) => (
              <li key={step.id} className="flex gap-3">
                <span className="w-7 h-7 rounded-full bg-accent text-white text-sm flex items-center justify-center shrink-0">{i + 1}</span>
                <div>
                  <p className="font-medium text-text-primary">{step.label}</p>
                  <p className="text-sm text-text-secondary">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      {content.comparisonTable && (
        <div className="content-block overflow-x-auto">
          <p className="content-label">{content.comparisonTable.title}</p>
          <table className="w-full text-sm mt-3 border-collapse">
            <thead>
              <tr>
                {content.comparisonTable.headers.map((h) => (
                  <th key={h} className="text-left p-2 border-b border-border text-text-primary">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {content.comparisonTable.rows.map((row, i) => (
                <tr key={i} className="border-b border-border/50">
                  {row.map((cell, j) => (
                    <td key={j} className="p-2 text-text-secondary align-top">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {content.beginnerMistakes && content.beginnerMistakes.length > 0 && (
        <div className="content-block">
          <p className="content-label">Common Beginner Mistakes</p>
          <div className="space-y-3 mt-2">
            {content.beginnerMistakes.map((m, i) => (
              <div key={i} className="text-sm space-y-1">
                <p className="text-danger"><span className="font-medium">Wrong:</span> {m.wrong}</p>
                <p className="text-success"><span className="font-medium">Right:</span> {m.right}</p>
                <p className="text-text-muted">{m.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {content.workplaceMistakes && content.workplaceMistakes.length > 0 && (
        <div className="content-block">
          <p className="content-label">Common Workplace Mistakes</p>
          <div className="space-y-3 mt-2">
            {content.workplaceMistakes.map((m, i) => (
              <div key={i} className="text-sm space-y-1">
                <p className="text-danger"><span className="font-medium">Wrong:</span> {m.wrong}</p>
                <p className="text-success"><span className="font-medium">Right:</span> {m.right}</p>
                <p className="text-text-muted">{m.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {requiresAnswer && (
        <div className="card border-accent/40 space-y-3">
          <p className="font-medium text-text-primary">Active Learning — required before continuing</p>
          <p className="text-text-secondary">{requiresAnswer.question}</p>
          {requiresAnswer.hint && !answered && (
            <p className="text-sm text-warning">Hint: {requiresAnswer.hint}</p>
          )}
          <textarea
            className="input-field min-h-[120px]"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={answered}
            placeholder="Write a complete answer. Short or vague answers will receive critical feedback."
          />
          {!answered ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={answer.trim().length < (requiresAnswer.minLength ?? 20)}
              className="btn-primary"
            >
              Submit Answer
            </button>
          ) : (
            <div className="space-y-3">
              {feedback && <FeedbackCard feedback={feedback} />}
              <button onClick={() => setShowModel((s) => !s)} className="btn-secondary">
                {showModel ? 'Hide Model Answer' : 'Show Model Answer'}
              </button>
              {showModel && requiresAnswer.modelAnswer && (
                <div className="p-3 bg-surface rounded-md text-sm text-text-secondary whitespace-pre-wrap">
                  {requiresAnswer.modelAnswer}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <button onClick={onComplete} disabled={!canContinue} className="btn-primary flex items-center gap-2">
        {!canContinue && <Lock className="w-4 h-4" />}
        Mark Section Complete & Continue
      </button>
    </div>
  );
}

export function FeedbackCard({ feedback }: { feedback: ReturnType<typeof buildProfessionalFeedback> }) {
  return (
    <div className={`p-4 rounded-md border space-y-2 text-sm ${feedback.isPassing ? 'border-success/40 bg-success/5' : 'border-warning/40 bg-warning/5'}`}>
      <p className="font-semibold text-text-primary">Professional Feedback — Score {feedback.score}%</p>
      <p><span className="text-success font-medium">What is correct:</span> {feedback.whatCorrect}</p>
      <p><span className="text-danger font-medium">What is incorrect / weak:</span> {feedback.whatIncorrect}</p>
      <p><span className="font-medium">What is unclear:</span> {feedback.whatUnclear}</p>
      <p><span className="font-medium">What is missing:</span> {feedback.whatMissing}</p>
      <p><span className="font-medium">Why missing information matters:</span> {feedback.whyMissingMatters}</p>
      <p><span className="font-medium">Solving vs repeating:</span> {feedback.solvingVsRepeating}</p>
      <p><span className="font-medium">User / business value:</span> {feedback.userBusinessValue}</p>
      <p><span className="font-medium">Testability:</span> {feedback.testable}</p>
      <p><span className="font-medium">Business rules:</span> {feedback.businessRules}</p>
      <p><span className="font-medium">Permissions / edge cases:</span> {feedback.permissionsEdgeCases}</p>
      <p><span className="font-medium">Correct PO responsibility?:</span> {feedback.correctResponsibility}</p>
      <p><span className="font-medium">Better professional version:</span> {feedback.betterVersion}</p>
      <p><span className="font-medium">Recommended revision:</span> {feedback.recommendedRevision}</p>
      <p><span className="font-medium">Next practice step:</span> {feedback.nextPracticeStep}</p>
    </div>
  );
}
