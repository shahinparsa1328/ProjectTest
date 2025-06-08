
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { toPersianDigits, parseJsonFromString } from '../../utils';
import { 
  AcademicCapIcon as PageIcon, 
  LightbulbIcon, 
  BookIcon, 
  TargetIcon,
  Squares2X2Icon,
  UserCircleIcon,
  HeartIcon,
  ListIcon as TaskIcon,
  BriefcaseIcon,
  WalletIcon,
  BrainIcon,
  SparklesIconNav,
  SearchIcon,
  AcademicCapIcon, 
  ClockIcon,
  MapPinIcon,
  JournalIcon, 
  ChallengeIcon,
  TrophyIcon, 
  UserGroupIcon as ForumIconIcon, // Changed alias for clarity
  CheckCircleIcon, 
  PlusIcon, 
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowRightIcon,
  XCircleIcon,
  DocumentArrowUpIcon,
  ListIcon as ListBulletIcon,
  PlayCircleIcon,
  ClipboardListIcon, 
  UsersIcon,         
  LightbulbMultipleIcon,
  PencilSquareIcon, 
  ShieldExclamationIcon,
  TrendingUpIcon, // Phase 3.4
  FileDownloadIcon, // Phase 3.4
  UserGroupIcon // Added missing import
} from '../shared/AppIcons'; // Corrected path
import { PageName } from '../../App';
import { LearningCategory, LearningPath, LearningContent, GoalRelevanceFilter, Badge, Quiz, LearningModule, Skill, PracticalExercise, JournalEntry, WeeklyChallenge, AILearningBuddyMessage, UserProgress, ForumTopic, StudyGroup, Webinar, AI360FeedbackItem, ConversationScenario, PeerReview, MentorshipProfile, UserGeneratedContent, PredictiveSkillSuggestion, LearningReportConfig } from '../../types/learningTypes';
import LearningPathDetailView from '../learning/LearningPathDetailView';
import LearningLibrary from '../learning/LearningLibrary'; 
import SkillsMapPage from '../learning/SkillsMapPage'; 
import LoadingSpinner from '../shared/LoadingSpinner';
import PracticalExerciseView from '../learning/PracticalExerciseView'; 
import LearningJournalPage from '../learning/LearningJournalPage'; 
import AILearningBuddy from '../learning/AILearningBuddy'; 
import WeeklyChallengeWidget from '../learning/WeeklyChallengeWidget';
import AchievementsPage from '../learning/AchievementsPage'; 
import ForumPage from '../learning/ForumPage'; 
import ConversationSimulatorView from '../learning/ConversationSimulatorView'; 
import CreativeWorkspace from '../learning/CreativeWorkspace'; 
import LearningReportModal from '../learning/LearningReportModal'; // Phase 3.4
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";


const AI_MODEL_NAME = 'gemini-2.5-flash-preview-04-17';

// --- MOCK DATA (Continued) ---
const mockAI360Feedback: AI360FeedbackItem[] = [ { id: 'fb1', date: new Date(Date.now() - 86400000 * 3).toISOString(), feedbackText: toPersianDigits("امتیاز شما در آزمون 'اصول مدیریت زمان' (۸۵٪) نشان‌دهنده درک خوب مفاهیم است. به نظر می‌رسد در به‌کارگیری تکنیک اولویت‌بندی در وظایف روزانه خود موفق بوده‌اید."), relatedContext: toPersianDigits("آزمون مدیریت زمان و وظایف هفته گذشته"), type: 'positive' }, { id: 'fb2', date: new Date(Date.now() - 86400000).toISOString(), feedbackText: toPersianDigits("در پروژه 'ارائه طرح کسب و کار'، مشاهده شد که می‌توانید ساختار ارائه را با خلاصه‌ای اجرایی قوی‌تر شروع کنید تا از ابتدا مخاطب را جذب نمایید."), relatedContext: toPersianDigits("پروژه ارائه طرح کسب و کار"), type: 'constructive' }, ];
const mockConversationScenarios: ConversationScenario[] = [ { id: 'cs1', title: toPersianDigits("مذاکره برای افزایش حقوق"), description: toPersianDigits("با مدیر خود در مورد افزایش حقوق مذاکره کنید."), aiRoleDescription: toPersianDigits("شما مدیر هستید. بودجه محدود است اما برای کارمند خوب ارزش قائلید."), initialPrompt: toPersianDigits("سلام، ممنون که وقت گذاشتید. می‌خواستم در مورد عملکرد و حقوقم صحبت کنم."), userObjective: toPersianDigits("دستیابی به حداقل ۱۰٪ افزایش حقوق.") }, { id: 'cs2', title: toPersianDigits("مدیریت مشتری ناراضی"), description: toPersianDigits("یک مشتری از محصول شما ناراضی است و درخواست بازپرداخت کامل دارد."), aiRoleDescription: toPersianDigits("شما مشتری هستید که از محصولی که خریده‌اید بسیار ناراضی هستید."), initialPrompt: toPersianDigits("سلام، من از خریدم اصلا راضی نیستم و می‌خوام پولم رو پس بگیرم!"), userObjective: toPersianDigits("حفظ مشتری و ارائه راه‌حل جایگزین به جای بازپرداخت کامل.") }, ];
const mockCategories: LearningCategory[] = [ { id: 'cat1', name: toPersianDigits('مهارت‌های نرم'), icon: <BrainIcon className="w-6 h-6"/> }, { id: 'cat5', name: toPersianDigits('تندرستی ذهنی'), icon: <HeartIcon className="w-6 h-6"/> }, ];
const mockGoalRelevanceFilters: GoalRelevanceFilter[] = [ { id: 'grf1', name: toPersianDigits('برای افزایش بهره‌وری') }, ];
const sampleQuiz1: Quiz = [ { id: 'q1m1', questionText: toPersianDigits('اهمیت اصلی مدیریت زمان چیست؟'), options: [{id: 'o2m1', text: toPersianDigits('استفاده بهینه از زمان برای رسیدن به اهداف')}], correctOptionId: 'o2m1'} ];
const mockModules: LearningModule[] = [ { id: 'm1', title: toPersianDigits('مقدمه‌ای بر مدیریت زمان'), description: toPersianDigits('آشنایی با اصول اولیه.'), estimatedTime: toPersianDigits('۴۵ دقیقه'), contentIds: [], progress: 0, completed: false, quiz: sampleQuiz1, points: 50, exerciseId: 'ex1' }, ];
const mockLearningPathsData: LearningPath[] = [ { id: 'lp1', title: toPersianDigits('مدیریت زمان و انرژی'), description: toPersianDigits('یاد بگیرید چگونه زمان و انرژی خود را بهینه مدیریت کنید.'), categoryIds: ['cat1'], learningObjectives: [], modules: mockModules, estimatedTime: toPersianDigits('۳ ساعت'), difficultyLevel: 'Intermediate', overallProgress: 0 }, ];
const mockLearningContent: LearningContent[] = [ { id: 'lc1', title: toPersianDigits('مقاله: برنامه‌ریزی روزانه'), type: 'article', categoryIds: ['cat1'], description: toPersianDigits('چرا برنامه‌ریزی کلید موفقیت است؟'), tags: [], estimatedTime: toPersianDigits('۱۰ دقیقه'), difficultyLevel: 'Easy' }, ];
const mockHyperPersonalizedContent: LearningContent[] = [mockLearningContent[0]];
const allPossibleBadgesData: Badge[] = [ {id: 'b1', name: toPersianDigits("کاوشگر دانش"), description: toPersianDigits("اولین مسیر یادگیری خود را شروع کردید!"), iconUrl: <AcademicCapIcon/>, condition: toPersianDigits("شروع اولین مسیر")}, {id: 'b2', name: toPersianDigits("حل‌کننده چالش"), description: toPersianDigits("اولین چالش هفتگی را تکمیل کردید."), iconUrl: <ChallengeIcon/>, condition: toPersianDigits("تکمیل ۱ چالش")}, ];
const earnedBadgesData = allPossibleBadgesData.length > 0 ? [allPossibleBadgesData[0]] : [];
const mockSkills: Skill[] = [ {id: 'sk1', name: toPersianDigits("مدیریت زمان"), proficiency: 'learning', categoryName: mockCategories[0].name, relatedPathIds: ['lp1']}, ];
const mockPracticalExercises: PracticalExercise[] = [ { id: 'ex1', title: toPersianDigits("تمرین: برنامه‌ریزی یک روز کاری"), description: toPersianDigits("یک برنامه روزانه برای فردا با حداقل ۵ وظیفه کلیدی بنویسید و اولویت‌بندی کنید."), submissionType: 'text', skillToPractice: toPersianDigits("برنامه‌ریزی روزانه") } ];
const mockJournalEntries: JournalEntry[] = [ { id: 'j1', date: new Date().toISOString(), text: toPersianDigits("یادداشت نمونه."), tags: [] }, ];
const mockWeeklyChallengeData: WeeklyChallenge = { id: 'wc1', title: toPersianDigits("چالش تمرکز هفته"), description: toPersianDigits("کار عمیق روزانه."), skillApplied: toPersianDigits("تمرکز"), dueDate: new Date(Date.now() + 7 * 86400000).toISOString(), rewardPoints: 50, status: 'active', };
const mockForumTopicsData: ForumTopic[] = [{ id: 'ft1', title: toPersianDigits('بهترین منابع پایتون؟'), author: toPersianDigits('کاربر_الف'), lastActivity: new Date().toISOString(), repliesCount: 15, viewCount: 120 }];
const mockStudyGroupsData: StudyGroup[] = [{ id: 'sg1', name: toPersianDigits('گروه پایتون'), topic: toPersianDigits('پایتون'), membersCount: 25, isActive: true }];
const mockWebinarsData: Webinar[] = [{ id: 'wb1', title: toPersianDigits('وبینار AI'), speaker: toPersianDigits('دکتر هوشمند'), dateTime: new Date(Date.now() + 86400000 * 10).toISOString(), duration: '۱.۵ ساعت', platform: 'Zoom' }];
const mockMentorProfilesData: MentorshipProfile[] = [ { userId: 'mentor1', userName: toPersianDigits('استاد برنامه‌نویس'), skillsToMentor: [toPersianDigits('پایتون'), toPersianDigits('React')], experienceLevel: toPersianDigits('متخصص (۵+ سال)'), availability: toPersianDigits('عصرهای شنبه و دوشنبه'), bio: toPersianDigits('توسعه‌دهنده ارشد نرم‌افزار با علاقه به کمک به یادگیرندگان جدید.') }, { userId: 'mentor2', userName: toPersianDigits('مربی مدیریت'), skillsToMentor: [toPersianDigits('مدیریت زمان'), toPersianDigits('رهبری تیم')], experienceLevel: toPersianDigits('باتجربه (۳ سال)'), availability: toPersianDigits('صبح‌های یکشنبه'), bio: toPersianDigits('کمک به شما برای دستیابی به اهداف بهره‌وری و رهبری.') }, ];
const mockUserGeneratedContentData: UserGeneratedContent[] = [ { id: 'ugc1', authorId: 'user123', authorName: toPersianDigits('کاربر خلاق'), type: 'article', title: toPersianDigits('نکات طلایی برای یادگیری سریع زبان'), description: toPersianDigits('تجربیات شخصی من در یادگیری زبان جدید در ۶ ماه.'), contentData: { text: "متن کامل مقاله کاربر خلاق در اینجا قرار می‌گیرد..." }, tags: [toPersianDigits('یادگیری زبان'), toPersianDigits('نکات')], submissionDate: new Date(Date.now() - 86400000 * 5).toISOString(), status: 'approved', averageRating: 4.5, reviewCount: 12 }, ];
// Phase 3.4 Mock Data
const mockPredictiveSkillSuggestions: PredictiveSkillSuggestion[] = [
  { id: 'pss1', skillName: toPersianDigits("تحلیل داده با پایتون"), rationale: toPersianDigits("تقاضای بالا در بازار کار برای تحلیلگران داده و مهارت پایتون."), relevanceToUser: toPersianDigits("مرتبط با علاقه شما به برنامه‌نویسی و حل مسئله."), learningPathId: "lp-python-data", marketDemandIndicator: 'high' },
  { id: 'pss2', skillName: toPersianDigits("هوش مصنوعی اخلاقی"), rationale: toPersianDigits("اهمیت روزافزون ملاحظات اخلاقی در توسعه و کاربرد هوش مصنوعی."), relevanceToUser: toPersianDigits("تکمیل‌کننده دانش شما در حوزه AI و یادگیری ماشین."), marketDemandIndicator: 'medium' },
];

// --- COMPONENT ---
export interface LearningPageProps { 
  userName: string;
  navigateToAppPage: (page: PageName | string, params?: any) => void; // Allow string for flexibility
}

type LearningView = 'gateway' | 'library' | 'pathDetail' | 'skillsMap' | 'journal' | 'exerciseDetail' | 'achievements' | 'forum' | 'simulator' | 'creativeWorkspace'; 

const LearningPage: React.FC<LearningPageProps> = ({ userName, navigateToAppPage }) => {
  const apiKey = process.env.API_KEY;
  const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

  const aiAssistantName = "دانا";
  const [isNewUser] = useState(true); 
  const [dailyQuote, setDailyQuote] = useState({ text: toPersianDigits("یادگیری یک گنج است که صاحبش را همه جا همراهی می‌کند."), author: toPersianDigits("ضرب‌المثل چینی") });
  const [currentView, setCurrentView] = useState<LearningView>('gateway');
  const [isLoadingData, setIsLoadingData] = useState(true); 
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<PracticalExercise | null>(null);

  // Data states
  const [categories, setCategories] = useState<LearningCategory[]>(mockCategories);
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>(mockLearningPathsData);
  const [learningContent, setLearningContent] = useState<LearningContent[]>(mockLearningContent);
  const [hyperPersonalizedContent, setHyperPersonalizedContent] = useState<LearningContent[]>(mockHyperPersonalizedContent);
  const [goalRelevanceFilters, setGoalRelevanceFilters] = useState<GoalRelevanceFilter[]>(mockGoalRelevanceFilters);
  const [bookmarkedContentIds, setBookmarkedContentIds] = useState<Set<string>>(new Set(['lc1']));
  const [earnedBadges, setEarnedBadges] = useState<Badge[]>(earnedBadgesData);
  const [allPossibleBadges, setAllPossibleBadges] = useState<Badge[]>(allPossibleBadgesData);
  const [userProgress, setUserProgress] = useState<UserProgress>({ points: 1250, level: 'Explorer', levelNamePersian: toPersianDigits('کاوشگر') });
  const [skills, setSkills] = useState<Skill[]>(mockSkills);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(mockJournalEntries);
  const [activeWeeklyChallenge, setActiveWeeklyChallenge] = useState<WeeklyChallenge | null>(mockWeeklyChallengeData);
  const [forumTopics, setForumTopics] = useState<ForumTopic[]>(mockForumTopicsData);
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>(mockStudyGroupsData);
  const [webinars, setWebinars] = useState<Webinar[]>(mockWebinarsData);
  const [isAILearningBuddyOpen, setIsAILearningBuddyOpen] = useState(false);
  const [ai360FeedbackItems, setAi360FeedbackItems] = useState<AI360FeedbackItem[]>(mockAI360Feedback);
  const [conversationScenarios, setConversationScenarios] = useState<ConversationScenario[]>(mockConversationScenarios);
  const [userGeneratedContent, setUserGeneratedContent] = useState<UserGeneratedContent[]>(mockUserGeneratedContentData);
  const [mentorProfiles, setMentorProfiles] = useState<MentorshipProfile[]>(mockMentorProfilesData);
  const [predictiveSkills, setPredictiveSkills] = useState<PredictiveSkillSuggestion[]>(mockPredictiveSkillSuggestions);
  const [isLearningReportModalOpen, setIsLearningReportModalOpen] = useState(false);


  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => setIsLoadingData(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectPath = (pathId: string) => {
    const path = learningPaths.find(p => p.id === pathId);
    if (path) {
      setSelectedPath(path);
      setCurrentView('pathDetail');
      window.scrollTo(0,0);
    }
  };
  
  const handleToggleBookmark = (contentId: string) => {
    setBookmarkedContentIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(contentId)) newSet.delete(contentId);
      else newSet.add(contentId);
      return newSet;
    });
  };
  
  const handleAwardPoints = useCallback((points: number, actionDescription: string) => {
    setUserProgress(prev => ({ ...prev, points: prev.points + points }));
    alert(toPersianDigits(`تبریک! شما ${points} امتیاز برای "${actionDescription}" کسب کردید.`));
    // Here you might also update level based on new points total
  }, []);

  const handleModuleQuizComplete = useCallback((pathId: string, moduleId: string, score: number, totalQuestions: number) => {
    setLearningPaths(prevPaths => 
        prevPaths.map(p => 
            p.id === pathId ? {
                ...p,
                modules: p.modules.map(m => 
                    m.id === moduleId ? { ...m, completed: true, progress: 100 } : m
                ),
                overallProgress: Math.round(
                    (p.modules.reduce((acc, mod) => acc + (mod.id === moduleId ? 100 : mod.progress), 0) / p.modules.length)
                )
            } : p
        )
    );
  }, []);

  const handleStartExercise = (exerciseId: string) => {
    const exercise = mockPracticalExercises.find(ex => ex.id === exerciseId);
    if (exercise) {
        setSelectedExercise(exercise);
        setCurrentView('exerciseDetail');
        window.scrollTo(0,0);
    }
  };

  const handleSubmitExercise = async (exerciseId: string, submissionText: string, submissionFile?: File): Promise<string | null> => {
    console.log("Exercise submitted:", exerciseId, submissionText, submissionFile);
    if (!ai) return toPersianDigits("سرویس AI برای بازخورد در دسترس نیست.");

    // Simulate AI Feedback generation
    const prompt = toPersianDigits(`کاربر برای تمرین "${mockPracticalExercises.find(ex=>ex.id === exerciseId)?.title}" پاسخ زیر را ارسال کرده است:\n"${submissionText}"\nیک بازخورد کوتاه و سازنده به زبان فارسی ارائه بده.`);
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({model: AI_MODEL_NAME, contents: prompt});
        return response.text || toPersianDigits("بازخورد هوش مصنوعی در دسترس نیست (شبیه‌سازی شده).");
    } catch (error) {
        console.error("AI Feedback Error:", error);
        return toPersianDigits("خطا در دریافت بازخورد از هوش مصنوعی.");
    }
  };

  const handleAddJournalEntry = async (title: string, text: string, tags?: string[]) => {
    const newEntry: JournalEntry = { id: `j-${Date.now()}`, date: new Date().toISOString(), title, text, tags };
    // Simulate AI Insight generation if AI is available
    if (ai && text.length > 50) { // Only get insight for longer texts
        try {
            const insightPrompt = toPersianDigits(`با توجه به این یادداشت کاربر: "${text}"، یک بینش یا سوال تأملی کوتاه (حداکثر ۲۰ کلمه) به زبان فارسی ارائه بده.`);
            const response: GenerateContentResponse = await ai.models.generateContent({model: AI_MODEL_NAME, contents: insightPrompt});
            newEntry.aiInsight = response.text;
        } catch (error) {
            console.error("AI Journal Insight Error:", error);
        }
    }
    setJournalEntries(prev => [newEntry, ...prev]);
  };
  
  const handleAnalyzeJournalWithAI = async (): Promise<string[] | null> => {
    if (!ai || journalEntries.length < 2) return null; 
    const recentEntriesText = journalEntries.slice(0, 3).map(e => e.text).join("\n---\n");
    const prompt = toPersianDigits(`با توجه به چند یادداشت اخیر کاربر: \n${recentEntriesText}\n\nچند الگوی کلیدی، احساسات غالب یا زمینه‌هایی برای تأمل بیشتر (۲-۳ مورد) را به زبان فارسی شناسایی کن.`);
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({model: AI_MODEL_NAME, contents: prompt});
        return response.text.split('\n').map(s => s.replace(/^- /,'').trim()).filter(Boolean);
    } catch (error) {
        console.error("AI Journal Analysis Error:", error);
        return [toPersianDigits("خطا در تحلیل توسط هوش مصنوعی.")];
    }
  };

  const handleStartChallenge = (challengeId: string) => {
      setActiveWeeklyChallenge(prev => prev && prev.id === challengeId ? {...prev, status: 'completed'} : prev);
      // Points are awarded by the widget upon clicking start/complete for now
  };
  
  const handleSendAIBuddyMessage = async (messageText: string): Promise<string> => {
    if (!ai) return toPersianDigits("متاسفانه در حال حاضر نمی‌توانم پاسخ دهم. سرویس AI در دسترس نیست.");
    // Simple echo for now, can be expanded with actual Gemini calls based on messageText
    const prompt = toPersianDigits(`کاربر در حال یادگیری است و پیام زیر را ارسال کرده: "${messageText}". یک پاسخ کوتاه، مفید و دلگرم کننده به زبان فارسی ارائه بده.`);
    try {
      const response: GenerateContentResponse = await ai.models.generateContent({model: AI_MODEL_NAME, contents: prompt});
      return response.text || toPersianDigits("متاسفم، متوجه نشدم. می‌توانید سوال دیگری بپرسید؟");
    } catch (error: any) {
      console.error("AI Buddy Message Error:", error);
      return toPersianDigits("خطایی در پردازش پیام شما رخ داد.");
    }
  };

  const handleSubmitUGC = (ugcData: Omit<UserGeneratedContent, 'id' | 'authorId' | 'authorName' | 'submissionDate' | 'status'>) => {
    const newUGC: UserGeneratedContent = {
      ...ugcData,
      id: `ugc-${Date.now()}`,
      authorId: "current_user_id", // Placeholder
      authorName: userName,
      submissionDate: new Date().toISOString(),
      status: 'pending_approval', // Default status
    };
    setUserGeneratedContent(prev => [newUGC, ...prev]);
    // In a real app, this would send to a backend for review
  };
  
  const handleGenerateLearningReport = async (config: LearningReportConfig): Promise<string> => {
    if (!ai) return toPersianDigits("<h3>خطا</h3><p>سرویس هوش مصنوعی برای تولید گزارش در دسترس نیست.</p>");

    // Simulate fetching necessary data based on config for the prompt
    let reportDataSummary = toPersianDigits(`خلاصه فعالیت‌های یادگیری کاربر در دوره ${config.period === 'monthly' ? 'ماهانه' : config.period === 'quarterly' ? 'فصلی' : 'سالانه'}:\n`);
    if(config.includeSkillSummary) {
        reportDataSummary += toPersianDigits(`- مهارت‌های کسب شده/در حال یادگیری: ${skills.map(s => s.name).join(', ') || 'هنوز مهارتی ثبت نشده'}\n`);
    }
    if(config.includeGoalImpactAnalysis) {
        reportDataSummary += toPersianDigits(`- مسیرهای یادگیری فعال: ${learningPaths.filter(p => p.overallProgress < 100 && p.overallProgress > 0).length} مورد\n`);
        reportDataSummary += toPersianDigits(`- مسیرهای تکمیل شده: ${learningPaths.filter(p => p.overallProgress === 100).length} مورد\n`);
    }
    
    const prompt = toPersianDigits(
        `لطفاً یک گزارش یادگیری و رشد شخصی به زبان فارسی بر اساس خلاصه فعالیت‌های زیر تهیه کن:
        ${reportDataSummary}
        ${config.includeFutureSuggestions ? 'همچنین، چند پیشنهاد کلی برای ادامه مسیر یادگیری و رشد ارائه بده.' : ''}
        گزارش باید ساختار HTML داشته باشد و شامل عنوان اصلی، بخش‌های مجزا با عنوان‌های فرعی مناسب و لیست‌های نقطه‌ای برای خوانایی بهتر باشد. از تگ‌های <h2> برای عنوان اصلی و <h3> برای عناوین فرعی استفاده کن.`
    );

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({model: AI_MODEL_NAME, contents: prompt});
        return response.text || toPersianDigits("<p>خطا در تولید محتوای گزارش.</p>");
    } catch (error) {
        console.error("AI Learning Report Error:", error);
        return toPersianDigits("<h3>خطا</h3><p>متاسفانه در تولید گزارش با هوش مصنوعی مشکلی پیش آمد.</p>");
    }
  };


  const GatewayView: React.FC = () => (
    <div className="space-y-6 sm:space-y-8">
      <header className="text-center mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl shadow-xl text-white">
        <PageIcon className="w-14 h-14 mx-auto mb-3"/>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">{toPersianDigits(`به مرکز یادگیری خوش آمدید، ${userName}!`)}</h1>
        <p className="text-sm sm:text-md opacity-90 max-w-xl mx-auto">{toPersianDigits(`با کمک ${aiAssistantName}، همیار هوشمند شما، دانش خود را گسترش دهید، مهارت‌های جدید بیاموزید و به اهداف رشد فردی خود برسید.`)}</p>
         {isNewUser && <p className="text-xs mt-2 bg-white/20 px-3 py-1 rounded-full inline-block">{toPersianDigits("نکته: برای شروع، یک مسیر یادگیری را از کتابخانه انتخاب کنید یا با همیار AI خود گفتگو کنید.")}</p>}
      </header>

      <blockquote className="p-3 sm:p-4 bg-sky-50 rounded-md border-r-4 rtl:border-l-4 rtl:border-r-0 border-sky-500 text-sm text-gray-700 italic">
        "{dailyQuote.text}" <span className="block text-xs text-gray-500 mt-1">- {dailyQuote.author}</span>
      </blockquote>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {[
          { title: toPersianDigits("کتابخانه جامع"), description: toPersianDigits("کاوش در مسیرها و محتوای متنوع"), icon: <BookIcon/>, view: 'library' as LearningView, color: 'sky' },
          { title: toPersianDigits("نقشه مهارت‌های من"), description: toPersianDigits("مشاهده و پیگیری مهارت‌ها"), icon: <MapPinIcon/>, view: 'skillsMap' as LearningView, color: 'purple' },
          { title: toPersianDigits("دفترچه یادداشت"), description: toPersianDigits("ثبت آموخته‌ها و تأملات"), icon: <JournalIcon/>, view: 'journal' as LearningView, color: 'teal' },
          { title: toPersianDigits("دستاوردها و نشان‌ها"), description: toPersianDigits("جوایز کسب شده در مسیر یادگیری"), icon: <TrophyIcon/>, view: 'achievements' as LearningView, color: 'yellow' },
          { title: toPersianDigits("انجمن و رویدادها"), description: toPersianDigits("ارتباط با دیگران و وبینارها"), icon: <ForumIconIcon/>, view: 'forum' as LearningView, color: 'indigo' },
          { title: toPersianDigits("تمرین مهارت‌های نرم"), description: toPersianDigits("شبیه‌سازی مکالمات با AI"), icon: <UsersIcon/>, view: 'simulator' as LearningView, color: 'rose' },
          { title: toPersianDigits("فضای کاری خلاق"), description: toPersianDigits("طوفان فکری و حل مسئله با AI"), icon: <LightbulbMultipleIcon/>, view: 'creativeWorkspace' as LearningView, color: 'orange' },
        ].map(item => (
          <button 
            key={item.view}
            onClick={() => setCurrentView(item.view)}
            className={`p-4 sm:p-5 rounded-xl shadow-md border border-gray-200/70 bg-white hover:shadow-lg hover:border-${item.color}-400 transition-all duration-300 text-right group`}
          >
            <div className={`p-2 bg-${item.color}-100 text-${item.color}-600 rounded-full inline-block mb-2 group-hover:scale-110 transition-transform`}>
              {React.cloneElement(item.icon, {className: "w-6 h-6 sm:w-7 sm:h-7"})}
            </div>
            <h3 className={`text-md sm:text-lg font-semibold text-${item.color}-700 group-hover:text-${item.color}-800 mb-1`}>{item.title}</h3>
            <p className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-700 line-clamp-2">{item.description}</p>
          </button>
        ))}
      </div>
    </div>
  );


  const renderView = () => {
    switch (currentView) {
      case 'library':
        return <LearningLibrary 
                  isLoadingData={isLoadingData} 
                  categories={categories} 
                  paths={learningPaths} 
                  contentItems={learningContent} 
                  hyperPersonalizedContent={hyperPersonalizedContent}
                  goalRelevanceFilters={goalRelevanceFilters}
                  bookmarkedContentIds={bookmarkedContentIds}
                  earnedBadges={earnedBadges} 
                  userProgress={userProgress}
                  onSelectPath={handleSelectPath} 
                  onToggleBookmark={handleToggleBookmark} 
                  onNavigateToGateway={() => setCurrentView('gateway')}
                  onNavigateToSkillsMap={() => setCurrentView('skillsMap')}
                  onNavigateToJournal={() => setCurrentView('journal')}
                  activeWeeklyChallenge={activeWeeklyChallenge}
                  onStartChallenge={handleStartChallenge}
                  onAwardPoints={handleAwardPoints}
                  onNavigateToAchievements={() => setCurrentView('achievements')}
                  onNavigateToForum={() => setCurrentView('forum')}
                  ai360FeedbackItems={ai360FeedbackItems} 
                  onNavigateToSimulator={() => setCurrentView('simulator')} 
                  onNavigateToCreativeWorkspace={() => setCurrentView('creativeWorkspace')} 
                  userGeneratedContent={userGeneratedContent}
                  onSubmitUGC={handleSubmitUGC}
                  predictiveSkills={predictiveSkills}
                  onViewLearningPath={handleSelectPath}
                  onOpenLearningReportModal={() => setIsLearningReportModalOpen(true)}
                />;
      case 'pathDetail':
        return selectedPath ? <LearningPathDetailView path={selectedPath} onBack={() => setCurrentView('library')} allLearningContent={learningContent} onModuleQuizComplete={handleModuleQuizComplete} onStartExercise={handleStartExercise} onAwardPoints={handleAwardPoints}/> : <GatewayView />;
      case 'skillsMap':
        return <SkillsMapPage skills={skills} onBackToLibrary={() => setCurrentView('library')} onNavigateToGateway={() => setCurrentView('gateway')}/>;
      case 'exerciseDetail':
        return selectedExercise ? <PracticalExerciseView exercise={selectedExercise} onSubmitExercise={handleSubmitExercise} onClose={() => { setSelectedExercise(null); setCurrentView('pathDetail'); /* Or library if preferred */}} /> : <GatewayView />;
      case 'journal':
        return <LearningJournalPage entries={journalEntries} onAddEntry={handleAddJournalEntry} onAnalyzeJournal={handleAnalyzeJournalWithAI} onBackToLibrary={() => setCurrentView('library')} onNavigateToGateway={() => setCurrentView('gateway')} />;
      case 'achievements':
        return <AchievementsPage earnedBadges={earnedBadges} allPossibleBadges={allPossibleBadges} onBackToLibrary={() => setCurrentView('library')} onNavigateToGateway={() => setCurrentView('gateway')} />;
      case 'forum':
        return <ForumPage forumTopics={forumTopics} studyGroups={studyGroups} webinars={webinars} mentorProfiles={mentorProfiles} onBackToLibrary={() => setCurrentView('library')} onNavigateToGateway={() => setCurrentView('gateway')} />;
      case 'simulator':
        return ai ? <ConversationSimulatorView scenarios={conversationScenarios} onBack={() => setCurrentView('gateway')} ai={ai} /> : <p>AI is not available.</p>;
      case 'creativeWorkspace':
        return ai ? <CreativeWorkspace onBack={() => setCurrentView('gateway')} ai={ai} /> : <p>AI is not available.</p>;
      case 'gateway':
      default:
        return <GatewayView />;
    }
  };

  return (
    <div className="pb-16"> {/* Padding for FAB */}
      {renderView()}
      <AILearningBuddy 
        isOpen={isAILearningBuddyOpen}
        onToggle={() => setIsAILearningBuddyOpen(!isAILearningBuddyOpen)}
        onSendMessage={handleSendAIBuddyMessage}
      />
       {isLearningReportModalOpen && ai && (
        <LearningReportModal 
          isOpen={isLearningReportModalOpen}
          onClose={() => setIsLearningReportModalOpen(false)}
          onGenerateReport={handleGenerateLearningReport}
        />
      )}
    </div>
  );
};

export default LearningPage;
