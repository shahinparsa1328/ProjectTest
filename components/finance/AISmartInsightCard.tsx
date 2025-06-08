
import React from 'react';
import { toPersianDigits } from '../../utils';
import { LightbulbIcon, SparklesIconNav, ArrowRightIcon } from '../shared/AppIcons';

export interface SmartInsight {
  id: string;
  title: string;
  text: string;
  icon?: React.ReactElement<{ className?: string }>;
  type: 'interplay' | 'life_vision' | 'financial_tip' | 'general_recommendation';
  actionLink?: string; 
  actionText?: string;
  onAction?: () => void;
}

interface AISmartInsightCardProps {
  insight: SmartInsight;
}

const AISmartInsightCard: React.FC<AISmartInsightCardProps> = ({ insight }) => {
  const typeStyles: Record<SmartInsight['type'], { border: string; bgIcon: string; textIcon: string; accentText: string }> = {
    interplay: { border: 'border-teal-500/60', bgIcon: 'bg-teal-500/10', textIcon: 'text-teal-400', accentText: 'text-teal-600' },
    life_vision: { border: 'border-purple-500/60', bgIcon: 'bg-purple-500/10', textIcon: 'text-purple-400', accentText: 'text-purple-600' },
    financial_tip: { border: 'border-sky-500/60', bgIcon: 'bg-sky-500/10', textIcon: 'text-sky-400', accentText: 'text-sky-600' },
    general_recommendation: { border: 'border-indigo-500/60', bgIcon: 'bg-indigo-500/10', textIcon: 'text-indigo-400', accentText: 'text-indigo-600' },
  };

  const currentStyle = typeStyles[insight.type] || typeStyles.general_recommendation;
  const DefaultIcon = insight.icon || <SparklesIconNav className={`w-5 h-5 ${currentStyle.textIcon}`} />;


  return (
    <div className={`bg-white p-3.5 rounded-lg shadow-sm border ${currentStyle.border} hover:shadow-md transition-shadow duration-150`}>
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 p-1.5 rounded-full ${currentStyle.bgIcon}`}>
          {DefaultIcon}
        </div>
        <div className="flex-grow min-w-0">
          <h4 className={`text-sm font-semibold ${currentStyle.accentText} mb-1`}>{toPersianDigits(insight.title)}</h4>
          <p className="text-xs text-gray-700 leading-relaxed">{toPersianDigits(insight.text)}</p>
        </div>
      </div>
      {(insight.actionLink || insight.onAction) && (
        <div className="mt-2.5 flex justify-end items-center pt-2 border-t border-gray-100">
            <button
                onClick={insight.onAction || (() => insight.actionLink && window.open(insight.actionLink, '_blank'))}
                className={`flex items-center text-xs ${currentStyle.accentText.replace('600','500')} hover:opacity-80 font-medium py-1 px-2.5 rounded-md transition-colors`}
                aria-label={toPersianDigits(insight.actionText || "بیشتر بدانید")}
            >
                {toPersianDigits(insight.actionText || "بیشتر بدانید")}
                <ArrowRightIcon className="w-3.5 h-3.5 mr-1 rtl:ml-1 rtl:mr-0 transform scale-x-[-1]" />
            </button>
        </div>
      )}
    </div>
  );
};

export default AISmartInsightCard;
