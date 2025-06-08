
import React from 'react';
import { toPersianDigits } from '@/utils'; 
import { MapIcon } from '../shared/AppIcons'; 

const RoadmapMVPSection: React.FC = () => {
  const mvpGoal = toPersianDigits("ارائه یک نسخه اصلی و کاربردی از LifeOrchestrator AI که به کاربران امکان می‌دهد ارزش اساسی تنظیم اهداف، مدیریت وظایف و شکل‌دهی عادت با کمک هوش مصنوعی را تجربه کنند، در حالی که بازخورد حیاتی برای تکرارهای آینده جمع‌آوری می‌شود.");

  const mvpCapabilities = [
    {
      category: toPersianDigits("دستیار هوش مصنوعی (پایه)"),
      features: [
        toPersianDigits("ورودی و تعامل مبتنی بر متن."),
        toPersianDigits("NLU پایه برای ایجاد وظیفه و ثبت عادت."),
        toPersianDigits("پیشنهادات ساده و مبتنی بر قانون برای برنامه‌ریزی روزانه."),
        toPersianDigits("نام قابل انتخاب توسط کاربر برای هوش مصنوعی."),
      ],
    },
    {
      category: toPersianDigits("مدیریت اهداف و وظایف (هسته)"),
      features: [
        toPersianDigits("ایجاد، ویرایش، حذف اهداف."),
        toPersianDigits("تجزیه اهداف به وظایف با مهلت زمانی."),
        toPersianDigits("اولویت‌بندی پایه وظایف (دستی یا پیشنهاد ساده هوش مصنوعی)."),
        toPersianDigits("پیگیری تکمیل وظایف."),
      ],
    },
    {
      category: toPersianDigits("مهندسی عادت (پایه)"),
      features: [
        toPersianDigits("تعریف و پیگیری عادات روزانه/هفتگی."),
        toPersianDigits("یادآوری‌های ساده و پیگیری زنجیره عادت."),
      ],
    },
    {
      category: toPersianDigits("حساب کاربری و ورود اولیه"),
      features: [
        toPersianDigits("ثبت‌نام و ورود امن کاربر."),
        toPersianDigits("تنظیمات پایه پروفایل و ورود اولیه ساده."),
      ],
    },
     {
      category: toPersianDigits("چارچوب اصلی UI/UX"),
      features: [
        toPersianDigits("طراحی تمیز، شهودی و واکنش‌گرا برای ویژگی‌های MVP."),
      ],
    },
  ];

  const roadmapPhases = [
    {
      name: toPersianDigits("فاز ۱: MVP"),
      target: toPersianDigits("هدف: سه‌ماهه اول ۲۰۲۵ (شبیه‌سازی شده)"),
      description: toPersianDigits("تمرکز بر برنامه‌ریزی و شکل‌دهی عادت با کمک هوش مصنوعی."),
      features: [
        toPersianDigits("دستیار هوش مصنوعی (پایه - متن، NLU پایه)"),
        toPersianDigits("مدیریت اهداف و وظایف (هسته)"),
        toPersianDigits("مهندسی عادت (پایه)"),
        toPersianDigits("حساب‌های کاربری و ورود اولیه"),
      ],
      estComplexity: toPersianDigits("متوسط-بالا"),
      estTime: toPersianDigits("۳-۴ ماه"),
    },
    {
      name: toPersianDigits("فاز ۲: بهبود و توسعه اولیه"),
      target: toPersianDigits("پس از MVP + ۳-۶ ماه"),
      description: toPersianDigits("گسترش قابلیت‌های هوش مصنوعی و معرفی ماژول‌های اولیه سلامت و یادگیری."),
      features: [
        toPersianDigits("دستیار هوش مصنوعی (NLU پیشرفته، ورودی گفتاری، آگاهی زمینه‌ای پایه)"),
        toPersianDigits("مدیریت وظایف پیشرفته (وظایف فرعی، اولویت‌بندی هوش مصنوعی نسخه ۲)"),
        toPersianDigits("مهندسی عمیق‌تر عادت (گیمیفیکیشن، تحلیل‌ها)"),
        toPersianDigits("سلامت و تندرستی (ثبت اولیه تغذیه و فعالیت)"),
        toPersianDigits("یادگیری مادام‌العمر (جمع‌آوری محتوای پایه)"),
      ],
      estComplexity: toPersianDigits("بالا"),
      estTime: toPersianDigits("۴-۶ ماه"),
    },
    {
      name: toPersianDigits("فاز ۳: ارکستراسیون جامع"),
      target: toPersianDigits("پس از فاز ۲ + ۶-۹ ماه"),
      description: toPersianDigits("ادغام حوزه‌های بیشتر زندگی و تعمیق شخصی‌سازی هوش مصنوعی."),
      features: [
        toPersianDigits("دستیار هوش مصنوعی (چندوجهی، پیشنهادات فعال)"),
        toPersianDigits("مجموعه کامل سلامت و تندرستی"),
        toPersianDigits("مدیریت مالی (بودجه‌بندی - دستی)"),
        toPersianDigits("ویژگی‌های اولیه جامعه کاربری"),
      ],
      estComplexity: toPersianDigits("بسیار بالا"),
      estTime: toPersianDigits("۶-۹ ماه"),
    },
     {
      name: toPersianDigits("فاز ۴ و پس از آن: اکوسیستم و ویژگی‌های پیشرفته"),
      target: toPersianDigits("مداوم"),
      description: toPersianDigits("تکامل مداوم با هوش مصنوعی پیشرفته، ادغام‌ها و ماژول‌های اختیاری."),
      features: [
        toPersianDigits("همدلی پیشرفته شخصیت هوش مصنوعی و هم‌افزایی بین حوزه‌ای"),
        toPersianDigits("ادغام با خانه هوشمند"),
        toPersianDigits("ماژول‌های اختیاری (مثلاً مراقبت از خانواده)"),
      ],
      estComplexity: toPersianDigits("بسیار بالا"),
      estTime: toPersianDigits("مداوم"),
    },
  ];


  return (
    <section id="mvp-roadmap" className="py-20 md:py-28 bg-slate-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-sky-500/10 rounded-full mb-4">
             <MapIcon className="w-12 h-12 text-sky-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-5">
            {toPersianDigits("فاز ۱.۳: تعریف MVP و نقشه راه مرحله‌ای")}
          </h2>
          <div className="section-title-underline"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-8">
            {toPersianDigits("تعریف دامنه اولیه محصول و ترسیم مسیر پیش رو برای LifeOrchestrator AI، بر اساس تحلیل شبیه‌سازی شده هوش مصنوعی.")}
          </p>
        </div>

        <div className="mb-16 bg-slate-700/50 border border-slate-600 p-8 rounded-2xl shadow-2xl">
          <h3 className="text-2xl md:text-3xl font-semibold text-sky-300 mb-4 text-center">{toPersianDigits("هدف محصول حداقلی قابل عرضه (MVP)")}</h3>
          <p className="text-gray-300 text-center mb-10 leading-relaxed">{mvpGoal}</p>

          <h4 className="text-xl md:text-2xl font-semibold text-sky-400 mb-6 text-center">{toPersianDigits("قابلیت‌های اصلی MVP")}</h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mvpCapabilities.map((cat, index) => (
              <div key={index} className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700">
                <h5 className="font-semibold text-sky-300 mb-3 text-lg">{cat.category}</h5>
                <ul className="list-disc list-inside space-y-2 pr-4"> {/* Adjusted for RTL */}
                  {cat.features.map((feature, fIndex) => (
                    <li key={fIndex} className="text-sm text-gray-300 leading-relaxed">{feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
           <p className="text-xs text-gray-500 mt-8 text-center">
            *{toPersianDigits("منطق: این MVP بر قابلیت‌های اصلی P0/P1 تمرکز دارد، ارزش فوری کاربر را در برنامه‌ریزی و شکل‌دهی عادت ارائه می‌دهد، بنیاد هوش مصنوعی را ایجاد می‌کند و پیچیدگی توسعه اولیه را مدیریت می‌کند.")}*
          </p>
        </div>


        <div>
          <h3 className="text-2xl md:text-3xl font-semibold text-sky-300 mb-10 text-center">{toPersianDigits("نقشه راه مرحله‌ای محصول")}</h3>
          <div className="space-y-10">
            {roadmapPhases.map((phase, index) => (
              <div key={index} className="bg-slate-700/50 border border-slate-600 p-6 md:p-8 rounded-2xl shadow-xl hover:shadow-sky-500/30 transition-all duration-300 hover:border-sky-600/70">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 pb-4 border-b border-slate-600">
                    <h4 className="text-2xl font-bold text-sky-400">{phase.name}</h4>
                    <p className="text-sm text-sky-500 font-medium mt-2 sm:mt-0">{phase.target}</p>
                </div>
                <p className="text-gray-300 mb-5 text-md leading-relaxed">{phase.description}</p>
                <div className="mb-4">
                  <h5 className="text-md font-semibold text-gray-200 mb-2">{toPersianDigits("ویژگی‌ها/تمرکز کلیدی:")}</h5>
                  <ul className="list-disc list-inside space-y-1 pr-5 columns-1 md:columns-2"> {/* Adjusted for RTL & columns */}
                    {phase.features.map((feature, fIndex) => (
                      <li key={fIndex} className="text-sm text-gray-400 leading-relaxed">{feature}</li>
                    ))}
                  </ul>
                </div>
                 <div className="text-sm text-gray-500 mt-5 pt-3 border-t border-slate-600">
                    {toPersianDigits(`تخمین شبیه‌سازی شده هوش مصنوعی - پیچیدگی: ${phase.estComplexity}، زمان: ${phase.estTime}`)}
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-10 text-center">
            *{toPersianDigits("مدل‌های تخمین مبتنی بر هوش مصنوعی، داده‌های تاریخی پروژه، پیچیدگی ویژگی و سرعت تیم را تحلیل می‌کنند تا محدوده‌های زمانی دقیق‌تری (مثلاً «مدیریت اهداف: ۴-۶ اسپرینت، ۸۰٪ اطمینان») ارائه دهند و عوامل خطر کلیدی برای هر قابلیت را شناسایی کنند.")}*
          </p>
        </div>
      </div>
    </section>
  );
};

export default RoadmapMVPSection;
