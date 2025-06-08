
import React from 'react';
import { toPersianDigits } from '@/utils'; 
import { LightbulbIcon } from '../shared/AppIcons'; 

const InfoCard: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className="" }) => (
  <div className={`bg-slate-800 p-6 md:p-8 rounded-xl shadow-xl border border-slate-700 hover:border-sky-600/70 hover:shadow-sky-500/20 transition-all duration-300 ${className}`}>
    <h3 className="text-xl md:text-2xl font-semibold text-sky-300 mb-5">{title}</h3>
    {children}
  </div>
);

const PhaseOneAnalysisOutputSection: React.FC = () => {
  const keyQuestions = [
    toPersianDigits("درک احساسی هوش مصنوعی: ورودی احساسی چگونه تصور می‌شود (مثلاً خودگزارشی، تحلیل متن/صدا) و هوش مصنوعی چگونه به زمینه احساسی پاسخ خواهد داد؟"),
    toPersianDigits("پرونده‌های پزشکی هوشمند: آیا این سیستم با سیستم‌های EMR/EHR موجود ادغام می‌شود یا داخلی خواهد بود؟ چه «هوشمندی» انتظار می‌رود (مثلاً تحلیل روند، هشدارها)؟ ملاحظات امنیت داده/انطباق (HIPAA) چیست؟"),
    toPersianDigits("دستیار سرمایه‌گذاری: دامنه چیست؟ آیا مشاوره، پیگیری، آموزش یا ادغام با کارگزاری ارائه می‌دهد؟ پیامدهای نظارتی چیست؟"),
    toPersianDigits("مدل Freemium: تمایز خاص بین ویژگی‌های اصلی رایگان و ویژگی‌های پیشرفته پولی در سراسر ماژول‌ها چیست؟")
  ];

  const prioritizedCapabilities = [
    { priority: toPersianDigits("P0"), capability: toPersianDigits("دستیار هوش مصنوعی چندوجهی و تطبیق‌پذیر") },
    { priority: toPersianDigits("P0"), capability: toPersianDigits("چارچوب امنیت و حریم خصوصی") },
    { priority: toPersianDigits("P1"), capability: toPersianDigits("مدیریت جامع اهداف، پروژه‌ها و وظایف") },
    { priority: toPersianDigits("P1"), capability: toPersianDigits("مهندسی و تکامل عادت پایدار") },
    { priority: toPersianDigits("P1"), capability: toPersianDigits("تجربه کاربری (سادگی، شخصی‌سازی)") },
  ];

  return (
    <section id="planning-insights" className="py-20 md:py-28 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-sky-500/10 rounded-full mb-4">
            <LightbulbIcon className="w-12 h-12 text-sky-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-5">
            {toPersianDigits("فاز ۱: بینش‌های برنامه‌ریزی و طراحی")}
          </h2>
           <div className="section-title-underline"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-8">
            {toPersianDigits("خروجی‌های کلیدی از تحلیل اولیه مبتنی بر هوش مصنوعی ما، که بنیاد LifeOrchestrator AI را شکل می‌دهد.")}
          </p>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          <InfoCard title={toPersianDigits("چشم‌انداز محصول و فلسفه اصلی")} className="lg:col-span-1">
            <p className="text-gray-300 text-sm mb-3 leading-relaxed">
              <strong className="text-sky-400">{toPersianDigits("چشم‌انداز:")}</strong> {toPersianDigits("ایجاد یک «پلتفرم ارکستراسیون زندگی با هوش مصنوعی» انقلابی که به عنوان یک همکار، مربی و راهنمای فوق‌هوشمند عمل می‌کند و مدیریت زندگی را به سمفونی هماهنگ رشد، بهره‌وری و تندرستی تبدیل می‌کند.")}
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">
              <strong className="text-sky-400">{toPersianDigits("فلسفه اصلی:")}</strong> {toPersianDigits("«ارکستره کردن» زندگی با هماهنگ‌سازی هوشمندانه تمام عناصر آن (اهداف، کار، سلامت، یادگیری، روابط، امور مالی، خانه) برای همسویی با بینش و ارزش‌های اصلی کاربر. کاربر آهنگساز است؛ هوش مصنوعی رهبر ارکستر.")}
            </p>
          </InfoCard>

          <InfoCard title={toPersianDigits("سوالات کلیدی نیازمند شفاف‌سازی")} className="lg:col-span-1">
            <ul className="space-y-3">
              {keyQuestions.map((question, index) => (
                <li key={index} className="text-gray-300 text-sm list-decimal list-inside mr-4 leading-relaxed"> {/* Changed to decimal, adjusted for RTL */}
                  {question}
                </li>
              ))}
            </ul>
          </InfoCard>

          <InfoCard title={toPersianDigits("قابلیت‌های اولویت‌بندی شده اولیه")} className="lg:col-span-1">
            <ul className="space-y-2">
              {prioritizedCapabilities.map((item, index) => (
                <li key={index} className="text-gray-300 text-sm flex items-center">
                  <span className={`font-bold py-1 px-2 rounded-md text-xs mr-3 ${item.priority === toPersianDigits('P0') ? 'bg-sky-500 text-white' : 'bg-sky-700 text-sky-200'}`}>
                    {item.priority}
                  </span> 
                  {item.capability}
                </li>
              ))}
            </ul>
          </InfoCard>
        </div>
      </div>
    </section>
  );
};

export default PhaseOneAnalysisOutputSection;