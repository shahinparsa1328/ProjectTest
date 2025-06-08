
import React, { useState } from 'react'; // Added useState
import { LifeProject, LearningSuggestion, LearningPath, LearningContent } from '../../../types/learningTypes';
import { toPersianDigits } from '../../../utils';
import { RocketLaunchIcon, AcademicCapIcon, ListIcon, ChevronRightIcon, CheckCircleIcon, BookIcon } from '../../shared/AppIcons';
import AISmartLearningSuggestionCard from '../../learning/AISmartLearningSuggestionCard';
import { PageName } from '../../../App';
import CollapsibleSection from '../../shared/CollapsibleSection';

interface LifeProjectDetailViewProps {
  project: LifeProject;
  learningPaths: LearningPath[]; 
  learningContent: LearningContent[];
  onBack: () => void;
  navigateTo: (page: PageName | string, params?: any) => void;
}

const LifeProjectDetailView: React.FC<LifeProjectDetailViewProps> = ({ project, learningPaths, learningContent, onBack, navigateTo }) => {
  const progressColor = project.overallProgress >= 75 ? 'bg-green-500' : project.overallProgress >= 40 ? 'bg-sky-500' : 'bg-yellow-500';
  
  const [isTasksOpen, setIsTasksOpen] = useState(true);
  const [isLearningOpen, setIsLearningOpen] = useState(true);

  const handleViewLearningItem = (type: 'path' | 'content', itemId: string) => {
    navigateTo('Learning', { view: 'detail', type, itemId });
  };
  
  const enhancedSuggestions: LearningSuggestion[] = project.learningPathSuggestions?.map(sugg => {
      let itemTitle = sugg.title;
      let itemDescription = sugg.description;
      if (sugg.type === 'path') {
          const path = learningPaths.find(lp => lp.id === sugg.itemId);
          if (path) {
            itemTitle = path.title;
            itemDescription = path.description;
          }
      } else {
          const content = learningContent.find(lc => lc.id === sugg.itemId);
          if (content) {
            itemTitle = content.title;
            itemDescription = content.description;
          }
      }
      return { ...sugg, title: itemTitle, description: itemDescription };
  }) || [];

  return (
    <div className="page pb-8"> {/* Added padding-bottom */}
      <button onClick={onBack} className="mb-4 text-sm text-indigo-600 hover:underline flex items-center">
        <ChevronRightIcon className="w-4 h-4 ml-1 transform scale-x-[-1]" />
        {toPersianDigits("بازگشت به لیست پروژه‌ها")}
      </button>

      <header className="mb-6 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
          <div className="flex-shrink-0 w-24 h-24 bg-indigo-100 rounded-lg flex items-center justify-center">
            {project.coverImageUrl ? (
              <img src={project.coverImageUrl} alt={toPersianDigits(project.title)} className="w-full h-full object-cover rounded-lg" />
            ) : (
              <RocketLaunchIcon className="w-12 h-12 text-indigo-500" />
            )}
          </div>
          <div className="flex-grow">
            <h1 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-1">{toPersianDigits(project.title)}</h1>
            <p className="text-sm text-gray-600 leading-relaxed">{toPersianDigits(project.description)}</p>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3.5 mb-1.5">
          <div
            className={`h-3.5 rounded-full ${progressColor} transition-all duration-500 ease-out`}
            style={{ width: `${project.overallProgress}%` }}
            role="progressbar"
            aria-valuenow={project.overallProgress}
            aria-valuemin={0}
            aria-valuemax={100}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mb-2 text-center font-semibold">
          {toPersianDigits(`پیشرفت کلی: ${project.overallProgress}%`)}
        </p>
         <p className="text-xs text-gray-500 text-center">{toPersianDigits(`وضعیت: ${project.status === 'active' ? 'فعال' : project.status === 'completed' ? 'تکمیل شده' : project.status === 'planning' ? 'در حال برنامه‌ریزی' : 'متوقف شده'}`)}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            {/* Project Tasks */}
            <CollapsibleSection 
                title={toPersianDigits("وظایف پروژه")} 
                icon={<ListIcon className="w-5 h-5 text-sky-500" />} 
                isOpen={isTasksOpen}
                onToggle={() => setIsTasksOpen(!isTasksOpen)}
                className="bg-white p-4 rounded-xl shadow-md border border-gray-200"
                titleClassName="text-lg font-semibold text-gray-700"
            >
            {project.tasks && project.tasks.length > 0 ? (
                <ul className="space-y-2.5 mt-2">
                {project.tasks.map(task => (
                    <li key={task.id} className="p-3 bg-gray-50 rounded-md border border-gray-200 text-sm hover:border-sky-300 transition-colors">
                    <div className="flex justify-between items-center">
                        <span className={`font-medium ${task.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                        {toPersianDigits(task.title)}
                        </span>
                        <span className={`px-2 py-0.5 text-[10px] rounded-full ${
                            task.status === 'completed' ? 'bg-green-100 text-green-700' :
                            task.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                            'bg-yellow-100 text-yellow-700'
                        }`}>
                            {toPersianDigits(task.status === 'completed' ? 'تکمیل شده' : task.status === 'in_progress' ? 'در حال انجام' : 'در انتظار')}
                        </span>
                    </div>
                    {task.dueDate && <p className="text-xs text-gray-500 mt-1">{toPersianDigits(`سررسید: ${new Date(task.dueDate).toLocaleDateString('fa-IR')}`)}</p>}
                    </li>
                ))}
                </ul>
            ) : (
                <p className="text-sm text-gray-500 mt-2">{toPersianDigits("هنوز وظیفه‌ای برای این پروژه تعریف نشده است.")}</p>
            )}
            <button 
                onClick={() => navigateTo('Tasks', { filterByProjectId: project.id, projectName: project.title })}
                className="mt-4 text-sm bg-sky-500 hover:bg-sky-600 text-white py-2 px-4 rounded-md w-full sm:w-auto"
            >
                {toPersianDigits("مشاهده و مدیریت وظایف در ماژول وظایف")}
            </button>
            </CollapsibleSection>
        </div>
        
        {/* Sidebar for Skills & Learning */}
        <div className="lg:col-span-1 space-y-6">
             <CollapsibleSection 
                title={toPersianDigits("یادگیری و مهارت‌ها")} 
                icon={<AcademicCapIcon className="w-5 h-5 text-purple-500" />} 
                isOpen={isLearningOpen}
                onToggle={() => setIsLearningOpen(!isLearningOpen)}
                className="bg-white p-4 rounded-xl shadow-md border border-gray-200"
                titleClassName="text-lg font-semibold text-gray-700"
            >
            {project.requiredSkillIds && project.requiredSkillIds.length > 0 && (
                <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">{toPersianDigits("مهارت‌های کلیدی مورد نیاز:")}</h3>
                <div className="flex flex-wrap gap-1.5">
                    {project.requiredSkillIds.map(skillId => (
                    <span key={skillId} className="px-2.5 py-1 text-xs bg-purple-100 text-purple-700 rounded-full font-medium">
                        {toPersianDigits(skillId.replace('skill_', '').replace(/_/g, ' '))}
                    </span>
                    ))}
                </div>
                </div>
            )}
            {enhancedSuggestions.length > 0 ? (
                <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">{toPersianDigits("مسیرها/محتوای پیشنهادی AI:")}</h3>
                {enhancedSuggestions.map(suggestion => (
                    <AISmartLearningSuggestionCard 
                    key={suggestion.id} 
                    suggestion={suggestion}
                    onViewSuggestion={handleViewLearningItem} 
                    />
                ))}
                </div>
            ) : (
                <p className="text-sm text-gray-500">{toPersianDigits("در حال حاضر پیشنهاد یادگیری خاصی برای این پروژه وجود ندارد.")}</p>
            )}
            </CollapsibleSection>
        </div>
      </div>
    </div>
  );
};

export default LifeProjectDetailView;
