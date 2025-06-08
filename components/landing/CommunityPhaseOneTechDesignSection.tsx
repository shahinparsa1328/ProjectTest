import React from 'react';
import { toPersianDigits } from '../../utils';
import { 
    ShieldCheckIcon,
    PaintBrushIcon as ResponsiveDesignIcon, // Using PaintBrushIcon for general design principles
    SparklesIconNav as FriendlyIconographyIcon,
    BookIcon as UserGuideIcon, // Corrected: Changed BookOpenIcon to BookIcon
    AdjustmentsVerticalIcon as PlatformIcon // For Scalable Platform
} from '../shared/AppIcons';

// Re-using a similar block structure
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

const CommunityPhaseOneTechDesignSection: React.FC = () => {
  return (
    <section id="community-tech-design-plan" className="py-20 md:py-28 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-sky-500/10 rounded-full mb-4">
             <PlatformIcon className="w-12 h-12 text-sky-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-5">
            {toPersianDigits("فاز ۱.۵ (جامعه کاربری): زیرساخت فنی و طراحی بصری فاز ۱")}
          </h2>
           <div className="w-24 h-1 mx-auto bg-sky-500 rounded-full"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-8">
            {toPersianDigits("تضمین یک بستر فنی قوی، پایدار و امن، همراه با طراحی بصری جذاب و کاربرپسند برای ایجاد تجربه‌ای دلنشین و فراگیر در جامعه.")}
          </p>
        </div>

        <SectionBlockPlan title="الزامات کلیدی زیرساخت فنی و اصول طراحی" icon={<PlatformIcon className="w-7 h-7 text-sky-400" />}>
            <DetailItem title="پلتفرم امن و مقیاس‌پذیر" icon={<ShieldCheckIcon />}>
                <p>{toPersianDigits("برای مدیریت کاربران و محتوای تولید شده توسط آن‌ها.")}</p>
                <p className="text-xs text-gray-400 mt-1">{toPersianDigits("استفاده از معماری میکروسرویس (در صورت امکان) برای مقیاس‌پذیری، پایگاه داده مناسب برای ذخیره‌سازی داده‌های کاربران و محتوای انجمن، و پیاده‌سازی تدابیر امنیتی مانند رمزنگاری داده‌ها و احراز هویت قوی.")}</p>
            </DetailItem>
            
            <DetailItem title="طراحی واکنش‌گرا و موبایل-اول" icon={<ResponsiveDesignIcon />}>
                <p>{toPersianDigits("اطمینان از تجربه کاربری یکپارچه و بهینه در تمامی دستگاه‌ها (موبایل، تبلت، دسکتاپ).")}</p>
                 <p className="text-xs text-gray-400 mt-1">{toPersianDigits("اولویت با طراحی برای صفحات کوچکتر و سپس گسترش آن به صفحات بزرگتر.")}</p>
            </DetailItem>

            <DetailItem title="آیکونوگرافی دوستانه، فراگیر و نشان‌دهنده تعامل" icon={<FriendlyIconographyIcon />}>
                <p>{toPersianDigits("استفاده از آیکون‌هایی که حس مثبت، دعوت‌کنندگی و تعامل را به کاربر القا می‌کنند.")}</p>
                <p className="text-xs text-gray-400 mt-1">{toPersianDigits("آیکون‌ها باید به راحتی قابل فهم و مرتبط با عملکرد خود باشند.")}</p>
            </DetailItem>

            <DetailItem title="پالت رنگی دعوت‌کننده و مثبت" icon={<ResponsiveDesignIcon />}>
                <p>{toPersianDigits("انتخاب رنگ‌هایی که حس تعلق، همکاری و انرژی مثبت را در جامعه تقویت کنند.")}</p>
                <p className="text-xs text-gray-400 mt-1">{toPersianDigits("رنگ‌های اصلی پلتفرم با تاکید بر رنگ‌های آرامش‌بخش و در عین حال پویا برای عناصر تعاملی.")}</p>
            </DetailItem>
            
            <DetailItem title="راهنمای کاربری ساده" icon={<UserGuideIcon />}>
                <p>{toPersianDigits("در مورد نحوه مشارکت در انجمن‌ها، تکمیل پروفایل و استفاده از ویژگی‌های اولیه جامعه.")}</p>
                <p className="text-xs text-gray-400 mt-1">{toPersianDigits("این راهنما می‌تواند به صورت نکات راهنما در اولین ورود یا یک بخش کوچک «راهنما» در صفحه جامعه باشد.")}</p>
            </DetailItem>
        </SectionBlockPlan>
      </div>
    </section>
  );
};

export default CommunityPhaseOneTechDesignSection;