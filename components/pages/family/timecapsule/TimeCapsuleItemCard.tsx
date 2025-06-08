
import React from 'react';
import { toPersianDigits } from '../../../../utils';
import { TimeCapsuleItem } from '../../../../types/familyTypes';
import { LockClosedIcon, LockOpenIcon, CalendarDaysIcon } from '../../../shared/AppIcons';

interface TimeCapsuleItemCardProps {
  item: TimeCapsuleItem;
  onOpen: (itemId: string) => void;
  isOpeningAllowed: (openDate: string) => boolean;
  themeClasses: {
    buttonBgClass: string;
    buttonHoverBgClass: string;
    primaryAccentClass: string;
    secondaryAccentClass: string;
  }
}

const TimeCapsuleItemCard: React.FC<TimeCapsuleItemCardProps> = ({ item, onOpen, isOpeningAllowed, themeClasses }) => {
  const canOpenNow = isOpeningAllowed(item.openDate);
  const displayOpenDate = new Date(item.openDate).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className={`p-4 rounded-lg shadow-sm border ${item.opened ? `border-green-200 bg-green-50` : `${themeClasses.secondaryAccentClass} bg-white`}`}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className={`text-sm font-semibold ${item.opened ? 'text-green-700' : themeClasses.primaryAccentClass}`}>
            {toPersianDigits(item.title)}
          </h4>
          <p className={`text-xs ${item.opened ? 'text-green-600' : 'text-gray-500'} flex items-center`}>
            <CalendarDaysIcon className="w-3.5 h-3.5 ml-1 rtl:mr-1 rtl:ml-0" />
            {toPersianDigits(`تاریخ باز شدن: ${displayOpenDate}`)}
          </p>
        </div>
        {item.opened ? (
          <LockOpenIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
        ) : (
          <LockClosedIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
        )}
      </div>

      {item.opened && (
        <div className="mt-2 pt-2 border-t border-gray-200">
          <p className="text-xs font-medium text-gray-700 mb-1">{toPersianDigits("محتوا:")}</p>
          <p className="text-xs text-gray-600 whitespace-pre-wrap bg-gray-50 p-2 rounded-md">
            {toPersianDigits(item.content)}
          </p>
        </div>
      )}

      {!item.opened && canOpenNow && (
        <button
          onClick={() => onOpen(item.id)}
          className={`mt-2 w-full text-xs py-1.5 ${themeClasses.buttonBgClass} ${themeClasses.buttonHoverBgClass} text-white rounded-md transition-colors flex items-center justify-center`}
        >
          <LockOpenIcon className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0" />
          {toPersianDigits("باز کردن کپسول")}
        </button>
      )}
      {!item.opened && !canOpenNow && (
        <p className="mt-2 text-xs text-gray-500 italic text-center">
          {toPersianDigits("هنوز زمان باز کردن این کپسول نرسیده است.")}
        </p>
      )}
    </div>
  );
};

export default TimeCapsuleItemCard;
