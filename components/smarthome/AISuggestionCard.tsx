
import React from 'react';
import { toPersianDigits } from '../../utils';
import { AIScenarioSuggestion } from '../../types/smartHomeTypes'; 
import { LightbulbIcon, CheckCircleIcon, XCircleIcon, SparklesIconNav as AiIcon } from '../shared/AppIcons';

interface AISuggestionCardProps {
  suggestion: AIScenarioSuggestion;
  onAccept: () => void;
  onDismiss: () => void;
  onWhy: (rationale: string) => void;
}

const AISuggestionCard: React.FC<AISuggestionCardProps> = ({ suggestion, onAccept, onDismiss, onWhy }) => {
  return (
    <div className="bg-indigo-50 p-4 rounded-xl shadow-sm border border-indigo-200">
      <div className="flex items-start mb-2">
        <div className="p-1.5 bg-yellow-100 rounded-full mr-2 rtl:ml-2 rtl:mr-0 flex-shrink-0">
          <AiIcon className="w-5 h-5 text-yellow-500" />
        </div>
        <div>
            <h4 className="text-sm font-semibold text-indigo-700 mb-1">{toPersianDigits("پیشنهاد هوشمند برای شما")}</h4>
            <p className="text-xs text-gray-600 leading-relaxed">{toPersianDigits(suggestion.suggestionText)}</p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-3 pt-2 border-t border-indigo-100 text-xs">
        <button 
          onClick={() => onWhy(suggestion.rationale)} 
          className="text-indigo-600 hover:underline flex items-center"
          aria-label={toPersianDigits("چرا این پیشنهاد؟")}
        >
          <LightbulbIcon className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0" />
          {toPersianDigits("چرا این پیشنهاد؟")}
        </button>
        <div className="space-x-2 space-x-reverse">
          <button 
            onClick={onAccept} 
            className="bg-green-500 hover:bg-green-600 text-white py-1 px-2.5 rounded-md transition-colors flex items-center text-[10px]"
          >
            <CheckCircleIcon className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0" />
            {toPersianDigits("ایجاد سناریو")}
          </button>
          <button 
            onClick={onDismiss} 
            className="bg-red-500 hover:bg-red-600 text-white py-1 px-2.5 rounded-md transition-colors flex items-center text-[10px]"
          >
             <XCircleIcon className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0" />
            {toPersianDigits("رد کردن")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AISuggestionCard;