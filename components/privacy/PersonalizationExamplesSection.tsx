
import React, { useState } from 'react';
import { toPersianDigits } from '../../utils';
import { AdjustmentsVerticalIcon, LightbulbIcon, EyeIcon, EyeSlashIcon, SparklesIconNav, ListIcon, AcademicCapIcon } from '../shared/AppIcons';

interface PersonalizationExamplesSectionProps {
  onShowXai: (title: string, explanation: string) => void;
}

interface ExampleData {
  id: string;
  title: string;
  settingDescription: string; // Description of the setting being toggled
  dataUsed: string;
  xaiKey: string;
  xaiTitle: string;
  // Generic state for before personalization
  beforeState: {
    uiRepresentation: React.ReactNode; // JSX to represent the UI
    explanation: string;
  };
  // Personalized state for after personalization
  afterState: {
    uiRepresentation: React.ReactNode; // JSX to represent the UI
    explanation: string;
  };
}

const xaiPersonalizationExplanations: Record<string, string> = {
  task_priority_xai: "با دسترسی به تاریخچه وظایف و الگوهای بهره‌وری شما، هوش مصنوعی می‌تواند وظایفی که به سررسید نزدیک‌تر هستند یا با زمان اوج تمرکز شما همخوانی دارند را در اولویت بالاتری قرار دهد. این به شما کمک می‌کند تا کارهای مهم را به موقع انجام دهید.",
  learning_recommendation_xai: "هوش مصنوعی با تحلیل اهداف و علاقه‌مندی‌های یادگیری ثبت شده شما، و همچنین مسیرها یا محتواهایی که قبلاً مشاهده کرده‌اید، می‌تواند منابع آموزشی جدیدی را پیشنهاد دهد که به احتمال زیاد برای شما مفید و جالب خواهند بود.",
  // Add more XAI keys if new examples are created
};

const initialExamplesData: ExampleData[] = [
  {
    id: 'ex1_privacy_interactive',
    title: "اولویت‌بندی هوشمند وظایف",
    settingDescription: "فعال‌سازی اولویت‌بندی وظایف با هوش مصنوعی",
    dataUsed: "تاریخچه وظایف، تاریخ سررسید، الگوهای بهره‌وری",
    xaiKey: "task_priority_xai",
    xaiTitle: "اولویت‌بندی وظایف با AI",
    beforeState: {
      uiRepresentation: (
        <div className="space-y-1.5 text-xs">
          <div className="p-1.5 bg-gray-200 rounded">{toPersianDigits("وظیفه ۱: پاسخ به ایمیل‌ها (متوسط)")}</div>
          <div className="p-1.5 bg-gray-200 rounded">{toPersianDigits("وظیفه ۲: تهیه گزارش فروش (بالا)")}</div>
          <div className="p-1.5 bg-gray-200 rounded">{toPersianDigits("وظیفه ۳: برنامه‌ریزی جلسه (پایین)")}</div>
        </div>
      ),
      explanation: "وظایف به ترتیب ورود یا اولویت دستی شما نمایش داده می‌شوند.",
    },
    afterState: {
      uiRepresentation: (
        <div className="space-y-1.5 text-xs">
          <div className="p-1.5 bg-green-200 rounded animate-fadeIn">{toPersianDigits("وظیفه ۲: تهیه گزارش فروش (بالا) - AI: سررسید نزدیک!")}</div>
          <div className="p-1.5 bg-green-100 rounded">{toPersianDigits("وظیفه ۱: پاسخ به ایمیل‌ها (متوسط)")}</div>
          <div className="p-1.5 bg-green-100 rounded">{toPersianDigits("وظیفه ۳: برنامه‌ریزی جلسه (پایین)")}</div>
        </div>
      ),
      explanation: "وظیفه 'تهیه گزارش فروش' به دلیل سررسید نزدیک و اهمیت بالا، توسط AI در اولویت قرار گرفته است.",
    },
  },
  {
    id: 'ex2_privacy_interactive',
    title: "پیشنهاد محتوای یادگیری مرتبط",
    settingDescription: "فعال‌سازی پیشنهادات یادگیری شخصی‌سازی شده",
    dataUsed: "علاقه‌مندی‌های یادگیری، اهداف، تاریخچه مشاهده",
    xaiKey: "learning_recommendation_xai",
    xaiTitle: "پیشنهاد یادگیری با AI",
    beforeState: {
      uiRepresentation: (
        <div className="space-y-1.5 text-xs">
          <div className="p-1.5 bg-gray-200 rounded flex items-center"><AcademicCapIcon className="w-3 h-3 ml-1" /> {toPersianDigits("دوره عمومی مدیریت پروژه")}</div>
          <div className="p-1.5 bg-gray-200 rounded flex items-center"><AcademicCapIcon className="w-3 h-3 ml-1" /> {toPersianDigits("مقدمه‌ای بر بازاریابی دیجیتال")}</div>
        </div>
      ),
      explanation: "لیست عمومی از دوره‌های محبوب نمایش داده می‌شود.",
    },
    afterState: {
      uiRepresentation: (
        <div className="space-y-1.5 text-xs">
          <div className="p-1.5 bg-green-200 rounded flex items-center animate-fadeIn"><SparklesIconNav className="w-3 h-3 ml-1 text-yellow-500" /> {toPersianDigits("مسیر یادگیری فریمورک جنگو (پیشنهاد AI)")}</div>
          <div className="p-1.5 bg-green-100 rounded flex items-center"><AcademicCapIcon className="w-3 h-3 ml-1" /> {toPersianDigits("دوره پیشرفته پایتون")}</div>
        </div>
      ),
      explanation: "با توجه به علاقه شما به 'برنامه‌نویسی پایتون'، مسیر یادگیری 'جنگو' توسط AI پیشنهاد شده است.",
    },
  },
];

const PersonalizationExamplesSection: React.FC<PersonalizationExamplesSectionProps> = ({ onShowXai }) => {
  const [exampleSettings, setExampleSettings] = useState<Record<string, boolean>>(
    initialExamplesData.reduce((acc, ex) => ({ ...acc, [ex.id]: false }), {})
  );

  const toggleExampleSetting = (exampleId: string) => {
    setExampleSettings(prev => ({ ...prev, [exampleId]: !prev[exampleId] }));
  };

  return (
    <div className="mt-4 bg-gray-50 p-3 sm:p-4 rounded-xl border border-gray-200 shadow-lg">
      <h4 className="text-sm sm:text-md font-semibold text-gray-800 mb-2 flex items-center">
        <AdjustmentsVerticalIcon className="w-5 h-5 text-sky-600 mr-2 rtl:ml-2 rtl:mr-0" />
        {toPersianDigits("نمونه‌های تأثیر تنظیمات شخصی‌سازی")}
      </h4>
      <p className="text-xs text-gray-600 mb-5 leading-relaxed">
        {toPersianDigits("در این بخش، به صورت تعاملی مشاهده کنید که چگونه فعال/غیرفعال کردن برخی تنظیمات داده، تجربه شما را در اپلیکیشن تغییر می‌دهد.")}
      </p>
      
      <div className="space-y-6">
        {initialExamplesData.map(ex => {
          const isPersonalizationActive = exampleSettings[ex.id];
          const currentState = isPersonalizationActive ? ex.afterState : ex.beforeState;

          return (
            <div key={ex.id} className="p-3 bg-white rounded-lg shadow-md border border-gray-200/80">
              <h5 className="text-sm font-semibold text-sky-700 mb-1">{toPersianDigits(ex.title)}</h5>
              <p className="text-xs text-gray-500 mb-2">{toPersianDigits(`داده‌های موثر: ${ex.dataUsed}`)}</p>

              {/* Simulated Toggle */}
              <div className="flex items-center justify-between my-3 p-2 bg-sky-50 rounded-md border border-sky-200">
                <span className="text-xs font-medium text-sky-700">{toPersianDigits(ex.settingDescription)}</span>
                <button
                  onClick={() => toggleExampleSetting(ex.id)}
                  className={`relative inline-flex items-center h-5 rounded-full w-9 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-1 ${
                    isPersonalizationActive ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                  aria-checked={isPersonalizationActive}
                  role="switch"
                >
                  <span
                    className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                      isPersonalizationActive ? 'translate-x-4 rtl:-translate-x-4' : 'translate-x-0.5 rtl:-translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
              
              <div className="grid grid-cols-1 gap-3 text-xs">
                {/* "After Personalization" State (Dynamic based on toggle) */}
                <div className={`p-2.5 rounded-md border transition-all duration-300 ease-in-out ${isPersonalizationActive ? 'border-green-300 bg-green-50 shadow-sm' : 'border-red-300 bg-red-50 shadow-sm'}`}>
                  <strong className={`block mb-1.5 flex items-center ${isPersonalizationActive ? 'text-green-700' : 'text-red-700'}`}>
                    {isPersonalizationActive ? <EyeIcon className="w-3.5 h-3.5 ml-1 rtl:mr-1 rtl:ml-0" /> : <EyeSlashIcon className="w-3.5 h-3.5 ml-1 rtl:mr-1 rtl:ml-0" />}
                    {toPersianDigits(isPersonalizationActive ? "با شخصی‌سازی (داده فعال):" : "بدون شخصی‌سازی (داده غیرفعال):")}
                  </strong>
                  <div className="min-h-[50px]">
                    {currentState.uiRepresentation}
                  </div>
                  <p className="text-gray-600 text-[10px] mt-1.5 leading-relaxed">{toPersianDigits(currentState.explanation)}</p>
                </div>
              </div>

              <button 
                onClick={() => onShowXai(toPersianDigits(ex.xaiTitle), xaiPersonalizationExplanations[ex.xaiKey] || toPersianDigits("توضیحات تکمیلی در دسترس نیست."))}
                className="text-[10px] text-sky-700 hover:text-sky-800 hover:underline font-medium flex items-center bg-sky-100 hover:bg-sky-200 px-2 py-1 rounded-md transition-colors mt-3"
                aria-label={toPersianDigits(`توضیح برای ${ex.title}`)}
              >
                  <LightbulbIcon className="w-3.5 h-3.5 ml-1 rtl:mr-1 rtl:ml-0"/>
                  {toPersianDigits("چگونه و چرا؟ (XAI)")}
              </button>
            </div>
          );
        })}
      </div>
      <p className="text-[10px] text-gray-500 mt-4 text-center italic">
        {toPersianDigits("توجه: این نمایش‌ها شبیه‌سازی شده‌اند تا تأثیر تنظیمات داده بر تجربه شما را نشان دهند. رفتار واقعی ممکن است بر اساس داده‌های واقعی و الگوریتم‌های پیچیده‌تر متفاوت باشد.")}
      </p>
    </div>
  );
};

export default PersonalizationExamplesSection;

