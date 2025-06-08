
import React from 'react';
import { toPersianDigits } from '../../../utils';
import { ElderlyAISuggestion } from '../../../types/familyTypes';
import { LightbulbIcon, ShieldExclamationIcon, AdjustmentsVerticalIcon } from '../../shared/AppIcons';

interface ElderlyCareAISuggestionCardProps {
  suggestion: ElderlyAISuggestion;
  onShowXai: (rationale: string) => void;
  primaryAccentClass: string; 
}

const ElderlyCareAISuggestionCard: React.FC<ElderlyCareAISuggestionCardProps> = ({ suggestion, onShowXai, primaryAccentClass }) => {
  let icon = <LightbulbIcon className={`w-5 h-5 ${primaryAccentClass}`} />;
  let bgColor = 'bg-indigo-50';
  let borderColor = 'border-indigo-200';
  let titleColor = primaryAccentClass; // Use theme's primary accent

  if (suggestion.severity === 'warning') {
    icon = <ShieldExclamationIcon className="w-5 h-5 text-yellow-500" />;
    bgColor = 'bg-yellow-50';
    borderColor = 'border-yellow-300';
    titleColor = 'text-yellow-700';
  } else if (suggestion.severity === 'critical') {
    icon = <ShieldExclamationIcon className="w-5 h-5 text-red-500" />;
    bgColor = 'bg-red-50';
    borderColor = 'border-red-300';
    titleColor = 'text-red-700';
  } else if (suggestion.type === 'environment_adjustment' || suggestion.alertType === 'environment_adjustment') {
     icon = <AdjustmentsVerticalIcon className={`w-5 h-5 ${primaryAccentClass}`} />;
  }


  return (
    <div className={`p-2.5 rounded-md border ${borderColor} ${bgColor} text-xs`}>
      <div className="flex items-start">
        <div className={`p-1 rounded-full mr-2 rtl:ml-2 rtl:mr-0 flex-shrink-0 ${bgColor.replace('50','100')}`}>
             {icon}
        </div>
        <div>
            {/* Display suggestionText as the main content/title for this card type */}
            <p className={`font-medium ${titleColor} mb-0.5`}>{toPersianDigits(suggestion.suggestionText)}</p>
        </div>
      </div>
      <button onClick={() => onShowXai(suggestion.rationale)} className={`text-[10px] ${primaryAccentClass.replace('text-rose-600', 'text-rose-500')} hover:underline mt-1 flex items-center`}>
          <LightbulbIcon className="w-3 h-3 ml-1 rtl:mr-1 rtl:ml-0"/>
          {toPersianDigits("چرا این پیشنهاد/هشدار؟")}
      </button>
    </div>
  );
};

export default ElderlyCareAISuggestionCard;
