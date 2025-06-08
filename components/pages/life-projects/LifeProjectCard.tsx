
import React from 'react';
import { LifeProject } from '../../../types/learningTypes';
import { toPersianDigits } from '../../../utils';
import { RocketLaunchIcon, CheckCircleIcon, PauseIcon, PencilIcon, BookIcon } from '../../shared/AppIcons';

interface LifeProjectCardProps {
  project: LifeProject;
  onSelectProject: (projectId: string) => void;
}

const LifeProjectCard: React.FC<LifeProjectCardProps> = ({ project, onSelectProject }) => {
  const progressColor = project.overallProgress >= 75 ? 'bg-green-500' : project.overallProgress >= 40 ? 'bg-sky-500' : 'bg-yellow-500';
  
  const statusInfo = {
    planning: { text: "در حال برنامه‌ریزی", icon: <PencilIcon className="w-3 h-3" />, color: "text-blue-600 bg-blue-100" },
    active: { text: "فعال", icon: <RocketLaunchIcon className="w-3 h-3" />, color: "text-green-600 bg-green-100" },
    completed: { text: "تکمیل شده", icon: <CheckCircleIcon className="w-3 h-3" />, color: "text-teal-600 bg-teal-100" },
    on_hold: { text: "متوقف شده", icon: <PauseIcon className="w-3 h-3" />, color: "text-gray-600 bg-gray-100" },
  };

  return (
    <div 
      className="bg-white p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg hover:border-indigo-400 transition-all duration-300 cursor-pointer flex flex-col h-full"
      onClick={() => onSelectProject(project.id)}
      role="article"
      aria-labelledby={`project-title-${project.id}`}
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && onSelectProject(project.id)}
    >
      {project.coverImageUrl ? (
        <img src={project.coverImageUrl} alt={toPersianDigits(project.title)} className="w-full h-36 object-cover rounded-lg mb-3" />
      ) : (
        <div className="w-full h-36 bg-indigo-100 rounded-lg mb-3 flex items-center justify-center">
          <RocketLaunchIcon className="w-12 h-12 text-indigo-300" />
        </div>
      )}
      
      <div className="flex-grow flex flex-col">
        <h3 id={`project-title-${project.id}`} className="text-md font-semibold text-indigo-700 mb-1 truncate" title={toPersianDigits(project.title)}>{toPersianDigits(project.title)}</h3>
        <p className="text-xs text-gray-600 mb-3 line-clamp-3 flex-grow" title={toPersianDigits(project.description)}>{toPersianDigits(project.description)}</p>
      </div>

      <div className="mt-auto">
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1" aria-label={toPersianDigits(`پیشرفت پروژه ${project.overallProgress} درصد`)}>
          <div
            className={`h-2.5 rounded-full transition-all duration-500 ease-out ${progressColor}`}
            style={{ width: `${project.overallProgress}%` }}
            role="progressbar"
            aria-valuenow={project.overallProgress}
            aria-valuemin={0}
            aria-valuemax={100}
          ></div>
        </div>
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>{toPersianDigits(`پیشرفت: ${project.overallProgress}%`)}</span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium flex items-center gap-1 ${statusInfo[project.status].color}`}>
            {statusInfo[project.status].icon}
            {toPersianDigits(statusInfo[project.status].text)}
          </span>
        </div>
        {project.learningPathSuggestions && project.learningPathSuggestions.length > 0 && (
          <div className="mt-2 pt-1 border-t border-gray-100">
            <p className="text-[10px] text-gray-500 flex items-center">
              <BookIcon className="w-3 h-3 text-indigo-400 mr-1"/>
              {toPersianDigits(`${project.learningPathSuggestions.length} پیشنهاد یادگیری موجود است.`)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LifeProjectCard;
