
import React from 'react';
import { toPersianDigits } from '@/utils'; 
import { PaintBrushIcon } from '../shared/AppIcons'; 

const InfoCardStyled: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
  <div className={`bg-slate-800 p-6 md:p-8 rounded-xl shadow-xl border border-slate-700 hover:border-sky-600/70 hover:shadow-sky-500/20 transition-all duration-300 ${className}`}>
    <h3 className="text-xl md:text-2xl font-semibold text-sky-300 mb-5">{title}</h3>
    {children}
  </div>
);

const WireframePlaceholder: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <div className="border-2 border-dashed border-slate-600 p-6 rounded-xl text-center bg-slate-700/30 hover:bg-slate-700/50 transition-colors duration-300 flex flex-col items-center justify-center aspect-square">
    <div className="text-slate-500 text-4xl mb-3">🖼️</div>
    <h4 className="text-md font-semibold text-sky-400 mb-2">{title}</h4>
    <p className="text-xs text-gray-400 leading-relaxed">{description}</p>
  </div>
);


const UXUIDesignSection: React.FC = () => {
  const uxUiBestPractices = [
    toPersianDigits("شفافیت و سادگی: ناوبری شهودی، رابط‌های کاربری خلوت."),
    toPersianDigits("سازگاری: زبان طراحی یکنواخت در تمام ماژول‌ها."),
    toPersianDigits("شخصی‌سازی: توانمندسازی کاربران برای سفارشی‌سازی UI و دستیار هوش مصنوعی."),
    toPersianDigits("دسترس‌پذیری (WCAG 2.1 AA): طراحی فراگیر (کنتراست، ناوبری با صفحه‌کلید، ARIA)."),
    toPersianDigits("بازخورد و پاسخگویی: نشانه‌های بصری فوری برای اقدامات کاربر."),
  ];

  const uiTrends = [
    toPersianDigits("حالت تاریک (به عنوان پیش‌فرض یا گزینه اصلی)."),
    toPersianDigits("طرح‌بندی‌های مبتنی بر کارت برای ارائه محتوای ماژولار."),
    toPersianDigits("میکروتعاملات معنادار برای افزایش تعامل."),
    toPersianDigits("عناصر رابط کاربری صوتی برای تعامل بدون دست (آینده)."),
  ];

  const styleGuideSnippet = {
    colors: [
      toPersianDigits("تاکید اصلی: آبی آسمانی (#0ea5e9), آبی (#3b82f6)"),
      toPersianDigits("پس‌زمینه‌ها: Slate-950 (#0B1120), Slate-900 (#0f172a), Slate-800 (کارت‌ها/عناصر, #1e293b)"),
      toPersianDigits("متن: Gray-200 (#e5e7eb), Sky-300 (برجسته‌ها, #7dd3fc), Gray-400 (ثانویه, #9ca3af)"),
    ],
    typography: [
      toPersianDigits("فونت اصلی: UI Sans-Serif سیستمی، سپس Tahoma"),
      toPersianDigits("عناوین: ضخیم، سلسله مراتب واضح (h1-h4 با اندازه و وزن متمایز)"),
      toPersianDigits("متن بدنه: وزن معمولی، اندازه خوانا (پایه حدود ۱rem/۱۶ پیکسل), ارتفاع خط مناسب (leading-relaxed)"),
    ],
    elements: [
      toPersianDigits("دکمه‌ها: گوشه گرد، گرادیان (sky-500 تا blue-600 برای اصلی)، حالت‌های شناور/فوکوس واضح با تغییر مقیاس."),
      toPersianDigits("کارت‌ها: گوشه‌های گرد (rounded-xl), پس‌زمینه bg-slate-800, حاشیه border-slate-700, سایه‌های ظریف (shadow-xl)."),
      toPersianDigits("فیلدهای ورودی: گوشه گرد، پس‌زمینه تیره، برچسب‌های واضح، حالت فوکوس قابل مشاهده با حلقه رنگی."),
    ],
  };

  const uxAnalysisExamples = [
    toPersianDigits("اطمینان حاصل کنید که تمام عناصر تعاملی حداقل اندازه هدف ضربه/کلیک ۴۴x۴۴ پیکسل برای قابلیت استفاده دارند."),
    toPersianDigits("داشبورد: یک «حالت ذن» یا قابلیت مشاهده ویجت قابل تنظیم برای کار متمرکز در نظر بگیرید."),
    toPersianDigits("شخصی‌سازی هوش مصنوعی: پیش‌نمایش‌های بصری فوری از تغییرات آواتار/صدا ارائه دهید."),
    toPersianDigits("سلسله مراتب بصری واضح بین پیشنهادات تولید شده توسط هوش مصنوعی و محتوای ایجاد شده توسط کاربر را حفظ کنید."),
    toPersianDigits("ایجاد وظیفه: برای MVP، اطمینان حاصل کنید که جریان سریع است. گزینه‌های پیشرفته می‌توانند افشای تدریجی باشند."),
    toPersianDigits("دسترس‌پذیری: به طور منظم برای کنتراست رنگ (حداقل ۴.۵:۱ برای متن)، قابلیت ناوبری با صفحه‌کلید و نشانگرهای ARIA ممیزی کنید.")
  ];

  return (
    <section id="ux-ui-design" className="py-20 md:py-28 bg-slate-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
           <div className="inline-block p-3 bg-sky-500/10 rounded-full mb-4">
             <PaintBrushIcon className="w-12 h-12 text-sky-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-5">
            {toPersianDigits("فاز ۱.۵: مفاهیم اولیه طراحی UX/UI")}
          </h2>
          <div className="section-title-underline"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-8">
            {toPersianDigits("بینش‌های شبیه‌سازی شده مبتنی بر هوش مصنوعی در مورد بهترین شیوه‌های تجربه کاربری، مفاهیم اولیه طراحی و دستورالعمل‌های UI برای LifeOrchestrator AI.")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <InfoCardStyled title={toPersianDigits("بهترین شیوه‌های UX/UI پیشنهادی هوش مصنوعی")}>
            <ul className="list-decimal list-inside space-y-3 pr-4"> {/* Adjusted for RTL */}
              {uxUiBestPractices.map((item, index) => (
                <li key={index} className="text-gray-300 text-md leading-relaxed">{item}</li>
              ))}
            </ul>
          </InfoCardStyled>
          <InfoCardStyled title={toPersianDigits("روندهای کلیدی UI برای گنجاندن")}>
            <ul className="list-decimal list-inside space-y-3 pr-4"> {/* Adjusted for RTL */}
              {uiTrends.map((item, index) => (
                <li key={index} className="text-gray-300 text-md leading-relaxed">{item}</li>
              ))}
            </ul>
          </InfoCardStyled>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-semibold text-sky-300 mb-10 text-center">{toPersianDigits("مفاهیم اولیه وایرفریم و ماکاپ (شبیه‌سازی شده)")}</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <WireframePlaceholder title={toPersianDigits("داشبورد MVP")} description={toPersianDigits("مبتنی بر کارت: تمرکز امروز، زنجیره عادت‌ها، پیشنهادات هوش مصنوعی. قابل تنظیم.")} />
            <WireframePlaceholder title={toPersianDigits("پنل دستیار هوش مصنوعی")} description={toPersianDigits("رابط کاربری شبیه چت یا پنل اختصاصی برای تعامل و پیشنهادات هوش مصنوعی.")} />
            <WireframePlaceholder title={toPersianDigits("مودال ایجاد وظیفه")} description={toPersianDigits("افزودن سریع: عنوان، تاریخ سررسید، پیوند به هدف، اولویت. ساده و کارآمد.")} />
            <WireframePlaceholder title={toPersianDigits("تنظیم شخصیت هوش مصنوعی")} description={toPersianDigits("کاربر نام هوش مصنوعی، صدا (نمونه‌ها) و آواتار (گالری از پیش تعریف شده) را انتخاب می‌کند.")} />
          </div>
           <p className="text-sm text-gray-500 mt-6 text-center italic">
            *{toPersianDigits("هوش مصنوعی وایرفریم‌های واقعی با وفاداری کم/بالا (مثلاً PNG، SVG) و به طور بالقوه نمونه‌های اولیه تعاملی یا قطعه‌های کد را بر اساس توضیحات متنی یا طرح‌ها تولید می‌کند.")}*
          </p>
        </div>
        
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
            <InfoCardStyled title={toPersianDigits("قطعه راهنمای سبک اولیه UI (شبیه‌سازی شده)")}>
                {(Object.keys(styleGuideSnippet) as Array<keyof typeof styleGuideSnippet>).map((key) => (
                <div key={key} className="mb-4">
                    <h4 className="text-lg font-semibold text-sky-400 capitalize mb-2">
                      {key === 'colors' ? 'رنگ‌ها' : key === 'typography' ? 'تایپوگرافی' : 'عناصر'}
                    </h4>
                    <ul className="list-disc list-inside space-y-1 pr-4"> {/* Adjusted for RTL */}
                    {styleGuideSnippet[key].map((item, index) => (
                        <li key={index} className="text-gray-400 text-sm leading-relaxed">{item}</li>
                    ))}
                    </ul>
                </div>
                ))}
            </InfoCardStyled>
            <InfoCardStyled title={toPersianDigits("تحلیل و بهبودهای UX/UI مبتنی بر هوش مصنوعی (مثال‌ها)")}>
                <ul className="list-decimal list-inside space-y-3 pr-4"> {/* Adjusted for RTL */}
                {uxAnalysisExamples.map((item, index) => (
                    <li key={index} className="text-gray-300 text-md leading-relaxed">{item}</li>
                ))}
                </ul>
                 <p className="text-sm text-gray-500 mt-6 italic">
                    *{toPersianDigits("ابزارهای هوش مصنوعی ارزیابی‌های اکتشافی خودکار، بررسی‌های دسترس‌پذیری (WCAG) و شبیه‌سازی جریان‌های کاربری را برای شناسایی مشکلات بالقوه قابلیت استفاده انجام می‌دهند.")}*
                </p>
            </InfoCardStyled>
        </div>
         <p className="text-sm text-gray-400 mt-10 text-center">
            {toPersianDigits("توجه: نمایش‌های بصری بالا جایگزین‌های ساده شده هستند. در یک سناریوی واقعی، هوش مصنوعی در تولید وایرفریم‌ها، ماکاپ‌ها و نمونه‌های اولیه تعاملی دقیق‌تر کمک خواهد کرد.")}
          </p>
      </div>
    </section>
  );
};

export default UXUIDesignSection;