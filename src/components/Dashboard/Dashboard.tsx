import React from 'react';
import { AlertTriangleIcon, CheckCircleIcon, ClockIcon, DollarSignIcon, MessageSquareIcon, ArrowRightIcon } from 'lucide-react';
import StatCard from '../common/StatCard';
import ProjectCard from '../common/ProjectCard';
const Dashboard: React.FC = () => {
  // Mock data for demonstration
  const stats = [{
    id: 1,
    name: 'Open Assessments',
    value: '12',
    icon: ClockIcon,
    color: 'bg-blue-500'
  }, {
    id: 2,
    name: 'Completed Projects',
    value: '48',
    icon: CheckCircleIcon,
    color: 'bg-green-500'
  }, {
    id: 3,
    name: 'Urgent Tasks',
    value: '3',
    icon: AlertTriangleIcon,
    color: 'bg-amber-500'
  }, {
    id: 4,
    name: 'Total Estimates',
    value: '$285,400',
    icon: DollarSignIcon,
    color: 'bg-purple-500'
  }, {
    id: 5,
    name: 'Client Notifications',
    value: '7',
    icon: MessageSquareIcon,
    color: 'bg-rose-500'
  }];
  const recentProjects = [{
    id: 1,
    title: 'Water Damage Assessment - Riverside Apartments',
    client: 'Riverside Property Management',
    date: '2023-04-15',
    status: 'In Progress',
    severity: 'High',
    progress: 65,
    aiConfidence: 92
  }, {
    id: 2,
    title: 'Fire Damage Restoration - Highland Residence',
    client: 'John & Sarah Thompson',
    date: '2023-04-12',
    status: 'Pending Review',
    severity: 'Critical',
    progress: 80,
    aiConfidence: 88
  }, {
    id: 3,
    title: 'Mold Remediation - Oakwood Office Complex',
    client: 'Oakwood Commercial Properties',
    date: '2023-04-10',
    status: 'Client Approval',
    severity: 'Medium',
    progress: 90,
    aiConfidence: 95
  }];
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <button className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
          New Assessment
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </button>
      </div>
      {/* Stats section */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map(stat => <StatCard key={stat.id} title={stat.name} value={stat.value} icon={stat.icon} color={stat.color} />)}
      </div>
      {/* Recent projects section */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-800">Recent Projects</h2>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {recentProjects.map(project => <ProjectCard key={project.id} project={project} />)}
        </div>
      </div>
    </div>;
};
export default Dashboard;