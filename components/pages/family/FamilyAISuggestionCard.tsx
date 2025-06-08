
import React from 'react';
import { toPersianDigits } from '../../../utils';
import { AISuggestionFamily } from '../../../types/familyTypes';
import { LightbulbIcon, CheckCircleIcon, XCircleIcon } from '../../shared/AppIcons';

interface FamilyAISuggestionCardProps {
  suggestion: AISuggestionFamily;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
  onShowRationale: (rationale: string) => void;
  primaryAccentClass: string; 
  secondaryAccentClass: string;
}

const FamilyAISuggestionCard: React.FC<FamilyAISuggestionCardProps> = ({ suggestion, onAccept, onDecline, onShowRationale, primaryAccentClass, secondaryAccentClass }) => (
    <div className={`p-3 rounded-lg shadow-sm border ${secondaryAccentClass} bg-white`}>
        <div className="flex items-start mb-1.5">
            <LightbulbIcon className={`w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0 text-yellow-500 flex-shrink-0 mt-0.5`} />
            <p className="text-xs text-gray-700 leading-relaxed">{toPersianDigits(suggestion.text)}</p>
        </div>
        <div className="flex justify-between items-center text-xs mt-2 pt-1.5 border-t border-gray-100">
            <button onClick={() => onShowRationale(suggestion.xaiRationale)} className={`text-xs ${primaryAccentClass.replace('text-rose-600', 'text-rose-500')} hover:underline flex items-center`} aria-label={toPersianDigits("چرا این پیشنهاد؟")}>
                <LightbulbIcon className="w-3.5 h-3.5 ml-1 rtl:mr-1 rtl:ml-0"/>{toPersianDigits("چرا؟")}
            </button>
            <div className="space-x-1.5 space-x-reverse">
                <button onClick={() => onDecline(suggestion.id)} className="py-1 px-2.5 bg-red-100 text-red-600 hover:bg-red-200 rounded-md flex items-center">
                   <XCircleIcon className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0"/> {toPersianDigits("رد")}
                </button>
                <button onClick={() => onAccept(suggestion.id)} className="py-1 px-2.5 bg-green-100 text-green-600 hover:bg-green-200 rounded-md flex items-center">
                    <CheckCircleIcon className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0"/>{toPersianDigits("پذیرش")}
                </button>
            </div>
        </div>
    </div>
);

export default FamilyAISuggestionCard;
