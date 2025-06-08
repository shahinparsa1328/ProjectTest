
import React from 'react';
import { toPersianDigits } from '../../utils';

const ClipboardDocumentCheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6A2.25 2.25 0 008.25 8.25V10.5a2.25 2.25 0 002.25 2.25h1.5A2.25 2.25 0 0014.25 10.5V8.25A2.25 2.25 0 0012 6h-1.5Zm0 0V3.75m0 2.25H3.375m7.125 0c.136.01.273.014.409.014a2.373 2.373 0 012.36 2.329V10.5A2.373 2.373 0 0112.41 12.84c-.136.004-.273.008-.409.008H8.25a2.373 2.373 0 01-2.36-2.33V8.25a2.373 2.373 0 012.36-2.329c.136-.004.273-.008.409-.008h1.84Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 4.5c-1.897 0-3.64.767-4.888 2.014M15.362 5.214C15.94 5.594 16.5 6 17.096 6c.68 0 1.217-.429 1.513-.976" />
  </svg>
);

const InfoListItemGPT: React.FC<{ title?: string; children: React.ReactNode; className?: string }> = ({ title, children, className = "text-gray-300 text-md leading-relaxed" }) => (
  <li className={`list-disc list-inside mr-4 ${className}`}> {/* Adjusted for RTL */}
    {title && <strong className="text-sky-400 font-semibold">{title}: </strong>}
    {children}
  </li>
);

const SectionBlockGPT: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className = "bg-slate-800 p-8 rounded-xl shadow-xl border border-slate-700" }) => (
    <div className={className}>
        <h3 className="text-xl md:text-2xl font-semibold text-sky-300 mb-5">{title}</h3>
        {children}
    </div>
);

const GoalProjectTaskSection: React.FC = () => {
  const crudOps = [
    { title: toPersianDigits("شماهای پایگاه داده"), description: toPersianDigits("هوش مصنوعی شماهایی برای اهداف (OKRها، ویژگی‌های SMART، وضعیت)، پروژه‌ها (هدف_مرتبط، مهلت‌ها)، وظایف (وابستگی‌ها، اولویت، زمان_تخمینی) در PostgreSQL/MongoDB تولید می‌کند.") },
    { title: toPersianDigits("منطق بک‌اند"), description: toPersianDigits("کد Python/FastAPI برای APIهای CRUD (ایجاد، خواندن، به‌روزرسانی، حذف) با اعتبارسنجی سمت سرور برای یکپارچگی داده‌ها.") }
  ];

  const goalFrameworks = [
    { title: toPersianDigits("OKRها (اهداف و نتایج کلیدی)"), description: toPersianDigits("رابط کاربری (React) کاربران را برای تعریف اهداف بلندپروازانه و نتایج کلیدی قابل اندازه‌گیری راهنمایی می‌کند. هوش مصنوعی مثال‌ها و کمک در فرمول‌بندی ارائه می‌دهد.") },
    { title: toPersianDigits("اهداف SMART"), description: toPersianDigits("رابط کاربری تعاملی و ابزارهای اعتبارسنجی اطمینان حاصل می‌کنند که اهداف خاص، قابل اندازه‌گیری، قابل دستیابی، مرتبط و زمان‌بندی شده باشند. هوش مصنوعی تجزیه اهداف بزرگ را پیشنهاد می‌دهد.") }
  ];

  const taskPrioritization = [
    toPersianDigits("الگوریتم‌های ML ویژگی‌های وظیفه (تاریخ سررسید، اهمیت، فوریت)، الگوهای بهره‌وری تاریخی کاربر، زمان‌های اوج تمرکز (از داده‌های سنسور/ورودی)، زمان آزاد تقویم را در نظر می‌گیرند."),
    toPersianDigits("به‌روزرسانی‌های اولویت بلادرنگ با توضیحات XAI (مثلاً 'وظیفه X به دلیل نزدیک شدن به مهلت و همسویی با زمان اوج تمرکز شما در اولویت قرار دارد').")
  ];

  const taskPlanning = [
    toPersianDigits("موتور هوش مصنوعی تقویم کاربر (با رضایت) را برای تعهدات و زمان‌های آزاد تحلیل می‌کند."),
    toPersianDigits("سطح انرژی/تمرکز کاربر را در طول روز با استفاده از مدل‌های ML پیش‌بینی می‌کند."),
    toPersianDigits("از الگوریتم‌های بهینه‌سازی (مثلاً رضایت از محدودیت) برای پیشنهاد جایگذاری بهینه وظایف، با در نظر گرفتن پیچیدگی وظیفه، مدت زمان و وضعیت کاربر استفاده می‌کند."),
    toPersianDigits("پیشنهادات انعطاف‌پذیر: کاربر می‌تواند بپذیرد، رد کند یا تغییر دهد.")
  ];
  
  const productivityDashboards = [
    toPersianDigits("مفاهیم UI (React، با استفاده از Recharts/Chart.js) برای داشبوردهای بصری: پیشرفت هدف، زمان صرف شده برای پروژه‌ها، نرخ تکمیل وظایف، الگوهای بهره‌وری."),
    toPersianDigits("سفارشی‌سازی KPI با کشیدن و رها کردن توسط کاربر."),
    toPersianDigits("بخش 'بینش‌های هوش مصنوعی': تحلیل عمیق بهره‌وری، نقاط قوت، ضعف‌ها و پیشنهادات عملی بهبود (مثلاً 'شما وظایف خلاقانه را ۲۵٪ سریعتر در صبح‌ها تکمیل می‌کنید').")
  ];

  return (
    <section id="goal-task-management" className="py-20 md:py-28 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-sky-500/10 rounded-full mb-4">
            <ClipboardDocumentCheckIcon className="w-12 h-12 text-sky-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-5">
            {toPersianDigits("فاز ۳.۲: ارکستراسیون اهداف، پروژه‌ها و وظایف")}
          </h2>
          <div className="section-title-underline"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-8">
            {toPersianDigits("توسعه شبیه‌سازی شده قابلیت‌های قوی برای تعریف هدف، مدیریت پروژه و ارکستراسیون وظایف روزانه مبتنی بر هوش مصنوعی.")}
          </p>
        </div>

        <div className="space-y-12">
          <SectionBlockGPT title={toPersianDigits("عملیات CRUD برای اهداف، پروژه‌ها، وظایف")}>
            <ul className="space-y-4">
              {crudOps.map((item, index) => (
                <InfoListItemGPT key={index} title={item.title}>{item.description}</InfoListItemGPT>
              ))}
            </ul>
          </SectionBlockGPT>

          <SectionBlockGPT title={toPersianDigits("چارچوب‌های تعریف هدف (OKRها و SMART)")}>
            <ul className="space-y-4">
              {goalFrameworks.map((item, index) => (
                <InfoListItemGPT key={index} title={item.title}>{item.description}</InfoListItemGPT>
              ))}
            </ul>
          </SectionBlockGPT>

          <SectionBlockGPT title={toPersianDigits("موتور اولویت‌بندی وظایف پویا و تطبیقی")}>
            <ul className="space-y-4">
              {taskPrioritization.map((item, index) => (
                <InfoListItemGPT key={index}>{item}</InfoListItemGPT>
              ))}
            </ul>
             <p className="text-sm text-gray-500 mt-4 italic">*{toPersianDigits("هوش مصنوعی مدل‌های ML پیچیده را پیاده‌سازی می‌کند و دلایل قابل توضیح برای انتخاب‌های اولویت‌بندی ارائه می‌دهد.")}*</p>
          </SectionBlockGPT>
          
          <SectionBlockGPT title={toPersianDigits("برنامه‌ریزی هوشمند وظایف و زمان‌بندی تقویم")}>
            <ul className="space-y-4">
              {taskPlanning.map((item, index) => (
                <InfoListItemGPT key={index}>{item}</InfoListItemGPT>
              ))}
            </ul>
            <p className="text-sm text-gray-500 mt-4 italic">*{toPersianDigits("نیاز به اجازه دسترسی به تقویم دارد. هوش مصنوعی از بهینه‌سازی برای یافتن بهترین برنامه استفاده می‌کند.")}*</p>
          </SectionBlockGPT>

          <SectionBlockGPT title={toPersianDigits("داشبوردهای بهره‌وری و KPIهای شخصی‌سازی شده")}>
            <ul className="space-y-4">
              {productivityDashboards.map((item, index) => (
                <InfoListItemGPT key={index}>{item}</InfoListItemGPT>
              ))}
            </ul>
            <p className="text-sm text-gray-500 mt-4 italic">*{toPersianDigits("هوش مصنوعی کد فرانت‌اند برای داشبوردها تولید می‌کند و بینش‌های تحلیلی عمیق بر اساس الگوهای کاربر ارائه می‌دهد.")}*</p>
          </SectionBlockGPT>
        </div>
        
        <p className="text-sm text-gray-400 mt-12 text-center">
          {toPersianDigits("خروجی‌های شبیه‌سازی شده: ماژول‌های بک‌اند (Python/FastAPI) و فرانت‌اند (React) برای مدیریت اهداف، پروژه‌ها و وظایف؛ الگوریتم‌های هوش مصنوعی برای اولویت‌بندی و زمان‌بندی؛ و داشبوردهای بهره‌وری تعاملی. هوش مصنوعی در تولید منطق CRUD، UI برای چارچوب‌های هدف، مدل‌های ML برای اولویت‌بندی و کد تجسم برای داشبوردها کمک می‌کند.")}
        </p>
      </div>
    </section>
  );
};

export default GoalProjectTaskSection;