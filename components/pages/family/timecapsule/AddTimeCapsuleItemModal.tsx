
import React, { useState, useEffect } from 'react';
import { toPersianDigits } from '../../../../utils';
import { TimeCapsuleItem, FamilyMember } from '../../../../types/familyTypes';
import { XMarkIcon, PlusIcon, ArchiveBoxIcon } from '../../../shared/AppIcons';

type TimeCapsuleFormData = Omit<TimeCapsuleItem, 'id' | 'opened' | 'creatorId'>;

interface AddTimeCapsuleItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (itemData: TimeCapsuleFormData) => void;
  familyMembers: FamilyMember[];
  editingItem?: TimeCapsuleItem | null; // For editing existing items
}

const AddTimeCapsuleItemModal: React.FC<AddTimeCapsuleItemModalProps> = ({
  isOpen,
  onClose,
  onSave,
  familyMembers,
  editingItem,
}) => {
  const [title, setTitle] = useState('');
  const [contentType, setContentType] = useState<TimeCapsuleItem['contentType']>('text');
  const [content, setContent] = useState('');
  const [recipientMemberId, setRecipientMemberId] = useState<string>('');
  const [openDate, setOpenDate] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (editingItem) {
        setTitle(editingItem.title);
        setContentType(editingItem.contentType);
        setContent(editingItem.content);
        setRecipientMemberId(editingItem.recipientMemberId || '');
        setOpenDate(editingItem.openDate);
      } else {
        setTitle('');
        setContentType('text');
        setContent('');
        setRecipientMemberId('');
        // Default open date to 1 year from now
        const oneYearFromNow = new Date();
        oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
        setOpenDate(oneYearFromNow.toISOString().split('T')[0]);
      }
    }
  }, [isOpen, editingItem]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !openDate) {
      alert(toPersianDigits("عنوان، محتوا و تاریخ باز شدن الزامی هستند."));
      return;
    }
    const today = new Date().toISOString().split('T')[0];
    if (openDate < today) {
        alert(toPersianDigits("تاریخ باز شدن باید در آینده باشد."));
        return;
    }

    onSave({
      title,
      contentType,
      content,
      recipientMemberId: recipientMemberId || undefined,
      openDate,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="full-screen-modal-overlay active" onClick={onClose} role="dialog" aria-labelledby="add-time-capsule-title">
      <div className="full-screen-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200 flex-shrink-0">
          <h2 id="add-time-capsule-title" className="text-xl sm:text-2xl font-semibold text-gray-700 flex items-center">
            <ArchiveBoxIcon className="w-6 h-6 text-rose-500 mr-2 rtl:ml-2 rtl:mr-0" />
            {toPersianDigits(editingItem ? "ویرایش کپسول زمان" : "ایجاد کپسول زمان جدید")}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="w-7 h-7" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 flex-grow overflow-y-auto modal-scroll-content !px-1 sm:!px-2 text-sm">
          <div>
            <label htmlFor="tcTitle" className="block text-xs font-medium text-gray-700 mb-1">{toPersianDigits("عنوان کپسول*:")}</label>
            <input type="text" id="tcTitle" value={title} onChange={e => setTitle(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
          </div>

          <div>
            <label htmlFor="tcContentType" className="block text-xs font-medium text-gray-700 mb-1">{toPersianDigits("نوع محتوا*:")}</label>
            <select id="tcContentType" value={contentType} onChange={e => setContentType(e.target.value as TimeCapsuleItem['contentType'])} className="w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-indigo-500 focus:border-indigo-500">
              <option value="text">{toPersianDigits("متن")}</option>
              {/* <option value="photo_url">{toPersianDigits("لینک عکس")}</option>
              <option value="video_url">{toPersianDigits("لینک ویدیو")}</option> */}
            </select>
             <p className="text-[10px] text-gray-500 mt-1">{toPersianDigits("در حال حاضر فقط محتوای متنی پشتیبانی می‌شود. امکان افزودن عکس و ویدیو در آینده اضافه خواهد شد.")}</p>
          </div>

          <div>
            <label htmlFor="tcContent" className="block text-xs font-medium text-gray-700 mb-1">{toPersianDigits("محتوا*:")}</label>
            <textarea id="tcContent" value={content} onChange={e => setContent(e.target.value)} required rows={5} className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 resize-y" placeholder={toPersianDigits("پیام، خاطره یا آرزوی خود را بنویسید...")}></textarea>
          </div>

          <div>
            <label htmlFor="tcRecipient" className="block text-xs font-medium text-gray-700 mb-1">{toPersianDigits("گیرنده (اختیاری):")}</label>
            <select id="tcRecipient" value={recipientMemberId} onChange={e => setRecipientMemberId(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-indigo-500 focus:border-indigo-500">
              <option value="">{toPersianDigits("برای همه اعضای خانواده")}</option>
              {familyMembers.map(member => (
                <option key={member.id} value={member.id}>{toPersianDigits(member.name)}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="tcOpenDate" className="block text-xs font-medium text-gray-700 mb-1">{toPersianDigits("تاریخ باز شدن کپسول*:")}</label>
            <input type="date" id="tcOpenDate" value={openDate} onChange={e => setOpenDate(e.target.value)} required min={new Date(Date.now() + 86400000).toISOString().split('T')[0]} className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          
          <div className="flex justify-end space-x-3 space-x-reverse pt-4 border-t border-gray-200 sticky bottom-0 bg-white pb-1 -mb-5 z-10">
            <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors">
              {toPersianDigits("انصراف")}
            </button>
            <button type="submit" className="px-6 py-2.5 text-sm font-medium text-white bg-rose-500 hover:bg-rose-600 rounded-lg transition-colors flex items-center">
               <PlusIcon className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0"/> {toPersianDigits(editingItem ? "ذخیره تغییرات" : "ایجاد کپسول")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTimeCapsuleItemModal;
