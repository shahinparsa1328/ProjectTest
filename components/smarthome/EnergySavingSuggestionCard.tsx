
import React from 'react';
import { toPersianDigits } from '../../utils';
import { EnergySavingSuggestion } from '../../types/smartHomeTypes'; 
import { LightbulbIcon, CheckCircleIcon, SparklesIconNav as AiIcon } from '../shared/AppIcons';

interface EnergySavingSuggestionCardProps {
  suggestion: EnergySavingSuggestion;
  onApply: () => void;
  onDismiss: () => void;
  onShowXai: (rationale: string) => void;
}

const EnergySavingSuggestionCard: React.FC<EnergySavingSuggestionCardProps> = ({ suggestion, onApply, onDismiss, onShowXai }) => {
  return (
    <div className="bg-green-50 p-4 rounded-xl shadow-sm border border-green-200">
      <div className="flex items-start mb-2">
        <div className="p-1.5 bg-yellow-100 rounded-full mr-2 rtl:ml-2 rtl:mr-0 flex-shrink-0">
          <AiIcon className="w-5 h-5 text-yellow-500" />
        </div>
        <div>
            <h4 className="text-sm font-semibold text-green-700 mb-1">{toPersianDigits(suggestion.title)}</h4>
            <p className="text-xs text-gray-600 leading-relaxed">{toPersianDigits(suggestion.description)}</p>
            <p className="text-xs text-green-600 font-medium mt-1">{toPersianDigits(`صرفه‌جویی بالقوه: ${suggestion.potentialSavings}`)}</p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-3 pt-2 border-t border-green-100 text-xs">
        <button 
          onClick={() => onShowXai(suggestion.rationale)} 
          className="text-green-600 hover:underline flex items-center"
          aria-label={toPersianDigits("چرا این پیشنهاد؟")}
        >
          <LightbulbIcon className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0" />
          {toPersianDigits("چرا این پیشنهاد؟")}
        </button>
        <div className="space-x-2 space-x-reverse">
          <button 
            onClick={onApply} 
            className="bg-green-500 hover:bg-green-600 text-white py-1 px-2.5 rounded-md transition-colors flex items-center text-[10px]"
          >
            <CheckCircleIcon className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0" />
            {toPersianDigits("اعمال پیشنهاد")}
          </button>
          {/* Optional Dismiss Button 
          <button 
            onClick={onDismiss} 
            className="bg-gray-400 hover:bg-gray-500 text-white py-1 px-2.5 rounded-md transition-colors flex items-center text-[10px]"
          >
            {toPersianDigits("رد کردن")}
          </button>
          */}
        </div>
      </div>
    </div>
  );
};

export default EnergySavingSuggestionCard;