import React from 'react';
import { toPersianDigits } from '../../../../utils'; // Corrected path
import { Recipe } from '../../../../types/familyTypes'; // Corrected path
import { XMarkIcon, BookIcon, ListIcon, LinkIcon } from '../../../shared/AppIcons'; // Corrected path

interface RecipeDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: Recipe | null;
  onAddIngredientsToShoppingList?: (recipeId: string) => void;
}

const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({ isOpen, onClose, recipe, onAddIngredientsToShoppingList }) => {
  if (!isOpen || !recipe) return null;

  return (
    <div 
      className="full-screen-modal-overlay active"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="recipe-detail-modal-title"
    >
      <div 
        className="full-screen-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200 flex-shrink-0">
          <h2 id="recipe-detail-modal-title" className="text-lg font-semibold text-gray-700 flex items-center">
            <BookIcon className="w-5 h-5 text-indigo-500 mr-2 rtl:ml-2 rtl:mr-0"/>
            {toPersianDigits(recipe.name)}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-3 flex-grow overflow-y-auto modal-scroll-content !px-1 sm:!px-2 text-sm">
          {recipe.imageUrl && (
            <img src={recipe.imageUrl} alt={toPersianDigits(recipe.name)} className="w-full h-40 object-cover rounded-md mb-3" />
          )}
          {recipe.description && <p className="text-xs text-gray-600 mb-2 leading-relaxed">{toPersianDigits(recipe.description)}</p>}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-2">
            {recipe.prepTime && <p><strong className="text-gray-600">{toPersianDigits("زمان آماده‌سازی: ")}</strong>{toPersianDigits(recipe.prepTime)}</p>}
            {recipe.cookTime && <p><strong className="text-gray-600">{toPersianDigits("زمان پخت: ")}</strong>{toPersianDigits(recipe.cookTime)}</p>}
            {recipe.servings && <p><strong className="text-gray-600">{toPersianDigits("تعداد نفرات: ")}</strong>{toPersianDigits(recipe.servings.toString())}</p>}
            {recipe.category && <p><strong className="text-gray-600">{toPersianDigits("دسته: ")}</strong>{toPersianDigits(recipe.category)}</p>}
            {recipe.cuisine && <p><strong className="text-gray-600">{toPersianDigits("نوع غذا: ")}</strong>{toPersianDigits(recipe.cuisine)}</p>}
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-1">{toPersianDigits("مواد لازم:")}</h4>
            <ul className="list-disc list-inside space-y-0.5 text-xs text-gray-600 pr-4 rtl:mr-4 rtl:pr-0">
              {recipe.ingredients.map((ing, index) => (
                <li key={index}>{toPersianDigits(`${ing.name}: ${ing.quantity}`)}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-1">{toPersianDigits("دستور پخت:")}</h4>
            <p className="text-xs text-gray-600 whitespace-pre-wrap leading-relaxed">{toPersianDigits(recipe.instructions)}</p>
          </div>
          {recipe.sourceUrl && (
            <p className="text-xs text-gray-500 mt-2">
              {toPersianDigits("منبع: ")}
              <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline">
                {toPersianDigits("مشاهده دستور پخت اصلی")} <LinkIcon className="w-3 h-3 inline" />
              </a>
            </p>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 sm:space-x-reverse pt-4 border-t border-gray-200 sticky bottom-0 bg-white pb-1 -mb-5 z-10">
          {onAddIngredientsToShoppingList && (
             <button 
                onClick={() => onAddIngredientsToShoppingList(recipe.id)}
                className="w-full sm:w-auto text-xs bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-md flex items-center justify-center"
            >
                <ListIcon className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0"/> {toPersianDigits("افزودن مواد لازم به لیست خرید")}
            </button>
          )}
          <button type="button" onClick={onClose} className="w-full sm:w-auto py-2 px-4 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md text-xs">
            {toPersianDigits("بستن")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailModal;