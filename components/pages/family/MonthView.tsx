
import React from 'react';
import { toPersianDigits } from '../../../utils';
import { CalendarEvent } from '../../../types/familyTypes';

interface MonthViewProps {
  date: Date; // The current month/year to display
  events: CalendarEvent[];
  onDateClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

const MonthView: React.FC<MonthViewProps> = ({ date, events, onDateClick, onEventClick }) => {
  const year = date.getFullYear();
  const month = date.getMonth(); // 0-indexed

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  
  // Persian calendar starts on Saturday (day 6 in JS if Sunday is 0)
  // Adjusting to make Saturday the first day of the week visually
  let startingDayOfWeek = firstDayOfMonth.getDay(); // 0 (Sun) - 6 (Sat)
  // If Sunday is 0, Saturday is 6. We want Saturday to be index 0.
  // If getDay() returns 6 (Sat), startingDayIndex should be 0.
  // If getDay() returns 0 (Sun), startingDayIndex should be 1.
  // If getDay() returns 1 (Mon), startingDayIndex should be 2.
  // So, (getDay() + 1) % 7 could work if we map Saturday to 0 first.
  // A simpler way for Persian layout is to consider Saturday as the start.
  // day 0 (Sun) -> visually 2nd cell
  // day 6 (Sat) -> visually 1st cell
  let dayOffset = (startingDayOfWeek + 1) % 7; // if Sat=0, Sun=1, ... Fri=6 for visual layout
                                              // JS: Sun=0,...Sat=6.
                                              // To make Sat the first column:
                                              // if JS day is 6 (Sat), offset is 0
                                              // if JS day is 0 (Sun), offset is 1
                                              // if JS day is 1 (Mon), offset is 2
                                              // if JS day is 5 (Fri), offset is 6
  
  // Corrected offset for Persian calendar starting Saturday
  dayOffset = firstDayOfMonth.getDay() === 6 ? 0 : firstDayOfMonth.getDay() + 1;


  const daysInMonth = lastDayOfMonth.getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const weekDaysPersian = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج']; // شنبه تا جمعه

  const today = new Date();
  today.setHours(0,0,0,0); // Normalize today for comparison

  return (
    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
      <div className="grid grid-cols-7 gap-px text-center text-xs font-medium text-gray-500 mb-1">
        {weekDaysPersian.map(dayName => (
          <div key={dayName} className="py-1.5">{toPersianDigits(dayName)}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-px">
        {Array.from({ length: dayOffset }).map((_, i) => (
          <div key={`empty-start-${i}`} className="bg-gray-50 h-20 sm:h-24"></div>
        ))}
        {daysArray.map(dayNum => {
          const currentDateObj = new Date(year, month, dayNum);
          const isToday = currentDateObj.getTime() === today.getTime();
          const dayEvents = events.filter(event => {
            const eventStartDate = new Date(event.start);
            return eventStartDate.getFullYear() === year &&
                   eventStartDate.getMonth() === month &&
                   eventStartDate.getDate() === dayNum;
          });

          return (
            <div 
              key={dayNum} 
              className={`p-1.5 border border-gray-100 h-20 sm:h-24 flex flex-col hover:bg-sky-50 transition-colors cursor-pointer
                          ${isToday ? 'bg-sky-100 border-sky-300' : 'bg-white'}`}
              onClick={() => onDateClick(currentDateObj)}
              role="button"
              aria-label={toPersianDigits(`روز ${dayNum}`)}
            >
              <span className={`text-xs font-semibold mb-1 ${isToday ? 'text-sky-600' : 'text-gray-700'}`}>
                {toPersianDigits(dayNum.toString())}
              </span>
              <div className="flex-grow overflow-y-auto space-y-0.5 scrollbar-thin text-[10px]">
                {dayEvents.slice(0, 3).map(event => ( // Show max 3 events per day for space
                  <div 
                    key={event.id} 
                    className={`family-calendar-event ${event.color || 'bg-gray-500 text-white'}`} // Use event.color or fallback
                    onClick={(e) => { e.stopPropagation(); onEventClick(event); }}
                    title={toPersianDigits(event.title)}
                  >
                    {toPersianDigits(event.title)}
                  </div>
                ))}
                {dayEvents.length > 3 && <p className="text-[9px] text-gray-400 text-center mt-0.5">{toPersianDigits(`+${dayEvents.length - 3} دیگر`)}</p>}
              </div>
            </div>
          );
        })}
         {/* Fill remaining cells to complete the grid */}
        {Array.from({ length: (7 - (daysInMonth + dayOffset) % 7) % 7 }).map((_, i) => (
            <div key={`empty-end-${i}`} className="bg-gray-50 h-20 sm:h-24"></div>
        ))}
      </div>
    </div>
  );
};

export default MonthView;
