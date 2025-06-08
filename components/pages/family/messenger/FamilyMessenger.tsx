import React, { useState } from 'react';
import { toPersianDigits } from '../../../../utils'; // Corrected path
import { FamilyMember, ChatMessage } from '../../../../types/familyTypes'; // Corrected path
import ChatWindow from './ChatWindow';
import ChatListItem from './ChatListItem';
import { UsersIcon } from '../../../shared/AppIcons'; // Corrected path

interface FamilyMessengerProps {
  familyMembers: FamilyMember[];
  // Mock messages for now, real implementation would fetch/manage these
  mockMessages: ChatMessage[]; 
}

const FamilyMessenger: React.FC<FamilyMessengerProps> = ({ familyMembers, mockMessages }) => {
  const [selectedChatMemberId, setSelectedChatMemberId] = useState<string | null>(null);
  const currentUserPlaceholderId = "currentUser"; // Placeholder for current user

  // Create a list of unique members to chat with (excluding current user placeholder)
  const chatPartners = familyMembers.filter(fm => fm.id !== currentUserPlaceholderId);

  const handleSelectChat = (memberId: string) => {
    setSelectedChatMemberId(memberId);
  };

  const selectedMember = familyMembers.find(fm => fm.id === selectedChatMemberId);

  // Filter messages for the selected chat
  const currentChatMessages = mockMessages.filter(msg => 
    (msg.senderId === currentUserPlaceholderId && msg.receiverIdOrGroupId === selectedChatMemberId) ||
    (msg.senderId === selectedChatMemberId && msg.receiverIdOrGroupId === currentUserPlaceholderId)
  );

  return (
    <div className="flex flex-col sm:flex-row h-[400px] sm:h-[500px] border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      {/* Chat List */}
      <div className="w-full sm:w-1/3 border-b sm:border-b-0 sm:border-r border-gray-200 overflow-y-auto bg-gray-50">
        <div className="p-3 border-b border-gray-200">
          <h4 className="text-sm font-semibold text-gray-700 flex items-center">
            <UsersIcon className="w-4 h-4 text-indigo-500 mr-2 rtl:ml-2 rtl:mr-0" />
            {toPersianDigits("چت‌ها")}
          </h4>
        </div>
        {chatPartners.length === 0 && <p className="p-3 text-xs text-gray-500">{toPersianDigits("عضوی برای چت یافت نشد.")}</p>}
        {chatPartners.map(member => (
          <ChatListItem
            key={member.id}
            member={member}
            isSelected={selectedChatMemberId === member.id}
            onSelectChat={() => handleSelectChat(member.id)}
            // lastMessage={mockMessages.filter(m => m.senderId === member.id || m.receiverIdOrGroupId === member.id).pop()} // Simplistic last message
          />
        ))}
        {/* Placeholder for group chats later */}
      </div>

      {/* Chat Window */}
      <div className="w-full sm:w-2/3 flex flex-col bg-white">
        {selectedMember ? (
          <ChatWindow
            chatPartner={selectedMember}
            messages={currentChatMessages}
            onSendMessage={(text, imageUrl) => {
              // This would be handled by FamilyPage's state management in a real app
              console.log(toPersianDigits(`پیام به ${selectedMember.name}: ${text}, تصویر: ${imageUrl || 'ندارد'}`));
              alert(toPersianDigits("ارسال پیام شبیه‌سازی شد."));
            }}
          />
        ) : (
          <div className="flex-grow flex items-center justify-center text-gray-500 text-sm p-4">
            {toPersianDigits("یک چت را برای شروع گفتگو انتخاب کنید.")}
          </div>
        )}
      </div>
    </div>
  );
};

export default FamilyMessenger;