import React from 'react';
import { toPersianDigits } from '../../utils';
import { 
    UserGroupIcon as MentorIcon,
    AcademicCapIcon as ExpertiseIcon,
    SparklesIconNav as AISupportIcon,
    CalendarDaysIcon,
    AdjustmentsVerticalIcon as UIToolsIcon
} from '../shared/AppIcons';

// Re-using a similar block structure
const SectionBlockPlan: React.FC<{ title: string; children: React.ReactNode; className?: string; icon?: React.ReactNode; mainTitle?: boolean }> = ({ title, children, className = "bg-slate-800 p-6 md:p-8 rounded-xl shadow-xl border border-slate-700", icon, mainTitle = false }) => (
    <div className={`${className} mb-8`}>
        <div className="flex items-center mb-5">
            {icon && <div className={`p-2 rounded-full mr-3 rtl:ml-3 rtl:mr-0 ${mainTitle ? 'bg-sky-500/20' : 'bg-sky-500/10'}`}>{icon}</div>}
            <h3 className={`font-semibold ${mainTitle ? 'text-2xl md:text-3xl text-sky-200' : 'text-xl md:text-2xl text-sky-300'}`}>{toPersianDigits(title)}</h3>
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

const CommunityMentorshipPlanSection: React.FC = () => {
  return (
    <section id="community-mentorship-plan" className="py-20 md:py-28 bg-slate-900">
      <div className="container mx-auto px-6">
        <SectionBlockPlan title="۳.۲. برنامه مربیگری همتا با تسهیل‌گری هوش مصنوعی" icon={<MentorIcon className="w-7 h-7 text-sky-400" />} mainTitle={true}>
            <DetailItem title="ثبت‌نام کاربران به عنوان مربی (Mentor) یا کارآموز (Mentee)" icon={<ExpertiseIcon />}>
                <p>{toPersianDigits("کاربران می‌توانند با مشخص کردن حوزه‌های تخصص یا نیازهای خود به عنوان مربی یا کارآموز ثبت‌نام کنند.")}</p>
                <p className="text-xs text-gray-400 mt-1">{toPersianDigits("مثال: مربی در 'مدیریت زمان' یا کارآموز برای 'یادگیری پایتون'.")}</p>
            </DetailItem>
            
            <DetailItem title="پیشنهاد بهترین جفت‌های مربی-کارآموز توسط هوش مصنوعی" icon={<AISupportIcon />}>
                <p>{toPersianDigits("هوش مصنوعی بر اساس مهارت‌ها، اهداف، تجربیات و حتی ویژگی‌های شخصیتی (در صورت موجود بودن داده‌ها) بهترین جفت‌های مربی-کارآموز را پیشنهاد می‌دهد.")}</p>
                 <p className="text-xs text-gray-400 mt-1">{toPersianDigits("الگوریتم تطبیق‌دهی پیشرفته برای افزایش احتمال موفقیت رابطه مربیگری.")}</p>
            </DetailItem>

            <DetailItem title="ابزارهایی برای برنامه‌ریزی جلسات مربیگری، تعیین اهداف مشترک و پیگیری پیشرفت" icon={<CalendarDaysIcon />}>
                <p>{toPersianDigits("ابزارهای داخلی برای تسهیل فرآیند مربیگری:")}</p>
                <ul className="list-disc list-inside mr-4 rtl:pr-4 rtl:mr-0 space-y-1 text-xs text-gray-400">
                    <li>{toPersianDigits("تقویم مشترک برای برنامه‌ریزی جلسات.")}</li>
                    <li>{toPersianDigits("فضایی برای تعیین اهداف مشترک و مراحل رسیدن به آن‌ها.")}</li>
                    <li>{toPersianDigits("امکان ثبت بازخورد پس از هر جلسه توسط هر دو طرف.")}</li>
                </ul>
            </DetailItem>

            <DetailItem title="ملاحظات UI/UX" icon={<UIToolsIcon />}>
                <p>{toPersianDigits("پروفایل‌های مجزا برای مربیان و کارآموزان که تخصص‌ها، نیازها و بازخوردهای دریافتی را نمایش می‌دهد.")}</p>
                <p>{toPersianDigits("سیستم درخواست و پذیرش مربیگری با اعلان‌های مربوطه.")}</p>
            </DetailItem>
        </SectionBlockPlan>
      </div>
    </section>
  );
};

export default CommunityMentorshipPlanSection;