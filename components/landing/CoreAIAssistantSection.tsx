import React from 'react';
import { toPersianDigits } from '../../utils'; 
import { ChatBubbleLeftRightIcon } from '../shared/AppIcons'; 

const InfoListItemCoreAI: React.FC<{ title?: string; children: React.ReactNode; className?: string }> = ({ title, children, className = "text-gray-300 text-md leading-relaxed" }) => (
  <li className={`list-disc list-inside mr-4 ${className}`}>
    {title && <strong className="text-sky-400 font-semibold">{title}: </strong>}
    {children}
  </li>
);

const SectionBlock: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className = "bg-slate-800 p-8 rounded-xl shadow-xl border border-slate-700" }) => (
    <div className={className}>
        <h3 className="text-xl md:text-2xl font-semibold text-sky-300 mb-5">{title}</h3>
        {children}
    </div>
);

export const CoreAIAssistantSection: React.FC = () => {
  const aiPersonalization = [
    { title: toPersianDigits("سفارشی‌سازی آواتار"), description: toPersianDigits("رابط کاربری با گالری آواتارهای از پیش تعریف شده، گزینه بارگذاری تصاویر سفارشی (با اعتبارسنجی) و یک جایگزین برای آواتارهای تولید شده توسط هوش مصنوعی در آینده. بک‌اند انتخاب یا URL را ذخیره می‌کند.") },
    { title: toPersianDigits("انتخاب صدا"), description: toPersianDigits("لیست کشویی از صداهای TTS با کیفیت بالا (مثلاً از Google Cloud TTS، Amazon Polly) با قابلیت پیش‌نمایش. انتخاب در پروفایل کاربر ذخیره می‌شود.") },
    { title: toPersianDigits("شخصی‌سازی نام"), description: toPersianDigits("ورودی متنی ساده برای کاربران تا نام دستیار هوش مصنوعی خود را انتخاب کنند. نام در پرامپت‌های NLG استفاده می‌شود.") }
  ];

  const conversationalInterface = [
    toPersianDigits("جریان نمونه (ایجاد وظیفه): کاربر می‌گوید/تایپ می‌کند: 'سلام [نام_هوش_مصنوعی]، یک وظیفه برای نوشتن گزارش هفتگی پروژه ققنوس ایجاد کن، مهلت تا این جمعه ساعت ۵ بعد از ظهر.'"),
    toPersianDigits("پردازش NLU: قصد (`CREATE_TASK`)، موجودیت‌ها (`TASK_TITLE`: 'نوشتن گزارش هفتگی'، `PROJECT_NAME`: 'پروژه ققنوس'، `DUE_DATE`: 'این جمعه'، `DUE_TIME`: 'ساعت ۵ بعد از ظهر') را شناسایی می‌کند."),
    toPersianDigits("رفع ابهام (در صورت نیاز): اگر پروژه یا تاریخ نامشخص باشد، هوش مصنوعی سوالات شفاف‌کننده می‌پرسد."),
    toPersianDigits("تأیید: NLG تولید می‌کند: 'بسیار خب، وظیفه را ایجاد کردم: «نوشتن گزارش هفتگی» برای پروژه ققنوس، مهلت تا این جمعه ساعت ۵ بعد از ظهر. درست است؟'"),
    toPersianDigits("مکانیزم‌های زیربنایی: مدیریت وضعیت قوی، مدیریت خطای زمینه‌ای (مثلاً 'متأسفم، نام پروژه را متوجه نشدم')، تغییر موضوع روان، ادغام تنگاتنگ با موتورهای NLU/NLG/استدلال.")
  ];

  const contextAwareness = [
    { title: toPersianDigits("مکان (GPS)"), description: toPersianDigits("با رضایت صریح کاربر، دسترسی به GPS برای یادآوری‌های آگاه از مکان ('وقتی نزدیک فروشگاه مواد غذایی هستم به من یادآوری کن شیر بخرم') یا پیشنهادات (مثلاً مکان‌های آرام نزدیک برای کار اگر نیاز به تمرکز باشد).") },
    { title: toPersianDigits("ادغام تقویم"), description: toPersianDigits("با اجازه، دسترسی به تقویم برای درک برنامه کاربر، پیشنهاد زمان‌های بهینه برای وظایف، هشدار در مورد تداخل‌ها و کمک در برنامه‌ریزی اوقات فراغت.") },
    { title: toPersianDigits("سنسورهای دستگاه (مفهومی)"), description: toPersianDigits("پتانسیل آینده: داده‌های شتاب‌سنج/ژیروسکوپ (با رضایت) برای استنتاج وضعیت فعالیت (مثلاً پیاده‌روی، رانندگی) برای تنظیم زمان اعلان یا پیشنهاد اقدامات مرتبط. تمام پردازش داده‌ها با محوریت حریم خصوصی و امن است.") }
  ];

  const privacyDashboard = [
    { title: toPersianDigits("نمایش دسته‌بندی داده‌ها"), description: toPersianDigits("رابط کاربری به وضوح انواع داده‌های جمع‌آوری شده/استفاده شده (مثلاً مکالمات، وظایف، عادات، مکان، رویدادهای تقویم) را با خلاصه‌های بصری لیست می‌کند.") },
    { title: toPersianDigits("کنترل‌های داده کاربر"), description: toPersianDigits("عملکردی برای کاربران جهت مشاهده داده‌های ذخیره شده خود، ویرایش در صورت لزوم (مثلاً جزئیات وظیفه) و درخواست حذف نقاط داده خاص یا کل داده‌های حساب خود، با رعایت اصول GDPR/CCPA.") },
    { title: toPersianDigits("توضیح تصمیم هوش مصنوعی (XAI)"), description: toPersianDigits("یک دکمه یا پیوند مرتبط با پیشنهادات هوش مصنوعی. کلیک بر روی آن توضیح می‌دهد که چرا هوش مصنوعی یک پیشنهاد خاص را ارائه داده است (مثلاً بر اساس کدام داده‌ها یا قوانین).") } // Added missing part of the prompt
  ];


  return (
    <section id="core-ai-assistant" className="py-20 md:py-28 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-sky-500/10 rounded-full mb-4">
            <ChatBubbleLeftRightIcon className="w-12 h-12 text-sky-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-5">
            {toPersianDigits("فاز ۳.۱: دستیار هوش مصنوعی مرکزی و شخصی‌سازی")}
          </h2>
          <div className="section-title-underline"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-8">
            {toPersianDigits("طراحی شبیه‌سازی شده برای یک دستیار هوش مصنوعی کاملاً شخصی‌سازی شده که به عنوان هسته پلتفرم LifeOrchestrator AI عمل می‌کند.")}
          </p>
        </div>

        <div className="space-y-12">
          <SectionBlock title={toPersianDigits("شخصی‌سازی پایه دستیار هوش مصنوعی")}>
            <ul className="space-y-4">
              {aiPersonalization.map((item, index) => (
                <InfoListItemCoreAI key={index} title={item.title}>{item.description}</InfoListItemCoreAI>
              ))}
            </ul>
          </SectionBlock>

          <SectionBlock title={toPersianDigits("رابط مکالمه‌ای روان و آگاه از زمینه")}>
            <ul className="space-y-4">
              {conversationalInterface.map((item, index) => (
                <InfoListItemCoreAI key={index}>{item}</InfoListItemCoreAI>
              ))}
            </ul>
          </SectionBlock>

          <SectionBlock title={toPersianDigits("آگاهی از زمینه (مفهومی - مشروط به رضایت کاربر)")}>
            <ul className="space-y-4">
              {contextAwareness.map((item, index) => (
                <InfoListItemCoreAI key={index} title={item.title}>{item.description}</InfoListItemCoreAI>
              ))}
            </ul>
          </SectionBlock>

          <SectionBlock title={toPersianDigits("داشبورد حریم خصوصی و کنترل داده‌ها")}>
            <ul className="space-y-4">
              {privacyDashboard.map((item, index) => (
                <InfoListItemCoreAI key={index} title={item.title}>{item.description}</InfoListItemCoreAI>
              ))}
            </ul>
          </SectionBlock>
        </div>
        
        <p className="text-sm text-gray-400 mt-12 text-center">
          {toPersianDigits("خروجی‌های شبیه‌سازی شده: ماژول‌های مفهومی برای شخصی‌سازی دستیار، رابط کاربری مکالمه‌ای، و داشبورد حریم خصوصی (کد فرانت‌اند/بک‌اند). هوش مصنوعی در تولید جریان‌های گفتگو، منطق شخصی‌سازی و طراحی UI تعاملی کمک می‌کند.")}
        </p>
      </div>
    </section>
  );
};
