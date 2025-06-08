import React from 'react';
import { toPersianDigits } from '../../utils';
import { 
    UserCircleIcon, 
    PencilSquareIcon,
    CameraIcon,
    LightbulbIcon as InterestsIcon,
    ShieldCheckIcon as PrivacyIcon,
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
      {toPersianDigits(title)}
    </div>
    <div className="text-sm text-gray-300 leading-relaxed space-y-1">{children}</div>
  </div>
);

const CommunityUserProfilePlanSection: React.FC = () => {
  return (
    <section id="community-profile-plan" className="py-20 md:py-28 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-sky-500/10 rounded-full mb-4">
             <UserCircleIcon className="w-12 h-12 text-sky-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-5">
            {toPersianDigits("فاز ۱.۲ (جامعه کاربری): پروفایل کاربری پایه و تنظیمات حریم خصوصی")}
          </h2>
           <div className="w-24 h-1 mx-auto bg-sky-500 rounded-full"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-8">
            {toPersianDigits("این مرحله بر ایجاد عناصر بنیادی هویت کاربر و کنترل آن‌ها بر اطلاعات شخصی‌شان در جامعه تمرکز دارد.")}
          </p>
        </div>

        <SectionBlockPlan title="مولفه‌های اصلی پروفایل کاربری و حریم خصوصی" icon={<PencilSquareIcon className="w-7 h-7 text-sky-400" />}>
            <DetailItem title="اطلاعات اولیه پروفایل" icon={<UserCircleIcon />}>
                <ul className="list-disc list-inside mr-4 rtl:pr-4 rtl:mr-0 space-y-1">
                    <li>{toPersianDigits("نام کاربری (یکتا)")}</li>
                    <li>{toPersianDigits("نام نمایشی")}</li>
                    <li>{toPersianDigits("آواتار (امکان بارگذاری یا انتخاب از گالری)")}</li>
                    <li>{toPersianDigits("بیوگرافی کوتاه (درباره من)")}</li>
                </ul>
            </DetailItem>
            
            <DetailItem title="نمایش علاقه‌مندی‌ها (اختیاری)" icon={<InterestsIcon />}>
                <p>{toPersianDigits("قابلیت انتخاب یا وارد کردن علاقه‌مندی‌های کلیدی (مانند توسعه فردی، تکنولوژی، ورزش، هنر) برای کمک به هوش مصنوعی در پیشنهاد ارتباطات و محتوای مرتبط.")}</p>
                <p className="text-xs text-gray-400 mt-1">{toPersianDigits("این علاقه‌مندی‌ها می‌توانند از بخش‌های دیگر پلتفرم (مانند یادگیری) نیز استخراج شوند.")}</p>
            </DetailItem>

            <DetailItem title="تنظیمات پایه حریم خصوصی" icon={<PrivacyIcon />}>
                <p>{toPersianDigits("کنترل بر روی اینکه کدام بخش‌های پروفایل برای چه کسانی قابل مشاهده باشد:")}</p>
                 <ul className="list-disc list-inside mr-4 rtl:pr-4 rtl:mr-0 space-y-1 text-xs text-gray-400">
                    <li>{toPersianDigits("عمومی")}</li>
                    <li>{toPersianDigits("فقط اعضای جامعه")}</li>
                    <li>{toPersianDigits("فقط دوستان (در صورت پیاده‌سازی سیستم دوستی)")}</li>
                </ul>
            </DetailItem>

            <DetailItem title="UI/UX پیشنهادی" icon={<UiUxIcon />}>
                <p>{toPersianDigits("طراحی صفحه پروفایل کاربری به صورت تمیز و بخش‌بندی شده.")}</p>
                <p>{toPersianDigits("فرم ساده و روان برای ویرایش اطلاعات پروفایل.")}</p>
                <p>{toPersianDigits("گزینه‌های واضح برای تنظیمات حریم خصوصی همراه با توضیحات کافی برای هر گزینه.")}</p>
            </DetailItem>
        </SectionBlockPlan>
      </div>
    </section>
  );
};

export default CommunityUserProfilePlanSection;
