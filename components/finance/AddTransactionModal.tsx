
import React, { useState, useEffect } from 'react';
import { toPersianDigits } from '../../utils';
import { XMarkIcon, WalletIcon, CalendarDaysIcon, PlusIcon } from '../shared/AppIcons';
import { Transaction, TransactionCategory } from '../pages/FinancePage';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transaction: Omit<Transaction, 'id'>) => void;
  categories: TransactionCategory[];
  initialData?: Transaction | null;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ isOpen, onClose, onSave, categories, initialData }) => {
  const [type, setType] = useState<'income' | 'expense'>(initialData?.type || 'expense');
  const [amount, setAmount] = useState<string>(initialData?.amount.toString() || '');
  const [date, setDate] = useState<string>(initialData?.date || new Date().toISOString().split('T')[0]);
  const [title, setTitle] = useState<string>(initialData?.title || '');
  const [categoryId, setCategoryId] = useState<string>(initialData?.categoryId || '');
  const [description, setDescription] = useState<string>(initialData?.description || '');

  useEffect(() => {
    if (initialData) {
      setType(initialData.type);
      setAmount(initialData.amount.toString());
      setDate(initialData.date);
      setTitle(initialData.title);
      setCategoryId(initialData.categoryId);
      setDescription(initialData.description || '');
    } else {
      // Reset for new transaction
      setType('expense');
      setAmount('');
      setDate(new Date().toISOString().split('T')[0]);
      setTitle('');
      setCategoryId('');
      setDescription('');
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !amount || parseFloat(amount) <= 0 || !date || !categoryId) {
      alert(toPersianDigits("لطفاً تمام فیلدهای الزامی ستاره‌دار را به درستی پر کنید."));
      return;
    }
    onSave({
      type,
      amount: parseFloat(amount),
      date,
      title,
      categoryId,
      description,
    });
  };

  if (!isOpen) return null;

  const availableCategories = categories.filter(cat => cat.type === type);


  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-transaction-modal-title"
    >
      <div 
        className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto modal-scroll-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-200">
          <h2 id="add-transaction-modal-title" className="text-lg font-semibold text-gray-800">
            {toPersianDigits(initialData ? "ویرایش تراکنش" : "افزودن تراکنش جدید")}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">{toPersianDigits("نوع تراکنش*:")}</label>
            <div className="flex space-x-2 space-x-reverse">
              <button type="button" onClick={() => setType('expense')} className={`flex-1 py-2 px-3 rounded-md border ${type === 'expense' ? 'bg-red-500 text-white border-red-600 ring-1 ring-red-300' : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'}`}>
                {toPersianDigits("هزینه")}
              </button>
              <button type="button" onClick={() => setType('income')} className={`flex-1 py-2 px-3 rounded-md border ${type === 'income' ? 'bg-green-500 text-white border-green-600 ring-1 ring-green-300' : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'}`}>
                {toPersianDigits("درآمد")}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="amount" className="block text-xs font-medium text-gray-700 mb-1">{toPersianDigits("مبلغ*:")}</label>
            <input type="number" id="amount" value={amount} onChange={e => setAmount(e.target.value)} required min="0.01" step="any"
                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm" placeholder={toPersianDigits("مثال: ۱۲۵۰۰۰")}/>
          </div>

          <div>
            <label htmlFor="date" className="block text-xs font-medium text-gray-700 mb-1">{toPersianDigits("تاریخ*:")}</label>
            <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} required
                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"/>
          </div>
          
          <div>
            <label htmlFor="title" className="block text-xs font-medium text-gray-700 mb-1">{toPersianDigits("عنوان*:")}</label>
            <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required
                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm" placeholder={toPersianDigits("مثال: خرید ناهار شرکت")}/>
          </div>

          <div>
            <label htmlFor="category" className="block text-xs font-medium text-gray-700 mb-1">{toPersianDigits("دسته‌بندی*:")}</label>
            <select id="category" value={categoryId} onChange={e => setCategoryId(e.target.value)} required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white text-sm">
              <option value="">{toPersianDigits("انتخاب کنید...")}</option>
              {availableCategories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <p className="text-[10px] text-gray-500 mt-1">{toPersianDigits("هوش مصنوعی از انتخاب شما برای بهبود پیشنهادات آینده یاد می‌گیرد.")}</p>
          </div>

          <div>
            <label htmlFor="description" className="block text-xs font-medium text-gray-700 mb-1">{toPersianDigits("توضیحات (اختیاری):")}</label>
            <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={2}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm resize-y" placeholder={toPersianDigits("جزئیات بیشتر...")}></textarea>
          </div>
          
          <div className="flex justify-end space-x-2 space-x-reverse pt-3 border-t border-gray-200">
            <button type="button" onClick={onClose} className="py-2 px-4 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md text-sm">
              {toPersianDigits("انصراف")}
            </button>
            <button type="submit" className="py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm flex items-center">
              <PlusIcon className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0"/> {toPersianDigits(initialData ? "ذخیره تغییرات" : "افزودن تراکنش")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
