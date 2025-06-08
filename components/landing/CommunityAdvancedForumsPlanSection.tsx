
import React from 'react';
import { toPersianDigits } from '../../utils';
import { 
    ChatBubbleOvalLeftEllipsisIcon as ForumIcon,
    PencilSquareIcon as RichTextIcon,
    PaperClipIcon as AttachmentIcon,
    ArrowUpIcon,
    ArrowDownIcon,
    TagIcon,
    SparklesIconNav as AISummaryIcon,
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

const CommunityAdvancedForumsPlanSection: React.FC = () => {
  return (
    <section id="community-advanced-forums-plan" className="py-20 md:py-28 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-sky-500/10 rounded-full mb-4">
             <ForumIcon className="w-12 h-12 text-sky-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-5">
            {toPersianDigits("فاز ۲.۲ (جامعه کاربری): انجمن‌های گفتگو با ویژگی‌های پیشرفته")}
          </h2>
           <div className="w-24 h-1 mx-auto bg-sky-500 rounded-full"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-8">
            {toPersianDigits("ارتقای تجربه کاربری در انجمن‌ها با افزودن ابزارهای غنی‌سازی محتوا، بازخورد سریع و سازماندهی بهتر اطلاعات.")}
          </p>
        </div>

        <SectionBlockPlan title="ویژگی‌های پیشرفته انجمن‌های گفتگو" icon={<ForumIcon className="w-7 h-7 text-sky-400" />}>
            <DetailItem title="ویرایشگر متن غنی (Rich Text Editor)" icon={<RichTextIcon />}>
                <p>{toPersianDigits("امکان استفاده از bold، italics، لیست‌ها، لینک‌ها و نقل قول در ایجاد موضوعات و پاسخ‌ها.")}</p>
                <p className="text-xs text-gray-400 mt-1">{toPersianDigits("UI/UX: ارائه یک ویرایشگر متن با ابزارهای آشنا و کاربرپسند.")}</p>
            </DetailItem>
            
            <DetailItem title="قابلیت پیوست تصویر" icon={<AttachmentIcon />}>
                <p>{toPersianDigits("با محدودیت حجم و بررسی اولیه توسط هوش مصنوعی یا مدیران برای جلوگیری از محتوای نامناسب.")}</p>
            </DetailItem>

            <DetailItem title="سیستم رأی مثبت/منفی (Upvote/Downvote)" icon={<ArrowUpIcon />}>
                <p>{toPersianDigits("برای موضوعات و پاسخ‌ها جهت برجسته‌سازی محتوای مفیدتر و کاهش دیده‌شدن محتوای کم‌ارزش.")}</p>
                <p className="text-xs text-gray-400 mt-1">{toPersianDigits("UI/UX: نمایش واضح تعداد رأی‌ها در کنار هر پست.")}</p>
            </DetailItem>
            
            <DetailItem title="سیستم برچسب‌گذاری (Tagging) برای موضوعات" icon={<TagIcon />}>
                <p>{toPersianDigits("برای بهبود قابلیت جستجو و دسته‌بندی موضوعات توسط کاربران و سیستم.")}</p>
                <p className="text-xs text-gray-400 mt-1">{toPersianDigits("UI/UX: امکان افزودن برچسب هنگام ایجاد موضوع و نمایش برچسب‌ها در لیست موضوعات.")}</p>
            </DetailItem>

            <DetailItem title="خلاصه‌سازی بحث‌های طولانی توسط هوش مصنوعی" icon={<AISummaryIcon />}>
                <p>{toPersianDigits("برای بحث‌های طولانی و پرطرفدار، هوش مصنوعی می‌تواند خلاصه‌ای از نکات کلیدی ارائه دهد.")}</p>
                <p className="text-xs text-gray-400 mt-1">{toPersianDigits("UI/UX: دکمه «مشاهده خلاصه AI» برای موضوعات طولانی.")}</p>
            </DetailItem>
             <DetailItem title="ملاحظات UI/UX کلی" icon={<UiUxIcon />}>
                <p>{toPersianDigits("اطمینان از اینکه این ویژگی‌های پیشرفته به طور شهودی در رابط کاربری فعلی انجمن ادغام شوند و باعث پیچیدگی بیش از حد نشوند.")}</p>
            </DetailItem>
        </SectionBlockPlan>
      </div>
    </section>
  );
};

export default CommunityAdvancedForumsPlanSection;
