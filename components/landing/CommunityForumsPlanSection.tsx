import React from 'react';
import { toPersianDigits } from '../../utils';
import { 
    ChatBubbleOvalLeftEllipsisIcon as ForumIcon,
    FolderIcon,
    PencilSquareIcon,
    ShieldCheckIcon as AdminToolsIcon,
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

const CommunityForumsPlanSection: React.FC = () => {
  return (
    <section id="community-forums-plan" className="py-20 md:py-28 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-sky-500/10 rounded-full mb-4">
             <ForumIcon className="w-12 h-12 text-sky-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-5">
            {toPersianDigits("فاز ۱.۳ (جامعه کاربری): انجمن‌های گفتگوی موضوعی (نسخه پایه)")}
          </h2>
           <div className="w-24 h-1 mx-auto bg-sky-500 rounded-full"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-8">
            {toPersianDigits("ارائه اولین مجموعه از فضاهای گفتگو برای کاربران جهت به اشتراک گذاشتن ایده‌ها، پرسیدن سوالات و دریافت پشتیبانی در موضوعات کلیدی پلتفرم.")}
          </p>
        </div>

        <SectionBlockPlan title="اجزای اصلی انجمن‌های گفتگو" icon={<ForumIcon className="w-7 h-7 text-sky-400" />}>
            <DetailItem title="ایجاد دسته‌بندی‌های اولیه انجمن" icon={<FolderIcon />}>
                <p>{toPersianDigits("بر اساس ماژول‌های اصلی پلتفرم:")}</p>
                <ul className="list-disc list-inside mr-4 rtl:pr-4 rtl:mr-0 space-y-1 text-xs text-gray-400">
                    <li>{toPersianDigits("انجمن اهداف و موفقیت")}</li>
                    <li>{toPersianDigits("انجمن عادات پایدار")}</li>
                    <li>{toPersianDigits("انجمن سلامت و تندرستی")}</li>
                    <li>{toPersianDigits("انجمن یادگیری و مهارت‌ها")}</li>
                    <li>{toPersianDigits("انجمن مدیریت مالی")}</li>
                    <li>{toPersianDigits("و غیره...")}</li>
                </ul>
                <p className="mt-2">{toPersianDigits("چند موضوع عمومی:")}</p>
                 <ul className="list-disc list-inside mr-4 rtl:pr-4 rtl:mr-0 space-y-1 text-xs text-gray-400">
                    <li>{toPersianDigits("گفتگوی آزاد")}</li>
                    <li>{toPersianDigits("پیشنهادات و بازخوردها")}</li>
                </ul>
            </DetailItem>
            
            <DetailItem title="قابلیت‌های پایه انجمن" icon={<PencilSquareIcon />}>
                <ul className="list-disc list-inside mr-4 rtl:pr-4 rtl:mr-0 space-y-1">
                    <li>{toPersianDigits("کاربران می‌توانند موضوعات جدید ایجاد کنند (شامل عنوان و متن اصلی).")}</li>
                    <li>{toPersianDigits("کاربران می‌توانند به موضوعات پاسخ دهند (در این فاز فقط به صورت متنی).")}</li>
                    <li>{toPersianDigits("نمایش لیست موضوعات با اطلاعاتی مانند عنوان، آخرین ارسال‌کننده، تعداد پاسخ‌ها و بازدیدها.")}</li>
                    <li>{toPersianDigits("مرتب‌سازی موضوعات بر اساس آخرین فعالیت یا تاریخ ایجاد.")}</li>
                </ul>
            </DetailItem>

            <DetailItem title="ابزارهای اولیه مدیریت برای ادمین‌ها" icon={<AdminToolsIcon />}>
                <p>{toPersianDigits("قابلیت حذف موضوعات یا پاسخ‌های نامناسب توسط مدیران سیستم.")}</p>
            </DetailItem>

            <DetailItem title="UI/UX پیشنهادی" icon={<UiUxIcon />}>
                <p>{toPersianDigits("طراحی استاندارد و آشنا برای انجمن‌ها، مشابه پلتفرم‌های رایج.")}</p>
                <p>{toPersianDigits("فرم ساده و کاربرپسند برای ایجاد موضوع و ارسال پاسخ.")}</p>
                <p>{toPersianDigits("نمایش واضح اطلاعات موضوع در لیست (عنوان، آمار، آخرین فعالیت).")}</p>
            </DetailItem>
        </SectionBlockPlan>
      </div>
    </section>
  );
};

export default CommunityForumsPlanSection;