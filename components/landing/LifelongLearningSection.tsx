
import React, { useState } from 'react';
import { toPersianDigits, parseJsonFromString } from '../../utils';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { BookOpenIcon } from '../shared/AppIcons'; // Updated import

const InfoListItemLearning: React.FC<{ title?: string; children: React.ReactNode; className?: string }> = ({ title, children, className = "text-gray-300 text-md leading-relaxed" }) => (
  <li className={`list-disc list-inside mr-4 ${className}`}>
    {title && <strong className="text-sky-400 font-semibold">{title}: </strong>}
    {children}
  </li>
);

const SectionBlockLearning: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className = "bg-slate-800 p-8 rounded-xl shadow-xl border border-slate-700" }) => (
    <div className={className}>
        <h3 className="text-xl md:text-2xl font-semibold text-sky-300 mb-5">{toPersianDigits(title)}</h3>
        {children}
    </div>
);

interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

interface QuizData {
  questions: QuizQuestion[];
}

const LifelongLearningSection: React.FC = () => {
  const [textToSummarize, setTextToSummarize] = useState('');
  const [summarizedText, setSummarizedText] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summarizeError, setSummarizeError] = useState<string | null>(null);

  const [quizContent, setQuizContent] = useState('');
  const [generatedQuiz, setGeneratedQuiz] = useState<QuizData | null>(null);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [quizError, setQuizError] = useState<string | null>(null);
  
  const apiKey = process.env.API_KEY;
  const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

  const learningPaths = [
    { title: toPersianDigits("الگوریتم شخصی‌سازی شده"), description: toPersianDigits("هوش مصنوعی از الگوریتم‌های توصیه‌گر با تحلیل اهداف شغلی/شخصی کاربر، شکاف‌های مهارتی (از طریق ارزیابی‌ها/تعاملات)، سبک‌های یادگیری ترجیحی استفاده می‌کند.") },
    { title: toPersianDigits("مدیریت منابع متنوع"), description: toPersianDigits("پایگاه داده‌ای از منابع یادگیری متنوع (مقالات، دوره‌ها از پلتفرم‌هایی مانند Coursera/Udemy، ویدیوها، پادکست‌ها) را مدیریت می‌کند. به منابع خارجی پیوند می‌دهد، آنها را میزبانی نمی‌کند.") },
    { title: toPersianDigits("تطبیق پویا"), description: toPersianDigits("مسیرهای یادگیری به صورت پویا بر اساس پیشرفت کاربر، بازخورد و اهداف در حال تحول ایجاد و به‌روز می‌شوند.") },
  ];
  
  const conversationalSimulators = [
    { title: toPersianDigits("نقش‌آفرینی هوش مصنوعی"), description: toPersianDigits("هوش مصنوعی نقش طرف مقابل (مثلاً مصاحبه‌کننده، مشتری ناراضی، عضو تیم) را برای تمرین مهارت‌های ارتباطی، مذاکره، ارائه و رهبری ایفا می‌کند.") },
    { title: toPersianDigits("سناریوهای واقع‌گرایانه و بازخورد"), description: toPersianDigits("هوش مصنوعی سناریوهای متنوعی تولید می‌کند و بازخورد بلادرنگ در مورد لحن، انتخاب کلمات، وضوح و اثربخشی کلی کاربر ارائه می‌دهد.") },
    { title: toPersianDigits("آینده: تحلیل غیرکلامی"), description: toPersianDigits("مفهومی: استفاده از بینایی کامپیوتر (با اجازه دوربین) برای تحلیل نشانه‌های غیرکلامی مانند تماس چشمی و زبان بدن برای بازخورد جامع‌تر.") }
  ];
  
  const brainstormingEngine = [
    { title: toPersianDigits("تولید ایده خلاقانه"), description: toPersianDigits("هوش مصنوعی ایده‌های نوآورانه تولید می‌کند، ارتباطات غیرمنتظره را شناسایی می‌کند و راه‌حل‌های خلاقانه بر اساس موضوعات یا مشکلات ارائه شده توسط کاربر پیشنهاد می‌دهد.") },
    { title: toPersianDigits("پشتیبانی از تکنیک‌ها"), description: toPersianDigits("از تکنیک‌های خلاقیت تثبیت شده مانند SCAMPER، نقشه‌برداری ذهنی (تولید متن ساختاریافته برای ابزارهای نقشه ذهنی) یا شش کلاه تفکر (هوش مصنوعی می‌تواند نقش‌های مختلف 'کلاه' را ایفا کند) پشتیبانی می‌کند.") },
    { title: toPersianDigits("خروجی چندوجهی"), description: toPersianDigits("هوش مصنوعی می‌تواند ایده‌ها را به صورت متن، طرح‌های کلی ساختاریافته و نمودارها یا طرح‌های بصری مفهومی (با استفاده از مدل‌های تولید تصویر برای نمایش‌های اولیه) خروجی دهد.") }
  ];

  const handleSummarize = async () => {
    if (!ai) {
      setSummarizeError(toPersianDigits("سرویس هوش مصنوعی به دلیل عدم تنظیم کلید API در دسترس نیست."));
      setIsSummarizing(false);
      return;
    }
    if (!textToSummarize.trim()) {
      setSummarizeError(toPersianDigits("لطفاً متنی برای خلاصه کردن وارد کنید."));
      return;
    }
    setIsSummarizing(true);
    setSummarizeError(null);
    setSummarizedText('');
    try {
      const prompt = toPersianDigits(`این متن را برای یک یادگیرنده مادام العمر خلاصه کن. خلاصه باید به زبان فارسی و مختصر و مفید باشد:\n\n${textToSummarize}`);
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-04-17",
        contents: prompt,
      });
      setSummarizedText(response.text);
    } catch (e: any) {
      console.error("Error summarizing text:", e);
      setSummarizeError(toPersianDigits(`خطا در خلاصه سازی متن: ${e.message || "لطفاً دوباره امتحان کنید."}`));
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleGenerateQuiz = async () => {
    if (!ai) {
      setQuizError(toPersianDigits("سرویس هوش مصنوعی به دلیل عدم تنظیم کلید API در دسترس نیست."));
      setIsGeneratingQuiz(false);
      return;
    }
    if (!quizContent.trim()) {
      setQuizError(toPersianDigits("لطفاً محتوایی برای تولید آزمون وارد کنید."));
      return;
    }
    setIsGeneratingQuiz(true);
    setQuizError(null);
    setGeneratedQuiz(null);
    try {
      const prompt = toPersianDigits(`بر اساس متن زیر یک آزمون کوتاه چند گزینه ای (3 تا 5 سوال) به زبان فارسی ایجاد کن. برای هر سوال، خود سوال، چند گزینه و پاسخ صحیح را ارائه بده. خروجی باید یک JSON معتبر با ساختار زیر باشد: { "questions": [ { "question": "...", "options": ["الف", "ب", "ج"], "answer": "الف" } ] }\n\nمتن:\n${quizContent}`);
      
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-04-17",
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });

      const parsedData = parseJsonFromString<QuizData>(response.text);
      
      if (parsedData && parsedData.questions && Array.isArray(parsedData.questions)) {
        setGeneratedQuiz(parsedData);
      } else {
        throw new Error("فرمت JSON پاسخ نامعتبر است.");
      }

    } catch (e: any) {
      console.error("Error generating quiz:", e);
      setQuizError(toPersianDigits(`خطا در تولید آزمون: ${e.message || "لطفاً دوباره امتحان کنید."}`));
    } finally {
      setIsGeneratingQuiz(false);
    }
  };


  return (
    <section id="lifelong-learning" className="py-20 md:py-28 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-sky-500/10 rounded-full mb-4">
            <BookOpenIcon className="w-12 h-12 text-sky-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-5">
            {toPersianDigits("فاز ۴.۲: یادگیری مادام‌العمر و توسعه مهارت")}
          </h2>
          <div className="section-title-underline"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-8">
            {toPersianDigits("توسعه شبیه‌سازی شده یک پلتفرم یادگیری شخصی‌سازی شده، ابزارهای مربیگری مهارت و یک دستیار حل مسئله/تولید ایده مبتنی بر هوش مصنوعی.")}
          </p>
        </div>

        <div className="space-y-12">
          <SectionBlockLearning title={toPersianDigits("مسیرهای یادگیری فوق شخصی‌سازی شده و پویا")}>
            <ul className="space-y-4">
              {learningPaths.map((item, index) => (
                <InfoListItemLearning key={index} title={item.title}>{item.description}</InfoListItemLearning>
              ))}
            </ul>
            <p className="text-sm text-gray-500 mt-4 italic">*{toPersianDigits("هوش مصنوعی الگوریتم‌های توصیه و UI (React) برای ارائه مسیرهای یادگیری تولید می‌کند.")}*</p>
          </SectionBlockLearning>

          {/* Interactive Learning Tools Section */}
          <SectionBlockLearning title={toPersianDigits("ابزارهای یادگیری هوشمند (با Gemini API)")}>
            <div className="space-y-8">
              {/* Text Summarization */}
              <div>
                <h4 className="text-lg font-semibold text-sky-400 mb-3">{toPersianDigits("خلاصه‌سازی هوشمند متن")}</h4>
                <textarea
                  value={textToSummarize}
                  onChange={(e) => setTextToSummarize(e.target.value)}
                  placeholder={toPersianDigits("متنی را که می‌خواهید خلاصه شود اینجا وارد کنید...")}
                  rows={5}
                  className="w-full p-3 rounded-md bg-slate-700 border border-slate-600 focus:border-sky-500 focus:ring-sky-500 text-gray-200 text-sm"
                />
                <button
                  onClick={handleSummarize}
                  disabled={isSummarizing || !ai}
                  className="mt-3 bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 px-5 rounded-md text-sm transition-colors disabled:opacity-60"
                >
                  {isSummarizing ? toPersianDigits("در حال خلاصه سازی...") : toPersianDigits("خلاصه کن")}
                </button>
                 {!ai && <p className="text-xs text-yellow-300 mt-1">{toPersianDigits("سرویس هوش مصنوعی در دسترس نیست (کلید API تنظیم نشده؟)")}</p>}
                {summarizeError && <p className="mt-2 text-red-400 text-sm">{summarizeError}</p>}
                {summarizedText && (
                  <div className="mt-4 p-4 bg-slate-700 rounded-md border border-slate-600">
                    <h5 className="text-md font-semibold text-sky-300 mb-2">{toPersianDigits("متن خلاصه‌شده:")}</h5>
                    <p className="text-gray-300 text-sm whitespace-pre-wrap">{toPersianDigits(summarizedText)}</p>
                  </div>
                )}
              </div>

              {/* Quiz Generation */}
              <div>
                <h4 className="text-lg font-semibold text-sky-400 mb-3">{toPersianDigits("تولید خودکار آزمون")}</h4>
                <textarea
                  value={quizContent}
                  onChange={(e) => setQuizContent(e.target.value)}
                  placeholder={toPersianDigits("محتوایی که می‌خواهید از آن آزمون ساخته شود اینجا وارد کنید...")}
                  rows={5}
                  className="w-full p-3 rounded-md bg-slate-700 border border-slate-600 focus:border-sky-500 focus:ring-sky-500 text-gray-200 text-sm"
                />
                <button
                  onClick={handleGenerateQuiz}
                  disabled={isGeneratingQuiz || !ai}
                  className="mt-3 bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 px-5 rounded-md text-sm transition-colors disabled:opacity-60"
                >
                  {isGeneratingQuiz ? toPersianDigits("در حال تولید آزمون...") : toPersianDigits("تولید آزمون")}
                </button>
                {!ai && <p className="text-xs text-yellow-300 mt-1">{toPersianDigits("سرویس هوش مصنوعی در دسترس نیست (کلید API تنظیم نشده؟)")}</p>}
                {quizError && <p className="mt-2 text-red-400 text-sm">{quizError}</p>}
                {generatedQuiz && (
                  <div className="mt-4 p-4 bg-slate-700 rounded-md border border-slate-600">
                    <h5 className="text-md font-semibold text-sky-300 mb-2">{toPersianDigits("آزمون تولید شده:")}</h5>
                    {generatedQuiz.questions.map((q, i) => (
                      <div key={i} className="mb-3 pb-3 border-b border-slate-600 last:border-b-0">
                        <p className="text-gray-200 text-sm font-medium">{toPersianDigits(`${i + 1}. ${q.question}`)}</p>
                        <ul className="list-none pr-4 mt-1 space-y-1">
                          {q.options.map((opt, j) => (
                            <li key={j} className="text-gray-400 text-xs">
                              {toPersianDigits(String.fromCharCode(65 + j))}) {toPersianDigits(opt)}
                            </li>
                          ))}
                        </ul>
                        <p className="text-xs text-sky-400 mt-1">{toPersianDigits(`پاسخ صحیح: ${q.answer}`)}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
             <p className="text-sm text-gray-500 mt-4 italic">*{toPersianDigits("هوش مصنوعی کد پایتون برای مدل‌های NLP (خلاصه‌سازی، پرسش و پاسخ) و فرانت‌اند (React) برای ابزارهای تعاملی تولید می‌کند.")}*</p>
          </SectionBlockLearning>

          <SectionBlockLearning title={toPersianDigits("شبیه‌سازهای مکالمه پیشرفته (مهارت‌های نرم)")}>
            <ul className="space-y-4">
              {conversationalSimulators.map((item, index) => (
                <InfoListItemLearning key={index} title={item.title}>{item.description}</InfoListItemLearning>
              ))}
            </ul>
            <p className="text-sm text-gray-500 mt-4 italic">*{toPersianDigits("نیاز به میکروفون برای ورودی صوتی دارد. هوش مصنوعی منطق مدیریت گفتگو و الگوریتم‌های بازخورد تولید می‌کند.")}*</p>
          </SectionBlockLearning>
          
          <SectionBlockLearning title={toPersianDigits("موتور طوفان فکری و تولید ایده چندوجهی")}>
            <ul className="space-y-4">
              {brainstormingEngine.map((item, index) => (
                <InfoListItemLearning key={index} title={item.title}>{item.description}</InfoListItemLearning>
              ))}
            </ul>
            <p className="text-sm text-gray-500 mt-4 italic">*{toPersianDigits("هوش مصنوعی از مدل‌های تولیدی برای مفاهیم متنی و تصویری استفاده می‌کند و خروجی‌ها را برای تکنیک‌های مختلف خلاقیت ساختار می‌دهد.")}*</p>
          </SectionBlockLearning>
        </div>
        
        <p className="text-sm text-gray-400 mt-12 text-center">
          {toPersianDigits("خروجی‌های شبیه‌سازی شده: ماژول‌های مفهومی برای پلتفرم یادگیری (الگوریتم‌ها و کد UI)، ابزارهای توسعه مهارت (شبیه‌سازها و کد تحلیل)، و حل مسئله/تولید ایده (کد موتور طوفان فکری). هوش مصنوعی در طراحی الگوریتم، پیاده‌سازی مدل NLP، ایجاد جریان گفتگو و تولید اجزای UI کمک می‌کند.")}
        </p>
      </div>
    </section>
  );
};

export default LifelongLearningSection;
