import type {
  ActiveLearningPrompt,
  ArtifactActivity,
  CaseStudyUpdate,
  DayCurriculum,
  DecisionScenario,
  InterviewPrep,
  LessonSection,
  PracticeExercise,
  QuizQuestion,
  SectionContent,
  SectionContentLocale,
} from '@/po/types';
import { hasArabicBody } from '@/po/curriculum/localize';

/** Build a full Arabic teaching mirror for a section that has no handcrafted `ar` body. */
export function buildArabicSectionBody(
  titleAr: string,
  dayTitleAr: string,
): SectionContentLocale {
  return {
    conceptIntroduction: `يقدّم «${titleAr}» أساسًا مهنيًا ضمن ${dayTitleAr}. يساعدك على اتخاذ قرار قيمة متعمد بدل الاستجابة لأعلى صوت أو لمعالجة التذاكر فقط.`,
    simpleExplanation: `بلغة بسيطة، «${titleAr}» يعني فهم ما يجب أن يملكه مالك المنتج وكيف يخدم المستخدمين والنتائج في Horizon ERP لمجموعة ميريديان الصناعية.`,
    businessProblem: 'عندما تختلط مفاهيم المنتج والمشروع والطلب، تضيع المساءلة: يتابع الجميع الجداول الزمنية ولا يملك أحد النتائج.',
    professionalDefinition: `«${titleAr}» ممارسة مهنية يستخدمها مالك المنتج لربط عمل الفريق بهدف المنتج والأدلة ونتائج المستخدم — لا بمجرد تسليم مخرجات.`,
    whyImportant: 'بدون هذا الأساس، يصبح مالك المنتج معالج طلبات، ويتحول Horizon ERP إلى مجموعة تذاكر متضاربة بدل قدرة قيمة مستمرة.',
    lifecycleLocation: 'يظهر هذا المفهوم عبر دورة حياة المنتج: الاكتشاف والاستراتيجية والتسليم والإصدار والتبني والقياس والتطور.',
    howItWorks: '1) حدّد المنتج والنتيجة. 2) ميّز المشروع والطلب عن قيمة المنتج. 3) أوضح مساءلة مالك المنتج. 4) اجعل القرار شفافًا. 5) افحص النتائج وتكيّف.',
    whoResponsible: 'مالك المنتج مسؤول عن تعظيم قيمة المنتج وفعالية قائمة المهام. يساهم الآخرون بالأدلة والخيارات دون نقل المساءلة.',
    whoParticipates: 'المستخدمون والعملاء والرعاة والمطورون ومحللو الأعمال ومديرو المشاريع وسكرم ماستر يشاركون حسب السؤال.',
    requiredInputs: 'أهداف العمل، احتياجات المستخدم، القيود، سياق ميريديان التشغيلي، والتغذية الراجعة من الزيادات السابقة.',
    activities: `اشرح «${titleAr}»، طبّقه على مخزون ومستودع Horizon ERP، واتخذ قرار ملكية مرئيًا.`,
    expectedOutputs: 'فهم مشترك، ولغة مهنية أوضح، وحدود ملكية يمكن الدفاع عنها في اجتماعات التوجيه.',
    simpleExample: 'مخبز الحي منتج مستمر (خبز طازج موثوق). شراء فرن في عطلة نهاية الأسبوع مشروع مؤقت. رسالة «اجعل الزر أرجوانيًا» طلب لم يُقيَّم بعد.',
    softwareExample: 'تطبيق توصيل هو منتج يتطور. مشروع قطع لنقل البيانات قد يوجد داخله. طلب ميزة عبر البريد ليس التزامًا تلقائيًا.',
    erpExample: 'Horizon ERP للمخزون والمستودع هو المنتج. أجهزة الباركود وسيلة محتملة. هدف الدقة 95% نتيجة. قوائم Excel الظل طلبات/فوضى لا قائمة مهام منتج.',
    workedExample: 'المنتج: مخزون ومستودع Horizon ERP.\nالمستخدمون: مشغّل المستودع، مراقب المخزون، وكيل خدمة العملاء.\nالنتيجة: دقة مخزون أعلى ووعود أوثق.\nالمشروع: قطع أرصدة افتتاحية.\nالطلب: «ابنِ تطبيق باركود هذا الربع».\nقرار مالك المنتج: التحقق من المشكلة وترتيب العمل الشفاف قبل الالتزام بالحل.',
    comparison: 'المنتج = قيمة مستمرة. المشروع = جهد مؤقت. الطلب = إشارة إدخال. الميزة = قدرة داخل المنتج.',
    commonMisunderstandings: 'سوء فهم: «المنتج هو ما تبنيه تقنية المعلومات.» التصحيح: المنتج هو القدرة القيمة التي يختبرها المستخدمون، بما في ذلك جودة العملية والبيانات.',
    beginnerMistakes: [
      { wrong: 'اعتبار كل طلب هو المنتج', right: 'عرّف حدود منتج واحدة وضع الطلبات داخلها أو خارجها', explanation: 'بدون حدود تصبح الأولوية سياسة.' },
      { wrong: 'افتراض انتهاء المنتج عند الإطلاق', right: 'خطّط للتعلم والتطور بعد الإصدار', explanation: 'القيمة تثبت في الاستخدام لا في حفل الإطلاق.' },
    ],
    workplaceMistakes: [
      { wrong: 'كل قسم يدّعي «منتجًا» منفصلًا لنفس حقيقة المخزون', right: 'وحّد حول منتج واحد وقائمة مهام واحدة', explanation: 'الملكية المجزأة تخلق قواعد متضاربة وعملًا مكررًا.' },
    ],
    poorExample: '«نبني شاشات للمستودع.» هذا مخرج لا تعريف منتج.',
    correctExample: '«يساعد Horizon ERP للمخزون والمستودع فرق ميريديان على معرفة المخزون ومكانه وما يمكن وعد العملاء به — دون جداول أو معرفة قبلية.»',
    guidedPractice: `طبّق «${titleAr}» على سرد ميريديان: سمِّ المنتج والمشروع والطلب بوضوح.`,
    independentPractice: 'اكتب تعريف منتج من فقرة واحدة يتضمن المستخدمين والنتائج والنطاق وغير الأهداف.',
    scenarioDecision: 'يقول الراعي: ابنِ تطبيق الباركود الآن. افصل المشكلة عن الحل المطلوب وأظهر المقايضة.',
    reflectionQuestion: `ما الدليل الذي سيجعلك تغيّر فهمك لـ «${titleAr}» في ميريديان؟`,
    professionalTerminology: 'استخدم «منتج» و«مشروع» و«قيمة» و«نتيجة» و«مساءلة» بدقة.',
    interviewQuestion: `كيف تشرح «${titleAr}» لمالك منتج مبتدئ في منتج ERP داخلي؟`,
    interviewModelAnswer: 'أبدأ بالنتيجة للمستخدم والعمل، وأميّز المنتج عن المشروع والطلب، ثم أوضح أن مالك المنتج يملك قيمة المنتج وترتيب قائمة المهام بشفافية باستخدام الأدلة — كما في دقة مخزون ميريديان وموثوقية الوعود.',
  };
}

function enrichPrompt(prompt: ActiveLearningPrompt | undefined, titleAr: string): ActiveLearningPrompt | undefined {
  if (!prompt) return prompt;
  if (prompt.questionAr) return prompt;
  return {
    ...prompt,
    questionAr: `طبّق «${titleAr}» على ميريديان بإجابة مهنية كاملة. اذكر مستخدمًا أو صاحب مصلحة، ودليلًا، وقرارًا، ونتيجة.`,
    hintAr: prompt.hint ? 'اكتب بجمل كاملة واستخدم سياق ميريديان.' : undefined,
    modelAnswerAr: prompt.modelAnswer
      ? `في ميريديان، أطبّق المفهوم بربط احتياج المستخدم بهدف المنتج. أجمع الأدلة، أتخذ قرار ترتيب شفاف، وأفحص النتيجة التشغيلية بدل الالتزام بالحل الأول.`
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

function enrichExercise(ex: PracticeExercise): PracticeExercise {
  if (ex.titleAr && ex.instructionsAr) return ex;
  return {
    ...ex,
    titleAr: ex.titleAr ?? ex.title,
    instructionsAr: ex.instructionsAr ?? `نفّذ التمرين التالي في سياق ميريديان وHorizon ERP:\n${ex.instructions}`,
    hintsAr: ex.hintsAr ?? ex.hints?.map((h) => h),
    modelAnswerAr: ex.modelAnswerAr ?? ex.modelAnswer,
  };
}

function enrichScenario(sc: DecisionScenario): DecisionScenario {
  if (sc.titleAr && sc.contextAr) return sc;
  return {
    ...sc,
    titleAr: sc.titleAr ?? sc.title,
    contextAr: sc.contextAr ?? sc.context,
    conflictAr: sc.conflictAr ?? sc.conflict,
    questionAr: sc.questionAr ?? sc.question,
    optionsAr: sc.optionsAr ?? sc.options,
    modelAnswerAr: sc.modelAnswerAr ?? sc.modelAnswer,
  };
}

function enrichArtifact(a: ArtifactActivity): ArtifactActivity {
  if (a.titleAr && a.instructionsAr) return a;
  return {
    ...a,
    titleAr: a.titleAr ?? a.title,
    descriptionAr: a.descriptionAr ?? a.description,
    instructionsAr: a.instructionsAr ?? a.instructions,
    templateAr: a.templateAr ?? a.template,
    modelArtifactAr: a.modelArtifactAr ?? a.modelArtifact,
  };
}

function enrichCase(c: CaseStudyUpdate): CaseStudyUpdate {
  if (c.dayFocusAr && c.narrativeAr) return c;
  return {
    ...c,
    dayFocusAr: c.dayFocusAr ?? c.dayFocus,
    narrativeAr: c.narrativeAr ?? c.narrative,
    newInformationAr: c.newInformationAr ?? c.newInformation,
    requiredActionAr: c.requiredActionAr ?? c.requiredAction,
    modelResponseAr: c.modelResponseAr ?? c.modelResponse,
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

function enrichInterview(i: InterviewPrep): InterviewPrep {
  if (i.questionAr) return i;
  return {
    ...i,
    questionAr: i.question,
    modelAnswerAr: i.modelAnswer,
    followUpsAr: i.followUps,
  };
}

/**
 * Ensures a day curriculum has Arabic material for lesson bodies and practice UI.
 * Days 2–20 already ship handcrafted Arabic from createFullDay; Day 1 is enriched here.
 */
export function enrichDayArabic(day: DayCurriculum): DayCurriculum {
  return {
    ...day,
    prerequisitesAr: day.prerequisitesAr ?? day.prerequisites,
    productOwnerResponsibilityAr: day.productOwnerResponsibilityAr ?? day.productOwnerResponsibility,
    notProductOwnerResponsibilityAr: day.notProductOwnerResponsibilityAr ?? day.notProductOwnerResponsibility,
    lessonSummaryAr: day.lessonSummaryAr ?? day.lessonSummary,
    revisionChecklistAr: day.revisionChecklistAr ?? day.revisionChecklist,
    sections: day.sections.map((s) => enrichSection(s, day.titleAr)),
    guidedExercise: enrichExercise(day.guidedExercise),
    independentExercise: enrichExercise(day.independentExercise),
    additionalPractice: enrichExercise(day.additionalPractice),
    stakeholderScenario: enrichScenario(day.stakeholderScenario),
    productDecisionChallenge: enrichScenario(day.productDecisionChallenge),
    artifactActivity: enrichArtifact(day.artifactActivity),
    caseStudyUpdate: enrichCase(day.caseStudyUpdate),
    interviewPrep: enrichInterview(day.interviewPrep),
    quiz: day.quiz.map(enrichQuiz),
    exam: day.exam.map(enrichQuiz),
  };
}
