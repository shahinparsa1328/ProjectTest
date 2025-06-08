
import React from 'react';
import { toPersianDigits } from '../../utils';
import { PencilIcon, TrashIcon, CalendarDaysIcon } from '../shared/AppIcons';

export interface Subscription {
  id: string;
  name: string;
  amount: number;
  billingCycle: 'monthly' | 'annually' | 'quarterly' | 'biannually';
  nextPaymentDate?: string;
  category: string; // e.g., streaming, software, gaming
}

interface SubscriptionListItemProps {
  subscription: Subscription;
  onEdit: (subscription: Subscription) => void;
  onDelete: (subscriptionId: string) => void;
}

const subscriptionCategoryTranslations: Record<string, string> = {
  streaming: toPersianDigits("سرویس پخش"),
  software: toPersianDigits("نرم‌افزار"),
  gaming: toPersianDigits("بازی"),
  news_magazine: toPersianDigits("روزنامه/مجله"),
  fitness_wellness: toPersianDigits("تناسب اندام/سلامتی"),
  education: toPersianDigits("آموزشی"),
  other: toPersianDigits("سایر"),
};

const billingCycleTranslations: Record<Subscription['billingCycle'], string> = {
  monthly: toPersianDigits("ماهانه"),
  annually: toPersianDigits("سالانه"),
  quarterly: toPersianDigits("سه‌ماهه"),
  biannually: toPersianDigits("شش‌ماهه"),
};


const SubscriptionListItem: React.FC<SubscriptionListItemProps> = ({ subscription, onEdit, onDelete }) => {
  const formattedAmount = `${toPersianDigits(subscription.amount.toLocaleString('fa-IR'))} ${toPersianDigits("تومان")}`;
  const formattedNextPaymentDate = subscription.nextPaymentDate 
    ? new Date(subscription.nextPaymentDate).toLocaleDateString('fa-IR', { day: '2-digit', month: 'long' })
    : toPersianDigits("نامشخص");
  const categoryDisplay = subscriptionCategoryTranslations[subscription.category] || toPersianDigits(subscription.category);
  const billingCycleDisplay = billingCycleTranslations[subscription.billingCycle];

  const getCategoryIcon = (categoryKey: string) => {
    // Basic icon logic, can be expanded
    switch(categoryKey) {
        case 'streaming': return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-blue-500"><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" /></svg>;
        case 'software': return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-purple-500"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.375 .75A2.25 2.25 0 0112 21h0a2.25 2.25 0 01-2.25-2.25.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v.75m0 0v-3.75m0 3.75h.75A2.25 2.25 0 0015 18v-1.5m0 0A2.25 2.25 0 0012.75 15h-1.5A2.25 2.25 0 009 16.5v1.5m0 0V8.25m5.25 5.25V8.25" /></svg>;
        default: return <CalendarDaysIcon className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <li className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-150">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center">
          <div className="p-1.5 bg-blue-100 rounded-full mr-2 rtl:ml-2 rtl:mr-0 text-blue-600">
             {getCategoryIcon(subscription.category)}
          </div>
          <h4 className="text-sm font-medium text-gray-800 truncate" title={toPersianDigits(subscription.name)}>
            {toPersianDigits(subscription.name)}
          </h4>
        </div>
        <div className="flex space-x-1 space-x-reverse">
            <button 
                onClick={() => onEdit(subscription)} 
                className="p-1 text-yellow-500 hover:bg-yellow-100 rounded-full"
                aria-label={toPersianDigits("ویرایش اشتراک")}
            >
                <PencilIcon className="w-3.5 h-3.5" />
            </button>
            <button 
                onClick={() => onDelete(subscription.id)} 
                className="p-1 text-red-500 hover:bg-red-100 rounded-full"
                aria-label={toPersianDigits("حذف اشتراک")}
            >
                <TrashIcon className="w-3.5 h-3.5" />
            </button>
        </div>
      </div>

      <div className="text-xs text-gray-600 space-y-0.5">
        <p>{toPersianDigits(`مبلغ: ${formattedAmount} (${billingCycleDisplay})`)}</p>
        <p>{toPersianDigits(`دسته‌بندی: ${categoryDisplay}`)}</p>
        {subscription.nextPaymentDate && <p>{toPersianDigits(`پرداخت بعدی: ${formattedNextPaymentDate}`)}</p>}
      </div>
    </li>
  );
};

export default SubscriptionListItem;
