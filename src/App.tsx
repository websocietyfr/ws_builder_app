import React, { useState } from 'react';
import { Header } from './components/Header';
import { ProjectList } from './components/ProjectList';
import { ProjectDetail } from './components/ProjectDetail';
import { Project } from './types';

function App() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'City Center Complex',
      description: 'Modern mixed-use development featuring retail spaces, offices, and residential units in downtown area.',
      startDate: '2024-03-01',
      endDate: '2025-06-30',
      status: 'in-progress',
      budget: 15000000,
      progress: 35
    },
    {
      id: '2',
      name: 'Green Valley Residences',
      description: 'Eco-friendly residential community with sustainable features and green spaces.',
      startDate: '2024-04-15',
      endDate: '2025-08-30',
      status: 'planning',
      budget: 8500000,
      progress: 15
    },
    {
      id: '3',
      name: 'Tech Hub Innovation Center',
      description: 'State-of-the-art office complex designed for technology companies and startups.',
      startDate: '2024-02-01',
      endDate: '2024-12-31',
      status: 'in-progress',
      budget: 12000000,
      progress: 60
    }
  ]);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleAddProject = () => {
    // TODO: Implement project creation modal
    console.log('Add project clicked');
  };

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAddProject={handleAddProject} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">Current Projects</h2>
          <p className="mt-1 text-gray-500">Track and manage your building projects</p>
        </div>
        <ProjectList 
          projects={projects}
          onProjectSelect={handleProjectSelect}
        />
      </main>
      
      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}

export default App;