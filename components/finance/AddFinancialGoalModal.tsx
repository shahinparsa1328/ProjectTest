
import React, { useState, useEffect } from 'react';
import { toPersianDigits } from '../../utils';
import { XMarkIcon, WalletIcon, PlusIcon } from '../shared/AppIcons';
import { FinancialGoal } from '../pages/FinancePage';

interface AddFinancialGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (goalData: Omit<FinancialGoal, 'id'>) => void;
  initialData?: FinancialGoal | null;
}

const AddFinancialGoalModal: React.FC<AddFinancialGoalModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [title, setTitle] = useState<string>(initialData?.title || '');
  const [targetAmount, setTargetAmount] = useState<string>(initialData?.targetAmount.toString() || '');
  const [savedAmount, setSavedAmount] = useState<string>(initialData?.savedAmount.toString() || '0');
  const [monthlyContribution, setMonthlyContribution] = useState<string>(initialData?.monthlyContribution?.toString() || ''); // Phase 2
  const [description, setDescription] = useState<string>(initialData?.description || '');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setTargetAmount(initialData.targetAmount.toString());
      setSavedAmount(initialData.savedAmount.toString());
      setMonthlyContribution(initialData.monthlyContribution?.toString() || ''); // Phase 2
      setDescription(initialData.description || '');
    } else {
      setTitle('');
      setTargetAmount('');
      setSavedAmount('0');
      setMonthlyContribution(''); // Phase 2
      setDescription('');
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = parseFloat(targetAmount);
    const saved = parseFloat(savedAmount);
    const contribution = monthlyContribution ? parseFloat(monthlyContribution) : undefined;

    if (!title.trim() || !targetAmount || target <= 0 || saved < 0 || saved > target) {
      alert(toPersianDigits("لطفاً تمام فیلدهای الزامی را به درستی پر کنید. مبلغ پس‌انداز شده نمی‌تواند بیشتر از مبلغ هدف باشد."));
      return;
    }
    if (contribution !== undefined && contribution < 0) {
        alert(toPersianDigits("مبلغ سهم ماهانه نمی‌تواند منفی باشد."));
        return;
    }
    onSave({
      title,
      targetAmount: target,
      savedAmount: saved,
      monthlyContribution: contribution, // Phase 2
      description,
    });
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-financial-goal-modal-title"
    >
      <div 
        className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto modal-scroll-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-200">
          <h2 id="add-financial-goal-modal-title" className="text-lg font-semibold text-gray-800 flex items-center">
            <WalletIcon className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0 text-indigo-600" />
            {toPersianDigits(initialData ? "ویرایش هدف مالی" : "افزودن هدف مالی جدید")}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label htmlFor="goalTitle" className="block text-xs font-medium text-gray-700 mb-1">{toPersianDigits("عنوان هدف*:")}</label>
            <input type="text" id="goalTitle" value={title} onChange={e => setTitle(e.target.value)} required
                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm" placeholder={toPersianDigits("مثال: خرید لپ‌تاپ جدید")}/>
          </div>

          <div>
            <label htmlFor="targetAmount" className="block text-xs font-medium text-gray-700 mb-1">{toPersianDigits("مبلغ هدف*:")}</label>
            <input type="number" id="targetAmount" value={targetAmount} onChange={e => setTargetAmount(e.target.value)} required min="1"
                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm" placeholder={toPersianDigits("مثال: ۳۰،۰۰۰،۰۰۰")}/>
          </div>
          
          <div>
            <label htmlFor="savedAmount" className="block text-xs font-medium text-gray-700 mb-1">{toPersianDigits("مبلغ پس‌انداز شده تاکنون*:")}</label>
            <input type="number" id="savedAmount" value={savedAmount} onChange={e => setSavedAmount(e.target.value)} required min="0"
                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm" placeholder={toPersianDigits("مثال: ۵،۰۰۰،۰۰۰")}/>
          </div>

          <div>
            <label htmlFor="monthlyContribution" className="block text-xs font-medium text-gray-700 mb-1">{toPersianDigits("سهم ماهانه برای این هدف (اختیاری):")}</label>
            <input type="number" id="monthlyContribution" value={monthlyContribution} onChange={e => setMonthlyContribution(e.target.value)} min="0"
                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm" placeholder={toPersianDigits("مثال: ۱،۰۰۰،۰۰۰")}/>
            <p className="text-[10px] text-gray-500 mt-1">{toPersianDigits("این مبلغ از بودجه ماهانه شما برای این هدف کنار گذاشته می‌شود.")}</p>
          </div>

          <div>
            <label htmlFor="goalDescription" className="block text-xs font-medium text-gray-700 mb-1">{toPersianDigits("توضیحات (اختیاری):")}</label>
            <textarea id="goalDescription" value={description} onChange={e => setDescription(e.target.value)} rows={2}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm resize-y" placeholder={toPersianDigits("جزئیات بیشتر در مورد هدف...")}></textarea>
          </div>
          
          <div className="flex justify-end space-x-2 space-x-reverse pt-3 border-t border-gray-200">
            <button type="button" onClick={onClose} className="py-2 px-4 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md text-xs">
              {toPersianDigits("انصراف")}
            </button>
            <button type="submit" className="py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md text-xs flex items-center">
              <PlusIcon className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0"/> {toPersianDigits(initialData ? "ذخیره تغییرات" : "افزودن هدف")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFinancialGoalModal;
