
import React from 'react';
import { toPersianDigits } from '../../../utils';
import { NutritionLog } from '../../../types/familyTypes';
import { HeartIcon as FoodIcon, PencilIcon, TrashIcon } from '../../shared/AppIcons';

interface NutritionLogCardProps {
  log: NutritionLog;
  childName: string;
  onEdit: () => void;
  onDelete: () => void;
}

const NutritionLogCard: React.FC<NutritionLogCardProps> = ({ log, childName, onEdit, onDelete }) => {
  const formattedDate = new Date(log.date).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-150">
      <div className="flex items-start justify-between mb-1.5">
        <div className="flex items-center">
          <div className="p-1.5 bg-green-100 rounded-full mr-2 rtl:ml-2 rtl:mr-0 text-green-600">
            <FoodIcon className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-800">{toPersianDigits(log.mealType)} - {formattedDate}</h4>
            <p className="text-xs text-gray-500">{toPersianDigits(`برای: ${childName}`)}</p>
          </div>
        </div>
        <div className="flex space-x-1 space-x-reverse">
            <button onClick={onEdit} className="p-1 text-yellow-500 hover:bg-yellow-100 rounded-full" aria-label={toPersianDigits("ویرایش")}><PencilIcon className="w-3.5 h-3.5" /></button>
            <button onClick={onDelete} className="p-1 text-red-500 hover:bg-red-100 rounded-full" aria-label={toPersianDigits("حذف")}><TrashIcon className="w-3.5 h-3.5" /></button>
        </div>
      </div>
      <div className="text-xs text-gray-600 space-y-0.5">
        <p><strong>{toPersianDigits("موارد مصرفی: ")}</strong>{toPersianDigits(log.foodItems)}</p>
        {log.portionSize && <p><strong>{toPersianDigits("میزان: ")}</strong>{toPersianDigits(log.portionSize)}</p>}
      </div>
      {log.notes && <p className="text-xs text-gray-500 italic bg-gray-50 p-1.5 rounded border border-gray-100 mt-1"><strong>{toPersianDigits("یادداشت: ")}</strong>{toPersianDigits(log.notes)}</p>}
    </div>
  );
};

export default NutritionLogCard;
