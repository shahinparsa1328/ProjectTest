
import React, { useState } from 'react';
import { toPersianDigits } from '../../utils';
import { XMarkIcon, DocumentTextIcon, LightbulbIcon, CheckCircleIcon, CogIcon, FileDownloadIcon } from '../shared/AppIcons';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import LoadingSpinner from '../shared/LoadingSpinner';
import { Transaction, FinancialGoal } from '../pages/FinancePage'; // Import necessary types from FinancePage
import { BudgetSetting } from './BudgetSetupModal'; // Import BudgetSetting
import { Asset } from '../../types/financeTypes'; // Import Asset
import { Debt } from './DebtListItem'; // Import Debt


const AI_MODEL_NAME = 'gemini-2.5-flash-preview-04-17';

interface ReportGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  ai: GoogleGenAI | null;
  transactions: Transaction[];
  budgets: BudgetSetting[];
  financialGoals: FinancialGoal[];
  assets: Asset[];
  debts: Debt[];
}

type ReportType = 'monthly_summary' | 'expense_analysis' | 'savings_progress' | 'net_worth_snapshot';
type ReportPeriod = 'last_month' | 'last_3_months' | 'this_year' | 'all_time';

const ReportGeneratorModal: React.FC<ReportGeneratorModalProps> = ({ 
    isOpen, 
    onClose, 
    ai,
    transactions,
    budgets,
    financialGoals,
    assets = [],
    debts = []
}) => {
  const [reportType, setReportType] = useState<ReportType>('monthly_summary');
  const [reportPeriod, setReportPeriod] = useState<ReportPeriod>('last_month');
  
  const [isLoading, setIsLoading] = useState(false);
  const [aiReport, setAiReport] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ai) { setError(toPersianDigits("سرویس هوش مصنوعی در دسترس نیست.")); return; }

    setIsLoading(true);
    setError(null);
    setAiReport(null);

    try {
      const dataSummary = {
        numTransactions: transactions.length,
        numBudgets: budgets.length,
        numGoals: financialGoals.length,
        numAssets: assets.length,
        numDebts: debts.length,
        topExpenses: transactions.filter(t=>t.type === 'expense').slice(0,3).map(t => `${t.title}: ${t.amount}`).join(', ') || 'ندارد',
        topIncome: transactions.filter(t=>t.type === 'income').slice(0,2).map(t => `${t.title}: ${t.amount}`).join(', ') || 'ندارد',
      };

      const prompt = toPersianDigits(
        `لطفاً یک گزارش مالی بر اساس اطلاعات زیر برای کاربر تهیه کنید. نوع گزارش: "${translateReportType(reportType)}", دوره گزارش: "${translateReportPeriod(reportPeriod)}".
        خلاصه داده‌ها:
        - تعداد کل تراکنش‌ها: ${dataSummary.numTransactions}
        - تعداد بودجه‌های تنظیم شده: ${dataSummary.numBudgets}
        - تعداد اهداف مالی: ${dataSummary.numGoals}
        - تعداد دارایی‌ها: ${dataSummary.numAssets}
        - تعداد بدهی‌ها: ${dataSummary.numDebts}
        - چند هزینه عمده اخیر: ${dataSummary.topExpenses}
        - چند درآمد اخیر: ${dataSummary.topIncome}
        گزارش باید به زبان فارسی، مختصر، مفید و شامل نکات کلیدی مرتبط با نوع و دوره گزارش باشد. از ارائه اعداد دقیق خودداری کنید مگر اینکه در خلاصه داده‌ها موجود باشد، بیشتر بر تحلیل روند و پیشنهادات کلی تمرکز کنید.
        مثال برای خلاصه ماهانه: "در ماه گذشته، فعالیت مالی شما نشان‌دهنده تمرکز بر پس‌انداز بوده است، هرچند هزینه‌های بخش سرگرمی کمی افزایش داشته. پیشنهاد می‌شود بودجه این بخش را بازبینی کنید."
        `
      );
      
      const response: GenerateContentResponse = await ai.models.generateContent({ model: AI_MODEL_NAME, contents: prompt });
      setAiReport(response.text || toPersianDigits("گزارش در دسترس نیست."));

    } catch (e: any) {
      console.error("Error generating report:", e);
      setError(toPersianDigits("خطا در تولید گزارش. لطفاً دوباره امتحان کنید."));
    } finally {
      setIsLoading(false);
    }
  };

  const translateReportType = (type: ReportType): string => {
    switch(type) {
        case 'monthly_summary': return "خلاصه ماهانه";
        case 'expense_analysis': return "تحلیل هزینه‌ها";
        case 'savings_progress': return "پیشرفت پس‌انداز و اهداف";
        case 'net_worth_snapshot': return "نمای کلی ارزش خالص دارایی‌ها";
        default: return "";
    }
  };
  const translateReportPeriod = (period: ReportPeriod): string => {
    switch(period) {
        case 'last_month': return "ماه گذشته";
        case 'last_3_months': return "۳ ماه گذشته";
        case 'this_year': return "سال جاری";
        case 'all_time': return "کل دوره";
        default: return "";
    }
  };
  
  const resetAndClose = () => {
    setAiReport(null);
    setError(null);
    onClose();
  };

  const handleDownloadPlaceholder = (format: string) => {
    alert(toPersianDigits(`قابلیت دانلود گزارش به صورت ${format.toUpperCase()} به زودی اضافه خواهد شد.`));
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4" onClick={resetAndClose}>
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto modal-scroll-content" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <DocumentTextIcon className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0 text-green-600" />
            {toPersianDigits("تولید گزارش مالی")}
          </h2>
          <button onClick={resetAndClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {!aiReport ? (
            <form onSubmit={handleSubmit} className="space-y-3 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                <label htmlFor="reportType" className="block text-xs font-medium text-gray-700 mb-0.5">{toPersianDigits("نوع گزارش:")}</label>
                <select id="reportType" value={reportType} onChange={e => setReportType(e.target.value as ReportType)} required
                        className="w-full p-1.5 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white text-sm">
                    <option value="monthly_summary">{toPersianDigits("خلاصه ماهانه")}</option>
                    <option value="expense_analysis">{toPersianDigits("تحلیل هزینه‌ها")}</option>
                    <option value="savings_progress">{toPersianDigits("پیشرفت پس‌انداز و اهداف")}</option>
                    <option value="net_worth_snapshot">{toPersianDigits("نمای کلی ارزش خالص دارایی‌ها")}</option>
                </select>
                </div>
                <div>
                <label htmlFor="reportPeriod" className="block text-xs font-medium text-gray-700 mb-0.5">{toPersianDigits("دوره زمانی:")}</label>
                <select id="reportPeriod" value={reportPeriod} onChange={e => setReportPeriod(e.target.value as ReportPeriod)} required
                        className="w-full p-1.5 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white text-sm">
                    <option value="last_month">{toPersianDigits("ماه گذشته")}</option>
                    <option value="last_3_months">{toPersianDigits("۳ ماه گذشته")}</option>
                    <option value="this_year">{toPersianDigits("سال جاری")}</option>
                    <option value="all_time">{toPersianDigits("کل دوره")}</option>
                </select>
                </div>
            </div>
            
            <button 
                type="submit" 
                disabled={isLoading || !ai}
                className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md text-sm transition-colors disabled:opacity-60"
            >
                {isLoading ? <LoadingSpinner size="sm" /> : <CogIcon className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0"/>}
                {toPersianDigits("تولید گزارش با هوش مصنوعی")}
            </button>
            {!ai && <p className="text-[10px] text-center text-gray-500">{toPersianDigits("(سرویس هوش مصنوعی برای تولید گزارش در دسترس نیست)")}</p>}
            {error && <p className="text-xs text-red-500 bg-red-100 p-2 rounded-md mt-2 text-center">{error}</p>}
            </form>
        ) : (
            <div>
                <h3 className="text-md font-semibold text-gray-800 mb-2">{toPersianDigits(`گزارش ${translateReportType(reportType)} برای ${translateReportPeriod(reportPeriod)}:`)}</h3>
                <div 
                  className="p-3 bg-gray-50 rounded-md border border-gray-200 text-xs text-gray-700 leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto"
                  dangerouslySetInnerHTML={{ __html: toPersianDigits(aiReport).replace(/\n/g, '<br />') }} 
                />
                <div className="mt-3 flex flex-col sm:flex-row gap-2 justify-end">
                    <button 
                        onClick={() => setAiReport(null)} 
                        className="flex items-center justify-center text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 py-1.5 px-3 rounded-md"
                    >
                       <CogIcon className="w-3.5 h-3.5 ml-1 rtl:mr-1 rtl:ml-0"/> {toPersianDigits("تنظیمات و تولید گزارش جدید")}
                    </button>
                     <button 
                        onClick={() => handleDownloadPlaceholder('PDF')}
                        className="flex items-center justify-center text-xs bg-indigo-500 hover:bg-indigo-600 text-white py-1.5 px-3 rounded-md"
                    >
                       <FileDownloadIcon className="w-3.5 h-3.5 ml-1 rtl:mr-1 rtl:ml-0"/> {toPersianDigits("دانلود PDF")}
                    </button>
                     <button 
                        onClick={() => handleDownloadPlaceholder('CSV')}
                        className="flex items-center justify-center text-xs bg-teal-500 hover:bg-teal-600 text-white py-1.5 px-3 rounded-md"
                    >
                       <FileDownloadIcon className="w-3.5 h-3.5 ml-1 rtl:mr-1 rtl:ml-0"/> {toPersianDigits("دانلود CSV")}
                    </button>
                </div>
            </div>
        )}
        <p className="text-[10px] text-gray-400 mt-4 text-center">{toPersianDigits("گزارش تولید شده توسط هوش مصنوعی یک خلاصه کلی است و ممکن است نیاز به بررسی دقیق‌تر داده‌های شما داشته باشد.")}</p>
      </div>
    </div>
  );
};

export default ReportGeneratorModal;
