
import React from 'react';
import { toPersianDigits } from '@/utils'; 
import { ShieldCheckIcon as ShieldIcon } from '../shared/AppIcons'; 

const SecuritySection: React.FC = () => {
  return (
    <section id="security" className="py-20 md:py-28 bg-slate-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 text-center md:text-right">
             <div className="inline-block p-4 bg-sky-500/10 rounded-full mb-6">
                <ShieldIcon className="w-16 h-16 text-sky-400" />
             </div>
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-6">
              {toPersianDigits("امنیت و حریم خصوصی: سنگ بنای ما")}
            </h2>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              {toPersianDigits("اعتماد شما برای ما بسیار مهم است. ما متعهد به حفاظت از داده‌های شما با پیشرفته‌ترین تدابیر امنیتی هستیم.")}
            </p>
            <ul className="space-y-3 text-gray-300 text-right">
              {[
                "تکنیک‌های رمزنگاری پیشرفته برای محافظت از اطلاعات شما.",
                "احراز هویت چند عاملی برای افزایش امنیت حساب کاربری.",
                "داشبورد کنترل داده شفاف برای استقلال کامل کاربر."
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-sky-400 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {toPersianDigits(item)}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:w-1/2">
            <div className="bg-slate-700/50 p-8 rounded-xl shadow-2xl aspect-video flex items-center justify-center border border-slate-600">
              {/* Placeholder for a more sophisticated visual */}
              <div className="text-center">
                <ShieldIcon className="w-24 h-24 text-slate-500 mx-auto opacity-50" />
                <p className="text-slate-500 text-lg mt-4">{toPersianDigits("نمایش بصری امنیت پیشرفته")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;