
import React from 'react';
import { toPersianDigits } from '../../../utils';
import { XMarkIcon, HeartIcon, WalletIcon, BookIcon, BriefcaseIcon, UserGroupIcon as RelationshipIcon } from '../../shared/AppIcons'; // Assuming UserGroupIcon is aliased or specific RelationshipIcon exists

export interface DomainScore {
  domainName: string;
  score: number;
  aiRecommendation: string;
  icon?: React.ReactElement<{ className?: string }>; // Changed from React.ReactNode
}

interface HolisticScoreDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  overallScore: number;
  domainScoresData: DomainScore[];
}

const HolisticScoreDetailModal: React.FC<HolisticScoreDetailModalProps> = ({ isOpen, onClose, overallScore, domainScoresData }) => {
  if (!isOpen) return null;

  const getScoreColorClass = (score: number): string => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  const getDomainIcon = (domainName: string): React.ReactNode => {
    switch (domainName) {
        case toPersianDigits("سلامت"): return <HeartIcon className="w-5 h-5 text-green-400" />;
        case toPersianDigits("مالی"): return <WalletIcon className="w-5 h-5 text-yellow-400" />;
        case toPersianDigits("روابط"): return <RelationshipIcon className="w-5 h-5 text-pink-400" />;
        case toPersianDigits("کار/بهره‌وری"): return <BriefcaseIcon className="w-5 h-5 text-blue-400" />;
        case toPersianDigits("یادگیری/رشد"): return <BookIcon className="w-5 h-5 text-purple-400" />; // Changed from AcademicCapIcon to BookIcon
        default: return <div className="w-5 h-5 bg-slate-500 rounded-full" />; // Fallback icon
    }
  };


  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="holistic-score-modal-title"
      dir="rtl"
    >
      <div 
        className="bg-slate-800 p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-slate-700 modal-scroll-content"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-700">
          <h2 id="holistic-score-modal-title" className="text-2xl font-semibold text-sky-300">{toPersianDigits("جزئیات امتیاز جامع زندگی")}</h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-200 transition-colors"
            aria-label={toPersianDigits("بستن مودال")}
          >
            <XMarkIcon className="w-7 h-7" />
          </button>
        </div>

        <div className="text-center mb-6">
          <p className="text-lg text-gray-300 mb-1">{toPersianDigits("امتیاز کلی شما:")}</p>
          <p className={`text-5xl font-bold ${getScoreColorClass(overallScore).replace('bg-', 'text-')}`}>{toPersianDigits(`${overallScore}%`)}</p>
        </div>

        <div className="space-y-5">
          {domainScoresData.map((domain, index) => (
            <div key={index} className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                   {domain.icon ? React.cloneElement(domain.icon, { className: "w-6 h-6" }) : getDomainIcon(domain.domainName)}
                  <h4 className="text-lg font-medium text-sky-400 mr-2">{domain.domainName}</h4>
                </div>
                <span className={`text-md font-semibold ${getScoreColorClass(domain.score).replace('bg-', 'text-')}`}>{toPersianDigits(`${domain.score}%`)}</span>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-2.5 mb-2.5">
                <div 
                  className={`h-2.5 rounded-full ${getScoreColorClass(domain.score)}`}
                  style={{ width: `${domain.score}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                <strong className="text-sky-500">{toPersianDigits("پیشنهاد هوش مصنوعی: ")}</strong>
                {toPersianDigits(domain.aiRecommendation)}
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

export default HolisticScoreDetailModal;
