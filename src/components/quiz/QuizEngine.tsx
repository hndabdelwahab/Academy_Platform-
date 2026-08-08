import { useState } from 'react';
import type { QuizQuestion } from '@/types';
import { CodeEditor } from '@/components/editor/CodeEditor';
import { gradeQuizAnswer } from '@/engine/scoring';
import { useProgressStore } from '@/store/useProgress';
import { pickLang } from '@/curriculum/localize';
import { t } from '@/i18n';
import { CheckCircle, XCircle } from 'lucide-react';

interface QuizEngineProps {
  questions: QuizQuestion[];
  title: string;
  onComplete: (score: number, answers: Record<string, string>) => void;
}

function isCorrect(q: QuizQuestion, userAnswer: string): boolean {
  return gradeQuizAnswer(q.correctAnswer, userAnswer)
    || (!!q.correctAnswerAr && gradeQuizAnswer(q.correctAnswerAr, userAnswer));
}

export function QuizEngine({ questions, title, onComplete }: QuizEngineProps) {
  const lang = useProgressStore((s) => s.settings.language);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<Record<string, boolean>>({});

  const question = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  };

  const handleSubmitAll = () => {
    const res: Record<string, boolean> = {};
    let earned = 0;
    let total = 0;
    for (const q of questions) {
      total += q.points;
      const correct = isCorrect(q, answers[q.id] ?? '');
      res[q.id] = correct;
      if (correct) earned += q.points;
    }
    setResults(res);
    setSubmitted(true);
    const score = total > 0 ? Math.round((earned / total) * 100) : 0;
    onComplete(score, answers);
  };

  if (submitted) {
    const correctCount = Object.values(results).filter(Boolean).length;
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold">{title} — {lang === 'ar' ? 'النتائج' : 'Results'}</h2>
        <div className="card text-center py-6">
          <p className="text-3xl font-bold text-accent">{correctCount}/{questions.length}</p>
          <p className="text-text-secondary mt-1">{lang === 'ar' ? 'أسئلة صحيحة' : 'questions correct'}</p>
        </div>
        {questions.map((q) => {
          const qText = pickLang(lang, q.question, q.questionAr);
          const explanation = pickLang(lang, q.explanation, q.explanationAr);
          const correctLabel = pickLang(lang, q.correctAnswer, q.correctAnswerAr);
          const shownAnswer = displayStoredAnswer(q, answers[q.id], lang);
          return (
            <div key={q.id} className={`card border-l-4 ${results[q.id] ? 'border-success' : 'border-danger'}`}>
              <div className="flex items-start gap-2">
                {results[q.id] ? <CheckCircle className="w-5 h-5 text-success shrink-0" /> : <XCircle className="w-5 h-5 text-danger shrink-0" />}
                <div>
                  <p className="font-medium text-text-primary">{qText}</p>
                  <p className="text-sm text-text-muted mt-1">
                    {t('yourAnswer', lang)}: {shownAnswer || (lang === 'ar' ? '(لا شيء)' : '(none)')}
                  </p>
                  {!results[q.id] && (
                    <p className="text-sm text-success mt-1">{t('correct', lang)}: {correctLabel}</p>
                  )}
                  <p className="text-sm text-text-secondary mt-2">{explanation}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  const qText = pickLang(lang, question.question, question.questionAr);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{title}</h2>
        <span className="text-sm text-text-muted">{currentIndex + 1} / {questions.length}</span>
      </div>

      <div className="card">
        <p className="font-medium text-text-primary mb-4">{qText}</p>

        {question.code && (
          <CodeEditor value={question.code} language={question.language ?? 'python'} readOnly height="150px" />
        )}

        {question.options ? (
          <div className="space-y-2 mt-4">
            {question.options.map((opt, i) => {
              const label = lang === 'ar' && question.optionsAr?.[i] ? question.optionsAr[i] : opt;
              return (
                <button
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  className={`w-full text-start px-4 py-3 rounded-md border transition-colors ${
                    answers[question.id] === opt
                      ? 'border-accent bg-accent-muted text-accent'
                      : 'border-border hover:border-accent/50'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        ) : (
          <textarea
            className="input-field min-h-[100px] mt-4 font-mono text-sm"
            value={answers[question.id] ?? ''}
            onChange={(e) => handleAnswer(e.target.value)}
            placeholder={lang === 'ar' ? 'اكتب إجابتك...' : 'Type your answer...'}
          />
        )}
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
          disabled={currentIndex === 0}
          className="btn-secondary"
        >
          {t('previous', lang)}
        </button>
        {isLast ? (
          <button
            onClick={handleSubmitAll}
            disabled={Object.keys(answers).length < questions.length}
            className="btn-primary"
          >
            {lang === 'ar' ? 'إرسال الاختبار' : 'Submit Quiz'}
          </button>
        ) : (
          <button
            onClick={() => setCurrentIndex((i) => i + 1)}
            disabled={!answers[question.id]}
            className="btn-primary"
          >
            {t('next', lang)}
          </button>
        )}
      </div>
    </div>
  );
}

function displayStoredAnswer(q: QuizQuestion, stored: string | undefined, lang: 'en' | 'ar'): string {
  if (!stored) return '';
  if (lang === 'ar' && q.options && q.optionsAr) {
    const idx = q.options.indexOf(stored);
    if (idx >= 0 && q.optionsAr[idx]) return q.optionsAr[idx];
  }
  return stored;
}
