
// types/smartHomeTypes.ts
import React from 'react';
// DeviceCard already defines DeviceStatus and DeviceType, but for clarity and future expansion,
// we can redefine them here or ensure DeviceCard exports them properly for use in SmartHomePage.
// For now, assuming DeviceStatus from DeviceCard is comprehensive enough.
// If not, we'd define specific status interfaces here like LightStatus, ThermostatStatus, etc.
import { DeviceStatusMap as ActualDeviceStatusMap, DeviceType as ActualDeviceType } from '../components/smarthome/DeviceCard'; // Assuming DeviceCard exports these

export type DeviceType = ActualDeviceType;
export type DeviceStatus = ActualDeviceStatusMap[ActualDeviceType];


export interface EnergyUsage {
  currentWatts?: number;
  last24hKwh?: number;
  monthlyKwh?: number;
}

export interface LightStatus {
  isOn: boolean;
  brightness?: number; // 0-100
  color?: string; // hex string e.g., '#FF0000'
  colorTemperature?: number; // Kelvin, e.g., 2700-6500
  isLockedByAI?: boolean; 
}

export interface PlugStatus {
  isOn: boolean;
  isLockedByAI?: boolean;
}

export interface ThermostatStatus {
  isOn: boolean; 
  targetTemperature: number; // Celsius
  currentTemperature?: number; // Celsius
  mode: 'heat' | 'cool' | 'auto' | 'off' | 'fan_only';
  fanSpeed?: 'auto' | 'low' | 'medium' | 'high';
  humidity?: number; // Percentage
  isLockedByAI?: boolean;
}

export interface LockStatus {
  isLocked: boolean;
  isJammed?: boolean;
  batteryLevel?: number; // 0-100
  isLockedByAI?: boolean;
}

export interface SensorStatus { // For door/window sensors
  isOpen: boolean;
  lastOpened?: string; // ISO timestamp
  batteryLevel?: number;
  isLockedByAI?: boolean; 
}

export interface MotionSensorStatus {
  isMotionDetected: boolean;
  lastMotionTime?: string; // ISO timestamp
  batteryLevel?: number;
  isLockedByAI?: boolean;
}

export interface CameraStatus {
  isStreaming: boolean;
  isRecording?: boolean;
  motionDetected?: boolean;
  feedUrl?: string; 
  storageRemaining?: number; // Percentage or GB
  isLockedByAI?: boolean;
}

export interface SmartSpeakerStatus {
  isPlaying: boolean;
  volume?: number; // 0-100
  currentTrack?: string;
  currentSource?: string; 
  isMuted?: boolean;
  isLockedByAI?: boolean;
}

export interface AirPurifierStatus {
  isOn: boolean;
  fanSpeed?: 'auto' | 'low' | 'medium' | 'high' | 'sleep';
  airQualityIndex?: number; 
  filterLife?: number; // Percentage remaining
  mode?: 'auto' | 'manual' | 'sleep';
  isLockedByAI?: boolean;
}

export interface WaterSensorStatus {
  isLeaking: boolean;
  lastChecked?: string; // ISO timestamp
  batteryLevel?: number;
  isLockedByAI?: boolean;
}

export interface WaterMeterStatus {
  flowRate: number; // Liters per minute
  totalConsumption: number; // Total liters or cubic meters
  lastReadingTime?: string; // ISO timestamp
  isLeakingBasedOnAI?: boolean; 
  isLockedByAI?: boolean;
}

export interface BlindsStatus {
  position: number; // 0 (closed) to 100 (fully open)
  tiltAngle?: number; // For Venetian blinds, -90 to 90
  isMoving?: boolean;
  isLockedByAI?: boolean;
}

export interface ApplianceStatus { // Generic appliance
  isOn: boolean;
  mode?: string; // e.g., "brewing", "washing_heavy"
  timeRemainingSeconds?: number;
  progressPercentage?: number; // 0-100
  isLockedByAI?: boolean;
}


export type DeviceStatusMap = {
  light: LightStatus;
  plug: PlugStatus;
  thermostat: ThermostatStatus;
  lock: LockStatus;
  sensor: SensorStatus;
  motionSensor: MotionSensorStatus;
  camera: CameraStatus;
  smart_speaker: SmartSpeakerStatus;
  air_purifier: AirPurifierStatus;
  waterSensor: WaterSensorStatus;
  waterMeter: WaterMeterStatus;
  blinds: BlindsStatus;
  appliance: ApplianceStatus;
};

export interface Device<T extends DeviceType = DeviceType> {
  id: string;
  name: string;
  type: T;
  roomId: string; 
  status: DeviceStatusMap[T];
  energyUsage?: EnergyUsage;
  errorStatus?: string; 
  connectionIssues?: boolean; 
  lastChanged?: string; 
  isFavorite?: boolean;
  simulatedOperationalHours?: number; 
  estimatedLifetimeHours?: number;    
}


// --- Scenario & Automation Types ---
export interface RuleAction {
  deviceId: string;
  targetStatus: Partial<DeviceStatus>; 
  delaySeconds?: number; 
}

export interface Scenario {
  id: string;
  name: string;
  description?: string;
  iconName?: string; 
  actions: RuleAction[]; 
  isUserDefined?: boolean;
  executionCount?: number;
  lastExecuted?: string; 
  exportData?: string; 
}

export interface AIScenarioSuggestion {
  id: string; 
  suggestionText: string; 
  rationale: string; 
  potentialScenario: Omit<Scenario, 'id'>; 
  confidenceScore?: number; 
}

export type RoutineTriggerType = 
  | 'time' 
  | 'event' 
  | 'location' 
  | 'sunrise_sunset' 
  | 'manual' 
  | 'voice_command';

export interface RoutineTrigger {
  type: RoutineTriggerType;
  value: string; 
}

export interface Routine {
  id: string;
  name: string;
  description?: string;
  iconName?: string; 
  triggers: RoutineTrigger[];
  actions: RuleAction[];
  isEnabled: boolean;
  lastExecuted?: string; 
  isUserDefined?: boolean;
  isAISuggested?: boolean;
}

export type RuleConditionOperator = 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'is_true' | 'is_false' | 'changes_to';

export interface RuleCondition {
  deviceId: string;
  property: keyof DeviceStatus | string; 
  operator: RuleConditionOperator;
  value?: string | number | boolean; 
}
export interface MultipleConditions {
    conditions: RuleCondition[];
    logic: 'AND' | 'OR'; 
}

export interface AutomationRule {
  id: string;
  name: string;
  description?: string;
  condition: RuleCondition | MultipleConditions; 
  actions: RuleAction[]; 
  isEnabled: boolean;
  lastTriggered?: string; 
  triggerCount?: number;
  isUserDefined?: boolean;
  isAISuggested?: boolean;
  tags?: string[];
}

export interface AIRuleSuggestion {
  id: string;
  title: string;
  description: string;
  suggestedRule: Omit<AutomationRule, 'id' | 'isEnabled'>; 
  xaiRationale: string;
  confidenceScore?: number;
}

// --- Energy & Sustainability Types ---
export interface EnergySavingSuggestion {
  id: string;
  title: string;
  description: string;
  potentialSavings: string; 
  rationale: string; 
  actionType?: 'create_rule' | 'change_setting' | 'user_behavior';
  actionDetails?: Omit<AutomationRule, 'id' | 'isEnabled'> | { deviceId: string; setting: Partial<DeviceStatus> } | string;
  difficulty?: 'آسان' | 'متوسط' | 'پیشرفته';
  relatedDeviceIds?: string[];
}

export interface CarbonFootprintInputs {
    monthlyElectricityKwh?: number;
    gasUsageTherms?: number; 
    waterUsageLiters?: number;
    recyclingPercentage?: number; 
    transportMode?: 'car_gasoline' | 'car_electric' | 'public_transport' | 'bicycle_walk';
    transportDistanceKmPerWeek?: number;
    dietType?: 'vegan' | 'vegetarian' | 'omnivore_low_meat' | 'omnivore_high_meat';
    wasteProductionKgPerWeek?: number;
}

export interface CarbonFootprintOutput {
    totalMonthlyCo2Kg?: number;
    breakdown?: {
        electricityCo2Kg?: number;
        gasCo2Kg?: number;
        transportCo2Kg?: number;
        dietCo2Kg?: number;
        wasteCo2Kg?: number;
    };
    aiSuggestionsForReduction?: string[];
    aiWeeklyChallenge?: string;
    comparisonToAveragePercent?: number; 
}

// --- Maintenance Types ---
export interface MaintenanceSchedule {
  id: string;
  deviceId: string; 
  deviceName?: string; 
  taskName: string; 
  lastPerformedDate?: string; 
  frequencyDays: number; 
  nextDueDate?: string; 
  notes?: string;
  isOverdue?: boolean; 
  isAISuggested?: boolean; 
  aiPredictionRationale?: string; 
}

// --- Home Health & Anomaly Types ---
export interface HomeHealthScoreFactor {
  factor: string; 
  score?: number;  
  status?: 'عالی' | 'خوب' | 'متوسط' | 'نیاز به توجه' | 'ضعیف'; 
  recommendation: string; 
  icon: React.ReactElement<{className?: string}>;
  details?: string; 
}

export type AnomalyType = 
  | 'water_leak' 
  | 'appliance_malfunction' 
  | 'open_window_rain' 
  | 'security_breach' 
  | 'smoke_detected' 
  | 'co_detected'
  | 'unusual_activity' 
  | 'high_energy_consumption_spike'
  | 'device_offline_critical'
  | 'low_battery_critical';

export interface AnomalyAlert {
  id: string;
  type: AnomalyType;
  title: string;
  description: string;
  timestamp: string; 
  severity: 'critical' | 'warning' | 'info';
  suggestedAction?: string;
  relatedDeviceId?: string;
  relatedDeviceName?: string;
  acknowledged?: boolean;
  userFeedback?: 'helpful' | 'not_helpful';
  aiGenerated?: boolean; 
}


// --- Community Features ---
export interface SustainabilityChallenge {
  id: string;
  title: string;
  description: string;
  duration: string; 
  rewardPoints: number;
  status?: 'active' | 'completed' | 'upcoming';
  progress?: number; 
  category: 'energy' | 'water' | 'waste' | 'transport';
  participantsCount?: number;
}

export interface CommunityComparisonData {
  userScoreType: 'home_health' | 'energy_efficiency' | 'carbon_footprint';
  userScore: number; 
  communityAverageScore: number;
  aiInsight: string; 
  rankPercentile?: number; 
}

export interface UserEnergyData {
  currentMonthKwh: number;
  lastMonthKwh?: number; 
  communityAverageKwh: number;
  aiEnergyInsight: string;
  peakUsageTime?: string; 
  biggestConsumerDevice?: string; 
}

export type CommunityFeedItemType = 'روتین اتوماسیون' | 'نکته صرفه‌جویی در انرژی' | 'ایده خانه هوشمند' | 'هشدار امنیتی جامعه' | 'چالش پایداری';

export interface CommunityFeedItem {
  id: string;
  type: CommunityFeedItemType;
  title: string;
  content: string; 
  authorName?: string; 
  authorId?: string;
  isAnonymous: boolean;
  timestamp: string; 
  upvotes?: number;
  commentsCount?: number;
  relatedItemId?: string; 
  tags?: string[];
}


// --- General Smart Home Context ---
export type PlatformConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error' | 'simulated';

export type PresenceStatus = 
  | 'user_only_home' 
  | 'family_home_user_away'
  | 'all_family_home' 
  | 'all_family_away' 
  | 'children_only_home' 
  | 'guests_present'
  | 'unknown';

export interface AIActionLogEntry {
  id: string;
  timestamp: string; 
  actionText: string; 
  reason?: string; 
  userFeedback?: 'positive' | 'negative' | 'neutral' | null;
  relatedRuleId?: string;
  relatedDeviceId?: string;
}
```
    </content>
  </change>
  <change>
    <file>components/smarthome/DeviceCard.tsx</file>
    <description>Enhance DeviceCard to handle various device types (light, plug, thermostat, lock, sensor, camera, speaker, air purifier, water sensor/meter, blinds, appliance) and their specific statuses. Includes UI elements for controlling these statuses and displaying energy usage or error states. Implements visual feedback for AI-locked devices.</description>
    <content><![CDATA[
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
    BoltIcon as AirPurifierIcon, 
    EyeIcon, 
    EyeSlashIcon, 
    PlayIcon as PlaySpeakerIcon,
    PauseIcon as PauseSpeakerIcon,
    CogIcon, 
    AdjustmentsVerticalIcon as BlindsIcon, 
    WrenchScrewdriverIcon as ApplianceIcon, 
} from '../shared/AppIcons';
import { 
    DeviceType, 
    DeviceStatusMap, 
    Device as SmartHomeDevice, // Renamed to avoid conflict with global Device type if any
    LightStatus, 
    PlugStatus, 
    ThermostatStatus, 
    LockStatus, 
    SensorStatus, 
    MotionSensorStatus, 
    CameraStatus, 
    SmartSpeakerStatus, 
    AirPurifierStatus, 
    WaterSensorStatus, 
    WaterMeterStatus,
    BlindsStatus,
    ApplianceStatus
} from '../../types/smartHomeTypes'; 

interface DeviceCardProps {
  device: SmartHomeDevice;
  onStatusChange: (deviceId: string, deviceType: DeviceType, newStatus: Partial<DeviceStatusMap[DeviceType]>) => void;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device, onStatusChange }) => {
  const status = device.status as DeviceStatusMap[typeof device.type]; 
  const isLockedByAI = 'isLockedByAI' in status && status.isLockedByAI;

  const handleToggle = () => {
    if (isLockedByAI) return;
    if ('isOn' in status && (device.type === 'light' || device.type === 'plug' || device.type === 'thermostat' || device.type === 'air_purifier' || device.type === 'appliance')) {
      onStatusChange(device.id, device.type, { isOn: !status.isOn } as any);
    } else if (device.type === 'lock' && 'isLocked' in status) {
      onStatusChange(device.id, device.type, { isLocked: !status.isLocked } as Partial<LockStatus>);
    } else if (device.type === 'camera' && 'isStreaming' in status) {
      onStatusChange(device.id, device.type, { isStreaming: !status.isStreaming } as Partial<CameraStatus>);
    } else if (device.type === 'smart_speaker' && 'isPlaying' in status) {
      onStatusChange(device.id, device.type, { isPlaying: !status.isPlaying } as Partial<SmartSpeakerStatus>);
    }
  };

  const handleBrightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isLockedByAI || device.type !== 'light') return;
    const newBrightness = parseInt(e.target.value, 10);
    onStatusChange(device.id, device.type, { brightness: newBrightness });
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isLockedByAI || device.type !== 'light') return;
    onStatusChange(device.id, device.type, { color: e.target.value });
  };
  
  const handleColorTempChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isLockedByAI || device.type !== 'light') return;
    const newTemp = parseInt(e.target.value, 10);
    onStatusChange(device.id, device.type, { colorTemperature: newTemp });
  };

  const handleTemperatureChange = (increment: boolean) => {
    if (isLockedByAI || device.type !== 'thermostat') return;
    const currentTemp = (status as ThermostatStatus).targetTemperature;
    const newTemp = increment ? currentTemp + 1 : currentTemp - 1;
    if (newTemp >= 10 && newTemp <= 30) { 
      onStatusChange(device.id, device.type, { targetTemperature: newTemp });
    }
  };

  const handleThermostatModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (isLockedByAI || device.type !== 'thermostat') return;
    onStatusChange(device.id, device.type, { mode: e.target.value as ThermostatStatus['mode'] });
  };

  const handleSpeakerVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isLockedByAI || device.type !== 'smart_speaker') return;
    onStatusChange(device.id, device.type, { volume: parseInt(e.target.value, 10) });
  };

  const handleAirPurifierSpeedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (isLockedByAI || device.type !== 'air_purifier') return;
    onStatusChange(device.id, device.type, { fanSpeed: e.target.value as AirPurifierStatus['fanSpeed'] });
  };

  const handleBlindsPositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isLockedByAI || device.type !== 'blinds') return;
    onStatusChange(device.id, device.type, { position: parseInt(e.target.value, 10) });
  };

  const handleApplianceModeChange = (newMode: string) => { 
    if (isLockedByAI || device.type !== 'appliance') return;
    onStatusChange(device.id, device.type, { mode: newMode });
  };


  const getDeviceIcon = () => { 
    const iconPropsBase = { className: "w-6 h-6" };
    switch (device.type) {
      case 'light': return <LightbulbIcon {...iconPropsBase} className={`${iconPropsBase.className} text-slate-700`}/>;
      case 'plug': return <PowerIcon {...iconPropsBase} className={`${iconPropsBase.className} text-slate-700`}/>;
      case 'thermostat': return <FireIcon {...iconPropsBase} className={`${iconPropsBase.className} text-slate-700`}/>;
      case 'lock': return (status as LockStatus).isLocked ? <LockClosedIcon {...iconPropsBase} className={`${iconPropsBase.className} text-green-600`}/> : <LockOpenIcon {...iconPropsBase} className={`${iconPropsBase.className} text-red-600`} />;
      case 'sensor': return <ShieldCheckIcon {...iconPropsBase} className={`${iconPropsBase.className} ${(status as SensorStatus).isOpen ? 'text-red-500' : 'text-green-500'}`}/>;
      case 'motionSensor': return <ShieldCheckIcon {...iconPropsBase} className={`${iconPropsBase.className} ${(status as MotionSensorStatus).isMotionDetected ? 'text-red-600' : 'text-green-600'}`}/>;
      case 'camera': return <SmartHomeCameraIcon {...iconPropsBase} className={`${iconPropsBase.className} text-slate-700`} />;
      case 'smart_speaker': return <SmartSpeakerIcon {...iconPropsBase} className={`${iconPropsBase.className} text-slate-700`} />;
      case 'air_purifier': return <AirPurifierIcon {...iconPropsBase} className={`${iconPropsBase.className} text-slate-700`} />;
      case 'waterSensor': return <ShieldExclamationIcon {...iconPropsBase} className={`${iconPropsBase.className} ${(status as WaterSensorStatus).isLeaking ? 'text-red-600' : 'text-blue-500'}`} />;
      case 'waterMeter': return <ShieldExclamationIcon {...iconPropsBase} className={`${iconPropsBase.className} ${(status as WaterMeterStatus).isLeakingBasedOnAI ? 'text-orange-500' : 'text-blue-500'}`} />;
      case 'blinds': return <BlindsIcon {...iconPropsBase} className={`${iconPropsBase.className} text-slate-700`} />;
      case 'appliance': return <ApplianceIcon {...iconPropsBase} className={`${iconPropsBase.className} text-slate-700`} />;
      default: return null;
    }
  };

  const renderStatus = () => { 
    let statusText = '';
    let statusClass = 'bg-gray-100 text-gray-700';
    let details = '';

    if (isLockedByAI) {
        statusText = "محدود توسط AI";
        statusClass = 'bg-orange-100 text-orange-700';
        return <span className={`text-xs px-2 py-0.5 rounded-full ${statusClass}`}>{toPersianDigits(statusText)}</span>;
    }

    if ('isOn' in status && (device.type === 'light' || device.type === 'plug' || device.type === 'thermostat' || device.type === 'air_purifier' || device.type === 'appliance')) {
      statusText = status.isOn ? "روشن" : "خاموش";
      statusClass = status.isOn ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';
      if (device.type === 'light' && (status as LightStatus).brightness !== undefined) {
        details += ` - ${toPersianDigits("روشنایی:")} ${toPersianDigits(String((status as LightStatus).brightness))}%`;
      }
      if (device.type === 'thermostat') {
        details += ` - ${toPersianDigits("هدف:")} ${toPersianDigits(String((status as ThermostatStatus).targetTemperature))}°C`;
        if((status as ThermostatStatus).currentTemperature !== undefined) {
            details += ` (${toPersianDigits("فعلی:")} ${toPersianDigits(String((status as ThermostatStatus).currentTemperature))}°C)`;
        }
      }
      if (device.type === 'air_purifier') {
        details += ` - ${toPersianDigits("سرعت فن:")} ${toPersianDigits(String((status as AirPurifierStatus).fanSpeed))}`;
        if ((status as AirPurifierStatus).airQualityIndex !== undefined) {
          details += ` - ${toPersianDigits("AQI:")} ${toPersianDigits(String((status as AirPurifierStatus).airQualityIndex))}`;
        }
      }
      if (device.type === 'appliance' && (status as ApplianceStatus).mode) {
        details += ` - ${toPersianDigits("حالت:")} ${toPersianDigits((status as ApplianceStatus).mode!)}`;
      }
    } else if (device.type === 'lock' && 'isLocked' in status) {
        statusText = (status as LockStatus).isLocked ? "قفل" : "باز";
        statusClass = (status as LockStatus).isLocked ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700';
    } else if (device.type === 'sensor' && 'isOpen' in status) { 
        statusText = (status as SensorStatus).isOpen ? "باز" : "بسته";
        statusClass = (status as SensorStatus).isOpen ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700';
    } else if (device.type === 'motionSensor' && 'isMotionDetected' in status) {
        statusText = (status as MotionSensorStatus).isMotionDetected ? "حرکت تشخیص داده شد" : "بدون حرکت";
        statusClass = (status as MotionSensorStatus).isMotionDetected ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700';
    } else if (device.type === 'camera' && 'isStreaming' in status) {
        statusText = (status as CameraStatus).isStreaming ? "در حال پخش" : "متوقف";
        statusClass = (status as CameraStatus).isStreaming ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700';
    } else if (device.type === 'smart_speaker' && 'isPlaying' in status) {
        statusText = (status as SmartSpeakerStatus).isPlaying ? "در حال پخش" : "متوقف";
        statusClass = (status as SmartSpeakerStatus).isPlaying ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700';
        if ((status as SmartSpeakerStatus).isPlaying && (status as SmartSpeakerStatus).currentTrack) {
          details += ` - ${toPersianDigits((status as SmartSpeakerStatus).currentTrack!)}`;
        }
         if ((status as SmartSpeakerStatus).volume !== undefined) {
            details += ` (${toPersianDigits("صدا:")} ${toPersianDigits(String((status as SmartSpeakerStatus).volume))}% )`;
        }
    } else if (device.type === 'waterSensor' && 'isLeaking' in status) {
        statusText = (status as WaterSensorStatus).isLeaking ? "نشت آب!" : "خشک";
        statusClass = (status as WaterSensorStatus).isLeaking ? 'bg-red-100 text-red-700 font-bold' : 'bg-green-100 text-green-700';
    } else if (device.type === 'waterMeter' && 'flowRate' in status) {
        const meterStatus = status as WaterMeterStatus;
        statusText = meterStatus.isLeakingBasedOnAI ? "احتمال نشت (AI)" : `${toPersianDigits("جریان:")} ${toPersianDigits(meterStatus.flowRate.toFixed(1))} ${toPersianDigits("L/m")}`;
        statusClass = meterStatus.isLeakingBasedOnAI ? 'bg-orange-100 text-orange-700 font-bold' : 'bg-blue-100 text-blue-700';
        details = ` - ${toPersianDigits("مصرف کل:")} ${toPersianDigits(meterStatus.totalConsumption.toFixed(1))} L`;
    } else if (device.type === 'blinds' && 'position' in status) {
        statusText = `${toPersianDigits("موقعیت:")} ${toPersianDigits(String((status as BlindsStatus).position))}%`;
        statusClass = 'bg-gray-100 text-gray-700';
        if ((status as BlindsStatus).tiltAngle !== undefined) {
            details += ` - ${toPersianDigits("زاویه:")} ${toPersianDigits(String((status as BlindsStatus).tiltAngle))}°`;
        }
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
        {(('isOn' in status && (device.type === 'light' || device.type === 'plug' || device.type === 'thermostat' || device.type === 'air_purifier' || device.type === 'appliance')) || 
          (device.type === 'lock' && 'isLocked' in status) ||
          (device.type === 'camera' && 'isStreaming' in status) ||
          (device.type === 'smart_speaker' && 'isPlaying' in status)
        ) && (
          <button
            onClick={handleToggle}
            disabled={isLockedByAI}
            className={`w-full text-xs py-1.5 px-3 rounded-md font-medium transition-colors ${
              (device.type === 'lock' ? !(status as LockStatus).isLocked : 
               device.type === 'camera' ? !(status as CameraStatus).isStreaming :
               device.type === 'smart_speaker' ? !(status as SmartSpeakerStatus).isPlaying :
               !(status as { isOn: boolean }).isOn) 
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
          >
            {device.type === 'lock' 
                ? ((status as LockStatus).isLocked ? toPersianDigits("باز کردن") : toPersianDigits("قفل کردن"))
                : device.type === 'camera'
                ? ((status as CameraStatus).isStreaming ? toPersianDigits("توقف پخش") : toPersianDigits("شروع پخش"))
                : device.type === 'smart_speaker'
                ? ((status as SmartSpeakerStatus).isPlaying ? toPersianDigits("توقف پخش") : toPersianDigits("پخش موزیک"))
                : (('isOn' in status && status.isOn) ? toPersianDigits("خاموش کردن") : toPersianDigits("روشن کردن"))
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
                value={(status as LightStatus).brightness || 0}
                onChange={handleBrightnessChange}
                disabled={!(status as LightStatus).isOn || isLockedByAI}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-500 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label={toPersianDigits("تنظیم روشنایی")}
              />
            </div>
            <div className="flex items-center justify-between space-x-2 rtl:space-x-reverse">
                <label htmlFor={`color-${device.id}`} className="text-xs text-slate-600 block whitespace-nowrap">{toPersianDigits("رنگ:")}</label>
                <input
                    type="color"
                    id={`color-${device.id}`}
                    value={(status as LightStatus).color || '#FFFFFF'}
                    onChange={handleColorChange}
                    disabled={!(status as LightStatus).isOn || isLockedByAI}
                    className="w-8 h-8 p-0 border-none rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label={toPersianDigits("انتخاب رنگ نور")}
                />
                <span className="text-xs text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md">{(status as LightStatus).color || '#FFFFFF'}</span>
            </div>
            {(status as LightStatus).colorTemperature !== undefined && (
              <div className="space-y-1">
                <label htmlFor={`colortemp-${device.id}`} className="text-xs text-slate-600 block">{toPersianDigits("دمای رنگ (K):")}</label>
                <input
                  type="range" id={`colortemp-${device.id}`} min="2700" max="6500" step="100"
                  value={(status as LightStatus).colorTemperature || 4000}
                  onChange={handleColorTempChange}
                  disabled={!(status as LightStatus).isOn || isLockedByAI}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500 disabled:opacity-50"
                  aria-label={toPersianDigits("تنظیم دمای رنگ")}
                />
                <span className="text-xs text-slate-500">{toPersianDigits(String((status as LightStatus).colorTemperature || 4000))}K</span>
              </div>
            )}
          </>
        )}

        {device.type === 'thermostat' && (
          <>
             {'isOn' in status && (
                <button
                    onClick={handleToggle}
                    disabled={isLockedByAI}
                    className={`w-full text-xs py-1.5 px-3 rounded-md font-medium transition-colors ${
                    !(status as ThermostatStatus).isOn
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-red-500 hover:bg-red-600 text-white'
                    }`}
                >
                    {(status as ThermostatStatus).isOn ? toPersianDigits("خاموش کردن ترموستات") : toPersianDigits("روشن کردن ترموستات")}
                </button>
            )}
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-600">{toPersianDigits("دمای هدف:")}</span>
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                <button onClick={() => handleTemperatureChange(false)} className="p-1 bg-slate-200 hover:bg-slate-300 rounded-full text-slate-700" aria-label={toPersianDigits("کاهش دما")} disabled={!(status as ThermostatStatus).isOn || isLockedByAI}><ChevronDownIcon className="w-4 h-4"/></button>
                <span className="text-sm font-medium text-slate-700 w-8 text-center">{toPersianDigits(String((status as ThermostatStatus).targetTemperature))}°</span>
                <button onClick={() => handleTemperatureChange(true)} className="p-1 bg-slate-200 hover:bg-slate-300 rounded-full text-slate-700" aria-label={toPersianDigits("افزایش دما")} disabled={!(status as ThermostatStatus).isOn || isLockedByAI}><ChevronUpIcon className="w-4 h-4"/></button>
              </div>
            </div>
             <div className="flex items-center justify-between">
                <label htmlFor={`mode-${device.id}`} className="text-xs text-slate-600">{toPersianDigits("حالت:")}</label>
                <select 
                    id={`mode-${device.id}`} 
                    value={(status as ThermostatStatus).mode} 
                    onChange={handleThermostatModeChange}
                    className="text-xs p-1 border border-slate-300 rounded-md bg-white focus:ring-1 focus:ring-sky-500 focus:border-sky-500 disabled:opacity-50"
                    aria-label={toPersianDigits("انتخاب حالت ترموستات")}
                    disabled={!(status as ThermostatStatus).isOn || isLockedByAI}
                >
                    <option value="auto">{toPersianDigits("خودکار")}</option>
                    <option value="heat">{toPersianDigits("گرمایش")}</option>
                    <option value="cool">{toPersianDigits("سرمایش")}</option>
                    <option value="off">{toPersianDigits("خاموش (فقط فن)")}</option>
                </select>
            </div>
          </>
        )}
        {device.type === 'camera' && (status as CameraStatus).isStreaming && (
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
                        value={(status as SmartSpeakerStatus).volume || 0}
                        onChange={handleSpeakerVolumeChange}
                        disabled={!(status as SmartSpeakerStatus).isPlaying || isLockedByAI}
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
                    value={(status as AirPurifierStatus).fanSpeed || 'auto'} 
                    onChange={handleAirPurifierSpeedChange}
                    className="text-xs p-1 border border-slate-300 rounded-md bg-white focus:ring-1 focus:ring-sky-500 focus:border-sky-500 disabled:opacity-50"
                    aria-label={toPersianDigits("انتخاب سرعت فن")}
                    disabled={!(status as AirPurifierStatus).isOn || isLockedByAI}
                >
                    <option value="auto">{toPersianDigits("خودکار")}</option>
                    <option value="low">{toPersianDigits("کم")}</option>
                    <option value="medium">{toPersianDigits("متوسط")}</option>
                    <option value="high">{toPersianDigits("زیاد")}</option>
                </select>
            </div>
        )}
         {device.type === 'blinds' && (
          <div className="space-y-1">
            <label htmlFor={`blinds-pos-${device.id}`} className="text-xs text-slate-600 block">{toPersianDigits("موقعیت پرده (۰-۱۰۰٪ باز):")}</label>
            <input
              type="range" id={`blinds-pos-${device.id}`} min="0" max="100"
              value={(status as BlindsStatus).position || 0}
              onChange={handleBlindsPositionChange}
              disabled={isLockedByAI}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-gray-500 disabled:opacity-50"
              aria-label={toPersianDigits("تنظیم موقعیت پرده")}
            />
          </div>
        )}
        {device.type === 'appliance' && 'isOn' in status && (status as ApplianceStatus).mode && (
             <p className="text-xs text-slate-500 text-center">{toPersianDigits(`حالت فعلی: ${(status as ApplianceStatus).mode}`)}</p>
        )}

         {(device.type === 'sensor' || device.type === 'motionSensor' || device.type === 'waterSensor' || device.type === 'waterMeter') && (
            <p className="text-xs text-slate-500 text-center">
                {device.type === 'sensor' && toPersianDigits(`وضعیت فعلی: ${(status as SensorStatus).isOpen ? 'باز' : 'بسته'}`)}
                {device.type === 'motionSensor' && toPersianDigits(`وضعیت فعلی: ${(status as MotionSensorStatus).isMotionDetected ? 'حرکت تشخیص داده شد' : 'بدون حرکت'}`)}
                {device.type === 'waterSensor' && toPersianDigits(`وضعیت فعلی: ${(status as WaterSensorStatus).isLeaking ? 'نشت آب!' : 'خشک'}`)}
                {device.type === 'waterMeter' && toPersianDigits(`جریان: ${toPersianDigits(String((status as WaterMeterStatus).flowRate.toFixed(1)))} L/m - مصرف کل: ${toPersianDigits(String((status as WaterMeterStatus).totalConsumption.toFixed(1)))} L`)}
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
</changes>```
Okay, I've started the comprehensive implementation for the Smart Home page by setting up the foundational types and the `DeviceCard` component.

**Key Changes:**

1.  **`types/smartHomeTypes.ts`**:
    *   A comprehensive set of TypeScript types has been defined. This includes:
        *   `DeviceType`: An enum-like type for all supported smart home devices (light, plug, thermostat, lock, various sensors, camera, speaker, air purifier, water meter, blinds, generic appliance).
        *   Specific status interfaces for each device type (e.g., `LightStatus`, `ThermostatStatus`, `LockStatus`, `WaterSensorStatus`, `BlindsStatus`, `ApplianceStatus`) detailing their unique controllable properties (isOn, brightness, color, targetTemperature, isLocked, isOpen, isLeaking, position, mode, etc.). Each status also includes an optional `isLockedByAI` flag.
        *   `DeviceStatusMap`: A mapped type to correctly associate `DeviceType` with its specific status interface.
        *   `Device`: The main interface for a device, now generic over `DeviceType` to ensure type safety for its `status` property. It includes common properties like `id`, `name`, `type`, `roomId`, and optional fields for `energyUsage`, `errorStatus`, `connectionIssues`, `lastChanged` timestamp, `isFavorite`, and fields for simulated predictive maintenance (`simulatedOperationalHours`, `estimatedLifetimeHours`).
        *   Other types for Scenarios, AI Suggestions, Routines, Automation Rules, Energy/Sustainability, Maintenance, Home Health, Anomalies, and Community features have also been defined to provide a solid structure for future development.

2.  **`components/smarthome/DeviceCard.tsx`**:
    *   **Enhanced Device Support**: The `DeviceCard` is significantly enhanced to correctly handle and display UI controls for a wider range of device types based on their specific `status` properties defined in `smartHomeTypes.ts`.
    *   **Type Safety**: Uses the generic `Device<T extends DeviceType>` and `DeviceStatusMap` to ensure type-safe access to device status properties.
    *   **New Device Controls**:
        *   **Light**: Added color temperature slider.
        *   **Thermostat**: Added control for `isOn` state of the thermostat itself (not just mode).
        *   **Blinds**: Added a range slider for `position`.
        *   **Appliance (Generic)**: Displays the current `mode`.
    *   **AI Lock Visual Feedback**: If a device's `isLockedByAI` status is true, the card becomes semi-transparent, and its controls are visually and functionally disabled. A `CogIcon` is shown with a tooltip indicating the AI lock.
    *   **Iconography**: `getDeviceIcon` is updated to include icons for new device types like `blinds` and `appliance`.
    *   **Status Display**: `renderStatus` is updated to correctly display information for the new device types and their statuses.
    *   **Event Handlers**: New event handlers (`handleColorTempChange`, `handleBlindsPositionChange`, `handleApplianceModeChange`) are added for the new controls. The main `onStatusChange` prop now correctly receives the `deviceType` to help the parent component manage state updates with proper type casting if needed.

**Next Steps:**

With these foundational elements in place, we can proceed to build out the `SmartHomePage.tsx` by:

1.  Integrating the `DeviceCard` to display a list of simulated devices.
2.  Implementing the "Simulated Home Event Engine" to dynamically change device statuses.
3.  Adding the `ScenarioCard` and `AISuggestionCard` for scenarios.
4.  Building out the UI and logic for Routines and Automation Rules using `RoutineCard`, `AutomationRuleCard`, and the `RuleBuilderModalInstance`.
5.  Implementing the AI-driven features for energy optimization, carbon footprint (conceptual), and predictive maintenance, along with their respective UI cards.
6.  Integrating the Home Health Score and Anomaly Alert systems.
7.  Adding the community features.

Please let me know when you're ready for the next set of changes, starting with the main `SmartHomePage.tsx` structure and the device simulation engine.