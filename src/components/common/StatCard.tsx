import React from 'react';
import { BoxIcon } from 'lucide-react';
interface StatCardProps {
  title: string;
  value: string;
  icon: BoxIcon;
  color: string;
}
const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  color
}) => {
  return <div className="bg-neutral-100 dark:bg-neutral-800 overflow-hidden shadow-sm rounded-lg border border-neutral-200 dark:border-neutral-700">
      <div className="p-4">
        <div className="flex items-center">
          <div className={`flex-shrink-0 rounded-md p-3 ${color}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className="ml-4 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-neutral-500 dark:text-neutral-400 truncate">
                {title}
              </dt>
              <dd>
                <div className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
                  {value}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>;
};
export default StatCard;