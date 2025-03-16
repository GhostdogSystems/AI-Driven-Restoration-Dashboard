import React from 'react';
const AssessmentsList: React.FC = () => {
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-gray-800">
        Field Assessments
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        View and manage all damage assessments
      </p>
      {/* Placeholder content */}
      <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:p-6">
          <div className="text-center py-10">
            <p className="text-gray-500">
              Field assessments will be displayed here
            </p>
          </div>
        </div>
      </div>
    </div>;
};
export default AssessmentsList;