import React from 'react';
import { toPersianDigits } from '../../../../utils'; 
import { BulletinPost } from '../../../../types/familyTypes'; 
import BulletinPostCard from './BulletinPostCard';
import { PlusIcon } from '../../../shared/AppIcons'; 

interface BulletinBoardProps {
  posts: BulletinPost[];
  onOpenAddPostModal: (postToEdit?: BulletinPost | null) => void; // Modified for editing
  onDeletePost: (postId: string) => void;
}

const BulletinBoard: React.FC<BulletinBoardProps> = ({ posts, onOpenAddPostModal, onDeletePost }) => {
  return (
    <div className="p-1">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-sm font-semibold text-gray-700">{toPersianDigits("تابلوی اعلانات خانواده")}</h4>
        <button
          onClick={() => onOpenAddPostModal(null)} // Call with null for new post
          className="flex items-center text-xs bg-yellow-500 hover:bg-yellow-600 text-white py-1.5 px-3 rounded-md transition-colors"
        >
          <PlusIcon className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0"/> {toPersianDigits("افزودن یادداشت جدید")}
        </button>
      </div>

      {posts.length === 0 ? (
        <p className="text-xs text-gray-500 text-center py-4">{toPersianDigits("هنوز یادداشتی روی تابلو نیست.")}</p>
      ) : (
        <div className="bulletin-board-grid">
          {posts.map(post => (
            <BulletinPostCard 
              key={post.id} 
              post={post} 
              onDelete={() => onDeletePost(post.id)} 
              onEdit={() => onOpenAddPostModal(post)} // Pass post for editing
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BulletinBoard;