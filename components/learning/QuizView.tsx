
import React, { useState } from 'react';
import { Quiz, QuizQuestion } from '../../types/learningTypes';
import { toPersianDigits } from '../../utils';
import { CheckCircleIcon, XCircleIcon, ArrowRightIcon, LightbulbIcon, BookIcon } from '../shared/AppIcons';

interface QuizViewProps {
  quiz: Quiz;
  moduleId: string;
  onQuizComplete: (score: number, totalQuestions: number, moduleId: string) => void;
  onClose?: () => void; 
}

const QuizView: React.FC<QuizViewProps> = ({ quiz, moduleId, onQuizComplete, onClose }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({}); 
  const [showResults, setShowResults] = useState(false);
  const [attemptedCurrent, setAttemptedCurrent] = useState(false);

  const accentColor = 'sky-600';
  const currentQuestion = quiz[currentQuestionIndex];

  const handleOptionSelect = (optionId: string) => {
    if (attemptedCurrent) return; 
    setSelectedAnswers(prev => ({ ...prev, [currentQuestion.id]: optionId }));
    setAttemptedCurrent(true);
  };

  const handleNextQuestion = () => {
    if (!selectedAnswers[currentQuestion.id] && !attemptedCurrent) {
        alert(toPersianDigits("لطفاً یک گزینه را انتخاب کنید."));
        return;
    }
    setAttemptedCurrent(false); 
    if (currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResults(true); 
      const score = quiz.reduce((acc, q) => {
        return selectedAnswers[q.id] === q.correctOptionId ? acc + 1 : acc;
      }, 0);
      onQuizComplete(score, quiz.length, moduleId);
    }
  };

  if (showResults) {
    const score = quiz.reduce((acc, q) => selectedAnswers[q.id] === q.correctOptionId ? acc + 1 : acc, 0);
    const percentage = quiz.length > 0 ? Math.round((score / quiz.length) * 100) : 0;
    const correctAnswersCount = score;
    const incorrectAnswersCount = quiz.length - score;

    return (
      <div className="p-4 sm:p-6 bg-white rounded-lg shadow-xl border border-gray-200 w-full max-w-lg mx-auto my-4">
        <h3 className={`text-xl sm:text-2xl font-semibold text-${accentColor.replace('-600','-700')} mb-4 text-center`}>{toPersianDigits("نتایج آزمون")}</h3>
        <p className="text-lg text-gray-700 mb-2 text-center">
          {toPersianDigits(`امتیاز شما: ${percentage}%`)}
        </p>
        <p className="text-sm text-gray-600 mb-6 text-center">
          {toPersianDigits(`پاسخ‌های صحیح: ${correctAnswersCount} - پاسخ‌های نادرست: ${incorrectAnswersCount}`)}
        </p>
        
        <div className="mb-4">
          <h4 className="text-md font-semibold text-gray-700 mb-2">{toPersianDigits("تحلیل پاسخ‌ها:")}</h4>
          <div className="space-y-3 max-h-60 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {quiz.map((q, index) => {
              const userAnswerId = selectedAnswers[q.id];
              const isCorrect = userAnswerId === q.correctOptionId;
              const incorrectFeedback = q.incorrectAnswerFeedback && userAnswerId ? q.incorrectAnswerFeedback[userAnswerId] : null;

              return (
                <div key={q.id} className={`p-3 rounded-md border ${isCorrect ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'}`}>
                  <p className="text-sm font-medium text-gray-800">{toPersianDigits(`${index + 1}. ${q.questionText}`)}</p>
                  <p className={`text-xs mt-1 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                    {toPersianDigits(`پاسخ شما: ${q.options.find(opt => opt.id === userAnswerId)?.text || 'پاسخ داده نشده'}`)}
                    {!isCorrect && userAnswerId && (
                        <span className="block text-gray-600 mt-0.5">{toPersianDigits(`پاسخ صحیح: ${q.options.find(opt => opt.id === q.correctOptionId)?.text}`)}</span>
                    )}
                  </p>
                  {/* Enhanced Feedback Display */}
                  {isCorrect && q.explanation && (
                     <p className="text-xs text-gray-500 mt-1 italic bg-green-100 p-1.5 rounded border border-green-200 flex items-start">
                       <LightbulbIcon className="w-3.5 h-3.5 inline mr-1.5 rtl:ml-1.5 rtl:mr-0 text-yellow-500 mt-px flex-shrink-0"/>
                       <span>{toPersianDigits(q.explanation)}</span>
                    </p>
                  )}
                  {!isCorrect && incorrectFeedback && (
                    <div className="mt-1.5 p-1.5 bg-red-100 border border-red-200 rounded">
                        <p className="text-xs text-red-700">
                            <XCircleIcon className="w-3.5 h-3.5 inline mr-1 rtl:ml-1 rtl:mr-0 align-middle"/>
                            {toPersianDigits(incorrectFeedback.explanation)}
                        </p>
                        {incorrectFeedback.reviewLink && (
                            <button 
                                onClick={() => console.log(`Simulating navigation to review link: ${incorrectFeedback.reviewLink}`)} 
                                className="text-xs text-blue-600 hover:underline mt-1 flex items-center"
                            >
                                <BookIcon className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0"/>
                                {toPersianDigits(incorrectFeedback.reviewLinkText || "مرور مطلب مرتبط")}
                            </button>
                        )}
                    </div>
                  )}
                   {!isCorrect && !incorrectFeedback && q.explanation && ( // Fallback to general explanation if specific incorrect feedback is missing
                     <p className="text-xs text-gray-500 mt-1 italic bg-red-100 p-1.5 rounded border border-red-200 flex items-start">
                       <LightbulbIcon className="w-3.5 h-3.5 inline mr-1.5 rtl:ml-1.5 rtl:mr-0 text-yellow-500 mt-px flex-shrink-0"/>
                       <span>{toPersianDigits(q.explanation)}</span>
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {onClose && (
            <button
                onClick={onClose}
                className={`mt-6 w-full bg-${accentColor} hover:bg-${accentColor.replace('-600','-700')} text-white font-medium py-2.5 px-4 rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-${accentColor} focus:ring-offset-2`}
            >
                {toPersianDigits("بازگشت به جزئیات مسیر")}
            </button>
        )}
      </div>
    );
  }

  if (!currentQuestion) {
    return <div className="p-6 text-center text-gray-600">{toPersianDigits("آزمونی برای این ماژول یافت نشد یا بارگذاری نشد.")}</div>;
  }

  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow-xl border border-gray-200 w-full max-w-lg mx-auto my-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className={`text-lg font-semibold text-${accentColor.replace('-600','-700')}`}>{toPersianDigits(`سوال ${currentQuestionIndex + 1} از ${quiz.length}`)}</h3>
        {onClose && <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><XCircleIcon className="w-6 h-6"/></button>}
      </div>
      <p className="text-md text-gray-800 mb-6 min-h-[40px] leading-relaxed">{toPersianDigits(currentQuestion.questionText)}</p>
      
      <div className="space-y-3 mb-6">
        {currentQuestion.options.map(option => {
          const isSelected = selectedAnswers[currentQuestion.id] === option.id;
          const isCorrect = option.id === currentQuestion.correctOptionId;
          
          let optionClass = "border-gray-300 hover:bg-gray-100 text-gray-700"; 
          if (attemptedCurrent) { 
            if (isCorrect) {
              optionClass = "border-green-500 bg-green-100 text-green-700 ring-1 ring-green-400"; 
            } else if (isSelected && !isCorrect) {
              optionClass = "border-red-500 bg-red-100 text-red-700 ring-1 ring-red-400"; 
            } else {
              optionClass = "border-gray-300 text-gray-500 opacity-70"; 
            }
          } else if (isSelected) { 
            optionClass = `border-${accentColor} bg-${accentColor.split('-')[0]}-50 text-${accentColor} ring-1 ring-${accentColor.replace('-600','-400')}`;
          }

          return (
            <button
              key={option.id}
              onClick={() => handleOptionSelect(option.id)}
              disabled={attemptedCurrent} 
              className={`w-full text-right p-3 border rounded-md text-sm transition-all duration-150 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-${accentColor} ${optionClass} ${attemptedCurrent ? 'cursor-default' : 'cursor-pointer'}`}
              aria-pressed={isSelected}
            >
              <span className="flex items-center">
                {attemptedCurrent && isSelected && (isCorrect ? <CheckCircleIcon className="w-5 h-5 ml-2 rtl:mr-2 rtl:ml-0 text-green-600"/> : <XCircleIcon className="w-5 h-5 ml-2 rtl:mr-2 rtl:ml-0 text-red-600"/>)}
                {attemptedCurrent && !isSelected && isCorrect && <CheckCircleIcon className="w-5 h-5 ml-2 rtl:mr-2 rtl:ml-0 text-green-600 opacity-60"/>}
                {toPersianDigits(option.text)}
              </span>
            </button>
          );
        })}
      </div>

      {attemptedCurrent && currentQuestion.explanation && (
          <div className="mb-4 p-3 bg-gray-100 rounded-md text-xs text-gray-600 border border-gray-200 flex items-start">
              <LightbulbIcon className="w-4 h-4 inline mr-2 rtl:ml-2 rtl:mr-0 text-yellow-500 mt-px flex-shrink-0"/>
              <span><strong>{toPersianDigits("توضیح: ")}</strong>{toPersianDigits(currentQuestion.explanation)}</span>
          </div>
      )}
       {attemptedCurrent && currentQuestion.incorrectAnswerFeedback && selectedAnswers[currentQuestion.id] && ! (selectedAnswers[currentQuestion.id] === currentQuestion.correctOptionId) && currentQuestion.incorrectAnswerFeedback[selectedAnswers[currentQuestion.id]] && (
           <div className="mb-4 p-3 bg-red-50 rounded-md text-xs text-red-700 border border-red-200 flex flex-col">
                <div className="flex items-start">
                    <XCircleIcon className="w-4 h-4 inline mr-2 rtl:ml-2 rtl:mr-0 text-red-600 mt-px flex-shrink-0"/>
                    <span><strong>{toPersianDigits("بازخورد: ")}</strong>{toPersianDigits(currentQuestion.incorrectAnswerFeedback[selectedAnswers[currentQuestion.id]].explanation)}</span>
                </div>
                {currentQuestion.incorrectAnswerFeedback[selectedAnswers[currentQuestion.id]].reviewLink && (
                     <button 
                        onClick={() => console.log(`Simulating navigation to review link: ${currentQuestion.incorrectAnswerFeedback![selectedAnswers[currentQuestion.id]].reviewLink}`)} 
                        className="text-xs text-blue-600 hover:underline mt-1.5 self-start flex items-center"
                    >
                        <BookIcon className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0"/>
                        {toPersianDigits(currentQuestion.incorrectAnswerFeedback[selectedAnswers[currentQuestion.id]].reviewLinkText || "مرور مطلب مرتبط")}
                    </button>
                )}
           </div>
       )}


      <button
        onClick={handleNextQuestion}
        disabled={!attemptedCurrent && !selectedAnswers[currentQuestion.id]} // Allow next if attempted (feedback shown) or an answer selected
        className={`w-full bg-${accentColor} hover:bg-${accentColor.replace('-600','-700')} text-white font-medium py-2.5 px-4 rounded-md text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-${accentColor} focus:ring-offset-2`}
      >
        {toPersianDigits(currentQuestionIndex < quiz.length - 1 ? "سوال بعدی" : "پایان آزمون و مشاهده نتایج")}
        <ArrowRightIcon className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0 transform scale-x-[-1]"/>
      </button>
    </div>
  );
};

export default QuizView;
