import React from 'react';
import { User, Palette, Globe, Sparkles, Bell, Lock } from 'lucide-react';
import useStore from '../store/useStore';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';

const Settings = () => {
  const { user, theme, setTheme } = useStore();
  
  const settingSections = [
    {
      title: 'Profile',
      icon: User,
      items: [
        { label: 'Name', value: user?.name || 'Guest User', type: 'text' },
        { label: 'Email', value: user?.email || 'guest@lotion.ai', type: 'text' },
      ],
    },
    {
      title: 'Appearance',
      icon: Palette,
      items: [
        { label: 'Dark Mode', value: theme === 'dark', type: 'switch' },
        { label: 'Accent Color', value: 'Purple', type: 'select' },
      ],
    },
    {
      title: 'AI Preferences',
      icon: Sparkles,
      items: [
        { label: 'AI Suggestions', value: true, type: 'switch' },
        { label: 'Auto-summarize meetings', value: true, type: 'switch' },
        { label: 'AI Model', value: 'GPT-4 Level', type: 'select' },
      ],
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { label: 'Email notifications', value: true, type: 'switch' },
        { label: 'Desktop notifications', value: false, type: 'switch' },
      ],
    },
    {
      title: 'Privacy & Security',
      icon: Lock,
      items: [
        { label: 'Two-factor authentication', value: false, type: 'switch' },
        { label: 'Data encryption', value: true, type: 'switch' },
      ],
    },
  ];
  
  return (
    <div className="flex-1 bg-[#0f0f0f] overflow-y-auto">
      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Manage your workspace preferences</p>
        </div>
        
        {/* Settings Sections */}
        <div className="space-y-6">
          {settingSections.map((section) => {
            const Icon = section.icon;
            return (
              <div
                key={section.title}
                className="bg-[#191919] rounded-xl p-6 border border-[#2f2f2f]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="w-5 h-5 text-purple-400" />
                  <h2 className="text-white font-semibold text-lg">{section.title}</h2>
                </div>
                
                <div className="space-y-4">
                  {section.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-3 border-b border-[#2f2f2f] last:border-0"
                    >
                      <div>
                        <p className="text-white font-medium">{item.label}</p>
                        {item.type === 'text' && (
                          <p className="text-sm text-gray-500">{item.value}</p>
                        )}
                      </div>
                      
                      <div>
                        {item.type === 'switch' && (
                          <Switch checked={item.value} />
                        )}
                        {item.type === 'select' && (
                          <select className="bg-[#0f0f0f] border border-[#2f2f2f] rounded-md px-3 py-1.5 text-white text-sm">
                            <option>{item.value}</option>
                          </select>
                        )}
                        {item.type === 'text' && (
                          <Button variant="outline" size="sm" className="text-gray-400">
                            Edit
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Danger Zone */}
        <div className="mt-12 bg-red-500/10 rounded-xl p-6 border border-red-500/20">
          <h2 className="text-red-400 font-semibold text-lg mb-4">Danger Zone</h2>
          <div className="space-y-3">
            <Button variant="outline" className="text-red-400 border-red-500/50 hover:bg-red-500/20">
              Clear all data
            </Button>
            <Button variant="outline" className="text-red-400 border-red-500/50 hover:bg-red-500/20">
              Delete account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;