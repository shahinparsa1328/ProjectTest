import React from 'react';
import { toPersianDigits } from '../../utils';
import { 
    UsersIcon, // Main section icon
    BriefcaseIcon as CollaborationToolsIcon, // For "Advanced Collaboration Tools" title
    FolderIcon as SharedWorkspaceIcon,
    FilmIcon as MeetingsIcon, // Using FilmIcon as a proxy for video/audio meetings
    PaintBrushIcon as UiUxIcon
} from '../shared/AppIcons';

// Re-using a similar block structure from other planning sections
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

const CommunityAdvancedCollaborationPlanSection: React.FC = () => {
  return (
    <section id="community-phase-3-plan" className="py-20 md:py-28 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-sky-500/10 rounded-full mb-4">
             <UsersIcon className="w-12 h-12 text-sky-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-5">
            {toPersianDigits("فاز ۳ (جامعه کاربری): اکوسیستم جامعه خودگردان، یکپارچه‌سازی عمیق و پشتیبانی پیش‌بینانه")}
          </h2>
           <div className="w-24 h-1 mx-auto bg-sky-500 rounded-full"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-8">
            {toPersianDigits("هدف اصلی فاز ۳: ایجاد یک جامعه کاربری پویا و تا حد زیادی خودگردان که عمیقاً با تمام جنبه‌های سفر ارکستراسیون زندگی کاربر یکپارچه شده و پشتیبانی پیش‌بینانه و به‌موقع ارائه می‌دهد.")}
          </p>
        </div>

        <SectionBlockPlan title="۳.۱. ابزارهای همکاری پیشرفته در گروه‌ها" icon={<CollaborationToolsIcon className="w-7 h-7 text-sky-400" />} mainTitle={true}>
            <DetailItem title="فضاهای کاری مشترک در گروه‌ها" icon={<SharedWorkspaceIcon />}>
                <p>{toPersianDigits("با ویژگی‌هایی مانند ویرایشگر اسناد مشترک ساده، لیست وظایف گروهی و تخته سفید مجازی برای طوفان فکری.")}</p>
                <p className="text-xs text-gray-400 mt-1">{toPersianDigits("این ابزارها به اعضای گروه کمک می‌کنند تا به طور مؤثرتر بر روی پروژه‌ها یا اهداف مشترک کار کنند.")}</p>
            </DetailItem>
            
            <DetailItem title="قابلیت برگزاری جلسات ویدیویی یا صوتی درون‌برنامه‌ای برای گروه‌ها" icon={<MeetingsIcon />}>
                <p>{toPersianDigits("امکان برقراری ارتباط چهره به چهره یا صوتی برای بحث‌های گروهی، جلسات آموزشی یا رویدادهای مجازی.")}</p>
            </DetailItem>

            <DetailItem title="ملاحظات UI/UX" icon={<UiUxIcon />}>
                <p>{toPersianDigits("افزودن این ابزارها به صفحه هر گروه با یک رابط کاربری ساده و یکپارچه.")}</p>
                <p>{toPersianDigits("دسترسی آسان به ابزارها از منوی گروه یا داشبورد گروه.")}</p>
                <p className="text-xs text-gray-400 mt-1">{toPersianDigits("اطمینان از عملکرد روان و کارآمد ابزارها حتی با پهنای باند کمتر.")}</p>
            </DetailItem>
        </SectionBlockPlan>
      </div>
    </section>
  );
};

export default CommunityAdvancedCollaborationPlanSection;