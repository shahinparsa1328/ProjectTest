import React from 'react';
import { toPersianDigits } from '../../../../utils'; // Corrected path
import { MealPlanEntry, Recipe } from '../../../../types/familyTypes'; // Corrected path
import { PlusIcon, SparklesIconNav, ListIcon as ShoppingListIcon } from '../../../shared/AppIcons'; // Corrected path

interface WeeklyMealCalendarProps {
  currentDate: Date; // A date within the week to display
  mealPlanEntries: MealPlanEntry[];
  recipes: Recipe[];
  onAssignRecipe: (date: string, slot: MealPlanEntry['slot']) => void;
  onGenerateAIMealPlan: () => void;
  onGenerateShoppingList: () => void;
  onViewRecipe: (recipe: Recipe) => void;
}

const mealSlots: MealPlanEntry['slot'][] = ['صبحانه', 'ناهار', 'شام'];
const weekDayNamesPersian = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'];

const WeeklyMealCalendar: React.FC<WeeklyMealCalendarProps> = ({
  currentDate,
  mealPlanEntries,
  recipes,
  onAssignRecipe,
  onGenerateAIMealPlan,
  onGenerateShoppingList,
  onViewRecipe,
}) => {
  const getWeekDays = (current: Date): Date[] => {
    const days: Date[] = [];
    const todayJsDay = current.getDay(); // 0 (Sun) - 6 (Sat)
    const startOfWeekOffset = (todayJsDay === 6) ? 0 : todayJsDay + 1;
    
    const firstDayOfWeek = new Date(current);
    firstDayOfWeek.setDate(current.getDate() - startOfWeekOffset);
    firstDayOfWeek.setHours(0,0,0,0);

    for (let i = 0; i < 7; i++) {
      const day = new Date(firstDayOfWeek);
      day.setDate(firstDayOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const weekDays = getWeekDays(currentDate);

  const getMealForSlot = (date: Date, slot: MealPlanEntry['slot']): MealPlanEntry | undefined => {
    const dateString = date.toISOString().split('T')[0];
    return mealPlanEntries.find(entry => entry.date === dateString && entry.slot === slot);
  };

  return (
    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-3 gap-2">
        <h3 className="text-md font-semibold text-gray-700">{toPersianDigits("برنامه غذایی هفتگی")}</h3>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={onGenerateAIMealPlan}
            className="flex items-center text-xs bg-yellow-400 hover:bg-yellow-500 text-gray-800 py-1.5 px-2.5 rounded-md transition-colors"
          >
            <SparklesIconNav className="w-3.5 h-3.5 ml-1 rtl:mr-1 rtl:ml-0"/> {toPersianDigits("تولید برنامه با AI")}
          </button>
          <button 
            onClick={onGenerateShoppingList}
            className="flex items-center text-xs bg-green-500 hover:bg-green-600 text-white py-1.5 px-2.5 rounded-md transition-colors"
          >
            <ShoppingListIcon className="w-3.5 h-3.5 ml-1 rtl:mr-1 rtl:ml-0"/> {toPersianDigits("ایجاد لیست خرید")}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-thin">
        <table className="min-w-full border-collapse border border-gray-200 text-xs">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-1.5 border border-gray-200 font-medium text-gray-600">{toPersianDigits("وعده")}</th>
              {weekDayNamesPersian.map(dayName => (
                <th key={dayName} className="p-1.5 border border-gray-200 font-medium text-gray-600 min-w-[80px]">
                  {toPersianDigits(dayName)} <br/>
                  <span className="text-[10px] text-gray-500">{toPersianDigits(weekDays[weekDayNamesPersian.indexOf(dayName)].getDate().toString())}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mealSlots.map(slot => (
              <tr key={slot}>
                <td className="p-1.5 border border-gray-200 font-medium text-gray-700 text-center">{toPersianDigits(slot)}</td>
                {weekDays.map(dayInWeek => {
                  const mealEntry = getMealForSlot(dayInWeek, slot);
                  const recipe = mealEntry?.recipeId ? recipes.find(r => r.id === mealEntry.recipeId) : null;
                  return (
                    <td 
                      key={dayInWeek.toISOString() + slot} 
                      className="p-1.5 border border-gray-200 h-20 align-top hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => onAssignRecipe(dayInWeek.toISOString().split('T')[0], slot)}
                    >
                      {recipe ? (
                        <div 
                          className="bg-blue-100 border border-blue-200 p-1 rounded-md text-blue-700 text-[10px] hover:bg-blue-200"
                          onClick={(e) => { e.stopPropagation(); onViewRecipe(recipe); }}
                        >
                          <p className="font-medium truncate" title={toPersianDigits(recipe.name)}>{toPersianDigits(recipe.name)}</p>
                          {recipe.category && <p className="text-[9px] opacity-80 truncate">{toPersianDigits(recipe.category)}</p>}
                        </div>
                      ) : mealEntry?.customMealText ? (
                        <p className="text-gray-600 text-[10px]">{toPersianDigits(mealEntry.customMealText)}</p>
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                          <PlusIcon className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeeklyMealCalendar;