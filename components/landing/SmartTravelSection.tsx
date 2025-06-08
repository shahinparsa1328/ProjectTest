
import React from 'react';
import { toPersianDigits } from '../../utils';

const GlobeAltIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
  </svg>
);

const InfoListItemTravel: React.FC<{ title?: string; children: React.ReactNode; className?: string }> = ({ title, children, className = "text-gray-300 text-md leading-relaxed" }) => (
  <li className={`list-disc list-inside mr-4 ${className}`}> {/* Adjusted for RTL */}
    {title && <strong className="text-sky-400 font-semibold">{title}: </strong>}
    {children}
  </li>
);

const SectionBlockTravel: React.FC<{ title: string; children: React.ReactNode; className?: string; note?: string }> = ({ title, children, className = "bg-slate-800 p-8 rounded-xl shadow-xl border border-slate-700", note }) => (
    <div className={className}>
        <h3 className="text-xl md:text-2xl font-semibold text-sky-300 mb-5">{title}</h3>
        {children}
        {note && <p className="text-sm text-gray-500 mt-4 italic">{note}</p>}
    </div>
);

const SmartTravelSection: React.FC = () => {
  const destinationSuggestion = [
    { title: toPersianDigits("تحلیل جامع"), description: toPersianDigits("هوش مصنوعی از الگوریتم‌های توصیه‌گر با تحلیل بودجه، علایق (ماجراجویی، فرهنگ، آرامش)، سبک سفر (انفرادی، خانوادگی، لوکس)، زمان ترجیحی سال و تجربیات سفر گذشته کاربر استفاده می‌کند.") },
    { title: toPersianDigits("پیشنهادات غنی"), description: toPersianDigits("پیشنهادات شامل اطلاعات دقیق در مورد آب و هوا، جاذبه‌های کلیدی، فعالیت‌های محلی، گزینه‌های حمل و نقل و نکات فرهنگی مرتبط است.") },
  ];

  const bookingOptimization = [
    { title: toPersianDigits("جستجوی چند پلتفرمی"), description: toPersianDigits("هوش مصنوعی به طور مفهومی با APIهای پلتفرم‌های رزرو عمده (مثلاً Skyscanner، Booking.com، Expedia) برای جستجوی پروازها، هتل‌ها، اجاره خودرو و فعالیت‌ها ادغام می‌شود.") },
    { title: toPersianDigits("مقایسه پیشرفته"), description: toPersianDigits("گزینه‌ها را بر اساس قیمت، زمان سفر، سطح راحتی، رتبه‌بندی کاربران و مدت زمان توقف مقایسه می‌کند.") },
    { title: toPersianDigits("بهینه‌سازی چند معیاره"), description: toPersianDigits("رزروهای بهینه را بر اساس اولویت‌های تعریف شده توسط کاربر مانند حداقل هزینه، کوتاه‌ترین زمان سفر، حداکثر راحتی یا یک رویکرد متعادل پیدا می‌کند.") },
    { title: toPersianDigits("هشدارهای قیمت"), description: toPersianDigits("قیمت‌ها را برای جستجوهای ذخیره شده نظارت می‌کند و کاربر را از تغییرات قابل توجه مطلع می‌کند و به تضمین معاملات بهتر کمک می‌کند.") }
  ];
  
  const itineraryPlanning = [
    { title: toPersianDigits("برنامه‌های روزانه شخصی‌سازی شده"), description: toPersianDigits("موتور برنامه‌ریزی سفر هوش مصنوعی برنامه‌های سفر روزانه پویا و متناسب با علایق و سرعت کاربر تولید می‌کند.") },
    { title: toPersianDigits("بهینه‌سازی مسیر و زمان‌بندی"), description: toPersianDigits("مسیرها بین جاذبه‌ها را بهینه می‌کند و زمان‌های بازدید ایده‌آل را برای به حداقل رساندن زمان سفر و انتظار و به حداکثر رساندن تجربه پیشنهاد می‌دهد.") },
    { title: toPersianDigits("انعطاف‌پذیری بلادرنگ"), description: toPersianDigits("امکان به‌روزرسانی برنامه‌های سفر در طول سفر بر اساس تغییرات پیش‌بینی نشده (مثلاً آب و هوا، تأخیر پرواز، تصمیمات ناگهانی) را فراهم می‌کند.") },
    { title: toPersianDigits("پیشنهادات محلی آگاه از زمینه"), description: toPersianDigits("رستوران‌ها، کافه‌ها یا جواهرات پنهان نزدیک را بر اساس مکان فعلی کاربر و زمان روز پیشنهاد می‌دهد (نیاز به اجازه مکان دارد).") }
  ];
  
  const arTourGuide = [
    { title: toPersianDigits("ادغام AR SDK (مفهومی)"), description: toPersianDigits("تولید کد اولیه برای ادغام SDKهای AR (مثلاً ARCore برای Android، ARKit برای iOS) برای پوشاندن اطلاعات دیجیتال بر روی دنیای واقعی از طریق دوربین دستگاه.") },
    { title: toPersianDigits("اطلاعات مکان‌نمای آگاه از زمینه"), description: toPersianDigits("وقتی کاربر دوربین خود را به سمت یک مکان‌نما می‌گیرد، هوش مصنوعی می‌تواند حقایق تاریخی، اهمیت فرهنگی، نظرات کاربران یا ساعات کار را نمایش دهد (با GPS و پایگاه‌های داده مانند Google Places API، Wikipedia ادغام می‌شود).") },
    { title: toPersianDigits("ناوبری AR تعاملی"), description: toPersianDigits("کاربران را با ترسیم مسیرها یا برجسته کردن نقاط راهنما در نمای AR به مقصد بعدی خود هدایت می‌کند.") },
    { title: toPersianDigits("نکته مجوزها"), description: toPersianDigits("این ویژگی به شدت به مجوزهای دوربین و مکان دقیق متکی است، که با توضیحات واضح به کاربر درخواست می‌شود.") }
  ];

  return (
    <section id="smart-travel-assistant" className="py-20 md:py-28 bg-slate-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-sky-500/10 rounded-full mb-4">
            <GlobeAltIcon className="w-12 h-12 text-sky-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-5">
            {toPersianDigits("فاز ۴.۴: دستیار هوشمند سفر، اوقات فراغت و تجربه")}
          </h2>
          <div className="section-title-underline"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-8">
            {toPersianDigits("توسعه شبیه‌سازی شده برنامه‌ریزی سفر مبتنی بر هوش مصنوعی، یک همراه سفر هوشمند، کشف اوقات فراغت و یک راهنمای تور AR اختیاری.")}
          </p>
        </div>

        <div className="space-y-12">
          <SectionBlockTravel title={toPersianDigits("موتور پیشنهاد مقصد پیشرفته")} note={toPersianDigits("هوش مصنوعی کد پایتون برای الگوریتم‌های توصیه و UI (React) برای ارائه پیشنهادات سفر تولید می‌کند.")}>
            <ul className="space-y-4">
              {destinationSuggestion.map((item, index) => (
                <InfoListItemTravel key={index} title={item.title}>{item.description}</InfoListItemTravel>
              ))}
            </ul>
          </SectionBlockTravel>

          <SectionBlockTravel title={toPersianDigits("بهینه‌سازی جستجو و رزرو")} note={toPersianDigits("هوش مصنوعی الگوریتم‌های بهینه‌سازی و منطق ادغام API مفهومی برای تعامل با سرویس‌های رزرو شخص ثالث پیاده‌سازی می‌کند.")}>
            <ul className="space-y-4">
              {bookingOptimization.map((item, index) => (
                <InfoListItemTravel key={index} title={item.title}>{item.description}</InfoListItemTravel>
              ))}
            </ul>
          </SectionBlockTravel>

          <SectionBlockTravel title={toPersianDigits("برنامه‌ریزی پویای برنامه سفر روزانه")} note={toPersianDigits("هوش مصنوعی موتور برنامه‌ریزی سفر، شامل بهینه‌سازی مسیر و منطق پیشنهاد آگاه از زمینه را توسعه می‌دهد. نیاز به اجازه مکان دارد.")}>
            <ul className="space-y-4">
              {itineraryPlanning.map((item, index) => (
                <InfoListItemTravel key={index} title={item.title}>{item.description}</InfoListItemTravel>
              ))}
            </ul>
          </SectionBlockTravel>
          
          <SectionBlockTravel title={toPersianDigits("راهنمای تور مجازی با AR (اختیاری و مفهومی)")} note={toPersianDigits("هوش مصنوعی کد اولیه برای ادغام AR SDK و منطق برای نمایش اطلاعات آگاه از زمینه تولید می‌کند. نیاز به مجوزهای دوربین و مکان دارد.")}>
            <ul className="space-y-4">
              {arTourGuide.map((item, index) => (
                <InfoListItemTravel key={index} title={item.title}>{item.description}</InfoListItemTravel>
              ))}
            </ul>
          </SectionBlockTravel>
        </div>
        
        <p className="text-sm text-gray-400 mt-12 text-center">
          {toPersianDigits("خروجی‌های شبیه‌سازی شده: ماژول‌های مفهومی برای برنامه‌ریزی سفر (الگوریتم‌ها و کد UI)، همراه سفر هوشمند (کد ادغام مکان و تقویم)، کشف اوقات فراغت (الگوریتم‌ها و کد UI)، و (اختیاری) یک ماژول راهنمای تور AR (قطعه کدهای AR و منطق ادغام پایگاه داده). هوش مصنوعی در تولید الگوریتم‌های توصیه‌گر، منطق بهینه‌سازی، موتورهای برنامه‌ریزی سفر و کد اولیه ویژگی AR کمک می‌کند.")}
        </p>
      </div>
    </section>
  );
};

export default SmartTravelSection;