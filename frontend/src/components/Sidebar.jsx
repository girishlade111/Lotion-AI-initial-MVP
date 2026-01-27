import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Inbox, Briefcase, CheckSquare, Calendar, Sparkles, Settings, ChevronLeft, Plus, FileText } from 'lucide-react';
import useStore from '../store/useStore';
import { Button } from './ui/button';

const Sidebar = () => {
  const location = useLocation();
  const { sidebarCollapsed, toggleSidebar, pages, addPage } = useStore();
  
  const navItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Search', icon: Search, path: '/search' },
    { name: 'Inbox', icon: Inbox, path: '/inbox' },
    { name: 'Projects', icon: Briefcase, path: '/projects' },
    { name: 'Tasks', icon: CheckSquare, path: '/tasks' },
    { name: 'Meetings', icon: Calendar, path: '/meetings' },
    { name: 'AI Assistant', icon: Sparkles, path: '/ai-assistant' },
  ];
  
  const handleNewPage = () => {
    const newPage = {
      id: Date.now().toString(),
      title: 'Untitled',
      icon: '📄',
      content: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    addPage(newPage);
  };
  
  return (
    <div className={`h-screen bg-[#191919] border-r border-[#2f2f2f] flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
      {/* Header */}
      <div className="h-14 flex items-center justify-between px-3 border-b border-[#2f2f2f]">
        {!sidebarCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-purple-500 to-pink-500 rounded-md flex items-center justify-center text-white text-sm font-semibold">
              L
            </div>
            <span className="font-semibold text-white text-sm">Lotion AI</span>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-1.5 hover:bg-[#2f2f2f] rounded-md transition-colors"
        >
          <ChevronLeft className={`w-4 h-4 text-gray-400 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-2.5 py-2 rounded-md transition-colors ${
                  isActive
                    ? 'bg-[#2f2f2f] text-white'
                    : 'text-gray-400 hover:bg-[#252525] hover:text-gray-300'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {!sidebarCollapsed && <span className="text-sm">{item.name}</span>}
              </Link>
            );
          })}
        </nav>
        
        {/* Pages Section */}
        {!sidebarCollapsed && (
          <div className="mt-6 px-2">
            <div className="flex items-center justify-between px-2.5 mb-2">
              <span className="text-xs font-medium text-gray-500 uppercase">Pages</span>
              <button
                onClick={handleNewPage}
                className="p-1 hover:bg-[#2f2f2f] rounded transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-gray-500" />
              </button>
            </div>
            <div className="space-y-1">
              {pages.slice(0, 5).map((page) => (
                <Link
                  key={page.id}
                  to={`/page/${page.id}`}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-gray-400 hover:bg-[#252525] hover:text-gray-300 transition-colors"
                >
                  <span className="text-sm">{page.icon}</span>
                  <span className="text-sm truncate">{page.title}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Settings */}
      <div className="border-t border-[#2f2f2f] p-2">
        <Link
          to="/settings"
          className={`flex items-center gap-3 px-2.5 py-2 rounded-md transition-colors ${
            location.pathname === '/settings'
              ? 'bg-[#2f2f2f] text-white'
              : 'text-gray-400 hover:bg-[#252525] hover:text-gray-300'
          }`}
        >
          <Settings className="w-4 h-4 flex-shrink-0" />
          {!sidebarCollapsed && <span className="text-sm">Settings</span>}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;