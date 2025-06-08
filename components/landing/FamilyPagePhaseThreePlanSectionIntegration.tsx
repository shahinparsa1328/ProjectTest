import React from 'react';
import { toPersianDigits } from '../../utils';
import { 
    LinkIcon, // Main section icon & for platform connections
    AcademicCapIcon, // For educational content
    BuildingOfficeIcon, // For care services
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


const FamilyPagePhaseThreePlanSectionIntegration: React.FC = () => {
  return (
    <section id="family-phase-3-integration-plan" className="py-20 md:py-28 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-sky-500/10 rounded-full mb-4">
             <LinkIcon className="w-12 h-12 text-sky-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-5">
            {toPersianDigits("فاز ۳.۵: یکپارچه‌سازی عمیق‌تر با اکوسیستم‌های خارجی")}
          </h2>
           <div className="section-title-underline"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-8">
            {toPersianDigits("هدف این بخش، گسترش قابلیت‌های پلتفرم از طریق اتصال به منابع آموزشی معتبر و، در صورت امکان و با رعایت مقررات، یکپارچه‌سازی با سرویس‌های کمکی خانه یا مراقبت از کودک/سالمند است تا پشتیبانی جامع‌تری به خانواده‌ها ارائه شود.")}
          </p>
        </div>

        <SectionBlockPlan title="اتصال به پلتفرم‌های آموزشی معتبر" icon={<AcademicCapIcon className="w-7 h-7 text-sky-400" />}>
            <DetailItem title="دسترسی به محتوای تخصصی تربیت فرزند و مراقبت" icon={<AcademicCapIcon />}>
                <p>{toPersianDigits("دسترسی آسان به محتوای تخصصی تربیت فرزند، رشد کودک، و مراقبت از سالمند از طریق یکپارچه‌سازی با پلتفرم‌ها و منابع آموزشی شناخته‌شده و معتبر.")}</p>
                <ul className="list-disc list-inside mr-4 rtl:pr-4 rtl:mr-0 text-xs text-gray-400 space-y-1 mt-1">
                    <li>{toPersianDigits("UI/UX: بخش 'منابع آموزشی پیشنهادی' در صفحه خانواده یا مرتبط با پروفایل کودک/سالمند. نمایش کارت‌هایی برای هر پلتفرم یا محتوای پیشنهادی، شامل نام، توضیحات کوتاه، و لینک مستقیم به منبع.")}</li>
                    <li>{toPersianDigits("فیلتر کردن منابع بر اساس موضوع (مثلاً تربیت کودک نوپا، تغذیه سالمند، مدیریت استرس مراقب).")}</li>
                    <li>{toPersianDigits("امکان ذخیره یا نشانه‌گذاری منابع مورد علاقه برای دسترسی سریع‌تر.")}</li>
                    <li>{toPersianDigits("هوش مصنوعی می‌تواند بر اساس سن کودک، وضعیت سالمند، یا چالش‌های گزارش‌شده توسط کاربر، محتوای آموزشی مرتبط از این پلتفرم‌ها را پیشنهاد دهد.")}</li>
                    <li><span className="font-semibold">{toPersianDigits("مثال AI:")}</span> {toPersianDigits("«با توجه به اینکه فرزند شما در مرحله آموزش استفاده از توالت است، این مقاله از [نام پلتفرم آموزشی] می‌تواند مفید باشد.»")}</li>
                </ul>
            </DetailItem>
        </SectionBlockPlan>
        
        <SectionBlockPlan title="یکپارچه‌سازی با سرویس‌های کمکی یا مراقبتی (اختیاری و مشروط)" icon={<BuildingOfficeIcon className="w-7 h-7 text-sky-400" />}>
            <DetailItem title="اتصال به سرویس‌دهندگان معتبر خدمات" icon={<ShieldCheckIcon />}>
                <p>{toPersianDigits("در صورت امکان‌سنجی، انطباق با مقررات، و مهم‌تر از همه، کسب رضایت کامل و آگاهانه کاربر، فراهم کردن امکان اتصال به سرویس‌دهندگان معتبر خدمات کمکی در منزل یا مراقبت از کودک/سالمند.")}</p>
                 <ul className="list-disc list-inside mr-4 rtl:pr-4 rtl:mr-0 text-xs text-gray-400 space-y-1 mt-1">
                    <li>{toPersianDigits("UI/UX: یک بخش 'خدمات پشتیبانی خانواده' که کاربر می‌تواند (با رضایت کامل) آن را فعال کند.")}</li>
                    <li>{toPersianDigits("نمایش لیستی از سرویس‌دهندگان محلی یا آنلاین معتبر (در ابتدا به صورت نمایشی و با سلب مسئولیت کامل).")}</li>
                    <li>{toPersianDigits("امکان درخواست اطلاعات بیشتر یا برقراری تماس اولیه از طریق پلتفرم (با رعایت کامل حریم خصوصی و انتقال امن اطلاعات، و با تأکید بر اینکه پلتفرم صرفاً یک واسط است).")}</li>
                    <li><strong className="text-red-400">{toPersianDigits("تأکید بسیار شدید بر رضایت کاربر، شفافیت در مورد اشتراک‌گذاری داده، و رعایت تمام مقررات قانونی و اخلاقی مربوط به حریم خصوصی و داده‌های حساس.")}</strong></li>
                    <li>{toPersianDigits("هوش مصنوعی در این مرحله نقش مستقیمی در انتخاب یا رزرو سرویس نخواهد داشت، اما می‌تواند بر اساس نیازهای شناسایی شده (مثلاً نیاز به مراقبت تخصصی برای سالمند پس از یک هشدار پزشکی) به کاربر یادآوری کند که بررسی این گزینه می‌تواند مفید باشد.")}</li>
                     <li><span className="font-semibold">{toPersianDigits("مثال AI:")}</span> {toPersianDigits("«با توجه به نیاز به مراقبت شبانه‌روزی پس از عمل جراحی [نام سالمند]، ممکن است بخواهید گزینه‌های خدمات مراقبت در منزل را در منطقه خود بررسی کنید.»")}</li>
                </ul>
            </DetailItem>
        </SectionBlockPlan>
      </div>
    </section>
  );
};

export default FamilyPagePhaseThreePlanSectionIntegration;
// Ensure this component is added to LandingPageLayout.tsx
// And required icons (LinkIcon, AcademicCapIcon, BuildingOfficeIcon, LightbulbIcon, ShieldCheckIcon) are exported from AppIcons.tsx
