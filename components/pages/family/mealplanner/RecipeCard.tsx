import React from 'react';
import { toPersianDigits } from '../../../../utils'; 
import { Recipe } from '../../../../types/familyTypes'; 
import { BookIcon, PencilIcon, TrashIcon } from '../../../shared/AppIcons'; 

interface RecipeCardProps {
  recipe: Recipe;
  onViewDetail: () => void;
  onEditRecipe?: (recipe: Recipe) => void; // Optional
  onDeleteRecipe?: (recipeId: string) => void; // Optional
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onViewDetail, onEditRecipe, onDeleteRecipe }) => {
  return (
    <div
      className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all text-center w-full h-full flex flex-col items-center justify-between"
    >
      <button onClick={onViewDetail} className="w-full flex flex-col items-center flex-grow focus:outline-none">
        {recipe.imageUrl ? (
          <img src={recipe.imageUrl} alt={toPersianDigits(recipe.name)} className="w-full h-20 object-cover rounded-md mb-1.5" />
        ) : (
          <div className="w-full h-20 bg-gray-100 rounded-md mb-1.5 flex items-center justify-center">
            <BookIcon className="w-8 h-8 text-gray-400" />
          </div>
        )}
        <h4 className="text-xs font-medium text-gray-700 truncate w-full" title={toPersianDigits(recipe.name)}>
          {toPersianDigits(recipe.name)}
        </h4>
        {recipe.category && <p className="text-[10px] text-gray-500 mt-0.5 truncate">{toPersianDigits(recipe.category)}</p>}
      </button>
      
      {(onEditRecipe || onDeleteRecipe) && (
        <div className="mt-1.5 pt-1 border-t border-gray-100 w-full flex justify-center space-x-1 space-x-reverse">
          {onEditRecipe && (
            <button onClick={(e) => { e.stopPropagation(); onEditRecipe(recipe); }} className="p-1 text-yellow-500 hover:bg-yellow-100 rounded-full" aria-label={toPersianDigits("ویرایش")}>
              <PencilIcon className="w-3 h-3" />
            </button>
          )}
          {onDeleteRecipe && (
            <button onClick={(e) => { e.stopPropagation(); onDeleteRecipe(recipe.id); }} className="p-1 text-red-500 hover:bg-red-100 rounded-full" aria-label={toPersianDigits("حذف")}>
              <TrashIcon className="w-3 h-3" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default RecipeCard;