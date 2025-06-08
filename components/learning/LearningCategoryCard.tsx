
import React from 'react';
import { LearningCategory } from '../../types/learningTypes';
import { toPersianDigits } from '../../utils';

interface LearningCategoryCardProps {
  category: LearningCategory;
  onSelectCategory: (categoryId: string) => void;
  isSelected: boolean;
  viewMode: 'grid' | 'list';
}

const LearningCategoryCard: React.FC<LearningCategoryCardProps> = ({ category, onSelectCategory, isSelected, viewMode }) => {
  const accentColor = 'sky-600'; // Learning section accent color
  const baseClasses = "p-3 rounded-lg border transition-all duration-200 cursor-pointer";
  const selectedClasses = `bg-${accentColor} text-white border-${accentColor.replace('-600', '-700')} shadow-md ring-2 ring-${accentColor.replace('-600','-300')} ring-offset-1`;
  const unselectedClasses = `bg-white text-gray-700 border-gray-200 hover:border-${accentColor.replace('-600', '-400')} hover:shadow-sm`;

  if (viewMode === 'list') {
    return (
      <button
        onClick={() => onSelectCategory(category.id)}
        className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses} w-full flex items-center text-right`}
        aria-pressed={isSelected}
        aria-label={toPersianDigits(category.name)}
      >
        {category.icon && React.cloneElement(category.icon, { className: `w-5 h-5 ${isSelected ? 'text-white' : `text-${accentColor}`} ml-2 rtl:mr-2 rtl:ml-0` })}
        <span className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-gray-700'}`}>{toPersianDigits(category.name)}</span>
      </button>
    );
  }

  // Grid view (default)
  return (
    <button
      onClick={() => onSelectCategory(category.id)}
      className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses} flex flex-col items-center justify-center aspect-square text-center`}
      aria-pressed={isSelected}
      style={{ minHeight: '100px' }} 
      aria-label={toPersianDigits(category.name)}
    >
      {category.icon && React.cloneElement(category.icon, { className: `w-7 h-7 mb-2 ${isSelected ? 'text-white' : `text-${accentColor}`}` })}
      <span className={`text-xs sm:text-sm font-medium ${isSelected ? 'text-white' : 'text-gray-700'}`}>{toPersianDigits(category.name)}</span>
    </button>
  );
};

export default LearningCategoryCard;
