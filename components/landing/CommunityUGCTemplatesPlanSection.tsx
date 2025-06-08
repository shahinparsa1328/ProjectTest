
import React from 'react';
import { toPersianDigits } from '../../utils';
import { 
    ShareIcon,
    ClipboardDocumentCheckIcon as SharingTemplatesIcon,
    StarIcon as RatingIcon,
    SparklesIconNav as AISuggestionIcon,
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

const CommunityUGCTemplatesPlanSection: React.FC = () => {
  return (
    <section id="community-ugc-templates-plan" className="py-20 md:py-28 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-sky-500/10 rounded-full mb-4">
             <ShareIcon className="w-12 h-12 text-sky-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-5">
            {toPersianDigits("فاز ۲.۴ (جامعه کاربری): اشتراک‌گذاری الگوها و برنامه‌های موفق (محتوای تولید شده توسط کاربر - UGC)")}
          </h2>
           <div className="w-24 h-1 mx-auto bg-sky-500 rounded-full"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-8">
            {toPersianDigits("فراهم کردن بستری برای کاربران تا دانش عملی و الگوهای موفق خود را با دیگران به اشتراک بگذارند و از خرد جمعی بهره‌مند شوند.")}
          </p>
        </div>

        <SectionBlockPlan title="اشتراک‌گذاری الگوها و برنامه‌های موفق" icon={<ShareIcon className="w-7 h-7 text-sky-400" />}>
            <DetailItem title="اشتراک‌گذاری الگوهای موفق توسط کاربران" icon={<SharingTemplatesIcon />}>
                <p>{toPersianDigits("کاربران می‌توانند الگوهای موفق خود (مانند برنامه هفتگی برای یک هدف خاص، روتین صبحگاهی مؤثر، لیست کتاب‌های مفید برای یک مهارت) را به صورت ساختاریافته با دیگران به اشتراک بگذارند.")}</p>
                <p className="text-xs text-gray-400 mt-1">{toPersianDigits("مثال‌ها: الگوهای برنامه‌ریزی، لیست‌های چک، راهنماهای گام به گام.")}</p>
            </DetailItem>
            
            <DetailItem title="امتیازدهی، نظردهی و استفاده از الگوها" icon={<RatingIcon />}>
                <p>{toPersianDigits("جامعه می‌تواند به الگوهای به اشتراک گذاشته شده امتیاز دهد، در مورد آن‌ها نظر دهد و از آن‌ها استفاده کند (قابلیت کپی کردن الگوها به پروفایل شخصی).")}</p>
            </DetailItem>

            <DetailItem title="پیشنهاد الگوهای محبوب توسط AI" icon={<AISuggestionIcon />}>
                <p>{toPersianDigits("هوش مصنوعی می‌تواند الگوهای محبوب و مؤثر را شناسایی کرده و به سایر کاربران پیشنهاد دهد.")}</p>
            </DetailItem>
            
            <DetailItem title="ملاحظات UI/UX" icon={<UiUxIcon />}>
                <p>{toPersianDigits("بخش «کتابخانه الگوهای جامعه» با قابلیت دسته‌بندی و جستجو.")}</p>
                <p>{toPersianDigits("فرم استاندارد برای ایجاد و اشتراک‌گذاری الگوها با فیلدهای مشخص (عنوان، توضیحات، مراحل/اقلام الگو).")}</p>
                 <p className="text-xs text-gray-400 mt-1">{toPersianDigits("نمایش واضح امتیازات، نظرات و تعداد استفاده از هر الگو.")}</p>
            </DetailItem>
        </SectionBlockPlan>
      </div>
    </section>
  );
};

export default CommunityUGCTemplatesPlanSection;
