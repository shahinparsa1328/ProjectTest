
import React from 'react';
import { toPersianDigits } from '../../utils';
import { Scenario } from '../../types/smartHomeTypes'; 
import { PlayCircleIcon, FilmIcon, SunIcon, ArrowRightOnRectangleIcon, LightbulbIcon } from '../shared/AppIcons';

interface ScenarioCardProps {
  scenario: Scenario;
  onExecute: (scenarioId: string) => void;
}

const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario, onExecute }) => {
  const getScenarioIcon = () => {
    const iconProps = { className: "w-8 h-8 text-sky-600" };
    switch (scenario.iconName) {
      case 'FilmIcon':
        return <FilmIcon {...iconProps} />;
      case 'SunIcon':
        return <SunIcon {...iconProps} />;
      case 'ArrowRightOnRectangleIcon':
        return <ArrowRightOnRectangleIcon {...iconProps} />;
      case 'LightbulbIcon':
        return <LightbulbIcon {...iconProps} />;
      default:
        return <PlayCircleIcon {...iconProps} />; // Default icon
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow border border-gray-200 hover:shadow-lg transition-shadow duration-200 flex flex-col items-center text-center h-full">
      <div className="p-2 bg-sky-100 rounded-full mb-3">
        {getScenarioIcon()}
      </div>
      <h4 className="text-md font-semibold text-slate-800 mb-1">{toPersianDigits(scenario.name)}</h4>
      {scenario.description && <p className="text-xs text-slate-500 mb-3 leading-relaxed flex-grow min-h-[30px]">{toPersianDigits(scenario.description)}</p>}
      <button
        onClick={() => onExecute(scenario.id)}
        className="w-full mt-auto bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 px-4 rounded-md text-sm transition-colors flex items-center justify-center"
        aria-label={toPersianDigits(`اجرای سناریوی ${scenario.name}`)}
      >
        <PlayCircleIcon className="w-5 h-5 mr-1.5 rtl:ml-1.5 rtl:mr-0" />
        {toPersianDigits("اجرا")}
      </button>
    </div>
  );
};

export default ScenarioCard;