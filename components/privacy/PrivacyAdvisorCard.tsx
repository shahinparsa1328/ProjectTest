
import React from 'react';
import { toPersianDigits } from '../../utils';
import { XCircleIcon } from '../shared/AppIcons';
import { PrivacyAdvisorMessage } from '../../types/privacyTypes'; // Ensure this path is correct

interface PrivacyAdvisorCardProps {
  message: PrivacyAdvisorMessage;
  onDismiss: (id: string) => void; // Ensure this prop is consistently named and used
}

const PrivacyAdvisorCard: React.FC<PrivacyAdvisorCardProps> = ({ message, onDismiss }) => {
  const cardStyles = {
    alert: {
      bg: 'bg-yellow-50 border-yellow-300',
      titleColor: 'text-yellow-700',
      iconContainerBg: 'bg-yellow-100',
      buttonBg: 'bg-yellow-400 hover:bg-yellow-500',
    },
    advice: {
      bg: 'bg-blue-50 border-blue-300',
      titleColor: 'text-blue-700',
      iconContainerBg: 'bg-blue-100',
      buttonBg: 'bg-blue-500 hover:bg-blue-600',
    },
  };

  const currentStyle = cardStyles[message.type];

  return (
    <div className={`p-4 rounded-lg shadow-md border ${currentStyle.bg}`}>
      <div className="flex items-start">
        <div className={`p-2 rounded-full mr-3 rtl:ml-3 rtl:mr-0 flex-shrink-0 ${currentStyle.iconContainerBg}`}>
          {message.icon}
        </div>
        <div className="flex-grow">
          <h4 className={`text-sm font-semibold ${currentStyle.titleColor} mb-1`}>{toPersianDigits(message.title)}</h4>
          <p className="text-xs text-gray-700 leading-relaxed">{toPersianDigits(message.message)}</p>
        </div>
        {/* Use the onDismiss prop passed to the component for the dismiss action */}
        <button 
          onClick={() => onDismiss(message.id)} 
          className="text-gray-400 hover:text-gray-600 p-1 -mt-1 -mr-1 rtl:-ml-1 rtl:-mr-0"
          aria-label={toPersianDigits("نادیده گرفتن این پیام")}
        >
          <XCircleIcon className="w-5 h-5" />
        </button>
      </div>
      {message.actionText && typeof message.onAction === 'function' && (
        <div className="mt-3 pt-2 border-t border-gray-200/50 text-right rtl:text-left">
          <button
            onClick={message.onAction} 
            className={`text-xs text-white py-1.5 px-3 rounded-md transition-colors ${currentStyle.buttonBg}`}
          >
            {toPersianDigits(message.actionText)}
          </button>
        </div>
      )}
    </div>
  );
};

export default PrivacyAdvisorCard;
