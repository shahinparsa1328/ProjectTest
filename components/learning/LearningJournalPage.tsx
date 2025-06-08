
import React, { useState } from 'react';
import { JournalEntry } from '../../types/learningTypes';
import { toPersianDigits } from '../../utils';
import { JournalIcon, PlusIcon, TagIcon, LightbulbIcon, SparklesIconNav, ArrowRightIcon, XCircleIcon } from '../shared/AppIcons';
import Breadcrumbs from './Breadcrumbs';
import LoadingSpinner from '../shared/LoadingSpinner';

interface LearningJournalPageProps {
  entries: JournalEntry[];
  onAddEntry: (title: string, text: string, tags?: string[]) => Promise<void>; // Make async for potential AI interaction
  onAnalyzeJournal?: () => Promise<string[] | null>; // Returns array of insights or null
  onBackToLibrary: () => void;
  onNavigateToGateway?: () => void;
}

const LearningJournalPage: React.FC<LearningJournalPageProps> = ({
  entries,
  onAddEntry,
  onAnalyzeJournal,
  onBackToLibrary,
  onNavigateToGateway,
}) => {
  const [newEntryTitle, setNewEntryTitle] = useState('');
  const [newEntryText, setNewEntryText] = useState('');
  const [newEntryTags, setNewEntryTags] = useState('');
  const [isAddingEntry, setIsAddingEntry] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  
  const [aiInsights, setAiInsights] = useState<string[]>([]);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const handleSubmitEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntryText.trim()) return;
    setIsAddingEntry(true);
    const tagsArray = newEntryTags.split(',').map(tag => tag.trim()).filter(tag => tag);
    await onAddEntry(newEntryTitle.trim(), newEntryText.trim(), tagsArray);
    setNewEntryTitle('');
    setNewEntryText('');
    setNewEntryTags('');
    setIsAddingEntry(false);
    setShowAddForm(false); 
  };

  const handleTriggerAIAnalysis = async () => {
    if (onAnalyzeJournal) {
      setIsLoadingAnalysis(true);
      setAnalysisError(null);
      setAiInsights([]);
      try {
        const insights = await onAnalyzeJournal();
        if (insights) {
          setAiInsights(insights);
        }
      } catch (err: any) {
        setAnalysisError(toPersianDigits("خطا در تحلیل دفترچه یادداشت."));
      } finally {
        setIsLoadingAnalysis(false);
      }
    }
  };

  const breadcrumbSegments = [
    ...(onNavigateToGateway ? [{ label: toPersianDigits('صفحه اصلی یادگیری'), onClick: onNavigateToGateway }] : []),
    { label: toPersianDigits('کتابخانه'), onClick: onBackToLibrary },
    { label: toPersianDigits('دفترچه یادداشت یادگیری') }
  ];
  
  const sortedEntries = [...entries].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="page bg-learning-page">
      <Breadcrumbs segments={breadcrumbSegments} className="mb-4 px-1 sm:px-0" />
      
      <header className="mb-6 p-4 sm:p-6 bg-white rounded-xl shadow-lg border border-gray-200/80 text-center">
        <JournalIcon className="w-12 h-12 text-purple-600 mx-auto mb-3"/>
        <h1 className="text-2xl sm:text-3xl font-bold text-purple-700 mb-2">
          {toPersianDigits("دفترچه یادداشت یادگیری من")}
        </h1>
        <p className="text-sm text-gray-600 max-w-md mx-auto">
          {toPersianDigits("افکار، سوالات، آموخته‌ها و بینش‌های خود را در طول سفر یادگیری ثبت کنید.")}
        </p>
      </header>

      {!showAddForm && (
         <button
            onClick={() => setShowAddForm(true)}
            className="w-full flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 px-4 rounded-lg text-sm transition-colors mb-6 shadow-md"
          >
            <PlusIcon className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />
            {toPersianDigits("افزودن یادداشت جدید")}
        </button>
      )}

      {showAddForm && (
        <form onSubmit={handleSubmitEntry} className="mb-6 p-4 bg-white rounded-xl shadow-md border border-gray-200/80 space-y-4">
           <h3 className="text-lg font-semibold text-purple-700">{toPersianDigits("یادداشت جدید")}</h3>
            <div>
                <label htmlFor="entryTitle" className="block text-sm font-medium text-gray-700 mb-1">{toPersianDigits("عنوان (اختیاری):")}</label>
                <input
                    type="text"
                    id="entryTitle"
                    value={newEntryTitle}
                    onChange={(e) => setNewEntryTitle(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-sm"
                    placeholder={toPersianDigits("مثال: نکات کلیدی از ماژول مدیریت زمان")}
                />
            </div>
            <div>
                <label htmlFor="entryText" className="block text-sm font-medium text-gray-700 mb-1">{toPersianDigits("متن یادداشت*:")}</label>
                <textarea
                    id="entryText"
                    value={newEntryText}
                    onChange={(e) => setNewEntryText(e.target.value)}
                    rows={5}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-sm"
                    placeholder={toPersianDigits("افکار و آموخته‌های خود را اینجا بنویسید...")}
                />
            </div>
            <div>
                <label htmlFor="entryTags" className="block text-sm font-medium text-gray-700 mb-1">{toPersianDigits("برچسب‌ها (جدا شده با کاما):")}</label>
                <input
                    type="text"
                    id="entryTags"
                    value={newEntryTags}
                    onChange={(e) => setNewEntryTags(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-sm"
                    placeholder={toPersianDigits("مثال: بهره‌وری, ذهن‌آگاهی, نکات کلیدی")}
                />
            </div>
            <div className="flex items-center justify-end space-x-2 space-x-reverse">
                 <button type="button" onClick={() => setShowAddForm(false)} className="text-xs text-gray-600 hover:text-gray-800 py-2 px-3 rounded-md">
                    {toPersianDigits("انصراف")}
                </button>
                <button
                    type="submit"
                    disabled={isAddingEntry}
                    className="flex items-center bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md text-sm transition-colors disabled:opacity-60"
                >
                    {isAddingEntry ? <LoadingSpinner size="sm" /> : <PlusIcon className="w-4 h-4 mr-1.5 rtl:ml-1.5 rtl:mr-0" />}
                    {toPersianDigits("ذخیره یادداشت")}
                </button>
            </div>
        </form>
      )}
      
      {onAnalyzeJournal && (
        <div className="mb-6 p-4 bg-white rounded-xl shadow-md border border-gray-200/80">
          <h3 className="text-lg font-semibold text-purple-700 mb-3">{toPersianDigits("تحلیل هوشمند دفترچه")}</h3>
          <p className="text-xs text-gray-600 mb-3">{toPersianDigits("اجازه دهید هوش مصنوعی یادداشت‌های شما را تحلیل کند تا الگوهای فکری، نقاط قوت یادگیری یا موانع احتمالی را شناسایی کند.")}</p>
          <button
            onClick={handleTriggerAIAnalysis}
            disabled={isLoadingAnalysis || entries.length === 0}
            className="w-full flex items-center justify-center bg-sky-500 hover:bg-sky-600 text-white font-medium py-2.5 px-4 rounded-lg text-sm transition-colors disabled:opacity-60"
          >
            {isLoadingAnalysis ? <LoadingSpinner size="sm" /> : <SparklesIconNav className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />}
            {entries.length === 0 ? toPersianDigits("ابتدا یادداشتی اضافه کنید") : toPersianDigits("تحلیل با هوش مصنوعی")}
          </button>
          {analysisError && <p className="text-xs text-red-500 bg-red-100 p-2 rounded-md mt-3">{analysisError}</p>}
          {aiInsights.length > 0 && (
            <div className="mt-4 space-y-2">
              <h4 className="text-sm font-semibold text-gray-700">{toPersianDigits("بینش‌های هوش مصنوعی:")}</h4>
              {aiInsights.map((insight, index) => (
                <p key={index} className="text-xs text-gray-600 bg-sky-50 p-2 rounded-md border border-sky-100 flex items-start">
                   <LightbulbIcon className="w-3.5 h-3.5 text-yellow-500 mr-1.5 mt-px flex-shrink-0"/>
                   <span>{toPersianDigits(insight)}</span>
                </p>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">{toPersianDigits("یادداشت‌های اخیر")}</h3>
        {sortedEntries.length === 0 ? (
          <div className="text-center py-6 bg-white rounded-lg border border-gray-200 shadow-sm">
            <JournalIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">{toPersianDigits("هنوز هیچ یادداشتی ثبت نشده است.")}</p>
          </div>
        ) : (
          sortedEntries.map(entry => (
            <div key={entry.id} className="p-4 bg-white rounded-lg shadow-sm border border-gray-200/70">
              {entry.title && <h4 className="text-md font-semibold text-purple-700 mb-1">{toPersianDigits(entry.title)}</h4>}
              <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{toPersianDigits(entry.text)}</p>
              <div className="mt-2 flex flex-wrap items-center justify-between text-xs text-gray-500">
                <span>{toPersianDigits(new Date(entry.date).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' }))}</span>
                {entry.tags && entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1 sm:mt-0">
                    {entry.tags.map(tag => (
                      <span key={tag} className="px-1.5 py-0.5 bg-gray-200 text-gray-600 rounded-full text-[10px] flex items-center">
                        <TagIcon className="w-2.5 h-2.5 ml-0.5 rtl:mr-0.5 rtl:ml-0" /> {toPersianDigits(tag)}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              {entry.aiInsight && (
                 <p className="text-xs text-sky-600 mt-2 p-1.5 bg-sky-50 rounded border border-sky-100 flex items-start">
                     <LightbulbIcon className="w-3.5 h-3.5 text-yellow-500 mr-1.5 mt-px flex-shrink-0"/>
                     <strong>{toPersianDigits("بینش AI: ")}</strong>{toPersianDigits(entry.aiInsight)}
                 </p>
              )}
            </div>
          ))
        )}
      </div>
       <div className="mt-8 text-center">
            <button 
            onClick={onBackToLibrary}
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2.5 px-6 rounded-lg text-sm transition-colors"
            >
            {toPersianDigits("بازگشت به کتابخانه")}
            </button>
       </div>
    </div>
  );
};

export default LearningJournalPage;
