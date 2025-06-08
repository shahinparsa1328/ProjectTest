
import React from 'react';
import { toPersianDigits } from '@/utils'; 

const CallToActionSection: React.FC = () => {
  return (
    <section id="cta" className="py-24 md:py-36 bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-700 text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
          {toPersianDigits("آماده‌اید تا زندگی فوق‌العاده خود را ارکستره کنید؟")}
        </h2>
        <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
          {toPersianDigits("به انقلاب توسعه شخصی بپیوندید. قدرت هوش مصنوعی را در هماهنگ‌سازی جاه‌طلبی‌هایتان با اقدامات روزانه‌تان تجربه کنید.")}
        </p>
        <div className="space-y-5 sm:space-y-0 sm:flex sm:justify-center sm:space-x-5 sm:space-x-reverse"> {/* Adjusted for RTL */}
           <button
            type="button"
            className="w-full sm:w-auto bg-white text-blue-600 font-semibold py-4 px-10 rounded-lg text-lg shadow-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-sky-300"
          >
            {toPersianDigits("شروع رایگان")}
          </button>
          <button
            type="button"
            className="w-full sm:w-auto bg-transparent border-2 border-white text-white font-semibold py-4 px-10 rounded-lg text-lg hover:bg-white hover:text-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/50"
          >
            {toPersianDigits("بیشتر بدانید")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
