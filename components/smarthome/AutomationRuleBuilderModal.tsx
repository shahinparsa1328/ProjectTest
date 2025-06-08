
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
                <label htmlFor="ruleName" className="block text-xs font-medium text-sky-400 mb-1">{toPersianDigits("نام قانون*:")}</label>
                <input type="text" id="ruleName" value={name} onChange={e => setName(e.target.value)} required className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-gray-200 text-xs"/>
            </div>
            <div>
                <label htmlFor="ruleDescription" className="block text-xs font-medium text-sky-400 mb-1">{toPersianDigits("توضیحات (اختیاری):")}</label>
                <textarea id="ruleDescription" value={description} onChange={e => setDescription(e.target.value)} rows={2} className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-gray-200 text-xs resize-y"/>
            </div>

            <fieldset className="p-3 border border-slate-600 rounded-md space-y-2">
                <legend className="text-xs font-medium text-sky-400 px-1">{toPersianDigits("اگر (شرط)")}</legend>
                <div>
                    <label htmlFor="triggerDevice" className="block text-xs font-medium text-gray-300 mb-1">{toPersianDigits("دستگاه:")}</label>
                    <select id="triggerDevice" value={triggerDeviceId} onChange={e => setTriggerDeviceId(e.target.value)} className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-gray-200 text-xs">
                        {devices.map(d => <option key={d.id} value={d.id}>{toPersianDigits(d.name)}</option>)}
                    </select>
                </div>
                {triggerProperties.length > 0 && (
                    <>
                        <div>
                            <label htmlFor="triggerProperty" className="block text-xs font-medium text-gray-300 mb-1">{toPersianDigits("ویژگی:")}</label>
                            <select id="triggerProperty" value={triggerProperty} onChange={e => {setTriggerProperty(e.target.value); setTriggerValue('');}} className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-gray-200 text-xs">
                                {triggerProperties.map(p => <option key={p.property as string} value={p.property as string}>{toPersianDigits(p.label)}</option>)}
                            </select>
                        </div>
                        <div>
                             <label htmlFor="triggerOperator" className="block text-xs font-medium text-gray-300 mb-1">{toPersianDigits("عملگر:")}</label>
                             <select id="triggerOperator" value={triggerOperator} onChange={e => setTriggerOperator(e.target.value as RuleCondition['operator'])} className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-gray-200 text-xs">
                                {currentTriggerPropertyDetails?.operators.map(op => <option key={op} value={op}>{toPersianDigits(operatorLabels[op])}</option>)}
                            </select>
                        </div>
                        {renderValueInput(currentTriggerPropertyDetails, triggerValue, setTriggerValue, false, triggerOperator)}
                    </>
                )}
            </fieldset>

            <fieldset className="p-3 border border-slate-600 rounded-md space-y-2">
                 <legend className="text-xs font-medium text-sky-400 px-1">{toPersianDigits("آنگاه (اقدام)")}</legend>
                 <div>
                    <label htmlFor="actionDevice" className="block text-xs font-medium text-gray-300 mb-1">{toPersianDigits("دستگاه:")}</label>
                    <select id="actionDevice" value={actionDeviceId} onChange={e => setActionDeviceId(e.target.value)} className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-gray-200 text-xs">
                        {devices.map(d => <option key={d.id} value={d.id}>{toPersianDigits(d.name)}</option>)}
                    </select>
                </div>
                {actionProperties.length > 0 && (
                    <>
                        <div>
                            <label htmlFor="actionProperty" className="block text-xs font-medium text-gray-300 mb-1">{toPersianDigits("ویژگی برای تغییر:")}</label>
                            <select id="actionProperty" value={actionProperty} onChange={e => {setActionProperty(e.target.value); setActionTargetValue('');}} className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-gray-200 text-xs">
                                {actionProperties.map(p => <option key={p.property as string} value={p.property as string}>{toPersianDigits(p.label)}</option>)}
                            </select>
                        </div>
                         {renderValueInput(currentActionPropertyDetails, actionTargetValue, setActionTargetValue, true)}
                        <div>
                            <label htmlFor="actionDelay" className="block text-xs font-medium text-gray-300 mb-1">{toPersianDigits("تاخیر (ثانیه، اختیاری):")}</label>
                            <input type="number" id="actionDelay" value={actionDelaySeconds} onChange={e => setActionDelaySeconds(e.target.value)} min="0" className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-gray-200 text-xs"/>
                        </div>
                    </>
                )}
            </fieldset>

            <div className="flex justify-end space-x-3 space-x-reverse pt-4 border-t border-slate-700">
                <button type="button" onClick={onClose} className="px-5 py-2 text-sm font-medium text-gray-300 bg-slate-600 hover:bg-slate-500 rounded-lg transition-colors">{toPersianDigits("انصراف")}</button>
                <button type="submit" className="px-6 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors flex items-center"><PlusIcon className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0"/> {toPersianDigits(initialData ? "ذخیره تغییرات" : "ایجاد قانون")}</button>
            </div>
        </form>
      </div>
    </div>
  );
};

// Commented out default export to stick to named export for consistency
// export default RuleBuilderModalInstance;
