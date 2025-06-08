import React from 'react';
import { toPersianDigits } from '../../utils';
import { 
    CogIcon, // Main section icon
    ChartPieIcon, // For Big Data Analytics
    FolderIcon, // For Sub-communities
    ShieldCheckIcon // For Safe Environment
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

const CommunityFinalOptimizationPlanSection: React.FC = () => {
  return (
    <section id="community-final-optimization-plan" className="py-20 md:py-28 bg-slate-900">
      <div className="container mx-auto px-6">
        <SectionBlockPlan title="۳.۷. بهینه‌سازی نهایی، نوآوری‌های مستمر و آینده جامعه" icon={<CogIcon className="w-7 h-7 text-sky-400" />} mainTitle={true}>
            <DetailItem title="استفاده از تحلیل داده‌های بزرگ (Big Data Analytics)" icon={<ChartPieIcon />}>
                <p>{toPersianDigits("برای درک عمیق‌تر پویایی جامعه و بهینه‌سازی مستمر الگوریتم‌های هوش مصنوعی برای تسهیل‌گری و پیشنهاد محتوا.")}</p>
            </DetailItem>
            
            <DetailItem title="کاوش در ایجاد زیرجامعه‌ها" icon={<FolderIcon />}>
                <p>{toPersianDigits("بررسی امکان ایجاد زیرجامعه‌ها با برندینگ و قوانین خاص خود (تحت نظارت پلتفرم) برای موضوعات بسیار تخصصی یا گروه‌های با علایق خاص.")}</p>
            </DetailItem>

            <DetailItem title="تضمین محیطی امن، فراگیر و محترمانه" icon={<ShieldCheckIcon />}>
                <p>{toPersianDigits("تلاش مستمر برای تضمین محیطی امن، فراگیر، محترمانه و عاری از هرگونه آزار و اذیت یا تبعیض برای تمام اعضا.")}</p>
                <p className="text-xs text-gray-400 mt-1">{toPersianDigits("این شامل به‌روزرسانی مداوم قوانین جامعه، ابزارهای مدیریت و آموزش کاربران است.")}</p>
            </DetailItem>
        </SectionBlockPlan>
      </div>
    </section>
  );
};

export default CommunityFinalOptimizationPlanSection;