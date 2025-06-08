
import React from 'react';
import { toPersianDigits } from '@/utils';
import { ChartPieIcon } from '@/shared/AppIcons'; 

const InfoListItemML: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className="text-gray-300 text-sm leading-relaxed" }) => (
  <li className={`list-disc list-inside mr-4 ${className}`}>{children}</li> // Adjusted for RTL
);

const MLEngineSection: React.FC = () => {
  const mlAlgorithms = {
    recommender: toPersianDigits("رویکرد ترکیبی (فیلترینگ مشترک + مبتنی بر محتوا + مبتنی بر دانش) برای پیشنهاد وظایف مرتبط، منابع یادگیری، عادات و حتی ارتباطات درون جامعه کاربری (در صورت وجود)."),
    clustering: toPersianDigits("K-Means، DBSCAN یا خوشه‌بندی سلسله مراتبی برای شناسایی کهن‌الگوهای کاربر (مثلاً «بهینه‌ساز صبحگاهی»، «خلاق شبانه»، «یادگیرنده ثابت‌قدم») یا الگوهای رفتاری رایج."),
    classification: toPersianDigits("جنگل‌های تصادفی، ماشین‌های تقویت گرادیان یا شبکه‌های عصبی برای پیش‌بینی نتایجی مانند احتمال تکمیل وظیفه، خطر اهمال‌کاری، احتمال پایبندی به عادت یا شناسایی رفتار غیرعادی."),
    forecasting: toPersianDigits("ARIMA، Prophet یا LSTM برای پیش‌بینی روندهای آینده در فعالیت کاربر، سطح تمرکز، الگوهای انرژی یا پیشرفت به سمت اهداف بلندمدت.")
  };

  const featureEngineeringExamples = [
    toPersianDigits("مهندسی ویژگی خودکار مبتنی بر هوش مصنوعی (مثلاً با استفاده از کتابخانه‌هایی مانند Featuretools) از داده‌های خام کاربر: زمان/انواع تکمیل وظیفه، لاگ‌های عادت، توالی‌های تعامل با برنامه، پیشرفت هدف، داده‌های تقویم (با رضایت)، احساسات از ورودی‌های دفترچه خاطرات."),
    toPersianDigits("مثال‌ها: 'میانگین_مدت_وظیفه_روز_کاری_صبح'، 'امتیاز_پایداری_عادت_۷_روز_گذشته'، 'فرکانس_استفاده_از_ویژگی_برنامه'، 'روند_احساسات_هفتگی'، 'سرعت_پیشرفت_هدف'.")
  ];
  
  const mlPipeline = {
    description: toPersianDigits("دریافت داده (بلادرنگ و دسته‌ای از ماژول‌های پلتفرم) -> اعتبارسنجی و پاکسازی داده -> پیش‌پردازش و مهندسی ویژگی -> آموزش، تنظیم و اعتبارسنجی مدل (با ادغام MLOps برای نسخه‌بندی و CI/CD) -> استقرار مدل (به عنوان نقاط پایانی API مقیاس‌پذیر) -> استنتاج بلادرنگ و پیش‌بینی‌های دسته‌ای."),
    apiExamples: [
      toPersianDigits("`POST /api/ml/recommendations`: بدنه `{\"user_id\": \"...\", \"context\": \"dashboard_load\", \"current_task_id\": \"...\", \"limit\": 5}`. وظایف، عادات یا منابع یادگیری پیشنهادی بعدی را برمی‌گرداند."),
      toPersianDigits("`GET /api/ml/insights/user/{user_id}/patterns`: بینش‌های شخصی‌سازی شده مانند «شما تمایل دارید وظایف خلاقانه را ۲۰٪ سریعتر در اواخر بعد از ظهر تکمیل کنید.» را برمی‌گرداند."),
      toPersianDigits("`GET /api/ml/predict/procrastination_risk?user_id=...&task_id=...`: یک امتیاز ریسک را برمی‌گرداند.")
    ]
  };

  const initialInsights = [
    toPersianDigits("کاربرانی که ۳-۵ وظیفه کلیدی روزانه تنظیم می‌کنند، ۴۰٪ نرخ تکمیل بالاتری نسبت به کسانی که ۱۰+ وظیفه دارند، دارند."),
    toPersianDigits("یک روال صبحگاهی ثابت (ثبت شده به عنوان عادت) با ۱۵٪ افزایش در سطح انرژی روزانه گزارش شده همبستگی دارد."),
    toPersianDigits("تعامل با ماژول‌های «یادگیری» پس از ۳ ماه، همبستگی مثبتی با نرخ «دستیابی به هدف» نشان می‌دهد.")
  ];

  return (
    <section id="ml-engine-design" className="py-20 md:py-28 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-sky-500/10 rounded-full mb-4">
            <ChartPieIcon className="w-12 h-12 text-sky-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-5">
            {toPersianDigits("فاز ۲.۳: طراحی موتور ML و تحلیل داده")}
          </h2>
          <div className="section-title-underline"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-8">
            {toPersianDigits("طراحی شبیه‌سازی شده با کمک هوش مصنوعی برای موتور یادگیری ماشین و تحلیل داده، که شخصی‌سازی عمیق و بینش‌های پیش‌بینی‌کننده را در LifeOrchestrator AI قدرت می‌بخشد.")}
          </p>
        </div>

        <div className="bg-slate-800 p-8 rounded-xl shadow-xl border border-slate-700 mb-12">
          <h3 className="text-xl md:text-2xl font-semibold text-sky-300 mb-6">{toPersianDigits("الگوریتم‌ها و رویکردهای ML پیشنهادی هوش مصنوعی")}</h3>
          <div className="space-y-5">
            <div>
              <h4 className="text-lg font-semibold text-sky-400 mb-1">{toPersianDigits("سیستم‌های توصیه‌گر:")}</h4>
              <p className="text-gray-300 text-md leading-relaxed">{mlAlgorithms.recommender}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-sky-400 mb-1">{toPersianDigits("خوشه‌بندی:")}</h4>
              <p className="text-gray-300 text-md leading-relaxed">{mlAlgorithms.clustering}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-sky-400 mb-1">{toPersianDigits("طبقه‌بندی:")}</h4>
              <p className="text-gray-300 text-md leading-relaxed">{mlAlgorithms.classification}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-sky-400 mb-1">{toPersianDigits("پیش‌بینی سری‌های زمانی:")}</h4>
              <p className="text-gray-300 text-md leading-relaxed">{mlAlgorithms.forecasting}</p>
            </div>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-10 mb-12">
            <div className="bg-slate-800 p-8 rounded-xl shadow-xl border border-slate-700">
                <h3 className="text-xl md:text-2xl font-semibold text-sky-300 mb-5">{toPersianDigits("استراتژی مهندسی ویژگی")}</h3>
                <ul className="space-y-3">
                {featureEngineeringExamples.map((item, index) => (
                    <InfoListItemML key={index}>{item}</InfoListItemML>
                ))}
                </ul>
            </div>
            <div className="bg-slate-800 p-8 rounded-xl shadow-xl border border-slate-700">
                <h3 className="text-xl md:text-2xl font-semibold text-sky-300 mb-5">{toPersianDigits("بینش‌های اولیه از داده‌های تاریخی (شبیه‌سازی شده)")}</h3>
                <ul className="space-y-3">
                {initialInsights.map((item, index) => (
                    <InfoListItemML key={index}>{item}</InfoListItemML>
                ))}
                </ul>
            </div>
        </div>

        <div className="bg-slate-800 p-8 rounded-xl shadow-xl border border-slate-700 mb-12">
          <h3 className="text-xl md:text-2xl font-semibold text-sky-300 mb-6 text-center">{toPersianDigits("خط لوله ML و مفهوم API")}</h3>
          <p className="text-gray-300 text-md mb-6 text-center leading-relaxed">{mlPipeline.description}</p>
          <div>
            <h4 className="text-lg font-semibold text-sky-400 mb-4 text-center">{toPersianDigits("مثال‌های نقطه پایانی API شبیه‌سازی شده:")}</h4>
            <ul className="space-y-4">
              {mlPipeline.apiExamples.map((api, index) => (
                 <li key={index} className="text-gray-300 text-md font-mono bg-slate-900 p-4 rounded-lg border border-slate-700 text-left" dir="ltr">{api}</li>
              ))}
            </ul>
            <p className="text-sm text-gray-500 mt-6 italic text-center">*{toPersianDigits("APIهای واقعی نسخه‌بندی شده، با OAuth 2.0/JWT امن شده و به طور کامل مستند (OpenAPI/Swagger) خواهند بود. شیوه‌های MLOps (مثلاً با استفاده از Kubeflow، MLflow) چرخه عمر مدل را مدیریت می‌کنند.")}*</p>
          </div>
        </div>
        
        <p className="text-sm text-gray-400 mt-10 text-center">
          {toPersianDigits("خروجی‌های شبیه‌سازی شده: کد منبع مفهومی موتور ML (پایتون، با استفاده از چارچوب‌هایی مانند scikit-learn، TensorFlow، PyTorch، XGBoost)، اسکریپت‌های استقرار MLOps، مدل‌های آموزش‌دیده و نسخه‌بندی شده، مشخصات دقیق API و یک گزارش اولیه در مورد بینش‌های به‌دست‌آمده از داده‌های تاریخی کاربر (شبیه‌سازی شده). هوش مصنوعی در انتخاب الگوریتم، مهندسی ویژگی، تولید کد برای خطوط لوله و تنظیم هایپرپارامتر کمک می‌کند.")}
        </p>
      </div>
    </section>
  );
};

export default MLEngineSection;
