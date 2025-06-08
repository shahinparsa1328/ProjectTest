
import React from 'react';

interface SkeletonPathCardProps {
  viewMode: 'grid' | 'list';
}

const SkeletonPathCard: React.FC<SkeletonPathCardProps> = ({ viewMode }) => {
  if (viewMode === 'list') {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-start gap-4 animate-pulse">
        <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-lg"></div>
        <div className="flex-grow space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          <div className="h-2 bg-gray-200 rounded-full w-full mt-1"></div>
          <div className="flex items-center gap-x-3 mt-1">
            <div className="h-3 bg-gray-200 rounded w-16"></div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 flex flex-col overflow-hidden animate-pulse h-full">
      <div className="w-full h-32 bg-gray-200"></div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
        <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3 mb-3"></div>
        <div className="h-2.5 bg-gray-200 rounded-full w-full mb-2 mt-auto"></div>
        <div className="flex justify-between items-center">
          <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded-full w-1/4"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonPathCard;
