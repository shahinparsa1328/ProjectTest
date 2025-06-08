
import React from 'react';
import { toPersianDigits } from '@/utils'; 
import { ChartBarIcon } from '../shared/AppIcons'; 

const MarketAnalysisSection: React.FC = () => {
  const swot = {
    strengths: [
      toPersianDigits("چشم‌انداز جامع: تمرکز بر «ارکستراسیون زندگی» فراتر از مدیریت صرف وظایف."),
      toPersianDigits("شخصی‌سازی عمیق با هوش مصنوعی: پتانسیل برای تجارب کاربری بسیار تطبیقی و سفارشی."),
      toPersianDigits("ورودی چندوجهی: برنامه‌ریزی شده برای متن، گفتار، تصاویر، که تعامل را بسیار متنوع می‌کند."),
    ],
    weaknesses: [
      toPersianDigits("پیچیدگی توسعه: ادغام ماژول‌های متنوع و هوش مصنوعی پیشرفته چالش‌برانگیز است."),
      toPersianDigits("سردرگمی کاربر: خطر در صورتی که ویژگی‌های جامع به طور شهودی ارائه نشوند."),
      toPersianDigits("وابستگی به هوش مصنوعی پیشرفته: تکمیل رفتار و بینش‌های هوش مصنوعی یک فرآیند مداوم است."),
    ],
    opportunities: [
      toPersianDigits("بازار رو به رشد: افزایش علاقه به ابزارهای تندرستی و بهره‌وری جامع."),
      toPersianDigits("تقاضا برای ادغام: کاربران به دنبال پلتفرم‌های یکپارچه به جای برنامه‌های تک منظوره پراکنده هستند."),
      toPersianDigits("پیشرفت‌های هوش مصنوعی: بهبودهای مداوم در قابلیت‌های هوش مصنوعی امکانات جدیدی را باز می‌کند."),
    ],
    threats: [
      toPersianDigits("رقبای تثبیت شده: بازیگران قدرتمندی در حوزه‌های خاص (وظیفه، عادت، تندرستی) وجود دارند."),
      toPersianDigits("نگرانی‌های مربوط به حریم خصوصی داده‌ها: کاربران به طور فزاینده‌ای در مورد استفاده از داده‌های شخصی حساس هستند."),
      toPersianDigits("تکامل سریع فناوری: نیازمند انطباق و نوآوری مداوم برای مرتبط ماندن است."),
    ],
  };

  const marketGaps = [
    toPersianDigits("فقدان پلتفرم‌های واقعاً یکپارچه که به طور مؤثر حوزه‌های متنوع زندگی (کار، سلامت، یادگیری) را هماهنگ کنند."),
    toPersianDigits("شخصی‌سازی سطحی هوش مصنوعی در بسیاری از برنامه‌های موجود، که اغلب به توصیه‌های اولیه محدود می‌شود."),
    toPersianDigits("آگاهی محدود زمینه‌ای یا احساسی در ابزارهای بهره‌وری و تندرستی فعلی."),
  ];

  const differentiatingFeatures = [
    {
      title: toPersianDigits("موتور همدلی عمیق شخصیت هوش مصنوعی"),
      description: toPersianDigits("هوش مصنوعی که نه تنها ظاهر/صدا را سفارشی می‌کند، بلکه درک دقیق و پاسخ‌های تطبیقی به نشانه‌های احساسی و زمینه‌ای کاربر را نشان می‌دهد."),
    },
    {
      title: toPersianDigits("موتور هم‌افزایی بین حوزه‌ای"),
      description: toPersianDigits("هوش مصنوعی به طور فعال فعالیت‌های هم‌افزا را در سراسر حوزه‌های زندگی شناسایی و پیشنهاد می‌کند (مثلاً «سطح استرس شما بالاست و یک هدف یادگیری مرتبط با ذهن‌آگاهی دارید. نظرتان در مورد یک جلسه مدیتیشن هدایت‌شده ۱۰ دقیقه‌ای چیست؟»)."),
    },
    {
      title: toPersianDigits("تجسم اهداف «آهنگساز زندگی»"),
      description: toPersianDigits("رابط کاربری بسیار تعاملی و بصری برای کاربران تا چشم‌انداز زندگی خود را «آهنگسازی» کنند و ببینند چگونه هوش مصنوعی به ارکستره کردن اجزای مختلف در جهت اهدافشان کمک می‌کند."),
    },
  ];

  return (
    <section id="market-insights" className="py-20 md:py-28 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-sky-500/10 rounded-full mb-4">
            <ChartBarIcon className="w-12 h-12 text-sky-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-5">
            {toPersianDigits("فاز ۱.۲: بینش‌های بازار و رقبا")}
          </h2>
          <div className="section-title-underline"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-8">
            {toPersianDigits("تحلیل شبیه‌سازی شده مبتنی بر هوش مصنوعی از روندهای بازار، فرصت‌ها و مزایای رقابتی بالقوه برای LifeOrchestrator AI.")}
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-semibold text-sky-300 mb-8 text-center">{toPersianDigits("خلاصه تحلیل SWOT (LifeOrchestrator AI)")}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(Object.keys(swot) as Array<keyof typeof swot>).map((key) => (
              <div key={key} className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700">
                <h4 className="text-xl font-semibold text-sky-400 capitalize mb-4">
                  {key === 'strengths' ? 'نقاط قوت' : key === 'weaknesses' ? 'نقاط ضعف' : key === 'opportunities' ? 'فرصت‌ها' : 'تهدیدها'}
                </h4>
                <ul className="space-y-2">
                  {swot[key].map((item, index) => (
                    <li key={index} className="text-gray-300 text-sm list-disc list-inside mr-3 leading-relaxed"> {/* Adjusted for RTL */}
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-semibold text-sky-300 mb-8 text-center">{toPersianDigits("شکاف‌های شناسایی شده در بازار")}</h3>
          <div className="bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-700">
            <ul className="space-y-4">
              {marketGaps.map((gap, index) => (
                <li key={index} className="text-gray-200 list-decimal list-inside mr-3 text-md leading-relaxed"> {/* Adjusted for RTL */}
                  {gap}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h3 className="text-2xl md:text-3xl font-semibold text-sky-300 mb-8 text-center">{toPersianDigits("ویژگی‌های متمایزکننده پیشنهادی")}</h3>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {differentiatingFeatures.map((feature, index) => (
              <div key={index} className="bg-slate-800 p-6 rounded-xl shadow-xl hover:shadow-sky-500/30 border border-slate-700 hover:border-sky-600/70 transition-all duration-300 flex flex-col">
                <h4 className="text-xl font-semibold text-sky-400 mb-4">{feature.title}</h4>
                <p className="text-gray-300 text-sm flex-grow leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default MarketAnalysisSection;