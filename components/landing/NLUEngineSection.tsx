
import React from 'react';
import { toPersianDigits } from '@/utils'; 
import { ChatBubbleBottomCenterTextIcon } from '@/shared/AppIcons'; 

const InfoListItemNLU: React.FC<{ title?: string; children: React.ReactNode; className?: string }> = ({ title, children, className = "text-gray-300 text-sm leading-relaxed" }) => (
  <li className={`list-disc list-inside mr-4 ${className}`}> {/* Adjusted for RTL */}
    {title && <strong className="text-sky-400 font-semibold">{title}: </strong>}
    {children}
  </li>
);

const NLUEngineSection: React.FC = () => {
  const nluCapabilities = [
    { title: toPersianDigits("تشخیص قصد (Intent Recognition)"), description: toPersianDigits("درک هدف کاربر از ورودی متنی/صوتی (مثلاً «ایجاد وظیفه»، «یادآوری تنظیم کن»، «به من یک واقعیت جالب بگو»). استفاده از مدل‌های طبقه‌بندی متن.") },
    { title: toPersianDigits("استخراج موجودیت (Entity Extraction)"), description: toPersianDigits("شناسایی و استخراج اطلاعات کلیدی از ورودی کاربر (مثلاً نام وظیفه، تاریخ سررسید، مکان، اولویت). استفاده از مدل‌های NER (تشخیص موجودیت نامگذاری شده).") },
    { title: toPersianDigits("تحلیل احساسات (Sentiment Analysis)"), description: toPersianDigits("تشخیص احساسات کاربر (مثلاً خوشحال، ناراحت، خنثی) از ورودی برای پاسخ‌های همدلانه و آگاه از زمینه.") },
    { title: toPersianDigits("رفع ابهام (Disambiguation)"), description: toPersianDigits("هوش مصنوعی در صورت مبهم بودن ورودی کاربر، سوالات شفاف‌کننده می‌پرسد.") },
    { title: toPersianDigits("مدیریت گفتگو و زمینه (Context & Dialogue Management)"), description: toPersianDigits("پیگیری زمینه گفتگو برای امکان تعاملات چند نوبتی و درک مراجع قبلی.") },
  ];
  
  const nluPipeline = {
    description: toPersianDigits("ورودی کاربر (متن/صوت) -> پیش‌پردازش (پاکسازی، توکنیزه کردن) -> تشخیص قصد -> استخراج موجودیت -> تحلیل احساسات -> رفع ابهام -> مدیریت زمینه -> خروجی داده‌های ساختاریافته (برای موتورهای دیگر)."),
    apiEndpoint: "/api/nlu/process",
    apiRequestExample: `{ "text": "${toPersianDigits("فردا ساعت ۳ بعد از ظهر یک جلسه با تیم بازاریابی تنظیم کن")}", "user_id": "uuid", "context_id": "uuid" }`,
    apiResponseExample: `{
  "intent": "CREATE_MEETING",
  "entities": [
    { "type": "DATE", "value": "${toPersianDigits("فردا")}", "text": "${toPersianDigits("فردا")}" },
    { "type": "TIME", "value": "${toPersianDigits("15:00")}", "text": "${toPersianDigits("ساعت ۳ بعد از ظهر")}" },
    { "type": "EVENT_NAME", "value": "${toPersianDigits("جلسه با تیم بازاریابی")}", "text": "${toPersianDigits("جلسه با تیم بازاریابی")}" }
  ],
  "sentiment": "neutral",
  "confidence_scores": { "intent": ${toPersianDigits("0.92")}, "entities": { /* ... */ } }
}`
  };

  const challengesAndSolutions = [
    { challenge: toPersianDigits("ابهام در زبان طبیعی"), solution: toPersianDigits("الگوریتم‌های رفع ابهام، درخواست شفاف‌سازی از کاربر، آموزش مدل بر روی داده‌های متنوع.") },
    { challenge: toPersianDigits("تنوع لهجه‌ها و زبان‌های محاوره‌ای"), solution: toPersianDigits("استفاده از مدل‌های آموزش دیده روی داده‌های زبانی گسترده فارسی، قابلیت تنظیم دقیق (fine-tuning) برای لهجه‌های خاص در صورت نیاز.") },
    { challenge: toPersianDigits("مدیریت زمینه پیچیده"), solution: toPersianDigits("استفاده از مدل‌های مدیریت گفتگوی پیشرفته، ذخیره و بازیابی زمینه کارآمد.") },
    { challenge: toPersianDigits("نیاز به داده‌های آموزشی با کیفیت بالا (به ویژه برای فارسی)"), solution: toPersianDigits("ایجاد مجموعه‌داده‌های سفارشی، تکنیک‌های افزایش داده، استفاده از یادگیری انتقالی (transfer learning) از مدل‌های چندزبانه بزرگ.") }
  ];

  return (
    <section id="nlu-engine-design" className="py-20 md:py-28 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-sky-500/10 rounded-full mb-4">
            <ChatBubbleBottomCenterTextIcon className="w-12 h-12 text-sky-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-5">
            {toPersianDigits("فاز ۲.۱: طراحی موتور درک زبان طبیعی (NLU)")}
          </h2>
          <div className="section-title-underline"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-8">
            {toPersianDigits("طراحی شبیه‌سازی شده با کمک هوش مصنوعی برای موتور NLU که به LifeOrchestrator AI امکان می‌دهد ورودی‌های متنی و گفتاری کاربر را به طور دقیق درک کند.")}
          </p>
        </div>

        <div className="bg-slate-800 p-8 rounded-xl shadow-xl border border-slate-700 mb-12">
          <h3 className="text-xl md:text-2xl font-semibold text-sky-300 mb-6">{toPersianDigits("قابلیت‌های کلیدی موتور NLU (پیشنهادی توسط هوش مصنوعی)")}</h3>
          <ul className="space-y-4">
            {nluCapabilities.map((cap, index) => (
              <InfoListItemNLU key={index} title={cap.title}>{cap.description}</InfoListItemNLU>
            ))}
          </ul>
        </div>
        
        <div className="bg-slate-800 p-8 rounded-xl shadow-xl border border-slate-700 mb-12">
          <h3 className="text-xl md:text-2xl font-semibold text-sky-300 mb-6 text-center">{toPersianDigits("خط لوله پردازش NLU و مفهوم API")}</h3>
          <p className="text-gray-300 text-md mb-6 text-center leading-relaxed">{nluPipeline.description}</p>
          <div>
            <h4 className="text-lg font-semibold text-sky-400 mb-4 text-center">{toPersianDigits("تعامل API شبیه‌سازی شده (")}<code className="text-sky-300 bg-slate-600 px-2 py-1 rounded-md text-left" dir="ltr">{nluPipeline.apiEndpoint}</code>{toPersianDigits("):")}</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-md text-gray-200 mb-2">{toPersianDigits("درخواست نمونه (JSON ورودی):")}</p>
                <pre className="bg-slate-900 p-4 rounded-lg text-sm text-gray-300 overflow-x-auto text-left border border-slate-700" dir="ltr"><code>{nluPipeline.apiRequestExample}</code></pre>
              </div>
              <div>
                <p className="text-md text-gray-200 mb-2">{toPersianDigits("پاسخ نمونه (JSON خروجی):")}</p>
                <pre className="bg-slate-900 p-4 rounded-lg text-sm text-gray-300 overflow-x-auto text-left border border-slate-700" dir="ltr"><code>{nluPipeline.apiResponseExample}</code></pre>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-6 italic text-center">*{toPersianDigits("API واقعی شامل احراز هویت، نسخه‌بندی و مدیریت خطا خواهد بود. هوش مصنوعی می‌تواند به تولید مشتریان API (مثلاً کلاینت‌های Python/JavaScript) و مستندات Swagger/OpenAPI کمک کند.")}*</p>
          </div>
        </div>
        
        <div className="bg-slate-800 p-8 rounded-xl shadow-xl border border-slate-700">
          <h3 className="text-xl md:text-2xl font-semibold text-sky-300 mb-6 text-center">{toPersianDigits("چالش‌ها و راه‌حل‌های پیشنهادی هوش مصنوعی برای زبان فارسی")}</h3>
          <ul className="space-y-4">
            {challengesAndSolutions.map((item, index) => (
              <li key={index} className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                <p className="text-md font-semibold text-sky-400 mb-1">{toPersianDigits("چالش: ")}{item.challenge}</p>
                <p className="text-sm text-gray-300">{toPersianDigits("راه‌حل پیشنهادی هوش مصنوعی: ")}{item.solution}</p>
              </li>
            ))}
          </ul>
        </div>
        
        <p className="text-sm text-gray-400 mt-10 text-center">
          {toPersianDigits("خروجی‌های شبیه‌سازی شده: معماری دقیق موتور NLU، مدل‌های آموزش دیده یا تنظیم دقیق شده (به ویژه برای زبان فارسی)، مشخصات دقیق API (OpenAPI/Swagger)، و مجموعه‌ای جامع از موارد آزمایشی برای تأیید عملکرد. هوش مصنوعی در انتخاب مدل، پیش‌پردازش داده‌ها، تولید کد برای خطوط لوله و موارد آزمایشی کمک می‌کند.")}
        </p>
      </div>
    </section>
  );
};

export default NLUEngineSection;
