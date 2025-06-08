import React from 'react';
import { toPersianDigits } from '../../utils';
import { 
    PuzzlePieceIcon, // Main section icon, also for "Deep Integration" title
    SparklesIconNav as AIGuidanceIcon,
    ArrowUpIcon as SuccessStoriesIcon,
    PaintBrushIcon as UiUxIcon
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

const CommunityDeepIntegrationPlanSection: React.FC = () => {
  return (
    <section id="community-deep-integration-plan" className="py-20 md:py-28 bg-slate-900">
      <div className="container mx-auto px-6">
        <SectionBlockPlan title="۳.۴. یکپارچه‌سازی عمیق جامعه با ارکستراسیون زندگی کاربر" icon={<PuzzlePieceIcon className="w-7 h-7 text-sky-400" />} mainTitle={true}>
            <DetailItem title="راهنمایی هوشمند به جامعه در لحظات کلیدی" icon={<AIGuidanceIcon />}>
                <p>{toPersianDigits("هنگامی که کاربر با چالشی مواجه می‌شود یا به نقطه عطف مهمی در سایر بخش‌های پلتفرم (اهداف، وظایف، عادات، سلامت و غیره) می‌رسد، هوش مصنوعی به طور هوشمند او را به بحث‌های مرتبط، گروه‌های پشتیبانی یا الگوهای موفق در جامعه راهنمایی می‌کند.")}</p>
                <p className="text-xs text-gray-400 mt-1">{toPersianDigits("مثال ۱: «در تلاش برای ترک سیگار هستید؟ به گروه «حمایت برای ترک سیگار» بپیوندید و از تجربیات دیگران بهره‌مند شوید.»")}</p>
                <p className="text-xs text-gray-400 mt-1">{toPersianDigits("مثال ۲: «تبریک! شما به هدف «تکمیل اولین ماراتن» خود دست یافته‌اید. مایلید تجربه خود را با سایر دوندگان در انجمن «ورزش و تناسب اندام» به اشتراک بگذارید؟»")}</p>
            </DetailItem>
            
            <DetailItem title="نمایش داستان‌های موفقیت به عنوان منبع انگیزه" icon={<SuccessStoriesIcon />}>
                <p>{toPersianDigits("داستان‌های موفقیت و محتوای الهام‌بخش از اعضای جامعه (با اجازه کاربر) به طور برجسته در سایر بخش‌های پلتفرم به عنوان منبع انگیزه نمایش داده می‌شوند.")}</p>
            </DetailItem>

            <DetailItem title="ملاحظات UI/UX" icon={<UiUxIcon />}>
                <p>{toPersianDigits("نمایش لینک‌ها و پیشنهادات جامعه به صورت کارت‌های هوشمند و غیرمزاحم در صفحات مرتبط.")}</p>
                <p>{toPersianDigits("بخش «داستان‌های موفقیت از جامعه ما» در داشبورد اصلی یا صفحات موضوعی.")}</p>
            </DetailItem>
        </SectionBlockPlan>
      </div>
    </section>
  );
};

export default CommunityDeepIntegrationPlanSection;