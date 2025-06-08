import React from 'react';
import { toPersianDigits } from '../../../utils';
import { AISuggestion } from '../../../types/familyTypes';
import { LightbulbIcon, CheckCircleIcon, XCircleIcon, SparklesIconNav } from '../../shared/AppIcons';

interface AISuggestionCardProps {
  suggestion: AISuggestion;
  onAccept: () => void;
  onDismiss: () => void;
  onWhy: (suggestion: AISuggestion) => void;
}

const AISuggestionCard: React.FC<AISuggestionCardProps> = ({ suggestion, onAccept, onDismiss, onWhy }) => {
  return (
    <div className="bg-indigo-50 p-3.5 rounded-xl shadow-md border border-indigo-200/80 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-start mb-2">
        <div className="p-1.5 bg-yellow-100 rounded-full mr-2 rtl:ml-2 rtl:mr-0 flex-shrink-0">
          <SparklesIconNav className="w-5 h-5 text-yellow-500" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-indigo-700 mb-0.5">{toPersianDigits(suggestion.title)}</h4>
          <p className="text-xs text-gray-600 leading-relaxed">{toPersianDigits(suggestion.description)}</p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-indigo-100 text-xs">
        <button 
          onClick={() => onWhy(suggestion)} 
          className="text-indigo-600 hover:underline flex items-center"
          aria-label={toPersianDigits("چرا این پیشنهاد؟")}
        >
          <LightbulbIcon className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0" />
          {toPersianDigits("چرا؟")}
        </button>
        <div className="space-x-2 space-x-reverse">
          <button 
            onClick={onAccept} 
            className="bg-green-500 hover:bg-green-600 text-white py-1 px-2.5 rounded-md transition-colors flex items-center text-[10px]"
          >
            <CheckCircleIcon className="w-3.5 h-3.5 mr-1 rtl:ml-1 rtl:mr-0" />
            {toPersianDigits("پذیرش")}
          </button>
          <button 
            onClick={onDismiss} 
            className="bg-red-500 hover:bg-red-600 text-white py-1 px-2.5 rounded-md transition-colors flex items-center text-[10px]"
          >
             <XCircleIcon className="w-3.5 h-3.5 mr-1 rtl:ml-1 rtl:mr-0" />
            {toPersianDigits("رد کردن")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AISuggestionCard;