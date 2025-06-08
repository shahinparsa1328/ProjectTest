import React, { useState, useEffect } from 'react';
import { toPersianDigits } from '../../../utils';
import { FamilyMember } from '../../../types/familyTypes'; // Corrected import path
import { XMarkIcon, UserCircleIcon as AvatarIcon, PlusIcon } from '../../shared/AppIcons';

interface AddFamilyMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (memberData: Omit<FamilyMember, 'id'> | FamilyMember) => void;
  initialData?: FamilyMember | null;
}

const roles = [
  { value: "", label: "انتخاب کنید..." },
  { value: "والد", label: "والد" },
  { value: "فرزند", label: "فرزند" },
  { value: "همسر", label: "همسر" },
  { value: "مراقب", label: "مراقب" },
  { value: "سالمند تحت مراقبت", label: "سالمند تحت مراقبت" },
  { value: "دیگر", label: "دیگر" },
];

const AddFamilyMemberModal: React.FC<AddFamilyMemberModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [dob, setDob] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [role, setRole] = useState<FamilyMember['role']>('');
  const [foodPreferences, setFoodPreferences] = useState('');
  const [medicalRestrictions, setMedicalRestrictions] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setRelationship(initialData.relationship);
      setDob(initialData.dob);
      setAvatarUrl(initialData.avatarUrl || '');
      setRole(initialData.role || '');
      setFoodPreferences(initialData.foodPreferences || '');
      setMedicalRestrictions(initialData.medicalRestrictions || '');
    } else {
      // Reset for new member
      setName('');
      setRelationship('');
      setDob('');
      setAvatarUrl('');
      setRole('');
      setFoodPreferences('');
      setMedicalRestrictions('');
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert(toPersianDigits("نام عضو خانواده الزامی است."));
      return;
    }
    const memberDataToSave = {
      name,
      relationship,
      dob,
      avatarUrl: avatarUrl.trim() || undefined,
      role: role || undefined,
      foodPreferences: foodPreferences.trim() || undefined,
      medicalRestrictions: medicalRestrictions.trim() || undefined,
    };

    if (initialData && initialData.id) {
        onSave({ ...memberDataToSave, id: initialData.id });
    } else {
        onSave(memberDataToSave);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="full-screen-modal-overlay active" // Using global styles for full-screen modal
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-member-modal-title"
    >
      <div 
        className="full-screen-modal-content" // Using global styles
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200 flex-shrink-0">
          <h2 id="add-member-modal-title" className="text-xl sm:text-2xl font-semibold text-gray-700">
            {toPersianDigits(initialData ? "ویرایش عضو خانواده" : "افزودن عضو جدید به خانواده")}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="w-7 h-7" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 flex-grow overflow-y-auto modal-scroll-content !px-1 sm:!px-2 text-sm">
          <div>
            <label htmlFor="memberName" className="block text-xs font-medium text-gray-700 mb-0.5">{toPersianDigits("نام*:")}</label>
            <input type="text" id="memberName" value={name} onChange={e => setName(e.target.value)} required 
                   className="w-full p-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
          </div>
          <div>
            <label htmlFor="memberRelationship" className="block text-xs font-medium text-gray-700 mb-0.5">{toPersianDigits("رابطه (مثال: همسر، فرزند ارشد):")}</label>
            <input type="text" id="memberRelationship" value={relationship} onChange={e => setRelationship(e.target.value)}
                   className="w-full p-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
          </div>
          <div>
            <label htmlFor="memberDob" className="block text-xs font-medium text-gray-700 mb-0.5">{toPersianDigits("تاریخ تولد:")}</label>
            <input type="date" id="memberDob" value={dob} onChange={e => setDob(e.target.value)} 
                   className="w-full p-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
          </div>
          <div>
            <label htmlFor="memberAvatarUrl" className="block text-xs font-medium text-gray-700 mb-0.5">{toPersianDigits("لینک آواتار (اختیاری):")}</label>
            <input type="url" id="memberAvatarUrl" value={avatarUrl} onChange={e => setAvatarUrl(e.target.value)} 
                   className="w-full p-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 ltr text-left" 
                   placeholder="https://example.com/avatar.png" />
          </div>
          <div>
            <label htmlFor="memberRole" className="block text-xs font-medium text-gray-700 mb-0.5">{toPersianDigits("نقش (اختیاری):")}</label>
            <select id="memberRole" value={role} onChange={e => setRole(e.target.value as FamilyMember['role'])}
                    className="w-full p-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white">
              {roles.map(r => <option key={r.value} value={r.value}>{toPersianDigits(r.label)}</option>)}
            </select>
          </div>
           <div>
            <label htmlFor="foodPreferences" className="block text-xs font-medium text-gray-700 mb-0.5">{toPersianDigits("ترجیحات غذایی (اختیاری):")}</label>
            <input type="text" id="foodPreferences" value={foodPreferences} onChange={e => setFoodPreferences(e.target.value)} 
                   className="w-full p-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                   placeholder={toPersianDigits("مثال: گیاهخوار، حساس به لاکتوز")}/>
          </div>
          <div>
            <label htmlFor="medicalRestrictions" className="block text-xs font-medium text-gray-700 mb-0.5">{toPersianDigits("محدودیت‌های پزشکی (اختیاری):")}</label>
            <input type="text" id="medicalRestrictions" value={medicalRestrictions} onChange={e => setMedicalRestrictions(e.target.value)}
                   className="w-full p-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" 
                   placeholder={toPersianDigits("مثال: آلرژی به بادام‌زمینی، دیابت")}/>
          </div>
          
          <div className="flex justify-end space-x-3 space-x-reverse pt-4 border-t border-gray-200 sticky bottom-0 bg-white pb-1 -mb-5 z-10">
            <button type="button" onClick={onClose} className="px-5 py-2 text-xs font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors">
              {toPersianDigits("انصراف")}
            </button>
            <button type="submit" className="px-6 py-2 text-xs font-medium text-white bg-rose-500 hover:bg-rose-600 rounded-lg transition-colors flex items-center">
               <PlusIcon className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0"/> {toPersianDigits(initialData ? "ذخیره تغییرات" : "افزودن عضو")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFamilyMemberModal;