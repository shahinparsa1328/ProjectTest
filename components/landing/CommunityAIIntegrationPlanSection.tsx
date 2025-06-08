
import React from 'react';
import { toPersianDigits } from '../../utils';
import { 
    SparklesIconNav as AIIntegrationIcon,
    LightbulbIcon as AISuggestionIcon,
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

const CommunityAIIntegrationPlanSection: React.FC = () => {
  return (
    <section id="community-ai-integration-plan" className="py-20 md:py-28 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-sky-500/10 rounded-full mb-4">
             <AIIntegrationIcon className="w-12 h-12 text-sky-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-5">
            {toPersianDigits("فاز ۱.۴ (جامعه کاربری): یکپارچه‌سازی اولیه هوش مصنوعی برای پیشنهاد محتوا")}
          </h2>
           <div className="w-24 h-1 mx-auto bg-sky-500 rounded-full"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-8">
            {toPersianDigits("افزودن لایه اولیه هوشمندی برای راهنمایی کاربران به سمت محتوا و بحث‌های مرتبط، افزایش تعامل و احساس شخصی‌سازی از همان ابتدا.")}
          </p>
        </div>

        <SectionBlockPlan title="جزئیات یکپارچه‌سازی هوش مصنوعی" icon={<AIIntegrationIcon className="w-7 h-7 text-sky-400" />}>
            <DetailItem title="پیشنهاد انجمن‌ها یا موضوعات مرتبط" icon={<AISuggestionIcon />}>
                <p>{toPersianDigits("هوش مصنوعی انجمن‌ها یا موضوعات مرتبط با فعالیت‌ها و علاقه‌مندی‌های کاربر در سایر بخش‌های پلتفرم را پیشنهاد می‌دهد.")}</p>
                <p className="text-xs text-gray-400 mt-1">{toPersianDigits("مثال: اگر کاربر در بخش «یادگیری» در حال یادگیری یک مهارت جدید است، هوش مصنوعی انجمن مربوط به آن مهارت را پیشنهاد می‌دهد.")}</p>
            </DetailItem>
            
            <DetailItem title="UI/UX پیشنهادی برای پیشنهادات هوش مصنوعی" icon={<UiUxIcon />}>
                <p>{toPersianDigits("بخش «انجمن‌های پیشنهادی برای شما» یا «بحث‌های داغ مرتبط با شما» در صفحه اصلی جامعه یا داشبورد کاربر.")}</p>
                <p className="text-xs text-gray-400 mt-1">{toPersianDigits("نمایش پیشنهادات به صورت کارت‌های جذاب با عنوان انجمن/موضوع، خلاصه‌ای کوتاه و دکمه «پیوستن» یا «مشاهده بحث».")}</p>
                <p className="text-xs text-gray-400 mt-1">{toPersianDigits("امکان رد کردن پیشنهاد توسط کاربر و یادگیری هوش مصنوعی از این بازخورد برای بهبود پیشنهادات آینده.")}</p>
            </DetailItem>
        </SectionBlockPlan>
      </div>
    </section>
  );
};

export default CommunityAIIntegrationPlanSection;
