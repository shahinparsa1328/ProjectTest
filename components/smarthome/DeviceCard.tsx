
import React from 'react';
import { toPersianDigits } from '../../utils';
import { 
    LightbulbIcon, 
    PowerIcon, 
    FireIcon, 
    ChevronUpIcon, 
    ChevronDownIcon, 
    LockClosedIcon, 
    LockOpenIcon,   
    ShieldCheckIcon,
    ShieldExclamationIcon,
    CameraIcon as SmartHomeCameraIcon, 
    SpeakerWaveIcon as SmartSpeakerIcon, 
    BoltIcon as AirPurifierIcon, // Using BoltIcon as a placeholder for AirPurifier
    EyeIcon, 
    EyeSlashIcon, 
    PlayIcon as PlaySpeakerIcon,
    PauseIcon as PauseSpeakerIcon,
    CogIcon, // For AI Lock indicator
} from '../shared/AppIcons';
import { WaterSensorStatus } from '../../types/smartHomeTypes'; 

export type DeviceType = 'light' | 'plug' | 'thermostat' | 'lock' | 'sensor' | 'motionSensor' | 'camera' | 'smart_speaker' | 'air_purifier' | 'waterSensor' | 'waterMeter';

export interface EnergyUsage {
  currentWatts?: number;
  last24hKwh?: number;
}

export interface LightStatus {
  isOn: boolean;
  brightness?: number; // 0-100
  color?: string; // hex string e.g., '#FF0000'
  isLockedByAI?: boolean;
}

export interface PlugStatus {
  isOn: boolean;
  isLockedByAI?: boolean;
}

export interface ThermostatStatus {
  isOn: boolean; 
  targetTemperature: number; 
  currentTemperature?: number; 
  mode: 'heat' | 'cool' | 'auto' | 'off';
  isLockedByAI?: boolean;
}

export interface LockStatus {
  isLocked: boolean;
  isLockedByAI?: boolean;
}

export interface SensorStatus { // For door/window sensors
  isOpen: boolean;
  isLockedByAI?: boolean; 
}

export interface MotionSensorStatus {
  isMotionDetected: boolean;
  isLockedByAI?: boolean;
}

export interface CameraStatus {
  isStreaming: boolean;
  feedUrl?: string; // Placeholder
  isLockedByAI?: boolean;
}

export interface SmartSpeakerStatus {
  isPlaying: boolean;
  volume?: number; // 0-100
  currentTrack?: string;
  isLockedByAI?: boolean;
}

export interface AirPurifierStatus {
  isOn: boolean;
  fanSpeed?: 'low' | 'medium' | 'high' | 'auto';
  airQualityIndex?: number; // Optional AQI display
  isLockedByAI?: boolean;
}

export interface WaterMeterStatus {
  flowRate: number; // L/min or similar unit
  totalConsumption: number; // Total liters or m³
  isLeakingBasedOnAI?: boolean; 
}


export type DeviceStatus = LightStatus | PlugStatus | ThermostatStatus | LockStatus | SensorStatus | MotionSensorStatus | CameraStatus | SmartSpeakerStatus | AirPurifierStatus | WaterSensorStatus | WaterMeterStatus;

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  roomId: string;
  status: DeviceStatus;
  energyUsage?: EnergyUsage;
  errorStatus?: string; 
  connectionIssues?: boolean; 
}

interface DeviceCardProps {
  device: Device;
  onStatusChange: (deviceId: string, newStatus: Partial<DeviceStatus>) => void;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device, onStatusChange }) => {
  const isLockedByAI = 'isLockedByAI' in device.status && device.status.isLockedByAI;

  const handleToggle = () => {
    if (isLockedByAI) return;
    if ('isOn' in device.status && (device.type === 'light' || device.type === 'plug' || device.type === 'thermostat' || device.type === 'air_purifier')) {
      onStatusChange(device.id, { isOn: !device.status.isOn });
    } else if (device.type === 'lock' && 'isLocked' in device.status) {
      onStatusChange(device.id, { isLocked: !(device.status as LockStatus).isLocked } as Partial<LockStatus>);
    } else if (device.type === 'camera' && 'isStreaming' in device.status) {
      onStatusChange(device.id, { isStreaming: !(device.status as CameraStatus).isStreaming } as Partial<CameraStatus>);
    } else if (device.type === 'smart_speaker' && 'isPlaying' in device.status) {
      onStatusChange(device.id, { isPlaying: !(device.status as SmartSpeakerStatus).isPlaying } as Partial<SmartSpeakerStatus>);
    }
  };

  const handleBrightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isLockedByAI) return;
    if (device.type === 'light') {
      const newBrightness = parseInt(e.target.value, 10);
      onStatusChange(device.id, { brightness: newBrightness });
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isLockedByAI) return;
    if (device.type === 'light') {
      onStatusChange(device.id, { color: e.target.value });
    }
  };

  const handleTemperatureChange = (increment: boolean) => {
    if (isLockedByAI) return;
    if (device.type === 'thermostat') {
      const currentTemp = (device.status as ThermostatStatus).targetTemperature;
      const newTemp = increment ? currentTemp + 1 : currentTemp - 1;
      if (newTemp >= 10 && newTemp <= 30) { 
        onStatusChange(device.id, { targetTemperature: newTemp });
      }
    }
  };

  const handleThermostatModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (isLockedByAI) return;
     if (device.type === 'thermostat') {
        onStatusChange(device.id, { mode: e.target.value as ThermostatStatus['mode'] });
     }
  };

  const handleSpeakerVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isLockedByAI) return;
    if (device.type === 'smart_speaker') {
      onStatusChange(device.id, { volume: parseInt(e.target.value, 10) });
    }
  };

  const handleAirPurifierSpeedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (isLockedByAI) return;
    if (device.type === 'air_purifier') {
      onStatusChange(device.id, { fanSpeed: e.target.value as AirPurifierStatus['fanSpeed'] });
    }
  };


  const getDeviceIcon = () => {
    const iconPropsBase = { className: "w-6 h-6" };
    switch (device.type) {
      case 'light': return <LightbulbIcon {...iconPropsBase} className={`${iconPropsBase.className} text-slate-700`}/>;
      case 'plug': return <PowerIcon {...iconPropsBase} className={`${iconPropsBase.className} text-slate-700`}/>;
      case 'thermostat': return <FireIcon {...iconPropsBase} className={`${iconPropsBase.className} text-slate-700`}/>;
      case 'lock': 
        return (device.status as LockStatus).isLocked 
            ? <LockClosedIcon {...iconPropsBase} className={`${iconPropsBase.className} text-green-600`}/> 
            : <LockOpenIcon {...iconPropsBase} className={`${iconPropsBase.className} text-red-600`} />;
      case 'sensor': 
        return <ShieldCheckIcon {...iconPropsBase} className={`${iconPropsBase.className} ${(device.status as SensorStatus).isOpen ? 'text-red-500' : 'text-green-500'}`}/>;
      case 'motionSensor':
        return <ShieldCheckIcon {...iconPropsBase} className={`${iconPropsBase.className} ${(device.status as MotionSensorStatus).isMotionDetected ? 'text-red-600' : 'text-green-600'}`}/>;
      case 'camera': return <SmartHomeCameraIcon {...iconPropsBase} className={`${iconPropsBase.className} text-slate-700`} />;
      case 'smart_speaker': return <SmartSpeakerIcon {...iconPropsBase} className={`${iconPropsBase.className} text-slate-700`} />;
      case 'air_purifier': return <AirPurifierIcon {...iconPropsBase} className={`${iconPropsBase.className} text-slate-700`} />;
      case 'waterSensor': 
        return <ShieldExclamationIcon {...iconPropsBase} className={`${iconPropsBase.className} ${(device.status as WaterSensorStatus).isLeaking ? 'text-red-600' : 'text-blue-500'}`} />;
      case 'waterMeter':
        return <ShieldExclamationIcon {...iconPropsBase} className={`${iconPropsBase.className} ${(device.status as WaterMeterStatus).isLeakingBasedOnAI ? 'text-orange-500' : 'text-blue-500'}`} />;
      default: return null;
    }
  };

  const renderStatus = () => {
    const { status, type } = device;
    let statusText = '';
    let statusClass = 'bg-gray-100 text-gray-700';
    let details = '';

    if (isLockedByAI) {
        statusText = "محدود توسط AI";
        statusClass = 'bg-orange-100 text-orange-700';
        return <span className={`text-xs px-2 py-0.5 rounded-full ${statusClass}`}>{toPersianDigits(statusText)}</span>;
    }

    if ('isOn' in status && (type === 'light' || type === 'plug' || type === 'thermostat' || type === 'air_purifier')) {
      statusText = status.isOn ? "روشن" : "خاموش";
      statusClass = status.isOn ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';
      if (type === 'light' && (status as LightStatus).brightness !== undefined) {
        details += ` - ${toPersianDigits("روشنایی:")} ${toPersianDigits(String((status as LightStatus).brightness))}%`;
      }
      if (type === 'thermostat') {
        details += ` - ${toPersianDigits("هدف:")} ${toPersianDigits(String((status as ThermostatStatus).targetTemperature))}°C`;
        if((status as ThermostatStatus).currentTemperature !== undefined) {
            details += ` (${toPersianDigits("فعلی:")} ${toPersianDigits(String((status as ThermostatStatus).currentTemperature))}°C)`;
        }
      }
      if (type === 'air_purifier') {
        details += ` - ${toPersianDigits("سرعت فن:")} ${toPersianDigits(String((status as AirPurifierStatus).fanSpeed))}`;
        if ((status as AirPurifierStatus).airQualityIndex !== undefined) {
          details += ` - ${toPersianDigits("AQI:")} ${toPersianDigits(String((status as AirPurifierStatus).airQualityIndex))}`;
        }
      }
    } else if (type === 'lock' && 'isLocked' in status) {
        statusText = (status as LockStatus).isLocked ? "قفل" : "باز";
        statusClass = (status as LockStatus).isLocked ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700';
    } else if (type === 'sensor' && 'isOpen' in status) { 
        statusText = (status as SensorStatus).isOpen ? "باز" : "بسته";
        statusClass = (status as SensorStatus).isOpen ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700';
    } else if (type === 'motionSensor' && 'isMotionDetected' in status) {
        statusText = (status as MotionSensorStatus).isMotionDetected ? "حرکت تشخیص داده شد" : "بدون حرکت";
        statusClass = (status as MotionSensorStatus).isMotionDetected ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700';
    } else if (type === 'camera' && 'isStreaming' in status) {
        statusText = (status as CameraStatus).isStreaming ? "در حال پخش" : "متوقف";
        statusClass = (status as CameraStatus).isStreaming ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700';
    } else if (type === 'smart_speaker' && 'isPlaying' in status) {
        statusText = (status as SmartSpeakerStatus).isPlaying ? "در حال پخش" : "متوقف";
        statusClass = (status as SmartSpeakerStatus).isPlaying ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700';
        if ((status as SmartSpeakerStatus).isPlaying && (status as SmartSpeakerStatus).currentTrack) {
          details += ` - ${toPersianDigits((status as SmartSpeakerStatus).currentTrack!)}`;
        }
         if ((status as SmartSpeakerStatus).volume !== undefined) {
            details += ` (${toPersianDigits("صدا:")} ${toPersianDigits(String((status as SmartSpeakerStatus).volume))}% )`;
        }
    } else if (type === 'waterSensor' && 'isLeaking' in status) {
        statusText = (status as WaterSensorStatus).isLeaking ? "نشت آب!" : "خشک";
        statusClass = (status as WaterSensorStatus).isLeaking ? 'bg-red-100 text-red-700 font-bold' : 'bg-green-100 text-green-700';
    } else if (type === 'waterMeter' && 'flowRate' in status) {
        const meterStatus = status as WaterMeterStatus;
        statusText = meterStatus.isLeakingBasedOnAI ? "احتمال نشت (AI)" : `${toPersianDigits("جریان:")} ${toPersianDigits(meterStatus.flowRate.toFixed(1))} ${toPersianDigits("L/m")}`;
        statusClass = meterStatus.isLeakingBasedOnAI ? 'bg-orange-100 text-orange-700 font-bold' : 'bg-blue-100 text-blue-700';
        details = ` - ${toPersianDigits("مصرف کل:")} ${toPersianDigits(meterStatus.totalConsumption.toFixed(1))} L`;
    }
    
    return (
      <span className={`text-xs px-2 py-0.5 rounded-full ${statusClass}`}>
        {toPersianDigits(statusText)} {toPersianDigits(details)}
      </span>
    );
  };
  
  const deviceIssueTooltip = device.errorStatus || (device.connectionIssues ? toPersianDigits("مشکل در اتصال") : undefined);

  return (
    <div className={`bg-white p-3 sm:p-4 rounded-lg shadow border border-gray-200 hover:shadow-md transition-shadow duration-200 flex flex-col h-full ${isLockedByAI ? 'opacity-60 cursor-not-allowed' : ''}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          {getDeviceIcon()}
          <h4 className="text-sm sm:text-md font-semibold text-slate-800 mr-2 rtl:ml-2 rtl:mr-0 truncate" title={toPersianDigits(device.name)}>{toPersianDigits(device.name)}</h4>
          {deviceIssueTooltip && !isLockedByAI && (
            <div className="relative group ml-1 rtl:mr-1 rtl:ml-0">
              <ShieldExclamationIcon className="w-4 h-4 text-red-500 cursor-help" />
              <div className="absolute z-10 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 -top-8 right-0 rtl:left-0 rtl:right-auto whitespace-nowrap shadow-lg">
                {toPersianDigits(deviceIssueTooltip)}
              </div>
            </div>
          )}
          {isLockedByAI && (
            <div className="relative group ml-1 rtl:mr-1 rtl:ml-0" title={toPersianDigits("این دستگاه توسط AI محدود شده است (ایمنی کودک).")}>
                <CogIcon className="w-4 h-4 text-orange-500 cursor-help" />
            </div>
          )}
        </div>
        {renderStatus()}
      </div>
      
      {device.energyUsage && (
        <div className="text-xs text-slate-500 mb-2 space-y-0.5 border-b border-gray-100 pb-2">
          {device.energyUsage.currentWatts !== undefined && (
            <p>{toPersianDigits(`مصرف لحظه‌ای: ${String(device.energyUsage.currentWatts)} وات`)}</p>
          )}
          {device.energyUsage.last24hKwh !== undefined && (
            <p>{toPersianDigits(`مصرف ۲۴س گذشته: ${String(device.energyUsage.last24hKwh)} کیلووات ساعت`)}</p>
          )}
        </div>
      )}

      <div className={`space-y-3 mt-auto pt-2 border-t border-gray-100 ${isLockedByAI ? 'pointer-events-none' : ''}`}>
        {(('isOn' in device.status && (device.type === 'light' || device.type === 'plug' || device.type === 'thermostat' || device.type === 'air_purifier')) || 
          (device.type === 'lock' && 'isLocked' in device.status) ||
          (device.type === 'camera' && 'isStreaming' in device.status) ||
          (device.type === 'smart_speaker' && 'isPlaying' in device.status)
        ) && (
          <button
            onClick={handleToggle}
            disabled={isLockedByAI}
            className={`w-full text-xs py-1.5 px-3 rounded-md font-medium transition-colors ${
              (device.type === 'lock' ? !(device.status as LockStatus).isLocked : 
               device.type === 'camera' ? !(device.status as CameraStatus).isStreaming :
               device.type === 'smart_speaker' ? !(device.status as SmartSpeakerStatus).isPlaying :
               !(device.status as { isOn: boolean }).isOn) 
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
          >
            {device.type === 'lock' 
                ? ((device.status as LockStatus).isLocked ? toPersianDigits("باز کردن") : toPersianDigits("قفل کردن"))
                : device.type === 'camera'
                ? ((device.status as CameraStatus).isStreaming ? toPersianDigits("توقف پخش") : toPersianDigits("شروع پخش"))
                : device.type === 'smart_speaker'
                ? ((device.status as SmartSpeakerStatus).isPlaying ? toPersianDigits("توقف پخش") : toPersianDigits("پخش موزیک"))
                : (('isOn' in device.status && device.status.isOn) ? toPersianDigits("خاموش کردن") : toPersianDigits("روشن کردن"))
            }
          </button>
        )}

        {device.type === 'light' && (
          <>
            <div className="space-y-1">
              <label htmlFor={`brightness-${device.id}`} className="text-xs text-slate-600 block">{toPersianDigits("میزان روشنایی:")}</label>
              <input
                type="range"
                id={`brightness-${device.id}`}
                min="0"
                max="100"
                value={(device.status as LightStatus).brightness || 0}
                onChange={handleBrightnessChange}
                disabled={!(device.status as LightStatus).isOn || isLockedByAI}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-500 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label={toPersianDigits("تنظیم روشنایی")}
              />
            </div>
            <div className="flex items-center justify-between space-x-2 rtl:space-x-reverse">
                <label htmlFor={`color-${device.id}`} className="text-xs text-slate-600 block whitespace-nowrap">{toPersianDigits("رنگ:")}</label>
                <input
                    type="color"
                    id={`color-${device.id}`}
                    value={(device.status as LightStatus).color || '#FFFFFF'}
                    onChange={handleColorChange}
                    disabled={!(device.status as LightStatus).isOn || isLockedByAI}
                    className="w-8 h-8 p-0 border-none rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label={toPersianDigits("انتخاب رنگ نور")}
                />
                <span className="text-xs text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md">{(device.status as LightStatus).color || '#FFFFFF'}</span>
            </div>
          </>
        )}

        {device.type === 'thermostat' && (
          <>
             {'isOn' in device.status && (
                <button
                    onClick={handleToggle}
                    disabled={isLockedByAI}
                    className={`w-full text-xs py-1.5 px-3 rounded-md font-medium transition-colors ${
                    !(device.status as ThermostatStatus).isOn
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-red-500 hover:bg-red-600 text-white'
                    }`}
                >
                    {(device.status as ThermostatStatus).isOn ? toPersianDigits("خاموش کردن ترموستات") : toPersianDigits("روشن کردن ترموستات")}
                </button>
            )}
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-600">{toPersianDigits("دمای هدف:")}</span>
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                <button onClick={() => handleTemperatureChange(false)} className="p-1 bg-slate-200 hover:bg-slate-300 rounded-full text-slate-700" aria-label={toPersianDigits("کاهش دما")} disabled={!(device.status as ThermostatStatus).isOn || isLockedByAI}><ChevronDownIcon className="w-4 h-4"/></button>
                <span className="text-sm font-medium text-slate-700 w-8 text-center">{toPersianDigits(String((device.status as ThermostatStatus).targetTemperature))}°</span>
                <button onClick={() => handleTemperatureChange(true)} className="p-1 bg-slate-200 hover:bg-slate-300 rounded-full text-slate-700" aria-label={toPersianDigits("افزایش دما")} disabled={!(device.status as ThermostatStatus).isOn || isLockedByAI}><ChevronUpIcon className="w-4 h-4"/></button>
              </div>
            </div>
             <div className="flex items-center justify-between">
                <label htmlFor={`mode-${device.id}`} className="text-xs text-slate-600">{toPersianDigits("حالت:")}</label>
                <select 
                    id={`mode-${device.id}`} 
                    value={(device.status as ThermostatStatus).mode} 
                    onChange={handleThermostatModeChange}
                    className="text-xs p-1 border border-slate-300 rounded-md bg-white focus:ring-1 focus:ring-sky-500 focus:border-sky-500 disabled:opacity-50"
                    aria-label={toPersianDigits("انتخاب حالت ترموستات")}
                    disabled={!(device.status as ThermostatStatus).isOn || isLockedByAI}
                >
                    <option value="auto">{toPersianDigits("خودکار")}</option>
                    <option value="heat">{toPersianDigits("گرمایش")}</option>
                    <option value="cool">{toPersianDigits("سرمایش")}</option>
                    <option value="off">{toPersianDigits("خاموش (فقط فن)")}</option>
                </select>
            </div>
          </>
        )}
        {device.type === 'camera' && (device.status as CameraStatus).isStreaming && (
            <button onClick={() => alert(toPersianDigits('نمایش فید دوربین (شبیه‌سازی شده)'))} disabled={isLockedByAI} className="w-full text-xs py-1.5 px-3 rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-colors flex items-center justify-center">
                <EyeIcon className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0"/>{toPersianDigits("مشاهده فید")}
            </button>
        )}
        {device.type === 'smart_speaker' && (
            <>
                <div className="space-y-1">
                    <label htmlFor={`volume-${device.id}`} className="text-xs text-slate-600 block">{toPersianDigits("میزان صدا:")}</label>
                    <input
                        type="range" id={`volume-${device.id}`} min="0" max="100"
                        value={(device.status as SmartSpeakerStatus).volume || 0}
                        onChange={handleSpeakerVolumeChange}
                        disabled={!(device.status as SmartSpeakerStatus).isPlaying || isLockedByAI}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-500 disabled:opacity-50"
                        aria-label={toPersianDigits("تنظیم صدا")}
                    />
                </div>
            </>
        )}
        {device.type === 'air_purifier' && (
            <div className="flex items-center justify-between">
                <label htmlFor={`fanspeed-${device.id}`} className="text-xs text-slate-600">{toPersianDigits("سرعت فن:")}</label>
                <select 
                    id={`fanspeed-${device.id}`} 
                    value={(device.status as AirPurifierStatus).fanSpeed || 'auto'} 
                    onChange={handleAirPurifierSpeedChange}
                    className="text-xs p-1 border border-slate-300 rounded-md bg-white focus:ring-1 focus:ring-sky-500 focus:border-sky-500 disabled:opacity-50"
                    aria-label={toPersianDigits("انتخاب سرعت فن")}
                    disabled={!(device.status as AirPurifierStatus).isOn || isLockedByAI}
                >
                    <option value="auto">{toPersianDigits("خودکار")}</option>
                    <option value="low">{toPersianDigits("کم")}</option>
                    <option value="medium">{toPersianDigits("متوسط")}</option>
                    <option value="high">{toPersianDigits("زیاد")}</option>
                </select>
            </div>
        )}
         {(device.type === 'sensor' || device.type === 'motionSensor' || device.type === 'waterSensor' || device.type === 'waterMeter') && (
            <p className="text-xs text-slate-500 text-center">
                {device.type === 'sensor' && toPersianDigits(`وضعیت فعلی: ${(device.status as SensorStatus).isOpen ? 'باز' : 'بسته'}`)}
                {device.type === 'motionSensor' && toPersianDigits(`وضعیت فعلی: ${(device.status as MotionSensorStatus).isMotionDetected ? 'حرکت تشخیص داده شد' : 'بدون حرکت'}`)}
                {device.type === 'waterSensor' && toPersianDigits(`وضعیت فعلی: ${(device.status as WaterSensorStatus).isLeaking ? 'نشت آب!' : 'خشک'}`)}
                {device.type === 'waterMeter' && toPersianDigits(`جریان: ${toPersianDigits(String((device.status as WaterMeterStatus).flowRate.toFixed(1)))} L/m - مصرف کل: ${toPersianDigits(String((device.status as WaterMeterStatus).totalConsumption.toFixed(1)))} L`)}
            </p>
        )}
      </div>
    </div>
  );
};

export default DeviceCard;
```
    </content>
  </change>
  <change>
    <file>components/smarthome/ScenarioCard.tsx</file>
    <description>Implement ScenarioCard to display predefined smart home scenarios (e.g., "Movie Night", "Good Morning") with dynamic icons and an execution button.</description>
    <content><![CDATA[
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
      case 'ArrowRightOnRectangleIcon': // For "Away Mode" or "Leaving Home"
        return <ArrowRightOnRectangleIcon {...iconProps} />;
      case 'LightbulbIcon': // For custom light scenes
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
```
    </content>
  </change>
  <change>
    <file>components/smarthome/AISuggestionCard.tsx</file>
    <description>Implement AISuggestionCard for displaying AI-generated scenario suggestions. Includes UI for accepting, dismissing, and understanding the rationale behind the suggestion (XAI).</description>
    <content><![CDATA[
import React from 'react';
import { toPersianDigits } from '../../utils';
import { AIScenarioSuggestion } from '../../types/smartHomeTypes'; 
import { LightbulbIcon, CheckCircleIcon, XCircleIcon, SparklesIconNav as AiIcon } from '../shared/AppIcons';

interface AISuggestionCardProps {
  suggestion: AIScenarioSuggestion;
  onAccept: (suggestedScenario: Omit<AIScenarioSuggestion['potentialScenario'], 'id'>) => void;
  onDismiss: (id: string) => void;
  onWhy: (rationale: string) => void; // Callback to show XAI for the rationale
}

const AISuggestionCard: React.FC<AISuggestionCardProps> = ({ suggestion, onAccept, onDismiss, onWhy }) => {
  return (
    <div className="bg-indigo-50 p-4 rounded-xl shadow-sm border border-indigo-200">
      <div className="flex items-start mb-2">
        <div className="p-1.5 bg-yellow-100 rounded-full mr-2 rtl:ml-2 rtl:mr-0 flex-shrink-0">
          <AiIcon className="w-5 h-5 text-yellow-500" />
        </div>
        <div>
            <h4 className="text-sm font-semibold text-indigo-700 mb-1">{toPersianDigits("پیشنهاد هوشمند برای شما")}</h4>
            <p className="text-xs text-gray-600 leading-relaxed">{toPersianDigits(suggestion.suggestionText)}</p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-3 pt-2 border-t border-indigo-100 text-xs">
        <button 
          onClick={() => onWhy(suggestion.rationale)} 
          className="text-indigo-600 hover:underline flex items-center"
          aria-label={toPersianDigits("چرا این پیشنهاد؟")}
        >
          <LightbulbIcon className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0" />
          {toPersianDigits("چرا این پیشنهاد؟")}
        </button>
        <div className="space-x-2 space-x-reverse">
          <button 
            onClick={() => onAccept(suggestion.potentialScenario)} 
            className="bg-green-500 hover:bg-green-600 text-white py-1 px-2.5 rounded-md transition-colors flex items-center text-[10px]"
          >
            <CheckCircleIcon className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0" />
            {toPersianDigits("ایجاد سناریو")}
          </button>
          <button 
            onClick={() => onDismiss(suggestion.id)} 
            className="bg-red-500 hover:bg-red-600 text-white py-1 px-2.5 rounded-md transition-colors flex items-center text-[10px]"
          >
             <XCircleIcon className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0" />
            {toPersianDigits("رد کردن")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AISuggestionCard;
```
    </content>
  </change>
  <change>
    <file>components/smarthome/RoutineCard.tsx</file>
    <description>Implement RoutineCard to display user-defined or AI-suggested routines, showing triggers, action counts, and providing controls to execute, edit, delete, or toggle the enabled state of the routine.</description>
    <content><![CDATA[
import React from 'react';
import { toPersianDigits } from '../../utils';
import { Routine, RoutineTriggerType } from '../../types/smartHomeTypes'; 
import { PlayCircleIcon, PencilIcon, TrashIcon, ClipboardDocumentListIcon, PowerIcon } from '../shared/AppIcons';

interface RoutineCardProps {
  routine: Routine;
  onExecute: (routineId: string) => void;
  onEdit: (routine: Routine) => void;
  onDelete: (routineId: string) => void;
  onToggleEnabled: (routineId: string) => void;
}

const getTriggerDescription = (triggerType: RoutineTriggerType, value: string): string => {
    switch(triggerType) {
        case 'time':
            return `${toPersianDigits("ساعت")} ${toPersianDigits(value)}`;
        case 'event':
            const [eventType, deviceId] = value.split(':');
            return `${toPersianDigits("رویداد")} (${eventType === 'device_on' ? toPersianDigits('روشن شدن') : toPersianDigits('خاموش شدن')} ${toPersianDigits("دستگاه")} ${toPersianDigits(deviceId)})`; 
        case 'location':
            const [locationEvent, zoneId] = value.split(':');
            return `${toPersianDigits("مکان")} (${locationEvent === 'enter' ? toPersianDigits('ورود به') : toPersianDigits('خروج از')} ${toPersianDigits("ناحیه")} ${toPersianDigits(zoneId)})`;
        case 'sunrise_sunset':
            return value === 'sunrise' ? toPersianDigits('طلوع آفتاب') : toPersianDigits('غروب آفتاب');
        default:
            return toPersianDigits('محرک نامشخص');
    }
};

const RoutineCard: React.FC<RoutineCardProps> = ({ routine, onExecute, onEdit, onDelete, onToggleEnabled }) => {
  const triggerText = routine.triggers.map(t => getTriggerDescription(t.type, t.value)).join(toPersianDigits(' و '));

  return (
    <div className={`p-4 rounded-xl shadow border ${routine.isEnabled ? 'bg-white border-gray-200 hover:shadow-lg' : 'bg-gray-100 border-gray-300 opacity-70'} transition-all duration-200`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center">
            <div className={`p-1.5 rounded-full mr-2 rtl:ml-2 rtl:mr-0 ${routine.isEnabled ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-200 text-gray-500'}`}>
                <ClipboardDocumentListIcon className="w-5 h-5" />
            </div>
            <div>
                <h4 className={`text-md font-semibold ${routine.isEnabled ? 'text-slate-800' : 'text-gray-600'}`}>{toPersianDigits(routine.name)}</h4>
                <p className="text-xs text-gray-500">{toPersianDigits(routine.description || 'بدون توضیحات')}</p>
            </div>
        </div>
        <button 
            onClick={() => onToggleEnabled(routine.id)} 
            className={`p-1 rounded-full transition-colors ${routine.isEnabled ? 'text-green-500 hover:bg-green-100' : 'text-red-500 hover:bg-red-100'}`}
            title={routine.isEnabled ? toPersianDigits("غیرفعال کردن روتین") : toPersianDigits("فعال کردن روتین")}
        >
            <PowerIcon className="w-5 h-5" />
        </button>
      </div>

      <p className="text-xs text-gray-500 mb-3">
        <strong>{toPersianDigits("محرک‌ها: ")}</strong>
        {toPersianDigits(triggerText)}
      </p>
      
      <p className="text-xs text-gray-500 mb-3">
        <strong>{toPersianDigits("اقدامات: ")}</strong>
        {toPersianDigits(`${routine.actions.length} اقدام تعریف شده است.`)}
      </p>

      <div className="flex justify-end items-center space-x-2 space-x-reverse pt-2 border-t border-gray-100 text-xs">
        <button
          onClick={() => onExecute(routine.id)}
          disabled={!routine.isEnabled}
          className="flex items-center bg-green-500 hover:bg-green-600 text-white py-1 px-2.5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <PlayCircleIcon className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
          {toPersianDigits("اجرا")}
        </button>
        <button 
          onClick={() => onEdit(routine)}
          className="flex items-center bg-yellow-400 hover:bg-yellow-500 text-gray-800 py-1 px-2.5 rounded-md transition-colors"
        >
          <PencilIcon className="w-3.5 h-3.5 mr-1 rtl:ml-1 rtl:mr-0" />
          {toPersianDigits("ویرایش")}
        </button>
        <button 
          onClick={() => onDelete(routine.id)}
          className="flex items-center bg-red-500 hover:bg-red-600 text-white py-1 px-2.5 rounded-md transition-colors"
        >
           <TrashIcon className="w-3.5 h-3.5 mr-1 rtl:ml-1 rtl:mr-0" />
          {toPersianDigits("حذف")}
        </button>
      </div>
    </div>
  );
};

export default RoutineCard;
```
    </content>
  </change>
  <change>
    <file>components/smarthome/AutomationRuleCard.tsx</file>
    <description>Implement AutomationRuleCard to display automation rules with their conditions and actions. Provides controls for enabling/disabling, editing, and deleting rules. Includes an optional share button for community features.</description>
    <content><![CDATA[
import React from 'react';
import { toPersianDigits } from '../../utils';
import { AutomationRule } from '../../types/smartHomeTypes';
import { CogIcon, PencilIcon, TrashIcon, PlayCircleIcon, PauseIcon, ShareIcon } from '../shared/AppIcons'; // Added ShareIcon

interface AutomationRuleCardProps {
  rule: AutomationRule;
  onToggleEnabled: (id: string) => void;
  onEdit: (rule: AutomationRule) => void;
  onDelete: (id: string) => void;
  onShare?: (itemName: string, itemType: 'روتین' | 'نکته') => void; // Optional share handler
}

const AutomationRuleCard: React.FC<AutomationRuleCardProps> = ({ rule, onToggleEnabled, onEdit, onDelete, onShare }) => {
  // Simplified display for one condition and one action for MVP
  const conditionText = `${rule.condition.deviceId} (${rule.condition.property}) ${rule.condition.operator} ${rule.condition.value !== undefined ? rule.condition.value : ''}`;
  const actionText = rule.actions.length > 0 
    ? `${rule.actions[0].deviceId} -> ${JSON.stringify(rule.actions[0].targetStatus)} ${rule.actions[0].delaySeconds ? `(تاخیر: ${rule.actions[0].delaySeconds} ثانیه)` : ''}`
    : 'اقدامی تعریف نشده';

  return (
    <div className={`p-4 rounded-lg shadow border ${rule.isEnabled ? 'bg-white border-gray-200 hover:shadow-md' : 'bg-gray-100 border-gray-300 opacity-70'}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div className={`p-1.5 rounded-full mr-2 rtl:ml-2 rtl:mr-0 ${rule.isEnabled ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-200 text-gray-500'}`}>
            <CogIcon className="w-5 h-5" />
          </div>
          <h4 className={`text-md font-semibold ${rule.isEnabled ? 'text-slate-800' : 'text-gray-600'}`}>{toPersianDigits(rule.name)}</h4>
        </div>
        <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${rule.isEnabled ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {rule.isEnabled ? toPersianDigits("فعال") : toPersianDigits("غیرفعال")}
        </span>
      </div>

      {rule.description && <p className="text-xs text-gray-500 mb-2 leading-relaxed">{toPersianDigits(rule.description)}</p>}
      
      <div className="text-xs text-gray-600 space-y-1 mb-3 p-2 bg-slate-50 rounded-md border border-slate-200">
        <p><strong>{toPersianDigits("اگر (شرط):")}</strong> {toPersianDigits(conditionText)}</p>
        <p><strong>{toPersianDigits("آنگاه (اقدام):")}</strong> {toPersianDigits(actionText)}</p>
      </div>

      <div className="flex justify-end items-center space-x-2 space-x-reverse pt-2 border-t border-gray-100 text-xs">
        <button
          onClick={() => onToggleEnabled(rule.id)}
          className={`flex items-center py-1 px-2.5 rounded-md transition-colors ${
            rule.isEnabled ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-800' : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
          title={rule.isEnabled ? toPersianDigits("غیرفعال کردن قانون") : toPersianDigits("فعال کردن قانون")}
        >
          {rule.isEnabled ? <PauseIcon className="w-3.5 h-3.5 mr-1 rtl:ml-1 rtl:mr-0" /> : <PlayCircleIcon className="w-3.5 h-3.5 mr-1 rtl:ml-1 rtl:mr-0" />}
          {rule.isEnabled ? toPersianDigits("غیرفعال") : toPersianDigits("فعال")}
        </button>
        <button 
          onClick={() => onEdit(rule)}
          className="flex items-center bg-sky-500 hover:bg-sky-600 text-white py-1 px-2.5 rounded-md transition-colors"
        >
          <PencilIcon className="w-3.5 h-3.5 mr-1 rtl:ml-1 rtl:mr-0" />
          {toPersianDigits("ویرایش")}
        </button>
        <button 
          onClick={() => onDelete(rule.id)}
          className="flex items-center bg-red-500 hover:bg-red-600 text-white py-1 px-2.5 rounded-md transition-colors"
        >
           <TrashIcon className="w-3.5 h-3.5 mr-1 rtl:ml-1 rtl:mr-0" />
          {toPersianDigits("حذف")}
        </button>
        {onShare && (
          <button 
            onClick={() => onShare(rule.name, 'روتین')}
            className="flex items-center bg-purple-500 hover:bg-purple-600 text-white py-1 px-2.5 rounded-md transition-colors"
            title={toPersianDigits("اشتراک‌گذاری در انجمن")}
          >
            <ShareIcon className="w-3.5 h-3.5 mr-1 rtl:ml-1 rtl:mr-0" />
            {toPersianDigits("اشتراک")}
          </button>
        )}
      </div>
    </div>
  );
};

export default AutomationRuleCard;
```
    </content>
  </change>
  <change>
    <file>components/smarthome/AutomationRuleBuilderModal.tsx</file>
    <description>Implement a comprehensive modal for creating and editing automation rules. Allows users to define rule names, descriptions, conditions (based on device, property, operator, value), and actions (target device, property, value, and optional delay). Includes dynamic population of properties and operators based on selected device types.</description>
    <content><![CDATA[
import React, { useState, useEffect, useMemo } from 'react';
import { toPersianDigits } from '../../utils';
import { XMarkIcon, PlusIcon, LightbulbIcon } from '../shared/AppIcons';
import { Device, DeviceType, DeviceStatus } from './DeviceCard'; 
import { WaterSensorStatus } from '../../types/smartHomeTypes';
import { AutomationRule, RuleCondition, RuleAction } from '../../types/smartHomeTypes';

interface RuleBuilderModalInstanceProps { // Renamed Props interface
  isOpen: boolean;
  onClose: () => void;
  onSave: (rule: Omit<AutomationRule, 'id' | 'isEnabled'>) => void;
  devices: Device[];
  initialData?: AutomationRule | null;
}

const propertyLabels: Record<string, string> = {
  isOn: 'روشن/خاموش',
  brightness: 'روشنایی',
  color: 'رنگ',
  targetTemperature: 'دمای هدف',
  currentTemperature: 'دمای فعلی',
  mode: 'حالت',
  isLocked: 'وضعیت قفل',
  isOpen: 'وضعیت درب/پنجره',
  isMotionDetected: 'تشخیص حرکت',
  isStreaming: 'وضعیت پخش ویدیو',
  isPlaying: 'وضعیت پخش صدا',
  volume: 'میزان صدا',
  fanSpeed: 'سرعت فن',
  isLeaking: 'نشت آب',
  flowRate: 'نرخ جریان آب',
  totalConsumption: 'مصرف کل آب',
  isLeakingBasedOnAI: 'تشخیص نشت با AI (آب)',
};

const devicePropertiesMap: Record<DeviceType, { property: keyof DeviceStatus | string; label: string; type: 'boolean' | 'number' | 'string'; operators: RuleCondition['operator'][] }[]> = {
  light: [
    { property: 'isOn', label: 'روشن/خاموش', type: 'boolean', operators: ['is_true', 'is_false', 'equals', 'not_equals'] },
    { property: 'brightness', label: 'روشنایی (۰-۱۰۰)', type: 'number', operators: ['equals', 'greater_than', 'less_than', 'not_equals'] },
  ],
  plug: [
    { property: 'isOn', label: 'روشن/خاموش', type: 'boolean', operators: ['is_true', 'is_false', 'equals', 'not_equals'] },
  ],
  thermostat: [
    { property: 'isOn', label: 'روشن/خاموش ترموستات', type: 'boolean', operators: ['is_true', 'is_false', 'equals', 'not_equals'] },
    { property: 'targetTemperature', label: 'دمای هدف (۱۰-۳۰)', type: 'number', operators: ['equals', 'greater_than', 'less_than', 'not_equals'] },
    { property: 'mode', label: 'حالت', type: 'string', operators: ['equals', 'not_equals'] }, 
  ],
  lock: [
    { property: 'isLocked', label: 'وضعیت قفل', type: 'boolean', operators: ['is_true', 'is_false', 'equals', 'not_equals'] },
  ],
  sensor: [ 
    { property: 'isOpen', label: 'وضعیت درب/پنجره', type: 'boolean', operators: ['is_true', 'is_false', 'equals', 'not_equals'] },
  ],
  motionSensor: [
    { property: 'isMotionDetected', label: 'تشخیص حرکت', type: 'boolean', operators: ['is_true', 'is_false', 'equals', 'not_equals'] },
  ],
  camera: [
    { property: 'isStreaming', label: 'وضعیت پخش ویدیو', type: 'boolean', operators: ['is_true', 'is_false', 'equals', 'not_equals'] },
  ],
  smart_speaker: [
    { property: 'isPlaying', label: 'وضعیت پخش صدا', type: 'boolean', operators: ['is_true', 'is_false', 'equals', 'not_equals'] },
    { property: 'volume', label: 'میزان صدا (۰-۱۰۰)', type: 'number', operators: ['equals', 'greater_than', 'less_than', 'not_equals'] },
  ],
  air_purifier: [
    { property: 'isOn', label: 'روشن/خاموش', type: 'boolean', operators: ['is_true', 'is_false', 'equals', 'not_equals'] },
    { property: 'fanSpeed', label: 'سرعت فن', type: 'string', operators: ['equals', 'not_equals'] }, 
  ],
  waterSensor: [
    { property: 'isLeaking', label: 'نشت آب', type: 'boolean', operators: ['is_true', 'is_false', 'equals', 'not_equals'] },
  ],
  waterMeter: [
    { property: 'flowRate', label: 'نرخ جریان آب (L/m)', type: 'number', operators: ['equals', 'greater_than', 'less_than', 'not_equals'] },
    { property: 'totalConsumption', label: 'مصرف کل آب (L)', type: 'number', operators: ['equals', 'greater_than', 'less_than', 'not_equals'] },
    { property: 'isLeakingBasedOnAI', label: 'تشخیص نشت توسط AI', type: 'boolean', operators: ['is_true', 'is_false'] },
  ],
};

const operatorLabels: Record<RuleCondition['operator'], string> = {
  equals: 'برابر با',
  not_equals: 'مخالف با',
  greater_than: 'بزرگتر از',
  less_than: 'کوچکتر از',
  is_true: 'صحیح است (فعال/روشن/باز/نشت)',
  is_false: 'غلط است (غیرفعال/خاموش/بسته/بدون نشت)',
  changes_to: 'تغییر می‌کند به', // Added
};

// Renamed component
export const RuleBuilderModalInstance: React.FC<RuleBuilderModalInstanceProps> = ({ isOpen, onClose, onSave, devices, initialData }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  
  const [triggerDeviceId, setTriggerDeviceId] = useState<string>('');
  const [triggerProperty, setTriggerProperty] = useState<string>('');
  const [triggerOperator, setTriggerOperator] = useState<RuleCondition['operator']>('equals');
  const [triggerValue, setTriggerValue] = useState<string | number | boolean>('');

  const [actionDeviceId, setActionDeviceId] = useState<string>('');
  const [actionProperty, setActionProperty] = useState<string>('');
  const [actionTargetValue, setActionTargetValue] = useState<string | number | boolean>('');
  const [actionDelaySeconds, setActionDelaySeconds] = useState<string>('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description || '');
      setTriggerDeviceId(initialData.condition.deviceId);
      setTriggerProperty(initialData.condition.property as string);
      setTriggerOperator(initialData.condition.operator);
      setTriggerValue(initialData.condition.value !== undefined ? initialData.condition.value : '');
      
      if (initialData.actions.length > 0) {
        const firstAction = initialData.actions[0];
        setActionDeviceId(firstAction.deviceId);
        const firstActionPropertyKey = Object.keys(firstAction.targetStatus)[0] as keyof DeviceStatus;
        setActionProperty(firstActionPropertyKey as string || '');
        setActionTargetValue(firstActionPropertyKey ? firstAction.targetStatus[firstActionPropertyKey]! : '');
        setActionDelaySeconds(firstAction.delaySeconds?.toString() || '');
      }
    } else {
      setName(''); setDescription('');
      const firstDeviceId = devices.length > 0 ? devices[0].id : '';
      setTriggerDeviceId(firstDeviceId);
      setActionDeviceId(firstDeviceId);
    }
  }, [initialData, isOpen, devices]);

  const selectedTriggerDeviceType = useMemo(() => devices.find(d => d.id === triggerDeviceId)?.type, [triggerDeviceId, devices]);
  const selectedActionDeviceType = useMemo(() => devices.find(d => d.id === actionDeviceId)?.type, [actionDeviceId, devices]);

  const triggerProperties = useMemo(() => selectedTriggerDeviceType ? (devicePropertiesMap[selectedTriggerDeviceType] || []) : [], [selectedTriggerDeviceType]);
  const actionProperties = useMemo(() => selectedActionDeviceType ? (devicePropertiesMap[selectedActionDeviceType] || []) : [], [selectedActionDeviceType]);


  const currentTriggerPropertyDetails = useMemo(() => triggerProperties.find(p => p.property === triggerProperty), [triggerProperties, triggerProperty]);
  const currentActionPropertyDetails = useMemo(() => actionProperties.find(p => p.property === actionProperty), [actionProperties, actionProperty]);
  
  useEffect(() => { if(triggerProperties.length > 0 && !triggerProperties.find(p => p.property === triggerProperty)) { setTriggerProperty(triggerProperties[0].property as string); } setTriggerValue('');}, [triggerDeviceId, triggerProperties, triggerProperty]);
  useEffect(() => { if(actionProperties.length > 0 && !actionProperties.find(p => p.property === actionProperty)) { setActionProperty(actionProperties[0].property as string); } setActionTargetValue('');}, [actionDeviceId, actionProperties, actionProperty]);
  useEffect(() => { if (currentTriggerPropertyDetails) setTriggerOperator(currentTriggerPropertyDetails.operators[0]); }, [currentTriggerPropertyDetails]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !triggerDeviceId || !triggerProperty || !triggerOperator || !actionDeviceId || !actionProperty) {
      alert(toPersianDigits("لطفاً تمام فیلدهای الزامی شرط و اقدام را پر کنید."));
      return;
    }

    let parsedTriggerValue: string | number | boolean = triggerValue;
    if (currentTriggerPropertyDetails?.type === 'boolean') {
      parsedTriggerValue = triggerOperator === 'is_true';
    } else if (currentTriggerPropertyDetails?.type === 'number') {
      parsedTriggerValue = parseFloat(triggerValue as string);
      if (isNaN(parsedTriggerValue)) { alert(toPersianDigits("مقدار شرط باید یک عدد باشد.")); return; }
    }

    let parsedActionTargetValue: string | number | boolean = actionTargetValue;
    if (currentActionPropertyDetails?.type === 'boolean') {
        parsedActionTargetValue = actionTargetValue === 'true' || actionTargetValue === true;
    } else if (currentActionPropertyDetails?.type === 'number') {
      parsedActionTargetValue = parseFloat(actionTargetValue as string);
      if (isNaN(parsedActionTargetValue)) { alert(toPersianDigits("مقدار هدف برای اقدام باید یک عدد باشد.")); return; }
    }

    const ruleToSave: Omit<AutomationRule, 'id' | 'isEnabled'> = {
      name,
      description,
      condition: {
        deviceId: triggerDeviceId,
        property: triggerProperty,
        operator: triggerOperator,
        value: (currentTriggerPropertyDetails?.type === 'boolean' && (triggerOperator === 'is_true' || triggerOperator === 'is_false')) ? undefined : parsedTriggerValue,
      },
      actions: [{
        deviceId: actionDeviceId,
        targetStatus: { [actionProperty]: parsedActionTargetValue } as Partial<DeviceStatus>,
        delaySeconds: actionDelaySeconds ? parseInt(actionDelaySeconds, 10) : undefined,
      }],
    };
    onSave(ruleToSave);
  };

  if (!isOpen) return null;

  const renderValueInput = (
    propertyDetails: { type: 'boolean' | 'number' | 'string' } | undefined, 
    currentValue: string | number | boolean, 
    onChange: (value: string | number | boolean) => void,
    isActionInput: boolean = false, 
    operator?: RuleCondition['operator']
  ) => {
    if (!propertyDetails) return null;

    if (propertyDetails.type === 'boolean') {
        if (!isActionInput && (operator === 'is_true' || operator === 'is_false')) return null; 
        return (
            <select value={String(currentValue)} onChange={(e) => onChange(e.target.value === 'true')} className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-gray-200 text-xs">
                <option value="true">{toPersianDigits("صحیح (روشن/فعال/بله/نشت)")}</option>
                <option value="false">{toPersianDigits("غلط (خاموش/غیرفعال/خیر/بدون نشت)")}</option>
            </select>
        );
    } else if (propertyDetails.type === 'number') {
      return <input type="number" value={String(currentValue)} onChange={(e) => onChange(e.target.value)} className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-gray-200 text-xs" placeholder={toPersianDigits("مقدار عددی")}/>;
    }
    return <input type="text" value={String(currentValue)} onChange={(e) => onChange(e.target.value)} className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-gray-200 text-xs" placeholder={toPersianDigits("مقدار متنی")}/>;
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[1001] p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="rule-builder-modal-title">
      <div className="bg-slate-800 p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-slate-700 modal-scroll-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6"><h2 id="rule-builder-modal-title" className="text-xl font-semibold text-sky-300">{toPersianDigits(initialData ? "ویرایش قانون" : "ایجاد قانون اتوماسیون جدید")}</h2><button onClick={onClose} className="text-gray-400 hover:text-gray-200"><XMarkIcon className="w-7 h-7" /></button></div>
        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            <div>
                <label htmlFor="ruleName" className="block text-xs font-medium text-sky-400 mb-1">{