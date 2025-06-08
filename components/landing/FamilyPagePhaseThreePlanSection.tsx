
import React from 'react';
import { toPersianDigits } from '../../utils';
import { 
    ClipboardDocumentCheckIcon, // Main section icon for "Plan"
    AdjustmentsVerticalIcon as OrchestrationIcon, // For "Orchestration"
    HeartIcon as WellbeingScoreIcon, // For "Well-being Score"
    SparklesIconNav as QualityTimeIcon, // For "Quality Time"
    LightbulbIcon, // For AI insights/suggestions
    CalendarDaysIcon // For calendar related items
} from '../shared/AppIcons';

// Re-using a similar block structure from other planning sections
const SectionBlockPlan: React.FC<{ title: string; children: React.ReactNode; className?: string; icon?: React.ReactNode }> = ({ title, children, className = "bg-slate-800 p-6 md:p-8 rounded-xl shadow-xl border border-slate-700", icon }) => (
    <div className={`${className} mb-8`}>
        <div className="flex items-center mb-5">
            {icon && <div className="p-2 bg-sky-500/10 rounded-full mr-3 rtl:ml-3 rtl:mr-0">{icon}</div>}
            <h3 className="text-xl md:text-2xl font-semibold text-sky-300">{toPersianDigits(title)}</h3>
        </div>
        {children}
    </div>
);

const DetailItem: React.FC<{ title: string; children: React.ReactNode; icon?: React.ReactElement<{ className?: string }> }> = ({ title, children, icon }) => (
  <div className="mb-4 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
    <div className="flex items-center text-md font-medium text-sky-400 mb-2">
      {icon && React.cloneElement(icon, {className: "w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0"})}
      {toPersianDigits(title)}
    </div>
    <div className="text-sm text-gray-300 leading-relaxed space-y-1">{children}</div>
  </div>
);


const FamilyPagePhaseThreePlanSection: React.FC = () => {
  return (
    <section id="family-phase-3-plan" className="py-20 md:py-28 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-sky-500/10 rounded-full mb-4">
             <ClipboardDocumentCheckIcon className="w-12 h-12 text-sky-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-5">
            {toPersianDigits("فاز ۳: ارکستراسیون جامع خانواده، مراقبت پیش‌بینانه و جامعه حمایتی")}
          </h2>
           <div className="section-title-underline"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-8">
            {toPersianDigits("هدف اصلی این فاز، دستیابی به یک سیستم کاملاً یکپارچه است که در آن امور خانواده به طور هوشمند با سایر جنبه‌های زندگی هماهنگ می‌شود، مراقبت از اعضا به صورت پیش‌بینانه و فعال انجام می‌پذیرد، و جامعه‌ای برای پشتیبانی و تبادل تجربیات بین خانواده‌ها شکل می‌گیرد.")}
          </p>
        </div>

        <SectionBlockPlan title="۳.۱. ارکستراسیون کامل امور خانواده با سایر جنبه‌های زندگی" icon={<OrchestrationIcon className="w-7 h-7 text-sky-400" />}>
            <DetailItem title="تحلیل هوش مصنوعی برای تعادل و هماهنگی بهتر" icon={<LightbulbIcon />}>
                <p>{toPersianDigits("هوش مصنوعی برنامه‌های کلی خانواده، اهداف، وضعیت سلامت و مالی را تحلیل کرده و پیشنهاداتی برای تعادل و هماهنگی بهتر ارائه می‌دهد.")}</p>
                <p className="text-xs text-gray-400 mt-1">{toPersianDigits("مثال: «با توجه به حجم کاری شما در این هفته و نیاز [نام فرزند] به آمادگی برای امتحان، پیشنهاد می‌شود برخی کارهای خانه را به تعویق بیندازید یا از کمک بیرونی استفاده کنید.» این پیشنهادات به صورت کارت‌های هوشمند و غیرمزاحم در صفحه خانواده یا از طریق اعلان‌ها ارائه می‌شوند و کاربر می‌تواند آن‌ها را بپذیرد، تغییر دهد یا رد کند.")}</p>
            </DetailItem>
            
            <DetailItem title="«امتیاز تندرستی خانواده»" icon={<WellbeingScoreIcon />}>
                <p>{toPersianDigits("هوش مصنوعی یک امتیاز کلی برای تندرستی خانواده محاسبه می‌کند. این امتیاز بر اساس پارامترهایی مانند زمان با کیفیت سپری شده با هم، تقسیم عادلانه وظایف، پایبندی به برنامه‌های مراقبتی و حتی تحلیل احساسات پیام‌های خانوادگی (با رعایت کامل حریم خصوصی و کسب رضایت) خواهد بود.")}</p>
                <p className="text-xs text-gray-400 mt-1">{toPersianDigits("UI/UX: نمایش این امتیاز به صورت یک شاخص بصری جذاب (مانند یک قلب یا درخت خانواده که رشد می‌کند یا درخشان‌تر می‌شود) در داشبورد صفحه خانواده. با کلیک بر روی امتیاز، گزارشی از عوامل تأثیرگذار و پیشنهادات بهبود نمایش داده می‌شود (مثال: «شما این هفته ۳ وعده شام خانوادگی مشترک داشته‌اید! ادامه دهید.» یا «چندین یادآور مراقبت برای مادربزرگ فراموش شده است. مایلید برنامه را بازبینی کنید؟»).")}</p>
            </DetailItem>

            <DetailItem title="برنامه‌ریزی «زمان با کیفیت خانوادگی» با هوش مصنوعی" icon={<QualityTimeIcon />}>
                <p>{toPersianDigits("هوش مصنوعی زمان‌های آزاد مشترک اعضای خانواده را شناسایی کرده و با در نظر گرفتن علایق آن‌ها، فعالیت‌های مشترکی (بازی، سفر کوتاه، گفتگو) پیشنهاد می‌دهد و امکان افزودن آن‌ها به تقویم را فراهم می‌کند.")}</p>
                <ul className="list-disc list-inside mr-4 rtl:pr-4 rtl:mr-0 text-xs text-gray-400 space-y-1 mt-1">
                    <li>{toPersianDigits("هوش مصنوعی تقویم‌های فردی و خانوادگی را برای یافتن زمان‌های خالی هم‌پوشان اسکن می‌کند.")}</li>
                    <li>{toPersianDigits("علایق اعضا (از پروفایل‌ها)، وضعیت آب و هوا (با دسترسی به موقعیت مکانی و API هواشناسی) و بودجه (با یکپارچگی با صفحه مالی) در نظر گرفته می‌شود.")}</li>
                    <li>{toPersianDigits("UI/UX: یک دکمه «پیشنهاد زمان با کیفیت» یا یک کارت پیشنهاد فعال. مثال کارت: «هوش مصنوعی یک فرصت ۲ ساعته در بعدازظهر شنبه این هفته پیدا کرده که همه آزاد هستید. نظرتان چیست: [ ] بازدید از پارک، [ ] بازی گروهی، [ ] تماشای فیلم در خانه؟ [افزودن به تقویم]»")}</li>
                    <li>{toPersianDigits("امکان مشخص کردن ترجیحات برای پیشنهادات (مثلاً فعالیت‌های بیرون از خانه، کم‌هزینه، آموزشی).")}</li>
                    <li>{toPersianDigits("افزودن آسان فعالیت انتخابی با یک کلیک به تقویم تمام اعضای مرتبط خانواده (ایجاد یک رویداد مشترک).")}</li>
                </ul>
            </DetailItem>
        </SectionBlockPlan>
        
        {/* Placeholder for Future Phases if content is provided by user */}
        {/* 
        <SectionBlockPlan title="۳.۲. مراقبت پیش‌بینانه و فعال از اعضای خانواده" icon={<SomeIcon />}>
            ...
        </SectionBlockPlan>

        <SectionBlockPlan title="۳.۳. ایجاد جامعه حمایتی و تبادل تجربیات" icon={<SomeOtherIcon />}>
            ...
        </SectionBlockPlan>
        */}

      </div>
    </section>
  );
};

export default FamilyPagePhaseThreePlanSection;

// Remember to import and add this section to LandingPageLayout.tsx
// For example, after <SmartFamilySection /> and before <UserExperienceCommunitySection />
// <FamilyPagePhaseThreePlanSection />
// Also, ensure AppIcons.tsx exports ClipboardDocumentCheckIcon, AdjustmentsVerticalIcon, WellbeingScoreIcon (same as HeartIcon), QualityTimeIcon (same as SparklesIconNav).
// Ensure shared components like SectionBlockPlan and DetailItem are suitably styled or adapt existing ones.
