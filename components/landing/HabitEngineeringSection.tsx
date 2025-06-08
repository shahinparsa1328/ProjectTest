
import React from 'react';
import { toPersianDigits } from '../../utils';

const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 12L17 14.25l-1.25-2.25L13.5 11l2.25-1.25L17 7.5l1.25 2.25L20.5 11l-2.25 1.25z" />
  </svg>
);

const InfoListItemHabit: React.FC<{ title?: string; children: React.ReactNode; className?: string }> = ({ title, children, className = "text-gray-300 text-md leading-relaxed" }) => (
  <li className={`list-disc list-inside mr-4 ${className}`}> {/* Adjusted for RTL */}
    {title && <strong className="text-sky-400 font-semibold">{title}: </strong>}
    {children}
  </li>
);

const SectionBlockHabit: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className = "bg-slate-800 p-8 rounded-xl shadow-xl border border-slate-700" }) => (
    <div className={className}>
        <h3 className="text-xl md:text-2xl font-semibold text-sky-300 mb-5">{title}</h3>
        {children}
    </div>
);

const HabitEngineeringSection: React.FC = () => {
  const habitSuggestionEngine = [
    { title: toPersianDigits("منابع داده برای پیشنهادات"), description: toPersianDigits("اهداف زندگی کاربر (از ماژول هدف)، ارزش‌های شخصی (پرسشنامه‌ها/NLU)، بینش‌های شخصیتی (NLU روی متن)، داده‌های بیومتریک (مفهومی: پوشیدنی‌هایی مانند Fitbit/Apple Watch برای خواب، ضربان قلب، فعالیت)، داده‌های رفتاری (عادات فعلی/گذشته).") },
    { title: toPersianDigits("منطق توصیه هوش مصنوعی"), description: toPersianDigits("الگوریتم‌های توصیه‌گر پیشرفته عاداتی را که با پروفایل کاربر همسو هستند، پیشنهاد می‌کنند. پیشنهادات شامل توضیحات مناسب بودن و مزایا هستند.") },
  ];

  const gamificationSystem = [
    { title: toPersianDigits("عناصر اصلی"), description: toPersianDigits("سیستم امتیازدهی معنادار، نشان‌های پیشرفت جذاب بصری، سطوح مهارت برای هر عادت (مثلاً 'مبتدی' تا 'استاد')، جوایز واقعی/مجازی مفهومی.") },
    { title: toPersianDigits("جامعه و پویایی"), description: toPersianDigits("چالش‌های فردی و مبتنی بر جامعه. تنظیم سختی پویا مبتنی بر هوش مصنوعی برای چالش‌ها و امتیازدهی بر اساس پیشرفت و انگیزه کاربر.") },
    { title: toPersianDigits("تولید کد"), description: toPersianDigits("هوش مصنوعی کد بک‌اند (منطق امتیازدهی، جوایز) و فرانت‌اند (React برای نمایش UI امتیازها، نشان‌ها، سطوح) را تولید می‌کند.")}
  ];

  const habitTracking = [
    { title: toPersianDigits("پارامترهای چند بعدی"), description: toPersianDigits("فراتر از 'انجام شده/نشده'، پیگیری فرکانس، مدت زمان، کیفیت ارزیابی شده توسط کاربر، زمینه (مثلاً 'در خانه'، 'بعد از بیدار شدن') و احساسات مرتبط (قبل/بعد از عادت).") },
    { title: toPersianDigits("ذخیره‌سازی داده و بک‌اند"), description: toPersianDigits("هوش مصنوعی شماهای پایگاه داده را طراحی می‌کند و کد API بک‌اند را برای ثبت این جزئیات غنی عادت تولید می‌کند. این داده‌ها ML را برای بینش‌های عمیق‌تر تغذیه می‌کنند.") }
  ];
  
  const adaptiveReminders = [
    { title: toPersianDigits("محرک‌های زمینه‌ای"), description: toPersianDigits("یادآوری‌ها بر اساس ریتم شبانه‌روزی، سطح انرژی پیش‌بینی شده (از سنسورها/ورودی)، لحظات مناسب (زمان‌های آزاد تقویم) و مکان (با رضایت، مثلاً 'یادآوری کن وقتی ۱ ساعت پشت میز هستم، کشش انجام دهم').") },
    { title: toPersianDigits("ارائه شخصی‌سازی شده"), description: toPersianDigits("هوش مصنوعی لحن، فوریت و فرکانس یادآور را بر اساس زمینه فعلی کاربر، شخصیت هوش مصنوعی و اثربخشی گذشته یادآورها تنظیم می‌کند.") }
  ];

  return (
    <section id="habit-engineering" className="py-20 md:py-28 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-sky-500/10 rounded-full mb-4">
            <SparklesIcon className="w-12 h-12 text-sky-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-5">
            {toPersianDigits("فاز ۳.۳: مهندسی عادت پایدار")}
          </h2>
          <div className="section-title-underline"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-8">
            {toPersianDigits("توسعه شبیه‌سازی شده قابلیت‌های مبتنی بر هوش مصنوعی برای طراحی عادت، مربیگری، پیگیری و بهینه‌سازی برای پرورش تغییر پایدار.")}
          </p>
        </div>

        <div className="space-y-12">
          <SectionBlockHabit title={toPersianDigits("موتور پیشنهاد عادت پیشرفته")}>
            <ul className="space-y-4">
              {habitSuggestionEngine.map((item, index) => (
                <InfoListItemHabit key={index} title={item.title}>{item.description}</InfoListItemHabit>
              ))}
            </ul>
            <p className="text-sm text-gray-500 mt-4 italic">*{toPersianDigits("هوش مصنوعی کد برای الگوریتم‌های توصیه‌گر و UI برای ارائه پیشنهادات با منطق تولید می‌کند.")}*</p>
          </SectionBlockHabit>

          <SectionBlockHabit title={toPersianDigits("سیستم گیمیفیکیشن تطبیقی چندلایه")}>
            <ul className="space-y-4">
              {gamificationSystem.map((item, index) => (
                <InfoListItemHabit key={index} title={item.title}>{item.description}</InfoListItemHabit>
              ))}
            </ul>
             <p className="text-sm text-gray-500 mt-4 italic">*{toPersianDigits("هوش مصنوعی به طراحی مکانیک‌های جذاب کمک می‌کند و کد فرانت‌اند/بک‌اند برای سیستم تولید می‌کند.")}*</p>
          </SectionBlockHabit>

          <SectionBlockHabit title={toPersianDigits("پیگیری عادت چند بعدی")}>
            <ul className="space-y-4">
              {habitTracking.map((item, index) => (
                <InfoListItemHabit key={index} title={item.title}>{item.description}</InfoListItemHabit>
              ))}
            </ul>
            <p className="text-sm text-gray-500 mt-4 italic">*{toPersianDigits("داده‌های غنی برای تحلیل ML و بینش‌های شخصی‌سازی شده فراهم می‌کند.")}*</p>
          </SectionBlockHabit>
          
          <SectionBlockHabit title={toPersianDigits("یادآورهای عادت فوق تطبیقی")}>
            <ul className="space-y-4">
              {adaptiveReminders.map((item, index) => (
                <InfoListItemHabit key={index} title={item.title}>{item.description}</InfoListItemHabit>
              ))}
            </ul>
            <p className="text-sm text-gray-500 mt-4 italic">*{toPersianDigits("هوش مصنوعی الگوریتم‌های پیشرفته برای یادآوری‌های به‌موقع و مؤثر پیاده‌سازی می‌کند، که نیاز به مجوزهای تقویم/مکان با رضایت دارد.")}*</p>
          </SectionBlockHabit>
        </div>
        
        <p className="text-sm text-gray-400 mt-12 text-center">
          {toPersianDigits("خروجی‌های شبیه‌سازی شده: ماژول‌هایی برای طراحی و کشف عادت (کد موتور پیشنهاد هوش مصنوعی)، مربیگری و گیمیفیکیشن عادت (بک‌اند/فرانت‌اند)، و پیگیری/بهینه‌سازی عادت (بک‌اند/فرانت‌اند). هوش مصنوعی در تولید منطق توصیه‌گر، مکانیک‌های گیمیفیکیشن، شماهای پایگاه داده برای پیگیری غنی و الگوریتم‌های یادآور کمک می‌کند.")}
        </p>
      </div>
    </section>
  );
};

export default HabitEngineeringSection;