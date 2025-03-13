import React from 'react';
import { Calendar, DollarSign, BarChart2 } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const statusColors = {
    'planning': 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
    'completed': 'bg-green-100 text-green-800',
    'on-hold': 'bg-red-100 text-red-800'
  };

  return (
    <div 
      onClick={() => onClick(project)}
      className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
    >
      <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
      <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
      
      <div className="flex items-center gap-4 mb-4">
        <span className={`px-3 py-1 rounded-full text-sm ${statusColors[project.status]}`}>
          {project.status}
        </span>
        <div className="flex items-center text-gray-600">
          <Calendar className="w-4 h-4 mr-1" />
          <span className="text-sm">{new Date(project.endDate).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center text-gray-600">
          <DollarSign className="w-4 h-4 mr-1" />
          <span>${project.budget.toLocaleString()}</span>
        </div>
        <div className="flex items-center">
          <BarChart2 className="w-4 h-4 mr-1 text-gray-600" />
          <span className="text-sm">{project.progress}% Complete</span>
        </div>
      </div>
    </div>
  );
}