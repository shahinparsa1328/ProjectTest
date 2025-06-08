
import React, { useState, useEffect } from 'react';
import { toPersianDigits } from '../../utils';
import { XMarkIcon, WalletIcon, PlusIcon } from '../shared/AppIcons';
import { Debt } from './DebtListItem'; // Assuming Debt type is in DebtListItem or a shared types file

interface AddDebtModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (debtData: Omit<Debt, 'id'>) => void;
  initialData?: Debt | null;
}

const AddDebtModal: React.FC<AddDebtModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [name, setName] = useState<string>(initialData?.name || '');
  const [totalAmount, setTotalAmount] = useState<string>(initialData?.totalAmount.toString() || '');
  const [remainingAmount, setRemainingAmount] = useState<string>(initialData?.remainingAmount.toString() || '');
  const [minPayment, setMinPayment] = useState<string>(initialData?.minPayment.toString() || '');
  const [interestRate, setInterestRate] = useState<string>(initialData?.interestRate.toString() || '');
  const [dueDate, setDueDate] = useState<string>(initialData?.dueDate || '');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setTotalAmount(initialData.totalAmount.toString());
      setRemainingAmount(initialData.remainingAmount.toString());
      setMinPayment(initialData.minPayment.toString());
      setInterestRate(initialData.interestRate.toString());
      setDueDate(initialData.dueDate || '');
    } else {
      // Reset for new debt
      setName('');
      setTotalAmount('');
      setRemainingAmount('');
      setMinPayment('');
      setInterestRate('');
      setDueDate('');
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedTotalAmount = parseFloat(totalAmount);
    const parsedRemainingAmount = parseFloat(remainingAmount);
    const parsedMinPayment = parseFloat(minPayment);
    const parsedInterestRate = parseFloat(interestRate);

    if (!name.trim() || !totalAmount || parsedTotalAmount <= 0 || 
        !remainingAmount || parsedRemainingAmount < 0 || parsedRemainingAmount > parsedTotalAmount ||
        !minPayment || parsedMinPayment < 0 ||
        !interestRate || parsedInterestRate < 0) {
      alert(toPersianDigits("لطفاً تمام فیلدهای الزامی را به درستی پر کنید. مبالغ باید معتبر باشند."));
      return;
    }
    onSave({
      name,
      totalAmount: parsedTotalAmount,
      remainingAmount: parsedRemainingAmount,
      minPayment: parsedMinPayment,
      interestRate: parsedInterestRate,
      dueDate: dueDate || undefined,
    });
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-debt-modal-title"
    >
      <div 
        className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto modal-scroll-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-200">
          <h2 id="add-debt-modal-title" className="text-lg font-semibold text-gray-800 flex items-center">
            <WalletIcon className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0 text-red-600" />
            {toPersianDigits(initialData ? "ویرایش بدهی" : "افزودن بدهی جدید")}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-sm">
          <div>
            <label htmlFor="debtName" className="block text-xs font-medium text-gray-700 mb-1">{toPersianDigits("نام بدهی* (مثال: وام خودرو، کارت اعتباری بانک X):")}</label>
            <input type="text" id="debtName" value={name} onChange={e => setName(e.target.value)} required
                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"/>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
                <label htmlFor="debtTotalAmount" className="block text-xs font-medium text-gray-700 mb-1">{toPersianDigits("مبلغ کل بدهی*:")}</label>
                <input type="number" id="debtTotalAmount" value={totalAmount} onChange={e => setTotalAmount(e.target.value)} required min="0.01" step="any"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"/>
            </div>
            <div>
                <label htmlFor="debtRemainingAmount" className="block text-xs font-medium text-gray-700 mb-1">{toPersianDigits("مبلغ باقیمانده*:")}</label>
                <input type="number" id="debtRemainingAmount" value={remainingAmount} onChange={e => setRemainingAmount(e.target.value)} required min="0" step="any"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"/>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
                <label htmlFor="debtMinPayment" className="block text-xs font-medium text-gray-700 mb-1">{toPersianDigits("حداقل پرداخت ماهانه*:")}</label>
                <input type="number" id="debtMinPayment" value={minPayment} onChange={e => setMinPayment(e.target.value)} required min="0" step="any"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"/>
            </div>
            <div>
                <label htmlFor="debtInterestRate" className="block text-xs font-medium text-gray-700 mb-1">{toPersianDigits("نرخ سود سالانه (٪)*:")}</label>
                <input type="number" id="debtInterestRate" value={interestRate} onChange={e => setInterestRate(e.target.value)} required min="0" step="any"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm" placeholder={toPersianDigits("مثال: ۱۸")}/>
            </div>
          </div>
          
          <div>
            <label htmlFor="debtDueDate" className="block text-xs font-medium text-gray-700 mb-1">{toPersianDigits("تاریخ سررسید بعدی پرداخت (اختیاری):")}</label>
            <input type="date" id="debtDueDate" value={dueDate} onChange={e => setDueDate(e.target.value)}
                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"/>
          </div>
          
          <div className="flex justify-end space-x-2 space-x-reverse pt-3 border-t border-gray-200">
            <button type="button" onClick={onClose} className="py-2 px-4 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md text-xs">
              {toPersianDigits("انصراف")}
            </button>
            <button type="submit" className="py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-md text-xs flex items-center">
              <PlusIcon className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0"/> {toPersianDigits(initialData ? "ذخیره تغییرات" : "افزودن بدهی")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDebtModal;
