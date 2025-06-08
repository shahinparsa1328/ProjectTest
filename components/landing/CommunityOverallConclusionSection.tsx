import React from 'react';
import { toPersianDigits } from '../../utils';
import { 
    UsersIcon, // Main section icon
    HeartIcon, // For empathy
    LightbulbIcon, // For wisdom
    UserGroupIcon // For empowerment
} from '../shared/AppIcons';

const CommunityOverallConclusionSection: React.FC = () => {
  return (
    <section id="community-conclusion" className="py-20 md:py-28 bg-gradient-to-br from-sky-700 via-blue-800 to-indigo-900 text-white">
      <div className="container mx-auto px-6 text-center">
        <div className="inline-block p-4 bg-white/10 rounded-full mb-6 shadow-lg">
            <UsersIcon className="w-16 h-16 text-sky-300" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
          {toPersianDigits("نتیجه‌گیری نهایی: جامعه کاربری، سمفونی همدلی، خرد جمعی و توانمندسازی متقابل")}
        </h2>
        <div className="w-20 h-1.5 mx-auto bg-sky-400 rounded-full mb-10"></div>
        <p className="text-md md:text-lg mb-8 max-w-3xl mx-auto leading-relaxed opacity-90">
          {toPersianDigits("با اجرای این سه فاز، صفحه «جامعه کاربری» در «پلتفرم ارکستراسیون هوشمند زندگی» به یک اکوسیستم زنده و پویا تبدیل خواهد شد که در آن هر کاربر نه تنها یک مصرف‌کننده محتوا، بلکه یک مشارکت‌کننده فعال در ایجاد ارزش، دانش و پشتیبانی است.")}
        </p>
        <p className="text-md md:text-lg mb-12 max-w-3xl mx-auto leading-relaxed opacity-90">
          {toPersianDigits("این جامعه، با قدرت هوش مصنوعی و شور و اشتیاق اعضای خود، به کاربران کمک خواهد کرد تا در مسیر ارکستراسیون هوشمندانه زندگی خود کمتر احساس تنهایی کنند، از خرد جمعی بهره‌مند شوند و با انگیزه‌ای مضاعف به سمت اهداف خود حرکت نمایند. این تعهد ما به ساختن فضایی است که در آن «ما» قدرتمندتر از «من» خواهیم بود.")}
        </p>
        <div className="flex justify-center space-x-4 space-x-reverse">
            <div className="flex flex-col items-center p-3 bg-white/10 rounded-lg shadow-md min-w-[100px]">
                <HeartIcon className="w-8 h-8 text-rose-300 mb-1"/>
                <span className="text-xs font-medium">{toPersianDigits("همدلی")}</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-white/10 rounded-lg shadow-md min-w-[100px]">
                <LightbulbIcon className="w-8 h-8 text-yellow-300 mb-1"/>
                <span className="text-xs font-medium">{toPersianDigits("خرد جمعی")}</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-white/10 rounded-lg shadow-md min-w-[100px]">
                <UserGroupIcon className="w-8 h-8 text-green-300 mb-1"/>
                <span className="text-xs font-medium">{toPersianDigits("توانمندسازی متقابل")}</span>
            </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityOverallConclusionSection;