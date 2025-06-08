
import React from 'react';
import { toPersianDigits } from '../../utils';
import { 
    CalendarDaysIcon,
    UsersIcon as CreateEventsIcon, // Using UsersIcon as more generic for "user-created"
    SparklesIconNav as AIConnectIcon,
    PaintBrushIcon as UiUxIcon
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
      <span>{toPersianDigits(title)}</span>
    </div>
    <div className="text-sm text-gray-300 leading-relaxed space-y-1">{children}</div>
  </div>
);

const CommunityGroupEventsPlanSection: React.FC = () => {
  return (
    <section id="community-group-events-plan" className="py-20 md:py-28 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-sky-500/10 rounded-full mb-4">
             <CalendarDaysIcon className="w-12 h-12 text-sky-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-5">
            {toPersianDigits("فاز ۲.۵ (جامعه کاربری): رویدادها و چالش‌های گروهی (نسخه اولیه)")}
          </h2>
           <div className="w-24 h-1 mx-auto bg-sky-500 rounded-full"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-8">
            {toPersianDigits("ایجاد امکان برگزاری رویدادهای آنلاین و چالش‌های گروهی توسط کاربران برای افزایش تعامل، یادگیری مشترک و ایجاد انگیزه.")}
          </p>
        </div>

        <SectionBlockPlan title="رویدادها و چالش‌های گروهی" icon={<CalendarDaysIcon className="w-7 h-7 text-sky-400" />}>
            <DetailItem title="ایجاد رویدادها و چالش‌های کوچک آنلاین توسط کاربران" icon={<CreateEventsIcon />}>
                <p>{toPersianDigits("کاربران می‌توانند رویدادهای آنلاین کوچک (مانند وبینارهای آموزشی، جلسات طوفان فکری گروهی) یا چالش‌های غیررسمی (مثلاً «چالش ۳۰ روزه مطالعه یک کتاب مشترک») ایجاد کرده و دیگران را دعوت کنند.")}</p>
            </DetailItem>
            
            <DetailItem title="اتصال کاربران توسط AI برای چالش‌های مشترک" icon={<AIConnectIcon />}>
                <p>{toPersianDigits("هوش مصنوعی می‌تواند کاربرانی با اهداف یا علاقه‌مندی‌های مشابه را برای شرکت در چالش‌های مشترک به هم متصل کند.")}</p>
                <p className="text-xs text-gray-400 mt-1">{toPersianDigits("مثال: پیشنهاد شرکت در «چالش ۳۰ روزه نوشتن روزانه» به کاربرانی که به نویسندگی علاقه‌مند هستند.")}</p>
            </DetailItem>
            
            <DetailItem title="ملاحظات UI/UX" icon={<UiUxIcon />}>
                 <ul className="list-disc list-inside mr-4 rtl:pr-4 rtl:mr-0 space-y-1">
                    <li>{toPersianDigits("تقویم رویدادهای جامعه با قابلیت مشاهده رویدادهای آینده و ثبت‌نام.")}</li>
                    <li>{toPersianDigits("فرم ساده برای ایجاد رویداد/چالش با گزینه‌هایی برای تاریخ، توضیحات و دعوت اعضا.")}</li>
                    <li>{toPersianDigits("نمایش چالش‌های فعال و امکان پیوستن به آن‌ها.")}</li>
                </ul>
            </DetailItem>
        </SectionBlockPlan>
      </div>
    </section>
  );
};

export default CommunityGroupEventsPlanSection;
