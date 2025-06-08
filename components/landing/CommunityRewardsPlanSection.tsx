import React from 'react';
import { toPersianDigits } from '../../utils';
import { 
    TrophyIcon, // Main section icon
    ChartPieIcon as GamificationIcon,
    UserCircleIcon as RecognitionIcon,
    StarIcon as AwardsIcon // Using StarIcon for Virtual Awards
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

const CommunityRewardsPlanSection: React.FC = () => {
  return (
    <section id="community-rewards-plan" className="py-20 md:py-28 bg-slate-900">
      <div className="container mx-auto px-6">
        <SectionBlockPlan title="۳.۵. سیستم تقدیر و پاداش پیشرفته برای مشارکت‌کنندگان فعال" icon={<TrophyIcon className="w-7 h-7 text-sky-400" />} mainTitle={true}>
            <DetailItem title="گیمیفیکیشن پیشرفته" icon={<GamificationIcon />}>
                <p>{toPersianDigits("معرفی «امتیاز اعتبار» یا «سطح مشارکت» برای کاربران بر اساس فعالیت‌های مفید آن‌ها (پاسخ‌های مفید، ایجاد موضوعات جذاب، اشتراک‌گذاری الگوهای با کیفیت، مربیگری موفق و غیره).")}</p>
            </DetailItem>
            
            <DetailItem title="تقدیر عمومی از کاربران برتر" icon={<RecognitionIcon />}>
                <p>{toPersianDigits("تقدیر عمومی از کاربران برتر و فعال‌ترین مربیان در بخش‌های مختلف جامعه (مثلاً در یک تابلوی افتخارات هفتگی یا ماهانه).")}</p>
            </DetailItem>

            <DetailItem title="ارائه «جوایز مجازی» یا «تقدیرهای ویژه»" icon={<AwardsIcon />}>
                <p>{toPersianDigits("امکان ارائه «جوایز مجازی» (مانند نشان‌های ویژه) یا «تقدیرهای ویژه» از طرف پلتفرم یا سایر کاربران به مشارکت‌کنندگان برجسته.")}</p>
                <p className="text-xs text-gray-400 mt-1">{toPersianDigits("این سیستم به افزایش انگیزه برای مشارکت با کیفیت و ایجاد یک جامعه سالم‌تر کمک می‌کند.")}</p>
            </DetailItem>
        </SectionBlockPlan>
      </div>
    </section>
  );
};

export default CommunityRewardsPlanSection;