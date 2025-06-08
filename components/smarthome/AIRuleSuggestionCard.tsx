
import React from 'react';
import { toPersianDigits } from '../../utils';
import { AIRuleSuggestion, AutomationRule } from '../../types/smartHomeTypes'; 
import { LightbulbIcon, CheckCircleIcon, XCircleIcon, SparklesIconNav as AiIcon } from '../shared/AppIcons';

interface AIRuleSuggestionCardProps {
  suggestion: AIRuleSuggestion;
  onCreateRule: (suggestedRule: Omit<AutomationRule, 'id' | 'isEnabled'>) => void;
  onDismiss: (id: string) => void;
  onShowXai: (rationale: string) => void; 
}

const AIRuleSuggestionCard: React.FC<AIRuleSuggestionCardProps> = ({ suggestion, onCreateRule, onDismiss, onShowXai }) => {
  return (
    <div className="bg-sky-50 p-4 rounded-xl shadow-sm border border-sky-200">
      <div className="flex items-start mb-2">
        <div className="p-1.5 bg-yellow-100 rounded-full mr-2 rtl:ml-2 rtl:mr-0 flex-shrink-0">
          <AiIcon className="w-5 h-5 text-yellow-500" />
        </div>
        <div>
            <h4 className="text-sm font-semibold text-sky-700 mb-1">{toPersianDigits(suggestion.title)}</h4>
            <p className="text-xs text-gray-600 leading-relaxed">{toPersianDigits(suggestion.description)}</p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-3 pt-2 border-t border-sky-100 text-xs">
        <button 
          onClick={() => onShowXai(suggestion.xaiRationale)} 
          className="text-sky-600 hover:underline flex items-center"
          aria-label={toPersianDigits("چرا این پیشنهاد؟")}
        >
          <LightbulbIcon className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0" />
          {toPersianDigits("چرا این پیشنهاد؟")}
        </button>
        <div className="space-x-2 space-x-reverse">
          <button 
            onClick={() => onCreateRule(suggestion.suggestedRule)} 
            className="bg-green-500 hover:bg-green-600 text-white py-1 px-2.5 rounded-md transition-colors flex items-center text-[10px]"
          >
            <CheckCircleIcon className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0" />
            {toPersianDigits("ایجاد قانون")}
          </button>
          <button 
            onClick={() => onDismiss(suggestion.id)} 
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

export default AIRuleSuggestionCard;