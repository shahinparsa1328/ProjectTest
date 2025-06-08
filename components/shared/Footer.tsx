
import React from 'react';
import { toPersianDigits } from '@/utils'; 

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-slate-900 text-gray-400 py-10 border-t border-slate-700/50">
      <div className="container mx-auto px-6 text-center">
        <p className="text-base mb-2">
          {toPersianDigits(`© ${currentYear} LifeOrchestrator AI. تمامی حقوق محفوظ است.`)}
        </p>
        <p className="text-sm text-gray-500">
          {toPersianDigits("شریک شما در ساختن یک زندگی فوق‌العاده.")}
        </p>
         <div className="mt-6 space-x-6 space-x-reverse">
          <a href="#privacy" className="hover:text-sky-400 transition-colors duration-300">{toPersianDigits("سیاست حفظ حریم خصوصی")}</a>
          <a href="#terms" className="hover:text-sky-400 transition-colors duration-300">{toPersianDigits("شرایط خدمات")}</a>
          <a href="#contact" className="hover:text-sky-400 transition-colors duration-300">{toPersianDigits("تماس با ما")}</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
