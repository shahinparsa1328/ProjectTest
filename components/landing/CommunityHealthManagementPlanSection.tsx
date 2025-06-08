import React from 'react';
import { toPersianDigits } from '../../utils';
import { 
    ShieldCheckIcon as HealthIcon,
    LightbulbIcon as TopicSuggestionIcon,
    CogIcon as AutomatedSystemsIcon,
    UserCircleIcon as ModerationRolesIcon
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

const CommunityHealthManagementPlanSection: React.FC = () => {
  return (
    <section id="community-health-management-plan" className="py-20 md:py-28 bg-slate-900">
      <div className="container mx-auto px-6">
        <SectionBlockPlan title="۳.۳. سلامت جامعه و مدیریت هوشمند با هوش مصنوعی" icon={<HealthIcon className="w-7 h-7 text-sky-400" />} mainTitle={true}>
            <DetailItem title="شناسایی فعال روندهای منفی و پیشنهاد راه‌حل توسط AI" icon={<HealthIcon />}>
                <p>{toPersianDigits("هوش مصنوعی به طور فعال روندهای منفی (مانند کاهش مشارکت، افزایش تنش در بحث‌ها) را در جامعه شناسایی کرده و به مدیران هشدار می‌دهد یا راه‌حل‌هایی برای بهبود پیشنهاد می‌کند.")}</p>
                <p className="text-xs text-gray-400 mt-1">{toPersianDigits("مثال: «مشارکت در انجمن X در ۲ هفته گذشته ۲۰٪ کاهش یافته است. پیشنهاد می‌شود یک موضوع جذاب جدید یا یک نظرسنجی برای فعال‌سازی مجدد اعضا ایجاد کنید.»")}</p>
            </DetailItem>
            
            <DetailItem title="پیشنهاد موضوعات بحث جدید و جذاب توسط AI" icon={<TopicSuggestionIcon />}>
                <p>{toPersianDigits("هوش مصنوعی بر اساس علاقه‌مندی‌های مشترک اعضا یا رویدادهای جاری، موضوعات بحث جدید و جذابی را برای فعال و پویا نگه داشتن انجمن‌ها پیشنهاد می‌دهد.")}</p>
            </DetailItem>

            <DetailItem title="سیستم‌های خودکار پیشرفته‌تر برای مدیریت گزارش‌های سوءاستفاده و اسپم" icon={<AutomatedSystemsIcon />}>
                <p>{toPersianDigits("با نظارت انسانی برای موارد پیچیده، به منظور حفظ سلامت و امنیت جامعه.")}</p>
            </DetailItem>

            <DetailItem title="اعطای نقش‌های مدیریتی محدود به اعضای فعال و مورد اعتماد جامعه" icon={<ModerationRolesIcon />}>
                <p>{toPersianDigits("برای کمک به مدیریت انجمن‌ها یا گروه‌های خاص، کاهش بار مدیران اصلی و افزایش حس مالکیت در جامعه.")}</p>
            </DetailItem>
        </SectionBlockPlan>
      </div>
    </section>
  );
};

export default CommunityHealthManagementPlanSection;