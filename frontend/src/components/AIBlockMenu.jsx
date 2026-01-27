import React, { useState } from 'react';
import { Sparkles, Wand2, Languages, Type, Zap, CheckCircle } from 'lucide-react';
import { mockAIResponses } from '../data/mockData';

const AIBlockMenu = ({ position, selectedText, onClose }) => {
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState('');
  
  const aiActions = [
    { action: 'generate', label: 'Continue writing', icon: Wand2, color: 'text-purple-400' },
    { action: 'rewrite', label: 'Rewrite', icon: Type, color: 'text-blue-400' },
    { action: 'summarize', label: 'Summarize', icon: Zap, color: 'text-green-400' },
    { action: 'translate', label: 'Translate', icon: Languages, color: 'text-amber-400' },
    { action: 'grammar', label: 'Fix grammar', icon: CheckCircle, color: 'text-pink-400' },
  ];
  
  const handleAction = async (action) => {
    setProcessing(true);
    // Simulate AI processing
    setTimeout(() => {
      setResult(mockAIResponses[action] || mockAIResponses.generate);
      setProcessing(false);
    }, 1000);
  };
  
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div
        className="fixed z-50 bg-[#1a1a1a] border border-[#2f2f2f] rounded-lg shadow-2xl w-80"
        style={{ top: position.top, left: position.left }}
      >
        <div className="p-2">
          <div className="px-3 py-2 flex items-center gap-2 border-b border-[#2f2f2f]">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-medium text-gray-400">AI Actions</span>
          </div>
          
          {processing ? (
            <div className="p-4 text-center">
              <div className="animate-spin w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full mx-auto mb-2" />
              <p className="text-sm text-gray-400">Processing...</p>
            </div>
          ) : result ? (
            <div className="p-3">
              <p className="text-sm text-gray-300 mb-3">{result}</p>
              <button
                onClick={onClose}
                className="w-full px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-md transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <div className="py-1">
              {aiActions.map((aiAction) => {
                const Icon = aiAction.icon;
                return (
                  <button
                    key={aiAction.action}
                    onClick={() => handleAction(aiAction.action)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-[#2f2f2f] transition-colors"
                  >
                    <Icon className={`w-4 h-4 ${aiAction.color}`} />
                    <span className="text-white text-sm">{aiAction.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AIBlockMenu;