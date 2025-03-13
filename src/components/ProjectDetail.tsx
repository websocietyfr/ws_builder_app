import React, { useState } from 'react';
import { format } from 'date-fns';
import { 
  Calendar, 
  DollarSign, 
  BarChart2, 
  X, 
  FileText,
  Paperclip,
  Send,
  Download
} from 'lucide-react';
import { Project, Task, Comment } from '../types';
import { generateProjectPDF } from '../utils/pdfGenerator';

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
}

export function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  const [tasks] = useState<Task[]>([
    {
      id: '1',
      projectId: project.id,
      title: 'Foundation Work',
      description: 'Complete the foundation laying process',
      status: 'completed',
      assignee: 'John Smith',
      dueDate: '2024-04-15',
      priority: 'high'
    },
    {
      id: '2',
      projectId: project.id,
      title: 'Structural Framework',
      description: 'Erect main building structure',
      status: 'in-progress',
      assignee: 'Mike Johnson',
      dueDate: '2024-05-30',
      priority: 'high'
    },
    {
      id: '3',
      projectId: project.id,
      title: 'Electrical Installation',
      description: 'Install electrical systems and wiring',
      status: 'todo',
      assignee: 'Sarah Wilson',
      dueDate: '2024-06-15',
      priority: 'medium'
    }
  ]);

  const [comments] = useState<Comment[]>([
    {
      id: '1',
      projectId: project.id,
      author: 'Project Manager',
      content: 'Foundation work completed ahead of schedule. Great work team!',
      timestamp: '2024-03-15T10:30:00Z',
      attachments: [
        {
          id: '1',
          name: 'foundation-report.pdf',
          url: '#',
          type: 'application/pdf'
        }
      ]
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleGeneratePDF = async () => {
    await generateProjectPDF(project, tasks, comments);
  };

  const statusColors = {
    'todo': 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
    'completed': 'bg-green-100 text-green-800'
  };

  const priorityColors = {
    'low': 'bg-blue-100 text-blue-800',
    'medium': 'bg-yellow-100 text-yellow-800',
    'high': 'bg-red-100 text-red-800'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto m-4">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{project.name}</h2>
              <p className="text-gray-600 mt-2">{project.description}</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleGeneratePDF}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <FileText className="h-5 w-5 mr-2" />
                Generate PDF
              </button>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 mr-2" />
                <div>
                  <p className="text-sm font-medium">Timeline</p>
                  <p className="text-sm">
                    {format(new Date(project.startDate), 'MMM d, yyyy')} - 
                    {format(new Date(project.endDate), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center text-gray-600">
                <DollarSign className="w-5 h-5 mr-2" />
                <div>
                  <p className="text-sm font-medium">Budget</p>
                  <p className="text-sm">${project.budget.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center text-gray-600">
                <BarChart2 className="w-5 h-5 mr-2" />
                <div>
                  <p className="text-sm font-medium">Progress</p>
                  <p className="text-sm">{project.progress}% Complete</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Tasks</h3>
            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white p-4 rounded-lg border border-gray-200"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{task.title}</h4>
                      <p className="text-gray-600 text-sm mt-1">
                        {task.description}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${statusColors[task.status]}`}>
                        {task.status}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${priorityColors[task.priority]}`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <span className="mr-4">Assignee: {task.assignee}</span>
                    <span>Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Comments</h3>
            <div className="space-y-4 mb-4">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-white p-4 rounded-lg border border-gray-200"
                >
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{comment.author}</span>
                    <span className="text-sm text-gray-500">
                      {format(new Date(comment.timestamp), 'MMM d, yyyy HH:mm')}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{comment.content}</p>
                  {comment.attachments.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {comment.attachments.map((attachment) => (
                        <a
                          key={attachment.id}
                          href={attachment.url}
                          className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-700 hover:bg-gray-200"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          {attachment.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="flex-grow">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                  />
                  <div className="mt-2 flex justify-between items-center">
                    <div className="flex items-center">
                      <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                      />
                      <label
                        htmlFor="file-upload"
                        className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                      >
                        <Paperclip className="w-4 h-4 mr-1" />
                        Attach File
                      </label>
                      {selectedFile && (
                        <span className="ml-2 text-sm text-gray-600">
                          {selectedFile.name}
                        </span>
                      )}
                    </div>
                    <button
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}