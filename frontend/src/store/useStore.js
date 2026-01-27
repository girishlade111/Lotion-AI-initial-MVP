import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set, get) => ({
      // User state
      user: null,
      isAuthenticated: false,
      
      // Pages and workspace
      pages: [],
      currentPage: null,
      
      // Projects and tasks
      projects: [],
      tasks: [],
      
      // Meetings
      meetings: [],
      
      // Sidebar state
      sidebarCollapsed: false,
      
      // Theme
      theme: 'dark',
      
      // Actions
      login: (userData) => set({ user: userData, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      
      setTheme: (theme) => set({ theme }),
      
      // Page actions
      addPage: (page) => set((state) => ({ pages: [...state.pages, page] })),
      updatePage: (pageId, updates) => set((state) => ({
        pages: state.pages.map(p => p.id === pageId ? { ...p, ...updates } : p)
      })),
      deletePage: (pageId) => set((state) => ({
        pages: state.pages.filter(p => p.id !== pageId)
      })),
      setCurrentPage: (page) => set({ currentPage: page }),
      
      // Project actions
      addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
      updateProject: (projectId, updates) => set((state) => ({
        projects: state.projects.map(p => p.id === projectId ? { ...p, ...updates } : p)
      })),
      
      // Task actions
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      updateTask: (taskId, updates) => set((state) => ({
        tasks: state.tasks.map(t => t.id === taskId ? { ...t, ...updates } : t)
      })),
      deleteTask: (taskId) => set((state) => ({
        tasks: state.tasks.filter(t => t.id !== taskId)
      })),
      
      // Meeting actions
      addMeeting: (meeting) => set((state) => ({ meetings: [...state.meetings, meeting] })),
      updateMeeting: (meetingId, updates) => set((state) => ({
        meetings: state.meetings.map(m => m.id === meetingId ? { ...m, ...updates } : m)
      })),
    }),
    {
      name: 'lotion-storage',
    }
  )
);

export default useStore;