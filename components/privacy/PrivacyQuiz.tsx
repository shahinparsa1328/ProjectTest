
import React, { useState } from 'react';
import { toPersianDigits } from '../../utils';
import { PrivacyQuizQuestion, PrivacyQuizQuestionOption } from '../../types/privacyTypes';
import { CheckCircleIcon, XCircleIcon, LightbulbIcon, ArrowRightIcon } from '../shared/AppIcons';

interface PrivacyQuizProps {
  quiz: PrivacyQuizQuestion[];
  resourceId: string; // To identify which resource this quiz belongs to
  onQuizComplete: (finalScore: number, totalQuestions: number) => void;
  onCloseQuiz: () => void;
}

const PrivacyQuiz: React.FC<PrivacyQuizProps> = ({ quiz, resourceId, onQuizComplete, onCloseQuiz }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({}); // {[questionId]: optionId}
  const [showFeedback, setShowFeedback] = useState(false);

  const currentQuestion = quiz[currentQuestionIndex];

  const handleOptionSelect = (optionId: string) => {
    if (showFeedback) return; // Don't allow changing answer after feedback shown for current question
    setSelectedAnswers(prev => ({ ...prev, [currentQuestion.id]: optionId }));
    setShowFeedback(true); // Show feedback immediately after selection
  };

  const handleNext = () => {
    if (!selectedAnswers[currentQuestion.id]) {
      alert(toPersianDigits("لطفاً یک گزینه را انتخاب کنید."));
      return;
    }
    setShowFeedback(false); // Hide feedback for the next question
    if (currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Quiz finished
      let score = 0;
      quiz.forEach(q => {
        if (selectedAnswers[q.id] === q.correctAnswerId) {
          score += (q.points ?? 0); // Award points for correct answer
        }
      });
      onQuizComplete(score, quiz.reduce((sum, q) => sum + (q.points ?? 0), 0));
    }
  };

  const isCorrect = selectedAnswers[currentQuestion.id] === currentQuestion.correctAnswerId;

  return (
    <div className="mt-2 p-3 bg-white rounded-md border border-purple-300 shadow-inner">
      <h5 className="text-xs font-semibold text-purple-700 mb-2">
        {toPersianDigits(`سوال ${currentQuestionIndex + 1} از ${quiz.length}`)}
      </h5>
      <p className="text-xs text-gray-700 mb-3 leading-relaxed">{toPersianDigits(currentQuestion.questionText)}</p>
      
      <div className="space-y-1.5 mb-3">
        {currentQuestion.options.map(option => {
          const isSelected = selectedAnswers[currentQuestion.id] === option.id;
          let optionClasses = "w-full text-right p-2 border rounded-md text-xs transition-colors duration-150 ";
          if (showFeedback) {
            if (option.id === currentQuestion.correctAnswerId) {
              optionClasses += "bg-green-100 border-green-400 text-green-700";
            } else if (isSelected && option.id !== currentQuestion.correctAnswerId) {
              optionClasses += "bg-red-100 border-red-400 text-red-700";
            } else {
              optionClasses += "bg-gray-100 border-gray-300 text-gray-600 opacity-70";
            }
          } else {
            optionClasses += isSelected ? "bg-purple-200 border-purple-400 text-purple-700" : "bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-700";
          }

          return (
            <button
              key={option.id}
              onClick={() => handleOptionSelect(option.id)}
              disabled={showFeedback}
              className={optionClasses}
              aria-pressed={isSelected}
            >
              <span className="flex items-center">
                {showFeedback && isSelected && (isCorrect ? <CheckCircleIcon className="w-3.5 h-3.5 text-green-600 ml-1 rtl:mr-1"/> : <XCircleIcon className="w-3.5 h-3.5 text-red-600 ml-1 rtl:mr-1"/>)}
                {toPersianDigits(option.text)}
              </span>
            </button>
          );
        })}
      </div>

      {showFeedback && currentQuestion.explanation && (
          <div className={`p-1.5 rounded-md text-xs mb-2 ${isCorrect ? 'bg-green-50 border-green-200 text-green-700' : 'bg-yellow-50 border-yellow-200 text-yellow-700'}`}>
              <LightbulbIcon className="w-3 h-3 inline mr-1 rtl:ml-1 rtl:mr-0" /> 
              {toPersianDigits(currentQuestion.explanation)}
          </div>
      )}
       {/* Removed incorrectAnswerFeedback logic as it's not in PrivacyQuizQuestion type */}


      <div className="flex justify-between items-center mt-2">
        <button
          onClick={onCloseQuiz}
          className="text-xs text-gray-500 hover:text-gray-700 py-1 px-2"
        >
          {toPersianDigits("انصراف از آزمون")}
        </button>
        <button
          onClick={handleNext}
          disabled={!showFeedback && !selectedAnswers[currentQuestion.id]} // Enable only after an answer or if feedback is shown
          className="bg-purple-500 hover:bg-purple-600 text-white text-xs font-medium py-1.5 px-3 rounded-md transition-colors disabled:opacity-50 flex items-center"
        >
          {toPersianDigits(currentQuestionIndex < quiz.length - 1 ? "سوال بعدی" : "پایان و مشاهده نتیجه")}
          {currentQuestionIndex < quiz.length - 1 && <ArrowRightIcon className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0 transform scale-x-[-1]" />}
        </button>
      </div>
    </div>
  );
};

export default PrivacyQuiz;
