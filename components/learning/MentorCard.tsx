import React from 'react';
import { MentorshipProfile } from '../../types/learningTypes';
import { toPersianDigits } from '../../utils';
import { UserCircleIcon as AvatarPlaceholder, AcademicCapIcon, ChatBubbleOvalLeftEllipsisIcon } from '../shared/AppIcons';

interface MentorCardProps {
  mentor: MentorshipProfile;
  onRequestMentorship: (mentorId: string) => void; // Placeholder
}

const MentorCard: React.FC<MentorCardProps> = ({ mentor, onRequestMentorship }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 flex flex-col items-center text-center sm:flex-row sm:text-right sm:items-start">
      {mentor.profileImageUrl ? (
        <img src={mentor.profileImageUrl} alt={toPersianDigits(mentor.userName)} className="w-20 h-20 rounded-full object-cover mb-3 sm:mb-0 sm:ml-4 rtl:sm:mr-4 rtl:sm:ml-0 flex-shrink-0" />
      ) : (
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-3 sm:mb-0 sm:ml-4 rtl:sm:mr-4 rtl:sm:ml-0 flex-shrink-0">
          <AvatarPlaceholder className="w-12 h-12 text-gray-400" />
        </div>
      )}
      <div className="flex-grow">
        <h4 className="text-md font-semibold text-indigo-700">{toPersianDigits(mentor.userName)}</h4>
        <p className="text-xs text-gray-500 mb-1">{toPersianDigits(mentor.experienceLevel)}</p>
        {mentor.bio && <p className="text-xs text-gray-600 mb-2 leading-relaxed line-clamp-2">{toPersianDigits(mentor.bio)}</p>}
        
        <div className="mb-2">
          <h5 className="text-xs font-medium text-gray-500 mb-0.5">{toPersianDigits("مهارت‌های مربیگری:")}</h5>
          <div className="flex flex-wrap gap-1 justify-center sm:justify-start">
            {mentor.skillsToMentor.slice(0, 3).map(skill => (
              <span key={skill} className="px-1.5 py-0.5 text-[10px] bg-indigo-100 text-indigo-700 rounded-full flex items-center">
                <AcademicCapIcon className="w-2.5 h-2.5 ml-0.5 rtl:mr-0.5 rtl:ml-0"/> {toPersianDigits(skill)}
              </span>
            ))}
            {mentor.skillsToMentor.length > 3 && <span className="text-[10px] text-gray-400">...</span>}
          </div>
        </div>
        <p className="text-xs text-gray-500 mb-3">{toPersianDigits(`در دسترس: ${mentor.availability}`)}</p>
        
        <button 
          onClick={() => onRequestMentorship(mentor.userId)}
          className="w-full sm:w-auto bg-indigo-500 hover:bg-indigo-600 text-white text-xs py-1.5 px-3 rounded-md transition-colors flex items-center justify-center"
        >
          <ChatBubbleOvalLeftEllipsisIcon className="w-3.5 h-3.5 ml-1 rtl:mr-1 rtl:ml-0"/>
          {toPersianDigits("درخواست مربیگری (به زودی)")}
        </button>
      </div>
    </div>
  );
};

export default MentorCard;
