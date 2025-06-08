
import React, { useState } from 'react';
import { toPersianDigits, translatePersonaToEnglish, parseJsonFromString } from '../../utils';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { UserCircleIcon, SparklesIconNav as SparklesIcon } from '../shared/AppIcons'; 
import LoadingSpinner from '../shared/LoadingSpinner';

const AI_MODEL_NAME = 'gemini-2.5-flash-preview-04-17';

const InfoListItemPersona: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = "text-gray-300 text-sm leading-relaxed" }) => (
  <li className={`list-disc list-inside mr-4 ${className}`}>{children}</li> 
);

interface SampleResponseProps {
  scenario: string;
  persona: string;
  responseText: string;
  emoji?: string;
}

const AIPersonaEngineSection: React.FC = () => {
  const [selectedPersona, setSelectedPersona] = useState<string>("دوستانه_مربی");
  const [userQuery, setUserQuery] = useState<string>(toPersianDigits("یک حقیقت جالب درباره فضا به من بگو."));
  const [personaResponse, setPersonaResponse] = useState<SampleResponseProps | null>(null);
  const [isGeneratingPersonaResponse, setIsGeneratingPersonaResponse] = useState(false);
  const [personaError, setPersonaError] = useState<string | null>(null);

  const apiKey = process.env.API_KEY;
  const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

  const personas = [
    { value: "دوستانه_مربی", label: toPersianDigits("دوستانه و مربی‌گونه") },
    { value: "شوخ_بازیگوش", label: toPersianDigits("شوخ و بازیگوش") },
    { value: "رسمی_تحلیلی", label: toPersianDigits("رسمی و تحلیلی") },
    { value: "همدل_حامی", label: toPersianDigits("همدل و حامی") },
  ];

  const orchestrationArchitecture = [
    toPersianDigits("رویکرد مبتنی بر رویداد: موتور NLU رویدادهای 'UserIntentRecognized' را منتشر می‌کند. موتورهای ML/استدلال مشترک می‌شوند، پردازش می‌کنند و رویدادهای 'InsightGenerated' یا 'SolutionProposed' را منتشر می‌کنند."),
    toPersianDigits("توزیع‌کننده مرکزی: یک سرویس اصلی خروجی NLU را دریافت می‌کند، آن را بر اساس قصد و زمینه به ماژول‌های ML/استدلال مناسب هدایت می‌کند، نتایج را تجمیع می‌کند و آنها را به NLG ارسال می‌کند."),
    toPersianDigits("سپس NLG پاسخی را با در نظر گرفتن دستورالعمل‌های شخصیت ایجاد می‌کند و به طور بالقوه مدل‌های ML خاصی را برای پیشنهادات سبکی (مثلاً استفاده از ایموجی، سطح رسمیت) فراخوانی می‌کند."),
    toPersianDigits("حلقه بازخورد: واکنش‌های کاربر به پاسخ‌های هوش مصنوعی به موتور ML بازخورد داده می‌شود تا شخصی‌سازی و تطبیق شخصیت در طول زمان اصلاح شود.")
  ];

  const personaProfileModel = `{
  "user_id": "uuid",
  "ai_persona_id": "persona_friendly_v1",
  "custom_name": "یار", 
  "appearance": {
    "avatar_id": "avatar_set_3_orb_blue",
    "custom_avatar_url": null
  },
  "voice": {
    "tts_engine": "google_cloud_tts",
    "voice_id": "fa-IR-Wavenet-A", 
    "prosody": { "pitch": "medium", "rate": "medium" }
  },
  "personality_traits": {
    "core_archetype": "دوستانه_مربی", 
    "formality_level": ${toPersianDigits("0.3")}, 
    "humor_inclination": ${toPersianDigits("0.6")},
    "proactivity_level": ${toPersianDigits("0.7")} 
  },
  "preferences": {
    "use_emojis": true,
    "preferred_greeting": "سلام!",
    "avoid_topics": ["سیاست"]
  }
}`;

  const personaCodeSnippetsInfo = [
    toPersianDigits("مهندسی پرامپت NLG: دستورالعمل‌های سیستمی برای LLMها شامل: 'شما [نام_هوش_مصنوعی]، یک دستیار [کهن‌الگوی_اصلی] هستید. با رسمیت [سطح_رسمیت] پاسخ دهید و در صورت مناسب بودن شوخ‌طبعی [تمایل_به_شوخ_طبعی] را بگنجانید. کاربر فعلی شما [نام_کاربر] است.'"),
    toPersianDigits("حساسیت NLU: اگر شخصیت 'شوخ' باشد، NLU ممکن است برای تشخیص بهتر کنایه یا دستورات بازیگوش تنظیم شود. اگر 'رسمی' باشد، ممکن است به طور پیش‌فرض به تفاسیر تحت‌اللفظی‌تر بازگردد."),
    toPersianDigits("اولویت‌بندی ML/استدلال: یک شخصیت 'مربی' ممکن است پیشنهادات مربوط به دستیابی به هدف و انضباط را در اولویت قرار دهد، در حالی که یک 'راهنمای_همدل' ممکن است پیشنهادات مربوط به تندرستی و مراقبت از خود را در اولویت قرار دهد.")
  ];

  const uiConceptsPersona = [
    toPersianDigits("بخش اختصاصی 'شخصیت هوش مصنوعی' در تنظیمات کاربر."),
    toPersianDigits("ورودی نام: فیلد متنی برای نام سفارشی هوش مصنوعی."),
    toPersianDigits("انتخاب آواتار: شبکه‌ای از آواتارهای از پیش تعریف شده، امکان بارگذاری توسط کاربر (با اعتبارسنجی)."),
    toPersianDigits("انتخاب صدا: لیست کشویی از صداهای TTS با کیفیت بالا (با پیش‌نمایش)."),
    toPersianDigits("اسلایدرها/منوهای کشویی برای تنظیم دقیق ویژگی‌های شخصیتی."),
    toPersianDigits("«پیش‌نمایش زنده» از پاسخ‌های هوش مصنوعی با تغییر تنظیمات برای نمایش فوری تأثیر تغییرات."),
  ];


  const handleGeneratePersonaResponse = async () => {
    if (!ai) {
      setPersonaError(toPersianDigits("سرویس هوش مصنوعی به دلیل عدم تنظیم کلید API در دسترس نیست."));
      setIsGeneratingPersonaResponse(false);
      return;
    }
    if (!userQuery.trim()) {
      setPersonaError(toPersianDigits("لطفاً یک پرس و جو یا زمینه وارد کنید."));
      return;
    }
    setIsGeneratingPersonaResponse(true);
    setPersonaError(null);
    setPersonaResponse(null);

    try {
      const personaInEnglish = translatePersonaToEnglish(selectedPersona);
      const prompt = toPersianDigits(`یک پاسخ نمونه برای سناریوی زیر با شخصیت '${personaInEnglish}' در زمینه "${userQuery}" تولید کن. پاسخ باید به زبان فارسی و مناسب شخصیت انتخاب شده باشد. پاسخ را به صورت یک JSON با کلیدهای "responseText" (متن پاسخ به زبان فارسی)، "emoji" (یک ایموجی مرتبط، اختیاری)، "scenario" (مقدار "${userQuery}") و "persona" (مقدار "${selectedPersona}") ارائه بده.`);
      
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: AI_MODEL_NAME,
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });
      
      const parsedData = parseJsonFromString<SampleResponseProps>(response.text);

      if (parsedData && parsedData.responseText) {
        setPersonaResponse(parsedData);
      } else {
        // If AI fails to return valid JSON, construct a simple text response
        setPersonaResponse({
            scenario: userQuery,
            persona: selectedPersona,
            responseText: response.text || toPersianDigits("متاسفانه نتوانستم پاسخ مناسبی در فرمت JSON تولید کنم. لطفاً دوباره امتحان کنید."),
            emoji: undefined 
        });
        // throw new Error(toPersianDigits("فرمت پاسخ هوش مصنوعی نامعتبر است."));
      }

    } catch (e: any) {
      console.error("Error generating persona response:", e);
      let errorMsg = toPersianDigits("خطا در تولید پاسخ. لطفاً دوباره امتحان کنید.");
      if (e.message && e.message.includes("RESOURCE_EXHAUSTED")) {
          errorMsg = toPersianDigits("محدودیت استفاده از API برای تولید پاسخ اعمال شده است.");
      }
      setPersonaError(errorMsg);
    } finally {
      setIsGeneratingPersonaResponse(false);
    }
  };

  return (
    <section id="ai-persona-engine" className="py-20 md:py-28 bg-slate-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-sky-500/10 rounded-full mb-4">
            <UserCircleIcon className="w-12 h-12 text-sky-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-5">
            {toPersianDigits("فاز ۲.۵: طراحی شخصیت دستیار هوش مصنوعی و ارکستراسیون موتور")}
          </h2>
          <div className="w-24 h-1 mx-auto bg-sky-500 rounded-full"></div> {/* section-title-underline */}
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-8">
            {toPersianDigits("طراحی شبیه‌سازی شده با کمک هوش مصنوعی برای ایجاد یک شخصیت هوش مصنوعی قابل تنظیم، و معماری ارکستراسیون برای هماهنگی موتورهای NLU، NLG و ML.")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 mb-12">
            <div className="bg-slate-700/50 border border-slate-600 p-8 rounded-xl shadow-xl">
                <h3 className="text-xl md:text-2xl font-semibold text-sky-300 mb-5">{toPersianDigits("معماری ارکستراسیون موتورهای هوش مصنوعی")}</h3>
                <ul className="space-y-3">
                {orchestrationArchitecture.map((item, index) => (
                    <InfoListItemPersona key={index}>{item}</InfoListItemPersona>
                ))}
                </ul>
            </div>
            <div className="bg-slate-700/50 border border-slate-600 p-8 rounded-xl shadow-xl">
                <h3 className="text-xl md:text-2xl font-semibold text-sky-300 mb-5">{toPersianDigits("مدل پروفایل شخصیت هوش مصنوعی (مفهوم JSON)")}</h3>
                <pre className="bg-slate-900 p-4 rounded-lg text-xs text-gray-300 overflow-x-auto text-left border border-slate-700" dir="ltr"><code>{personaProfileModel}</code></pre>
            </div>
        </div>

        <div className="bg-slate-700/50 border border-slate-600 p-8 rounded-xl shadow-xl mb-12">
             <h3 className="text-xl md:text-2xl font-semibold text-sky-300 mb-5">{toPersianDigits("نمونه‌های تولید کد شبیه‌سازی شده برای تأثیرگذاری بر شخصیت")}</h3>
            <ul className="space-y-3">
                {personaCodeSnippetsInfo.map((item, index) => (
                    <InfoListItemPersona key={index}>{item}</InfoListItemPersona>
                ))}
            </ul>
        </div>
        
        <div className="bg-slate-700/50 border border-slate-600 p-8 rounded-xl shadow-xl mb-16">
            <h3 className="text-xl md:text-2xl font-semibold text-sky-300 mb-5 text-center">{toPersianDigits("شبیه‌ساز تعامل با شخصیت هوش مصنوعی")}</h3>
            <div className="max-w-lg mx-auto">
                <div className="mb-4">
                    <label htmlFor="userQuery" className="block text-sm font-medium text-sky-400 mb-1">{toPersianDigits("پرس و جو / زمینه شما:")}</label>
                    <input type="text" id="userQuery" value={userQuery} onChange={(e) => setUserQuery(e.target.value)} className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-gray-200 text-sm" />
                </div>
                 <div className="mb-4">
                    <label htmlFor="personaSelect" className="block text-sm font-medium text-sky-400 mb-1">{toPersianDigits("انتخاب شخصیت دستیار:")}</label>
                    <select id="personaSelect" value={selectedPersona} onChange={(e) => setSelectedPersona(e.target.value)} className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-gray-200 text-sm">
                        {personas.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                    </select>
                </div>
                <button
                    onClick={handleGeneratePersonaResponse}
                    disabled={isGeneratingPersonaResponse || !ai}
                    className="w-full flex items-center justify-center bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2.5 px-6 rounded-lg text-sm shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-60"
                >
                    {isGeneratingPersonaResponse ? <LoadingSpinner size="sm"/> : <SparklesIcon className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0"/>}
                    {toPersianDigits("دریافت پاسخ نمونه")}
                </button>
                {!ai && <p className="text-xs text-center text-yellow-300 mt-2">{toPersianDigits("سرویس هوش مصنوعی در دسترس نیست (کلید API تنظیم نشده؟)")}</p>}
                {personaError && <p className="text-xs text-red-400 bg-red-900/30 p-2 rounded-md mt-3 text-center">{personaError}</p>}
                {personaResponse && !isGeneratingPersonaResponse && (
                    <div className="mt-4 p-4 bg-slate-600/50 rounded-lg border border-slate-500">
                        <p className="text-sm text-sky-300 font-medium">{toPersianDigits(`پاسخ (${personaResponse.persona}):`)}</p>
                        <p className="text-gray-200 mt-1 whitespace-pre-wrap">
                            {toPersianDigits(personaResponse.responseText)}
                            {personaResponse.emoji && <span className="ml-1">{personaResponse.emoji}</span>}
                        </p>
                    </div>
                )}
            </div>
        </div>

        <div className="bg-slate-700/50 border border-slate-600 p-8 rounded-xl shadow-xl">
            <h3 className="text-xl md:text-2xl font-semibold text-sky-300 mb-5">{toPersianDigits("مفاهیم UI برای تنظیمات شخصیت")}</h3>
            <ul className="space-y-3">
                {uiConceptsPersona.map((item, index) => (
                    <InfoListItemPersona key={index}>{item}</InfoListItemPersona>
                ))}
            </ul>
        </div>
        
        <p className="text-sm text-gray-400 mt-10 text-center">
          {toPersianDigits("خروجی‌های شبیه‌سازی شده: مشخصات معماری برای ارکستراسیون موتورها، مدل داده JSON برای پروفایل شخصیت، قطعه کدهای نمونه برای مهندسی پرامپت، و مفاهیم اولیه UI برای صفحه تنظیمات شخصیت. هوش مصنوعی در طراحی مدل داده، تولید پرامپت‌ها و پیشنهاد بهترین شیوه‌های UI کمک می‌کند.")}
        </p>
      </div>
    </section>
  );
};

export default AIPersonaEngineSection;
