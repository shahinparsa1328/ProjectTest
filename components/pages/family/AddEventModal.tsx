import React, { useState, useEffect } from 'react';
import { toPersianDigits } from '../../../utils';
import { CalendarEvent, EventType, FamilyMember } from '../../../types/familyTypes';
import { XMarkIcon, CalendarDaysIcon, PlusIcon, UserCircleIcon, TagIcon, RepeatIcon } from '../../shared/AppIcons';

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (eventData: Omit<CalendarEvent, 'id' | 'color'> | CalendarEvent) => void;
  initialData?: CalendarEvent | null;
  familyMembers: FamilyMember[];
}

const eventTypes: EventType[] = ['پزشکی', 'مدرسه', 'تولد', 'دورهمی', 'واکسیناسیون', 'سایر'];
const recurrenceOptions: { value: NonNullable<CalendarEvent['recurring']>, label: string }[] = [
  { value: 'none', label: 'بدون تکرار' },
  { value: 'daily', label: 'روزانه' },
  { value: 'weekly', label: 'هفتگی' },
  { value: 'monthly', label: 'ماهانه' },
  { value: 'yearly', label: 'سالانه' },
];

// Helper to format date to YYYY-MM-DD
const formatDateForInputDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

// Helper to format date to YYYY-MM-DDTHH:mm
const formatDateForInputDateTimeLocal = (date: Date): string => {
  // Adjust for timezone offset to display local time correctly in input
  const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
  const localISOTime = (new Date(date.getTime() - tzoffset)).toISOString().slice(0, -1);
  return localISOTime.substring(0, 16);
};


const AddEventModal: React.FC<AddEventModalProps> = ({ isOpen, onClose, onSave, initialData, familyMembers }) => {
  const [title, setTitle] = useState('');
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');
  const [allDay, setAllDay] = useState(false);
  const [description, setDescription] = useState('');
  const [eventType, setEventType] = useState<EventType>('سایر');
  const [relatedMemberId, setRelatedMemberId] = useState<string>('');
  const [recurring, setRecurring] = useState<CalendarEvent['recurring']>('none');

  const isBirthdayEvent = eventType === 'تولد';
  const relatedMemberHasDob = familyMembers.find(m => m.id === relatedMemberId)?.dob;
  const disableRecurrenceForBirthday = isBirthdayEvent && !!relatedMemberHasDob;

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setTitle(initialData.title);
        const startDate = new Date(initialData.start);
        setAllDay(initialData.allDay || false);
        setStartDateTime(initialData.allDay ? formatDateForInputDate(startDate) : formatDateForInputDateTimeLocal(startDate));
        
        if (initialData.end) {
          const endDate = new Date(initialData.end);
          setEndDateTime(initialData.allDay ? formatDateForInputDate(endDate) : formatDateForInputDateTimeLocal(endDate));
        } else {
          setEndDateTime('');
        }
        setDescription(initialData.description || '');
        setEventType(initialData.eventType || 'سایر');
        setRelatedMemberId(initialData.relatedMemberId || '');
        setRecurring(initialData.recurring || 'none');
      } else {
        setTitle('');
        const now = new Date();
        setAllDay(false);
        setStartDateTime(formatDateForInputDateTimeLocal(now));
        setEndDateTime('');
        setDescription('');
        setEventType('سایر');
        setRelatedMemberId('');
        setRecurring('none');
      }
    }
  }, [initialData, isOpen]);
  
  useEffect(() => {
    if (disableRecurrenceForBirthday) {
      setRecurring('yearly');
    }
  }, [eventType, relatedMemberId, familyMembers, disableRecurrenceForBirthday]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !startDateTime) {
      alert(toPersianDigits("عنوان و تاریخ/زمان شروع رویداد الزامی است."));
      return;
    }

    let startISO: string;
    let endISO: string | undefined;

    if (allDay) {
        startISO = new Date(startDateTime + 'T00:00:00').toISOString(); 
        endISO = endDateTime ? new Date(endDateTime + 'T23:59:59').toISOString() : undefined; 
        if(endISO && new Date(endISO) < new Date(startISO)){
            alert(toPersianDigits("تاریخ پایان نمی‌تواند قبل از تاریخ شروع باشد."));
            return;
        }
    } else {
        startISO = new Date(startDateTime).toISOString();
        endISO = endDateTime ? new Date(endDateTime).toISOString() : undefined;
        if(endISO && new Date(endISO) < new Date(startISO)){
            alert(toPersianDigits("زمان پایان نمی‌تواند قبل از زمان شروع باشد."));
            return;
        }
    }

    const eventDataToSave: Omit<CalendarEvent, 'id' | 'color'> = {
      title,
      start: startISO,
      end: endISO,
      allDay,
      description,
      eventType,
      relatedMemberId: relatedMemberId || undefined,
      recurring: disableRecurrenceForBirthday ? 'yearly' : recurring,
      isBirthday: isBirthdayEvent && !!relatedMemberHasDob,
    };
    
    if (initialData && initialData.id) {
        onSave({ ...eventDataToSave, id: initialData.id, color: initialData.color } as CalendarEvent);
    } else {
        onSave(eventDataToSave);
    }
    onClose(); // Close modal after save
  };

  if (!isOpen) return null;

  return (
    <div className="full-screen-modal-overlay active" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="add-event-modal-title">
      <div className="full-screen-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200 flex-shrink-0">
          <h2 id="add-event-modal-title" className="text-xl sm:text-2xl font-semibold text-gray-700">
            {toPersianDigits(initialData ? "ویرایش رویداد" : "افزودن رویداد جدید به تقویم")}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="w-7 h-7" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 flex-grow overflow-y-auto modal-scroll-content !px-1 sm:!px-2 text-sm">
          <div>
            <label htmlFor="eventTitle" className="block text-sm font-medium text-gray-700 mb-1">{toPersianDigits("عنوان رویداد*:")}</label>
            <input type="text" id="eventTitle" value={title} onChange={e => setTitle(e.target.value)} required 
                   className="w-full p-2.5 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
          </div>

          <div className="flex items-center">
            <input type="checkbox" id="allDayEvent" checked={allDay} onChange={e => setAllDay(e.target.checked)} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
            <label htmlFor="allDayEvent" className="mr-2 rtl:ml-2 rtl:mr-0 block text-sm text-gray-700">{toPersianDigits("رویداد تمام روز")}</label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="eventStartDate" className="block text-sm font-medium text-gray-700 mb-1">{toPersianDigits("تاریخ و زمان شروع*:")}</label>
              <input 
                type={allDay ? "date" : "datetime-local"} 
                id="eventStartDate" 
                value={startDateTime} 
                onChange={e => setStartDateTime(e.target.value)} 
                required
                className="w-full p-2.5 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
            </div>
            <div>
              <label htmlFor="eventEndDate" className="block text-sm font-medium text-gray-700 mb-1">{toPersianDigits("تاریخ و زمان پایان (اختیاری):")}</label>
              <input 
                type={allDay ? "date" : "datetime-local"} 
                id="eventEndDate" 
                value={endDateTime} 
                onChange={e => setEndDateTime(e.target.value)}
                min={startDateTime && !allDay ? startDateTime : undefined} 
                className="w-full p-2.5 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
            </div>
          </div>
          
          <div>
            <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-1">{toPersianDigits("نوع رویداد:")}</label>
            <select id="eventType" value={eventType} onChange={e => setEventType(e.target.value as EventType)}
                    className="w-full p-2.5 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white">
              {eventTypes.map(type => <option key={type} value={type}>{toPersianDigits(type)}</option>)}
            </select>
          </div>
          
          <div>
            <label htmlFor="recurrence" className="block text-sm font-medium text-gray-700 mb-1">{toPersianDigits("تکرار رویداد:")}</label>
            <select 
              id="recurrence" 
              value={recurring} 
              onChange={e => setRecurring(e.target.value as NonNullable<CalendarEvent['recurring']>)}
              disabled={disableRecurrenceForBirthday}
              className={`w-full p-2.5 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white ${disableRecurrenceForBirthday ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            >
              {recurrenceOptions.map(opt => <option key={opt.value} value={opt.value}>{toPersianDigits(opt.label)}</option>)}
            </select>
            {disableRecurrenceForBirthday && <p className="text-xs text-gray-500 mt-1">{toPersianDigits("تولدهای اعضای خانواده با تاریخ تولد ثبت شده، به طور خودکار سالانه تکرار می‌شوند.")}</p>}
          </div>


          <div>
            <label htmlFor="relatedMember" className="block text-sm font-medium text-gray-700 mb-1">{toPersianDigits("مرتبط با عضو خانواده (اختیاری):")}</label>
            <select id="relatedMember" value={relatedMemberId} onChange={e => setRelatedMemberId(e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white">
              <option value="">{toPersianDigits("انتخاب کنید...")}</option>
              {familyMembers.map(member => <option key={member.id} value={member.id}>{toPersianDigits(member.name)}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="eventDescription" className="block text-sm font-medium text-gray-700 mb-1">{toPersianDigits("توضیحات (اختیاری):")}</label>
            <textarea id="eventDescription" value={description} onChange={e => setDescription(e.target.value)} rows={3} 
                      className="w-full p-2.5 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-y"></textarea>
          </div>
          
          <div className="flex justify-end space-x-3 space-x-reverse pt-4 border-t border-gray-200 sticky bottom-0 bg-white pb-1 -mb-5 z-10">
            <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors">
              {toPersianDigits("انصراف")}
            </button>
            <button type="submit" className="px-6 py-2.5 text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 rounded-lg transition-colors flex items-center">
               <PlusIcon className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0"/> {toPersianDigits(initialData ? "ذخیره تغییرات" : "افزودن رویداد")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;