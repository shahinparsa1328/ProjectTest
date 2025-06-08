import React from 'react';
import { toPersianDigits } from '../../../../utils';
import { CareServiceCategory } from '../../../../types/familyTypes';
import { BuildingOfficeIcon, LinkIcon } from '../../../shared/AppIcons'; // Assuming BuildingOfficeIcon is suitable

interface CareServiceCategoryCardProps {
  category: CareServiceCategory;
  themeClasses: {
    primaryAccentClass: string;
    secondaryAccentClass: string;
  }
}

const CareServiceCategoryCard: React.FC<CareServiceCategoryCardProps> = ({ category, themeClasses }) => {
  const IconComponent = BuildingOfficeIcon; // Default or map category.iconName

  return (
    <div className={`p-3.5 rounded-lg shadow-sm border ${themeClasses.secondaryAccentClass} bg-white transition-all duration-200 hover:shadow-md`}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-full ${themeClasses.primaryAccentClass.replace('text-', 'bg-').replace('-600', '-100')} ${themeClasses.primaryAccentClass}`}>
          <IconComponent className="w-6 h-6" />
        </div>
        <div className="flex-grow min-w-0">
          <h5 className={`text-sm font-semibold ${themeClasses.primaryAccentClass} mb-0.5 truncate`} title={toPersianDigits(category.name)}>
            {toPersianDigits(category.name)}
          </h5>
          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">{toPersianDigits(category.description)}</p>
        </div>
      </div>
      {category.exampleServices && category.exampleServices.length > 0 && (
        <p className="text-[10px] text-gray-500 mt-1.5">
            {toPersianDigits(`مثال‌ها: ${category.exampleServices.map(s => toPersianDigits(s)).join('، ')}`)}
        </p>
      )}
      <div className="mt-2.5 pt-2 border-t border-gray-100 flex justify-end">
        <button
          onClick={() => alert(toPersianDigits(`جستجوی سرویس‌های ${category.name} (ویژگی در دست توسعه)`))}
          className={`text-xs py-1 px-2.5 rounded-md flex items-center ${themeClasses.primaryAccentClass.replace('text-', 'bg-').replace('-600','-500')} text-white hover:opacity-90 transition-opacity`}
        >
          <LinkIcon className="w-3 h-3 ml-1 rtl:mr-1 rtl:ml-0" />
          {toPersianDigits("یافتن سرویس‌دهندگان (نمایشی)")}
        </button>
      </div>
    </div>
  );
};

export default CareServiceCategoryCard;