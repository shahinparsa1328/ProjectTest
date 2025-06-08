
import React from 'react';
import { toPersianDigits } from '../../../utils';
import { CalendarEvent, FamilyMember } from '../../../types/familyTypes'; // Import FamilyMember if needed for relatedMemberId
import { CalendarDaysIcon } from '../../shared/AppIcons';

interface DayViewProps {
  date: Date; // The selected date to display events for
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  // familyMembers?: FamilyMember[]; // Optional: if you want to display member names
}

const DayView: React.FC<DayViewProps> = ({ date, events, onEventClick /*, familyMembers */ }) => {
  
  const formatTime = (isoString: string, allDay?: boolean) => {
    if (allDay) return toPersianDigits("تمام روز");
    const d = new Date(isoString);
    return toPersianDigits(d.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit', hour12: false }));
  };

  return (
    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 mt-2">
      <h3 className="text-md font-semibold text-gray-700 mb-3 text-center">
        {toPersianDigits(date.toLocaleDateString('fa-IR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))}
      </h3>
      {events.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-4">{toPersianDigits("رویدادی برای این روز ثبت نشده است.")}</p>
      ) : (
        <ul className="space-y-2">
          {events.map(event => (
            <li 
              key={event.id} 
              className={`p-2.5 rounded-md text-white cursor-pointer family-calendar-event ${event.color || 'bg-gray-500'} hover:opacity-90 transition-opacity`}
              onClick={() => onEventClick(event)}
              role="button"
              aria-label={toPersianDigits(`رویداد: ${event.title}`)}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm">{toPersianDigits(event.title)}</span>
                <span className="text-xs opacity-90">{formatTime(event.start, event.allDay)}</span>
              </div>
              {event.description && <p className="text-xs opacity-80 mt-1">{toPersianDigits(event.description)}</p>}
              {/* 
              Optional: Display related member if familyMembers prop is passed and used
              {event.relatedMemberId && familyMembers && familyMembers.find(m => m.id === event.relatedMemberId) && (
                <p className="text-[10px] opacity-75 mt-0.5">
                  ({toPersianDigits(familyMembers.find(m => m.id === event.relatedMemberId)!.name)})
                </p>
              )}
              */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DayView;
