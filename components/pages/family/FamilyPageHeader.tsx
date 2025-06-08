import React from 'react';
import { toPersianDigits } from '../../../utils';
import { FamilyIcon, CogIcon, UserCircleIcon } from '../../shared/AppIcons'; // Added UserCircleIcon

interface FamilyPageHeaderProps {
  familyName?: string; 
  familyAverageWellbeing?: number; 
  onOpenSettings?: () => void;
  activeTheme?: { 
    backgroundClass: string;
    primaryAccentClass: string;
    secondaryAccentClass: string;
    buttonBgClass: string;
    buttonHoverBgClass: string;
  };
}

const defaultTheme = {
    backgroundClass: 'bg-rose-50',
    primaryAccentClass: 'text-rose-600',
    secondaryAccentClass: 'border-rose-200',
    buttonBgClass: 'bg-rose-500',
    buttonHoverBgClass: 'hover:bg-rose-600'
};

const FamilyPageHeader: React.FC<FamilyPageHeaderProps> = ({
  familyName, 
  familyAverageWellbeing,
  onOpenSettings,
  activeTheme = defaultTheme, 
}) => {
  const displayTitle = familyName ? toPersianDigits(`خانواده ${familyName}`) : toPersianDigits("خانواده و مراقبت");
  const MainIcon = familyName || familyAverageWellbeing !== undefined ? FamilyIcon : UserCircleIcon; 

  return (
    <header className={`p-4 rounded-b-xl shadow-lg mb-4 ${activeTheme.backgroundClass.replace('bg-', 'bg-gradient-to-br from-').replace('-50', '-500 to-pink-600')}`}>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <MainIcon className={`w-8 h-8 ${activeTheme.primaryAccentClass.replace('text-rose-600', 'text-white')}`} />
          <h1 className={`text-xl font-bold mr-2 rtl:ml-2 rtl:mr-0 ${activeTheme.primaryAccentClass.replace('text-rose-600', 'text-white')}`}>{displayTitle}</h1>
        </div>
        {onOpenSettings && (
          <button onClick={onOpenSettings} className={`p-1.5 rounded-full hover:bg-black/10 transition-colors`} aria-label={toPersianDigits("تنظیمات صفحه خانواده")}>
            <CogIcon className={`w-5 h-5 ${activeTheme.primaryAccentClass.replace('text-rose-600', 'text-white')}`} />
          </button>
        )}
      </div>
      <p className={`text-xs opacity-90 ${activeTheme.primaryAccentClass.replace('text-rose-600', 'text-white')}`}>{toPersianDigits("مرکزی برای هماهنگی، شادی و مراقبت از عزیزانتان.")}</p>
      {familyAverageWellbeing !== undefined && (
        <div className="mt-3 text-center">
          <span className={`text-sm font-semibold px-3 py-1 rounded-full bg-white/25 ${activeTheme.primaryAccentClass.replace('text-rose-600', 'text-white')}`}>
            {toPersianDigits(`میانگین تندرستی خانواده: ${familyAverageWellbeing}%`)}
          </span>
        </div>
      )}
    </header>
  );
};

export default FamilyPageHeader;