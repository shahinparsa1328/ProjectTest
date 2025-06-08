import React from 'react';
import { toPersianDigits } from '../../utils';
import { PencilIcon, TrashIcon, WalletIcon } from '../shared/AppIcons';

export interface Debt {
  id: string;
  name: string;
  totalAmount: number;
  remainingAmount: number;
  minPayment: number;
  interestRate: number;
  dueDate?: string; // Optional: next payment due date
  // strategy?: 'avalanche' | 'snowball' | 'custom'; // For future AI-driven repayment strategies
  // aiRepaymentSuggestion?: string; // AI's suggestion for this specific debt
}

interface DebtListItemProps {
  debt: Debt;
  onEdit: (debt: Debt) => void;
  onDelete: (debtId: string) => void;
}

const DebtListItem: React.FC<DebtListItemProps> = ({ debt, onEdit, onDelete }) => {
  const progress = debt.totalAmount > 0 ? ((debt.totalAmount - debt.remainingAmount) / debt.totalAmount) * 100 : 0;
  
  const progressColorClass = () => {
    if (progress >= 75) return 'bg-green-500';
    if (progress >= 40) return 'bg-sky-500';
    return 'bg-yellow-500';
  };

  return (
    <li className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-150">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div className="p-1.5 bg-red-100 rounded-full mr-2 rtl:ml-2 rtl:mr-0 text-red-600">
            <WalletIcon className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-medium text-gray-800 truncate" title={toPersianDigits(debt.name)}>
            {toPersianDigits(debt.name)}
          </h4>
        </div>
        <div className="flex space-x-1 space-x-reverse">
            <button 
                onClick={() => onEdit(debt)} 
                className="p-1 text-yellow-500 hover:bg-yellow-100 rounded-full"
                aria-label={toPersianDigits("ویرایش بدهی")}
            >
                <PencilIcon className="w-3.5 h-3.5" />
            </button>
            <button 
                onClick={() => onDelete(debt.id)} 
                className="p-1 text-red-500 hover:bg-red-100 rounded-full"
                aria-label={toPersianDigits("حذف بدهی")}
            >
                <TrashIcon className="w-3.5 h-3.5" />
            </button>
        </div>
      </div>

      <div className="text-xs text-gray-600 space-y-0.5 mb-2">
        <p>{toPersianDigits(`مبلغ باقیمانده: ${debt.remainingAmount.toLocaleString('fa-IR')} از ${debt.totalAmount.toLocaleString('fa-IR')} تومان`)}</p>
        <p>{toPersianDigits(`حداقل پرداخت: ${debt.minPayment.toLocaleString('fa-IR')} تومان`)} - {toPersianDigits(`نرخ سود: ${debt.interestRate}%`)}</p>
        {debt.dueDate && <p>{toPersianDigits(`سررسید بعدی: ${new Date(debt.dueDate).toLocaleDateString('fa-IR')}`)}</p>}
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2 relative overflow-hidden" title={toPersianDigits(` ${progress.toFixed(0)}% پرداخت شده`)}>
        <div
          className={`h-2 rounded-full transition-all duration-500 ease-out ${progressColorClass()}`}
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        ></div>
      </div>
      <p className="text-[10px] text-gray-500 text-center mt-1">{toPersianDigits(`${progress.toFixed(0)}% پرداخت شده`)}</p>
    </li>
  );
};

export default DebtListItem;
