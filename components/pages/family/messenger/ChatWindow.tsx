import React, { useState, useRef, useEffect } from 'react';
import { toPersianDigits } from '../../../../utils'; // Corrected path
import { FamilyMember, ChatMessage } from '../../../../types/familyTypes'; // Corrected path
import { PaperAirplaneIcon, PaperClipIcon } from '../../../shared/AppIcons'; // Corrected path

interface ChatWindowProps {
  chatPartner: FamilyMember;
  messages: ChatMessage[];
  onSendMessage: (text: string, imageUrl?: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chatPartner, messages, onSendMessage }) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (inputText.trim() === '') return;
    onSendMessage(inputText);
    setInputText('');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, upload file then get URL
      const reader = new FileReader();
      reader.onloadend = () => {
        onSendMessage(toPersianDigits(`فایل: ${file.name}`), reader.result as string); // Simulate sending with image data URL
      };
      reader.readAsDataURL(file);
    }
     if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-3 border-b border-gray-200 bg-gray-50 flex-shrink-0">
        <h5 className="text-sm font-semibold text-gray-700">{toPersianDigits(chatPartner.name)}</h5>
        {/* Placeholder for online status or last seen */}
      </div>

      {/* Messages Area */}
      <div className="flex-grow overflow-y-auto p-3 space-y-2 chat-messages-container">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.senderId !== chatPartner.id ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-2 rounded-lg text-xs ${msg.senderId !== chatPartner.id ? 'bg-indigo-500 text-white rounded-br-none rtl:rounded-bl-none rtl:rounded-br-lg' : 'bg-gray-200 text-gray-800 rounded-bl-none rtl:rounded-br-none rtl:rounded-bl-lg'}`}>
              {msg.imageUrl && <img src={msg.imageUrl} alt={toPersianDigits("تصویر ارسالی")} className="max-w-xs max-h-40 rounded-md mb-1" />}
              <p className="whitespace-pre-wrap">{toPersianDigits(msg.text)}</p>
              <span className="text-[9px] opacity-70 block mt-0.5">
                {toPersianDigits(new Date(msg.timestamp).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }))}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-gray-200 bg-white flex-shrink-0">
        <form onSubmit={handleSend} className="relative flex items-center">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={toPersianDigits("پیام خود را بنویسید...")}
            className="w-full p-2.5 pr-10 rtl:pl-10 rtl:pr-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
           <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileUpload} 
            className="hidden" 
            accept="image/*" 
            id={`file-upload-${chatPartner.id}`}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute ltr:right-10 rtl:left-10 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600 p-1"
            title={toPersianDigits("پیوست تصویر")}
          >
            <PaperClipIcon className="w-5 h-5" />
          </button>
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="absolute ltr:right-2 rtl:left-2 top-1/2 transform -translate-y-1/2 text-indigo-500 hover:text-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed p-1"
            aria-label={toPersianDigits("ارسال پیام")}
          >
            <PaperAirplaneIcon className="w-5 h-5 transform ltr:rotate-0 rtl:rotate-180" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;