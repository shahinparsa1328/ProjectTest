import React from 'react';
import { toPersianDigits } from '../../utils';
import { 
    UserGroupIcon, // Main section icon & for private groups
    PlayCircleIcon, // For webinars
    ChatBubbleOvalLeftEllipsisIcon as QAndAIcon, // For Q&A
    LightbulbIcon, // For AI insights/suggestions
    ShieldCheckIcon // For privacy emphasis
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


const FamilyPagePhaseThreePlanSectionCommunity: React.FC = () => {
  return (
    <section id="family-phase-3-community-plan" className="py-20 md:py-28 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-sky-500/10 rounded-full mb-4">
             <UserGroupIcon className="w-12 h-12 text-sky-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-5">
            {toPersianDigits("فاز ۳.۴: جامعه حمایتی خانواده (اختیاری و با رعایت کامل حریم خصوصی)")}
          </h2>
           <div className="section-title-underline"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-8">
            {toPersianDigits("ایجاد فضایی امن و مفید برای خانواده‌ها جهت تبادل تجربه، دریافت پشتیبانی و راهنمایی متقابل، همراه با دسترسی به محتوای تخصصی.")}
          </p>
        </div>

        <SectionBlockPlan title="ایجاد گروه‌های خصوصی و امن برای خانواده‌ها" icon={<UserGroupIcon className="w-7 h-7 text-sky-400" />}>
            <DetailItem title="گروه‌های موضوعی برای شرایط مشابه" icon={<UserGroupIcon />}>
                <p>{toPersianDigits("امکان ایجاد یا پیوستن به گروه‌های خصوصی برای خانواده‌هایی با شرایط مشابه (مثلاً والدین کودکان نوپا، مراقبان سالمندان با بیماری‌های خاص) جهت تبادل تجربه، پشتیبانی و راهنمایی متقابل.")}</p>
                <ul className="list-disc list-inside mr-4 rtl:pr-4 rtl:mr-0 text-xs text-gray-400 space-y-1 mt-1">
                    <li>{toPersianDigits("UI/UX: بخش 'گروه‌های پشتیبانی' در صفحه خانواده. هوش مصنوعی می‌تواند گروه‌های مرتبط را بر اساس پروفایل ناشناس خانواده پیشنهاد دهد (مثلاً در صورت ثبت مراقبت از سالمند مبتلا به آلزایمر، پیشنهاد گروه مراقبین آلزایمر).")}</li>
                    <li>{toPersianDigits("ایجاد گروه: نام، توضیحات، تنظیمات حریم خصوصی (فقط با دعوت، درخواست عضویت)، ابزارهای مدیریت ساده برای ادمین گروه.")}</li>
                    <li>{toPersianDigits("کشف گروه: جستجو با کلمات کلیدی، فیلتر بر اساس موضوعات (تربیت فرزند، مراقبت از سالمند، بیماری‌های خاص).")}</li>
                    <li>{toPersianDigits("درون گروه: بحث‌های امن رشته‌ای، امکان اشتراک‌گذاری نکات یا منابع (با حفظ حریم خصوصی)، پست‌های سنجاق شده توسط مدیران.")}</li>
                    <li>{toPersianDigits("تأکید شدید بر جداسازی داده‌ها بین گروه‌ها و پلتفرم اصلی و حفظ حریم خصوصی اعضا.")}</li>
                </ul>
            </DetailItem>
        </SectionBlockPlan>
        
        <SectionBlockPlan title="محتوای تخصصی و آموزشی" icon={<PlayCircleIcon className="w-7 h-7 text-sky-400" />}>
            <DetailItem title="وبینارها و کارگاه‌های آنلاین با متخصصان" icon={<PlayCircleIcon />}>
                <p>{toPersianDigits("سازماندهی وبینارها و کارگاه‌های آنلاین با متخصصان حوزه خانواده، تربیت فرزند و مراقبت از سالمند.")}</p>
                 <ul className="list-disc list-inside mr-4 rtl:pr-4 rtl:mr-0 text-xs text-gray-400 space-y-1 mt-1">
                    <li>{toPersianDigits("UI/UX: بخش 'وبینارها' با تقویم رویدادهای آینده، معرفی سخنرانان و لینک ثبت‌نام.")}</li>
                    <li>{toPersianDigits("هوش مصنوعی می‌تواند وبینارهای مرتبط با وضعیت خانواده یا علایق کاربر را پیشنهاد دهد.")}</li>
                    <li>{toPersianDigits("آرشیو وبینارهای گذشته (در صورت ضبط و اجازه).")}</li>
                    <li>{toPersianDigits("امکان پرسش و پاسخ زنده در طول جلسات.")}</li>
                </ul>
            </DetailItem>
        </SectionBlockPlan>

        <SectionBlockPlan title="پرسش و پاسخ امن و ناشناس" icon={<QAndAIcon className="w-7 h-7 text-sky-400" />}>
            <DetailItem title="فضایی برای سوالات حساس با گزینه ناشناس ماندن" icon={<ShieldCheckIcon />}>
                <p>{toPersianDigits("ایجاد یک بخش پرسش و پاسخ که کاربران بتوانند سوالات حساس خود را به صورت ناشناس مطرح کنند و از تجربیات دیگران یا پاسخ متخصصان بهره‌مند شوند.")}</p>
                 <ul className="list-disc list-inside mr-4 rtl:pr-4 rtl:mr-0 text-xs text-gray-400 space-y-1 mt-1">
                    <li>{toPersianDigits("UI/UX: بخش 'از جامعه بپرسید'. کاربر هنگام ارسال سوال، گزینه 'ارسال به صورت ناشناس' را انتخاب می‌کند.")}</li>
                    <li>{toPersianDigits("سوالات قبل از نمایش می‌توانند توسط مدیران بررسی شوند.")}</li>
                    <li>{toPersianDigits("اعضای جامعه پاسخ می‌دهند. امکان امتیازدهی به پاسخ‌ها.")}</li>
                    <li>{toPersianDigits("پاسخ‌های متخصصان (در صورت وجود) به طور مشخص نمایش داده می‌شوند.")}</li>
                    <li>{toPersianDigits("هوش مصنوعی می‌تواند سوالات را دسته‌بندی کرده و قبل از ارسال سوال جدید، سوالات مشابه موجود یا منابع مرتبط را پیشنهاد دهد.")}</li>
                </ul>
            </DetailItem>
        </SectionBlockPlan>

      </div>
    </section>
  );
};

export default FamilyPagePhaseThreePlanSectionCommunity;
// Make sure to add this component to LandingPageLayout.tsx after FamilyPagePhaseThreePlanSection
// e.g. <FamilyPagePhaseThreePlanSectionCommunity />
// No new AppIcons are strictly required as existing ones are reused.
// UserGroupIcon, PlayCircleIcon, ChatBubbleOvalLeftEllipsisIcon, LightbulbIcon, ShieldCheckIcon
