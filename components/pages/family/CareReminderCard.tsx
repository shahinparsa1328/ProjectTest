import React from 'react';
import { toPersianDigits } from '../../../utils';
import { CareReminder, careReminderTypesList } from '../../../types/familyTypes';
import { PencilIcon, TrashIcon, CheckCircleIcon, XCircleIcon, CalendarDaysIcon } from '../../shared/AppIcons';

interface CareReminderCardProps {
  reminder: CareReminder;
  onEdit: (reminder: CareReminder) => void; // Pass reminder for editing
  onDelete: (reminderId: string) => void; // Pass ID for deletion
  onToggleComplete: (reminderId: string) => void; // Pass ID to toggle completion
}

const CareReminderCard: React.FC<CareReminderCardProps> = ({ reminder, onEdit, onDelete, onToggleComplete }) => {
  const reminderTypeLabel = careReminderTypesList.find(rt => rt.value === reminder.reminderType)?.label || reminder.reminderType;
  const isPastDue = !reminder.completed && new Date(reminder.dateTime) < new Date(new Date().setHours(0,0,0,0));

  const cardBgColor = reminder.completed ? 'bg-green-50' : isPastDue ? 'bg-red-50' : 'bg-yellow-50';
  const cardBorderColor = reminder.completed ? 'border-green-200' : isPastDue ? 'border-red-200' : 'border-yellow-200';
  const titleColor = reminder.completed ? 'text-gray-500 line-through' : isPastDue ? 'text-red-700' : 'text-yellow-700';

  return (
    <div className={`p-3 rounded-lg shadow-sm border ${cardBorderColor} ${cardBgColor} hover:shadow-md transition-shadow duration-150`}>
      <div className="flex items-start justify-between mb-1.5">
        <div className="flex items-center">
          <div className={`p-1 rounded-full mr-2 rtl:ml-2 rtl:mr-0 ${
              reminder.reminderType === 'medication' ? 'bg-red-100 text-red-600' :
              reminder.reminderType === 'activity' ? 'bg-blue-100 text-blue-600' :
              'bg-green-100 text-green-600' // appointment
          }`}>
            <CalendarDaysIcon className="w-4 h-4" />
          </div>
          <div>
            <h4 className={`text-sm font-semibold ${titleColor}`}>{toPersianDigits(reminder.title)}</h4>
            <p className="text-xs text-gray-500">{toPersianDigits(reminderTypeLabel)}</p>
          </div>
        </div>
        <div className="flex space-x-1 space-x-reverse">
            <button onClick={() => onEdit(reminder)} className="p-1 text-gray-500 hover:bg-gray-100 rounded-full" aria-label={toPersianDigits("ویرایش")}>
                <PencilIcon className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => onDelete(reminder.id)} className="p-1 text-gray-500 hover:bg-gray-100 rounded-full" aria-label={toPersianDigits("حذف")}>
                <TrashIcon className="w-3.5 h-3.5" />
            </button>
        </div>
      </div>

      <p className="text-xs text-gray-600 mb-1">
        {toPersianDigits(`زمان: ${new Date(reminder.dateTime).toLocaleString('fa-IR', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}`)}
        {reminder.recurring !== 'none' && ` (${toPersianDigits(reminder.recurring === 'daily' ? 'روزانه' : 'هفتگی')})`}
      </p>
      
      {reminder.notes && (
        <p className="text-xs text-gray-500 bg-white/70 p-1.5 rounded border border-gray-200 mb-2 leading-relaxed">
            <strong>{toPersianDigits("یادداشت: ")}</strong>{toPersianDigits(reminder.notes)}
        </p>
      )}
      
      <button 
        onClick={() => onToggleComplete(reminder.id)}
        className={`w-full text-xs py-1 px-2 rounded-md transition-colors flex items-center justify-center ${
          reminder.completed 
            ? 'bg-gray-200 text-gray-600 hover:bg-gray-300' 
            : 'bg-lime-500 hover:bg-lime-600 text-white'
        }`}
      >
        {reminder.completed ? <XCircleIcon className="w-3.5 h-3.5 ml-1 rtl:mr-1 rtl:ml-0" /> : <CheckCircleIcon className="w-3.5 h-3.5 ml-1 rtl:mr-1 rtl:ml-0" />}
        {toPersianDigits(reminder.completed ? "علامت‌گذاری به عنوان انجام نشده" : "علامت‌گذاری به عنوان انجام شده")}
      </button>
    </div>
  );
};

export default CareReminderCard;