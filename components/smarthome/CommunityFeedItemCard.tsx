
import React from 'react';
import { toPersianDigits } from '../../utils';
import { CommunityFeedItem, CommunityFeedItemType } from '../../types/smartHomeTypes';
import { CogIcon, LightBulbOutlineIcon, MegaphoneIcon, UserCircleIcon } from '../shared/AppIcons';

interface CommunityFeedItemCardProps {
  item: CommunityFeedItem;
}

const getItemTypeIcon = (type: CommunityFeedItemType): React.ReactNode => {
  const iconProps = { className: "w-5 h-5" };
  switch (type) {
    case 'روتین اتوماسیون':
      return <CogIcon {...iconProps} />;
    case 'نکته صرفه‌جویی در انرژی':
      return <LightBulbOutlineIcon {...iconProps} />;
    case 'ایده خانه هوشمند':
      return <MegaphoneIcon {...iconProps} />;
    default:
      return <MegaphoneIcon {...iconProps} />;
  }
};

const CommunityFeedItemCard: React.FC<CommunityFeedItemCardProps> = ({ item }) => {
  const itemTypeColorClasses: Record<CommunityFeedItemType, string> = {
    'روتین اتوماسیون': 'text-purple-600 bg-purple-100 border-purple-300',
    'نکته صرفه‌جویی در انرژی': 'text-green-600 bg-green-100 border-green-300',
    'ایده خانه هوشمند': 'text-sky-600 bg-sky-100 border-sky-300',
  };
  
  const currentTypeStyle = itemTypeColorClasses[item.type] || 'text-gray-600 bg-gray-100 border-gray-300';
  const icon = getItemTypeIcon(item.type);

  return (
    <div className={`p-4 bg-white rounded-lg shadow-sm border ${currentTypeStyle.replace(/bg-\w+-100/, '').replace(/text-\w+-600/, '')} hover:shadow-md transition-shadow`}>
      <div className="flex items-center mb-2">
        <div className={`p-1.5 rounded-full mr-2 rtl:ml-2 rtl:mr-0 ${currentTypeStyle.split(' ')[1]} ${currentTypeStyle.split(' ')[0]}`}>
          {icon}
        </div>
        <div>
            <h3 className="text-sm font-semibold text-gray-800">{toPersianDigits(item.title)}</h3>
            <p className={`text-xs font-medium ${currentTypeStyle.split(' ')[0]}`}>{toPersianDigits(item.type)}</p>
        </div>
      </div>
      
      <p className="text-xs text-gray-600 mb-2 leading-relaxed line-clamp-3">{toPersianDigits(item.content)}</p>
      
      <div className="flex justify-between items-center text-[10px] text-gray-500 mt-2 pt-2 border-t border-gray-200">
        <span className="flex items-center">
          <UserCircleIcon className="w-3 h-3 text-gray-400 mr-1 rtl:ml-1 rtl:mr-0" />
          {item.isAnonymous ? toPersianDigits("کاربر ناشناس") : toPersianDigits(item.authorName || "کاربر انجمن")}
        </span>
        <span>{toPersianDigits(new Date(item.timestamp).toLocaleDateString('fa-IR'))}</span>
      </div>
      {/* Placeholder for upvotes/comments */}
      {/* <div className="mt-2 flex items-center space-x-2 text-xs"> ... </div> */}
    </div>
  );
};

export default CommunityFeedItemCard;