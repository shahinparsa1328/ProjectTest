import React from 'react';
import { toPersianDigits } from '../../../../utils';
import { EducationalPlatform } from '../../../../types/familyTypes';
import { LinkIcon, AcademicCapIcon } from '../../../shared/AppIcons';

interface EducationalPlatformCardProps {
  platform: EducationalPlatform;
  themeClasses: {
    primaryAccentClass: string;
    secondaryAccentClass: string;
  }
}

const EducationalPlatformCard: React.FC<EducationalPlatformCardProps> = ({ platform, themeClasses }) => {
  return (
    <div className={`p-3.5 rounded-lg shadow-sm border ${themeClasses.secondaryAccentClass} bg-white transition-all duration-200 hover:shadow-md`}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-full ${themeClasses.primaryAccentClass.replace('text-', 'bg-').replace('-600', '-100')} ${themeClasses.primaryAccentClass}`}>
          {platform.logoUrl ? (
            <img src={platform.logoUrl} alt={toPersianDigits(platform.name)} className="w-7 h-7 object-contain rounded-full" />
          ) : (
            <AcademicCapIcon className="w-6 h-6" />
          )}
        </div>
        <div className="flex-grow min-w-0">
          <h5 className={`text-sm font-semibold ${themeClasses.primaryAccentClass} mb-0.5 truncate`} title={toPersianDigits(platform.name)}>
            {toPersianDigits(platform.name)}
          </h5>
          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">{toPersianDigits(platform.description)}</p>
        </div>
      </div>
      <div className="mt-2.5 pt-2 border-t border-gray-100 flex justify-between items-center">
        <p className="text-[10px] text-gray-500">
          {toPersianDigits(`موضوعات مرتبط: ${platform.relevantTopics.map(t => toPersianDigits(t)).join('، ')}`)}
        </p>
        <a 
          href={platform.websiteUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className={`text-xs py-1 px-2.5 rounded-md flex items-center ${themeClasses.primaryAccentClass.replace('text-', 'bg-').replace('-600','-500')} text-white hover:opacity-90 transition-opacity`}
        >
          <LinkIcon className="w-3 h-3 ml-1 rtl:mr-1 rtl:ml-0" />
          {toPersianDigits("مشاهده پلتفرم")}
        </a>
      </div>
    </div>
  );
};

export default EducationalPlatformCard;