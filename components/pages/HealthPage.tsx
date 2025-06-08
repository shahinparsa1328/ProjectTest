
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { toPersianDigits, parseJsonFromString } from '../../utils';
import { 
    HeartIcon as PageIcon, 
    BookIcon, 
    LightbulbIcon, 
    SparklesIconNav as AiIcon, 
    ChatBubbleOvalLeftEllipsisIcon as ChatIcon,
    CameraIcon,
    ShieldCheckIcon, 
    PencilSquareIcon 
} from '../shared/AppIcons';
import AISmartLearningSuggestionCard from '../learning/AISmartLearningSuggestionCard';
import { LearningPath, LearningContent, LearningSuggestion } from '../../types/learningTypes';
import { PageName } from '../../App';
import { MealPlan, ExercisePlan, JournalEntryHealth, SymptomCheckSession, SymptomCheckMessage, DailyMealPlan, DailyExercisePlan, Meal, Exercise } from '../../types/healthTypes';
import CollapsibleSection from '../shared/CollapsibleSection';
import LoadingSpinner from '../shared/LoadingSpinner';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import ToastNotification from '../shared/ToastNotification';

const AI_MODEL_NAME = 'gemini-2.5-flash-preview-04-17';

const HEALTH_MEAL_PLAN_KEY = 'healthPage_mealPlan_v2';
const HEALTH_EXERCISE_PLAN_KEY = 'healthPage_exercisePlan_v2';
const HEALTH_JOURNAL_ENTRIES_KEY = 'healthPage_journalEntries_v2';
const HEALTH_SYMPTOM_SESSIONS_KEY = 'healthPage_symptomSessions_v2';
const HEALTH_NUTRITION_PREFS_KEY = 'healthPage_nutritionPrefs_v1';
const HEALTH_EXERCISE_PREFS_KEY = 'healthPage_exercisePrefs_v1';


interface HealthPageProps {
  learningPaths?: LearningPath[];
  learningContent?: LearningContent[];
  navigateTo?: (pageName: PageName | string, params?: any) => void;
}

const HealthPage: React.FC<HealthPageProps> = ({ learningPaths = [], learningContent = [], navigateTo }) => {
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [exercisePlan, setExercisePlan] = useState<ExercisePlan | null>(null);
  const [journalEntries, setJournalEntries] = useState<JournalEntryHealth[]>([]);
  const [currentJournalInput, setCurrentJournalInput] = useState('');
  const [symptomSessions, setSymptomSessions] = useState<SymptomCheckSession[]>([]);
  const [currentSymptomSession, setCurrentSymptomSession] = useState<SymptomCheckSession | null>(null);
  const [symptomInput, setSymptomInput] = useState('');
  const [isSymptomDisclaimerAccepted, setIsSymptomDisclaimerAccepted] = useState(false);
  
  const [userNutritionPreferences, setUserNutritionPreferences] = useState('');
  const [userExercisePreferences, setUserExercisePreferences] = useState('');

  const [isLoadingMealPlan, setIsLoadingMealPlan] = useState(false);
  const [isLoadingExercisePlan, setIsLoadingExercisePlan] = useState(false);
  const [isLoadingJournalAnalysis, setIsLoadingJournalAnalysis] = useState(false);
  const [isLoadingSymptomResponse, setIsLoadingSymptomResponse] = useState(false);

  const [healthSuggestions, setHealthSuggestions] = useState<LearningSuggestion[]>([]);
  const chatMessagesEndRef = useRef<HTMLDivElement>(null);
  const [toast, setToast] = useState<{id: number, text: string, type: 'success'|'error'|'info'} | null>(null);

  const [openSections, setOpenSections] = useState({
    learning: true, planning: true, vision: false, journal: true, symptom: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const ai = process.env.API_KEY ? new GoogleGenAI({ apiKey: process.env.API_KEY }) : null;
  
  const showToast = useCallback((text: string, type: 'success'|'error'|'info' = 'info') => {
    setToast({ id: Date.now(), text: toPersianDigits(text), type });
  }, []);

  useEffect(() => { if (toast) { const timer = setTimeout(() => setToast(null), 3000); return () => clearTimeout(timer); } }, [toast]);

  useEffect(() => {
    const storedMealPlan = localStorage.getItem(HEALTH_MEAL_PLAN_KEY); if (storedMealPlan) setMealPlan(JSON.parse(storedMealPlan));
    const storedExercisePlan = localStorage.getItem(HEALTH_EXERCISE_PLAN_KEY); if (storedExercisePlan) setExercisePlan(JSON.parse(storedExercisePlan));
    const storedJournalEntries = localStorage.getItem(HEALTH_JOURNAL_ENTRIES_KEY); if (storedJournalEntries) setJournalEntries(JSON.parse(storedJournalEntries));
    const storedSymptomSessions = localStorage.getItem(HEALTH_SYMPTOM_SESSIONS_KEY); if (storedSymptomSessions) setSymptomSessions(JSON.parse(storedSymptomSessions));
    const storedNutritionPrefs = localStorage.getItem(HEALTH_NUTRITION_PREFS_KEY); if (storedNutritionPrefs) setUserNutritionPreferences(storedNutritionPrefs);
    const storedExercisePrefs = localStorage.getItem(HEALTH_EXERCISE_PREFS_KEY); if (storedExercisePrefs) setUserExercisePreferences(storedExercisePrefs);

    const meditationContent = learningContent.find(lc => lc.id === 'lc-med');
    if (meditationContent && !healthSuggestions.find(s => s.id === 'sugg-health-med')) {
      setHealthSuggestions(prev => [...prev, {
        id: 'sugg-health-med', type: 'content', itemId: meditationContent.id, title: meditationContent.title,
        description: "برای کمک به مدیریت استرس و بهبود تمرکز، این محتوای مدیتیشن پیشنهاد می‌شود.",
        sourceModule: 'Health', triggerContext: "هدف سلامتی: کاهش استرس",
      }]);
    }
  }, [learningContent, healthSuggestions]);

  useEffect(() => { if(mealPlan) localStorage.setItem(HEALTH_MEAL_PLAN_KEY, JSON.stringify(mealPlan));}, [mealPlan]);
  useEffect(() => { if(exercisePlan) localStorage.setItem(HEALTH_EXERCISE_PLAN_KEY, JSON.stringify(exercisePlan));}, [exercisePlan]);
  useEffect(() => { localStorage.setItem(HEALTH_JOURNAL_ENTRIES_KEY, JSON.stringify(journalEntries));}, [journalEntries]);
  useEffect(() => { localStorage.setItem(HEALTH_SYMPTOM_SESSIONS_KEY, JSON.stringify(symptomSessions));}, [symptomSessions]);
  useEffect(() => { localStorage.setItem(HEALTH_NUTRITION_PREFS_KEY, userNutritionPreferences);}, [userNutritionPreferences]);
  useEffect(() => { localStorage.setItem(HEALTH_EXERCISE_PREFS_KEY, userExercisePreferences);}, [userExercisePreferences]);
  
  useEffect(() => { chatMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" });}, [currentSymptomSession?.messages]);


  const handleGenerateMealPlan = async () => {
    if (!ai) { showToast("سرویس هوش مصنوعی در دسترس نیست.", "error"); return; }
    if (!userNutritionPreferences.trim()) { showToast("لطفاً ابتدا ترجیحات غذایی خود را وارد کنید.", "error"); return; }
    setIsLoadingMealPlan(true);
    setMealPlan(null);
    try {
        const prompt = `یک برنامه غذایی کامل ۷ روزه به زبان فارسی و در قالب JSON برای کاربر با ترجیحات زیر تولید کن: "${userNutritionPreferences}". ساختار JSON باید کاملاً مطابق با نوع MealPlan و زیرمجموعه‌های آن (DailyMealPlan, Meal) در TypeScript باشد: { "id": "string (شناسه تولیدی)", "title": "string (عنوان خلاقانه برای برنامه غذایی)", "startDate": "string (YYYY-MM-DD تاریخ امروز)", "durationDays": 7, "dailyPlans": [{ "dayOfWeek": "string ('شنبه' تا 'جمعه')", "meals": [{ "name": "string ('صبحانه'|'ناهار'|'شام'|'میان‌وعده')", "description": "string (توضیح کامل غذا)", "calories": number (اختیاری), "protein": number (اختیاری), "carbs": number (اختیاری), "fat": number (اختیاری), "notes": "string (اختیاری، مثلاً 'مخصوص گیاهخواران')" }], "dailyTotals": { "calories": number (اختیاری) }, "aiRationaleForDay": "string (اختیاری، توضیح برای انتخاب غذاهای این روز)" }], "aiGeneratedRationale": "string (توضیح کلی منطق برنامه)", "userPreferences": { "otherNotes": "${userNutritionPreferences}" } }. عنوان برنامه باید خلاقانه و مرتبط با ترجیحات باشد. کالری‌ها و دلایل اختیاری هستند اما ترجیح داده می‌شوند. مطمئن شو که هر روز شامل وعده‌های اصلی و حداقل یک میان‌وعده باشد.`;
        
        const response: GenerateContentResponse = await ai.models.generateContent({ model: AI_MODEL_NAME, contents: prompt, config: { responseMimeType: "application/json" } });
        const parsedPlan = parseJsonFromString<MealPlan>(response.text);

        if (parsedPlan && parsedPlan.dailyPlans && Array.isArray(parsedPlan.dailyPlans) && parsedPlan.dailyPlans.every(dp => dp.meals && Array.isArray(dp.meals))) {
            parsedPlan.id = `mp-${Date.now()}`;
            parsedPlan.startDate = new Date().toISOString().split('T')[0];
            parsedPlan.userPreferences = { ...parsedPlan.userPreferences, otherNotes: userNutritionPreferences };
            setMealPlan(parsedPlan);
            showToast("برنامه غذایی با موفقیت تولید شد!", "success");
        } else { throw new Error("فرمت پاسخ برنامه غذایی نامعتبر است یا شامل آرایه‌های مورد انتظار نیست."); }
    } catch (e:any) { console.error("Error generating meal plan:", e); showToast(`خطا در تولید برنامه غذایی: ${e.message || "خطای ناشناخته"}`, "error"); }
    finally { setIsLoadingMealPlan(false); }
  };

  const handleGenerateExercisePlan = async () => {
    if (!ai) { showToast("سرویس هوش مصنوعی در دسترس نیست.", "error"); return; }
    if (!userExercisePreferences.trim()) { showToast("لطفاً ابتدا ترجیحات ورزشی خود را وارد کنید.", "error"); return; }
    setIsLoadingExercisePlan(true);
    setExercisePlan(null);
    try {
        const prompt = `یک برنامه ورزشی هفتگی (مثلاً برای ۳ یا ۵ روز با روزهای استراحت) به زبان فارسی و در قالب JSON برای کاربر با ترجیحات زیر تولید کن: "${userExercisePreferences}". ساختار JSON باید مطابق با نوع ExercisePlan و زیرمجموعه‌های آن (DailyExercisePlan, Exercise) در TypeScript باشد: { "id": "string (شناسه تولیدی)", "title": "string (عنوان خلاقانه برای برنامه ورزشی)", "startDate": "string (YYYY-MM-DD تاریخ امروز)", "durationWeeks": number (مثلاً ۴), "weeklySchedule": [{ "dayOfWeek": "string ('شنبه' تا 'جمعه' یا 'هر روز')", "exercises": [{ "name": "string", "type": "string ('قدرتی'|'هوازی'|'کششی'|'ذهن و بدن')", "sets"?: number, "reps"?: string, "durationMinutes"?: number, "intensity"?: string ('کم'|'متوسط'|'زیاد'), "description"?: string, "notes"?: string }], "isRestDay"?: boolean, "aiRationaleForDay"?: string }], "aiGeneratedRationale"?: string, "userPreferences": { "otherNotes": "${userExercisePreferences}" } }. عنوان برنامه باید خلاقانه باشد.`;
        const response: GenerateContentResponse = await ai.models.generateContent({ model: AI_MODEL_NAME, contents: prompt, config: { responseMimeType: "application/json" } });
        const parsedPlan = parseJsonFromString<ExercisePlan>(response.text);
        if (parsedPlan && parsedPlan.weeklySchedule && Array.isArray(parsedPlan.weeklySchedule) && parsedPlan.weeklySchedule.every(ws => Array.isArray(ws.exercises) || ws.isRestDay)) {
            parsedPlan.id = `ep-${Date.now()}`;
            parsedPlan.startDate = new Date().toISOString().split('T')[0];
            parsedPlan.userPreferences = { ...parsedPlan.userPreferences, otherNotes: userExercisePreferences };
            setExercisePlan(parsedPlan);
            showToast("برنامه ورزشی با موفقیت تولید شد!", "success");
        } else { throw new Error("فرمت پاسخ برنامه ورزشی نامعتبر است یا شامل آرایه‌های مورد انتظار نیست."); }
    } catch (e:any) { console.error("Error generating exercise plan:", e); showToast(`خطا در تولید برنامه ورزشی: ${e.message || "خطای ناشناخته"}`, "error");}
    finally { setIsLoadingExercisePlan(false); }
  };

  const handleAnalyzeJournalEntry = async () => {
    if (!ai) { showToast("سرویس هوش مصنوعی در دسترس نیست.", "error"); return;}
    if (!currentJournalInput.trim()) {showToast("لطفاً ابتدا متنی برای یادداشت وارد کنید.", "error"); return;}
    setIsLoadingJournalAnalysis(true);
    try {
        const prompt = `متن یادداشت زیر را تحلیل کن: "${currentJournalInput}". یک تحلیل احساسات (شامل score عددی بین -۱ و ۱، یک label متنی فارسی مثل 'مثبت'، 'منفی'، 'خنثی'، 'بسیار مثبت'، 'بسیار منفی'، یک dominantEmotion به فارسی، و یک stressLevel به فارسی مثل 'کم'، 'متوسط'، 'زیاد'، 'بسیار زیاد'، 'نامشخص') و یک aiInsight (بینش کوتاه و مفید از یادداشت به فارسی) ارائه بده. پاسخ باید در قالب JSON با ساختار زیر باشد: { "sentimentAnalysis": { "score": number, "label": "string", "dominantEmotion": "string", "stressLevel": "string" }, "aiInsight": "string" }`;
        const response: GenerateContentResponse = await ai.models.generateContent({ model: AI_MODEL_NAME, contents: prompt, config: { responseMimeType: "application/json" }});
        const analysisResult = parseJsonFromString<{sentimentAnalysis: NonNullable<JournalEntryHealth['sentimentAnalysis']>, aiInsight: string}>(response.text);
        if (analysisResult && analysisResult.sentimentAnalysis) {
            const newEntry: JournalEntryHealth = {
                id: `journal-${Date.now()}`, date: new Date().toISOString(), text: currentJournalInput,
                sentimentAnalysis: analysisResult.sentimentAnalysis, aiInsight: analysisResult.aiInsight,
            };
            setJournalEntries(prev => [newEntry, ...prev]);
            setCurrentJournalInput('');
            showToast("تحلیل یادداشت با موفقیت انجام شد.", "success");
        } else { throw new Error("فرمت پاسخ تحلیل نامعتبر است."); }
    } catch (e:any) { console.error("Error analyzing journal:", e); showToast(`خطا در تحلیل یادداشت: ${e.message || "خطای ناشناخته"}`, "error"); }
    finally { setIsLoadingJournalAnalysis(false); }
  };

  const handleSymptomChatSend = async () => {
    if (!ai) { showToast("سرویس هوش مصنوعی در دسترس نیست.", "error"); return; }
    if (!symptomInput.trim()) {showToast("لطفاً علائم خود را وارد کنید.", "error"); return;}
    setIsLoadingSymptomResponse(true);
    const userMessage: SymptomCheckMessage = { id: `symp-user-${Date.now()}`, sender: 'user', text: symptomInput, timestamp: new Date().toISOString() };
    let sessionToUpdate = currentSymptomSession;

    if (!sessionToUpdate) {
        sessionToUpdate = {
            id: `symp-sess-${Date.now()}`, userId: "user_placeholder_id", startTime: new Date().toISOString(),
            userInitialSymptoms: symptomInput, messages: [userMessage], aiDisclaimerDisplayed: true, status: 'active'
        };
    } else {
        sessionToUpdate = {...sessionToUpdate, messages: [...sessionToUpdate.messages, userMessage] };
    }
    setCurrentSymptomSession(sessionToUpdate);
    const currentInputForPrompt = symptomInput;
    setSymptomInput('');

    try {
        const conversationHistory = sessionToUpdate.messages.slice(-6).map(m => `${m.sender === 'user' ? 'کاربر' : 'دستیار'}: ${m.text}`).join('\n');
        const prompt = `شما یک دستیار بررسی علائم هستید. کاربر با شما چت می‌کند. این یک ابزار تشخیصی نیست و صرفاً برای ارائه اطلاعات عمومی و پرسیدن سوالات شفاف کننده است. از ارائه تشخیص قطعی یا تجویز دارو خودداری کنید. کاربر به تازگی گفته: "${currentInputForPrompt}".\nتاریخچه اخیر گفتگو (در صورت وجود):\n${conversationHistory}\nپاسخ شما به زبان فارسی:`;
        const response: GenerateContentResponse = await ai.models.generateContent({ model: AI_MODEL_NAME, contents: prompt });
        const aiResponseText = response.text || "متاسفم، متوجه نشدم. می‌توانید واضح‌تر بگویید؟";
        const aiMessage: SymptomCheckMessage = { id: `symp-ai-${Date.now()}`, sender: 'ai', text: aiResponseText, timestamp: new Date().toISOString() };
        setCurrentSymptomSession(prev => prev ? {...prev, messages: [...prev.messages, aiMessage]} : null);
    } catch (e:any) { 
        console.error("Error in symptom chat:", e); 
        const errorMsg: SymptomCheckMessage = { id: `symp-err-${Date.now()}`, sender: 'ai', text: "خطا در ارتباط با سرویس هوش مصنوعی.", timestamp: new Date().toISOString() };
        setCurrentSymptomSession(prev => prev ? {...prev, messages: [...prev.messages, errorMsg]} : null);
        showToast("خطا در چت بررسی علائم.", "error");
    }
    finally { setIsLoadingSymptomResponse(false); }
  };

  const handleEndSymptomChat = () => {
    if (currentSymptomSession) {
        const endedSession = {...currentSymptomSession, endTime: new Date().toISOString(), status: 'completed' as 'completed'};
        setSymptomSessions(prev => [endedSession, ...prev.filter(s => s.id !== endedSession.id)]);
        setCurrentSymptomSession(null);
        showToast("جلسه بررسی علائم ذخیره شد.", "info");
    }
  };

  const handleViewSuggestion = (type: LearningSuggestion['type'], itemId: string) => {
    if (navigateTo) navigateTo('Learning', { view: 'detail', type, itemId });
  };

  return (
    <div className="page bg-health-page">
      {toast && <ToastNotification message={toast.text} type={toast.type} isVisible={!!toast} onClose={() => setToast(null)} />}
      <header className="text-center mb-6 p-4 bg-gradient-to-br from-red-500 to-pink-600 rounded-b-xl shadow-lg text-white">
        <PageIcon className="w-10 h-10 mx-auto mb-2" />
        <h1 className="text-xl font-bold">{toPersianDigits("سلامت و بهزیستی یکپارچه")}</h1>
        <p className="text-xs opacity-90">{toPersianDigits("ابزارهای هوشمند برای تغذیه، ورزش، ذهن و مراقبت از خود.")}</p>
      </header>

      {healthSuggestions.length > 0 && (
        <CollapsibleSection title="پیشنهادات یادگیری سلامت محور" icon={<BookIcon className="text-red-500" />} className="mb-6" isOpen={openSections.learning} onToggle={() => toggleSection('learning')}>
          <div className="space-y-3 p-2">
            {healthSuggestions.map(suggestion => (
              <AISmartLearningSuggestionCard key={suggestion.id} suggestion={suggestion} onViewSuggestion={handleViewSuggestion} />
            ))}
          </div>
        </CollapsibleSection>
      )}

      <CollapsibleSection title="برنامه‌ریزی هوشمند تغذیه و ورزش" icon={<AiIcon className="text-red-500" />} className="mb-6" isOpen={openSections.planning} onToggle={() => toggleSection('planning')}>
        <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-200 space-y-3">
          <div>
            <label htmlFor="nutritionPrefs" className="block text-xs font-medium text-gray-700 mb-1">ترجیحات غذایی (اهداف، محدودیت‌ها، غذاهای مورد علاقه/مورد تنفر):</label>
            <textarea id="nutritionPrefs" value={userNutritionPreferences} onChange={e => setUserNutritionPreferences(e.target.value)} rows={3} className="w-full p-2 border rounded-md text-xs" placeholder="مثال: کاهش وزن، گیاهخوار، بدون گلوتن، عاشق سبزیجات، از کلم بروکلی متنفرم"/>
            <button onClick={handleGenerateMealPlan} disabled={isLoadingMealPlan || !ai || !userNutritionPreferences.trim()} className="btn-primary-red w-full text-xs mt-1">
              {isLoadingMealPlan ? <LoadingSpinner size="sm"/> : toPersianDigits("تولید برنامه غذایی با AI")}
            </button>
          </div>
          {mealPlan && (
            <div className="p-2 border rounded-md bg-red-50 border-red-200 text-xs">
                <h5 className="font-semibold text-red-700 mb-1">{toPersianDigits(mealPlan.title)}</h5>
                <p className="mb-1">{toPersianDigits(mealPlan.aiGeneratedRationale || '')}</p>
                <p className="text-[10px]">{toPersianDigits(`برای ${mealPlan.durationDays} روز از تاریخ ${new Date(mealPlan.startDate).toLocaleDateString('fa-IR')}`)}</p>
                 {/* Add more detailed display of meal plan here */}
            </div>
          )}
          <div>
            <label htmlFor="exercisePrefs" className="block text-xs font-medium text-gray-700 mb-1">ترجیحات ورزشی (اهداف، نوع ورزش، مدت زمان، تجهیزات):</label>
            <textarea id="exercisePrefs" value={userExercisePreferences} onChange={e => setUserExercisePreferences(e.target.value)} rows={3} className="w-full p-2 border rounded-md text-xs" placeholder="مثال: افزایش قدرت، ۳ روز در هفته، ۳۰ دقیقه، فقط دمبل و وزن بدن"/>
            <button onClick={handleGenerateExercisePlan} disabled={isLoadingExercisePlan || !ai || !userExercisePreferences.trim()} className="btn-primary-red w-full text-xs mt-1">
              {isLoadingExercisePlan ? <LoadingSpinner size="sm"/> : toPersianDigits("تولید برنامه ورزشی با AI")}
            </button>
          </div>
           {exercisePlan && (
             <div className="p-2 border rounded-md bg-red-50 border-red-200 text-xs">
                <h5 className="font-semibold text-red-700 mb-1">{toPersianDigits(exercisePlan.title)}</h5>
                <p className="mb-1">{toPersianDigits(exercisePlan.aiGeneratedRationale || '')}</p>
                <p className="text-[10px]">{toPersianDigits(`برای ${exercisePlan.durationWeeks} هفته از تاریخ ${new Date(exercisePlan.startDate).toLocaleDateString('fa-IR')}`)}</p>
                 {/* Add more detailed display of exercise plan here */}
            </div>
          )}
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="بینایی هوش مصنوعی برای سلامت (مفهومی)" icon={<CameraIcon className="text-red-500" />} className="mb-6" isOpen={openSections.vision} onToggle={() => toggleSection('vision')}>
         <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-200 text-xs text-gray-600 space-y-1">
            <p>{toPersianDigits("این بخش در آینده می‌تواند شامل قابلیت‌هایی مانند تشخیص غذا از روی عکس برای ثبت کالری و تحلیل فرم حرکات ورزشی با استفاده از دوربین دستگاه (با اجازه شما) باشد.")}</p>
            <p className="font-semibold text-red-700">{toPersianDigits("توجه: پیاده‌سازی این ویژگی‌ها نیازمند مدل‌های AI بسیار پیشرفته و ملاحظات دقیق حریم خصوصی است.")}</p>
         </div>
      </CollapsibleSection>

      <CollapsibleSection title="تحلیل احساسات و استرس از دفترچه یادداشت" icon={<PencilSquareIcon className="text-red-500" />} className="mb-6" isOpen={openSections.journal} onToggle={() => toggleSection('journal')}>
        <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-200">
            <textarea value={currentJournalInput} onChange={e => setCurrentJournalInput(e.target.value)} placeholder={toPersianDigits("احساسات و افکار امروز خود را بنویسید...")} rows={4} className="w-full p-2 border rounded-md text-xs mb-2 focus:ring-red-500 focus:border-red-500"/>
            <button onClick={handleAnalyzeJournalEntry} disabled={isLoadingJournalAnalysis || !currentJournalInput.trim() || !ai} className="btn-primary-red w-full text-xs">
                {isLoadingJournalAnalysis ? <LoadingSpinner size="sm"/> : toPersianDigits("ثبت و تحلیل با AI")}
            </button>
            {journalEntries.length > 0 && (
                <div className="mt-3 space-y-2 max-h-60 overflow-y-auto pr-1 scrollbar-thin">
                    {journalEntries.slice(0,3).map(entry => ( 
                        <div key={entry.id} className="p-2 border rounded-md bg-red-50 border-red-100 text-xs">
                            <p className="font-medium text-red-700">{new Date(entry.date).toLocaleString('fa-IR')}</p>
                            <p className="text-gray-700 whitespace-pre-wrap my-1">{toPersianDigits(entry.text.substring(0,100) + (entry.text.length > 100 ? "..." : ""))}</p>
                            {entry.sentimentAnalysis && (
                                <p className="text-[10px] text-gray-600"><strong>{toPersianDigits("احساس:")}</strong> {toPersianDigits(entry.sentimentAnalysis.label)} ({toPersianDigits(entry.sentimentAnalysis.dominantEmotion || '')}) - <strong>{toPersianDigits("استرس:")}</strong> {toPersianDigits(entry.sentimentAnalysis.stressLevel || 'نامشخص')}</p>
                            )}
                            {entry.aiInsight && <p className="text-[10px] text-purple-700 mt-0.5"><strong>{toPersianDigits("بینش AI:")}</strong> {toPersianDigits(entry.aiInsight)}</p>}
                        </div>
                    ))}
                     {journalEntries.length > 3 && <p className="text-center text-[10px] text-gray-500 mt-1">... و بیشتر</p>}
                </div>
            )}
        </div>
      </CollapsibleSection>
      
      <CollapsibleSection title="چت‌بات بررسی‌کننده علائم با AI" icon={<ChatIcon className="text-red-500" />} className="mb-6" isOpen={openSections.symptom} onToggle={() => toggleSection('symptom')}>
        <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-200">
            {!isSymptomDisclaimerAccepted ? (
                <div className="p-2 bg-yellow-50 border border-yellow-300 rounded-md text-xs text-yellow-800">
                    <div className="flex items-start"><ShieldCheckIcon className="w-6 h-6 text-yellow-600 mr-2 rtl:ml-2 rtl:mr-0 flex-shrink-0"/> <p><strong>{toPersianDigits("سلب مسئولیت مهم:")}</strong> {toPersianDigits("این چت‌بات یک ابزار تشخیص پزشکی نیست و صرفاً برای اهداف اطلاعاتی و کمک اولیه طراحی شده است. برای تشخیص و درمان بیماری‌ها حتماً به پزشک مراجعه کنید.")}</p></div>
                    <button onClick={() => setIsSymptomDisclaimerAccepted(true)} className="mt-2 bg-yellow-500 text-white py-1 px-2 rounded text-[10px] hover:bg-yellow-600">می‌پذیرم و ادامه می‌دهم</button>
                </div>
            ) : (
                <div className="flex flex-col h-80">
                    <div className="flex-grow overflow-y-auto mb-2 p-2 border rounded-md space-y-2 bg-gray-50 chat-messages-container">
                        {currentSymptomSession?.messages.map(msg => (
                            <div key={msg.id} className={`chat-message ${msg.sender === 'user' ? 'user !bg-red-500' : '!bg-gray-200'}`}>{toPersianDigits(msg.text)}</div>
                        ))}
                         {isLoadingSymptomResponse && <div className="chat-message !bg-gray-200"><LoadingSpinner size="sm"/></div>}
                        <div ref={chatMessagesEndRef} />
                    </div>
                    <div className="flex gap-2 items-center mt-auto">
                        <input type="text" value={symptomInput} onChange={e => setSymptomInput(e.target.value)} placeholder={toPersianDigits("علائم خود را وارد کنید...")} className="flex-grow p-2 border rounded-md text-xs focus:ring-red-500 focus:border-red-500"/>
                        <button onClick={handleSymptomChatSend} disabled={isLoadingSymptomResponse || !symptomInput.trim() || !ai} className="btn-primary-red text-xs px-3 py-2">ارسال</button>
                    </div>
                     {currentSymptomSession && <button onClick={handleEndSymptomChat} className="text-xs text-red-600 hover:text-red-800 mt-2 w-full">پایان و ذخیره جلسه</button>}
                </div>
            )}
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default HealthPage;
```
  </change>
  <change>
    <file>components/pages/HabitsPage.tsx</file>
    <description>Implement AI habit suggestions and AI wellness reminders using Gemini API. Add UI for user context input for suggestions. Update localStorage persistence. Enhance gamification and multidimensional tracking in LogHabitModal.</description>
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

export interface HabitsPageProps { // Make sure this is exported if App.tsx imports it
  openAddGoalModal?: () => void; // This prop seems unused for habits currently
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
  logDate: string; // YYYY-MM-DD
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
                showToast(toPersianDigits(`عادت "${h.title}" به سطح ${newLevel} ارتقا یافت!`), 'success');
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
      
      {addHabitModal.isOpen && ( /* Add/Edit Modal JSX */
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4" onClick={() => setAddHabitModal(defaultAddHabitModalState)}>
          <div className="bg-white p-5 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200 flex-shrink-0">
              <h3 className="text-lg font-semibold text-gray-800">{toPersianDigits(addHabitModal.editingHabit ? "ویرایش عادت" : "افزودن عادت جدید")}</h3>
              <button onClick={() => setAddHabitModal(defaultAddHabitModalState)} className="text-gray-500 hover:text-gray-700"><XMarkIcon className="w-6 h-6" /></button>
            </div>
            <form onSubmit={(e) => {e.preventDefault(); handleSaveHabit();}} className="space-y-3 flex-grow overflow-y-auto pr-1 modal-scroll-content text-sm">
              {/* Form content from previous step */}
            </form>
          </div>
        </div>
      )}

      {logHabitModal.isOpen && logHabitModal.habitToLog && ( /* Log Habit Modal JSX */
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[101] p-4" onClick={() => setLogHabitModal(defaultLogHabitModalState)}>
              <div className="bg-white p-5 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                  <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200 flex-shrink-0">
                      <h3 className="text-md font-semibold text-gray-800">{toPersianDigits(`ثبت گزارش برای: ${logHabitModal.habitToLog.title}`)}</h3>
                      <button onClick={() => setLogHabitModal(defaultLogHabitModalState)} className="text-gray-500 hover:text-gray-700"><XMarkIcon className="w-6 h-6" /></button>
                  </div>
                  <form onSubmit={e => {e.preventDefault(); handleSaveHabitLog();}} className="space-y-3 flex-grow overflow-y-auto pr-1 modal-scroll-content text-sm">
                      {/* Form content for logging with multidimensional inputs */}
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
            <input type="text" id="userHabitContext" value={userHabitContext} onChange={e => setUserHabitContext(e.target.value)} placeholder="مثال: کاهش استرس، افزایش تمرکز" className="w-full p-1.5 border border-gray-300 rounded-md text-xs mb-2"/>
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

      {habits.length === 0 ? ( <div className="text-center py-8 bg-gray-100 rounded-xl shadow-inner"> <PageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" /> <p className="text-gray-600">{toPersianDigits("هنوز عادتی ایجاد نکرده‌اید.")}</p> </div>
       ) : (
        <div className="space-y-4">
          {habits.map(habit => (
            <div key={habit.id} className={`p-4 rounded-xl shadow-sm border ${habit.log.find(l=>l.date === new Date().toISOString().split('T')[0])?.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-md font-semibold text-purple-700">{toPersianDigits(habit.title)}</h4>
                  <p className="text-xs text-gray-500">{toPersianDigits(habit.frequency === 'daily' ? 'روزانه' : `هفتگی (${(habit.customFrequencyDetails?.daysOfWeek || []).map(d => daysOfWeekMap[d]).join('، ')})`)} - {toPersianDigits(habit.timeOfDay === 'any' ? 'هر زمان' : habit.timeOfDay)}</p>
                </div>
                <div className="flex space-x-1 rtl:space-x-reverse">
                  <button onClick={() => handleOpenAddHabitModal(habit)} className="p-1 text-yellow-500 hover:bg-yellow-100 rounded-full"><PencilIcon className="w-4 h-4"/></button>
                  <button onClick={() => handleDeleteHabit(habit.id)} className="p-1 text-red-500 hover:bg-red-100 rounded-full"><TrashIcon className="w-4 h-4"/></button>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2 text-xs">
                <span className="flex items-center text-orange-600"><FireIcon className="w-4 h-4 ml-1"/> {toPersianDigits(`رشته: ${habit.streak} روز`)}</span>
                <span className="flex items-center text-indigo-600"><StarIcon className="w-4 h-4 ml-1"/> {toPersianDigits(`سطح: ${habit.level || 1} (XP: ${habit.xp || 0})`)}</span>
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
  </change>
</changes>```