
import React, { useState } from 'react';
import { toPersianDigits } from '../../utils';
import { 
    UserCircleIcon, 
    SparklesIconNav, 
    LightbulbIcon, 
    DatabaseIcon, 
    CheckCircleIcon, 
    ArrowRightIcon, 
    ChevronDownIcon,
    ChevronUpIcon,
    InformationCircleIcon 
} from '../shared/AppIcons';

interface DataFlowInfographicSectionProps {
  onShowXai: (title: string, explanation: string) => void;
}

const xaiDataFlowExplanations: Record<string, string> = {
  data_input_task_privacy: "داده‌هایی که شما مستقیماً وارد می‌کنید، اساس کار دستیار برای درک نیازهای شماست. این اطلاعات صرفاً برای ارائه خدمات مرتبط با همان ماژول (مثلاً وظایف) استفاده می‌شود مگر اینکه شما اجازه دسترسی گسترده‌تری را داده باشید.",
  nlp_processing_privacy: "هوش مصنوعی با پردازش متن ورودی شما، کلمات کلیدی، تاریخ‌ها و سایر اطلاعات مهم را استخراج می‌کند تا بتواند به درستی به درخواست شما پاسخ دهد. این پردازش به صورت محلی یا با استفاده از سرویس‌های امن انجام می‌شود.",
  ai_suggestion_task_privacy: "بر اساس تحلیل متن و الگوهای قبلی (در صورت فعال بودن شخصی‌سازی و دسترسی به داده‌های مرتبط)، هوش مصنوعی سعی می‌کند بهترین اولویت یا دسته‌بندی را برای وظیفه شما پیشنهاد دهد. شفافیت در مورد اینکه کدام داده‌ها برای این پیشنهاد استفاده شده‌اند، از طریق بخش کنترل داده‌ها قابل مشاهده است.",
  data_storage_task_privacy: "اطلاعات وظایف شما به صورت امن در سرورهای ما یا به صورت محلی (بسته به تنظیمات) ذخیره می‌شود تا بتوانید در آینده به آن‌ها دسترسی داشته باشید و پیشرفت خود را پیگیری کنید. شما همواره کنترل کاملی بر روی داده‌های ذخیره شده خود دارید."
};

interface FlowStep {
  id: string;
  step: number;
  title: string;
  shortDescription: string;
  icon: React.ReactElement<{ className?: string; }>; // Corrected type
  dataUsed: string;
  aiProcessing?: string;
  userBenefit: string;
  xaiKey: string;
}

const DataFlowInfographicSection: React.FC<DataFlowInfographicSectionProps> = ({ onShowXai }) => {
  const [expandedStepId, setExpandedStepId] = useState<string | null>(null);

  const exampleFlow: FlowStep[] = [
    { 
      id: 'step1', step: 1, title: "ورود داده توسط شما", 
      shortDescription: "شما یک وظیفه را وارد می‌کنید.",
      icon: <UserCircleIcon className="w-7 h-7 text-blue-600" />, 
      dataUsed: "عنوان وظیفه، توضیحات (اختیاری)، تاریخ سررسید (اختیاری)",
      userBenefit: "ثبت و یادآوری کارها.",
      xaiKey: "data_input_task_privacy" 
    },
    { 
      id: 'step2', step: 2, title: "پردازش زبان طبیعی (NLP)", 
      shortDescription: "AI متن وظیفه را برای درک بهتر تحلیل می‌کند.",
      icon: <SparklesIconNav className="w-7 h-7 text-purple-600" />, 
      dataUsed: "متن عنوان و توضیحات وظیفه",
      aiProcessing: "شناسایی کلمات کلیدی، تاریخ‌ها، موجودیت‌ها.",
      userBenefit: "درک دقیق‌تر درخواست شما توسط AI.",
      xaiKey: "nlp_processing_privacy" 
    },
    { 
      id: 'step3', step: 3, title: "پیشنهاد هوشمند AI", 
      shortDescription: "AI اولویت و دسته‌بندی پیشنهادی ارائه می‌دهد.",
      icon: <LightbulbIcon className="w-7 h-7 text-yellow-500" />, 
      dataUsed: "نتیجه پردازش NLP، تاریخچه وظایف مشابه (اختیاری)، اهداف مرتبط (اختیاری)",
      aiProcessing: "مقایسه با الگوها، تحلیل فوریت و اهمیت.",
      userBenefit: "کمک به سازماندهی و اولویت‌بندی موثرتر.",
      xaiKey: "ai_suggestion_task_privacy" 
    },
    { 
      id: 'step4', step: 4, title: "ذخیره‌سازی و اقدام", 
      shortDescription: "وظیفه ذخیره و یادآوری تنظیم می‌شود.",
      icon: <DatabaseIcon className="w-7 h-7 text-green-600" />, 
      dataUsed: "کل اطلاعات وظیفه (عنوان، تاریخ، اولویت، دسته و ...)",
      userBenefit: "اطمینان از ثبت وظیفه و دریافت یادآوری در زمان مناسب.",
      xaiKey: "data_storage_task_privacy" 
    }
  ];

  const toggleStepDetails = (stepId: string) => {
    setExpandedStepId(prevId => prevId === stepId ? null : stepId);
  };

  return (
    <div className="bg-gray-50 p-3 sm:p-4 rounded-xl border border-gray-200 shadow-lg">
      <h4 className="text-sm sm:text-md font-semibold text-gray-800 mb-2 flex items-center">
        <InformationCircleIcon className="w-5 h-5 text-sky-600 mr-2 rtl:ml-2 rtl:mr-0" />
        {toPersianDigits("نمایش تعاملی جریان داده")}
      </h4>
      <p className="text-xs text-gray-600 mb-5 leading-relaxed">
        {toPersianDigits("در این بخش، به صورت شفاف و تعاملی نشان داده می‌شود که چگونه داده‌های شما در یک فرآیند نمونه (مثلاً ایجاد یک وظیفه) توسط دستیار هوشمند پردازش و استفاده می‌شود. روی هر مرحله کلیک کنید تا جزئیات بیشتری را مشاهده نمایید.")}
      </p>
      
      <div className="space-y-0"> {/* Removed space-y-3 to control spacing with arrows */}
        {exampleFlow.map((item, index) => (
          <React.Fragment key={item.id}>
            <div className="bg-white rounded-lg shadow-md border border-gray-200/80 overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <button
                onClick={() => toggleStepDetails(item.id)}
                className="w-full flex items-center justify-between p-3 text-right hover:bg-sky-50/50 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-300"
                aria-expanded={expandedStepId === item.id}
                aria-controls={`step-details-${item.id}`}
              >
                <div className="flex items-center">
                  <div className={`p-2 rounded-full mr-2.5 rtl:ml-2.5 rtl:mr-0 transition-transform duration-300 ${expandedStepId === item.id ? 'bg-sky-100 scale-110' : 'bg-gray-100'}`}>
                    {React.cloneElement(item.icon, { className: `w-6 h-6` })}
                  </div>
                  <div className="text-xs sm:text-sm">
                    <span className="font-semibold text-sky-700">{toPersianDigits(`${item.step}. ${item.title}`)}</span>
                    <p className="text-gray-500 text-[11px] sm:text-xs">{toPersianDigits(item.shortDescription)}</p>
                  </div>
                </div>
                {expandedStepId === item.id ? <ChevronUpIcon className="w-5 h-5 text-sky-600"/> : <ChevronDownIcon className="w-5 h-5 text-gray-500"/>}
              </button>

              {expandedStepId === item.id && (
                <div id={`step-details-${item.id}`} className="p-3.5 border-t border-gray-200 bg-sky-50/30 text-xs animate-fadeIn">
                  <p className="mb-1.5 text-gray-700"><strong>{toPersianDigits("داده‌های درگیر:")}</strong> {toPersianDigits(item.dataUsed)}</p>
                  {item.aiProcessing && <p className="mb-1.5 text-gray-700"><strong>{toPersianDigits("پردازش AI:")}</strong> {toPersianDigits(item.aiProcessing)}</p>}
                  <p className="mb-2.5 text-gray-700"><strong>{toPersianDigits("فایده برای شما:")}</strong> {toPersianDigits(item.userBenefit)}</p>
                  <button 
                    onClick={() => onShowXai(toPersianDigits(item.title), xaiDataFlowExplanations[item.xaiKey] || toPersianDigits("توضیحات تکمیلی در دسترس نیست."))}
                    className="text-[10px] text-sky-700 hover:text-sky-800 hover:underline font-medium flex items-center bg-sky-100 hover:bg-sky-200 px-2 py-1 rounded-md transition-colors"
                    aria-label={toPersianDigits(`توضیح بیشتر برای ${item.title}`)}
                  >
                      <LightbulbIcon className="w-3.5 h-3.5 ml-1 rtl:mr-1 rtl:ml-0"/>
                      {toPersianDigits("چگونه و چرا؟ (XAI)")}
                  </button>
                </div>
              )}
            </div>
            
            {index < exampleFlow.length - 1 && (
              <div className="flex justify-center my-2"> {/* Spacing for arrow */}
                <ArrowRightIcon className="w-5 h-5 text-gray-400 transform rotate-90" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
       <p className="text-[10px] text-gray-500 mt-4 text-center italic">
        {toPersianDigits("این یک نمایش ساده شده از یک جریان داده نمونه است. جریان واقعی داده‌ها ممکن است بسته به ویژگی و تنظیمات شما متفاوت باشد.")}
      </p>
    </div>
  );
};

export default DataFlowInfographicSection;
