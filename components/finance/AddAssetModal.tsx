
import React, { useState, useEffect } from 'react';
import { toPersianDigits } from '../../utils';
import { XMarkIcon, WalletIcon, PlusIcon, BuildingOfficeIcon, TrendingUpIcon } from '../shared/AppIcons';
import { Asset, AssetType } from '../../types/financeTypes';

interface AddAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (assetData: Omit<Asset, 'id'>) => void;
  initialData?: Asset | null;
}

const assetTypeOptions: { value: AssetType; label: string; icon: React.ReactNode }[] = [
  { value: 'cash', label: toPersianDigits('وجه نقد'), icon: <WalletIcon className="w-4 h-4 text-green-500"/> },
  { value: 'stocks', label: toPersianDigits('سهام و اوراق بهادار'), icon: <TrendingUpIcon className="w-4 h-4 text-blue-500"/> },
  { value: 'real_estate', label: toPersianDigits('املاک و مستغلات'), icon: <BuildingOfficeIcon className="w-4 h-4 text-orange-500"/> },
  { value: 'crypto', label: toPersianDigits('ارز دیجیتال'), icon: <WalletIcon className="w-4 h-4 text-purple-500" /> },
  { value: 'vehicle', label: toPersianDigits('وسیله نقلیه'), icon: <WalletIcon className="w-4 h-4 text-gray-500" /> }, 
  { value: 'collectibles', label: toPersianDigits('کلکسیون و اشیاء قیمتی'), icon: <WalletIcon className="w-4 h-4 text-yellow-500" /> },
  { value: 'other', label: toPersianDigits('سایر دارایی‌ها'), icon: <PlusIcon className="w-4 h-4 text-gray-500"/> },
];


const AddAssetModal: React.FC<AddAssetModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [name, setName] = useState<string>(initialData?.name || '');
  const [type, setType] = useState<AssetType>(initialData?.type || 'cash');
  const [value, setValue] = useState<string>(initialData?.value.toString() || '');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setType(initialData.type);
      setValue(initialData.value.toString());
    } else {
      setName('');
      setType('cash');
      setValue('');
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedValue = parseFloat(value);
    if (!name.trim() || !value || parsedValue < 0) {
      alert(toPersianDigits("لطفاً نام و ارزش معتبر برای دارایی وارد کنید."));
      return;
    }
    onSave({ name, type, value: parsedValue });
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-asset-modal-title"
    >
      <div 
        className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto modal-scroll-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-200">
          <h2 id="add-asset-modal-title" className="text-lg font-semibold text-gray-800 flex items-center">
            <WalletIcon className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0 text-green-600" />
            {toPersianDigits(initialData ? "ویرایش دارایی" : "افزودن دارایی جدید")}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-sm">
          <div>
            <label htmlFor="assetName" className="block text-xs font-medium text-gray-700 mb-1">{toPersianDigits("نام دارایی* (مثال: آپارتمان مسکونی، خودروی پراید، سهام شرکت الف):")}</label>
            <input type="text" id="assetName" value={name} onChange={e => setName(e.target.value)} required
                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"/>
          </div>
          
          <div>
            <label htmlFor="assetType" className="block text-xs font-medium text-gray-700 mb-1">{toPersianDigits("نوع دارایی*:")}</label>
            <select id="assetType" value={type} onChange={e => setType(e.target.value as AssetType)} required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white text-sm">
              {assetTypeOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="assetValue" className="block text-xs font-medium text-gray-700 mb-1">{toPersianDigits("ارزش فعلی (تومان)*:")}</label>
            <input type="number" id="assetValue" value={value} onChange={e => setValue(e.target.value)} required min="0" step="any"
                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm" placeholder={toPersianDigits("مثال: ۵۰۰،۰۰۰،۰۰۰")}/>
          </div>
          
          <div className="flex justify-end space-x-2 space-x-reverse pt-3 border-t border-gray-200">
            <button type="button" onClick={onClose} className="py-2 px-4 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md text-xs">
              {toPersianDigits("انصراف")}
            </button>
            <button type="submit" className="py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md text-xs flex items-center">
              <PlusIcon className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0"/> {toPersianDigits(initialData ? "ذخیره تغییرات" : "افزودن دارایی")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAssetModal;
