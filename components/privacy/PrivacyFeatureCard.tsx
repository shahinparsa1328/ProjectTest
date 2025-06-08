import React from 'react';
import { toPersianDigits } from '../../utils';
import { LockClosedIcon, LockOpenIcon, LightbulbIcon, InformationCircleIcon } from '../shared/AppIcons';
import { PrivacyFeatureInfo } from '../../types/privacyTypes';

interface PrivacyFeatureCardProps {
  feature: PrivacyFeatureInfo;
  type: 'data-module' | 'permission';
  onXaiClick?: (title: string, xaiKeyOrExplanation: string) => void;
}

const PrivacyFeatureCard: React.FC<PrivacyFeatureCardProps> = ({ feature, type, onXaiClick }) => {
  const isCoreOsPermission = type === 'permission' && (feature.permissionKey === 'location' || feature.permissionKey === 'geolocation' || feature.permissionKey === 'microphone' || feature.permissionKey === 'camera');
  const statusColorClass = feature.currentStatus ? 'text-green-600' : 'text-gray-500';
  const toggleBgClass = feature.currentStatus ? 'bg-green-500' : 'bg-gray-300';
  
  const lockIcon = feature.currentStatus 
    ? <LockOpenIcon className="w-3.5 h-3.5 text-green-500 mr-1 rtl:ml-1 rtl:mr-0" /> 
    : <LockClosedIcon className="w-3.5 h-3.5 text-gray-400 mr-1 rtl:ml-1 rtl:mr-0" />;

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
      <div className="flex items-center mb-3">
        {React.cloneElement(feature.icon, { className: "w-5 h-5"})}
        <h3 className="text-sm font-semibold text-gray-700 mr-2 rtl:ml-2 rtl:mr-0">{toPersianDigits(feature.name)}</h3>
      </div>
      <p className="text-xs text-gray-600 mb-2 leading-relaxed flex-grow">{toPersianDigits(feature.description)}</p>

      {type === 'data-module' && feature.dataPoints && feature.dataPoints.length > 0 && (
        <>
          <ul className="space-y-1.5 text-xs mb-2">
            {feature.dataPoints.map((dp, index) => (
              <li key={index} className="p-2 bg-white rounded border border-gray-100">
                <strong className="text-gray-700 block">{toPersianDigits(dp.name)}</strong>
                <p className="text-gray-500 mt-0.5"><span className="font-medium text-sky-600">{toPersianDigits("دلیل جمع‌آوری: ")}</span>{toPersianDigits(dp.reason)}</p>
                <p className="text-gray-500"><span className="font-medium text-sky-600">{toPersianDigits("فایده برای شما: ")}</span>{toPersianDigits(dp.benefit)}</p>
              </li>
            ))}
          </ul>
          {onXaiClick && feature.id && ( // Ensure feature.id (as xaiKey) is available
            <button 
                onClick={() => onXaiClick(feature.name, feature.id)}
                className="text-[10px] text-sky-600 hover:text-sky-800 hover:underline flex items-center self-start mt-1"
            >
                <LightbulbIcon className="w-3 h-3 ml-1 rtl:mr-1 rtl:ml-0" />
                {toPersianDigits("چرا این داده استفاده می‌شود؟ (XAI)")}
            </button>
          )}
        </>
      )}

      {type === 'permission' && feature.onToggleStatus && (
        <>
          <div className="flex items-center justify-between my-3">
            <span className="text-xs font-medium text-gray-700 flex items-center">
              {lockIcon}
              {toPersianDigits("وضعیت مجوز:")}
            </span>
            <div 
              className={`flex items-center ${isCoreOsPermission ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              title={isCoreOsPermission ? toPersianDigits("این مجوز از طریق تنظیمات سیستم عامل دستگاه شما کنترل می‌شود.") : undefined}
              onClick={!isCoreOsPermission && feature.onToggleStatus ? feature.onToggleStatus : undefined}
              onKeyPress={!isCoreOsPermission && feature.onToggleStatus ? (e) => { if (e.key === 'Enter' || e.key === ' ') feature.onToggleStatus!(); } : undefined}
              role={!isCoreOsPermission && feature.onToggleStatus ? "switch" : undefined}
              aria-checked={feature.currentStatus}
              tabIndex={!isCoreOsPermission && feature.onToggleStatus ? 0 : -1}
              aria-disabled={isCoreOsPermission}
            >
              <div className="relative">
                <input 
                  type="checkbox" 
                  id={`toggle-${feature.id}`} 
                  className="sr-only" 
                  checked={!!feature.currentStatus} 
                  onChange={!isCoreOsPermission && feature.onToggleStatus ? feature.onToggleStatus : ()=>{}}
                  disabled={isCoreOsPermission || !feature.onToggleStatus}
                />
                <div className={`block w-10 h-5 rounded-full transition ${toggleBgClass} ${isCoreOsPermission ? 'opacity-70' : ''}`}></div>
                <div className={`dot absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition transform ${feature.currentStatus ? 'translate-x-5 rtl:-translate-x-5' : ''} ${isCoreOsPermission ? 'opacity-70' : ''}`}></div>
              </div>
              <span className={`ml-2 rtl:mr-2 rtl:ml-0 text-xs font-medium ${statusColorClass} ${isCoreOsPermission ? 'opacity-70' : ''}`}>
                {toPersianDigits(feature.currentStatus ? "فعال" : "غیرفعال")}
                {isCoreOsPermission && toPersianDigits(" (در OS)")}
              </span>
            </div>
          </div>
           {isCoreOsPermission && (
             <p className="text-[10px] text-gray-500 bg-blue-50 border border-blue-200 p-1.5 rounded-md flex items-start">
                <InformationCircleIcon className="w-3.5 h-3.5 text-blue-500 mr-1 rtl:ml-1 rtl:mr-0 mt-px flex-shrink-0" />
                <span>{toPersianDigits("برای تغییر این مجوز، لطفاً به تنظیمات سیستم عامل دستگاه خود مراجعه کنید.")}</span>
            </p>
           )}
          {feature.impactIfNotGranted && !feature.currentStatus && ( 
            <p className={`text-xs italic p-2 rounded-md border mt-2 ${
               'bg-yellow-50 border-yellow-200 text-yellow-700'
            }`}>
              <strong className="font-semibold">{toPersianDigits("در صورت عدم ارائه این مجوز: ")}</strong>
              {toPersianDigits(feature.impactIfNotGranted)}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default PrivacyFeatureCard;
