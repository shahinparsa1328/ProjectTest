
import React from 'react';
import { toPersianDigits } from '../../../utils';
import { WellbeingFactor } from '../../../types/familyTypes';
import { HeartIcon as WellbeingScoreIcon, XMarkIcon } from '../../shared/AppIcons';

interface WellbeingReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  factors: WellbeingFactor[];
  primaryAccentClass: string;
}

const WellbeingReportModal: React.FC<WellbeingReportModalProps> = ({ isOpen, onClose, score, factors, primaryAccentClass }) => {
    if (!isOpen) return null;
    
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="wellbeing-report-title">
            <div className="bg-white p-5 sm:p-6 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto modal-scroll-content" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
                    <h3 id="wellbeing-report-title" className={`text-lg font-semibold ${primaryAccentClass} flex items-center`}>
                        <WellbeingScoreIcon className={`w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0 ${primaryAccentClass}`} />
                        {toPersianDigits("گزارش تندرستی خانواده")} ({toPersianDigits(score.toString())}%)
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label={toPersianDigits("بستن گزارش")}>
                        <XMarkIcon className="w-6 h-6"/>
                    </button>
                </div>
                <p className="text-xs text-gray-600 mb-4">{toPersianDigits("این گزارش بر اساس تحلیل هوش مصنوعی از فعالیت‌ها و تعاملات خانوادگی (شبیه‌سازی شده) تهیه شده است.")}</p>
                <div className="space-y-2.5">
                    {factors.map(factor => (
                        <div key={factor.id} className={`p-2.5 border rounded-md text-xs ${
                            factor.impact === 'positive' ? 'bg-green-50 border-green-200 text-green-700' : 
                            factor.impact === 'negative' ? 'bg-red-50 border-red-200 text-red-700' : 
                            'bg-gray-50 border-gray-200 text-gray-700'
                        }`}>
                            <strong className="font-medium">{toPersianDigits(factor.name)}: </strong>{toPersianDigits(factor.description)}
                        </div>
                    ))}
                </div>
                 <button onClick={onClose} className="mt-5 w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2.5 rounded-md text-sm font-medium">{toPersianDigits("بستن")}</button>
            </div>
        </div>
    );
};

export default WellbeingReportModal;
