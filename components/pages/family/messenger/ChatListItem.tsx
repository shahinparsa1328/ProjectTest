import React from 'react';
import { toPersianDigits } from '../../../../utils'; // Corrected path
import { FamilyMember, ChatMessage } from '../../../../types/familyTypes'; // Corrected path
import { UserCircleIcon } from '../../../shared/AppIcons'; // Corrected path

interface ChatListItemProps {
  member: FamilyMember;
  isSelected: boolean;
  onSelectChat: () => void;
  lastMessage?: ChatMessage; // Optional last message object
}

const ChatListItem: React.FC<ChatListItemProps> = ({ member, isSelected, onSelectChat, lastMessage }) => {
  return (
    <button
      onClick={onSelectChat}
      className={`w-full text-right p-3 flex items-center space-x-3 space-x-reverse hover:bg-gray-100 transition-colors ${isSelected ? 'bg-indigo-50 border-r-2 rtl:border-l-2 rtl:border-r-0 border-indigo-500' : ''}`}
      aria-current={isSelected ? "page" : undefined}
    >
      {member.avatarUrl ? (
        <img src={member.avatarUrl} alt={toPersianDigits(member.name)} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
      ) : (
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
          <UserCircleIcon className="w-6 h-6 text-gray-400" />
        </div>
      )}
      <div className="flex-grow min-w-0">
        <h6 className={`text-xs font-semibold ${isSelected ? 'text-indigo-700' : 'text-gray-800'}`}>{toPersianDigits(member.name)}</h6>
        {lastMessage && (
          <p className={`text-[10px] ${isSelected ? 'text-indigo-600' : 'text-gray-500'} truncate`}>
            {toPersianDigits(lastMessage.text)}
          </p>
        )}
      </div>
      {/* Placeholder for unread count or last message time */}
    </button>
  );
};

export default ChatListItem;