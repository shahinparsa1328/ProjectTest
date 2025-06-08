import React from 'react';
import { toPersianDigits } from '../../../utils';
import { FamilyMember } from '../../../types/familyTypes'; // Corrected import path
import { UserCircleIcon as DefaultAvatarIcon, PencilIcon, TrashIcon } from '../../shared/AppIcons';

interface FamilyMemberCardProps {
  member: FamilyMember;
  onEdit: () => void;
  onDelete: () => void;
}

const FamilyMemberCard: React.FC<FamilyMemberCardProps> = ({ member, onEdit, onDelete }) => {
  const calculateAge = (dob: string): number | null => {
    if (!dob) return null;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const age = calculateAge(member.dob);

  const roleDisplay = member.role ? toPersianDigits(member.role) : toPersianDigits('نامشخص');

  return (
    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-150 flex flex-col text-center items-center">
      {member.avatarUrl ? (
        <img src={member.avatarUrl} alt={toPersianDigits(member.name)} className="w-16 h-16 rounded-full object-cover mb-2 border-2 border-rose-200" />
      ) : (
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-2 border-2 border-gray-300">
          <DefaultAvatarIcon className="w-10 h-10 text-gray-400" />
        </div>
      )}
      <h4 className="text-sm font-semibold text-gray-800">{toPersianDigits(member.name)}</h4>
      <p className="text-xs text-gray-600">{toPersianDigits(member.relationship)}</p>
      {age !== null && <p className="text-xs text-gray-500">{toPersianDigits(`${age} ساله`)}</p>}
      {member.role && <p className="text-xs text-rose-600 bg-rose-100 px-1.5 py-0.5 rounded-full mt-1">{roleDisplay}</p>}
      
      <div className="mt-3 pt-2 border-t border-gray-100 w-full flex justify-center space-x-2 space-x-reverse">
        <button onClick={onEdit} className="p-1.5 text-yellow-500 hover:bg-yellow-100 rounded-full" aria-label={toPersianDigits("ویرایش")}>
          <PencilIcon className="w-4 h-4" />
        </button>
        <button onClick={onDelete} className="p-1.5 text-red-500 hover:bg-red-100 rounded-full" aria-label={toPersianDigits("حذف")}>
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default FamilyMemberCard;