
import React from 'react';
import { toPersianDigits } from '../../utils';
import { Transaction, TransactionCategory } from '../pages/FinancePage';
import { PencilIcon, TrashIcon } from '../shared/AppIcons';

interface TransactionListItemProps {
  transaction: Transaction;
  category?: TransactionCategory;
  onEdit: (transaction: Transaction) => void;
  onDelete: (transactionId: string) => void;
}

const TransactionListItem: React.FC<TransactionListItemProps> = ({ transaction, category, onEdit, onDelete }) => {
  const amountColor = transaction.type === 'income' ? 'text-green-600' : 'text-red-600';
  const amountPrefix = transaction.type === 'income' ? '+' : '-';
  
  const formattedAmount = `${amountPrefix}${toPersianDigits(transaction.amount.toLocaleString('fa-IR'))} ${toPersianDigits("تومان")}`;
  const formattedDate = new Date(transaction.date).toLocaleDateString('fa-IR', { day: '2-digit', month: 'long' });


  return (
    <li className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 hover:border-gray-300 transition-colors duration-150 flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center mb-2 sm:mb-0 flex-grow">
        {category?.icon && (
          <div className={`p-1.5 rounded-full mr-2 rtl:ml-2 rtl:mr-0 flex-shrink-0 ${
            transaction.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
          }`}>
            {/* Render the icon directly as it already contains its className */}
            {category.icon}
          </div>
        )}
        <div className="flex-grow min-w-0">
          <p className="text-sm font-medium text-gray-800 truncate" title={toPersianDigits(transaction.title)}>{toPersianDigits(transaction.title)}</p>
          <p className="text-xs text-gray-500">{category?.name || toPersianDigits("دسته‌بندی نشده")}</p>
        </div>
      </div>

      <div className="flex flex-col items-end sm:items-center sm:flex-row sm:space-x-3 sm:space-x-reverse flex-shrink-0">
         <div className="text-right sm:text-left mb-2 sm:mb-0">
            <p className={`text-sm font-semibold ${amountColor}`}>{formattedAmount}</p>
            <p className="text-xs text-gray-400">{formattedDate}</p>
        </div>
        <div className="flex space-x-1 space-x-reverse">
            <button 
                onClick={() => onEdit(transaction)} 
                className="p-1.5 text-yellow-500 hover:text-yellow-700 hover:bg-yellow-100 rounded-md transition-colors"
                aria-label={toPersianDigits("ویرایش تراکنش")}
            >
                <PencilIcon className="w-4 h-4" />
            </button>
            <button 
                onClick={() => onDelete(transaction.id)} 
                className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-md transition-colors"
                aria-label={toPersianDigits("حذف تراکنش")}
            >
                <TrashIcon className="w-4 h-4" />
            </button>
        </div>
      </div>
    </li>
  );
};

export default TransactionListItem;
