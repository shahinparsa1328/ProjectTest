import React, { useState, useEffect } from 'react';
import { toPersianDigits } from '../../../utils';
import { SleepLog, FamilyMember } from '../../../types/familyTypes';
import { XMarkIcon, PlusIcon, BedIcon } from '../../shared/AppIcons';

interface AddSleepLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (logData: Omit<SleepLog, 'id'>) => void;
  familyMembers: FamilyMember[]; // To select the child
  initialData?: SleepLog | null;
}

const sleepQualityOptions: SleepLog['quality'][] = ['خوب', 'متوسط', 'ضعیف'];

const AddSleepLogModal: React.FC<AddSleepLogModalProps> = ({ isOpen, onClose, onSave, familyMembers, initialData }) => {
  const [childMemberId, setChildMemberId] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [quality, setQuality] = useState<SleepLog['quality']>('متوسط');
  const [notes, setNotes] = useState('');

  const children = familyMembers.filter(m => m.role === 'فرزند' || !m.role);

  useEffect(() => {
    if (initialData) {
      setChildMemberId(initialData.childMemberId);
      setDate(initialData.date);
      setStartTime(initialData.startTime);
      setEndTime(initialData.endTime);
      setQuality(initialData.quality || 'متوسط');
      setNotes(initialData.notes || '');
    } else {
      setChildMemberId(children.length > 0 ? children[0].id : '');
      setDate(new Date().toISOString().split('T')[0]);
      setStartTime('21:00');
      setEndTime('07:00');
      setQuality('متوسط');
      setNotes('');
    }
  }, [initialData, isOpen, children]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!childMemberId || !date || !startTime || !endTime) {
      alert(toPersianDigits("انتخاب فرزند، تاریخ و زمان شروع و پایان خواب الزامی است."));
      return;
    }
    // Basic time validation
    if (endTime <= startTime) {
        // Could be overnight, handle that if needed, for now simple check
        // alert(toPersianDigits("زمان پایان باید بعد از زمان شروع باشد. برای خواب شبانه که روز بعد تمام می‌شود، دو رکورد جداگانه (یکی برای شب و یکی برای صبح) ثبت کنید یا تاریخ پایان را روز بعد انتخاب کنید."));
        // For simplicity, we allow end time to be earlier assuming it's next day if date is same.
        // More robust validation would check date + time.
    }

    onSave({ childMemberId, date, startTime, endTime, quality, notes });
  };

  if (!isOpen) return null;

  return (
    <div className="full-screen-modal-overlay active" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="add-sleep-log-modal-title">
      <div className="full-screen-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200 flex-shrink-0">
          <h2 id="add-sleep-log-modal-title" className="text-xl sm:text-2xl font-semibold text-gray-700 flex items-center">
            <BedIcon className="w-6 h-6 text-blue-500 mr-2 rtl:ml-2 rtl:mr-0"/>
            {toPersianDigits(initialData ? "ویرایش گزارش خواب" : "ثبت گزارش خواب کودک")}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="w-7 h-7" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 flex-grow overflow-y-auto modal-scroll-content !px-1 sm:!px-2">
          <div>
            <label htmlFor="sleepLogChild" className="block text-sm font-medium text-gray-700 mb-1">{toPersianDigits("فرزند*:")}</label>
            <select id="sleepLogChild" value={childMemberId} onChange={e => setChildMemberId(e.target.value)} required className="w-full p-2.5 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white text-sm">
              <option value="">{toPersianDigits("انتخاب کنید...")}</option>
              {children.map(child => (<option key={child.id} value={child.id}>{toPersianDigits(child.name)}</option>))}
            </select>
          </div>
          <div>
            <label htmlFor="sleepLogDate" className="block text-sm font-medium text-gray-700 mb-1">{toPersianDigits("تاریخ*:")}</label>
            <input type="date" id="sleepLogDate" value={date} onChange={e => setDate(e.target.value)} required max={new Date().toISOString().split("T")[0]} className="w-full p-2.5 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="sleepLogStartTime" className="block text-sm font-medium text-gray-700 mb-1">{toPersianDigits("زمان شروع خواب*:")}</label>
              <input type="time" id="sleepLogStartTime" value={startTime} onChange={e => setStartTime(e.target.value)} required className="w-full p-2.5 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm" />
            </div>
            <div>
              <label htmlFor="sleepLogEndTime" className="block text-sm font-medium text-gray-700 mb-1">{toPersianDigits("زمان بیدار شدن*:")}</label>
              <input type="time" id="sleepLogEndTime" value={endTime} onChange={e => setEndTime(e.target.value)} required className="w-full p-2.5 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm" />
            </div>
          </div>
          <div>
            <label htmlFor="sleepLogQuality" className="block text-sm font-medium text-gray-700 mb-1">{toPersianDigits("کیفیت خواب:")}</label>
            <select id="sleepLogQuality" value={quality} onChange={e => setQuality(e.target.value as SleepLog['quality'])} className="w-full p-2.5 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white text-sm">
              {sleepQualityOptions.map(opt => (<option key={opt} value={opt}>{toPersianDigits(opt)}</option>))}
            </select>
          </div>
          <div>
            <label htmlFor="sleepLogNotes" className="block text-sm font-medium text-gray-700 mb-1">{toPersianDigits("یادداشت‌ها (اختیاری):")}</label>
            <textarea id="sleepLogNotes" value={notes} onChange={e => setNotes(e.target.value)} rows={2} className="w-full p-2.5 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm resize-y" placeholder={toPersianDigits("مثال: چند بار بیدار شد، بی‌قرار بود...")}></textarea>
          </div>
          <div className="flex justify-end space-x-3 space-x-reverse pt-4 border-t border-gray-200 sticky bottom-0 bg-white pb-1 -mb-5 z-10">
            <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors">
              {toPersianDigits("انصراف")}
            </button>
            <button type="submit" className="px-6 py-2.5 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors flex items-center">
               <PlusIcon className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0"/> {toPersianDigits(initialData ? "ذخیره تغییرات" : "ثبت گزارش خواب")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSleepLogModal;