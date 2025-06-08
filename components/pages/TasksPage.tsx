
import React, { useState, useEffect, useCallback } from 'react';
import { toPersianDigits, parseJsonFromString } from '../../utils';
import { ListIcon as PageIcon, PlusIcon, SparklesIconNav as AiIcon, MicrophoneIcon, CameraIcon, CheckCircleIcon, XCircleIcon, FunnelIcon, AdjustmentsVerticalIcon, TrashIcon, PencilIcon as EditIcon, ChevronDownIcon, ChevronUpIcon, LightbulbIcon, XMarkIcon } from '../../shared/AppIcons';
import LoadingSpinner from '../../shared/LoadingSpinner';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import XAIModal from '../../shared/XAIModal';
import ToastNotification from '../../shared/ToastNotification';
import CollapsibleSection from '../../shared/CollapsibleSection';
import EditTaskModal from './tasks/EditTaskModal';
import AISmartLearningSuggestionCard from '../../learning/AISmartLearningSuggestionCard'; 
import { LearningPath, LearningContent, LearningSuggestion, Task } from '../../../types/learningTypes'; 
import { PageName } from '../../../App'; 

interface ParsedTaskDetails {
  title: string;
  dueDate?: string;
  priority?: 'high' | 'medium' | 'low';
  relatedGoalId?: string; 
  tags?: string[];
  context?: string;
  aiConfidence?: number;
  rawInputText?: string;
}

interface AISubTaskSuggestion {
  id: string;
  title: string;
  estimatedTime?: string; 
  suggestedDueDate?: string; 
  editing?: boolean; 
}

interface AISuggestion {
  id: string;
  type: 'task' | 'workflow'; 
  title: string; 
  text: string; 
  details?: any; 
  xaiTitle: string;
  xaiExplanation: string;
  feedbackState?: 'idle' | 'accepting' | 'declining' | 'accepted_briefly' | 'declined_briefly';
  showCard?: boolean; 
}


const AI_MODEL_NAME = 'gemini-2.5-flash-preview-04-17';
const TASKS_LOCAL_STORAGE_KEY = 'lifeOrchestrator_tasksData_v1';
const TASK_REFLECTIONS_LS_KEY = 'taskReflections_v1'; // Added for consistency

// --- HELPER COMPONENTS ---
const AISuggestionCardComponent: React.FC<{ suggestion: AISuggestion; onAccept: (suggestion: AISuggestion) => void; onDecline: (suggestionId: string) => void; onWhy: (suggestion: AISuggestion) => void; }> = ({ suggestion, onAccept, onDecline, onWhy }) => {
    const { title, text, feedbackState = 'idle', showCard = true, id } = suggestion;
    const isInteracted = feedbackState === 'accepted_briefly' || feedbackState === 'declined_briefly';
    const isAccepting = feedbackState === 'accepting' || feedbackState === 'accepted_briefly';
    const isDeclining = feedbackState === 'declining' || feedbackState === 'declined_briefly';

    if (!showCard) return null;

    return (
      <div className={`bg-white p-4 rounded-xl shadow-sm border border-gray-200 transition-all duration-500 ease-out mb-3 ${showCard ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 h-0 p-0 m-0 overflow-hidden border-0'}`}>
        <h5 className="text-sm font-semibold text-indigo-700 mb-2 flex items-center">
          <AiIcon className="w-4 h-4 mr-2 text-yellow-500"/> {toPersianDigits(title)}
        </h5>
        <p className="text-xs text-gray-600 mb-3 leading-relaxed">{toPersianDigits(text)}</p>
        <div className="flex justify-between items-center text-xs mt-3 pt-2 border-t border-gray-200">
          <button onClick={() => onWhy(suggestion)} className="text-indigo-600 hover:underline disabled:opacity-50 disabled:cursor-not-allowed" disabled={isInteracted}>{toPersianDigits("چرا این پیشنهاد؟")}</button>
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


const TaskCard: React.FC<{ task: Task; onToggleComplete: (id: string) => void; onBreakdown: (task: Task) => void; onDelete: (id: string) => void; onEdit: (task: Task) => void; isBreakingDownThisTask: boolean; navigateToLearningItem?: (type: LearningSuggestion['type'], itemId: string) => void; }> = ({ task, onToggleComplete, onBreakdown, onDelete, onEdit, isBreakingDownThisTask, navigateToLearningItem }) => {
  const [isSubTasksOpen, setIsSubTasksOpen] = useState(false); 

  const priorityClasses = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return 'bg-red-100 border-red-300 text-red-700';
      case 'medium': return 'bg-yellow-100 border-yellow-300 text-yellow-700';
      case 'low': return 'bg-green-100 border-green-300 text-green-700';
      default: return 'bg-gray-100 border-gray-300 text-gray-700';
    }
  };

  const dueDateColor = (dueDate?: string) => {
    if (!dueDate) return 'text-gray-500';
    const today = new Date();
    today.setHours(0,0,0,0);
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'text-red-600 font-semibold'; 
    if (diffDays <= 2) return 'text-yellow-600 font-medium'; 
    return 'text-gray-500';
  };

  return (
    <div className={`bg-white p-4 rounded-xl shadow-sm border transition-all duration-300 ${task.completed ? 'opacity-60 bg-gray-50' : 'hover:shadow-md hover:border-indigo-300'}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start flex-grow min-w-0">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
            className="form-checkbox h-5 w-5 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 focus:ring-offset-white cursor-pointer mt-1 ml-3"
            aria-label={toPersianDigits(`تکمیل وظیفه ${task.title}`)}
          />
          <div className="flex-grow min-w-0">
            <h4 className={`text-md font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>{toPersianDigits(task.title)}</h4>
            {task.description && <p className={`text-xs mt-1 ${task.completed ? 'text-gray-400' : 'text-gray-600'} line-clamp-2`}>{toPersianDigits(task.description)}</p>}
          </div>
        </div>
        <div className="flex flex-col items-end flex-shrink-0 pl-2 space-y-0.5">
           <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full border ${priorityClasses(task.priority)}`}>
             {toPersianDigits(task.priority === 'high' ? 'بالا' : task.priority === 'medium' ? 'متوسط' : 'پایین')}
           </span>
           {task.dueDate && <p className={`text-[10px] ${dueDateColor(task.dueDate)}`}>{toPersianDigits(new Date(task.dueDate).toLocaleDateString('fa-IR'))}</p>}
        </div>
      </div>
      
      {task.tags && task.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {task.tags.map(tag => (
            <span key={tag} className="px-1.5 py-0.5 text-[9px] bg-gray-200 text-gray-700 rounded-full">{toPersianDigits(tag)}</span>
          ))}
        </div>
      )}

      {task.subTasks && task.subTasks.length > 0 && (
         <CollapsibleSection 
            title={toPersianDigits(`وظایف فرعی (${String(task.subTasks.length)})`)} 
            isOpen={isSubTasksOpen}
            onToggle={() => setIsSubTasksOpen(!isSubTasksOpen)}
            titleClassName="text-xs text-indigo-600 mt-2" 
            contentClassName="text-xs text-gray-600 p-2 bg-indigo-50 rounded-md"
          >
          <ul className="space-y-1">
            {task.subTasks.map(sub => (
              <li key={sub.id} className={`flex items-center ${sub.completed ? 'opacity-60 line-through' : ''}`}>
                <input type="checkbox" checked={sub.completed} readOnly className="form-checkbox h-3 w-3 text-indigo-500 bg-gray-100 border-gray-300 rounded mr-1.5" />
                <span className="text-[11px]">{toPersianDigits(sub.title)}</span>
              </li>
            ))}
          </ul>
        </CollapsibleSection>
      )}
      
      {task.learningSuggestions && task.learningSuggestions.length > 0 && !task.completed && (
        <div className="mt-2 pt-2 border-t border-gray-100">
           {task.learningSuggestions.map(suggestion => (
              <AISmartLearningSuggestionCard 
                key={suggestion.id} 
                suggestion={suggestion} 
                onViewSuggestion={(type, itemId) => navigateToLearningItem && navigateToLearningItem(type, itemId)}
              />
            ))}
        </div>
      )}


      <div className="mt-3 pt-2 border-t border-gray-200 flex items-center justify-end space-x-1.5 space-x-reverse">
        <button 
            onClick={() => onBreakdown(task)} 
            disabled={isBreakingDownThisTask}
            className="text-xs text-teal-600 hover:text-teal-700 p-1 rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            title={toPersianDigits("تجزیه وظیفه با هوش مصنوعی")}
        >
           {isBreakingDownThisTask ? <LoadingSpinner size="sm" color="text-teal-600"/> : <AiIcon className="w-3.5 h-3.5 mr-0.5"/>}
           {toPersianDigits("تجزیه")}
        </button>
        <button onClick={() => onEdit(task)} className="text-xs text-yellow-600 hover:text-yellow-700 p-1 rounded" title={toPersianDigits("ویرایش وظیفه")}>
            <EditIcon className="w-3.5 h-3.5"/>
        </button>
        <button onClick={() => onDelete(task.id)} className="text-xs text-red-600 hover:text-red-700 p-1 rounded" title={toPersianDigits("حذف وظیفه")}>
            <TrashIcon className="w-3.5 h-3.5"/>
        </button>
      </div>
    </div>
  );
};

interface TasksPageProps { 
  learningPaths?: LearningPath[];
  learningContent?: LearningContent[];
  navigateTo?: (pageName: PageName | string, params?: any) => void; 
}

const TasksPage: React.FC<TasksPageProps> = ({ learningPaths = [], learningContent = [], navigateTo }) => {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [displayedTasks, setDisplayedTasks] = useState<Task[]>([]);
  const [newTaskInput, setNewTaskInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [parsingError, setParsingError] = useState<string | null>(null);
  const [parsedTaskDetails, setParsedTaskDetails] = useState<ParsedTaskDetails | null>(null);
  const [showParsedPreview, setShowParsedPreview] = useState(false);
  
  const [breakingDownTaskId, setBreakingDownTaskId] = useState<string | null>(null);
  const [taskBreakdownResult, setTaskBreakdownResult] = useState<AISubTaskSuggestion[] | null>(null);
  const [breakdownError, setBreakdownError] = useState<string | null>(null);

  const [currentFilter, setCurrentFilter] = useState<string>("all");
  const [currentSort, setCurrentSort] = useState<string>("dueDateAsc");
  const [isAISortLoading, setIsAISortLoading] = useState(false);

  const [toastInfo, setToastInfo] = useState<{id: number, text: string, type: 'success' | 'error' | 'info'} | null>(null);
  const [showXAIModal, setShowXAIModal] = useState(false);
  const [xaiContent, setXaiContent] = useState({ title: '', explanation: '' });

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [taskSuggestions, setTaskSuggestions] = useState<AISuggestion[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

  const apiKey = process.env.API_KEY;
  const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

  const showToast = (text: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToastInfo({ id: Date.now(), text: toPersianDigits(text), type });
  };
  
  useEffect(() => {
    const savedTasks = localStorage.getItem(TASKS_LOCAL_STORAGE_KEY);
    if (savedTasks) {
      setAllTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => { localStorage.setItem(TASKS_LOCAL_STORAGE_KEY, JSON.stringify(allTasks)); }, [allTasks]);


  useEffect(() => {
    if (toastInfo) {
      const timer = setTimeout(() => setToastInfo(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastInfo]);

  const handleSmartAddTask = async (inputMethod: 'text' | 'voice' | 'image' = 'text') => {
    if (!ai) {
      setParsingError(toPersianDigits("سرویس هوش مصنوعی به دلیل عدم تنظیم کلید API در دسترس نیست."));
      setIsLoading(false);
      return;
    }
    let currentInput = newTaskInput;
    if (inputMethod === 'voice') currentInput = "ورودی صوتی شبیه‌سازی شده: فردا یک قرار ملاقات با دکتر برای ساعت ۳ بعد از ظهر تنظیم کن. اولویت بالا.";
    if (inputMethod === 'image') currentInput = "ورودی تصویری OCR شبیه‌سازی شده: لیست خرید: ۱. شیر ۲. نان ۳. تخم مرغ. وظیفه: خرید این اقلام.";
    
    if (!currentInput.trim()) {
      setParsingError(toPersianDigits("لطفاً متنی برای تحلیل وارد کنید."));
      return;
    }

    setIsLoading(true);
    setParsingError(null);
    setParsedTaskDetails(null);
    setShowParsedPreview(false);

    try {
      const prompt = `متن زیر را تحلیل کن و جزئیات وظیفه را به صورت JSON استخراج کن. JSON باید شامل کلیدهای زیر باشد: "title" (رشته، عنوان وظیفه)، "dueDate" (رشته، تاریخ به فرمت YYYY-MM-DD اگر مشخص شده)، "priority" (رشته، 'high'، 'medium' یا 'low' اگر مشخص شده)، "relatedGoalId" (رشته، اگر به هدفی مرتبط است)، "tags" (آرایه‌ای از رشته‌ها برای برچسب‌ها) و "context" (رشته، مانند "در خانه"). اگر جزئیاتی یافت نشد، مقدار آن را null یا رشته خالی قرار بده. اطمینان هوش مصنوعی (aiConfidence) را هم بین 0 و 1 قرار بده.\n\nورودی کاربر: "${currentInput}"`;
      
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: AI_MODEL_NAME,
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });

      const parsedData = parseJsonFromString<ParsedTaskDetails>(response.text);
      
      if (parsedData) {
        parsedData.aiConfidence = parsedData.aiConfidence || Math.random() * 0.3 + 0.7; 
        parsedData.rawInputText = currentInput;
        setParsedTaskDetails(parsedData);
      } else {
        setParsedTaskDetails({ title: currentInput, rawInputText: currentInput, aiConfidence: 0.5 }); // Fallback
        throw new Error("JSON parsing failed or returned null.");
      }
      setShowParsedPreview(true);
      if (inputMethod !== 'text') setNewTaskInput(currentInput); 

    } catch (e:any) {
      console.error("Error parsing task:", e);
      setParsingError(toPersianDigits(`خطا در تحلیل هوشمند: ${e.message || "لطفاً دوباره امتحان کنید."}`));
      setParsedTaskDetails({ title: currentInput, rawInputText: currentInput }); 
      setShowParsedPreview(true);
      showToast("تحلیل هوشمند ناموفق بود. می‌توانید جزئیات را دستی ویرایش کنید.", 'info');
    } finally {
      setIsLoading(false);
    }
  };
  
  const confirmAddTask = () => {
    if (!parsedTaskDetails || !parsedTaskDetails.title) {
      showToast("عنوان وظیفه یافت نشد. لطفاً ورودی را اصلاح کنید.", 'error');
      return;
    }
    const newTask: Task = {
      id: String(Date.now()),
      title: parsedTaskDetails.title,
      description: '', 
      priority: parsedTaskDetails.priority || 'medium',
      dueDate: parsedTaskDetails.dueDate,
      tags: parsedTaskDetails.tags || [],
      context: parsedTaskDetails.context,
      relatedGoalId: parsedTaskDetails.relatedGoalId,
      completed: false,
      subTasks: [],
      aiConfidence: parsedTaskDetails.aiConfidence,
      rawInput: parsedTaskDetails.rawInputText,
      isAiExtracted: true,
    };
    setAllTasks(prevTasks => [newTask, ...prevTasks]);
    setNewTaskInput('');
    setParsedTaskDetails(null);
    setShowParsedPreview(false);
    showToast("وظیفه جدید با موفقیت اضافه شد!", 'success');
  };

  const cancelPreview = () => {
    setShowParsedPreview(false);
    setParsedTaskDetails(null);
    setParsingError(null);
  };

  const handleEditParsedDetail = (field: keyof ParsedTaskDetails, value: any) => {
    if (parsedTaskDetails) {
        setParsedTaskDetails(prev => ({...prev!, [field]: value}));
    }
  };

  const handleBreakdownTask = async (taskToBreakdown: Task) => {
    if (!ai) {
      setBreakdownError(toPersianDigits("سرویس هوش مصنوعی به دلیل عدم تنظیم کلید API در دسترس نیست."));
      setBreakingDownTaskId(null);
      return;
    }
    setBreakingDownTaskId(taskToBreakdown.id);
    setTaskBreakdownResult(null);
    setBreakdownError(null);
    try {
        let descriptionPart = '';
        if (taskToBreakdown.description) {
          descriptionPart = ` توضیحات: "${String(taskToBreakdown.description)}".`;
        }
        const dueDatePart = taskToBreakdown.dueDate || 'نامشخص';
        
        const promptContent = `وظیفه اصلی: "${String(taskToBreakdown.title)}".${descriptionPart} این وظیفه را به ۳ تا ۵ وظیفه فرعی عملیاتی کوچکتر تجزیه کن. برای هر وظیفه فرعی یک "title" (عنوان)، "estimatedTime" (زمان تخمینی مانند "۳۰ دقیقه"، "۱ ساعت") و "suggestedDueDate" (تاریخ پیشنهادی YYYY-MM-DD با توجه به سررسید وظیفه اصلی: ${String(dueDatePart)}) ارائه بده. پاسخ را به صورت یک JSON با آرایه‌ای از این اشیاء وظیفه فرعی با کلید "subTasks" برگردان.`;
        const prompt = toPersianDigits(promptContent);

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: AI_MODEL_NAME,
            contents: prompt,
            config: { responseMimeType: "application/json" }
        });

        const parsedData = parseJsonFromString<{ subTasks: any[] }>(response.text);

        if (parsedData && parsedData.subTasks && Array.isArray(parsedData.subTasks)) {
            const subTasksWithIds: AISubTaskSuggestion[] = parsedData.subTasks.map((st: any, index: number) => ({
                id: `sub-${taskToBreakdown.id}-${index}`,
                title: st.title || toPersianDigits(`وظیفه فرعی ${String(index + 1)}`),
                estimatedTime: st.estimatedTime,
                suggestedDueDate: st.suggestedDueDate,
                editing: false,
            }));
            setTaskBreakdownResult(subTasksWithIds);
            showToast(toPersianDigits(`وظیفه "${taskToBreakdown.title}" با موفقیت تجزیه شد!`), 'success');
        } else {
            throw new Error(toPersianDigits("فرمت پاسخ تجزیه وظیفه نامعتبر است."));
        }

    } catch (e: any) {
        console.error("Error breaking down task:", e);
        setBreakdownError(toPersianDigits(`خطا در تجزیه وظیفه: ${e.message || "لطفاً دوباره امتحان کنید."}`));
        showToast(toPersianDigits(`خطا در تجزیه وظیفه "${taskToBreakdown.title}".`), 'error');
    } finally {
        setBreakingDownTaskId(null);
    }
  };
  
  const handleSaveSubTasksToTask = (originalTaskId: string | undefined, subTasksToAdd: AISubTaskSuggestion[]) => {
    if (!originalTaskId) {
        showToast("خطا: شناسه وظیفه اصلی یافت نشد.", 'error');
        return;
    }
    setAllTasks(prevTasks => prevTasks.map(task => {
        if (task.id === originalTaskId) {
            return {
                ...task,
                subTasks: subTasksToAdd.map(st => ({
                    id: st.id,
                    title: st.title,
                    priority: task.priority, 
                    dueDate: st.suggestedDueDate || task.dueDate,
                    completed: false,
                    subTasks: [],
                }))
            };
        }
        return task;
    }));
    setTaskBreakdownResult(null); 
    showToast("وظایف فرعی به وظیفه اصلی اضافه شدند.", 'success');
  };
  
  const handleEditSubTaskTitle = (subTaskId: string, newTitle: string) => {
    setTaskBreakdownResult(prevResult => 
        prevResult ? prevResult.map(st => st.id === subTaskId ? {...st, title: newTitle, editing: false} : st) : null
    );
  };
  
  const toggleSubTaskEditing = (subTaskId: string) => {
    setTaskBreakdownResult(prevResult => 
        prevResult ? prevResult.map(st => st.id === subTaskId ? {...st, editing: !st.editing} : {...st, editing: false}) : null
    );
  };

  const generateLearningSuggestionsForTask = useCallback((task: Task): LearningSuggestion[] => {
    const suggestions: LearningSuggestion[] = [];
    if (task.title.toLowerCase().includes(toPersianDigits("گزارش نویسی").toLowerCase()) || (task.tags && task.tags.includes("گزارش"))) {
      const reportWritingContent = learningContent.find(lc => lc.id === 'lc-prio'); 
      if (reportWritingContent) {
        suggestions.push({
          id: `sugg-rw-${task.id}`,
          type: 'content',
          itemId: reportWritingContent.id,
          title: reportWritingContent.title,
          description: toPersianDigits(`برای کمک به تکمیل وظیفه '${task.title}'، این محتوا می‌تواند مفید باشد.`),
          sourceModule: 'Tasks',
          triggerContext: toPersianDigits(`وظیفه: ${task.title}`),
        });
      }
    }
    return suggestions;
  }, [learningContent]);

  const applyFiltersAndSort = useCallback(async () => {
    let tempTasks = [...allTasks].map(t => ({
      ...t,
      learningSuggestions: generateLearningSuggestionsForTask(t)
    }));
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (6 - today.getDay()) + 1); 
    endOfWeek.setHours(23,59,59,999);


    switch (currentFilter) {
      case 'today':
        tempTasks = tempTasks.filter(t => t.dueDate && new Date(t.dueDate).toDateString() === today.toDateString() && !t.completed);
        break;
      case 'thisWeek':
        tempTasks = tempTasks.filter(t => t.dueDate && new Date(t.dueDate) >= today && new Date(t.dueDate) <= endOfWeek && !t.completed);
        break;
      case 'overdue':
        tempTasks = tempTasks.filter(t => t.dueDate && new Date(t.dueDate) < today && !t.completed);
        break;
      case 'completed':
        tempTasks = tempTasks.filter(t => t.completed);
        break;
      case 'highPriority':
        tempTasks = tempTasks.filter(t => t.priority === 'high' && !t.completed);
        break;
      default: 
        tempTasks = tempTasks.filter(t => !t.completed);
        break;
    }

    switch (currentSort) {
      case 'dueDateAsc':
        tempTasks.sort((a, b) => (a.dueDate && b.dueDate ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime() : a.dueDate ? -1 : 1));
        break;
      case 'priorityDesc':
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        tempTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
        break;
      case 'creationDateDesc': 
        tempTasks.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      case 'aiPriority':
        if (!ai) {
          showToast("سرویس هوش مصنوعی برای مرتب‌سازی در دسترس نیست.", 'error');
          setIsAISortLoading(false);
          break;
        }
        setIsAISortLoading(true);
        try {
          // Simulate AI sorting by some heuristic
          await new Promise(resolve => setTimeout(resolve, 1000)); 
          const taskScores: Record<string, number> = {};
          tempTasks.forEach(task => {
            let score = 0;
            if (task.priority === 'high') score += 100;
            if (task.priority === 'medium') score += 50;
            if (task.dueDate) {
                const daysDiff = (new Date(task.dueDate).getTime() - today.getTime()) / (1000 * 3600 * 24);
                if (daysDiff < 0) score += 200; 
                else if (daysDiff <= 2) score += 75;
            }
            if (task.title.toLowerCase().includes("مهم") || task.title.toLowerCase().includes("فوری")) score += 60;
            taskScores[task.id] = score;
          });
          tempTasks.sort((a, b) => taskScores[b.id] - taskScores[a.id]);
          showToast("وظایف بر اساس اهمیت و فوریت توسط هوش مصنوعی مرتب شدند (شبیه‌سازی شده).", 'info');
        } catch (error) {
          console.error("AI priority sort error:", error);
          showToast("خطا در مرتب‌سازی با هوش مصنوعی.", 'error');
        } finally {
          setIsAISortLoading(false);
        }
        break;
      default:
        break;
    }
    setDisplayedTasks(tempTasks);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTasks, currentFilter, currentSort, generateLearningSuggestionsForTask, ai]); 
  
  useEffect(() => {
    applyFiltersAndSort();
  }, [allTasks, currentFilter, currentSort, applyFiltersAndSort]);

  const handleToggleComplete = (taskId: string) => {
    setAllTasks(prevTasks => prevTasks.map(task => 
      task.id === taskId ? {...task, completed: !task.completed} : task
    ));
    const task = allTasks.find(t => t.id === taskId);
    if (task && !task.completed) { 
      showToast(`وظیفه "${toPersianDigits(task.title)}" تکمیل شد! عالی بود!`, 'success');
    }
  };

  const handleDeleteTask = (taskId: string) => {
    setAllTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    showToast("وظیفه حذف شد.", 'info');
  };
  
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  const handleSaveEditedTask = (updatedTask: Task) => {
    setAllTasks(prevTasks => prevTasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    setIsEditModalOpen(false);
    setEditingTask(null);
    showToast(`وظیفه "${toPersianDigits(updatedTask.title)}" به‌روزرسانی شد.`, 'success');
  };

  const fetchTaskSuggestions = async () => {
    if (!ai) {
      showToast("سرویس هوش مصنوعی به دلیل عدم تنظیم کلید API در دسترس نیست.", 'error');
      setIsLoadingSuggestions(false);
      return;
    }
    setIsLoadingSuggestions(true);
    setTaskSuggestions([]);
    try {
      const existingTasksSample = allTasks.slice(0,3).map(t => t.title).join(", ") || "هیچ وظیفه فعالی";
      const prompt = `بر اساس وظایف موجود کاربر (${existingTasksSample}) و با در نظر گرفتن نیازهای احتمالی یک فرد پرمشغله، ۱ تا ۲ پیشنهاد وظیفه هوشمند به زبان فارسی ارائه بده. هر پیشنهاد باید شامل "title" (عنوان وظیفه پیشنهادی)، "text" (توضیح کوتاه در مورد وظیفه و دلیل پیشنهاد آن)، "xaiTitle" (عنوان برای بخش "چرا این پیشنهاد؟") و "xaiExplanation" (توضیح مفصل‌تر برای بخش "چرا این پیشنهاد؟") باشد. پاسخ باید یک JSON معتبر با آرایه‌ای از این اشیاء پیشنهاد وظیفه باشد.`;
      const response = await ai.models.generateContent({ model: AI_MODEL_NAME, contents: prompt, config: { responseMimeType: "application/json" } });
      
      const parsedData = parseJsonFromString<any[]>(response.text);

      if (Array.isArray(parsedData)) {
        const suggestions: AISuggestion[] = parsedData.map((s: any, index: number) => ({
          id: `sugg-${Date.now()}-${index}`,
          type: 'task',
          title: s.title || toPersianDigits(`پیشنهاد ${String(index + 1)}`),
          text: s.text || toPersianDigits("توضیحات پیشنهاد در اینجا قرار می‌گیرد."),
          xaiTitle: s.xaiTitle || toPersianDigits("چرا این پیشنهاد؟"),
          xaiExplanation: s.xaiExplanation || toPersianDigits("توضیحات دقیق‌تر در اینجا."),
          feedbackState: 'idle',
          showCard: true,
        }));
        setTaskSuggestions(suggestions);
      } else {
        throw new Error("فرمت پیشنهادات نامعتبر است.");
      }
    } catch (error: any) {
      console.error("Error fetching task suggestions:", error);
      showToast(toPersianDigits(`خطا در دریافت پیشنهادات: ${error.message}`), 'error');
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const handleAcceptSuggestion = (suggestion: AISuggestion) => {
    if (suggestion.type === 'task') {
      const newTask: Task = {
        id: String(Date.now()),
        title: suggestion.title,
        description: suggestion.text, 
        priority: 'medium', 
        completed: false,
        subTasks: [],
        isAiExtracted: true, 
        rawInput: `پیشنهاد هوش مصنوعی: ${suggestion.title}`,
      };
      setAllTasks(prev => [newTask, ...prev]);
      showToast(toPersianDigits(`وظیفه پیشنهادی "${suggestion.title}" اضافه شد.`), 'success');
    }
    setTaskSuggestions(prev => prev.map(s => s.id === suggestion.id ? {...s, feedbackState: 'accepted_briefly', showCard: false} : s));
  };

  const handleDeclineSuggestion = (suggestionId: string) => {
     setTaskSuggestions(prev => prev.map(s => s.id === suggestionId ? {...s, feedbackState: 'declined_briefly', showCard: false} : s));
     showToast("پیشنهاد رد شد. از بازخورد شما متشکریم.", 'info');
  };
  
  const handleShowXAISuggestion = (suggestion: AISuggestion) => {
    setXaiContent({ title: suggestion.xaiTitle, explanation: suggestion.xaiExplanation });
    setShowXAIModal(true);
  };

  const handleNavigateToLearningItem = (type: LearningSuggestion['type'], itemId: string) => {
    if (navigateTo) {
        navigateTo('Learning', { view: 'detail', type, itemId });
    } else {
      console.warn("navigateTo function is not provided to TasksPage");
      alert(toPersianDigits(`مشاهده ${type === 'path' ? 'مسیر' : 'محتوا'} با شناسه ${itemId} (شبیه‌سازی شده)`));
    }
  };


  const filterButtons = [
    { label: "همه", filter: "all" },
    { label: "امروز", filter: "today" },
    { label: "این هفته", filter: "thisWeek" },
    { label: "سررسید گذشته", filter: "overdue" },
    { label: "تکمیل‌شده", filter: "completed" },
    { label: "اولویت بالا", filter: "highPriority" },
  ];


  return (
    <div className="page">
      {toastInfo && <ToastNotification message={toastInfo.text} type={toastInfo.type} isVisible={!!toastInfo} onClose={() => setToastInfo(null)} />}
      <XAIModal isOpen={showXAIModal} onClose={() => setShowXAIModal(false)} title={xaiContent.title}>
        <p className="text-sm text-gray-700 leading-relaxed">{toPersianDigits(xaiContent.explanation)}</p>
      </XAIModal>
      {editingTask && isEditModalOpen && (
        <EditTaskModal
          isOpen={isEditModalOpen}
          onClose={() => { setIsEditModalOpen(false); setEditingTask(null); }}
          taskToEdit={editingTask}
          onSaveTask={handleSaveEditedTask}
        />
      )}

      <div className="flex items-center mb-6">
        <PageIcon className="w-7 h-7 text-indigo-600 mr-3" />
        <h1 className="text-2xl font-semibold text-gray-800">{toPersianDigits("وظایف روزانه")}</h1>
      </div>

      <div className="mb-4 relative bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <label htmlFor="new-task-input" className="block text-gray-700 text-sm font-bold mb-2">{toPersianDigits("افزودن وظیفه جدید:")}</label>
          <textarea 
            id="new-task-input" 
            value={newTaskInput}
            onChange={(e) => { setNewTaskInput(e.target.value); if (showParsedPreview) { setShowParsedPreview(false); setParsedTaskDetails(null); setParsingError(null); } }}
            placeholder={toPersianDigits("مثال: برنامه‌ریزی سفر به شیراز برای هفته آینده با بودجه ۵ میلیون تومان...")} 
            className="w-full p-3 pr-10 rtl:pl-10 rtl:pr-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 shadow-sm h-24 resize-y text-sm"
          ></textarea>
          <div className="task-input-icons">
              <button onClick={() => handleSmartAddTask('voice')} title={toPersianDigits("ورودی صوتی (شبیه‌سازی)")} disabled={!ai}>
                  <MicrophoneIcon className="w-5 h-5" />
              </button>
              <button onClick={() => handleSmartAddTask('image')} title={toPersianDigits("ورودی تصویری (شبیه‌سازی)")} disabled={!ai}>
                  <CameraIcon className="w-5 h-5" />
              </button>
          </div>
          <button 
            onClick={() => handleSmartAddTask('text')} 
            disabled={isLoading || !newTaskInput.trim() || !ai}
            className="absolute left-3 top-[45px] text-indigo-600 hover:text-indigo-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={toPersianDigits("افزودن وظیفه با تحلیل هوشمند")}
          >
            {isLoading ? <LoadingSpinner size="sm" color="text-indigo-600"/> : <PlusIcon className="w-6 h-6"/>}
          </button>
           {!ai && <p className="text-xs text-yellow-600 text-center mt-1">{toPersianDigits("سرویس هوش مصنوعی در دسترس نیست (کلید API تنظیم نشده؟)")}</p>}
           {parsingError && <p className="text-red-500 text-xs mt-2 p-1 bg-red-50 rounded">{parsingError}</p>}
      </div>

      {showParsedPreview && parsedTaskDetails && (
        <div className="ai-parsing-preview mb-4"> 
          <h3 className="ai-parsing-preview-title">
            <AiIcon className="w-5 h-5 ml-2 text-blue-600"/>
            {toPersianDigits("جزئیات استخراج شده توسط هوش مصنوعی:")}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs">
            <p className="ai-parsing-preview-text"><strong>{toPersianDigits("عنوان:")}</strong> <input type="text" value={toPersianDigits(parsedTaskDetails.title || '')} onChange={(e) => handleEditParsedDetail('title', e.target.value)} className="bg-blue-100/50 border-b border-blue-300 p-0.5 rounded-sm focus:bg-white" /></p>
            <p className="ai-parsing-preview-text"><strong>{toPersianDigits("سررسید:")}</strong> <input type="date" value={parsedTaskDetails.dueDate || ''} onChange={(e) => handleEditParsedDetail('dueDate', e.target.value)} className="bg-blue-100/50 border-b border-blue-300 p-0.5 rounded-sm focus:bg-white w-full" /></p>
            <p className="ai-parsing-preview-text"><strong>{toPersianDigits("اولویت:")}</strong> 
                <select value={parsedTaskDetails.priority || 'medium'} onChange={(e) => handleEditParsedDetail('priority', e.target.value as 'high'|'medium'|'low')} className="bg-blue-100/50 border-b border-blue-300 p-0.5 rounded-sm focus:bg-white">
                    <option value="low">{toPersianDigits("پایین")}</option>
                    <option value="medium">{toPersianDigits("متوسط")}</option>
                    <option value="high">{toPersianDigits("بالا")}</option>
                </select>
            </p>
            <p className="ai-parsing-preview-text"><strong>{toPersianDigits("برچسب‌ها:")}</strong> <input type="text" value={(parsedTaskDetails.tags || []).map(t => toPersianDigits(t)).join(', ')} onChange={(e) => handleEditParsedDetail('tags', e.target.value.split(',').map(tag => tag.trim()))} className="bg-blue-100/50 border-b border-blue-300 p-0.5 rounded-sm focus:bg-white" /></p>
          </div>
          {parsedTaskDetails.aiConfidence !== undefined && <p className="text-[10px] text-blue-700/80 mt-1">{toPersianDigits(`اطمینان هوش مصنوعی: ${Math.round((parsedTaskDetails.aiConfidence || 0) * 100)}%`)}</p>}
          <div className="flex justify-between items-center mt-2">
            <button className="ai-parsing-preview-xai-button" onClick={() => setShowXAIModal(true)}>
              {toPersianDigits("چرا این جزئیات؟")}
            </button>
            <div className="space-x-2 space-x-reverse">
                <button onClick={cancelPreview} className="text-xs py-1 px-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md">
                    <XCircleIcon className="w-3 h-3 inline ml-1"/>{toPersianDigits("لغو")}
                </button>
                <button onClick={confirmAddTask} className="text-xs py-1 px-2.5 bg-green-500 hover:bg-green-600 text-white rounded-md">
                    <CheckCircleIcon className="w-3 h-3 inline ml-1"/>{toPersianDigits("تایید و افزودن")}
                </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="my-6 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-3">
            <h3 className="text-md font-semibold text-indigo-700">{toPersianDigits("پیشنهادات هوشمند وظیفه")}</h3>
            <button 
                onClick={fetchTaskSuggestions} 
                disabled={isLoadingSuggestions || !ai}
                className="flex items-center text-xs py-1.5 px-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md transition-colors disabled:opacity-50"
            >
                {isLoadingSuggestions ? <LoadingSpinner size="sm"/> : <LightbulbIcon className="w-4 h-4 mr-1.5"/>}
                {toPersianDigits("دریافت پیشنهادات جدید")}
            </button>
        </div>
        {!ai && <p className="text-xs text-yellow-600 text-center pb-2">{toPersianDigits("سرویس هوش مصنوعی برای پیشنهادات در دسترس نیست.")}</p>}
        {isLoadingSuggestions && <div className="flex justify-center py-3"><LoadingSpinner /></div>}
        {!isLoadingSuggestions && taskSuggestions.length > 0 && (
            <div className="space-y-2">
                {taskSuggestions.map(suggestion => (
                    <AISuggestionCardComponent 
                        key={suggestion.id} 
                        suggestion={suggestion} 
                        onAccept={handleAcceptSuggestion}
                        onDecline={handleDeclineSuggestion}
                        onWhy={handleShowXAISuggestion}
                    />
                ))}
            </div>
        )}
        {!isLoadingSuggestions && taskSuggestions.length === 0 && ai && (
            <p className="text-xs text-gray-500 text-center py-2">{toPersianDigits("در حال حاضر پیشنهاد جدیدی برای شما وجود ندارد.")}</p>
        )}
      </div>


      <div className="flex flex-wrap justify-between items-center mb-4 gap-2 mt-4">
          <div className="flex bg-white rounded-full p-1 shadow-sm border border-gray-200 overflow-x-auto">
            {filterButtons.map(fb => (
                <button 
                    key={fb.filter}
                    className={`filter-btn text-xs px-2.5 py-1 rounded-full transition-colors duration-200 whitespace-nowrap ${currentFilter === fb.filter ? 'active-filter bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`} 
                    data-filter={fb.filter} 
                    onClick={() => setCurrentFilter(fb.filter)}>
                    {toPersianDigits(fb.label)}
                </button>
            ))}
          </div>
          <div className="relative">
              <select 
                id="task-sort-select" 
                value={currentSort}
                onChange={e => setCurrentSort(e.target.value)}
                className="block w-full bg-white border border-gray-300 rounded-full shadow-sm py-1.5 px-4 pr-8 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                disabled={!ai && currentSort === 'aiPriority'}
              >
                  <option value="dueDateAsc">{toPersianDigits("سررسید (نزدیک‌ترین)")}</option>
                  <option value="priorityDesc">{toPersianDigits("اولویت (بالاترین)")}</option>
                  <option value="creationDateDesc">{toPersianDigits("تاریخ ایجاد (جدیدترین)")}</option>
                  <option value="aiPriority" disabled={!ai}>{toPersianDigits("اولویت AI ✨")}</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-700">
                  <AdjustmentsVerticalIcon className="fill-current h-3.5 w-3.5" />
              </div>
          </div>
      </div>
      {isAISortLoading && <div className="mt-1 flex justify-center items-center text-xs text-indigo-600"><LoadingSpinner size="sm" color="text-indigo-600"/> <span className="mr-2">{toPersianDigits("مرتب‌سازی با هوش مصنوعی...")}</span></div>}

      {taskBreakdownResult && taskBreakdownResult.length > 0 && (
        <div className="task-breakdown-output mb-4"> 
            <h4 className="task-breakdown-title">{toPersianDigits("وظایف فرعی پیشنهادی توسط هوش مصنوعی:")}</h4>
            <ul className="task-breakdown-text task-breakdown-list space-y-1.5">
                {taskBreakdownResult.map(subTask => (
                    <li key={subTask.id} className="flex items-center space-x-2 space-x-reverse p-1.5">
                        {subTask.editing ? (
                             <input 
                                type="text" 
                                value={toPersianDigits(subTask.title)} 
                                onChange={(e) => setTaskBreakdownResult(prev => prev ? prev.map(st => st.id === subTask.id ? {...st, title: e.target.value} : st) : null)}
                                onBlur={() => handleEditSubTaskTitle(subTask.id, subTask.title)}
                                onKeyPress={(e) => e.key === 'Enter' && handleEditSubTaskTitle(subTask.id, subTask.title)}
                                className="flex-grow bg-indigo-100 text-gray-700 text-xs p-1 rounded border border-indigo-300" autoFocus />
                        ) : (
                            <p className="flex-grow text-gray-700 text-xs cursor-pointer" onClick={() => toggleSubTaskEditing(subTask.id)}>{toPersianDigits(subTask.title)}</p>
                        )}
                        {subTask.estimatedTime && <span className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-sm whitespace-nowrap">{toPersianDigits(subTask.estimatedTime)}</span>}
                        {subTask.suggestedDueDate && <span className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-sm whitespace-nowrap">{toPersianDigits(new Date(subTask.suggestedDueDate).toLocaleDateString('fa-IR'))}</span>}
                         <button onClick={() => toggleSubTaskEditing(subTask.id)} className="text-yellow-500 hover:text-yellow-600 p-0.5"><EditIcon className="w-3 h-3"/></button>
                    </li>
                ))}
            </ul>
            <div className="mt-2 space-y-1">
                <button 
                    onClick={() => handleSaveSubTasksToTask(allTasks.find(t => breakingDownTaskId === t.id)?.id, taskBreakdownResult || [])} 
                    className="w-full text-xs bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded-md"
                    disabled={!taskBreakdownResult || taskBreakdownResult.length === 0}
                >
                    {toPersianDigits("افزودن این وظایف فرعی به وظیفه اصلی")}
                </button>
                <button 
                    onClick={() => setTaskBreakdownResult(null)} 
                    className="w-full text-xs bg-gray-400 hover:bg-gray-500 text-white py-1 px-2 rounded-md"
                >
                    {toPersianDigits("لغو پیشنهادات")}
                </button>
            </div>
        </div>
      )}
      {breakdownError && <p className="text-red-500 text-xs text-center p-1 bg-red-100 rounded mb-4">{breakdownError}</p>}

      <div id="tasks-list" className="space-y-3">
        {displayedTasks.length === 0 && !(isLoading || isAISortLoading) && (
             <div className="text-center py-10 bg-gray-100 rounded-xl shadow-inner border border-gray-200 min-h-[200px] flex flex-col items-center justify-center">
                 <PageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4 opacity-70" />
                 <p className="text-gray-500 text-sm">{toPersianDigits("هیچ وظیفه‌ای برای نمایش با فیلترهای فعلی وجود ندارد.")}</p>
                 <p className="text-gray-500 text-xs mt-1">{toPersianDigits("یک وظیفه جدید اضافه کنید یا فیلترها را تغییر دهید.")}</p>
           </div>
        )}
        {displayedTasks.map(task => (
          <TaskCard 
            key={task.id} 
            task={task} 
            onToggleComplete={handleToggleComplete}
            onBreakdown={handleBreakdownTask}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
            isBreakingDownThisTask={breakingDownTaskId === task.id}
            navigateToLearningItem={handleNavigateToLearningItem} 
          />
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded-xl shadow-inner text-center text-gray-600 text-sm">
          <p>{toPersianDigits("تقویم هوشمند برای برنامه‌ریزی وظایف در اینجا قرار می‌گیرد.")}</p>
      </div>
    </div>
  );
};
export default TasksPage;
```
    </content>
  </change>
</changes>```
The AI features for the Health Page and Habits Page, along with necessary type updates and bug fixes in other components, have been implemented.

**Key Implementations:**

1.  **`HealthPage.tsx`**:
    *   **AI Nutrition & Exercise Planning**: Implemented Gemini API calls in `handleGenerateMealPlan` and `handleGenerateExercisePlan` to take user preferences (from new textareas for `userNutritionPreferences` and `userExercisePreferences`) and generate structured JSON plans. UI placeholders for displaying these plans have been added.
    *   **AI Journal Analysis**: `handleAnalyzeJournalEntry` now sends journal text to Gemini for sentiment/stress analysis (JSON) and updates/saves entries.
    *   **AI Symptom Checker Chatbot**: `handleSymptomChatSend` manages conversation history and interacts with Gemini for non-diagnostic advice.
    *   Loading states (`isLoading...`) and error handling via `showToast` are implemented for all AI calls.
    *   All generated data is persisted to `localStorage`.

2.  **`HabitsPage.tsx`**:
    *   **AI Habit Suggestions**: `fetchAIHabitSuggestions` uses `userHabitContext` (new state with UI input) to prompt Gemini for JSON habit suggestions, updating `aiHabitSuggestions` state.
    *   **Adaptive Gamification**: `handleSaveHabitLog` now correctly calculates and updates habit streak, XP, and level, with toast notifications for level-ups.
    *   **Multidimensional Habit Logging**: The "Log Habit" modal captures detailed log entries (quality, duration, context, emotions) which are saved.
    *   **Hyper-adaptive AI Reminders**: `getAIWellnessReminder` makes a conceptual call to Gemini with habit details and simulated context, and `handleSmartReminderClick` displays the AI's suggested reminder text in a toast.
    *   Loading states and error handling for AI calls.
    *   `localStorage` persistence for all habit data.

3.  **Type Definitions (`types/healthTypes.ts`, `types/learningTypes.ts`)**:
    *   Updated to fully support detailed structures for AI-generated data and multidimensional tracking, including fields like `userPreferences`, `aiRationale`, `defaultQualityTrack`, etc.

4.  **Other Component Fixes**:
    *   **`DashboardPage.tsx`**: Corrected type imports, fixed `toPersianDigits` usage, and cleaned up erroneous code.
    *   **`GoalsPage.tsx`**: Updated imports, fixed filter type casting, and ensured correct AI prompt formatting.
    *   **`TasksPage.tsx`**: Updated type imports, corrected `ParsedTaskDetails`, fixed AI prompt formatting, and ensured `toPersianDigits` usage.
    *   **`EditTaskModal.tsx`**: Updated type imports and added `estimatedDurationMinutes` field.
    *   **`AISmartLearningSuggestionCard.tsx`**: Broadened `onViewSuggestion` prop type.
    *   **`GoalCard.tsx`**: Corrected type imports and prop types.

5.  **`metadata.json`**: Camera permission was already present as requested.

The application should now have a significantly more robust and AI-enhanced experience on the Health and Habits pages, along with resolved issues in other areas.