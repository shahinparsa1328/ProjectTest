import React, { useState, useEffect } from 'react';
import { toPersianDigits } from '../../../../utils'; // Corrected path
import { PhotoAlbum } from '../../../../types/familyTypes'; // Corrected path
import { XMarkIcon, PlusIcon, FolderIcon } from '../../../shared/AppIcons'; // Corrected path

interface AddAlbumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (albumData: Pick<PhotoAlbum, 'name' | 'description'>, albumId?: string) => void;
  initialData?: PhotoAlbum | null;
}

const AddAlbumModal: React.FC<AddAlbumModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description || '');
    } else {
      setName('');
      setDescription('');
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert(toPersianDigits("نام آلبوم الزامی است."));
      return;
    }
    onSave({ name, description }, initialData?.id);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[1000] p-4" onClick={onClose}>
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <FolderIcon className="w-5 h-5 text-indigo-500 mr-2 rtl:ml-2 rtl:mr-0" />
            {toPersianDigits(initialData ? "ویرایش آلبوم" : "ایجاد آلبوم جدید")}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700"><XMarkIcon className="w-6 h-6" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label htmlFor="albumName" className="block text-xs font-medium text-gray-700 mb-1">{toPersianDigits("نام آلبوم*:")}</label>
            <input type="text" id="albumName" value={name} onChange={e => setName(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm" />
          </div>
          <div>
            <label htmlFor="albumDescription" className="block text-xs font-medium text-gray-700 mb-1">{toPersianDigits("توضیحات (اختیاری):")}</label>
            <textarea id="albumDescription" value={description} onChange={e => setDescription(e.target.value)} rows={2} className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm resize-y"></textarea>
          </div>
          <div className="flex justify-end space-x-2 space-x-reverse pt-3 border-t border-gray-100">
            <button type="button" onClick={onClose} className="py-2 px-4 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md text-xs">{toPersianDigits("انصراف")}</button>
            <button type="submit" className="py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-md text-xs flex items-center">
              <PlusIcon className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0"/> {toPersianDigits(initialData ? "ذخیره تغییرات" : "ایجاد آلبوم")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAlbumModal;