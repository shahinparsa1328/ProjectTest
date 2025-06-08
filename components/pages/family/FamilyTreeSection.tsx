
import React, { useState } from 'react';
import { toPersianDigits } from '../../../utils';
import { FamilyTreeNode } from '../../../types/familyTypes';
import { UserGroupIcon, PlusIcon } from '../../shared/AppIcons'; // Using UserGroupIcon for tree concept
import FamilyTreeNodeCard from './familytree/FamilyTreeNodeCard';

interface FamilyTreeSectionProps {
  themeClasses: {
    primaryAccentClass: string;
    secondaryAccentClass: string;
    buttonBgClass: string;
    buttonHoverBgClass: string;
  };
  // In a real app, nodes would come from props or fetched state
}

const FamilyTreeSection: React.FC<FamilyTreeSectionProps> = ({ themeClasses }) => {
  // Mock data for placeholder
  const [familyTreeNodes, setFamilyTreeNodes] = useState<FamilyTreeNode[]>([
    { id: 'node1', name: 'پدربزرگ (پدری)', relationshipToRoot: 'پدربزرگ', birthDate: '1310-01-01', story: 'مردی زحمتکش و مهربان.' },
    { id: 'node2', name: 'مادربزرگ (پدری)', relationshipToRoot: 'مادربزرگ', birthDate: '1315-05-10', story: 'آشپزی بی‌نظیر داشت.' },
    { id: 'node3', name: 'پدر', relationshipToRoot: 'پدر', birthDate: '1340-08-15' },
    { id: 'node4', name: 'مادر', relationshipToRoot: 'مادر', birthDate: '1345-02-20' },
  ]);

  const handleManageTree = () => {
    alert(toPersianDigits("قابلیت مدیریت درخت خانواده (افزودن/ویرایش اعضا) به زودی اضافه خواهد شد."));
  };

  return (
    <div className={`p-3 rounded-lg border ${themeClasses.secondaryAccentClass} bg-white`}>
      <div className="flex justify-between items-center mb-3">
        <h4 className={`text-sm font-semibold ${themeClasses.primaryAccentClass} flex items-center`}>
          <UserGroupIcon className={`w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 ${themeClasses.primaryAccentClass}`} />
          {toPersianDigits("درخت زندگی تعاملی خانواده (نمایشی)")}
        </h4>
        <button
          onClick={handleManageTree}
          className={`flex items-center text-xs py-1 px-2.5 rounded-md text-white ${themeClasses.buttonBgClass} ${themeClasses.buttonHoverBgClass}`}
        >
          <PlusIcon className="w-3.5 h-3.5 mr-1 rtl:ml-1 rtl:mr-0" /> {toPersianDigits("مدیریت درخت")}
        </button>
      </div>
      <p className="text-xs text-gray-500 mb-2">
        {toPersianDigits("در اینجا می‌توانید شجره‌نامه خانواده خود را بسازید، داستان‌ها و خاطرات مربوط به هر عضو را اضافه کنید. نسخه فعلی یک نمایش ساده است.")}
      </p>
      
      {/* Placeholder for visual tree rendering */}
      <div className="my-3 h-32 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-xs border border-gray-200">
        {toPersianDigits("[تجسم بصری درخت خانواده در اینجا قرار خواهد گرفت]')}
      </div>

      {familyTreeNodes.length > 0 && (
        <>
          <h5 className="text-xs font-medium text-gray-600 mt-3 mb-1.5">{toPersianDigits("اعضای نمونه:")}</h5>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {familyTreeNodes.map(node => (
              <FamilyTreeNodeCard key={node.id} node={node} themeClasses={themeClasses} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FamilyTreeSection;
