
import React from 'react';
import { toPersianDigits } from '../../utils';
import { AnomalyAlert, AnomalyType } from '../../types/smartHomeTypes';
import { ShieldExclamationIcon, XCircleIcon, LightbulbIcon, SpeakerWaveIcon } from '../shared/AppIcons'; // Added SpeakerWaveIcon

interface AnomalyAlertCardProps {
  alert: AnomalyAlert;
  onDismiss: (alertId: string) => void;
}

interface AnomalyVisuals {
  IconComponent: React.FC<{className?: string}>;
  colorClass: string;
  titlePrefix: string;
}

const getAnomalyTypeVisuals = (type: AnomalyType): AnomalyVisuals => {
  switch (type) {
    case 'water_leak':
      return { IconComponent: ShieldExclamationIcon, colorClass: 'red', titlePrefix: "نشت آب" };
    case 'appliance_malfunction':
      return { IconComponent: ShieldExclamationIcon, colorClass: 'orange', titlePrefix: "نقص فنی دستگاه" };
    case 'open_window_rain':
      return { IconComponent: ShieldExclamationIcon, colorClass: 'blue', titlePrefix: "پنجره باز در باران" };
    case 'security_breach':
      return { IconComponent: ShieldExclamationIcon, colorClass: 'red', titlePrefix: "نقص امنیتی" };
    case 'smoke_detected':
      return { IconComponent: ShieldExclamationIcon, colorClass: 'red', titlePrefix: "تشخیص دود" };
    default:
      return { IconComponent: ShieldExclamationIcon, colorClass: 'gray', titlePrefix: "هشدار" };
  }
};

const AnomalyAlertCard: React.FC<AnomalyAlertCardProps> = ({ alert, onDismiss }) => {
  const visuals = getAnomalyTypeVisuals(alert.type);
  const IconToRender = visuals.IconComponent;
  
  const cardSeverityClasses: Record<AnomalyAlert['severity'], string> = {
    critical: `bg-red-100 border-red-400 text-red-800`,
    warning: `bg-yellow-100 border-yellow-400 text-yellow-800`,
  };
  const currentSeverityStyle = cardSeverityClasses[alert.severity] || cardSeverityClasses.warning;
  
  const iconSeverityColorClass = alert.severity === 'critical' ? 'text-red-600' : 'text-yellow-600';
  const buttonSeverityColorClass = alert.severity === 'critical' ? 'text-red-500 hover:bg-red-200' : 'text-yellow-500 hover:bg-yellow-200';
  const borderSeverityColorClass = alert.severity === 'critical' ? 'border-red-300' : 'border-yellow-300';


  return (
    <div className={`p-3 rounded-lg shadow-md border ${currentSeverityStyle} animate-fadeIn`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <div className={`p-1 rounded-full mr-2 rtl:ml-2 rtl:mr-0 ${iconSeverityColorClass}`}>
            <IconToRender className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`text-sm font-semibold ${alert.severity === 'critical' ? 'text-red-700' : 'text-yellow-700'}`}>
              {toPersianDigits(`${visuals.titlePrefix}: ${alert.title}`)}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {toPersianDigits(new Date(alert.timestamp).toLocaleString('fa-IR'))}
            </p>
          </div>
        </div>
        <button onClick={() => onDismiss(alert.id)} className={`p-1 rounded-full transition-colors ${buttonSeverityColorClass}`} aria-label={toPersianDigits("نادیده گرفتن هشدار")}>
          <XCircleIcon className="w-5 h-5" />
        </button>
      </div>
      <p className="text-xs text-gray-700 mt-1.5 mb-2 leading-relaxed">{toPersianDigits(alert.description)}</p>
      
      {alert.suggestedAction && (
          <div className={`mt-2 pt-2 border-t ${borderSeverityColorClass}`}>
            <p className="text-xs font-medium text-gray-700 mb-0.5 flex items-center">
                <LightbulbIcon className="w-3.5 h-3.5 text-yellow-600 mr-1 rtl:ml-1 rtl:mr-0"/>
                {toPersianDigits("اقدام پیشنهادی:")}
            </p>
            <p className="text-xs text-gray-600">{toPersianDigits(alert.suggestedAction)}</p>
          </div>
      )}

      {(alert.severity === 'critical' || alert.severity === 'warning') && (
        <div className="mt-2 text-xs text-gray-500 flex items-center">
            <SpeakerWaveIcon className="w-3.5 h-3.5 text-gray-400 mr-1 rtl:ml-1 rtl:mr-0"/>
            {toPersianDigits("(اعلان صوتی پخش شد)")}
        </div>
      )}
    </div>
  );
};

export default AnomalyAlertCard;
