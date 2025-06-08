
import React from 'react';
import { toPersianDigits } from '../../utils';
import { Routine, RoutineTriggerType } from '../../types/smartHomeTypes'; 
import { PlayCircleIcon, PencilIcon, TrashIcon, ClipboardDocumentListIcon, PowerIcon } from '../shared/AppIcons';

interface RoutineCardProps {
  routine: Routine;
  onExecute: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onToggleEnabled: () => void;
}

const getTriggerDescription = (triggerType: RoutineTriggerType, value: string): string => {
    switch(triggerType) {
        case 'time':
            return `ساعت ${value}`;
        case 'event':
            const [eventType, deviceId] = value.split(':');
            return `رویداد (${eventType === 'device_on' ? 'روشن شدن' : 'خاموش شدن'} دستگاه ${deviceId})`; // Simplified
        case 'location':
            const [locationEvent, zoneId] = value.split(':');
            return `مکان (${locationEvent === 'enter' ? 'ورود به' : 'خروج از'} ناحیه ${zoneId})`;
        case 'sunrise_sunset':
            return value === 'sunrise' ? 'طلوع آفتاب' : 'غروب آفتاب';
        default:
            return 'محرک نامشخص';
    }
};

const RoutineCard: React.FC<RoutineCardProps> = ({ routine, onExecute, onEdit, onDelete, onToggleEnabled }) => {
  const triggerText = routine.triggers.map(t => getTriggerDescription(t.type, t.value)).join(' و ');

  return (
    <div className={`p-4 rounded-xl shadow border ${routine.isEnabled ? 'bg-white border-gray-200 hover:shadow-lg' : 'bg-gray-100 border-gray-300 opacity-70'} transition-all duration-200`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center">
            <div className={`p-1.5 rounded-full mr-2 rtl:ml-2 rtl:mr-0 ${routine.isEnabled ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-200 text-gray-500'}`}>
                <ClipboardDocumentListIcon className="w-5 h-5" />
            </div>
            <div>
                <h4 className={`text-md font-semibold ${routine.isEnabled ? 'text-slate-800' : 'text-gray-600'}`}>{toPersianDigits(routine.name)}</h4>
                <p className="text-xs text-gray-500">{toPersianDigits(routine.description || 'بدون توضیحات')}</p>
            </div>
        </div>
        <button 
            onClick={onToggleEnabled} 
            className={`p-1 rounded-full transition-colors ${routine.isEnabled ? 'text-green-500 hover:bg-green-100' : 'text-red-500 hover:bg-red-100'}`}
            title={routine.isEnabled ? toPersianDigits("غیرفعال کردن روتین") : toPersianDigits("فعال کردن روتین")}
        >
            <PowerIcon className="w-5 h-5" />
        </button>
      </div>

      <p className="text-xs text-gray-500 mb-3">
        <strong>{toPersianDigits("محرک‌ها: ")}</strong>
        {toPersianDigits(triggerText)}
      </p>
      
      {/* Simplified action display for now */}
      <p className="text-xs text-gray-500 mb-3">
        <strong>{toPersianDigits("اقدامات: ")}</strong>
        {toPersianDigits(`${routine.actions.length} اقدام تعریف شده است.`)}
      </p>

      <div className="flex justify-end items-center space-x-2 space-x-reverse pt-2 border-t border-gray-100 text-xs">
        <button
          onClick={onExecute}
          disabled={!routine.isEnabled}
          className="flex items-center bg-green-500 hover:bg-green-600 text-white py-1 px-2.5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <PlayCircleIcon className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
          {toPersianDigits("اجرا")}
        </button>
        <button 
          onClick={onEdit}
          className="flex items-center bg-yellow-400 hover:bg-yellow-500 text-gray-800 py-1 px-2.5 rounded-md transition-colors"
        >
          <PencilIcon className="w-3.5 h-3.5 mr-1 rtl:ml-1 rtl:mr-0" />
          {toPersianDigits("ویرایش")}
        </button>
        <button 
          onClick={onDelete}
          className="flex items-center bg-red-500 hover:bg-red-600 text-white py-1 px-2.5 rounded-md transition-colors"
        >
           <TrashIcon className="w-3.5 h-3.5 mr-1 rtl:ml-1 rtl:mr-0" />
          {toPersianDigits("حذف")}
        </button>
      </div>
    </div>
  );
};

export default RoutineCard;