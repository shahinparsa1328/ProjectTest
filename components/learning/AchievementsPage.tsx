
import React from 'react';
import { Badge } from '../../types/learningTypes';
import { toPersianDigits } from '../../utils';
import Breadcrumbs from './Breadcrumbs';
import { TrophyIcon, LockClosedIcon, SparklesIconNav } from '../shared/AppIcons';

interface AchievementsPageProps {
  earnedBadges: Badge[];
  allPossibleBadges: Badge[]; // Includes earned and unearned
  onBackToLibrary: () => void;
  onNavigateToGateway?: () => void;
}

const BadgeCard: React.FC<{ badge: Badge; isEarned: boolean }> = ({ badge, isEarned }) => {
  const iconElement = badge.iconUrl && typeof badge.iconUrl !== 'string' 
    ? React.cloneElement(badge.iconUrl as React.ReactElement<{ className?: string }>, { className: `w-12 h-12 ${isEarned ? 'text-yellow-500' : 'text-gray-400'}` })
    : <TrophyIcon className={`w-12 h-12 ${isEarned ? 'text-yellow-500' : 'text-gray-400'}`} />;

  return (
    <div className={`p-4 rounded-lg shadow-sm border flex flex-col items-center text-center transition-all duration-300 ${
      isEarned 
        ? 'bg-yellow-50 border-yellow-300 hover:shadow-yellow-200/50 hover:shadow-md' 
        : 'bg-gray-100 border-gray-300 opacity-70 hover:opacity-100'
    }`}>
      <div className={`p-2 rounded-full mb-2 ${isEarned ? 'bg-yellow-100' : 'bg-gray-200'}`}>
        {iconElement}
      </div>
      <h4 className={`text-md font-semibold ${isEarned ? 'text-yellow-700' : 'text-gray-600'}`}>{toPersianDigits(badge.name)}</h4>
      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{toPersianDigits(badge.description)}</p>
      {isEarned && badge.earnedDate && (
        <p className="text-[10px] text-gray-400 mt-1">{toPersianDigits(`کسب شده در: ${new Date(badge.earnedDate).toLocaleDateString('fa-IR')}`)}</p>
      )}
      {!isEarned && badge.condition && (
        <p className="text-xs text-gray-400 mt-1 flex items-center justify-center">
          <LockClosedIcon className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0" />
          {toPersianDigits(badge.condition)}
        </p>
      )}
    </div>
  );
};

const AchievementsPage: React.FC<AchievementsPageProps> = ({
  earnedBadges,
  allPossibleBadges,
  onBackToLibrary,
  onNavigateToGateway,
}) => {
  const breadcrumbSegments = [
    ...(onNavigateToGateway ? [{ label: toPersianDigits('صفحه اصلی یادگیری'), onClick: onNavigateToGateway }] : []),
    { label: toPersianDigits('کتابخانه'), onClick: onBackToLibrary },
    { label: toPersianDigits('دستاوردها و نشان‌ها') }
  ];

  const earnedBadgeIds = new Set(earnedBadges.map(b => b.id));
  const unearnedBadges = allPossibleBadges.filter(b => !earnedBadgeIds.has(b.id));

  return (
    <div className="page bg-learning-page">
      <Breadcrumbs segments={breadcrumbSegments} className="mb-4 px-1 sm:px-0" />
      
      <header className="mb-6 p-4 sm:p-6 bg-white rounded-xl shadow-lg border border-gray-200/80 text-center">
        <TrophyIcon className="w-12 h-12 text-yellow-500 mx-auto mb-3"/>
        <h1 className="text-2xl sm:text-3xl font-bold text-yellow-600 mb-2">
          {toPersianDigits("دستاوردها و نشان‌های شما")}
        </h1>
        <p className="text-sm text-gray-600 max-w-md mx-auto">
          {toPersianDigits("نشان‌هایی که با تلاش و پیشرفت در مسیر یادگیری کسب کرده‌اید و آنهایی که در انتظار شما هستند.")}
        </p>
      </header>

      {earnedBadges.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
            <SparklesIconNav className="w-6 h-6 text-green-600 ml-2 rtl:mr-2 rtl:ml-0"/>
            {toPersianDigits("نشان‌های کسب شده")} ({toPersianDigits(earnedBadges.length.toString())})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {earnedBadges.map(badge => <BadgeCard key={badge.id} badge={badge} isEarned={true} />)}
          </div>
        </section>
      )}

      {unearnedBadges.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <LockClosedIcon className="w-6 h-6 text-gray-500 ml-2 rtl:mr-2 rtl:ml-0"/>
            {toPersianDigits("نشان‌های قابل کسب")} ({toPersianDigits(unearnedBadges.length.toString())})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {unearnedBadges.map(badge => <BadgeCard key={badge.id} badge={badge} isEarned={false} />)}
          </div>
        </section>
      )}

      {earnedBadges.length === 0 && unearnedBadges.length === 0 && (
         <div className="text-center py-10 bg-white rounded-lg border border-gray-200 shadow-sm">
            <TrophyIcon className="w-16 h-16 text-gray-400 mx-auto mb-3" />
            <p className="text-md text-gray-500">{toPersianDigits("در حال حاضر هیچ نشانی برای نمایش وجود ندارد.")}</p>
            <p className="text-sm text-gray-400 mt-1">{toPersianDigits("با شروع و تکمیل مسیرهای یادگیری، نشان‌ها را کسب کنید.")}</p>
          </div>
      )}

      <div className="mt-8 text-center">
        <button 
          onClick={onBackToLibrary}
          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2.5 px-6 rounded-lg text-sm transition-colors"
        >
          {toPersianDigits("بازگشت به کتابخانه")}
        </button>
      </div>
    </div>
  );
};

export default AchievementsPage;