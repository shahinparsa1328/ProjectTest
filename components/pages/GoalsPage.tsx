
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { toPersianDigits, parseJsonFromString } from '../../utils';
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
} from '../shared/AppIcons';
import AddGoalModal, { AddGoalModalProps as AddGoalModalActualProps } from './goals/AddGoalModal'; 
import GoalCard from './goals/GoalCard'; 
import LoadingSpinner from '../shared/LoadingSpinner';
import ToastNotification from '../shared/ToastNotification';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { LearningPath, LearningContent, LearningSuggestion, Goal, GoalActionPlanTask } from '../../types/learningTypes'; 
import { PageName } from '../../App';
import AISmartLearningSuggestionCard from '../learning/AISmartLearningSuggestionCard';
import CollapsibleSection from '../shared/CollapsibleSection';


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
    setToast({ id: Date.now(), message, type });
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
        showToast(toPersianDigits("خطا در بارگذاری اهداف از حافظه محلی."), "error");
    }
    setIsLoading(false);
  }, [showToast]);

  // Save goals to localStorage whenever they change
  useEffect(() => {
    try {
        localStorage.setItem(GOALS_LOCAL_STORAGE_KEY, JSON.stringify(goals));
    } catch (error) {
        console.error("Failed to save goals to localStorage:", error);
        showToast(toPersianDigits("خطا در ذخیره اهداف در حافظه محلی."), "error");
    }
  }, [goals, showToast]);


  const handleSaveGoal = (goalData: Omit<Goal, 'id' | 'progress' | 'status'>) => {
    if (editingGoal) {
      setGoals(goals.map(g => g.id === editingGoal.id ? { ...editingGoal, ...goalData, progress: g.progress, status: g.status } : g));
      showToast(toPersianDigits("هدف با موفقیت ویرایش شد."), "success");
    } else {
      const newGoal: Goal = {
        ...goalData,
        id: String(Date.now()),
        progress: 0,
        status: 'active', 
      };
      setGoals(prevGoals => [newGoal, ...prevGoals]);
      showToast(toPersianDigits("هدف جدید با موفقیت اضافه شد."), "success");
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
      showToast(toPersianDigits("هدف حذف شد."), "info");
    }
  };

  const handleToggleStatus = (goalId: string, newStatus: Goal['status']) => {
    setGoals(goals.map(g => g.id === goalId ? { ...g, status: newStatus, progress: newStatus === 'completed' ? 100 : g.progress } : g));
    if (newStatus === 'completed') {
      showToast(toPersianDigits("تبریک! هدف شما تکمیل شد."), "success");
    }
  };
  
  const handleUpdateProgress = (goalId: string, newProgress: number) => {
     setGoals(goals.map(g => g.id === goalId ? { ...g, progress: newProgress, status: newProgress === 100 ? 'completed' : g.status } : g));
  };

  const handleNavigateToLearningItem = (type: 'path' | 'content', itemId: string) => {
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
            <p className="font-semibold text-yellow-700 text-lg">{toPersianDigits(String(averageProgress))}%</p>
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
            <select id="filterStatus" value={filterStatus} onChange={e => setFilterStatus(e.target.value as any)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white">
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
  </change>
  <change>
    <file>components/pages/tasks/EditTaskModal.tsx</file>
    <description>Update Task type import path. Add estimatedDurationMinutes field to the form.</description>
    <content><![CDATA[
import React, { useState, useEffect } from 'react';
import { toPersianDigits } from '../../../utils';
import { XMarkIcon, TrashIcon } from '../../shared/AppIcons';
import { Task } from '../../../types/learningTypes'; // Updated import path

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
  </change>
  <change>
    <file>types/learningTypes.ts</file>
    <description>Update Task type to use relatedGoalId instead of relatedGoal. Ensure GoalActionPlanTask also has id. Add `estimatedDurationMinutes` to Task and GoalActionPlanTask.</description>
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
}

export type Quiz = QuizQuestion[];


export interface LearningModule {
  id: string;
  title: string;
  description: string;
  estimatedTime?: string;
  contentIds: string[];
  progress: number; 
  completed: boolean;
  quiz?: Quiz;
  exerciseId?: string;
  isAISuggested?: boolean;
  isSkippable?: boolean;
  aiSuggestionRationale?: string;
  points?: number; 
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
  overallProgress: number;
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
  quiz?: Quiz;
  aiRationale?: string;
  contentKeyForReview?: string;
  isUGC?: boolean; 
}

export interface Badge {
  id: string;
  name: string;
  iconUrl?: string | React.ReactElement<{className?: string}>; 
  description: string;
  earnedDate?: string; // ISO string if earned
  condition?: string; // Condition to earn the badge (for unearned badges)
}

export interface Skill {
  id: string;
  name: string;
  proficiency: 'learning' | 'acquired' | 'suggested_ai';
  categoryName?: string; 
  relatedPathIds?: string[];
}

// --- Phase 3.3: PeerReview type ---
export interface PeerReview {
  id: string;
  exerciseId: string; 
  reviewerId: string; 
  revieweeId: string; 
  criteriaRatings: { criterion: string; rating: number; comment?: string }[]; 
  overallFeedback: string;
  isAnonymous: boolean;
  submissionDate: string; 
  feedbackQualityRating?: number; 
}

export interface PracticalExercise {
  id: string;
  title: string;
  description: string;
  submissionType: 'text' | 'file'; 
  skillToPractice: string; 
  aiFeedbackCriteria?: string[]; 
  submissionText?: string; 
  aiFeedback?: string; 
  peerReviewsRequested?: boolean;
  peerReviewsReceived?: PeerReview[];
}

export interface JournalEntry {
  id: string;
  date: string; 
  title?: string;
  text: string;
  tags?: string[];
  aiInsight?: string; 
}

export interface WeeklyChallenge {
  id: string;
  title: string;
  description: string;
  skillApplied: string;
  dueDate: string; 
  rewardPoints?: number;
  status: 'active' | 'completed' | 'expired';
}

export interface AILearningBuddyMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: number; 
  quickReplies?: { text: string; payload: string }[];
}

// --- Phase 2.3 Types ---
export interface UserProgress {
  points: number;
  level: 'Novice' | 'Explorer' | 'Skilled' | 'Master' | 'Legend'; 
  levelNamePersian: string;
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
}

export interface StudyGroup {
  id: string;
  name: string;
  topic: string;
  membersCount: number;
  isActive: boolean;
  thumbnailUrl?: string;
  description?: string;
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
}

// --- Phase 3.1 Types (Shared between modules) ---
export interface LearningSuggestion {
  id: string;
  type: 'path' | 'content'; 
  itemId: string; 
  title: string; 
  description?: string; 
  sourceModule: 'Goals' | 'Tasks' | 'Health' | 'Finance' | 'LifeProjects' | 'Learning' | 'SmartHome'; 
  triggerContext: string; 
}

// --- Phase 4: Goal, Task, LifeProject Updates ---
export interface KeyResult { // For OKR
  id: string;
  text: string;
  progress: number; // 0-100 or based on target/current
  targetValue?: number;
  currentValue?: number;
  unit?: string; // e.g., "USD", "Tasks", "%"
}

export interface GoalActionPlanTask {
  id: string; 
  title: string;
  dueDate?: string; // ISO string
  description?: string;
  completed: boolean;
  estimatedDurationMinutes?: number;
}

export interface Goal {
  id: string;
  title: string;
  description?: string;
  dueDate?: string; // ISO string
  category?: string;
  progress: number; // 0-100
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
  dueDate?: string; // ISO string
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
  dueDate?: string; // ISO string
  assignedTo?: string; 
  order?: number; 
  originalTaskId?: string; 
}

export interface LifeProject {
  id: string;
  title: string;
  description: string;
  relatedGoalIds: string[]; 
  requiredSkillIds?: string[]; 
  learningPathSuggestions?: LearningSuggestion[];
  overallProgress: number; // 0-100
  status: 'planning' | 'active' | 'completed' | 'on_hold';
  coverImageUrl?: string;
  startDate?: string; // ISO Date
  endDate?: string;   // ISO Date
  aiGeneratedInsights?: string[]; 
}


// --- Phase 3.2 Types (Learning Page specific) ---
export interface AI360FeedbackItem {
  id: string;
  date: string; 
  feedbackText: string;
  relatedContext: string; 
  type: 'positive' | 'constructive' | 'observation';
}

export interface ConversationScenario {
  id: string;
  title: string;
  description: string;
  aiRoleDescription: string; 
  initialPrompt: string; 
  userObjective: string; 
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

export type BrainstormingTechnique = 'SCAMPER' | 'SixThinkingHats' | 'MindMapping' | 'GeneralBrainstorm';

export interface CreativeIdea {
  id: string;
  text: string;
  color?: string; 
  position?: { x: number; y: number }; 
  parentId?: string | null; 
  techniqueUsed?: BrainstormingTechnique;
  isAIReply?: boolean; 
}

// --- Phase 3.3 Types (Learning Page specific) ---
export interface MentorshipProfile {
  userId: string; 
  userName: string;
  skillsToMentor: string[]; 
  experienceLevel: string; 
  availability: string; 
  bio?: string;
  profileImageUrl?: string;
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
  type: 'path' | 'article' | 'resource_link'; 
  title: string;
  description: string;
  contentData: any; 
  tags: string[];
  submissionDate: string; 
  status: 'pending_approval' | 'approved' | 'rejected'; 
  averageRating?: number;
  reviewCount?: number;
}

// --- Phase 3.4 Types (Learning Page specific) ---
export interface PredictiveSkillSuggestion {
  id: string;
  skillName: string;
  rationale: string; 
  relevanceToUser?: string; 
  learningPathId?: string; 
  marketDemandIndicator?: 'high' | 'medium' | 'low'; 
}

export interface LearningReportConfig {
  period: 'monthly' | 'quarterly' | 'annually';
  includeSkillSummary: boolean;
  includeGoalImpactAnalysis: boolean;
  includeFutureSuggestions: boolean;
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
  // More complex settings can be added later, e.g.:
  // preferredWindows: { start: string; end: string; days: DayOfWeek[] }[]; // e.g., "07:00"-"09:00" on weekdays
  // contextualTriggers: ('after_waking_up' | 'before_work' | 'after_meal' | 'location_change_home')[];
}

export interface Habit {
  id: string;
  title: string;
  description?: string;
  frequency: 'daily' | 'weekly' | 'custom'; // 'custom' could mean specific days of week
  customFrequencyDetails?: { // Used if frequency is 'custom' or 'weekly'
    daysOfWeek?: ('Sat' | 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri')[];
    timesPerWeek?: number; // For "X times a week"
  };
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'any' | string; // string for specific time like "08:00"
  
  // Multidimensional Tracking
  log: HabitLogEntry[];
  defaultQualityTrack?: boolean; // User wants to track quality for this habit
  defaultDurationTrack?: boolean; // User wants to track duration
  defaultContextTrack?: boolean;
  defaultEmotionTrack?: boolean;

  // Gamification
  streak: number;
  level?: number;
  xp?: number;
  rewardPointsEarned?: number;
  badgesEarned?: string[]; // IDs of badges

  // AI & Reminders
  relatedGoalId?: string;
  contextTrigger?: string; // Original simpler trigger
  atomicSuggestion?: string; // Original simpler suggestion
  isAISuggested?: boolean;
  aiSuggestionId?: string; // If it came from a specific AI suggestion
  aiRationale?: string;
  reminderSettings?: AdaptiveReminderSettings;
  nextSmartReminder?: string; // User-friendly display, e.g., "فردا صبح زود"
  lastCompletedDate?: string; // ISO date string
}

// For AI suggestions
export interface HabitSuggestionDetails {
  title: string;
  description: string;
  aiRationale: string;
  frequency: 'daily' | 'weekly' | 'custom' | string; // AI can suggest a general frequency
  timeOfDay?: Habit['timeOfDay'];
  potentialBenefits?: string[];
}
```
  </change>
  <change>
    <file>components/pages/HabitsPage.tsx</file>
    <description>Implement advanced habit engineering features: AI habit suggestions, adaptive gamification, multidimensional tracking (quality, duration, context, emotions via logging modal), and conceptual hyper-adaptive AI reminders. Add/Edit habit form integrated within page state. Add localStorage persistence.</description>
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
const HABITS_LOCAL_STORAGE_KEY = 'lifeOrchestrator_habitsData_v2';

interface AddHabitModalState {
  isOpen: boolean;
  editingHabit: Habit | null;
  title: string;
  description: string;
  frequency: Habit['frequency'];
  daysOfWeek: string[]; // For weekly/custom
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

  const [toast, setToast] = useState<{id: number, text: string, type: 'success'|'error'|'info'} | null>(null);
  
  const ai = process.env.API_KEY ? new GoogleGenAI({ apiKey: process.env.API_KEY }) : null;

  const showToast = useCallback((text: string, type: 'success'|'error'|'info' = 'info') => {
    setToast({ id: Date.now(), text, type });
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Load habits from localStorage
  useEffect(() => {
    try {
        const storedHabits = localStorage.getItem(HABITS_LOCAL_STORAGE_KEY);
        if (storedHabits) {
            setHabits(JSON.parse(storedHabits));
        } else {
          setHabits([ // Default mock data
            { id: 'habit1', title: 'نوشیدن ۸ لیوان آب', frequency: 'daily', timeOfDay: 'any', streak: 5, log: [], level: 2, xp: 150 },
            { id: 'habit2', title: '۳۰ دقیقه مطالعه قبل از خواب', frequency: 'daily', timeOfDay: 'evening', streak: 12, log: [], level: 3, xp: 320 },
          ]);
        }
    } catch (error) {
        console.error("Error loading habits from localStorage:", error);
        showToast("خطا در بارگذاری عادات از حافظه محلی.", "error");
    }
  }, [showToast]);

  // Save habits to localStorage
  useEffect(() => {
    try {
        localStorage.setItem(HABITS_LOCAL_STORAGE_KEY, JSON.stringify(habits));
    } catch (error) {
        console.error("Error saving habits to localStorage:", error);
        showToast("خطا در ذخیره عادات در حافظه محلی.", "error");
    }
  }, [habits, showToast]);

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
      title: title.trim(), description: description.trim(), frequency,
      customFrequencyDetails: (frequency === 'weekly' || frequency === 'custom') ? { daysOfWeek } : undefined,
      timeOfDay, contextTrigger: contextTrigger.trim(), relatedGoalId: relatedGoalId.trim()
    };

    if (editingHabit) {
      setHabits(prev => prev.map(h => h.id === editingHabit.id ? { ...editingHabit, ...habitData } : h));
      showToast("عادت با موفقیت ویرایش شد.", "success");
    } else {
      const newHabit: Habit = {
        id: `habit-${Date.now()}`, ...habitData, streak: 0, log: [], level: 1, xp: 0,
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
    // Check if already logged for today
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
      emotionBefore: emotionBefore === 'other' ? undefined : emotionBefore,
      emotionAfter: emotionAfter === 'other' ? undefined : emotionAfter,
      notes: notes.trim() || undefined,
    };

    setHabits(prevHabits => prevHabits.map(h => {
      if (h.id === habitToLog.id) {
        const updatedLog = h.log.filter(l => l.date !== logDate); // Remove old log for this date if any
        updatedLog.push(newLogEntry);
        updatedLog.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Keep sorted

        let newStreak = h.streak;
        let newXp = h.xp || 0;
        let newLevel = h.level || 1;

        if(completed) {
            newStreak = (h.lastCompletedDate && new Date(logDate).getTime() - new Date(h.lastCompletedDate).getTime() <= 2 * 86400000) ? h.streak + 1 : 1; // Reset if more than 1 day gap
            newXp += 10 + (newStreak * 2); // Base XP + streak bonus
            if (quality === 'excellent') newXp += 5;
            if (quality === 'good') newXp += 2;
            // Leveling logic
            if (newXp >= (newLevel * 100)) { // Example: 100 XP per level
                newLevel += 1;
                showToast(toPersianDigits(`عادت "${h.title}" به سطح ${newLevel} ارتقا یافت!`), 'success');
            }
        } else {
            // Potentially penalize for missing, or just don't update streak/XP
            // For now, if uncompleting, reset streak if it was for today.
            if (h.lastCompletedDate === logDate) newStreak = Math.max(0, h.streak -1);
        }
        
        return { ...h, log: updatedLog, streak: newStreak, xp: newXp, level: newLevel, lastCompletedDate: completed ? logDate : h.lastCompletedDate };
      }
      return h;
    }));
    setLogHabitModal(defaultLogHabitModalState);
    showToast(toPersianDigits("گزارش عادت ثبت شد."), "success");
  };

  const fetchAIHabitSuggestions = async () => {
    if (!ai) {
      setAiSuggestionError(toPersianDigits("سرویس هوش مصنوعی در دسترس نیست."));
      return;
    }
    setIsLoadingAiSuggestions(true);
    setAiSuggestionError(null);
    try {
      // Simulate getting user goals/interests for a more personalized prompt
      const userContextPrompt = "کاربر به بهبود بهره‌وری و کاهش استرس علاقه‌مند است.";
      const prompt = `بر اساس زمینه زیر: "${userContextPrompt}", لطفاً ۲ تا ۳ پیشنهاد عادت جدید به زبان فارسی ارائه بده. هر پیشنهاد باید شامل "title", "description" (توضیح کوتاه چرا این عادت مفید است), "aiRationale" (منطق دقیق‌تر پیشنهاد) و "frequency" (مانند 'daily', '3 times a week') باشد. پاسخ را در قالب JSON ارائه بده.`;
      
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: AI_MODEL_NAME,
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });
      const parsedData = parseJsonFromString<HabitSuggestionDetails[]>(response.text);
      if (parsedData && Array.isArray(parsedData)) {
        setAiHabitSuggestions(parsedData);
      } else {
        throw new Error("Failed to parse AI suggestions.");
      }
    } catch (e: any) {
      setAiSuggestionError(toPersianDigits(`خطا در دریافت پیشنهادات: ${e.message || "لطفا دوباره تلاش کنید."}`));
    } finally {
      setIsLoadingAiSuggestions(false);
    }
  };
  
  const handleAcceptAISuggestion = (suggestion: HabitSuggestionDetails) => {
    const newHabit: Habit = {
        id: `habit-ai-${Date.now()}`,
        title: suggestion.title,
        description: suggestion.description,
        frequency: suggestion.frequency.includes("daily") ? 'daily' : suggestion.frequency.includes("weekly") ? 'weekly' : 'custom',
        customFrequencyDetails: (suggestion.frequency.includes("weekly") || suggestion.frequency.includes("custom")) ? { daysOfWeek: [], timesPerWeek: parseInt(suggestion.frequency) || undefined } : undefined,
        timeOfDay: suggestion.timeOfDay || 'any',
        streak: 0,
        log: [],
        level: 1,
        xp: 0,
        isAISuggested: true,
        aiRationale: suggestion.aiRationale,
    };
    setHabits(prev => [newHabit, ...prev]);
    setAiHabitSuggestions(prev => prev.filter(s => s.title !== suggestion.title)); // Remove accepted suggestion
    showToast(toPersianDigits(`عادت "${suggestion.title}" اضافه شد.`), "success");
  };
  
  const getAIWellnessReminder = async (habit: Habit): Promise<string | null> => {
    if (!ai) return null;
    // Simulate current context (could be time, location, calendar events)
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
      
      {/* Add/Edit Habit Modal */}
      {addHabitModal.isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4" onClick={() => setAddHabitModal(defaultAddHabitModalState)}>
          <div className="bg-white p-5 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200 flex-shrink-0">
              <h3 className="text-lg font-semibold text-gray-800">{toPersianDigits(addHabitModal.editingHabit ? "ویرایش عادت" : "افزودن عادت جدید")}</h3>
              <button onClick={() => setAddHabitModal(defaultAddHabitModalState)} className="text-gray-500 hover:text-gray-700"><XMarkIcon className="w-6 h-6" /></button>
            </div>
            <form onSubmit={(e) => {e.preventDefault(); handleSaveHabit();}} className="space-y-3 flex-grow overflow-y-auto pr-1 modal-scroll-content text-sm">
              <div><label htmlFor="habitTitle" className="block text-xs font-medium text-gray-700 mb-1">عنوان عادت*:</label><input type="text" id="habitTitle" value={addHabitModal.title} onChange={e => setAddHabitModal(s => ({...s, title: e.target.value}))} required className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" /></div>
              <div><label htmlFor="habitDesc" className="block text-xs font-medium text-gray-700 mb-1">توضیحات (اختیاری):</label><textarea id="habitDesc" value={addHabitModal.description} onChange={e => setAddHabitModal(s => ({...s, description: e.target.value}))} rows={2} className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 resize-y" /></div>
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
              <div><label htmlFor="habitContext" className="block text-xs font-medium text-gray-700 mb-1">محرک زمینه‌ای (اختیاری):</label><input type="text" id="habitContext" value={addHabitModal.contextTrigger} onChange={e => setAddHabitModal(s => ({...s, contextTrigger: e.target.value}))} className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder={toPersianDigits("مثال: بعد از صبحانه")}/></div>
              <div><label htmlFor="habitGoal" className="block text-xs font-medium text-gray-700 mb-1">هدف مرتبط (اختیاری):</label><input type="text" id="habitGoal" value={addHabitModal.relatedGoalId} onChange={e => setAddHabitModal(s => ({...s, relatedGoalId: e.target.value}))} className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder={toPersianDigits("شناسه یا عنوان هدف")}/></div>
              <div className="flex justify-end space-x-2 space-x-reverse pt-3 border-t border-gray-100 flex-shrink-0"><button type="button" onClick={() => setAddHabitModal(defaultAddHabitModalState)} className="py-2 px-4 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md text-xs">انصراف</button><button type="submit" className="py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-xs">ذخیره عادت</button></div>
            </form>
          </div>
        </div>
      )}

      {/* Log Habit Modal */}
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
                      <div><label className="block text-xs font-medium text-gray-700 mb-1">زمینه انجام (اختیاری):</label><input type="text" value={logHabitModal.context} onChange={e => setLogHabitModal(s=>({...s, context: e.target.value}))} className="w-full p-2 border border-gray-300 rounded-md text-xs" placeholder="مثال: در خانه، بعد از کار"/></div>
                      <div className="grid grid-cols-2 gap-2">
                          <div><label className="block text-xs font-medium text-gray-700 mb-1">احساس قبل از انجام:</label><select value={logHabitModal.emotionBefore} onChange={e => setLogHabitModal(s=>({...s, emotionBefore: e.target.value as HabitEmotion}))} className="w-full p-2 border bg-white border-gray-300 rounded-md text-xs">{emotionOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.emoji} {toPersianDigits(opt.label)}</option>)}</select></div>
                          <div><label className="block text-xs font-medium text-gray-700 mb-1">احساس بعد از انجام:</label><select value={logHabitModal.emotionAfter} onChange={e => setLogHabitModal(s=>({...s, emotionAfter: e.target.value as HabitEmotion}))} className="w-full p-2 border bg-white border-gray-300 rounded-md text-xs">{emotionOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.emoji} {toPersianDigits(opt.label)}</option>)}</select></div>
                      </div>
                      <div><label className="block text-xs font-medium text-gray-700 mb-1">یادداشت (اختیاری):</label><textarea value={logHabitModal.notes} onChange={e => setLogHabitModal(s=>({...s, notes: e.target.value}))} rows={2} className="w-full p-2 border border-gray-300 rounded-md resize-y text-xs" /></div>
                      <div className="flex justify-end space-x-2 space-x-reverse pt-3 border-t border-gray-100 flex-shrink-0"><button type="button" onClick={() => setLogHabitModal(defaultLogHabitModalState)} className="py-2 px-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md text-xs">انصراف</button><button type="submit" className="py-2 px-3 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-xs">ثبت گزارش</button></div>
                  </form>
              </div>
          </div>
      )}

      {/* Main Page Content */}
      <div className="flex items-center mb-6">
        <PageIcon className="w-7 h-7 text-purple-600 mr-3 rtl:ml-3 rtl:mr-0" />
        <h1 className="text-2xl font-semibold text-gray-800">{toPersianDigits("مهندسی عادت")}</h1>
      </div>

      <CollapsibleSection title="پیشنهادات هوشمند عادت از AI" icon={<LightbulbIcon className="text-yellow-500"/>} isOpen={true} className="mb-6">
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
                     <button onClick={() => handleSmartReminderClick(habit)} className="flex-1 text-xs bg-sky-500 hover:bg-sky-600 text-white py-1.5 px-3 rounded-md flex items-center justify-center">
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