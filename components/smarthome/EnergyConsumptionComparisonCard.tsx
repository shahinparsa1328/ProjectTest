import React from 'react';
import { toPersianDigits } from '../../utils';
import { UserEnergyData } from '../../types/smartHomeTypes';
import { BoltIcon, TrendingUpIcon, LightbulbIcon } from '../shared/AppIcons'; // Assuming BoltIcon for energy
import LoadingSpinner from '../shared/LoadingSpinner';

interface EnergyConsumptionComparisonCardProps {
  energyData: UserEnergyData | null;
  isLoading: boolean;
}

const EnergyConsumptionComparisonCard: React.FC<EnergyConsumptionComparisonCardProps> = ({ energyData, isLoading }) => {
  if (isLoading) {
    return (
      <div className="p-4 bg-white rounded-xl shadow-md border border-gray-200/80 flex justify-center items-center h-36">
        <LoadingSpinner />
        <p className="text-xs text-gray-500 mr-2 rtl:ml-2 rtl:mr-0">{toPersianDigits("در حال بارگذاری داده‌های مصرف انرژی...")}</p>
      </div>
    );
  }

  if (!energyData) {
    return (
      <div className="p-4 bg-white rounded-xl shadow-md border border-gray-200/80">
        <h2 className="text-md font-semibold text-gray-700 mb-2 flex items-center">
          <BoltIcon className="w-5 h-5 text-gray-600 mr-2 rtl:ml-2 rtl:mr-0" />
          {toPersianDigits("مقایسه مصرف انرژی")}
        </h2>
        <p className="text-xs text-gray-500 text-center py-3">{toPersianDigits("داده‌های مصرف انرژی در حال حاضر در دسترس نیست.")}</p>
      </div>
    );
  }

  const { currentMonthKwh, communityAverageKwh, aiEnergyInsight } = energyData;
  const difference = currentMonthKwh - communityAverageKwh;
  const differencePercentage = communityAverageKwh !== 0 ? (difference / communityAverageKwh) * 100 : 0;
  
  let differenceText = toPersianDigits("مشابه میانگین");
  let differenceColor = 'text-gray-600';
  let trendIcon = <TrendingUpIcon className="w-4 h-4" />; // Default neutral or up

  if (differencePercentage > 5) { // Consuming significantly more
    differenceText = `${toPersianDigits(differencePercentage.toFixed(0))}% بیشتر از میانگین`;
    differenceColor = 'text-red-600';
    // trendIcon should indicate higher consumption is bad, an up arrow for value is fine.
  } else if (differencePercentage < -5) { // Consuming significantly less
    differenceText = `${toPersianDigits(Math.abs(differencePercentage).toFixed(0))}% کمتر از میانگین`;
    differenceColor = 'text-green-600';
    // trendIcon for less consumption is good.
  }


  return (
    <div className="p-4 bg-white rounded-xl shadow-md border border-gray-200/80">
      <h2 className="text-md font-semibold text-gray-700 mb-3 flex items-center">
        <BoltIcon className="w-5 h-5 text-yellow-500 mr-2 rtl:ml-2 rtl:mr-0" />
        {toPersianDigits("مقایسه مصرف انرژی ماهانه")}
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3 text-center">
        <div className="p-2 bg-yellow-50 rounded-md border border-yellow-200">
          <p className="text-xs text-yellow-700">{toPersianDigits("مصرف شما (این ماه)")}</p>
          <p className="text-xl font-bold text-yellow-600">{toPersianDigits(currentMonthKwh.toFixed(1))} <span className="text-xs">{toPersianDigits("kWh")}</span></p>
        </div>
        <div className="p-2 bg-gray-100 rounded-md border border-gray-200">
          <p className="text-xs text-gray-700">{toPersianDigits("میانگین انجمن")}</p>
          <p className="text-xl font-bold text-gray-600">{toPersianDigits(communityAverageKwh.toFixed(1))} <span className="text-xs">{toPersianDigits("kWh")}</span></p>
        </div>
      </div>

      <div className={`flex items-center justify-center text-sm font-medium mb-3 p-2 rounded-md ${
          differencePercentage > 5 ? 'bg-red-100 text-red-700' : 
          differencePercentage < -5 ? 'bg-green-100 text-green-700' : 
          'bg-gray-100 text-gray-700'
        }`}>
        {React.cloneElement(trendIcon, { className: `w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0 ${differenceColor}` })}
        {toPersianDigits(differenceText)}
      </div>

      {aiEnergyInsight && (
        <div className="p-2 bg-sky-50 rounded-md border border-sky-200 text-xs text-sky-700 flex items-start">
          <LightbulbIcon className="w-4 h-4 text-yellow-500 mr-2 rtl:ml-2 rtl:mr-0 mt-0.5 flex-shrink-0" />
          <p><strong>{toPersianDigits("بینش AI: ")}</strong>{toPersianDigits(aiEnergyInsight)}</p>
        </div>
      )}
       <p className="text-[10px] text-gray-400 mt-2 text-center">{toPersianDigits("مقایسه‌ها به صورت ناشناس و جهت ارائه بینش انجام می‌شود.")}</p>
    </div>
  );
};

export default EnergyConsumptionComparisonCard;