
import React from 'react';
import { LearningContent, LearningContentType } from '../../types/learningTypes';
import { toPersianDigits, highlightText } from '../../utils';
import { 
    DocumentTextIcon as ArticleIcon, 
    CameraIcon as VideoIcon, 
    ChartPieIcon as InfographicIcon, 
    ListIcon as QuizIcon, 
    CubeTransparentIcon as SimulationIcon,
    AcademicCapIcon as CourseIcon,
    BookmarkOutlineIcon, 
    BookmarkSolidIcon,
    ClockIcon,
    TagIcon,
    AdjustmentsVerticalIcon as LevelIcon
} from '../shared/AppIcons';

interface LearningContentCardProps {
  content: LearningContent & { searchMatchSnippet?: string }; // Added searchMatchSnippet
  onToggleBookmark: (contentId: string) => void;
  isBookmarked: boolean;
  viewMode: 'grid' | 'list';
  searchTerm?: string;
}

const LearningContentCard: React.FC<LearningContentCardProps> = ({ content, onToggleBookmark, isBookmarked, viewMode, searchTerm = "" }) => {
  const accentColor = 'var(--color-primary-accent, #4f46e5)'; // Use theme variable
  const accentColorText = accentColor.startsWith('var') ? 'text-sky-600' : `text-[${accentColor}]`;
  
  const typeIcons: Record<LearningContentType, React.ReactElement<{ className?: string }>> = {
    article: <ArticleIcon className="w-4 h-4" />,
    video: <VideoIcon className="w-4 h-4" />,
    infographic: <InfographicIcon className="w-4 h-4" />,
    quiz: <QuizIcon className="w-4 h-4" />,
    interactive_simulation: <SimulationIcon className="w-4 h-4" />,
    course: <CourseIcon className="w-4 h-4" />,
  };

  const typeColors: Record<LearningContentType, string> = {
    article: `text-blue-600 bg-blue-100`,
    video: `text-red-600 bg-red-100`,
    infographic: `text-purple-600 bg-purple-100`,
    quiz: `text-yellow-600 bg-yellow-100`,
    interactive_simulation: `text-teal-600 bg-teal-100`,
    course: `text-orange-600 bg-orange-100`,
  };

  const difficultyColors: Record<LearningContent['difficultyLevel'], string> = {
    Easy: 'bg-green-100 text-green-700 border-green-300',
    Medium: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    Hard: 'bg-red-100 text-red-700 border-red-300',
    Advanced: 'bg-purple-100 text-purple-700 border-purple-300',
  };
  
  const currentTypeStyle = typeColors[content.type] || `text-gray-600 bg-gray-100`;

  if (viewMode === 'list') {
    return (
      <div 
        className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-sky-300 transition-all duration-200 flex items-start gap-3"
        role="article"
        aria-labelledby={`content-title-list-${content.id}`}
        >
        <div className={`flex-shrink-0 w-12 h-12 ${currentTypeStyle} rounded-md flex items-center justify-center`}>
          {React.cloneElement(typeIcons[content.type], { className: "w-6 h-6"})}
        </div>
        <div className="flex-grow min-w-0">
          <h4 id={`content-title-list-${content.id}`} className="text-sm font-semibold text-gray-800 mb-0.5 truncate hover:text-sky-700 cursor-pointer" title={toPersianDigits(content.title)}>
            {highlightText(content.title, searchTerm)}
          </h4>
          <p className="text-xs text-gray-500 mb-1.5 line-clamp-1" title={toPersianDigits(content.description)}>
            {content.searchMatchSnippet ? highlightText(content.searchMatchSnippet, searchTerm) : toPersianDigits(content.description)}
          </p>
          <div className="flex items-center gap-x-2 text-xs text-gray-500">
            <span className="flex items-center"><ClockIcon className="w-3 h-3 ml-0.5 rtl:mr-0.5 rtl:ml-0" /> {toPersianDigits(content.estimatedTime)}</span>
            <span className={`px-1.5 py-0.5 text-[9px] font-medium border rounded-full ${difficultyColors[content.difficultyLevel]}`}>{toPersianDigits(content.difficultyLevel)}</span>
          </div>
        </div>
        <button 
            onClick={(e) => { e.stopPropagation(); onToggleBookmark(content.id); }} 
            className={`p-1.5 rounded-full hover:bg-gray-200 transition-colors ${isBookmarked ? accentColorText : 'text-gray-400 hover:text-sky-500'}`}
            aria-label={isBookmarked ? toPersianDigits("حذف از ذخیره شده‌ها") : toPersianDigits("ذخیره محتوا")}
            aria-pressed={isBookmarked}
        >
            {isBookmarked ? <BookmarkSolidIcon className="w-5 h-5" /> : <BookmarkOutlineIcon className="w-5 h-5" />}
        </button>
      </div>
    );
  }

  // Grid View
  return (
    <div 
      className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg hover:border-sky-400 transition-all duration-300 cursor-pointer flex flex-col overflow-hidden h-full group"
      role="article"
      aria-labelledby={`content-title-grid-${content.id}`}
      >
      {content.thumbnailUrl ? (
         <img src={content.thumbnailUrl} alt={toPersianDigits(content.title)} className="w-full h-32 object-cover group-hover:opacity-90 transition-opacity"/>
      ) : (
        <div className={`w-full h-32 ${currentTypeStyle.split(' ')[1]} flex items-center justify-center`}>
           {React.cloneElement(typeIcons[content.type], {className: `w-10 h-10 ${currentTypeStyle.split(' ')[0]}`})}
        </div>
      )}
      <div className="p-3 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${currentTypeStyle}`}>
            {toPersianDigits(content.type)}
          </span>
           <span className={`px-1.5 py-0.5 text-[9px] font-medium border rounded-full ${difficultyColors[content.difficultyLevel]}`}>{toPersianDigits(content.difficultyLevel)}</span>
        </div>
        <h4 id={`content-title-grid-${content.id}`} className="text-sm font-semibold text-gray-800 mb-1 group-hover:text-sky-700 transition-colors line-clamp-2" title={toPersianDigits(content.title)}>
          {highlightText(content.title, searchTerm)}
        </h4>
        <p className="text-xs text-gray-600 mb-2 line-clamp-2 flex-grow" title={toPersianDigits(content.description)}>
          {content.searchMatchSnippet ? highlightText(content.searchMatchSnippet, searchTerm) : toPersianDigits(content.description)}
        </p>
        {content.tags && content.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {content.tags.slice(0, 2).map(tag => ( 
              <span key={tag} className="px-1.5 py-0.5 text-[9px] bg-gray-200 text-gray-700 rounded-full flex items-center">
                <TagIcon className="w-2.5 h-2.5 ml-0.5 rtl:mr-0.5 rtl:ml-0"/>{toPersianDigits(tag)}
              </span>
            ))}
          </div>
        )}
        <div className="mt-auto pt-2 border-t border-gray-200/60 flex justify-between items-center text-xs text-gray-500">
          <span className="flex items-center">
            <ClockIcon className="w-3.5 h-3.5 ml-1 rtl:mr-1 rtl:ml-0" />
            {toPersianDigits(content.estimatedTime)}
          </span>
          <button 
            onClick={(e) => { e.stopPropagation(); onToggleBookmark(content.id); }} 
            className={`p-1.5 rounded-full hover:bg-gray-200 transition-colors ${isBookmarked ? accentColorText : 'text-gray-400 hover:text-sky-500'}`}
            aria-label={isBookmarked ? toPersianDigits("حذف از ذخیره شده‌ها") : toPersianDigits("ذخیره محتوا")}
            aria-pressed={isBookmarked}
          >
            {isBookmarked ? <BookmarkSolidIcon className="w-5 h-5" /> : <BookmarkOutlineIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearningContentCard;
