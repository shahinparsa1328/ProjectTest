import React from 'react';
import { toPersianDigits } from '../../utils';
import { 
    UserCircleIcon,
    TrophyIcon,
    AcademicCapIcon,
    QuestionMarkCircleIcon,
    LightbulbIcon as OfferingHelpIcon,
    UserGroupIcon as FriendSystemIcon,
    ListBulletIcon as ActivityFeedIcon,
    AdjustmentsVerticalIcon as UITabsIcon,
    BellIcon as NotificationIcon
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

const CommunityAdvancedProfilePlanSection: React.FC = () => {
  return (
    <section id="community-advanced-profile-plan" className="py-20 md:py-28 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-sky-500/10 rounded-full mb-4">
             <UserCircleIcon className="w-12 h-12 text-sky-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-5">
            {toPersianDigits("فاز ۲ (جامعه کاربری): ارتقاء تعاملات، ایجاد گروه‌های تخصصی و تسهیل‌گری هوشمند AI")}
          </h2>
           <div className="w-24 h-1 mx-auto bg-sky-500 rounded-full"></div>
           <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-8">
            {toPersianDigits("هدف اصلی فاز ۲: تبدیل صفحه جامعه به فضایی تعاملی‌تر با امکان ایجاد گروه‌های تخصصی، اشتراک‌گذاری محتوای کاربردی و تسهیل‌گری فعال‌تر توسط AI برای تقویت ارتباطات معنادارتر و یادگیری جمعی.")}
          </p>
        </div>

        <SectionBlockPlan title="۲.۱. پروفایل کاربری پیشرفته و شبکه‌سازی" icon={<UserCircleIcon className="w-7 h-7 text-sky-400" />}>
            <DetailItem title="نمایش دستاوردها و مهارت‌ها" icon={<TrophyIcon />}>
                <p>{toPersianDigits("قابلیت نمایش نشان‌های کسب شده از بخش‌های یادگیری، عادات و اهداف در پروفایل کاربری.")}</p>
                <p>{toPersianDigits("نمایش مهارت‌های کلیدی (تخصص‌های خوداظهار شده یا مهارت‌های در حال یادگیری).")}</p>
                <p className="text-xs text-gray-400 mt-1">{toPersianDigits("UI/UX: طراحی جذاب برای نمایش نشان‌ها و لیست مهارت‌ها در پروفایل.")}</p>
            </DetailItem>
            
            <DetailItem title="بخش‌های «در جستجوی کمک در...» و «می‌توانم در این زمینه‌ها کمک کنم...»" icon={<QuestionMarkCircleIcon />}>
                <p>{toPersianDigits("کاربران می‌توانند نیازها و توانایی‌های خود را برای همکاری یا راهنمایی مشخص کنند.")}</p>
                <p className="text-xs text-gray-400 mt-1">{toPersianDigits("این بخش به ایجاد ارتباطات هدفمند و تبادل دانش کمک می‌کند.")}</p>
            </DetailItem>

            <DetailItem title="سیستم پایه دوستی/اتصال" icon={<FriendSystemIcon />}>
                <p>{toPersianDigits("قابلیت ارسال درخواست دوستی و ایجاد لیست دوستان.")}</p>
            </DetailItem>
            
            <DetailItem title="فید فعالیت دوستان (اختیاری و با کنترل حریم خصوصی)" icon={<ActivityFeedIcon />}>
                <p>{toPersianDigits("نمایش خلاصه‌ای از فعالیت‌های عمومی دوستان در جامعه (مثلاً موضوعات جدید ایجاد شده یا پاسخ‌های ارسال شده).")}</p>
                 <p className="text-xs text-gray-400 mt-1">{toPersianDigits("این ویژگی باید با کنترل‌های دقیق حریم خصوصی همراه باشد تا کاربران بتوانند انتخاب کنند چه فعالیت‌هایی از آن‌ها به اشتراک گذاشته شود.")}</p>
            </DetailItem>

            <DetailItem title="ملاحظات UI/UX" icon={<UITabsIcon />}>
                <p>{toPersianDigits("پروفایل کاربری با تب‌های جداگانه برای اطلاعات مختلف (درباره من، دستاوردها، مهارت‌ها، علاقه‌مندی‌ها).")}</p>
                <p>{toPersianDigits("سیستم اعلان برای درخواست‌های دوستی و سایر تعاملات اجتماعی.")}</p>
            </DetailItem>
        </SectionBlockPlan>
      </div>
    </section>
  );
};

export default CommunityAdvancedProfilePlanSection;
