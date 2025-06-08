
import React, { useState, useCallback, useEffect } from 'react';
import { toPersianDigits, parseJsonFromString } from '../../utils';
import { RepeatIcon as PageIcon, PlusIcon, SparklesIconNav as AiIcon, MicrophoneIcon, CameraIcon, CheckCircleIcon, XCircleIcon, LightbulbIcon } from '../shared/AppIcons';
import LoadingSpinner from '../shared/LoadingSpinner';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import XAIModal from '../shared/XAIModal';
import ToastNotification from '../shared/ToastNotification';

// --- TYPES ---
interface Habit {
  id: string;
  title: string;
  description?: string; 
  frequency: 'daily' | 'weekly' | 'custom';
  customFrequencyDetails?: string; 
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'any'; // Adjusted to be more generic for UI
  atomicSuggestion?: string; 
  relatedGoalId?: string;
  contextTrigger?: string; 
  streak: number;
  dailyProgress?: Record<string, boolean>; 
  weeklyProgress?: number; 
  totalTimesInWeek?: number; 
  lastCompletedDate?: string;
  aiRationale?: string; 
}

interface ParsedHabitDetails {
  title: string;
  frequency?: 'daily' | 'weekly' | 'custom';
  customFrequencyDetails?: string;
  timeOfDay?: 'morning' | 'afternoon' | 'evening' | 'any';
  atomicSuggestion?: string;
  relatedGoalId?: string;
  contextTrigger?: string;
  aiConfidence?: number;
  rawInputText?: string; 
}

interface HabitSuggestionDetails {
  title: string;
  description: string;
  aiRationale: string;
  frequency: 'daily' | 'weekly' | 'custom' | string; 
}

interface AISuggestionForHabit {
  id: string; 
  originalSuggestion: HabitSuggestionDetails; 
  title: string; 
  text: string; 
  xaiTitle: string;
  xaiExplanation: string; 
  feedbackState?: 'idle' | 'accepting' | 'declining' | 'accepted_briefly' | 'declined_briefly';
  showCard?: boolean;
}

export interface HabitsPageProps { // Make sure this is exported if App.tsx imports it
  openAddGoalModal?: () => void;
}


const AI_MODEL_NAME = 'gemini-2.5-flash-preview-04-17';

const AISuggestionCardHabit: React.FC<{ suggestion: AISuggestionForHabit; onAccept: (suggestion: AISuggestionForHabit) => void; onDecline: (suggestionId: string) => void; onWhy: (suggestion: AISuggestionForHabit) => void; }> = ({ suggestion, onAccept, onDecline, onWhy }) => {
    const { title, text, feedbackState = 'idle', showCard = true, id } = suggestion;
    const isInteracted = feedbackState === 'accepted_briefly' || feedbackState === 'declined_briefly';
    const isAccepting = feedbackState === 'accepting' || feedbackState === 'accepted_briefly';
    const isDeclining = feedbackState === 'declining' || feedbackState === 'declined_briefly';

    if (!showCard) return null;

    return (
      <div className={`bg-purple-50 p-4 rounded-xl shadow-sm border border-purple-200 transition-all duration-500 ease-out mb-3 ${showCard ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 h-0 p-0 m-0 overflow-hidden border-0'}`}>
        <h5 className="text-sm font-semibold text-purple-700 mb-2 flex items-center">
          <AiIcon className="w-4 h-4 mr-2 text-yellow-500"/> {toPersianDigits(title)}
        </h5>
        <p className="text-xs text-gray-600 mb-3 leading-relaxed">{toPersianDigits(text)}</p>
        <div className="flex justify-between items-center text-xs mt-3 pt-2 border-t border-purple-200">
          <button onClick={() => onWhy(suggestion)} className="text-purple-600 hover:underline disabled:opacity-50 disabled:cursor-not-allowed" disabled={isInteracted}>{toPersianDigits("چرا این پیشنهاد؟")}</button>
          <div className="space-x-2 space-x-reverse">
            {!isInteracted && feedbackState !== 'accepting' && feedbackState !== 'declining' && (
              <>
                <button onClick={() => onAccept(suggestion)} className="flex items-center bg-green-500 hover:bg-green-600 text-white py-1 px-2.5 rounded-md transition-colors text-[10px]">
                 <CheckCircleIcon className="mr-1 w-3 h-3"/> {toPersianDigits("پذیرفتن")}
                </button>
                <button onClick={() => onDecline(id)} className="flex items-center bg-red-500 hover:bg-red-600 text-white py-1 px-2.5 rounded-md transition-colors text-[10px]">
                  <XCircleIcon className="mr-1 w-3 h-3"/> {toPersianDigits("رد کردن")}
                </button>
              </>
            )}
            {isAccepting && (
              <span className="flex items-center text-green-600 font-medium bg-green-100 py-1 px-2.5 rounded-md text-[10px]">
                <CheckCircleIcon className="mr-1 w-3 h-3"/> {toPersianDigits("پذیرفته شد")}
              </span>
            )}
            {isDeclining && (
              <span className="flex items-center text-red-600 font-medium bg-red-100 py-1 px-2.5 rounded-md text-[10px]">
                <XCircleIcon className="mr-1 w-3 h-3"/> {toPersianDigits("رد شد")}
              </span>
            )}
          </div>
        </div>
      </div>
    );
};


const HabitsPage: React.FC<HabitsPageProps> = ({ openAddGoalModal }) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabitInput, setNewHabitInput] = useState('');
  
  const [parsedHabitDetails, setParsedHabitDetails] = useState<ParsedHabitDetails | null>(null);
  const [showParsedPreview, setShowParsedPreview] = useState(false);
  const [isLoadingAiProcessing, setIsLoadingAiProcessing] = useState(false); 
  const [parsingError, setParsingError] = useState<string | null>(null);

  const [habitSuggestions, setHabitSuggestions] = useState<AISuggestionForHabit[]>([]);
  const [isLoadingHabitSuggestions, setIsLoadingHabitSuggestions] = useState(false);
  const [habitSuggestionError, setHabitSuggestionError] = useState<string | null>(null);

  const [toastInfo, setToastInfo] = useState<{id: number, text: string, type: 'success' | 'error' | 'info'} | null>(null);
  const [showXAIModal, setShowXAIModal] = useState(false);
  const [xaiContent, setXaiContent] = useState({ title: '', explanation: '' });
  
  const apiKey = process.env.API_KEY;
  const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

  const showToast = (text: string, type: 'success' | 'error' | 'info') => {
    setToastInfo({ id: Date.now(), text, type });
  };

  useEffect(() => {
    if (toastInfo) {
      const timer = setTimeout(() => setToastInfo(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastInfo]);

  const handleProcessHabitInput = async (inputMethod: 'text' | 'voice' | 'image' = 'text') => {
    if (!ai) {
      setParsingError(toPersianDigits("سرویس هوش مصنوعی به دلیل عدم تنظیم کلید API در دسترس نیست."));
      setIsLoadingAiProcessing(false);
      return;
    }
    let currentInput = newHabitInput;
    if (inputMethod === 'voice') currentInput = toPersianDigits("شبیه سازی ورودی صوتی: عادت جدید: هر روز صبح مدیتیشن ۱۰ دقیقه‌ای بعد از بیدار شدن");
    if (inputMethod === 'image') currentInput = toPersianDigits("شبیه سازی OCR: لیست عادات \n ۱. پیاده روی روزانه \n ۲. مطالعه قبل از خواب");
    
    if (!currentInput.trim()) {
      setParsingError(toPersianDigits("لطفاً متنی برای تحلیل وارد کنید."));
      return;
    }

    setIsLoadingAiProcessing(true);
    setParsingError(null);
    setParsedHabitDetails(null);
    setShowParsedPreview(false);

    try {
      const prompt = toPersianDigits(`ورودی کاربر برای عادت: "${currentInput}". این ورودی را تحلیل کن و جزئیات عادت را به صورت JSON استخراج کن. JSON باید شامل کلیدهای زیر باشد: "title" (رشته، عنوان اصلی عادت)، "frequency" (رشته، می‌تواند "daily"، "weekly" یا "custom" باشد، اگر سفارشی است در customFrequencyDetails توضیح بده)، "customFrequencyDetails" (رشته، فقط اگر frequency سفارشی است)، "timeOfDay" (رشته، "morning"، "afternoon"، "evening" یا "any")، "atomicSuggestion" (رشته، پیشنهادی برای کوچک کردن عادت)، "relatedGoalId" (رشته، اگر به هدفی مرتبط است)، "contextTrigger" (رشته، مانند "بعد از بیدار شدن") و "aiConfidence" (عددی بین 0 و 1). اگر جزئیاتی یافت نشد، مقدار آن را null یا رشته خالی قرار بده.`);
      
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: AI_MODEL_NAME,
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });
      
      const parsedData = parseJsonFromString<ParsedHabitDetails>(response.text);

      if (parsedData) {
        parsedData.rawInputText = currentInput; 
        setParsedHabitDetails(parsedData);
      } else {
        setParsedHabitDetails({ title: currentInput, rawInputText: currentInput }); 
        throw new Error("JSON parsing failed or returned null.");
      }
      setShowParsedPreview(true);
      if (inputMethod !== 'text') setNewHabitInput(currentInput); 

    } catch (e: any) {
      console.error("Error parsing habit:", e);
      setParsingError(toPersianDigits(`خطا در تحلیل هوشمند: ${e.message || "لطفاً دوباره امتحان کنید."}`));
      setShowParsedPreview(false);
      setParsedHabitDetails({ title: currentInput, rawInputText: currentInput }); 
      setShowParsedPreview(true);
      showToast(toPersianDigits("تحلیل هوشمند ناموفق بود. می‌توانید جزئیات را دستی وارد و ویرایش کنید."), 'info');
    } finally {
      setIsLoadingAiProcessing(false);
    }
  };
  
  const handleConfirmAddHabit = () => {
    if (!parsedHabitDetails || !parsedHabitDetails.title) {
        showToast(toPersianDigits("عنوان عادت یافت نشد. لطفاً ورودی را اصلاح کنید."), 'error');
        return;
    }
    const newHabit: Habit = {
      id: String(Date.now() + Math.random()), 
      title: parsedHabitDetails.title,
      frequency: parsedHabitDetails.frequency || 'daily', 
      customFrequencyDetails: parsedHabitDetails.customFrequencyDetails,
      timeOfDay: parsedHabitDetails.timeOfDay || 'any',
      atomicSuggestion: parsedHabitDetails.atomicSuggestion,
      relatedGoalId: parsedHabitDetails.relatedGoalId,
      contextTrigger: parsedHabitDetails.contextTrigger,
      aiRationale: parsedHabitDetails.rawInputText,
      streak: 0,
    };
    setHabits(prevHabits => [newHabit, ...prevHabits]);
    setNewHabitInput('');
    setParsedHabitDetails(null);
    setShowParsedPreview(false);
    showToast(toPersianDigits("عادت جدید با موفقیت اضافه شد!"), 'success');
  };
  
  const handleCancelPreview = () => {
    setShowParsedPreview(false);
    setParsedHabitDetails(null);
    setParsingError(null);
  };
  
  const handleEditParsedDetail = (field: keyof ParsedHabitDetails, value: any) => {
    if (parsedHabitDetails) {
        setParsedHabitDetails(prev => ({...prev!, [field]: value}));
    }
  };

  const frequencyOptions = [
    { value: 'daily', label: toPersianDigits('روزانه') },
    { value: 'weekly', label: toPersianDigits('هفتگی') },
    { value: 'custom', label: toPersianDigits('سفارشی') },
  ];

  const timeOfDayOptions = [
    { value: 'any', label: toPersianDigits('هر زمان') },
    { value: 'morning', label: toPersianDigits('صبح') },
    { value: 'afternoon', label: toPersianDigits('بعد از ظهر') },
    { value: 'evening', label: toPersianDigits('عصر') },
    { value: 'after_waking_up', label: toPersianDigits('بعد از بیدار شدن') }, // Contextual time
    { value: 'before_bed', label: toPersianDigits('قبل از خواب') }, // Contextual time
  ];

  const fetchHabitSuggestions = async () => {
    if (!ai) {
      setHabitSuggestionError(toPersianDigits("سرویس هوش مصنوعی به دلیل عدم تنظیم کلید API در دسترس نیست."));
      setIsLoadingHabitSuggestions(false);
      return;
    }
    setIsLoadingHabitSuggestions(true);
    setHabitSuggestionError(null);
    setHabitSuggestions([]); 
    try {
      const simulatedUserGoals = habits.length > 0 ? habits.map(h => h.relatedGoalId).filter(Boolean).join(', ') : "ندارد";
      const simulatedExistingHabits = habits.map(h => h.title).join(', ') || "ندارد";
      
      const prompt = toPersianDigits(`بر اساس اهداف کاربر (${simulatedUserGoals}) و عادات موجود (${simulatedExistingHabits}) و نیازهای احتمالی مانند کاهش استرس یا افزایش بهره‌وری، ۲ تا ۳ پیشنهاد عادت جدید به زبان فارسی ارائه بده. برای هر پیشنهاد، "title" (عنوان عادت)، "description" (توضیح کوتاه)، "aiRationale" (منطق پیشنهاد) و "frequency" (مانند "daily"، "weekly"، "3 times a week") را مشخص کن. پاسخ باید یک JSON معتبر با آرایه‌ای از اشیاء عادت پیشنهادی باشد.`);

      const response: GenerateContentResponse = await ai.models.generateContent({
        model: AI_MODEL_NAME,
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });

      const parsedSuggestions = parseJsonFromString<HabitSuggestionDetails[]>(response.text);
      
      if (Array.isArray(parsedSuggestions)) {
          const formattedSuggestions: AISuggestionForHabit[] = parsedSuggestions.map((s, index) => ({
            id: `sugg-habit-${Date.now()}-${index}`,
            originalSuggestion: s,
            title: s.title,
            text: s.description,
            xaiTitle: toPersianDigits("منطق پیشنهاد عادت"),
            xaiExplanation: s.aiRationale,
            feedbackState: 'idle',
            showCard: true,
          }));
          setHabitSuggestions(formattedSuggestions);
      } else {
        throw new Error(toPersianDigits("فرمت پاسخ پیشنهادات نامعتبر است."));
      }

    } catch (e: any) {
      console.error("Error fetching habit suggestions:", e);
      setHabitSuggestionError(toPersianDigits(`خطا در دریافت پیشنهادات عادت: ${e.message || "لطفاً دوباره امتحان کنید."}`));
    } finally {
      setIsLoadingHabitSuggestions(false);
    }
  };

  const handleAcceptHabitSuggestion = (suggestion: AISuggestionForHabit) => {
    const newHabit: Habit = {
      id: String(Date.now() + Math.random()),
      title: suggestion.originalSuggestion.title,
      description: suggestion.originalSuggestion.description,
      frequency: suggestion.originalSuggestion.frequency.toLowerCase().includes('daily') ? 'daily' : suggestion.originalSuggestion.frequency.toLowerCase().includes('weekly') ? 'weekly' : 'custom',
      customFrequencyDetails: suggestion.originalSuggestion.frequency.toLowerCase() !== 'daily' && suggestion.originalSuggestion.frequency.toLowerCase() !== 'weekly' ? suggestion.originalSuggestion.frequency : undefined,
      timeOfDay: 'any', 
      streak: 0,
      aiRationale: suggestion.originalSuggestion.aiRationale,
    };
    setHabits(prevHabits => [newHabit, ...prevHabits]);
    showToast(toPersianDigits(`عادت پیشنهادی "${newHabit.title}" اضافه شد.`), 'success');
    setHabitSuggestions(prev => prev.map(s => s.id === suggestion.id ? {...s, feedbackState: 'accepted_briefly', showCard: false} : s));
  };

  const handleDeclineHabitSuggestion = (suggestionId: string) => {
     setHabitSuggestions(prev => prev.map(s => s.id === suggestionId ? {...s, feedbackState: 'declined_briefly', showCard: false} : s));
     showToast(toPersianDigits("پیشنهاد عادت رد شد."), 'info');
  };

  const handleShowXAIForHabitSuggestion = (suggestion: AISuggestionForHabit) => {
    setXaiContent({ title: suggestion.xaiTitle, explanation: suggestion.xaiExplanation });
    setShowXAIModal(true);
  };


  return (
    <div className="page">
      {toastInfo && <ToastNotification message={toastInfo.text} type={toastInfo.type} isVisible={!!toastInfo} onClose={() => setToastInfo(null)} />}
      <XAIModal isOpen={showXAIModal} onClose={() => setShowXAIModal(false)} title={xaiContent.title}>
        <p className="text-sm text-gray-700 leading-relaxed">{toPersianDigits(xaiContent.explanation)}</p>
      </XAIModal>
      
      <div className="flex items-center mb-6">
        <PageIcon className="w-7 h-7 text-purple-600 mr-3" />
        <h1 className="text-2xl font-semibold text-gray-800">{toPersianDigits("عادات من")}</h1>
      </div>

      <div className="mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-md font-semibold text-gray-700 mb-2">{toPersianDigits("افزودن عادت جدید")}</h3>
        <textarea
          value={newHabitInput}
          onChange={(e) => { setNewHabitInput(e.target.value); if (showParsedPreview) { setShowParsedPreview(false); setParsedHabitDetails(null); setParsingError(null); } }}
          placeholder={toPersianDigits("یک عادت جدید اضافه کنید (مثلاً: مدیتیشن ۱۰ دقیقه‌ای هر روز صبح)...")}
          rows={3}
          className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-md text-sm text-gray-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-gray-400 resize-y"
          aria-label={toPersianDigits("فیلد ورودی عادت جدید")}
        />
        <div className="mt-3 flex flex-col sm:flex-row gap-2 justify-between items-stretch">
          <div className="flex gap-2 flex-wrap">
            <button onClick={() => handleProcessHabitInput('voice')} className="flex items-center text-xs py-1.5 px-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors flex-grow sm:flex-grow-0 justify-center" disabled={!ai}>
              <MicrophoneIcon className="w-4 h-4 mr-1.5"/> {toPersianDigits("صدا (شبیه‌سازی)")}
            </button>
            <button onClick={() => handleProcessHabitInput('image')} className="flex items-center text-xs py-1.5 px-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors flex-grow sm:flex-grow-0 justify-center" disabled={!ai}>
              <CameraIcon className="w-4 h-4 mr-1.5"/> {toPersianDigits("تصویر (شبیه‌سازی)")}
            </button>
          </div>
          <button 
            onClick={() => handleProcessHabitInput('text')} 
            disabled={isLoadingAiProcessing || !newHabitInput.trim() || !ai} 
            className="flex items-center justify-center text-sm py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors disabled:opacity-50 flex-grow sm:flex-grow-0"
            aria-label={toPersianDigits("افزودن عادت با تحلیل هوشمند")}
          >
            {isLoadingAiProcessing ? <LoadingSpinner size="sm" color="text-white"/> : <AiIcon className="w-5 h-5 mr-2"/>}
            {toPersianDigits("افزودن عادت")}
          </button>
        </div>
        {!ai && <p className="text-xs text-yellow-600 text-center mt-1">{toPersianDigits("سرویس هوش مصنوعی در دسترس نیست (کلید API تنظیم نشده؟)")}</p>}
        {parsingError && <p className="text-red-500 text-xs mt-2 p-1 bg-red-50 rounded">{parsingError}</p>}
      </div>

      {showParsedPreview && parsedHabitDetails && (
        <div className="mb-6 p-4 bg-purple-50 rounded-xl border border-purple-200 shadow-sm">
          <h4 className="text-sm font-semibold text-purple-700 mb-3">{toPersianDigits("جزئیات استخراج شده توسط هوش مصنوعی:")}</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label htmlFor="edit-title" className="text-gray-600 mb-0.5 block">عنوان*:</label>
              <input type="text" id="edit-title" value={toPersianDigits(parsedHabitDetails.title || '')} onChange={(e) => handleEditParsedDetail('title', e.target.value)} className="w-full p-1.5 bg-white border border-gray-300 rounded-md text-gray-800 focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label htmlFor="edit-frequency" className="text-gray-600 mb-0.5 block">فرکانس:</label>
              <select id="edit-frequency" value={parsedHabitDetails.frequency || 'daily'} onChange={(e) => handleEditParsedDetail('frequency', e.target.value as ParsedHabitDetails['frequency'])} className="w-full p-1.5 bg-white border border-gray-300 rounded-md text-gray-800 focus:ring-indigo-500 focus:border-indigo-500">
                {frequencyOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
            {parsedHabitDetails.frequency === 'custom' && (
                <div>
                    <label htmlFor="edit-customFrequency" className="text-gray-600 mb-0.5 block">جزئیات فرکانس سفارشی:</label>
                    <input type="text" id="edit-customFrequency" value={toPersianDigits(parsedHabitDetails.customFrequencyDetails || '')} onChange={(e) => handleEditParsedDetail('customFrequencyDetails', e.target.value)} placeholder={toPersianDigits("مثلا: هر شنبه و دوشنبه")} className="w-full p-1.5 bg-white border border-gray-300 rounded-md text-gray-800 focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
            )}
            <div>
              <label htmlFor="edit-timeOfDay" className="text-gray-600 mb-0.5 block">زمان روز:</label>
              <select id="edit-timeOfDay" value={parsedHabitDetails.timeOfDay || 'any'} onChange={(e) => handleEditParsedDetail('timeOfDay', e.target.value as ParsedHabitDetails['timeOfDay'])} className="w-full p-1.5 bg-white border border-gray-300 rounded-md text-gray-800 focus:ring-indigo-500 focus:border-indigo-500">
                 {timeOfDayOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="edit-atomicSuggestion" className="text-gray-600 mb-0.5 block">پیشنهاد عادت اتمی:</label>
              <input type="text" id="edit-atomicSuggestion" value={toPersianDigits(parsedHabitDetails.atomicSuggestion || '')} onChange={(e) => handleEditParsedDetail('atomicSuggestion', e.target.value)} className="w-full p-1.5 bg-white border border-gray-300 rounded-md text-gray-800 focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="edit-contextTrigger" className="text-gray-600 mb-0.5 block">محرک زمینه‌ای:</label>
              <input type="text" id="edit-contextTrigger" value={toPersianDigits(parsedHabitDetails.contextTrigger || '')} onChange={(e) => handleEditParsedDetail('contextTrigger', e.target.value)} className="w-full p-1.5 bg-white border border-gray-300 rounded-md text-gray-800 focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
          </div>
          {parsedHabitDetails.aiConfidence !== undefined && <p className="text-[10px] text-purple-600/80 mt-1">{toPersianDigits(`اطمینان هوش مصنوعی: ${Math.round(parsedHabitDetails.aiConfidence * 100)}%`)}</p>}
          <div className="mt-4 flex justify-end space-x-2 space-x-reverse">
            <button onClick={handleCancelPreview} className="flex items-center text-xs py-1 px-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md">
              <XCircleIcon className="w-3 h-3 inline ml-1"/> {toPersianDigits("لغو")}
            </button>
            <button onClick={handleConfirmAddHabit} className="flex items-center text-xs py-1 px-2.5 bg-green-500 hover:bg-green-600 text-white rounded-md">
              <CheckCircleIcon className="w-3 h-3 inline ml-1"/> {toPersianDigits("تایید و افزودن عادت")}
            </button>
          </div>
        </div>
      )}

      <div className="my-6 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-3">
            <h3 className="text-md font-semibold text-purple-700">{toPersianDigits("پیشنهادات هوشمند عادت")}</h3>
            <button 
                onClick={fetchHabitSuggestions} 
                disabled={isLoadingHabitSuggestions || !ai}
                className="flex items-center text-xs py-1.5 px-3 bg-purple-500 hover:bg-purple-600 text-white rounded-md transition-colors disabled:opacity-50"
            >
                {isLoadingHabitSuggestions ? <LoadingSpinner size="sm"/> : <LightbulbIcon className="w-4 h-4 mr-1.5"/>}
                {toPersianDigits("دریافت پیشنهادات جدید")}
            </button>
        </div>
         {!ai && <p className="text-xs text-yellow-600 text-center pb-2">{toPersianDigits("سرویس هوش مصنوعی برای پیشنهادات در دسترس نیست.")}</p>}
        {isLoadingHabitSuggestions && <div className="flex justify-center py-3"><LoadingSpinner /></div>}
        {habitSuggestionError && <p className="text-red-500 text-xs text-center p-1 bg-red-50 rounded">{habitSuggestionError}</p>}
        {!isLoadingHabitSuggestions && habitSuggestions.length > 0 && (
            <div className="space-y-2">
                {habitSuggestions.map(suggestion => (
                    <AISuggestionCardHabit 
                        key={suggestion.id} 
                        suggestion={suggestion} 
                        onAccept={handleAcceptHabitSuggestion}
                        onDecline={handleDeclineHabitSuggestion}
                        onWhy={handleShowXAIForHabitSuggestion}
                    />
                ))}
            </div>
        )}
        {!isLoadingHabitSuggestions && habitSuggestions.length === 0 && !habitSuggestionError && ai && (
            <p className="text-xs text-gray-500 text-center py-2">{toPersianDigits("در حال حاضر پیشنهاد جدیدی برای شما وجود ندارد.")}</p>
        )}
      </div>
      
      <div id="habits-list" className="mt-8">
        <h3 className="text-md font-semibold text-gray-700 mb-4">{toPersianDigits("عادات فعلی شما")}</h3>
        {habits.length === 0 && !isLoadingAiProcessing ? (
          <div id="empty-habits-state" className="flex flex-col items-center justify-center p-6 bg-purple-50 rounded-xl shadow-inner border border-purple-200 text-center text-gray-600 min-h-[150px]">
            <PageIcon className="w-12 h-12 text-purple-400 mb-3" />
            <p className="mb-3 text-sm">{toPersianDigits("هنوز عادتی اضافه نکرده‌اید. بیایید اولین عادت خود را بسازیم!")}</p>
            <button 
                onClick={() => { /* Logic to open add habit form or focus input */ setNewHabitInput(''); document.getElementById('new-task-input')?.focus();}}
                className="bg-purple-600 text-white p-2 rounded-lg shadow-md hover:bg-purple-700 transition-colors flex items-center justify-center text-xs"
            >
                <PlusIcon className="w-4 h-4 mr-1.5" />
                {toPersianDigits("افزودن اولین عادت")}
            </button>
          </div>
        ) : (
            <div className="space-y-3">
                {habits.map(habit => (
                    <div key={habit.id} className="p-3 bg-white rounded-lg shadow-sm border border-gray-200 text-gray-700 text-sm">
                        <p className="font-medium text-purple-700">{toPersianDigits(habit.title)}</p>
                        <p className="text-xs text-gray-500">{toPersianDigits(`فرکانس: ${habit.frequency === 'daily' ? 'روزانه' : habit.frequency === 'weekly' ? 'هفتگی' : habit.customFrequencyDetails || 'سفارشی'}`)} - {toPersianDigits(`زمان: ${habit.timeOfDay === 'any' ? 'هر زمان' : habit.timeOfDay === 'morning' ? 'صبح' : habit.timeOfDay === 'afternoon' ? 'بعد از ظهر' : 'عصر'}`)}</p>
                        <p className="text-xs text-gray-500">{toPersianDigits(`رشته عادت: ${habit.streak} روز`)}</p>
                        {habit.aiRationale && <p className="text-[10px] text-gray-400 italic mt-1">{toPersianDigits(`(از پیشنهاد هوش مصنوعی)`)}</p>}
                        {/* Placeholder for habit completion tracking UI */}
                    </div>
                ))}
            </div>
        )}
      </div>

        <div className="mt-6 p-4 bg-gray-100 rounded-xl shadow-inner text-center text-gray-600 text-sm">
            <p>{toPersianDigits("امتیازات و نشان‌های گیمیفیکیشن در اینجا نمایش داده می‌شوند.")}</p>
        </div>

    </div>
  );
};

export default HabitsPage;
