
import React from 'react';
import { toPersianDigits } from '@/utils'; 
import { CubeTransparentIcon } from '../shared/AppIcons'; 

interface ListItemProps {
  title: string;
  items: string[];
  itemClassName?: string;
}

const InfoList: React.FC<ListItemProps> = ({ title, items, itemClassName = "text-gray-300 text-sm leading-relaxed" }) => (
  <div className="bg-slate-800 p-6 rounded-xl shadow-md border border-slate-700">
    <h4 className="text-lg font-semibold text-sky-400 mb-3">{title}</h4>
    <ul className="list-disc list-inside space-y-2 pr-4"> {/* Adjusted for RTL */}
      {items.map((item, index) => (
        <li key={index} className={itemClassName}>{item}</li>
      ))}
    </ul>
  </div>
);

const SystemArchitectureSection: React.FC = () => {
  const proposedPattern = {
    name: toPersianDigits("میکروسرویس‌های ترکیبی با توابع بدون سرور و هاب مرکزی هوش مصنوعی"),
    rationale: toPersianDigits("به دلیل تعادل در مقیاس‌پذیری، استقلال ماژول برای ویژگی‌های متنوع، قابلیت نگهداری و توانایی مدیریت کارآمد وظایف محاسباتی سنگین هوش مصنوعی انتخاب شده است. امکان ترکیب سرویس‌های طولانی‌مدت با توابع بدون سرور مبتنی بر رویداد برای مقرون‌به‌صرفه بودن و پاسخگویی را فراهم می‌کند.")
  };

  const highLevelComponents = [
    { title: toPersianDigits("لایه کلاینت"), items: [toPersianDigits("اپلیکیشن وب (React، PWA)"), toPersianDigits("اپلیکیشن‌های موبایل (آینده - React Native یا Flutter)")] },
    { title: toPersianDigits("API Gateway"), items: [toPersianDigits("نقطه ورود واحد برای درخواست‌های کلاینت"), toPersianDigits("مدیریت احراز هویت، محدودیت نرخ، مسیریابی درخواست به سرویس‌های بک‌اند (مثلاً AWS API Gateway، Nginx، Kong)")] },
    { title: toPersianDigits("سرویس‌های بک‌اند (میکروسرویس‌ها)"), items: [toPersianDigits("مدیریت کاربران"), toPersianDigits("ارکستراسیون اهداف و وظایف"), toPersianDigits("مهندسی عادت"), toPersianDigits("ماژول سلامت و تندرستی"), toPersianDigits("ماژول یادگیری و مهارت‌ها"), toPersianDigits("سرویس اعلان‌ها"), toPersianDigits("(ساخته شده با Python/FastAPI یا Node.js/Express، کانتینرسازی شده)")] },
    { title: toPersianDigits("هاب مرکزی هوش مصنوعی"), items: [toPersianDigits("سرویس پردازش زبان طبیعی (NLU/NLG)"), toPersianDigits("موتور شخصی‌سازی و توصیه‌گر"), toPersianDigits("ماژول آگاهی زمینه‌ای"), toPersianDigits("سرویس تحلیل‌ها و بینش‌های هوش مصنوعی"), toPersianDigits("(سرویس‌های تخصصی، احتمالاً مبتنی بر Python، مستقر شده به عنوان کانتینر یا توابع بدون سرور)")] },
    { title: toPersianDigits("لایه داده"), items: [toPersianDigits("پایگاه داده رابطه‌ای اصلی (PostgreSQL): داده‌های ساختاریافته، موجودیت‌های اصلی"), toPersianDigits("پایگاه داده سندی (MongoDB): پروفایل‌های کاربری انعطاف‌پذیر، خروجی‌های مدل هوش مصنوعی، لاگ‌ها"), toPersianDigits("پایگاه داده برداری (مثلاً Pinecone، Weaviate): جستجوی معنایی، جاسازی‌های هوش مصنوعی"), toPersianDigits("لایه کش (Redis): بهینه‌سازی عملکرد")] },
    { title: toPersianDigits("لایه ارتباطی"), items: [toPersianDigits("REST/GraphQL: تعاملات کلاینت-API"), toPersianDigits("gRPC: ارتباطات داخلی سرویس به سرویس (کارایی)"), toPersianDigits("صف پیام (RabbitMQ/Kafka): وظایف ناهمزمان، رویدادهای بین سرویسی")] },
    { title: toPersianDigits("پلتفرم ابری (نمایشی)"), items: [toPersianDigits("AWS: API Gateway, Lambda, ECS/EKS, S3, RDS, SageMaker, DynamoDB, ElastiCache")] }
  ];
  
  const techStack = [
    { category: toPersianDigits("فرانت‌اند"), tools: [toPersianDigits("React (با TypeScript)"), toPersianDigits("Tailwind CSS"), toPersianDigits("قابلیت‌های PWA")] },
    { category: toPersianDigits("بک‌اند و API Gateway"), tools: [toPersianDigits("Python (FastAPI)"), toPersianDigits("Node.js (Express.js برای API Gateway)"), toPersianDigits("کانتینرسازی (Docker)")] },
    { category: toPersianDigits("هوش مصنوعی/یادگیری ماشین"), tools: [toPersianDigits("Python"), toPersianDigits("TensorFlow/PyTorch"), toPersianDigits("Hugging Face Transformers"), toPersianDigits("spaCy"), toPersianDigits("Scikit-learn"), toPersianDigits("سرویس‌دهی مدل هوش مصنوعی تخصصی (مثلاً NVIDIA Triton، Seldon Core)")] },
    { category: toPersianDigits("پایگاه‌های داده"), tools: [toPersianDigits("PostgreSQL (رابطه‌ای)"), toPersianDigits("MongoDB (NoSQL)"), toPersianDigits("Redis (کش)"), toPersianDigits("پایگاه داده برداری اختصاصی (مثلاً Pinecone، Milvus)")] },
    { category: toPersianDigits("ابر و DevOps"), tools: [toPersianDigits("AWS (نمایشی: EC2، S3، RDS، Lambda، API Gateway، EKS/ECS، SageMaker)"), toPersianDigits("Kubernetes (برای ارکستراسیون میکروسرویس‌ها)"), toPersianDigits("CI/CD (مثلاً Jenkins، GitLab CI، GitHub Actions)")] },
    { category: toPersianDigits("ارتباطات"), tools: [toPersianDigits("RESTful APIs"), toPersianDigits("GraphQL (برای کوئری‌های انعطاف‌پذیر کلاینت)"), toPersianDigits("gRPC (برای سرویس‌های داخلی)"), toPersianDigits("صف‌های پیام (مثلاً RabbitMQ، Kafka)")] }
  ];

  const apiStrategy = [
    toPersianDigits("عمدتاً RESTful APIs برای ارتباطات خارجی کلاینت-سرور."),
    toPersianDigits("نقاط پایانی GraphQL برای نیازهای خاص کلاینت که نیازمند واکشی داده انعطاف‌پذیر هستند."),
    toPersianDigits("gRPC برای ارتباطات میکروسرویس داخلی با عملکرد بالا و تأخیر کم."),
    toPersianDigits("مستندات جامع API با استفاده از مشخصات OpenAPI (Swagger)."),
    toPersianDigits("مکانیزم‌های احراز هویت (OAuth 2.0 / JWT) و مجوزدهی قوی.")
  ];

  const risksAndMitigations = [
    { risk: toPersianDigits("مقیاس‌پذیری و عملکرد موتور هوش مصنوعی"), mitigation: toPersianDigits("مقیاس‌پذیری افقی میکروسرویس‌های هوش مصنوعی، پردازش ناهمزمان برای وظایف طولانی‌مدت هوش مصنوعی، سرویس‌دهی بهینه مدل.") },
    { risk: toPersianDigits("امنیت و حریم خصوصی داده‌ها (به ویژه با هوش مصنوعی)"), mitigation: toPersianDigits("رمزنگاری سرتاسری، ناشناس‌سازی/نام مستعار داده‌ها برای آموزش هوش مصنوعی در صورت امکان، کنترل‌های دسترسی دقیق (IAM)، ممیزی‌های امنیتی منظم، انطباق با GDPR/CCPA.") },
    { risk: toPersianDigits("پیچیدگی و مدیریت میکروسرویس‌ها"), mitigation: toPersianDigits("پایپ‌لاین‌های CI/CD قوی، مکانیزم‌های کشف سرویس، لاگ‌گیری و نظارت متمرکز (مثلاً ELK stack، Prometheus/Grafana)، استفاده بالقوه از سرویس مش (مثلاً Istio).") },
    { risk: toPersianDigits("سازگاری داده‌ها در سراسر میکروسرویس‌ها"), mitigation: toPersianDigits("الگوهای سازگاری نهایی (مثلاً الگوی Saga)، استفاده از صف‌های پیام برای تحویل قابل اعتماد رویداد، طراحی دقیق قرارداد API.") },
    { risk: toPersianDigits("وابستگی به فناوری (خاص ابر)"), mitigation: toPersianDigits("استفاده از فناوری‌های مستقل از ابر در صورت امکان (مثلاً Kubernetes)، طراحی برای قابلیت حمل، انتزاع سرویس‌های خاص ابر.") }
  ];

  return (
    <section id="architecture-design" className="py-20 md:py-28 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-sky-500/10 rounded-full mb-4">
             <CubeTransparentIcon className="w-12 h-12 text-sky-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-5">
            {toPersianDigits("فاز ۱.۴: طراحی معماری سیستم")}
          </h2>
           <div className="section-title-underline"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-8">
            {toPersianDigits("طراحی شبیه‌سازی شده با کمک هوش مصنوعی از ساختار کلی سیستم، انتخاب‌های فناوری و تعاملات اجزا برای LifeOrchestrator AI.")}
          </p>
        </div>

        <div className="mb-12 bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-700">
          <h3 className="text-2xl md:text-3xl font-semibold text-sky-300 mb-4">{toPersianDigits("الگوی معماری پیشنهادی")}</h3>
          <p className="text-sky-400 font-medium text-lg mb-3">{proposedPattern.name}</p>
          <p className="text-gray-300 text-md leading-relaxed">{proposedPattern.rationale}</p>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-semibold text-sky-300 mb-8 text-center">{toPersianDigits("نمای کلی اجزای سطح بالا")}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {highLevelComponents.map((component, index) => (
              <InfoList key={index} title={component.title} items={component.items} />
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-semibold text-sky-300 mb-8 text-center">{toPersianDigits("انتخاب‌های کلیدی پشته فناوری (شبیه‌سازی شده)")}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             {techStack.map((stackItem, index) => (
              <div key={index} className="bg-slate-800 p-6 rounded-xl shadow-md border border-slate-700">
                <h4 className="text-lg font-semibold text-sky-400 mb-3">{stackItem.category}</h4>
                <ul className="list-disc list-inside space-y-2 pr-4"> {/* Adjusted for RTL */}
                  {stackItem.tools.map((tool, tIndex)=>(
                     <li key={tIndex} className="text-gray-300 text-sm leading-relaxed">{tool}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-16 bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-700">
          <h3 className="text-2xl md:text-3xl font-semibold text-sky-300 mb-4">{toPersianDigits("استراتژی طراحی API")}</h3>
          <ul className="list-disc list-inside space-y-3 pr-5"> {/* Adjusted for RTL */}
            {apiStrategy.map((item, index) => (
              <li key={index} className="text-gray-300 text-md leading-relaxed">{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-2xl md:text-3xl font-semibold text-sky-300 mb-8 text-center">{toPersianDigits("تحلیل ریسک معماری و کاهش‌ها (شبیه‌سازی شده)")}</h3>
          <div className="space-y-6">
            {risksAndMitigations.map((item, index) => (
              <div key={index} className="bg-slate-800 p-6 rounded-xl shadow-md border border-slate-700">
                <h4 className="text-lg font-semibold text-sky-400 mb-2">{toPersianDigits("ریسک:")} <span className="text-gray-200 font-normal">{item.risk}</span></h4>
                <p className="text-md text-gray-300 leading-relaxed"><strong className="text-sky-500">{toPersianDigits("کاهش:")}</strong> {item.mitigation}</p>
              </div>
            ))}
          </div>
           <p className="text-sm text-gray-500 mt-10 text-center">
            *{toPersianDigits("یک تحلیل کامل مبتنی بر هوش مصنوعی شامل FMEA، شبیه‌سازی‌های عملکرد (نظریه صف) و تست امنیتی خودکار (SAST/DAST) برای ارائه ارزیابی‌های کمی دقیق ریسک و پیشنهادات بهبود سفارشی خواهد بود.")}*
          </p>
        </div>

      </div>
    </section>
  );
};

export default SystemArchitectureSection;