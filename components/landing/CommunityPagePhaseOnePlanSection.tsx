import React from 'react';
import { toPersianDigits } from '../../utils';
import { 
    UsersIcon, 
    LightbulbIcon, 
    HeartIcon, 
    UserGroupIcon as GrowthIcon, // Using UserGroup for shared growth concept
    UserCircleIcon, 
    PencilSquareIcon,
    ChatBubbleOvalLeftEllipsisIcon as ForumIcon, 
    SparklesIconNav as AIWelcomeIcon,
    StarIcon
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

const CommunityPagePhaseOnePlanSection: React.FC = () => {
  return (
    <section id="community-phase-1-plan" className="py-20 md:py-28 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-sky-500/10 rounded-full mb-4">
             <UsersIcon className="w-12 h-12 text-sky-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-5">
            {toPersianDigits("فاز ۱ (جامعه کاربری): ایجاد پایه‌ها برای ارتباط، پروفایل‌های کاربری و انجمن‌های اولیه (MVP)")}
          </h2>
           <div className="w-24 h-1 mx-auto bg-sky-500 rounded-full"></div> {/* section-title-underline */}
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-8">
            {toPersianDigits("هدف اصلی این فاز، راه‌اندازی فضایی امن، دعوت‌کننده و کاربرپسند برای جامعه است که کاربران بتوانند پروفایل‌های اولیه خود را ایجاد کنند، به انجمن‌های موضوعی پایه دسترسی داشته باشند و اولین تعاملات معنادار خود را آغاز نمایند.")}
          </p>
        </div>

        <SectionBlockPlan title="۱.۱. دروازه ورود به جامعه پویا: ایجاد حس اولیه تعلق و دعوت به مشارکت" icon={<UsersIcon className="w-7 h-7 text-sky-400" />}>
            <DetailItem title="عنوان و زیرعنوان اصلی گرم، فراگیر و هدفمند">
                <p><strong>{toPersianDigits("عنوان:")}</strong> {toPersianDigits("به ارکستر همدلی و رشد بپیوندید")}</p>
                <p className="text-xs text-gray-400 mt-1">{toPersianDigits("UI/UX: فونت دوستانه، مدرن و خوانا. در بالای صفحه با تصویر پس‌زمینه از گروهی متنوع از افراد که به طور مثبت همکاری یا گفتگو می‌کنند.")}</p>
                <p className="mt-2"><strong>{toPersianDigits("زیرعنوان:")}</strong> {toPersianDigits("جامعه هوشمند شما برای اشتراک و پیشرفت.")}</p>
                <p className="text-xs text-gray-400 mt-1">{toPersianDigits("UI/UX: فونت کوچکتر، با لحنی که فراگیری و حمایت متقابل را القا می‌کند.")}</p>
                 <p className="mt-2"><strong>{toPersianDigits("توضیح تکمیلی (از متن اصلی):")}</strong> {toPersianDigits("با کمک دستیار هوشمند جامعه، با افراد هم‌فکر ارتباط برقرار کنید، از تجربیات دیگران بیاموزید و در مسیر رشد، یکدیگر را حمایت کنید.")}</p>
            </DetailItem>
            
            <DetailItem title="عناصر بصری الهام‌بخش و نمادین از همکاری">
                <p>{toPersianDigits("تصویر یا انیمیشن کوتاه در بخش Hero: تصاویری از افراد در حال تبادل ایده، کار گروهی موفق، یا شبکه‌ای از نقاط نورانی متصل به هم که نماد ارتباط و خرد جمعی است.")}</p>
                <p className="text-xs text-gray-400 mt-1">{toPersianDigits("UI/UX: تصویر با کیفیت بالا یا انیمیشن کوتاه و روان با رنگ‌های پرانرژی و مثبت. (تصویر نمونه: گروهی از افراد در حال همکاری در یک کارگاه)")}</p>
            </DetailItem>

            <DetailItem title="پیام خوشامدگویی و معرفی اولیه توسط دستیار هوشمند جامعه" icon={<AIWelcomeIcon />}>
                <p><strong>{toPersianDigits("کاربر جدید:")}</strong> {toPersianDigits("«سلام [نام کاربر]! به جامعه پویای پلتفرم ارکستراسیون هوشمند زندگی خوش آمدید. من [نام دستیار هوش مصنوعی] هستم، اینجا تا به شما در یافتن افراد و گروه‌های هم‌فکر و شروع مشارکتتان کمک کنم. مایلید پروفایل خود را تکمیل کنید تا بتوانم پیشنهادات بهتری ارائه دهم؟»")}</p>
                <p className="mt-2"><strong>{toPersianDigits("کاربر بازگشته:")}</strong> {toPersianDigits("«[نام کاربر]، به جامعه خوش آمدید! از آخرین بازدید شما، [تعداد] بحث جدید در انجمن‌های مورد علاقه شما آغاز شده است. نگاهی بیندازیم؟»")}</p>
                <p className="text-xs text-gray-400 mt-1">{toPersianDigits("UI/UX: نمایش پیام در یک کارت تعاملی با آواتار دستیار هوش مصنوعی (شاید با آیکن LightbulbIcon یا AIWelcomeIcon در کنار آن!). دکمه‌های اقدام واضح (مثلاً «تکمیل پروفایل من»، «کاوش در انجمن‌ها»، «مشاهده فعالیت‌های اخیر»).")}</p>
            </DetailItem>

            <DetailItem title="بخش: «چرا جامعه کاربری، ارکستر زندگی شما را قدرتمندتر می‌کند»">
                <p>{toPersianDigits("تاکید بر مزایای عضویت در جامعه: دریافت پشتیبانی در چالش‌ها ( HeartIcon )، یادگیری از تجربیات واقعی دیگران ( LightbulbIcon )، افزایش انگیزه با مشاهده پیشرفت جمعی، یافتن همراهان مسیر و احساس تنهایی کمتر در مسیر رشد ( GrowthIcon ).")}</p>
                <p className="text-xs text-gray-400 mt-1">{toPersianDigits("UI/UX: استفاده از آیکن‌های تصویری در کنار توضیحات کوتاه و تأثیرگذار.")}</p>
            </DetailItem>

            <DetailItem title="بخش: «شروع سریع و معنادار در جامعه»">
                <p><strong>{toPersianDigits("دکمه ۱ ( UserCircleIcon یا PencilSquareIcon ):")}</strong> {toPersianDigits("«پروفایل خود را بسازید و به ما بپیوندید» (همراه با راهنمایی برای تکمیل اطلاعات کلیدی و تنظیمات حریم خصوصی).")}</p>
                <p className="mt-2"><strong>{toPersianDigits("دکمه ۲ ( ForumIcon ):")}</strong> {toPersianDigits("«کاوش در انجمن‌های گفتگو» (لینک به لیست انجمن‌های موضوعی).")}</p>
                <p className="mt-2"><strong>{toPersianDigits("دکمه ۳ ( UsersIcon یا StarIcon ):")}</strong> {toPersianDigits("«مشاهده اعضای برجسته یا فعال هفته (پیشنهاد AI)» (برای ایجاد حس پویایی و تشویق مشارکت).")}</p>
            </DetailItem>
        </SectionBlockPlan>
      </div>
    </section>
  );
};

export default CommunityPagePhaseOnePlanSection;
