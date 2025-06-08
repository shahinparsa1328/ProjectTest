import React from 'react';
import { toPersianDigits } from '../../utils';
import { 
    BellIcon as NotificationSystemIcon,
    PaintBrushIcon as AttractiveDesignIcon,
    BoltIcon as PerformanceIcon
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

const CommunityTechDesignEnhancementsPlanSection: React.FC = () => {
  return (
    <section id="community-tech-design-enhancements-plan" className="py-20 md:py-28 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-sky-500/10 rounded-full mb-4">
             <PerformanceIcon className="w-12 h-12 text-sky-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-5">
            {toPersianDigits("فاز ۲.۷ (جامعه کاربری): بهبودهای فنی و طراحی")}
          </h2>
           <div className="w-24 h-1 mx-auto bg-sky-500 rounded-full"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-8">
            {toPersianDigits("ارتقاء زیرساخت‌های فنی و جنبه‌های بصری جامعه برای ارائه تجربه‌ای روان‌تر، جذاب‌تر و کارآمدتر به کاربران.")}
          </p>
        </div>

        <SectionBlockPlan title="بهبودهای فنی و طراحی" icon={<PerformanceIcon className="w-7 h-7 text-sky-400" />}>
            <DetailItem title="سیستم اعلان بهبود یافته" icon={<NotificationSystemIcon />}>
                <p>{toPersianDigits("برای فعالیت‌های جامعه (پاسخ‌های جدید، دعوت به گروه، رویدادهای جدید و غیره) با امکان تنظیمات دقیق توسط کاربر.")}</p>
            </DetailItem>
            
            <DetailItem title="طراحی جذاب‌تر برای پروفایل‌های کاربری و صفحات گروه" icon={<AttractiveDesignIcon />}>
                <p>{toPersianDigits("بهبود چیدمان، استفاده از عناصر بصری مدرن‌تر و گزینه‌های بیشتر برای شخصی‌سازی ظاهر پروفایل و صفحات گروه.")}</p>
            </DetailItem>

            <DetailItem title="افزایش سرعت و کارایی در بارگذاری محتوای جامعه" icon={<PerformanceIcon />}>
                <p>{toPersianDigits("بهینه‌سازی کوئری‌ها، استفاده از تکنیک‌های کشینگ و بارگذاری تنبل (lazy loading) برای بهبود عملکرد کلی صفحه جامعه و کاهش زمان انتظار کاربر.")}</p>
            </DetailItem>
        </SectionBlockPlan>
      </div>
    </section>
  );
};

export default CommunityTechDesignEnhancementsPlanSection;
