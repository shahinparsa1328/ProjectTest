import React, { useState } from 'react';
import { PracticalExercise, PeerReview } from '../../types/learningTypes';
import { toPersianDigits } from '../../utils';
import { DocumentArrowUpIcon, LightbulbIcon, ArrowRightIcon, CheckCircleIcon, UsersIcon, PencilIcon as ReviewIcon } from '../shared/AppIcons';
import LoadingSpinner from '../shared/LoadingSpinner';
import PeerReviewFormModal from './PeerReviewFormModal'; // New import for Phase 3.3

interface PracticalExerciseViewProps {
  exercise: PracticalExercise;
  onSubmitExercise: (exerciseId: string, submissionText: string, submissionFile?: File) => Promise<string | null>; 
  onClose: () => void;
  // Phase 3.3 Additions
  onRequestPeerReview?: (exerciseId: string) => void; // Placeholder
  onSubmitPeerReview?: (review: Omit<PeerReview, 'id' | 'submissionDate' | 'reviewerId'>) => void; // Placeholder
}

const PracticalExerciseView: React.FC<PracticalExerciseViewProps> = ({ 
    exercise, 
    onSubmitExercise, 
    onClose,
    onRequestPeerReview,
    onSubmitPeerReview
}) => {
  const [submissionText, setSubmissionText] = useState('');
  const [submissionFile, setSubmissionFile] = useState<File | null>(null);
  const [aiFeedback, setAiFeedback] = useState<string | null>(exercise.aiFeedback || null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(!!exercise.aiFeedback);
  
  // Phase 3.3 State
  const [showPeerReviewModal, setShowPeerReviewModal] = useState(false);
  const [peerReviewRequested, setPeerReviewRequested] = useState(exercise.peerReviewsRequested || false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (exercise.submissionType === 'text' && !submissionText.trim()) {
      setError(toPersianDigits("لطفاً متن تمرین خود را وارد کنید."));
      return;
    }
    if (exercise.submissionType === 'file' && !submissionFile) {
      setError(toPersianDigits("لطفاً یک فایل برای ارسال انتخاب کنید."));
      return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      const feedback = await onSubmitExercise(exercise.id, submissionText, submissionFile || undefined);
      if (feedback) {
        setAiFeedback(feedback);
        setSubmitted(true);
      } else {
        setSubmitted(true); 
        setAiFeedback(toPersianDigits("تمرین شما ارسال شد. بازخورد هوش مصنوعی به زودی ارائه خواهد شد (شبیه‌سازی شده)."));
      }
    } catch (err: any) {
      setError(toPersianDigits(`خطا در ارسال تمرین: ${err.message || "لطفا دوباره تلاش کنید."}`));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRequestPeerReviewClick = () => {
    if(onRequestPeerReview) {
      onRequestPeerReview(exercise.id);
      setPeerReviewRequested(true); // Simulate request
      alert(toPersianDigits("درخواست بازبینی همتا برای این تمرین ارسال شد (شبیه‌سازی شده)."));
    }
  };

  const handleOpenSubmitPeerReviewModal = () => {
    setShowPeerReviewModal(true);
  };

  const handleActualSubmitPeerReview = (reviewData: Omit<PeerReview, 'id' | 'submissionDate' | 'reviewerId' | 'revieweeId' | 'exerciseId'>) => {
    if (onSubmitPeerReview) {
      const completeReviewData: Omit<PeerReview, 'id' | 'submissionDate' | 'reviewerId'> = {
        ...reviewData,
        exerciseId: exercise.id,
        revieweeId: "current_user_id", // Placeholder, should be the exercise owner's ID
      };
      onSubmitPeerReview(completeReviewData);
      alert(toPersianDigits("بازخورد شما ثبت شد (شبیه‌سازی شده)."));
    }
    setShowPeerReviewModal(false);
  };

  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow-xl border border-gray-200 w-full max-w-lg mx-auto my-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg sm:text-xl font-semibold text-sky-700">{toPersianDigits(exercise.title)}</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">&times;</button>
      </div>
      <p className="text-sm text-gray-600 mb-3 leading-relaxed">{toPersianDigits(exercise.description)}</p>
      <p className="text-xs text-gray-500 mb-4">{toPersianDigits(`مهارت مورد تمرین: ${exercise.skillToPractice}`)}</p>

      {!submitted && (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Submission form (same as before) */}
           {exercise.submissionType === 'text' && (
            <div>
              <label htmlFor="submissionText" className="block text-sm font-medium text-gray-700 mb-1">{toPersianDigits("پاسخ شما:")}</label>
              <textarea
                id="submissionText"
                value={submissionText}
                onChange={(e) => setSubmissionText(e.target.value)}
                rows={5}
                className="w-full p-2 border border-gray-300 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-sm"
                placeholder={toPersianDigits("پاسخ خود را اینجا بنویسید...")}
              />
            </div>
          )}
          {exercise.submissionType === 'file' && (
            <div>
              <label htmlFor="submissionFile" className="block text-sm font-medium text-gray-700 mb-1">{toPersianDigits("ارسال فایل:")}</label>
              <input
                type="file"
                id="submissionFile"
                onChange={(e) => setSubmissionFile(e.target.files ? e.target.files[0] : null)}
                className="w-full text-sm text-gray-500 file:mr-2 file:ml-0 rtl:file:ml-2 rtl:file:mr-0 file:py-2 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100"
              />
            </div>
          )}
          {error && <p className="text-xs text-red-500 bg-red-100 p-2 rounded-md">{error}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center bg-sky-600 hover:bg-sky-700 text-white font-medium py-2.5 px-4 rounded-md text-sm transition-colors disabled:opacity-60"
          >
            {isSubmitting ? <LoadingSpinner size="sm" /> : <DocumentArrowUpIcon className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />}
            {toPersianDigits("ارسال تمرین")}
          </button>
        </form>
      )}

      {submitted && aiFeedback && (
        <div className="mt-6 p-4 bg-sky-50 rounded-md border border-sky-200">
          <h4 className="text-sm font-semibold text-sky-700 mb-2 flex items-center">
            <LightbulbIcon className="w-5 h-5 text-yellow-500 mr-2 rtl:ml-2 rtl:mr-0" />
            {toPersianDigits("بازخورد هوش مصنوعی:")}
          </h4>
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{toPersianDigits(aiFeedback)}</p>
        </div>
      )}
      {submitted && !aiFeedback && (
         <div className="mt-6 p-4 bg-green-50 rounded-md border border-green-200 text-center">
            <CheckCircleIcon className="w-8 h-8 text-green-600 mx-auto mb-2"/>
            <p className="text-sm text-green-700">{toPersianDigits("تمرین شما با موفقیت ارسال شد!")}</p>
        </div>
      )}

      {/* Peer Review Section - Phase 3.3 */}
      {submitted && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h4 className="text-md font-semibold text-gray-700 mb-3 flex items-center">
            <UsersIcon className="w-5 h-5 text-purple-600 mr-2 rtl:ml-2 rtl:mr-0" />
            {toPersianDigits("بازبینی همتا")}
          </h4>
          {!peerReviewRequested && onRequestPeerReview && (
            <button
              onClick={handleRequestPeerReviewClick}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white text-sm py-2 px-3 rounded-md transition-colors mb-3"
            >
              {toPersianDigits("درخواست بازبینی از همتایان")}
            </button>
          )}
          {peerReviewRequested && (
            <p className="text-xs text-purple-700 bg-purple-100 p-2 rounded-md mb-3">
              {toPersianDigits("درخواست بازبینی شما ارسال شده است. منتظر بازخورد همتایان خود باشید.")}
            </p>
          )}
          
          {/* Placeholder for displaying received reviews */}
          {exercise.peerReviewsReceived && exercise.peerReviewsReceived.length > 0 ? (
            <div className="space-y-2">
              <h5 className="text-sm font-medium text-gray-600">{toPersianDigits("بازخوردهای دریافتی:")}</h5>
              {exercise.peerReviewsReceived.map(review => (
                <div key={review.id} className="p-2 bg-gray-100 rounded-md border border-gray-200 text-xs">
                  <p><strong>{toPersianDigits(review.isAnonymous ? "بازبین ناشناس" : `بازبین: ${review.reviewerId}`)}:</strong> {toPersianDigits(review.overallFeedback)}</p>
                  {/* Display criteria ratings here */}
                </div>
              ))}
            </div>
          ) : peerReviewRequested && (
            <p className="text-xs text-gray-500">{toPersianDigits("هنوز بازخوردی دریافت نشده است.")}</p>
          )}

          {/* Button to submit a review for OTHERS (conceptual, this exercise is for the current user) */}
          {/* In a real app, this would be on a different user's exercise submission */}
          {onSubmitPeerReview && (
            <button 
              onClick={handleOpenSubmitPeerReviewModal}
              className="mt-2 w-full text-xs text-green-600 hover:text-green-700 border border-green-500 hover:bg-green-50 py-1.5 px-3 rounded-md transition-colors flex items-center justify-center"
            >
              <ReviewIcon className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
              {toPersianDigits("ارائه بازخورد برای این تمرین (شبیه‌سازی)")}
            </button>
          )}
        </div>
      )}

      {showPeerReviewModal && (
        <PeerReviewFormModal
          isOpen={showPeerReviewModal}
          onClose={() => setShowPeerReviewModal(false)}
          exerciseTitle={exercise.title}
          onSubmitReview={handleActualSubmitPeerReview}
          // criteria could be passed from exercise.aiFeedbackCriteria or a default set
          criteria={exercise.aiFeedbackCriteria || [toPersianDigits("وضوح پاسخ"), toPersianDigits("دقت مفاهیم"), toPersianDigits("ارائه کلی")]}
        />
      )}

      <button
        onClick={onClose}
        className="mt-6 w-full text-sm text-gray-700 hover:text-gray-900 py-2 px-4 rounded-md transition-colors"
      >
        {toPersianDigits("بازگشت")}
      </button>
    </div>
  );
};

export default PracticalExerciseView;
