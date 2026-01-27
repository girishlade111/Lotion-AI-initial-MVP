import React from 'react';
import { Plus, Calendar as CalendarIcon, Users, Clock } from 'lucide-react';
import useStore from '../store/useStore';
import { Button } from '../components/ui/button';

const Meetings = () => {
  const { meetings, addMeeting } = useStore();
  
  const handleAddMeeting = () => {
    const newMeeting = {
      id: `m${Date.now()}`,
      title: 'New Meeting',
      date: new Date().toISOString().split('T')[0],
      attendees: ['You'],
      notes: [
        { id: 'n1', type: 'heading2', content: 'Discussion Points' },
        { id: 'n2', type: 'text', content: '' },
      ],
      summary: '',
    };
    addMeeting(newMeeting);
  };
  
  return (
    <div className="flex-1 bg-[#0f0f0f] overflow-y-auto">
      <div className="max-w-5xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Meetings</h1>
            <p className="text-gray-400">Track meeting notes and AI summaries</p>
          </div>
          <Button
            onClick={handleAddMeeting}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Meeting
          </Button>
        </div>
        
        {/* Meetings List */}
        <div className="space-y-4">
          {meetings.map((meeting) => (
            <div
              key={meeting.id}
              className="bg-[#191919] hover:bg-[#202020] rounded-xl p-6 border border-[#2f2f2f] hover:border-[#3f3f3f] transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-white mb-2">{meeting.title}</h2>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" />
                      <span>{new Date(meeting.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{meeting.attendees.join(', ')}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* AI Summary */}
              {meeting.summary && (
                <div className="bg-[#0f0f0f] rounded-lg p-4 mb-4 border border-purple-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded flex items-center justify-center">
                      <Clock className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm font-medium text-purple-400">AI Summary</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{meeting.summary}</p>
                </div>
              )}
              
              {/* Notes Preview */}
              <div className="space-y-2">
                {meeting.notes.slice(0, 3).map((note) => (
                  <div key={note.id} className="text-gray-400 text-sm">
                    {note.type === 'heading2' && (
                      <span className="font-semibold text-white">{note.content}</span>
                    )}
                    {note.type === 'bulletList' && (
                      <span>• {note.content}</span>
                    )}
                    {note.type === 'checkbox' && (
                      <span className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={note.checked}
                          readOnly
                          className="w-3 h-3"
                        />
                        {note.content}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          {meetings.length === 0 && (
            <div className="bg-[#191919] rounded-xl p-12 border border-[#2f2f2f] text-center">
              <CalendarIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">No meetings yet. Create your first meeting note!</p>
              <Button
                onClick={handleAddMeeting}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Meeting
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Meetings;