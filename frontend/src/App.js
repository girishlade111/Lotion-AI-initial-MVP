import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import useStore from './store/useStore';
import { mockPages, mockProjects, mockTasks, mockMeetings } from './data/mockData';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import EditorPage from './pages/EditorPage';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';
import Meetings from './pages/Meetings';
import Search from './pages/Search';
import Inbox from './pages/Inbox';
import Settings from './pages/Settings';
import Login from './pages/Login';
import './App.css';

function App() {
  const { isAuthenticated, pages, projects, tasks, meetings, addPage, addProject, addTask, addMeeting } = useStore();
  
  // Initialize mock data on first load
  useEffect(() => {
    if (pages.length === 0) {
      mockPages.forEach(page => addPage(page));
    }
    if (projects.length === 0) {
      mockProjects.forEach(project => addProject(project));
    }
    if (tasks.length === 0) {
      mockTasks.forEach(task => addTask(task));
    }
    if (meetings.length === 0) {
      mockMeetings.forEach(meeting => addMeeting(meeting));
    }
  }, []);
  
  if (!isAuthenticated) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    );
  }
  
  return (
    <div className="App bg-[#0f0f0f] min-h-screen">
      <BrowserRouter>
        <div className="flex h-screen">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/page/:pageId" element={<EditorPage />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/meetings" element={<Meetings />} />
            <Route path="/search" element={<Search />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/ai-assistant" element={<Home />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;