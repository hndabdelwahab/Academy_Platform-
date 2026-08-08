import type { DayCurriculum, QuizQuestion, SectionContentLocale } from '@/types';
import { enrichDayArabic } from '@/curriculum/enrichArabic';

const SECTION_AR: Record<string, { titleAr: string; ar: SectionContentLocale; prompt?: { questionAr: string; hintAr?: string; modelAnswerAr?: string } }> = {
  's1-runtime': {
    titleAr: 'ما هو وقت التشغيل؟ ولماذا توجد البرامج؟',
    ar: {
      simpleExplanation: 'البرنامج مجموعة تعليمات يكتبها المطوّر ليخبر الحاسوب ماذا يفعل خطوة بخطوة. فكّر فيه كوصفة: الوصفة (الشيفرة المصدرية) مقروءة للبشر، لكن المطبخ (الحاسوب) يحتاج شيئًا يقرأ الوصفة وينفّذ كل خطوة. ذلك الشيء هو وقت التشغيل — البيئة التي تشغّل شيفرتك فعليًا. عندما تضغط «تأكيد» على أمر بيع في Odoo يعمل برنامج. عندما تشغّل استعلام SQL يعالجه برنامج. كل شيء في البرمجيات هو برامج تنفّذ تعليمات.',
      professionalDefinition: 'بيئة وقت التشغيل هي البنية التحتية التي تنفّذ شيفرة البرنامج، وتدير تخصيص الذاكرة ونطاق المتغيرات واستدعاءات الدوال والوصول لموارد النظام. تشمل المفسّر أو الآلة الافتراضية والمكتبات القياسية وسياق التنفيذ.',
      whyItExists: 'قبل اللغات عالية المستوى كان المطوّرون يكتبون شيفرة آلة مباشرة. ذلك كان بطيئًا ومعرّضًا للأخطاء. وُجدت لغات مثل Python وC# وJavaScript ليكتب البشر تعليمات مقروءة تُترجم لعمليات الآلة، ويتولى وقت التشغيل التفاصيل منخفضة المستوى.',
      howItWorks: 'عند تشغيل سكربت Python: (1) نظام التشغيل يجد مفسّر Python. (2) يقرأ الملف سطرًا بسطر. (3) يُحلل كل سطر إلى شجرة بناء جملة مجردة. (4) تُترجم إلى bytecode. (5) تنفّذ آلة Python الافتراضية التعليمات. (6) تُدار الذاكرة والمتغيرات. (7) تُرسل المخرجات أو تُعاد القيم عبر مكدس الاستدعاء.',
      erpExample: 'عندما يضغط مستخدم المستودع «تحقق من التحويل»: JavaScript في المتصفح يرسل HTTP POST → متحكّم Odoo يستقبل الطلب → دالة نموذج Python تشغّل التحقق → ORM يولّد SQL UPDATE → PostgreSQL يثبّت المعاملة → تعود الاستجابة للمتصفح → تتحدث الواجهة.',
      odooConnection: 'Odoo نفسه يعمل على وقت تشغيل Python. عند تشغيل ./odoo-bin تشغّل مفسّر Python مع قاعدة شيفرة Odoo. كل نقرة زر تشغّل دوال Python تتفاعل مع PostgreSQL عبر طبقة ORM.',
      realProjectRecognition: 'عند فتح مشروع مجهول ابحث عن: main.py أو app.py، أو scripts في package.json، أو Program.cs، أو manage.py. نقطة الدخول تخبرك بأي وقت تشغيل يعمل المشروع.',
      commonMistakes: [
        { wrong: 'اعتقاد أن ملف .py ينفّذ نفسه على الحاسوب', right: 'مفسّر Python يقرأ الملف وينفّذه', explanation: 'الملف نص فقط؛ يجب تثبيت المفسّر واستدعاؤه.' },
        { wrong: 'افتراض أن الشيفرة تعمل دفعة واحدة كالوثيقة', right: 'التنفيذ متسلسل سطرًا بسطر ما لم يغيّر تدفق التحكم الترتيب', explanation: 'التنفيذ يتبع مكدس الاستدعاء.' },
      ],
      interviewTerminology: '«بيئة وقت التشغيل هي سياق التنفيذ الذي يدير تشغيل الشيفرة والذاكرة وتفاعلات النظام. في مكدس ERP لدينا، يعمل Odoo على وقت تشغيل Python.»',
    },
    prompt: {
      questionAr: 'بعباراتك: عندما ينقر مستخدم زرًا في Odoo، اذكر على الأقل 3 أوقات تشغيل/بيئات تنفيذ مختلفة تعالج الطلب قبل تحديث قاعدة البيانات.',
      hintAr: 'فكّر في: المتصفح، خادم الويب، Python، قاعدة البيانات',
      modelAnswerAr: 'وقت تشغيل JavaScript في المتصفح يعالج النقرة، طبقة الخادم/HTTP توجّه الطلب، وقت تشغيل Python ينفّذ دوال نماذج Odoo، وPostgreSQL ينفّذ استعلامات SQL.',
    },
  },
  's2-compiled-vs-interpreted': {
    titleAr: 'اللغات المترجمة مقابل المفسَّرة',
    ar: {
      simpleExplanation: 'بعض اللغات (C#، Java) مترجمة — يُحوَّل البرنامج بالكامل إلى شيفرة آلة قبل التشغيل. لغات أخرى (Python، JavaScript) مفسَّرة — يقرأ المترجم وينفّذ سطرًا بسطر أثناء التشغيل. أنظمة ERP تستخدم الاثنين: باكند Odoo Python مفسَّر، وكثير من التكاملات C# أو Java مترجمة.',
      professionalDefinition: 'اللغات المترجمة تحوّل المصدر إلى شيفرة آلة أو bytecode عبر مترجم قبل التنفيذ. اللغات المفسَّرة تحلل وتنفّذ المصدر وقت التشغيل عبر مفسّر.',
      whyItExists: 'الحواسيب المبكرة فهمت شيفرة الآلة فقط. وُجدت المترجمات ثم المفسّرات للمرونة والتطوير التفاعلي. الأنظمة الحديثة تمزج النهجين غالبًا.',
      howItWorks: 'مترجم (C#): مصدر → مترجم → IL → CLR/JIT → شيفرة آلة. مفسَّر (Python): مصدر → قراءة سطر → تحليل → bytecode → تنفيذ PVM → السطر التالي.',
      syntax: [
        { piece: 'ترجمة C#', explanation: 'dotnet build يترجم ملفات .cs إلى تجميعة .dll. dotnet run ينفّذ الناتج.' },
        { piece: 'تفسير Python', explanation: 'python script.py — المفسّر يقرأ وينفّذ فورًا بلا خطوة بناء منفصلة.' },
      ],
      erpExample: 'وحدات Odoo Python — تعدّل وتعيد تشغيل الخادم. خدمة تكامل C# تحتاج بناء قبل النشر. ذلك يؤثر على سرعة الاختبار واكتشاف أخطاء الأنواع.',
      odooConnection: 'يستفيد Odoo من طبيعة Python المفسَّرة لنظام الوحدات. عند تثبيت وحدة يستورد Python ملفاتك مباشرة، لذلك أخطاء الصياغة قد توقف الخادم عند الإقلاع.',
      realProjectRecognition: 'ابحث عن مخرجات البناء (.dll/.exe) للمترجم، أو ملفات .py فقط للمفسَّر.',
      commonMistakes: [
        { wrong: 'المترجم أفضل دائمًا من المفسَّر', right: 'لكل مقايضات: مترجم = تنفيذ أسرع واكتشاف مبكر؛ مفسَّر = تطوير أسرع ومرونة أكبر', explanation: 'اختار Odoo Python لإنتاجية المطوّر.' },
      ],
      interviewTerminology: '«Python مفسَّرة، لذا تُحمَّل وحدات Odoo عند إقلاع الخادم دون ترجمة منفصلة.»',
    },
    prompt: {
      questionAr: 'توقّع مخرجات مثال الشيفرة أعلاه قبل تشغيله. اكتب بالضبط ما تتوقع أن يظهره كل print.',
      modelAnswerAr: 'System: Acme ERP Solutions، Active users: 42، Environment: Production',
    },
  },
  's3-data-types': {
    titleAr: 'المتغيرات وأنواع البيانات',
    ar: {
      simpleExplanation: 'المتغير حاوية مسماة تحمل قيمة في ذاكرة الحاسوب. نوع البيانات يخبر الحاسوب بنوع القيمة — رقم أو نص أو صح/خطأ أو قائمة. في ERP: اسم العميل نص، المبلغ رقم، علامة التأكيد صح/خطأ.',
      professionalDefinition: 'المتغير اسم رمزي مرتبط بكائن في الذاكرة أثناء التنفيذ. أنواع البيانات تحدد القيم والعمليات الممكنة. Python تستخدم كتابة ديناميكية.',
      whyItExists: 'البرامج تحتاج تخزين البيانات ومعالجتها. بدون متغيرات لا تتتبع اسم عميل عبر الدوال ولا تجمع الإجماليات.',
      howItWorks: 'عند تنفيذ price = 99.50 تنشئ Python كائن float وتربط الاسم price به في مساحة الأسماء الحالية.',
      erpExample: 'حقول أمر البيع مثل partner_id وamount_total وstate هي قيم بأنواع مختلفة يجب التعامل معها بشكل صحيح.',
      odooConnection: 'حقول Odoo ORM لها أنواع (Char، Float، Boolean، Many2one) تقابل أنواع Python/قاعدة البيانات.',
      realProjectRecognition: 'عند قراءة شيفرة انظر لتعيينات المتغيرات وأنواع القيم المستخدمة في الحسابات والشروط.',
      commonMistakes: [
        { wrong: 'خلط نص رقمي مع رقم حقيقي في الحساب', right: 'حوّل الأنواع صراحة قبل العمليات الحسابية', explanation: 'في Python قد يعطي "5"*2 تكرار نص لا ضربًا.' },
      ],
      interviewTerminology: '«المتغير مرجع لقيمة في الذاكرة؛ نوع البيانات يحدد العمليات الآمنة.»',
    },
    prompt: {
      questionAr: 'ماذا يحدث إذا غيّرت السطر إلى quantity = "5" (نص)؟ توقّع الخطأ أو المخرج غير المتوقع.',
      modelAnswerAr: 'قد يحدث تكرار نص أو TypeError عند الجمع مع أرقام حسب بقية الشيفرة.',
    },
  },
  's4-erp-transaction': {
    titleAr: 'كيف تتدفق معاملة ERP من البداية للنهاية',
    ar: {
      simpleExplanation: 'كل إجراء مستخدم في ERP يمر بطبقات: واجهة → شبكة/API → منطق أعمال → قاعدة بيانات → استجابة. فهم التدفق يساعدك على تشخيص «الزر لا يفعل شيئًا».',
      professionalDefinition: 'معاملة ERP مسار طلب متعدد الطبقات يطبّق قواعد العمل ويحافظ على تناسق البيانات عبر واجهة وخدمات وORM وقاعدة بيانات.',
      whyItExists: 'أنظمة المؤسسات تفصل الاهتمامات حتى يمكن تطوير الواجهة والمنطق والبيانات وصيانتها بأمان.',
      howItWorks: 'نقرة → حدث JS → طلب HTTP → متحكّم → تحقق صلاحيات → منطق نموذج → SQL → التزام → JSON/HTML → تحديث UI.',
      erpExample: 'تأكيد أمر البيع يتحقق من المخزون والأسعار والحالة قبل تغيير state وكتابة الحركات.',
      odooConnection: 'في Odoo غالبًا: زر في XML يستدعي method في النموذج عبر RPC، ثم يكتب عبر ORM.',
      realProjectRecognition: 'ابدأ من الزر أو المسار، ثم تابع إلى المتحكّم/الدالة ثم الاستعلام.',
      commonMistakes: [
        { wrong: 'افتراض أن المشكلة دائمًا في قاعدة البيانات', right: 'تحقق من الشبكة والصلاحيات والاستثناءات في Python أولًا', explanation: 'كثير من الأعطال يتوقف قبل SQL.' },
      ],
      interviewTerminology: '«أشخّص معاملات ERP بتحديد الطبقة التي تفشل باستخدام السجلات والاستجابات والاستعلامات.»',
    },
    prompt: {
      questionAr: 'مستخدم يقول «زر التأكيد لا يفعل شيئًا.» أين تحقق أولًا وما الدليل الذي تبحث عنه؟',
      modelAnswerAr: 'أولًا أدوات المطوّر في المتصفح (أخطاء JS/طلبات الشبكة)، ثم سجلات Odoo/Python، ثم الصلاحيات، ثم استعلامات SQL إن لزم.',
    },
  },
  's5-scope-execution': {
    titleAr: 'النطاق وتدفق التنفيذ',
    ar: {
      simpleExplanation: 'النطاق يحدد أين يكون اسم المتغير مرئيًا. تدفق التنفيذ هو ترتيب تشغيل التعليمات واستدعاء الدوال وعودتها.',
      professionalDefinition: 'نطاق Python يتبع LEGB: Local ثم Enclosing ثم Global ثم Built-in. مكدس الاستدعاء يتتبع الدوال النشطة.',
      whyItExists: 'بدون نطاق تتصادم الأسماء؛ وبدون فهم التدفق يصعب تتبع الأخطاء والقيم المعادة.',
      howItWorks: 'عند استدعاء دالة تُنشأ إطار محلي؛ عند return يُزال الإطار وتعود القيمة للمستدعي.',
      erpExample: 'دالة تحسب إجمالي البنود تُستدعى لكل سطر؛ المتغيرات المحلية لا تتسرب بين الاستدعاءات.',
      odooConnection: 'دوال النماذج تستخدم self والبيئة؛ فهم النطاق يمنع أخطاء متغيرات غير معرّفة.',
      realProjectRecognition: 'عند قراءة دالة تتبع من أين تأتي الأسماء وهل هي محلية أو حقول سجل.',
      commonMistakes: [
        { wrong: 'تعديل متغير عام دون فهم الآثار الجانبية', right: 'فضّل تمرير القيم وإرجاع النتائج', explanation: 'الحالة العالمية تصعّب الاختبار في ERP.' },
      ],
      interviewTerminology: '«أستخدم LEGB ومكدس الاستدعاء لشرح أين تُرى القيم وكيف يتدفق التنفيذ.»',
    },
    prompt: {
      questionAr: 'تتبع التنفيذ: عند تشغيل process_order كم مرة تُستدعى calculate_line_total وماذا يعيد كل استدعاء؟',
      modelAnswerAr: 'يعتمد على عدد بنود الأمر في المثال؛ كل استدعاء يعيد حاصل الكمية × السعر لذلك البند.',
    },
  },
};

const QUIZ_AR: Record<string, Pick<QuizQuestion, 'questionAr' | 'optionsAr' | 'correctAnswerAr' | 'explanationAr'>> = {
  'q1-d1': {
    questionAr: 'ما هي بيئة وقت التشغيل؟',
    optionsAr: ['نوع من المتغيرات', 'البنية التحتية التي تنفّذ شيفرة البرنامج', 'اتصال قاعدة بيانات', 'إطار عمل CSS'],
    correctAnswerAr: 'البنية التحتية التي تنفّذ شيفرة البرنامج',
    explanationAr: 'وقت التشغيل يدير تنفيذ الشيفرة والذاكرة وموارد النظام.',
  },
  'q2-d1': {
    questionAr: 'أي مما يلي تعيين متغير Python صالح؟',
    optionsAr: ['int quantity = 5', 'quantity := 5', 'quantity = 5', 'var quantity = 5'],
    correctAnswerAr: 'quantity = 5',
    explanationAr: 'Python تستخدم تعيينًا بسيطًا name = value دون تصريح نوع أو كلمة var.',
  },
  'q3-d1': {
    questionAr: 'ماذا يطبع هذا الكود؟',
    correctAnswerAr: 'int',
    explanationAr: 'type(10) يعيد الصنف int و__name__ يعطي النص "int".',
  },
  'q4-d1': {
    questionAr: 'Python من أي نوع من اللغات؟',
    optionsAr: ['مترجمة فقط', 'مفسَّرة', 'لغة توصيف', 'لغة استعلام'],
    correctAnswerAr: 'مفسَّرة',
    explanationAr: 'شيفرة Python تنفَّذ عبر المفسّر سطرًا بسطر وقت التشغيل.',
  },
  'q5-d1': {
    questionAr: 'أي خطأ يحدث؟',
    correctAnswerAr: 'TypeError',
    explanationAr: '"99.50" * 2 يكرر النص. ثم جمع 10 مع نص يفشل بـ TypeError.',
  },
  'q6-d1': {
    questionAr: 'في هندسة ERP، أي طبقة تتحقق من قواعد العمل؟',
    optionsAr: ['طبقة قاعدة البيانات', 'طبقة التطبيق/الخدمة', 'المتصفح فقط', 'طبقة الشبكة'],
    correctAnswerAr: 'طبقة التطبيق/الخدمة',
    explanationAr: 'التحقق من قواعد العمل ينتمي لطبقة التطبيق لا لقاعدة البيانات أو الواجهة وحدها.',
  },
  'q7-d1': {
    questionAr: 'ماذا تعيد هذه الدالة عند استدعائها بـ calculate_total(3, 50.0)؟',
    correctAnswerAr: '150.0',
    explanationAr: '3 * 50.0 = 150.0 (ضرب عشري).',
  },
  'q8-d1': {
    questionAr: 'ما مخرجات: print(f"Order: {1001}")؟',
    optionsAr: ['Order: {1001}', 'f"Order: {1001}"', 'Order: 1001', 'Error'],
    correctAnswerAr: 'Order: 1001',
    explanationAr: 'f-strings تقيّم التعبيرات داخل الأقواس المعقوفة.',
  },
  'q9-d1': {
    questionAr: 'عند تشخيص «الزر لا يفعل شيئًا» في Odoo، ماذا تفحص أولًا؟',
    optionsAr: ['إعادة تشغيل الخادم', 'تبويب الشبكة في أدوات المطوّر لطلب HTTP', 'حذف السجل', 'إعادة تثبيت الوحدة'],
    correctAnswerAr: 'تبويب الشبكة في أدوات المطوّر لطلب HTTP',
    explanationAr: 'تحقق دائمًا مما إذا أرسلت الواجهة طلبًا وما الاستجابة.',
  },
  'q10-d1': {
    questionAr: 'ماذا يعني LEGB في حل نطاق Python؟',
    optionsAr: ['Loop, Execute, Global, Build', 'Local, Enclosing, Global, Built-in', 'List, Enum, Generate, Binary', 'Load, Execute, Generate, Boot'],
    correctAnswerAr: 'Local, Enclosing, Global, Built-in',
    explanationAr: 'تبحث Python عن الأسماء بهذا الترتيب: محلي → محيط → عام → مدمج.',
  },
  'e1-d1': {
    questionAr: 'اكتب دالة validate_quantity(qty) تعيد True إذا كانت qty رقمًا موجبًا، وإلا False.',
    correctAnswerAr: 'def validate_quantity(qty): return qty > 0',
    explanationAr: 'مقارنة بسيطة: يجب أن تكون الكمية أكبر من صفر.',
  },
  'e2-d1': {
    questionAr: 'اشرح ماذا تفعل هذه الشيفرة بأسلوب Odoo في جملة واحدة:',
    correctAnswerAr: 'تبحث عن حتى 5 أوامر بيع في حالة مسودة',
    explanationAr: 'search() مع فلتر domain ومعامل limit.',
  },
  'e3-d1': {
    questionAr: 'أي مما يلي ليس نوع بيانات في Python؟',
    optionsAr: ['int', 'str', 'bool', 'varchar'],
    correctAnswerAr: 'varchar',
    explanationAr: 'varchar نوع SQL. Python تستخدم str للنص.',
  },
  'e4-d1': {
    questionAr: 'ما المخرجات؟',
    correctAnswerAr: 'True',
    explanationAr: 'True and False = False. False or True = True.',
  },
  'e5-d1': {
    questionAr: 'رتّب الطبقات بشكل صحيح لمعاملة ERP (من الأولى للأخيرة):',
    optionsAr: [
      'قاعدة البيانات → الباكند → API → الواجهة',
      'الواجهة → API → الباكند → قاعدة البيانات',
      'الباكند → الواجهة → قاعدة البيانات → API',
      'API → قاعدة البيانات → الواجهة → الباكند',
    ],
    correctAnswerAr: 'الواجهة → API → الباكند → قاعدة البيانات',
    explanationAr: 'تفاعل المستخدم يبدأ من الواجهة ويمر عبر API إلى الباكند ثم قاعدة البيانات.',
  },
};

function patchQuiz(list: QuizQuestion[]): QuizQuestion[] {
  return list.map((q) => {
    const ar = QUIZ_AR[q.id];
    if (!ar) return q;
    return {
      ...q,
      ...ar,
      // Keep grading stable: store English option values in UI; Arabic is display-only when optionsAr provided.
      correctAnswerAr: ar.correctAnswerAr || q.correctAnswer,
    };
  });
}

export function finalizeDay01(raw: DayCurriculum): DayCurriculum {
  const enriched = enrichDayArabic({
    ...raw,
    titleAr: 'كيف تعمل البرمجيات',
    subtitleAr: 'النموذج الذهني للمطوّر',
    objectivesAr: [
      'فهم ما يحدث عند تشغيل الشيفرة — من الملف المصدر إلى التنفيذ',
      'التمييز بين اللغات المترجمة والمفسَّرة، والكتابة الثابتة والديناميكية',
      'تتبع معاملة ERP من النهاية للنهاية: واجهة → API → باكند → قاعدة بيانات',
      'كتابة أول سكربت Python بالمتغيرات وأنواع البيانات',
      'قراءة شيفرة Python غير مألوفة ووصف ما تفعله',
      'ربط كل مفهوم بمكافئات ERP/Odoo التي تعرفها',
    ],
  });

  return {
    ...enriched,
    sections: enriched.sections.map((section) => {
      const pack = SECTION_AR[section.id];
      if (!pack) return section;
      return {
        ...section,
        titleAr: pack.titleAr,
        content: { ...section.content, ar: pack.ar },
        requiresAnswer: section.requiresAnswer
          ? {
              ...section.requiresAnswer,
              questionAr: pack.prompt?.questionAr ?? section.requiresAnswer.questionAr,
              hintAr: pack.prompt?.hintAr ?? section.requiresAnswer.hintAr,
              modelAnswerAr: pack.prompt?.modelAnswerAr ?? section.requiresAnswer.modelAnswerAr,
            }
          : section.requiresAnswer,
      };
    }),
    quiz: patchQuiz(enriched.quiz),
    exam: patchQuiz(enriched.exam),
    codeReadingExercise: {
      ...enriched.codeReadingExercise,
      titleAr: 'اقرأ دالة موافقة بأسلوب Odoo',
      descriptionAr: 'اقرأ الدالة وأجب عن أسئلة التحقق والصلاحيات ومسار التنفيذ.',
      questions: enriched.codeReadingExercise.questions.map((q, i) => ({
        ...q,
        questionAr: [
          'ما كل فحوصات التحقق التي تُنفَّذ قبل تغيير حالة الأمر؟',
          'أي نوع خطأ يُرفع إذا افتقد المستخدم الصلاحية؟ ما الفرق بين ValueError وPermissionError هنا؟',
          'إذا استُدعيت الدالة بأمر في حالة confirmed ماذا يحدث؟ تتبع المسار بدقة.',
        ][i] ?? q.questionAr,
      })),
    },
    challenges: enriched.challenges.map((c, i) => ({
      ...c,
      titleAr: i === 0 ? 'سكربت معلومات نظام ERP' : 'احسب إجمالي بند الأمر',
      descriptionAr: c.descriptionAr,
      hintsAr: c.hints,
    })),
    debuggingChallenge: {
      ...enriched.debuggingChallenge,
      titleAr: 'أصلح دالة التحقق من المخزون',
      scenarioAr: enriched.debuggingChallenge.scenario,
      explanationAr: enriched.debuggingChallenge.explanation,
    },
    erpScenario: {
      ...enriched.erpScenario,
      titleAr: 'تتبع اعتماد أمر بيع في Odoo',
      businessContextAr: enriched.erpScenario.businessContext,
      technicalChallengeAr: enriched.erpScenario.technicalChallenge,
      questionsAr: enriched.erpScenario.questions,
      connectionAr: enriched.erpScenario.connection,
    },
  };
}
