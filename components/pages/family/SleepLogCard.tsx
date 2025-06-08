
import React from 'react';
import { toPersianDigits } from '../../../utils';
import { SleepLog } from '../../../types/familyTypes';
import { BedIcon, PencilIcon, TrashIcon } from '../../shared/AppIcons';

interface SleepLogCardProps {
  log: SleepLog;
  childName: string;
  onEdit: () => void;
  onDelete: () => void;
}

const SleepLogCard: React.FC<SleepLogCardProps> = ({ log, childName, onEdit, onDelete }) => {
  const formattedDate = new Date(log.date).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' });

  const calculateDuration = (start: string, end: string, date: string): string => {
    const startDate = new Date(`${date}T${start}`);
    let endDate = new Date(`${date}T${end}`);
    if (endDate < startDate) { // Assumes sleep went overnight
      endDate.setDate(endDate.getDate() + 1);
    }
    const diffMs = endDate.getTime() - startDate.getTime();
    if (diffMs < 0) return toPersianDigits("نامعتبر");
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${toPersianDigits(hours.toString())} ساعت و ${toPersianDigits(minutes.toString())} دقیقه`;
  };

  const duration = calculateDuration(log.startTime, log.endTime, log.date);

  const qualityColor = log.quality === 'خوب' ? 'text-green-600 bg-green-100' : log.quality === 'متوسط' ? 'text-yellow-600 bg-yellow-100' : 'text-red-600 bg-red-100';

  return (
    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-150">
      <div className="flex items-start justify-between mb-1.5">
        <div className="flex items-center">
          <div className="p-1.5 bg-blue-100 rounded-full mr-2 rtl:ml-2 rtl:mr-0 text-blue-600">
            <BedIcon className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-800">{formattedDate}</h4>
            <p className="text-xs text-gray-500">{toPersianDigits(`برای: ${childName}`)}</p>
          </div>
        </div>
        <div className="flex space-x-1 space-x-reverse">
            <button onClick={onEdit} className="p-1 text-yellow-500 hover:bg-yellow-100 rounded-full" aria-label={toPersianDigits("ویرایش")}><PencilIcon className="w-3.5 h-3.5" /></button>
            <button onClick={onDelete} className="p-1 text-red-500 hover:bg-red-100 rounded-full" aria-label={toPersianDigits("حذف")}><TrashIcon className="w-3.5 h-3.5" /></button>
        </div>
      </div>
      <div className="text-xs text-gray-600 space-y-0.5">
        <p>{toPersianDigits(`زمان خواب: ${log.startTime} - بیدار شدن: ${log.endTime}`)}</p>
        <p>{toPersianDigits(`مدت زمان کل: ${duration}`)}</p>
        {log.quality && <p>{toPersianDigits("کیفیت خواب: ")}<span className={`px-1.5 py-0.5 rounded-full text-[10px] ${qualityColor}`}>{toPersianDigits(log.quality)}</span></p>}
      </div>
      {log.notes && <p className="text-xs text-gray-500 italic bg-gray-50 p-1.5 rounded border border-gray-100 mt-1"><strong>{toPersianDigits("یادداشت: ")}</strong>{toPersianDigits(log.notes)}</p>}
    </div>
  );
};

export default SleepLogCard;
