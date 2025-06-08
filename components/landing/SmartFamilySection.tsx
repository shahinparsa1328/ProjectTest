import React from 'react';
import { toPersianDigits } from '../../utils';

// Icon for Smart Family & Care Section
const UserGroupIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-3.741-3.741M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75L14.25 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6.31 7.31L12 12m0 0l5.69-4.69" />
    {/* <path strokeLinecap="round" strokeLinejoin="round" d="M6.31 7.31L12 12m0 0l5.69-4.69" /> */} {/* Duplicate path for better icon fill if needed or remove if simple outline is fine */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 13.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 16.125c0-1.657 3.03-3 6.75-3s6.75 1.343 6.75 3S17.28 19.125 13.5 19.125 6.75 17.782 6.75 16.125z" />
  </svg>
);


const InfoListItemFamily: React.FC<{ title?: string; children: React.ReactNode; className?: string }> = ({ title, children, className = "text-gray-300 text-sm" }) => (
  <li className={`list-disc list-inside mr-2 ${className}`}> {/* Adjusted for RTL: ml-2 to mr-2 */}
    {title && <strong className="text-sky-400">{title}: </strong>}
    {children}
  </li>
);

const SectionBlockFamily: React.FC<{ title: string; children: React.ReactNode; className?: string; note?: string }> = ({ title, children, className = "bg-slate-700 p-6 rounded-xl shadow-xl", note }) => (
    <div className={className}>
        <h3 className="text-xl font-semibold text-sky-300 mb-4">{title}</h3>
        {children}
        {note && <p className="text-xs text-gray-500 mt-3 italic text-right">{note}</p>} {/* Ensure note is also RTL */}
    </div>
);

const SmartFamilySection: React.FC = () => {
  const sharedFamilyManagement = [
    { title: toPersianDigits("تقویم مشترک خانواده"), description: toPersianDigits("تقویم مرکزی برای رویدادها و وظایف خانوادگی. هوش مصنوعی به تشخیص تداخل‌ها و پیشنهادات زمان‌بندی کمک می‌کند.") },
    { title: toPersianDigits("لیست خرید هوشمند و مشترک خانواده"), description: toPersianDigits("لیست همکاری با پیشنهادات هوش مصنوعی بر اساس تاریخچه خرید، برنامه‌های غذایی و ادغام مفهومی با یخچال هوشمند.") },
    { title: toPersianDigits("برنامه‌ریزی غذایی خانواده با کمک هوش مصنوعی"), description: toPersianDigits("هوش مصنوعی برنامه‌های غذایی هفتگی را با در نظر گرفتن ترجیحات غذایی خانواده، آلرژی‌ها، اهداف تغذیه‌ای پیشنهاد می‌دهد و دستور پخت‌های مرتبط را ارائه می‌دهد.") },
  ];

  const parentingAssistant = [
    { title: toPersianDigits("پیگیری رشد کودک"), description: toPersianDigits("نظارت بر نقاط عطف رشد (قد، وزن، اولین کلمات)، الگوهای خواب، گزارش‌های تغذیه و برنامه‌های واکسیناسیون، و مقایسه با نمودارهای رشد استاندارد.") },
    { title: toPersianDigits("بینش‌های آموزشی برای والدین"), description: toPersianDigits("هوش مصنوعی پیشنهادات آموزشی متناسب با سن و هشدارهای اولیه سلامت بر اساس داده‌های پیگیری شده کودک ارائه می‌دهد.") },
  ];
  
  const elderlyCareAssistant = [
    { title: toPersianDigits("نظارت از راه دور (مبتنی بر رضایت)"), description: toPersianDigits("مفهومی: استفاده از پوشیدنی‌ها یا سنسورهای محیطی (با رضایت کامل و آگاهانه) برای الگوهای فعالیت، خواب و تشخیص ناهنجاری‌ها (مثلاً سقوط، عدم فعالیت طولانی‌مدت).") },
    { title: toPersianDigits("هشدارهای هوشمند برای مراقبان"), description: toPersianDigits("ارسال اعلان‌های فوری به مراقبان از طریق پیامک یا پیام‌های درون‌برنامه‌ای در صورت شناسایی موقعیت‌های غیرعادی یا انحراف از الگوهای عادی.") },
    { title: toPersianDigits("گزارش‌های دوره‌ای سلامت"), description: toPersianDigits("تولید خلاصه‌هایی از وضعیت سلامت و سطح فعالیت برای مراقبان، که به آن‌ها کمک می‌کند مطلع بمانند.") },
    { title: toPersianDigits("تأکید بر حریم خصوصی و رضایت"), description: toPersianDigits("این ماژول تحت سخت‌ترین پروتکل‌های حریم خصوصی عمل خواهد کرد و نیازمند رضایت صریح و مداوم از همه طرف‌های درگیر، به ویژه گیرنده مراقبت است.") }
  ];
  

  return (
    <section id="smart-family-care" className="py-16 md:py-24 bg-slate-800"> {/* Section background */}
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <UserGroupIcon className="w-16 h-16 text-sky-400 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-4">
            {toPersianDigits(`فاز ${toPersianDigits("۴.۶")}: دستیار هوشمند خانواده و مراقبت (اختیاری)`)}
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            {toPersianDigits("توسعه شبیه‌سازی شده قابلیت‌های ماژولار اختیاری برای مدیریت امور خانواده، کمک به والدین و پشتیبانی از مراقبت از سالمندان، با تأکید شدید بر حریم خصوصی و رضایت.")}
          </p>
        </div>

        <div className="space-y-12">
          <SectionBlockFamily 
            title={toPersianDigits("ابزارهای مدیریت مشترک خانواده")} 
            className="bg-slate-700 p-6 rounded-xl shadow-xl" 
            note={toPersianDigits("هوش مصنوعی کد برای منطق تقویم مشترک، الگوریتم‌های لیست خرید هوشمند و UI برنامه‌ریزی غذایی (React) تولید می‌کند.")}>
            <ul className="space-y-3">
              {sharedFamilyManagement.map((item, index) => (
                <InfoListItemFamily key={index} title={item.title}>{item.description}</InfoListItemFamily>
              ))}
            </ul>
          </SectionBlockFamily>

          <SectionBlockFamily 
            title={toPersianDigits("ویژگی‌های دستیار والدین")} 
            className="bg-slate-700 p-6 rounded-xl shadow-xl" 
            note={toPersianDigits("هوش مصنوعی در توسعه ماژول‌های پیگیری و الگوریتم‌ها برای مقایسه داده‌ها با استانداردهای رشد کمک می‌کند.")}>
            <ul className="space-y-3">
              {parentingAssistant.map((item, index) => (
                <InfoListItemFamily key={index} title={item.title}>{item.description}</InfoListItemFamily>
              ))}
            </ul>
          </SectionBlockFamily>

          <SectionBlockFamily 
            title={toPersianDigits("دستیار مراقبت از سالمندان (اختیاری، با حریم خصوصی و رضایت بالا)")} 
            className="bg-slate-700 p-6 rounded-xl shadow-xl" 
            note={toPersianDigits("هوش مصنوعی کد مفهومی برای ادغام داده‌های سنسور (با سلب مسئولیت در مورد نیاز به سنسورهای واقعی و SDKها)، الگوریتم‌های تشخیص ناهنجاری و مکانیزم‌های هشدار امن تولید می‌کند. امنیت و حریم خصوصی دقیق به صورت پیش‌فرض.")}>
            <ul className="space-y-3">
              {elderlyCareAssistant.map((item, index) => (
                <InfoListItemFamily key={index} title={item.title}>{item.description}</InfoListItemFamily>
              ))}
            </ul>
          </SectionBlockFamily>
        </div>
        
        <p className="text-xs text-gray-400 mt-12 text-center">
          {toPersianDigits("خروجی‌های شبیه‌سازی شده: ماژول‌های مفهومی برای مدیریت امور خانواده (کد تقویم، لیست خرید، برنامه‌ریزی غذایی)، دستیار والدین (کد پیگیری و بینش‌های کودک)، و (در صورت پیاده‌سازی) دستیار مراقبت از سالمندان (کد نظارت از راه دور و هشدارها). هوش مصنوعی در تولید مدل‌های داده مشترک، منطق یادآوری و سیستم‌های مبتنی بر قانون برای هشدارها کمک می‌کند، همیشه امنیت داده و رضایت کاربر را در اولویت قرار می‌دهد.")}
        </p>
      </div>
    </section>
  );
};

export default SmartFamilySection;
