
import React from 'react';
import { toPersianDigits } from '../../utils';

const HomeModernIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
  </svg>
);

const InfoListItemSmartHome: React.FC<{ title?: string; children: React.ReactNode; className?: string }> = ({ title, children, className = "text-gray-300 text-md leading-relaxed" }) => (
  <li className={`list-disc list-inside mr-4 ${className}`}> {/* Adjusted for RTL */}
    {title && <strong className="text-sky-400 font-semibold">{title}: </strong>}
    {children}
  </li>
);

const SectionBlockSmartHome: React.FC<{ title: string; children: React.ReactNode; className?: string; note?: string }> = ({ title, children, className = "bg-slate-800 p-8 rounded-xl shadow-xl border border-slate-700", note }) => (
    <div className={className}>
        <h3 className="text-xl md:text-2xl font-semibold text-sky-300 mb-5">{title}</h3>
        {children}
        {note && <p className="text-sm text-gray-500 mt-4 italic">{note}</p>}
    </div>
);

const SmartHomeSection: React.FC = () => {
  const scenariosAutomations = [
    { title: toPersianDigits("ادغام پلتفرم (مفهومی)"), description: toPersianDigits("کد برای اتصال به پلتفرم‌های خانه هوشمند (Google Home، Alexa، HomeKit) و پروتکل‌های IoT (MQTT، Zigbee از طریق هاب/پل).") },
    { title: toPersianDigits("سناریوهای پیشنهادی هوش مصنوعی"), description: toPersianDigits("بر اساس الگوهای زندگی کاربر (زمان بیدار شدن، خروج/بازگشت)، هوش مصنوعی اتوماسیون‌ها را پیشنهاد می‌دهد (مثلاً 'صبح بخیر: چراغ‌ها روشن، ترموستات روی ۲۲ درجه سانتی‌گراد، قهوه‌ساز روشن').") },
    { title: toPersianDigits("رابط کاربری ساده برای کنترل"), description: toPersianDigits("رابط کاربری شهودی (React) برای کاربران جهت فعال‌سازی، غیرفعال‌سازی یا سفارشی‌سازی این سناریوهای اتوماسیون.") },
    { title: toPersianDigits("کنترل دستگاه"), description: toPersianDigits("توانایی کنترل دستگاه‌های هوشمند متصل (چراغ‌ها، ترموستات‌ها، قفل‌ها، دوربین‌ها) از طریق پلتفرم.") },
  ];

  const energyOptimization = [
    { title: toPersianDigits("تحلیل الگوی مصرف"), description: toPersianDigits("الگوریتم‌های ML داده‌های انرژی از دستگاه‌های هوشمند و کنتورهای هوشمند را برای شناسایی الگوهای مصرف و مناطق اتلاف انرژی تحلیل می‌کنند.") },
    { title: toPersianDigits("کنترل هوشمند دستگاه"), description: toPersianDigits("به طور خودکار ترموستات‌ها را بر اساس حضور (از طریق سنسورهای حضور) تنظیم می‌کند، چراغ‌های فراموش شده را خاموش می‌کند یا زمان‌های بهینه برای استفاده از وسایل پرمصرف (مثلاً ماشین لباسشویی در ساعات غیر اوج) را پیشنهاد می‌دهد.") },
    { title: toPersianDigits("پیش‌بینی و گزارش مصرف"), description: toPersianDigits("مصرف انرژی آینده را پیش‌بینی می‌کند و گزارش‌های بصری دقیقی به کاربر ارائه می‌دهد.") },
    { title: toPersianDigits("بینش‌های پس‌انداز شخصی‌سازی شده"), description: toPersianDigits("پیشنهاداتی برای کاهش مصرف انرژی ارائه می‌دهد (مثلاً 'با تنظیم ترموستات روی X درجه در شب، می‌توانید Y مقدار در ماه پس‌انداز کنید').") }
  ];
  
  const carbonFootprint = [
    { title: toPersianDigits("مدل محاسبه جامع"), description: toPersianDigits("ردپای کربن شخصی کاربر را با تحلیل داده‌های مربوط به مصرف انرژی (برق، گاز، آب)، حمل و نقل (نوع وسیله نقلیه، مسافت)، رژیم غذایی (گوشت در مقابل گیاهی) و عادات خرید (پلاستیک، قابل بازیافت) محاسبه و پیگیری می‌کند.") },
    { title: toPersianDigits("تبدیل به معادل CO2"), description: toPersianDigits("هوش مصنوعی داده‌های جمع‌آوری شده را به معادل‌های ردپای کربن تبدیل می‌کند.") },
    { title: toPersianDigits("گزارش‌های بصری و راهنمایی کاهش"), description: toPersianDigits("گزارش‌های بصری از ردپای کربن کاربر ارائه می‌دهد و پیشنهادات عملی برای کاهش این ردپا و زندگی پایدارتر ارائه می‌دهد (مثلاً 'به جای رانندگی پیاده‌روی کنید'، 'مصرف گوشت قرمز را کاهش دهید').") }
  ];

  const homeMaintenance = [
    { title: toPersianDigits("نگهداری برنامه‌ریزی شده"), description: toPersianDigits("هوش مصنوعی در ایجاد و مدیریت یک برنامه برای کارهای نگهداری معمول خانه (مثلاً تعویض فیلترهای هوا، تمیز کردن ناودان‌ها، بررسی لوازم خانگی) با یادآوری‌های به‌موقع کمک می‌کند.") },
    { title: toPersianDigits("نگهداری پیش‌بینی‌کننده (آینده)"), description: toPersianDigits("مفهومی: هوش مصنوعی می‌تواند داده‌های سنسور از لوازم خانگی هوشمند یا سیستم‌های خانه را برای پیش‌بینی نیازهای نگهداری بالقوه قبل از بروز مشکلات تحلیل کند.")}
  ];
  

  return (
    <section id="smart-home-living" className="py-20 md:py-28 bg-slate-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-sky-500/10 rounded-full mb-4">
            <HomeModernIcon className="w-12 h-12 text-sky-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-5">
            {toPersianDigits("فاز ۴.۵: خانه هوشمند و زندگی پایدار")}
          </h2>
          <div className="section-title-underline"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-8">
            {toPersianDigits("توسعه شبیه‌سازی شده کنترل خانه هوشمند، یک دستیار سبک زندگی پایدار و پشتیبانی نگهداری خانه.")}
          </p>
        </div>

        <div className="space-y-12">
          <SectionBlockSmartHome title={toPersianDigits("سناریوها و اتوماسیون‌های خانه هوشمند")} note={toPersianDigits("هوش مصنوعی کد برای ادغام پلتفرم، پیشنهادات سناریو و UI کنترل تولید می‌کند.")}>
            <ul className="space-y-4">
              {scenariosAutomations.map((item, index) => (
                <InfoListItemSmartHome key={index} title={item.title}>{item.description}</InfoListItemSmartHome>
              ))}
            </ul>
          </SectionBlockSmartHome>

          <SectionBlockSmartHome title={toPersianDigits("بهینه‌سازی انرژی و پایداری")} note={toPersianDigits("هوش مصنوعی الگوریتم‌های ML برای تحلیل مصرف، کنترل هوشمند و پیشنهادات پس‌انداز تولید می‌کند.")}>
            <ul className="space-y-4">
              {energyOptimization.map((item, index) => (
                <InfoListItemSmartHome key={index} title={item.title}>{item.description}</InfoListItemSmartHome>
              ))}
            </ul>
          </SectionBlockSmartHome>

          <SectionBlockSmartHome title={toPersianDigits("محاسبه و کاهش ردپای کربن")} note={toPersianDigits("هوش مصنوعی مدل محاسبه، منطق تبدیل و پیشنهادات کاهش ردپا را توسعه می‌دهد.")}>
            <ul className="space-y-4">
              {carbonFootprint.map((item, index) => (
                <InfoListItemSmartHome key={index} title={item.title}>{item.description}</InfoListItemSmartHome>
              ))}
            </ul>
          </SectionBlockSmartHome>

          <SectionBlockSmartHome title={toPersianDigits("یادآورها و پشتیبانی نگهداری خانه")} note={toPersianDigits("هوش مصنوعی در ایجاد برنامه‌های نگهداری و مفاهیم اولیه برای نگهداری پیش‌بینی‌کننده کمک می‌کند.")}>
            <ul className="space-y-4">
              {homeMaintenance.map((item, index) => (
                <InfoListItemSmartHome key={index} title={item.title}>{item.description}</InfoListItemSmartHome>
              ))}
            </ul>
          </SectionBlockSmartHome>
        </div>
        
        <p className="text-sm text-gray-400 mt-12 text-center">
          {toPersianDigits("خروجی‌های شبیه‌سازی شده: ماژول‌های برای خانه هوشمند (کد برای یکپارچه‌سازی، اتوماسیون‌ها، UI)، دستیار پایداری (الگوریتم‌های بهینه‌سازی انرژی، محاسبه‌گر ردپای کربن)، و پشتیبانی از نگهداری خانه (کد برای زمان‌بندی، یادآورها). هوش مصنوعی در تولید الگوریتم‌های ML برای تحلیل الگو، منطق کنترل دستگاه، و طراحی UI تعاملی کمک می‌کند.")}
        </p>
      </div>
    </section>
  );
};

export default SmartHomeSection;
