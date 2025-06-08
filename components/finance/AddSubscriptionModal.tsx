
import React, { useState, useEffect } from 'react';
import { toPersianDigits } from '../../utils';
import { XMarkIcon, WalletIcon, PlusIcon, CalendarDaysIcon } from '../shared/AppIcons';
import { Subscription } from './SubscriptionListItem'; // Assuming Subscription type is in SubscriptionListItem or a shared types file

interface AddSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (subscriptionData: Omit<Subscription, 'id'>) => void;
  initialData?: Subscription | null;
}

const subscriptionCategories = [
  { value: "streaming", label: toPersianDigits("سرویس پخش (فیلم، موسیقی)") },
  { value: "software", label: toPersianDigits("نرم‌افزار و ابزار آنلاین") },
  { value: "gaming", label: toPersianDigits("بازی و سرگرمی آنلاین") },
  { value: "news_magazine", label: toPersianDigits("روزنامه و مجلات") },
  { value: "fitness_wellness", label: toPersianDigits("تناسب اندام و سلامتی") },
  { value: "education", label: toPersianDigits("آموزشی") },
  { value: "other", label: toPersianDigits("سایر") },
];

const billingCycles = [
  { value: "monthly", label: toPersianDigits("ماهانه") },
  { value: "annually", label: toPersianDigits("سالانه") },
  { value: "quarterly", label: toPersianDigits("سه‌ماهه") },
  { value: "biannually", label: toPersianDigits("شش‌ماهه") },
];

const AddSubscriptionModal: React.FC<AddSubscriptionModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [name, setName] = useState<string>(initialData?.name || '');
  const [amount, setAmount] = useState<string>(initialData?.amount.toString() || '');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually' | 'quarterly' | 'biannually'>(initialData?.billingCycle || 'monthly');
  const [nextPaymentDate, setNextPaymentDate] = useState<string>(initialData?.nextPaymentDate || '');
  const [category, setCategory] = useState<string>(initialData?.category || 'streaming');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setAmount(initialData.amount.toString());
      setBillingCycle(initialData.billingCycle);
      setNextPaymentDate(initialData.nextPaymentDate || '');
      setCategory(initialData.category);
    } else {
      setName('');
      setAmount('');
      setBillingCycle('monthly');
      setNextPaymentDate('');
      setCategory('streaming');
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (!name.trim() || !amount || parsedAmount <= 0 || !billingCycle || !category) {
      alert(toPersianDigits("لطفاً تمام فیلدهای الزامی را به درستی پر کنید. مبلغ باید معتبر باشد."));
      return;
    }
    onSave({
      name,
      amount: parsedAmount,
      billingCycle,
      nextPaymentDate: nextPaymentDate || undefined,
      category,
    });
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-subscription-modal-title"
    >
      <div 
        className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto modal-scroll-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-200">
          <h2 id="add-subscription-modal-title" className="text-lg font-semibold text-gray-800 flex items-center">
            <CalendarDaysIcon className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0 text-blue-600" />
            {toPersianDigits(initialData ? "ویرایش اشتراک/قبض" : "افزودن اشتراک/قبض جدید")}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-sm">
          <div>
            <label htmlFor="subName" className="block text-xs font-medium text-gray-700 mb-1">{toPersianDigits("نام اشتراک/قبض* (مثال: نتفلیکس، قبض برق):")}</label>
            <input type="text" id="subName" value={name} onChange={e => setName(e.target.value)} required
                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"/>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
                <label htmlFor="subAmount" className="block text-xs font-medium text-gray-700 mb-1">{toPersianDigits("مبلغ (تومان)*:")}</label>
                <input type="number" id="subAmount" value={amount} onChange={e => setAmount(e.target.value)} required min="0.01" step="any"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"/>
            </div>
            <div>
                <label htmlFor="subBillingCycle" className="block text-xs font-medium text-gray-700 mb-1">{toPersianDigits("دوره پرداخت*:")}</label>
                <select id="subBillingCycle" value={billingCycle} onChange={e => setBillingCycle(e.target.value as any)} required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white text-sm">
                    {billingCycles.map(bc => <option key={bc.value} value={bc.value}>{bc.label}</option>)}
                </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="subNextPaymentDate" className="block text-xs font-medium text-gray-700 mb-1">{toPersianDigits("تاریخ پرداخت بعدی (اختیاری):")}</label>
            <input type="date" id="subNextPaymentDate" value={nextPaymentDate} onChange={e => setNextPaymentDate(e.target.value)}
                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"/>
          </div>
          
          <div>
            <label htmlFor="subCategory" className="block text-xs font-medium text-gray-700 mb-1">{toPersianDigits("دسته‌بندی*:")}</label>
            <select id="subCategory" value={category} onChange={e => setCategory(e.target.value)} required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white text-sm">
                {subscriptionCategories.map(cat => <option key={cat.value} value={cat.value}>{cat.label}</option>)}
            </select>
          </div>
          
          <div className="flex justify-end space-x-2 space-x-reverse pt-3 border-t border-gray-200">
            <button type="button" onClick={onClose} className="py-2 px-4 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md text-xs">
              {toPersianDigits("انصراف")}
            </button>
            <button type="submit" className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs flex items-center">
              <PlusIcon className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0"/> {toPersianDigits(initialData ? "ذخیره تغییرات" : "افزودن اشتراک")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubscriptionModal;
