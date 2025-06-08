
import React from 'react';
import { toPersianDigits } from '../../utils';
import { ShieldCheckIcon, ArrowRightIcon } from '../shared/AppIcons';
import LoadingSpinner from '../shared/LoadingSpinner';

interface HomeHealthScoreWidgetProps {
  score: number;
  isLoading: boolean;
  onViewDetails: () => void;
}

const HomeHealthScoreWidget: React.FC<HomeHealthScoreWidgetProps> = ({ score, isLoading, onViewDetails }) => {
  const getScoreColorClasses = (value: number): { ring: string; text: string; bg: string; progress: string } => {
    if (value >= 75) return { ring: 'ring-green-500', text: 'text-green-600', bg: 'bg-green-100', progress: 'bg-green-500' };
    if (value >= 50) return { ring: 'ring-yellow-500', text: 'text-yellow-600', bg: 'bg-yellow-100', progress: 'bg-yellow-500' };
    return { ring: 'ring-red-500', text: 'text-red-600', bg: 'bg-red-100', progress: 'bg-red-500' };
  };

  const scoreColors = getScoreColorClasses(score);
  const circumference = 2 * Math.PI * 45; // 2 * pi * radius (radius is 45 for a 100x100 viewBox circle)
  const strokeDashoffset = circumference - (score / 100) * circumference;


  return (
    <div className={`p-4 bg-white rounded-xl shadow-md border border-gray-200/80 ${isLoading ? 'opacity-70' : ''}`}>
      <h2 className="text-md font-semibold text-gray-700 mb-3 flex items-center">
        <ShieldCheckIcon className={`w-6 h-6 ${scoreColors.text} mr-2 rtl:ml-2 rtl:mr-0`} />
        {toPersianDigits("امتیاز سلامت و پایداری خانه")}
      </h2>
      {isLoading ? (
        <div className="flex justify-center items-center h-24">
          <LoadingSpinner size="md" />
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-center justify-around gap-4">
            <div className="relative w-32 h-32">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle
                        className="text-gray-200"
                        strokeWidth="10"
                        stroke="currentColor"
                        fill="transparent"
                        r="45"
                        cx="50"
                        cy="50"
                    />
                    {/* Progress circle */}
                    <circle
                        className={scoreColors.text.replace('text-', 'stroke-')}
                        strokeWidth="10"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                        fill="transparent"
                        r="45"
                        cx="50"
                        cy="50"
                        style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
                    />
                    {/* Text in the middle */}
                    <text
                        x="50"
                        y="50"
                        fontFamily="Vazirmatn, sans-serif"
                        fontSize="24"
                        fontWeight="bold"
                        textAnchor="middle"
                        dy=".3em"
                        className={`${scoreColors.text} transition-colors duration-500`}
                    >
                        {toPersianDigits(`${score}%`)}
                    </text>
                </svg>
            </div>
            <div className="text-center sm:text-right">
                <p className={`text-xl font-bold mb-1 ${scoreColors.text}`}>
                    {score >= 75 ? toPersianDigits("وضعیت عالی") : score >= 50 ? toPersianDigits("وضعیت خوب") : toPersianDigits("نیاز به بهبود")}
                </p>
                <p className="text-xs text-gray-500 mb-3 leading-relaxed max-w-xs">
                    {toPersianDigits("این امتیاز بر اساس بهره‌وری انرژی، امنیت، کیفیت هوا و وضعیت نگهداری محاسبه شده است.")}
                </p>
                <button
                    onClick={onViewDetails}
                    className={`text-sm font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center sm:justify-start w-full sm:w-auto
                                ${scoreColors.bg} ${scoreColors.text} hover:opacity-80 border ${scoreColors.ring.replace('ring-','border-')}`}
                >
                    {toPersianDigits("مشاهده جزئیات و پیشنهادات AI")}
                    <ArrowRightIcon className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 transform scale-x-[-1]" />
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default HomeHealthScoreWidget;
