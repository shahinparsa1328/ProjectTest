
import React from 'react';
import { toPersianDigits } from '../../utils';
import { HeartPulseIcon } from '../shared/AppIcons'; // Updated import

const InfoListItemHealth: React.FC<{ title?: string; children: React.ReactNode; className?: string }> = ({ title, children, className = "text-gray-300 text-md leading-relaxed" }) => (
  <li className={`list-disc list-inside mr-4 ${className}`}> {/* Adjusted for RTL */}
    {title && <strong className="text-sky-400 font-semibold">{title}: </strong>}
    {children}
  </li>
);

const SectionBlockHealth: React.FC<{ title: string; children: React.ReactNode; className?: string; note?: string }> = ({ title, children, className = "bg-slate-800 p-8 rounded-xl shadow-xl border border-slate-700", note }) => (
    <div className={className}>
        <h3 className="text-xl md:text-2xl font-semibold text-sky-300 mb-5">{title}</h3>
        {children}
        {note && <p className="text-sm text-gray-500 mt-4 italic">{note}</p>}
    </div>
);

const HealthWellbeingSection: React.FC = () => {
  const nutritionExercise = [
    { title: toPersianDigits("الگوریتم‌های شخصی‌سازی شده"), description: toPersianDigits("هوش مصنوعی از الگوریتم‌های ML با در نظر گرفتن داده‌های بیومتریک (سن، جنسیت، وزن، BMI)، اهداف سلامتی (کاهش وزن، افزایش عضله)، ترجیحات/آلرژی‌های غذایی، تاریخچه فعالیت استفاده می‌کند.") },
    { title: toPersianDigits("خروجی‌های پویا"), description: toPersianDigits("برنامه‌های غذایی شخصی‌سازی شده، پیشنهادات دستور پخت، لیست‌های خرید هوشمند و برنامه‌های تمرینی تطبیقی (قدرتی، کاردیو، یوگا) با تنظیمات شدت بر اساس پیشرفت تولید می‌کند.") },
  ];

  const aiVisionHealth = [
    { title: toPersianDigits("تشخیص غذا (مفهومی)"), description: toPersianDigits("CNN/تشخیص اشیا (مثلاً YOLO) روی عکس‌های غذا برای شناسایی اقلام، تخمین وعده‌ها و ثبت مقادیر غذایی. نیاز به اجازه دوربین دارد.") },
    { title: toPersianDigits("تحلیل فرم حرکت (مفهومی)"), description: toPersianDigits("تخمین حالت (مثلاً MediaPipe Pose) برای بازخورد بلادرنگ در مورد فرم ورزش. نیاز به اجازه دوربین دارد.") },
    { title: toPersianDigits("نکته محدودیت‌ها"), description: toPersianDigits("هوش مصنوعی تأکید می‌کند که یک ابزار پشتیبانی است؛ دقت به داده‌ها/شرایط بستگی دارد. تأیید متخصص برای ارزیابی‌های حیاتی کلیدی است.") }
  ];
  
  const sentimentAnalysisStress = [
    { title: toPersianDigits("NLP پیشرفته روی دفترچه‌های خاطرات"), description: toPersianDigits("مدل‌های هوش مصنوعی ورودی‌های دفترچه خاطرات کاربر را برای تشخیص طیفی از احساسات، شناسایی محرک‌های استرس مکرر (رویدادها، افراد، موقعیت‌ها) و پیگیری روندهای خلقی در طول زمان تحلیل می‌کنند.") },
    { title: toPersianDigits("بینش‌های عملی"), description: toPersianDigits("الگوها و بینش‌های شناسایی شده می‌توانند پیشنهادات شخصی‌سازی شده مانند تمرینات ذهن‌آگاهی هدایت‌شده، تکنیک‌های تنفس یا پرامپت‌های مرتبط دفترچه خاطرات برای تأمل عمیق‌تر را فعال کنند.") }
  ];
  
  const symptomChecker = [
    { title: toPersianDigits("چت‌بات تعاملی"), description: toPersianDigits("چت‌بات مبتنی بر دانش با کاربران در گفتگوهای تعاملی برای پرس‌وجوی سیستماتیک علائم درگیر می‌شود.") },
    { title: toPersianDigits("تریاژ هوشمند"), description: toPersianDigits("ورودی کاربر را با یک پایگاه دانش پزشکی گسترده مقایسه می‌کند تا پیشنهادات اولیه (مثلاً 'با پزشک مشورت کنید'، 'استراحت کنید') ارائه دهد و سطح فوریت برای مراجعه به پزشک را تخمین بزند.") },
    { title: toPersianDigits("سلب مسئولیت حیاتی"), description: toPersianDigits("هوش مصنوعی همیشه به وضوح بیان می‌کند که بررسی‌کننده علائم فقط برای اهداف اطلاعاتی است و جایگزین مشاوره، تشخیص یا درمان پزشکی حرفه‌ای نیست.") }
  ];

  return (
    <section id="health-wellbeing" className="py-20 md:py-28 bg-slate-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
           <div className="inline-block p-3 bg-sky-500/10 rounded-full mb-4">
            <HeartPulseIcon className="w-12 h-12 text-sky-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-5">
            {toPersianDigits("فاز ۴.۱: مدیریت جامع سلامت و تندرستی")}
          </h2>
          <div className="section-title-underline"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-8">
            {toPersianDigits("توسعه شبیه‌سازی شده قابلیت‌های پیشرفته هوش مصنوعی برای تغذیه شخصی‌سازی شده، تناسب اندام، سلامت روان و بینش‌های سوابق پزشکی.")}
          </p>
        </div>

        <div className="space-y-12">
          <SectionBlockHealth title={toPersianDigits("برنامه‌ریزی فوق شخصی‌سازی شده تغذیه و ورزش")}>
            <ul className="space-y-4">
              {nutritionExercise.map((item, index) => (
                <InfoListItemHealth key={index} title={item.title}>{item.description}</InfoListItemHealth>
              ))}
            </ul>
            <p className="text-sm text-gray-500 mt-4 italic">*{toPersianDigits("هوش مصنوعی کد پایتون برای الگوریتم‌های ML و UI (React) برای برنامه‌ها و پیشنهادات تولید می‌کند.")}*</p>
          </SectionBlockHealth>

          <SectionBlockHealth title={toPersianDigits("بینایی هوش مصنوعی برای سلامت (مفهومی - در صورت پیاده‌سازی)")}>
            <ul className="space-y-4">
              {aiVisionHealth.map((item, index) => (
                <InfoListItemHealth key={index} title={item.title}>{item.description}</InfoListItemHealth>
              ))}
            </ul>
             <p className="text-sm text-gray-500 mt-4 italic">*{toPersianDigits("نیاز به اجازه دوربین دارد. هوش مصنوعی کد اولیه پایتون برای مدل‌های CNN/تخمین حالت و منطق ادغام تولید می‌کند.")}*</p>
          </SectionBlockHealth>

          <SectionBlockHealth title={toPersianDigits("تحلیل احساسات پیشرفته و شناسایی محرک‌های استرس")}>
            <ul className="space-y-4">
              {sentimentAnalysisStress.map((item, index) => (
                <InfoListItemHealth key={index} title={item.title}>{item.description}</InfoListItemHealth>
              ))}
            </ul>
            <p className="text-sm text-gray-500 mt-4 italic">*{toPersianDigits("هوش مصنوعی از مدل‌های NLP (مثلاً BERT تنظیم دقیق شده) روی ورودی‌های دفترچه خاطرات استفاده می‌کند و کد برای تحلیل و پیوند پیشنهاد تولید می‌کند.")}*</p>
          </SectionBlockHealth>
          
          <SectionBlockHealth title={toPersianDigits("چت‌بات پیشرفته بررسی‌کننده علائم و تریاژ هوشمند")}>
            <ul className="space-y-4">
              {symptomChecker.map((item, index) => (
                <InfoListItemHealth key={index} title={item.title}>{item.description}</InfoListItemHealth>
              ))}
            </ul>
            <p className="text-sm text-gray-500 mt-4 italic">*{toPersianDigits("هوش مصنوعی جریان‌های گفتگوی چت‌بات، منطق ادغام پایگاه دانش و اجزای UI (React) تولید می‌کند.")}*</p>
          </SectionBlockHealth>
        </div>
        
        <p className="text-sm text-gray-400 mt-12 text-center">
          {toPersianDigits("خروجی‌های شبیه‌سازی شده: ماژول‌های مفهومی برای تغذیه هوشمند (الگوریتم‌ها، کد UI)، فعالیت بدنی و تناسب اندام (الگوریتم‌ها، UI، قطعه کدهای بینایی هوش مصنوعی در صورت پیگیری)، سلامت روان (تحلیل احساسات، UI دفترچه خاطرات)، و یک ماژول سوابق پزشکی شخصی (مدیریت داده، UI). هوش مصنوعی در تولید الگوریتم‌های ML، منطق چت‌بات، اجزای UI کمک می‌کند و ملاحظات اخلاقی و سلب مسئولیت‌ها برای ویژگی‌های مرتبط با سلامت را تضمین می‌کند.")}
        </p>
      </div>
    </section>
  );
};

export default HealthWellbeingSection;
