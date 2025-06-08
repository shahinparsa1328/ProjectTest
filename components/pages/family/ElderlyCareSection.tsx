
import React from 'react';
import { toPersianDigits } from '../../../utils';
import { ElderlyHealthDataPoint, ElderlyAISuggestion, ElderlyHealthTrend, ElderlyAISuggestionType } from '../../../types/familyTypes';
import { ShieldCheckIcon, LightbulbIcon, SparklesIconNav, ShieldExclamationIcon, AdjustmentsVerticalIcon, ArrowPathIcon } from '../../shared/AppIcons';
import LoadingSpinner from '../../shared/LoadingSpinner';
import ElderlyCareAISuggestionCard from './ElderlyCareAISuggestionCard'; // Use updated card

interface ElderlyCareSectionProps {
  healthData: ElderlyHealthDataPoint[]; 
  aiSuggestions: ElderlyAISuggestion[]; 
  healthTrends: ElderlyHealthTrend[]; 
  onShowXai: (rationale: string) => void;
  primaryAccentClass: string;
  isLoadingAISuggestions: boolean; 
  aiSuggestionError: string | null; 
  onRefreshAIAnalysis: () => void; 
}

// Simple placeholder card for trends (can be enhanced)
const ElderlyHealthTrendCard: React.FC<{trend: ElderlyHealthTrend}> = ({trend}) => (
    <div className="p-2.5 bg-gray-100 rounded-md border border-gray-200 text-xs">
        <p className="font-medium text-gray-700">{toPersianDigits(trend.dataType)} ({toPersianDigits(trend.period)})</p>
        <p className="text-gray-600">{toPersianDigits(trend.trendDescription)}</p>
    </div>
);

const getAlertTypePersian = (type?: ElderlyAISuggestionType): string => {
  if (!type) return 'هشدار مهم';
  switch (type) {
    case 'environment_adjustment': return 'تنظیمات محیطی';
    case 'care_plan_change': return 'تغییر برنامه مراقبت';
    case 'activity_recommendation': return 'پیشنهاد فعالیت';
    case 'health_observation_alert': return 'هشدار مشاهده سلامت';
    case 'medication_reminder_follow_up': return 'پیگیری یادآور دارو';
    default: return 'هشدار مهم';
  }
};


const ElderlyCareSection: React.FC<ElderlyCareSectionProps> = ({ 
  healthData, 
  aiSuggestions, 
  healthTrends, 
  onShowXai, 
  primaryAccentClass,
  isLoadingAISuggestions,
  aiSuggestionError,
  onRefreshAIAnalysis
}) => {
  
  // Example Critical Alert based on AI Suggestion severity
  const criticalAlert = aiSuggestions.find(s => s.severity === 'critical');

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mb-2">
        <h4 className={`text-sm font-semibold ${primaryAccentClass.replace('text-rose-600','text-rose-700')} flex items-center`}>
          <ShieldCheckIcon className={`w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 ${primaryAccentClass}`} />
          {toPersianDigits("مراقبت و پشتیبانی از سالمند")}
        </h4>
         <button 
            onClick={onRefreshAIAnalysis} 
            disabled={isLoadingAISuggestions}
            className={`text-xs py-1 px-2.5 rounded-md flex items-center ${primaryAccentClass.replace('text-', 'bg-').replace('-600','-100')} ${primaryAccentClass} hover:opacity-80 disabled:opacity-50`}
        >
            {isLoadingAISuggestions ? <LoadingSpinner size="sm" /> : <ArrowPathIcon className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0"/>}
            {toPersianDigits("شبیه‌سازی داده جدید / تحلیل AI")}
        </button>
      </div>

      <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-300 text-xs text-yellow-800">
        <ShieldExclamationIcon className="w-4 h-4 inline mr-1 rtl:ml-1 rtl:mr-0" />
        {toPersianDigits("توجه: قابلیت‌های نظارت از راه دور نیازمند رضایت کامل و آگاهانه تمام طرفین است و با بالاترین استانداردهای امنیتی و حریم خصوصی پیاده‌سازی خواهد شد.")}
      </div>

      {criticalAlert && (
       <div className="p-3 bg-red-100 rounded-lg border-2 border-red-400 shadow-md animate-pulseSlow">
            <div className="flex items-start">
                <ShieldExclamationIcon className="w-6 h-6 text-red-600 mr-2 rtl:ml-2 rtl:mr-0 flex-shrink-0 mt-0.5"/>
                <div>
                    <h5 className="text-sm font-bold text-red-700">{toPersianDigits(`هشدار بحرانی: ${getAlertTypePersian(criticalAlert.alertType)}`)}</h5>
                    <p className="text-xs text-red-700 mt-1 leading-relaxed">{toPersianDigits(criticalAlert.suggestionText)}</p>
                    <p className="text-[10px] text-gray-500 mt-1">{toPersianDigits(new Date().toLocaleTimeString('fa-IR'))}</p>
                </div>
            </div>
        </div>
      )}

      <div className="p-4 bg-gray-100 rounded-lg border border-gray-300 text-center">
        <p className="text-sm font-medium text-gray-700">{toPersianDigits("داشبورد مراقبت پیشرفته")}</p>
        <p className="text-xs text-gray-500 mt-1">{toPersianDigits("(نمایش داده‌های سنسور، گزارش روند و هشدارهای قابل تنظیم در اینجا خواهد بود)")}</p>
        <div className="mt-3 h-24 bg-gray-200 rounded-md flex items-center justify-center text-gray-400 text-xs">
            {toPersianDigits("[جایگاه نمودارها و داده‌های سنسور]")}
        </div>
      </div>
      
      {healthTrends.length > 0 && (
        <div>
          <h5 className="text-xs font-medium text-gray-600 mb-1.5 flex items-center">
            <SparklesIconNav className="w-3.5 h-3.5 text-blue-500 mr-1"/>
            {toPersianDigits("روندهای سلامتی اخیر (نمونه):")}
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {healthTrends.map(trend => (
                <ElderlyHealthTrendCard key={trend.id} trend={trend} />
            ))}
          </div>
        </div>
      )}

      {(isLoadingAISuggestions || aiSuggestionError || aiSuggestions.filter(s => s.severity !== 'critical').length > 0) && (
        <div>
          <h5 className="text-xs font-medium text-gray-600 mb-1.5 flex items-center">
            <AdjustmentsVerticalIcon className="w-3.5 h-3.5 text-green-500 mr-1"/>
            {toPersianDigits("پیشنهادات و هشدارهای AI برای بهبود مراقبت:")}
          </h5>
          {isLoadingAISuggestions && <div className="flex justify-center py-2"><LoadingSpinner/></div>}
          {aiSuggestionError && <p className="text-xs text-red-500 bg-red-50 p-2 rounded-md">{aiSuggestionError}</p>}
          {!isLoadingAISuggestions && !aiSuggestionError && aiSuggestions.filter(s => s.severity !== 'critical').length === 0 && <p className="text-xs text-gray-500 text-center">{toPersianDigits("پیشنهاد یا هشدار جدیدی وجود ندارد.")}</p>}
          <div className="space-y-2">
            {aiSuggestions.filter(s => s.severity !== 'critical').map(sugg => ( // Filter out critical, as it's displayed above
               <ElderlyCareAISuggestionCard key={sugg.id} suggestion={sugg} onShowXai={onShowXai} primaryAccentClass={primaryAccentClass} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ElderlyCareSection;
