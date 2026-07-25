import type { DayCurriculum } from '@/po/types';
import {
  deepConcept, mcq, scenarioQ, shortAnswer, exercise, artifact, decision,
  interview, caseUpdate, table, steps, mistakes, prompt,
} from '@/po/curriculum/helpers';
import { CASE_STUDY, caseStudyDayNarrative } from '@/po/curriculum/case-study';

export const day01: DayCurriculum = {
  dayNumber: 1,
  title: 'Products, Projects, and Product Ownership',
  titleAr: 'المنتجات والمشاريع وملكية المنتج',
  subtitle: 'What a Product Owner owns and why it matters',
  subtitleAr: 'ما يملكه مالك المنتج ولماذا يهم',
  difficulty: 'foundation',
  estimatedHours: 4,
  prerequisites: [
    'Complete the initial Product Owner readiness assessment',
    'No prior Product Owner, Agile, or Scrum experience required',
    'No software development experience required',
  ],
  topics: ['product_ownership'],
  objectives: [
    'Explain what a product is and how it differs from a project in plain language',
    'Describe the product lifecycle stages and where Product Ownership decisions appear',
    'State the purpose, accountabilities, and authority of a Product Owner',
    'Distinguish Product Owner work from Project Manager and Business Analyst work',
    'Identify daily Product Owner activities and decision ownership',
    'Produce a Product Owner Responsibility Map for the Horizon ERP case study',
  ],
  objectivesAr: [
    'شرح ما هو المنتج وكيف يختلف عن المشروع بلغة بسيطة',
    'وصف مراحل دورة حياة المنتج وأين تظهر قرارات ملكية المنتج',
    'بيان غرض مالك المنتج ومسؤولياته وصلاحياته',
    'التمييز بين عمل مالك المنتج ومدير المشروع ومحلل الأعمال',
    'تحديد الأنشطة اليومية لمالك المنتج وملكية القرار',
    'إنتاج خريطة مسؤوليات مالك المنتج لدراسة حالة Horizon ERP',
  ],
  keyTerminology: [
    'product', 'project', 'product_owner', 'product_value', 'product_lifecycle',
    'stakeholder', 'user', 'customer', 'accountability', 'authority',
  ],
  sections: [
    deepConcept({
      id: 'd1-s1-product',
      title: 'What Is a Product?',
      titleAr: 'ما هو المنتج؟',
      content: {
        conceptIntroduction:
          'Before you can own a product, you must understand what a product is. Many beginners confuse a product with a project, a feature request, or a department wish list. This section builds the foundation for everything that follows in the academy.',
        simpleExplanation:
          'A product is something that is created and continuously improved to help specific people achieve outcomes they care about. It has users, it delivers value over time, and it usually continues to exist after the first version is released. A bicycle is a product. A banking mobile app is a product. An ERP Inventory module is a product. The important idea: a product is not "done forever" after one delivery. It lives, learns from use, and evolves.',
        businessProblem:
          'Organizations waste money when they treat lasting business capabilities as one-time deliveries. Teams build something, declare victory, and move on — even when users still struggle and value is incomplete.',
        professionalDefinition:
          'A product is a vehicle for delivering value. It is managed over its lifecycle to solve problems for users and customers while advancing organizational objectives. In digital contexts, a product typically includes the experience, capabilities, data, and supporting services that together produce outcomes.',
        whyImportant:
          'If you cannot define the product, you cannot prioritize it, measure it, or accept responsibility for its value. Product Owners who think only in tickets become request processors, not value maximizers.',
        lifecycleLocation:
          'Product thinking spans the entire lifecycle: discovery, strategy, delivery, release, adoption, measurement, and retirement or replacement.',
        howItWorks:
          '1) Identify whose problem the product addresses. 2) Define the value it should create. 3) Deliver usable slices over time. 4) Observe real usage. 5) Adapt the product based on evidence. 6) Continue until the product is no longer the best way to deliver that value.',
        whoResponsible:
          'The Product Owner is accountable for maximizing the value of the product resulting from the work of the team. Broader product strategy may involve Product Managers and sponsors, but day-to-day value ordering for the team\'s product sits with the Product Owner.',
        whoParticipates:
          'Users, customers, sponsors, Developers, designers, Scrum Master/facilitators, support, and other stakeholders all influence the product — but they do not replace Product Owner accountability.',
        requiredInputs:
          'Business objectives, user needs, constraints, market or operational context, feedback from previous increments, and known risks.',
        activities:
          'Define product boundaries, clarify users and customers, describe value outcomes, identify what is in and out of product scope, and communicate product purpose.',
        expectedOutputs:
          'A clear product definition, target users, value outcomes, and shared understanding of what the team is building and evolving.',
        simpleExample:
          'A neighborhood bakery\'s product is not "buy an oven." The product is reliable fresh bread and pastries that customers return for. Equipment, recipes, and staffing are means to that product value.',
        softwareExample:
          'A ride-hailing app is a product. Version 1.0 may only allow booking a car. Later versions add payments, ratings, and safety features. The product continues; projects may exist inside its journey.',
        erpExample:
          `${CASE_STUDY.productName} Inventory & Warehouse Management is a product. It helps warehouse operators, inventory controllers, and customer service agents know what stock exists, where it is, and what can be promised. Barcode hardware is not the product; reliable inventory truth and operational flow are the product value.`,
        workedExample:
          `Product name: ${CASE_STUDY.productName} — Inventory & Warehouse\nUsers: Warehouse Operator, Inventory Controller, Customer Service Agent\nCustomer/buyer: ${CASE_STUDY.companyName} leadership / Supply Chain\nValue outcomes: inventory accuracy 95%+, faster available-to-promise answers, fewer delayed shipments\nIn scope: stock receipts, putaway, picks, transfers, adjustments, availability visibility\nOut of scope (for now): full manufacturing planning AI, payroll, CRM marketing automation`,
        comparison:
          'A product is enduring value. A feature is one capability inside a product. A project is a temporary effort that may contribute to a product.',
        commonMisunderstandings:
          'Misunderstanding: "The product is whatever IT builds." Correction: the product is the valuable capability users experience, including process and data quality — not merely screens.',
        beginnerMistakes: mistakes(
          { wrong: 'Calling every request "the product"', right: 'Define one coherent product boundary and place requests inside or outside it', explanation: 'Without a boundary, prioritization becomes politics.' },
          { wrong: 'Assuming the product ends at go-live', right: 'Plan for learning and evolution after release', explanation: 'Value is proven in use, not in launch parties.' },
        ),
        workplaceMistakes: mistakes(
          { wrong: 'Each department claims a separate "product" for the same inventory reality', right: 'Unify around one product that serves multiple personas with one backlog', explanation: 'Fragmented ownership creates conflicting rules and duplicate work.' },
        ),
        poorExample:
          'Poor product definition: "We are building screens for warehouse." This names an output, not a product value.',
        correctExample:
          'Correct: "Horizon ERP Inventory & Warehouse helps Meridian teams always know what stock they have, where it is, and what they can promise customers — without spreadsheets or tribal knowledge."',
        reflectionQuestion:
          'If barcode scanners were removed from the request, what product value would still need to exist for Meridian?',
        professionalTerminology:
          'Use "product," "users," "customers," "outcomes," and "value" precisely. Avoid calling every initiative a product.',
        interviewQuestion:
          'How do you define a product when stakeholders only talk about features and deadlines?',
        interviewModelAnswer:
          'I separate the enduring value vehicle from temporary delivery efforts. I identify users, customers, outcomes, and boundaries. Then I show how features are options for delivering those outcomes, not the definition of the product itself. In ERP work, I define the operational capability — for example inventory truth and warehouse flow — as the product, and treat scanners, screens, and integrations as solution choices inside that product.',
        processSteps: steps(
          { id: 'p1', label: 'Name the product', description: 'Give the product a clear business name and boundary.' },
          { id: 'p2', label: 'Name users and customers', description: 'Separate who uses it from who pays for or sponsors it.' },
          { id: 'p3', label: 'Name outcomes', description: 'Describe measurable or observable value improvements.' },
          { id: 'p4', label: 'Name non-goals', description: 'Explicitly state what is out of scope for now.' },
        ),
        comparisonTable: table(
          'Product vs related ideas',
          ['Concept', 'Duration', 'Success measure', 'Owner focus'],
          [
            ['Product', 'Ongoing lifecycle', 'Outcomes and value over time', 'Maximize product value'],
            ['Feature', 'Part of a product', 'User capability delivered', 'Does it advance product outcomes?'],
            ['Project', 'Temporary endeavor', 'Scope/time/cost delivery of a result', 'Deliver agreed project result'],
            ['Request', 'Input signal', 'Whether it becomes ordered work', 'Evaluate, do not auto-commit'],
          ],
        ),
      },
      requiresAnswer: prompt(
        'In your own words, define the Horizon ERP Inventory & Warehouse product in 3–5 sentences. Include users, value, and what is NOT the product.',
        'write',
        'Horizon ERP Inventory & Warehouse is an ongoing product that helps warehouse operators, inventory controllers, and customer service know accurate stock and promise reliably. Its value is inventory accuracy, faster availability answers, and fewer delayed shipments. Barcode scanners and a one-time project plan are not the product; they may be means. The product continues after the first release as Meridian learns from real warehouse use.',
        'Name users + value outcomes + non-goals',
        ['users', 'value', 'inventory', 'warehouse', 'not'],
      ),
    }),
    deepConcept({
      id: 'd1-s2-project',
      title: 'What Is a Project?',
      content: {
        conceptIntroduction:
          'Projects are useful. They are simply not the same thing as products. Product Owners must understand projects so they can collaborate with project managers without becoming one.',
        simpleExplanation:
          'A project is a temporary effort with a start and an end, created to achieve a specific result. Building a new warehouse building is a project. Migrating data from an old system during a fixed cutover window is often managed as a project. When the result is delivered, the project ends. The product may continue.',
        businessProblem:
          'When organizations manage products only as projects, they optimize for "finish the scope" instead of "improve the outcome." Work stops when budgets end, even if users still fail.',
        professionalDefinition:
          'A project is a temporary endeavor undertaken to create a unique product, service, or result. It is constrained by scope, time, and cost, and is closed when objectives are achieved or the effort is terminated.',
        whyImportant:
          'Product Owners who confuse project success with product success accept "on time and on budget" as enough — even when inventory accuracy did not improve.',
        lifecycleLocation:
          'Projects often appear as vehicles to launch or majorly change a product. They sit inside the product lifecycle, not above it.',
        howItWorks:
          '1) Define project objective. 2) Plan scope, schedule, cost, and risks. 3) Execute and control. 4) Deliver the result. 5) Close the project. 6) Hand ongoing value management back to product ownership if a product remains.',
        whoResponsible: 'A Project Manager is typically accountable for project delivery constraints. The Product Owner remains accountable for product value.',
        whoParticipates: 'Sponsors, PMO, delivery teams, vendors, Product Owner, and stakeholders.',
        requiredInputs: 'Business case, project charter or equivalent, constraints, and success criteria for the temporary effort.',
        activities: 'Planning, tracking, risk management, dependency coordination, status reporting, and closure.',
        expectedOutputs: 'Delivered project result, project reports, and transition to operations/product management.',
        simpleExample: 'Renovating a store in 8 weeks is a project. Operating the store profitably afterward is not the project — that is ongoing business/product operation.',
        softwareExample: 'A 3-month initiative to launch the first version of a mobile app can be managed as a project. After launch, backlog-driven product evolution continues.',
        erpExample: `Migrating Meridian's open stock balances into ${CASE_STUDY.productName} over a fixed weekend cutover is a project. Improving inventory accuracy to 95% over the next year is product work.`,
        workedExample:
          'Project: "Cutover Warehouse A to Horizon ERP receiving in Q3."\nStart/end: defined\nSuccess: cutover completed with acceptable reconciliation\nProduct continues: receiving process improvements, exception handling, user adoption metrics after go-live.',
        comparison: 'Projects end. Products evolve. A project may create the first Increment of a product.',
        commonMisunderstandings: 'Misunderstanding: "Agile means no projects." Reality: organizations may still use projects for funding or major transitions while product teams work iteratively.',
        beginnerMistakes: mistakes(
          { wrong: 'Letting project end-date dictate product value definition', right: 'Define product outcomes first, then use projects as delivery containers when needed', explanation: 'Dates without outcomes create hollow launches.' },
        ),
        workplaceMistakes: mistakes(
          { wrong: 'Closing the project and abandoning the backlog', right: 'Ensure Product Ownership continues after project closure', explanation: 'ERP value appears after adoption, not at cutover.' },
        ),
        poorExample: 'Success report: "Project completed on schedule." (No mention of inventory accuracy or user outcomes.)',
        correctExample: 'Success report: "Cutover project completed; product goal remains increasing inventory accuracy from 78% to 95% over the next two quarters, owned by the Product Owner."',
        reflectionQuestion: 'Name one Meridian effort that should be a project and one that should remain continuous product work.',
        professionalTerminology: 'Say "project delivery success" and "product outcome success" as different evaluations.',
        interviewQuestion: 'Can a Product Owner and Project Manager work together? How?',
        interviewModelAnswer:
          'Yes. The Project Manager focuses on coordinating temporary constraints, dependencies, and delivery tracking. The Product Owner focuses on value, ordering, and acceptance of product Increments. We collaborate on release timing, but I do not hand over backlog ordering or value accountability.',
      },
      requiresAnswer: prompt(
        'Give one Meridian example of a project and one example of ongoing product work. Explain the difference in two sentences.',
        'compare',
        'Project example: weekend data cutover of Warehouse A stock balances into Horizon ERP. Product work example: continuously improving receiving accuracy and availability visibility based on warehouse feedback. The project ends after cutover; the product work continues as outcomes are still being improved.',
        'Use start/end vs ongoing value',
        ['project', 'product', 'cutover', 'ongoing'],
      ),
    }),
    deepConcept({
      id: 'd1-s3-product-vs-project',
      title: 'Product versus Project',
      type: 'comparison',
      content: {
        conceptIntroduction: 'This comparison prevents the most common beginner confusion in Product Ownership.',
        simpleExplanation: 'If it has a temporary mission and ends, think project. If it exists to create ongoing value for users and the business, think product. Many workplaces mix both — your job is to keep value ownership clear.',
        businessProblem: 'Mixed language causes mixed accountability: everyone tracks timelines, nobody owns outcomes.',
        professionalDefinition: 'Product management optimizes value over a lifecycle; project management optimizes delivery of a temporary endeavor under constraints.',
        whyImportant: 'Clear distinction protects the Product Owner from being turned into a status reporter.',
        lifecycleLocation: 'Projects may fund or launch product stages; product ownership spans before, during, and after those projects.',
        howItWorks: 'When a request arrives, ask: Is this a temporary initiative container, or is this about evolving a lasting capability? Then assign the right ownership conversations.',
        whoResponsible: 'Product Owner for product value; Project Manager for project constraints when a project exists.',
        whoParticipates: 'Sponsors, governance forums, delivery team, and stakeholders.',
        requiredInputs: 'Request context, funding model, success definition, and expected duration of need.',
        activities: 'Classify initiatives, clarify success metrics, and communicate ownership boundaries.',
        expectedOutputs: 'Shared language in steering meetings and backlog conversations.',
        simpleExample: 'Building a pop-up shop for a festival is project-like. Building a brand customers return to all year is product-like.',
        softwareExample: 'Implementing SSO in 6 weeks may be a project. The identity experience of the platform remains product.',
        erpExample: 'Rolling Horizon ERP into Plant 2 is often a project. Inventory availability as a trusted operational capability is the product.',
        workedExample:
          'Request: "Implement barcode scanning this quarter."\nProject lens: schedule scanners, vendors, training, go-live.\nProduct lens: what outcome? accuracy? speed? fewer mis-picks? Is scanning the best option? What backlog order maximizes value?',
        comparisonTable: table(
          'Product vs Project decision guide',
          ['Question', 'Product answer', 'Project answer'],
          [
            ['Does it end?', 'No — evolves', 'Yes — closes'],
            ['Primary success?', 'Outcomes/value', 'Scope/time/cost result'],
            ['Backlog?', 'Living ordered Product Backlog', 'Work plan / WBS for the endeavor'],
            ['Who decides value trade-offs?', 'Product Owner', 'Sponsor/PM within project charter'],
          ],
        ),
        commonMisunderstandings: 'Believing Agile eliminates projects. Agile changes how product value is discovered and delivered; funding may still use projects.',
        beginnerMistakes: mistakes(
          { wrong: 'Rejecting all project governance as "not Agile"', right: 'Translate governance needs into outcome-based updates without abandoning PO accountability', explanation: 'Professionals work with the organization that exists.' },
        ),
        workplaceMistakes: mistakes(
          { wrong: 'Two owners for the same backlog — PM and PO both ordering work', right: 'One Product Owner orders the Product Backlog', explanation: 'Dual ordering destroys transparency.' },
        ),
        poorExample: 'Steerco slide titled "Product status" that only shows red/amber/green project dates.',
        correctExample: 'Steerco slide shows outcome metrics, top ordered outcomes, risks to value, and separately any project cutover dates.',
        reflectionQuestion: 'Which Meridian conversations are currently project-shaped but should be product-shaped?',
        professionalTerminology: 'Use both terms correctly in the same meeting without blending success criteria.',
        interviewQuestion: 'A sponsor says: "Just project-manage the backlog." How do you respond?',
        interviewModelAnswer:
          'I clarify that I will provide transparent forecasts and collaborate on dates, but backlog ordering and value trade-offs remain Product Owner accountability. If they need classic project control for a cutover, we can run that project alongside the product — not instead of Product Ownership.',
      },
      requiresAnswer: prompt(
        'A sponsor says success means "go live by September." Rewrite success using both project and product language.',
        'write',
        'Project success: complete Warehouse A cutover to Horizon ERP receiving by September with reconciled opening balances. Product success: within two quarters after cutover, inventory accuracy rises from 78% toward 95%, and customer service can confirm available stock in under two minutes.',
        'Include both lenses',
        ['project', 'product', 'accuracy', 'september'],
      ),
    }),
    deepConcept({
      id: 'd1-s4-lifecycle',
      title: 'The Product Lifecycle',
      type: 'process',
      content: {
        conceptIntroduction: 'Products move through stages. Product Owners make different decisions in each stage.',
        simpleExplanation:
          'Think of a product lifecycle like the life of a useful tool: someone discovers a need, shapes an idea, builds usable versions, releases them, learns from real use, improves, and eventually retires or replaces the tool when it no longer serves. For Horizon ERP Inventory, Meridian is early — discovering needs and shaping the first valuable releases.',
        businessProblem: 'Teams jump to build and skip discovery, or they launch and never measure, or they never retire harmful complexity.',
        professionalDefinition:
          'The product lifecycle is the sequence of stages a product passes through from conception to retirement, including discovery, strategy, delivery, go-to-market/adoption, growth/optimization, and decline/replacement.',
        whyImportant: 'Lifecycle awareness prevents one-size-for-all decisions. An early discovery decision is not the same as a mature optimization decision.',
        lifecycleLocation: 'This concept IS the map of where all other PO concepts appear.',
        howItWorks:
          'Discovery → Vision/Strategy → Delivery of Increments → Release & Adoption → Measure Outcomes → Adapt Backlog → Repeat → Eventually Retire/Replace.',
        whoResponsible: 'Product Owner participates across stages; sponsors set business context; teams deliver Increments; users validate value in use.',
        whoParticipates: 'Entire product ecosystem — especially users and stakeholders during discovery and review.',
        requiredInputs: 'Problem evidence, strategy, feedback, metrics, constraints.',
        activities: 'Research, goal setting, backlog ordering, acceptance, release planning, metric review, retirement decisions.',
        expectedOutputs: 'Stage-appropriate artifacts: problem statements, vision, backlog, increments, metrics, retirement plans.',
        simpleExample: 'A city bike-share product: research commuting pain, pilot one district, expand, optimize stations, eventually replace hardware generation.',
        softwareExample: 'A notes app launches MVP, improves sharing, adds teams, later sunsets an unused legacy editor.',
        erpExample: 'Horizon Inventory: discover accuracy problems → define vision/goal → deliver receiving Increment → train warehouse → measure accuracy → refine transfers → later integrate advanced planning.',
        workedExample:
          `Lifecycle snapshot for Meridian:\nStage: Discovery/early delivery\nEvidence: ${CASE_STUDY.hiddenProblems.join('; ')}\nNear-term Product Goal candidate: trusted stock visibility for Warehouse A receiving and availability checks\nNot yet: AI planning, company-wide optimization`,
        processSteps: steps(
          { id: 'l1', label: 'Discover', description: 'Understand problems and opportunities with evidence.' },
          { id: 'l2', label: 'Strategize', description: 'Set vision, goals, and principles.' },
          { id: 'l3', label: 'Deliver Increments', description: 'Build usable value slices.' },
          { id: 'l4', label: 'Release & Adopt', description: 'Put value in users\' hands and support use.' },
          { id: 'l5', label: 'Measure & Adapt', description: 'Inspect outcomes and reorder the backlog.' },
          { id: 'l6', label: 'Retire/Replace', description: 'Remove or replace capabilities that no longer serve.' },
        ),
        commonMisunderstandings: 'Lifecycle is not a waterfall phase gate that forbids learning. In Agile product work, learning loops run continuously inside the lifecycle.',
        beginnerMistakes: mistakes(
          { wrong: 'Skipping discovery because "requirements already exist"', right: 'Treat requests as hypotheses until problems are validated', explanation: 'Meridian\'s barcode request may not be the root problem.' },
        ),
        workplaceMistakes: mistakes(
          { wrong: 'No adoption plan after release', right: 'Include training, support, and success metrics in product thinking', explanation: 'Unadopted ERP features create no value.' },
        ),
        poorExample: 'Lifecycle plan with only Build and Go-Live boxes.',
        correctExample: 'Lifecycle plan showing discovery evidence, Product Goal, incremental releases, adoption activities, and outcome metrics.',
        reflectionQuestion: 'Which lifecycle stage is Meridian in for Inventory, and what evidence tells you that?',
        professionalTerminology: 'Speak in lifecycle stages when explaining why you will not commit to a full solution design on Day 1.',
        interviewQuestion: 'Where does the Product Owner add the most value in the lifecycle?',
        interviewModelAnswer:
          'Across all stages, but especially in connecting discovery evidence to strategy and backlog ordering, and in accepting Increments against value. Early on, preventing solution jumping saves the most money. Later, ruthless prioritization and outcome measurement sustain value.',
      },
      requiresAnswer: prompt(
        'List the product lifecycle stages and place Meridian Inventory in the correct current stage with one evidence sentence.',
        'identify',
        'Stages: Discover, Strategize, Deliver Increments, Release & Adopt, Measure & Adapt, Retire/Replace. Meridian is in Discover/early Strategize because inventory accuracy is ~78%, transfers are email-based, and the barcode request is an unvalidated solution idea.',
        'Name stages + evidence',
        ['discover', 'accuracy', 'barcode'],
      ),
    }),
    deepConcept({
      id: 'd1-s5-value',
      title: 'Product Value',
      content: {
        conceptIntroduction: 'Value is the Product Owner\'s north star. Without it, backlog items are just tasks.',
        simpleExplanation:
          'Product value means the benefit people get from the product — fewer mistakes, saved time, reduced risk, more revenue, better compliance, less frustration. Value is not the number of features shipped. Shipping ten unused screens can have almost no value.',
        businessProblem: 'Teams celebrate output (features delivered) while outcomes (accuracy, speed, revenue, risk) stay flat.',
        professionalDefinition:
          'Product value is the benefit realized by users, customers, and the organization relative to the cost and risk of delivering and operating the product. Value may be financial, operational, experiential, strategic, or risk-reducing.',
        whyImportant: 'The Product Owner maximizes value. That is the role\'s core purpose.',
        lifecycleLocation: 'Value is defined in strategy, hypothesized in backlog items, validated in reviews and usage, and measured with product metrics.',
        howItWorks:
          '1) Identify whose value. 2) Define the benefit type. 3) Connect work items to that benefit. 4) Deliver a slice. 5) Check whether value appeared. 6) Adapt.',
        whoResponsible: 'Product Owner accountable for maximizing value; organization defines strategic context; users realize value in practice.',
        whoParticipates: 'Stakeholders articulate needs; Developers create Increments; customers/users confirm value.',
        requiredInputs: 'Business objectives, user pains, costs, risks, constraints, evidence.',
        activities: 'Value framing, ordering by value, cutting low-value scope, validating outcomes.',
        expectedOutputs: 'Value statements, ordered backlog, outcome measures.',
        simpleExample: 'A hospital check-in kiosk creates value if wait times drop and staff can focus on care — not if the kiosk exists but patients still queue at the desk.',
        softwareExample: 'Auto-fill checkout creates value if completion rate rises and support tickets fall.',
        erpExample: 'A stock availability panel creates value if Customer Service stops calling the warehouse and delayed promises decrease.',
        workedExample:
          `Value hypothesis for Meridian:\nIf inventory controllers and customer service see trusted on-hand and reserved stock by warehouse,\nthen available-to-promise time falls from ~25 minutes to under 2 minutes,\nand stockout-related delayed shipments reduce toward the 40% reduction target.`,
        comparison: 'Output = what was delivered. Outcome = what changed for users/business. Value includes outcomes relative to cost/risk.',
        commonMisunderstandings: 'Value is not only revenue. In ERP, risk reduction, compliance, and operational reliability are major value types.',
        beginnerMistakes: mistakes(
          { wrong: 'Equating story count with value', right: 'Tie each major item to a user/business outcome', explanation: 'Velocity is not value.' },
        ),
        workplaceMistakes: mistakes(
          { wrong: 'Prioritizing the loudest stakeholder as "highest value"', right: 'Compare expected outcomes, risks, and costs transparently', explanation: 'Noise is not value.' },
        ),
        poorExample: 'Value statement: "Deliver barcode module."',
        correctExample: 'Value statement: "Reduce mis-receive and mis-putaway events so inventory accuracy moves from 78% toward 95%, enabling reliable customer promises."',
        reflectionQuestion: 'Which Meridian value outcome would you protect first if capacity is severely limited, and why?',
        professionalTerminology: 'Speak in outcomes, beneficiaries, and evidence — not feature lists alone.',
        interviewQuestion: 'How do you measure product value as a Product Owner?',
        interviewModelAnswer:
          'I define leading and lagging outcome indicators tied to the Product Goal — for ERP inventory, accuracy, promise reliability, time-to-answer availability, and delayed shipments. I use delivery metrics only as health signals, never as value substitutes.',
      },
      requiresAnswer: prompt(
        'Write one value hypothesis for Meridian Inventory using If / then / will measure format.',
        'write',
        'If warehouse operators post receipts in near real time against trusted locations, then inventory accuracy will rise from 78% toward 95%, measured by cycle-count accuracy and reduction in negative stock balances.',
        'Include If/then/measure',
        ['if', 'then', 'measure', 'accuracy'],
      ),
    }),
    deepConcept({
      id: 'd1-s6-po-purpose',
      title: 'Product Owner Purpose and Accountabilities',
      content: {
        conceptIntroduction: 'This is the heart of Day 1: why the Product Owner role exists.',
        simpleExplanation:
          'The Product Owner exists so one person is clearly accountable for what the team works on and why — maximizing the value of the product. Without this role, teams drown in conflicting requests. The Product Owner does not personally write all code, manage people\'s timesheets, or facilitate every meeting. The Product Owner owns value decisions for the product.',
        businessProblem: 'When everyone can redirect the team, the team becomes busy and ineffective.',
        professionalDefinition:
          'In Scrum, the Product Owner is accountable for maximizing the value of the product resulting from the work of the Scrum Team. This includes effective Product Backlog management: developing and communicating the Product Goal, creating and communicating Product Backlog items, ordering items, and ensuring transparency.',
        whyImportant: 'Clear accountability enables faster decisions, better trade-offs, and a single ordered backlog.',
        lifecycleLocation: 'From discovery through release and adaptation.',
        howItWorks:
          'The Product Owner continuously: understands users/business, shapes goals, orders the backlog, collaborates with the team, accepts value, and adapts based on feedback.',
        whoResponsible: 'One Product Owner is accountable. Responsibilities may be delegated, accountability is not.',
        whoParticipates: 'Scrum Team, stakeholders, sponsors, users.',
        requiredInputs: 'Strategy context, stakeholder input, feedback, team capacity signals, metrics.',
        activities: 'Goal definition, backlog management, stakeholder negotiation, clarification, acceptance, roadmap communication.',
        expectedOutputs: 'Product Goal, transparent ordered backlog, accepted Increments, clear decisions.',
        simpleExample: 'In a restaurant, someone must decide the menu focus for the season. If every waiter changes the menu nightly, the kitchen collapses.',
        softwareExample: 'One PO orders whether the team improves onboarding or billing next, based on value evidence.',
        erpExample: 'For Horizon Inventory, one PO decides whether receiving accuracy, transfers, or barcode scanning comes first — with rationale.',
        workedExample:
          `Accountabilities applied:\nProduct Goal: Trusted stock visibility for Warehouse A\nOrdering: Late receipt posting fixes before advanced AI planning\nTransparency: Public backlog and decision log\nAcceptance: Receiving Increment accepted only if business rules and accuracy evidence hold`,
        commonMisunderstandings:
          'Misunderstanding: Product Owner is "the person who writes User Stories." Writing stories may be part of the work; accountability for value and backlog effectiveness is the role.',
        beginnerMistakes: mistakes(
          { wrong: 'Acting as a note-taker for stakeholders', right: 'Evaluate requests against goals and order transparently', explanation: 'PO is a decision role, not a secretary role.' },
          { wrong: 'Delegating accountability to a committee', right: 'Gather input widely; decide clearly', explanation: 'Committees advise; PO remains accountable.' },
        ),
        workplaceMistakes: mistakes(
          { wrong: 'Multiple people changing backlog order daily', right: 'Only the Product Owner orders the Product Backlog', explanation: 'Transparency requires a single ordering authority.' },
        ),
        poorExample: 'PO email: "I added everyone\'s requests to the Sprint."',
        correctExample: 'PO communication: "I ordered receiving accuracy above barcode hardware this Sprint because negative stock and late receipts currently destroy promise reliability. Barcode remains on the backlog for later validation."',
        reflectionQuestion: 'Where might you be tempted to please everyone instead of maximizing value?',
        professionalTerminology: 'Accountability, Product Goal, Product Backlog, ordering, transparency, Increment, value.',
        interviewQuestion: 'What are you accountable for as a Product Owner?',
        interviewModelAnswer:
          'I am accountable for maximizing product value and for effective Product Backlog management — Product Goal, backlog items, ordering, and transparency. I collaborate with stakeholders and the team, but I do not outsource final value trade-offs.',
      },
      requiresAnswer: prompt(
        'List four Product Owner accountabilities in your own words and give a Meridian example for one of them.',
        'explain',
        '1) Maximize product value. 2) Manage the Product Backlog effectively. 3) Communicate Product Goal. 4) Ensure backlog transparency and ordering. Example: Order late-receipt posting improvements above AI planning because accuracy is currently 78% and promises are unreliable.',
        'Four accountabilities + example',
        ['value', 'backlog', 'goal', 'order'],
      ),
    }),
    deepConcept({
      id: 'd1-s7-authority-daily',
      title: 'Product Owner Authority and Daily Activities',
      content: {
        conceptIntroduction: 'Accountability without authority fails. Authority without availability also fails.',
        simpleExplanation:
          'Authority means the Product Owner has the real power to make value trade-offs: what is in the backlog order, what is accepted, what waits. Daily activities include talking to users and stakeholders, clarifying requirements, refining upcoming work with the team, answering questions, reviewing Increments, and protecting focus against random urgencies.',
        businessProblem: 'A "Product Owner" who must ask permission for every tiny trade-off is a messenger, not an owner.',
        professionalDefinition:
          'Product Owner authority is the organizational empowerment to make product value decisions, including backlog ordering and acceptance, within agreed strategic boundaries. Daily Product Ownership is the continuous practice of discovery, backlog stewardship, collaboration, and decision-making.',
        whyImportant: 'Without authority, empiricism collapses into escalation theater. Without daily engagement, the team stalls or guesses.',
        lifecycleLocation: 'Daily across delivery; strategically at goal and roadmap cadences.',
        howItWorks:
          'Agree strategic boundaries with sponsors → Own ordering inside those boundaries → Be available for clarification → Decide with evidence → Communicate decisions → Inspect outcomes.',
        whoResponsible: 'Product Owner exercises authority; sponsors set boundaries; leadership must reinforce the role.',
        whoParticipates: 'Team and stakeholders interact daily/weekly with the PO.',
        requiredInputs: 'Strategy boundaries, stakeholder requests, team questions, Increment evidence.',
        activities:
          'Stakeholder conversations, user listening, backlog refinement, Sprint collaboration, acceptance, communication of no/not now, decision logging.',
        expectedOutputs: 'Timely decisions, clarified items, ordered backlog, accepted or rejected work with reasons.',
        simpleExample: 'A store owner decides which products get shelf space this week. Staff can advise; the owner decides.',
        softwareExample: 'PO decides to cut a low-value animation so the team can finish a checkout bug that blocks revenue.',
        erpExample: 'PO decides a mid-Sprint banner color request waits, while a receiving posting defect that creates negative stock is assessed against the Sprint Goal.',
        workedExample:
          'Daily rhythm (foundation level):\n- Morning: check team questions and blockers related to meaning/value\n- Midday: stakeholder clarification call (timeboxed)\n- Refinement prep: clarify top backlog items\n- Decision: accept/defer new urgent request with written rationale\n- End of day: update backlog transparency',
        comparison: 'Authority is decision rights. Availability is access for clarification. Micromanagement is controlling how Developers do their work — which is not PO authority.',
        commonMisunderstandings: 'Authority does not mean dictatorship without listening. Professionals seek input, then decide.',
        beginnerMistakes: mistakes(
          { wrong: 'Disappearing after Sprint Planning', right: 'Stay available for clarification without hovering over tasks', explanation: 'Absence creates guesswork; hovering creates fear.' },
        ),
        workplaceMistakes: mistakes(
          { wrong: 'Every urgent email becomes Sprint scope', right: 'Evaluate against Sprint Goal and Product Goal; negotiate', explanation: 'Uncontrolled scope destroys empiricism.' },
        ),
        poorExample: 'PO authority: none — "I will ask the steering committee for each backlog order change."',
        correctExample: 'PO authority: within COO outcome targets, PO orders Inventory backlog and reports decisions transparently.',
        reflectionQuestion: 'What authority must Meridian leadership grant you on Day 1 for the role to be real?',
        professionalTerminology: 'Decision rights, skip-level interruptions, Sprint Goal protection, clarification vs assignment.',
        interviewQuestion: 'How available should a Product Owner be during a Sprint?',
        interviewModelAnswer:
          'Available enough that the team never waits long on meaning, priority, or acceptance questions — but not as a task manager. I protect the Sprint Goal from unmanaged interruptions and channel new requests through backlog ordering.',
      },
      requiresAnswer: prompt(
        'Describe three daily/weekly PO activities and one activity that is NOT your job.',
        'identify',
        'Activities: clarify backlog items with Developers; negotiate stakeholder urgencies against goals; accept Increments against Acceptance Criteria. Not my job: assigning technical tasks to Developers or running people performance reviews.',
        '3 yes + 1 no',
        ['clarify', 'accept', 'not'],
      ),
    }),
    deepConcept({
      id: 'd1-s8-misconceptions',
      title: 'Common Misconceptions about the Product Owner Role',
      type: 'comparison',
      content: {
        conceptIntroduction: 'Clearing misconceptions early prevents role failure.',
        simpleExplanation:
          'People often think the Product Owner is a project manager with a new title, or a business analyst who only writes documents, or a customer proxy who says yes to everything, or a technical lead. None of those definitions match professional Product Ownership.',
        businessProblem: 'Mis-titled roles create delivery chaos and interview confusion.',
        professionalDefinition:
          'The Product Owner is a value accountability role centered on Product Goal, Product Backlog effectiveness, and maximizing product value — distinct from project control, facilitation, and implementation design ownership.',
        whyImportant: 'You cannot practice what you misdefine.',
        lifecycleLocation: 'Role clarity is established at team formation and reinforced continuously.',
        howItWorks: 'Compare each misconception to true accountability; practice saying what you do and do not own.',
        whoResponsible: 'Product Owner models correct role behavior; Scrum Master helps coach boundaries; leadership reinforces.',
        whoParticipates: 'Whole organization learns the boundaries.',
        requiredInputs: 'Role definition, working agreements, examples of decisions.',
        activities: 'Boundary conversations, RACI clarification, refusal of anti-role tasks with alternatives.',
        expectedOutputs: 'Shared working agreements and fewer role collisions.',
        simpleExample: 'Calling a cashier a "store owner" does not give them ownership authority.',
        softwareExample: 'A ticket dispatcher labeled "PO" still is not a Product Owner.',
        erpExample: 'If Meridian makes the PO collect status for a Gantt chart all week, value work dies.',
        workedExample:
          'Misconception → Correction:\n"PO writes all specs alone" → PO ensures backlog items are clear; collaboration welcome.\n"PO estimates story points" → Developers estimate; PO participates with context.\n"PO runs Daily Scrum" → Developers run Daily Scrum; PO may attend usefully.\n"PO must say yes" → PO must maximize value, which includes saying no/not now.',
        comparisonTable: table(
          'Misconception vs professional reality',
          ['Misconception', 'Reality', 'Risk if believed'],
          [
            ['PO is Project Manager', 'PO owns value/backlog; PM owns temporary constraints', 'Timeline theater replaces outcomes'],
            ['PO is BA only', 'Analysis helps; accountability is broader', 'Documents without decisions'],
            ['PO is customer', 'PO represents value, not every whim', 'Scope explosion'],
            ['PO is tech lead', 'PO collaborates; Developers own how', 'Micromanagement'],
          ],
        ),
        commonMisunderstandings: 'Title alone never creates the role. Authority + accountability + practice does.',
        beginnerMistakes: mistakes(
          { wrong: 'Accepting every admin task to be helpful', right: 'Protect time for value decisions and discovery', explanation: 'Helpful busyness can destroy Product Ownership.' },
        ),
        workplaceMistakes: mistakes(
          { wrong: 'Hidden backlog in private spreadsheets owned by multiple managers', right: 'One transparent Product Backlog ordered by the PO', explanation: 'Opacity invites politics.' },
        ),
        poorExample: 'Job description: "Product Owner — gather requirements and update project plan daily."',
        correctExample: 'Job description: "Product Owner — maximize Horizon Inventory value; own Product Goal and ordered backlog; accept Increments; align stakeholders."',
        reflectionQuestion: 'Which misconception are you most likely to fall into, and how will you catch yourself?',
        professionalTerminology: 'Proxy customer myth, request manager anti-pattern, single ordered backlog.',
        interviewQuestion: 'What is NOT the Product Owner\'s responsibility?',
        interviewModelAnswer:
          'I am not accountable for facilitating Scrum events as the Scrum Master, for assigning technical tasks, for people management, or for guaranteeing a fixed scope on a fixed date without trade-offs. I am accountable for value and backlog effectiveness.',
      },
      requiresAnswer: prompt(
        'Name two misconceptions and write a professional correction sentence for each.',
        'explain',
        'Misconception: PO is a Project Manager. Correction: PO owns product value and backlog ordering; project constraints may be coordinated separately. Misconception: PO must accept all stakeholder requests. Correction: PO maximizes value by ordering work and saying no/not now with rationale.',
        undefined,
        ['project', 'value', 'no'],
      ),
    }),
  ],
  productOwnerResponsibility: [
    'Maximizing the value of the product resulting from the team\'s work',
    'Developing and communicating the Product Goal',
    'Creating, communicating, and ordering Product Backlog items',
    'Ensuring the Product Backlog is transparent and understood',
    'Making value trade-off decisions and accepting or rejecting Increments against agreed criteria',
    'Negotiating scope and priority with stakeholders using evidence and goals',
  ],
  notProductOwnerResponsibility: [
    'Managing team members\' personal performance or timesheets',
    'Deciding technical implementation details for Developers',
    'Facilitating Scrum as a substitute Scrum Master by default',
    'Guaranteeing fixed scope, fixed date, and fixed resources with no trade-offs',
    'Auto-adding every stakeholder request into the current Sprint',
    'Owning corporate portfolio funding processes alone (collaborate with leadership)',
  ],
  guidedExercise: exercise({
    id: 'd1-guided',
    title: 'Classify Product vs Project vs Request',
    instructions:
      'For Meridian Manufacturing, classify each item as PRODUCT, PROJECT, or REQUEST, and explain why in one sentence each:\n1) Improve inventory accuracy to 95%\n2) Weekend cutover of Warehouse A opening balances\n3) "Add a purple filter button" email from a supervisor\n4) Horizon ERP Inventory & Warehouse management capability\n5) Vendor installation of barcode printers next month',
    hints: [
      'PRODUCT = ongoing value capability',
      'PROJECT = temporary endeavor with end',
      'REQUEST = input signal, not yet ordered work',
    ],
    modelAnswer:
      '1) PRODUCT outcome/goal direction — ongoing value target.\n2) PROJECT — temporary cutover endeavor.\n3) REQUEST — unevaluated input.\n4) PRODUCT — enduring capability.\n5) PROJECT (or project task) — temporary implementation effort; scanners are means, not the product itself.',
    scoringCriteria: [
      'Correctly distinguishes product from project',
      'Identifies request as unevaluated input',
      'Explains barcode printers as means/project not product value',
      'Uses Meridian context',
    ],
    difficulty: 'guided',
  }),
  independentExercise: exercise({
    id: 'd1-independent',
    title: 'Draft a Product Definition Statement',
    instructions:
      'Write a one-paragraph product definition for Horizon ERP Inventory & Warehouse including: product name, users, customer/sponsor, value outcomes, in-scope capabilities, and explicit non-goals.',
    hints: ['Use the vision seed in the case study as inspiration, not as a copy-paste.'],
    modelAnswer:
      'Horizon ERP Inventory & Warehouse is Meridian Manufacturing Group\'s product for trusted stock visibility and warehouse flow across plants and distribution centers. Primary users include warehouse operators, inventory controllers, purchasing planners, and customer service agents; sponsors include the COO and Head of Supply Chain. It exists to raise inventory accuracy, reduce delayed shipments from stockouts, and cut time to confirm available stock. Near-term scope includes receipts, putaway, picks, transfers, adjustments, and availability visibility. Non-goals for now include AI warehouse planning and unrelated CRM marketing features. Barcode hardware may support the product but is not the product definition.',
    scoringCriteria: [
      'Names users and sponsors',
      'States outcomes not only features',
      'Defines in-scope and non-goals',
      'Separates means (barcode) from product value',
    ],
    difficulty: 'independent',
  }),
  stakeholderScenario: decision({
    id: 'd1-stakeholder',
    title: 'The barcode ultimatum',
    context: caseStudyDayNarrative(1),
    conflict:
      'The Head of Supply Chain says: "If you are the Product Owner, just build the barcode app this quarter. Stop overthinking." Finance says inventory valuation is wrong and must be fixed first. Warehouse supervisors want scanners now.',
    question:
      'What do you do in your first week as Product Owner? Choose the best professional approach and explain the value logic.',
    options: [
      'Commit to barcode app immediately to build trust',
      'Facilitate discovery to validate the problem, define product outcomes, and order work transparently while acknowledging urgency',
      'Ask everyone to vote and follow the majority',
      'Hand the decision to the Project Manager',
    ],
    modelAnswer:
      'Facilitate discovery to validate the problem, define product outcomes, and order work transparently while acknowledging urgency. Commitment without problem validation risks building the wrong solution. Finance valuation issues and late receipts may be root causes that scanners alone will not fix. Build trust through clarity and evidence, not instant promises.',
    feedbackRubric: [
      'Does not blindly commit to solution',
      'Separates problem from requested solution',
      'Keeps PO decision ownership',
      'Acknowledges stakeholder urgency professionally',
    ],
  }),
  productDecisionChallenge: decision({
    id: 'd1-decision',
    title: 'Decision ownership challenge',
    context:
      'A Business Analyst offers to own the backlog "so you can attend meetings." A Project Manager asks you to update the Gantt chart daily instead of refining backlog items.',
    question: 'Which responsibilities do you keep, which do you collaborate on, and what do you decline? Write a short professional response.',
    modelAnswer:
      'I welcome BA collaboration on drafting backlog items, but I retain accountability for Product Goal, ordering, and value decisions — the backlog is not transferred. I will provide outcome-based status and key milestones for project tracking, but I will not replace Product Ownership with daily Gantt administration. Let\'s agree a lightweight communication format that satisfies governance without destroying backlog stewardship.',
    feedbackRubric: [
      'Keeps PO accountability',
      'Allows collaboration without abdication',
      'Declines anti-role busywork professionally',
      'Offers constructive alternative',
    ],
  }),
  artifactActivity: artifact({
    id: 'd1-artifact',
    title: 'Product Owner Responsibility Map',
    description:
      'Create your Day 1 final artifact: a Responsibility Map that clarifies what you own, what you share, and what you do not own for Horizon ERP Inventory & Warehouse.',
    template:
      `# Product Owner Responsibility Map
Product: 
Product Goal (draft): 

## I Own (Accountable)
- 

## I Collaborate On (Consulted/Informed partners)
- 

## I Do Not Own
- 

## Authority Needed from Leadership
- 

## First 30-Day Focus
- 

## Decision Rule
When requests conflict, I will decide based on:
`,
    instructions:
      'Fill every section with Meridian-specific content. Include at least 5 items in I Own, 4 in Collaborate, 4 in Do Not Own, and a clear decision rule referencing value outcomes.',
    modelArtifact:
      `# Product Owner Responsibility Map
Product: Horizon ERP Inventory & Warehouse
Product Goal (draft): Achieve trusted stock visibility for Warehouse A so inventory accuracy moves from 78% toward 95% and availability questions are answered in under 2 minutes.

## I Own (Accountable)
- Product Goal communication
- Product Backlog ordering and transparency
- Value trade-offs across warehouse, finance, and customer service requests
- Acceptance of Increments against agreed criteria
- Saying no/not now with rationale
- Outcome metrics for inventory accuracy and promise reliability

## I Collaborate On
- Discovery research with users and BA support
- Solution options with Developers and UX
- Cutover project constraints with Project Manager
- Training/adoption with warehouse supervisors
- Strategic boundaries with COO / Head of Supply Chain

## I Do Not Own
- Technical task assignment
- People performance management
- Scrum facilitation as primary accountability
- Guaranteeing fixed scope on fixed date with no trade-offs
- Hidden departmental request lists outside the Product Backlog

## Authority Needed from Leadership
- Sole ordering authority for the Inventory Product Backlog within agreed strategic outcomes
- Protection from skip-level Sprint injections without PO negotiation

## First 30-Day Focus
- Validate problem behind barcode request
- Establish transparent backlog
- Define draft vision and Product Goal
- Build Responsibility Map alignment in steerco

## Decision Rule
When requests conflict, I will decide based on impact on inventory accuracy, promise reliability, delayed shipments, and risk — not on who shouted loudest.`,
    scoringCriteria: [
      'Clear product and draft goal',
      'Owns value and backlog accountabilities',
      'Separates collaboration from accountability',
      'Explicit non-ownership boundaries',
      'Leadership authority request is practical',
      'Decision rule is outcome-based',
    ],
    requiredFields: [
      'Product:',
      'Product Goal',
      'I Own',
      'I Collaborate',
      'I Do Not Own',
      'Authority Needed',
      'Decision Rule',
    ],
  }),
  caseStudyUpdate: caseUpdate({
    dayFocus: 'Establish Product Ownership reality at Meridian',
    narrative: caseStudyDayNarrative(1),
    newInformation:
      'You learn that five managers currently maintain separate Excel "priority lists," and Developers receive direct WhatsApp requests from supervisors during shifts.',
    requiredAction:
      'Write a short announcement (8–12 sentences) introducing yourself as Product Owner, explaining what a product is in this context, how requests will be handled, and what changes starting now.',
    modelResponse:
      'I am the Product Owner for Horizon ERP Inventory & Warehouse. This product exists to give Meridian trusted stock visibility and reliable warehouse flow — not merely to deliver disconnected tickets. A product is an ongoing value capability; a project may help us cut over, but value continues after go-live. Starting now, all requests go to one transparent Product Backlog that I order against our outcomes: inventory accuracy, promise speed, and fewer delayed shipments. Excel shadow lists and WhatsApp tasking of Developers bypass transparency and create conflicting priorities. Please send requests to the backlog channel; urgent operational defects will be assessed against safety/value impact and the Sprint Goal. I will listen widely, decide clearly, and communicate rationale. Our first focus is validating the real problem behind the barcode request before we commit to a full solution path.',
  }),
  quiz: [
    mcq('d1-q1', 'product_ownership', 'What best defines a product?', ['A temporary endeavor with a fixed end date', 'A vehicle for delivering value over a lifecycle', 'A project plan with milestones', 'A list of unresolved defects'], 'A vehicle for delivering value over a lifecycle', 'A product delivers value over time and evolves; it is not defined as a temporary project.'),
    mcq('d1-q2', 'product_ownership', 'What best defines a project?', ['An everlasting business capability', 'A temporary endeavor to create a unique result', 'A Product Backlog', 'A user persona'], 'A temporary endeavor to create a unique result', 'Projects are temporary and close when the result is delivered or the effort ends.'),
    mcq('d1-q3', 'product_ownership', 'Who is accountable for maximizing product value in Scrum?', ['Scrum Master', 'Project Manager', 'Product Owner', 'Steering committee as a whole'], 'Product Owner', 'Scrum assigns value maximization accountability to the Product Owner.'),
    mcq('d1-q4', 'product_ownership', 'Which statement is true?', ['Products always end when projects end', 'Projects may exist inside a product lifecycle', 'Product Owners own developer task assignment', 'Backlog ordering should rotate weekly among managers'], 'Projects may exist inside a product lifecycle', 'Projects can launch or transition products; products can continue afterward.'),
    mcq('d1-q5', 'product_ownership', 'Which is the strongest product value signal?', ['Number of features shipped', 'Story points completed', 'Inventory accuracy improving toward the Product Goal', 'Number of meetings held'], 'Inventory accuracy improving toward the Product Goal', 'Outcomes tied to goals beat output vanity metrics.'),
    mcq('d1-q6', 'product_ownership', 'Which is NOT typically a Product Owner responsibility?', ['Ordering the Product Backlog', 'Communicating the Product Goal', 'Assigning technical tasks to Developers', 'Accepting Increments against criteria'], 'Assigning technical tasks to Developers', 'How work is done is owned by Developers.'),
    scenarioQ('d1-q7', 'product_ownership', 'Stakeholders maintain five Excel priority lists. What should the PO do first?', ['Merge them quietly into the Sprint Backlog', 'Declare one transparent Product Backlog and assert ordering authority', 'Ask Developers to pick whichever list they prefer', 'Ignore lists until after go-live'], 'Declare one transparent Product Backlog and assert ordering authority', 'Transparency and single ordering authority are foundational.'),
    scenarioQ('d1-q8', 'product_ownership', 'A sponsor equates success only with "go live by September." What should you add?', ['Nothing — date is enough', 'Product outcome measures such as accuracy and promise reliability', 'More status colors on the Gantt chart', 'A second Product Owner'], 'Product outcome measures such as accuracy and promise reliability', 'Project dates and product outcomes are different success lenses.'),
    mcq('d1-q9', 'product_ownership', 'Barcode scanners in the Meridian request are best understood as:', ['The product itself', 'A possible means/solution option', 'A Product Goal', 'A Sprint Retrospective'], 'A possible means/solution option', 'Hardware can support value but does not define the product.'),
    mcq('d1-q10', 'product_ownership', 'Accountability can be delegated in the PO role:', ['Fully to a committee', 'Never — responsibilities may be shared, accountability remains with PO', 'To the Scrum Master automatically', 'To Finance for ERP products'], 'Never — responsibilities may be shared, accountability remains with PO', 'Scrum is explicit: PO accountability is not transferred.'),
    shortAnswer('d1-q11', 'product_ownership', 'In one sentence, what problem does the Product Owner role solve?', 'It creates clear accountability for product value and a single ordered backlog so the team is not pulled in conflicting directions.', 'Without a PO, conflicting requests destroy focus and value.'),
  ],
  exam: [
    scenarioQ('d1-e1', 'product_ownership', 'Finance demands valuation fixes now; warehouse demands scanners now; COO demands a date. What is your best first professional move?', ['Promise both and add overtime', 'Validate problems, draft Product Goal/outcomes, create one ordered backlog, and present trade-offs', 'Choose scanners because they are visible', 'Escalate every item to the steering committee for ranking each day'], 'Validate problems, draft Product Goal/outcomes, create one ordered backlog, and present trade-offs', 'Professionals create clarity and transparent trade-offs rather than false promises.'),
    scenarioQ('d1-e2', 'product_ownership', 'A PM asks you to stop backlog refinement and update a detailed Gantt for 3 days. Best response?', ['Comply fully — governance first', 'Refuse all communication', 'Offer lightweight outcome/milestone updates while protecting PO backlog accountability', 'Transfer backlog ownership to the PM for the week'], 'Offer lightweight outcome/milestone updates while protecting PO backlog accountability', 'Collaborate with governance without abandoning Product Ownership.'),
    scenarioQ('d1-e3', 'product_ownership', 'Which definition should appear in your Meridian kickoff?', ['The product is the barcode app project ending in Q3', 'The product is trusted inventory and warehouse flow capability evolving over time', 'The product is whatever each supervisor requests weekly', 'The product is the ERP vendor contract'], 'The product is trusted inventory and warehouse flow capability evolving over time', 'Product definition must center enduring value, not a single solution fad.'),
    scenarioQ('d1-e4', 'product_ownership', 'Developers receive WhatsApp tasks from shift supervisors. What should you institute?', ['Allow it for speed', 'Single request channel into the Product Backlog with PO ordering; protect Sprint Goal', 'Ask Scrum Master to punish supervisors', 'Create a second secret expedite backlog'], 'Single request channel into the Product Backlog with PO ordering; protect Sprint Goal', 'Transparency and Sprint Goal protection are non-negotiable.'),
    scenarioQ('d1-e5', 'product_ownership', 'Which statement shows correct decision ownership?', ['Committee votes reorder the backlog daily', 'PO orders the backlog within strategic boundaries and explains rationale', 'Tech lead orders functional priorities', 'Customer Service can insert Sprint items directly'], 'PO orders the backlog within strategic boundaries and explains rationale', 'Single PO ordering authority with transparency.'),
  ],
  interviewPrep: interview({
    question: 'What does a Product Owner do, and how is that different from a Project Manager?',
    modelAnswer:
      'A Product Owner is accountable for maximizing product value and for effective Product Backlog management: Product Goal, backlog items, ordering, and transparency. A Project Manager focuses on delivering a temporary endeavor under scope, time, and cost constraints. We can collaborate — for example on a warehouse cutover project — but I own value trade-offs and backlog order, while the PM tracks project constraints and coordination. Success for me is outcomes like inventory accuracy and promise reliability, not only going live on a date.',
    followUps: [
      'How do you handle stakeholders who bypass you?',
      'Give an example of saying no professionally.',
      'How do you define value in an internal ERP product?',
    ],
    scoringCriteria: [
      'Clear PO accountabilities',
      'Accurate distinction from Project Manager',
      'Mentions value/outcomes and backlog',
      'Uses realistic collaboration language',
    ],
  }),
  lessonSummary: [
    'A product is an ongoing vehicle for value; a project is a temporary endeavor.',
    'Product success is measured primarily by outcomes, not only delivery dates.',
    'The Product Owner maximizes product value and owns Product Backlog effectiveness.',
    'Authority and availability make the role real; title alone does not.',
    'Requests are inputs; they are not automatic Sprint commitments.',
    'One transparent ordered backlog prevents shadow priority lists.',
    'Barcode scanners may be a solution option; inventory truth is the product value.',
    'Day 1 artifact: Product Owner Responsibility Map aligns ownership boundaries.',
  ],
  revisionChecklist: [
    'I can define product vs project with examples',
    'I can explain product lifecycle stages',
    'I can define product value beyond feature count',
    'I can state PO accountabilities from memory',
    'I can list what PO does not own',
    'I can explain PO authority needs',
    'I can separate means/solutions from product outcomes',
    'I completed the guided classification exercise',
    'I completed the independent product definition',
    'I submitted the Responsibility Map artifact',
    'I scored the quiz and reviewed explanations',
    'I completed the daily exam scenarios',
  ],
  additionalPractice: exercise({
    id: 'd1-extra',
    title: 'Responsibility boundary drill',
    instructions:
      'Write yes/no + reason for: (1) Ordering backlog, (2) Writing code, (3) Accepting Increment, (4) Running Daily Scrum, (5) Defining Product Goal, (6) Approving employee vacation.',
    modelAnswer:
      '1 Yes — PO accountability. 2 No — Developers. 3 Yes — PO acceptance against criteria. 4 No — Developers; SM coaches. 5 Yes — PO. 6 No — people management.',
    scoringCriteria: ['Correct yes/no for each', 'Reasons reference correct roles'],
    difficulty: 'guided',
  }),
  professionalFeedbackNotes: [
    'Weak answers only restate "PO manages backlog" without explaining value maximization.',
    'Strong answers separate product outcomes from project dates.',
    'Artifacts missing a decision rule usually fail real workplace conflict.',
    'If your map lists everything as "I own," you are claiming the whole company — be precise.',
    'Feedback will penalize copied model answers without Meridian-specific application.',
  ],
};
