
import React from 'react';
import { toPersianDigits } from '../../utils';
import { RocketLaunchIcon } from '../shared/AppIcons'; // Import from AppIcons

const StartJourneySection: React.FC = () => {
  return (
    <section id="start-journey" className="py-20 md:py-28 bg-slate-800 relative overflow-hidden">
       <div className="absolute inset-0 opacity-5">
        {/* You can replace this with a more theme-appropriate SVG or image pattern */}
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="journeyGrid" width="50" height="50" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="#0ea5e9"/></pattern></defs><rect width="100%" height="100%" fill="url(#journeyGrid)" /></svg>
      </div>
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="inline-block p-3 bg-sky-500/10 rounded-full mb-6">
            <RocketLaunchIcon className="w-12 h-12 text-sky-400" />
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-6">
          {toPersianDigits("سفر خود را با LifeOrchestrator AI آغاز کنید")}
        </h2>
        <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          {toPersianDigits("اکنون زمان آن است که پتانسیل کامل خود را شکوفا کنید. با دستیار هوشمند ما، زندگی خود را به یک شاهکار هماهنگ از رشد، بهره‌وری و شادی تبدیل کنید.")}
        </p>
        <a
          href="#cta"
          className="bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 hover:from-sky-400 hover:via-blue-400 hover:to-indigo-500 text-white font-semibold py-4 px-10 rounded-lg text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-sky-300"
        >
          {toPersianDigits("اولین قدم را بردارید")}
        </a>
      </div>
    </section>
  );
};

export default StartJourneySection;
