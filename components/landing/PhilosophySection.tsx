
import React from 'react';
import { toPersianDigits } from '@/utils'; 

const PhilosophySection: React.FC = () => {
  return (
    <section id="philosophy" className="py-20 md:py-28 bg-slate-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-5">
            {toPersianDigits("فلسفه اصلی: فراتر از مدیریت وظایف")}
          </h2>
          <div className="section-title-underline"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-8">
            {toPersianDigits("هدف ما «ارکستره کردن» زندگی است – هماهنگ‌سازی هوشمندانه کار، سلامت، یادگیری و روابط برای همسویی با بینش و ارزش‌های اصلی شما. شما آهنگساز هستید، هوش مصنوعی رهبر ارکستر شماست.")}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-10 items-stretch"> {/* items-stretch to make cards same height */}
          <div className="bg-slate-800 p-8 rounded-xl shadow-xl border border-slate-700 hover:border-sky-600/70 hover:shadow-sky-500/20 transition-all duration-300">
            <h3 className="text-2xl font-semibold text-sky-400 mb-4">{toPersianDigits("از آشفتگی تا هارمونی")}</h3>
            <p className="text-gray-300 leading-relaxed">
              {toPersianDigits("ابزارهای سنتی وظایف را مدیریت می‌کنند. ما به شما کمک می‌کنیم تا کل زندگی خود را ارکستره کنید، و اطمینان حاصل کنید که هر جزء در جهت تعریف شما از موفقیت و رضایت، هماهنگ عمل می‌کند.")}
            </p>
          </div>
          <div className="bg-slate-800 p-8 rounded-xl shadow-xl border border-slate-700 hover:border-sky-600/70 hover:shadow-sky-500/20 transition-all duration-300">
            <h3 className="text-2xl font-semibold text-sky-400 mb-4">{toPersianDigits("همکاری با هوش مصنوعی تطبیق‌پذیر")}</h3>
            <p className="text-gray-300 leading-relaxed">
              {toPersianDigits("هوش مصنوعی ما از شما می‌آموزد، زمینه شما را درک می‌کند و بینش‌ها و استراتژی‌های شخصی‌سازی شده ارائه می‌دهد، و شما را برای تصمیم‌گیری بهتر و دستیابی به بزرگترین اهدافتان توانمند می‌سازد.")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
