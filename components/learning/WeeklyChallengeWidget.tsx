import React, { useState, useEffect } from 'react';
import { WeeklyChallenge } from '../../types/learningTypes';
import { toPersianDigits } from '../../utils';
import { ChallengeIcon, ClockIcon, ArrowRightIcon } from '../shared/AppIcons';

interface WeeklyChallengeWidgetProps {
  challenge: WeeklyChallenge | null; 
  onStartChallenge: (challengeId: string) => void;
  onAwardPoints?: (points: number, actionDescription: string) => void;
}

const WeeklyChallengeWidget: React.FC<WeeklyChallengeWidgetProps> = ({ challenge, onStartChallenge, onAwardPoints }) => {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    if (challenge && challenge.status === 'active') {
      const intervalId = setInterval(() => {
        const now = new Date().getTime();
        const dueDate = new Date(challenge.dueDate).getTime();
        const distance = dueDate - now;

        if (distance < 0) {
          setTimeLeft(toPersianDigits("مهلت تمام شده"));
          clearInterval(intervalId);
          return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        
        let timeLeftString = "";
        if (days > 0) timeLeftString += `${toPersianDigits(days.toString())} روز `;
        if (hours > 0) timeLeftString += `${toPersianDigits(hours.toString())} ساعت `;
        if (minutes > 0 && days === 0) timeLeftString += `${toPersianDigits(minutes.toString())} دقیقه `;
        setTimeLeft(timeLeftString.trim() || toPersianDigits("کمتر از یک دقیقه"));

      }, 1000);
      return () => clearInterval(intervalId);
    } else if (challenge && challenge.status === 'completed') {
      setTimeLeft(toPersianDigits("تکمیل شده"));
    } else if (challenge && challenge.status === 'expired') {
      setTimeLeft(toPersianDigits("منقضی شده"));
    } else {
      setTimeLeft('');
    }
  }, [challenge]);

  const handleStart = () => {
    if (challenge) {
        onStartChallenge(challenge.id);
        // Simulate completion for points for now when "Start Challenge" is clicked
        if(challenge.rewardPoints && challenge.status !== 'completed') { 
            onAwardPoints?.(challenge.rewardPoints, `شروع چالش: ${challenge.title}`);
        }
    }
  };

  if (!challenge) {
    return (
      <div className="p-4 bg-white rounded-xl shadow-md border border-gray-200/80 text-center">
        <ChallengeIcon className="w-10 h-10 text-gray-400 mx-auto mb-2" />
        <p className="text-sm text-gray-500">{toPersianDigits("در حال حاضر چالش فعالی وجود ندارد.")}</p>
      </div>
    );
  }

  const accentColor = challenge.status === 'active' ? 'purple' : 'gray';

  return (
    <div className={`p-4 bg-gradient-to-br from-${accentColor}-500 to-${accentColor}-600 text-white rounded-xl shadow-lg`}>
      <div className="flex items-center mb-3">
        <ChallengeIcon className={`w-7 h-7 mr-2 rtl:ml-2 rtl:mr-0 text-${accentColor}-200`} />
        <h3 className="text-lg font-semibold">{toPersianDigits("چالش هفتگی")}</h3>
      </div>
      <h4 className="text-md font-medium mb-1">{toPersianDigits(challenge.title)}</h4>
      <p className="text-xs opacity-90 mb-2 leading-relaxed">{toPersianDigits(challenge.description)}</p>
      <p className="text-xs opacity-80 mb-3">
        {toPersianDigits(`مهارت: ${challenge.skillApplied}`)}
        {challenge.rewardPoints && ` | ${toPersianDigits(`امتیاز: ${challenge.rewardPoints}`)}`}
      </p>
      
      <div className="flex items-center justify-between text-xs mb-3 bg-black/20 px-2 py-1 rounded-md">
        <div className="flex items-center">
          <ClockIcon className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
          <span>{toPersianDigits("زمان باقی‌مانده:")}</span>
        </div>
        <span className="font-medium">{timeLeft}</span>
      </div>
      
      {challenge.status === 'active' && (
        <button 
          onClick={handleStart}
          className={`w-full bg-white text-${accentColor}-600 hover:bg-${accentColor}-100 font-medium py-2 px-4 rounded-md text-sm transition-colors flex items-center justify-center`}
        >
          {toPersianDigits("شروع چالش")} <ArrowRightIcon className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0 transform scale-x-[-1]"/>
        </button>
      )}
       {challenge.status === 'completed' && (
        <p className="text-sm text-center font-semibold text-green-300 bg-green-700/50 py-1.5 rounded-md">{toPersianDigits("چالش با موفقیت تکمیل شد! 🎉")}</p>
      )}
      {challenge.status === 'expired' && !timeLeft.includes("تمام شده") && (
         <p className="text-sm text-center font-semibold text-red-300 bg-red-700/50 py-1.5 rounded-md">{toPersianDigits("مهلت این چالش به پایان رسیده است.")}</p>
      )}
    </div>
  );
};

export default WeeklyChallengeWidget;