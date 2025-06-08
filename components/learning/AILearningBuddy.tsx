
import React, { useState, useEffect, useRef } from 'react';
import { AILearningBuddyMessage } from '../../types/learningTypes';
import { toPersianDigits } from '../../utils';
import { ChatBubbleOvalLeftEllipsisIcon, PaperAirplaneIcon, XMarkIcon } from '../shared/AppIcons';
import LoadingSpinner from '../shared/LoadingSpinner';

interface AILearningBuddyProps {
  isOpen: boolean;
  onToggle: () => void;
  onSendMessage: (messageText: string) => Promise<string>; // Returns AI response text
}

const AILearningBuddy: React.FC<AILearningBuddyProps> = ({ isOpen, onToggle, onSendMessage }) => {
  const [messages, setMessages] = useState<AILearningBuddyMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: `ai-init-${Date.now()}`,
          text: toPersianDigits("سلام! من همیار یادگیری شما هستم. چطور می‌توانم در مسیر یادگیری به شما کمک کنم؟"),
          sender: 'ai',
          timestamp: Date.now(),
          quickReplies: [
            { text: toPersianDigits("یک منبع خوب برای یادگیری پایتون پیشنهاد بده."), payload: "suggest_python_resource" },
            { text: toPersianDigits("چگونه می‌توانم تمرکزم را بیشتر کنم؟"), payload: "how_to_focus" },
          ]
        }
      ]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;

    const userMessage: AILearningBuddyMessage = {
      id: `user-${Date.now()}`,
      text: messageText,
      sender: 'user',
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText(''); // Clear input after sending text from quick reply
    setIsLoadingResponse(true);

    try {
      const aiResponseText = await onSendMessage(messageText);
      const aiMessage: AILearningBuddyMessage = {
        id: `ai-${Date.now()}`,
        text: aiResponseText,
        sender: 'ai',
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("AI Learning Buddy send error:", error);
      const errorMessage: AILearningBuddyMessage = {
        id: `ai-err-${Date.now()}`,
        text: toPersianDigits("متاسفانه در حال حاضر نمی‌توانم پاسخ دهم. لطفاً بعداً تلاش کنید."),
        sender: 'ai',
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoadingResponse(false);
    }
  };
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputText);
    setInputText(''); // Clear input after form submission
  };
  
  const handleQuickReplyClick = (replyText: string) => {
     sendMessage(replyText); // Send the text of the quick reply
  };


  return (
    <>
      {/* FAB */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed bottom-24 ltr:right-5 rtl:left-5 z-[1000] bg-purple-600 hover:bg-purple-700 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-110"
          aria-label={toPersianDigits("باز کردن همیار یادگیری")}
        >
          <ChatBubbleOvalLeftEllipsisIcon className="w-7 h-7" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div 
          className="fixed inset-0 sm:inset-auto sm:bottom-5 sm:ltr:right-5 sm:rtl:left-5 z-[1001] w-full sm:w-80 md:w-96 h-full sm:h-[500px] bg-white border border-gray-300 rounded-t-xl sm:rounded-xl shadow-2xl flex flex-col transition-opacity duration-300 ease-out"
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="ai-buddy-title"
        >
          <header className="bg-purple-600 text-white p-3 flex justify-between items-center rounded-t-xl sm:rounded-t-lg">
            <h3 id="ai-buddy-title" className="text-md font-semibold flex items-center">
              <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
              {toPersianDigits("همیار یادگیری هوشمند")}
            </h3>
            <button onClick={onToggle} className="text-purple-200 hover:text-white" aria-label={toPersianDigits("بستن همیار یادگیری")}>
              <XMarkIcon className="w-6 h-6" />
            </button>
          </header>

          <div className="flex-grow overflow-y-auto p-3 space-y-3 bg-gray-50 chat-messages-container">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-2.5 rounded-lg text-sm ${msg.sender === 'user' ? 'bg-purple-500 text-white rounded-br-none rtl:rounded-bl-none rtl:rounded-br-lg' : 'bg-gray-200 text-gray-800 rounded-bl-none rtl:rounded-br-none rtl:rounded-bl-lg'}`}>
                  <p className="whitespace-pre-wrap">{toPersianDigits(msg.text)}</p>
                  {msg.quickReplies && msg.quickReplies.length > 0 && msg.sender === 'ai' && (
                     <div className="mt-2 flex flex-wrap gap-1.5">
                        {msg.quickReplies.map((qr, index) => (
                            <button 
                                key={index}
                                onClick={() => handleQuickReplyClick(qr.text)} // Pass qr.text
                                className="text-xs bg-purple-100 text-purple-700 hover:bg-purple-200 px-2 py-1 rounded-full transition-colors"
                            >
                                {toPersianDigits(qr.text)}
                            </button>
                        ))}
                     </div>
                  )}
                </div>
              </div>
            ))}
            {isLoadingResponse && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-2.5 rounded-lg text-sm bg-gray-200 text-gray-800 rounded-bl-none rtl:rounded-br-none rtl:rounded-bl-lg">
                  <LoadingSpinner size="sm" color="text-purple-600" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleFormSubmit} className="p-3 border-t border-gray-200 bg-white rounded-b-xl sm:rounded-b-lg">
            <div className="relative flex items-center">
              <input
                type="text"
                value={inputText}
                onChange={handleInputChange}
                placeholder={toPersianDigits("پیام خود را بنویسید...")}
                className="w-full p-2.5 pr-10 rtl:pl-10 rtl:pr-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 text-gray-800"
                disabled={isLoadingResponse}
              />
              <button
                type="submit"
                disabled={isLoadingResponse || !inputText.trim()}
                className="absolute ltr:right-2 rtl:left-2 top-1/2 transform -translate-y-1/2 text-purple-500 hover:text-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label={toPersianDigits("ارسال پیام")}
              >
                <PaperAirplaneIcon className="w-5 h-5 transform ltr:rotate-0 rtl:rotate-180" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AILearningBuddy;
