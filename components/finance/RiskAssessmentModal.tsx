
import React, { useState } from 'react';
import { toPersianDigits } from '../../utils';
import { XMarkIcon, LightbulbIcon, CheckCircleIcon } from '../shared/AppIcons';
import { UserRiskProfile } from '../../types/financeTypes'; // Ensure this type is defined

interface RiskAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProfileSet: (profile: UserRiskProfile) => void;
}

const questions = [
  { id: 'q1', text: toPersianDigits("کدام گزینه بهتر بیانگر نگرش شما نسبت به سرمایه‌گذاری است؟"), options: [ { text: toPersianDigits("حفظ اصل پول مهمتر از سود بالا است."), value: 1 }, { text: toPersianDigits("حاضرم مقداری ریسک برای سود بیشتر بپذیرم."), value: 2 }, { text: toPersianDigits("برای کسب سودهای قابل توجه، ریسک‌های بزرگ را می‌پذیرم."), value: 3 } ] },
  { id: 'q2', text: toPersianDigits("اگر سرمایه‌گذاری شما در یک ماه ۱۰٪ افت کند، واکنش شما چیست؟"), options: [ { text: toPersianDigits("نگران می‌شوم و احتمالاً سرمایه‌ام را خارج می‌کنم."), value: 1 }, { text: toPersianDigits("صبر می‌کنم و امیدوارم وضعیت بهتر شود."), value: 2 }, { text: toPersianDigits("فرصتی برای خرید بیشتر می‌بینم."), value: 3 } ] },
  { id: 'q3', text: toPersianDigits("تجربه شما در سرمایه‌گذاری در بازارهای پرریسک (مانند سهام یا ارز دیجیتال) چقدر است؟"), options: [ { text: toPersianDigits("کم یا هیچ."), value: 1 }, { text: toPersianDigits("مقداری تجربه دارم."), value: 2 }, { text: toPersianDigits("تجربه زیادی دارم."), value: 3 } ] },
];

const RiskAssessmentModal: React.FC<RiskAssessmentModalProps> = ({ isOpen, onClose, onProfileSet }) => {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [calculatedProfile, setCalculatedProfile] = useState<UserRiskProfile | null>(null);

  const handleOptionSelect = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateProfile();
      setShowResult(true);
    }
  };

  const calculateProfile = () => {
    const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
    const averageScore = totalScore / questions.length;
    if (averageScore < 1.7) setCalculatedProfile('محافظه‌کار');
    else if (averageScore < 2.4) setCalculatedProfile('متعادل');
    else setCalculatedProfile('جسور');
  };
  
  const resetAndClose = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setShowResult(false);
    setCalculatedProfile(null);
    onClose();
  };
  
  const handleSetProfile = () => {
    if (calculatedProfile) {
        onProfileSet(calculatedProfile);
    }
  };

  if (!isOpen) return null;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4" onClick={resetAndClose}>
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto modal-scroll-content" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <LightbulbIcon className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0 text-indigo-600" />
            {toPersianDigits("ارزیابی پروفایل ریسک سرمایه‌گذاری")}
          </h2>
          <button onClick={resetAndClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {!showResult ? (
          <div>
            <p className="text-sm text-gray-700 mb-2">{toPersianDigits(currentQuestion.text)}</p>
            <p className="text-xs text-gray-500 mb-4">{toPersianDigits(`سوال ${currentQuestionIndex + 1} از ${questions.length}`)}</p>
            <div className="space-y-2">
              {currentQuestion.options.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => handleOptionSelect(currentQuestion.id, opt.value)}
                  className="w-full text-sm text-left rtl:text-right p-3 border border-gray-300 rounded-md hover:bg-indigo-50 hover:border-indigo-400 transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  {toPersianDigits(opt.text)}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h3 className="text-md font-semibold text-gray-800 mb-2">{toPersianDigits("نتیجه ارزیابی شما:")}</h3>
            <p className="text-xl font-bold text-indigo-600 mb-4">{toPersianDigits(calculatedProfile || '')}</p>
            <p className="text-xs text-gray-600 mb-4">
                {calculatedProfile === 'محافظه‌کار' && toPersianDigits("شما ترجیح می‌دهید ریسک کمتری متحمل شوید و حفظ اصل سرمایه برایتان در اولویت است.")}
                {calculatedProfile === 'متعادل' && toPersianDigits("شما مایل به پذیرش ریسک متوسط برای کسب سود متعادل هستید.")}
                {calculatedProfile === 'جسور' && toPersianDigits("شما برای دستیابی به سودهای بالا، آماده پذیرش ریسک‌های قابل توجه هستید.")}
            </p>
            <button onClick={handleSetProfile} className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm flex items-center justify-center">
              <CheckCircleIcon className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0"/> {toPersianDigits("تایید و ذخیره پروفایل")}
            </button>
          </div>
        )}
         <p className="text-[10px] text-gray-400 mt-4 text-center">{toPersianDigits("این ارزیابی یک راهنمایی کلی است و نباید به عنوان مشاوره سرمایه‌گذاری تلقی شود.")}</p>
      </div>
    </div>
  );
};

export default RiskAssessmentModal;
