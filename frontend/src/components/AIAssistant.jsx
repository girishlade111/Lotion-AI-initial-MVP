import React, { useState } from 'react';
import { X, Sparkles, Send } from 'lucide-react';
import { mockAIResponses } from '../data/mockData';
import { Button } from './ui/button';
import { Input } from './ui/input';

const AIAssistant = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! I\'m your AI assistant. I can help you write, summarize, translate, and answer questions. What would you like to do?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const quickPrompts = [
    'Summarize my recent notes',
    'Write a project brief',
    'Brainstorm ideas for...',
    'Translate to Spanish',
  ];
  
  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsProcessing(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        role: 'assistant',
        content: `Based on your request "${input}", ${mockAIResponses.generate}`,
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsProcessing(false);
    }, 1500);
  };
  
  const handleQuickPrompt = (prompt) => {
    setInput(prompt);
  };
  
  return (
    <div className="fixed right-0 top-0 bottom-0 w-96 bg-[#191919] border-l border-[#2f2f2f] shadow-2xl z-50 flex flex-col">
      {/* Header */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-[#2f2f2f]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-white">AI Assistant</span>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-[#2f2f2f] rounded-md transition-colors"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex gap-3 ${
              message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                message.role === 'user'
                  ? 'bg-blue-600'
                  : 'bg-gradient-to-br from-purple-500 to-pink-500'
              }`}
            >
              {message.role === 'user' ? (
                <span className="text-white text-sm font-semibold">U</span>
              ) : (
                <Sparkles className="w-4 h-4 text-white" />
              )}
            </div>
            <div
              className={`flex-1 rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-blue-600/20 text-white'
                  : 'bg-[#0f0f0f] text-gray-300'
              }`}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
            </div>
          </div>
        ))}
        
        {isProcessing && (
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 bg-[#0f0f0f] rounded-lg p-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Quick Prompts */}
      {messages.length === 1 && (
        <div className="px-4 pb-3">
          <p className="text-xs text-gray-500 mb-2">Quick prompts:</p>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleQuickPrompt(prompt)}
                className="px-3 py-1.5 bg-[#0f0f0f] hover:bg-[#2f2f2f] border border-[#2f2f2f] rounded-full text-xs text-gray-400 hover:text-white transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Input */}
      <div className="p-4 border-t border-[#2f2f2f]">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask AI anything..."
            className="flex-1 bg-[#0f0f0f] border-[#2f2f2f] text-white placeholder:text-gray-500"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isProcessing}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;