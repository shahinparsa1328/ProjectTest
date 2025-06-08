
import React from 'react';
import { toPersianDigits } from '../../utils';
import { ShieldCheckIcon } from '../shared/AppIcons';

interface DisclaimerProps {
  text?: string;
  className?: string;
}

const Disclaimer: React.FC<DisclaimerProps> = ({ text, className = "" }) => {
  const defaultText = toPersianDigits(
    "مهم: اطلاعات و ابزارهای ارائه شده در این بخش صرفاً برای اهداف آموزشی و شبیه‌سازی هستند. این پلتفرم مشاوره مالی یا سرمایه‌گذاری ارائه نمی‌دهد. تمام تصمیمات مالی و سرمایه‌گذاری با مسئولیت کامل شما انجام می‌شود. قبل از هرگونه تصمیم‌گیری مالی مهم، لطفاً با یک مشاور مالی متخصص مشورت کنید."
  );

  return (
    <div className={`p-3 bg-yellow-50 border-l-4 rtl:border-r-4 rtl:border-l-0 border-yellow-400 rounded-md text-yellow-700 text-xs leading-relaxed flex items-start ${className}`}>
      <ShieldCheckIcon className="w-6 h-6 text-yellow-500 mr-2 rtl:ml-2 rtl:mr-0 flex-shrink-0 mt-0.5" />
      <p>{text || defaultText}</p>
    </div>
  );
};

export default Disclaimer;
