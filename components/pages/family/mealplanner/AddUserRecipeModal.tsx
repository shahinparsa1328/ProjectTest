import React, { useState, useEffect } from 'react';
import { toPersianDigits } from '../../../../utils'; // Corrected path
import { Recipe } from '../../../../types/familyTypes'; // Corrected path
import { XMarkIcon, PlusIcon, BookIcon } from '../../../shared/AppIcons'; // Corrected path

interface AddUserRecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (recipeData: Omit<Recipe, 'id' | 'userSaved'>) => void;
  initialData?: Recipe | null; // For editing later if needed
}

const AddUserRecipeModal: React.FC<AddUserRecipeModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState(''); // Textarea, one ingredient per line
  const [instructions, setInstructions] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [servings, setServings] = useState('');
  const [category, setCategory] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');

  useEffect(() => {
    if (initialData && isOpen) {
      setName(initialData.name);
      setDescription(initialData.description || '');
      setIngredients(initialData.ingredients.map(ing => `${ing.name}: ${ing.quantity}`).join('\n'));
      setInstructions(initialData.instructions);
      setPrepTime(initialData.prepTime || '');
      setCookTime(initialData.cookTime || '');
      setServings(initialData.servings?.toString() || '');
      setCategory(initialData.category || '');
      setCuisine(initialData.cuisine || '');
      setImageUrl(initialData.imageUrl || '');
      setSourceUrl(initialData.sourceUrl || '');
    } else if (!initialData && isOpen) {
      // Reset for new recipe
      setName(''); setDescription(''); setIngredients(''); setInstructions('');
      setPrepTime(''); setCookTime(''); setServings(''); setCategory('');
      setCuisine(''); setImageUrl(''); setSourceUrl('');
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !ingredients.trim() || !instructions.trim()) {
      alert(toPersianDigits("نام، مواد لازم و دستور پخت الزامی هستند."));
      return;
    }
    const ingredientsArray = ingredients.split('\n')
      .map(line => {
        const parts = line.split(':');
        return { 
          name: (parts[0] || '').trim(), 
          quantity: (parts[1] || '').trim() 
        };
      })
      .filter(ing => ing.name);

    onSave({
      name, description, ingredients: ingredientsArray, instructions,
      prepTime, cookTime, 
      servings: servings ? parseInt(servings) : undefined, 
      category, cuisine, imageUrl, sourceUrl,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="full-screen-modal-overlay active" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="add-recipe-modal-title">
      <div className="full-screen-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-200 flex-shrink-0">
          <h2 id="add-recipe-modal-title" className="text-lg font-semibold text-gray-700 flex items-center">
            <BookIcon className="w-5 h-5 text-green-500 mr-2 rtl:ml-2 rtl:mr-0"/>
            {toPersianDigits(initialData ? "ویرایش دستور پخت" : "افزودن دستور پخت جدید")}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700"><XMarkIcon className="w-6 h-6" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 flex-grow overflow-y-auto modal-scroll-content !px-1 sm:!px-2 text-sm">
          <div>
            <label htmlFor="recipeName" className="block text-xs font-medium text-gray-700 mb-0.5">{toPersianDigits("نام دستور پخت*:")}</label>
            <input type="text" id="recipeName" value={name} onChange={e => setName(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div>
            <label htmlFor="recipeDescription" className="block text-xs font-medium text-gray-700 mb-0.5">{toPersianDigits("توضیحات:")}</label>
            <textarea id="recipeDescription" value={description} onChange={e => setDescription(e.target.value)} rows={2} className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 resize-y"/>
          </div>
          <div>
            <label htmlFor="recipeIngredients" className="block text-xs font-medium text-gray-700 mb-0.5">{toPersianDigits("مواد لازم* (هر مورد در یک خط، مثال: آرد: ۲ پیمانه):")}</label>
            <textarea id="recipeIngredients" value={ingredients} onChange={e => setIngredients(e.target.value)} required rows={4} className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 resize-y"/>
          </div>
          <div>
            <label htmlFor="recipeInstructions" className="block text-xs font-medium text-gray-700 mb-0.5">{toPersianDigits("دستور پخت*:")}</label>
            <textarea id="recipeInstructions" value={instructions} onChange={e => setInstructions(e.target.value)} required rows={5} className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 resize-y"/>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><label htmlFor="recipePrepTime" className="block text-xs font-medium text-gray-700 mb-0.5">{toPersianDigits("زمان آماده‌سازی:")}</label><input type="text" id="recipePrepTime" value={prepTime} onChange={e => setPrepTime(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder={toPersianDigits("مثال: ۱۵ دقیقه")}/></div>
            <div><label htmlFor="recipeCookTime" className="block text-xs font-medium text-gray-700 mb-0.5">{toPersianDigits("زمان پخت:")}</label><input type="text" id="recipeCookTime" value={cookTime} onChange={e => setCookTime(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder={toPersianDigits("مثال: ۳۰ دقیقه")}/></div>
            <div><label htmlFor="recipeServings" className="block text-xs font-medium text-gray-700 mb-0.5">{toPersianDigits("تعداد نفرات:")}</label><input type="number" id="recipeServings" value={servings} onChange={e => setServings(e.target.value)} min="1" className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="4"/></div>
            <div><label htmlFor="recipeCategory" className="block text-xs font-medium text-gray-700 mb-0.5">{toPersianDigits("دسته (مثال: شام، دسر):")}</label><input type="text" id="recipeCategory" value={category} onChange={e => setCategory(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" /></div>
            <div><label htmlFor="recipeCuisine" className="block text-xs font-medium text-gray-700 mb-0.5">{toPersianDigits("نوع غذا (مثال: ایرانی):")}</label><input type="text" id="recipeCuisine" value={cuisine} onChange={e => setCuisine(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" /></div>
          </div>
          <div><label htmlFor="recipeImageUrl" className="block text-xs font-medium text-gray-700 mb-0.5">{toPersianDigits("لینک تصویر غذا (اختیاری):")}</label><input type="url" id="recipeImageUrl" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 ltr text-left" placeholder="https://example.com/image.jpg"/></div>
          <div><label htmlFor="recipeSourceUrl" className="block text-xs font-medium text-gray-700 mb-0.5">{toPersianDigits("لینک منبع دستور پخت (اختیاری):")}</label><input type="url" id="recipeSourceUrl" value={sourceUrl} onChange={e => setSourceUrl(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 ltr text-left" placeholder="https://example.com/recipe-source"/></div>

          <div className="flex justify-end space-x-2 space-x-reverse pt-3 border-t border-gray-200 sticky bottom-0 bg-white pb-1 -mb-5 z-10">
            <button type="button" onClick={onClose} className="py-2 px-4 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md text-xs">{toPersianDigits("انصراف")}</button>
            <button type="submit" className="py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-md text-xs flex items-center">
              <PlusIcon className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0"/> {toPersianDigits(initialData ? "ذخیره تغییرات" : "افزودن دستور پخت")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserRecipeModal;