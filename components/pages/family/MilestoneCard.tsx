import React from 'react';
import { toPersianDigits } from '../../../utils';
import { DevelopmentMilestone, MilestoneType } from '../../../types/familyTypes';
import { PencilIcon, TrashIcon, AcademicCapIcon, HeartIcon, SparklesIconNav, ListIcon, CalendarDaysIcon, ChatBubbleOvalLeftEllipsisIcon, CheckCircleIcon, ScaleIcon } from '../../shared/AppIcons';

interface MilestoneCardProps {
  milestone: DevelopmentMilestone;
  childName: string;
  onEdit: (milestone: DevelopmentMilestone) => void; // Pass the milestone to edit
  onDelete: (milestoneId: string) => void; // Pass ID to delete
}

const getMilestoneIcon = (type: MilestoneType): React.ReactElement => {
  const iconClass = "w-5 h-5";
  switch (type) {
    case 'اولین لبخند': return <HeartIcon className={`${iconClass} text-pink-500`} />;
    case 'اولین کلمات': return <ChatBubbleOvalLeftEllipsisIcon className={`${iconClass} text-blue-500`} />;
    case 'اولین قدم‌ها': return <SparklesIconNav className={`${iconClass} text-yellow-500`} />;
    case 'قد و وزن دوره‌ای': return <ScaleIcon className={`${iconClass} text-green-500`} />;
    case 'چکاپ پزشکی':
    case 'واکسیناسیون':
      return <CheckCircleIcon className={`${iconClass} text-teal-500`} />;
    default: return <AcademicCapIcon className={`${iconClass} text-purple-500`} />;
  }
};

const MilestoneCard: React.FC<MilestoneCardProps> = ({ milestone, childName, onEdit, onDelete }) => {
  const formattedDate = new Date(milestone.date).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' });
  const icon = getMilestoneIcon(milestone.type);

  return (
    <div className="bg-white p-3.5 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-150">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center">
          <div className="p-1.5 bg-gray-100 rounded-full mr-2 rtl:ml-2 rtl:mr-0 flex-shrink-0">
            {icon}
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-800">{toPersianDigits(milestone.type)}</h4>
            <p className="text-xs text-gray-500">{toPersianDigits(`برای: ${childName}`)} - {formattedDate}</p>
          </div>
        </div>
        <div className="flex space-x-1 space-x-reverse">
            <button onClick={() => onEdit(milestone)} className="p-1 text-yellow-500 hover:bg-yellow-100 rounded-full" aria-label={toPersianDigits("ویرایش نقطه عطف")}>
                <PencilIcon className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => onDelete(milestone.id)} className="p-1 text-red-500 hover:bg-red-100 rounded-full" aria-label={toPersianDigits("حذف نقطه عطف")}>
                <TrashIcon className="w-3.5 h-3.5" />
            </button>
        </div>
      </div>

      {milestone.value && (
        <p className="text-xs text-gray-700 mb-1">
          <strong>{toPersianDigits("مقدار/جزئیات: ")}</strong>{toPersianDigits(milestone.value)}
        </p>
      )}
      {milestone.description && (
        <p className="text-xs text-gray-600 mb-1 leading-relaxed">
            <strong>{toPersianDigits("توضیحات: ")}</strong>{toPersianDigits(milestone.description)}
        </p>
      )}
      {milestone.notes && (
        <p className="text-xs text-gray-500 italic bg-gray-50 p-1.5 rounded border border-gray-100">
            <strong>{toPersianDigits("یادداشت: ")}</strong>{toPersianDigits(milestone.notes)}
        </p>
      )}
    </div>
  );
};

export default MilestoneCard;