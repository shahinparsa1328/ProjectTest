import React from 'react';
import { StudyGroup } from '../../types/learningTypes';
import { toPersianDigits } from '../../utils';
import { UserGroupIcon } from '../shared/AppIcons';

interface StudyGroupCardProps {
  group: StudyGroup;
}

const StudyGroupCard: React.FC<StudyGroupCardProps> = ({ group }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start gap-3">
        {group.thumbnailUrl ? (
          <img src={group.thumbnailUrl} alt={toPersianDigits(group.name)} className="w-16 h-16 rounded-md object-cover flex-shrink-0" />
        ) : (
          <div className="w-16 h-16 bg-indigo-100 rounded-md flex items-center justify-center flex-shrink-0">
            <UserGroupIcon className="w-8 h-8 text-indigo-500" />
          </div>
        )}
        <div className="flex-grow min-w-0">
          <h4 className="text-md font-semibold text-indigo-700 truncate" title={toPersianDigits(group.name)}>{toPersianDigits(group.name)}</h4>
          <p className="text-xs text-gray-600 mb-1 truncate" title={toPersianDigits(group.topic)}>{toPersianDigits(`موضوع: ${group.topic}`)}</p>
          {group.description && <p className="text-xs text-gray-500 mb-2 line-clamp-2">{toPersianDigits(group.description)}</p>}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{toPersianDigits(`${group.membersCount} عضو`)}</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${group.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
              {group.isActive ? toPersianDigits("فعال") : toPersianDigits("غیرفعال")}
            </span>
          </div>
        </div>
      </div>
      <button className="mt-3 w-full bg-indigo-500 hover:bg-indigo-600 text-white text-xs py-1.5 px-3 rounded-md transition-colors">
        {toPersianDigits("مشاهده گروه (به زودی)")}
      </button>
    </div>
  );
};

export default StudyGroupCard;