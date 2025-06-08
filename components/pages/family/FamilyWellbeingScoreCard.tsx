
import React from 'react';
import { toPersianDigits } from '../../../utils';
import { HeartIcon as WellbeingScoreIcon } from '../../shared/AppIcons';

interface FamilyWellbeingScoreCardProps {
  score: number;
  onOpenReport: () => void;
  primaryAccentClass: string;
  secondaryAccentClass: string;
}

const FamilyWellbeingScoreCard: React.FC<FamilyWellbeingScoreCardProps> = ({ score, onOpenReport, primaryAccentClass, secondaryAccentClass }) => (
    <div className={`p-4 rounded-xl shadow-md border ${secondaryAccentClass} bg-white hover:shadow-lg transition-shadow`}>
        <div className="flex items-center justify-between mb-3">
            <h4 className={`font-semibold ${primaryAccentClass} flex items-center text-base`}>
                <WellbeingScoreIcon className={`w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0 ${primaryAccentClass}`} />
                {toPersianDigits("امتیاز تندرستی خانواده")}
            </h4>
            <button 
                onClick={onOpenReport} 
                className={`text-xs ${primaryAccentClass.replace('text-rose-600','text-rose-500')} hover:opacity-75 font-medium`}
                aria-label={toPersianDigits("مشاهده گزارش تندرستی خانواده")}
            >
                {toPersianDigits("مشاهده گزارش")} &raquo;
            </button>
        </div>
        <div className="text-center">
            <p className={`text-4xl font-bold ${primaryAccentClass}`}>{toPersianDigits(score.toString())}%</p>
            <p className="text-xs text-gray-500 mt-1">
                {score >= 80 ? toPersianDigits("عالی! خانواده شما در هماهنگی است.") :
                 score >= 60 ? toPersianDigits("خوب است، اما جای پیشرفت وجود دارد.") :
                 toPersianDigits("نیاز به توجه بیشتر برای بهبود تندرستی.")}
            </p>
        </div>
    </div>
);

export default FamilyWellbeingScoreCard;
