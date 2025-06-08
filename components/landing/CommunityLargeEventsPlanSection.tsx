import React from 'react';
import { toPersianDigits } from '../../utils';
import { 
    MegaphoneIcon, // Main section icon for events
    CalendarDaysIcon, // For organizing events
    UserGroupIcon // For social gatherings
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

const CommunityLargeEventsPlanSection: React.FC = () => {
  return (
    <section id="community-large-events-plan" className="py-20 md:py-28 bg-slate-900">
      <div className="container mx-auto px-6">
        <SectionBlockPlan title="۳.۶. ایجاد رویدادها و گردهمایی‌های بزرگتر (اختیاری) آفلاین و آنلاین" icon={<MegaphoneIcon className="w-7 h-7 text-sky-400" />} mainTitle={true}>
            <DetailItem title="سازماندهی رویدادهای آموزشی و اجتماعی" icon={<CalendarDaysIcon />}>
                <p>{toPersianDigits("پلتفرم، با همکاری کاربران فعال، می‌تواند رویدادهای آموزشی بزرگتر، کارگاه‌های تخصصی یا حتی گردهمایی‌های اجتماعی (آنلاین یا در صورت امکان و تمایل کاربران، رویدادهای محلی آفلاین) را سازماندهی کند.")}</p>
            </DetailItem>
            <DetailItem title="تقویت پیوندهای واقعی و حس تعلق" icon={<UserGroupIcon />}>
                <p>{toPersianDigits("این امر به تقویت پیوندهای واقعی بین اعضا و ایجاد حس عمیق‌تری از تعلق به جامعه کمک می‌کند.")}</p>
                <p className="text-xs text-gray-400 mt-1">{toPersianDigits("UI/UX: بخش اختصاصی برای رویدادهای بزرگ، شامل اطلاعات کامل، نحوه ثبت‌نام و گالری تصاویر از رویدادهای گذشته (در صورت وجود).")}</p>
            </DetailItem>
        </SectionBlockPlan>
      </div>
    </section>
  );
};

export default CommunityLargeEventsPlanSection;