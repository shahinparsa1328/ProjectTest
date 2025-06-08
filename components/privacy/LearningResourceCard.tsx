
import React, { useState } from 'react';
import { toPersianDigits } from '../../utils'; 
import { DocumentTextIcon, CameraIcon, AcademicCapIcon, ArrowRightIcon, CheckCircleIcon } from '../shared/AppIcons'; 
import { LearningResourceProps as PrivacyLearningResource, PrivacyQuizQuestion } from '../../types/privacyTypes'; // Use the enhanced type
import PrivacyQuiz from './PrivacyQuiz'; // Import the new Quiz component

interface LearningResourceCardProps {
  resource: PrivacyLearningResource;
  onCompleteResource: (resourceId: string, pointsAwarded: number, badgeIdToAward?: string) => void;
  // Add other necessary props, e.g., if user already completed this to show different UI
  isCompleted?: boolean; // To show if resource/quiz is already done
}

const LearningResourceCard: React.FC<LearningResourceCardProps> = ({ resource, onCompleteResource, isCompleted }) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [quizAttempted, setQuizAttempted] = useState(isCompleted && resource.type === 'quiz'); // Assume completed if initially marked

  const getIcon = () => {
    const iconClass = "w-6 h-6 text-purple-600";
    if (resource.iconName === 'DocumentTextIcon' || resource.type === 'article') return <DocumentTextIcon className={iconClass} />;
    if (resource.iconName === 'CameraIcon' || resource.type === 'video') return <CameraIcon className={iconClass} />;
    if (resource.iconName === 'AcademicCapIcon' || resource.type === 'quiz') return <AcademicCapIcon className={iconClass} />;
    return <AcademicCapIcon className={iconClass} />; 
  };

  const typeLabels = {
    article: 'مقاله',
    video: 'ویدیو',
    quiz: 'آزمون کوتاه',
  };

  const handlePrimaryAction = () => {
    if (resource.type === 'quiz' && resource.quiz) {
      if (!quizAttempted) { // Only allow starting quiz if not yet attempted or completed
        setShowQuiz(true);
      }
    } else {
      // For articles/videos, simulate completion and award points/badge
      onCompleteResource(resource.id, resource.pointsAwarded, resource.badgeAwardedOnCompletion);
      // Potentially open resource.url if it exists
      if (resource.url) {
        // window.open(resource.url, '_blank'); // Or navigate within app if it's internal
         alert(toPersianDigits(`محتوای "${resource.title}" باز شد (شبیه‌سازی).`));
      }
    }
  };
  
  const handleQuizCompletionInternal = (finalScore: number, totalQuestions: number) => {
    setQuizScore(finalScore);
    setShowQuiz(false);
    setQuizAttempted(true);
    const pointsFromQuiz = resource.quiz?.reduce((sum, q) => sum + (q.points ?? 0), 0) || 0;
    const scorePercentage = totalQuestions > 0 ? (finalScore / totalQuestions) * 100 : 0;

    let actualPointsAwarded = 0;
    if (scorePercentage >= 70) { // Example: award full points if score is >= 70%
      actualPointsAwarded = pointsFromQuiz;
    } else if (scorePercentage >= 50) { // Example: award half points if score is >= 50%
      actualPointsAwarded = Math.round(pointsFromQuiz / 2);
    }
    
    // Award badge only if passed significantly (e.g., 70%+)
    const badgeToAward = scorePercentage >= 70 ? resource.badgeAwardedOnCompletion : undefined;
    onCompleteResource(resource.id, actualPointsAwarded, badgeToAward);
  };


  return (
    <div className={`bg-purple-50 p-3.5 rounded-lg shadow-sm border border-purple-200 hover:shadow-md transition-shadow duration-200 flex flex-col h-full ${quizAttempted && resource.type==='quiz' ? 'opacity-70' : ''}`}>
      <div className="flex items-start mb-2">
        <div className="p-2 bg-purple-100 rounded-full mr-3 rtl:ml-3 rtl:mr-0 flex-shrink-0">
          {getIcon()}
        </div>
        <div>
          <h4 className="text-sm font-semibold text-purple-700">{toPersianDigits(resource.title)}</h4>
          <p className="text-xs text-purple-500">{toPersianDigits(typeLabels[resource.type])}</p>
        </div>
      </div>
      <p className="text-xs text-gray-600 mb-3 leading-relaxed flex-grow">{toPersianDigits(resource.description)}</p>
      
      {showQuiz && resource.quiz ? (
        <PrivacyQuiz
          quiz={resource.quiz}
          resourceId={resource.id}
          onQuizComplete={handleQuizCompletionInternal}
          onCloseQuiz={() => setShowQuiz(false)}
        />
      ) : (
        <>
          <div className="text-[10px] text-gray-500 mb-2">
            {toPersianDigits(`امتیاز: ${resource.pointsAwarded}`)}
            {resource.badgeAwardedOnCompletion && ` | ${toPersianDigits("نشان اهدایی: ")}${toPersianDigits(availablePrivacyBadges.find(b=>b.id===resource.badgeAwardedOnCompletion)?.name || '')}`}
          </div>
          {quizAttempted && resource.type === 'quiz' && quizScore !== null && (
            <p className="text-xs text-green-700 bg-green-100 p-1.5 rounded-md mb-2">
                {toPersianDigits(`شما این آزمون را با امتیاز ${quizScore} از ${resource.quiz?.reduce((sum, q) => sum + (q.points ?? 0), 0) || 0} تکمیل کرده‌اید.`)}
            </p>
          )}
          <button 
            onClick={handlePrimaryAction}
            disabled={quizAttempted && resource.type === 'quiz'}
            className={`mt-auto w-full bg-purple-500 hover:bg-purple-600 text-white text-xs font-medium py-1.5 px-3 rounded-md transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {resource.type === 'quiz' 
                ? (quizAttempted ? toPersianDigits("آزمون تکمیل شده") : toPersianDigits("شروع آزمون"))
                : typeLabels[resource.type] === 'مقاله' ? toPersianDigits("مطالعه مقاله") 
                : toPersianDigits("مشاهده ویدیو")
            }
            {!quizAttempted && <ArrowRightIcon className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0 transform scale-x-[-1]" />}
            {quizAttempted && resource.type === 'quiz' && <CheckCircleIcon className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0"/>}
          </button>
        </>
      )}
    </div>
  );
};

// Need to import availablePrivacyBadges if this component is to display badge names.
// For now, assuming it's just a placeholder. Or, pass badge name via props.
// Simplified to not require all badges for now.
import { availablePrivacyBadges } from '../PrivacyPage'; // Temporary direct import for badge name, ideally pass badge name/info

export default LearningResourceCard;
