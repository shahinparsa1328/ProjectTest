import React from 'react';
import { toPersianDigits } from '../../utils';
import { 
    SparklesIconNav as AIExpertIcon,
    ShieldExclamationIcon as AIModerationIcon,
    UserCircleIcon as AIPersonalizedFeedIcon,
    AdjustmentsVerticalIcon as SmartSuggestionsIcon
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

const CommunityAdvancedAIFacilitationPlanSection: React.FC = () => {
  return (
    <section id="community-advanced-ai-plan" className="py-20 md:py-28 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-sky-500/10 rounded-full mb-4">
             <AIExpertIcon className="w-12 h-12 text-sky-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-5">
            {toPersianDigits("فاز ۲.۶ (جامعه کاربری): تسهیل‌گری پیشرفته‌تر توسط هوش مصنوعی")}
          </h2>
           <div className="w-24 h-1 mx-auto bg-sky-500 rounded-full"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-8">
            {toPersianDigits("استفاده از قابلیت‌های پیشرفته‌تر هوش مصنوعی برای بهبود کیفیت تعاملات، شناسایی محتوای نامناسب و ارائه تجربیات شخصی‌سازی شده‌تر در جامعه.")}
          </p>
        </div>

        <SectionBlockPlan title="تسهیل‌گری پیشرفته توسط هوش مصنوعی" icon={<AIExpertIcon className="w-7 h-7 text-sky-400" />}>
            <DetailItem title="شناسایی متخصصان یا کاربران باتجربه توسط AI" icon={<AIExpertIcon />}>
                <p>{toPersianDigits("AI متخصصان یا کاربران باتجربه در یک موضوع خاص را در جامعه شناسایی کرده و می‌تواند آن‌ها را برای پاسخ به سوالات پیچیده پیشنهاد یا تگ کند.")}</p>
            </DetailItem>
            
            <DetailItem title="شناسایی دقیق‌تر محتوای نامناسب توسط AI" icon={<AIModerationIcon />}>
                <p>{toPersianDigits("AI با دقت بیشتری محتوای نامناسب، اسپم یا رفتارهای مخرب را شناسایی کرده و آن‌ها را برای بررسی به مدیران گزارش می‌دهد.")}</p>
            </DetailItem>

            <DetailItem title="شخصی‌سازی فید فعالیت جامعه توسط AI" icon={<AIPersonalizedFeedIcon />}>
                <p>{toPersianDigits("AI فید فعالیت جامعه را برای هر کاربر شخصی‌سازی می‌کند و بحث‌ها، گروه‌ها، الگوها و رویدادهای مرتبط‌تر را در اولویت قرار می‌دهد.")}</p>
            </DetailItem>
            
            <DetailItem title="ملاحظات UI/UX" icon={<SmartSuggestionsIcon />}>
                 <ul className="list-disc list-inside mr-4 rtl:pr-4 rtl:mr-0 space-y-1">
                    <li>{toPersianDigits("بخش «پیشنهادات هوشمند برای شما در جامعه» در داشبورد اصلی پلتفرم یا صفحه جامعه.")}</li>
                    <li>{toPersianDigits("اعلان‌های ظریف برای تگ کردن متخصصان یا گزارش محتوای نامناسب.")}</li>
                </ul>
            </DetailItem>
        </SectionBlockPlan>
      </div>
    </section>
  );
};

export default CommunityAdvancedAIFacilitationPlanSection;
