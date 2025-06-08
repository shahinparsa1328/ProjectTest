import React from 'react';
import { LearningPath, LearningContent, Badge, UserProgress, AI360FeedbackItem, PredictiveSkillSuggestion } from '../../types/learningTypes'; // Added PredictiveSkillSuggestion
import { toPersianDigits } from '../../utils';
import { ChartPieIcon, BookmarkIcon, TrophyIcon, AcademicCapIcon, MapPinIcon, TrendingUpIcon, ShieldCheckIcon, StarIcon, ClipboardListIcon, UsersIcon, LightbulbMultipleIcon, DocumentTextIcon } from '../shared/AppIcons'; 
import LoadingSpinner from '../shared/LoadingSpinner'; 
import PredictiveSkillCard from './PredictiveSkillCard'; // New import for Phase 3.4

interface LearningProgressDashboardProps {
  isLoadingData: boolean; 
  learningPaths: LearningPath[];
  learningContent: LearningContent[];
  bookmarkedContentIds: Set<string>;
  earnedBadges: Badge[];
  userProgress: UserProgress;
  ai360FeedbackItems?: AI360FeedbackItem[];
  predictiveSkills?: PredictiveSkillSuggestion[]; // Added for Phase 3.4
  onNavigateToSkillsMap?: () => void;
  onNavigateToAchievements?: () => void;
  onNavigateToSimulator?: () => void; 
  onNavigateToCreativeWorkspace?: () => void; 
  onViewLearningPath?: (pathId: string) => void; // Added for Phase 3.4
  onOpenLearningReportModal?: () => void; // Added for Phase 3.4
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactElement<{ className?: string }>; 
  accentColorClass: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, accentColorClass }) => (
  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg shadow-sm flex items-center space-x-3 space-x-reverse border border-gray-200 hover:shadow-md transition-shadow">
    <div className={`p-2 bg-${accentColorClass.split('-')[0]}-100 text-${accentColorClass} rounded-full`}>
      {React.cloneElement(icon, {className: "w-5 h-5 sm:w-6 sm:h-6"})}
    </div>
    <div>
      <p className="text-xs sm:text-sm text-gray-600">{toPersianDigits(title)}</p>
      <p className={`text-lg sm:text-xl font-semibold text-${accentColorClass}`}>{toPersianDigits(String(value))}</p>
    </div>
  </div>
);

const LearningProgressDashboard: React.FC<LearningProgressDashboardProps> = ({
  isLoadingData, 
  learningPaths,
  learningContent,
  bookmarkedContentIds,
  earnedBadges,
  userProgress,
  ai360FeedbackItems = [],
  predictiveSkills = [], // Default to empty
  onNavigateToSkillsMap,
  onNavigateToAchievements,
  onNavigateToSimulator,
  onNavigateToCreativeWorkspace,
  onViewLearningPath, // Added
  onOpenLearningReportModal, // Added
}) => {
  const accentColor = 'sky-600'; 

  const pathsInProgress = learningPaths.filter(p => p.overallProgress > 0 && p.overallProgress < 100).length;
  const pathsCompleted = learningPaths.filter(p => p.overallProgress === 100).length;
  const bookmarkedItems = learningContent.filter(c => bookmarkedContentIds.has(c.id));
  
  const lastEarnedBadge = earnedBadges.length > 0 
    ? earnedBadges.slice().sort((a, b) => new Date(b.earnedDate || 0).getTime() - new Date(a.earnedDate || 0).getTime())[0] 
    : null;

  if (isLoadingData && predictiveSkills.length === 0 && ai360FeedbackItems.length === 0) { // Adjust loading condition
    return (
      <div className="mb-6 sm:mb-8 p-4 sm:p-5 bg-white rounded-xl shadow-lg border border-gray-200/80 text-center">
        <LoadingSpinner size="md" />
        <p className="text-sm text-gray-500 mt-2">{toPersianDigits("در حال بارگذاری داشبورد پیشرفت...")}</p>
      </div>
    );
  }

  return (
    <div className="mb-6 sm:mb-8 p-4 sm:p-5 bg-white rounded-xl shadow-lg border border-gray-200/80">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">{toPersianDigits("داشبورد پیشرفت یادگیری")}</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <StatCard title="مسیرهای در حال انجام" value={pathsInProgress} icon={<ChartPieIcon />} accentColorClass={accentColor} />
        <StatCard title="مسیرهای تکمیل شده" value={pathsCompleted} icon={<AcademicCapIcon />} accentColorClass="green-600" />
        <StatCard title="امتیاز یادگیری" value={userProgress.points} icon={<StarIcon />} accentColorClass="yellow-500" />
        <StatCard title="سطح شما" value={userProgress.levelNamePersian} icon={<ShieldCheckIcon />} accentColorClass="purple-600" />
      </div>
      
      <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
          <TrendingUpIcon className="w-4 h-4 text-gray-500 mr-2 rtl:ml-2 rtl:mr-0"/>
          {toPersianDigits("روند پیشرفت شما (نمودار خطی - به زودی)")}
        </h4>
        <div className="h-32 bg-gray-200 rounded-md flex items-center justify-center text-gray-400 text-xs">
          {toPersianDigits("[جایگاه نمودار روند پیشرفت شما]")}
        </div>
         <p className="text-xs text-gray-500 mt-2 text-center">{toPersianDigits("مقایسه با میانگین کاربران مشابه (به صورت ناشناس و اختیاری) در اینجا نمایش داده خواهد شد.")}</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:space-x-3 sm:space-x-reverse space-y-3 sm:space-y-0 mb-4">
        {onNavigateToSkillsMap && (
          <button 
            onClick={onNavigateToSkillsMap}
            className={`bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 px-4 rounded-lg text-xs sm:text-sm transition-colors flex items-center justify-center w-full sm:w-auto flex-1`}
          >
            <MapPinIcon className="w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0"/>
            {toPersianDigits("نقشه مهارت‌های من")}
          </button>
        )}
        {onNavigateToAchievements && (
          <button 
            onClick={onNavigateToAchievements}
            className={`bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg text-xs sm:text-sm transition-colors flex items-center justify-center w-full sm:w-auto flex-1`}
          >
            <TrophyIcon className="w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0"/>
            {toPersianDigits("مشاهده دستاوردها و نشان‌ها")}
          </button>
        )}
      </div>

       <div className="flex flex-col sm:flex-row sm:space-x-3 sm:space-x-reverse space-y-3 sm:space-y-0 mb-6">
        {onNavigateToSimulator && (
          <button
            onClick={onNavigateToSimulator}
            className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-lg text-xs sm:text-sm transition-colors flex items-center justify-center w-full sm:w-auto flex-1"
          >
            <UsersIcon className="w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0" />
            {toPersianDigits("شبیه‌ساز مکالمه")}
          </button>
        )}
        {onNavigateToCreativeWorkspace && (
          <button
            onClick={onNavigateToCreativeWorkspace}
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg text-xs sm:text-sm transition-colors flex items-center justify-center w-full sm:w-auto flex-1"
          >
            <LightbulbMultipleIcon className="w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0" />
            {toPersianDigits("فضای کاری خلاق")}
          </button>
        )}
      </div>

      {/* Predictive Skills Analytics - Phase 3.4 */}
      {predictiveSkills.length > 0 && (
        <div className="mb-6 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <TrendingUpIcon className="w-4 h-4 text-indigo-500 ml-2 rtl:mr-2 rtl:ml-0" />
            {toPersianDigits("تحلیل پیش‌بینی مسیر شغلی و مهارتی")}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {predictiveSkills.map(skill => (
              <PredictiveSkillCard 
                key={skill.id} 
                suggestion={skill} 
                onViewPath={onViewLearningPath && skill.learningPathId ? () => onViewLearningPath(skill.learningPathId!) : undefined} 
              />
            ))}
          </div>
        </div>
      )}

      {ai360FeedbackItems.length > 0 && (
        <div className="mb-6 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <ClipboardListIcon className={`w-4 h-4 text-indigo-500 ml-2 rtl:mr-2 rtl:ml-0`} />
            {toPersianDigits("بازخورد ۳۶۰ درجه هوش مصنوعی")}
          </h3>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {ai360FeedbackItems.map(item => (
              <div key={item.id} className={`p-2 rounded-md border text-xs ${
                item.type === 'positive' ? 'bg-green-50 border-green-200 text-green-700' :
                item.type === 'constructive' ? 'bg-yellow-50 border-yellow-200 text-yellow-700' :
                'bg-blue-50 border-blue-200 text-blue-700'
              }`}>
                <p className="font-medium">{toPersianDigits(item.feedbackText)}</p>
                <p className="text-[10px] opacity-80 mt-0.5">{toPersianDigits(`زمینه: ${item.relatedContext}`)} - {toPersianDigits(new Date(item.date).toLocaleDateString('fa-IR'))}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Learning Report Button - Phase 3.4 */}
      {onOpenLearningReportModal && (
        <div className="mb-6">
            <button
                onClick={onOpenLearningReportModal}
                className="w-full flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 px-4 rounded-lg text-sm transition-colors shadow-md"
            >
                <DocumentTextIcon className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />
                {toPersianDigits("تولید گزارش جامع یادگیری و رشد")}
            </button>
        </div>
      )}


      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200 min-h-[150px]">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <BookmarkIcon className={`w-4 h-4 text-purple-500 ml-2 rtl:mr-2 rtl:ml-0`}/>
            {toPersianDigits("محتوای ذخیره شده اخیر")}
          </h3>
          {bookmarkedItems.length > 0 ? (
            <ul className="space-y-1.5 max-h-32 sm:max-h-40 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {bookmarkedItems.slice(0, 5).map(item => ( 
                <li key={item.id} className={`text-xs text-gray-600 hover:text-${accentColor} transition-colors cursor-pointer truncate`}>
                  {toPersianDigits(item.title)} ({toPersianDigits(item.type)})
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-gray-500 text-center py-3">{toPersianDigits("هنوز محتوایی ذخیره نکرده‌اید.")}</p>
          )}
        </div>

        <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200 min-h-[150px]">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <TrophyIcon className="w-4 h-4 text-yellow-500 ml-2 rtl:mr-2 rtl:ml-0"/>
            {toPersianDigits("آخرین نشان کسب شده")}
          </h3>
          {lastEarnedBadge ? (
            <div className="flex flex-col items-center p-2 bg-yellow-50 border border-yellow-200 rounded-md text-center" title={toPersianDigits(lastEarnedBadge.description)}>
                {lastEarnedBadge.iconUrl && typeof lastEarnedBadge.iconUrl === 'string' ? 
                  <img src={lastEarnedBadge.iconUrl} alt={toPersianDigits(lastEarnedBadge.name)} className="w-10 h-10 sm:w-12 sm:h-12 mb-1 rounded-full"/> 
                  : lastEarnedBadge.iconUrl ? React.cloneElement(lastEarnedBadge.iconUrl as React.ReactElement<{ className?: string }>, {className: "w-10 h-10 sm:w-12 sm:h-12 text-yellow-500 mb-1"})
                  : <TrophyIcon className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-500 mb-1"/> 
                }
              <span className="text-sm font-medium text-yellow-700">{toPersianDigits(lastEarnedBadge.name)}</span>
              {lastEarnedBadge.earnedDate && <span className="text-[10px] text-yellow-600">{toPersianDigits(`کسب شده در: ${new Date(lastEarnedBadge.earnedDate).toLocaleDateString('fa-IR')}`)}</span>}
            </div>
          ) : (
            <p className="text-xs text-gray-500 text-center py-3">{toPersianDigits("هنوز نشانی کسب نکرده‌اید. با تکمیل مسیرهای یادگیری، نشان کسب کنید!")}</p>
          )}
           {earnedBadges.length > 1 && (
                <p className="text-[10px] text-gray-500 text-center mt-2">{toPersianDigits(`و ${earnedBadges.length -1} نشان دیگر...`)}</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default LearningProgressDashboard;
