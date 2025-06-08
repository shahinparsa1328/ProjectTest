
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
    ChevronDownIcon, // Added for collapsibles
    ChevronUpIcon,   // Added for collapsibles
    AcademicCapIcon, // For learning suggestions
} from '../../shared/AppIcons';
import { Goal } from '../GoalsPage';
import AISmartLearningSuggestionCard from '../../learning/AISmartLearningSuggestionCard';
import { LearningSuggestion } from '../../../types/learningTypes';
import { PageName } from '../../../App';

interface GoalCardProps {
  goal: Goal & { learningSuggestions?: LearningSuggestion[] }; // Add learningSuggestions to goal type here
  onEdit: (goal: Goal) => void;
  onDelete: (goalId: string) => void;
  onToggleStatus: (goalId: string, newStatus: 'active' | 'paused' | 'completed') => void;
  onUpdateProgress?: (goalId: string, newProgress: number) => void;
  navigateToLearningItem?: (type: 'path' | 'content', itemId: string) => void; // For navigating to learning page
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
            <span>{toPersianDigits(`${goal.progress}%`)}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 relative overflow-hidden">
            <div
              className={`h-2.5 rounded-full transition-all duration-500 ease-out ${progressColorClass()}`}
              style={{ width: `${goal.progress}%` }}
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

      {/* Required Skills Section */}
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
                  // onDismissSuggestion can be implemented if needed
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