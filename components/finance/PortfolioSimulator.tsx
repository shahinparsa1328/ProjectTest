
import React, { useState } from 'react';
import { toPersianDigits } from '../../utils';
import { PlusIcon, TrashIcon, LightbulbIcon, SparklesIconNav } from '../shared/AppIcons';
import Disclaimer from './Disclaimer';
import { UserRiskProfile } from '../../types/financeTypes'; // Corrected import
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import LoadingSpinner from '../shared/LoadingSpinner';

const AI_MODEL_NAME = 'gemini-2.5-flash-preview-04-17';

export interface PortfolioAsset {
  id: string;
  assetClass: string; 
  percentage: number;
}

interface PortfolioSimulatorProps {
  riskProfile: UserRiskProfile | null;
  ai: GoogleGenAI | null;
}

const availableAssetClasses = [
  toPersianDigits("سهام داخلی"), 
  toPersianDigits("سهام خارجی"), 
  toPersianDigits("اوراق قرضه دولتی"), 
  toPersianDigits("اوراق قرضه شرکتی"), 
  toPersianDigits("املاک و مستغلات"), 
  toPersianDigits("ارز دیجیتال (بیت‌کوین)"), 
  toPersianDigits("ارز دیجیتال (اتریوم)"), 
  toPersianDigits("طلا و سکه"),
  toPersianDigits("صندوق‌های سرمایه‌گذاری مختلط"),
  toPersianDigits("سپرده بانکی"),
];

const PortfolioSimulator: React.FC<PortfolioSimulatorProps> = ({ riskProfile, ai }) => {
  const [portfolio, setPortfolio] = useState<PortfolioAsset[]>([]);
  const [nextAsset, setNextAsset] = useState<{ assetClass: string; percentage: string }>({ assetClass: availableAssetClasses[0], percentage: '' });
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalPercentage = portfolio.reduce((sum, asset) => sum + asset.percentage, 0);

  const handleAddAsset = () => {
    const percentageNum = parseFloat(nextAsset.percentage);
    if (!nextAsset.assetClass || !nextAsset.percentage || isNaN(percentageNum) || percentageNum <= 0 || percentageNum > 100) {
      setError(toPersianDigits("لطفاً کلاس دارایی و درصد معتبر (۱-۱۰۰) وارد کنید."));
      return;
    }
    if (totalPercentage + percentageNum > 100) {
      setError(toPersianDigits("مجموع درصدها نمی‌تواند بیشتر از ۱۰۰٪ باشد."));
      return;
    }
    setError(null);
    setPortfolio([...portfolio, { id: Date.now().toString(), assetClass: nextAsset.assetClass, percentage: percentageNum }]);
    setNextAsset({ assetClass: availableAssetClasses[0], percentage: '' });
  };

  const handleDeleteAsset = (id: string) => {
    setPortfolio(portfolio.filter(asset => asset.id !== id));
  };

  const handleSimulatePortfolio = async () => {
    if (!ai) {
      setError(toPersianDigits("سرویس هوش مصنوعی در دسترس نیست."));
      return;
    }
    if (portfolio.length === 0) {
      setError(toPersianDigits("لطفاً ابتدا دارایی به پورتفولیو اضافه کنید."));
      return;
    }
    if (totalPercentage !== 100) {
      setError(toPersianDigits("مجموع درصد دارایی‌ها باید ۱۰۰٪ باشد."));
      return;
    }
    setIsLoadingAnalysis(true);
    setError(null);
    setAiAnalysis(null);
    try {
      const portfolioDescription = portfolio.map(p => `${p.assetClass}: ${p.percentage}%`).join(', ');
      const riskProfileText = riskProfile ? `پروفایل ریسک کاربر: ${riskProfile}.` : "پروفایل ریسک کاربر مشخص نشده.";
      
      const prompt = toPersianDigits(`یک تحلیل کوتاه و آموزشی (نه توصیه مالی) برای پورتفولیوی سرمایه‌گذاری زیر ارائه بده: ${portfolioDescription}. ${riskProfileText} این تحلیل باید شامل یک ارزیابی کلی از تنوع، ریسک بالقوه و بازده بالقوه (به صورت کیفی) باشد. چند پیشنهاد کلی برای بهبود احتمالی (در صورت نیاز و متناسب با پروفایل ریسک) ارائه کن. تأکید کن که این فقط یک شبیه‌سازی آموزشی است.`);
      
      const response: GenerateContentResponse = await ai.models.generateContent({ model: AI_MODEL_NAME, contents: prompt });
      setAiAnalysis(response.text || toPersianDigits("تحلیل هوش مصنوعی در دسترس نیست."));
    } catch (e: any) {
      console.error("Error simulating portfolio:", e);
      setError(toPersianDigits("خطا در شبیه‌سازی پورتفولیو."));
    } finally {
      setIsLoadingAnalysis(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <h4 className="text-md font-semibold text-gray-700 mb-3">{toPersianDigits("شبیه‌ساز پورتفولیو سرمایه‌گذاری")}</h4>
      <Disclaimer className="mb-3 text-xs"/>
      
      <div className="space-y-3 mb-4">
        {portfolio.map(asset => (
          <div key={asset.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-md border text-sm">
            <span className="text-gray-700">{toPersianDigits(asset.assetClass)}: <span className="font-medium">{toPersianDigits(asset.percentage.toString())}%</span></span>
            <button onClick={() => handleDeleteAsset(asset.id)} className="p-1 text-red-500 hover:text-red-700" aria-label={toPersianDigits("حذف دارایی")}>
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {totalPercentage < 100 && (
        <div className="flex flex-col sm:flex-row items-end gap-2 mb-4 p-3 border border-dashed border-gray-300 rounded-md">
          <div className="flex-grow">
            <label htmlFor="assetClass" className="block text-xs font-medium text-gray-600 mb-0.5">{toPersianDigits("انتخاب دارایی:")}</label>
            <select 
              id="assetClass" 
              value={nextAsset.assetClass} 
              onChange={e => setNextAsset(prev => ({ ...prev, assetClass: e.target.value }))}
              className="w-full p-1.5 border border-gray-300 rounded-md text-xs focus:ring-indigo-500 focus:border-indigo-500 bg-white"
            >
              {availableAssetClasses.map(ac => <option key={ac} value={ac}>{ac}</option>)}
            </select>
          </div>
          <div className="w-full sm:w-28">
            <label htmlFor="assetPercentage" className="block text-xs font-medium text-gray-600 mb-0.5">{toPersianDigits("درصد تخصیص:")}</label>
            <input 
              type="number" 
              id="assetPercentage"
              value={nextAsset.percentage}
              onChange={e => setNextAsset(prev => ({ ...prev, percentage: e.target.value }))}
              min="1" max="100"
              className="w-full p-1.5 border border-gray-300 rounded-md text-xs focus:ring-indigo-500 focus:border-indigo-500 text-left dir-ltr"
              placeholder="%"
            />
          </div>
          <button onClick={handleAddAsset} className="flex-shrink-0 bg-indigo-500 hover:bg-indigo-600 text-white text-xs py-1.5 px-3 rounded-md flex items-center w-full sm:w-auto justify-center">
            <PlusIcon className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0"/> {toPersianDigits("افزودن")}
          </button>
        </div>
      )}
      
      {error && <p className="text-xs text-red-500 bg-red-100 p-2 rounded-md mb-3 text-center">{error}</p>}

      <div className="mb-3 p-2 bg-indigo-50 rounded-md text-center">
        <p className="text-sm font-semibold text-indigo-700">{toPersianDigits(`مجموع درصد تخصیص یافته: ${totalPercentage}%`)}</p>
        {totalPercentage < 100 && <p className="text-xs text-indigo-600">{toPersianDigits(`${100 - totalPercentage}% باقیمانده است.`)}</p>}
        {totalPercentage > 100 && <p className="text-xs text-red-600">{toPersianDigits("خطا: مجموع درصدها بیشتر از ۱۰۰٪ است!")}</p>}
      </div>

      <button 
        onClick={handleSimulatePortfolio} 
        disabled={isLoadingAnalysis || portfolio.length === 0 || totalPercentage !== 100 || !ai}
        className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md text-sm transition-colors disabled:opacity-60"
      >
        {isLoadingAnalysis ? <LoadingSpinner size="sm" /> : <SparklesIconNav className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0"/>}
        {toPersianDigits("تحلیل پورتفولیو با هوش مصنوعی")}
      </button>
      {!ai && <p className="text-[10px] text-center text-gray-500 mt-1">{toPersianDigits("(سرویس هوش مصنوعی برای تحلیل در دسترس نیست)")}</p>}

      {aiAnalysis && (
        <div className="mt-4 p-3 bg-gray-100 rounded-md border border-gray-200">
          <h5 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
            <LightbulbIcon className="w-4 h-4 text-yellow-500 mr-1 rtl:ml-1 rtl:mr-0"/> {toPersianDigits("تحلیل و پیشنهادات هوش مصنوعی (آموزشی):")}
          </h5>
          <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap">{toPersianDigits(aiAnalysis)}</p>
        </div>
      )}
      <div className="mt-3 h-24 bg-gray-200 rounded-md flex items-center justify-center text-gray-400 text-xs">
        {toPersianDigits("[نمودارهای پیش‌بینی بازده و ریسک در اینجا نمایش داده خواهند شد (شبیه‌سازی شده)]")}
      </div>
    </div>
  );
};

export default PortfolioSimulator;
