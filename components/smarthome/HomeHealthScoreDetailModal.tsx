
import React from 'react';
import { toPersianDigits } from '../../utils';
import { XMarkIcon, ShieldCheckIcon, HeartIcon, WalletIcon, BookIcon, BriefcaseIcon, UserGroupIcon as RelationshipIcon } from '../shared/AppIcons'; // Assuming UserGroupIcon is aliased or specific RelationshipIcon exists

export interface HomeHealthScoreFactor {
  factor: string;
  score?: number; // Optional, as some factors might be qualitative
  status?: string; // e.g., "خوب", "نیاز به توجه"
  recommendation: string;
  icon: React.ReactElement<{ className?: string }>; // Changed from React.ReactNode
}

interface HomeHealthScoreDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  overallScore: number;
  scoreDetails: HomeHealthScoreFactor[];
}

const HomeHealthScoreDetailModal: React.FC<HomeHealthScoreDetailModalProps> = ({ isOpen, onClose, overallScore, scoreDetails }) => {
  if (!isOpen) return null;

  const getScoreColorClass = (score?: number, status?: string): string => {
    if (status === toPersianDigits("نیاز به بررسی") || status === toPersianDigits("نیاز به توجه")) return 'bg-yellow-500';
    if (score === undefined && status) return 'bg-gray-500'; // Default for status-only items

    if (score === undefined) return 'bg-gray-500';
    if (score >= 75) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getOverallScoreColor = (score: number): string => {
    if (score >= 75) return 'text-green-400';
    if (score >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[1001] p-4" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="home-health-score-modal-title"
      dir="rtl"
    >
      <div 
        className="bg-slate-800 p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-slate-700 modal-scroll-content"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-700">
          <h2 id="home-health-score-modal-title" className="text-xl sm:text-2xl font-semibold text-sky-300 flex items-center">
            <ShieldCheckIcon className="w-7 h-7 text-sky-400 mr-2 rtl:ml-2 rtl:mr-0" />
            {toPersianDigits("گزارش سلامت و پایداری خانه")}
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-200 transition-colors"
            aria-label={toPersianDigits("بستن مودال")}
          >
            <XMarkIcon className="w-7 h-7" />
          </button>
        </div>

        <div className="text-center mb-6">
          <p className="text-lg text-gray-300 mb-1">{toPersianDigits("امتیاز کلی سلامت و پایداری خانه شما:")}</p>
          <p className={`text-5xl font-bold ${getOverallScoreColor(overallScore)}`}>{toPersianDigits(`${overallScore}%`)}</p>
        </div>

        <div className="space-y-5">
          {scoreDetails.map((detail, index) => (
            <div key={index} className="bg-slate-700/60 p-4 rounded-lg border border-slate-600">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  {React.cloneElement(detail.icon, { className: "w-6 h-6 text-sky-400" })}
                  <h4 className="text-md font-medium text-sky-300 mr-2 rtl:ml-2 rtl:mr-0">{detail.factor}</h4>
                </div>
                {(detail.score !== undefined || detail.status) && (
                    <span className={`text-sm font-semibold px-2 py-0.5 rounded-full text-white ${getScoreColorClass(detail.score, detail.status)}`}>
                        {detail.score !== undefined ? toPersianDigits(`${detail.score}%`) : toPersianDigits(detail.status!)}
                    </span>
                )}
              </div>
              {detail.score !== undefined && (
                <div className="w-full bg-slate-600 rounded-full h-2 mb-2.5">
                    <div 
                    className={`h-2 rounded-full ${getScoreColorClass(detail.score)}`}
                    style={{ width: `${detail.score}%` }}
                    ></div>
                </div>
              )}
              <p className="text-xs text-gray-300 leading-relaxed">
                <strong className="text-sky-500">{toPersianDigits("پیشنهاد هوش مصنوعی: ")}</strong>
                {toPersianDigits(detail.recommendation)}
              </p>
            </div>
          ))}
        </div>

         <div className="mt-8 text-right">
            <button
              onClick={onClose}
              className="bg-sky-600 hover:bg-sky-700 text-white font-medium py-2.5 px-6 rounded-md text-sm transition-colors"
            >
              {toPersianDigits("بستن")}
            </button>
          </div>
      </div>
    </div>
  );
};

export default HomeHealthScoreDetailModal;
