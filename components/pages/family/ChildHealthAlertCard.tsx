
import React from 'react';
import { toPersianDigits } from '../../../utils';
import { ChildHealthAlert } from '../../../types/familyTypes';
import { ShieldExclamationIcon, LightbulbIcon, InformationCircleIcon } from '../../shared/AppIcons';

interface ChildHealthAlertCardProps {
  alert: ChildHealthAlert;
  onShowXai?: (rationale: string) => void;
}

const ChildHealthAlertCard: React.FC<ChildHealthAlertCardProps> = ({ alert, onShowXai }) => {
  let icon = <InformationCircleIcon className="w-5 h-5 text-blue-500" />;
  let bgColor = 'bg-blue-50';
  let borderColor = 'border-blue-300';
  let titleColor = 'text-blue-700';

  if (alert.severity === 'warning') {
    icon = <ShieldExclamationIcon className="w-5 h-5 text-yellow-500" />;
    bgColor = 'bg-yellow-50';
    borderColor = 'border-yellow-300';
    titleColor = 'text-yellow-700';
  } else if (alert.severity === 'critical') {
    icon = <ShieldExclamationIcon className="w-5 h-5 text-red-500" />;
    bgColor = 'bg-red-50';
    borderColor = 'border-red-300';
    titleColor = 'text-red-700';
  }

  return (
    <div className={`p-3 rounded-lg shadow-sm border ${borderColor} ${bgColor}`}>
      <div className="flex items-start mb-1.5">
        <div className={`p-1 rounded-full mr-2 rtl:ml-2 rtl:mr-0 flex-shrink-0 ${bgColor.replace('50','100')}`}>
          {icon}
        </div>
        <div>
          <h5 className={`text-sm font-semibold ${titleColor}`}>
            {toPersianDigits(`هشدار سلامت برای ${alert.childName || 'کودک شما'}`)}
          </h5>
          <p className="text-xs text-gray-700 leading-relaxed mt-0.5">{toPersianDigits(alert.alertText)}</p>
        </div>
      </div>
      {alert.recommendation && (
        <p className="text-xs text-gray-600 mb-1.5 pl-7 rtl:pr-7 rtl:pl-0">
          <strong>{toPersianDigits("توصیه: ")}</strong>{toPersianDigits(alert.recommendation)}
        </p>
      )}
       {alert.relatedDataSummary && (
        <p className="text-[10px] text-gray-500 mb-1 pl-7 rtl:pr-7 rtl:pl-0 italic">
          {toPersianDigits(`بر اساس: ${alert.relatedDataSummary}`)}
        </p>
      )}
      {onShowXai && alert.xaiRationale && (
        <div className="mt-2 pt-1.5 border-t border-gray-200/50 text-xs">
          <button onClick={() => onShowXai(alert.xaiRationale!)} className={`${titleColor.replace('-700','-600')} hover:underline flex items-center`}>
            <LightbulbIcon className="w-3.5 h-3.5 ml-1 rtl:mr-1 rtl:ml-0" />{toPersianDigits("چرا این هشدار؟")}
          </button>
        </div>
      )}
    </div>
  );
};

export default ChildHealthAlertCard;