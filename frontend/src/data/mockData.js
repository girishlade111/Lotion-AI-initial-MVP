export const mockPages = [
  {
    id: '1',
    title: 'Welcome to Lotion AI',
    icon: '👋',
    content: [
      { id: 'b1', type: 'heading1', content: 'Welcome to Lotion AI' },
      { id: 'b2', type: 'text', content: 'Your AI-powered workspace for notes, projects, and collaboration.' },
      { id: 'b3', type: 'heading2', content: 'Getting Started' },
      { id: 'b4', type: 'text', content: 'Try typing / to see AI commands or select text to use AI features.' },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Project Ideas',
    icon: '💡',
    content: [
      { id: 'b1', type: 'heading1', content: 'Project Ideas' },
      { id: 'b2', type: 'bulletList', content: 'Launch new product feature' },
      { id: 'b3', type: 'bulletList', content: 'Redesign landing page' },
      { id: 'b4', type: 'bulletList', content: 'Customer feedback analysis' },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const mockProjects = [
  {
    id: 'p1',
    name: 'Product Launch',
    description: 'Q2 2025 product launch campaign',
    status: 'in-progress',
    color: '#8b5cf6',
    tasks: ['t1', 't2', 't3'],
  },
  {
    id: 'p2',
    name: 'Website Redesign',
    description: 'Complete website overhaul',
    status: 'not-started',
    color: '#3b82f6',
    tasks: ['t4', 't5'],
  },
];

export const mockTasks = [
  {
    id: 't1',
    title: 'Design landing page mockups',
    status: 'done',
    priority: 'high',
    projectId: 'p1',
    assignee: 'You',
    dueDate: '2025-01-15',
  },
  {
    id: 't2',
    title: 'Write product copy',
    status: 'in-progress',
    priority: 'high',
    projectId: 'p1',
    assignee: 'You',
    dueDate: '2025-01-20',
  },
  {
    id: 't3',
    title: 'Set up analytics',
    status: 'not-started',
    priority: 'medium',
    projectId: 'p1',
    assignee: null,
    dueDate: '2025-01-25',
  },
  {
    id: 't4',
    title: 'Audit current website',
    status: 'not-started',
    priority: 'high',
    projectId: 'p2',
    assignee: 'You',
    dueDate: '2025-01-18',
  },
  {
    id: 't5',
    title: 'Create wireframes',
    status: 'not-started',
    priority: 'medium',
    projectId: 'p2',
    assignee: null,
    dueDate: '2025-01-22',
  },
];

export const mockMeetings = [
  {
    id: 'm1',
    title: 'Product Planning Q2',
    date: '2025-01-10',
    attendees: ['You', 'Sarah', 'Mike'],
    notes: [
      { id: 'n1', type: 'heading2', content: 'Discussion Points' },
      { id: 'n2', type: 'bulletList', content: 'Review Q1 performance metrics' },
      { id: 'n3', type: 'bulletList', content: 'Define Q2 product roadmap' },
      { id: 'n4', type: 'heading2', content: 'Action Items' },
      { id: 'n5', type: 'checkbox', content: 'Prepare market analysis report', checked: false },
      { id: 'n6', type: 'checkbox', content: 'Schedule follow-up meeting', checked: true },
    ],
    summary: 'Discussed Q2 product strategy and key initiatives. Team aligned on priorities.',
  },
];

export const mockTemplates = [
  {
    id: 'tpl1',
    name: 'Meeting Notes',
    icon: '📝',
    description: 'Template for meeting notes with AI summary',
    category: 'meetings',
  },
  {
    id: 'tpl2',
    name: 'Project Brief',
    icon: '📋',
    description: 'Structured project brief template',
    category: 'projects',
  },
  {
    id: 'tpl3',
    name: 'Task Tracker',
    icon: '✅',
    description: 'Track tasks and progress',
    category: 'tasks',
  },
  {
    id: 'tpl4',
    name: 'Brainstorming',
    icon: '🧠',
    description: 'Ideation and brainstorming canvas',
    category: 'creativity',
  },
];

export const mockAIResponses = {
  generate: 'This is AI-generated content based on your prompt. In a production environment, this would be powered by OpenRouter API with GPT-4 level models.',
  rewrite: 'Here\'s a rewritten version: [Your content transformed with improved clarity and flow]',
  summarize: 'Summary: The key points are highlighted with essential information preserved while removing unnecessary details.',
  translate: 'Translated content: [Your text in the target language]',
  expand: 'Here\'s an expanded version with more details and context: [Extended content with additional insights and examples]',
  shorten: 'Concise version: [Your content condensed to essential points]',
  tone: 'Adjusted tone: [Your content rewritten in the specified tone]',
  grammar: 'Corrected: [Your text with grammar and spelling fixes]',
  continue: 'Continuing from where you left off: [AI continues writing in your style]',
  brainstorm: '• Idea 1: Innovative approach using latest trends\n• Idea 2: Cost-effective solution\n• Idea 3: Scalable implementation strategy',
};