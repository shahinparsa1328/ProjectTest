import React from 'react';
import { toPersianDigits } from '../../utils';
import { LearningSuggestion } from '../../types/learningTypes';
import { LightbulbIcon, BookIcon, AcademicCapIcon, ArrowRightIcon } from '../shared/AppIcons';
import { PageName } from '../../App';

interface AISmartLearningSuggestionCardProps {
  suggestion: LearningSuggestion;
  onViewSuggestion: (type: 'path' | 'content', itemId: string) => void;
  onDismissSuggestion?: (suggestionId: string) => void; // Optional: if dismissal is handled locally
}

const AISmartLearningSuggestionCard: React.FC<AISmartLearningSuggestionCardProps> = ({
  suggestion,
  onViewSuggestion,
  onDismissSuggestion,
}) => {
  const IconComponent = suggestion.type === 'path' ? AcademicCapIcon : BookIcon;

  return (
    <div className="bg-sky-50 p-3.5 rounded-lg shadow-sm border border-sky-200 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 p-2 bg-sky-100 rounded-full text-sky-600">
          <LightbulbIcon className="w-5 h-5" />
        </div>
        <div className="flex-grow min-w-0">
          <h4 className="text-sm font-semibold text-sky-700 mb-1">{toPersianDigits("پیشنهاد یادگیری هوشمند")}</h4>
          <p className="text-xs text-gray-600 mb-1">
            {toPersianDigits(`برای کمک به شما در "${suggestion.triggerContext}", یادگیری زیر پیشنهاد می‌شود:`)}
          </p>
          <div 
            className="mt-2 p-2.5 bg-white rounded-md border border-sky-300 cursor-pointer hover:bg-sky-100 transition-colors"
            onClick={() => onViewSuggestion(suggestion.type, suggestion.itemId)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && onViewSuggestion(suggestion.type, suggestion.itemId)}
          >
            <div className="flex items-center">
              <IconComponent className="w-4 h-4 text-sky-600 mr-2 rtl:ml-2 rtl:mr-0 flex-shrink-0" />
              <span className="text-xs font-medium text-sky-700 truncate">{toPersianDigits(suggestion.title)}</span>
            </div>
            {suggestion.description && <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">{toPersianDigits(suggestion.description)}</p>}
          </div>
        </div>
      </div>
      <div className="mt-2.5 flex justify-end items-center gap-2">
        {onDismissSuggestion && (
          <button 
            onClick={() => onDismissSuggestion(suggestion.id)}
            className="text-xs text-gray-500 hover:text-gray-700 py-1 px-2 rounded-md"
          >
            {toPersianDigits("نادیده گرفتن")}
          </button>
        )}
        <button
          onClick={() => onViewSuggestion(suggestion.type, suggestion.itemId)}
          className="flex items-center text-xs bg-sky-500 hover:bg-sky-600 text-white py-1 px-2.5 rounded-md transition-colors"
        >
          {toPersianDigits("مشاهده جزئیات")}
          <ArrowRightIcon className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0 transform scale-x-[-1]" />
        </button>
      </div>
    </div>
  );
};

export default AISmartLearningSuggestionCard;
