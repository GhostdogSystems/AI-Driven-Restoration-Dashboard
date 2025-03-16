import React from 'react';
interface Project {
  id: number;
  title: string;
  client: string;
  date: string;
  status: string;
  severity: string;
  progress: number;
  aiConfidence: number;
}
interface ProjectCardProps {
  project: Project;
}
const ProjectCard: React.FC<ProjectCardProps> = ({
  project
}) => {
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending review':
        return 'bg-purple-100 text-purple-800';
      case 'client approval':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  return <div className="bg-neutral-100 dark:bg-neutral-800 shadow-sm rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
          <span className={`px-2 py-1 text-xs font-medium rounded ${getSeverityColor(project.severity)}`}>
            {project.severity}
          </span>
        </div>
        <h3 className="mt-2 text-lg font-medium text-neutral-900 dark:text-neutral-100 truncate">
          {project.title}
        </h3>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          {project.client}
        </p>
        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-500">
          Created: {new Date(project.date).toLocaleDateString()}
        </p>
        <div className="mt-4">
          <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400">
            <span>Progress</span>
            <span>{project.progress}%</span>
          </div>
          <div className="mt-1 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
            <div className="bg-emerald-600 h-2 rounded-full" style={{
            width: `${project.progress}%`
          }} />
          </div>
        </div>
        <div className="mt-3 flex items-center">
          <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
            AI Confidence:
          </div>
          <div className="ml-1 text-xs font-semibold text-gray-700">
            {project.aiConfidence}%
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
            View Details
          </button>
          <button className="text-sm font-medium text-gray-500 hover:text-gray-700">
            Edit
          </button>
        </div>
      </div>
    </div>;
};
export default ProjectCard;