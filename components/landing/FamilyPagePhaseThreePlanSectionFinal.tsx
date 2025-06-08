import React from 'react';
import { toPersianDigits } from '../../utils';
import { 
    CogIcon, // For Advanced AI Algorithms & Optimization
    ShieldCheckIcon, // For Security
    SparklesIconNav as InnovationIcon, // For Future Innovations
    LightbulbIcon // General for AI insights
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


const FamilyPagePhaseThreePlanSectionFinal: React.FC = () => {
  return (
    <section id="family-phase-3-final-plan" className="py-20 md:py-28 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-sky-500/10 rounded-full mb-4">
             <CogIcon className="w-12 h-12 text-sky-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-5">
            {toPersianDigits("فاز ۳.۶: بهینه‌سازی نهایی، امنیت حداکثری و نوآوری‌های آینده")}
          </h2>
           <div className="section-title-underline"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-8">
            {toPersianDigits("تمرکز بر استفاده از پیشرفته‌ترین الگوریتم‌های هوش مصنوعی، تضمین بالاترین سطح امنیت داده‌ها و تحقیق و توسعه مداوم برای افزودن ویژگی‌های نوآورانه جهت تقویت بنیان خانواده و بهبود کیفیت مراقبت.")}
          </p>
        </div>

        <SectionBlockPlan title="بهینه‌سازی الگوریتم‌های هوش مصنوعی" icon={<LightbulbIcon className="w-7 h-7 text-sky-400" />}>
            <DetailItem title="تحلیل پیشرفته الگوهای خانوادگی" icon={<CogIcon />}>
                <p>{toPersianDigits("استفاده از الگوریتم‌های یادگیری عمیق و مدل‌های پیش‌بینی کننده پیشرفته برای تحلیل الگوهای پیچیده در تعاملات خانوادگی، روندهای سلامتی، و نیازهای مراقبتی.")}</p>
                <ul className="list-disc list-inside mr-4 rtl:pr-4 rtl:mr-0 text-xs text-gray-400 space-y-1 mt-1">
                    <li>{toPersianDigits("UI/UX: این بهینه‌سازی‌ها عمدتاً در بک‌اند اتفاق می‌افتند، اما منجر به پیشنهادات دقیق‌تر، شخصی‌سازی عمیق‌تر و هشدارهای به‌موقع‌تر در رابط کاربری خواهند شد.")}</li>
                    <li>{toPersianDigits("مثال: شناسایی زودهنگام نشانه‌های ظریف تغییر در رفتار سالمند که ممکن است نیاز به توجه پزشکی داشته باشد، یا تشخیص الگوهای ارتباطی مثبت در خانواده و تشویق آن‌ها.")}</li>
                </ul>
            </DetailItem>
        </SectionBlockPlan>
        
        <SectionBlockPlan title="امنیت و کنترل دسترسی در سطح بالا" icon={<ShieldCheckIcon className="w-7 h-7 text-sky-400" />}>
            <DetailItem title="حفاظت از داده‌های بسیار حساس خانوادگی" icon={<ShieldCheckIcon />}>
                <p>{toPersianDigits("تضمین بالاترین سطح امنیت برای داده‌های بسیار حساس خانوادگی از طریق رمزنگاری پیشرفته، کنترل‌های دسترسی چندلایه، و ممیزی‌های امنیتی منظم.")}</p>
                 <ul className="list-disc list-inside mr-4 rtl:pr-4 rtl:mr-0 text-xs text-gray-400 space-y-1 mt-1">
                    <li>{toPersianDigits("UI/UX: داشبورد حریم خصوصی پیشرفته با کنترل‌های دقیق برای هر نوع داده و هر عضو خانواده. گزارش‌های شفاف از نحوه استفاده داده‌ها توسط هوش مصنوعی برای ارائه پیشنهادات.")}</li>
                    <li>{toPersianDigits("پیاده‌سازی اصول Privacy by Design در تمام مراحل توسعه.")}</li>
                    <li>{toPersianDigits("آموزش مستمر کاربران در مورد اهمیت امنیت داده‌ها و نحوه استفاده امن از پلتفرم.")}</li>
                </ul>
            </DetailItem>
        </SectionBlockPlan>

        <SectionBlockPlan title="تحقیق و توسعه مداوم برای نوآوری" icon={<InnovationIcon className="w-7 h-7 text-sky-400" />}>
            <DetailItem title="افزودن ویژگی‌های نوآورانه" icon={<InnovationIcon />}>
                <p>{toPersianDigits("تعهد به تحقیق و توسعه مستمر برای شناسایی و پیاده‌سازی ویژگی‌های نوآورانه که به تقویت بنیان‌های خانواده و بهبود کیفیت مراقبت کمک می‌کنند.")}</p>
                 <ul className="list-disc list-inside mr-4 rtl:pr-4 rtl:mr-0 text-xs text-gray-400 space-y-1 mt-1">
                    <li>{toPersianDigits("UI/UX: معرفی تدریجی ویژگی‌های جدید از طریق آزمایش‌های بتا با گروه‌های کاربری منتخب و جمع‌آوری بازخورد دقیق.")}</li>
                    <li>{toPersianDigits("مثال‌های احتمالی آینده: ابزارهای پیشرفته حل تعارض خانوادگی مبتنی بر هوش مصنوعی، پلتفرم‌های یادگیری مشترک برای اعضای خانواده، یا یکپارچه‌سازی عمیق‌تر با ابزارهای سلامت دیجیتال برای مراقبت پیش‌بینانه‌تر.")}</li>
                </ul>
            </DetailItem>
        </SectionBlockPlan>
        
        <div className="mt-16 text-center p-6 bg-slate-800 rounded-xl shadow-xl border border-slate-700">
            <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-4">{toPersianDigits("نتیجه‌گیری نهایی: خانواده و مراقبت، سمفونی عشق، حمایت و رشد مشترک")}</h3>
            <p className="text-md text-gray-300 leading-relaxed max-w-3xl mx-auto">
              {toPersianDigits("با اجرای این سه فاز، صفحه «خانواده و مراقبت» در «پلتفرم ارکستراسیون هوشمند زندگی» به یک دستیار بی‌نظیر و همراهی دلسوز برای خانواده‌ها تبدیل خواهد شد. این صفحه نه تنها به سازماندهی امور روزمره کمک می‌کند، بلکه با ارائه بینش‌های هوشمند، ابزارهای ارتباطی قدرتمند، و محتوای آموزشی هدفمند، به کاربران کمک خواهد کرد تا روابط عمیق‌تر، سالم‌تر و شادتری را در کانون خانواده خود تجربه کنند و از عزیزان خود به بهترین شکل ممکن مراقبت نمایند. این تعهد ما به تقویت مهم‌ترین رکن جامعه، یعنی خانواده، از طریق فناوری هوشمند و همدلانه است.")}
            </p>
        </div>

      </div>
    </section>
  );
};

export default FamilyPagePhaseThreePlanSectionFinal;
// Ensure this component is added to LandingPageLayout.tsx after FamilyPagePhaseThreePlanSectionIntegration
// And required icons are exported from AppIcons.tsx
// CogIcon, ShieldCheckIcon, SparklesIconNav (as InnovationIcon), LightbulbIcon
// Existing SectionBlockPlan and DetailItem components are reused.
