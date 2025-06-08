

import React, { useState, useEffect, useCallback } from 'react';
import { toPersianDigits, parseJsonFromString } from '../../utils';
import { 
    ShieldCheckIcon as PageIcon, 
    CogIcon, 
    LightbulbIcon, 
    BookIcon, 
    InformationCircleIcon,
    CameraIcon,
    MicrophoneIcon,
    MapPinIcon,
    DatabaseIcon,
    TargetIcon,
    ListIcon,
    HeartIcon,
    AcademicCapIcon,
    SparklesIconNav as AiIcon,
    LinkIcon, 
    SparklesIconNav, 
    ShieldExclamationIcon,
    TrendingUpIcon,
    CheckCircleIcon,
    TrophyIcon as GiftIcon,
    DocumentArrowUpIcon, 
    TrashIcon as DeleteIcon,
    ArrowPathIcon // For refresh button
} from '../shared/AppIcons';
import CollapsibleSection from '../shared/CollapsibleSection';
import PrivacyFeatureCard from '../privacy/PrivacyFeatureCard';
import PrivacyBenefitItem from '../privacy/PrivacyBenefitItem';
import ModuleDataControlCard from '../privacy/ModuleDataControlCard';
// LearningResourceCard will be adapted for LearningHubSection
import PrivacyAdvisorCard from '../privacy/PrivacyAdvisorCard';
import { PrivacyAdvisorMessage } from '../../types/privacyTypes'; // Corrected import
import DataFlowInfographicSection from '../privacy/DataFlowInfographicSection';
import PersonalizationExamplesSection from '../privacy/PersonalizationExamplesSection';
import ModuleDataViewerModal from '../privacy/ModuleDataViewerModal';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai"; 

// Import types from App.tsx and local types
import { Theme, ModuleDataAccessSettings, PageName, PersonalizationLevel } from '../../App'; // Added PersonalizationLevel
import { PrivacyFeatureInfo, PrivacyLearningState, PrivacyBadge, LearningResourceProps as PrivacyLearningResource, PrivacyQuizQuestion } from '../../types/privacyTypes';
import LearningHubSection from '../privacy/LearningHubSection'; 
import PrivacyBadgesShowcase from '../privacy/PrivacyBadgesShowcase'; 
import LoadingSpinner from '../shared/LoadingSpinner';


export interface PrivacyPageProps {
    userName: string;
    assistantName: string;
    navigateTo: (pageName: PageName | string, params?: any) => void;
    showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
    geminiAI: GoogleGenAI | null; 
    theme: Theme; 
    moduleDataAccessSettings: ModuleDataAccessSettings;
    onToggleModuleDataControl: (moduleId: string, dataItemId: string, isEnabled: boolean) => void;
    onShowXai: (title: string, explanation: string) => void; 
    privacyLearningState: PrivacyLearningState; 
    onCompletePrivacyResource: (resourceId: string, pointsAwarded: number, badgeIdToAward?: string) => void; 
    onDownloadUserData: () => void; 
    onDeleteAccountAndData: () => void; 
    personalizationLevel?: PersonalizationLevel; // Added for context
}

const xaiExplanationsPrivacyPage: Record<string, string> = {
  core_os_permissions: "این‌ها مجوزهای اصلی سیستم عامل هستند که برنامه برای ارائه برخی قابلیت‌ها به آن‌ها نیاز دارد. به عنوان مثال، دسترسی به دوربین برای اسکن QR کد یا دسترسی به موقعیت مکانی برای پیشنهادات محلی.",
  granular_data_controls: "شما می‌توانید به تفکیک برای هر ماژول و هر نوع داده مشخص کنید که آیا دستیار هوشمند مجاز به دسترسی و استفاده از آن داده برای شخصی‌سازی و ارائه پیشنهادات است یا خیر. این کنترل کامل به شما امکان می‌دهد سطح حریم خصوصی خود را دقیقاً مطابق با نیازهایتان تنظیم کنید.",
  ai_data_usage_transparency: "ما متعهد به شفافیت کامل در مورد نحوه استفاده از داده‌های شما هستیم. در این بخش، می‌توانید ببینید داده‌ها چگونه جریان می‌یابند و هوش مصنوعی چگونه از آن‌ها برای کمک به شما استفاده می‌کند.",
  data_you_provide: "این داده‌ها مستقیماً توسط شما وارد می‌شوند، مانند محتوای وظایف، اهداف یا یادداشت‌های سلامتی. هوش مصنوعی از این اطلاعات برای درک نیازها و ارائه خدمات مرتبط استفاده می‌کند.",
  ai_learning_control: "دستیار هوشمند شما در طول زمان از تعاملات و بازخوردهای شما یاد می‌گیرد. شما می‌توانید این یادگیری‌ها را مشاهده، مدیریت و در صورت نیاز بازنشانی کنید.",
  goals_module_data: "داده‌های مربوط به اهداف شما، شامل عناوین، توضیحات و برنامه‌های اقدام. استفاده از این داده‌ها به AI کمک می‌کند تا پیشنهادات مرتبط برای دستیابی به اهداف ارائه دهد و پیشرفت شما را پیگیری کند.",
  tasks_module_data: "داده‌های مربوط به وظایف شما، شامل عناوین، توضیحات، تاریخ‌های سررسید و اولویت‌ها. AI از این اطلاعات برای کمک به برنامه‌ریزی، اولویت‌بندی و یادآوری وظایف استفاده می‌کند.",
  health_module_data: "داده‌های مربوط به سلامت و تندرستی شما، مانند الگوهای خواب، سطح فعالیت و گزارش‌های تغذیه (در صورت ورود توسط شما). این اطلاعات به AI امکان می‌دهد تا پیشنهادات سلامتی شخصی‌سازی‌شده ارائه دهد و به شما در دستیابی به اهداف تندرستی‌تان کمک کند.",
  learning_module_data: "داده‌های مربوط به فعالیت‌های یادگیری شما، مانند دوره‌های تکمیل‌شده و علاقه‌مندی‌های یادگیری. AI از این اطلاعات برای پیشنهاد مسیرها و محتوای آموزشی جدید که با علایق و نیازهای شما همسو باشد، استفاده می‌کند.",
  privacy_policy_xai: "سیاست حفظ حریم خصوصی ما به طور کامل نحوه جمع‌آوری، استفاده، ذخیره‌سازی و حفاظت از اطلاعات شخصی شما را توضیح می‌دهد. مطالعه آن به شما کمک می‌کند تا از حقوق خود آگاه باشید.",
  terms_of_service_xai: "شرایط خدمات، قوانین و مقررات استفاده از این پلتفرم را مشخص می‌کند. پذیرش این شرایط برای استفاده از خدمات ضروری است.",
  data_request_xai: "شما حق دارید یک کپی از داده‌های شخصی خود را که در اختیار ما قرار داده‌اید، درخواست کنید. با کلیک روی دکمه مربوطه، تمام داده‌های شما که در این برنامه ذخیره شده‌اند، به صورت یک فایل JSON آماده دانلود خواهد شد.",
  account_deletion_xai: "شما می‌توانید در هر زمان درخواست حذف کامل حساب کاربری و تمام داده‌های مرتبط با آن را از سیستم ما بدهید. این عمل غیرقابل بازگشت است و تمام اطلاعات شما، از جمله تنظیمات، پیشرفت‌ها و داده‌های شخصی، به طور کامل پاک خواهد شد."
};

export const availablePrivacyBadges: PrivacyBadge[] = [
  { id: 'privacy_novice', name: "نوآموز حریم خصوصی", description: "اولین مطلب آموزشی حریم خصوصی را مطالعه کردید.", icon: <AcademicCapIcon className="w-full h-full"/>, criteria: "تکمیل ۱ منبع آموزشی" },
  { id: 'data_controller', name: "فرمانده داده‌ها", description: "حداقل ۳ تنظیم کنترل داده را تغییر دادید.", icon: <CogIcon className="w-full h-full"/>, criteria: "تغییر ۳ تنظیم داده" },
  { id: 'quiz_master_privacy', name: "استاد آزمون حریم خصوصی", description: "اولین آزمون حریم خصوصی را با موفقیت تکمیل کردید.", icon: <TrendingUpIcon className="w-full h-full"/>, criteria: "تکمیل ۱ آزمون" },
  { id: 'xai_explorer', name: "کاوشگر XAI", description: "حداقل ۳ توضیح XAI را مشاهده کردید.", icon: <LightbulbIcon className="w-full h-full"/>, criteria: "مشاهده ۳ توضیح XAI" },
];

export const privacyLearningResourcesData: PrivacyLearningResource[] = [
  { id: 'plr1', title: "مقدمه‌ای بر حریم خصوصی دیجیتال", description: "درک مفاهیم اولیه حریم خصوصی و اهمیت آن در دنیای امروز.", type: "article", iconName: "DocumentTextIcon", url: "#", pointsAwarded: 10, badgeAwardedOnCompletion: "privacy_novice" },
  { id: 'plr2', title: "چگونه AI از داده‌های شما برای کمک به شما استفاده می‌کند؟", description: "یک ویدیوی کوتاه و ساده در مورد یادگیری ماشین و شخصی‌سازی.", type: "video", iconName: "CameraIcon", url: "#", pointsAwarded: 15 },
  { 
    id: 'plr3', 
    title: "آزمون: مفاهیم پایه حریم خصوصی", 
    description: "دانش خود را در مورد اصول اولیه حریم خصوصی بسنجید.", 
    type: "quiz", 
    iconName: "AcademicCapIcon",
    pointsAwarded: 0, 
    badgeAwardedOnCompletion: "quiz_master_privacy",
    quiz: [
      { id: 'q1', questionText: "کدام یک از موارد زیر جزء داده‌های شخصی حساس محسوب می‌شود؟", options: [{id:'o1',text:'نام'}, {id:'o2',text:'آدرس ایمیل'}, {id:'o3',text:'اطلاعات پزشکی'}, {id:'o4',text:'تاریخ تولد'}], correctAnswerId: 'o3', points: 10, explanation: "اطلاعات پزشکی به دلیل ماهیت خصوصی و پتانسیل سوءاستفاده، جزء داده‌های حساس طبقه‌بندی می‌شوند." },
      { id: 'q2', questionText: "هدف اصلی GDPR چیست؟", options: [{id:'o1',text:'افزایش سرعت اینترنت'}, {id:'o2',text:'حفاظت از داده‌های شهروندان اروپایی'}, {id:'o3',text:'استانداردسازی وب‌سایت‌ها'}, {id:'o4',text:'مقابله با ویروس‌های کامپیوتری'}], correctAnswerId: 'o2', points: 10, explanation: "GDPR (مقررات عمومی حفاظت از داده اتحادیه اروپا) با هدف اصلی حفاظت از داده‌های شخصی و حریم خصوصی شهروندان اتحادیه اروپا تصویب شده است." },
      { id: 'q3', questionText: "XAI مخفف چیست؟", options: [{id:'o1',text:'هوش مصنوعی بسیار پیشرفته'}, {id:'o2',text:'هوش مصنوعی قابل توضیح'}, {id:'o3',text:'تجربه کاربری هوشمند'}, {id:'o4',text:'رابط هوشمند توسعه‌یافته'}], correctAnswerId: 'o2', points: 5, explanation: "XAI یا Explainable AI به معنای هوش مصنوعی قابل توضیح است که به کاربران کمک می‌کند نحوه تصمیم‌گیری مدل‌های AI را درک کنند."}
    ]
  },
  { id: 'plr4', title: "کنترل داده‌های شما در LifeOrchestrator", description: "راهنمای گام به گام برای مدیریت مجوزهای دسترسی و تنظیمات اشتراک‌گذاری داده در این پلتفرم.", type: "article", iconName: "DocumentTextIcon", url: "#", pointsAwarded: 10, badgeAwardedOnCompletion: "data_controller" },
];


const PrivacyPage: React.FC<PrivacyPageProps> = ({
    userName, assistantName, navigateTo, showToast, geminiAI, theme,
    moduleDataAccessSettings, onToggleModuleDataControl, onShowXai,
    privacyLearningState, onCompletePrivacyResource,
    onDownloadUserData, onDeleteAccountAndData,
    personalizationLevel = 'balanced' // Default value
}) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    corePermissions: false, 
    granularControls: false,
    transparency: false,
    policyLinks: true, 
    learningHub: true, 
    advisor: false, // Keep advisor section closed by default initially
    pointsAndBadges: true, 
  });

  const [isDataViewerModalOpen, setIsDataViewerModalOpen] = useState(false);
  const [viewingModuleId, setViewingModuleId] = useState<string>('');
  const [viewingModuleName, setViewingModuleName] = useState<string>('');

  const [dynamicAdvisorMessages, setDynamicAdvisorMessages] = useState<PrivacyAdvisorMessage[]>([]);
  const [isLoadingAdvisorMessages, setIsLoadingAdvisorMessages] = useState(false);
  const [advisorError, setAdvisorError] = useState<string | null>(null);
  const [advisorSectionFirstOpened, setAdvisorSectionFirstOpened] = useState(false);


  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => {
        const newState = !prev[sectionId];
        if (sectionId === 'advisor' && newState && !advisorSectionFirstOpened) {
            setAdvisorSectionFirstOpened(true);
            fetchAIAdvisorMessages();
        }
        return { ...prev, [sectionId]: newState };
    });
  };
  
  const fetchAIAdvisorMessages = useCallback(async () => {
    if (!geminiAI) {
      setAdvisorError(toPersianDigits("سرویس هوش مصنوعی برای دریافت مشاوره در دسترس نیست."));
      return;
    }
    setIsLoadingAdvisorMessages(true);
    setAdvisorError(null);
    setDynamicAdvisorMessages([]);

    try {
      let userContext = toPersianDigits("اطلاعات زمینه‌ای کاربر:\n");
      userContext += toPersianDigits(`- سطح شخصی‌سازی کلی: ${personalizationLevel}\n`);
      userContext += toPersianDigits(`- امتیاز یادگیری حریم خصوصی: ${privacyLearningState.points}\n`);
      userContext += toPersianDigits(`- تعداد نشان‌های حریم خصوصی کسب شده: ${privacyLearningState.earnedBadgeIds.length}\n`);
      
      let sharedDataSummary = toPersianDigits("خلاصه داده‌های به اشتراک گذاشته شده با AI:\n");
      let specificDataShared = false;
      Object.entries(moduleDataAccessSettings).forEach(([modId, settings]) => {
        const moduleName = moduleDataItemsConfig.find(m => m.moduleId === modId)?.moduleName || modId;
        Object.entries(settings).forEach(([itemId, isEnabled]) => {
          if (isEnabled) {
            const dataItemName = moduleDataItemsConfig.find(m => m.moduleId === modId)?.dataItems.find(di => di.id === itemId)?.name || itemId;
            sharedDataSummary += toPersianDigits(`  - ماژول ${moduleName}: داده "${dataItemName}" فعال است.\n`);
            specificDataShared = true;
          }
        });
      });
      if (!specificDataShared) {
        sharedDataSummary += toPersianDigits("  - در حال حاضر هیچ داده خاصی از ماژول‌ها برای AI فعال نشده است.\n");
      }
      userContext += sharedDataSummary;

      const prompt = toPersianDigits(
        `شما یک مشاور حریم خصوصی هوشمند و مفید هستید. بر اساس زمینه کاربر زیر، ۱ تا ۲ پیشنهاد یا هشدار مرتبط با حریم خصوصی به زبان فارسی ارائه دهید. پاسخ باید یک آرایه JSON معتبر باشد. هر آیتم در آرایه باید یک شیء با فیلدهای "type" (می‌تواند 'alert' یا 'advice' باشد)، "title" (عنوان پیام)، "message" (متن پیام)، و به صورت اختیاری "actionText" (متن دکمه اقدام)، "actionTargetPage" (نام صفحه‌ای برای ناوبری مانند 'Privacy' یا 'Personalization') و "actionTargetSection" (شناسه یک بخش در صفحه برای اسکرول به آن) باشد. اگر هیچ پیشنهاد یا هشدار مهمی وجود ندارد، یک آرایه خالی برگردانید.\n\nزمینه کاربر:\n${userContext}`
      );
      
      const response: GenerateContentResponse = await geminiAI.models.generateContent({
        model: "gemini-2.5-flash-preview-04-17", 
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });

      let jsonStr = response.text.trim();
      const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
      const match = jsonStr.match(fenceRegex);
      if (match && match[2]) {
        jsonStr = match[2].trim();
      }
      
      const aiMessagesRaw = parseJsonFromString<any[]>(jsonStr);

      if (Array.isArray(aiMessagesRaw)) {
        const processedMessages: PrivacyAdvisorMessage[] = aiMessagesRaw.map((rawMsg, index) => {
          let icon: React.ReactNode = <InformationCircleIcon className="w-5 h-5 text-blue-500"/>;
          if (rawMsg.type === 'alert') icon = <ShieldExclamationIcon className="w-5 h-5 text-yellow-500"/>;
          else if (rawMsg.type === 'advice') icon = <LightbulbIcon className="w-5 h-5 text-sky-500"/>;
          
          return {
            id: `ai-advisor-${Date.now()}-${index}`,
            type: rawMsg.type === 'alert' ? 'alert' : 'advice',
            icon: icon,
            title: rawMsg.title || toPersianDigits("پیشنهاد هوشمند"),
            message: rawMsg.message || toPersianDigits("AI یک نکته برای شما دارد."),
            actionText: rawMsg.actionText,
            actionTargetPage: rawMsg.actionTargetPage,
            actionTargetSection: rawMsg.actionTargetSection,
            onAction: (rawMsg.actionTargetPage || rawMsg.actionTargetSection) ? () => {
                if (rawMsg.actionTargetPage) {
                    navigateTo(rawMsg.actionTargetPage, rawMsg.actionTargetSection ? { scrollToSection: rawMsg.actionTargetSection } : undefined);
                    if (rawMsg.actionTargetSection) {
                        setTimeout(() => {
                            document.getElementById(rawMsg.actionTargetSection)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }, 300);
                    }
                } else if (rawMsg.actionTargetSection) {
                     document.getElementById(rawMsg.actionTargetSection)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            } : undefined,
          };
        });
        setDynamicAdvisorMessages(processedMessages);
        if (processedMessages.length === 0) {
            showToast(toPersianDigits("AI در حال حاضر پیشنهاد خاصی برای شما ندارد."), "info");
        }
      } else {
        console.error("Failed to parse AI advisor messages:", response.text);
        setAdvisorError(toPersianDigits("پاسخ دریافتی از AI برای مشاوره قابل پردازش نبود."));
      }
    } catch (error: any) {
      console.error("Error fetching AI advisor messages:", error);
      setAdvisorError(toPersianDigits(`خطا در دریافت مشاوره از AI: ${error.message || "لطفاً دوباره امتحان کنید."}`));
    } finally {
      setIsLoadingAdvisorMessages(false);
    }
  }, [geminiAI, moduleDataAccessSettings, personalizationLevel, privacyLearningState.earnedBadgeIds.length, privacyLearningState.points, navigateTo, showToast]);


  const corePermissions: PrivacyFeatureInfo[] = [
    { id: 'p_camera', icon: <CameraIcon className="w-5 h-5 text-red-500"/>, name: "دسترسی به دوربین", description: "برای اسکن کدها، تشخیص اشیا (در صورت فعال بودن) و سایر ویژگی‌های مبتنی بر دوربین.", permissionKey: 'camera', currentStatus: true, impactIfNotGranted: "قابلیت‌های اسکن و تشخیص تصویر غیرفعال خواهند شد." },
    { id: 'p_mic', icon: <MicrophoneIcon className="w-5 h-5 text-blue-500"/>, name: "دسترسی به میکروفون", description: "برای ورودی صوتی، تبدیل گفتار به متن و فرمان‌های صوتی.", permissionKey: 'microphone', currentStatus: true, impactIfNotGranted: "امکان استفاده از دستورات صوتی و ورودی گفتاری وجود نخواهد داشت." },
    { id: 'p_location', icon: <MapPinIcon className="w-5 h-5 text-green-500"/>, name: "دسترسی به موقعیت مکانی", description: "برای ارائه پیشنهادات مبتنی بر مکان، یادآوری‌های محلی و خدمات مرتبط با سفر.", permissionKey: 'geolocation', currentStatus: true, impactIfNotGranted: "پیشنهادات محلی و برخی ویژگی‌های سفر و یادآوری غیرفعال می‌شوند." },
  ];

  const moduleDataItemsConfig = [
    { moduleId: 'goals', moduleName: 'اهداف', icon: <TargetIcon className="w-4 h-4 text-blue-500"/>, dataItems: [
      { id: 'goalTitles', name: 'عناوین اهداف', impact: 'AI نمی‌تواند اهداف مرتبط با وظایف را پیشنهاد دهد.', xaiKey: 'goals_module_data' },
      { id: 'goalDescriptions', name: 'توضیحات اهداف', impact: 'درک AI از جزئیات اهداف کاهش می‌یابد.', xaiKey: 'goals_module_data' },
      { id: 'goalActionPlans', name: 'برنامه‌های اقدام اهداف', impact: 'AI نمی‌تواند در پیگیری گام‌های اهداف کمک کند.', xaiKey: 'goals_module_data' },
    ]},
    { moduleId: 'tasks', moduleName: 'وظایف', icon: <ListIcon className="w-4 h-4 text-indigo-500"/>, dataItems: [
      { id: 'taskTitles', name: 'عناوین وظایف', impact: 'AI نمی‌تواند وظایف را اولویت‌بندی یا یادآوری کند.', xaiKey: 'tasks_module_data' },
      { id: 'taskDescriptions', name: 'توضیحات وظایف', impact: 'درک AI از محتوای وظایف محدود می‌شود.', xaiKey: 'tasks_module_data' },
      { id: 'taskDueDates', name: 'تاریخ‌های سررسید', impact: 'یادآوری‌های هوشمند برای سررسیدها غیرفعال می‌شوند.', xaiKey: 'tasks_module_data' },
      { id: 'taskPriority', name: 'اولویت وظایف', impact: 'پیشنهادات اولویت‌بندی AI در دسترس نخواهد بود.', xaiKey: 'tasks_module_data' },
    ]},
    { moduleId: 'health', moduleName: 'سلامت', icon: <HeartIcon className="w-4 h-4 text-red-500"/>, dataItems: [
      { id: 'sleepPatterns', name: 'الگوهای خواب', impact: 'پیشنهادات بهبود خواب و تحلیل‌های مرتبط غیرفعال می‌شوند.', xaiKey: 'health_module_data' },
      { id: 'activityLevel', name: 'سطح فعالیت', impact: 'پیشنهادات فعالیت بدنی و پیگیری اهداف ورزشی محدود می‌شود.', xaiKey: 'health_module_data' },
      { id: 'nutritionLog', name: 'گزارش تغذیه', impact: 'تحلیل رژیم غذایی و پیشنهادات تغذیه‌ای ارائه نخواهد شد.', xaiKey: 'health_module_data' },
    ]},
     { moduleId: 'learning', moduleName: 'یادگیری', icon: <AcademicCapIcon className="w-4 h-4 text-purple-500"/>, dataItems: [
      { id: 'completedCourses', name: 'دوره‌های تکمیل شده', impact: 'AI نمی‌تواند پیشرفت شما را پیگیری کند یا دوره‌های مرتبط پیشنهاد دهد.', xaiKey: 'learning_module_data' },
      { id: 'learningInterests', name: 'علاقه‌مندی‌های یادگیری', impact: 'پیشنهادات محتوای یادگیری شخصی‌سازی نخواهد شد.', xaiKey: 'learning_module_data' },
    ]},
  ];

  const privacyBenefits: {icon: React.ReactElement, title: string, description: string}[] = [
    { icon: <CogIcon className="w-5 h-5 text-sky-600"/>, title: "کنترل کامل بر داده‌ها", description: "شما تصمیم می‌گیرید کدام داده‌ها با دستیار هوشمند به اشتراک گذاشته شوند و چگونه برای شخصی‌سازی تجربه شما استفاده شوند." },
    { icon: <LightbulbIcon className="w-5 h-5 text-sky-600"/>, title: "شفافیت در استفاده", description: "به وضوح ببینید داده‌های شما چگونه برای بهبود تجربه و ارائه پیشنهادات هوشمند توسط دستیار استفاده می‌شوند." },
    { icon: <PageIcon className="w-5 h-5 text-sky-600"/>, title: "امنیت و حریم خصوصی پیشرفته", description: "تعهد ما به حفاظت از اطلاعات شخصی شما با بالاترین استانداردها و ارائه کنترل‌های لازم به شما برای مدیریت آن‌هاست." },
  ];
  
  const defaultPrivacyAdvisorMessages: PrivacyAdvisorMessage[] = [
    { id: 'adv1_default', type: 'advice', icon: <InformationCircleIcon className="w-5 h-5 text-blue-500"/>, title: "بازبینی دوره‌ای مجوزها", message: "توصیه می‌شود هر چند وقت یکبار، مجوزهای دسترسی برنامه و ماژول‌ها را بازبینی کنید تا از همسویی آن‌ها با نیازهای فعلی خود اطمینان حاصل کنید.", actionText: "بررسی مجوزهای ماژول", onAction: () => { document.getElementById('granularDataControlsSection')?.scrollIntoView({behavior: 'smooth'}); toggleSection('granularControls'); } },
    { id: 'adv2_default', type: 'alert', icon: <ShieldExclamationIcon className="w-5 h-5 text-yellow-500"/>, title: "اشتراک‌گذاری داده بین ماژول‌ها", message: "برخی از ماژول‌ها ممکن است برای ارائه پیشنهادات بهتر، از داده‌های سایر ماژول‌ها استفاده کنند (با اجازه شما). می‌توانید این تنظیمات را در بخش شخصی‌سازی مدیریت کنید.", actionText: "مدیریت اشتراک‌گذاری داده", onAction: () => navigateTo('Personalization', { scrollToSection: 'interModuleSharing' }) },
  ];
  
  const handleShowXaiForItem = (title: string, xaiKey: string) => {
    onShowXai(toPersianDigits(title), xaiExplanationsPrivacyPage[xaiKey] || toPersianDigits(`توضیح XAI برای "${title}" به زودی اضافه خواهد شد.`));
  };

  const handleViewModuleData = (moduleId: string, moduleNamePersian: string) => {
    setViewingModuleId(moduleId);
    setViewingModuleName(moduleNamePersian);
    setIsDataViewerModalOpen(true);
  };

  const handleDeleteAccountConfirmed = () => {
    if (window.confirm(toPersianDigits("آیا مطمئن هستید که می‌خواهید حساب کاربری و تمام داده‌های مرتبط خود را به طور کامل حذف کنید؟ این عمل قابل بازگشت نیست."))) {
        onDeleteAccountAndData();
    }
  };

  const advisorMessagesToDisplay = dynamicAdvisorMessages.length > 0 ? dynamicAdvisorMessages : defaultPrivacyAdvisorMessages;


  return (
    <div className="page bg-privacy-page">
      {isDataViewerModalOpen && (
        <ModuleDataViewerModal 
            isOpen={isDataViewerModalOpen}
            onClose={() => setIsDataViewerModalOpen(false)}
            moduleId={viewingModuleId}
            moduleName={viewingModuleName}
        />
      )}
      <header className="text-center mb-6 p-4 bg-sky-600/10 rounded-xl border border-sky-200">
        <PageIcon className="w-12 h-12 text-sky-600 mx-auto mb-2" />
        <h1 className="text-2xl font-bold text-sky-700">{toPersianDigits("مرکز کنترل حریم خصوصی")}</h1>
        <p className="text-sm text-gray-600 mt-1">{toPersianDigits(`سلام ${userName}, در اینجا کنترل کاملی بر روی داده‌های خود و نحوه استفاده ${assistantName} از آن‌ها دارید.`)}</p>
      </header>

      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            {privacyBenefits.map(benefit => <PrivacyBenefitItem key={benefit.title} {...benefit} />)}
        </div>

        <CollapsibleSection title="امتیازات و نشان‌های یادگیری حریم خصوصی شما" icon={<GiftIcon className="w-5 h-5 text-gray-600"/>} isOpen={openSections.pointsAndBadges} onToggle={() => toggleSection('pointsAndBadges')} id="pointsAndBadgesSection">
            <div className="p-3 bg-purple-50 rounded-md border border-purple-200">
                <p className="text-sm font-semibold text-purple-700 mb-2">
                    {toPersianDigits(`امتیاز یادگیری حریم خصوصی شما: ${privacyLearningState.points}`)}
                </p>
                <PrivacyBadgesShowcase 
                    earnedBadgeIds={new Set(privacyLearningState.earnedBadgeIds)} 
                    allBadges={availablePrivacyBadges} 
                />
            </div>
        </CollapsibleSection>

        <CollapsibleSection title="مرکز یادگیری حریم خصوصی" icon={<AcademicCapIcon className="w-5 h-5 text-gray-600"/>} isOpen={openSections.learningHub} onToggle={() => toggleSection('learningHub')} id="learningHubSection">
            <p className="text-xs text-gray-600 mb-3 p-2 bg-gray-100 rounded-md leading-relaxed">
                {toPersianDigits("دانش خود را در مورد حریم خصوصی و نحوه مدیریت داده‌هایتان افزایش دهید. با تکمیل هر منبع، امتیاز و نشان کسب کنید!")}
            </p>
           <LearningHubSection
             resources={privacyLearningResourcesData}
             onCompleteResource={onCompletePrivacyResource}
             earnedBadgeIds={new Set(privacyLearningState.earnedBadgeIds)} 
           />
        </CollapsibleSection>


        <CollapsibleSection title="مجوزهای اصلی سیستم عامل" icon={<CogIcon className="w-5 h-5 text-gray-600"/>} isOpen={openSections.corePermissions} onToggle={() => toggleSection('corePermissions')} id="coreOsPermissionsSection">
            <p className="text-xs text-gray-600 mb-3 p-2 bg-gray-100 rounded-md leading-relaxed">
                {toPersianDigits(xaiExplanationsPrivacyPage.core_os_permissions)}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {corePermissions.map(perm => (
                    <PrivacyFeatureCard key={perm.id} feature={perm} type="permission" onXaiClick={(title, key) => onShowXai(title, xaiExplanationsPrivacyPage[key] || '')} />
                ))}
            </div>
        </CollapsibleSection>
        
        <CollapsibleSection title="کنترل دسترسی AI به داده‌های ماژول‌ها" icon={<DatabaseIcon className="w-5 h-5 text-gray-600"/>} isOpen={openSections.granularControls} onToggle={() => toggleSection('granularControls')} id="granularDataControlsSection">
            <p className="text-xs text-gray-600 mb-3 p-2 bg-gray-100 rounded-md leading-relaxed">
                {toPersianDigits(xaiExplanationsPrivacyPage.granular_data_controls)}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {moduleDataItemsConfig.map(moduleConfig => (
                    moduleConfig.dataItems.map(dataItem => (
                        <ModuleDataControlCard
                            key={`${moduleConfig.moduleId}-${dataItem.id}`}
                            moduleId={moduleConfig.moduleId}
                            dataItemId={dataItem.id}
                            moduleIcon={moduleConfig.icon}
                            moduleName={moduleConfig.moduleName}
                            dataTypeName={dataItem.name}
                            currentStatus={moduleDataAccessSettings[moduleConfig.moduleId]?.[dataItem.id] ?? false}
                            onToggleStatus={(isEnabled) => onToggleModuleDataControl(moduleConfig.moduleId, dataItem.id, isEnabled)}
                            impactOfDisabling={dataItem.impact}
                            xaiExplanationKey={dataItem.xaiKey}
                            onViewModuleData={() => handleViewModuleData(moduleConfig.moduleId, moduleConfig.moduleName)}
                            onShowXai={handleShowXaiForItem}
                        />
                    ))
                ))}
            </div>
        </CollapsibleSection>

        <CollapsibleSection title="شفافیت در استفاده از داده توسط هوش مصنوعی" icon={<AiIcon className="w-5 h-5 text-gray-600"/>} isOpen={openSections.transparency} onToggle={() => toggleSection('transparency')}>
            <p className="text-xs text-gray-600 mb-3 p-2 bg-gray-100 rounded-md leading-relaxed">
                {toPersianDigits(xaiExplanationsPrivacyPage.ai_data_usage_transparency)}
            </p>
            <div className="space-y-4">
                <DataFlowInfographicSection onShowXai={onShowXai} />
                <PersonalizationExamplesSection onShowXai={onShowXai} />
            </div>
        </CollapsibleSection>
        
        <CollapsibleSection title="سیاست‌نامه، حقوق شما و مدیریت داده‌ها" icon={<BookIcon className="w-5 h-5 text-gray-600"/>} isOpen={openSections.policyLinks} onToggle={() => toggleSection('policyLinks')}>
            <ul className="space-y-2.5 text-sm">
                <li><button onClick={() => handleShowXaiForItem("سیاست حفظ حریم خصوصی", "privacy_policy_xai")} className="text-indigo-600 hover:underline flex items-center"><LinkIcon className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0"/>{toPersianDigits("سیاست حفظ حریم خصوصی (مشاهده کامل)")}</button></li>
                <li><button onClick={() => handleShowXaiForItem("شرایط خدمات", "terms_of_service_xai")} className="text-indigo-600 hover:underline flex items-center"><LinkIcon className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0"/>{toPersianDigits("شرایط خدمات (مشاهده کامل)")}</button></li>
                <li className="pt-2 border-t border-gray-100">
                    <button 
                        onClick={onDownloadUserData} 
                        className="w-full sm:w-auto text-sm bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center shadow hover:shadow-md"
                    >
                        <DocumentArrowUpIcon className="w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0"/>{toPersianDigits("دانلود داده‌های من")}
                    </button>
                    <p className="text-xs text-gray-500 mt-1">{toPersianDigits(xaiExplanationsPrivacyPage.data_request_xai)}</p>
                </li>
                <li className="pt-2 border-t border-gray-100">
                    <button 
                        onClick={handleDeleteAccountConfirmed} 
                        className="w-full sm:w-auto text-sm bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center shadow hover:shadow-md"
                    >
                        <DeleteIcon className="w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0"/>{toPersianDigits("حذف حساب کاربری و تمام داده‌ها")}
                    </button>
                     <p className="text-xs text-gray-500 mt-1">{toPersianDigits(xaiExplanationsPrivacyPage.account_deletion_xai)}</p>
                </li>
            </ul>
        </CollapsibleSection>

        <CollapsibleSection title="مشاور حریم خصوصی شما" icon={<SparklesIconNav className="w-5 h-5 text-gray-600"/>} isOpen={openSections.advisor} onToggle={() => toggleSection('advisor')}>
            <div className="flex justify-between items-center mb-3">
                <p className="text-xs text-gray-600 p-2 bg-gray-100 rounded-md leading-relaxed flex-grow">
                    {toPersianDigits("دستیار هوشمند شما می‌تواند نکاتی برای بهبود تنظیمات حریم خصوصی‌تان ارائه دهد.")}
                </p>
                <button 
                    onClick={fetchAIAdvisorMessages} 
                    disabled={isLoadingAdvisorMessages || !geminiAI}
                    className="ml-2 rtl:mr-2 rtl:ml-0 p-2 bg-sky-500 hover:bg-sky-600 text-white rounded-md disabled:opacity-60"
                    title={toPersianDigits("دریافت مشاوره جدید AI")}
                >
                    {isLoadingAdvisorMessages ? <LoadingSpinner size="sm"/> : <ArrowPathIcon className="w-4 h-4"/>}
                </button>
            </div>
            {isLoadingAdvisorMessages && <div className="flex justify-center py-3"><LoadingSpinner /></div>}
            {advisorError && <p className="text-xs text-red-500 bg-red-100 p-2 rounded-md">{advisorError}</p>}
            {!isLoadingAdvisorMessages && !advisorError && advisorMessagesToDisplay.length === 0 && (
                <p className="text-xs text-gray-500 text-center py-2">{toPersianDigits("AI در حال حاضر پیشنهاد خاصی برای شما ندارد یا در اولین بار نیاز به کلیک روی دکمه تازه‌سازی دارد.")}</p>
            )}
            <div className="space-y-3">
                {advisorMessagesToDisplay.map(msg => <PrivacyAdvisorCard key={msg.id} message={msg} onDismiss={(id) => {
                    setDynamicAdvisorMessages(prev => prev.filter(m => m.id !== id));
                    showToast(toPersianDigits(`پیام مشاور نادیده گرفته شد.`), 'info');
                }} />)}
            </div>
        </CollapsibleSection>
      </div>
    </div>
  );
};

export default PrivacyPage;
