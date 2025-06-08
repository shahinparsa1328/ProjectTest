import React from 'react';
import { PredictiveSkillSuggestion } from '../../types/learningTypes';
import { toPersianDigits } from '../../utils';
import { TrendingUpIcon, AcademicCapIcon, LightbulbIcon } from '../shared/AppIcons';

interface PredictiveSkillCardProps {
  suggestion: PredictiveSkillSuggestion;
  onViewPath?: (pathId: string) => void; // Optional: Handler to navigate to the learning path
}

const PredictiveSkillCard: React.FC<PredictiveSkillCardProps> = ({ suggestion, onViewPath }) => {
  const demandColor = 
    suggestion.marketDemandIndicator === 'high' ? 'text-green-500 bg-green-100 border-green-300' :
    suggestion.marketDemandIndicator === 'medium' ? 'text-yellow-500 bg-yellow-100 border-yellow-300' :
    'text-gray-500 bg-gray-100 border-gray-300';

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 flex flex-col">
      <div className="flex items-start mb-2">
        <div className={`p-1.5 rounded-full mr-2 rtl:ml-2 rtl:mr-0 ${
            suggestion.marketDemandIndicator === 'high' ? 'bg-green-100 text-green-600' :
            suggestion.marketDemandIndicator === 'medium' ? 'bg-yellow-100 text-yellow-600' :
            'bg-sky-100 text-sky-600'
        }`}>
          <TrendingUpIcon className="w-5 h-5" />
        </div>
        <h4 className="text-md font-semibold text-gray-800">{toPersianDigits(suggestion.skillName)}</h4>
      </div>
      
      <p className="text-xs text-gray-600 mb-1.5 leading-relaxed">
        <LightbulbIcon className="w-3 h-3 inline text-yellow-500 mr-1 rtl:ml-1 rtl:mr-0 align-middle" />
        {toPersianDigits(suggestion.rationale)}
      </p>

      {suggestion.relevanceToUser && (
        <p className="text-xs text-gray-500 mb-2 italic">{toPersianDigits(suggestion.relevanceToUser)}</p>
      )}

      {suggestion.marketDemandIndicator && (
        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border self-start mb-2 ${demandColor}`}>
          {toPersianDigits(`تقاضای بازار: ${
            suggestion.marketDemandIndicator === 'high' ? 'بالا' :
            suggestion.marketDemandIndicator === 'medium' ? 'متوسط' :
            'پایین'
          }`)}
        </span>
      )}

      {suggestion.learningPathId && onViewPath && (
        <button
          onClick={() => onViewPath(suggestion.learningPathId!)}
          className="mt-auto w-full text-xs bg-sky-500 hover:bg-sky-600 text-white font-medium py-1.5 px-3 rounded-md transition-colors flex items-center justify-center"
        >
          <AcademicCapIcon className="w-3.5 h-3.5 mr-1 rtl:ml-1 rtl:mr-0" />
          {toPersianDigits("مشاهده مسیر یادگیری مرتبط")}
        </button>
      )}
    </div>
  );
};

export default PredictiveSkillCard;
