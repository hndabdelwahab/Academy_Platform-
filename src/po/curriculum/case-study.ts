/**
 * Continuous product case study used across all 20 days.
 * Horizon ERP — mid-market ERP for manufacturing and distribution.
 * The learner acts as Product Owner for Inventory & Warehouse (then expands).
 */

export const CASE_STUDY = {
  companyName: 'Meridian Manufacturing Group',
  productName: 'Horizon ERP',
  moduleFocus: 'Inventory & Warehouse Management',
  industry: 'Discrete manufacturing and regional distribution',
  companyBackground:
    'Meridian Manufacturing Group operates three plants and two distribution centers. They currently run a mix of spreadsheets, an aging inventory system, and email-based approvals. Leadership wants a modern ERP module that reduces stockouts, improves inventory accuracy, and shortens order-to-ship time.',
  productVisionSeed:
    'Help Meridian teams always know what stock they have, where it is, and what they can promise customers — without relying on spreadsheets or tribal knowledge.',
  primaryUsers: [
    'Warehouse Operator',
    'Inventory Controller',
    'Purchasing Planner',
    'Customer Service Agent',
    'Plant Supervisor',
  ],
  customers: [
    'Meridian Manufacturing Group (buying organization)',
    'Plant Operations leadership',
    'Finance (inventory valuation stakeholders)',
  ],
  sponsors: ['Chief Operating Officer', 'Head of Supply Chain'],
  constraints: [
    'Must integrate with existing Finance and Sales modules later',
    'Must support multi-warehouse operations',
    'Must work for users with limited English reading fluency on the warehouse floor',
    'Must produce auditable stock movements for finance',
  ],
  initialStakeholderRequest:
    'We need a barcode scanning app for the warehouse so people stop making mistakes. Build it this quarter.',
  hiddenProblems: [
    'Inventory accuracy is around 78% in cycle counts',
    'Customer Service over-promises delivery dates because available-to-promise data is unreliable',
    'Transfers between warehouses are tracked in email',
    'Negative stock balances appear because receipts are posted late',
    'Nobody owns a single prioritized backlog; departments email "urgent" requests daily',
  ],
  valueOutcomes: [
    'Increase inventory accuracy from 78% to 95%+',
    'Reduce stockout-related delayed shipments by 40%',
    'Cut average time to confirm available stock from 25 minutes to under 2 minutes',
    'Create a transparent, ordered Product Backlog owned by one Product Owner',
  ],
} as const;

export function caseStudyDayNarrative(dayNumber: number): string {
  const narratives: Record<number, string> = {
    1: 'You have just been appointed Product Owner for Horizon ERP Inventory & Warehouse. Leadership expects you to "own the product," but people still treat every request as a project ticket.',
    2: 'Meridian previously ran a 9-month waterfall inventory rewrite that failed. Leadership now says "we are Agile," but still asks for a fixed 40-item scope document before any Sprint starts.',
    3: 'A Scrum Master has been assigned. Developers ask whether they should wait for a full requirements document. Stakeholders ask when the "final design" will be approved.',
    4: 'A Business Analyst offers to "write all the stories for you." A Project Manager asks for a Gantt chart. UX wants research time. Clarify who decides what.',
    5: 'The COO asks for "a barcode app." You must translate that into Product Vision, Strategy, and a Product Goal before committing to solution details.',
    6: 'Warehouse Supervisors, Finance, Customer Service, and IT all claim priority. Two sponsors disagree on what success means.',
    7: 'You discover the barcode request may be a solution looking for a problem. Inventory accuracy and late receipts appear more foundational.',
    8: 'Stakeholders dump 60 requests into a shared spreadsheet. You must organize them into a requirements and backlog hierarchy.',
    9: 'Developers complain that stories are too vague or too technical. You must write professional User Stories that deliver user value.',
    10: 'QA asks how they will know work is done. Finance asks about valuation rules. You must write Acceptance Criteria and business rules.',
    11: 'You create the first transparent Product Backlog. Outdated items and duplicate requests compete with high-value outcomes.',
    12: 'Everything is labeled urgent. You must prioritize with clear rationale and negotiate with sponsors.',
    13: 'The team estimates the top backlog. Leadership asks for a release date. You must forecast without turning estimates into false commitments.',
    14: 'Items selected for the next Sprint are not ready. You facilitate refinement and apply a Definition of Ready.',
    15: 'Sprint Planning begins. Capacity is limited. You negotiate scope around a clear Sprint Goal.',
    16: 'Mid-Sprint, Customer Service demands an emergency screen change. A bug appears in receiving. Protect the Sprint Goal professionally.',
    17: 'An Increment is offered for acceptance. Some Acceptance Criteria pass; one critical business rule fails. Decide accept/reject with evidence.',
    18: 'Sprint Review feedback conflicts. Retrospective reveals refinement quality issues. Adapt backlog and process.',
    19: 'Leadership wants a roadmap and release plan. Define MVP/MMP and outcome metrics, not vanity charts.',
    20: 'You run the full Product Owner simulation end-to-end for a new unclear request: "Add AI to warehouse planning."',
  };
  return narratives[dayNumber] ?? CASE_STUDY.companyBackground;
}

export function caseStudyDayNarrativeAr(dayNumber: number): string {
  const narratives: Record<number, string> = {
    1: 'تم تعيينك للتو مالك منتج لمخزون ومستودع Horizon ERP. تتوقع القيادة أن «تملك المنتج»، لكن الناس ما زالوا يعاملون كل طلب كتذكرة مشروع.',
    2: 'سبق أن نفّذت ميريديان إعادة كتابة شلالية للمخزون لمدة 9 أشهر وفشلت. تقول القيادة الآن «نحن أجايل»، لكنها ما زالت تطلب وثيقة نطاق ثابتة من 40 بندًا قبل أي سباق.',
    3: 'تم تعيين سكرم ماستر. يسأل المطورون إن كان عليهم انتظار وثيقة متطلبات كاملة. يسأل أصحاب المصلحة متى سيُعتمد «التصميم النهائي».',
    4: 'يعرض محلل أعمال أن «يكتب كل القصص عنك». يطلب مدير مشروع مخطط غانت. يريد UX وقت بحث. وضّح من يقرر ماذا.',
    5: 'يطلب المدير التشغيلي «تطبيق باركود». يجب أن تحوّل ذلك إلى رؤية منتج واستراتيجية وهدف منتج قبل الالتزام بتفاصيل الحل.',
    6: 'مشرفو المستودع والمالية وخدمة العملاء وتقنية المعلومات يدّعون جميعًا الأولوية. راعيان يختلفان حول معنى النجاح.',
    7: 'تكتشف أن طلب الباركود قد يكون حلًا يبحث عن مشكلة. تبدو دقة المخزون والإيصالات المتأخرة أكثر أساسية.',
    8: 'يرمي أصحاب المصلحة 60 طلبًا في جدول مشترك. يجب أن تنظّمها في تسلسل متطلبات وقائمة مهام.',
    9: 'يشكو المطورون أن القصص غامضة جدًا أو تقنية جدًا. يجب أن تكتب قصص مستخدم احترافية تقدّم قيمة للمستخدم.',
    10: 'يسأل ضمان الجودة كيف يعرفون أن العمل منجز. تسأل المالية عن قواعد التقييم. يجب كتابة معايير قبول وقواعد عمل.',
    11: 'تنشئ أول قائمة مهام منتج شفافة. عناصر قديمة وطلبات مكررة تتنافس مع نتائج عالية القيمة.',
    12: 'كل شيء يُوسم بالعاجل. يجب أن ترتّب الأولويات بمنطق واضح وتتفاوض مع الرعاة.',
    13: 'يقدّر الفريق أعلى القائمة. تطلب القيادة تاريخ إصدار. يجب التنبؤ دون تحويل التقديرات إلى التزامات زائفة.',
    14: 'العناصر المختارة للسباق التالي غير جاهزة. تيسّر التنقيح وتطبّق تعريف الجاهزية.',
    15: 'يبدأ تخطيط السباق. السعة محدودة. تتفاوض على النطاق حول هدف سباق واضح.',
    16: 'في منتصف السباق، تطلب خدمة العملاء تغيير شاشة طارئًا. يظهر عيب في الاستلام. احمِ هدف السباق بمهنية.',
    17: 'تُعرض زيادة للقبول. بعض معايير القبول تنجح؛ قاعدة عمل حرجة تفشل. قرّر القبول/الرفض بالأدلة.',
    18: 'تغذية مراجعة السباق متعارضة. يكشف الاستعراض مشكلات جودة التنقيح. تكيّف القائمة والعملية.',
    19: 'تريد القيادة خارطة طريق وخطة إصدار. عرّف MVP/MMP ومقاييس نتائج لا مخططات شكلية.',
    20: 'تشغّل محاكاة مالك المنتج الكاملة من البداية للنهاية لطلب جديد غير واضح: «أضف ذكاءً اصطناعيًا لتخطيط المستودع.»',
  };
  return narratives[dayNumber] ?? CASE_STUDY.companyBackground;
}
