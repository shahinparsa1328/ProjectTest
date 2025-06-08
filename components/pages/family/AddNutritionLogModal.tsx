import React, { useState, useEffect } from 'react';
import { toPersianDigits } from '../../../utils';
import { NutritionLog, FamilyMember, MealType, mealTypesList } from '../../../types/familyTypes';
import { XMarkIcon, PlusIcon, HeartIcon as FoodIcon } from '../../shared/AppIcons'; // Using HeartIcon as placeholder for Food

interface AddNutritionLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (logData: Omit<NutritionLog, 'id'>) => void;
  familyMembers: FamilyMember[];
  initialData?: NutritionLog | null;
}

const AddNutritionLogModal: React.FC<AddNutritionLogModalProps> = ({ isOpen, onClose, onSave, familyMembers, initialData }) => {
  const [childMemberId, setChildMemberId] = useState('');
  const [date, setDate] = useState('');
  const [mealType, setMealType] = useState<MealType>(mealTypesList[0]);
  const [foodItems, setFoodItems] = useState('');
  const [portionSize, setPortionSize] = useState('');
  const [notes, setNotes] = useState('');

  const children = familyMembers.filter(m => m.role === 'فرزند' || !m.role);

  useEffect(() => {
    if (initialData) {
      setChildMemberId(initialData.childMemberId);
      setDate(initialData.date);
      setMealType(initialData.mealType);
      setFoodItems(initialData.foodItems);
      setPortionSize(initialData.portionSize || '');
      setNotes(initialData.notes || '');
    } else {
      setChildMemberId(children.length > 0 ? children[0].id : '');
      setDate(new Date().toISOString().split('T')[0]);
      setMealType(mealTypesList[0]);
      setFoodItems('');
      setPortionSize('');
      setNotes('');
    }
  }, [initialData, isOpen, children]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!childMemberId || !date || !mealType || !foodItems.trim()) {
      alert(toPersianDigits("انتخاب فرزند، تاریخ، نوع وعده و موارد غذایی الزامی است."));
      return;
    }
    onSave({ childMemberId, date, mealType, foodItems, portionSize, notes });
  };

  if (!isOpen) return null;

  return (
    <div className="full-screen-modal-overlay active" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="add-nutrition-log-modal-title">
      <div className="full-screen-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200 flex-shrink-0">
          <h2 id="add-nutrition-log-modal-title" className="text-xl sm:text-2xl font-semibold text-gray-700 flex items-center">
            <FoodIcon className="w-6 h-6 text-green-500 mr-2 rtl:ml-2 rtl:mr-0"/>
            {toPersianDigits(initialData ? "ویرایش گزارش تغذیه" : "ثبت گزارش تغذیه کودک")}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700"><XMarkIcon className="w-7 h-7" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 flex-grow overflow-y-auto modal-scroll-content !px-1 sm:!px-2">
          <div>
            <label htmlFor="nutLogChild" className="block text-sm font-medium text-gray-700 mb-1">{toPersianDigits("فرزند*:")}</label>
            <select id="nutLogChild" value={childMemberId} onChange={e => setChildMemberId(e.target.value)} required className="w-full p-2.5 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white text-sm">
              <option value="">{toPersianDigits("انتخاب کنید...")}</option>
              {children.map(child => (<option key={child.id} value={child.id}>{toPersianDigits(child.name)}</option>))}
            </select>
          </div>
          <div>
            <label htmlFor="nutLogDate" className="block text-sm font-medium text-gray-700 mb-1">{toPersianDigits("تاریخ*:")}</label>
            <input type="date" id="nutLogDate" value={date} onChange={e => setDate(e.target.value)} required max={new Date().toISOString().split("T")[0]} className="w-full p-2.5 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm" />
          </div>
          <div>
            <label htmlFor="nutLogMealType" className="block text-sm font-medium text-gray-700 mb-1">{toPersianDigits("نوع وعده غذایی*:")}</label>
            <select id="nutLogMealType" value={mealType} onChange={e => setMealType(e.target.value as MealType)} required className="w-full p-2.5 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white text-sm">
              {mealTypesList.map(mt => (<option key={mt} value={mt}>{toPersianDigits(mt)}</option>))}
            </select>
          </div>
          <div>
            <label htmlFor="nutLogFoodItems" className="block text-sm font-medium text-gray-700 mb-1">{toPersianDigits("موارد غذایی مصرفی*:")}</label>
            <textarea id="nutLogFoodItems" value={foodItems} onChange={e => setFoodItems(e.target.value)} required rows={2} className="w-full p-2.5 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm resize-y" placeholder={toPersianDigits("مثال: شیر، موز، حریره بادام")}></textarea>
          </div>
          <div>
            <label htmlFor="nutLogPortionSize" className="block text-sm font-medium text-gray-700 mb-1">{toPersianDigits("میزان مصرف (اختیاری):")}</label>
            <input type="text" id="nutLogPortionSize" value={portionSize} onChange={e => setPortionSize(e.target.value)} className="w-full p-2.5 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm" placeholder={toPersianDigits("مثال: یک فنجان، نصف بشقاب")}/>
          </div>
          <div>
            <label htmlFor="nutLogNotes" className="block text-sm font-medium text-gray-700 mb-1">{toPersianDigits("یادداشت‌ها (اختیاری):")}</label>
            <textarea id="nutLogNotes" value={notes} onChange={e => setNotes(e.target.value)} rows={2} className="w-full p-2.5 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm resize-y" placeholder={toPersianDigits("مثال: با اشتها خورد، کمی از غذا را نخورد...")}></textarea>
          </div>
          <div className="flex justify-end space-x-3 space-x-reverse pt-4 border-t border-gray-200 sticky bottom-0 bg-white pb-1 -mb-5 z-10">
            <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors">
              {toPersianDigits("انصراف")}
            </button>
            <button type="submit" className="px-6 py-2.5 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-lg transition-colors flex items-center">
               <PlusIcon className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0"/> {toPersianDigits(initialData ? "ذخیره تغییرات" : "ثبت گزارش تغذیه")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNutritionLogModal;