
import React from 'react';
import { toPersianDigits } from '../../../utils';
import { GameIdea } from '../../../types/familyTypes';
import { PuzzlePieceIcon, LightbulbIcon } from '../../shared/AppIcons';

interface GameIdeaCardProps {
  idea: GameIdea;
  onShowXai?: (rationale: string) => void;
}

const GameIdeaCard: React.FC<GameIdeaCardProps> = ({ idea, onShowXai }) => {
  return (
    <div className="bg-pink-50 p-3.5 rounded-lg shadow-sm border border-pink-200">
      <div className="flex items-start mb-2">
        <div className="p-1.5 bg-pink-100 rounded-full mr-2 rtl:ml-2 rtl:mr-0 flex-shrink-0">
          <PuzzlePieceIcon className="w-5 h-5 text-pink-500" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-pink-700 mb-0.5">{toPersianDigits(idea.title)}</h4>
          <p className="text-xs text-gray-500">{toPersianDigits(`مناسب برای: ${idea.ageRange}`)} - {toPersianDigits(`نوع: ${idea.category}`)}</p>
        </div>
      </div>
      <p className="text-xs text-gray-600 mb-1.5 leading-relaxed">{toPersianDigits(idea.description)}</p>
      {idea.materialsNeeded && idea.materialsNeeded.length > 0 && (
        <p className="text-xs text-gray-500 mb-1.5">
          <strong>{toPersianDigits("وسایل مورد نیاز: ")}</strong>
          {idea.materialsNeeded.map(material => toPersianDigits(material)).join('، ')}
        </p>
      )}
      {onShowXai && (
        <div className="mt-2 pt-2 border-t border-pink-100 text-xs">
          <button onClick={() => onShowXai(idea.xaiRationale)} className="text-pink-600 hover:underline flex items-center">
            <LightbulbIcon className="w-3.5 h-3.5 ml-1 rtl:mr-1 rtl:ml-0" />{toPersianDigits("چرا این پیشنهاد؟")}
          </button>
        </div>
      )}
    </div>
  );
};

export default GameIdeaCard;
