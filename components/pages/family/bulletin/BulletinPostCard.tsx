import React from 'react';
import { toPersianDigits } from '../../../../utils'; 
import { BulletinPost } from '../../../../types/familyTypes'; 
import { TrashIcon, PencilIcon } from '../../../shared/AppIcons'; 

interface BulletinPostCardProps {
  post: BulletinPost;
  onDelete: () => void;
  onEdit: () => void; // Added onEdit prop
}

const BulletinPostCard: React.FC<BulletinPostCardProps> = ({ post, onDelete, onEdit }) => {
  const colorClass = post.color ? `bulletin-post-${post.color}` : 'bulletin-post-yellow';

  return (
    <div className={`bulletin-post-card ${colorClass}`}>
      <p className="text-xs leading-relaxed flex-grow whitespace-pre-wrap">{toPersianDigits(post.text)}</p>
      <div className="mt-2 pt-1 border-t border-black/10 flex justify-between items-center text-[10px]">
        <span className="text-gray-600">
          {toPersianDigits(`توسط: کاربر`)} - {toPersianDigits(new Date(post.timestamp).toLocaleDateString('fa-IR'))}
        </span>
        <div className="flex space-x-1 space-x-reverse">
          <button onClick={onEdit} className="text-gray-500 hover:text-blue-500 p-0.5" aria-label={toPersianDigits("ویرایش یادداشت")}>
            <PencilIcon className="w-3 h-3" />
          </button>
          <button onClick={onDelete} className="text-gray-500 hover:text-red-500 p-0.5" aria-label={toPersianDigits("حذف یادداشت")}>
            <TrashIcon className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulletinPostCard;