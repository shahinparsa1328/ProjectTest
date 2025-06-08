import React from 'react';
import { XMarkIcon, LightbulbIcon } from './AppIcons'; 
import { toPersianDigits } from '../../utils';

interface XAIModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode; // For the explanation content
}

const XAIModal: React.FC<XAIModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="modal-overlay active" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="xai-modal-title"
      dir="rtl" 
    >
      <div 
        className="modal-content text-right bg-white" 
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
          <h3 id="xai-modal-title" className="text-lg font-semibold text-indigo-700 flex items-center">
            <LightbulbIcon className="w-5 h-5 text-yellow-500 ml-2 rtl:mr-0 rtl:ml-2" />
            {toPersianDigits(title)}
          </h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={toPersianDigits("بستن مودال")}
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="text-sm text-gray-700 leading-relaxed prose prose-sm max-w-none">
          {children}
        </div>
         <div className="mt-6 text-left rtl:text-right">
            <button
              onClick={onClose}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-5 rounded-md text-sm transition-colors"
            >
              {toPersianDigits("فهمیدم")}
            </button>
          </div>
      </div>
    </div>
  );
};

export default XAIModal;
