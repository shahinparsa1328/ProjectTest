import React from 'react';
import { toPersianDigits } from '../../utils';
import { PrivacyBadge } from '../../types/privacyTypes';
import { GiftIcon, LockClosedIcon } from '../shared/AppIcons'; // Assuming GiftIcon for general badge

interface PrivacyBadgesShowcaseProps {
  earnedBadgeIds: Set<string>;
  allBadges: PrivacyBadge[];
}

const PrivacyBadgesShowcase: React.FC<PrivacyBadgesShowcaseProps> = ({ earnedBadgeIds, allBadges }) => {
  return (
    <div>
      <h5 className="text-xs font-semibold text-purple-700 mb-1.5">{toPersianDigits("نشان‌های شما:")}</h5>
      {allBadges.length === 0 && <p className="text-xs text-gray-500">{toPersianDigits("هنوز نشانی برای نمایش وجود ندارد.")}</p>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {allBadges.map(badge => {
          const isEarned = earnedBadgeIds.has(badge.id);
          const iconElement = badge.icon ? React.cloneElement(badge.icon, { className: `w-8 h-8 ${isEarned ? 'text-yellow-500' : 'text-gray-400'}` }) : <GiftIcon className={`w-8 h-8 ${isEarned ? 'text-yellow-500' : 'text-gray-400'}`} />;
          
          return (
            <div 
              key={badge.id} 
              title={toPersianDigits(isEarned ? badge.description : (badge.criteria || badge.description))}
              className={`p-2 rounded-md border text-center transition-all duration-200 ${isEarned ? 'bg-yellow-50 border-yellow-300 shadow-sm' : 'bg-gray-100 border-gray-200 opacity-60'}`}
            >
              <div className={`mx-auto mb-1 p-1 rounded-full inline-block ${isEarned ? 'bg-yellow-100' : 'bg-gray-200'}`}>
                {iconElement}
              </div>
              <p className={`text-[10px] font-medium ${isEarned ? 'text-yellow-700' : 'text-gray-500'}`}>
                {toPersianDigits(badge.name)}
              </p>
              {!isEarned && (
                <LockClosedIcon className="w-3 h-3 text-gray-400 mx-auto mt-0.5" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PrivacyBadgesShowcase;
