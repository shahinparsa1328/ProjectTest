
import React from 'react';
import { toPersianDigits } from '@/utils';

const AcademicCapIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
  </svg>
);

const InfoListItemReasoning: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className="text-gray-300 text-sm leading-relaxed" }) => (
  <li className={`list-disc list-inside mr-4 ${className}`}>{children}</li> // Adjusted for RTL
);

const ReasoningEngineSection: React.FC = () => {
  const reasoningFrameworks = {
    cbr: toPersianDigits("استدلال مبتنی بر مورد (CBR): برای یافتن راه‌حل‌ها از یک پایگاه داده رو به رشد از سناریوهای موفق حل مسئله گذشته (مشکل، راه‌حل، نتیجه). هوش مصنوعی در ساختاردهی و افزودن موارد تأیید شده جدید کمک می‌کند."),
    ruleBased: toPersianDigits("استدلال مبتنی بر قانون: برای سناریوهایی با قوانین تعریف شده و منطق صریح (مثلاً 'اگر Task_X عقب افتاده است و Priority=High و User_Energy=Low، آنگاه پیشنهاد تجزیه Task_X به مراحل کوچکتر'). هوش مصنوعی به استخراج و رسمی‌سازی قوانین از بهترین شیوه‌ها و دانش تخصصی کمک می‌کند."),
    optimization: toPersianDigits("الگوریتم‌های بهینه‌سازی: الگوریتم‌های ژنتیک، برنامه‌نویسی محدودیت برای مسائل پیچیده مانند بهینه‌سازی برنامه روزانه بر اساس اولویت‌ها، سطح انرژی، مهلت‌ها و وابستگی‌ها."),
    hybrid: toPersianDigits("رویکردهای ترکیبی: ترکیب چارچوب‌ها در صورت نیاز؛ مثلاً CBR برای یافتن یک رویکرد اولیه، سپس منطق مبتنی بر قانون برای اصلاح آن، یا بهینه‌سازی برای تنظیم دقیق پارامترها.")
  };

  const knowledgeBaseStrategy = [
    toPersianDigits("هوش مصنوعی دانش را از متون تخصصی دامنه (مثلاً راهنماهای بهره‌وری، مقالات تندرستی) استخراج و به فرمت‌هایی مانند گراف‌های دانش (RDF/OWL) یا مجموعه‌های قوانین (JSON/YAML) ساختار می‌دهد."),
    toPersianDigits("هوش مصنوعی قوانین ضمنی را از داده‌های ناشناس و تجمیع شده کاربر که الگوهای موفق را نشان می‌دهند، یاد می‌گیرد (مثلاً کاربرانی که هفته خود را در روز یکشنبه برنامه‌ریزی می‌کنند، ۲۰٪ وظایف با اولویت بالا را بیشتر تکمیل می‌کنند)."),
    toPersianDigits("هوش مصنوعی مسئولانه: برای حوزه‌های حساس (سلامت، امور مالی)، قوانین تولید شده توسط هوش مصنوعی یا افزوده‌های گراف دانش نیاز به تأیید توسط متخصصان انسانی دارند. نقش هوش مصنوعی تسریع است، نه دیکته خودمختار دانش حیاتی.")
  ];
  
  const reasoningPipeline = {
    description: toPersianDigits("مشکل کاربر (از NLU/UI) -> نمایش مشکل و زمینه‌سازی -> انتخاب چارچوب استدلال -> پرس‌وجوی پایگاه دانش / اجرای الگوریتم -> تولید راه‌حل(ها) -> اولویت‌بندی و فیلتر کردن راه‌حل -> لایه هوش مصنوعی قابل توضیح (XAI) (توجیه راه‌حل) -> خروجی قالب‌بندی شده (به NLG/UI)."),
    apiEndpoint: "/api/reasoning/solve_problem",
    apiRequestExample: `{
  "problem_type": "procrastination",
  "details": "Struggling to start Project Y",
  "user_context": {"energy_level": "low", "current_tasks": [...]},
  "preferences": ["break_down_tasks"]
}`,
    apiResponseExample: `{
  "solutions": [{
    "id": "sol1",
    "description": "Break 'Project Y' into 3 smaller sub-tasks...",
    "rationale": "Based on similar past cases and your preference for task decomposition when energy is low.",
    "confidence": ${toPersianDigits("0.85")},
    "explanation_tree": {/* XAI output */}
  }],
  "status": "success"
}`
  };

  const xaiIntegration = [
    toPersianDigits("راه‌حل‌ها با توضیحات واضح و مختصر همراه خواهند بود که به قوانین، موارد یا الگوهای داده‌ای که منجر به پیشنهاد شده‌اند، بازمی‌گردند."),
    toPersianDigits("تجسم درخت‌های تصمیم‌گیری یا مسیرهای قانون در صورت امکان."),
    toPersianDigits("این امر اعتماد و درک کاربر را افزایش می‌دهد و به کاربران امکان می‌دهد در مورد فرآیند استدلال بازخورد ارائه دهند.")
  ];

  return (
    <section id="reasoning-engine-design" className="py-20 md:py-28 bg-slate-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-sky-500/10 rounded-full mb-4">
            <AcademicCapIcon className="w-12 h-12 text-sky-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-5">
            {toPersianDigits("فاز ۲.۴: طراحی موتور استدلال و حل مسئله")}
          </h2>
          <div className="section-title-underline"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-8">
            {toPersianDigits("طراحی شبیه‌سازی شده با کمک هوش مصنوعی برای موتوری که LifeOrchestrator AI را قادر می‌سازد موقعیت‌های پیچیده را تحلیل کند، راه‌حل ارائه دهد و از تصمیم‌گیری پشتیبانی کند.")}
          </p>
        </div>

        <div className="bg-slate-700/50 border border-slate-600 p-8 rounded-xl shadow-xl mb-12">
          <h3 className="text-xl md:text-2xl font-semibold text-sky-300 mb-6">{toPersianDigits("چارچوب‌ها و الگوریتم‌های استدلال پیشنهادی هوش مصنوعی")}</h3>
          <div className="space-y-5">
            <div>
              <h4 className="text-lg font-semibold text-sky-400 mb-1">{toPersianDigits("استدلال مبتنی بر مورد (CBR):")}</h4>
              <p className="text-gray-300 text-md leading-relaxed">{reasoningFrameworks.cbr}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-sky-400 mb-1">{toPersianDigits("استدلال مبتنی بر قانون:")}</h4>
              <p className="text-gray-300 text-md leading-relaxed">{reasoningFrameworks.ruleBased}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-sky-400 mb-1">{toPersianDigits("الگوریتم‌های بهینه‌سازی:")}</h4>
              <p className="text-gray-300 text-md leading-relaxed">{reasoningFrameworks.optimization}</p>
            </div>
             <div>
              <h4 className="text-lg font-semibold text-sky-400 mb-1">{toPersianDigits("رویکردهای ترکیبی:")}</h4>
              <p className="text-gray-300 text-md leading-relaxed">{reasoningFrameworks.hybrid}</p>
            </div>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-10 mb-12">
            <div className="bg-slate-700/50 border border-slate-600 p-8 rounded-xl shadow-xl">
                <h3 className="text-xl md:text-2xl font-semibold text-sky-300 mb-5">{toPersianDigits("تولید و مدیریت پایگاه دانش")}</h3>
                <ul className="space-y-3">
                {knowledgeBaseStrategy.map((item, index) => (
                    <InfoListItemReasoning key={index}>{item}</InfoListItemReasoning>
                ))}
                </ul>
            </div>
            <div className="bg-slate-700/50 border border-slate-600 p-8 rounded-xl shadow-xl">
                <h3 className="text-xl md:text-2xl font-semibold text-sky-300 mb-5">{toPersianDigits("ادغام هوش مصنوعی قابل توضیح (XAI)")}</h3>
                <ul className="space-y-3">
                {xaiIntegration.map((item, index) => (
                    <InfoListItemReasoning key={index}>{item}</InfoListItemReasoning>
                ))}
                </ul>
            </div>
        </div>

        <div className="bg-slate-700/50 border border-slate-600 p-8 rounded-xl shadow-xl mb-12">
          <h3 className="text-xl md:text-2xl font-semibold text-sky-300 mb-6 text-center">{toPersianDigits("خط لوله استدلال و مفهوم API")}</h3>
          <p className="text-gray-300 text-md mb-6 text-center leading-relaxed">{reasoningPipeline.description}</p>
          <div>
            <h4 className="text-lg font-semibold text-sky-400 mb-4 text-center">{toPersianDigits("تعامل API شبیه‌سازی شده (")}<code className="text-sky-300 bg-slate-600 px-2 py-1 rounded-md text-left" dir="ltr">{reasoningPipeline.apiEndpoint}</code>{toPersianDigits("):")}</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-md text-gray-200 mb-2">{toPersianDigits("درخواست نمونه (JSON ورودی):")}</p>
                <pre className="bg-slate-900 p-4 rounded-lg text-sm text-gray-300 overflow-x-auto text-left border border-slate-700" dir="ltr"><code>{reasoningPipeline.apiRequestExample}</code></pre>
              </div>
              <div>
                <p className="text-md text-gray-200 mb-2">{toPersianDigits("پاسخ نمونه (JSON خروجی):")}</p>
                <pre className="bg-slate-900 p-4 rounded-lg text-sm text-gray-300 overflow-x-auto text-left border border-slate-700" dir="ltr"><code>{reasoningPipeline.apiResponseExample}</code></pre>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-6 italic text-center">*{toPersianDigits("API تعامل با ماژول‌های مختلف استدلال را تسهیل می‌کند و اصول XAI را برای توجیه خروجی‌ها اعمال می‌کند.")}*</p>
          </div>
        </div>
        
        <p className="text-sm text-gray-400 mt-10 text-center">
          {toPersianDigits("خروجی‌های شبیه‌سازی شده: کد منبع مفهومی موتور استدلال (پایتون یا زبان مناسب دیگر)، پایگاه‌های دانش ساختاریافته (مثلاً RDF/OWL برای گراف‌های دانش، JSON/YAML برای مجموعه‌های قوانین)، مشخصات دقیق API (OpenAPI/Swagger) و تست‌های سناریو. هوش مصنوعی در تولید قانون، استخراج دانش، کد برای الگوریتم‌های استدلال و پیاده‌سازی اجزای XAI کمک می‌کند.")}
        </p>
      </div>
    </section>
  );
};

export default ReasoningEngineSection;
