import React from 'react';
import { toPersianDigits } from '../../../utils';
import { ChevronRightIcon, ChevronLeftIcon, CalendarDaysIcon } from '../../shared/AppIcons'; // Assuming CalendarDaysIcon for view mode

interface CalendarControlsProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  viewMode: 'month' | 'week' | 'day';
  setViewMode: (mode: 'month' | 'week' | 'day') => void;
}

const CalendarControls: React.FC<CalendarControlsProps> = ({ currentDate, setCurrentDate, viewMode, setViewMode }) => {
  const handlePrev = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'month') newDate.setMonth(newDate.getMonth() - 1);
    else if (viewMode === 'week') newDate.setDate(newDate.getDate() - 7);
    else newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'month') newDate.setMonth(newDate.getMonth() + 1);
    else if (viewMode === 'week') newDate.setDate(newDate.getDate() + 7);
    else newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };
  
  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const formattedDateHeader = () => {
    if (viewMode === 'month') {
      return currentDate.toLocaleDateString('fa-IR', { year: 'numeric', month: 'long' });
    } else if (viewMode === 'week') {
      const startOfWeek = new Date(currentDate);
      // Adjust for Persian week starting on Saturday
      const dayOfWeekJS = currentDate.getDay(); // Sunday is 0, Saturday is 6
      const diffToSat = (dayOfWeekJS + 1) % 7; // Days to subtract to get to Saturday
      startOfWeek.setDate(currentDate.getDate() - diffToSat);
      
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      return `${startOfWeek.toLocaleDateString('fa-IR', { day: 'numeric', month: 'short' })} - ${endOfWeek.toLocaleDateString('fa-IR', { day: 'numeric', month: 'long', year: 'numeric' })}`;
    } else { // day view
      return currentDate.toLocaleDateString('fa-IR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }
  };

  const viewModeButtons: {label: string, mode: 'month' | 'week' | 'day'}[] = [
      {label: 'ماه', mode: 'month'},
      {label: 'هفته', mode: 'week'},
      {label: 'روز', mode: 'day'},
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-2 mb-3 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex items-center space-x-1 space-x-reverse mb-2 sm:mb-0">
        <button onClick={handlePrev} className="p-2 text-gray-600 hover:bg-gray-200 rounded-full" aria-label={toPersianDigits("قبلی")}>
          <ChevronRightIcon className="w-5 h-5" />
        </button>
        <button onClick={handleToday} className="text-xs sm:text-sm font-medium text-indigo-600 hover:bg-indigo-100 px-3 py-1.5 rounded-md">
          {toPersianDigits("امروز")}
        </button>
        <button onClick={handleNext} className="p-2 text-gray-600 hover:bg-gray-200 rounded-full" aria-label={toPersianDigits("بعدی")}>
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
      </div>
      <h3 className="text-sm sm:text-md font-semibold text-gray-700 order-first sm:order-none mb-2 sm:mb-0">
        {toPersianDigits(formattedDateHeader())}
      </h3>
      <div className="flex items-center bg-gray-200 rounded-full p-0.5 text-xs">
        {viewModeButtons.map(vm => (
            <button 
                key={vm.mode} 
                onClick={() => setViewMode(vm.mode)}
                className={`px-3 py-1 rounded-full transition-colors ${viewMode === vm.mode ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600 hover:bg-gray-300/50'}`}
                // disabled={vm.mode !== 'month'} // Basic Version: Only month view functional for now -- REMOVED DISABLED
                // title={vm.mode !== 'month' ? toPersianDigits("این نما در نسخه‌های بعدی فعال خواهد شد") : ""}
            >
                {toPersianDigits(vm.label)}
            </button>
        ))}
      </div>
    </div>
  );
};

export default CalendarControls;