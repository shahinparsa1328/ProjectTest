import React from 'react';
import { toPersianDigits } from '../../../utils';
import { QualityTimeActivity } from '../../../types/familyTypes';
import { SparklesIconNav as QualityTimeIcon, CalendarDaysIcon, LightbulbIcon, ArrowPathIcon } from '../../shared/AppIcons';

interface QualityTimePlannerCardProps {
  suggestions: QualityTimeActivity[];
  onAddToCalendar: (activityId: string) => void;
  primaryAccentClass: string;
  secondaryAccentClass: string;
  onShowXai: (title: string, explanation: string) => void; // For XAI
  onRefreshSuggestions: () => void; // To fetch new suggestions
}

const QualityTimePlannerCard: React.FC<QualityTimePlannerCardProps> = ({ 
    suggestions, 
    onAddToCalendar, 
    primaryAccentClass, 
    secondaryAccentClass,
    onShowXai,
    onRefreshSuggestions 
}) => {
    
    return (
        <div className="space-y-3">
             <button
                onClick={onRefreshSuggestions}
                className={`w-full text-xs py-1.5 mb-2 ${primaryAccentClass.replace('text-', 'bg-').replace('-600', '-500')} ${primaryAccentClass.replace('text-rose-600', 'hover:bg-rose-600').replace('text-indigo-600', 'hover:bg-indigo-600')} text-white rounded-md flex items-center justify-center transition-colors`}
                aria-label={toPersianDigits("دریافت پیشنهاد جدید زمان با کیفیت")}
            >
                <ArrowPathIcon className="w-3.5 h-3.5 ml-1 rtl:mr-1 rtl:ml-0" />
                {toPersianDigits("دریافت پیشنهاد جدید از AI")}
            </button>
            {suggestions.length === 0 && <p className="text-xs text-gray-500 text-center py-2">{toPersianDigits("در حال حاضر پیشنهاد زمان با کیفیتی وجود ندارد یا در حال بارگذاری است.")}</p>}
            
            {suggestions.map(activity => (
                <div key={activity.id} className={`p-3 rounded-lg shadow-sm border ${secondaryAccentClass} bg-white`}>
                    <h5 className={`text-sm font-semibold ${primaryAccentClass} mb-1`}>{toPersianDigits(activity.title)}</h5>
                    <p className="text-xs text-gray-600 mb-1.5 leading-relaxed">{toPersianDigits(activity.description)}</p>
                    <p className="text-xs text-gray-500 mb-2">{toPersianDigits(`زمان پیشنهادی: ${activity.suggestedTime}`)}</p>
                    
                    {activity.xaiRationale && (
                         <button 
                            onClick={() => onShowXai(toPersianDigits(`منطق پیشنهاد: ${activity.title}`), toPersianDigits(activity.xaiRationale!))}
                            className={`text-[10px] ${primaryAccentClass.replace('text-rose-600', 'text-rose-500').replace('text-indigo-600', 'text-indigo-500')} hover:underline flex items-center mb-2`}
                            aria-label={toPersianDigits(`توضیح برای ${activity.title}`)}
                        >
                            <LightbulbIcon className="w-3 h-3 ml-1 rtl:mr-1 rtl:ml-0"/>
                            {toPersianDigits("چرا این پیشنهاد؟")}
                        </button>
                    )}

                    <button 
                        onClick={() => onAddToCalendar(activity.id)} 
                        className={`w-full text-xs py-1.5 ${primaryAccentClass.replace('text-', 'bg-').replace('-600', '-500')} ${primaryAccentClass.replace('text-rose-600', 'hover:bg-rose-600').replace('text-indigo-600', 'hover:bg-indigo-600')} text-white rounded-md flex items-center justify-center transition-colors`}
                        aria-label={toPersianDigits(`افزودن "${activity.title}" به تقویم`)}
                    >
                       <CalendarDaysIcon className="w-3.5 h-3.5 ml-1 rtl:mr-1 rtl:ml-0"/> {toPersianDigits("افزودن به تقویم خانواده")}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default QualityTimePlannerCard;