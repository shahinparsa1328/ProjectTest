
import React from 'react';
import { toPersianDigits } from '../../../utils';
import { ActivitySuggestion } from '../../../types/familyTypes';
import { SparklesIconNav, LightbulbIcon, LinkIcon } from '../../shared/AppIcons';

interface ActivitySuggestionCardProps {
  suggestion: ActivitySuggestion;
  childName: string;
  onShowXai?: (rationale: string) => void;
  onViewLink?: (url: string) => void;
}

const ActivitySuggestionCard: React.FC<ActivitySuggestionCardProps> = ({ suggestion, childName, onShowXai, onViewLink }) => {
  return (
    <div className="bg-orange-50 p-3.5 rounded-lg shadow-sm border border-orange-200">
      <div className="flex items-start mb-2">
        <div className="p-1.5 bg-orange-100 rounded-full mr-2 rtl:ml-2 rtl:mr-0 flex-shrink-0">
          <SparklesIconNav className="w-5 h-5 text-orange-500" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-orange-700 mb-0.5">{toPersianDigits(suggestion.title)}</h4>
          <p className="text-xs text-gray-500">{toPersianDigits(`برای ${childName} (سن: ${suggestion.ageAppropriateness})`)}</p>
        </div>
      </div>
      <p className="text-xs text-gray-600 mb-1.5 leading-relaxed">{toPersianDigits(suggestion.description)}</p>
      <div className="text-xs text-gray-600 mb-1.5">
        <strong>{toPersianDigits("فواید: ")}</strong>
        {suggestion.benefits.map(benefit => toPersianDigits(benefit)).join('، ')}
      </div>
      {suggestion.materialsNeeded && suggestion.materialsNeeded.length > 0 && (
        <p className="text-xs text-gray-500 mb-1.5">
          <strong>{toPersianDigits("مواد لازم: ")}</strong>
          {suggestion.materialsNeeded.map(material => toPersianDigits(material)).join('، ')}
        </p>
      )}
      <div className="flex justify-between items-center mt-2 pt-2 border-t border-orange-100 text-xs">
        {onShowXai && (
          <button onClick={() => onShowXai(suggestion.xaiRationale)} className="text-orange-600 hover:underline flex items-center">
            <LightbulbIcon className="w-3.5 h-3.5 ml-1 rtl:mr-1 rtl:ml-0" />{toPersianDigits("چرا این پیشنهاد؟")}
          </button>
        )}
        {suggestion.link && onViewLink && (
          <button onClick={() => onViewLink(suggestion.link!)} className="text-sky-600 hover:underline flex items-center">
            <LinkIcon className="w-3.5 h-3.5 ml-1 rtl:mr-1 rtl:ml-0" />{toPersianDigits("مشاهده منبع")}
          </button>
        )}
      </div>
    </div>
  );
};

export default ActivitySuggestionCard;
