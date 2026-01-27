import React from 'react';
import { Inbox as InboxIcon, Mail, Star } from 'lucide-react';

const Inbox = () => {
  const inboxItems = [
    {
      id: 1,
      from: 'AI Assistant',
      subject: 'Your weekly summary is ready',
      preview: 'Here\'s a summary of your productivity this week...',
      time: '2 hours ago',
      unread: true,
    },
    {
      id: 2,
      from: 'Team Updates',
      subject: 'Project milestone completed',
      preview: 'Great work! The Q2 project milestone has been achieved...',
      time: '5 hours ago',
      unread: true,
    },
    {
      id: 3,
      from: 'System',
      subject: 'New AI features available',
      preview: 'Check out the latest AI capabilities in Lotion AI...',
      time: 'Yesterday',
      unread: false,
    },
  ];
  
  return (
    <div className="flex-1 bg-[#0f0f0f] overflow-y-auto">
      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Inbox</h1>
          <p className="text-gray-400">Stay updated with notifications and messages</p>
        </div>
        
        {/* Inbox List */}
        <div className="space-y-2">
          {inboxItems.map((item) => (
            <div
              key={item.id}
              className={`bg-[#191919] hover:bg-[#202020] rounded-lg p-4 border transition-all cursor-pointer ${
                item.unread
                  ? 'border-purple-500/30'
                  : 'border-[#2f2f2f] hover:border-[#3f3f3f]'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`font-medium truncate ${
                      item.unread ? 'text-white' : 'text-gray-400'
                    }`}>
                      {item.from}
                    </h3>
                    <span className="text-xs text-gray-500 flex-shrink-0">
                      {item.time}
                    </span>
                  </div>
                  <h4 className={`text-sm mb-1 truncate ${
                    item.unread ? 'text-white font-medium' : 'text-gray-400'
                  }`}>
                    {item.subject}
                  </h4>
                  <p className="text-sm text-gray-500 truncate">{item.preview}</p>
                </div>
                
                {item.unread && (
                  <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0 mt-2" />
                )}
              </div>
            </div>
          ))}
          
          {inboxItems.length === 0 && (
            <div className="bg-[#191919] rounded-lg p-12 border border-[#2f2f2f] text-center">
              <InboxIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">Your inbox is empty</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inbox;