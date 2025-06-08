import React, { useState, useEffect } from 'react';
import { toPersianDigits } from '../../../utils';
import { DevelopmentMilestone, MilestoneType, FamilyMember, milestoneTypesList } from '../../../types/familyTypes';
import { XMarkIcon, PlusIcon, AcademicCapIcon } from '../../shared/AppIcons';

interface AddMilestoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (milestoneData: Omit<DevelopmentMilestone, 'id'> | DevelopmentMilestone) => void;
  initialData?: DevelopmentMilestone | null;
  familyMembers: FamilyMember[]; // To select the child
}

const AddMilestoneModal: React.FC<AddMilestoneModalProps> = ({ isOpen, onClose, onSave, initialData, familyMembers }) => {
  const [childMemberId, setChildMemberId] = useState('');
  const [type, setType] = useState<MilestoneType>(milestoneTypesList[0]);
  const [date, setDate] = useState('');
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');

  const children = familyMembers.filter(m => m.role === 'فرزند' || !m.role); // Prioritize children, or allow any if no role

  useEffect(() => {
    if (initialData) {
      setChildMemberId(initialData.childMemberId);
      setType(initialData.type);
      setDate(initialData.date);
      setValue(initialData.value || '');
      setDescription(initialData.description || '');
      setNotes(initialData.notes || '');
    } else {
      // Reset for new milestone
      setChildMemberId(children.length === 1 ? children[0].id : ''); // Pre-select if only one child
      setType(milestoneTypesList[0]);
      setDate(new Date().toISOString().split('T')[0]);
      setValue('');
      setDescription('');
      setNotes('');
    }
  }, [initialData, isOpen, children]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!childMemberId || !type || !date) {
      alert(toPersianDigits("انتخاب فرزند، نوع نقطه عطف و تاریخ الزامی است."));
      return;
    }
    const milestoneDataToSave = {
      childMemberId,
      type,
      date,
      value: value.trim() || undefined,
      description: description.trim() || undefined,
      notes: notes.trim() || undefined,
    };

    if (initialData && initialData.id) {
        onSave({ ...milestoneDataToSave, id: initialData.id });
    } else {
        onSave(milestoneDataToSave);
    }
  };

  const getValueInputPlaceholder = (): string => {
    switch (type) {
      case 'قد و وزن دوره‌ای':
        return toPersianDigits("مثال: قد ۷۰س‌م، وزن ۹ک‌گ");
      case 'اولین کلمات':
        return toPersianDigits("مثال: بابا، مامان، آب");
      default:
        return toPersianDigits("مقدار یا جزئیات (اختیاری)");
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="full-screen-modal-overlay active"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-milestone-modal-title"
    >
      <div 
        className="full-screen-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200 flex-shrink-0">
          <h2 id="add-milestone-modal-title" className="text-xl sm:text-2xl font-semibold text-gray-700 flex items-center">
            <AcademicCapIcon className="w-6 h-6 text-teal-500 mr-2 rtl:ml-2 rtl:mr-0"/>
            {toPersianDigits(initialData ? "ویرایش نقطه عطف رشد" : "ثبت نقطه عطف رشد جدید")}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="w-7 h-7" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 flex-grow overflow-y-auto modal-scroll-content !px-1 sm:!px-2">
          <div>
            <label htmlFor="childMemberId" className="block text-sm font-medium text-gray-700 mb-1">{toPersianDigits("فرزند*:")}</label>
            <select 
              id="childMemberId" 
              value={childMemberId} 
              onChange={e => setChildMemberId(e.target.value)} 
              required
              className="w-full p-2.5 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white text-sm"
            >
              <option value="">{toPersianDigits("انتخاب کنید...")}</option>
              {children.map(child => (
                <option key={child.id} value={child.id}>{toPersianDigits(child.name)}</option>
              ))}
            </select>
            {children.length === 0 && <p className="text-xs text-red-500 mt-1">{toPersianDigits("ابتدا یک عضو با نقش 'فرزند' اضافه کنید یا نقش یکی از اعضا را ویرایش کنید.")}</p>}
          </div>

          <div>
            <label htmlFor="milestoneType" className="block text-sm font-medium text-gray-700 mb-1">{toPersianDigits("نوع نقطه عطف*:")}</label>
            <select 
              id="milestoneType" 
              value={type} 
              onChange={e => setType(e.target.value as MilestoneType)} 
              required
              className="w-full p-2.5 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white text-sm"
            >
              {milestoneTypesList.map(mt => (
                <option key={mt} value={mt}>{toPersianDigits(mt)}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="milestoneDate" className="block text-sm font-medium text-gray-700 mb-1">{toPersianDigits("تاریخ*:")}</label>
            <input 
              type="date" 
              id="milestoneDate" 
              value={date} 
              onChange={e => setDate(e.target.value)} 
              required
              max={new Date().toISOString().split("T")[0]} // Cannot log future milestones
              className="w-full p-2.5 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm" 
            />
          </div>

          <div>
            <label htmlFor="milestoneValue" className="block text-sm font-medium text-gray-700 mb-1">{toPersianDigits("مقدار یا جزئیات:")}</label>
            <input 
              type="text" 
              id="milestoneValue" 
              value={value} 
              onChange={e => setValue(e.target.value)} 
              className="w-full p-2.5 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm" 
              placeholder={getValueInputPlaceholder()}
            />
          </div>
          
          <div>
            <label htmlFor="milestoneDescription" className="block text-sm font-medium text-gray-700 mb-1">{toPersianDigits("توضیحات بیشتر:")}</label>
            <textarea 
              id="milestoneDescription" 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              rows={2}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm resize-y"
              placeholder={toPersianDigits("جزئیات بیشتر در مورد این نقطه عطف...")}
            ></textarea>
          </div>

          <div>
            <label htmlFor="milestoneNotes" className="block text-sm font-medium text-gray-700 mb-1">{toPersianDigits("یادداشت‌های شخصی:")}</label>
            <textarea 
              id="milestoneNotes" 
              value={notes} 
              onChange={e => setNotes(e.target.value)} 
              rows={2}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm resize-y"
              placeholder={toPersianDigits("هرگونه یادداشت یا خاطره مرتبط...")}
            ></textarea>
          </div>
          
          <div className="flex justify-end space-x-3 space-x-reverse pt-4 border-t border-gray-200 sticky bottom-0 bg-white pb-1 -mb-5 z-10">
            <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors">
              {toPersianDigits("انصراف")}
            </button>
            <button type="submit" className="px-6 py-2.5 text-sm font-medium text-white bg-teal-500 hover:bg-teal-600 rounded-lg transition-colors flex items-center">
               <PlusIcon className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0"/> {toPersianDigits(initialData ? "ذخیره تغییرات" : "ثبت نقطه عطف")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMilestoneModal;