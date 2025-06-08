import React, { useState, useEffect, useRef } from 'react';
import { ConversationScenario, SimulationSessionReport } from '../../types/learningTypes';
import { toPersianDigits } from '../../utils';
import { UsersIcon, ChatBubbleOvalLeftEllipsisIcon, PaperAirplaneIcon, ArrowRightIcon, XMarkIcon, LightbulbIcon } from '../shared/AppIcons';
import LoadingSpinner from '../shared/LoadingSpinner';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

interface ConversationSimulatorViewProps {
  scenarios: ConversationScenario[];
  onBack: () => void;
  ai: GoogleGenAI; // Pass Gemini instance
}

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

const ConversationSimulatorView: React.FC<ConversationSimulatorViewProps> = ({ scenarios, onBack, ai }) => {
  const [selectedScenario, setSelectedScenario] = useState<ConversationScenario | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);
  const [sessionReport, setSessionReport] = useState<SimulationSessionReport | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleScenarioSelect = (scenarioId: string) => {
    const scenario = scenarios.find(s => s.id === scenarioId);
    if (scenario) {
      setSelectedScenario(scenario);
      setChatHistory([{ id: `ai-init-${Date.now()}`, text: scenario.initialPrompt, sender: 'ai' }]);
      setSessionReport(null);
    }
  };

  const handleSendMessage = async () => {
    if (!userInput.trim() || !selectedScenario) return;

    const userMessage: ChatMessage = { id: `user-${Date.now()}`, text: userInput, sender: 'user' };
    setChatHistory(prev => [...prev, userMessage]);
    const currentInput = userInput;
    setUserInput('');
    setIsLoadingResponse(true);

    try {
      // Construct prompt for Gemini
      let conversationContext = selectedScenario.aiRoleDescription + "\n";
      conversationContext += `هدف شما به عنوان کاربر: ${selectedScenario.userObjective}\n\n`;
      conversationContext += `تاریخچه گفتگو:\n`;
      chatHistory.forEach(msg => {
        conversationContext += `${msg.sender === 'user' ? 'کاربر' : 'شما (هوش مصنوعی)'}: ${msg.text}\n`;
      });
      conversationContext += `کاربر: ${currentInput}\nشما (هوش مصنوعی): `;
      
      const prompt = conversationContext;

      const response: GenerateContentResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-04-17", // Or a model more suited for conversation
        contents: prompt,
      });

      const aiResponseText = response.text || toPersianDigits("متاسفانه نتوانستم پاسخ دهم.");
      const aiMessage: ChatMessage = { id: `ai-${Date.now()}`, text: aiResponseText, sender: 'ai' };
      setChatHistory(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error("Error in conversation simulator:", error);
      const errorMessage: ChatMessage = { id: `err-${Date.now()}`, text: toPersianDigits("خطا در برقراری ارتباط با هوش مصنوعی."), sender: 'ai' };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoadingResponse(false);
    }
  };

  const handleEndSession = () => {
    // Simulate report generation
    if (selectedScenario) {
      setSessionReport({
        sessionId: `sess-${Date.now()}`,
        scenarioId: selectedScenario.id,
        date: new Date().toISOString(),
        userPerformanceSummary: toPersianDigits("شما در این سناریو عملکرد خوبی داشتید، به خصوص در شفاف‌سازی نیازهایتان. با این حال، می‌توانید روی قاطعیت بیشتر در مذاکره کار کنید."),
        strengths: [toPersianDigits("پرسیدن سوالات شفاف‌کننده"), toPersianDigits("حفظ آرامش")],
        areasForImprovement: [toPersianDigits("قاطعیت در بیان موضع"), toPersianDigits("پیشنهاد راه‌حل‌های جایگزین")],
        specificSuggestions: [toPersianDigits("قبل از پاسخ دادن، لحظه‌ای مکث کنید و به نکات کلیدی خود فکر کنید."), toPersianDigits("سعی کنید حداقل دو راه‌حل جایگزین برای مشکل ارائه دهید.")],
      });
    }
  };

  if (sessionReport && selectedScenario) {
    return (
      <div className="p-4 sm:p-6 bg-white rounded-lg shadow-xl border border-gray-200 max-w-2xl mx-auto my-4">
        <h2 className="text-xl font-semibold text-sky-700 mb-2">{toPersianDigits("گزارش جلسه شبیه‌سازی")}</h2>
        <p className="text-sm text-gray-600 mb-4">{toPersianDigits(`سناریو: ${selectedScenario.title}`)}</p>
        
        <div className="bg-sky-50 p-3 rounded-md border border-sky-200 mb-3">
            <h4 className="text-sm font-medium text-sky-600 mb-1">{toPersianDigits("خلاصه عملکرد:")}</h4>
            <p className="text-xs text-gray-700">{sessionReport.userPerformanceSummary}</p>
        </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <div className="bg-green-50 p-3 rounded-md border border-green-200">
                <h4 className="text-sm font-medium text-green-600 mb-1">{toPersianDigits("نقاط قوت:")}</h4>
                <ul className="list-disc list-inside pl-4 text-xs text-gray-700 space-y-0.5">
                    {sessionReport.strengths.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
            </div>
            <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200">
                <h4 className="text-sm font-medium text-yellow-600 mb-1">{toPersianDigits("زمینه‌های بهبود:")}</h4>
                <ul className="list-disc list-inside pl-4 text-xs text-gray-700 space-y-0.5">
                    {sessionReport.areasForImprovement.map((a, i) => <li key={i}>{a}</li>)}
                </ul>
            </div>
        </div>
        <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
             <h4 className="text-sm font-medium text-blue-600 mb-1">{toPersianDigits("پیشنهادات مشخص:")}</h4>
             <ul className="list-disc list-inside pl-4 text-xs text-gray-700 space-y-0.5">
                {sessionReport.specificSuggestions.map((sugg, i) => <li key={i}>{sugg}</li>)}
            </ul>
        </div>
        <button 
            onClick={() => { setSelectedScenario(null); setChatHistory([]); setSessionReport(null); }}
            className="mt-6 w-full bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 px-4 rounded-md text-sm transition-colors"
        >
          {toPersianDigits("شروع یک سناریوی دیگر")}
        </button>
        <button 
            onClick={onBack}
            className="mt-2 w-full text-sm text-gray-700 hover:text-gray-900 py-2"
        >
            {toPersianDigits("بازگشت به داشبورد یادگیری")}
        </button>
      </div>
    );
  }

  if (!selectedScenario) {
    return (
      <div className="p-4 sm:p-6 bg-white rounded-lg shadow-xl border border-gray-200 max-w-md mx-auto my-4">
        <h2 className="text-xl font-semibold text-sky-700 mb-4 text-center">{toPersianDigits("انتخاب سناریوی مکالمه")}</h2>
        <div className="space-y-3">
          {scenarios.map(scenario => (
            <button
              key={scenario.id}
              onClick={() => handleScenarioSelect(scenario.id)}
              className="w-full text-left p-3 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-md transition-colors"
            >
              <h4 className="font-medium text-sky-600">{toPersianDigits(scenario.title)}</h4>
              <p className="text-xs text-gray-600 mt-1">{toPersianDigits(scenario.description)}</p>
            </button>
          ))}
        </div>
        <button 
            onClick={onBack}
            className="mt-6 w-full text-sm text-gray-700 hover:text-gray-900 py-2"
        >
            {toPersianDigits("بازگشت به داشبورد یادگیری")}
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow-xl border border-gray-200 max-w-2xl mx-auto my-4 flex flex-col h-[calc(100vh-100px)] max-h-[600px]">
      <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-200">
        <div>
            <h2 className="text-lg font-semibold text-sky-700 flex items-center">
                <UsersIcon className="w-5 h-5 text-sky-600 mr-2 rtl:ml-2 rtl:mr-0"/>
                {toPersianDigits(selectedScenario.title)}
            </h2>
            <p className="text-xs text-gray-500">{toPersianDigits(`هدف شما: ${selectedScenario.userObjective}`)}</p>
        </div>
        <button onClick={onBack} className="text-gray-400 hover:text-gray-600" aria-label={toPersianDigits("خروج از شبیه‌ساز")}>
            <XMarkIcon className="w-6 h-6"/>
        </button>
      </div>

      <div className="flex-grow overflow-y-auto p-2 space-y-3 mb-3 chat-messages-container bg-gray-50 rounded-md">
        {chatHistory.map(msg => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-2.5 rounded-lg text-sm ${msg.sender === 'user' ? 'bg-sky-500 text-white rounded-br-none rtl:rounded-bl-none rtl:rounded-br-lg' : 'bg-gray-200 text-gray-800 rounded-bl-none rtl:rounded-br-none rtl:rounded-bl-lg'}`}>
              <p className="whitespace-pre-wrap">{toPersianDigits(msg.text)}</p>
            </div>
          </div>
        ))}
        {isLoadingResponse && (
            <div className="flex justify-start">
                <div className="p-2.5 rounded-lg bg-gray-200"><LoadingSpinner size="sm" color="text-sky-600" /></div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="mt-auto">
        <div className="relative flex items-center">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={toPersianDigits("پاسخ خود را بنویسید...")}
            className="w-full p-3 pr-10 rtl:pl-10 rtl:pr-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
            disabled={isLoadingResponse}
          />
          <button
            type="submit"
            disabled={isLoadingResponse || !userInput.trim()}
            className="absolute ltr:right-2 rtl:left-2 top-1/2 transform -translate-y-1/2 text-sky-500 hover:text-sky-700 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={toPersianDigits("ارسال پاسخ")}
          >
            <PaperAirplaneIcon className="w-5 h-5 transform ltr:rotate-0 rtl:rotate-180" />
          </button>
        </div>
         <button 
            type="button"
            onClick={handleEndSession}
            disabled={isLoadingResponse || chatHistory.length < 2} // Need at least one user message to end meaningfully
            className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md text-sm transition-colors disabled:opacity-50"
        >
          {toPersianDigits("پایان جلسه و مشاهده گزارش")}
        </button>
      </form>
    </div>
  );
};

export default ConversationSimulatorView;
