
import React from 'react';
import { toPersianDigits } from '../../../utils';
import { ParentingTip } from '../../../types/familyTypes';
import { LightbulbIcon, LinkIcon, ChatBubbleOvalLeftEllipsisIcon, SparklesIconNav } from '../../shared/AppIcons';

interface ParentingTipCardProps {
  tip: ParentingTip;
  onShowXai?: (rationale: string) => void;
  onViewLink?: (url: string) => void;
}

const ParentingTipCard: React.FC<ParentingTipCardProps> = ({ tip, onShowXai, onViewLink }) => {
  return (
    <div className="bg-teal-50 p-3.5 rounded-lg shadow-sm border border-teal-200 h-full flex flex-col">
      <div className="flex items-start mb-2">
        <div className="p-1.5 bg-teal-100 rounded-full mr-2 rtl:ml-2 rtl:mr-0 flex-shrink-0">
          {tip.isAISuggestion ? <SparklesIconNav className="w-5 h-5 text-teal-500" /> : <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5 text-teal-500" />}
        </div>
        <div>
          <h4 className="text-sm font-semibold text-teal-700 mb-0.5">{toPersianDigits(tip.title)}</h4>
          <p className="text-xs text-gray-500">
            {toPersianDigits(`دسته: ${tip.category}`)}
            {tip.source && ` - ${toPersianDigits(`منبع: ${tip.source}`)}`}
            {tip.isAISuggestion && <span className="text-teal-600 bg-teal-200 px-1.5 py-0.5 rounded-full text-[9px] mr-1 rtl:ml-1 rtl:mr-0">{toPersianDigits("پیشنهاد AI")}</span>}
          </p>
        </div>
      </div>
      <p className="text-xs text-gray-600 mb-2 leading-relaxed flex-grow">{toPersianDigits(tip.tipText)}</p>
      
      {(onShowXai && tip.xaiRationale) || (tip.link && onViewLink) ? (
        <div className="mt-auto pt-2 border-t border-teal-100 text-xs flex justify-between items-center">
          {onShowXai && tip.xaiRationale && (
            <button onClick={() => onShowXai(tip.xaiRationale!)} className="text-teal-600 hover:underline flex items-center">
              <LightbulbIcon className="w-3.5 h-3.5 ml-1 rtl:mr-1 rtl:ml-0" />{toPersianDigits("چرا این پیشنهاد؟")}
            </button>
          )}
          {tip.link && onViewLink && (
            <button onClick={() => onViewLink(tip.link!)} className="text-sky-600 hover:underline flex items-center">
              <LinkIcon className="w-3.5 h-3.5 ml-1 rtl:mr-1 rtl:ml-0" />{toPersianDigits("مشاهده منبع")}
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default ParentingTipCard;