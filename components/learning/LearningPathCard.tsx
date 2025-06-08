
import React from 'react';
import { LearningPath } from '../../types/learningTypes';
import { toPersianDigits, highlightText } from '../../utils';
import { AcademicCapIcon, ClockIcon, AdjustmentsVerticalIcon as LevelIcon } from '../shared/AppIcons';

interface LearningPathCardProps {
  path: LearningPath & { searchMatchSnippet?: string }; // Added searchMatchSnippet
  onSelectPath: (pathId: string) => void;
  viewMode: 'grid' | 'list';
  searchTerm?: string;
}

const LearningPathCard: React.FC<LearningPathCardProps> = ({ path, onSelectPath, viewMode, searchTerm = "" }) => {
  const accentColor = 'var(--color-primary-accent, #4f46e5)'; // Use theme variable
  const accentColorText = accentColor.startsWith('var') ? 'text-sky-600' : `text-[${accentColor}]`;
  const accentColorBg = accentColor.startsWith('var') ? 'bg-sky-600' : `bg-[${accentColor}]`;


  const difficultyColors: Record<LearningPath['difficultyLevel'], string> = {
    Beginner: 'bg-green-100 text-green-700 border-green-300',
    Intermediate: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    Advanced: 'bg-red-100 text-red-700 border-red-300',
  };

  const progressColor = path.overallProgress >= 75 ? 'bg-green-500' : path.overallProgress >= 40 ? accentColorBg : 'bg-yellow-500';


  if (viewMode === 'list') {
    return (
      <div 
        onClick={() => onSelectPath(path.id)}
        className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-sky-400 transition-all duration-200 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center gap-4"
        role="article"
        aria-labelledby={`path-title-list-${path.id}`}
      >
        <div className={`flex-shrink-0 w-16 h-16 ${accentColorBg.replace('bg-','bg-').replace('-600','-100')} rounded-lg flex items-center justify-center`}>
          <AcademicCapIcon className={`w-8 h-8 ${accentColorText}`} />
        </div>
        <div className="flex-grow min-w-0">
          <h3 id={`path-title-list-${path.id}`} className={`text-md font-semibold ${accentColorText} mb-1 truncate hover:opacity-80`}>{highlightText(path.title, searchTerm)}</h3>
          <p className="text-xs text-gray-600 mb-2 line-clamp-2">{path.searchMatchSnippet ? highlightText(path.searchMatchSnippet, searchTerm) : toPersianDigits(path.description)}</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2" aria-label={toPersianDigits(`میزان پیشرفت ${path.overallProgress} درصد`)}>
            <div 
              className={`${progressColor} h-2 rounded-full transition-all duration-500 ease-out`}
              style={{ width: `${path.overallProgress}%` }}
              role="progressbar"
              aria-valuenow={path.overallProgress}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
            <div className="flex items-center">
              <ClockIcon className="w-3.5 h-3.5 ml-1 rtl:mr-1 rtl:ml-0" />
              {toPersianDigits(path.estimatedTime)}
            </div>
            <div className="flex items-center">
              <LevelIcon className="w-3.5 h-3.5 ml-1 rtl:mr-1 rtl:ml-0" />
              {toPersianDigits(path.difficultyLevel)}
            </div>
             <div className="flex items-center">
              <span className={`font-semibold ${progressColor.replace('bg-','text-')}`}>{toPersianDigits(`${path.overallProgress}%`)}</span>
              <span className="mr-1 rtl:ml-1 rtl:mr-0">{toPersianDigits("پیشرفت")}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View
  return (
    <div 
      onClick={() => onSelectPath(path.id)}
      className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg hover:border-sky-400 transition-all duration-300 cursor-pointer flex flex-col overflow-hidden h-full group"
      role="article"
      aria-labelledby={`path-title-grid-${path.id}`}
    >
      {path.thumbnailUrl ? (
        <img src={path.thumbnailUrl} alt={toPersianDigits(path.title)} className="w-full h-32 object-cover group-hover:opacity-90 transition-opacity" />
      ) : (
        <div className={`w-full h-32 ${accentColorBg.replace('bg-','bg-').replace('-600','-100')} flex items-center justify-center`}>
          <AcademicCapIcon className={`w-12 h-12 ${accentColorText}`} />
        </div>
      )}
      <div className="p-4 flex flex-col flex-grow">
        <h3 id={`path-title-grid-${path.id}`} className={`text-md font-semibold ${accentColorText} mb-2 group-hover:opacity-80 transition-colors line-clamp-2`}>
          {highlightText(path.title, searchTerm)}
        </h3>
        <p className="text-xs text-gray-600 mb-3 line-clamp-3 flex-grow">
          {path.searchMatchSnippet ? highlightText(path.searchMatchSnippet, searchTerm) : toPersianDigits(path.description)}
        </p>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2" aria-label={toPersianDigits(`میزان پیشرفت ${path.overallProgress} درصد`)}>
            <div 
                className={`${progressColor} h-2.5 rounded-full transition-all duration-500 ease-out`}
                style={{ width: `${path.overallProgress}%` }}
                 role="progressbar"
                 aria-valuenow={path.overallProgress}
                 aria-valuemin={0}
                 aria-valuemax={100}
            ></div>
        </div>
        <div className="text-xs text-gray-500 mb-1 text-center font-medium">
            {toPersianDigits(`پیشرفت: ${path.overallProgress}%`)}
        </div>
        
        <div className="mt-auto pt-2 border-t border-gray-200/80 flex flex-wrap justify-between items-center text-xs text-gray-500">
          <span className="flex items-center">
            <ClockIcon className="w-3.5 h-3.5 ml-1 rtl:mr-1 rtl:ml-0" />
            {toPersianDigits(path.estimatedTime)}
          </span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${difficultyColors[path.difficultyLevel]}`}>
            {toPersianDigits(path.difficultyLevel)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LearningPathCard;
