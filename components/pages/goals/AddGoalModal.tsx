
import React, { useState, useEffect, useCallback } from 'react';
import { toPersianDigits, parseJsonFromString } from '../../../utils';
import { XMarkIcon, LightbulbIcon, SparklesIconNav as SparklesIcon, TrashIcon, PlusIcon, PencilIcon } from '../../shared/AppIcons';
import LoadingSpinner from '../../shared/LoadingSpinner';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import CollapsibleSection from '../../shared/CollapsibleSection';
import { Goal, KeyResult, GoalActionPlanTask } from '../../../types/learningTypes'; // Updated import

export interface AddGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveGoal: (goalData: Omit<Goal, 'id' | 'progress' | 'status'>) => void;
  initialGoalData?: Goal | null; 
}

interface ActionPlanTaskUI extends GoalActionPlanTask {
  uiId: string; // For local list management
  selected: boolean; 
  isEditing?: boolean; 
}

const AI_MODEL_NAME = 'gemini-2.5-flash-preview-04-17';

const goalCategories = [
  { value: "", label: toPersianDigits("انتخاب کنید...") },
  { value: "یادگیری", label: toPersianDigits("📚 یادگیری") },
  { value: "شغلی", label: toPersianDigits("💼 شغلی") },
  { value: "سلامتی", label: toPersianDigits("❤️ سلامتی") },
  { value: "مالی", label: toPersianDigits("💰 مالی") },
  { value: "رشد شخصی", label: toPersianDigits("🌱 رشد شخصی") },
  { value: "روابط", label: toPersianDigits("🤝 روابط") },
  { value: "سفر", label: toPersianDigits("✈️ سفر") },
  { value: "پروژه خلاق", label: toPersianDigits("🎨 پروژه خلاق") },
  { value: "سایر", label: toPersianDigits("✨ سایر") },
];

const AddGoalModal: React.FC<AddGoalModalProps> = ({ isOpen, onClose, onSaveGoal, initialGoalData }) => {
  const [goalTitle, setGoalTitle] = useState('');
  const [goalDescription, setGoalDescription] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [category, setCategory] = useState('');
  const [lifeProjectId, setLifeProjectId] = useState<string | undefined>(undefined); 
  const [keyResults, setKeyResults] = useState<KeyResult[]>([]); 
  
  const [smartGoalTitle, setSmartGoalTitle] = useState<string | null>(null);
  const [smartGoalDescription, setSmartGoalDescription] = useState<string | null>(null);
  const [aiRationale, setAiRationale] = useState<string | null>(null);
  const [isSuggestingSmart, setIsSuggestingSmart] = useState(false);
  const [smartError, setSmartError] = useState<string | null>(null);

  const [actionPlanTasksUI, setActionPlanTasksUI] = useState<ActionPlanTaskUI[]>([]);
  const [aiActionPlanSummary, setAiActionPlanSummary] = useState<string | null>(null);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [planError, setPlanError] = useState<string | null>(null);
  const [newSubTaskInput, setNewSubTaskInput] = useState('');

  const [titleBlurred, setTitleBlurred] = useState(false);
  const [dateBlurred, setDateBlurred] = useState(false);
  const [categoryBlurred, setCategoryBlurred] = useState(false);

  const [isAiRationaleOpen, setIsAiRationaleOpen] = useState(false);
  const [isAiActionPlanSummaryOpen, setIsAiActionPlanSummaryOpen] = useState(false);


  const apiKey = process.env.API_KEY;
  const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

  const isTitleValid = goalTitle.trim() !== '';
  const isDateValid = targetDate.trim() !== '' && new Date(targetDate) >= new Date(new Date().setHours(0,0,0,0));
  const isCategoryValid = category.trim() !== '';

  const resetForm = useCallback(() => {
    setGoalTitle('');
    setGoalDescription('');
    setTargetDate('');
    setCategory('');
    setLifeProjectId(undefined);
    setKeyResults([]);
    setSmartGoalTitle(null);
    setSmartGoalDescription(null);
    setAiRationale(null);
    setActionPlanTasksUI([]);
    setAiActionPlanSummary(null);
    setSmartError(null);
    setPlanError(null);
    setTitleBlurred(false);
    setDateBlurred(false);
    setCategoryBlurred(false);
    setNewSubTaskInput('');
    setIsAiRationaleOpen(false);
    setIsAiActionPlanSummaryOpen(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (initialGoalData) {
        setGoalTitle(initialGoalData.title);
        setGoalDescription(initialGoalData.description || '');
        setTargetDate(initialGoalData.dueDate || '');
        setCategory(initialGoalData.category || '');
        setLifeProjectId(initialGoalData.lifeProjectId);
        setKeyResults(initialGoalData.keyResults || []);
        setSmartGoalTitle(initialGoalData.smartGoalTitle || null);
        setSmartGoalDescription(initialGoalData.smartGoalDescription || null);
        setAiRationale(initialGoalData.aiRationale || null);
        setActionPlanTasksUI(initialGoalData.actionPlanTasks?.map((task, index) => ({
          ...task,
          id: task.id || `loaded-task-id-${Date.now()}-${index}`, 
          uiId: `loaded-task-ui-${Date.now()}-${index}`, 
          selected: true, 
          isEditing: false,
        })) || []);
        setAiActionPlanSummary(initialGoalData.aiActionPlanSummary || null);
        setSmartError(null);
        setPlanError(null);
        setTitleBlurred(false);
        setDateBlurred(false);
        setCategoryBlurred(false);
        setNewSubTaskInput('');
        setIsAiRationaleOpen(!!initialGoalData.aiRationale);
        setIsAiActionPlanSummaryOpen(!!initialGoalData.aiActionPlanSummary || (initialGoalData.actionPlanTasks || []).length > 0);

      } else {
        resetForm();
      }
    } else {
       resetForm();
    }
  }, [isOpen, initialGoalData, resetForm]);

  useEffect(() => { 
    setIsAiActionPlanSummaryOpen(actionPlanTasksUI.length > 0 || !!aiActionPlanSummary);
  }, [actionPlanTasksUI, aiActionPlanSummary]);


  const handleGetSmartSuggestion = async () => {
    if (!ai) {
      setSmartError(toPersianDigits("سرویس هوش مصنوعی به دلیل عدم تنظیم کلید API در دسترس نیست."));
      setIsSuggestingSmart(false);
      return;
    }
    if (!goalTitle.trim() && !goalDescription.trim()) {
      setSmartError(toPersianDigits("لطفاً ابتدا عنوان یا توضیحات اولیه هدف را وارد کنید."));
      return;
    }
    setIsSuggestingSmart(true);
    setSmartError(null);
    setSmartGoalTitle(null); 
    setSmartGoalDescription(null);
    setAiRationale(null);

    try {
      const prompt = `ایده هدف من این است: عنوان: "${goalTitle}", توضیحات: "${goalDescription}", دسته بندی: "${category}". لطفاً این ایده را به یک هدف SMART (مشخص، قابل اندازه‌گیری، قابل دستیابی، مرتبط، زمان‌بندی شده) به زبان فارسی تبدیل کن. تاریخ سررسید فعلی ${targetDate || 'نامشخص'} است، آن را در نظر بگیر یا در صورت نیاز تاریخ بهتری پیشنهاد بده. پاسخ را به صورت یک JSON با کلیدهای "smartGoalTitle"، "smartGoalDescription"، "suggestedDueDate" (اگر تاریخ تغییر کرد یا برای اولین بار پیشنهاد شد، فرمت YYYY-MM-DD) و "aiRationale" (توضیح دلیل SMART شدن و چگونگی آن) ارائه بده.`;
      
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: AI_MODEL_NAME,
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });

      const parsedData = parseJsonFromString<any>(response.text);
      
      if (parsedData && parsedData.smartGoalTitle && parsedData.smartGoalDescription && parsedData.aiRationale) {
        setGoalTitle(parsedData.smartGoalTitle); 
        setGoalDescription(parsedData.smartGoalDescription);
        if (parsedData.suggestedDueDate) {
            setTargetDate(parsedData.suggestedDueDate);
        }
        setSmartGoalTitle(parsedData.smartGoalTitle);
        setSmartGoalDescription(parsedData.smartGoalDescription);
        setAiRationale(parsedData.aiRationale);
        setIsAiRationaleOpen(true); 
      } else {
        throw new Error(toPersianDigits("پاسخ هوش مصنوعی شامل تمام فیلدهای مورد انتظار برای هدف SMART نبود."));
      }

    } catch (e: any) {
      console.error("Error getting SMART suggestion:", e);
      setSmartError(toPersianDigits(`خطا در دریافت پیشنهاد SMART: ${e.message || "لطفاً دوباره امتحان کنید."}`));
    } finally {
      setIsSuggestingSmart(false);
    }
  };

  const handleGenerateActionPlan = async () => {
    if (!ai) {
      setPlanError(toPersianDigits("سرویس هوش مصنوعی به دلیل عدم تنظیم کلید API در دسترس نیست."));
      setIsGeneratingPlan(false);
      return;
    }
    const currentTitle = smartGoalTitle || goalTitle;
    if (!currentTitle.trim()) {
      setPlanError(toPersianDigits("لطفاً ابتدا هدف خود را مشخص یا پیشنهاد SMART دریافت کنید."));
      return;
    }
    setIsGeneratingPlan(true);
    setPlanError(null);
    setActionPlanTasksUI([]);
    setAiActionPlanSummary(null);
    try {
      const prompt = `برای دستیابی به هدف زیر: "${currentTitle}", یک برنامه اقدام با ۳ تا ۵ وظیفه عملیاتی به زبان فارسی ایجاد کن. هر وظیفه باید مشخص و قابل اجرا باشد. برای هر وظیفه یک "title"، "estimatedDueDate" (تاریخ تخمینی به فرمت YYYY-MM-DD با توجه به سررسید هدف اصلی: ${targetDate || 'نامشخص'})، "description" (اختیاری) و "estimatedDurationMinutes" (عدد، تخمین زمان به دقیقه) ارائه بده. همچنین یک "aiSummary" کلی از برنامه و منطق آن ارائه بده. پاسخ را به صورت یک JSON با کلیدهای "actionPlanTasks" (آرایه‌ای از اشیاء وظیفه) و "aiSummary" ارائه بده.`;
      
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: AI_MODEL_NAME,
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });

      const parsedData = parseJsonFromString<any>(response.text);

      if (parsedData && parsedData.actionPlanTasks && Array.isArray(parsedData.actionPlanTasks) && parsedData.aiSummary) {
        setActionPlanTasksUI(parsedData.actionPlanTasks.map((task: any, index: number) => ({
          uiId: `task-ui-${Date.now()}-${index}`, 
          id: task.id || `ai-task-id-${Date.now()}-${index}`, 
          title: task.title || '',
          description: task.description || '',
          dueDate: task.estimatedDueDate || undefined,
          estimatedDurationMinutes: task.estimatedDurationMinutes || undefined,
          selected: true, 
          isEditing: false,
          completed: false, 
        })));
        setAiActionPlanSummary(parsedData.aiSummary);
        setIsAiActionPlanSummaryOpen(true); 
      } else {
         throw new Error(toPersianDigits("پاسخ هوش مصنوعی شامل تمام فیلدهای مورد انتظار برای برنامه اقدام نبود."));
      }
    } catch (e: any) {
      console.error("Error generating action plan:", e);
      setPlanError(toPersianDigits(`خطا در تولید برنامه اقدام: ${e.message || "لطفاً دوباره امتحان کنید."}`));
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  const handleTaskSelectionChange = (uiId: string) => {
    setActionPlanTasksUI(prev => prev.map(task => task.uiId === uiId ? { ...task, selected: !task.selected } : task));
  };
  
  const handleTaskTitleChange = (uiId: string, newTitle: string) => {
    setActionPlanTasksUI(prev => prev.map(task => task.uiId === uiId ? { ...task, title: newTitle } : task));
  };

  const toggleTaskEditing = (uiId: string) => {
    setActionPlanTasksUI(prev => prev.map(task => task.uiId === uiId ? {...task, isEditing: !task.isEditing} : {...task, isEditing: false}));
  };

  const handleDeleteTask = (uiId: string) => {
    setActionPlanTasksUI(prev => prev.filter(task => task.uiId !== uiId));
  };
  
  const handleAddManualSubTask = () => {
    if (newSubTaskInput.trim()) {
        const newTask: ActionPlanTaskUI = {
            uiId: `manual-task-ui-${Date.now()}`,
            id: `manual-task-id-${Date.now()}`, 
            title: newSubTaskInput.trim(),
            selected: true,
            isEditing: false,
            completed: false
        };
        setActionPlanTasksUI(prev => [...prev, newTask]);
        setNewSubTaskInput('');
    }
  };

  const handleAddKeyResult = () => {
    setKeyResults(prev => [...prev, { id: `kr-${Date.now()}`, text: '', progress: 0 }]);
  };
  const handleKeyResultChange = (id: string, field: keyof Omit<KeyResult, 'id'>, value: string | number) => {
    setKeyResults(prev => prev.map(kr => kr.id === id ? { ...kr, [field]: value } : kr));
  };
  const handleDeleteKeyResult = (id: string) => {
    setKeyResults(prev => prev.filter(kr => kr.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isTitleValid || !isDateValid || !isCategoryValid) {
        setTitleBlurred(true); setDateBlurred(true); setCategoryBlurred(true); 
        alert(toPersianDigits("لطفاً تمام فیلدهای الزامی ستاره‌دار را به درستی پر کنید."));
        return;
    }
    const finalActionPlanTasks: GoalActionPlanTask[] = actionPlanTasksUI
      .filter(task => task.selected && task.title.trim()) 
      .map(({ uiId, selected, isEditing, ...apiTask }) => ({ 
        ...apiTask
      }));

    onSaveGoal({ 
      title: goalTitle, 
      description: goalDescription, 
      dueDate: targetDate,
      category, 
      smartGoalTitle: smartGoalTitle || undefined, 
      smartGoalDescription: smartGoalDescription || undefined,
      aiRationale: aiRationale || undefined,
      actionPlanTasks: finalActionPlanTasks, 
      aiActionPlanSummary: aiActionPlanSummary || undefined,
      aiNextStep: finalActionPlanTasks.length > 0 ? finalActionPlanTasks[0].title : undefined,
      aiNextStepRationale: finalActionPlanTasks.length > 0 ? `بر اساس برنامه اقدام، اولین وظیفه "${finalActionPlanTasks[0].title}" است.` : undefined,
      lifeProjectId: lifeProjectId || undefined,
      keyResults: keyResults.filter(kr => kr.text.trim()),
    });
  };

  if (!isOpen) return null;

  return (
    <div 
      className="full-screen-modal-overlay active"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-goal-modal-title"
    >
      <div 
        className="full-screen-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200 flex-shrink-0">
          <h2 id="add-goal-modal-title" className="text-xl sm:text-2xl font-semibold text-indigo-700">{toPersianDigits(initialGoalData ? "ویرایش هدف" : "افزودن هدف جدید")}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="w-7 h-7" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 flex-grow overflow-y-auto modal-scroll-content !px-1 sm:!px-2">
          <div>
            <label htmlFor="goalTitle" className="block text-sm font-medium text-gray-700 mb-1">{toPersianDigits("عنوان هدف*")}</label>
            <input type="text" id="goalTitle" value={goalTitle} onChange={(e) => setGoalTitle(e.target.value)} 
                   onBlur={() => setTitleBlurred(true)}
                   required 
                   className={`w-full p-2.5 border rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-gray-800 text-sm placeholder-gray-400 
                              ${titleBlurred && !isTitleValid ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'}`}
                   placeholder={toPersianDigits("مثال: یادگیری زبان انگلیسی")} />
            {titleBlurred && !isTitleValid && <p className="text-xs text-red-600 mt-1">{toPersianDigits("عنوان هدف الزامی است.")}</p>}
          </div>
          <div>
            <label htmlFor="goalDescription" className="block text-sm font-medium text-gray-700 mb-1">{toPersianDigits("توضیحات")}</label>
            <textarea id="goalDescription" value={goalDescription} onChange={(e) => setGoalDescription(e.target.value)} rows={3} 
                      className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-gray-800 text-sm resize-y placeholder-gray-400"
                      placeholder={toPersianDigits("مثال: کسب نمره ۷ آیلتس تا پایان سال ۱۴۰۳")}></textarea>
          </div>
          
          <div className="space-y-3 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
            <button type="button" onClick={handleGetSmartSuggestion} disabled={isSuggestingSmart || !ai} className="w-full flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium py-2 px-4 rounded-md text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
              <LightbulbIcon className="w-5 h-5 mr-2"/>
              {isSuggestingSmart ? <LoadingSpinner size="sm" color="text-gray-800"/> : toPersianDigits("پیشنهاد هدف SMART با هوش مصنوعی")}
            </button>
            {!ai && <p className="text-xs text-center text-gray-500 mt-1">{toPersianDigits("سرویس هوش مصنوعی در دسترس نیست (کلید API تنظیم نشده؟)")}</p>}
            {smartError && <p className="text-red-600 text-xs text-center p-1 bg-red-100 rounded">{smartError}</p>}
            {aiRationale && (
              <CollapsibleSection 
                title={toPersianDigits("توضیح هوش مصنوعی (چگونه هدف SMART شد؟)")} 
                isOpen={isAiRationaleOpen}
                onToggle={() => setIsAiRationaleOpen(!isAiRationaleOpen)}
                titleClassName="text-sm font-medium text-indigo-700" 
                contentClassName="text-xs text-gray-600 p-2 bg-indigo-100 rounded"
              >
                <p className="whitespace-pre-wrap">{toPersianDigits(aiRationale)}</p>
              </CollapsibleSection>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="targetDate" className="block text-sm font-medium text-gray-700 mb-1">{toPersianDigits("تاریخ سررسید*")}</label>
              <input type="date" id="targetDate" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} 
                     onBlur={() => setDateBlurred(true)}
                     required
                     min={new Date(Date.now() + 86400000).toISOString().split("T")[0]} 
                     className={`w-full p-2.5 bg-gray-50 border rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-gray-800 text-sm
                                ${dateBlurred && !isDateValid ? 'border-red-500 bg-red-50' : 'border-gray-300'}`} />
              {dateBlurred && !isDateValid && <p className="text-xs text-red-600 mt-1">{toPersianDigits("تاریخ سررسید باید در آینده باشد.")}</p>}
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">{toPersianDigits("دسته‌بندی*")}</label>
              <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} 
                      onBlur={() => setCategoryBlurred(true)}
                      required 
                      className={`w-full p-2.5 bg-gray-50 border rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-gray-800 text-sm
                                 ${categoryBlurred && !isCategoryValid ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}>
                {goalCategories.map(cat => <option key={cat.value} value={cat.value}>{cat.label}</option>)}
              </select>
              {categoryBlurred && !isCategoryValid && <p className="text-xs text-red-600 mt-1">{toPersianDigits("انتخاب دسته‌بندی الزامی است.")}</p>}
            </div>
          </div>
           <div>
            <label htmlFor="lifeProjectId" className="block text-sm font-medium text-gray-700 mb-1">{toPersianDigits("پروژه زندگی مرتبط (اختیاری):")}</label>
            <input type="text" id="lifeProjectId" value={lifeProjectId || ''} onChange={(e) => setLifeProjectId(e.target.value)} 
                   className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-gray-800 text-sm"
                   placeholder={toPersianDigits("شناسه پروژه زندگی (در صورت وجود)")} />
          </div>
          
          <CollapsibleSection title={toPersianDigits("نتایج کلیدی (OKR - اختیاری)")} isOpen={keyResults.length > 0} onToggle={() => { if(keyResults.length === 0) handleAddKeyResult() }}>
            <div className="space-y-2 p-2 bg-gray-100 rounded-md">
              {keyResults.map((kr, index) => (
                <div key={kr.id} className="flex items-center space-x-2 space-x-reverse">
                  <input type="text" value={kr.text} onChange={e => handleKeyResultChange(kr.id, 'text', e.target.value)} placeholder={toPersianDigits(`نتیجه کلیدی ${index + 1}`)} className="flex-grow p-1.5 border border-gray-300 rounded-md text-xs"/>
                  <input type="number" value={kr.progress} onChange={e => handleKeyResultChange(kr.id, 'progress', parseInt(e.target.value))} placeholder={toPersianDigits("پیشرفت (٪)")} className="w-20 p-1.5 border border-gray-300 rounded-md text-xs"/>
                  <button type="button" onClick={() => handleDeleteKeyResult(kr.id)} className="text-red-500 p-1"><TrashIcon className="w-4 h-4"/></button>
                </div>
              ))}
              <button type="button" onClick={handleAddKeyResult} className="text-xs text-indigo-600 hover:underline mt-1">{toPersianDigits("+ افزودن نتیجه کلیدی")}</button>
            </div>
          </CollapsibleSection>

          <div className="space-y-3 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
            <button type="button" onClick={handleGenerateActionPlan} disabled={isGeneratingPlan || (!goalTitle.trim() && !smartGoalTitle) || !ai} className="w-full flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
              <SparklesIcon className="w-5 h-5 mr-2"/>
              {isGeneratingPlan ? <LoadingSpinner size="sm" /> : toPersianDigits("تولید برنامه اقدام با هوش مصنوعی")}
            </button>
            {!ai && <p className="text-xs text-center text-gray-500 mt-1">{toPersianDigits("سرویس هوش مصنوعی در دسترس نیست (کلید API تنظیم نشده؟)")}</p>}
             {planError && <p className="text-red-600 text-xs text-center p-1 bg-red-100 rounded">{planError}</p>}
            {aiActionPlanSummary && (
                 <CollapsibleSection 
                    title={toPersianDigits("خلاصه هوش مصنوعی از برنامه اقدام")} 
                    isOpen={isAiActionPlanSummaryOpen}
                    onToggle={() => setIsAiActionPlanSummaryOpen(!isAiActionPlanSummaryOpen)}
                    titleClassName="text-sm font-medium text-indigo-700" 
                    contentClassName="text-xs text-gray-600 p-2 bg-indigo-100 rounded"
                  >
                    <p className="whitespace-pre-wrap">{toPersianDigits(aiActionPlanSummary)}</p>
                </CollapsibleSection>
             )}
            {actionPlanTasksUI.length > 0 && (
              <div className="mt-2 p-3 bg-white rounded-md space-y-2 border border-gray-200">
                <h5 className="text-sm font-semibold text-indigo-700 mb-1">{toPersianDigits("وظایف پیشنهادی برنامه اقدام (قابل ویرایش):")}</h5>
                {actionPlanTasksUI.map((task) => (
                  <div key={task.uiId} className="flex items-center space-x-2 space-x-reverse p-1.5 bg-gray-50 rounded border border-gray-200">
                    <input type="checkbox" checked={task.selected} onChange={() => handleTaskSelectionChange(task.uiId)} className="form-checkbox h-4 w-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500" />
                    {task.isEditing ? (
                        <input 
                            type="text" 
                            value={task.title} 
                            onChange={(e) => handleTaskTitleChange(task.uiId, e.target.value)} 
                            onBlur={() => toggleTaskEditing(task.uiId)}
                            onKeyPress={(e) => e.key === 'Enter' && toggleTaskEditing(task.uiId)}
                            className="flex-grow bg-white text-gray-700 text-xs p-1 rounded border border-indigo-500" autoFocus />
                    ) : (
                        <span onClick={() => toggleTaskEditing(task.uiId)} className="flex-grow text-gray-700 text-xs cursor-text hover:bg-indigo-50 p-1 rounded">{toPersianDigits(task.title)}</span>
                    )}
                    {task.dueDate && <span className="text-[10px] text-gray-500 whitespace-nowrap bg-gray-100 px-1.5 py-0.5 rounded">{toPersianDigits(task.dueDate)}</span>}
                     {task.estimatedDurationMinutes && <span className="text-[10px] text-gray-500 whitespace-nowrap bg-gray-100 px-1.5 py-0.5 rounded">{toPersianDigits(String(task.estimatedDurationMinutes))} {toPersianDigits("دقیقه")}</span>}
                    <button type="button" onClick={() => toggleTaskEditing(task.uiId)} className="text-yellow-500 hover:text-yellow-600 p-0.5">
                      <PencilIcon className="w-3.5 h-3.5"/>
                    </button>
                  </div>
                ))}
                <div className="flex items-center space-x-2 space-x-reverse pt-2 border-t border-gray-200">
                    <input 
                        type="text" 
                        value={newSubTaskInput}
                        onChange={(e) => setNewSubTaskInput(e.target.value)}
                        placeholder={toPersianDigits("افزودن وظیفه فرعی دستی...")}
                        className="flex-grow bg-gray-100 text-gray-700 text-xs p-1.5 rounded border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button type="button" onClick={handleAddManualSubTask} className="p-1.5 bg-indigo-500 text-white rounded hover:bg-indigo-600"><PlusIcon className="w-3.5 h-3.5"/></button>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex justify-end space-x-3 space-x-reverse pt-4 border-t border-gray-200 sticky bottom-0 bg-white pb-1 -mb-5 z-10">
            <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors">
              {toPersianDigits("انصراف")}
            </button>
            <button type="submit" 
                    disabled={!isTitleValid || !isDateValid || !isCategoryValid}
                    className="px-6 py-2.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {toPersianDigits(initialGoalData ? "ذخیره تغییرات" : "ذخیره هدف")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGoalModal;
```
  </change>
</changes>```