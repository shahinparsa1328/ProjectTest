import React from 'react';
import { Webinar } from '../../types/learningTypes';
import { toPersianDigits } from '../../utils';
import { CalendarDaysIcon, ClockIcon, UserCircleIcon as SpeakerIcon } from '../shared/AppIcons';

interface WebinarCardProps {
  webinar: Webinar;
}

const WebinarCard: React.FC<WebinarCardProps> = ({ webinar }) => {
  const eventDate = new Date(webinar.dateTime);
  const isUpcoming = eventDate > new Date();

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <h4 className="text-md font-semibold text-teal-700 mb-2 truncate" title={toPersianDigits(webinar.title)}>{toPersianDigits(webinar.title)}</h4>
      
      <div className="space-y-1.5 text-xs text-gray-600 mb-3">
        <div className="flex items-center">
          <SpeakerIcon className="w-3.5 h-3.5 text-gray-400 ml-1.5 rtl:mr-1.5 rtl:ml-0" />
          {toPersianDigits(`ارائه‌دهنده: ${webinar.speaker}`)}
        </div>
        <div className="flex items-center">
          <CalendarDaysIcon className="w-3.5 h-3.5 text-gray-400 ml-1.5 rtl:mr-1.5 rtl:ml-0" />
          {toPersianDigits(eventDate.toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }))}
        </div>
        <div className="flex items-center">
          <ClockIcon className="w-3.5 h-3.5 text-gray-400 ml-1.5 rtl:mr-1.5 rtl:ml-0" />
          {toPersianDigits(`مدت زمان: ${webinar.duration}`)}
        </div>
         {webinar.platform && <p className="text-xs text-gray-500">{toPersianDigits(`پلتفرم: ${webinar.platform}`)}</p>}
      </div>

      {webinar.description && <p className="text-xs text-gray-500 mb-3 line-clamp-2">{toPersianDigits(webinar.description)}</p>}

      {webinar.isLive && (
        <span className="inline-block bg-red-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full mb-2 animate-pulse">
          {toPersianDigits("🔴 در حال برگزاری")}
        </span>
      )}

      {webinar.registrationLink && isUpcoming && (
        <a 
          href={webinar.registrationLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-full bg-teal-500 hover:bg-teal-600 text-white text-center text-xs py-1.5 px-3 rounded-md transition-colors"
        >
          {toPersianDigits("ثبت‌نام در وبینار")}
        </a>
      )}
      {!webinar.registrationLink && isUpcoming && (
         <button className="w-full bg-teal-500 text-white text-xs py-1.5 px-3 rounded-md opacity-70 cursor-not-allowed">
            {toPersianDigits("جزئیات به زودی")}
        </button>
      )}
       {!isUpcoming && !webinar.isLive && (
         <button className="w-full bg-gray-400 text-white text-xs py-1.5 px-3 rounded-md cursor-not-allowed">
            {toPersianDigits("وبینار برگزار شده")}
        </button>
      )}
    </div>
  );
};

export default WebinarCard;