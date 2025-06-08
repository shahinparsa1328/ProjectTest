
import React from 'react';
import { toPersianDigits } from '@/utils';
import { MealPlan } from '@/types/healthTypes';
import { LightbulbIcon, SparklesIconNav } from '@/shared/AppIcons';
import LoadingSpinner from '@/shared/LoadingSpinner';

interface NutritionPlannerProps {
  userNutritionPreferences: string;
  setUserNutritionPreferences: (prefs: string) => void;
  handleGenerateMealPlan: () => void;
  isLoadingMealPlan: boolean;
  mealPlan: MealPlan | null;
  ai: any; // GoogleGenAI instance
}

const NutritionPlanner: React.FC<NutritionPlannerProps> = ({
  userNutritionPreferences,
  setUserNutritionPreferences,
  handleGenerateMealPlan,
  isLoadingMealPlan,
  mealPlan,
  ai
}) => {
  return (
    <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-200 space-y-3">
      <h4 className="text-sm font-semibold text-gray-700 flex items-center">
        <LightbulbIcon className="w-4 h-4 text-red-500 mr-2 rtl:ml-2 rtl:mr-0" />
        {toPersianDigits("برنامه‌ریزی هوشمند تغذیه")}
      </h4>
      <div>
        <label htmlFor="nutritionPrefs" className="block text-xs font-medium text-gray-700 mb-1">
          {toPersianDigits("ترجیحات غذایی (اهداف، محدودیت‌ها، غذاهای مورد علاقه/مورد تنفر):")}
        </label>
        <textarea
          id="nutritionPrefs"
          value={userNutritionPreferences}
          onChange={e => setUserNutritionPreferences(e.target.value)}
          rows={3}
          className="w-full p-2 border border-gray-300 rounded-md text-xs focus:ring-red-500 focus:border-red-500"
          placeholder={toPersianDigits("مثال: کاهش وزن، گیاهخوار، بدون گلوتن، عاشق سبزیجات، از کلم بروکلی متنفرم")}
        />
        <button
          onClick={handleGenerateMealPlan}
          disabled={isLoadingMealPlan || !ai || !userNutritionPreferences.trim()}
          className="w-full text-xs mt-1 py-2 px-3 rounded-md font-medium text-white bg-red-500 hover:bg-red-600 transition-colors disabled:opacity-60 flex items-center justify-center"
        >
          {isLoadingMealPlan ? <LoadingSpinner size="sm" /> : <SparklesIconNav className="w-4 h-4 mr-1" />}
          {toPersianDigits("تولید برنامه غذایی با AI")}
        </button>
         {!ai && <p className="text-[10px] text-center text-yellow-600 mt-1">{toPersianDigits("(سرویس AI برای این بخش در دسترس نیست)")}</p>}
      </div>
      {mealPlan && (
        <div className="mt-2 p-2 border rounded-md bg-red-50 border-red-200 text-xs">
          <h5 className="font-semibold text-red-700 mb-1">{toPersianDigits(mealPlan.title)}</h5>
          <p className="mb-1">{toPersianDigits(mealPlan.aiGeneratedRationale || '')}</p>
          <p className="text-[10px]">
            {toPersianDigits(`برای ${mealPlan.durationDays} روز از تاریخ ${new Date(mealPlan.startDate).toLocaleDateString('fa-IR')}`)}
          </p>
          {/* TODO: Add more detailed display of meal plan here */}
        </div>
      )}
    </div>
  );
};

export default NutritionPlanner;
```
  </change>
  <change>
    <file>components/health/ExercisePlanner.tsx</file>
    <description>New component: ExercisePlanner.tsx to handle UI and logic for exercise planning.</description>
    <content><![CDATA[
import React from 'react';
import { toPersianDigits } from '@/utils';
import { ExercisePlan } from '@/types/healthTypes';
import { HeartIcon, SparklesIconNav } from '@/shared/AppIcons';
import LoadingSpinner from '@/shared/LoadingSpinner';

interface ExercisePlannerProps {
  userExercisePreferences: string;
  setUserExercisePreferences: (prefs: string) => void;
  handleGenerateExercisePlan: () => void;
  isLoadingExercisePlan: boolean;
  exercisePlan: ExercisePlan | null;
  ai: any; // GoogleGenAI instance
}

const ExercisePlanner: React.FC<ExercisePlannerProps> = ({
  userExercisePreferences,
  setUserExercisePreferences,
  handleGenerateExercisePlan,
  isLoadingExercisePlan,
  exercisePlan,
  ai
}) => {
  return (
    <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-200 space-y-3">
      <h4 className="text-sm font-semibold text-gray-700 flex items-center">
        <HeartIcon className="w-4 h-4 text-red-500 mr-2 rtl:ml-2 rtl:mr-0" />
        {toPersianDigits("برنامه‌ریزی هوشمند ورزش")}
      </h4>
      <div>
        <label htmlFor="exercisePrefs" className="block text-xs font-medium text-gray-700 mb-1">
          {toPersianDigits("ترجیحات ورزشی (اهداف، نوع ورزش، مدت زمان، تجهیزات):")}
        </label>
        <textarea
          id="exercisePrefs"
          value={userExercisePreferences}
          onChange={e => setUserExercisePreferences(e.target.value)}
          rows={3}
          className="w-full p-2 border border-gray-300 rounded-md text-xs focus:ring-red-500 focus:border-red-500"
          placeholder={toPersianDigits("مثال: افزایش قدرت، ۳ روز در هفته، ۳۰ دقیقه، فقط دمبل و وزن بدن")}
        />
        <button
          onClick={handleGenerateExercisePlan}
          disabled={isLoadingExercisePlan || !ai || !userExercisePreferences.trim()}
          className="w-full text-xs mt-1 py-2 px-3 rounded-md font-medium text-white bg-red-500 hover:bg-red-600 transition-colors disabled:opacity-60 flex items-center justify-center"
        >
          {isLoadingExercisePlan ? <LoadingSpinner size="sm" /> : <SparklesIconNav className="w-4 h-4 mr-1" />}
          {toPersianDigits("تولید برنامه ورزشی با AI")}
        </button>
        {!ai && <p className="text-[10px] text-center text-yellow-600 mt-1">{toPersianDigits("(سرویس AI برای این بخش در دسترس نیست)")}</p>}
      </div>
      {exercisePlan && (
        <div className="mt-2 p-2 border rounded-md bg-red-50 border-red-200 text-xs">
          <h5 className="font-semibold text-red-700 mb-1">{toPersianDigits(exercisePlan.title)}</h5>
          <p className="mb-1">{toPersianDigits(exercisePlan.aiGeneratedRationale || '')}</p>
          <p className="text-[10px]">
            {toPersianDigits(`برای ${exercisePlan.durationWeeks} هفته از تاریخ ${new Date(exercisePlan.startDate).toLocaleDateString('fa-IR')}`)}
          </p>
          {/* TODO: Add more detailed display of exercise plan here */}
        </div>
      )}
    </div>
  );
};

export default ExercisePlanner;
```
  </change>
  <change>
    <file>components/health/JournalAnalysis.tsx</file>
    <description>New component: JournalAnalysis.tsx to handle journal input and AI-driven analysis.</description>
    <content><![CDATA[
import React from 'react';
import { toPersianDigits } from '@/utils';
import { JournalEntryHealth } from '@/types/healthTypes';
import { PencilSquareIcon, SparklesIconNav } from '@/shared/AppIcons';
import LoadingSpinner from '@/shared/LoadingSpinner';

interface JournalAnalysisProps {
  currentJournalInput: string;
  setCurrentJournalInput: (input: string) => void;
  handleAnalyzeJournalEntry: () => void;
  isLoadingJournalAnalysis: boolean;
  journalEntries: JournalEntryHealth[];
  ai: any; // GoogleGenAI instance
}

const JournalAnalysis: React.FC<JournalAnalysisProps> = ({
  currentJournalInput,
  setCurrentJournalInput,
  handleAnalyzeJournalEntry,
  isLoadingJournalAnalysis,
  journalEntries,
  ai
}) => {
  return (
    <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-200">
      <h4 className="text-sm font-semibold text-gray-700 flex items-center mb-2">
        <PencilSquareIcon className="w-4 h-4 text-red-500 mr-2 rtl:ml-2 rtl:mr-0" />
        {toPersianDigits("تحلیل احساسات و استرس از دفترچه یادداشت")}
      </h4>
      <textarea
        value={currentJournalInput}
        onChange={e => setCurrentJournalInput(e.target.value)}
        placeholder={toPersianDigits("احساسات و افکار امروز خود را بنویسید...")}
        rows={4}
        className="w-full p-2 border border-gray-300 rounded-md text-xs mb-2 focus:ring-red-500 focus:border-red-500"
      />
      <button
        onClick={handleAnalyzeJournalEntry}
        disabled={isLoadingJournalAnalysis || !currentJournalInput.trim() || !ai}
        className="w-full text-xs py-2 px-3 rounded-md font-medium text-white bg-red-500 hover:bg-red-600 transition-colors disabled:opacity-60 flex items-center justify-center"
      >
        {isLoadingJournalAnalysis ? <LoadingSpinner size="sm" /> : <SparklesIconNav className="w-4 h-4 mr-1" />}
        {toPersianDigits("ثبت و تحلیل با AI")}
      </button>
      {!ai && <p className="text-[10px] text-center text-yellow-600 mt-1">{toPersianDigits("(سرویس AI برای این بخش در دسترس نیست)")}</p>}

      {journalEntries.length > 0 && (
        <div className="mt-3 space-y-2 max-h-60 overflow-y-auto pr-1 scrollbar-thin">
          {journalEntries.slice(0, 3).map(entry => (
            <div key={entry.id} className="p-2 border border-red-100 rounded-md bg-red-50 text-xs">
              <p className="font-medium text-red-700">{new Date(entry.date).toLocaleString('fa-IR')}</p>
              <p className="text-gray-700 whitespace-pre-wrap my-1">
                {toPersianDigits(entry.text.substring(0, 100) + (entry.text.length > 100 ? "..." : ""))}
              </p>
              {entry.sentimentAnalysis && (
                <p className="text-[10px] text-gray-600">
                  <strong>{toPersianDigits("احساس:")}</strong> {toPersianDigits(entry.sentimentAnalysis.label)} ({toPersianDigits(entry.sentimentAnalysis.dominantEmotion || '')}) - <strong>{toPersianDigits("استرس:")}</strong> {toPersianDigits(entry.sentimentAnalysis.stressLevel || 'نامشخص')}
                </p>
              )}
              {entry.aiInsight && (
                <p className="text-[10px] text-purple-700 mt-0.5">
                  <strong>{toPersianDigits("بینش AI:")}</strong> {toPersianDigits(entry.aiInsight)}
                </p>
              )}
            </div>
          ))}
          {journalEntries.length > 3 && <p className="text-center text-[10px] text-gray-500 mt-1">... و بیشتر</p>}
        </div>
      )}
    </div>
  );
};

export default JournalAnalysis;
```
  </change>
  <change>
    <file>components/health/SymptomCheckerChatbot.tsx</file>
    <description>New component: SymptomCheckerChatbot.tsx to manage the symptom checker UI and interactions.</description>
    <content><![CDATA[
import React, { RefObject } from 'react';
import { toPersianDigits } from '@/utils';
import { SymptomCheckSession, SymptomCheckMessage } from '@/types/healthTypes';
import { ChatBubbleOvalLeftEllipsisIcon, ShieldCheckIcon, PaperAirplaneIcon } from '@/shared/AppIcons';
import LoadingSpinner from '@/shared/LoadingSpinner';

interface SymptomCheckerChatbotProps {
  isSymptomDisclaimerAccepted: boolean;
  setIsSymptomDisclaimerAccepted: (accepted: boolean) => void;
  currentSymptomSession: SymptomCheckSession | null;
  symptomInput: string;
  setSymptomInput: (input: string) => void;
  handleSymptomChatSend: () => void;
  handleEndSymptomChat: () => void;
  isLoadingSymptomResponse: boolean;
  chatMessagesEndRef: RefObject<HTMLDivElement>;
  ai: any; // GoogleGenAI instance
}

const SymptomCheckerChatbot: React.FC<SymptomCheckerChatbotProps> = ({
  isSymptomDisclaimerAccepted,
  setIsSymptomDisclaimerAccepted,
  currentSymptomSession,
  symptomInput,
  setSymptomInput,
  handleSymptomChatSend,
  handleEndSymptomChat,
  isLoadingSymptomResponse,
  chatMessagesEndRef,
  ai
}) => {
  return (
    <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-200">
      <h4 className="text-sm font-semibold text-gray-700 flex items-center mb-2">
        <ChatBubbleOvalLeftEllipsisIcon className="w-4 h-4 text-red-500 mr-2 rtl:ml-2 rtl:mr-0" />
        {toPersianDigits("چت‌بات بررسی‌کننده علائم با AI")}
      </h4>
      {!isSymptomDisclaimerAccepted ? (
        <div className="p-2 bg-yellow-50 border border-yellow-300 rounded-md text-xs text-yellow-800">
          <div className="flex items-start">
            <ShieldCheckIcon className="w-6 h-6 text-yellow-600 mr-2 rtl:ml-2 rtl:mr-0 flex-shrink-0" />
            <p>
              <strong>{toPersianDigits("سلب مسئولیت مهم:")}</strong> {toPersianDigits("این چت‌بات یک ابزار تشخیص پزشکی نیست و صرفاً برای اهداف اطلاعاتی و کمک اولیه طراحی شده است. برای تشخیص و درمان بیماری‌ها حتماً به پزشک مراجعه کنید.")}
            </p>
          </div>
          <button onClick={() => setIsSymptomDisclaimerAccepted(true)} className="mt-2 bg-yellow-500 text-white py-1 px-2 rounded text-[10px] hover:bg-yellow-600">
            {toPersianDigits("می‌پذیرم و ادامه می‌دهم")}
          </button>
        </div>
      ) : (
        <div className="flex flex-col h-80">
          <div className="flex-grow overflow-y-auto mb-2 p-2 border border-gray-200 rounded-md space-y-2 bg-gray-50 chat-messages-container">
            {currentSymptomSession?.messages.map(msg => (
              <div key={msg.id} className={`chat-message ${msg.sender === 'user' ? 'user !bg-red-500' : '!bg-gray-200'}`}>
                {toPersianDigits(msg.text)}
              </div>
            ))}
            {isLoadingSymptomResponse && <div className="chat-message !bg-gray-200"><LoadingSpinner size="sm" /></div>}
            <div ref={chatMessagesEndRef} />
          </div>
          <div className="flex gap-2 items-center mt-auto">
            <input
              type="text"
              value={symptomInput}
              onChange={e => setSymptomInput(e.target.value)}
              placeholder={toPersianDigits("علائم خود را وارد کنید...")}
              className="flex-grow p-2 border border-gray-300 rounded-md text-xs focus:ring-red-500 focus:border-red-500"
              onKeyPress={(e) => e.key === 'Enter' && !isLoadingSymptomResponse && symptomInput.trim() && handleSymptomChatSend()}
            />
            <button
              onClick={handleSymptomChatSend}
              disabled={isLoadingSymptomResponse || !symptomInput.trim() || !ai}
              className="py-2 px-3 rounded-md font-medium text-white bg-red-500 hover:bg-red-600 transition-colors disabled:opacity-60 text-xs"
            >
              {toPersianDigits("ارسال")}
            </button>
          </div>
          {!ai && <p className="text-[10px] text-center text-yellow-600 mt-1">{toPersianDigits("(سرویس AI برای این بخش در دسترس نیست)")}</p>}
          {currentSymptomSession && (
            <button onClick={handleEndSymptomChat} className="text-xs text-red-600 hover:text-red-800 mt-2 w-full">
              {toPersianDigits("پایان و ذخیره جلسه")}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SymptomCheckerChatbot;
```
  </change>
  <change>
    <file>components/pages/HealthPage.tsx</file>
    <description>Refactor HealthPage.tsx to use new sub-components: NutritionPlanner, ExercisePlanner, JournalAnalysis, and SymptomCheckerChatbot. State management and AI interaction logic remain in HealthPage and are passed down as props.</description>
    <content><![CDATA[
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
} from '@/shared/AppIcons'; // Updated path
import AISmartLearningSuggestionCard from '@/learning/AISmartLearningSuggestionCard'; // Updated path
import { LearningPath, LearningContent, LearningSuggestion } from '@/types/learningTypes'; // Updated path
import { PageName } from '@/App'; // Updated path
import { MealPlan, ExercisePlan, JournalEntryHealth, SymptomCheckSession, SymptomCheckMessage } from '@/types/healthTypes'; // Updated path
import CollapsibleSection from '@/shared/CollapsibleSection'; // Updated path
import LoadingSpinner from '@/shared/LoadingSpinner'; // Updated path
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import ToastNotification from '@/shared/ToastNotification'; // Updated path

import NutritionPlanner from '@/health/NutritionPlanner'; // New import
import ExercisePlanner from '@/health/ExercisePlanner'; // New import
import JournalAnalysis from '@/health/JournalAnalysis'; // New import
import SymptomCheckerChatbot from '@/health/SymptomCheckerChatbot'; // New import

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Removed learningContent, healthSuggestions from dependency array to avoid re-triggering

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
        <NutritionPlanner 
          userNutritionPreferences={userNutritionPreferences}
          setUserNutritionPreferences={setUserNutritionPreferences}
          handleGenerateMealPlan={handleGenerateMealPlan}
          isLoadingMealPlan={isLoadingMealPlan}
          mealPlan={mealPlan}
          ai={ai}
        />
        <div className="mt-4"> {/* Add margin between planners */}
          <ExercisePlanner
            userExercisePreferences={userExercisePreferences}
            setUserExercisePreferences={setUserExercisePreferences}
            handleGenerateExercisePlan={handleGenerateExercisePlan}
            isLoadingExercisePlan={isLoadingExercisePlan}
            exercisePlan={exercisePlan}
            ai={ai}
          />
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="بینایی هوش مصنوعی برای سلامت (مفهومی)" icon={<CameraIcon className="text-red-500" />} className="mb-6" isOpen={openSections.vision} onToggle={() => toggleSection('vision')}>
         <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-200 text-xs text-gray-600 space-y-1">
            <p>{toPersianDigits("این بخش در آینده می‌تواند شامل قابلیت‌هایی مانند تشخیص غذا از روی عکس برای ثبت کالری و تحلیل فرم حرکات ورزشی با استفاده از دوربین دستگاه (با اجازه شما) باشد.")}</p>
            <p className="font-semibold text-red-700">{toPersianDigits("توجه: پیاده‌سازی این ویژگی‌ها نیازمند مدل‌های AI بسیار پیشرفته و ملاحظات دقیق حریم خصوصی است.")}</p>
         </div>
      </CollapsibleSection>

      <CollapsibleSection title="تحلیل احساسات و استرس از دفترچه یادداشت" icon={<PencilSquareIcon className="text-red-500" />} className="mb-6" isOpen={openSections.journal} onToggle={() => toggleSection('journal')}>
        <JournalAnalysis
          currentJournalInput={currentJournalInput}
          setCurrentJournalInput={setCurrentJournalInput}
          handleAnalyzeJournalEntry={handleAnalyzeJournalEntry}
          isLoadingJournalAnalysis={isLoadingJournalAnalysis}
          journalEntries={journalEntries}
          ai={ai}
        />
      </CollapsibleSection>
      
      <CollapsibleSection title="چت‌بات بررسی‌کننده علائم با AI" icon={<ChatIcon className="text-red-500" />} className="mb-6" isOpen={openSections.symptom} onToggle={() => toggleSection('symptom')}>
        <SymptomCheckerChatbot
          isSymptomDisclaimerAccepted={isSymptomDisclaimerAccepted}
          setIsSymptomDisclaimerAccepted={setIsSymptomDisclaimerAccepted}
          currentSymptomSession={currentSymptomSession}
          symptomInput={symptomInput}
          setSymptomInput={setSymptomInput}
          handleSymptomChatSend={handleSymptomChatSend}
          handleEndSymptomChat={handleEndSymptomChat}
          isLoadingSymptomResponse={isLoadingSymptomResponse}
          chatMessagesEndRef={chatMessagesEndRef}
          ai={ai}
        />
      </CollapsibleSection>
    </div>
  );
};

export default HealthPage;
```
  </change>
</changes>```