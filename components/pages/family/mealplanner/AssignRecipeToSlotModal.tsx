import React, { useState } from 'react';
import { toPersianDigits } from '../../../../utils'; // Corrected path
import { Recipe, MealPlanSlot } from '../../../../types/familyTypes'; // Corrected path
import { XMarkIcon, CheckCircleIcon, TrashIcon } from '../../../shared/AppIcons'; // Corrected path

interface AssignRecipeToSlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipes: Recipe[];
  onAssignRecipe: (recipeId: string | null) => void; // Pass null to clear
  targetDate: string; // YYYY-MM-DD
  targetSlot: MealPlanSlot;
}

const AssignRecipeToSlotModal: React.FC<AssignRecipeToSlotModalProps> = ({
  isOpen,
  onClose,
  recipes,
  onAssignRecipe,
  targetDate,
  targetSlot,
}) => {
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecipes = recipes.filter(recipe => 
    toPersianDigits(recipe.name.toLowerCase()).includes(toPersianDigits(searchTerm.toLowerCase())) ||
    (recipe.category && toPersianDigits(recipe.category.toLowerCase()).includes(toPersianDigits(searchTerm.toLowerCase()))) ||
    (recipe.cuisine && toPersianDigits(recipe.cuisine.toLowerCase()).includes(toPersianDigits(searchTerm.toLowerCase())))
  );

  const handleSubmit = () => {
    onAssignRecipe(selectedRecipeId || null); // Pass null if no recipe selected (effectively clearing)
    onClose();
  };
  
  const handleClearSlot = () => {
    onAssignRecipe(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[1000] p-4" onClick={onClose} role="dialog">
      <div className="bg-white p-5 rounded-xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-md font-semibold text-gray-700">
            {toPersianDigits(`انتخاب غذا برای ${targetSlot} - ${new Date(targetDate).toLocaleDateString('fa-IR')}`)}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700"><XMarkIcon className="w-6 h-6" /></button>
        </div>

        <div className="mb-3 flex-shrink-0">
          <input 
            type="text" 
            placeholder={toPersianDigits("جستجوی دستور پخت...")}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-xs focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <ul className="space-y-1.5 flex-grow overflow-y-auto pr-1 mb-3 scrollbar-thin text-xs">
          {filteredRecipes.length === 0 && <p className="text-gray-500 text-center py-2">{toPersianDigits("دستور پختی یافت نشد.")}</p>}
          {filteredRecipes.map(recipe => (
            <li key={recipe.id}>
              <button
                onClick={() => setSelectedRecipeId(recipe.id === selectedRecipeId ? '' : recipe.id)}
                className={`w-full text-right p-2 rounded-md border transition-colors ${
                  selectedRecipeId === recipe.id 
                    ? 'bg-indigo-500 text-white border-indigo-600' 
                    : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700'
                }`}
              >
                {toPersianDigits(recipe.name)}
                {recipe.category && <span className="text-[10px] opacity-80 mr-1 rtl:ml-1 rtl:mr-0">({toPersianDigits(recipe.category)})</span>}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 sm:space-x-reverse pt-3 border-t border-gray-100 flex-shrink-0 text-xs">
          <button 
            type="button" 
            onClick={handleClearSlot} 
            className="py-2 px-3 bg-red-500 hover:bg-red-600 text-white rounded-md flex items-center justify-center"
          >
             <TrashIcon className="w-3.5 h-3.5 ml-1 rtl:mr-1 rtl:ml-0"/> {toPersianDigits("پاک کردن این وعده")}
          </button>
          <button 
            type="button" 
            onClick={handleSubmit} 
            disabled={!selectedRecipeId}
            className="py-2 px-3 bg-green-500 hover:bg-green-600 text-white rounded-md disabled:opacity-50 flex items-center justify-center"
          >
            <CheckCircleIcon className="w-3.5 h-3.5 ml-1 rtl:mr-1 rtl:ml-0"/> {toPersianDigits("تایید انتخاب")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignRecipeToSlotModal;