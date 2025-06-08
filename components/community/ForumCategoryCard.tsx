
import React from 'react';
import { toPersianDigits } from '../../utils';
import { FolderIcon } from '../shared/AppIcons';

export interface ForumCategory {
  id: string;
  name: string;
  description: string;
  icon?: React.ReactElement<{ className?: string }>;
}

interface ForumCategoryCardProps {
  category: ForumCategory;
  // onClick?: (categoryId: string) => void; // For future navigation
}

const ForumCategoryCard: React.FC<ForumCategoryCardProps> = ({ category }) => {
  const IconComponent = category.icon || <FolderIcon className="w-6 h-6 text-indigo-500" />;

  return (
    <div 
      className="bg-gray-50 p-3.5 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-indigo-300 transition-all duration-200 cursor-pointer"
      role="button"
      tabIndex={0}
      onClick={() => alert(toPersianDigits(`مشاهده انجمن: ${category.name} (به زودی)`))}
      onKeyPress={(e) => e.key === 'Enter' && alert(toPersianDigits(`مشاهده انجمن: ${category.name} (به زودی)`))}
      aria-label={toPersianDigits(category.name)}
    >
      <div className="flex items-center mb-2">
        <div className="p-2 bg-indigo-100 rounded-full mr-2 rtl:ml-2 rtl:mr-0 flex-shrink-0">
          {React.cloneElement(IconComponent, { className: "w-5 h-5 text-indigo-600" })}
        </div>
        <h4 className="text-sm font-semibold text-indigo-700 truncate" title={toPersianDigits(category.name)}>
          {toPersianDigits(category.name)}
        </h4>
      </div>
      <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">{toPersianDigits(category.description)}</p>
      {/* Placeholder for stats like topic count, last post etc. */}
      {/* <p className="text-[10px] text-gray-400 mt-1.5">موضوعات: ۱۲ | آخرین ارسال: ۲ ساعت پیش</p> */}
    </div>
  );
};

export default ForumCategoryCard;
