
import React, { useState, useEffect } from 'react';
import { toPersianDigits } from '../../utils';
import { ReportsIcon as PageIcon, DocumentTextIcon, ChartPieIcon, HeartIcon, LightbulbIcon, SparklesIconNav as AiIcon } from '../shared/AppIcons'; 
import LoadingSpinner from '../shared/LoadingSpinner';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const AI_MODEL_NAME = 'gemini-2.5-flash-preview-04-17';
const TASK_REFLECTIONS_LS_KEY = 'taskReflections';

interface TaskReflection {
  taskId: string;
  taskTitle: string;
  reflectionDate: string;
  answers: { question: string; answer: string }[];
}

interface ReportSectionProps {
  title: string;
  icon: React.ReactElement<{ className?: string }>;
  children: React.ReactNode;
  insights?: string[];
  onFetchInsights?: () => void;
  isFetchingInsights?: boolean;
}

const ReportSection: React.FC<ReportSectionProps> = ({ title, icon, children, insights, onFetchInsights, isFetchingInsights }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
    <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
            <div className="p-2 bg-indigo-100 rounded-full mr-3 text-indigo-600"> {/* RTL: ml-3, LTR: mr-3 */}
                {React.cloneElement(icon, { className: "w-6 h-6"})}
            </div>
            <h2 className="text-lg font-semibold text-gray-700">{toPersianDigits(title)}</h2>
        </div>
        {onFetchInsights && (
            <button
                onClick={onFetchInsights}
                disabled={isFetchingInsights}
                className="flex items-center text-xs py-1.5 px-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md transition-colors disabled:opacity-50"
            >
                {isFetchingInsights ? <LoadingSpinner size="sm"/> : <AiIcon className="w-4 h-4 mr-1.5"/>}
                {toPersianDigits("دریافت بینش AI")}
            </button>
        )}
    </div>
    <div className="report-content mb-4">{children}</div>

    {insights && insights.length > 0 && (
      <div className="mt-4 pt-3 border-t border-gray-100">
        <h4 className="text-sm font-semibold text-indigo-600 mb-2">{toPersianDigits("بینش‌های هوش مصنوعی:")}</h4>
        <ul className="space-y-1.5">
          {insights.map((insight, index) => (
            <li key={index} className="text-xs text-gray-600 bg-indigo-50 p-2 rounded-md flex items-start">
              <AiIcon className="w-3 h-3 text-indigo-500 mr-1.5 mt-0.5 flex-shrink-0"/> 
              <span>{toPersianDigits(insight)}</span>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

const ReportsPage: React.FC = () => {
  const [selectedReportType, setSelectedReportType] = useState<string>('productivity');
  const [productivityInsights, setProductivityInsights] = useState<string[]>([]);
  const [healthInsights, setHealthInsights] = useState<string[]>([]);
  const [lessonsLearned, setLessonsLearned] = useState<TaskReflection[]>([]);
  const [isFetchingProductivityInsights, setIsFetchingProductivityInsights] = useState(false);
  const [isFetchingHealthInsights, setIsFetchingHealthInsights] = useState(false);
  
  const ai = process.env.API_KEY ? new GoogleGenAI({ apiKey: process.env.API_KEY }) : null;

  useEffect(() => {
    try {
      const storedReflections = localStorage.getItem(TASK_REFLECTIONS_LS_KEY);
      if (storedReflections) {
        setLessonsLearned(JSON.parse(storedReflections));
      }
    } catch (error) {
      console.error("Error loading lessons learned from localStorage:", error);
    }
  }, []);

  const fetchProductivityInsights = async () => {
    if (!ai) {
        setProductivityInsights([toPersianDigits("سرویس هوش مصنوعی در دسترس نیست.")]);
        setIsFetchingProductivityInsights(false);
        return;
    }
    setIsFetchingProductivityInsights(true);
    setProductivityInsights([]);
    try {
      // Simulate data for prompt
      const sampleData = toPersianDigits("داده‌های نمونه: کاربر در هفته گذشته ۱۵ وظیفه از ۲۰ وظیفه برنامه‌ریزی شده را تکمیل کرده است. بیشتر وظایف تکمیل نشده مربوط به 'پروژه‌های بلندمدت' بوده‌اند. اوج بهره‌وری کاربر بین ساعت ۱۰ صبح تا ۱ بعد از ظهر است.");
      const prompt = toPersianDigits(`بر اساس این داده‌های بهره‌وری: "${sampleData}", سه بینش کلیدی به زبان فارسی ارائه بده که به کاربر کمک کند بهره‌وری خود را بهبود بخشد.`);
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: AI_MODEL_NAME,
        contents: prompt,
      });
      // Simple parsing, assuming insights are newline separated or a single block
      const insightsArray = response.text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
      setProductivityInsights(insightsArray.length > 0 ? insightsArray : [response.text]);
    } catch (error) {
      console.error("Error fetching productivity insights:", error);
      setProductivityInsights([toPersianDigits("خطا در دریافت بینش‌های بهره‌وری.")]);
    } finally {
      setIsFetchingProductivityInsights(false);
    }
  };

  const fetchHealthInsights = async () => {
    if (!ai) {
        setHealthInsights([toPersianDigits("سرویس هوش مصنوعی در دسترس نیست.")]);
        setIsFetchingHealthInsights(false);
        return;
    }
    setIsFetchingHealthInsights(true);
    setHealthInsights([]);
    try {
      // Simulate data for prompt
      const sampleData = toPersianDigits("داده‌های نمونه: کاربر به طور متوسط ۶ ساعت در شب می‌خوابد. در ۳ روز از ۷ روز گذشته ورزش کرده است (پیاده‌روی ۳۰ دقیقه‌ای). اغلب وعده صبحانه را حذف می‌کند.");
      const prompt = toPersianDigits(`بر اساس این داده‌های سلامتی: "${sampleData}", سه بینش یا توصیه کلیدی به زبان فارسی برای بهبود سلامت و تندرستی کاربر ارائه بده.`);
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: AI_MODEL_NAME,
        contents: prompt,
      });
      const insightsArray = response.text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
      setHealthInsights(insightsArray.length > 0 ? insightsArray : [response.text]);
    } catch (error) {
      console.error("Error fetching health insights:", error);
      setHealthInsights([toPersianDigits("خطا در دریافت بینش‌های سلامتی.")]);
    } finally {
      setIsFetchingHealthInsights(false);
    }
  };
  
  const reportTypes = [
    { value: 'productivity', label: toPersianDigits("بهره‌وری"), icon: <ChartPieIcon /> },
    { value: 'health', label: toPersianDigits("سلامت و تندرستی"), icon: <HeartIcon /> },
    { value: 'lessons', label: toPersianDigits("درس‌های آموخته‌شده"), icon: <LightbulbIcon /> },
    // Add more report types as needed
  ];

  return (
    <div className="page">
      <div className="flex items-center mb-6">
        <PageIcon className="w-7 h-7 text-indigo-600 mr-3" />
        <h1 className="text-2xl font-semibold text-gray-800">{toPersianDigits("گزارش‌ها و تحلیل‌ها")}</h1>
      </div>

      <div className="mb-6">
        <label htmlFor="reportTypeSelect" className="block text-sm font-medium text-gray-700 mb-1">{toPersianDigits("انتخاب نوع گزارش:")}</label>
        <select
          id="reportTypeSelect"
          value={selectedReportType}
          onChange={(e) => setSelectedReportType(e.target.value)}
          className="w-full p-2.5 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm text-gray-800"
        >
          {reportTypes.map(rt => <option key={rt.value} value={rt.value}>{rt.label}</option>)}
        </select>
      </div>

      {selectedReportType === 'productivity' && (
        <ReportSection
          title={toPersianDigits("تحلیل بهره‌وری")}
          icon={<ChartPieIcon />}
          insights={productivityInsights}
          onFetchInsights={fetchProductivityInsights}
          isFetchingInsights={isFetchingProductivityInsights}
        >
          <p className="text-xs text-gray-500 mb-3">{toPersianDigits("معیارهای عملکرد کلیدی، شناسایی گلوگاه‌ها و بینش‌های کارایی در اینجا نمایش داده می‌شوند.")}</p>
          <div className="h-48 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-sm border border-gray-200">
            {toPersianDigits("[نمودار تعاملی بهره‌وری]")}
          </div>
          <button className="mt-3 text-xs text-indigo-600 hover:underline">
            {toPersianDigits("مقایسه این هفته با هفته گذشته (شبیه‌سازی شده)")}
          </button>
        </ReportSection>
      )}

      {selectedReportType === 'health' && (
        <ReportSection
          title={toPersianDigits("بینش‌های سلامت و تندرستی")}
          icon={<HeartIcon />}
          insights={healthInsights}
          onFetchInsights={fetchHealthInsights}
          isFetchingInsights={isFetchingHealthInsights}
        >
          <p className="text-xs text-gray-500 mb-3">{toPersianDigits("روندهای کلیدی سلامت، پیشنهادات شخصی‌سازی شده و خلاصه‌ای از فعالیت‌ها در اینجا نمایش داده می‌شوند.")}</p>
           <div className="h-48 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-sm border border-gray-200">
            {toPersianDigits("[نمودار تعاملی روندهای سلامتی]")}
          </div>
        </ReportSection>
      )}
      
      {selectedReportType === 'lessons' && (
        <ReportSection title={toPersianDigits("لاگ درس‌های آموخته شده")} icon={<LightbulbIcon />}>
          {lessonsLearned.length > 0 ? (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {lessonsLearned.map((lesson, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-md border border-gray-200">
                  <p className="text-sm font-semibold text-gray-700">{toPersianDigits(`وظیفه: ${lesson.taskTitle}`)}</p>
                  <p className="text-xs text-gray-500 mb-1">{toPersianDigits(`تاریخ: ${new Date(lesson.reflectionDate).toLocaleDateString('fa-IR')}`)}</p>
                  {lesson.answers.map((ans, i) => (
                    <div key={i} className="mt-1">
                      <p className="text-xs font-medium text-gray-600">{toPersianDigits(ans.question)}</p>
                      <p className="text-xs text-gray-500 pl-2">{toPersianDigits(ans.answer)}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-500 text-center py-4">{toPersianDigits("هنوز هیچ درس آموخته شده‌ای ثبت نشده است.")}</p>
          )}
        </ReportSection>
      )}
      
      <div className="mt-8 text-center">
        <button className="bg-green-600 text-white font-medium py-2.5 px-6 rounded-lg hover:bg-green-700 transition-colors text-sm shadow disabled:opacity-50" disabled>
            <DocumentTextIcon className="w-4 h-4 inline mr-2" />
            {toPersianDigits("دانلود گزارش کامل (PDF) - غیرفعال")}
        </button>
      </div>
    </div>
  );
};

export default ReportsPage;
