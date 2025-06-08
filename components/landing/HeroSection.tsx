
import React from 'react';
import { toPersianDigits } from '@/utils'; 

const HeroSection: React.FC = () => {
  return (
    <section className="py-24 md:py-40 bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 text-white relative overflow-hidden">
       {/* Subtle background elements for depth */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="heroGrid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#38bdf8" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroGrid)" />
        </svg>
      </div>
      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight mb-8 tracking-tight">
          {toPersianDigits("پلتفرم ارکستراسیون زندگی با هوش مصنوعی")}
        </h1>
        <p className="text-xl md:text-2xl text-sky-300 mb-10 max-w-3xl mx-auto">
          {toPersianDigits("دستیار جامع شما برای شکوفایی: هماهنگ‌سازی هوشمندانه عناصر زندگی.")}
        </p>
        <p className="text-lg text-gray-300 mb-16 max-w-2xl mx-auto">
          {toPersianDigits("مدیریت زندگی را از وظایف پراکنده به سمفونی رشد، بهره‌وری و تندرستی با هوش مصنوعی پیشرفته ما تبدیل کنید.")}
        </p>
        <a
          href="#cta"
          className="bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 hover:from-sky-400 hover:via-blue-400 hover:to-indigo-500 text-white font-semibold py-4 px-10 rounded-lg text-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-sky-300"
        >
          {toPersianDigits("پتانسیل خود را کشف کنید")}
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
