
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