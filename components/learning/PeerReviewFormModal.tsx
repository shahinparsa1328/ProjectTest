import React, { useState } from 'react';
import { PeerReview } from '../../types/learningTypes';
import { toPersianDigits } from '../../utils';
import { XMarkIcon, CheckCircleIcon, StarIcon } from '../shared/AppIcons';

interface PeerReviewFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  exerciseTitle: string;
  onSubmitReview: (reviewData: Omit<PeerReview, 'id' | 'submissionDate' | 'reviewerId' | 'revieweeId' | 'exerciseId'>) => void;
  criteria: string[]; // e.g., ["Clarity", "Accuracy", "Completeness"]
}

const PeerReviewFormModal: React.FC<PeerReviewFormModalProps> = ({
  isOpen,
  onClose,
  exerciseTitle,
  onSubmitReview,
  criteria,
}) => {
  const [ratings, setRatings] = useState<Record<string, { rating: number; comment?: string }>>(
    criteria.reduce((acc, crit) => ({ ...acc, [crit]: { rating: 0 } }), {})
  );
  const [overallFeedback, setOverallFeedback] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);

  const handleRatingChange = (criterion: string, rating: number) => {
    setRatings(prev => ({ ...prev, [criterion]: { ...prev[criterion], rating } }));
  };

  const handleCommentChange = (criterion: string, comment: string) => {
    setRatings(prev => ({ ...prev, [criterion]: { ...prev[criterion], comment } }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const criteriaRatings = Object.entries(ratings).map(([criterion, data]) => ({
      criterion,
      rating: data.rating,
      comment: data.comment,
    }));

    // Basic validation: ensure all criteria are rated (rating > 0)
    const allRated = criteriaRatings.every(cr => cr.rating > 0);
    if (!allRated) {
      alert(toPersianDigits("لطفاً برای تمام معیارها امتیاز دهید."));
      return;
    }
    if (!overallFeedback.trim()) {
      alert(toPersianDigits("لطفاً بازخورد کلی را وارد کنید."));
      return;
    }

    onSubmitReview({ criteriaRatings, overallFeedback, isAnonymous });
    // Optionally reset form fields here if the modal stays open or for next time
    // setRatings(criteria.reduce((acc, crit) => ({ ...acc, [crit]: { rating: 0 } }), {}));
    // setOverallFeedback('');
    // setIsAnonymous(true);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[1001] p-4" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="peer-review-modal-title"
      dir="rtl"
    >
      <div 
        className="bg-slate-800 p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-slate-700 modal-scroll-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 id="peer-review-modal-title" className="text-xl sm:text-2xl font-semibold text-sky-300">{toPersianDigits(`بازبینی برای تمرین: ${exerciseTitle}`)}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
            <XMarkIcon className="w-7 h-7" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {criteria.map(criterion => (
            <div key={criterion} className="p-3 bg-slate-700/50 rounded-md border border-slate-600">
              <label className="block text-sm font-medium text-sky-400 mb-1.5">{toPersianDigits(criterion)}*</label>
              <div className="flex items-center space-x-1 space-x-reverse mb-1.5">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange(criterion, star)}
                    className={`p-1 rounded-full transition-colors ${
                      ratings[criterion]?.rating >= star ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-300'
                    }`}
                    aria-label={toPersianDigits(`امتیاز ${star} از ۵`)}
                  >
                    <StarIcon className="w-5 h-5" />
                  </button>
                ))}
                <span className="text-xs text-gray-300 mr-1">({toPersianDigits(ratings[criterion]?.rating.toString() || '۰')}/۵)</span>
              </div>
              <textarea
                value={ratings[criterion]?.comment || ''}
                onChange={(e) => handleCommentChange(criterion, e.target.value)}
                rows={2}
                placeholder={toPersianDigits(`نظر شما در مورد ${criterion} (اختیاری)...`)}
                className="w-full p-1.5 bg-slate-700 border border-slate-500 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-gray-200 text-xs resize-y"
              />
            </div>
          ))}

          <div>
            <label htmlFor="overallFeedback" className="block text-sm font-medium text-sky-400 mb-1">{toPersianDigits("بازخورد کلی*:")}</label>
            <textarea
              id="overallFeedback"
              value={overallFeedback}
              onChange={(e) => setOverallFeedback(e.target.value)}
              rows={4}
              required
              className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-gray-200 text-sm resize-y"
              placeholder={toPersianDigits("نظر کلی و پیشنهادات سازنده خود را اینجا بنویسید...")}
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isAnonymous"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="h-4 w-4 text-sky-500 bg-slate-600 border-slate-500 rounded focus:ring-sky-400"
            />
            <label htmlFor="isAnonymous" className="mr-2 rtl:ml-2 rtl:mr-0 text-sm text-gray-300">{toPersianDigits("ارسال به صورت ناشناس")}</label>
          </div>

          <div className="flex justify-end space-x-3 space-x-reverse pt-4 border-t border-slate-700">
            <button type="button" onClick={onClose} className="px-5 py-2 text-sm font-medium text-gray-300 bg-slate-600 hover:bg-slate-500 rounded-lg transition-colors">
              {toPersianDigits("انصراف")}
            </button>
            <button type="submit" className="px-6 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors flex items-center">
              <CheckCircleIcon className="w-4 h-4 ml-1.5 rtl:mr-1.5 rtl:ml-0" />
              {toPersianDigits("ارسال بازخورد")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PeerReviewFormModal;
