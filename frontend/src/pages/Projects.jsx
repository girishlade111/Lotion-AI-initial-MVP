import React from 'react';
import { Plus, MoreHorizontal } from 'lucide-react';
import useStore from '../store/useStore';
import { Button } from '../components/ui/button';

const Projects = () => {
  const { projects, tasks, addProject } = useStore();
  
  const statusColumns = [
    { id: 'not-started', label: 'Not Started', color: 'border-gray-600' },
    { id: 'in-progress', label: 'In Progress', color: 'border-blue-500' },
    { id: 'done', label: 'Done', color: 'border-green-500' },
  ];
  
  const getTasksForProject = (projectId, status) => {
    return tasks.filter(t => t.projectId === projectId && t.status === status);
  };
  
  const handleAddProject = () => {
    const newProject = {
      id: `p${Date.now()}`,
      name: 'New Project',
      description: 'Project description',
      status: 'not-started',
      color: '#8b5cf6',
      tasks: [],
    };
    addProject(newProject);
  };
  
  return (
    <div className="flex-1 bg-[#0f0f0f] overflow-y-auto">
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
            <p className="text-gray-400">Manage your projects with Kanban boards</p>
          </div>
          <Button
            onClick={handleAddProject}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>
        
        {/* Projects List */}
        <div className="space-y-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-[#191919] rounded-xl border border-[#2f2f2f] overflow-hidden">
              {/* Project Header */}
              <div className="p-6 border-b border-[#2f2f2f]">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: project.color }}
                      />
                      <h2 className="text-xl font-semibold text-white">{project.name}</h2>
                    </div>
                    <p className="text-gray-400 text-sm">{project.description}</p>
                  </div>
                  <button className="p-2 hover:bg-[#2f2f2f] rounded-md transition-colors">
                    <MoreHorizontal className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>
              
              {/* Kanban Board */}
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4">
                  {statusColumns.map((column) => {
                    const columnTasks = getTasksForProject(project.id, column.id);
                    return (
                      <div key={column.id} className="flex flex-col">
                        <div className={`border-t-2 ${column.color} mb-4 pt-3`}>
                          <h3 className="text-sm font-semibold text-gray-300 mb-1">
                            {column.label}
                          </h3>
                          <p className="text-xs text-gray-500">{columnTasks.length} tasks</p>
                        </div>
                        
                        <div className="space-y-3">
                          {columnTasks.map((task) => (
                            <div
                              key={task.id}
                              className="bg-[#0f0f0f] rounded-lg p-4 border border-[#2f2f2f] hover:border-[#3f3f3f] transition-colors cursor-pointer"
                            >
                              <h4 className="text-white font-medium mb-2 text-sm">{task.title}</h4>
                              <div className="flex items-center justify-between text-xs">
                                <span className={`px-2 py-1 rounded-full ${
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
                              </div>
                              {task.dueDate && (
                                <div className="mt-2 text-xs text-gray-500">
                                  Due: {new Date(task.dueDate).toLocaleDateString()}
                                </div>
                              )}
                            </div>
                          ))}
                          
                          <button className="w-full py-2 border border-dashed border-[#2f2f2f] hover:border-[#3f3f3f] rounded-lg text-gray-500 hover:text-gray-400 text-sm transition-colors">
                            + Add task
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
          
          {projects.length === 0 && (
            <div className="bg-[#191919] rounded-xl border border-[#2f2f2f] p-12 text-center">
              <p className="text-gray-400 mb-4">No projects yet. Create your first project!</p>
              <Button
                onClick={handleAddProject}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Project
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;