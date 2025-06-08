
import React from 'react';
import { toPersianDigits } from '../../../utils';
import { PageName } from '../../../App'; // Assuming PageName is in App.tsx

export interface PredictiveInsightAlert {
  id: string;
  type: 'warning' | 'opportunity' | 'forecast' | 'health_insight' | 'financial_alert' | 'learning_opportunity' | 'productivity_forecast';
  icon: React.ReactNode;
  title: string;
  text: string;
  actionText: string;
  actionType: 'navigate' | 'console' | 'modal'; // 'modal' can be added later
  actionTarget?: PageName | string; // PageName for navigate, string for console/modal id
}

interface PredictiveInsightCardProps {
  insight: PredictiveInsightAlert;
  onAction: (insight: PredictiveInsightAlert) => void;
}

const PredictiveInsightCard: React.FC<PredictiveInsightCardProps> = ({ insight, onAction }) => {
  const typeStyles: Record<PredictiveInsightAlert['type'], { border: string; bgIcon: string; textIcon: string }> = {
    warning: { border: 'border-yellow-500/60', bgIcon: 'bg-yellow-500/10', textIcon: 'text-yellow-400' },
    opportunity: { border: 'border-green-500/60', bgIcon: 'bg-green-500/10', textIcon: 'text-green-400' },
    forecast: { border: 'border-blue-500/60', bgIcon: 'bg-blue-500/10', textIcon: 'text-blue-400' },
    health_insight: { border: 'border-teal-500/60', bgIcon: 'bg-teal-500/10', textIcon: 'text-teal-400' },
    financial_alert: { border: 'border-red-500/60', bgIcon: 'bg-red-500/10', textIcon: 'text-red-400' },
    learning_opportunity: { border: 'border-purple-500/60', bgIcon: 'bg-purple-500/10', textIcon: 'text-purple-400' },
    productivity_forecast: { border: 'border-indigo-500/60', bgIcon: 'bg-indigo-500/10', textIcon: 'text-indigo-400' },
  };

  const currentStyle = typeStyles[insight.type] || typeStyles.opportunity; // Default to opportunity style

  return (
    <div className={`bg-slate-700/70 p-4 rounded-lg shadow-md border ${currentStyle.border} flex flex-col`}>
      <div className="flex items-start mb-2">
        <div className={`flex-shrink-0 p-2 rounded-full mr-3 ${currentStyle.bgIcon} ${currentStyle.textIcon}`}>
          {insight.icon}
        </div>
        <h4 className="text-md font-semibold text-sky-300">{toPersianDigits(insight.title)}</h4>
      </div>
      <p className="text-sm text-gray-300 mb-3 flex-grow leading-relaxed">{toPersianDigits(insight.text)}</p>
      <button
        onClick={() => onAction(insight)}
        className={`mt-auto w-full text-xs font-medium py-2 px-3 rounded-md transition-colors ${currentStyle.bgIcon} ${currentStyle.textIcon.replace('text-', 'hover:text-').replace('400', '200')} hover:bg-opacity-25`}
      >
        {toPersianDigits(insight.actionText)}
      </button>
    </div>
  );
};

export default PredictiveInsightCard;
