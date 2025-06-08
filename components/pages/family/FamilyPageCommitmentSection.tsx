import React from 'react';
import { toPersianDigits } from '../../../utils';
import { CogIcon, ShieldCheckIcon, SparklesIconNav as InnovationIcon } from '../../shared/AppIcons';

interface FamilyPageThemeSettingsInternal {
  backgroundClass: string;
  primaryAccentClass: string;
  secondaryAccentClass: string;
  buttonBgClass: string;
  buttonHoverBgClass: string;
}

interface FamilyPageCommitmentSectionProps {
  themeClasses: FamilyPageThemeSettingsInternal;
}

interface CommitmentItemProps { 
  icon: React.ReactElement<{ className?: string }>; 
  title: string; 
  text: string; 
  primaryAccentClass: string; 
}
const CommitmentItem: React.FC<CommitmentItemProps> = ({ icon, title, text, primaryAccentClass }) => (
  <div className="flex flex-col items-center text-center p-3">
    <div className={`p-3 rounded-full mb-2 bg-opacity-10 ${primaryAccentClass.replace('text-', 'bg-').replace('-600', '-100')}`}>
      {React.cloneElement(icon, { className: `w-8 h-8 ${primaryAccentClass}` })}
    </div>
    <h4 className={`text-sm font-semibold mb-1 ${primaryAccentClass}`}>{toPersianDigits(title)}</h4>
    <p className="text-xs text-gray-600 leading-relaxed">{toPersianDigits(text)}</p>
  </div>
);

const FamilyPageCommitmentSection: React.FC<FamilyPageCommitmentSectionProps> = ({ themeClasses }) => {
  return (
    <div className={`mt-6 p-4 rounded-xl shadow-lg border ${themeClasses.secondaryAccentClass} bg-white`}>
      <h3 className={`text-lg font-semibold ${themeClasses.primaryAccentClass} mb-4 text-center`}>
        {toPersianDigits("تعهد ما به خانواده شما")}
      </h3>
      <p className="text-xs text-gray-600 text-center mb-5 leading-relaxed">
        {toPersianDigits("ما در LifeOrchestrator AI به ساختن آینده‌ای روشن‌تر برای خانواده‌ها از طریق فناوری هوشمند، امن و نوآورانه باور داریم. تعهدات ما در قبال شما:")}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <CommitmentItem
          icon={<InnovationIcon />}
          title="نوآوری با هوش مصنوعی"
          text="بهره‌گیری از آخرین دستاوردهای هوش مصنوعی برای ارائه راه‌حل‌های خلاقانه و شخصی‌سازی شده جهت تسهیل زندگی خانوادگی و تقویت روابط."
          primaryAccentClass={themeClasses.primaryAccentClass}
        />
        <CommitmentItem
          icon={<ShieldCheckIcon />}
          title="امنیت و حریم خصوصی"
          text="حفاظت از داده‌های حساس خانواده شما با بالاترین استانداردهای امنیتی و شفافیت کامل در مورد نحوه استفاده از اطلاعات، اولویت اصلی ماست."
          primaryAccentClass={themeClasses.primaryAccentClass}
        />
        <CommitmentItem
          icon={<CogIcon />} 
          title="پشتیبانی و تکامل مداوم"
          text="ما متعهد به بهبود مستمر پلتفرم و ارائه پشتیبانی لازم برای کمک به شما در استفاده بهینه از تمام امکانات برای ساختن یک زندگی خانوادگی هماهنگ‌تر هستیم."
          primaryAccentClass={themeClasses.primaryAccentClass}
        />
      </div>
    </div>
  );
};

export default FamilyPageCommitmentSection;