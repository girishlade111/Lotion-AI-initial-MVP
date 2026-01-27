import React, { useState } from 'react';
import { Sparkles, FileText, Briefcase, Calendar, TrendingUp, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import useStore from '../store/useStore';
import { mockTemplates } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

const Home = () => {
  const { pages, user } = useStore();
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleAIPrompt = async () => {
    if (!aiPrompt.trim()) return;
    
    setIsProcessing(true);
    // Simulate AI processing
    setTimeout(() => {
      setAiResponse(`AI Response: Based on your query "${aiPrompt}", here's what I found. This would be powered by OpenRouter API in production with GPT-4 level intelligence.`);
      setIsProcessing(false);
    }, 1500);
  };
  
  const quickActions = [
    { icon: FileText, label: 'New Page', action: '/page/new', color: 'from-blue-500 to-cyan-500' },
    { icon: Briefcase, label: 'New Project', action: '/projects', color: 'from-purple-500 to-pink-500' },
    { icon: Calendar, label: 'New Meeting', action: '/meetings', color: 'from-green-500 to-emerald-500' },
    { icon: Sparkles, label: 'Ask AI', action: '#ai', color: 'from-amber-500 to-orange-500' },
  ];
  
  return (
    <div className="flex-1 bg-[#0f0f0f] overflow-y-auto">
      <div className="max-w-5xl mx-auto px-8 py-12">
        {/* Welcome Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-3">
            Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}
            {user ? `, ${user.name}` : ''}
          </h1>
          <p className="text-gray-400 text-lg">What would you like to create today?</p>
        </div>
        
        {/* AI Prompt Box */}
        <div className="mb-12 bg-[#191919] rounded-xl border border-[#2f2f2f] p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white font-semibold">AI Assistant</h2>
              <p className="text-sm text-gray-400">Ask me anything or give me a task</p>
            </div>
          </div>
          
          <div className="flex gap-2 mb-4">
            <Input
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAIPrompt()}
              placeholder="E.g., Summarize my recent meetings, or Write a project brief..."
              className="flex-1 bg-[#0f0f0f] border-[#2f2f2f] text-white placeholder:text-gray-500"
            />
            <Button
              onClick={handleAIPrompt}
              disabled={isProcessing}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              {isProcessing ? 'Processing...' : 'Ask AI'}
            </Button>
          </div>
          
          {aiResponse && (
            <div className="bg-[#0f0f0f] rounded-lg p-4 border border-[#2f2f2f]">
              <p className="text-gray-300 text-sm leading-relaxed">{aiResponse}</p>
            </div>
          )}
        </div>
        
        {/* Quick Actions */}
        <div className="mb-12">
          <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  to={action.action}
                  className="group bg-[#191919] hover:bg-[#202020] rounded-xl p-6 border border-[#2f2f2f] hover:border-[#3f3f3f] transition-all"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-white font-medium">{action.label}</p>
                </Link>
              );
            })}
          </div>
        </div>
        
        {/* Recent Pages */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Recent Pages</h3>
            <Link to="/pages" className="text-sm text-purple-400 hover:text-purple-300">
              View all
            </Link>
          </div>
          <div className="space-y-2">
            {pages.length === 0 ? (
              <div className="bg-[#191919] rounded-lg p-8 border border-[#2f2f2f] text-center">
                <FileText className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">No pages yet. Create your first page to get started!</p>
              </div>
            ) : (
              pages.slice(0, 5).map((page) => (
                <Link
                  key={page.id}
                  to={`/page/${page.id}`}
                  className="flex items-center gap-4 bg-[#191919] hover:bg-[#202020] rounded-lg p-4 border border-[#2f2f2f] hover:border-[#3f3f3f] transition-all group"
                >
                  <span className="text-2xl">{page.icon}</span>
                  <div className="flex-1">
                    <h4 className="text-white font-medium group-hover:text-purple-400 transition-colors">{page.title}</h4>
                    <p className="text-sm text-gray-500">Updated {new Date(page.updatedAt).toLocaleDateString()}</p>
                  </div>
                  <Clock className="w-4 h-4 text-gray-600" />
                </Link>
              ))
            )}
          </div>
        </div>
        
        {/* Templates */}
        <div>
          <h3 className="text-white font-semibold mb-4">Templates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockTemplates.map((template) => (
              <div
                key={template.id}
                className="bg-[#191919] hover:bg-[#202020] rounded-lg p-5 border border-[#2f2f2f] hover:border-[#3f3f3f] transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{template.icon}</span>
                  <div className="flex-1">
                    <h4 className="text-white font-medium mb-1 group-hover:text-purple-400 transition-colors">{template.name}</h4>
                    <p className="text-sm text-gray-400">{template.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;