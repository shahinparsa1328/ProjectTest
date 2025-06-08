import React from 'react';
import { toPersianDigits } from '../../utils'; 
import { LockClosedIcon, LockOpenIcon, LightbulbIcon, DatabaseIcon } from '../shared/AppIcons'; 

interface ModuleDataControlCardProps {
  moduleId: string; // e.g., "goals"
  dataItemId: string; // e.g., "goalTitles"
  moduleIcon: React.ReactNode; // JSX Element for the module icon
  moduleName: string; // Persian name of the module
  dataTypeName: string; // Persian name of the data type/item
  currentStatus: boolean; // Whether AI access is currently enabled
  onToggleStatus: (isEnabled: boolean) => void; // Callback to toggle status
  impactOfDisabling: string; // Persian text explaining impact if disabled
  xaiExplanationKey: string; // Key to fetch XAI explanation from a central map
  onViewModuleData: () => void; // Callback to open modal for viewing this module's data
  onShowXai: (title: string, xaiKey: string) => void; // Callback to show XAI modal
}

const ModuleDataControlCard: React.FC<ModuleDataControlCardProps> = ({ 
  moduleId,
  dataItemId,
  moduleIcon,
  moduleName, 
  dataTypeName, 
  currentStatus, 
  onToggleStatus, 
  impactOfDisabling,
  xaiExplanationKey, 
  onViewModuleData,
  onShowXai
}) => {
  
  const handleToggle = () => {
    onToggleStatus(!currentStatus); 
  };

  const statusColorClass = currentStatus ? 'text-green-600' : 'text-gray-500';
  const toggleBgClass = currentStatus ? 'bg-green-500' : 'bg-gray-300';
  const lockIcon = currentStatus 
    ? <LockOpenIcon className="w-3 h-3 text-green-500 mr-1 rtl:ml-1 rtl:mr-0" /> 
    : <LockClosedIcon className="w-3 h-3 text-gray-400 mr-1 rtl:ml-1 rtl:mr-0" />;

  return (
    <div className="bg-gray-50 p-3.5 rounded-lg shadow-sm border border-gray-200 h-full flex flex-col">
      <div className="flex items-center mb-2">
        {React.cloneElement(moduleIcon as React.ReactElement<{ className?: string }>, { className: "w-5 h-5 text-gray-700" })}
        <h3 className="text-xs font-semibold text-gray-700 mr-1.5 rtl:ml-1.5 rtl:mr-0">{toPersianDigits(moduleName)}</h3>
      </div>
      
      <div className="p-2.5 bg-white rounded border border-gray-100 flex-grow">
        <div className="flex items-center justify-between">
            <span className="text-xs text-gray-700 font-medium">{toPersianDigits(dataTypeName)}</span>
            <div className="flex items-center">
                <button 
                    onClick={() => onShowXai(`${toPersianDigits("استفاده از داده")} "${toPersianDigits(dataTypeName)}" ${toPersianDigits("در ماژول")} "${toPersianDigits(moduleName)}"`, xaiExplanationKey)}
                    className="text-sky-600 hover:text-sky-800 p-0.5 rounded-full hover:bg-sky-100 transition-colors mr-2 rtl:ml-2 rtl:mr-0"
                    title={toPersianDigits("توضیح هوش مصنوعی")}
                    aria-label={toPersianDigits(`توضیح استفاده از داده ${dataTypeName}`)}
                >
                    <LightbulbIcon className="w-4 h-4"/>
                </button>
                <label htmlFor={`toggle-${moduleId}-${dataItemId}`} className="flex items-center cursor-pointer">
                    <div className="relative">
                    <input 
                        type="checkbox" 
                        id={`toggle-${moduleId}-${dataItemId}`} 
                        className="sr-only" 
                        checked={currentStatus} 
                        onChange={handleToggle} 
                        aria-describedby={`impact-${moduleId}-${dataItemId}`}
                    />
                    <div className={`block w-9 h-5 rounded-full transition ${toggleBgClass}`}></div>
                    <div className={`dot absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition transform ${currentStatus ? 'translate-x-4 rtl:-translate-x-4' : ''}`}></div>
                    </div>
                    <span className={`ml-1.5 rtl:mr-1.5 rtl:ml-0 text-xs font-medium ${statusColorClass}`}>
                    {lockIcon}
                    {toPersianDigits(currentStatus ? " فعال" : " غیرفعال")}
                    </span>
                </label>
            </div>
        </div>
        <p id={`impact-${moduleId}-${dataItemId}`} className="text-[10px] text-gray-500 mt-1 italic">
            {toPersianDigits(`تأثیر غیرفعال کردن: ${impactOfDisabling}`)}
        </p>
      </div>

      <button 
        onClick={onViewModuleData}
        className="mt-2.5 w-full text-xs py-1.5 px-3 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-md transition-colors flex items-center justify-center"
      >
        <DatabaseIcon className="w-3.5 h-3.5 ml-1 rtl:ml-1 rtl:mr-0"/>
        {toPersianDigits(`مشاهده/ویرایش داده‌های ${moduleName}`)}
      </button>
    </div>
  );
};

export default ModuleDataControlCard;
