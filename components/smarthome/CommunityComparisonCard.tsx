
import React from 'react';
import { toPersianDigits } from '../../utils';
import { CommunityComparisonData } from '../../types/smartHomeTypes';
import { UserGroupIcon, TrendingUpIcon, LightbulbIcon, SparklesIconNav } from '../shared/AppIcons'; // Added SparklesIconNav
import LoadingSpinner from '../shared/LoadingSpinner';

interface CommunityComparisonCardProps {
  comparisonData: CommunityComparisonData | null;
  isLoading: boolean;
}

const CommunityComparisonCard: React.FC<CommunityComparisonCardProps> = ({ comparisonData, isLoading }) => {
  if (isLoading) {
    return (
      <div className="p-4 bg-white rounded-xl shadow-md border border-gray-200/80 flex justify-center items-center h-32">
        <LoadingSpinner />
        <p className="text-xs text-gray-500 mr-2 rtl:ml-2 rtl:mr-0">{toPersianDigits("در حال بارگذاری داده‌های انجمن...")}</p>
      </div>
    );
  }

  if (!comparisonData) {
    return (
      <div className="p-4 bg-white rounded-xl shadow-md border border-gray-200/80">
        <h2 className="text-md font-semibold text-gray-700 mb-2 flex items-center">
          <UserGroupIcon className="w-5 h-5 text-gray-600 mr-2 rtl:ml-2 rtl:mr-0" />
          {toPersianDigits("مقایسه با انجمن")}
        </h2>
        <p className="text-xs text-gray-500 text-center py-3">{toPersianDigits("داده‌های مقایسه با انجمن در حال حاضر در دسترس نیست.")}</p>
      </div>
    );
  }

  const { userScore, communityAverageScore, aiInsight } = comparisonData;
  const scoreDifference = userScore - communityAverageScore;
  const differenceText = scoreDifference > 0 
    ? `${toPersianDigits(scoreDifference.toString())}% بالاتر از میانگین` 
    : scoreDifference < 0 
    ? `${toPersianDigits(Math.abs(scoreDifference).toString())}% پایین‌تر از میانگین` 
    : "دقیقا برابر با میانگین";
  
  const differenceColor = scoreDifference > 0 ? 'text-green-600' : scoreDifference < 0 ? 'text-red-600' : 'text-gray-600';

  return (
    <div className="p-4 bg-white rounded-xl shadow-md border border-gray-200/80">
      <h2 className="text-md font-semibold text-gray-700 mb-3 flex items-center">
        <UserGroupIcon className="w-5 h-5 text-indigo-600 mr-2 rtl:ml-2 rtl:mr-0" />
        {toPersianDigits("مقایسه پایداری با انجمن")}
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3 text-center">
        <div className="p-2 bg-indigo-50 rounded-md border border-indigo-200">
          <p className="text-xs text-indigo-700">{toPersianDigits("امتیاز شما")}</p>
          <p className="text-xl font-bold text-indigo-600">{toPersianDigits(`${userScore}%`)}</p>
        </div>
        <div className="p-2 bg-gray-100 rounded-md border border-gray-200">
          <p className="text-xs text-gray-700">{toPersianDigits("میانگین انجمن")}</p>
          <p className="text-xl font-bold text-gray-600">{toPersianDigits(`${communityAverageScore}%`)}</p>
        </div>
      </div>

      <div className={`flex items-center justify-center text-sm font-medium mb-3 p-2 rounded-md ${
          scoreDifference > 5 ? 'bg-green-100 text-green-700' : 
          scoreDifference < -5 ? 'bg-red-100 text-red-700' : 
          'bg-yellow-100 text-yellow-700'
        }`}>
        <TrendingUpIcon className={`w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0 ${differenceColor}`} />
        {toPersianDigits(`شما ${differenceText} هستید.`)}
      </div>

      <div className="p-2 bg-sky-50 rounded-md border border-sky-200 text-xs text-sky-700 flex items-start">
        <SparklesIconNav className="w-4 h-4 text-yellow-500 mr-2 rtl:ml-2 rtl:mr-0 mt-0.5 flex-shrink-0" /> {/* Using SparklesIconNav from AppIcons */}
        <p><strong>{toPersianDigits("بینش AI: ")}</strong>{toPersianDigits(aiInsight)}</p>
      </div>
    </div>
  );
};

export default CommunityComparisonCard;
