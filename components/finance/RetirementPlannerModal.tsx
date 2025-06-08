
import React, { useState } from 'react';
import { toPersianDigits } from '../../utils';
import { XMarkIcon, LightbulbIcon, CheckCircleIcon, CalculatorIcon } from '../shared/AppIcons';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import LoadingSpinner from '../shared/LoadingSpinner';

const AI_MODEL_NAME = 'gemini-2.5-flash-preview-04-17';

interface RetirementPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  ai: GoogleGenAI | null;
}

const RetirementPlannerModal: React.FC<RetirementPlannerModalProps> = ({ isOpen, onClose, ai }) => {
  const [currentAge, setCurrentAge] = useState('');
  const [retirementAge, setRetirementAge] = useState('');
  const [currentSavings, setCurrentSavings] = useState('');
  const [desiredMonthlyIncome, setDesiredMonthlyIncome] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentAge || !retirementAge || !currentSavings || !desiredMonthlyIncome) {
      setError(toPersianDigits("لطفاً تمام فیلدها را پر کنید."));
      return;
    }
     if (!ai) {
      setError(toPersianDigits("سرویس هوش مصنوعی در دسترس نیست."));
      return;
    }

    setIsLoading(true);
    setError(null);
    setAiResult(null);

    try {
      const prompt = toPersianDigits(
        `یک کاربر با مشخصات زیر قصد برنامه‌ریزی برای بازنشستگی دارد:
        - سن فعلی: ${currentAge} سال
        - سن بازنشستگی مطلوب: ${retirementAge} سال
        - پس‌انداز فعلی برای بازنشستگی: ${currentSavings} تومان
        - درآمد ماهانه مطلوب در زمان بازنشستگی (به ارزش امروز): ${desiredMonthlyIncome} تومان
        با فرض نرخ بازده واقعی سالانه سرمایه‌گذاری (پس از کسر تورم) ۳٪ و امید به زندگی تا ۸۵ سالگی، لطفاً تخمین بزنید که این کاربر برای رسیدن به هدف درآمد ماهانه مطلوب خود، تقریباً چقدر باید ماهانه پس‌انداز کند. نتیجه و یک توضیح کوتاه به زبان فارسی ارائه دهید. از ارائه مشاوره مالی مستقیم خودداری کنید و تاکید کنید این یک تخمین کلی و ساده‌شده است و عوامل زیادی می‌توانند بر نتیجه نهایی تاثیر بگذارند.`
      );
      
      const response: GenerateContentResponse = await ai.models.generateContent({ model: AI_MODEL_NAME, contents: prompt });
      setAiResult(response.text || toPersianDigits("تحلیل در دسترس نیست."));

    } catch (e: any) {
      console.error("Error in retirement planning:", e);
      setError(toPersianDigits("خطا در محاسبه. لطفاً دوباره امتحان کنید."));
    } finally {
      setIsLoading(false);
    }
  };
  
  const resetForm = () => {
    setCurrentAge('');
    setRetirementAge('');
    setCurrentSavings('');
    setDesiredMonthlyIncome('');
    setAiResult(null);
    setError(null);
  }

  const handleCloseAndReset = () => {
    resetForm();
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4" onClick={handleCloseAndReset}>
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto modal-scroll-content" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <CalculatorIcon className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0 text-purple-600" />
            {toPersianDigits("برنامه‌ریزی بازنشستگی با AI")}
          </h2>
          <button onClick={handleCloseAndReset} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="currentAgeRp" className="block text-xs font-medium text-gray-700 mb-0.5">{toPersianDigits("سن فعلی (سال)*:")}</label>
              <input type="number" id="currentAgeRp" value={currentAge} onChange={e => setCurrentAge(e.target.value)} required min="18" max="90"
                     className="w-full p-1.5 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"/>
            </div>
            <div>
              <label htmlFor="retirementAgeRp" className="block text-xs font-medium text-gray-700 mb-0.5">{toPersianDigits("سن بازنشستگی مطلوب*:")}</label>
              <input type="number" id="retirementAgeRp" value={retirementAge} onChange={e => setRetirementAge(e.target.value)} required min="50" max="100"
                     className="w-full p-1.5 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"/>
            </div>
          </div>
          <div>
            <label htmlFor="currentSavingsRp" className="block text-xs font-medium text-gray-700 mb-0.5">{toPersianDigits("پس‌انداز فعلی بازنشستگی (تومان)*:")}</label>
            <input type="number" id="currentSavingsRp" value={currentSavings} onChange={e => setCurrentSavings(e.target.value)} required min="0" step="any"
                   className="w-full p-1.5 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm" placeholder="0"/>
          </div>
          <div>
            <label htmlFor="desiredMonthlyIncomeRp" className="block text-xs font-medium text-gray-700 mb-0.5">{toPersianDigits("درآمد ماهانه مطلوب در بازنشستگی (تومان به ارزش امروز)*:")}</label>
            <input type="number" id="desiredMonthlyIncomeRp" value={desiredMonthlyIncome} onChange={e => setDesiredMonthlyIncome(e.target.value)} required min="1000000" step="any"
                   className="w-full p-1.5 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm" placeholder={toPersianDigits("مثال: ۲۰،۰۰۰،۰۰۰")}/>
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading || !ai}
            className="w-full flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md text-sm transition-colors disabled:opacity-60"
          >
            {isLoading ? <LoadingSpinner size="sm" /> : <LightbulbIcon className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0"/>}
            {toPersianDigits("محاسبه و دریافت پیشنهاد AI")}
          </button>
          {!ai && <p className="text-[10px] text-center text-gray-500">{toPersianDigits("(سرویس هوش مصنوعی برای محاسبه در دسترس نیست)")}</p>}
        </form>

        {error && <p className="text-xs text-red-500 bg-red-100 p-2 rounded-md mt-3 text-center">{error}</p>}
        
        {aiResult && (
            <div className="mt-4 p-3 bg-indigo-50 rounded-md border border-indigo-200">
                <h4 className="text-sm font-semibold text-indigo-700 mb-2 flex items-center">
                    <CheckCircleIcon className="w-4 h-4 text-green-500 mr-1 rtl:ml-1 rtl:mr-0"/> {toPersianDigits("تخمین و پیشنهاد هوش مصنوعی:")}
                </h4>
                <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">{toPersianDigits(aiResult)}</p>
            </div>
        )}
         <p className="text-[10px] text-gray-400 mt-4 text-center">{toPersianDigits("محاسبات ارائه شده یک تخمین کلی است و نباید به عنوان مشاوره مالی قطعی تلقی شود.")}</p>
      </div>
    </div>
  );
};

export default RetirementPlannerModal;
