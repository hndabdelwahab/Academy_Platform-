import type { VisualFlow } from '@/po/types';

export const VISUAL_FLOWS: VisualFlow[] = [
  {
    id: 'scrum-cycle',
    title: 'The Scrum Cycle',
    description: 'How Sprint Planning, daily collaboration, Review, and Retrospective create empiricism.',
    steps: [
      { id: '1', label: 'Product Backlog', description: 'Ordered list of what might improve the product', detail: 'Owned and ordered by the Product Owner' },
      { id: '2', label: 'Sprint Planning', description: 'Select work toward a Sprint Goal', detail: 'Why / What / How conversation' },
      { id: '3', label: 'Sprint execution', description: 'Developers create a Done Increment; PO clarifies value', detail: 'Daily Scrum is for Developers' },
      { id: '4', label: 'Sprint Review', description: 'Inspect the Increment with stakeholders', detail: 'Adapt the Product Backlog' },
      { id: '5', label: 'Sprint Retrospective', description: 'Improve team effectiveness and quality', detail: 'Process and collaboration improvements' },
    ],
  },
  {
    id: 'po-decision-loop',
    title: 'Product Owner Decision Loop',
    description: 'Continuous loop from evidence to backlog adaptation.',
    steps: [
      { id: '1', label: 'Observe evidence', description: 'Users, metrics, defects, stakeholder input' },
      { id: '2', label: 'Frame problem/value', description: 'Separate problem from requested solution' },
      { id: '3', label: 'Order backlog', description: 'Transparent trade-offs against Product Goal' },
      { id: '4', label: 'Clarify & accept', description: 'Help the team understand; accept on evidence' },
      { id: '5', label: 'Adapt', description: 'Update goals, roadmap, and next decisions' },
    ],
  },
  {
    id: 'value-flow',
    title: 'From Request to Value',
    description: 'How a workplace request becomes ordered product work — or wait.',
    steps: [
      { id: '1', label: 'Request arrives', description: 'Email, meeting, WhatsApp, ticket — still only an input' },
      { id: '2', label: 'Discovery questions', description: 'Who? Problem? Outcome? Evidence? Risk?' },
      { id: '3', label: 'Backlog item crafted', description: 'Clear value, criteria, and readiness' },
      { id: '4', label: 'Ordered against others', description: 'Not automatically next' },
      { id: '5', label: 'Delivered & measured', description: 'Increment accepted; outcomes inspected' },
    ],
  },
];
