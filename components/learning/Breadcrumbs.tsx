
import React from 'react';
import { toPersianDigits } from '../../utils';
import { ChevronRightIcon } from '../shared/AppIcons'; // In RTL, this will point left

interface BreadcrumbSegment {
  label: string;
  onClick?: () => void;
}

interface BreadcrumbsProps {
  segments: BreadcrumbSegment[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ segments, className = '' }) => {
  return (
    <nav aria-label={toPersianDigits("مسیر راهنما")} className={`flex items-center space-x-1 space-x-reverse text-xs sm:text-sm text-gray-500 ${className}`}>
      {segments.map((segment, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            // ChevronRightIcon will point left in RTL due to html dir="rtl"
            // Its visual direction is what matters for a separator.
            <ChevronRightIcon className="w-4 h-4 text-gray-400" />
          )}
          {segment.onClick ? (
            <button
              onClick={segment.onClick}
              className="hover:text-sky-600 hover:underline transition-colors"
            >
              {toPersianDigits(segment.label)}
            </button>
          ) : (
            <span className="font-medium text-gray-700">{toPersianDigits(segment.label)}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
