
import React, { useState, useEffect } from 'react';
import { toPersianDigits } from '../../utils';
import { 
    ServerStackIcon, 
    CogIcon, 
    ShieldCheckIcon, 
    BoltIcon, 
    CubeTransparentIcon,
    CheckCircleIcon,      
    ExclamationTriangleIcon, 
    XCircleIcon,
    InformationCircleIcon,
    KeyIcon, 
    LockClosedIcon, 
    EyeIcon, 
    LinkIcon, 
    DevicePhoneMobileIcon, 
    ArrowRightIcon, 
    BookIcon, 
    AdjustmentsVerticalIcon, 
    ScaleIcon,
    ChartBarIcon, 
    ClockIcon,    
    ArrowsPointingOutIcon, 
    DatabaseIcon, 
    ArchiveBoxIcon, 
    UsersIcon, 
    ShieldExclamationIcon,
    BellIcon, 
    WifiIcon,
    MapPinIcon,
    CloudIcon,
    CreditCardIcon,
    SparklesIconNav as AiIcon, 
    TrendingUpIcon,
    PlayCircleIcon, 
    AcademicCapIcon,
    MapIcon, 
    ChatBubbleOvalLeftEllipsisIcon, 
    UserGroupIcon 
} from '../shared/AppIcons';
import { PageName } from '../../App'; 
import CollapsibleSection from '../shared/CollapsibleSection';


interface InfrastructurePageProps {
  userName: string;
  navigateTo?: (pageName: PageName | string, params?: any) => void; 
}

interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  titleColorClass?: string;
  footerLink?: { text: string; href?: string; onClick?: () => void };
}

const InfoCard: React.FC<InfoCardProps> = ({ title, icon, children, className, titleColorClass = "text-sky-700", footerLink }) => (
  <div className={`bg-white p-4 rounded-lg shadow-sm border border-gray-200/80 hover:shadow-md transition-shadow h-full flex flex-col ${className}`}>
    <div className="flex items-center mb-2">
      <div className="p-1.5 bg-sky-100 text-sky-600 rounded-full mr-2 rtl:ml-2 rtl:mr-0">
        {icon}
      </div>
      <h3 className={`text-md font-semibold ${titleColorClass}`}>{toPersianDigits(title)}</h3>
    </div>
    <div className="text-xs text-gray-600 leading-relaxed flex-grow">{children}</div>
    {footerLink && (
        <div className="mt-auto pt-2 border-t border-gray-100">
            {footerLink.href ? (
                 <a href={footerLink.href} className="text-xs text-sky-600 hover:underline flex items-center">
                    {toPersianDigits(footerLink.text)}
                    <ArrowRightIcon className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0 transform scale-x-[-1]" />
                </a>
            ) : footerLink.onClick ? (
                 <button onClick={footerLink.onClick} className="text-xs text-sky-600 hover:underline flex items-center">
                    {toPersianDigits(footerLink.text)}
                    <ArrowRightIcon className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0 transform scale-x-[-1]" />
                </button>
            ) : null}
        </div>
    )}
  </div>
);

const QuickLinkButton: React.FC<{ href?: string; onClick?: () => void; icon: React.ReactNode; text: string; className?: string }> = ({ href, onClick, icon, text, className ="" }) => {
    const commonClasses = "flex flex-col items-center justify-center p-4 bg-sky-500 hover:bg-sky-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm w-full";
    const content = (
        <>
            {React.cloneElement(icon as React.ReactElement<{className?: string}>, { className: "w-8 h-8 mb-2" })}
            <span>{toPersianDigits(text)}</span>
        </>
    );
    if (href) { return ( <a href={href} className={`${commonClasses} ${className}`}>{content}</a> ); }
    return ( <button onClick={onClick} className={`${commonClasses} ${className}`}>{content}</button> );
};

// Types for System Status Dashboard
interface PlatformStatus { message: string; color: 'green' | 'yellow' | 'red'; lastUpdated: string; }
interface CoreService { id: string; name: string; status: 'online' | 'minor_issue' | 'offline'; }
interface MaintenanceNotice { id: string; title: string; dateTime: string; duration: string; impact: string; isImportant: boolean; }
interface SecurityCheckItem { id: string; title: string; status: 'good' | 'needs_attention' | 'critical' | 'info'; recommendation: string; icon: React.ReactElement; action?: { text: string; onClick: () => void; };}

interface ThirdPartyServiceIntegration {
  id: string;
  name: string;
  logoIcon: React.ReactElement;
  description: string; 
  dataShared: string; 
  privacyPolicyUrl: string;
  isOptional: boolean;
  isEnabled: boolean;
  category: 'مکان‌یابی' | 'آب و هوا' | 'پرداخت' | 'مالی' | 'سایر';
}

interface ProactiveAlert {
    id: string;
    type: 'security' | 'performance';
    title: string;
    message: string;
    timestamp: string; // ISO string
    actionText?: string;
    onAction?: () => void;
    severity: 'critical' | 'warning' | 'info';
    icon?: React.ReactElement;
}
type DataSyncFrequency = 'realtime' | 'every_15_min' | 'hourly' | 'daily';

// Mock data for Phase 1 sections
const platformStatusInit: PlatformStatus = { message: "تمام سیستم‌ها در وضعیت عملیاتی", color: "green", lastUpdated: new Date().toLocaleString('fa-IR'), };
const coreServicesInit: CoreService[] = [ { id: 'ai_assistant', name: "دستیار هوش مصنوعی", status: 'online' }, { id: 'data_storage', name: "ذخیره‌سازی داده‌ها", status: 'online' }, { id: 'notifications', name: "سرویس اعلان‌ها", status: 'online' }, { id: 'search_service', name: "سرویس جستجو", status: 'minor_issue' }, ];
const maintenanceNoticesInit: MaintenanceNotice[] = [ { id: 'maint1', title: "بروزرسانی برنامه‌ریزی شده پایگاه داده", dateTime: "شنبه، ۲۳ تیر ۱۴۰۳، ساعت ۲ بامداد", duration: "تقریباً ۱ ساعت", impact: "ممکن است در این بازه زمانی، دسترسی به برخی اطلاعات با کندی مواجه شود. پیشاپیش از صبر شما متشکریم.", isImportant: true }, { id: 'maint2', title: "بهبود عملکرد سرورهای پیشنهاددهنده", dateTime: "سه‌شنبه، ۲ مرداد ۱۴۰۳، از ساعت ۱ الی ۴ بامداد", duration: "۳ ساعت", impact: "سرویس پیشنهادات هوشمند ممکن است در این مدت به طور موقت در دسترس نباشد.", isImportant: false }, ];
const securityCheckItemsInit: SecurityCheckItem[] = [
  { id: 'password_strength', title: "قدرت رمز عبور", status: 'good', recommendation: "رمز عبور شما قوی است. به طور دوره‌ای آن را تغییر دهید.", icon: <KeyIcon className="w-5 h-5 text-green-600" /> },
  { id: '2fa_status', title: "وضعیت فعال‌سازی 2FA", status: 'needs_attention', recommendation: "احراز هویت دو عاملی (2FA) امنیت حساب شما را به طور چشمگیری افزایش می‌دهد. فعال‌سازی آن به شدت توصیه می‌شود. (این قابلیت به زودی اضافه خواهد شد)", icon: <DevicePhoneMobileIcon className="w-5 h-5 text-yellow-600" />, action: { text: "اطلاعات بیشتر در مورد 2FA (به زودی)", onClick: () => alert(toPersianDigits("به زودی: فعال‌سازی 2FA")) } },
  { id: 'active_sessions', title: "جلسات فعال", status: 'good', recommendation: "در حال حاضر تنها این دستگاه در حساب شما فعال است. به طور مرتب لیست دستگاه‌های فعال را بررسی کنید.", icon: <UsersIcon className="w-5 h-5 text-green-600" /> },
  { id: 'app_permissions', title: "مجوزهای برنامه", status: 'info', recommendation: "مجوزهای دسترسی برنامه به دوربین، میکروفون و موقعیت مکانی را بررسی کنید.", icon: <InformationCircleIcon className="w-5 h-5 text-blue-600" />, action: {text: "بررسی مجوزها در داشبورد حریم خصوصی", onClick: () => {} /* navigateTo && navigateTo('Privacy', {scrollToSection: 'coreOsPermissionsSection'}) */} }
];
const thirdPartyServicesInit: ThirdPartyServiceIntegration[] = [
  { id: 'map_provider', name: "ارائه‌دهنده نقشه (مثلاً Map.ir)", logoIcon: <MapPinIcon className="w-6 h-6 text-green-600"/>, description: "برای نمایش نقشه و ارائه خدمات مبتنی بر موقعیت مکانی مانند نمایش مسیرها یا جستجوی اماکن.", dataShared: "موقعیت مکانی تقریبی یا دقیق شما (با اجازه)، جستجوهای مکانی شما.", privacyPolicyUrl: "#map-privacy", isOptional: false, isEnabled: true, category: 'مکان‌یابی' },
  { id: 'weather_api', name: "API آب و هوا (مثلاً OpenWeatherMap)", logoIcon: <CloudIcon className="w-6 h-6 text-blue-500"/>, description: "برای نمایش اطلاعات آب و هوای فعلی و پیش‌بینی‌ها، و ارائه پیشنهادات مرتبط با آب و هوا.", dataShared: "موقعیت مکانی شما (با اجازه) برای دریافت اطلاعات آب و هوای محلی.", privacyPolicyUrl: "#weather-privacy", isOptional: true, isEnabled: true, category: 'آب و هوا' },
  { id: 'payment_gateway', name: "درگاه پرداخت (مثلاً زرین‌پال)", logoIcon: <CreditCardIcon className="w-6 h-6 text-indigo-600"/>, description: "برای پردازش امن پرداخت‌های مربوط به اشتراک‌های پولی پلتفرم.", dataShared: "اطلاعات ضروری پرداخت (مانند مبلغ، شماره سفارش). اطلاعات حساس کارت شما مستقیماً توسط درگاه امن پردازش می‌شود.", privacyPolicyUrl: "#payment-privacy", isOptional: false, isEnabled: true, category: 'پرداخت' },
  { id: 'financial_aggregator', name: "تجمیع‌کننده داده‌های مالی (مفهومی)", logoIcon: <DatabaseIcon className="w-6 h-6 text-purple-600"/>, description: " (این ویژگی در آینده و با کسب مجوزهای لازم و اجازه صریح شما ممکن است اضافه شود) برای اتصال به حساب‌های بانکی شما و ارائه تحلیل‌های مالی یکپارچه.", dataShared: "داده‌های تراکنش‌های بانکی (فقط با اجازه و اتصال امن شما).", privacyPolicyUrl: "#financial-data-privacy", isOptional: true, isEnabled: false, category: 'مالی' },
];

const proactiveAlertsInit: ProactiveAlert[] = [
  { id: 'alert_sec_1', type: 'security', title: "تلاش مشکوک برای ورود", message: "AI یک تلاش مشکوک برای ورود به حساب شما از یک موقعیت مکانی جدید (تهران، ایران) در ساعت ۱۱:۲۵ شناسایی کرده است. آیا این شما بودید؟", timestamp: new Date().toISOString(), actionText: "بررسی فعالیت‌های اخیر", onAction: () => alert(toPersianDigits("نمایش فعالیت‌های اخیر حساب (شبیه‌سازی شده).")), severity: 'critical', icon: <ShieldExclamationIcon className="w-5 h-5 text-red-500"/> },
  { id: 'alert_sec_2', type: 'security', title: "نشت احتمالی رمز عبور", message: "رمز عبور شما در یک نشت اطلاعاتی شناخته‌شده (از سایر سرویس‌ها) یافت شده است. قویاً توصیه می‌کنیم فوراً آن را تغییر دهید و 2FA را فعال کنید.", timestamp: new Date(Date.now() - 3600000).toISOString(), actionText: "تغییر رمز عبور", onAction: () => alert(toPersianDigits("هدایت به صفحه تغییر رمز (شبیه‌سازی شده).")), severity: 'warning', icon: <ShieldExclamationIcon className="w-5 h-5 text-yellow-500"/> },
  { id: 'alert_perf_1', type: 'performance', title: "افزایش بار پیش‌بینی‌شده", message: "AI پیش‌بینی می‌کند که به دلیل کمپین بازاریابی جدید، بار روی قابلیت 'اهداف گروهی' در ساعت ۱۴:۰۰ امروز افزایش خواهد یافت. ممکن است در آن بازه زمانی با کمی تاخیر مواجه شوید. ما در حال بهینه‌سازی منابع هستیم.", timestamp: new Date(Date.now() - 7200000).toISOString(), severity: 'info', icon: <ServerStackIcon className="w-5 h-5 text-blue-500"/> },
];


const InfrastructurePage: React.FC<InfrastructurePageProps> = ({ userName, navigateTo }) => {
  const assistantDisplayName = toPersianDigits("دستیار فنی");
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    introduction: false, systemStatus: true, architecture: false, security: false, businessModel: false,
    performanceInsights: true, advancedSecurity: false, integrationTransparency: false, aiForStability: false,
    proactiveAlerts: true, advancedControls: false, sustainabilityJourney: false, aiWhatIf: false,
    communitySecurityCulture: false, finalOptimization: false,
  });

  // Initialize states with mock data
  const [platformStatus, setPlatformStatus] = useState<PlatformStatus>(platformStatusInit);
  const [coreServices, setCoreServices] = useState<CoreService[]>(coreServicesInit);
  const [maintenanceNotices, setMaintenanceNotices] = useState<MaintenanceNotice[]>(maintenanceNoticesInit);
  const [securityCheckItems, setSecurityCheckItems] = useState<SecurityCheckItem[]>(securityCheckItemsInit);
  const [thirdPartyServices, setThirdPartyServices] = useState<ThirdPartyServiceIntegration[]>(thirdPartyServicesInit);
  const [proactiveAlerts, setProactiveAlerts] = useState<ProactiveAlert[]>(proactiveAlertsInit);
  const [dataSyncFrequency, setDataSyncFrequency] = useState<DataSyncFrequency>('hourly');
  const [performanceLogs, setPerformanceLogs] = useState<string>(toPersianDigits("لاگ نمونه: پاسخ سرور سریع بود، بار CPU متوسط."));
  const [apiUsageStats, setApiUsageStats] = useState<string>(toPersianDigits("آمار API: ۱۲۰ درخواست موفق، ۲ درخواست ناموفق در ساعت گذشته."));
  const [aiWhatIfQuestion, setAiWhatIfQuestion] = useState<string>('');
  const [aiWhatIfAnswer, setAiWhatIfAnswer] = useState<string | null>(null);


  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };
  
  const handleToggleIntegration = (serviceId: string) => {
    setThirdPartyServices(prevServices =>
      prevServices.map(service =>
        service.id === serviceId ? { ...service, isEnabled: !service.isEnabled } : service
      )
    );
  };
  
  const getStatusIcon = (status: CoreService['status'] | SecurityCheckItem['status']) => {
    switch (status) {
      case 'online': case 'good': return <CheckCircleIcon className="w-4 h-4 text-green-500" />;
      case 'minor_issue': case 'needs_attention': return <ExclamationTriangleIcon className="w-4 h-4 text-yellow-500" />;
      case 'offline': case 'critical': return <XCircleIcon className="w-4 h-4 text-red-500" />;
      case 'info': return <InformationCircleIcon className="w-4 h-4 text-blue-500"/>;
      default: return null;
    }
  };
  const platformStatusColors = { green: 'bg-green-100 text-green-700 border-green-300', yellow: 'bg-yellow-100 text-yellow-700 border-yellow-300', red: 'bg-red-100 text-red-700 border-red-300', };
  const overallSecurityStatusText = () => {
    if (securityCheckItems.some(item => item.status === 'critical')) return toPersianDigits("نیاز به اقدام فوری");
    if (securityCheckItems.some(item => item.status === 'needs_attention')) return toPersianDigits("نیاز به توجه");
    return toPersianDigits("وضعیت مطلوب");
  };

  const AlertCardInternal: React.FC<{alert: ProactiveAlert}> = ({alert}) => {
    let bgColor = 'bg-blue-50 border-blue-200';
    let titleColor = 'text-blue-700';
    if (alert.severity === 'critical') { bgColor = 'bg-red-50 border-red-200'; titleColor = 'text-red-700'; }
    else if (alert.severity === 'warning') { bgColor = 'bg-yellow-50 border-yellow-200'; titleColor = 'text-yellow-700'; }

    return (
        <div className={`p-3 rounded-lg border ${bgColor} animate-fadeIn`}>
            <div className="flex items-start">
                <div className="p-1 bg-white rounded-full shadow-sm mr-2 rtl:ml-2 rtl:mr-0 flex-shrink-0">
                 {alert.icon || (alert.type === 'security' ? <ShieldExclamationIcon className={`w-5 h-5 ${alert.severity === 'critical' ? 'text-red-500' : alert.severity === 'warning' ? 'text-yellow-500' : 'text-sky-500'}`}/> : <ServerStackIcon className={`w-5 h-5 text-sky-500`}/>)}
                </div>
                <div className="flex-grow">
                    <h5 className={`text-sm font-semibold ${titleColor}`}>{toPersianDigits(alert.title)}</h5>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{toPersianDigits(alert.message)}</p>
                    <p className="text-[10px] text-gray-500 mt-1">{toPersianDigits(new Date(alert.timestamp).toLocaleString('fa-IR'))}</p>
                </div>
            </div>
            {alert.actionText && alert.onAction && (
                <div className="mt-2 text-right rtl:text-left">
                    <button onClick={alert.onAction} className={`text-xs py-1 px-2.5 rounded-md transition-colors ${
                        alert.severity === 'critical' ? 'bg-red-500 hover:bg-red-600 text-white' :
                        alert.severity === 'warning' ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-800' :
                        'bg-sky-500 hover:bg-sky-600 text-white'
                    }`}>
                        {toPersianDigits(alert.actionText)}
                    </button>
                </div>
            )}
        </div>
    );
  };
  
  const handleAIWhatIfSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if(!aiWhatIfQuestion.trim()) {
          setAiWhatIfAnswer(toPersianDigits("لطفا سوال خود را در مورد پایداری یا امنیت وارد کنید."));
          return;
      }
      setAiWhatIfAnswer(toPersianDigits(`هوش مصنوعی در حال بررسی سوال: "${aiWhatIfQuestion}" ... پاسخ به زودی (شبیه‌سازی شده).`));
      // Placeholder for actual AI call
  };


  return (
    <div className="page bg-infrastructure-page">
      <header className="text-center mb-8 p-6 bg-gradient-to-br from-slate-700 via-slate-800 to-gray-900 rounded-xl shadow-2xl text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="infraGrid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#38bdf8" strokeWidth="0.3"/></pattern></defs><rect width="100%" height="100%" fill="url(#infraGrid)" /></svg>
        </div>
        <div className="relative z-10">
            <ServerStackIcon className="w-16 h-16 text-sky-400 mx-auto mb-4" />
            <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-500 to-blue-500 mb-2">
            {toPersianDigits("بنیان استوار پلتفرم شما")}
            </h1>
            <p className="text-sm md:text-md text-sky-200 mb-3 max-w-2xl mx-auto">
            {toPersianDigits("نگاهی به زیرساخت، پایداری و امنیت در ارکستراسیون هوشمند زندگی.")}
            </p>
            <p className="text-xs text-gray-300 max-w-xl mx-auto">
              {toPersianDigits(`با کمک ${assistantDisplayName}، از نحوه عملکرد فنی پلتفرم، وضعیت لحظه‌ای سیستم و تعهد ما به امنیت داده‌هایتان مطلع شوید.`)}
            </p>
        </div>
      </header>
      
      <CollapsibleSection 
        title="هشدارهای فعال و پیش‌بینی‌کننده" 
        icon={<BellIcon className="w-6 h-6 text-sky-600"/>} 
        isOpen={openSections.proactiveAlerts} 
        onToggle={() => toggleSection('proactiveAlerts')}
        id="proactive-alerts-section"
        className="mb-8 p-6 bg-white rounded-xl shadow-lg border border-gray-200/80"
        titleClassName="text-xl font-semibold text-gray-800"
      >
        <p className="text-xs text-gray-600 mb-4 leading-relaxed p-2 bg-gray-50 rounded-md border border-gray-200">
            {toPersianDigits("دستیار هوشمند شما به طور مداوم وضعیت امنیتی حساب و عملکرد پلتفرم را زیر نظر دارد. در صورت شناسایی موارد مهم یا پیش‌بینی مشکلات احتمالی، هشدارهای لازم در این بخش به شما نمایش داده خواهد شد.")}
        </p>
        <div className="space-y-3">
            {proactiveAlerts.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">{toPersianDigits("در حال حاضر هشدار فعالی برای شما وجود ندارد.")}</p>
            ) : (
                proactiveAlerts.map(alert => <AlertCardInternal key={alert.id} alert={alert} />)
            )}
        </div>
         <p className="text-[10px] text-gray-500 mt-4 text-center italic">
            {toPersianDigits("هشدارهای قدیمی‌تر پس از مدتی به صورت خودکار آرشیو می‌شوند.")}
         </p>
      </CollapsibleSection>
      
      <CollapsibleSection 
        title="بینش‌های عمیق‌تر از عملکرد سیستم" 
        icon={<ChartBarIcon className="w-6 h-6 text-sky-600"/>} 
        isOpen={openSections.performanceInsights} 
        onToggle={() => toggleSection('performanceInsights')}
        id="system-performance-insights"
        className="mb-8 p-6 bg-white rounded-xl shadow-lg border border-gray-200/80"
        titleClassName="text-xl font-semibold text-gray-800"
      >
         <div className="mb-6">
            <h3 className="text-md font-semibold text-gray-700 mb-3">{toPersianDigits("معیارهای کلیدی عملکرد پلتفرم (ناشناس و تجمیعی)")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { title: "میانگین زمان پاسخ AI", value: "۰.۷۵ ثانیه", details: "هفته گذشته", icon: <BoltIcon className="w-5 h-5"/>, color: "teal"},
                    { title: "آپ‌تایم سرویس‌های اصلی", value: "۹۹.۹۸٪", details: "ماه گذشته", icon: <ServerStackIcon className="w-5 h-5"/>, color: "blue"},
                    { title: "ساعات اوج استفاده", value: "۱۱ صبح - ۳ عصر", details: "میانگین روزانه", icon: <ClockIcon className="w-5 h-5"/>, color: "purple"},
                ].map(kpi => (
                    <div key={kpi.title} className={`p-3 rounded-lg shadow border border-${kpi.color}-200 bg-${kpi.color}-50`}>
                        <div className="flex items-center mb-1 text-${kpi.color}-700">
                            {kpi.icon}
                            <span className="text-sm font-semibold mr-1.5 rtl:ml-1.5 rtl:mr-0">{toPersianDigits(kpi.title)}</span>
                        </div>
                        <p className={`text-lg font-bold text-${kpi.color}-600`}>{toPersianDigits(kpi.value)}</p>
                        <p className="text-xs text-gray-500">{toPersianDigits(kpi.details)}</p>
                    </div>
                ))}
            </div>
        </div>
         <div className="mb-6">
             <InfoCard title="چگونه پلتفرم ما برای رشد شما مقیاس‌پذیر می‌شود؟" icon={<ArrowsPointingOutIcon className="w-5 h-5"/>} titleColorClass="text-indigo-700" footerLink={{ text: "بیشتر در مورد معماری بخوانید...", onClick: () => { toggleSection('architecture'); document.getElementById('platform-architecture-mvp-collapsible')?.scrollIntoView({behavior: 'smooth'}); } }}>
                {toPersianDigits("ما از معماری مدرن میکروسرویس‌ها و فناوری‌های ابری پیشرفته استفاده می‌کنیم. این یعنی سیستم ما طوری طراحی شده که بتواند به طور خودکار منابع خود (مانند قدرت پردازش و فضای ذخیره‌سازی) را با افزایش تعداد کاربران و حجم داده‌ها تطبیق دهد. این مقیاس‌پذیری افقی و عمودی تضمین می‌کند که حتی با رشد پلتفرم، شما تجربه‌ای سریع و روان خواهید داشت.")}
            </InfoCard>
        </div>
        <div>
            <h3 className="text-md font-semibold text-gray-700 mb-3">{toPersianDigits("وضعیت سلامت دیتابیس‌ها و ذخیره‌سازی")}</h3>
            <ul className="space-y-2 text-sm">
                <li className="flex items-center p-2.5 bg-gray-50 rounded-md border border-gray-100">
                    <DatabaseIcon className="w-5 h-5 text-blue-500 mr-2 rtl:ml-2 rtl:mr-0"/>
                    <span className="text-gray-700 flex-grow">{toPersianDigits("ظرفیت ذخیره‌سازی داده‌های اصلی:")}</span>
                    <span className="font-medium text-green-600 flex items-center"><CheckCircleIcon className="w-4 h-4 text-green-500 ml-1"/>{toPersianDigits("بهینه (۷۰٪ پر)")}</span>
                </li>
                <li className="flex items-center p-2.5 bg-gray-50 rounded-md border border-gray-100">
                    <ArchiveBoxIcon className="w-5 h-5 text-blue-500 mr-2 rtl:ml-2 rtl:mr-0"/>
                    <span className="text-gray-700 flex-grow">{toPersianDigits("پشتیبان‌گیری داده‌ها:")}</span>
                    <span className="font-medium text-green-600 flex items-center"><CheckCircleIcon className="w-4 h-4 text-green-500 ml-1"/>{toPersianDigits("آخرین موفقیت: امروز ۳:۰۰ بامداد")}</span>
                </li>
            </ul>
        </div>
      </CollapsibleSection>
      
      {/* Phase 3.5: Promoting Security Awareness Culture */}
      <CollapsibleSection 
        title="ترویج فرهنگ آگاهی از امنیت در جامعه کاربری" 
        icon={<UserGroupIcon className="w-6 h-6 text-sky-600"/>} 
        isOpen={openSections.communitySecurityCulture} 
        onToggle={() => toggleSection('communitySecurityCulture')}
        id="community-security-culture-section"
        className="mb-8 p-6 bg-white rounded-xl shadow-lg border border-gray-200/80"
        titleClassName="text-xl font-semibold text-gray-800"
      >
        <div className="p-3 bg-gray-50 rounded-md border border-gray-200 mb-4">
            <h4 className="text-md font-semibold text-gray-700 mb-2 flex items-center">
                <LinkIcon className="w-5 h-5 text-indigo-600 mr-2 rtl:ml-2 rtl:mr-0"/>
                {toPersianDigits("یکپارچه‌سازی با جامعه کاربری")}
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed mb-2">
                {toPersianDigits("قصد داریم یک انجمن اختصاصی در بخش «جامعه کاربری» برای بحث در مورد پایداری، امنیت و بهترین شیوه‌ها ایجاد کنیم. این انجمن با دقت مدیریت خواهد شد.")}
            </p>
            <button onClick={() => navigateTo && navigateTo('Community', { section: 'securityForum' })} className="text-xs bg-indigo-500 hover:bg-indigo-600 text-white py-1.5 px-3 rounded-md transition-colors">
                {toPersianDigits("ورود به انجمن امنیت (به زودی)")}
            </button>
        </div>
        <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
            <h4 className="text-md font-semibold text-gray-700 mb-2 flex items-center">
                <AiIcon className="w-5 h-5 text-yellow-500 mr-2 rtl:ml-2 rtl:mr-0"/>
                {toPersianDigits("نقش AI در جامعه امنیتی")}
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
                {toPersianDigits("هوش مصنوعی سوالات رایج امنیتی را برجسته کرده و پاسخ‌های رسمی یا لینک به محتوای آموزشی مرتبط ارائه می‌دهد.")}
            </p>
        </div>
      </CollapsibleSection>

      {/* Phase 3.6: Final Optimization & Future Innovations */}
      <CollapsibleSection 
        title="بهینه‌سازی نهایی، امنیت حداکثری و نوآوری‌های آینده" 
        icon={<CogIcon className="w-6 h-6 text-sky-600"/>} 
        isOpen={openSections.finalOptimization} 
        onToggle={() => toggleSection('finalOptimization')}
        id="final-optimization-section"
        className="mb-8 p-6 bg-white rounded-xl shadow-lg border border-gray-200/80"
        titleClassName="text-xl font-semibold text-gray-800"
      >
        <div className="space-y-3 text-sm">
            <InfoCard title="پروتکل‌های امنیتی پیشرفته" icon={<ShieldCheckIcon className="w-5 h-5"/>} titleColorClass="text-red-700">
                {toPersianDigits("بررسی و به‌کارگیری جدیدترین پروتکل‌های امنیتی، و در آینده دور، رمزنگاری مقاوم در برابر محاسبات کوانتومی.")}
            </InfoCard>
            <InfoCard title="نگهداری پیش‌بینانه و هوش تهدیدات با AI" icon={<AiIcon className="w-5 h-5"/>} titleColorClass="text-blue-700">
                {toPersianDigits("توسعه مدل‌های AI برای نگهداری پیش‌بینانه زیرساخت‌ها و استفاده از هوش تهدیدات مبتنی بر AI.")}
            </InfoCard>
            <InfoCard title="رابط کاربری صیقلی و اطمینان‌بخش" icon={<AdjustmentsVerticalIcon className="w-5 h-5"/>} titleColorClass="text-purple-700">
                {toPersianDigits("تعهد به ارائه یک رابط کاربری روان و قابل فهم که حس استحکام و قابل اعتماد بودن را منتقل کند.")}
            </InfoCard>
        </div>
      </CollapsibleSection>
      
      {/* Final Conclusion Section */}
      <section className="mt-12 p-6 bg-gradient-to-tr from-slate-800 via-gray-800 to-slate-900 text-white rounded-xl shadow-2xl text-center">
        <ShieldCheckIcon className="w-12 h-12 text-sky-400 mx-auto mb-4"/>
        <h2 className="text-xl font-bold text-sky-300 mb-3">{toPersianDigits("جمع‌بندی نهایی: زیرساخت و امنیت، سمفونی اعتماد، پایداری و آرامش خاطر")}</h2>
        <p className="text-sm text-gray-300 leading-relaxed max-w-2xl mx-auto">
          {toPersianDigits("با اجرای این سه فاز، صفحه «زیرساخت و امنیت» در «پلتفرم ارکستراسیون هوشمند زندگی» به نمادی از تعهد ما به شفافیت، پایداری و بالاتر از همه، امنیت کاربران تبدیل خواهد شد. این صفحه نه تنها اطلاعات فنی را به زبانی ساده ارائه می‌دهد، بلکه با آموزش و توانمندسازی کاربران، آن‌ها را به شرکای آگاهی در حفظ امنیت اکوسیستم تبدیل می‌کند. این تعهد ما به ساختن یک پلتفرم هوشمند است که کاربران بتوانند با خیالی آسوده، ارکستر زندگی خود را در آن بنوازند، زیرا می‌دانند که بنیان آن بر ستون‌های استوار امنیت و پایداری بنا شده است.")}
        </p>
      </section>

      {/* Collapsible sections for Phase 1 features (assuming they are part of the full page) */}
       <CollapsibleSection title="معرفی اولیه و دسترسی سریع (MVP)" icon={<InformationCircleIcon className="w-6 h-6 text-sky-600"/>} isOpen={openSections.introduction} onToggle={() => toggleSection('introduction')} id="introduction-mvp-collapsible" className="mb-8 p-6 bg-white rounded-xl shadow-lg border border-gray-200/80" titleClassName="text-xl font-semibold text-gray-800">
          <p className="text-xs text-gray-500">{toPersianDigits("محتوای بخش معرفی اولیه (فاز ۱.۱) در اینجا قرار می‌گیرد. شامل کارت خوشامدگویی، چرایی اهمیت این صفحه و لینک‌های سریع.")}</p>
       </CollapsibleSection>
      <CollapsibleSection title="داشبورد وضعیت سیستم (MVP)" icon={<ServerStackIcon className="w-6 h-6 text-sky-600"/>} isOpen={openSections.systemStatus} onToggle={() => toggleSection('systemStatus')} id="system-status-mvp-collapsible" className="mb-8 p-6 bg-white rounded-xl shadow-lg border border-gray-200/80" titleClassName="text-xl font-semibold text-gray-800">
          <p className="text-xs text-gray-500">{toPersianDigits("محتوای داشبورد وضعیت سیستم (فاز ۱.۲) شامل وضعیت کلی، سرویس‌های اصلی و اطلاعیه‌های نگهداری در اینجا قرار می‌گیرد.")}</p>
      </CollapsibleSection>
      <CollapsibleSection title="معماری پلتفرم (MVP)" icon={<CubeTransparentIcon className="w-6 h-6 text-sky-600"/>} isOpen={openSections.architecture} onToggle={() => toggleSection('architecture')} id="platform-architecture-mvp-collapsible" className="mb-8 p-6 bg-white rounded-xl shadow-lg border border-gray-200/80" titleClassName="text-xl font-semibold text-gray-800">
         <p className="text-xs text-gray-500">{toPersianDigits("محتوای معماری پلتفرم (فاز ۱.۳) شامل توضیحات معماری، مقیاس‌پذیری و تکنولوژی‌های مورد استفاده در اینجا قرار می‌گیرد.")}</p>
      </CollapsibleSection>
      <CollapsibleSection title="اصول امنیتی (MVP)" icon={<ShieldCheckIcon className="w-6 h-6 text-sky-600"/>} isOpen={openSections.security} onToggle={() => toggleSection('security')} id="security-principles-mvp-collapsible" className="mb-8 p-6 bg-white rounded-xl shadow-lg border border-gray-200/80" titleClassName="text-xl font-semibold text-gray-800">
         <p className="text-xs text-gray-500">{toPersianDigits("محتوای اصول امنیتی (فاز ۱.۴) شامل بررسی‌های امنیتی کاربر و یکپارچگی با سرویس‌های شخص ثالث در اینجا قرار می‌گیرد.")}</p>
      </CollapsibleSection>
      <CollapsibleSection title="مدل کسب‌وکار (MVP)" icon={<ScaleIcon className="w-6 h-6 text-sky-600"/>} isOpen={openSections.businessModel} onToggle={() => toggleSection('businessModel')} id="business-model-mvp-collapsible" className="mb-8 p-6 bg-white rounded-xl shadow-lg border border-gray-200/80" titleClassName="text-xl font-semibold text-gray-800">
         <p className="text-xs text-gray-500">{toPersianDigits("محتوای مدل کسب‌وکار (فاز ۱.۵) شامل شفافیت در مورد مدل درآمدی و سیاست‌های داده در اینجا قرار می‌گیرد.")}</p>
      </CollapsibleSection>

    </div>
  );
};

export default InfrastructurePage;
```
    </content>
  </change>
</changes>```