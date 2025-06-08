
import React from 'react';
import { Skill } from '../../types/learningTypes';
import { toPersianDigits } from '../../utils';
import Breadcrumbs from './Breadcrumbs';
import { AcademicCapIcon, SparklesIconNav, MapPinIcon, CheckCircleIcon, LightbulbIcon } from '../shared/AppIcons';

interface SkillsMapPageProps {
  skills: Skill[];
  onBackToLibrary: () => void;
  onNavigateToGateway?: () => void;
}

const SkillCard: React.FC<{ skill: Skill }> = ({ skill }) => {
  let bgColor = 'bg-white';
  let textColor = 'text-gray-700';
  let borderColor = 'border-gray-300';
  let icon = <AcademicCapIcon className="w-5 h-5 text-gray-500" />;

  switch (skill.proficiency) {
    case 'acquired':
      bgColor = 'bg-green-50';
      textColor = 'text-green-700';
      borderColor = 'border-green-400';
      icon = <CheckCircleIcon className="w-5 h-5 text-green-600" />;
      break;
    case 'learning':
      bgColor = 'bg-sky-50';
      textColor = 'text-sky-700';
      borderColor = 'border-sky-400';
      icon = <LightbulbIcon className="w-5 h-5 text-sky-600" />;
      break;
    case 'suggested_ai':
      bgColor = 'bg-purple-50';
      textColor = 'text-purple-700';
      borderColor = 'border-purple-400';
      icon = <SparklesIconNav className="w-5 h-5 text-purple-600" />;
      break;
  }

  return (
    <div className={`p-4 rounded-lg shadow-sm border ${borderColor} ${bgColor} hover:shadow-md transition-shadow`}>
      <div className="flex items-center mb-2">
        {icon}
        <h4 className={`text-md font-semibold mr-2 rtl:ml-2 rtl:mr-0 ${textColor}`}>{toPersianDigits(skill.name)}</h4>
      </div>
      {skill.categoryName && <p className="text-xs text-gray-500 mb-1">{toPersianDigits(`دسته: ${skill.categoryName}`)}</p>}
      <p className={`text-xs ${textColor}`}>
        {skill.proficiency === 'acquired' ? toPersianDigits('کسب شده') :
         skill.proficiency === 'learning' ? toPersianDigits('در حال یادگیری') :
         toPersianDigits('پیشنهاد هوش مصنوعی')}
      </p>
      {/* Future: onClick={() => navigateToPath(skill.relatedPathIds?.[0])} */}
    </div>
  );
};

const SkillsMapPage: React.FC<SkillsMapPageProps> = ({ skills, onBackToLibrary, onNavigateToGateway }) => {
  const breadcrumbSegments = [
    ...(onNavigateToGateway ? [{ label: toPersianDigits('صفحه اصلی یادگیری'), onClick: onNavigateToGateway }] : []),
    { label: toPersianDigits('کتابخانه'), onClick: onBackToLibrary },
    { label: toPersianDigits('نقشه مهارت‌های من') }
  ];

  const acquiredSkills = skills.filter(s => s.proficiency === 'acquired');
  const learningSkills = skills.filter(s => s.proficiency === 'learning');
  const suggestedSkills = skills.filter(s => s.proficiency === 'suggested_ai');

  return (
    <div className="page bg-learning-page">
      <Breadcrumbs segments={breadcrumbSegments} className="mb-4 px-1 sm:px-0" />
      
      <header className="mb-6 p-4 sm:p-6 bg-white rounded-xl shadow-lg border border-gray-200/80 text-center">
        <MapPinIcon className="w-12 h-12 text-sky-600 mx-auto mb-3"/>
        <h1 className="text-2xl sm:text-3xl font-bold text-sky-700 mb-2">
          {toPersianDigits("نقشه مهارت‌های من")}
        </h1>
        <p className="text-sm text-gray-600 max-w-md mx-auto">
          {toPersianDigits("مهارت‌های کسب‌شده، در حال یادگیری و پیشنهادات هوش مصنوعی برای رشد بیشتر شما.")}
        </p>
      </header>

      {skills.length === 0 ? (
         <div className="text-center py-10 bg-white rounded-lg border border-gray-200 shadow-sm">
            <AcademicCapIcon className={`w-16 h-16 text-gray-400 mx-auto mb-3`} />
            <p className="text-md text-gray-500">{toPersianDigits("هنوز مهارتی برای نمایش وجود ندارد.")}</p>
            <p className="text-sm text-gray-400 mt-1">{toPersianDigits("با شروع مسیرهای یادگیری، نقشه مهارت‌های شما شکل می‌گیرد.")}</p>
          </div>
      ) : (
        <div className="space-y-8">
          {acquiredSkills.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-green-700 mb-3 flex items-center">
                <CheckCircleIcon className="w-6 h-6 text-green-600 ml-2 rtl:mr-2 rtl:ml-0"/>
                {toPersianDigits("مهارت‌های کسب شده")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {acquiredSkills.map(skill => <SkillCard key={skill.id} skill={skill} />)}
              </div>
            </section>
          )}

          {learningSkills.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-sky-700 mb-3 flex items-center">
                 <LightbulbIcon className="w-6 h-6 text-sky-600 ml-2 rtl:mr-2 rtl:ml-0"/>
                {toPersianDigits("مهارت‌های در حال یادگیری")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {learningSkills.map(skill => <SkillCard key={skill.id} skill={skill} />)}
              </div>
            </section>
          )}

          {suggestedSkills.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-purple-700 mb-3 flex items-center">
                <SparklesIconNav className="w-6 h-6 text-purple-600 ml-2 rtl:mr-2 rtl:ml-0"/>
                {toPersianDigits("مهارت‌های پیشنهادی هوش مصنوعی")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {suggestedSkills.map(skill => <SkillCard key={skill.id} skill={skill} />)}
              </div>
            </section>
          )}
        </div>
      )}
        <div className="mt-8 text-center">
            <button 
            onClick={onBackToLibrary}
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2.5 px-6 rounded-lg text-sm transition-colors"
            >
            {toPersianDigits("بازگشت به کتابخانه")}
            </button>
       </div>
    </div>
  );
};

export default SkillsMapPage;
