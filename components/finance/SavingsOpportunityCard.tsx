
import React from 'react';
import { toPersianDigits } from '../../utils';
import { LightbulbIcon, ChevronLeftIcon, CheckCircleIcon, XCircleIcon } from '../shared/AppIcons';

export interface SavingsOpportunity {
  id: string;
  title: string;
  description: string;
  potentialSavings: string; // e.g., "ماهانه ۱۰۰،۰۰۰ تومان"
  xaiRationale: string;
  // actionLink?: string; // For future "Take Action" button
}

interface SavingsOpportunityCardProps {
  opportunity: SavingsOpportunity;
  onDismiss?: (id: string) => void; // Optional dismiss action
  onAction?: (id: string) => void; // Optional take action
}

const SavingsOpportunityCard: React.FC<SavingsOpportunityCardProps> = ({ opportunity, onDismiss, onAction }) => {
  return (
    <div className="bg-yellow-50 p-3.5 rounded-lg shadow-sm border border-yellow-200 hover:shadow-md transition-shadow duration-150">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 p-1.5 bg-yellow-100 rounded-full text-yellow-600">
          <LightbulbIcon className="w-5 h-5" />
        </div>
        <div className="flex-grow min-w-0">
          <h4 className="text-sm font-semibold text-yellow-700 mb-1">{toPersianDigits(opportunity.title)}</h4>
          <p className="text-xs text-gray-700 mb-1 leading-relaxed">{toPersianDigits(opportunity.description)}</p>
          <p className="text-xs font-medium text-green-600 mb-1.5">{toPersianDigits(`پتانسیل پس‌انداز: ${opportunity.potentialSavings}`)}</p>
          {opportunity.xaiRationale && (
             <p className="text-[10px] text-gray-500 italic bg-yellow-100 p-1 rounded border border-yellow-200">{toPersianDigits(`منطق AI: ${opportunity.xaiRationale}`)}</p>
          )}
        </div>
      </div>
      {(onAction || onDismiss) && (
        <div className="mt-2.5 flex justify-end items-center gap-2 pt-2 border-t border-yellow-200/70">
            {onDismiss && (
            <button 
                onClick={() => onDismiss(opportunity.id)}
                className="text-xs text-gray-500 hover:text-gray-700 py-1 px-2 rounded-md flex items-center"
            >
                <XCircleIcon className="w-3.5 h-3.5 ml-1 rtl:mr-1 rtl:ml-0" />
                {toPersianDigits("نادیده گرفتن")}
            </button>
            )}
            {onAction && (
            <button
                onClick={() => onAction(opportunity.id)}
                className="flex items-center text-xs bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2.5 rounded-md transition-colors"
            >
                {toPersianDigits("اقدام")}
                <ChevronLeftIcon className="w-3.5 h-3.5 mr-1 rtl:ml-1 rtl:mr-0 transform scale-x-[-1]" />
            </button>
            )}
        </div>
      )}
    </div>
  );
};

export default SavingsOpportunityCard;