
import React, { useState, useEffect, useCallback } from 'react';
import { toPersianDigits } from '../../utils';
import { XMarkIcon, WalletIcon, PlusIcon, TrashIcon, LightbulbIcon } from '../shared/AppIcons';
import { TransactionCategory } from '../pages/FinancePage';
import LoadingSpinner from '../shared/LoadingSpinner';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const AI_MODEL_NAME = 'gemini-2.5-flash-preview-04-17';

export interface BudgetSetting {
  categoryId: string;
  allocatedAmount: number;
  period: 'monthly';
}

interface AISuggestedBudgetItem {
    categoryName: string; // Name in Persian, e.g., "غذا و رستوران"
    suggestedAmount: number;
}
interface AISuggestedBudgetResponse {
    suggestedBudgets: AISuggestedBudgetItem[];
    rationale?: string;
}


interface BudgetSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveBudgets: (budgets: BudgetSetting[]) => void;
  categories: TransactionCategory[];
  currentBudgets: BudgetSetting[];
  totalMonthlyGoalContributions?: number; // Added for Phase 2
  ai?: GoogleGenAI | null; // Added for Phase 2
}

const BudgetSetupModal: React.FC<BudgetSetupModalProps> = ({ 
    isOpen, 
    onClose, 
    onSaveBudgets, 
    categories, 
    currentBudgets,
    totalMonthlyGoalContributions = 0, // Added for Phase 2
    ai // Added for Phase 2
}) => {
  const [localBudgets, setLocalBudgets] = useState<Record<string, string>>({});
  const [isFetchingAISuggestion, setIsFetchingAISuggestion] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<AISuggestedBudgetResponse | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const initialBudgets: Record<string, string> = {};
      currentBudgets.forEach(b => {
        initialBudgets[b.categoryId] = b.allocatedAmount.toString();
      });
      categories.filter(c => c.type === 'expense').forEach(cat => {
        if (!initialBudgets[cat.id]) {
          initialBudgets[cat.id] = '';
        }
      });
      setLocalBudgets(initialBudgets);
      setAiSuggestion(null); // Reset AI suggestion when modal opens
      setAiError(null);
    }
  }, [isOpen, currentBudgets, categories]);

  const handleAmountChange = (categoryId: string, amount: string) => {
    if (amount === '' || /^\d*\.?\d*$/.test(amount)) {
      setLocalBudgets(prev => ({ ...prev, [categoryId]: amount }));
    }
  };

  const fetchAISuggestedBudget = async () => {
    if (!ai) {
        setAiError(toPersianDigits("سرویس هوش مصنوعی در دسترس نیست."));
        return;
    }
    setIsFetchingAISuggestion(true);
    setAiError(null);
    setAiSuggestion(null);
    try {
        // For a real scenario, you'd pass actual income, past spending, and goals.
        // Here we simulate with a generic prompt.
        const keyExpenseCategories = categories.filter(c => c.type === 'expense').slice(0, 5).map(c => c.name).join(', ');
        const prompt = toPersianDigits(`با فرض درآمد ماهانه متوسط و هدف پس‌انداز ۲۰٪ از درآمد، یک بودجه پیشنهادی برای دسته‌بندی‌های کلیدی هزینه‌ها مانند (${keyExpenseCategories}) به زبان فارسی ارائه بده. پاسخ را به صورت JSON با کلید "suggestedBudgets" (آرایه‌ای از اشیاء با "categoryName" و "suggestedAmount") و یک "rationale" کوتاه برای این پیشنهادها بده.`);
        
        const response: GenerateContentResponse = await ai.models.generateContent({ model: AI_MODEL_NAME, contents: prompt, config: {responseMimeType: "application/json"} });
        let jsonStr = response.text.trim();
        const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
        const match = jsonStr.match(fenceRegex);
        if (match && match[2]) jsonStr = match[2].trim();
        
        const parsedData = JSON.parse(jsonStr) as AISuggestedBudgetResponse;

        if (parsedData.suggestedBudgets && Array.isArray(parsedData.suggestedBudgets)) {
            setAiSuggestion(parsedData);
        } else {
            throw new Error(toPersianDigits("فرمت پاسخ پیشنهاد بودجه نامعتبر است."));
        }
    } catch (error) {
        console.error("Error fetching AI budget suggestion:", error);
        setAiError(toPersianDigits("خطا در دریافت پیشنهاد بودجه از هوش مصنوعی."));
    } finally {
        setIsFetchingAISuggestion(false);
    }
  };

  const applyAISuggestion = () => {
    if (aiSuggestion && aiSuggestion.suggestedBudgets) {
        const updatedBudgets = {...localBudgets};
        aiSuggestion.suggestedBudgets.forEach(suggestedItem => {
            const categoryMatch = categories.find(cat => cat.name === suggestedItem.categoryName && cat.type === 'expense');
            if (categoryMatch) {
                updatedBudgets[categoryMatch.id] = suggestedItem.suggestedAmount.toString();
            }
        });
        setLocalBudgets(updatedBudgets);
        setAiSuggestion(null); // Clear suggestion after applying
    }
  };


  const handleSubmit = () => {
    const budgetsToSave: BudgetSetting[] = Object.entries(localBudgets)
      .map(([categoryId, amountString]) => ({
        categoryId,
        allocatedAmount: parseFloat(amountString) || 0, 
        period: 'monthly' as 'monthly',
      }))
      .filter(budget => budget.allocatedAmount >= 0); // Allow 0 budget (meaning don't track or user intentionally set to 0)

    onSaveBudgets(budgetsToSave);
    onClose();
  };

  if (!isOpen) return null;

  const expenseCategories = categories.filter(cat => cat.type === 'expense');

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="budget-setup-modal-title"
    >
      <div
        className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto modal-scroll-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-200">
          <h2 id="budget-setup-modal-title" className="text-lg font-semibold text-gray-800 flex items-center">
            <WalletIcon className="w-6 h-6 mr-2 rtl:ml-2 rtl:mr-0 text-indigo-600" />
            {toPersianDigits("تنظیم بودجه ماهانه")}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-4 text-sm">
          <p className="text-xs text-gray-600 mb-4">
            {toPersianDigits("برای هر دسته‌بندی هزینه، سقف بودجه ماهانه خود را وارد کنید.")}
          </p>
          
          {totalMonthlyGoalContributions > 0 && (
            <div className="p-3 bg-green-50 rounded-md border border-green-200 text-xs text-green-700">
                {toPersianDigits(`مبلغ ${totalMonthlyGoalContributions.toLocaleString('fa-IR')} تومان به صورت خودکار برای اهداف مالی شما کنار گذاشته شده است.`)}
            </div>
          )}

          <div className="my-4">
            <button 
                type="button"
                onClick={fetchAISuggestedBudget}
                disabled={isFetchingAISuggestion || !ai}
                className="w-full flex items-center justify-center text-xs py-2 px-3 bg-yellow-400 hover:bg-yellow-500 text-gray-800 rounded-md transition-colors disabled:opacity-60"
            >
                {isFetchingAISuggestion ? <LoadingSpinner size="sm" color="text-gray-700"/> : <LightbulbIcon className="w-4 h-4 ml-1.5 rtl:mr-1.5 rtl:ml-0"/>}
                {toPersianDigits("دریافت پیشنهاد هوشمند با هوش مصنوعی")}
            </button>
            {!ai && <p className="text-[10px] text-center text-gray-500 mt-1">{toPersianDigits("(سرویس هوش مصنوعی برای پیشنهاد بودجه در دسترس نیست)")}</p>}
            {aiError && <p className="text-xs text-red-500 text-center mt-1">{aiError}</p>}
          </div>

          {aiSuggestion && (
            <div className="p-3 bg-indigo-50 rounded-md border border-indigo-200 space-y-2">
                <h4 className="text-xs font-semibold text-indigo-700">{toPersianDigits("پیشنهادات هوش مصنوعی:")}</h4>
                {aiSuggestion.rationale && <p className="text-[10px] text-indigo-600 italic mb-1">{toPersianDigits(aiSuggestion.rationale)}</p>}
                <ul className="space-y-1">
                    {aiSuggestion.suggestedBudgets.map(item => (
                        <li key={item.categoryName} className="text-xs text-gray-700">
                            {toPersianDigits(item.categoryName)}: <span className="font-medium">{toPersianDigits(item.suggestedAmount.toLocaleString('fa-IR'))}</span> {toPersianDigits("تومان")}
                        </li>
                    ))}
                </ul>
                <button 
                    type="button"
                    onClick={applyAISuggestion}
                    className="text-xs py-1 px-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md mt-1"
                >
                    {toPersianDigits("اعمال پیشنهادات")}
                </button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 max-h-80 overflow-y-auto pr-2">
            {expenseCategories.map(category => (
              <div key={category.id} className="flex items-center space-x-2 space-x-reverse">
                <div className="p-1.5 bg-gray-100 rounded-full text-gray-600">
                    {React.cloneElement(category.icon, { className: 'w-4 h-4' })}
                </div>
                <label htmlFor={`budget-${category.id}`} className="text-xs font-medium text-gray-700 w-28 truncate" title={toPersianDigits(category.name)}>
                  {toPersianDigits(category.name)}:
                </label>
                <div className="flex-grow flex items-center">
                  <input
                    type="text" 
                    id={`budget-${category.id}`}
                    value={toPersianDigits(localBudgets[category.id] || '')}
                    onChange={e => handleAmountChange(category.id, e.target.value.replace(/[۰-۹]/g, d => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d))))} 
                    className="w-full p-1.5 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-xs text-left dir-ltr" 
                    placeholder={toPersianDigits("مبلغ...")}
                    inputMode="decimal" // Suggest numeric keyboard on mobile
                  />
                  <span className="text-xs text-gray-500 ml-1 rtl:mr-1 rtl:ml-0">{toPersianDigits("تومان")}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end space-x-2 space-x-reverse pt-5 border-t border-gray-200">
            <button type="button" onClick={onClose} className="py-2 px-4 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md text-xs">
              {toPersianDigits("انصراف")}
            </button>
            <button type="submit" className="py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md text-xs flex items-center">
              <PlusIcon className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0"/> {toPersianDigits("ذخیره بودجه‌ها")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BudgetSetupModal;
