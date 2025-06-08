import React, { useState, useEffect } from 'react';
import { toPersianDigits } from '../../../utils';
import { CareReminder, CareReminderType, FamilyMember, careReminderTypesList } from '../../../types/familyTypes';
import { XMarkIcon, PlusIcon, CalendarDaysIcon } from '../../shared/AppIcons';

interface AddCareReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (reminderData: Omit<CareReminder, 'id' | 'completed'> | CareReminder) => void;
  initialData?: CareReminder | null;
  familyMembers: FamilyMember[]; // Specifically elders under care
}

const recurrenceOptions: { value: CareReminder['recurring'], label: string }[] = [
  { value: 'none', label: 'بدون تکرار' },
  { value: 'daily', label: 'روزانه' },
  { value: 'weekly', label: 'هفتگی' },
];

const AddCareReminderModal: React.FC<AddCareReminderModalProps> = ({ isOpen, onClose, onSave, initialData, familyMembers }) => {
  const [elderMemberId, setElderMemberId] = useState('');
  const [reminderType, setReminderType] = useState<CareReminderType>(careReminderTypesList[0].value);
  const [title, setTitle] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [notes, setNotes] = useState('');
  const [recurring, setRecurring] = useState<CareReminder['recurring']>('none');
  
  const elders = familyMembers.filter(m => m.role === 'سالمند تحت مراقبت');

  useEffect(() => {
    if (initialData) {
      setElderMemberId(initialData.elderMemberId || (elders.length === 1 ? elders[0].id : ''));
      setReminderType(initialData.reminderType || careReminderTypesList[0].value);
      setTitle(initialData.title || '');
      setDateTime(initialData.dateTime ? initialData.dateTime.substring(0, 16) : new Date().toISOString().substring(0,16));
      setNotes(initialData.notes || '');
      setRecurring(initialData.recurring || 'none');
    } else {
      // Reset for new reminder
      setElderMemberId(elders.length === 1 ? elders[0].id : '');
      setReminderType(careReminderTypesList[0].value);
      setTitle('');
      const now = new Date();
      now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
      setDateTime(now.toISOString().substring(0,16));
      setNotes('');
      setRecurring('none');
    }
  }, [initialData, isOpen, elders]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!elderMemberId || !reminderType || !title.trim() || !dateTime) {
      alert(toPersianDigits("انتخاب عضو، نوع یادآور، عنوان و تاریخ/زمان الزامی است."));
      return;
    }
    
    const reminderDataToSave = {
      elderMemberId,
      reminderType,
      title,
      dateTime: new Date(dateTime).toISOString(),
      notes: notes.trim() || undefined,
      recurring,
    };

    if (initialData && initialData.id) {
        onSave({ ...reminderDataToSave, id: initialData.id, completed: initialData.completed });
    } else {
        onSave(reminderDataToSave);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="full-screen-modal-overlay active"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-care-reminder-modal-title"
    >
      <div 
        className="full-screen-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200 flex-shrink-0">
          <h2 id="add-care-reminder-modal-title" className="text-xl sm:text-2xl font-semibold text-gray-700 flex items-center">
            <CalendarDaysIcon className="w-6 h-6 text-lime-500 mr-2 rtl:ml-2 rtl:mr-0"/>
            {toPersianDigits(initialData ? "ویرایش یادآور مراقبت" : "افزودن یادآور مراقبت جدید")}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="w-7 h-7" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 flex-grow overflow-y-auto modal-scroll-content !px-1 sm:!px-2">
          <div>
            <label htmlFor="elderMemberId" className="block text-sm font-medium text-gray-700 mb-1">{toPersianDigits("برای کدام عضو خانواده*:")}</label>
            <select 
              id="elderMemberId" 
              value={elderMemberId} 
              onChange={e => setElderMemberId(e.target.value)} 
              required
              className="w-full p-2.5 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white text-sm"
            >
              <option value="">{toPersianDigits("انتخاب کنید...")}</option>
              {elders.map(elder => (
                <option key={elder.id} value={elder.id}>{toPersianDigits(elder.name)}</option>
              ))}
            </select>
            {elders.length === 0 && <p className="text-xs text-red-500 mt-1">{toPersianDigits("ابتدا یک عضو با نقش 'سالمند تحت مراقبت' اضافه کنید.")}</p>}
          </div>

          <div>
            <label htmlFor="reminderType" className="block text-sm font-medium text-gray-700 mb-1">{toPersianDigits("نوع یادآور*:")}</label>
            <select 
              id="reminderType" 
              value={reminderType} 
              onChange={e => setReminderType(e.target.value as CareReminderType)} 
              required
              className="w-full p-2.5 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white text-sm"
            >
              {careReminderTypesList.map(opt => (
                <option key={opt.value} value={opt.value}>{toPersianDigits(opt.label)}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="reminderTitle" className="block text-sm font-medium text-gray-700 mb-1">{toPersianDigits("عنوان یادآور*:")}</label>
            <input 
              type="text" 
              id="reminderTitle" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              required 
              className="w-full p-2.5 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm" 
              placeholder={toPersianDigits("مثال: قرص فشار خون، قدم زدن عصرانه")}
            />
          </div>

          <div>
            <label htmlFor="reminderDateTime" className="block text-sm font-medium text-gray-700 mb-1">{toPersianDigits("تاریخ و زمان*:")}</label>
            <input 
              type="datetime-local" 
              id="reminderDateTime" 
              value={dateTime} 
              onChange={e => setDateTime(e.target.value)} 
              required
              className="w-full p-2.5 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm" 
            />
          </div>

          <div>
            <label htmlFor="reminderRecurring" className="block text-sm font-medium text-gray-700 mb-1">{toPersianDigits("تکرار:")}</label>
            <select 
              id="reminderRecurring" 
              value={recurring} 
              onChange={e => setRecurring(e.target.value as CareReminder['recurring'])}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white text-sm"
            >
              {recurrenceOptions.map(opt => <option key={opt.value} value={opt.value}>{toPersianDigits(opt.label)}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="reminderNotes" className="block text-sm font-medium text-gray-700 mb-1">{toPersianDigits("یادداشت‌ها (اختیاری):")}</label>
            <textarea 
              id="reminderNotes" 
              value={notes} 
              onChange={e => setNotes(e.target.value)} 
              rows={2}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm resize-y"
              placeholder={toPersianDigits("جزئیات بیشتر مانند دوز دارو، مدت فعالیت و غیره...")}
            ></textarea>
          </div>
          
          <div className="flex justify-end space-x-3 space-x-reverse pt-4 border-t border-gray-200 sticky bottom-0 bg-white pb-1 -mb-5 z-10">
            <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors">
              {toPersianDigits("انصراف")}
            </button>
            <button type="submit" className="px-6 py-2.5 text-sm font-medium text-white bg-lime-500 hover:bg-lime-600 rounded-lg transition-colors flex items-center">
               <PlusIcon className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0"/> {toPersianDigits(initialData ? "ذخیره تغییرات" : "ثبت یادآور")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCareReminderModal;