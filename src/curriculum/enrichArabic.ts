import type {
  ActiveLearningPrompt,
  DayCurriculum,
  LessonSection,
  QuizQuestion,
  SectionContent,
  SectionContentLocale,
} from '@/types';
import { hasArabicBody } from '@/curriculum/localize';

export function buildArabicSectionBody(titleAr: string, dayTitleAr: string): SectionContentLocale {
  return {
    simpleExplanation: `يشرح «${titleAr}» فكرة أساسية في ${dayTitleAr}. بلغة بسيطة: هذا المفهوم يساعدك على فهم كيف يعمل البرنامج داخل أنظمة ERP مثل Odoo.`,
    professionalDefinition: `«${titleAr}» مفهوم تقني يستخدمه مطورو ERP لوصف طبقة أو سلوك في التنفيذ أو البيانات أو التواصل بين الأنظمة.`,
    whyItExists: 'وُجد هذا المفهوم لتبسيط عمل المطورين: كتابة تعليمات مقروءة، وتشغيلها بشكل موثوق، وربطها بقواعد العمل في أنظمة المؤسسات.',
    howItWorks: '1) افهم المشكلة في سياق ERP. 2) حدّد أين يحدث التنفيذ (واجهة، API، باكند، قاعدة بيانات). 3) طبّق المفهوم بكود أو استعلام. 4) تحقق من النتيجة والأخطاء. 5) اربط ذلك بما تراه في Odoo أو تكاملات ERP.',
    erpExample: 'في ERP، يظهر هذا المفهوم عند تأكيد أمر بيع أو التحقق من المخزون أو تحديث سجل عبر الـ ORM ثم حفظه في PostgreSQL.',
    odooConnection: 'في Odoo يعمل هذا المفهوم عادة داخل وقت تشغيل Python وطبقات النماذج/المتحكمات، مع تفاعل مع واجهة المستخدم وقاعدة البيانات.',
    realProjectRecognition: 'في مشروع حقيقي ابحث عن نقاط الدخول (main.py / odoo-bin / Program.cs) وملفات الإعداد والأخطاء في الطبقات الصحيحة بدل التخمين.',
    commonMistakes: [
      { wrong: 'معاملة الملف النصي كأنه ينفّذ نفسه', right: 'يحتاج الملف إلى مفسّر/وقت تشغيل لتنفيذه', explanation: 'الشيفرة نص؛ وقت التشغيل هو من ينفذها.' },
      { wrong: 'البحث عن الخطأ في الطبقة الخاطئة', right: 'حدد هل المشكلة في الواجهة أو API أو Python أو SQL', explanation: 'تصحيح الطبقة يوفر وقت التشخيص.' },
    ],
    interviewTerminology: `«${titleAr}» جزء من النموذج الذهني لمطور ERP: أشرح أين يحدث التنفيذ، وكيف ترتبط الواجهة بالباكند وقاعدة البيانات، وكيف أشخص الأخطاء في الطبقة الصحيحة.»`,
  };
}

function enrichPrompt(prompt: ActiveLearningPrompt | undefined, titleAr: string): ActiveLearningPrompt | undefined {
  if (!prompt) return prompt;
  if (prompt.questionAr) return prompt;
  return {
    ...prompt,
    questionAr: `طبّق «${titleAr}» في سياق Odoo/ERP وأجب بجمل واضحة.`,
    hintAr: prompt.hint ? 'فكّر في الطبقات: المتصفح، الخادم، Python، قاعدة البيانات.' : undefined,
    modelAnswerAr: prompt.modelAnswer
      ? 'الإجابة القوية تربط المفهوم بطبقات ERP وتذكر أدلة يمكن فحصها (سجلات، استعلام، استجابة API).'
      : undefined,
  };
}

function enrichSection(section: LessonSection, dayTitleAr: string): LessonSection {
  const titleAr = section.titleAr || section.title;
  const content: SectionContent = hasArabicBody(section.content)
    ? section.content
    : { ...section.content, ar: buildArabicSectionBody(titleAr, dayTitleAr) };
  return {
    ...section,
    titleAr,
    content,
    requiresAnswer: enrichPrompt(section.requiresAnswer, titleAr),
  };
}

function enrichQuiz(q: QuizQuestion): QuizQuestion {
  if (q.questionAr) return q;
  return {
    ...q,
    questionAr: q.question,
    optionsAr: q.options,
    correctAnswerAr: q.correctAnswer,
    explanationAr: q.explanation,
  };
}

/** Ensures Arabic lesson bodies exist for ERP days that lack handcrafted ar content. */
export function enrichDayArabic(day: DayCurriculum): DayCurriculum {
  const dayTitleAr = day.titleAr || day.title;
  return {
    ...day,
    titleAr: dayTitleAr,
    subtitleAr: day.subtitleAr || day.subtitle,
    objectivesAr: day.objectivesAr || day.objectives,
    sections: day.sections.map((s) => enrichSection(s, dayTitleAr)),
    quiz: day.quiz.map(enrichQuiz),
    exam: day.exam.map(enrichQuiz),
    codeReadingExercise: {
      ...day.codeReadingExercise,
      titleAr: day.codeReadingExercise.titleAr || day.codeReadingExercise.title,
      descriptionAr: day.codeReadingExercise.descriptionAr || day.codeReadingExercise.description,
      questions: day.codeReadingExercise.questions.map((q) => ({
        ...q,
        questionAr: q.questionAr || q.question,
        modelAnswerAr: q.modelAnswerAr || q.modelAnswer,
      })),
    },
    challenges: day.challenges.map((c) => ({
      ...c,
      titleAr: c.titleAr || c.title,
      descriptionAr: c.descriptionAr || c.description,
      hintsAr: c.hintsAr || c.hints,
      erpContextAr: c.erpContextAr || c.erpContext,
    })),
    debuggingChallenge: {
      ...day.debuggingChallenge,
      titleAr: day.debuggingChallenge.titleAr || day.debuggingChallenge.title,
      scenarioAr: day.debuggingChallenge.scenarioAr || day.debuggingChallenge.scenario,
      explanationAr: day.debuggingChallenge.explanationAr || day.debuggingChallenge.explanation,
      investigationSteps: day.debuggingChallenge.investigationSteps.map((s) => ({
        ...s,
        actionAr: s.actionAr || s.action,
        resultAr: s.resultAr || s.result,
      })),
    },
    erpScenario: {
      ...day.erpScenario,
      titleAr: day.erpScenario.titleAr || day.erpScenario.title,
      businessContextAr: day.erpScenario.businessContextAr || day.erpScenario.businessContext,
      technicalChallengeAr: day.erpScenario.technicalChallengeAr || day.erpScenario.technicalChallenge,
      questionsAr: day.erpScenario.questionsAr || day.erpScenario.questions,
      connectionAr: day.erpScenario.connectionAr || day.erpScenario.connection,
    },
  };
}
