import React, { useState } from 'react';
import { LearningPath, LearningContent, LearningModule } from '../../types/learningTypes';
import { toPersianDigits } from '../../utils';
import { ChevronRightIcon, AcademicCapIcon, ClockIcon, AdjustmentsVerticalIcon as LevelIcon, ListIcon as ListBulletIcon, CheckCircleIcon, ArrowRightIcon, PlayCircleIcon, XCircleIcon, LightbulbIcon, SparklesIconNav, DocumentArrowUpIcon } from '../shared/AppIcons';
import QuizView from './QuizView'; 
import ToastNotification from '../shared/ToastNotification';
import Breadcrumbs from './Breadcrumbs';

interface LearningPathDetailViewProps {
  path: LearningPath;
  onBack: () => void;
  allLearningContent: LearningContent[];
  onModuleQuizComplete: (pathId: string, moduleId: string, score: number, totalQuestions: number) => void;
  onStartExercise: (exerciseId: string) => void; 
  onAwardPoints?: (points: number, actionDescription: string) => void;
}

const LearningPathDetailView: React.FC<LearningPathDetailViewProps> = ({ path, onBack, allLearningContent, onModuleQuizComplete, onStartExercise, onAwardPoints }) => {
  const [activeQuizModule, setActiveQuizModule] = useState<LearningModule | null>(null);
  const [toastInfo, setToastInfo] = useState<{id: number, text: string, type: 'success' | 'error' | 'info'} | null>(null);
  const [visibleAIRationaleModuleId, setVisibleAIRationaleModuleId] = useState<string | null>(null);
  const accentColor = 'sky-600'; 

  const progressColor = path.overallProgress >= 75 ? 'bg-green-500' : path.overallProgress >= 40 ? `bg-${accentColor}` : 'bg-yellow-500';
  
  const getModuleProgressColor = (progress: number, completed: boolean) => {
    if (completed) return 'bg-green-500';
    if (progress >= 50) return `bg-${accentColor}`;
    if (progress > 0) return 'bg-yellow-500';
    return 'bg-gray-300';
  }

  const handleQuizComplete = (score: number, totalQuestions: number, moduleId: string) => {
    onModuleQuizComplete(path.id, moduleId, score, totalQuestions);
    const currentModule = path.modules.find(m => m.id === moduleId);
    if (currentModule && currentModule.points && (score / totalQuestions >= 0.7)) { // Award points if score is 70% or more
        onAwardPoints?.(currentModule.points, `تکمیل آزمون ماژول: ${currentModule.title}`);
    }
    setActiveQuizModule(null); 
    const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 100; 
    setToastInfo({
        id: Date.now(),
        text: toPersianDigits(`آزمون ماژول "${currentModule?.title}" با امتیاز ${percentage}% تکمیل شد.`),
        type: percentage >= 70 ? 'success' : 'info' 
    });
  };

  if (activeQuizModule && activeQuizModule.quiz) {
    return (
        <div className="page bg-learning-page p-4 sm:p-6">
             <QuizView 
                quiz={activeQuizModule.quiz} 
                moduleId={activeQuizModule.id}
                onQuizComplete={handleQuizComplete}
                onClose={() => setActiveQuizModule(null)} 
            />
        </div>
    );
  }

  const breadcrumbSegments = [
    { label: toPersianDigits('کتابخانه'), onClick: onBack },
    { label: toPersianDigits(path.title) }
  ];

  return (
    <div className="page bg-learning-page">
      {toastInfo && <ToastNotification message={toastInfo.text} type={toastInfo.type} isVisible={!!toastInfo} onClose={() => setToastInfo(null)} />}
      
      <Breadcrumbs segments={breadcrumbSegments} className="mb-4 px-1 sm:px-0" />

      <header className="mb-6 p-4 sm:p-6 bg-white rounded-xl shadow-lg border border-gray-200/80">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
          <div className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-${accentColor.split('-')[0]}-100 rounded-lg flex items-center justify-center`}>
            {path.thumbnailUrl ? <img src={path.thumbnailUrl} alt={toPersianDigits(path.title)} className="w-full h-full object-cover rounded-lg" /> : <AcademicCapIcon className={`w-10 h-10 sm:w-12 sm:h-12 text-${accentColor}`} />}
          </div>
          <div>
            <h1 className={`text-xl sm:text-2xl font-bold text-${accentColor.replace('-600', '-700')} mb-1`}>{toPersianDigits(path.title)}</h1>
            <p className="text-sm text-gray-600 leading-relaxed">{toPersianDigits(path.description)}</p>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-1" aria-label={toPersianDigits(`پیشرفت کلی ${path.overallProgress} درصد`)}>
            <div 
              className={`${progressColor} h-3 rounded-full transition-all duration-500 ease-out`}
              style={{ width: `${path.overallProgress}%` }}
              role="progressbar"
              aria-valuenow={path.overallProgress}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
        </div>
        <p className="text-sm text-gray-600 mb-4 text-center font-semibold">
            {toPersianDigits(`پیشرفت کلی: ${path.overallProgress}%`)}
        </p>

        <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2 text-xs sm:text-sm text-gray-500 border-t border-gray-200 pt-3">
          <div className="flex items-center">
            <ClockIcon className="w-4 h-4 ml-1.5 rtl:mr-1.5 rtl:ml-0 text-gray-400" />
            {toPersianDigits(`زمان تخمینی: ${path.estimatedTime}`)}
          </div>
          <div className="flex items-center">
            <LevelIcon className="w-4 h-4 ml-1.5 rtl:mr-1.5 rtl:ml-0 text-gray-400" />
            {toPersianDigits(`سطح: ${path.difficultyLevel}`)}
          </div>
        </div>
         {path.prerequisites && path.prerequisites.length > 0 && (
          <div className="mt-3">
            <h4 className="text-xs font-semibold text-gray-500 mb-1">{toPersianDigits("پیش‌نیازها:")}</h4>
            <ul className="list-disc list-inside pr-4 rtl:mr-4 rtl:pr-0 space-y-0.5">
              {path.prerequisites.map((prereq, index) => (
                <li key={index} className="text-xs text-gray-600">{toPersianDigits(prereq)}</li>
              ))}
            </ul>
          </div>
        )}
      </header>

      <section className="mb-6 p-4 sm:p-5 bg-white rounded-xl shadow-md border border-gray-200/80">
        <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <ListBulletIcon className={`w-5 h-5 ml-2 rtl:mr-2 rtl:ml-0 text-${accentColor}`}/>
            {toPersianDigits("اهداف یادگیری")}
        </h2>
        <ul className="space-y-1.5">
          {path.learningObjectives.map((objective, index) => (
            <li key={index} className="text-sm text-gray-700 flex items-start">
              <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 rtl:ml-2 rtl:mr-0 mt-0.5 flex-shrink-0" />
              {toPersianDigits(objective)}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{toPersianDigits("ماژول‌های مسیر")}</h2>
        <div className="space-y-4">
          {path.modules.map((module, index) => (
            <div key={module.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200/80 hover:shadow-md transition-shadow duration-200">
              <div className="flex justify-between items-start mb-1">
                <span className={`text-xs font-semibold text-${accentColor} bg-${accentColor.split('-')[0]}-100 px-2 py-0.5 rounded-full inline-block`}>
                  {toPersianDigits(`ماژول ${index + 1}`)}
                </span>
                {(module.isAISuggested || module.isSkippable) && (
                   <button 
                    onClick={() => setVisibleAIRationaleModuleId(visibleAIRationaleModuleId === module.id ? null : module.id)}
                    className={`p-1 rounded-full hover:bg-yellow-100 transition-colors`}
                    title={toPersianDigits("توضیح هوش مصنوعی")}
                    aria-expanded={visibleAIRationaleModuleId === module.id}
                    aria-controls={`ai-rationale-${module.id}`}
                    >
                    <SparklesIconNav className="w-4 h-4 text-yellow-500" />
                  </button>
                )}
              </div>
              
              <h3 className="text-md font-semibold text-gray-700 mb-1 flex items-center">
                {toPersianDigits(module.title)}
                {module.isAISuggested && <span className="text-[10px] text-white bg-sky-500 px-1.5 py-0.5 rounded-full mr-2 rtl:ml-2 rtl:mr-0">{toPersianDigits("پیشنهاد AI")}</span>}
                {module.isSkippable && <span className="text-[10px] text-white bg-orange-500 px-1.5 py-0.5 rounded-full mr-2 rtl:ml-2 rtl:mr-0">{toPersianDigits("قابل رد شدن")}</span>}
              </h3>
              {visibleAIRationaleModuleId === module.id && module.aiSuggestionRationale && (
                <p id={`ai-rationale-${module.id}`} className="text-xs text-gray-500 bg-yellow-50 p-2 rounded-md border border-yellow-200 my-1.5 leading-relaxed">
                  <LightbulbIcon className="w-3.5 h-3.5 inline mr-1 rtl:ml-1 rtl:mr-0 text-yellow-600 align-middle"/>
                  {toPersianDigits(module.aiSuggestionRationale)}
                </p>
              )}
              <p className="text-xs text-gray-600 mb-2">{toPersianDigits(module.description)}</p>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                 <span>{toPersianDigits(`زمان تخمینی: ${module.estimatedTime || 'نامشخص'}`)}</span>
                 <span className={`font-medium ${module.completed ? 'text-green-600' : getModuleProgressColor(module.progress, module.completed).replace('bg-', 'text-')}`}>
                    {module.completed ? toPersianDigits('تکمیل شده') : toPersianDigits(`پیشرفت: ${module.progress}%`)}
                 </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5" aria-label={toPersianDigits(`پیشرفت ماژول ${module.progress} درصد`)}>
                  <div 
                    className={`${getModuleProgressColor(module.progress, module.completed)} h-1.5 rounded-full transition-all duration-300`}
                    style={{ width: `${module.progress}%` }}
                    role="progressbar"
                    aria-valuenow={module.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  ></div>
              </div>

              {module.contentIds.length > 0 && (
                <div className="mt-3 pt-2 border-t border-gray-100">
                  <h4 className="text-xs font-semibold text-gray-500 mb-1.5">{toPersianDigits("محتوای مرتبط:")}</h4>
                  <ul className="space-y-1">
                    {module.contentIds.map(contentId => {
                      const contentItem = allLearningContent.find(c => c.id === contentId);
                      return contentItem ? (
                        <li key={contentId} className={`text-xs text-${accentColor} hover:underline cursor-pointer flex items-center`}>
                           <ArrowRightIcon className="w-3 h-3 ml-1 rtl:mr-1 rtl:ml-0 transform scale-x-[-1]" /> 
                           {toPersianDigits(contentItem.title)} ({toPersianDigits(contentItem.type)})
                        </li>
                      ) : null;
                    })}
                  </ul>
                </div>
              )}
              <div className="mt-3 pt-2 border-t border-gray-100 flex flex-wrap gap-2 justify-center sm:justify-start">
                {module.quiz && (
                    module.completed ? (
                         <p className="text-xs text-green-600 font-medium flex items-center justify-center">
                            <CheckCircleIcon className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0"/>
                            {toPersianDigits("آزمون این ماژول تکمیل شده.")}
                         </p>
                    ) : (
                        <button 
                            onClick={() => setActiveQuizModule(module)}
                            className={`bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-medium py-1.5 px-3 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-1 flex items-center`}
                            aria-label={toPersianDigits(`شروع آزمون ماژول ${module.title}`)}
                        >
                            <PlayCircleIcon className="w-4 h-4 inline ml-1 rtl:mr-1 rtl:ml-0" />
                            {toPersianDigits(module.progress > 0 && module.progress < 100 ? "ادامه/تکرار آزمون" : "شروع آزمون")}
                        </button>
                    )
                )}
                {module.exerciseId && (
                    <button
                        onClick={() => onStartExercise(module.exerciseId!)}
                        className={`bg-teal-500 hover:bg-teal-600 text-white text-xs font-medium py-1.5 px-3 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-1 flex items-center`}
                        aria-label={toPersianDigits(`شروع تمرین عملی ماژول ${module.title}`)}
                    >
                        <DocumentArrowUpIcon className="w-4 h-4 inline ml-1 rtl:mr-1 rtl:ml-0" />
                        {toPersianDigits("انجام تمرین عملی")}
                    </button>
                )}
               </div>
            </div>
          ))}
        </div>
      </section>
      
      <div className="mt-8 text-center">
        <button 
          onClick={onBack}
          className={`bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2.5 px-6 rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 mr-3 rtl:ml-3 rtl:mr-0`}
        >
            {toPersianDigits("بازگشت به کتابخانه")}
        </button>
        <button 
          onClick={() => alert(toPersianDigits('شروع مسیر یادگیری! (شبیه‌سازی شده)'))}
          disabled={path.overallProgress === 100}
          className={`bg-${accentColor} hover:bg-${accentColor.replace('-600', '-700')} text-white font-semibold py-2.5 px-6 rounded-lg text-sm shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-${accentColor} focus:ring-offset-2`}
        >
          {path.overallProgress === 100 ? toPersianDigits("مسیر تکمیل شده است") : toPersianDigits("ادامه این مسیر یادگیری")}
        </button>
      </div>
    </div>
  );
};

export default LearningPathDetailView;