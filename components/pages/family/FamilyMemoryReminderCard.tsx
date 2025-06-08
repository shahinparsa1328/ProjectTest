
import React from 'react';
import { toPersianDigits } from '../../../utils';
import { FamilyMemoryReminder } from '../../../types/familyTypes';
import { SparklesIconNav, LightbulbIcon, CameraIcon } from '../../shared/AppIcons';

interface FamilyMemoryReminderCardProps {
  reminder: FamilyMemoryReminder;
  themeClasses: { primaryAccentClass: string; secondaryAccentClass: string; }
  onShowXai?: (rationale: string) => void; // Corrected: onShowXai expects only rationale string
}

const FamilyMemoryReminderCard: React.FC<FamilyMemoryReminderCardProps> = ({ reminder, themeClasses, onShowXai }) => {
  const formattedMemoryDate = new Date(reminder.memoryDate).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className={`p-3.5 rounded-lg shadow-sm border ${themeClasses.secondaryAccentClass} bg-white`}>
      <div className="flex items-start mb-2">
        <div className={`p-1.5 bg-yellow-100 rounded-full mr-2 rtl:ml-2 rtl:mr-0 flex-shrink-0`}>
          <SparklesIconNav className="w-5 h-5 text-yellow-500" />
        </div>
        <div>
          <h4 className={`text-sm font-semibold ${themeClasses.primaryAccentClass}`}>{toPersianDigits(reminder.title)}</h4>
          <p className="text-xs text-gray-500">{toPersianDigits(`تاریخ خاطره: ${formattedMemoryDate}`)}</p>
          {reminder.sourceType && (
            <p className="text-[10px] text-gray-400">
              {toPersianDigits(`منبع: ${reminder.sourceType === 'calendar' ? 'تقویم' : reminder.sourceType === 'album' ? 'آلبوم عکس' : 'دستی'}`)}
            </p>
          )}
        </div>
      </div>
      <p className="text-xs text-gray-600 mb-1.5 leading-relaxed">{toPersianDigits(reminder.description)}</p>
      
      {reminder.mediaUrl && (
        <div className="my-2 p-2 bg-gray-100 rounded-md border border-gray-200 text-center">
          {/* Placeholder for actual media */}
          <CameraIcon className="w-8 h-8 text-gray-400 mx-auto mb-1" />
          <p className="text-[10px] text-gray-500">{toPersianDigits("نمایش عکس/ویدیو (نمونه)")}</p>
        </div>
      )}

      {reminder.xaiRationale && onShowXai && (
        <div className="mt-2 pt-2 border-t border-gray-100 text-xs">
          <button 
            onClick={() => onShowXai(toPersianDigits(reminder.xaiRationale!))} // Pass only rationale string
            className={`text-xs ${themeClasses.primaryAccentClass.replace('text-rose-600', 'text-rose-500').replace('text-indigo-600','text-indigo-500')} hover:underline flex items-center`}
            aria-label={toPersianDigits("چرا این یادآوری؟")}
          >
            <LightbulbIcon className="w-3.5 h-3.5 ml-1 rtl:mr-1 rtl:ml-0" />{toPersianDigits("چرا این یادآوری؟")}
          </button>
        </div>
      )}
    </div>
  );
};

export default FamilyMemoryReminderCard;
