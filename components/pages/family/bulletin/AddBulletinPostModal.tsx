import React, { useState, useEffect } from 'react';
import { toPersianDigits } from '../../../../utils'; // Corrected path
import { BulletinPost, BulletinPostColor } from '../../../../types/familyTypes'; // Corrected path
import { XMarkIcon, PlusIcon, TagIcon } from '../../../shared/AppIcons'; // Corrected path

interface AddBulletinPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (postData: Pick<BulletinPost, 'text' | 'color'>, postId?: string) => void;
  initialData?: BulletinPost | null;
}

const postColors: { value: BulletinPostColor, label: string, class: string }[] = [
  { value: 'yellow', label: 'زرد', class: 'bg-yellow-300' },
  { value: 'pink', label: 'صورتی', class: 'bg-pink-300' },
  { value: 'blue', label: 'آبی', class: 'bg-blue-300' },
  { value: 'green', label: 'سبز', class: 'bg-green-300' },
  { value: 'purple', label: 'بنفش', class: 'bg-purple-300' },
];

const AddBulletinPostModal: React.FC<AddBulletinPostModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [text, setText] = useState('');
  const [color, setColor] = useState<BulletinPostColor>('yellow');

  useEffect(() => {
    if (initialData) {
      setText(initialData.text);
      setColor(initialData.color || 'yellow');
    } else {
      setText('');
      setColor('yellow');
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      alert(toPersianDigits("متن یادداشت نمی‌تواند خالی باشد."));
      return;
    }
    onSave({ text, color }, initialData?.id);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[1000] p-4" onClick={onClose}>
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <TagIcon className="w-5 h-5 text-yellow-500 mr-2 rtl:ml-2 rtl:mr-0" />
            {toPersianDigits(initialData ? "ویرایش یادداشت" : "افزودن یادداشت به تابلو")}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700"><XMarkIcon className="w-6 h-6" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label htmlFor="postText" className="block text-xs font-medium text-gray-700 mb-1">{toPersianDigits("متن یادداشت*:")}</label>
            <textarea id="postText" value={text} onChange={e => setText(e.target.value)} required rows={4} className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm resize-y" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">{toPersianDigits("رنگ یادداشت:")}</label>
            <div className="flex flex-wrap gap-2">
              {postColors.map(pc => (
                <button
                  key={pc.value}
                  type="button"
                  onClick={() => setColor(pc.value)}
                  className={`w-8 h-8 rounded-full border-2 ${color === pc.value ? 'ring-2 ring-offset-1 ring-indigo-500 border-indigo-400' : 'border-gray-300 hover:border-gray-400'} ${pc.class}`}
                  aria-label={toPersianDigits(pc.label)}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-2 space-x-reverse pt-3 border-t border-gray-100">
            <button type="button" onClick={onClose} className="py-2 px-4 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md text-xs">{toPersianDigits("انصراف")}</button>
            <button type="submit" className="py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md text-xs flex items-center">
              <PlusIcon className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0"/> {toPersianDigits(initialData ? "ذخیره تغییرات" : "افزودن یادداشت")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBulletinPostModal;