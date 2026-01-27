# Lotion AI - Frontend Implementation Contracts

## Overview
This document outlines the current frontend-only implementation of Lotion AI, a pixel-perfect Notion AI clone. All features are currently using mock data stored in LocalStorage via Zustand state management.

## Current Implementation Status: FRONTEND ONLY ✓

### Completed Features

#### 1. Authentication (Mock)
- **Status**: Frontend-only with mock authentication
- **Storage**: Zustand state (persisted to LocalStorage)
- **Implementation**: Login page accepts any name/email and creates mock session
- **Location**: `/app/frontend/src/pages/Login.jsx`

#### 2. Home Dashboard ✓
- **Features**:
  - Personalized greeting based on time of day
  - AI prompt box with mock responses
  - Quick action cards (New Page, New Project, New Meeting, Ask AI)
  - Recent pages list with icons
  - Template gallery
- **Mock Data**: `/app/frontend/src/data/mockData.js`
- **Location**: `/app/frontend/src/pages/Home.jsx`

#### 3. Block-Based Editor ✓
- **Features**:
  - Text blocks, headings (H1, H2, H3)
  - Bullet lists, numbered lists
  - Checkboxes with strike-through
  - Code blocks
  - Callouts
  - Block type menu (triggered by `/`)
  - Hover controls (drag, add, delete)
  - AI text selection menu
- **Mock AI Actions**: Rewrite, summarize, translate, grammar fix, continue writing
- **Location**: `/app/frontend/src/components/BlockEditor.jsx`

#### 4. AI Assistant Panel ✓
- **Features**:
  - Side panel with chat interface
  - Quick prompts
  - Mock AI responses
  - Message history
  - Processing animations
- **Location**: `/app/frontend/src/components/AIAssistant.jsx`

#### 5. Projects (Kanban Board) ✓
- **Features**:
  - Multiple projects with color coding
  - Kanban board with 3 columns (Not Started, In Progress, Done)
  - Task cards with priority badges
  - Assignee and due date display
  - Add task functionality
- **Mock Data**: 2 projects, 5 tasks
- **Location**: `/app/frontend/src/pages/Projects.jsx`

#### 6. Tasks Management ✓
- **Features**:
  - Task list view
  - Filter by status (All, Not Started, In Progress, Done)
  - Checkbox to mark complete
  - Priority badges (High, Medium, Low)
  - Assignee and due dates
  - Delete functionality
- **Location**: `/app/frontend/src/pages/Tasks.jsx`

#### 7. Meetings ✓
- **Features**:
  - Meeting cards with date and attendees
  - AI-generated summaries
  - Notes preview
  - Discussion points and action items
- **Mock Data**: 1 sample meeting
- **Location**: `/app/frontend/src/pages/Meetings.jsx`

#### 8. Search ✓
- **Features**:
  - Full-page search interface
  - AI-powered answers (mock)
  - Page search results
  - Suggested searches
- **Location**: `/app/frontend/src/pages/Search.jsx`

#### 9. Inbox ✓
- **Features**:
  - Notification list
  - Unread indicators
  - Message previews
  - Time stamps
- **Mock Data**: 3 sample notifications
- **Location**: `/app/frontend/src/pages/Inbox.jsx`

#### 10. Settings ✓
- **Features**:
  - Profile settings (name, email)
  - Appearance (dark mode toggle, accent color)
  - AI preferences
  - Notifications
  - Privacy & security
  - Danger zone
- **Location**: `/app/frontend/src/pages/Settings.jsx`

### State Management
- **Library**: Zustand with persistence middleware
- **Storage**: LocalStorage (key: 'lotion-storage')
- **Location**: `/app/frontend/src/store/useStore.js`

### Mock Data Structure

```javascript
// Pages
{
  id: string,
  title: string,
  icon: emoji,
  content: Block[],
  createdAt: ISO date,
  updatedAt: ISO date
}

// Projects
{
  id: string,
  name: string,
  description: string,
  status: 'not-started' | 'in-progress' | 'done',
  color: hex color,
  tasks: string[]
}

// Tasks
{
  id: string,
  title: string,
  status: 'not-started' | 'in-progress' | 'done',
  priority: 'high' | 'medium' | 'low',
  projectId: string,
  assignee: string,
  dueDate: ISO date
}

// Meetings
{
  id: string,
  title: string,
  date: ISO date,
  attendees: string[],
  notes: Block[],
  summary: string
}
```

### AI Mock Responses
All AI features return pre-written responses from `/app/frontend/src/data/mockData.js`:
- generate, rewrite, summarize, translate, expand, shorten, tone, grammar, continue, brainstorm

## Design System

### Colors
- **Background**: `#0f0f0f` (primary), `#191919` (secondary)
- **Borders**: `#2f2f2f`, `#3f3f3f` (hover)
- **Text**: White, `#gray-300`, `#gray-400`, `#gray-500`
- **Accent**: Purple-to-pink gradient (`from-purple-500 to-pink-500`)
- **Priority Colors**:
  - High: Red (`bg-red-500/20 text-red-400`)
  - Medium: Yellow (`bg-yellow-500/20 text-yellow-400`)
  - Low: Blue (`bg-blue-500/20 text-blue-400`)

### Typography
- **Headings**: Bold, larger sizes
- **Body**: Regular weight, gray tones
- **Code**: Monospace font in code blocks

### Components
- **Sidebar**: Fixed width (64px collapsed, 256px expanded)
- **Buttons**: Rounded, gradient for primary actions
- **Cards**: Rounded corners, hover effects, border transitions
- **Inputs**: Dark background, border focus states

## Future Backend Integration Plan

### Required Backend APIs (Not Yet Implemented)

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

#### Pages
- `GET /api/pages` - List all pages
- `POST /api/pages` - Create new page
- `GET /api/pages/:id` - Get page by ID
- `PUT /api/pages/:id` - Update page
- `DELETE /api/pages/:id` - Delete page

#### Projects
- `GET /api/projects` - List all projects
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

#### Tasks
- `GET /api/tasks` - List all tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

#### Meetings
- `GET /api/meetings` - List all meetings
- `POST /api/meetings` - Create new meeting
- `PUT /api/meetings/:id` - Update meeting
- `DELETE /api/meetings/:id` - Delete meeting

#### AI Features
- `POST /api/ai/generate` - Generate text
- `POST /api/ai/rewrite` - Rewrite content
- `POST /api/ai/summarize` - Summarize text
- `POST /api/ai/translate` - Translate content
- `POST /api/ai/chat` - AI chat interface

#### Search
- `GET /api/search?q=query` - Search across workspace
- `POST /api/search/ai` - AI-powered search

### Database Schema (Future - Supabase/PostgreSQL)

#### Users Table
- id, email, name, password_hash, created_at, updated_at

#### Pages Table
- id, user_id, title, icon, content (JSON), created_at, updated_at

#### Projects Table
- id, user_id, name, description, status, color, created_at, updated_at

#### Tasks Table
- id, user_id, project_id, title, status, priority, assignee, due_date, created_at, updated_at

#### Meetings Table
- id, user_id, title, date, attendees (JSON), notes (JSON), summary, created_at, updated_at

### Migration Strategy
1. Keep existing Zustand store structure
2. Add API service layer (`/app/frontend/src/services/api.js`)
3. Replace mock data with API calls
4. Add loading states and error handling
5. Implement optimistic updates
6. Add real-time sync (optional)

## Technical Notes

### Dependencies Installed
- `zustand` - State management with persistence
- All shadcn/ui components pre-installed
- React Router for navigation
- Lucide React for icons

### Environment Variables
- Frontend: `REACT_APP_BACKEND_URL` (already configured)
- Backend: `MONGO_URL` (already configured)

### Known Limitations (Current Frontend-Only Phase)
1. No real authentication - anyone can access with any credentials
2. No data persistence across devices - stored in browser LocalStorage
3. No real AI integration - all responses are pre-written mocks
4. No collaboration features - single user only
5. No file uploads - not implemented yet
6. No real-time sync - data changes are local only
7. No search indexing - simple text matching only

## Next Steps for Full Implementation
1. ✓ Complete frontend with mock data (DONE)
2. [ ] Set up Supabase backend
3. [ ] Implement authentication with Supabase Auth
4. [ ] Create database schema and migrations
5. [ ] Build API endpoints (FastAPI)
6. [ ] Integrate OpenRouter AI API
7. [ ] Connect frontend to backend
8. [ ] Add error handling and loading states
9. [ ] Implement file upload functionality
10. [ ] Add real-time collaboration
11. [ ] Testing and optimization

## Files Modified/Created

### Created Files
- `/app/frontend/src/store/useStore.js` - Zustand state management
- `/app/frontend/src/data/mockData.js` - Mock data for all features
- `/app/frontend/src/components/Sidebar.jsx` - Sidebar navigation
- `/app/frontend/src/components/BlockEditor.jsx` - Block-based editor
- `/app/frontend/src/components/BlockTypeMenu.jsx` - Block type selector
- `/app/frontend/src/components/AIBlockMenu.jsx` - AI actions on text selection
- `/app/frontend/src/components/AIAssistant.jsx` - AI chat panel
- `/app/frontend/src/pages/Home.jsx` - Dashboard
- `/app/frontend/src/pages/Login.jsx` - Login page
- `/app/frontend/src/pages/EditorPage.jsx` - Page editor
- `/app/frontend/src/pages/Projects.jsx` - Kanban board
- `/app/frontend/src/pages/Tasks.jsx` - Task list
- `/app/frontend/src/pages/Meetings.jsx` - Meeting notes
- `/app/frontend/src/pages/Search.jsx` - Search interface
- `/app/frontend/src/pages/Inbox.jsx` - Notifications
- `/app/frontend/src/pages/Settings.jsx` - User settings

### Modified Files
- `/app/frontend/src/App.js` - Updated routing and authentication logic
- `/app/frontend/package.json` - Added Zustand dependency

## Summary
✅ **Current Status**: Fully functional frontend-only Lotion AI clone with all core features
🎨 **Design**: Pixel-perfect dark-mode Notion AI clone with modern UI
📦 **State**: Zustand + LocalStorage for data persistence
🤖 **AI**: Mock responses ready for OpenRouter integration
🚀 **Ready**: Frontend is production-ready and waiting for backend integration
