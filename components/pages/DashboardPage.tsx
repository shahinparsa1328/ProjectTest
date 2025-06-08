
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { toPersianDigits, parseJsonFromString } from '../../utils';
import { 
  CheckCircleIcon, XCircleIcon, LightbulbIcon, UserCircleIcon as ProfileIcon,
  TargetIcon as GoalsWidgetIcon, 
  ListIcon as TasksWidgetIcon,   
  RepeatIcon as HabitsWidgetIcon, 
  ArrowRightIcon as ViewAllIcon, PaperAirplaneIcon, StarIcon, 
  SparklesIconNav as AiSparkleIcon,
  BookIcon, HeartIcon, WalletIcon,
  ClockIcon, PlayIcon, AdjustmentsVerticalIcon, SettingsIcon, XMarkIcon, ActivityLogIcon, BriefcaseIcon, UserGroupIcon as RelationshipIcon
} from '../shared/AppIcons'; 
import XAIModal from '../shared/XAIModal'; 
import LoadingSpinner from '../shared/LoadingSpinner'; 
import ToastNotification from '../shared/ToastNotification';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { PageName } from '../../App'; 
import { Goal, Task } from '../../types/learningTypes'; 
import AutonomousActionCard, { AIAutonomousAction } from './dashboard/AutonomousActionCard';   
import InterconnectednessGraph, { DomainNodeData, ConnectionData, CorrelationExplanationData } from './dashboard/InterconnectednessGraph';
import PredictiveInsightCard, { PredictiveInsightAlert } from './dashboard/PredictiveInsightCard';
import ContentFeedCard, { PersonalizedContentItem } from './dashboard/ContentFeedCard';
import HolisticScoreDetailModal, { DomainScore } from './dashboard/HolisticScoreDetailModal';


const AI_MODEL_NAME = 'gemini-2.5-flash-preview-04-17';

interface DashboardPageProps {
  userName: string;
  navigateTo: (page: PageName) => void;
}

interface DashboardWidgetProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onViewAllClick?: () => void;
  viewAllText?: string;
  className?: string;
  contentClassName?: string;
  titleColorClass?: string; 
}

const WidgetCard: React.FC<DashboardWidgetProps> = ({ title, icon, children, onViewAllClick, viewAllText = "مشاهده همه", className = "", contentClassName = "", titleColorClass = "text-gray-800" }) => (
  <div className={`bg-white p-4 rounded-xl shadow-md border border-gray-200/80 ${className} hover:shadow-lg transition-shadow duration-300`}>
    <div className="flex justify-between items-center mb-3">
      <h4 className={`font-semibold ${titleColorClass} flex items-center text-base`}>
        {icon && <span className="ml-2 rtl:mr-0 rtl:ml-2">{icon}</span>}
        {toPersianDigits(title)}
      </h4>
      {onViewAllClick && (
        <button onClick={onViewAllClick} className={`text-xs ${titleColorClass.replace('text-gray-800', 'text-indigo-600').replace('text-blue-800', 'text-blue-600').replace('text-purple-800', 'text-purple-600')} hover:opacity-75 font-medium flex items-center`}>
          {toPersianDigits(viewAllText)} &raquo;
        </button>
      )}
    </div>
    <div className={`space-y-2.5 ${contentClassName}`}>{children}</div>
  </div>
);

interface WelcomeCardProps {
  userName: string;
  moodText: string;
  lifeScore: number;
}
const WelcomeCard: React.FC<WelcomeCardProps> = ({ userName, moodText, lifeScore }) => (
  <div className="flex items-center justify-between mb-6 p-3.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl shadow-lg">
    <div className="flex items-center">
      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center ml-3 rtl:mr-0 rtl:ml-3 shadow-inner">
        <ProfileIcon className="w-8 h-8 text-white" />
      </div>
      <div>
        <h2 id="greeting-message" className="text-lg font-semibold">{userName ? `سلام، ${toPersianDigits(userName)}!` : "سلام!"}</h2>
        <p id="mood-energy-indicator" className="text-sm opacity-90">{toPersianDigits(moodText)}</p>
      </div>
    </div>
    <div className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
      {toPersianDigits(`امتیاز زندگی: ${String(lifeScore)}%`)}
    </div>
  </div>
);

interface GoalProgressItemProps {
  title: string;
  progress: number;
  category?: string;
}

const getGoalCategoryIcon = (category?: string) => {
    const iconProps = { className: "w-3.5 h-3.5" };
    switch (category) {
      case "یادگیری": return <BookIcon {...iconProps} />;
      case "سلامتی": return <HeartIcon {...iconProps} />;
      case "مالی": return <WalletIcon {...iconProps} />;
      default: return <GoalsWidgetIcon {...iconProps} />;
    }
};

const GoalProgressItem: React.FC<GoalProgressItemProps> = ({ title, progress, category }) => {
  const colorClass = progress >= 75 ? "bg-green-500" : progress >= 40 ? "bg-blue-500" : "bg-yellow-500";
  
  return (
    <div className="text-gray-700 text-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <span className="mr-1.5 rtl:ml-1.5 rtl:mr-0 opacity-70">{getGoalCategoryIcon(category)}</span>
          <span className="truncate max-w-[150px] sm:max-w-none">{toPersianDigits(title)}</span>
        </div>
        <span>{`${toPersianDigits(String(progress))}%`}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1 overflow-hidden">
        <div className={`${colorClass} h-1.5 rounded-full transition-all duration-500 ease-out`} style={{ width: `${progress}%` }} role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}></div>
      </div>
    </div>
  );
};

interface TaskDashboardItemProps {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  isCompleted: boolean;
  onToggle: (taskId: string) => void;
}
const TaskDashboardItem: React.FC<TaskDashboardItemProps> = ({ id, title, priority, isCompleted, onToggle }) => {
  const priorityColors = {
    'high': 'text-red-600 bg-red-100 border-red-300',
    'medium': 'text-yellow-600 bg-yellow-100 border-yellow-300',
    'low': 'text-green-600 bg-green-100 border-green-300',
  };
  return (
    <div className="flex items-center justify-between text-gray-700 text-sm py-1">
      <div className="flex items-center">
        <input 
          type="checkbox" 
          className="form-checkbox h-4 w-4 text-indigo-600 rounded-md ml-2 rtl:mr-0 rtl:ml-2 border-gray-300 focus:ring-indigo-500 cursor-pointer"
          checked={isCompleted}
          onChange={() => onToggle(id)}
          aria-labelledby={`task-label-${id}`}
        />
        <span id={`task-label-${id}`} className={`${isCompleted ? "line-through text-gray-400" : ""} truncate max-w-[180px] sm:max-w-none`}>{toPersianDigits(title)}</span>
      </div>
      <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full border ${priorityColors[priority]}`}>
        {toPersianDigits(priority === 'high' ? "بالا" : priority === 'medium' ? "متوسط" : "پایین")}
      </span>
    </div>
  );
};

interface HabitDashboardItemProps {
  id: string;
  title: string;
  weeklyProgressText: string; 
  isCompletedToday: boolean;
  onComplete: (habitId: string) => void;
}
const HabitDashboardItem: React.FC<HabitDashboardItemProps> = ({ id, title, weeklyProgressText, isCompletedToday, onComplete }) => (
  <div className="flex items-center justify-between text-gray-700 text-sm py-1">
    <div className="flex items-center">
      <span className="truncate max-w-[150px] sm:max-w-none">{toPersianDigits(title)}</span>
      <span className="text-purple-600 mr-2 rtl:ml-2 rtl:mr-0 text-xs bg-purple-100 px-1.5 py-0.5 rounded-full">{toPersianDigits(weeklyProgressText)}</span>
    </div>
    <button 
      className={`text-xs px-2.5 py-1 rounded-md transition-colors font-medium ${isCompletedToday ? 'bg-green-100 text-green-700 cursor-not-allowed' : 'bg-purple-500 text-white hover:bg-purple-600'}`}
      onClick={() => onComplete(id)}
      disabled={isCompletedToday}
    >
      {isCompletedToday ? toPersianDigits('تکمیل شد ✅') : toPersianDigits('تکمیل امروز')}
    </button>
  </div>
);

interface Message {
  id: string;
  text: string;
  sender: 'ai' | 'user';
  timestamp: number;
}

interface AISuggestion {
  id: string;
  text: string;
  xaiRationaleKey: string;
}

const xaiExplanationsDb: Record<string, string> = {
  meditation: "هوش مصنوعی تشخیص داد که شما کمتر از حد متوسط خود خوابیده‌اید (۵ ساعت). تحقیقات نشان می‌دهد مدیتیشن می‌تواند به تنظیم مجدد ریتم شبانه‌روزی، کاهش خستگی و افزایش تمرکز در طول روز کمک کند. این یک پیشنهاد فعال برای بهبود بهزیستی شماست.",
  task_priority: "سیستم مهلت‌های نزدیک و نوع وظایف را در نظر می‌گیرد. 'گزارش ماهانه' ۲ روز دیگر سررسید دارد و یک وظیفه تحلیلی است. الگوهای بهره‌وری شما نشان می‌دهد که صبح‌ها برای کارهای تحلیلی مانند گزارش‌نویسی تمرکز بالاتری دارید، لذا اولویت آن افزایش یافت تا اطمینان حاصل شود به موقع تکمیل می‌گردد.",
  autonomous_meditation: "هوش مصنوعی بر اساس الگوهای فعالیت اخیر و سطح استرس گزارش شده (شبیه‌سازی شده)، تشخیص داد که یک جلسه کوتاه مدیتیشن می‌تواند به تمرکز مجدد و کاهش تنش کمک کند. این به صورت خودکار برای راحتی شما شروع شد.",
  autonomous_break: "پس از یک دوره طولانی کار متمرکز (شبیه‌سازی شده از طریق تعامل با برنامه)، هوش مصنوعی یک استراحت کوتاه را برای جلوگیری از فرسودگی شغلی و حفظ بهره‌وری پیشنهاد کرد.",
  autonomous_hydration: "با توجه به زمان سپری شده از آخرین نوشیدنی ثبت شده شما (شبیه‌سازی شده)، هوش مصنوعی یک یادآوری برای نوشیدن آب ارسال کرد تا به هیدراتاسیون مطلوب کمک کند.",
};


const DashboardPage: React.FC<DashboardPageProps> = ({ userName, navigateTo }) => {
  const [moodText, setMoodText] = useState("امروز پرانرژی به نظر می‌رسی! 😊");
  const [lifeScore, setLifeScore] = useState(85);

  const [topGoalsData, setTopGoalsData] = useState<Goal[]>([
    { id: 'g1', title: "یادگیری زبان انگلیسی", progress: 80, category: "یادگیری", status: 'active', actionPlanTasks:[] },
    { id: 'g2', title: "تناسب اندام", progress: 60, category: "سلامتی", status: 'active', actionPlanTasks:[] },
    { id: 'g3', title: "پس‌انداز برای سفر", progress: 45, category: "مالی", status: 'active', actionPlanTasks:[] },
  ]);

  const [importantTasksData, setImportantTasksData] = useState<Task[]>([
    { id: 't1', title: "پاسخ به ایمیل‌های کاری", priority: 'high', completed: false, subTasks:[] },
    { id: 't2', title: "برنامه‌ریزی هفتگی", priority: 'medium', completed: true, subTasks:[] },
    { id: 't3', title: "تماس با مشتری X", priority: 'high', completed: false, subTasks:[] },
  ]);
  
  const [trackedHabitsData, setTrackedHabitsData] = useState([
    { id: 'h1', title: "نوشیدن آب کافی", weeklyProgressText: "۵/۷ روز", isCompletedToday: false, streak: 23, frequency: "daily" as "daily", timeOfDay: "any" as "any", log:[] },
    { id: 'h2', title: "ورزش روزانه", weeklyProgressText: "۳/۷ روز", isCompletedToday: true, streak: 7, frequency: "daily" as "daily", timeOfDay: "any" as "any", log:[] },
  ]);

  const [chatMessages, setChatMessages] = useState<Message[]>([
    { id: 'm1', text: toPersianDigits("سلام! چطور می‌تونم امروز بهت کمک کنم؟"), sender: 'ai', timestamp: Date.now() }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isAiChatLoading, setIsAiChatLoading] = useState(false);
  const chatMessagesEndRef = useRef<HTMLDivElement>(null);

  const [dailyInsight, setDailyInsight] = useState<string | null>(null);
  const [isDailyInsightLoading, setIsDailyInsightLoading] = useState(false);
  
  const [aiSuggestionsData, setAiSuggestionsData] = useState<AISuggestion[]>([
    { id: 'sugg1', text: toPersianDigits("بر اساس الگوی خواب شما در دیشب (۵ ساعت، کمتر از حد معمول)، یک مدیتیشن ۱۰ دقیقه‌ای برای افزایش تمرکز پیشنهاد می‌شود. این می‌تواند به بهبود کیفیت خواب و کاهش خستگی روزانه شما کمک کند."), xaiRationaleKey: 'meditation' },
    { id: 'sugg2', text: toPersianDigits("با توجه به حجم کاری امروز و نزدیک بودن سررسید 'گزارش ماهانه' (۲ روز دیگر)، این وظیفه به بالاترین اولویت شما منتقل شد. AI تشخیص داده که شما در این زمان از روز (صبح) تمرکز بالاتری برای کارهای تحلیلی دارید."), xaiRationaleKey: 'task_priority' },
  ]);
  
  const [suggestionCardStates, setSuggestionCardStates] = useState<Record<string, { visible: boolean; feedbackIcon?: 'accepted' | 'declined' }>>(
    aiSuggestionsData.reduce((acc, sugg) => ({ ...acc, [sugg.id]: { visible: true } }), {})
  );

  const [xaiModalOpen, setXaiModalOpen] = useState(false);
  const [xaiModalContent, setXaiModalContent] = useState({ title: '', explanation: '' });
  const [toastMessage, setToastMessage] = useState<{id: number, text: string, type: 'success' | 'error' | 'info'} | null>(null);

  const [autonomousActions, setAutonomousActions] = useState<AIAutonomousAction[]>([]);
  const [isLoadingAutonomousAction, setIsLoadingAutonomousAction] = useState(false);

  const [domainsData, setDomainsData] = useState<DomainNodeData[]>([]);
  const [connectionsData, setConnectionsData] = useState<ConnectionData[]>([]);
  const [correlationExplanations, setCorrelationExplanations] = useState<CorrelationExplanationData>({});
  const [predictiveInsights, setPredictiveInsights] = useState<PredictiveInsightAlert[]>([]);
  const [isLoadingPredictiveInsights, setIsLoadingPredictiveInsights] = useState(false);
  const [contentFeedItems, setContentFeedItems] = useState<PersonalizedContentItem[]>([]);
  const [isLoadingContentFeed, setIsLoadingContentFeed] = useState(false);
  const [isHolisticScoreModalOpen, setIsHolisticScoreModalOpen] = useState(false);
  const [domainScores, setDomainScores] = useState<DomainScore[]>([]);

  const ai = process.env.API_KEY ? new GoogleGenAI({ apiKey: process.env.API_KEY }) : null;

  const showToast = useCallback((text: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToastMessage({ id: Date.now(), text: toPersianDigits(text), type });
  }, []);

  // --- Data Fetching and Initialization ---
  const fetchDomainsAndConnections = useCallback(async () => {
    setDomainsData([
      { id: 'life', label: 'زندگی', color: 'bg-indigo-500', isCentral: true }, { id: 'health', label: 'سلامت', color: 'bg-red-500' },
      { id: 'work', label: 'کار', color: 'bg-blue-500' }, { id: 'learning', label: 'یادگیری', color: 'bg-purple-500' },
      { id: 'finance', label: 'مالی', color: 'bg-green-500' }, { id: 'relations', label: 'روابط', color: 'bg-pink-500' },
    ]);
    setConnectionsData([
      { sourceId: 'life', targetId: 'health', strength: 2 }, { sourceId: 'life', targetId: 'work', strength: 3 },
      { sourceId: 'life', targetId: 'learning', strength: 1 }, { sourceId: 'life', targetId: 'finance', strength: 2 },
      { sourceId: 'life', targetId: 'relations', strength: 2 }, { sourceId: 'health', targetId: 'work', strength: 2 },
      { sourceId: 'work', targetId: 'finance', strength: 3 }, { sourceId: 'learning', targetId: 'work', strength: 2 },
      { sourceId: 'relations', targetId: 'health', strength: 1 }
    ]);
    setCorrelationExplanations({
        health: { title: toPersianDigits("سلامت و زندگی"), text: toPersianDigits("سلامتی قوی پایه و اساس انرژی و تمرکز در تمام جنبه‌های زندگی است."), relatedDomains: ['life', 'work', 'relations'] },
        work: { title: toPersianDigits("کار و زندگی"), text: toPersianDigits("موفقیت و رضایت شغلی به طور قابل توجهی بر کیفیت کلی زندگی و ثبات مالی تأثیر می‌گذارد."), relatedDomains: ['life', 'finance', 'learning'] },
        learning: { title: toPersianDigits("یادگیری و کار"), text: toPersianDigits("رشد مداوم مهارت‌ها و دانش به پیشرفت شغلی و سازگاری کمک می‌کند."), relatedDomains: ['life', 'work'] },
        finance: { title: toPersianDigits("مالی و کار"), text: toPersianDigits("ثبات مالی استرس را کاهش می‌دهد و امکان تمرکز بهتر بر کار و اهداف شخصی را فراهم می‌کند."), relatedDomains: ['life', 'work'] },
        relations: { title: toPersianDigits("روابط و سلامت"), text: toPersianDigits("روابط اجتماعی قوی و حمایتگر به سلامت روان و جسمی بهتر کمک می‌کند."), relatedDomains: ['life', 'health'] },
        life: { title: toPersianDigits("مرکزیت زندگی"), text: toPersianDigits("تمام حوزه‌ها برای یک زندگی متعادل و شکوفا به هم مرتبط هستند."), relatedDomains: ['health', 'work', 'learning', 'finance', 'relations'] }
    });
  }, []);

  const fetchPredictiveInsights = useCallback(async () => {
    if(!ai) { 
      showToast("کلید API هوش مصنوعی یافت نشد. بینش‌های پیش‌فرض بارگذاری شدند.", "error");
      setPredictiveInsights([
          { id: 'pi1', type: 'warning', icon: <XCircleIcon className="w-5 h-5"/>, title: toPersianDigits('کمبود خواب احتمالی'), text: toPersianDigits('الگوی خواب اخیر شما نشان‌دهنده کمبود استراحت است. این می‌تواند بر تمرکز و انرژی شما تأثیر بگذارد.'), actionText: toPersianDigits('مشاهده نکات بهبود خواب'), actionType: 'navigate', actionTarget: 'Health' },
          { id: 'pi2', type: 'opportunity', icon: <StarIcon className="w-5 h-5"/>, title: toPersianDigits('زمان طلایی برای یادگیری'), text: toPersianDigits('سطح انرژی پیش‌بینی‌شده شما برای ۲ ساعت آینده بالاست. زمان خوبی برای کار روی اهداف یادگیری است.'), actionText: toPersianDigits('مشاهده اهداف یادگیری'), actionType: 'navigate', actionTarget: 'Learning' }
      ]);
      return;
    }
    setIsLoadingPredictiveInsights(true);
    try {
        const prompt = `بر اساس داده‌های فرضی کاربر (مانند الگوی خواب، فعالیت بدنی، وظایف آتی)، ۲ بینش پیش‌بینی‌کننده سلامت یا بهره‌وری به زبان فارسی تولید کن. هر بینش باید شامل type ('warning', 'opportunity', 'forecast'), title, text (متن کامل بینش), actionText (متن دکمه اقدام), actionType ('navigate', 'console'), و actionTarget (نام صفحه یا پیام کنسول) باشد. پاسخ را به صورت آرایه JSON ارائه بده.`;
        const response: GenerateContentResponse = await ai.models.generateContent({ model: AI_MODEL_NAME, contents: prompt, config: { responseMimeType: "application/json" } });
        const data = parseJsonFromString<Omit<PredictiveInsightAlert, 'id' | 'icon'>[]>(response.text);
        
        if (data) {
            const insightsWithIcons: PredictiveInsightAlert[] = data.map((item, index) => {
                let icon: React.ReactNode = <LightbulbIcon className="w-5 h-5"/>;
                if(item.type === 'warning') icon = <XCircleIcon className="w-5 h-5"/>;
                if(item.type === 'opportunity') icon = <StarIcon className="w-5 h-5"/>;
                if(item.type === 'health_insight') icon = <HeartIcon className="w-5 h-5"/>;
                return { ...item, id: `pi-${Date.now()}-${index}`, icon };
            });
            setPredictiveInsights(insightsWithIcons);
        } else {
            throw new Error("Failed to parse JSON response from AI for predictive insights.");
        }
    } catch (error: any) {
        console.error("Error fetching predictive insights:", error);
        if (error.message && error.message.includes("RESOURCE_EXHAUSTED")) {
            showToast("محدودیت استفاده از API هوش مصنوعی برای بینش‌های پیش‌بینی‌کننده اعمال شده است. لطفاً بعداً امتحان کنید یا طرح خود را بررسی کنید.", "error");
        } else {
            showToast("خطا در دریافت بینش‌های پیش‌بینی‌کننده.", "error");
        }
        setPredictiveInsights([
            { id: 'pi1', type: 'warning', icon: <XCircleIcon className="w-5 h-5"/>, title: toPersianDigits('کمبود خواب احتمالی'), text: toPersianDigits('الگوی خواب اخیر شما نشان‌دهنده کمبود استراحت است. این می‌تواند بر تمرکز و انرژی شما تأثیر بگذارد.'), actionText: toPersianDigits('مشاهده نکات بهبود خواب'), actionType: 'navigate', actionTarget: 'Health' },
            { id: 'pi2', type: 'opportunity', icon: <StarIcon className="w-5 h-5"/>, title: toPersianDigits('زمان طلایی برای یادگیری'), text: toPersianDigits('سطح انرژی پیش‌بینی‌شده شما برای ۲ ساعت آینده بالاست. زمان خوبی برای کار روی اهداف یادگیری است.'), actionText: toPersianDigits('مشاهده اهداف یادگیری'), actionType: 'navigate', actionTarget: 'Learning' }
        ]);
    } finally {
        setIsLoadingPredictiveInsights(false);
    }
  }, [ai, showToast]);

  const fetchContentFeed = useCallback(async () => {
    if(!ai) { 
        showToast("کلید API هوش مصنوعی یافت نشد. محتوای پیش‌فرض بارگذاری شد.", "error");
        setContentFeedItems([
            { id: 'cf1', type: 'article', title: 'چگونه تمرکز عمیق را در دنیای پرآشوب امروز پرورش دهیم؟', source: 'وب‌سایت مدیتیشن فردا', url: '#', thumbnailUrl: `https://picsum.photos/seed/article${Date.now()}/300/200` },
            { id: 'cf2', type: 'video', title: 'آموزش تکنیک‌های مدیریت زمان موثر', source: 'کانال یوتیوب بهره‌وری پلاس', url: '#', thumbnailUrl: `https://picsum.photos/seed/video${Date.now()}/300/200` },
            { id: 'cf3', type: 'tip', title: 'نکته روز: برای افزایش خلاقیت، هر روز ۱۵ دقیقه پیاده‌روی کنید.', source: 'LifeOrchestrator AI', url: '#'},
        ]);
        return;
    }
    setIsLoadingContentFeed(true);
    try {
        const interests = topGoalsData.map(g => g.category).join(', ') || 'توسعه فردی';
        const prompt = `بر اساس علایق کاربر (${interests})، ۳ آیتم محتوای شخصی‌سازی شده (مقاله، ویدیو، پادکست، دوره یا نکته) به زبان فارسی پیشنهاد بده. هر آیتم باید شامل type, title, source (منبع) و url باشد. thumbnail_url اختیاری است. پاسخ را به صورت آرایه JSON ارائه بده.`;
        const response: GenerateContentResponse = await ai.models.generateContent({ model: AI_MODEL_NAME, contents: prompt, config: { responseMimeType: "application/json" } });
        const data = parseJsonFromString<Omit<PersonalizedContentItem, 'id'>[]>(response.text);

        if (data) {
            setContentFeedItems(data.map((item, index) => ({...item, id: `cf-${Date.now()}-${index}`})));
        } else {
            throw new Error("Failed to parse JSON response from AI for content feed.");
        }

    } catch (error: any) {
        console.error("Error fetching content feed:", error);
        if (error.message && error.message.includes("RESOURCE_EXHAUSTED")) {
            showToast("محدودیت استفاده از API هوش مصنوعی برای خوراک محتوا اعمال شده است. لطفاً بعداً امتحان کنید یا طرح خود را بررسی کنید.", "error");
        } else {
            showToast("خطا در دریافت خوراک محتوا.", "error");
        }
        setContentFeedItems([
            { id: 'cf1', type: 'article', title: 'چگونه تمرکز عمیق را در دنیای پرآشوب امروز پرورش دهیم؟', source: 'وب‌سایت مدیتیشن فردا', url: '#', thumbnailUrl: `https://picsum.photos/seed/article${Date.now()}/300/200` },
            { id: 'cf2', type: 'video', title: 'آموزش تکنیک‌های مدیریت زمان موثر', source: 'کانال یوتیوب بهره‌وری پلاس', url: '#', thumbnailUrl: `https://picsum.photos/seed/video${Date.now()}/300/200` },
            { id: 'cf3', type: 'tip', title: 'نکته روز: برای افزایش خلاقیت، هر روز ۱۵ دقیقه پیاده‌روی کنید.', source: 'LifeOrchestrator AI', url: '#'},
        ]);
    } finally {
        setIsLoadingContentFeed(false);
    }
  }, [ai, showToast, topGoalsData]);

  const fetchHolisticScoreDetails = useCallback(async () => {
    const simulatedScores: DomainScore[] = [
      { domainName: toPersianDigits("سلامت"), score: Math.floor(Math.random() * 40) + 60, aiRecommendation: toPersianDigits("ادامه دادن به برنامه ورزشی منظم و بررسی بیشتر کیفیت خواب می‌تواند مفید باشد."), icon: <HeartIcon className="w-5 h-5 text-green-400" /> },
      { domainName: toPersianDigits("مالی"), score: Math.floor(Math.random() * 30) + 50, aiRecommendation: toPersianDigits("بررسی مجدد بودجه ماهانه و شناسایی فرصت‌های پس‌انداز بیشتر توصیه می‌شود."), icon: <WalletIcon className="w-5 h-5 text-yellow-400" />},
      { domainName: toPersianDigits("روابط"), score: Math.floor(Math.random() * 20) + 75, aiRecommendation: toPersianDigits("برنامه‌ریزی برای وقت گذراندن با کیفیت با عزیزانتان را در اولویت قرار دهید."), icon: <RelationshipIcon className="w-5 h-5 text-pink-400" /> },
      { domainName: toPersianDigits("کار/بهره‌وری"), score: Math.floor(Math.random() * 40) + 55, aiRecommendation: toPersianDigits("تجزیه وظایف بزرگ به مراحل کوچکتر می‌تواند به مدیریت بهتر حجم کاری کمک کند."), icon: <BriefcaseIcon className="w-5 h-5 text-blue-400" />},
      { domainName: toPersianDigits("یادگیری/رشد"), score: Math.floor(Math.random() * 30) + 65, aiRecommendation: toPersianDigits("اختصاص دادن زمان مشخصی در هفته برای یادگیری مهارت جدید می‌تواند مفید باشد."), icon: <BookIcon className="w-5 h-5 text-purple-400" />},
    ];
    setDomainScores(simulatedScores);
    const overall = Math.round(simulatedScores.reduce((acc, curr) => acc + curr.score, 0) / simulatedScores.length);
    setLifeScore(overall);
  }, []);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  useEffect(() => {
    fetchDomainsAndConnections();
    fetchPredictiveInsights();
    fetchContentFeed();
    fetchHolisticScoreDetails();

    const moods = ["امروز پرانرژی به نظر می‌رسی! 😊", "امیدوارم روز خوبی داشته باشی ✨", "کمی استراحت چطور است؟ ☕"];
    setMoodText(moods[Math.floor(Math.random() * moods.length)]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 
  
  useEffect(() => {
    chatMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);


  const handleSendChatMessage = async () => {
    if (!chatInput.trim() || !ai) return;
    const userMessage: Message = { id: `m${Date.now()}`, text: chatInput, sender: 'user', timestamp: Date.now() };
    setChatMessages(prev => [...prev, userMessage]);
    const currentChatInput = chatInput;
    setChatInput('');
    setIsAiChatLoading(true);

    try {
      const prompt = `کاربر می‌پرسد: "${currentChatInput}". یک پاسخ مفید و دوستانه به زبان فارسی ارائه بده.`;
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: AI_MODEL_NAME,
        contents: prompt,
      });
      const aiResponseText = response.text || toPersianDigits("متاسفانه نتوانستم پاسخ مناسبی پیدا کنم.");
      setChatMessages(prev => [...prev, { id: `m${Date.now() + 1}`, text: aiResponseText, sender: 'ai', timestamp: Date.now() }]);
    } catch (error: any) {
      console.error("AI Chat Error:", error);
      let errorMessageText = toPersianDigits("خطایی در ارتباط با دستیار رخ داد.");
      if (error.message && error.message.includes("RESOURCE_EXHAUSTED")) {
          errorMessageText = toPersianDigits("محدودیت استفاده از API چت هوش مصنوعی اعمال شده است. لطفاً بعداً امتحان کنید.");
          showToast(errorMessageText, "error"); 
      }
      setChatMessages(prev => [...prev, { id: `m${Date.now() + 1}`, text: errorMessageText, sender: 'ai', timestamp: Date.now() }]);
    } finally {
      setIsAiChatLoading(false);
    }
  };

  const handleGenerateDailyInsight = async () => {
    if(!ai) { showToast("کلید API هوش مصنوعی یافت نشد.", "error"); return; }
    setIsDailyInsightLoading(true);
    setDailyInsight(null);
    try {
      const prompt = "یک بینش یا نکته کوتاه و الهام‌بخش برای کاربر در شروع روز به زبان فارسی ارائه بده.";
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: AI_MODEL_NAME,
        contents: prompt,
      });
      setDailyInsight(response.text || toPersianDigits("امروز روز خوبی برای شروعی دوباره است!"));
    } catch (error: any) {
      console.error("Daily Insight Error:", error);
      if (error.message && error.message.includes("RESOURCE_EXHAUSTED")) {
        showToast("محدودیت استفاده از API برای بینش روزانه اعمال شده است.", "error");
        setDailyInsight(toPersianDigits("محدودیت API. لطفاً بعداً دوباره امتحان کنید."));
      } else {
        setDailyInsight(toPersianDigits("خطا در دریافت بینش روزانه."));
      }
    } finally {
      setIsDailyInsightLoading(false);
    }
  };
  
  const handleAISuggestionFeedback = (suggestionId: string, feedback: 'accepted' | 'declined') => {
    setSuggestionCardStates(prev => ({ ...prev, [suggestionId]: { ...prev[suggestionId], feedbackIcon: feedback } }));
    
    setTimeout(() => {
      setSuggestionCardStates(prev => ({ ...prev, [suggestionId]: { ...prev[suggestionId], visible: false } }));
      if (feedback === 'accepted') {
          showToast("پیشنهاد پذیرفته شد.", 'success');
      } else {
          showToast("پیشنهاد رد شد.", 'info');
      }
    }, 1200);
  };

  const handleShowXAI = (title: string, explanation: string) => {
    setXaiModalContent({ title, explanation });
    setXaiModalOpen(true);
  };
  
  const handleToggleTaskCompletion = (taskId: string) => {
    setImportantTasksData(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleCompleteHabitToday = (habitId: string) => {
     setTrackedHabitsData(prevHabits =>
      prevHabits.map(habit =>
        habit.id === habitId ? { ...habit, isCompletedToday: true } : habit
      )
    );
  };

  const triggerAutonomousAction = useCallback(async () => {
    if (isLoadingAutonomousAction || autonomousActions.length > 2 || !ai) return; 

    setIsLoadingAutonomousAction(true);
    try {
      const contexts = [
        "کاربر برای ۲ ساعت بدون وقفه روی وظایف تمرکز کرده است.",
        "کاربر در گزارش خلق و خوی خود، احساس خستگی و استرس کرده است.",
        "زمان زیادی از آخرین باری که کاربر آب نوشیده گذشته است.",
        "هوا آفتابی است و کاربر مدت زیادی در داخل خانه بوده است."
      ];
      const randomContext = contexts[Math.floor(Math.random() * contexts.length)];

      const actionTypes = [
        { type: 'meditation', icon: <LightbulbIcon className="w-5 h-5" />, verb: "شروع کرد", xaiKey: "autonomous_meditation" },
        { type: 'break', icon: <ClockIcon className="w-5 h-5" />, verb: "پیشنهاد کرد", xaiKey: "autonomous_break" },
        { type: 'hydration', icon: <HeartIcon className="w-5 h-5" />, verb: "یادآوری کرد", xaiKey: "autonomous_hydration" },
      ];
      const randomActionType = actionTypes[Math.floor(Math.random() * actionTypes.length)];

      const prompt = `با توجه به زمینه: "${randomContext}", یک اقدام خودمختار سلامتی توسط هوش مصنوعی برای کاربر پیشنهاد شده است. نوع اقدام: ${randomActionType.type}. لطفاً یک متن اقدام ("actionText") مناسب به فارسی بنویس که توضیح دهد هوش مصنوعی چه کاری انجام داده یا پیشنهاد داده است (مثلاً "هوش مصنوعی یک جلسه مدیتیشن ۵ دقیقه‌ای برای شما ${randomActionType.verb}.") و یک دلیل ("xaiReason") کوتاه برای این اقدام ارائه بده. پاسخ را به صورت JSON با کلیدهای "actionText" و "xaiReason" برگردان.`;
      
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: AI_MODEL_NAME,
        contents: prompt,
        config: {responseMimeType: "application/json"}
      });
      
      const parsedData = parseJsonFromString<{actionText: string; xaiReason: string}>(response.text);

      if (parsedData && parsedData.actionText && parsedData.xaiReason) {
        const newAction: AIAutonomousAction = {
          id: `auto-action-${Date.now()}`,
          icon: randomActionType.icon,
          actionText: parsedData.actionText,
          xaiReason: toPersianDigits(parsedData.xaiReason || xaiExplanationsDb[randomActionType.xaiKey] || "هوش مصنوعی این اقدام را برای بهبود سلامتی شما پیشنهاد کرده است."),
          timestamp: new Date().toISOString(),
          cancelActionHandler: () => handleCancelAutonomousAction(`auto-action-${Date.now()}`),
        };
        setAutonomousActions(prev => [newAction, ...prev.slice(0, 2)]); 
        showToast(toPersianDigits(`اقدام جدید توسط AI: ${parsedData.actionText}`), 'info');
      } else {
        throw new Error("Failed to parse JSON response from AI for autonomous action.")
      }
    } catch (error: any) {
      console.error("Error triggering autonomous action:", error);
       if (error.message && error.message.includes("RESOURCE_EXHAUSTED")) {
        showToast("محدودیت API برای اقدامات خودکار AI.", "error");
      }
    } finally {
      setIsLoadingAutonomousAction(false);
    }
  }, [ai, autonomousActions.length, isLoadingAutonomousAction, showToast]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (Math.random() < 0.1) { 
        triggerAutonomousAction();
      }
    }, 30000); 
    return () => clearInterval(intervalId);
  }, [triggerAutonomousAction]);

  const handleCancelAutonomousAction = (actionId: string) => {
    setAutonomousActions(prev => prev.filter(action => action.id !== actionId));
    showToast("اقدام لغو شد.", 'info');
  };

  const handleQuickWellnessAction = (actionType: 'breathing' | 'break' | 'music') => {
    let messageText = ""; 
    switch (actionType) {
      case 'breathing':
        messageText = "تمرین تنفس ۵ دقیقه‌ای شروع شد (شبیه‌سازی شده).";
        break;
      case 'break':
        messageText = " تایمر استراحت ۱۰ دقیقه‌ای فعال شد (شبیه‌سازی شده).";
        break;
      case 'music':
        messageText = "در حال پخش موسیقی تمرکز (شبیه‌سازی شده).";
        break;
    }
    showToast(messageText, 'success');
  };

  const handlePredictiveInsightAction = (insight: PredictiveInsightAlert) => {
    if (insight.actionType === 'navigate' && insight.actionTarget) {
      navigateTo(insight.actionTarget as PageName);
    } else if (insight.actionType === 'console') {
      console.log(`Action for insight "${insight.title}": ${insight.actionTarget}`);
      showToast(toPersianDigits(`اقدام برای "${insight.title}" انجام شد (شبیه‌سازی).`), 'info');
    }
  };


  return (
    <div className="page">
      <WelcomeCard userName={userName} moodText={moodText} lifeScore={lifeScore} />
      
      <div className="mb-6">
        <button 
          onClick={() => setIsHolisticScoreModalOpen(true)} 
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3.5 rounded-xl shadow-lg hover:shadow-xl hover:opacity-90 transition-all flex items-center justify-center text-sm font-medium"
        >
            <StarIcon className="w-5 h-5 mr-2"/> {toPersianDigits("مشاهده جزئیات امتیاز جامع زندگی")}
        </button>
      </div>
      
      <h3 className="text-xl font-semibold mb-4 text-gray-800">{toPersianDigits("داشبورد اصلی")}</h3>

      <WidgetCard
        title={toPersianDigits("روتین‌های سریع سلامتی")}
        icon={<HeartIcon className="w-5 h-5 text-pink-600" />}
        titleColorClass="text-pink-700"
        className="border-pink-200/70 mb-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button 
            onClick={() => handleQuickWellnessAction('breathing')}
            className="flex items-center justify-center text-xs py-2 px-3 bg-sky-100 hover:bg-sky-200 text-sky-700 rounded-md transition-colors"
          >
            <AdjustmentsVerticalIcon className="w-4 h-4 mr-1.5 rtl:ml-1.5 rtl:mr-0"/> {toPersianDigits("تمرین تنفس")}
          </button>
          <button 
            onClick={() => handleQuickWellnessAction('break')}
            className="flex items-center justify-center text-xs py-2 px-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-md transition-colors"
          >
            <ClockIcon className="w-4 h-4 mr-1.5 rtl:ml-1.5 rtl:mr-0"/> {toPersianDigits("استراحت کوتاه")}
          </button>
          <button 
            onClick={() => handleQuickWellnessAction('music')}
            className="flex items-center justify-center text-xs py-2 px-3 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-md transition-colors"
          >
            <PlayIcon className="w-4 h-4 mr-1.5 rtl:ml-1.5 rtl:mr-0"/> {toPersianDigits("موسیقی تمرکز")}
          </button>
        </div>
      </WidgetCard>

      {autonomousActions.length > 0 && (
        <WidgetCard
            title={toPersianDigits("اقدامات خودکار AI")}
            icon={<ActivityLogIcon className="w-5 h-5 text-cyan-600" />}
            titleColorClass="text-cyan-700"
            className="border-cyan-200/70 mb-6"
        >
            <div className="space-y-3">
                {autonomousActions.map(action => (
                    <AutonomousActionCard 
                        key={action.id} 
                        action={action} 
                        onShowXai={(reason) => handleShowXAI(toPersianDigits("دلیل اقدام خودکار AI"), reason)}
                    />
                ))}
            </div>
        </WidgetCard>
      )}

       <WidgetCard title={toPersianDigits("ارتباط حوزه‌های زندگی شما")} icon={<AiSparkleIcon className="w-5 h-5 text-teal-600" />} className="mb-6 border-teal-200/70" titleColorClass="text-teal-700">
        <InterconnectednessGraph domains={domainsData} connections={connectionsData} explanations={correlationExplanations} />
      </WidgetCard>

      <WidgetCard title={toPersianDigits("بینش‌های پیش‌بینی‌کننده AI")} icon={<LightbulbIcon className="w-5 h-5 text-orange-600" />} className="mb-6 border-orange-200/70" titleColorClass="text-orange-700">
        {isLoadingPredictiveInsights ? <LoadingSpinner /> :
          predictiveInsights.length > 0 ? (
            <div className="space-y-3">
              {predictiveInsights.map(insight => (
                <PredictiveInsightCard key={insight.id} insight={insight} onAction={handlePredictiveInsightAction} />
              ))}
            </div>
          ) : <p className="text-xs text-gray-500 text-center">{toPersianDigits("بینش جدیدی برای نمایش وجود ندارد.")}</p>
        }
      </WidgetCard>
      
      <WidgetCard title={toPersianDigits("خوراک محتوای شخصی‌سازی شده")} icon={<BookIcon className="w-5 h-5 text-lime-600" />} className="mb-6 border-lime-200/70" titleColorClass="text-lime-700">
        {isLoadingContentFeed ? <LoadingSpinner /> :
          contentFeedItems.length > 0 ? (
            <div className="flex overflow-x-auto space-x-3 space-x-reverse pb-2 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
              {contentFeedItems.map(item => (
                <ContentFeedCard key={item.id} item={item} />
              ))}
            </div>
          ) : <p className="text-xs text-gray-500 text-center">{toPersianDigits("محتوای جدیدی برای نمایش وجود ندارد.")}</p>
        }
      </WidgetCard>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <WidgetCard 
            title={toPersianDigits("اهداف برتر")} 
            icon={<GoalsWidgetIcon className="w-5 h-5 text-blue-600"/>} 
            titleColorClass="text-blue-700"
            onViewAllClick={() => navigateTo('Goals')}
            className="border-blue-200/70"
        >
          {topGoalsData.map(goal => (
            <GoalProgressItem 
                key={goal.id} 
                title={goal.title} 
                progress={goal.progress} 
                category={goal.category}
            />
          ))}
        </WidgetCard>

        <WidgetCard 
            title={toPersianDigits("وظایف مهم امروز")} 
            icon={<TasksWidgetIcon className="w-5 h-5 text-indigo-600"/>} 
            titleColorClass="text-indigo-700"
            onViewAllClick={() => navigateTo('Tasks')}
            className="border-indigo-200/70"
        >
            {importantTasksData.map(task => (
                <TaskDashboardItem 
                    key={task.id}
                    id={task.id}
                    title={task.title} 
                    priority={task.priority}
                    isCompleted={task.completed}
                    onToggle={handleToggleTaskCompletion}
                />
            ))}
        </WidgetCard>

        <WidgetCard 
            title={toPersianDigits("عادات در حال پیگیری")} 
            icon={<HabitsWidgetIcon className="w-5 h-5 text-purple-600"/>} 
            titleColorClass="text-purple-700"
            onViewAllClick={() => navigateTo('Habits')} 
            className="md:col-span-2 border-purple-200/70"
        >
             {trackedHabitsData.map(habit => (
                <HabitDashboardItem 
                    key={habit.id}
                    id={habit.id}
                    title={habit.title}
                    weeklyProgressText={habit.weeklyProgressText}
                    isCompletedToday={habit.isCompletedToday}
                    onComplete={handleCompleteHabitToday}
                />
             ))}
        </WidgetCard>
      </div>

      <div className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full flex items-center justify-center mb-3 shadow-lg">
          <AiSparkleIcon className="w-12 h-12 text-indigo-600" />
        </div>
        <p className="text-md font-medium text-gray-700 mb-3">{toPersianDigits("با دستیار هوش مصنوعی خود صحبت کنید:")}</p>

        <div className="w-full flex flex-col h-72 bg-white rounded-xl shadow-lg p-3 mb-4 border border-gray-200/80">
            <div id="ai-chat-messages" className="chat-messages-container flex-grow overflow-y-auto p-2 space-y-2.5">
                {chatMessages.map(msg => (
                    <div key={msg.id} className={`chat-message ${msg.sender === 'user' ? 'user' : ''}`}>
                        {toPersianDigits(msg.text)}
                    </div>
                ))}
                {isAiChatLoading && <div className="chat-message"><LoadingSpinner size="sm" color="text-indigo-600" /></div>}
                <div ref={chatMessagesEndRef} />
            </div>
            <div className="relative mt-auto pt-2.5 border-t border-gray-200/80">
                <input 
                    type="text" 
                    id="ai-chat-input" 
                    placeholder={toPersianDigits("پیام خود را بنویسید...")}
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !isAiChatLoading && handleSendChatMessage()}
                    className="w-full p-3 pl-12 rtl:pr-12 rtl:pl-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 shadow-sm text-sm"
                />
                <button onClick={handleSendChatMessage} disabled={isAiChatLoading || !chatInput.trim()} className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 -translate-y-1/2 mt-1 text-indigo-500 hover:text-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                    <PaperAirplaneIcon className="w-6 h-6 transform rtl:scale-x-[-1]" />
                </button>
            </div>
        </div>
      </div>
      
      <div className="flex flex-col items-center mb-6">
        <button 
            onClick={handleGenerateDailyInsight} 
            disabled={isDailyInsightLoading || !ai}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3.5 rounded-xl shadow-lg hover:shadow-xl hover:opacity-90 transition-all w-full flex items-center justify-center disabled:opacity-70 text-sm font-medium">
          {isDailyInsightLoading ? (
            <LoadingSpinner size="sm" color="text-white"/>
          ) : (
            <>
              <span className="ml-2 rtl:mr-2 rtl:ml-0">{toPersianDigits("✨ دریافت بینش روزانه")}</span>
              <StarIcon className="w-5 h-5" />
            </>
          )}
        </button>
        {dailyInsight && (
            <div id="daily-insight-output" className={`bg-purple-50 p-4 rounded-xl shadow-md border border-purple-200/80 mt-4 w-full`}>
                <h3 className="font-semibold text-purple-700 mb-2 text-sm">{toPersianDigits("بینش روزانه شما:")}</h3>
                <p id="daily-insight-text" className="text-gray-700 text-sm leading-relaxed">{toPersianDigits(dailyInsight)}</p>
            </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {aiSuggestionsData.filter(sugg => suggestionCardStates[sugg.id]?.visible).map(sugg => (
          <div 
            key={sugg.id} 
            id={`ai-suggestion-card-${sugg.id}`} 
            className={`bg-indigo-50 p-4 rounded-xl shadow-md border border-indigo-200/80 suggestion-card ${!suggestionCardStates[sugg.id]?.visible ? 'suggestion-card-fade-out' : ''}`}
            >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-indigo-700 text-sm flex items-center"><AiSparkleIcon className="w-4 h-4 text-yellow-500 ml-1.5 rtl:mr-1.5 rtl:ml-0"/>{toPersianDigits("پیشنهاد هوش مصنوعی:")}</h3>
              <button 
                className="text-indigo-500 hover:text-indigo-700 transition-colors disabled:opacity-50" 
                onClick={() => handleShowXAI(toPersianDigits("توضیح پیشنهاد AI"), xaiExplanationsDb[sugg.xaiRationaleKey] || toPersianDigits("توضیح در دسترس نیست."))}
                disabled={!!suggestionCardStates[sugg.id]?.feedbackIcon}
                 aria-label={toPersianDigits("چرا این پیشنهاد؟")}
              >
                <LightbulbIcon className="w-5 h-5"/>
              </button>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{toPersianDigits(sugg.text)}</p>
            <div className="flex justify-end gap-2 mt-3.5 pt-2.5 border-t border-indigo-200/50">
            {!suggestionCardStates[sugg.id]?.feedbackIcon ? (
                <>
                    <button className="bg-green-500 text-white text-xs px-3 py-1.5 rounded-md hover:bg-green-600 transition-colors flex items-center" onClick={() => handleAISuggestionFeedback(sugg.id, 'accepted')}>
                       <span className={`suggestion-button-feedback accepted ${suggestionCardStates[sugg.id]?.feedbackIcon === 'accepted' ? 'show' : ''}`}>✅</span>
                       {toPersianDigits("پذیرش")}
                    </button>
                    <button className="bg-red-500 text-white text-xs px-3 py-1.5 rounded-md hover:bg-red-600 transition-colors flex items-center" onClick={() => handleAISuggestionFeedback(sugg.id, 'declined')}>
                        <span className={`suggestion-button-feedback declined ${suggestionCardStates[sugg.id]?.feedbackIcon === 'declined' ? 'show' : ''}`}>❌</span>
                        {toPersianDigits("رد")}
                    </button>
                </>
            ) : (
                <span className={`text-xs font-medium flex items-center px-3 py-1.5 rounded-md ${suggestionCardStates[sugg.id]?.feedbackIcon === 'accepted' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {suggestionCardStates[sugg.id]?.feedbackIcon === 'accepted' ? <CheckCircleIcon className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0"/> : <XCircleIcon className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0"/>}
                    {toPersianDigits(suggestionCardStates[sugg.id]?.feedbackIcon === 'accepted' ? "پذیرفته شد" : "رد شد")}
                </span>
            )}
            </div>
          </div>
        ))}
      </div>
      
      <XAIModal isOpen={xaiModalOpen} onClose={() => setXaiModalOpen(false)} title={xaiModalContent.title}>
          <p className="text-sm text-gray-700 leading-relaxed">{toPersianDigits(xaiModalContent.explanation)}</p>
      </XAIModal>
      {toastMessage && (
        <ToastNotification
          message={toastMessage.text}
          type={toastMessage.type}
          isVisible={!!toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}
      <HolisticScoreDetailModal 
        isOpen={isHolisticScoreModalOpen} 
        onClose={() => setIsHolisticScoreModalOpen(false)}
        overallScore={lifeScore}
        domainScoresData={domainScores}
      />
    </div>
  );
};

export default DashboardPage;
```
    </content>
  </change>
  <change>
    <file>components/pages/goals/GoalCard.tsx</file>
    <description>Correct import for Goal from '../../../types/learningTypes'. Update LearningSuggestion type for onViewSuggestion to `LearningSuggestion['type']`. Ensure onToggleStatus prop correctly matches the Goal['status'] type which now includes 'planning'.</description>
    <content><![CDATA[
import React, { useState } from 'react';
import { toPersianDigits } from '../../../utils';
import { 
    TargetIcon as DefaultGoalIcon, 
    SparklesIconNav as SparklesIcon, 
    PencilIcon, 
    TrashIcon, 
    PlayIcon, 
    PauseIcon,
    BookIcon, 
    BriefcaseIcon, 
    HeartIcon, 
    WalletIcon, 
    CheckCircleIcon,
    ChevronDownIcon, 
    ChevronUpIcon,   
    AcademicCapIcon, 
} from '../../shared/AppIcons';
import { Goal, LearningSuggestion } from '../../../types/learningTypes'; 
import AISmartLearningSuggestionCard from '../../learning/AISmartLearningSuggestionCard';
import { PageName } from '../../../App';

interface GoalCardProps {
  goal: Goal; 
  onEdit: (goal: Goal) => void;
  onDelete: (goalId: string) => void;
  onToggleStatus: (goalId: string, newStatus: Goal['status']) => void; 
  onUpdateProgress?: (goalId: string, newProgress: number) => void;
  navigateToLearningItem?: (type: LearningSuggestion['type'], itemId: string) => void; 
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, onEdit, onDelete, onToggleStatus, onUpdateProgress, navigateToLearningItem }) => {
  const [showSkills, setShowSkills] = useState(false);
  
  const getCategoryIcon = (category?: string) => {
    const iconClass = "w-5 h-5"; 
    switch (category) {
        case "یادگیری": return <BookIcon className={`${iconClass} text-blue-500`} />;
        case "شغلی": return <BriefcaseIcon className={`${iconClass} text-purple-500`} />;
        case "سلامتی": return <HeartIcon className={`${iconClass} text-red-500`} />;
        case "مالی": return <WalletIcon className={`${iconClass} text-green-500`} />;
        case "سفر": return <DefaultGoalIcon className={`${iconClass} text-cyan-500`} />; 
        case "رشد شخصی": return <DefaultGoalIcon className={`${iconClass} text-teal-500`} />; 
        case "روابط": return <DefaultGoalIcon className={`${iconClass} text-pink-500`} />; 
        case "پروژه خلاق": return <DefaultGoalIcon className={`${iconClass} text-orange-500`} />; 
        default: return <DefaultGoalIcon className={`${iconClass} text-indigo-500`} />;
    }
  };

  const progressColorClass = () => {
    if (goal.progress >= 80) return 'bg-green-500';
    if (goal.progress >= 50) return 'bg-blue-500';
    if (goal.progress >= 20) return 'bg-yellow-500';
    return 'bg-indigo-500'; 
  };
  
  const isOverdue = goal.dueDate && new Date(goal.dueDate) < new Date(new Date().setHours(0,0,0,0)) && goal.status !== 'completed';

  return (
    <div className={`goal-card bg-white p-4 sm:p-5 rounded-xl shadow-md border ${isOverdue ? 'border-red-400 bg-red-50/50' : 'border-gray-200 hover:border-indigo-300'} transition-all duration-300`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center min-w-0"> 
          <div className={`p-2 rounded-full mr-3 rtl:ml-3 rtl:mr-0 ${goal.status === 'completed' ? 'bg-gray-200' : 'bg-indigo-100'}`}>
            {getCategoryIcon(goal.category)}
          </div>
          <div className="flex-grow min-w-0"> 
            <h3 className={`text-md sm:text-lg font-semibold truncate ${goal.status === 'completed' ? 'text-gray-500 line-through' : 'text-indigo-700'}`}>{toPersianDigits(goal.title)}</h3>
            {goal.category && <p className="text-xs text-gray-500">{toPersianDigits(goal.category)}</p>}
          </div>
        </div>
        {goal.dueDate && <p className={`text-xs ${isOverdue ? 'text-red-600 font-semibold' : 'text-gray-500'} whitespace-nowrap`}>{toPersianDigits(`سررسید: ${new Date(goal.dueDate).toLocaleDateString('fa-IR')}`)}</p>}
      </div>

      {goal.description && <p className="text-sm text-gray-600 mb-3 leading-relaxed line-clamp-2">{toPersianDigits(goal.description)}</p>}

      {goal.status !== 'completed' && (
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>{toPersianDigits("پیشرفت")}</span>
            <span>{`${toPersianDigits(String(goal.progress))}%`}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 relative overflow-hidden">
            <div
              className={`h-2.5 rounded-full transition-all duration-500 ease-out ${progressColorClass()}`}
              style={{ width: `${goal.progress}%` }}
              role="progressbar"
              aria-valuenow={goal.progress}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
          </div>
        </div>
      )}
      {goal.status === 'completed' && (
        <div className="text-center py-2 my-2 bg-green-50 text-green-700 rounded-md text-sm font-medium flex items-center justify-center">
            <CheckCircleIcon className="w-5 h-5 ml-2"/> {toPersianDigits("این هدف تکمیل شده است!")}
        </div>
      )}

      {goal.aiNextStep && goal.status !== 'completed' && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <h4 className="text-xs font-semibold text-indigo-600 mb-1 flex items-center">
              <SparklesIcon className="w-4 h-4 mr-1.5 text-yellow-500" />
              {toPersianDigits("قدم بعدی پیشنهادی هوش مصنوعی:")}
          </h4>
          <p className="text-xs text-gray-600">{toPersianDigits(goal.aiNextStep)}</p>
          {goal.aiNextStepRationale && <p className="text-[10px] text-gray-500 italic mt-0.5">{toPersianDigits(`(${goal.aiNextStepRationale})`)}</p>}
        </div>
      )}

      {goal.learningSuggestions && goal.learningSuggestions.length > 0 && goal.status !== 'completed' && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <button
            onClick={() => setShowSkills(!showSkills)}
            className="w-full flex justify-between items-center text-xs font-semibold text-sky-600 hover:text-sky-700 py-1"
            aria-expanded={showSkills}
          >
            <span className="flex items-center">
              <AcademicCapIcon className="w-4 h-4 mr-1.5" />
              {toPersianDigits("مهارت‌های مورد نیاز پیشنهادی AI")}
            </span>
            {showSkills ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />}
          </button>
          {showSkills && (
            <div className="mt-2 space-y-2">
              {goal.learningSuggestions.map(suggestion => (
                <AISmartLearningSuggestionCard 
                  key={suggestion.id} 
                  suggestion={suggestion} 
                  onViewSuggestion={(type, itemId) => navigateToLearningItem && navigateToLearningItem(type, itemId)}
                />
              ))}
            </div>
          )}
        </div>
      )}


      <div className="mt-4 flex flex-wrap gap-2 justify-end text-xs">
        {goal.status !== 'completed' && (
          <>
            <button onClick={() => onEdit(goal)} className="py-1.5 px-3 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded-md transition-colors flex items-center">
              <PencilIcon className="w-3.5 h-3.5 mr-1"/>{toPersianDigits("ویرایش")}
            </button>
            <button 
              onClick={() => onToggleStatus(goal.id, goal.status === 'active' ? 'paused' : 'active')} 
              className={`py-1.5 px-3 rounded-md transition-colors flex items-center ${goal.status === 'paused' ? 'bg-green-100 hover:bg-green-200 text-green-700' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
              >
              {goal.status === 'paused' ? <PlayIcon className="w-3.5 h-3.5 mr-1"/> : <PauseIcon className="w-3.5 h-3.5 mr-1"/>}
              {toPersianDigits(goal.status === 'paused' ? "فعال کردن" : "متوقف کردن")}
            </button>
            <button onClick={() => onToggleStatus(goal.id, 'completed')} className="py-1.5 px-3 bg-teal-100 hover:bg-teal-200 text-teal-700 rounded-md transition-colors flex items-center">
                <CheckCircleIcon className="w-3.5 h-3.5 mr-1"/>{toPersianDigits("تکمیل هدف")}
            </button>
          </>
        )}
        <button onClick={() => onDelete(goal.id)} className="py-1.5 px-3 bg-red-100 hover:bg-red-200 text-red-700 rounded-md transition-colors flex items-center">
          <TrashIcon className="w-3.5 h-3.5 mr-1"/>{toPersianDigits("حذف")}
        </button>
      </div>
    </div>
  );
};

export default GoalCard;
```
  </change>
  <change>
    <file>components/pages/goals/GoalsPage.tsx</file>
    <description>Updated AddGoalModalProps import alias. Change filterStatus type cast in select onChange to `Goal['status'] | 'all'`. Updated Goal and related type imports from learningTypes.ts. Ensure correct string formatting in AI prompts. Removed extraneous text.</description>
    <content><![CDATA[
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { toPersianDigits, parseJsonFromString } from '../../../utils';
import { 
  TargetIcon as PageIcon, 
  PlusIcon, 
  CheckCircleIcon as CompletedIcon, 
  AdjustmentsVerticalIcon,
  SparklesIconNav as AiIcon,
  LightbulbIcon,
  TrashIcon,
  PencilIcon,
  PlayIcon,
  PauseIcon,
  BookIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  AcademicCapIcon,
  ChartPieIcon // For dashboard stats
} from '../../shared/AppIcons';
import AddGoalModal, { AddGoalModalProps } from './AddGoalModal'; 
import GoalCard from './GoalCard'; 
import LoadingSpinner from '../../shared/LoadingSpinner';
import ToastNotification from '../../shared/ToastNotification';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { LearningPath, LearningContent, LearningSuggestion, Goal, GoalActionPlanTask } from '../../../types/learningTypes'; 
import { PageName } from '../../../App';
import AISmartLearningSuggestionCard from '../../learning/AISmartLearningSuggestionCard';
import CollapsibleSection from '../../shared/CollapsibleSection';


const AI_MODEL_NAME = 'gemini-2.5-flash-preview-04-17';
const GOALS_LOCAL_STORAGE_KEY = 'lifeOrchestrator_goalsData_v2';


export interface GoalsPageProps {
    isAddGoalModalOpen: boolean;
    openAddGoalModal: () => void;
    closeAddGoalModal: () => void;
    navigateTo: (pageName: PageName | string, params?: any) => void;
    learningPaths?: LearningPath[];
    learningContent?: LearningContent[];
}

const GoalsPage: React.FC<GoalsPageProps> = ({ 
    isAddGoalModalOpen, 
    openAddGoalModal, 
    closeAddGoalModal, 
    navigateTo,
    learningPaths = [],
    learningContent = [] 
}) => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [toast, setToast] = useState<{id: number, message: string, type: 'success'|'error'|'info'} | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filterStatus, setFilterStatus] = useState<Goal['status'] | 'all'>('active'); 
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const ai = process.env.API_KEY ? new GoogleGenAI({ apiKey: process.env.API_KEY }) : null;
  
  const showToast = useCallback((message: string, type: 'success'|'error'|'info' = 'info') => {
    setToast({ id: Date.now(), message: toPersianDigits(message), type });
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Load goals from localStorage
  useEffect(() => {
    setIsLoading(true);
    try {
        const storedGoals = localStorage.getItem(GOALS_LOCAL_STORAGE_KEY);
        if (storedGoals) {
            setGoals(JSON.parse(storedGoals));
        } else {
            const mockGoals: Goal[] = [
              { id: 'g1', title: toPersianDigits('یادگیری زبان فرانسه تا سطح B1'), progress: 65, status: 'active', category: "یادگیری", dueDate: "1403-09-30", description: toPersianDigits("توانایی مکالمه روان در مورد موضوعات روزمره و درک مطلب خوب."), learningSuggestions: [ {id: 'lsg1', type:'path', itemId:'lp-french', title:toPersianDigits('مسیر کامل یادگیری زبان فرانسه'), description:toPersianDigits('از مبتدی تا پیشرفته زبان فرانسه را بیاموزید.'), sourceModule:'Goals', triggerContext:toPersianDigits('هدف: یادگیری فرانسه')} ] },
              { id: 'g2', title: toPersianDigits('افزایش آمادگی جسمانی'), progress: 30, status: 'active', category: "سلامتی", dueDate: "1403-06-30", description: toPersianDigits("حداقل ۳ بار در هفته ورزش و رعایت رژیم غذایی سالم."), actionPlanTasks: [{id: 'g2t1', title: toPersianDigits('ثبت نام در باشگاه'), completed: true, estimatedDurationMinutes: 60}, {id: 'g2t2', title: toPersianDigits('برنامه ورزشی هفتگی'), completed: false, estimatedDurationMinutes: 30}] },
            ];
            setGoals(mockGoals);
        }
    } catch (error) {
        console.error("Failed to load goals from localStorage:", error);
        showToast("خطا در بارگذاری اهداف از حافظه محلی.", "error");
    }
    setIsLoading(false);
  }, [showToast]);

  // Save goals to localStorage whenever they change
  useEffect(() => {
    try {
        localStorage.setItem(GOALS_LOCAL_STORAGE_KEY, JSON.stringify(goals));
    } catch (error) {
        console.error("Failed to save goals to localStorage:", error);
        showToast("خطا در ذخیره اهداف در حافظه محلی.", "error");
    }
  }, [goals, showToast]);


  const handleSaveGoal = (goalData: Omit<Goal, 'id' | 'progress' | 'status'>) => {
    if (editingGoal) {
      setGoals(goals.map(g => g.id === editingGoal.id ? { ...editingGoal, ...goalData, progress: g.progress, status: g.status } : g));
      showToast("هدف با موفقیت ویرایش شد.", "success");
    } else {
      const newGoal: Goal = {
        ...goalData,
        id: String(Date.now()),
        progress: 0,
        status: 'active', 
      };
      setGoals(prevGoals => [newGoal, ...prevGoals]);
      showToast("هدف جدید با موفقیت اضافه شد.", "success");
    }
    closeAddGoalModal();
    setEditingGoal(null);
  };
  
  const handleEditGoal = (goal: Goal) => {
    setEditingGoal(goal);
    openAddGoalModal();
  };

  const handleDeleteGoal = (goalId: string) => {
    if (window.confirm(toPersianDigits("آیا از حذف این هدف مطمئن هستید؟"))) {
      setGoals(goals.filter(g => g.id !== goalId));
      showToast("هدف حذف شد.", "info");
    }
  };

  const handleToggleStatus = (goalId: string, newStatus: Goal['status']) => {
    setGoals(goals.map(g => g.id === goalId ? { ...g, status: newStatus, progress: newStatus === 'completed' ? 100 : g.progress } : g));
    if (newStatus === 'completed') {
      showToast("تبریک! هدف شما تکمیل شد.", "success");
    }
  };
  
  const handleUpdateProgress = (goalId: string, newProgress: number) => {
     setGoals(goals.map(g => g.id === goalId ? { ...g, progress: newProgress, status: newProgress === 100 ? 'completed' : g.status } : g));
  };

  const handleNavigateToLearningItem = (type: LearningSuggestion['type'], itemId: string) => {
    if (navigateTo) {
        navigateTo('Learning', { view: 'detail', type, itemId });
    } else {
      console.warn("navigateTo function is not provided to GoalsPage");
      alert(toPersianDigits(`مشاهده ${type === 'path' ? 'مسیر' : 'محتوا'} با شناسه ${itemId} (شبیه‌سازی شده)`));
    }
  };

  const filteredGoals = goals.filter(goal => {
    const statusMatch = filterStatus === 'all' || goal.status === filterStatus;
    const categoryMatch = filterCategory === 'all' || goal.category === filterCategory;
    return statusMatch && categoryMatch;
  });
  
  const goalCategoriesForFilter = useMemo(() => {
    const uniqueCategories = new Set(goals.map(g => g.category).filter((category): category is string => typeof category === 'string' && category.trim() !== ''));
    return Array.from(uniqueCategories).map(cat => ({value: cat, label: cat }));
  }, [goals]);

  // Productivity Stats
  const totalGoals = goals.length;
  const activeGoalsCount = goals.filter(g => g.status === 'active').length;
  const completedGoalsCount = goals.filter(g => g.status === 'completed').length;
  const averageProgress = totalGoals > 0 ? Math.round(goals.reduce((sum, g) => sum + g.progress, 0) / totalGoals) : 0;


  return (
    <div className="page">
      {toast && <ToastNotification message={toast.message} type={toast.type} isVisible={!!toast} onClose={() => setToast(null)} />}
      <AddGoalModal 
        isOpen={isAddGoalModalOpen} 
        onClose={() => {closeAddGoalModal(); setEditingGoal(null);}} 
        onSaveGoal={handleSaveGoal} 
        initialGoalData={editingGoal}
      />

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
        <div className="flex items-center">
            <PageIcon className="w-7 h-7 text-indigo-600 mr-3 rtl:ml-3 rtl:mr-0" />
            <h1 className="text-2xl font-semibold text-gray-800">{toPersianDigits("اهداف من")}</h1>
        </div>
        <button
            onClick={() => { setEditingGoal(null); openAddGoalModal(); }}
            className="w-full sm:w-auto flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition-colors shadow hover:shadow-md"
        >
            <PlusIcon className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />
            {toPersianDigits("افزودن هدف جدید")}
        </button>
      </div>

       {/* Productivity Dashboard Section */}
      <CollapsibleSection title="داشبورد بهره‌وری اهداف" icon={<ChartPieIcon />} isOpen={true} onToggle={() => {}} className="mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-200/80" titleColorClass="text-gray-700">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
          <div className="p-2 bg-indigo-50 rounded-md">
            <p className="font-semibold text-indigo-700 text-lg">{toPersianDigits(String(totalGoals))}</p>
            <p className="text-gray-600">{toPersianDigits("کل اهداف")}</p>
          </div>
          <div className="p-2 bg-green-50 rounded-md">
            <p className="font-semibold text-green-700 text-lg">{toPersianDigits(String(activeGoalsCount))}</p>
            <p className="text-gray-600">{toPersianDigits("فعال")}</p>
          </div>
          <div className="p-2 bg-blue-50 rounded-md">
            <p className="font-semibold text-blue-700 text-lg">{toPersianDigits(String(completedGoalsCount))}</p>
            <p className="text-gray-600">{toPersianDigits("تکمیل شده")}</p>
          </div>
          <div className="p-2 bg-yellow-50 rounded-md">
            <p className="font-semibold text-yellow-700 text-lg">{`${toPersianDigits(String(averageProgress))}%`}</p>
            <p className="text-gray-600">{toPersianDigits("میانگین پیشرفت")}</p>
          </div>
        </div>
      </CollapsibleSection>


      <button onClick={() => setShowFilters(!showFilters)} className="w-full flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-gray-200 mb-4 text-sm text-gray-700 hover:bg-gray-50">
        <span className="font-medium">{toPersianDigits("فیلترها و مرتب‌سازی")}</span>
        {showFilters ? <ChevronUpIcon className="w-5 h-5"/> : <ChevronDownIcon className="w-5 h-5"/>}
      </button>

      {showFilters && (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <label htmlFor="filterStatus" className="block text-xs font-medium text-gray-700 mb-1">{toPersianDigits("وضعیت:")}</label>
            <select id="filterStatus" value={filterStatus} onChange={e => setFilterStatus(e.target.value as Goal['status'] | 'all')} className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white">
              <option value="all">{toPersianDigits("همه وضعیت‌ها")}</option>
              <option value="active">{toPersianDigits("فعال")}</option>
              <option value="paused">{toPersianDigits("متوقف شده")}</option>
              <option value="completed">{toPersianDigits("تکمیل شده")}</option>
              <option value="planning">{toPersianDigits("در حال برنامه‌ریزی")}</option>
            </select>
          </div>
          <div>
            <label htmlFor="filterCategory" className="block text-xs font-medium text-gray-700 mb-1">{toPersianDigits("دسته‌بندی:")}</label>
            <select id="filterCategory" value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white">
              <option value="all">{toPersianDigits("همه دسته‌بندی‌ها")}</option>
              {goalCategoriesForFilter.map(cat => <option key={cat.value} value={cat.value}>{toPersianDigits(cat.label)}</option>)}
            </select>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-64"><LoadingSpinner size="lg" /></div>
      ) : filteredGoals.length === 0 ? (
         <div className="text-center py-10 bg-gray-100 rounded-xl shadow-inner border border-gray-200 min-h-[300px] flex flex-col justify-center items-center">
            <PageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4 opacity-70" />
            <p className="text-gray-600 font-semibold">{toPersianDigits("هنوز هدفی با این فیلترها یافت نشد.")}</p>
            <p className="text-sm text-gray-500 mt-1">{toPersianDigits("یک هدف جدید اضافه کنید یا فیلترها را تغییر دهید.")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGoals.map(goal => (
            <GoalCard 
              key={goal.id} 
              goal={goal} 
              onEdit={handleEditGoal}
              onDelete={handleDeleteGoal}
              onToggleStatus={handleToggleStatus}
              onUpdateProgress={handleUpdateProgress}
              navigateToLearningItem={handleNavigateToLearningItem}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GoalsPage;
```
    </content>
  </change>
  <change>
    <file>components/pages/tasks/EditTaskModal.tsx</file>
    <description>Update Task import path to `../../../types/learningTypes`. Add `estimatedDurationMinutes` field to the form and saving logic. Ensure `relatedGoalId` is used instead of `relatedGoal`.</description>
    <content><![CDATA[
import React, { useState, useEffect } from 'react';
import { toPersianDigits } from '../../../utils';
import { XMarkIcon, TrashIcon } from '../../shared/AppIcons';
import { Task } from '../../../types/learningTypes'; 

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskToEdit: Task;
  onSaveTask: (updatedTask: Task) => void;
  // lifeProjects?: LifeProject[]; // Would be needed for a dropdown
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ isOpen, onClose, taskToEdit, onSaveTask }) => {
  const [title, setTitle] = useState(taskToEdit.title);
  const [description, setDescription] = useState(taskToEdit.description || '');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>(taskToEdit.priority);
  const [dueDate, setDueDate] = useState(taskToEdit.dueDate || '');
  const [tags, setTags] = useState((taskToEdit.tags || []).join(', '));
  const [context, setContext] = useState(taskToEdit.context || '');
  const [relatedGoalId, setRelatedGoalId] = useState(taskToEdit.relatedGoalId || '');
  const [lifeProjectId, setLifeProjectId] = useState(taskToEdit.lifeProjectId || ''); 
  const [estimatedDurationMinutes, setEstimatedDurationMinutes] = useState(taskToEdit.estimatedDurationMinutes?.toString() || '');


  useEffect(() => {
    setTitle(taskToEdit.title);
    setDescription(taskToEdit.description || '');
    setPriority(taskToEdit.priority);
    setDueDate(taskToEdit.dueDate || '');
    setTags((taskToEdit.tags || []).join(', '));
    setContext(taskToEdit.context || '');
    setRelatedGoalId(taskToEdit.relatedGoalId || ''); 
    setLifeProjectId(taskToEdit.lifeProjectId || ''); 
    setEstimatedDurationMinutes(taskToEdit.estimatedDurationMinutes?.toString() || '');
  }, [taskToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert(toPersianDigits("عنوان وظیفه نمی‌تواند خالی باشد."));
      return;
    }
    const duration = estimatedDurationMinutes ? parseInt(estimatedDurationMinutes, 10) : undefined;
    if (estimatedDurationMinutes && (isNaN(duration!) || duration! < 0)) {
        alert(toPersianDigits("زمان تخمینی باید یک عدد مثبت باشد."));
        return;
    }

    const updatedTask: Task = {
      ...taskToEdit,
      title,
      description,
      priority,
      dueDate: dueDate || undefined, 
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      context: context || undefined,
      relatedGoalId: relatedGoalId || undefined, 
      lifeProjectId: lifeProjectId || undefined, 
      estimatedDurationMinutes: duration,
    };
    onSaveTask(updatedTask);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[60] p-4" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-task-modal-title"
      dir="rtl"
    >
      <div 
        className="bg-slate-800 p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-slate-700 modal-scroll-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 id="edit-task-modal-title" className="text-xl sm:text-2xl font-semibold text-sky-300">{toPersianDigits("ویرایش وظیفه")}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
            <XMarkIcon className="w-7 h-7" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="editTaskTitle" className="block text-sm font-medium text-sky-400 mb-1">{toPersianDigits("عنوان وظیفه*")}</label>
            <input
              type="text"
              id="editTaskTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-2.5 bg-slate-700 border border-slate-600 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-gray-200 text-sm"
            />
          </div>

          <div>
            <label htmlFor="editTaskDescription" className="block text-sm font-medium text-sky-400 mb-1">{toPersianDigits("توضیحات")}</label>
            <textarea
              id="editTaskDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full p-2.5 bg-slate-700 border border-slate-600 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-gray-200 text-sm resize-y"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="editTaskPriority" className="block text-sm font-medium text-sky-400 mb-1">{toPersianDigits("اولویت")}</label>
              <select
                id="editTaskPriority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as 'high' | 'medium' | 'low')}
                className="w-full p-2.5 bg-slate-700 border border-slate-600 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-gray-200 text-sm"
              >
                <option value="low">{toPersianDigits("پایین")}</option>
                <option value="medium">{toPersianDigits("متوسط")}</option>
                <option value="high">{toPersianDigits("بالا")}</option>
              </select>
            </div>
            <div>
              <label htmlFor="editTaskDueDate" className="block text-sm font-medium text-sky-400 mb-1">{toPersianDigits("تاریخ سررسید")}</label>
              <input
                type="date"
                id="editTaskDueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full p-2.5 bg-slate-700 border border-slate-600 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-gray-200 text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="editTaskTags" className="block text-sm font-medium text-sky-400 mb-1">{toPersianDigits("برچسب‌ها (جدا شده با کاما)")}</label>
            <input
              type="text"
              id="editTaskTags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full p-2.5 bg-slate-700 border border-slate-600 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-gray-200 text-sm"
              placeholder={toPersianDigits("مثال: کار, شخصی, فوری")}
            />
          </div>
           <div>
            <label htmlFor="editTaskContext" className="block text-sm font-medium text-sky-400 mb-1">{toPersianDigits("زمینه")}</label>
            <input
              type="text"
              id="editTaskContext"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              className="w-full p-2.5 bg-slate-700 border border-slate-600 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-gray-200 text-sm"
              placeholder={toPersianDigits("مثال: در خانه, در محل کار")}
            />
          </div>
           <div>
            <label htmlFor="editTaskRelatedGoalId" className="block text-sm font-medium text-sky-400 mb-1">{toPersianDigits("شناسه هدف مرتبط")}</label>
            <input
              type="text"
              id="editTaskRelatedGoalId"
              value={relatedGoalId}
              onChange={(e) => setRelatedGoalId(e.target.value)}
              className="w-full p-2.5 bg-slate-700 border border-slate-600 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-gray-200 text-sm"
              placeholder={toPersianDigits("مثال: goal_123")}
            />
          </div>
           <div>
            <label htmlFor="editTaskLifeProjectId" className="block text-sm font-medium text-sky-400 mb-1">{toPersianDigits("شناسه پروژه زندگی مرتبط")}</label>
            <input
              type="text"
              id="editTaskLifeProjectId"
              value={lifeProjectId}
              onChange={(e) => setLifeProjectId(e.target.value)}
              className="w-full p-2.5 bg-slate-700 border border-slate-600 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-gray-200 text-sm"
              placeholder={toPersianDigits("مثال: lp_abc")}
            />
          </div>
          <div>
            <label htmlFor="editEstimatedDuration" className="block text-sm font-medium text-sky-400 mb-1">{toPersianDigits("زمان تخمینی (دقیقه)")}</label>
            <input
              type="number"
              id="editEstimatedDuration"
              value={estimatedDurationMinutes}
              onChange={(e) => setEstimatedDurationMinutes(e.target.value)}
              min="0"
              className="w-full p-2.5 bg-slate-700 border border-slate-600 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-gray-200 text-sm"
            />
          </div>


          <div className="flex justify-end space-x-3 space-x-reverse pt-4 border-t border-slate-700">
            <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-gray-300 bg-slate-600 hover:bg-slate-500 rounded-lg transition-colors">
              {toPersianDigits("انصراف")}
            </button>
            <button type="submit" className="px-6 py-2.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
              {toPersianDigits("ذخیره تغییرات")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
```
    </content>
  </change>
  <change>
    <file>types/learningTypes.ts</file>
    <description>Update Task type to use relatedGoalId (string) instead of relatedGoal. Ensure GoalActionPlanTask also has id. Add `estimatedDurationMinutes` to Task and GoalActionPlanTask. Removed large blocks of erroneous, non-code text.</description>
    <content><![CDATA[
import React from 'react'; // Ensure React is imported for React.ReactElement

export interface LearningCategory {
  id: string;
  name: string;
  icon?: React.ReactElement<{ className?: string }>; 
  description?: string;
}

export interface GoalRelevanceFilter {
  id: string;
  name: string; 
  description?: string;
}


export interface QuizQuestionOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  questionText: string;
  options: QuizQuestionOption[];
  correctOptionId: string;
  explanation?: string;
  incorrectAnswerFeedback?: { [optionId: string]: { explanation: string; reviewLink?: string; reviewLinkText?: string; } };
  points?: number; 
}

export type Quiz = QuizQuestion[];


export interface LearningModule {
  id: string;
  title: string;
  description: string;
  estimatedTime?: string;
  contentIds: string[]; // IDs of LearningContent items
  progress: number; // 0-100
  completed: boolean;
  quiz?: Quiz;
  exerciseId?: string; // ID of a PracticalExercise
  isAISuggested?: boolean;
  isSkippable?: boolean;
  aiSuggestionRationale?: string;
  points?: number; // Points awarded for completing this module
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  categoryIds: string[];
  goalRelevanceIds?: string[];
  learningObjectives: string[];
  prerequisites?: string[];
  modules: LearningModule[];
  estimatedTime: string;
  difficultyLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  thumbnailUrl?: string;
  overallProgress: number; // Calculated based on module progress
  isAIGenerated?: boolean; // True if path was suggested/generated by AI
  aiGenerationRationale?: string; // Explanation if AI generated
}


export type LearningContentType = 'article' | 'video' | 'infographic' | 'quiz' | 'interactive_simulation' | 'course';

export interface LearningContent {
  id: string;
  title: string;
  type: LearningContentType;
  categoryIds: string[];
  goalRelevanceIds?: string[];
  contentUrl?: string;
  description: string;
  tags: string[];
  estimatedTime: string;
  difficultyLevel: 'Easy' | 'Medium' | 'Hard' | 'Advanced';
  thumbnailUrl?: string;
  author?: string;
  publishDate?: string;
  quiz?: Quiz; // Re-using Quiz type
  aiRationale?: string; // Why AI suggested this content
  contentKeyForReview?: string; // If content needs review
  isUGC?: boolean; // If content is user-generated
}

export interface Badge {
  id: string;
  name: string;
  iconUrl?: string | React.ReactElement<{className?: string}>; 
  description: string;
  earnedDate?: string; // ISO string if earned
  condition?: string; // Condition to earn the badge (for unearned badges)
  pointsRequired?: number; // Points threshold if badge is tied to points
  specificAchievement?: string; // e.g., "Completed 'Advanced Python' path"
}

export interface Skill {
  id: string;
  name: string;
  proficiency: 'learning' | 'acquired' | 'suggested_ai' | 'mastered'; 
  categoryName?: string; 
  relatedPathIds?: string[];
  relatedExerciseIds?: string[];
  assessmentScore?: number; 
}

export interface PeerReviewCriterion {
  id: string;
  text: string; 
  description?: string; 
}
export interface PeerReview {
  id: string;
  exerciseId: string; 
  reviewerId: string; 
  revieweeId: string; 
  criteriaRatings: { criterionId: string; rating: number; comment?: string }[]; 
  overallFeedback: string;
  isAnonymous: boolean;
  submissionDate: string; 
  feedbackQualityRating?: number; 
}

export interface PracticalExercise {
  id: string;
  title: string;
  description: string;
  submissionType: 'text' | 'file' | 'link'; 
  skillToPractice: string; 
  aiFeedbackCriteria?: string[]; 
  evaluationCriteria?: PeerReviewCriterion[]; 
  submissionText?: string; 
  submissionFileUrl?: string;
  submissionLink?: string;
  aiFeedback?: string; 
  peerReviewsRequested?: boolean;
  peerReviewsReceived?: PeerReview[];
  status?: 'not_started' | 'in_progress' | 'submitted' | 'feedback_received' | 'completed';
  points?: number;
}

export interface JournalEntry {
  id: string;
  date: string; // ISO string
  title?: string;
  text: string;
  tags?: string[];
  aiInsight?: string; 
  relatedLearningContentId?: string; 
}

export interface WeeklyChallenge {
  id: string;
  title: string;
  description: string;
  skillApplied: string; 
  dueDate: string; // ISO string
  rewardPoints?: number;
  status: 'active' | 'completed' | 'expired';
}

export interface AILearningBuddyMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: number; // Unix timestamp
  quickReplies?: { text: string; payload: string }[];
  isFeedbackRequest?: boolean; 
  relatedContentId?: string; 
}

export interface UserProgress {
  points: number;
  level: 'Novice' | 'Explorer' | 'Skilled' | 'Master' | 'Legend' | 'Guru'; 
  levelNamePersian: string;
  dailyStreak?: number;
  weeklyXP?: number;
}

export interface ForumTopic { 
  id: string;
  title: string;
  author: string; 
  lastActivity: string; 
  repliesCount: number;
  viewCount: number;
  tags?: string[];
  isPinned?: boolean;
  relatedLearningPathId?: string; 
}

export interface StudyGroup { 
  id: string;
  name: string;
  topic: string; 
  membersCount: number;
  isActive: boolean;
  thumbnailUrl?: string;
  description?: string;
  relatedLearningPathId?: string;
}

export interface Webinar { 
  id: string;
  title: string;
  speaker: string;
  dateTime: string; 
  duration: string; 
  platform: string; 
  isLive?: boolean;
  registrationLink?: string;
  description?: string;
  relatedSkillId?: string;
}

export interface LearningSuggestion {
  id: string;
  type: 'path' | 'content' | 'exercise' | 'challenge'; 
  itemId: string; 
  title: string; 
  description?: string; 
  sourceModule: 'Goals' | 'Tasks' | 'Health' | 'Finance' | 'LifeProjects' | 'Learning' | 'SmartHome' | 'Community'; 
  triggerContext: string; 
  relevanceScore?: number; 
}

export interface KeyResult { 
  id: string;
  text: string;
  progress: number; 
  targetValue?: number;
  currentValue?: number;
  unit?: string;
}

export interface GoalActionPlanTask {
  id: string; 
  title: string;
  dueDate?: string; 
  description?: string;
  completed: boolean;
  estimatedDurationMinutes?: number;
}

export interface Goal {
  id: string;
  title: string;
  description?: string;
  dueDate?: string; 
  category?: string;
  progress: number; 
  status: 'active' | 'paused' | 'completed' | 'planning';
  smartGoalTitle?: string; 
  smartGoalDescription?: string; 
  aiRationale?: string; 
  actionPlanTasks?: GoalActionPlanTask[]; 
  aiActionPlanSummary?: string; 
  aiNextStep?: string; 
  aiNextStepRationale?: string; 
  learningSuggestions?: LearningSuggestion[];
  lifeProjectId?: string; 
  keyResults?: KeyResult[]; 
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'high' | 'medium' | 'low';
  dueDate?: string; 
  tags?: string[];
  context?: string;
  relatedGoalId?: string;
  completed: boolean;
  subTasks: Task[]; 
  aiConfidence?: number; 
  rawInput?: string; 
  isAiExtracted?: boolean; 
  isDifficult?: boolean; 
  reflectionCompleted?: boolean; 
  learningSuggestions?: LearningSuggestion[];
  lifeProjectId?: string; 
  aiSuggestedOrder?: number; 
  estimatedDurationMinutes?: number;
}

export interface LifeProjectTask {
  id: string;
  projectId: string; 
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed';
  dueDate?: string; 
  assignedTo?: string; 
  order?: number; 
  originalTaskId?: string; 
  estimatedDurationMinutes?: number;
}

export interface LifeProject {
  id: string;
  title: string;
  description: string;
  relatedGoalIds: string[]; 
  requiredSkillIds?: string[]; 
  learningPathSuggestions?: LearningSuggestion[];
  overallProgress: number; 
  status: 'planning' | 'active' | 'completed' | 'on_hold';
  coverImageUrl?: string;
  startDate?: string; 
  endDate?: string;   
  aiGeneratedInsights?: string[]; 
  tasks?: LifeProjectTask[]; 
}


export interface AI360FeedbackItem {
  id: string;
  date: string; 
  feedbackText: string;
  relatedContext: string; 
  type: 'positive' | 'constructive' | 'observation' | 'question'; 
  actionableSuggestion?: string; 
}

export interface ConversationScenario {
  id: string;
  title: string;
  description: string;
  aiRoleDescription: string; 
  initialPrompt: string; 
  userObjective: string; 
  keyConceptsToPractice?: string[];
  feedbackMetrics?: { 
    clarity?: boolean;
    persuasiveness?: boolean;
    empathy?: boolean;
    problemSolving?: boolean;
    custom?: string[]; 
  };
}

export interface SimulationSessionReport {
  sessionId: string;
  scenarioId: string;
  date: string; 
  userPerformanceSummary: string;
  strengths: string[];
  areasForImprovement: string[];
  specificSuggestions: string[];
}

export type BrainstormingTechnique = 'SCAMPER' | 'SixThinkingHats' | 'MindMapping' | 'GeneralBrainstorm' | 'ReverseBrainstorming' | 'SWOT';

export interface CreativeIdea {
  id: string;
  text: string;
  color?: string; 
  position?: { x: number; y: number }; 
  parentId?: string | null; 
  techniqueUsed?: BrainstormingTechnique;
  isAIReply?: boolean; 
  details?: Record<string, any>; 
  aiGeneratedVisualConcept?: string; 
}

export interface MentorshipProfile { 
  userId: string; 
  userName: string;
  skillsToMentor: string[]; 
  experienceLevel: string; 
  availability: string; 
  bio?: string;
  profileImageUrl?: string;
  menteeCount?: number;
  averageRating?: number;
}

export interface MentorshipRequest { 
  id: string;
  menteeId: string;
  mentorId: string;
  message: string;
  requestedSkill: string;
  status: 'pending' | 'accepted' | 'declined' | 'completed';
  requestDate: string; 
}

export interface UserGeneratedContent { 
  id: string;
  authorId: string;
  authorName: string;
  type: 'path' | 'article' | 'resource_link' | 'quiz' | 'exercise'; 
  title: string;
  description: string;
  contentData: any; 
  tags: string[];
  submissionDate: string; 
  status: 'pending_approval' | 'approved' | 'rejected'; 
  averageRating?: number;
  reviewCount?: number;
}

export interface PredictiveSkillSuggestion {
  id: string;
  skillName: string;
  rationale: string; 
  relevanceToUser?: string; 
  learningPathId?: string; 
  marketDemandIndicator?: 'high' | 'medium' | 'low' | 'emerging'; 
  confidenceScore?: number; 
}

export interface LearningReportConfig {
  period: 'monthly' | 'quarterly' | 'annually';
  includeSkillSummary: boolean;
  includeGoalImpactAnalysis: boolean;
  includeFutureSuggestions: boolean;
  includeStrengthsWeaknesses?: boolean; 
  format: 'html' | 'markdown' | 'pdf_summary'; 
}

// --- HABIT ENGINEERING TYPES ---
export type HabitQuality = 'excellent' | 'good' | 'fair' | 'poor' | 'not_tracked';
export type HabitEmotion = 'energized' | 'happy' | 'neutral' | 'tired' | 'stressed' | 'other';

export interface HabitLogEntry {
  id: string;
  date: string; // ISO YYYY-MM-DD
  completed: boolean;
  quality?: HabitQuality;
  durationMinutes?: number;
  context?: string;
  emotionBefore?: HabitEmotion;
  emotionAfter?: HabitEmotion;
  notes?: string;
}

export interface AdaptiveReminderSettings {
  enabled: boolean;
  // Future: preferredWindows, contextualTriggers
}

export interface Habit {
  id: string;
  title: string;
  description?: string;
  frequency: 'daily' | 'weekly' | 'custom'; 
  customFrequencyDetails?: { 
    daysOfWeek?: ('Sat' | 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri')[];
    timesPerWeek?: number; 
  };
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'any' | string; 
  
  // Multidimensional Tracking
  log: HabitLogEntry[];
  defaultQualityTrack?: boolean; 
  defaultDurationTrack?: boolean; 
  defaultContextTrack?: boolean;
  defaultEmotionTrack?: boolean;

  // Gamification
  streak: number;
  level?: number;
  xp?: number;
  rewardPointsEarned?: number;
  badgesEarned?: string[]; 

  // AI & Reminders
  relatedGoalId?: string;
  contextTrigger?: string; 
  atomicSuggestion?: string; 
  isAISuggested?: boolean;
  aiSuggestionId?: string; 
  aiRationale?: string;
  reminderSettings?: AdaptiveReminderSettings;
  nextSmartReminder?: string; 
  lastCompletedDate?: string; 
}

export interface HabitSuggestionDetails {
  title: string;
  description: string;
  aiRationale: string;
  frequency: 'daily' | 'weekly' | 'custom' | string; 
  timeOfDay?: Habit['timeOfDay']; 
  potentialBenefits?: string[];
}
```
    </content>
  </change>
  <change>
    <file>components/pages/HabitsPage.tsx</file>
    <description>Implement advanced habit engineering features: AI habit suggestions, adaptive gamification (streak, XP, level), multidimensional tracking (quality, duration, context, emotions via logging modal), and conceptual hyper-adaptive AI reminders using Gemini. Add/Edit habit form integrated within page state. Add localStorage persistence.</description>
    <content><![CDATA[
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { toPersianDigits, parseJsonFromString } from '../../utils';
import { 
  RepeatIcon as PageIcon, 
  PlusIcon, 
  SparklesIconNav as AiIcon, 
  MicrophoneIcon, 
  CameraIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  LightbulbIcon, 
  TrashIcon, 
  PencilIcon, 
  ClockIcon,
  FireIcon,
  StarIcon,
  TrophyIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  BellIcon
} from '../shared/AppIcons';
import LoadingSpinner from '../shared/LoadingSpinner';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import XAIModal from '../shared/XAIModal';
import ToastNotification from '../shared/ToastNotification';
import CollapsibleSection from '../shared/CollapsibleSection';
import { Habit, HabitLogEntry, HabitQuality, HabitEmotion, HabitSuggestionDetails } from '../../types/learningTypes';

export interface HabitsPageProps { 
  openAddGoalModal?: () => void; 
}

const AI_MODEL_NAME = 'gemini-2.5-flash-preview-04-17';
const HABITS_LOCAL_STORAGE_KEY = 'lifeOrchestrator_habitsData_v3'; 

interface AddHabitModalState {
  isOpen: boolean;
  editingHabit: Habit | null;
  title: string;
  description: string;
  frequency: Habit['frequency'];
  daysOfWeek: Array<NonNullable<NonNullable<Habit['customFrequencyDetails']>['daysOfWeek']>[0]>; 
  timeOfDay: Habit['timeOfDay'];
  contextTrigger: string;
  relatedGoalId: string;
}

interface LogHabitModalState {
  isOpen: boolean;
  habitToLog: Habit | null;
  logDate: string; 
  completed: boolean;
  quality: HabitQuality;
  durationMinutes: string;
  context: string;
  emotionBefore: HabitEmotion;
  emotionAfter: HabitEmotion;
  notes: string;
}

const defaultAddHabitModalState: AddHabitModalState = {
  isOpen: false, editingHabit: null, title: '', description: '', frequency: 'daily', 
  daysOfWeek: [], timeOfDay: 'any', contextTrigger: '', relatedGoalId: ''
};

const defaultLogHabitModalState: LogHabitModalState = {
  isOpen: false, habitToLog: null, logDate: new Date().toISOString().split('T')[0], completed: true, quality: 'not_tracked', 
  durationMinutes: '', context: '', emotionBefore: 'neutral', emotionAfter: 'neutral', notes: ''
};

const emotionOptions: { value: HabitEmotion; label: string; emoji: string }[] = [
  { value: 'energized', label: 'پرانرژی', emoji: '⚡️' }, { value: 'happy', label: 'خوشحال', emoji: '😊' },
  { value: 'neutral', label: 'خنثی', emoji: '😐' }, { value: 'tired', label: 'خسته', emoji: '😩' },
  { value: 'stressed', label: 'پراسترس', emoji: '😥' }, { value: 'other', label: 'سایر', emoji: '❓' },
];
const qualityOptions: { value: HabitQuality; label: string; color: string }[] = [
  { value: 'excellent', label: 'عالی', color: 'text-green-600' }, { value: 'good', label: 'خوب', color: 'text-sky-600' },
  { value: 'fair', label: 'متوسط', color: 'text-yellow-600' }, { value: 'poor', label: 'ضعیف', color: 'text-red-600' },
  { value: 'not_tracked', label: 'ثبت نشده', color: 'text-gray-500' },
];


const HabitsPage: React.FC<HabitsPageProps> = ({ openAddGoalModal }) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [addHabitModal, setAddHabitModal] = useState<AddHabitModalState>(defaultAddHabitModalState);
  const [logHabitModal, setLogHabitModal] = useState<LogHabitModalState>(defaultLogHabitModalState);

  const [aiHabitSuggestions, setAiHabitSuggestions] = useState<HabitSuggestionDetails[]>([]);
  const [isLoadingAiSuggestions, setIsLoadingAiSuggestions] = useState(false);
  const [aiSuggestionError, setAiSuggestionError] = useState<string | null>(null);
  const [userHabitContext, setUserHabitContext] = useState(localStorage.getItem('userHabitContext_v1') || '');


  const [toast, setToast] = useState<{id: number, text: string, type: 'success'|'error'|'info'} | null>(null);
  
  const ai = process.env.API_KEY ? new GoogleGenAI({ apiKey: process.env.API_KEY }) : null;

  const showToast = useCallback((text: string, type: 'success'|'error'|'info' = 'info') => {
    setToast({ id: Date.now(), text: toPersianDigits(text), type });
  }, []);

  useEffect(() => { if (toast) { const timer = setTimeout(() => setToast(null), 3000); return () => clearTimeout(timer); }}, [toast]);
  useEffect(() => { localStorage.setItem(HABITS_LOCAL_STORAGE_KEY, JSON.stringify(habits)); }, [habits]);
  useEffect(() => { localStorage.setItem('userHabitContext_v1', userHabitContext); }, [userHabitContext]);


  useEffect(() => {
    try {
        const storedHabits = localStorage.getItem(HABITS_LOCAL_STORAGE_KEY);
        if (storedHabits) { setHabits(JSON.parse(storedHabits)); } 
        else { setHabits([ { id: 'habit1', title: 'نوشیدن ۸ لیوان آب', frequency: 'daily', timeOfDay: 'any', streak: 5, log: [], level: 2, xp: 150, lastCompletedDate: new Date(Date.now() - 86400000).toISOString().split('T')[0], reminderSettings: {enabled: true}, defaultQualityTrack: true }, { id: 'habit2', title: '۳۰ دقیقه مطالعه قبل از خواب', frequency: 'daily', timeOfDay: 'evening', streak: 12, log: [], level: 3, xp: 320, lastCompletedDate: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0], reminderSettings: {enabled: false}, defaultContextTrack: true, defaultEmotionTrack: true }, ]); }
    } catch (error) { console.error("Error loading habits:", error); showToast("خطا در بارگذاری عادات.", "error"); }
  }, [showToast]);


  const handleOpenAddHabitModal = (habitToEdit: Habit | null = null) => { 
      if (habitToEdit) {
      setAddHabitModal({
        isOpen: true, editingHabit: habitToEdit, title: habitToEdit.title, description: habitToEdit.description || '',
        frequency: habitToEdit.frequency, daysOfWeek: habitToEdit.customFrequencyDetails?.daysOfWeek || [],
        timeOfDay: habitToEdit.timeOfDay, contextTrigger: habitToEdit.contextTrigger || '', relatedGoalId: habitToEdit.relatedGoalId || ''
      });
    } else {
      setAddHabitModal({ ...defaultAddHabitModalState, isOpen: true });
    }
  };
  const handleSaveHabit = () => { 
    const { editingHabit, title, description, frequency, daysOfWeek, timeOfDay, contextTrigger, relatedGoalId } = addHabitModal;
    if (!title.trim()) { showToast("عنوان عادت الزامی است.", "error"); return; }

    const habitData = {
      title: title.trim(), description: description.trim() || undefined, frequency,
      customFrequencyDetails: (frequency === 'weekly' || frequency === 'custom') ? { daysOfWeek } : undefined,
      timeOfDay, contextTrigger: contextTrigger.trim() || undefined, relatedGoalId: relatedGoalId.trim() || undefined
    };

    if (editingHabit) {
      setHabits(prev => prev.map(h => h.id === editingHabit.id ? { ...editingHabit, ...habitData } : h));
      showToast("عادت با موفقیت ویرایش شد.", "success");
    } else {
      const newHabit: Habit = {
        id: `habit-${Date.now()}`, ...habitData, streak: 0, log: [], level: 1, xp: 0, reminderSettings: {enabled: true}
      };
      setHabits(prev => [newHabit, ...prev]);
      showToast("عادت جدید اضافه شد.", "success");
    }
    setAddHabitModal(defaultAddHabitModalState);
   };
  const handleDeleteHabit = (habitId: string) => { 
    if (window.confirm(toPersianDigits("آیا از حذف این عادت مطمئن هستید؟"))) {
      setHabits(prev => prev.filter(h => h.id !== habitId));
      showToast("عادت حذف شد.", "info");
    }
  };
  const handleOpenLogHabitModal = (habit: Habit, completedStatus: boolean = true) => { 
    const todayStr = new Date().toISOString().split('T')[0];
    const existingLog = habit.log.find(l => l.date === todayStr);
    if (existingLog) {
        setLogHabitModal({
            isOpen: true, habitToLog: habit, logDate: todayStr,
            completed: existingLog.completed, quality: existingLog.quality || 'not_tracked',
            durationMinutes: existingLog.durationMinutes?.toString() || '',
            context: existingLog.context || '', emotionBefore: existingLog.emotionBefore || 'neutral',
            emotionAfter: existingLog.emotionAfter || 'neutral', notes: existingLog.notes || ''
        });
    } else {
        setLogHabitModal({ ...defaultLogHabitModalState, isOpen: true, habitToLog: habit, completed: completedStatus, logDate: todayStr });
    }
  };

  const handleSaveHabitLog = () => {
    const { habitToLog, logDate, completed, quality, durationMinutes, context, emotionBefore, emotionAfter, notes } = logHabitModal;
    if (!habitToLog) return;

    const newLogEntry: HabitLogEntry = {
      id: `log-${Date.now()}`, date: logDate, completed,
      quality: quality === 'not_tracked' ? undefined : quality,
      durationMinutes: durationMinutes ? parseInt(durationMinutes) : undefined,
      context: context.trim() || undefined,
      emotionBefore: emotionBefore === 'other' || emotionBefore === 'neutral' ? undefined : emotionBefore,
      emotionAfter: emotionAfter === 'other' || emotionAfter === 'neutral' ? undefined : emotionAfter,
      notes: notes.trim() || undefined,
    };

    setHabits(prevHabits => prevHabits.map(h => {
      if (h.id === habitToLog.id) {
        const updatedLog = h.log.filter(l => l.date !== logDate).concat(newLogEntry).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        let newStreak = h.streak;
        let newXp = h.xp || 0;
        let newLevel = h.level || 1;
        let newLastCompletedDate = h.lastCompletedDate;

        if(completed) {
            const today = new Date(logDate);
            const lastCompleted = h.lastCompletedDate ? new Date(h.lastCompletedDate) : null;
            if (lastCompleted && (today.getTime() - lastCompleted.getTime()) <= 2 * 86400000 && (today.getTime() - lastCompleted.getTime()) > 0) { 
                 newStreak = (today.getTime() - lastCompleted.getTime()) / 86400000 === 1 ? h.streak + 1 : h.streak; 
            } else if (!lastCompleted || (today.getTime() - lastCompleted.getTime()) / 86400000 > 1) {
                 newStreak = 1; 
            } 
            
            newXp += 10 + (newStreak * 2); 
            if (quality === 'excellent') newXp += 5;
            if (quality === 'good') newXp += 2;
            
            while (newXp >= (newLevel * 100)) { 
                newXp -= (newLevel * 100);
                newLevel += 1;
                showToast(toPersianDigits(`عادت "${h.title}" به سطح ${String(newLevel)} ارتقا یافت!`), 'success');
            }
            newLastCompletedDate = logDate;
        } else { 
            if (h.lastCompletedDate === logDate) {
                const sortedLogs = updatedLog.filter(l => l.completed).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                if (sortedLogs.length > 0) {
                    newLastCompletedDate = sortedLogs[0].date;
                    newStreak = 1; 
                    for(let i = 0; i < sortedLogs.length - 1; i++){
                        if((new Date(sortedLogs[i].date).getTime() - new Date(sortedLogs[i+1].date).getTime()) / 86400000 === 1){
                            newStreak++;
                        } else {
                            break;
                        }
                    }
                } else {
                    newLastCompletedDate = undefined;
                    newStreak = 0;
                }
            }
            newXp = Math.max(0, newXp - 10); 
        }
        return { ...h, log: updatedLog, streak: newStreak, xp: newXp, level: newLevel, lastCompletedDate: newLastCompletedDate };
      }
      return h;
    }));
    setLogHabitModal(defaultLogHabitModalState);
    showToast("گزارش عادت ثبت شد.", "success");
  };

  const fetchAIHabitSuggestions = async () => {
    if (!ai) { setAiSuggestionError(toPersianDigits("سرویس هوش مصنوعی در دسترس نیست.")); return; }
    setIsLoadingAiSuggestions(true); setAiSuggestionError(null);
    try {
      const prompt = `بر اساس زمینه کاربر: "${userHabitContext || 'بهبود کلی زندگی'}", ۲ تا ۳ پیشنهاد عادت جدید به زبان فارسی ارائه بده. هر پیشنهاد باید شامل "title", "description" (توضیح کوتاه چرا این عادت مفید است), "aiRationale" (منطق دقیق‌تر پیشنهاد), "frequency" (مانند 'daily', '3 times a week') و "timeOfDay" (مانند 'morning', 'any') باشد. پاسخ را به صورت آرایه JSON ارائه بده.`;
      const response: GenerateContentResponse = await ai.models.generateContent({ model: AI_MODEL_NAME, contents: prompt, config: { responseMimeType: "application/json" } });
      const parsedData = parseJsonFromString<HabitSuggestionDetails[]>(response.text);
      if (parsedData && Array.isArray(parsedData)) { setAiHabitSuggestions(parsedData); } 
      else { throw new Error("Failed to parse AI suggestions."); }
    } catch (e: any) { setAiSuggestionError(toPersianDigits(`خطا در دریافت پیشنهادات: ${e.message || "لطفا دوباره تلاش کنید."}`)); } 
    finally { setIsLoadingAiSuggestions(false); }
  };
  
  const handleAcceptAISuggestion = (suggestion: HabitSuggestionDetails) => { 
    const newHabit: Habit = {
        id: `habit-ai-${Date.now()}`,
        title: suggestion.title,
        description: suggestion.description,
        frequency: suggestion.frequency.toLowerCase().includes("daily") ? 'daily' : suggestion.frequency.toLowerCase().includes("weekly") ? 'weekly' : 'custom',
        customFrequencyDetails: (suggestion.frequency.toLowerCase().includes("weekly") || suggestion.frequency.toLowerCase().includes("custom")) ? { daysOfWeek: [], timesPerWeek: parseInt(suggestion.frequency) || undefined } : undefined,
        timeOfDay: suggestion.timeOfDay || 'any',
        streak: 0,
        log: [],
        level: 1,
        xp: 0,
        isAISuggested: true,
        aiRationale: suggestion.aiRationale,
        reminderSettings: { enabled: true }
    };
    setHabits(prev => [newHabit, ...prev]);
    setAiHabitSuggestions(prev => prev.filter(s => s.title !== suggestion.title)); 
    showToast(toPersianDigits(`عادت "${suggestion.title}" اضافه شد.`), "success");
  };
  
  const getAIWellnessReminder = async (habit: Habit): Promise<string | null> => { 
    if (!ai) return null;
    const currentTime = new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit'});
    const userActivity = "در حال کار با کامپیوتر"; 
    const prompt = `کاربر عادت "${habit.title}" را دارد که معمولاً در "${habit.timeOfDay}" انجام می‌شود. اکنون ساعت ${currentTime} است و کاربر مشغول "${userActivity}" است. آیا الان زمان مناسبی برای یادآوری این عادت است؟ یک پاسخ کوتاه بله/خیر و در صورت بله، یک متن یادآوری کوتاه و دوستانه به زبان فارسی ارائه بده. پاسخ در قالب JSON با کلیدهای "shouldRemind" (boolean) و "reminderText" (string، فقط اگر shouldRemind صحیح است).`;
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({ model: AI_MODEL_NAME, contents: prompt, config: { responseMimeType: "application/json" }});
        const parsed = parseJsonFromString<{shouldRemind: boolean; reminderText?: string}>(response.text);
        if(parsed && parsed.shouldRemind && parsed.reminderText) {
            return parsed.reminderText;
        }
        return null;
    } catch (e) {
        console.error("Error getting AI reminder:", e);
        return null;
    }
  };
  
  const handleSmartReminderClick = async (habit: Habit) => { 
    showToast(toPersianDigits(`در حال بررسی بهترین زمان برای یادآوری عادت "${habit.title}"...`), 'info');
    const reminderText = await getAIWellnessReminder(habit);
    if (reminderText) {
        showToast(toPersianDigits(`یادآوری هوشمند: ${reminderText}`), 'success');
    } else {
        showToast(toPersianDigits(`هوش مصنوعی تشخیص داد الان زمان مناسبی برای یادآوری "${habit.title}" نیست. بعداً بررسی خواهد شد.`), 'info');
    }
  };

  const daysOfWeekMap: { [key: string]: string } = { Mon: "د", Tue: "س", Wed: "چ", Thu: "پ", Fri: "ج", Sat: "ش", Sun: "ی" };
  const allDaysOfWeek: Array<NonNullable<NonNullable<Habit['customFrequencyDetails']>['daysOfWeek']>[0]> = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

  return (
    <div className="page bg-habits-page">
      {toast && <ToastNotification message={toast.text} type={toast.type} isVisible={!!toast} onClose={() => setToast(null)} />}
      
      {addHabitModal.isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4" onClick={() => setAddHabitModal(defaultAddHabitModalState)}>
          <div className="bg-white p-5 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200 flex-shrink-0">
              <h3 className="text-lg font-semibold text-gray-800">{toPersianDigits(addHabitModal.editingHabit ? "ویرایش عادت" : "افزودن عادت جدید")}</h3>
              <button onClick={() => setAddHabitModal(defaultAddHabitModalState)} className="text-gray-500 hover:text-gray-700"><XMarkIcon className="w-6 h-6" /></button>
            </div>
            <form onSubmit={(e) => {e.preventDefault(); handleSaveHabit();}} className="space-y-3 flex-grow overflow-y-auto pr-1 modal-scroll-content text-sm">
              <div><label htmlFor="habitTitle" className="block text-xs font-medium text-gray-700 mb-1">عنوان عادت*:</label><input type="text" id="habitTitle" value={toPersianDigits(addHabitModal.title)} onChange={e => setAddHabitModal(s => ({...s, title: e.target.value}))} required className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" /></div>
              <div><label htmlFor="habitDesc" className="block text-xs font-medium text-gray-700 mb-1">توضیحات (اختیاری):</label><textarea id="habitDesc" value={toPersianDigits(addHabitModal.description)} onChange={e => setAddHabitModal(s => ({...s, description: e.target.value}))} rows={2} className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 resize-y" /></div>
              <div>
                <label htmlFor="habitFrequency" className="block text-xs font-medium text-gray-700 mb-1">فرکانس*:</label>
                <select id="habitFrequency" value={addHabitModal.frequency} onChange={e => setAddHabitModal(s => ({...s, frequency: e.target.value as Habit['frequency']}))} className="w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-indigo-500 focus:border-indigo-500">
                  <option value="daily">{toPersianDigits("روزانه")}</option><option value="weekly">{toPersianDigits("هفتگی (انتخاب روزها)")}</option><option value="custom">{toPersianDigits("سفارشی (توضیح دستی)")}</option>
                </select>
              </div>
              {(addHabitModal.frequency === 'weekly' || addHabitModal.frequency === 'custom') && (
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">روزهای هفته (برای هفتگی):</label>
                  <div className="flex flex-wrap gap-1.5">
                    {allDaysOfWeek.map(day => (
                      <button type="button" key={day} onClick={() => setAddHabitModal(s => ({...s, daysOfWeek: s.daysOfWeek.includes(day!) ? s.daysOfWeek.filter(d => d !== day) : [...s.daysOfWeek, day!]}))}
                              className={`px-2 py-1 text-[10px] border rounded-full ${addHabitModal.daysOfWeek.includes(day!) ? 'bg-purple-500 text-white border-purple-600' : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200'}`}>
                        {daysOfWeekMap[day!]}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div><label htmlFor="habitTimeOfDay" className="block text-xs font-medium text-gray-700 mb-1">زمان روز:</label>
                <select id="habitTimeOfDay" value={addHabitModal.timeOfDay} onChange={e => setAddHabitModal(s => ({...s, timeOfDay: e.target.value as Habit['timeOfDay']}))} className="w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-indigo-500 focus:border-indigo-500">
                  <option value="any">{toPersianDigits("هر زمان")}</option><option value="morning">{toPersianDigits("صبح")}</option><option value="afternoon">{toPersianDigits("بعد از ظهر")}</option><option value="evening">{toPersianDigits("عصر")}</option>
                </select>
              </div>
              <div><label htmlFor="habitContext" className="block text-xs font-medium text-gray-700 mb-1">محرک زمینه‌ای (اختیاری):</label><input type="text" id="habitContext" value={toPersianDigits(addHabitModal.contextTrigger)} onChange={e => setAddHabitModal(s => ({...s, contextTrigger: e.target.value}))} className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder={toPersianDigits("مثال: بعد از صبحانه")}/></div>
              <div><label htmlFor="habitGoal" className="block text-xs font-medium text-gray-700 mb-1">هدف مرتبط (اختیاری):</label><input type="text" id="habitGoal" value={toPersianDigits(addHabitModal.relatedGoalId)} onChange={e => setAddHabitModal(s => ({...s, relatedGoalId: e.target.value}))} className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder={toPersianDigits("شناسه یا عنوان هدف")}/></div>
              <div className="flex justify-end space-x-2 space-x-reverse pt-3 border-t border-gray-100 flex-shrink-0"><button type="button" onClick={() => setAddHabitModal(defaultAddHabitModalState)} className="py-2 px-4 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md text-xs">انصراف</button><button type="submit" className="py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-xs">ذخیره عادت</button></div>
            </form>
          </div>
        </div>
      )}

      {logHabitModal.isOpen && logHabitModal.habitToLog && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[101] p-4" onClick={() => setLogHabitModal(defaultLogHabitModalState)}>
              <div className="bg-white p-5 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                  <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200 flex-shrink-0">
                      <h3 className="text-md font-semibold text-gray-800">{toPersianDigits(`ثبت گزارش برای: ${logHabitModal.habitToLog.title}`)}</h3>
                      <button onClick={() => setLogHabitModal(defaultLogHabitModalState)} className="text-gray-500 hover:text-gray-700"><XMarkIcon className="w-6 h-6" /></button>
                  </div>
                  <form onSubmit={e => {e.preventDefault(); handleSaveHabitLog();}} className="space-y-3 flex-grow overflow-y-auto pr-1 modal-scroll-content text-sm">
                      <div><label className="block text-xs font-medium text-gray-700 mb-1">تاریخ:</label><input type="date" value={logHabitModal.logDate} onChange={e => setLogHabitModal(s => ({...s, logDate: e.target.value}))} required className="w-full p-2 border border-gray-300 rounded-md"/></div>
                      <div className="flex items-center"><input type="checkbox" id="logCompleted" checked={logHabitModal.completed} onChange={e => setLogHabitModal(s=>({...s, completed: e.target.checked}))} className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 mr-2"/><label htmlFor="logCompleted" className="text-xs text-gray-700">آیا انجام شد؟</label></div>
                      <div><label className="block text-xs font-medium text-gray-700 mb-1">کیفیت انجام (اختیاری):</label><select value={logHabitModal.quality} onChange={e => setLogHabitModal(s=>({...s, quality: e.target.value as HabitQuality}))} className="w-full p-2 border bg-white border-gray-300 rounded-md text-xs">{qualityOptions.map(opt => <option key={opt.value} value={opt.value}>{toPersianDigits(opt.label)}</option>)}</select></div>
                      <div><label className="block text-xs font-medium text-gray-700 mb-1">مدت زمان (دقیقه، اختیاری):</label><input type="number" value={logHabitModal.durationMinutes} onChange={e => setLogHabitModal(s=>({...s, durationMinutes: e.target.value}))} className="w-full p-2 border border-gray-300 rounded-md text-xs" placeholder="مثال: ۳۰"/></div>
                      <div><label className="block text-xs font-medium text-gray-700 mb-1">زمینه انجام (اختیاری):</label><input type="text" value={toPersianDigits(logHabitModal.context)} onChange={e => setLogHabitModal(s=>({...s, context: e.target.value}))} className="w-full p-2 border border-gray-300 rounded-md text-xs" placeholder="مثال: در خانه، بعد از کار"/></div>
                      <div className="grid grid-cols-2 gap-2">
                          <div><label className="block text-xs font-medium text-gray-700 mb-1">احساس قبل از انجام:</label><select value={logHabitModal.emotionBefore} onChange={e => setLogHabitModal(s=>({...s, emotionBefore: e.target.value as HabitEmotion}))} className="w-full p-2 border bg-white border-gray-300 rounded-md text-xs">{emotionOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.emoji} {toPersianDigits(opt.label)}</option>)}</select></div>
                          <div><label className="block text-xs font-medium text-gray-700 mb-1">احساس بعد از انجام:</label><select value={logHabitModal.emotionAfter} onChange={e => setLogHabitModal(s=>({...s, emotionAfter: e.target.value as HabitEmotion}))} className="w-full p-2 border bg-white border-gray-300 rounded-md text-xs">{emotionOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.emoji} {toPersianDigits(opt.label)}</option>)}</select></div>
                      </div>
                      <div><label className="block text-xs font-medium text-gray-700 mb-1">یادداشت (اختیاری):</label><textarea value={toPersianDigits(logHabitModal.notes)} onChange={e => setLogHabitModal(s=>({...s, notes: e.target.value}))} rows={2} className="w-full p-2 border border-gray-300 rounded-md resize-y text-xs" /></div>
                      <div className="flex justify-end space-x-2 space-x-reverse pt-3 border-t border-gray-100 flex-shrink-0"><button type="button" onClick={() => setLogHabitModal(defaultLogHabitModalState)} className="py-2 px-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md text-xs">انصراف</button><button type="submit" className="py-2 px-3 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-xs">ثبت گزارش</button></div>
                  </form>
              </div>
          </div>
      )}

      <div className="flex items-center mb-6">
        <PageIcon className="w-7 h-7 text-purple-600 mr-3 rtl:ml-3 rtl:mr-0" />
        <h1 className="text-2xl font-semibold text-gray-800">{toPersianDigits("مهندسی عادت")}</h1>
      </div>

      <CollapsibleSection title="پیشنهادات هوشمند عادت از AI" icon={<LightbulbIcon className="text-yellow-500"/>} isOpen={true} onToggle={()=>{}} className="mb-6">
        <div className="p-2">
            <label htmlFor="userHabitContext" className="text-xs font-medium text-gray-700 mb-1 block">زمینه/هدف شما برای ایجاد عادت (اختیاری):</label>
            <input type="text" id="userHabitContext" value={userHabitContext} onChange={e => setUserHabitContext(e.target.value)} placeholder={toPersianDigits("مثال: کاهش استرس، افزایش تمرکز")} className="w-full p-1.5 border border-gray-300 rounded-md text-xs mb-2"/>
            <button onClick={fetchAIHabitSuggestions} disabled={isLoadingAiSuggestions || !ai} className="w-full flex items-center justify-center text-xs py-2 px-3 bg-yellow-400 hover:bg-yellow-500 text-gray-800 rounded-md transition-colors disabled:opacity-60 mb-2">
                {isLoadingAiSuggestions ? <LoadingSpinner size="sm"/> : <AiIcon className="w-4 h-4 mr-1.5"/>} {toPersianDigits("دریافت پیشنهادات جدید")}
            </button>
            {!ai && <p className="text-[10px] text-center text-gray-500">{toPersianDigits("(سرویس AI در دسترس نیست)")}</p>}
            {aiSuggestionError && <p className="text-xs text-red-500 bg-red-100 p-2 rounded-md text-center">{aiSuggestionError}</p>}
            {aiHabitSuggestions.length > 0 && (
                <div className="space-y-2 mt-2">
                    {aiHabitSuggestions.map((sugg, index) => (
                        <div key={index} className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                            <h5 className="text-sm font-semibold text-yellow-700">{toPersianDigits(sugg.title)}</h5>
                            <p className="text-xs text-gray-600 mt-1">{toPersianDigits(sugg.description)}</p>
                            <p className="text-[10px] text-gray-500 mt-1">({toPersianDigits(sugg.aiRationale)})</p>
                            <button onClick={() => handleAcceptAISuggestion(sugg)} className="text-xs bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded-md mt-2">پذیرفتن و افزودن</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
      </CollapsibleSection>

      <div className="mb-6">
        <button onClick={() => handleOpenAddHabitModal()} className="w-full flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 px-4 rounded-lg text-sm shadow-md transition-colors">
          <PlusIcon className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" /> {toPersianDigits("افزودن عادت جدید")}
        </button>
      </div>

      {habits.length === 0 ? ( 
         <div className="text-center py-8 bg-gray-100 rounded-xl shadow-inner">
            <PageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">{toPersianDigits("هنوز عادتی ایجاد نکرده‌اید.")}</p>
        </div>
       ) : (
        <div className="space-y-4">
          {habits.map(habit => (
            <div key={habit.id} className={`p-4 rounded-xl shadow-sm border ${habit.log.find(l=>l.date === new Date().toISOString().split('T')[0])?.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-md font-semibold text-purple-700">{toPersianDigits(habit.title)}</h4>
                  <p className="text-xs text-gray-500">{toPersianDigits(habit.frequency === 'daily' ? 'روزانه' : `هفتگی (${(habit.customFrequencyDetails?.daysOfWeek || []).map(d => daysOfWeekMap[d]).join('، ')})`)} - {toPersianDigits(habit.timeOfDay === 'any' ? 'هر زمان' : habit.timeOfDay === 'morning' ? 'صبح' : habit.timeOfDay === 'afternoon' ? 'بعد از ظهر' : 'عصر' )}</p>
                </div>
                <div className="flex space-x-1 rtl:space-x-reverse">
                  <button onClick={() => handleOpenAddHabitModal(habit)} className="p-1 text-yellow-500 hover:bg-yellow-100 rounded-full"><PencilIcon className="w-4 h-4"/></button>
                  <button onClick={() => handleDeleteHabit(habit.id)} className="p-1 text-red-500 hover:bg-red-100 rounded-full"><TrashIcon className="w-4 h-4"/></button>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2 text-xs">
                <span className="flex items-center text-orange-600"><FireIcon className="w-4 h-4 ml-1"/> {toPersianDigits(`رشته: ${String(habit.streak)} روز`)}</span>
                <span className="flex items-center text-indigo-600"><StarIcon className="w-4 h-4 ml-1"/> {toPersianDigits(`سطح: ${String(habit.level || 1)} (XP: ${String(habit.xp || 0)})`)}</span>
              </div>
              <div className="mt-3 pt-2 border-t border-gray-100 flex flex-col sm:flex-row gap-2">
                <button onClick={() => handleOpenLogHabitModal(habit, true)} className="flex-1 text-xs bg-green-500 hover:bg-green-600 text-white py-1.5 px-3 rounded-md flex items-center justify-center">
                  <CheckCircleIcon className="w-4 h-4 ml-1"/> {toPersianDigits("ثبت انجام امروز")}
                </button>
                <button onClick={() => handleOpenLogHabitModal(habit, false)} className="flex-1 text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 py-1.5 px-3 rounded-md flex items-center justify-center">
                  <XCircleIcon className="w-4 h-4 ml-1"/> {toPersianDigits("ثبت عدم انجام")}
                </button>
                {habit.reminderSettings?.enabled && (
                     <button onClick={() => handleSmartReminderClick(habit)} disabled={!ai} className="flex-1 text-xs bg-sky-500 hover:bg-sky-600 text-white py-1.5 px-3 rounded-md flex items-center justify-center disabled:opacity-60">
                        <BellIcon className="w-4 h-4 ml-1"/> {toPersianDigits("یادآوری هوشمند")}
                     </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HabitsPage;
```
    </content>
  </change>
  <change>
    <file>components/learning/AISmartLearningSuggestionCard.tsx</file>
    <description>Adjust onViewSuggestion prop in AISmartLearningSuggestionCard to accept the broader `LearningSuggestion['type']` which includes 'exercise' and 'challenge'. Update the icon logic to reflect this, providing a default icon for new types.</description>
    <content><![CDATA[
import React from 'react';
import { toPersianDigits } from '../../utils';
import { LearningSuggestion } from '../../types/learningTypes';
import { LightbulbIcon, BookIcon, AcademicCapIcon, ArrowRightIcon } from '../shared/AppIcons';
import { PageName } from '../../App';

interface AISmartLearningSuggestionCardProps {
  suggestion: LearningSuggestion;
  onViewSuggestion: (type: LearningSuggestion['type'], itemId: string) => void; 
  onDismissSuggestion?: (suggestionId: string) => void; // Optional: if dismissal is handled locally
}

const AISmartLearningSuggestionCard: React.FC<AISmartLearningSuggestionCardProps> = ({
  suggestion,
  onViewSuggestion,
  onDismissSuggestion,
}) => {
  const IconComponent = 
    suggestion.type === 'path' ? AcademicCapIcon : 
    suggestion.type === 'exercise' ? BookIcon 
    : suggestion.type === 'challenge' ? BookIcon 
    : BookIcon; // Default for content

  return (
    <div className="bg-sky-50 p-3.5 rounded-lg shadow-sm border border-sky-200 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 p-2 bg-sky-100 rounded-full text-sky-600">
          <LightbulbIcon className="w-5 h-5" />
        </div>
        <div className="flex-grow min-w-0">
          <h4 className="text-sm font-semibold text-sky-700 mb-1">{toPersianDigits("پیشنهاد یادگیری هوشمند")}</h4>
          <p className="text-xs text-gray-600 mb-1">
            {toPersianDigits(`برای کمک به شما در "${suggestion.triggerContext}", یادگیری زیر پیشنهاد می‌شود:`)}
          </p>
          <div 
            className="mt-2 p-2.5 bg-white rounded-md border border-sky-300 cursor-pointer hover:bg-sky-100 transition-colors"
            onClick={() => onViewSuggestion(suggestion.type, suggestion.itemId)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && onViewSuggestion(suggestion.type, suggestion.itemId)}
          >
            <div className="flex items-center">
              <IconComponent className="w-4 h-4 text-sky-600 mr-2 rtl:ml-2 rtl:mr-0 flex-shrink-0" />
              <span className="text-xs font-medium text-sky-700 truncate">{toPersianDigits(suggestion.title)}</span>
            </div>
            {suggestion.description && <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">{toPersianDigits(suggestion.description)}</p>}
          </div>
        </div>
      </div>
      <div className="mt-2.5 flex justify-end items-center gap-2">
        {onDismissSuggestion && (
          <button 
            onClick={() => onDismissSuggestion(suggestion.id)}
            className="text-xs text-gray-500 hover:text-gray-700 py-1 px-2 rounded-md"
          >
            {toPersianDigits("نادیده گرفتن")}
          </button>
        )}
        <button
          onClick={() => onViewSuggestion(suggestion.type, suggestion.itemId)}
          className="flex items-center text-xs bg-sky-500 hover:bg-sky-600 text-white py-1 px-2.5 rounded-md transition-colors"
        >
          {toPersianDigits("مشاهده جزئیات")}
          <ArrowRightIcon className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0 transform scale-x-[-1]" />
        </button>
      </div>
    </div>
  );
};

export default AISmartLearningSuggestionCard;
```
    </content>
  </change>
  <change>
    <file>metadata.json</file>
    <description>Add camera permission to metadata.json for AI Vision features on Health Page and image input on Tasks Page.</description>
    <content><![CDATA[
{
  "name": "LifeOrchestrator AI",
  "description": "An AI-powered platform to intelligently harmonize life's elements for growth, productivity, and well-being, acting as your comprehensive assistant for flourishing.",
  "requestFramePermissions": [
    "microphone",
    "camera",
    "geolocation"
  ],
  "prompt": ""
}
```
    </content>
  </change>
</changes>```
The advanced AI features for the Health Page (Phase 4.1) and Habits Page (Phase 3.3) have been implemented as requested. This includes:

*   **Health Page:**
    *   AI-driven personalized nutrition and exercise plan generation based on user preferences.
    *   AI-powered analysis of journal entries for sentiment and stress level detection.
    *   An interactive symptom checker chatbot utilizing the Gemini API.
    *   Conceptual placeholder for AI Vision features (food recognition, exercise form analysis).
    *   UI elements for user input (preferences, journal entries, symptoms) and display of AI-generated plans/analysis.
    *   localStorage persistence for health-related data.

*   **Habits Page:**
    *   AI-generated habit suggestions based on user-provided context.
    *   Adaptive gamification with streaks, XP, and levels.
    *   Multidimensional habit tracking through a detailed logging modal (quality, duration, context, emotions).
    *   Conceptual AI-powered "Smart Reminders" that would use context to suggest optimal reminder times.
    *   Integrated Add/Edit Habit modal directly within the page's state.
    *   localStorage persistence for all habit data.

Additionally, several TypeScript errors across multiple files were addressed, mainly related to type imports, `toPersianDigits` usage, and ensuring type consistency between component props and their definitions. The `AISmartLearningSuggestionCard` has also been made more flexible. The camera permission has been added to `metadata.json`.