import { useState } from 'react';
import type { QuizQuestion } from '@/po/types';
import { gradeQuizAnswer } from '@/po/engine/scoring';
import { useProgressStore } from '@/po/store/useProgress';
import { pickLang } from '@/po/curriculum/localize';
import { t } from '@/po/i18n';
import { CheckCircle, XCircle } from 'lucide-react';

interface QuizEngineProps {
  questions: QuizQuestion[];
  title: string;
  onComplete: (score: number, answers: Record<string, string>) => void;
  allowRetry?: boolean;
}

function isCorrect(q: QuizQuestion, userAnswer: string): boolean {
  return gradeQuizAnswer(q.correctAnswer, userAnswer)
    || (!!q.correctAnswerAr && gradeQuizAnswer(q.correctAnswerAr, userAnswer));
}

export function QuizEngine({ questions, title, onComplete, allowRetry = true }: QuizEngineProps) {
  const lang = useProgressStore((s) => s.settings.language);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<Record<string, boolean>>({});
  const [bestScore, setBestScore] = useState(0);

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
    setBestScore((b) => Math.max(b, score));
    onComplete(score, answers);
  };

  const handleRetry = () => {
    setSubmitted(false);
    setCurrentIndex(0);
    setAnswers({});
    setResults({});
  };

  if (!question) {
    return <div className="card">{lang === 'ar' ? 'لا توجد أسئلة.' : 'No questions available.'}</div>;
  }

  if (submitted) {
    const correctCount = Object.values(results).filter(Boolean).length;
    const score = questions.length
      ? Math.round((correctCount / questions.length) * 100)
      : 0;
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold">{title} — {lang === 'ar' ? 'النتائج' : 'Results'}</h2>
        <div className="card text-center py-6">
          <p className="text-3xl font-bold text-accent">{correctCount}/{questions.length}</p>
          <p className="text-text-secondary mt-1">
            {lang === 'ar' ? `أسئلة صحيحة (${score}%)` : `questions correct (${score}%)`}
          </p>
          <p className="text-sm text-text-muted mt-2">
            {lang === 'ar'
              ? `أفضل محاولة محفوظة: ${Math.max(bestScore, score)}%`
              : `Best attempt preserved: ${Math.max(bestScore, score)}%`}
          </p>
        </div>
        {questions.map((q) => {
          const qText = pickLang(lang, q.question, q.questionAr);
          const explanation = pickLang(lang, q.explanation, q.explanationAr);
          const correctLabel = pickLang(lang, q.correctAnswer, q.correctAnswerAr);
          return (
            <div key={q.id} className={`card border-l-4 ${results[q.id] ? 'border-success' : 'border-danger'}`}>
              <div className="flex items-start gap-2">
                {results[q.id] ? <CheckCircle className="w-5 h-5 text-success shrink-0" /> : <XCircle className="w-5 h-5 text-danger shrink-0" />}
                <div>
                  <p className="font-medium text-text-primary">{qText}</p>
                  <p className="text-sm text-text-muted mt-1">
                    {t('yourAnswer', lang)}: {displayStoredAnswer(q, answers[q.id], lang) || (lang === 'ar' ? '(لا شيء)' : '(none)')}
                  </p>
                  {!results[q.id] && (
                    <p className="text-sm text-success mt-1">{t('correct', lang)}: {correctLabel}</p>
                  )}
                  <p className="text-sm text-text-secondary mt-2 whitespace-pre-wrap">{explanation}</p>
                  {score < 70 && !results[q.id] && (
                    <p className="text-sm text-warning mt-2">
                      {lang === 'ar'
                        ? 'نصيحة للمراجعة: أعد قراءة قسم الدرس ذي الصلة ثم أعد المحاولة. ركّز على سبب تعظيم الخيار الصحيح لقيمة المنتج.'
                        : 'Revision tip: re-read the related lesson section and retry. Focus on why the correct option maximizes product value.'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {allowRetry && (
          <button className="btn-secondary" onClick={handleRetry}>
            {lang === 'ar' ? 'إعادة المحاولة (تُحفظ أفضل درجة)' : 'Retry (best score is kept)'}
          </button>
        )}
      </div>
    );
  }

  const qText = pickLang(lang, question.question, question.questionAr);
  const displayOptions = question.options ?? [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{title}</h2>
        <span className="text-sm text-text-muted">{currentIndex + 1} / {questions.length}</span>
      </div>

      <div className="card">
        <p className="font-medium text-text-primary mb-4">{qText}</p>
        {question.options ? (
          <div className="space-y-2 mt-4">
            {displayOptions.map((opt, i) => {
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
            className="input-field min-h-[100px] mt-4 text-sm"
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
            {t('submit', lang)}
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
