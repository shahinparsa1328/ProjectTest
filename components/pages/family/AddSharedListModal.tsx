import React, { useState, useEffect } from 'react';
import { toPersianDigits } from '../../../utils';
import { XMarkIcon, PlusIcon, ListIcon as ListIconFamily } from '../../shared/AppIcons';

interface AddSharedListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddList: (listName: string) => void; // Changed from onSave to onAddList for clarity
  // initialData might be needed for editing list name in future, not used now
}

const AddSharedListModal: React.FC<AddSharedListModalProps> = ({ isOpen, onClose, onAddList }) => {
  const [listName, setListName] = useState('');

  useEffect(() => {
    if (isOpen) {
      setListName(''); // Reset list name when modal opens
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!listName.trim()) {
      alert(toPersianDigits("نام لیست نمی‌تواند خالی باشد."));
      return;
    }
    onAddList(listName.trim());
    // onClose(); // Let parent handle closing after saving
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[1000] p-4" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-shared-list-modal-title"
    >
      <div 
        className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-200">
          <h2 id="add-shared-list-modal-title" className="text-lg font-semibold text-gray-800 flex items-center">
            <ListIconFamily className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0 text-purple-600" />
            {toPersianDigits("ایجاد لیست مشترک جدید")}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label htmlFor="listName" className="block text-xs font-medium text-gray-700 mb-1">{toPersianDigits("نام لیست*:")}</label>
            <input 
              type="text" 
              id="listName" 
              value={listName} 
              onChange={e => setListName(e.target.value)} 
              required 
              className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm" 
              placeholder={toPersianDigits("مثال: لیست خرید هفتگی، کارهای خانه")}
              autoFocus
            />
          </div>
          
          <div className="flex justify-end space-x-2 space-x-reverse pt-3 border-t border-gray-100">
            <button type="button" onClick={onClose} className="py-2 px-4 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md text-xs">
              {toPersianDigits("انصراف")}
            </button>
            <button type="submit" className="py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-xs flex items-center">
              <PlusIcon className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0"/> {toPersianDigits("ایجاد لیست")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSharedListModal;