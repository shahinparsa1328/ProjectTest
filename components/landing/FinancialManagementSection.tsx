
import React from 'react';
import { toPersianDigits } from '../../utils';

const CurrencyDollarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const InfoListItemFinance: React.FC<{ title?: string; children: React.ReactNode; className?: string }> = ({ title, children, className = "text-gray-300 text-md leading-relaxed" }) => (
  <li className={`list-disc list-inside mr-4 ${className}`}> {/* Adjusted for RTL */}
    {title && <strong className="text-sky-400 font-semibold">{title}: </strong>}
    {children}
  </li>
);

const SectionBlockFinance: React.FC<{ title: string; children: React.ReactNode; className?: string; note?: string }> = ({ title, children, className = "bg-slate-800 p-8 rounded-xl shadow-xl border border-slate-700", note }) => (
    <div className={className}>
        <h3 className="text-xl md:text-2xl font-semibold text-sky-300 mb-5">{title}</h3>
        {children}
        {note && <p className="text-sm text-gray-500 mt-4 italic">{note}</p>}
    </div>
);

const FinancialManagementSection: React.FC = () => {
  const transactionCategorization = [
    { title: toPersianDigits("دسته‌بندی مبتنی بر هوش مصنوعی"), description: toPersianDigits("الگوریتم‌های ML (مثلاً طبقه‌بندی متن روی توضیحات تراکنش) به طور خودکار تراکنش‌های بانکی (غذا، حمل و نقل، قبوض) را دسته‌بندی می‌کنند.") },
    { title: toPersianDigits("یادگیری تطبیقی"), description: toPersianDigits("سیستم از اصلاحات کاربر برای بهبود دقت دسته‌بندی در طول زمان یاد می‌گیرد (یادگیری فعال).") },
    { title: toPersianDigits("تشخیص الگو"), description: toPersianDigits("هوش مصنوعی الگوهای تراکنش مکرر را شناسایی می‌کند (مثلاً 'خریدهای فروشگاه X همیشه مواد غذایی هستند').") },
    { title: toPersianDigits("ادغام امن بانکی (مفهومی)"), description: toPersianDigits("ادغام امن API (مثلاً از طریق Plaid یا استانداردهای Open Banking) برای واکشی تراکنش‌ها، با رضایت صریح کاربر و تدابیر امنیتی قوی.") },
  ];

  const budgetingAlgorithms = [
    { title: toPersianDigits("تحلیل درآمد و هزینه"), description: toPersianDigits("هوش مصنوعی الگوهای درآمد و هزینه گذشته کاربر را برای ارائه یک نمای کلی مالی واضح تحلیل می‌کند.") },
    { title: toPersianDigits("پیش‌بینی"), description: toPersianDigits("هزینه‌های آینده را بر اساس داده‌های تاریخی و پرداخت‌های مکرر آتی (مثلاً قبوض، اشتراک‌ها) پیش‌بینی می‌کند.") },
    { title: toPersianDigits("بودجه‌بندی هدف‌گرا"), description: toPersianDigits("تخصیص بودجه در دسته‌بندی‌ها را پیشنهاد می‌دهد، که برای کمک به کاربران در دستیابی به اهداف مالی خود (مثلاً پس‌انداز برای پیش‌پرداخت، تعطیلات) بهینه شده است.") },
    { title: toPersianDigits("هشدارها و بینش‌ها"), description: toPersianDigits("هشدارهای به‌موقع برای نزدیک شدن به سقف بودجه ارائه می‌دهد، فرصت‌های پس‌انداز بالقوه را شناسایی می‌کند و بینش‌هایی در مورد عادات خرج کردن ارائه می‌دهد.") }
  ];
  
  const goalSimulation = [
    { title: toPersianDigits("برنامه‌ریزی اهداف عمده"), description: toPersianDigits("مدل‌هایی برای اهداف مالی قابل توجه مانند پیش‌پرداخت ملک، برنامه‌ریزی بازنشستگی یا صندوق تحصیل فرزندان.") },
    { title: toPersianDigits("شبیه‌سازی‌های مونت کارلو"), description: toPersianDigits("تحلیل سناریوی 'چه می‌شود اگر' (مثلاً تأثیر نرخ‌های پس‌انداز مختلف، تورم، بازده سرمایه‌گذاری) را برای پیش‌بینی نتایج و جدول زمانی انجام می‌دهد.") },
    { title: toPersianDigits("تحلیل حساسیت"), description: toPersianDigits("نشان می‌دهد که چگونه تغییرات در متغیرهای کلیدی (مثلاً پس‌انداز ماهانه، بازده مورد انتظار) بر دستیابی به هدف تأثیر می‌گذارد.") },
    { title: toPersianDigits("گزارش‌های پیشرفت بصری"), description: toPersianDigits("نمودارها و گراف‌های تعاملی پیشرفت به سمت اهداف مالی را نمایش می‌دهند، که پیگیری و حفظ انگیزه را آسان می‌کند.") }
  ];
  
  const investmentAssistant = [
    { title: toPersianDigits("تحلیل پروفایل ریسک"), description: toPersianDigits("از پرسشنامه‌ها و به طور بالقوه تحلیل رفتاری (از استفاده از برنامه) برای کمک به کاربران در درک تحمل ریسک سرمایه‌گذاری خود (محافظه‌کار، متعادل، تهاجمی) استفاده می‌کند.") },
    { title: toPersianDigits("پیشنهادات تخصیص دارایی"), description: toPersianDigits("بر اساس پروفایل ریسک، اهداف مالی و شرایط شبیه‌سازی شده بازار، پیشنهادات تخصیص دارایی گویا (مثلاً ترکیبی از سهام، اوراق قرضه، ETFها) ارائه می‌دهد.") },
    { title: toPersianDigits("بهینه‌سازی پورتفولیو (مفهومی)"), description: toPersianDigits("کاربرد مفهومی اصول نظریه پورتفولیوی مدرن (MPT) برای پیشنهاد ساختارهای پورتفولیوی بهینه برای ریسک/بازده.") },
    { title: toPersianDigits("نظارت بر بازار و هشدارهای تعادل مجدد"), description: toPersianDigits("هشدارهای شبیه‌سازی شده برای تغییرات قابل توجه بازار یا زمانی که یک پورتفولیو از تخصیص هدف منحرف می‌شود، با پیشنهاد تعادل مجدد.") },
    { title: toPersianDigits("سلب مسئولیت حیاتی"), description: toPersianDigits("این ویژگی فقط برای اهداف اطلاعاتی و آموزشی است و مشاوره مالی محسوب نمی‌شود. تمام تصمیمات سرمایه‌گذاری تنها مسئولیت کاربر است. پلتفرم برای مشاوره تنظیم‌شده نیاز به مجوزهای مناسب خواهد داشت.") }
  ];

  return (
    <section id="financial-management" className="py-20 md:py-28 bg-slate-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-sky-500/10 rounded-full mb-4">
            <CurrencyDollarIcon className="w-12 h-12 text-sky-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-5">
            {toPersianDigits("فاز ۴.۳: مدیریت مالی هوشمند و برنامه‌ریزی ثروت")}
          </h2>
          <div className="section-title-underline"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-8">
            {toPersianDigits("توسعه شبیه‌سازی شده قابلیت‌های پیگیری مالی، بودجه‌بندی، پیش‌بینی و دستیار سرمایه‌گذاری (اختیاری) مبتنی بر هوش مصنوعی.")}
          </p>
        </div>

        <div className="space-y-12">
          <SectionBlockFinance title={toPersianDigits("دسته‌بندی هوشمند تراکنش‌ها")} note={toPersianDigits("هوش مصنوعی کد پایتون برای مدل‌های طبقه‌بندی ML و منطق ادغام امن API بانکی تولید می‌کند.")}>
            <ul className="space-y-4">
              {transactionCategorization.map((item, index) => (
                <InfoListItemFinance key={index} title={item.title}>{item.description}</InfoListItemFinance>
              ))}
            </ul>
          </SectionBlockFinance>

          <SectionBlockFinance title={toPersianDigits("بودجه‌بندی انعطاف‌پذیر و واقع‌بینانه با راهنمایی هوش مصنوعی")} note={toPersianDigits("هوش مصنوعی الگوریتم‌های پیش‌بینی را پیاده‌سازی می‌کند و UI (React) برای تنظیم بودجه و بینش‌ها ارائه می‌دهد.")}>
            <ul className="space-y-4">
              {budgetingAlgorithms.map((item, index) => (
                <InfoListItemFinance key={index} title={item.title}>{item.description}</InfoListItemFinance>
              ))}
            </ul>
          </SectionBlockFinance>

          <SectionBlockFinance title={toPersianDigits("شبیه‌سازی و پیش‌بینی اهداف مالی")} note={toPersianDigits("هوش مصنوعی کد برای مدل‌های مالی (مثلاً مونت کارلو) و اجزای نمودار تعاملی (React) تولید می‌کند.")}>
            <ul className="space-y-4">
              {goalSimulation.map((item, index) => (
                <InfoListItemFinance key={index} title={item.title}>{item.description}</InfoListItemFinance>
              ))}
            </ul>
          </SectionBlockFinance>
          
          <SectionBlockFinance 
            title={toPersianDigits("دستیار سرمایه‌گذاری (اختیاری و نیازمند مجوز - با سلب مسئولیت‌های قوی)")} 
            note={toPersianDigits("هوش مصنوعی در توسعه ابزارهای ارزیابی ریسک، مدل‌های شبیه‌سازی برای تخصیص دارایی و الگوریتم‌های بهینه‌سازی پورتفولیو کمک می‌کند، همیشه بر مسئولیت کاربر و نیاز به مشاوره حرفه‌ای در صورت لزوم تأکید دارد.")}
            className="bg-slate-800 p-8 rounded-xl shadow-xl border border-yellow-500/50" // Special border for emphasis
          >
            <ul className="space-y-4">
              {investmentAssistant.map((item, index) => (
                <InfoListItemFinance key={index} title={item.title}>{item.description}</InfoListItemFinance>
              ))}
            </ul>
          </SectionBlockFinance>
        </div>
        
        <p className="text-sm text-gray-400 mt-12 text-center">
          {toPersianDigits("خروجی‌های شبیه‌سازی شده: ماژول‌های مفهومی برای پیگیری مالی (کد بک‌اند/فرانت‌اند)، بودجه‌بندی و اهداف مالی (الگوریتم‌ها و کد UI)، و یک ماژول دستیار سرمایه‌گذاری (کد شبیه‌سازی و الگوریتم‌ها). هوش مصنوعی در تولید الگوریتم‌های ML برای دسته‌بندی، مدل‌های پیش‌بینی مالی و اجزای UI برای داشبوردها و ابزارهای برنامه‌ریزی کمک می‌کند. امنیت و حریم خصوصی داده‌ها بسیار مهم هستند.")}
        </p>
      </div>
    </section>
  );
};

export default FinancialManagementSection;