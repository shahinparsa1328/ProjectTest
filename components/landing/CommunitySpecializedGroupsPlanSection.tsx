import React from 'react';
import { toPersianDigits } from '../../utils';
import { 
    UserGroupIcon,
    FolderIcon as GroupFeaturesIcon,
    LightbulbIcon as AISuggestionIcon,
    PaintBrushIcon as UiUxIcon,
    CogIcon as AdminToolsIcon
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

const CommunitySpecializedGroupsPlanSection: React.FC = () => {
  return (
    <section id="community-specialized-groups-plan" className="py-20 md:py-28 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-sky-500/10 rounded-full mb-4">
             <UserGroupIcon className="w-12 h-12 text-sky-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-5">
            {toPersianDigits("فاز ۲.۳ (جامعه کاربری): ایجاد و مدیریت گروه‌های تخصصی و مبتنی بر علاقه")}
          </h2>
           <div className="w-24 h-1 mx-auto bg-sky-500 rounded-full"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-8">
            {toPersianDigits("توانمندسازی کاربران برای ایجاد فضاهای متمرکز جهت بحث و همکاری پیرامون موضوعات خاص، افزایش عمق تعاملات و شکل‌گیری جوامع کوچکتر و هدفمندتر.")}
          </p>
        </div>

        <SectionBlockPlan title="ایجاد و مدیریت گروه‌های تخصصی" icon={<UserGroupIcon className="w-7 h-7 text-sky-400" />}>
            <DetailItem title="ایجاد گروه‌های عمومی و خصوصی توسط کاربران" icon={<UserGroupIcon />}>
                <p>{toPersianDigits("کاربران می‌توانند گروه‌های عمومی (قابل مشاهده برای همه و با امکان درخواست عضویت) و خصوصی (فقط با دعوت) ایجاد کنند.")}</p>
                <p className="text-xs text-gray-400 mt-1">{toPersianDigits("در این فاز، ایجاد گروه جدید نیازمند تأیید اولیه توسط مدیران سیستم خواهد بود تا از کیفیت و مرتبط بودن گروه‌ها اطمینان حاصل شود.")}</p>
            </DetailItem>
            
            <DetailItem title="ویژگی‌های هر گروه" icon={<GroupFeaturesIcon />}>
                <ul className="list-disc list-inside mr-4 rtl:pr-4 rtl:mr-0 space-y-1">
                    <li>{toPersianDigits("صفحه اختصاصی گروه: شامل نام، توضیحات، تصویر کاور و قوانین گروه.")}</li>
                    <li>{toPersianDigits("انجمن گفتگوی داخلی: فضایی مجزا برای بحث‌های مرتبط با موضوع گروه.")}</li>
                    <li>{toPersianDigits("لیست اعضای گروه.")}</li>
                    <li>{toPersianDigits("قابلیت اشتراک‌گذاری فایل‌های ساده (مانند PDF، اسناد متنی) در گروه.")}</li>
                </ul>
            </DetailItem>

            <DetailItem title="پیشنهاد هوشمند گروه‌های مرتبط توسط AI" icon={<AISuggestionIcon />}>
                <p>{toPersianDigits("هوش مصنوعی بر اساس علاقه‌مندی‌ها، فعالیت‌ها در انجمن‌های عمومی و مهارت‌های کاربر، گروه‌های مرتبط را به او پیشنهاد می‌دهد.")}</p>
            </DetailItem>
            
            <DetailItem title="ملاحظات UI/UX" icon={<UiUxIcon />}>
                 <ul className="list-disc list-inside mr-4 rtl:pr-4 rtl:mr-0 space-y-1">
                    <li>{toPersianDigits("بخش «کشف گروه‌ها» با قابلیت جستجو و فیلتر بر اساس موضوع و نوع گروه (عمومی/خصوصی).")}</li>
                    <li>{toPersianDigits("صفحه اصلی هر گروه شامل نمایش آخرین فعالیت‌ها، بحث‌های داغ و اعضای فعال گروه.")}</li>
                    <li>{toPersianDigits("فرآیند ساده و گام به گام برای ایجاد گروه جدید.")}</li>
                </ul>
            </DetailItem>
            
            <DetailItem title="ابزارهای مدیریت گروه برای مدیران گروه" icon={<AdminToolsIcon />}>
                <p>{toPersianDigits("مدیران هر گروه (کاربر ایجادکننده یا افراد تعیین‌شده) می‌توانند اعضا را دعوت، حذف یا درخواست‌های عضویت را مدیریت کنند.")}</p>
                <p>{toPersianDigits("قابلیت مدیریت محتوای گروه (ویرایش یا حذف پست‌ها و فایل‌های نامناسب).")}</p>
            </DetailItem>
        </SectionBlockPlan>
      </div>
    </section>
  );
};

export default CommunitySpecializedGroupsPlanSection;
