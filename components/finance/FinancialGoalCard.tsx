
import React from 'react';
import { toPersianDigits } from '../../utils';
import { FinancialGoal } from '../pages/FinancePage';
import { TargetIcon, PencilIcon, TrashIcon } from '../shared/AppIcons';

interface FinancialGoalCardProps {
  goal: FinancialGoal;
  onEdit: (goal: FinancialGoal) => void;
  onDelete: (goalId: string) => void;
}

const FinancialGoalCard: React.FC<FinancialGoalCardProps> = ({ goal, onEdit, onDelete }) => {
  const progress = goal.targetAmount > 0 ? Math.min(100, (goal.savedAmount / goal.targetAmount) * 100) : 0;
  
  const progressColorClass = () => {
    if (progress >= 95) return 'bg-green-500';
    if (progress >= 70) return 'bg-sky-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-indigo-500';
  };

  return (
    <div className="bg-white p-3.5 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-150">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div className="p-1.5 bg-indigo-100 rounded-full mr-2 rtl:ml-2 rtl:mr-0 text-indigo-600">
            <TargetIcon className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-medium text-indigo-700 truncate" title={toPersianDigits(goal.title)}>
            {toPersianDigits(goal.title)}
          </h4>
        </div>
        <div className="flex space-x-1 space-x-reverse">
            <button onClick={() => onEdit(goal)} className="p-1 text-yellow-500 hover:bg-yellow-100 rounded-full" aria-label={toPersianDigits("ویرایش هدف")}>
                <PencilIcon className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => onDelete(goal.id)} className="p-1 text-red-500 hover:bg-red-100 rounded-full" aria-label={toPersianDigits("حذف هدف")}>
                <TrashIcon className="w-3.5 h-3.5" />
            </button>
        </div>
      </div>

      {goal.description && <p className="text-xs text-gray-500 mb-2 line-clamp-2">{toPersianDigits(goal.description)}</p>}
      
      <div className="text-xs text-gray-600 mb-1">
        {toPersianDigits(`پس‌انداز شده: ${goal.savedAmount.toLocaleString('fa-IR')} / ${goal.targetAmount.toLocaleString('fa-IR')} تومان`)}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 relative overflow-hidden">
        <div
          className={`h-2 rounded-full transition-all duration-500 ease-out ${progressColorClass()}`}
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        ></div>
      </div>
      <p className="text-[10px] text-gray-500 text-center mt-1">{toPersianDigits(`${progress.toFixed(0)}% تکمیل شده`)}</p>
    </div>
  );
};

export default FinancialGoalCard;
