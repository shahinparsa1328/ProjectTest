
import React from 'react';
import { toPersianDigits } from '../../../../utils';
import { FamilyTreeNode } from '../../../../types/familyTypes';
import { UserCircleIcon } from '../../../shared/AppIcons';

interface FamilyTreeNodeCardProps {
  node: FamilyTreeNode;
  themeClasses: { primaryAccentClass: string; secondaryAccentClass: string; }
}

const FamilyTreeNodeCard: React.FC<FamilyTreeNodeCardProps> = ({ node, themeClasses }) => {
  return (
    <div className={`p-3 rounded-lg shadow-sm border ${themeClasses.secondaryAccentClass} bg-white text-center`}>
      {node.avatarUrl ? (
        <img src={node.avatarUrl} alt={toPersianDigits(node.name)} className="w-12 h-12 rounded-full object-cover mx-auto mb-1.5 border-2 border-gray-200" />
      ) : (
        <UserCircleIcon className={`w-12 h-12 text-gray-400 mx-auto mb-1.5`} />
      )}
      <h5 className={`text-xs font-semibold ${themeClasses.primaryAccentClass}`}>{toPersianDigits(node.name)}</h5>
      {node.relationshipToRoot && <p className="text-[10px] text-gray-500">{toPersianDigits(node.relationshipToRoot)}</p>}
      {node.birthDate && <p className="text-[10px] text-gray-400">{toPersianDigits(`تولد: ${new Date(node.birthDate).toLocaleDateString('fa-IR')}`)}</p>}
      {node.story && <p className="text-[10px] text-gray-600 mt-1 italic line-clamp-2" title={toPersianDigits(node.story)}>{toPersianDigits(node.story)}</p>}
    </div>
  );
};

export default FamilyTreeNodeCard;
