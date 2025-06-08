
import React, { useState } from 'react';
import { toPersianDigits, parseJsonFromString } from '@/utils';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SpeakerWaveIcon } from '@/shared/AppIcons'; 

const InfoListItemNLG: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className="text-gray-300 text-sm leading-relaxed" }) => (
  <li className={`list-disc list-inside mr-4 ${className}`}>{children}</li>
);

interface SampleResponseProps {
  scenario: string;
  persona: string;
  responseText: string;
  emoji?: string;
}

const SampleResponseCard: React.FC<SampleResponseProps> = ({ scenario, persona, responseText, emoji }) => (
  <div className="bg-slate-700 p-6 rounded-xl shadow-lg border border-slate-600 hover:border-sky-600/70 transition-all duration-300">
    <p className="text-sm text-sky-400 mb-2">{toPersianDigits("سناریو:")} {scenario}</p>
    <p className="text-sm text-sky-500 mb-3">{toPersianDigits("شخصیت:")} {persona}</p>
    <p className="text-md text-gray-200 leading-relaxed">"{responseText}{emoji && <span className="mr-1">{emoji}</span>}"</p>
  </div>
);


const NLGEngineSection: React.FC = () => {
  const [generatedResponse, setGeneratedResponse] = useState<SampleResponseProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiKey = process.env.API_KEY;
  const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

  const nlgApproach = {
    models: toPersianDigits("بهره‌گیری از مدل‌های زبان بزرگ قدرتمند (مثلاً Gemini API به دلیل قابلیت‌های تولیدی قوی آن) برای پاسخ‌های آزاد و آگاه از زمینه."),
    approaches: toPersianDigits("رویکرد ترکیبی: مبتنی بر الگو برای تأییدیه‌های معمول (مثلاً 'وظیفه با موفقیت ایجاد شد!'). تکمیل شده با تولید مبتنی بر LLM برای مکالمات پویا، پیشنهادات خلاقانه و پاسخ‌های همدلانه. استفاده از مدل‌های کوچکتر و تخصصی یا پرامپت‌های اصلاح‌شده برای لحن‌های خاص.")
  };

  const sampleResponsesInitial: SampleResponseProps[] = [
    { scenario: toPersianDigits("کاربر یک وظیفه دشوار را تکمیل می‌کند"), persona: toPersianDigits("دوستانه و دلگرم‌کننده"), responseText: toPersianDigits("عالی بود که تمامش کردی! واقعاً داری پیشرفت می‌کنی. ادامه بده!"), emoji: "🎉"},
    { scenario: toPersianDigits("کاربر یک وظیفه دشوار را تکمیل می‌کند"), persona: toPersianDigits("رسمی و مربی‌گونه"), responseText: toPersianDigits("کار عالی در تکمیل وظیفه. این به خوبی با اهداف اعلام شده شما همسو است. اولویت بعدی شما چیست؟")},
    { scenario: toPersianDigits("کاربر احساس خستگی می‌کند"), persona: toPersianDigits("همدل و حامی"), responseText: toPersianDigits("می‌فهمم که گاهی اوقات کارها زیاد به نظر می‌رسند. یادت باشه یک نفس عمیق بکشی. دوست داری وظایف فعلیت رو تجزیه کنیم یا شاید یک استراحت کوتاه برنامه‌ریزی کنیم؟") },
    { scenario: toPersianDigits("کاربر یک واقعیت جالب می‌پرسد"), persona: toPersianDigits("شوخ و بازیگوش"), responseText: toPersianDigits("آیا می‌دانستید به گروهی از فلامینگوها «فلامبویانس» می‌گویند؟ این یک گروه شیک است!") },
  ];
  
  const nlgPipeline = {
    description: toPersianDigits("ورودی (داده‌های ساختاریافته از NLU، وضعیت سیستم، پروفایل/ترجیحات کاربر) -> زمینه‌سازی و ساخت پرامپت شخصیت/لحن -> فراخوانی مدل NLG (مثلاً فراخوانی Gemini API با SDK @google/genai) -> پس‌پردازش پاسخ (قالب‌بندی، بررسی ایمنی محتوا، آماده‌سازی TTS مثلاً از طریق Google Cloud Text-to-Speech) -> خروجی (داده‌های متنی/صوتی)."),
    apiEndpoint: "/api/nlg/generate",
    apiParams: ["context_data (JSON)", "persona_id (string)", "tone_modifiers (string[])", "output_format (enum: 'text' | 'speech_metadata')"]
  };

  const personalizationStrategy = [
    toPersianDigits("دستورالعمل‌های سیستمی و مثال‌های چند شات تعبیه شده در پرامپت‌ها برای LLMها برای هدایت لحن، سبک و پایبندی به شخصیت هوش مصنوعی."),
    toPersianDigits("«شخصیت» هوش مصنوعی قابل انتخاب توسط کاربر در تنظیمات (مثلاً دوستانه، رسمی، مربی، شوخ)، که به استراتژی‌های مهندسی پرامپت خاص و به طور بالقوه پرامپت‌های پایه متفاوت ترجمه می‌شود."),
    toPersianDigits("تنظیم پویا پارامترهای تولید (مثلاً دما برای خلاقیت، topP برای تنوع) بر اساس زمینه و شخصیت انتخاب شده."),
    toPersianDigits("فیلترهای ایمنی محتوا و لایه‌های تعدیل برای اطمینان از مناسب بودن پاسخ‌های تولید شده.")
  ];

  const handleGenerateResponse = async () => {
    if (!ai) {
      setError(toPersianDigits("سرویس هوش مصنوعی به دلیل عدم تنظیم کلید API در دسترس نیست."));
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedResponse(null);

    try {
      // Select a random scenario and persona for demonstration
      const randomScenario = sampleResponsesInitial[Math.floor(Math.random() * sampleResponsesInitial.length)];
      const prompt = toPersianDigits(`یک پاسخ نمونه برای سناریوی زیر با شخصیت '${randomScenario.persona}' تولید کن: "${randomScenario.scenario}". پاسخ باید به زبان فارسی باشد و احساس شخصیت انتخاب شده را منتقل کند. در صورت لزوم از ایموجی استفاده کن.`);
      
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-04-17",
        contents: prompt,
      });

      const text = response.text;
      // Basic emoji extraction (can be improved)
      const emojiMatch = text.match(/([\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}])/u);
      const emoji = emojiMatch ? emojiMatch[0] : undefined;
      const responseText = emoji ? text.replace(emoji, '').trim() : text.trim();

      setGeneratedResponse({
        scenario: randomScenario.scenario,
        persona: randomScenario.persona,
        responseText: responseText,
        emoji: emoji
      });

    } catch (e: any) {
      console.error("Error generating response:", e);
      setError(toPersianDigits("خطا در تولید پاسخ. لطفاً دوباره امتحان کنید. مطمئن شوید کلید API شما به درستی تنظیم شده است."));
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <section id="nlg-engine-design" className="py-20 md:py-28 bg-slate-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-sky-500/10 rounded-full mb-4">
            <SpeakerWaveIcon className="w-12 h-12 text-sky-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-5">
            {toPersianDigits("فاز ۲.۲: طراحی موتور تولید زبان طبیعی (NLG)")}
          </h2>
          <div className="section-title-underline"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-8">
            {toPersianDigits("طراحی شبیه‌سازی شده با کمک هوش مصنوعی برای موتور تولید زبان طبیعی، که LifeOrchestrator AI را قادر می‌سازد به طور مؤثر و با شخصیت ارتباط برقرار کند.")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 mb-12">
          <div className="bg-slate-700/50 border border-slate-600 p-8 rounded-xl shadow-xl">
            <h3 className="text-xl md:text-2xl font-semibold text-sky-300 mb-5">{toPersianDigits("رویکرد NLG پیشنهادی هوش مصنوعی")}</h3>
            <p className="text-gray-300 text-md mb-3 leading-relaxed"><strong>{toPersianDigits("مدل‌ها:")}</strong> {nlgApproach.models}</p>
            <p className="text-gray-300 text-md leading-relaxed"><strong>{toPersianDigits("رویکردها:")}</strong> {nlgApproach.approaches}</p>
          </div>

          <div className="bg-slate-700/50 border border-slate-600 p-8 rounded-xl shadow-xl">
            <h3 className="text-xl md:text-2xl font-semibold text-sky-300 mb-5">{toPersianDigits("استراتژی شخصی‌سازی لحن و سبک")}</h3>
            <ul className="space-y-3">
              {personalizationStrategy.map((item, index) => (
                <InfoListItemNLG key={index}>{item}</InfoListItemNLG>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="bg-slate-700/50 border border-slate-600 p-8 rounded-xl shadow-xl mb-16">
          <h3 className="text-xl md:text-2xl font-semibold text-sky-300 mb-6 text-center">{toPersianDigits("خط لوله NLG و مفهوم API")}</h3>
          <p className="text-gray-300 text-md mb-5 text-center leading-relaxed">{nlgPipeline.description}</p>
          <div className="text-center bg-slate-800 p-6 rounded-lg border border-slate-600">
            <p className="text-gray-200 text-md mb-2"><strong>{toPersianDigits("نقطه پایانی API شبیه‌سازی شده:")}</strong> <code className="text-sky-300 bg-slate-600 px-2 py-1 rounded-md text-left" dir="ltr">{nlgPipeline.apiEndpoint}</code></p>
            <p className="text-gray-200 text-md"><strong>{toPersianDigits("پارامترهای کلیدی:")}</strong> <span dir="ltr" className="text-sky-400">{nlgPipeline.apiParams.join(', ')}</span></p>
            <p className="text-sm text-gray-500 mt-4 italic">*{toPersianDigits("API تعامل با مدل‌های NLG مانند Gemini را از طریق SDK @google/genai مدیریت می‌کند و دستورالعمل‌های شخصیت و ایمنی را اعمال می‌کند.")}*</p>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-xl md:text-2xl font-semibold text-sky-300 mb-8 text-center">{toPersianDigits("پاسخ‌های نمونه هوش مصنوعی")}</h3>
          <div className="text-center mb-6">
            <button
              onClick={handleGenerateResponse}
              disabled={isLoading || !ai}
              className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-8 rounded-lg text-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? toPersianDigits("در حال تولید...") : toPersianDigits("تولید پاسخ نمونه جدید با هوش مصنوعی")}
            </button>
             {!ai && <p className="text-xs text-yellow-300 mt-2">{toPersianDigits("سرویس هوش مصنوعی در دسترس نیست (کلید API تنظیم نشده؟)")}</p>}
          </div>

          {isLoading && (
            <div className="text-center text-sky-300">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-300 mx-auto mb-2"></div>
              {toPersianDigits("هوش مصنوعی در حال فکر کردن است...")}
            </div>
          )}
          {error && <p className="text-center text-red-400 bg-red-900/30 p-3 rounded-md">{error}</p>}
          
          {generatedResponse && !isLoading && (
             <div className="mt-6">
                <h4 className="text-lg font-semibold text-sky-200 mb-4 text-center">{toPersianDigits("پاسخ تولید شده توسط هوش مصنوعی:")}</h4>
                <SampleResponseCard {...generatedResponse} />
            </div>
          )}

          {!generatedResponse && !isLoading && !error && (
            <div className="grid md:grid-cols-2 gap-8 mt-6">
              {sampleResponsesInitial.slice(0,2).map((resp, index) => ( // Show a couple of initial static examples
                <SampleResponseCard key={index} {...resp} />
              ))}
            </div>
          )}
        </div>
        
        <p className="text-sm text-gray-400 mt-10 text-center">
          {toPersianDigits("خروجی‌های شبیه‌سازی شده: کد منبع مفهومی موتور NLG (مثلاً پایتون، با استفاده از کتابخانه‌هایی مانند `@google/genai` برای فراخوانی Gemini API)، پرامپت‌ها/الگوهای بهینه شده، مشخصات API (OpenAPI/Swagger)، و مجموعه‌ای جامع از پاسخ‌های نمونه که لحن‌ها و سبک‌های مختلف را نشان می‌دهند. هوش مصنوعی در مهندسی پرامپت، تولید تغییرات پاسخ و تنظیم معیارهای ارزیابی (مثلاً BLEU، ROUGE، پرپلکسیتی، ارزیابی‌های انسانی) کمک می‌کند.")}
        </p>
      </div>
    </section>
  );
};

export default NLGEngineSection;
