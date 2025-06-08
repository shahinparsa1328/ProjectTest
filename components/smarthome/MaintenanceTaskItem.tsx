
import React from 'react';
import { toPersianDigits } from '../../utils';
import { MaintenanceSchedule } from '../../types/smartHomeTypes';
import { CheckCircleIcon, ListBulletIcon, CalendarDaysIcon } from '../shared/AppIcons';

interface MaintenanceTaskItemProps {
  schedule: MaintenanceSchedule;
  deviceName: string;
  onMarkAsDone: (scheduleId: string) => void;
  onCreateExternalTask: (schedule: MaintenanceSchedule) => void;
}

const MaintenanceTaskItem: React.FC<MaintenanceTaskItemProps> = ({ 
  schedule, 
  deviceName, 
  onMarkAsDone, 
  onCreateExternalTask 
}) => {
  const isOverdue = schedule.nextDueDate && new Date(schedule.nextDueDate) < new Date(new Date().setHours(0,0,0,0));
  
  return (
    <div className={`p-3 rounded-lg border ${isOverdue ? 'bg-red-50 border-red-300' : 'bg-orange-50 border-orange-300'} shadow-sm`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h4 className={`text-sm font-semibold ${isOverdue ? 'text-red-700' : 'text-orange-700'}`}>
            {toPersianDigits(schedule.taskName)}
          </h4>
          <p className="text-xs text-slate-600">{toPersianDigits(`دستگاه: ${deviceName}`)}</p>
        </div>
        <div className={`mt-1 sm:mt-0 text-xs ${isOverdue ? 'text-red-600 font-medium' : 'text-slate-500'}`}>
          <CalendarDaysIcon className="w-3 h-3 inline ml-1 rtl:mr-1 rtl:ml-0 align-middle" />
          {toPersianDigits(`سررسید بعدی: ${schedule.nextDueDate ? new Date(schedule.nextDueDate).toLocaleDateString('fa-IR') : 'نامشخص'}`)}
        </div>
      </div>
      <div className="mt-2 pt-2 border-t border-orange-200 flex flex-col sm:flex-row sm:justify-end sm:space-x-2 sm:space-x-reverse space-y-1 sm:space-y-0">
        <button
          onClick={() => onMarkAsDone(schedule.id)}
          className="w-full sm:w-auto flex items-center justify-center text-xs bg-green-500 hover:bg-green-600 text-white py-1 px-2.5 rounded-md transition-colors"
        >
          <CheckCircleIcon className="w-3.5 h-3.5 mr-1 rtl:ml-1 rtl:mr-0" />
          {toPersianDigits("انجام شد")}
        </button>
        <button
          onClick={() => onCreateExternalTask(schedule)}
          className="w-full sm:w-auto flex items-center justify-center text-xs bg-sky-500 hover:bg-sky-600 text-white py-1 px-2.5 rounded-md transition-colors"
        >
          <ListBulletIcon className="w-3.5 h-3.5 mr-1 rtl:ml-1 rtl:mr-0" />
          {toPersianDigits("ایجاد وظیفه")}
        </button>
      </div>
    </div>
  );
};

export default MaintenanceTaskItem;