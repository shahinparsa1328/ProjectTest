import React from 'react';
import { toPersianDigits } from '../../utils';

interface PrivacyBenefitItemProps {
  icon: React.ReactElement<{ className?: string }>;
  title: string;
  description: string;
}

const PrivacyBenefitItem: React.FC<PrivacyBenefitItemProps> = ({ icon, title, description }) => (
  <div className="flex items-start space-x-3 space-x-reverse rtl:space-x-reverse p-3 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow h-full">
    <div className="flex-shrink-0 p-2 bg-sky-100 text-sky-600 rounded-full">
      {React.cloneElement(icon, { className: "w-5 h-5" })}
    </div>
    <div>
      <h4 className="text-sm font-semibold text-gray-700">{toPersianDigits(title)}</h4>
      <p className="text-xs text-gray-600 leading-relaxed">{toPersianDigits(description)}</p>
    </div>
  </div>
);

export default PrivacyBenefitItem;
