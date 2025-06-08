
import React from 'react';
import { toPersianDigits } from '../../../utils';
import { CalendarEvent } from '../../../types/familyTypes';

interface WeekViewProps {
  date: Date; // A date within the week to display
  events: CalendarEvent[];
  onDateClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

const WeekView: React.FC<WeekViewProps> = ({ date, events, onDateClick, onEventClick }) => {
  const getWeekDays = (currentDate: Date): Date[] => {
    const days: Date[] = [];
    const todayJsDay = currentDate.getDay(); // 0 (Sun) - 6 (Sat)
    // Calculate Saturday of the current week
    // If today is Saturday (6), current day is start.
    // If today is Sunday (0), Saturday was 1 day ago.
    // If today is Friday (5), Saturday was 6 days ago.
    // Offset = (todayJsDay + 1) % 7. If Sat=0, Sun=1...
    const startOfWeekOffset = (todayJsDay === 6) ? 0 : todayJsDay + 1;
    
    const firstDayOfWeek = new Date(currentDate);
    firstDayOfWeek.setDate(currentDate.getDate() - startOfWeekOffset);
    firstDayOfWeek.setHours(0,0,0,0);

    for (let i = 0; i < 7; i++) {
      const day = new Date(firstDayOfWeek);
      day.setDate(firstDayOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const weekDays = getWeekDays(date);
  const weekDayNamesPersian = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
  const today = new Date();
  today.setHours(0,0,0,0);

  return (
    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
      <div className="grid grid-cols-7 gap-px text-center text-xs font-medium text-gray-500 mb-1">
        {weekDayNamesPersian.map(dayName => (
          <div key={dayName} className="py-1.5">{toPersianDigits(dayName)}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-px">
        {weekDays.map(dayInWeek => {
          const dayNum = dayInWeek.getDate();
          const isToday = dayInWeek.getTime() === today.getTime();
          const dayEvents = events.filter(event => {
            const eventStartDate = new Date(event.start);
            return eventStartDate.getFullYear() === dayInWeek.getFullYear() &&
                   eventStartDate.getMonth() === dayInWeek.getMonth() &&
                   eventStartDate.getDate() === dayNum;
          }).sort((a,b) => new Date(a.start).getTime() - new Date(b.start).getTime());

          return (
            <div 
              key={dayInWeek.toISOString()} 
              className={`p-1.5 border border-gray-100 h-28 sm:h-32 flex flex-col hover:bg-sky-50 transition-colors cursor-pointer
                          ${isToday ? 'bg-sky-100 border-sky-300' : 'bg-white'}`}
              onClick={() => onDateClick(dayInWeek)}
              role="button"
              aria-label={toPersianDigits(`روز ${dayNum} (${dayInWeek.toLocaleDateString('fa-IR', {month: 'short'})})`)}
            >
              <span className={`text-xs font-semibold mb-1 ${isToday ? 'text-sky-600' : 'text-gray-700'}`}>
                {toPersianDigits(dayNum.toString())}
              </span>
              <div className="flex-grow overflow-y-auto space-y-0.5 scrollbar-thin text-[10px]">
                {dayEvents.slice(0, 3).map(event => (
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
      </div>
    </div>
  );
};

export default WeekView;
