
import React from 'react';

interface SkeletonContentCardProps {
  viewMode: 'grid' | 'list';
}

const SkeletonContentCard: React.FC<SkeletonContentCardProps> = ({ viewMode }) => {
  if (viewMode === 'list') {
    return (
      <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 flex items-start gap-3 animate-pulse">
        <div className="w-12 h-12 bg-gray-200 rounded-md flex-shrink-0"></div>
        <div className="flex-grow space-y-1.5">
          <div className="h-4 bg-gray-200 rounded w-4/5"></div>
          <div className="h-3 bg-gray-200 rounded w-3/5"></div>
          <div className="flex items-center gap-x-2 mt-1">
            <div className="h-3 bg-gray-200 rounded w-12"></div>
            <div className="h-3 bg-gray-200 rounded w-12"></div>
          </div>
        </div>
        <div className="w-5 h-5 bg-gray-200 rounded-full ml-auto rtl:mr-auto rtl:ml-0"></div>
      </div>
    );
  }

  // Grid view
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 flex flex-col overflow-hidden animate-pulse h-full">
      <div className="w-full h-32 bg-gray-200"></div>
      <div className="p-3 flex flex-col flex-grow">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
        <div className="mt-auto flex flex-wrap gap-1 mb-3">
          <div className="h-3 bg-gray-200 rounded-full w-12"></div>
          <div className="h-3 bg-gray-200 rounded-full w-10"></div>
        </div>
        <div className="flex justify-between items-center text-xs">
          <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonContentCard;
