import React, { useState } from 'react';
import { Plus, Filter, CheckSquare, Square } from 'lucide-react';
import useStore from '../store/useStore';
import { Button } from '../components/ui/button';

const Tasks = () => {
  const { tasks, addTask, updateTask, deleteTask } = useStore();
  const [filterStatus, setFilterStatus] = useState('all');
  
  const statusOptions = [
    { value: 'all', label: 'All Tasks' },
    { value: 'not-started', label: 'Not Started' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'done', label: 'Done' },
  ];
  
  const filteredTasks = filterStatus === 'all'
    ? tasks
    : tasks.filter(t => t.status === filterStatus);
  
  const handleAddTask = () => {
    const newTask = {
      id: `t${Date.now()}`,
      title: 'New Task',
      status: 'not-started',
      priority: 'medium',
      projectId: null,
      assignee: 'You',
      dueDate: new Date().toISOString().split('T')[0],
    };
    addTask(newTask);
  };
  
  const toggleTaskStatus = (task) => {
    const newStatus = task.status === 'done' ? 'not-started' : 'done';
    updateTask(task.id, { status: newStatus });
  };
  
  return (
    <div className="flex-1 bg-[#0f0f0f] overflow-y-auto">
      <div className="max-w-5xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Tasks</h1>
            <p className="text-gray-400">Track and manage all your tasks</p>
          </div>
          <Button
            onClick={handleAddTask}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </div>
        
        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilterStatus(option.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterStatus === option.value
                  ? 'bg-purple-600 text-white'
                  : 'bg-[#191919] text-gray-400 hover:bg-[#202020] hover:text-gray-300'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        
        {/* Tasks List */}
        <div className="space-y-2">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-[#191919] hover:bg-[#202020] rounded-lg p-4 border border-[#2f2f2f] hover:border-[#3f3f3f] transition-all group"
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleTaskStatus(task)}
                  className="flex-shrink-0"
                >
                  {task.status === 'done' ? (
                    <CheckSquare className="w-5 h-5 text-green-500" />
                  ) : (
                    <Square className="w-5 h-5 text-gray-500 hover:text-gray-400" />
                  )}
                </button>
                
                <div className="flex-1">
                  <h3 className={`text-white font-medium mb-1 ${
                    task.status === 'done' ? 'line-through text-gray-500' : ''
                  }`}>
                    {task.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      task.priority === 'high'
                        ? 'bg-red-500/20 text-red-400'
                        : task.priority === 'medium'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {task.priority}
                    </span>
                    {task.assignee && (
                      <span className="text-gray-500">{task.assignee}</span>
                    )}
                    {task.dueDate && (
                      <span className="text-gray-500">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                
                <button
                  onClick={() => deleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 px-3 py-1.5 text-sm text-red-400 hover:text-red-300 transition-opacity"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          
          {filteredTasks.length === 0 && (
            <div className="bg-[#191919] rounded-lg p-12 border border-[#2f2f2f] text-center">
              <p className="text-gray-400 mb-4">No tasks found</p>
              <Button
                onClick={handleAddTask}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Task
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;