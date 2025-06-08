
import React, { useState } from 'react';
import { toPersianDigits } from '@/utils'; 

const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a
    href={href}
    className="px-4 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-sky-600 hover:text-white transition-all duration-300"
  >
    {children}
  </a>
);

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-slate-900 bg-opacity-70 backdrop-blur-xl shadow-2xl sticky top-0 z-50 border-b border-slate-700/50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8"> {/* Changed to screen-xl for wider layout */}
        <div className="flex items-center justify-between h-20"> {/* Increased height */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-500 to-blue-500">
                {toPersianDigits("LifeOrchestrator AI")}
              </span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="mr-4 flex items-baseline space-x-2 space-x-reverse"> {/* Adjusted spacing */}
              <NavLink href="#philosophy">فلسفه</NavLink>
              <NavLink href="#features">ویژگی‌ها</NavLink>
              <NavLink href="#planning-insights">بینش‌های برنامه‌ریزی</NavLink>
              {/* Simplified for brevity, other links follow same pattern */}
              <NavLink href="#start-journey">آغاز سفر</NavLink>
              <NavLink href="#cta">شروع کنید</NavLink>
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">باز کردن منوی اصلی</span>
              {isMobileMenuOpen ? (
                <svg className="block h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink href="#philosophy">فلسفه</NavLink>
            <NavLink href="#features">ویژگی‌ها</NavLink>
            <NavLink href="#planning-insights">بینش‌های برنامه‌ریزی</NavLink>
            <NavLink href="#market-insights">بینش‌های بازار</NavLink>
            <NavLink href="#mvp-roadmap">MVP و نقشه راه</NavLink>
            <NavLink href="#architecture-design">معماری</NavLink>
            <NavLink href="#ux-ui-design">طراحی UX/UI</NavLink>
            <NavLink href="#nlu-engine-design">طراحی موتور NLU</NavLink>
            <NavLink href="#nlg-engine-design">طراحی موتور NLG</NavLink>
            <NavLink href="#ml-engine-design">طراحی موتور ML</NavLink>
            <NavLink href="#reasoning-engine-design">طراحی موتور استدلال</NavLink>
            <NavLink href="#ai-persona-engine">طراحی شخصیت AI</NavLink>
            <NavLink href="#core-ai-assistant">دستیار اصلی AI</NavLink>
            <NavLink href="#goal-task-management">مدیریت اهداف و وظایف</NavLink>
            <NavLink href="#habit-engineering">مهندسی عادت</NavLink>
            <NavLink href="#health-wellbeing">سلامت و تندرستی</NavLink>
            <NavLink href="#lifelong-learning">یادگیری مادام‌العمر</NavLink>
            <NavLink href="#financial-management">مدیریت مالی</NavLink>
            <NavLink href="#smart-travel-assistant">دستیار سفر هوشمند</NavLink>
            <NavLink href="#smart-home-living">زندگی در خانه هوشمند</NavLink>
            <NavLink href="#smart-family-care">مراقبت از خانواده</NavLink>
            <NavLink href="#ux-community">تجربه کاربری و جامعه</NavLink>
            <NavLink href="#infra-security-business">زیرساخت و کسب‌وکار</NavLink>
            <NavLink href="#comprehensive-testing">تست جامع</NavLink>
            <NavLink href="#deployment-prep">آمادگی برای استقرار</NavLink>
            <NavLink href="#feedback-improvement">بازخورد و بهبود</NavLink>
            <NavLink href="#security">امنیت</NavLink>
            <NavLink href="#start-journey">آغاز سفر</NavLink>
            <NavLink href="#cta">شروع کنید</NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
