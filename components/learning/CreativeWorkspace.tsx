
import React, { useState, useEffect } from 'react';
import { CreativeIdea, BrainstormingTechnique } from '../../types/learningTypes';
import { toPersianDigits } from '../../utils';
import { LightbulbMultipleIcon, PlusIcon, TrashIcon, SparklesIconNav, XMarkIcon } from '../shared/AppIcons';
import LoadingSpinner from '../shared/LoadingSpinner';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

interface CreativeWorkspaceProps {
  onBack: () => void;
  ai: GoogleGenAI;
}

const brainstormingTechniques: { value: BrainstormingTechnique; label: string; description: string }[] = [
  { value: 'GeneralBrainstorm', label: toPersianDigits("طوفان فکری عمومی"), description: toPersianDigits("تولید ایده‌های گسترده بدون محدودیت خاص.") },
  { value: 'SCAMPER', label: "SCAMPER", description: toPersianDigits("جایگزینی، ترکیب، تطبیق، اصلاح، استفاده دیگر، حذف، معکوس‌سازی.") },
  { value: 'SixThinkingHats', label: toPersianDigits("شش کلاه تفکر"), description: toPersianDigits("بررسی مشکل از شش دیدگاه مختلف (واقعیت‌ها، احساسات، نکات منفی، نکات مثبت، خلاقیت، فرآیند).") },
  { value: 'MindMapping', label: toPersianDigits("نقشه‌برداری ذهنی (مفهومی)"), description: toPersianDigits("تولید ایده‌های مرتبط با یک موضوع مرکزی به صورت ساختار درختی.") },
];

const CreativeWorkspace: React.FC<CreativeWorkspaceProps> = ({ onBack, ai }) => {
  const [problemStatement, setProblemStatement] = useState('');
  const [ideas, setIdeas] = useState<CreativeIdea[]>([]);
  const [newIdeaText, setNewIdeaText] = useState('');
  const [selectedTechnique, setSelectedTechnique] = useState<BrainstormingTechnique>('GeneralBrainstorm');
  const [isLoadingAIResponse, setIsLoadingAIResponse] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const handleAddIdea = () => {
    if (!newIdeaText.trim()) return;
    const newIdea: CreativeIdea = {
      id: `user-${Date.now()}`,
      text: newIdeaText,
      color: 'bg-yellow-100 border-yellow-300', // Default user color
    };
    setIdeas(prev => [...prev, newIdea]);
    setNewIdeaText('');
  };

  const handleDeleteIdea = (id: string) => {
    setIdeas(prev => prev.filter(idea => idea.id !== id));
  };

  const handleGetAISuggestions = async () => {
    if (!problemStatement.trim()) {
      setAiError(toPersianDigits("لطفاً ابتدا مشکل یا موضوع طوفان فکری را مشخص کنید."));
      return;
    }
    setIsLoadingAIResponse(true);
    setAiError(null);

    try {
      let prompt = toPersianDigits(`با توجه به مشکل/موضوع: "${problemStatement}"\n`);
      if (selectedTechnique === 'SCAMPER') {
        prompt += toPersianDigits("با استفاده از تکنیک SCAMPER، چندین ایده خلاقانه به زبان فارسی ارائه بده. برای هر حرف از SCAMPER (جایگزینی، ترکیب، تطبیق، اصلاح، استفاده دیگر، حذف، معکوس‌سازی) حداقل یک ایده مشخص کن.\n");
      } else if (selectedTechnique === 'SixThinkingHats') {
        prompt += toPersianDigits("با استفاده از روش شش کلاه تفکر، دیدگاه‌ها و ایده‌های مرتبط با هر کلاه (سفید: واقعیت‌ها، قرمز: احساسات، سیاه: نکات منفی/احتیاط، زرد: نکات مثبت/خوش‌بینی، سبز: خلاقیت/ایده‌های جدید، آبی: فرآیند/سازماندهی) را به زبان فارسی بیان کن.\n");
      } else { // GeneralBrainstorm or MindMapping (conceptual for now)
        prompt += toPersianDigits("چندین ایده خلاقانه و متنوع مرتبط با این موضوع به زبان فارسی ارائه بده.\n");
      }
      prompt += toPersianDigits("پاسخ باید شامل لیستی از ایده‌ها باشد.");

      const response: GenerateContentResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-04-17",
        contents: prompt,
      });

      const aiResponseText = response.text;
      // Simple parsing for now, assuming newline separated ideas
      const newAiIdeas: CreativeIdea[] = aiResponseText.split('\n')
        .map(line => line.replace(/^- /,'').trim())
        .filter(Boolean)
        .map((text, index) => ({
          id: `ai-${Date.now()}-${index}`,
          text,
          color: 'bg-sky-100 border-sky-300', // AI idea color
          isAIReply: true,
          techniqueUsed: selectedTechnique
        }));
      
      setIdeas(prev => [...prev, ...newAiIdeas]);

    } catch (error) {
      console.error("Error getting AI brainstorming suggestions:", error);
      setAiError(toPersianDigits("خطا در دریافت پیشنهادات هوش مصنوعی. لطفاً دوباره امتحان کنید."));
    } finally {
      setIsLoadingAIResponse(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow-xl border border-gray-200 max-w-3xl mx-auto my-4 flex flex-col h-[calc(100vh-100px)] max-h-[700px]">
       <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-sky-700 flex items-center">
            <LightbulbMultipleIcon className="w-6 h-6 text-sky-600 mr-2 rtl:ml-2 rtl:mr-0"/>
            {toPersianDigits("فضای کاری حل خلاق مسئله")}
        </h2>
        <button onClick={onBack} className="text-gray-400 hover:text-gray-600" aria-label={toPersianDigits("بازگشت")}>
            <XMarkIcon className="w-6 h-6"/>
        </button>
      </div>

      <div className="mb-4 space-y-3">
        <div>
          <label htmlFor="problemStatement" className="block text-sm font-medium text-gray-700 mb-1">{toPersianDigits("مشکل یا موضوع طوفان فکری:")}</label>
          <textarea
            id="problemStatement"
            value={problemStatement}
            onChange={(e) => setProblemStatement(e.target.value)}
            rows={2}
            className="w-full p-2 border border-gray-300 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-sm"
            placeholder={toPersianDigits("مثال: چگونه می‌توانم مطالعه روزانه‌ام را جذاب‌تر کنم؟")}
          />
        </div>
        <div>
          <label htmlFor="brainstormingTechnique" className="block text-sm font-medium text-gray-700 mb-1">{toPersianDigits("انتخاب تکنیک طوفان فکری:")}</label>
          <select
            id="brainstormingTechnique"
            value={selectedTechnique}
            onChange={(e) => setSelectedTechnique(e.target.value as BrainstormingTechnique)}
            className="w-full p-2 border border-gray-300 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-sm bg-white"
          >
            {brainstormingTechniques.map(tech => (
              <option key={tech.value} value={tech.value}>{tech.label} - {tech.description}</option>
            ))}
          </select>
        </div>
        <button
          onClick={handleGetAISuggestions}
          disabled={isLoadingAIResponse || !problemStatement.trim()}
          className="w-full flex items-center justify-center bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 px-4 rounded-md text-sm transition-colors disabled:opacity-60"
        >
          {isLoadingAIResponse ? <LoadingSpinner size="sm" /> : <SparklesIconNav className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />}
          {toPersianDigits("دریافت پیشنهادات از هوش مصنوعی")}
        </button>
        {aiError && <p className="text-xs text-red-500 bg-red-100 p-2 rounded-md text-center">{aiError}</p>}
      </div>

      {/* Virtual Whiteboard / Sticky Notes Area */}
      <div className="flex-grow overflow-y-auto p-3 bg-gray-100 rounded-lg border border-gray-200 space-y-2 min-h-[200px]">
        {ideas.length === 0 && !isLoadingAIResponse && (
            <p className="text-sm text-gray-500 text-center pt-10">{toPersianDigits("هنوز ایده‌ای ثبت نشده است. ایده خود را اضافه کنید یا از هوش مصنوعی کمک بگیرید.")}</p>
        )}
        {ideas.map(idea => (
          <div key={idea.id} className={`p-3 rounded-md shadow-sm border text-sm relative group ${idea.color || 'bg-yellow-100 border-yellow-300'}`}>
            <p className="whitespace-pre-wrap">{toPersianDigits(idea.text)}</p>
            {idea.isAIReply && <SparklesIconNav className="w-3 h-3 text-sky-500 absolute top-1 right-1 rtl:left-1 rtl:right-auto" />}
             <button onClick={() => handleDeleteIdea(idea.id)} className="absolute bottom-1 right-1 rtl:left-1 rtl:right-auto text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded-full bg-white/50 hover:bg-red-100/50" aria-label={toPersianDigits("حذف ایده")}>
                <TrashIcon className="w-3 h-3"/>
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newIdeaText}
            onChange={(e) => setNewIdeaText(e.target.value)}
            placeholder={toPersianDigits("ایده جدید خود را وارد کنید...")}
            className="flex-grow p-2 border border-gray-300 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-sm"
          />
          <button
            onClick={handleAddIdea}
            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md transition-colors flex-shrink-0"
            aria-label={toPersianDigits("افزودن ایده")}
          >
            <PlusIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
       <button 
            onClick={onBack}
            className="mt-4 w-full text-sm text-gray-700 hover:text-gray-900 py-2"
        >
            {toPersianDigits("بازگشت به داشبورد یادگیری")}
        </button>
    </div>
  );
};

export default CreativeWorkspace;
