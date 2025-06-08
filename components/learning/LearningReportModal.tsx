import React, { useState } from 'react';
import { LearningReportConfig } from '../../types/learningTypes';
import { toPersianDigits } from '../../utils';
import { XMarkIcon, DocumentTextIcon, FileDownloadIcon, CogIcon } from '../shared/AppIcons';
import LoadingSpinner from '../shared/LoadingSpinner';

interface LearningReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerateReport: (config: LearningReportConfig) => Promise<string>; // Returns HTML/Markdown string of the report
}

const LearningReportModal: React.FC<LearningReportModalProps> = ({
  isOpen,
  onClose,
  onGenerateReport,
}) => {
  const [reportConfig, setReportConfig] = useState<LearningReportConfig>({
    period: 'monthly',
    includeSkillSummary: true,
    includeGoalImpactAnalysis: true,
    includeFutureSuggestions: true,
  });
  const [generatedReportContent, setGeneratedReportContent] = useState<string | null>(null);
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [reportError, setReportError] = useState<string | null>(null);

  const handleConfigChange = (field: keyof LearningReportConfig, value: any) => {
    setReportConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerateClick = async () => {
    setIsLoadingReport(true);
    setReportError(null);
    setGeneratedReportContent(null);
    try {
      const reportHtml = await onGenerateReport(reportConfig);
      setGeneratedReportContent(reportHtml);
    } catch (err: any) {
      setReportError(toPersianDigits("خطا در تولید گزارش. لطفاً دوباره تلاش کنید."));
      console.error("Error generating report:", err);
    } finally {
      setIsLoadingReport(false);
    }
  };

  const handleDownload = (format: 'pdf' | 'csv') => {
    alert(toPersianDigits(`دانلود گزارش به صورت ${format.toUpperCase()} شبیه‌سازی شد.`));
    // Actual download logic would go here
  };
  
  const closeAndReset = () => {
    setGeneratedReportContent(null);
    setReportError(null);
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[1001] p-4" 
      onClick={closeAndReset}
      role="dialog"
      aria-modal="true"
      aria-labelledby="learning-report-modal-title"
      dir="rtl"
    >
      <div 
        className="bg-slate-800 p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto border border-slate-700 modal-scroll-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 id="learning-report-modal-title" className="text-xl sm:text-2xl font-semibold text-sky-300 flex items-center">
            <DocumentTextIcon className="w-6 h-6 text-sky-400 mr-2 rtl:ml-2 rtl:mr-0" />
            {toPersianDigits("گزارش جامع یادگیری و رشد")}
          </h2>
          <button onClick={closeAndReset} className="text-gray-400 hover:text-gray-200">
            <XMarkIcon className="w-7 h-7" />
          </button>
        </div>

        {!generatedReportContent && (
            <div className="space-y-4 mb-6">
            <div>
                <label htmlFor="reportPeriod" className="block text-sm font-medium text-sky-400 mb-1">{toPersianDigits("دوره گزارش:")}</label>
                <select
                id="reportPeriod"
                value={reportConfig.period}
                onChange={(e) => handleConfigChange('period', e.target.value as LearningReportConfig['period'])}
                className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-gray-200 text-sm"
                >
                <option value="monthly">{toPersianDigits("ماهانه")}</option>
                <option value="quarterly">{toPersianDigits("فصلی")}</option>
                <option value="annually">{toPersianDigits("سالانه")}</option>
                </select>
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-sky-400">{toPersianDigits("بخش‌های گزارش:")}</label>
                {[
                { key: 'includeSkillSummary', label: "خلاصه مهارت‌های کسب شده" },
                { key: 'includeGoalImpactAnalysis', label: "تحلیل تاثیر یادگیری بر اهداف" },
                { key: 'includeFutureSuggestions', label: "پیشنهادات آینده برای رشد" },
                ].map(item => (
                <div key={item.key} className="flex items-center">
                    <input
                    type="checkbox"
                    id={item.key}
                    checked={reportConfig[item.key as keyof LearningReportConfig] as boolean}
                    onChange={(e) => handleConfigChange(item.key as keyof LearningReportConfig, e.target.checked)}
                    className="h-4 w-4 text-sky-500 bg-slate-600 border-slate-500 rounded focus:ring-sky-400"
                    />
                    <label htmlFor={item.key} className="mr-2 rtl:ml-2 rtl:mr-0 text-sm text-gray-300">{toPersianDigits(item.label)}</label>
                </div>
                ))}
            </div>
            
            <button
                onClick={handleGenerateClick}
                disabled={isLoadingReport}
                className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-4 rounded-lg text-sm transition-colors disabled:opacity-60"
            >
                {isLoadingReport ? <LoadingSpinner size="sm" /> : <CogIcon className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />}
                {toPersianDigits("تولید گزارش")}
            </button>
            {reportError && <p className="text-xs text-red-400 bg-red-900/30 p-2 rounded-md text-center">{reportError}</p>}
            </div>
        )}

        {generatedReportContent && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-sky-300 mb-3">{toPersianDigits("گزارش شما آماده است:")}</h3>
            <div 
              className="p-4 bg-slate-700 rounded-md border border-slate-600 text-gray-200 text-sm leading-relaxed max-h-80 overflow-y-auto"
              dangerouslySetInnerHTML={{ __html: generatedReportContent }} // Assuming report is HTML
            />
            <div className="mt-4 flex flex-col sm:flex-row gap-2 justify-end">
                <button 
                    onClick={() => setGeneratedReportContent(null)} // Allow re-configuring
                    className="flex items-center justify-center text-xs sm:text-sm bg-gray-500 hover:bg-gray-600 text-white py-2 px-3 rounded-md"
                >
                   <CogIcon className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0"/> {toPersianDigits("تنظیمات مجدد")}
                </button>
                <button 
                    onClick={() => handleDownload('pdf')}
                    className="flex items-center justify-center text-xs sm:text-sm bg-sky-600 hover:bg-sky-700 text-white py-2 px-3 rounded-md"
                >
                   <FileDownloadIcon className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0"/> {toPersianDigits("دانلود PDF (شبیه‌سازی)")}
                </button>
            </div>
          </div>
        )}

        <div className="mt-6 text-right">
            <button
              onClick={closeAndReset}
              className="px-5 py-2 text-sm font-medium text-gray-300 bg-slate-600 hover:bg-slate-500 rounded-lg transition-colors"
            >
              {toPersianDigits("بستن")}
            </button>
          </div>
      </div>
    </div>
  );
};

export default LearningReportModal;
