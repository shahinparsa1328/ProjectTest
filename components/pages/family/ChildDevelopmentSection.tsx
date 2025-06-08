
import React, { useState } from 'react';
import { toPersianDigits } from '../../../utils';
import { SleepLog, NutritionLog, ActivitySuggestion, ParentingTip, GameIdea, FamilyMember, ChildHealthAlert } from '../../../types/familyTypes';
import { AcademicCapIcon, LightbulbIcon, SparklesIconNav, PlusIcon, ShieldExclamationIcon, ArrowPathIcon } from '../../shared/AppIcons';
import SleepLogCard from './SleepLogCard';
import NutritionLogCard from './NutritionLogCard';
import ActivitySuggestionCard from './ActivitySuggestionCard';
import ParentingTipCard from './ParentingTipCard';
import GameIdeaCard from './GameIdeaCard';
import LoadingSpinner from '../../shared/LoadingSpinner';
import ChildHealthAlertCard from './ChildHealthAlertCard'; // New import

interface ChildDevelopmentSectionProps {
  familyMembers: FamilyMember[]; 
  sleepLogs: SleepLog[];
  nutritionLogs: NutritionLog[];
  activitySuggestions: ActivitySuggestion[]; // Original static/mock suggestions
  parentingTips: ParentingTip[]; // Now for dynamic AI tips
  gameIdeas: GameIdea[];
  onAddSleepLog: () => void; 
  onAddNutritionLog: () => void; 
  onShowXai: (rationale: string) => void;
  primaryAccentClass: string;
  childHealthAlerts: ChildHealthAlert[]; // New for AI alerts
  isLoadingParentingTips: boolean; // New
  isLoadingChildHealthAlerts: boolean; // New
  parentingTipsError: string | null; // New
  childHealthAlertsError: string | null; // New
  onRefreshAIParentingInsights: () => void; // New
  onRefreshAIChildHealthAlerts: () => void; // New
}

const ChildDevelopmentSection: React.FC<ChildDevelopmentSectionProps> = ({
  familyMembers,
  sleepLogs,
  nutritionLogs,
  activitySuggestions, // Keep these as they might be static or differently sourced
  parentingTips,      // This will now be the dynamic AI-generated tips
  gameIdeas,
  onAddSleepLog,
  onAddNutritionLog,
  onShowXai,
  primaryAccentClass,
  childHealthAlerts,
  isLoadingParentingTips,
  isLoadingChildHealthAlerts,
  parentingTipsError,
  childHealthAlertsError,
  onRefreshAIParentingInsights,
  onRefreshAIChildHealthAlerts
}) => {
  const children = familyMembers.filter(m => m.role === 'فرزند');
  
  const handleRefreshAllChildAI = () => {
    onRefreshAIParentingInsights();
    onRefreshAIChildHealthAlerts();
    // Could also refresh activity/game suggestions if they become AI-driven
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mb-2">
        <h4 className={`text-sm font-semibold ${primaryAccentClass.replace('text-rose-600', 'text-rose-700')} flex items-center`}>
          <AcademicCapIcon className={`w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 ${primaryAccentClass}`} />
          {toPersianDigits("رشد و مراقبت از کودک")}
        </h4>
        <div className="flex gap-2 flex-wrap justify-center sm:justify-end">
            <button onClick={onAddSleepLog} className={`text-xs py-1 px-2.5 rounded-md flex items-center bg-blue-100 text-blue-600 hover:bg-blue-200`}>
                <PlusIcon className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0"/> {toPersianDigits("ثبت گزارش خواب")}
            </button>
            <button onClick={onAddNutritionLog} className={`text-xs py-1 px-2.5 rounded-md flex items-center bg-green-100 text-green-600 hover:bg-green-200`}>
                <PlusIcon className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0"/> {toPersianDigits("ثبت گزارش تغذیه")}
            </button>
            <button 
                onClick={handleRefreshAllChildAI} 
                disabled={isLoadingParentingTips || isLoadingChildHealthAlerts}
                className={`text-xs py-1 px-2.5 rounded-md flex items-center ${primaryAccentClass.replace('text-', 'bg-').replace('-600','-100')} ${primaryAccentClass} hover:opacity-80 disabled:opacity-50`}
            >
                {(isLoadingParentingTips || isLoadingChildHealthAlerts) ? <LoadingSpinner size="sm" /> : <ArrowPathIcon className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0"/>}
                {toPersianDigits("بازخوانی بینش‌های AI")}
            </button>
        </div>
      </div>
      
      {/* AI Child Health Alerts */}
      {(isLoadingChildHealthAlerts || childHealthAlertsError || childHealthAlerts.length > 0) && (
        <div className="mb-3">
          <h5 className="text-xs font-medium text-gray-600 mb-1.5 flex items-center">
              <ShieldExclamationIcon className="w-3.5 h-3.5 text-red-500 mr-1"/>
              {toPersianDigits("هشدارهای سلامت کودک از AI:")}
          </h5>
          {isLoadingChildHealthAlerts && <div className="flex justify-center py-2"><LoadingSpinner/></div>}
          {childHealthAlertsError && <p className="text-xs text-red-500 bg-red-50 p-2 rounded-md">{childHealthAlertsError}</p>}
          {!isLoadingChildHealthAlerts && !childHealthAlertsError && childHealthAlerts.length === 0 && <p className="text-xs text-gray-500 text-center">{toPersianDigits("هشدار جدیدی وجود ندارد.")}</p>}
          <div className="space-y-2">
            {childHealthAlerts.map(alert => (
              <ChildHealthAlertCard key={alert.id} alert={alert} onShowXai={onShowXai} />
            ))}
          </div>
        </div>
      )}


      {/* Sleep Logs - Show latest 2 */}
      {sleepLogs.length > 0 && (
        <div>
          <h5 className="text-xs font-medium text-gray-600 mb-1.5">{toPersianDigits("آخرین گزارش‌های خواب:")}</h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {sleepLogs.slice(0,2).map(log => (
              <SleepLogCard key={log.id} log={log} childName={familyMembers.find(m=>m.id===log.childMemberId)?.name || ''} onEdit={()=>{}} onDelete={()=>{}} />
            ))}
          </div>
        </div>
      )}

      {/* Nutrition Logs - Show latest 2 */}
      {nutritionLogs.length > 0 && (
        <div>
          <h5 className="text-xs font-medium text-gray-600 mb-1.5">{toPersianDigits("آخرین گزارش‌های تغذیه:")}</h5>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {nutritionLogs.slice(0,2).map(log => (
              <NutritionLogCard key={log.id} log={log} childName={familyMembers.find(m=>m.id===log.childMemberId)?.name || ''} onEdit={()=>{}} onDelete={()=>{}}/>
            ))}
          </div>
        </div>
      )}
      
      {/* Dynamic AI Parenting Tips */}
      {(isLoadingParentingTips || parentingTipsError || parentingTips.length > 0) && (
        <div>
          <h5 className="text-xs font-medium text-gray-600 mb-1.5 flex items-center">
            <LightbulbIcon className="w-3.5 h-3.5 text-teal-500 mr-1"/>
            {toPersianDigits("نکات تربیتی هوشمند از AI:")}
          </h5>
          {isLoadingParentingTips && <div className="flex justify-center py-2"><LoadingSpinner/></div>}
          {parentingTipsError && <p className="text-xs text-red-500 bg-red-50 p-2 rounded-md">{parentingTipsError}</p>}
          {!isLoadingParentingTips && !parentingTipsError && parentingTips.length === 0 && <p className="text-xs text-gray-500 text-center">{toPersianDigits("نکته جدیدی از AI دریافت نشد.")}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {parentingTips.map(tip => (
              <ParentingTipCard key={tip.id} tip={tip} onShowXai={onShowXai} />
            ))}
          </div>
        </div>
      )}
      
      {/* Static or other AI Suggestions (Activity & Game) */}
      {activitySuggestions.length > 0 && (
        <div>
          <h5 className="text-xs font-medium text-gray-600 mb-1.5 flex items-center"><SparklesIconNav className="w-3.5 h-3.5 text-orange-500 mr-1"/>{toPersianDigits("پیشنهادات فعالیت رشدی:")}</h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {activitySuggestions.slice(0,2).map(sugg => (
              <ActivitySuggestionCard key={sugg.id} suggestion={sugg} childName={familyMembers.find(m=>m.id===sugg.childMemberId)?.name || ''} onShowXai={onShowXai} />
            ))}
          </div>
        </div>
      )}
      {gameIdeas.length > 0 && (
        <div>
          <h5 className="text-xs font-medium text-gray-600 mb-1.5 flex items-center"><SparklesIconNav className="w-3.5 h-3.5 text-pink-500 mr-1"/>{toPersianDigits("ایده‌های بازی:")}</h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {gameIdeas.slice(0,2).map(idea => (
              <GameIdeaCard key={idea.id} idea={idea} onShowXai={onShowXai} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChildDevelopmentSection;