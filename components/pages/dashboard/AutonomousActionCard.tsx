
import React from 'react';
import { toPersianDigits } from '../../../utils';
import { CogIcon, XMarkIcon, WrenchScrewdriverIcon as SettingsIcon, CalendarDaysIcon, LightbulbIcon, AdjustmentsVerticalIcon } from '../../shared/AppIcons'; // Assuming some icons exist

export interface AIAutonomousAction {
  id: string;
  icon: React.ReactNode;
  actionText: string;
  xaiReason: string;
  timestamp: string; // ISO string
  cancelActionHandler?: () => void;
  settingsActionHandler?: () => void;
}

interface AutonomousActionCardProps {
  action: AIAutonomousAction;
  onShowXai: (xaiReason: string) => void; // Callback to open XAI modal
}

const AutonomousActionCard: React.FC<AutonomousActionCardProps> = ({ action, onShowXai }) => {
  const timeAgo = (isoTimestamp: string) => {
    const date = new Date(isoTimestamp);
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return toPersianDigits(`${Math.floor(interval)} سال پیش`);
    interval = seconds / 2592000;
    if (interval > 1) return toPersianDigits(`${Math.floor(interval)} ماه پیش`);
    interval = seconds / 86400;
    if (interval > 1) return toPersianDigits(`${Math.floor(interval)} روز پیش`);
    interval = seconds / 3600;
    if (interval > 1) return toPersianDigits(`${Math.floor(interval)} ساعت پیش`);
    interval = seconds / 60;
    if (interval > 1) return toPersianDigits(`${Math.floor(interval)} دقیقه پیش`);
    return toPersianDigits("همین الان");
  };

  return (
    <div className="bg-slate-700/80 p-4 rounded-lg shadow-md border border-slate-600 flex flex-col space-y-2">
      <div className="flex items-start space-x-3 space-x-reverse">
        <div className="flex-shrink-0 p-2 bg-slate-600 rounded-full text-sky-400">
          {React.cloneElement(action.icon as React.ReactElement<{ className?: string }>, { className: "w-5 h-5" })}
        </div>
        <div className="flex-grow">
          <p className="text-sm text-gray-200 leading-relaxed">{toPersianDigits(action.actionText)}</p>
          <p className="text-xs text-gray-500 mt-1">{timeAgo(action.timestamp)}</p>
        </div>
      </div>
      <div className="flex justify-end items-center space-x-2 space-x-reverse pt-2 border-t border-slate-600/50 text-xs">
        <button 
          onClick={() => onShowXai(action.xaiReason)}
          className="text-sky-400 hover:underline"
        >
          {toPersianDigits("چرا؟")}
        </button>
        {action.cancelActionHandler && (
          <button 
            onClick={action.cancelActionHandler}
            className="text-red-400 hover:text-red-300 flex items-center"
            aria-label={toPersianDigits("لغو اقدام")}
          >
            <XMarkIcon className="w-4 h-4 mr-1" />
            {toPersianDigits("لغو")}
          </button>
        )}
        {action.settingsActionHandler && (
          <button 
            onClick={action.settingsActionHandler}
            className="text-gray-400 hover:text-gray-200 flex items-center"
             aria-label={toPersianDigits("تنظیمات")}
          >
            <SettingsIcon className="w-4 h-4 mr-1" />
            {toPersianDigits("تنظیمات")}
          </button>
        )}
      </div>
    </div>
  );
};

export default AutonomousActionCard;