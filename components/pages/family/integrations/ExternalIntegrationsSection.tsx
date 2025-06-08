
import React, { useCallback, useState } from 'react'; // Added useState and useCallback
import { toPersianDigits, parseJsonFromString } from '../../../../utils'; // Added parseJsonFromString
import { EducationalPlatform, CareServiceCategory, AISuggestionFamily, FamilyMember } from '../../../../types/familyTypes'; // Added FamilyMember
import EducationalPlatformCard from './EducationalPlatformCard';
import CareServiceCategoryCard from './CareServiceCategoryCard';
import FamilyAISuggestionCard from '../FamilyAISuggestionCard'; 
import { AcademicCapIcon, BuildingOfficeIcon, ShieldCheckIcon, SparklesIconNav, ArrowPathIcon } from '../../../shared/AppIcons'; // Added SparklesIconNav, ArrowPathIcon
import { GoogleGenAI, GenerateContentResponse } from "@google/genai"; // Added GenerateContentResponse
import LoadingSpinner from '../../../shared/LoadingSpinner'; // Added LoadingSpinner

const AI_MODEL_NAME_FAMILY_INTEGRATION = "gemini-2.5-flash-preview-04-17"; // Define model name

interface ExternalIntegrationsSectionProps {
  educationalPlatforms: EducationalPlatform[];
  careServiceCategories: CareServiceCategory[];
  aiSuggestions: AISuggestionFamily[]; // Existing prop for initial/passed suggestions
  themeClasses: {
    primaryAccentClass: string;
    secondaryAccentClass: string;
    backgroundClass: string; 
    buttonBgClass: string; 
    buttonHoverBgClass: string; 
  };
  onShowXai: (title: string, explanation: string) => void;
  geminiAI: GoogleGenAI | null; // Added Gemini AI instance
  familyMembers: FamilyMember[]; // Added family members for context
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void; // Added showToast
}

const ExternalIntegrationsSection: React.FC<ExternalIntegrationsSectionProps> = ({
  educationalPlatforms,
  careServiceCategories,
  aiSuggestions: initialAiSuggestions, // Rename to avoid conflict
  themeClasses,
  onShowXai,
  geminiAI,
  familyMembers,
  showToast
}) => {
  const [dynamicAiSuggestions, setDynamicAiSuggestions] = useState<AISuggestionFamily[]>(initialAiSuggestions);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [suggestionsError, setSuggestionsError] = useState<string | null>(null);

  const fetchAIIntegrationSuggestionsInternal = useCallback(async () => {
    if (!geminiAI) { 
      setSuggestionsError(toPersianDigits("سرویس AI برای پیشنهادات یکپارچه‌سازی در دسترس نیست."));
      showToast(toPersianDigits("سرویس AI در دسترس نیست."), "error");
      return; 
    }
    setIsLoadingSuggestions(true); 
    setSuggestionsError(null);
    try {
        const childAges = familyMembers.filter(m => m.role === 'فرزند' && m.dob).map(m => new Date().getFullYear() - new Date(m.dob).getFullYear()).join(', ') || 'کودک نوپا';
        const elderNeedsRaw = familyMembers.filter(m => m.role === 'سالمند تحت مراقبت').map(m => m.medicalRestrictions || 'نیازهای عمومی سالمندی').join('؛ ');
        const elderNeeds = elderNeedsRaw || 'نیاز خاصی برای سالمند ثبت نشده';
        
        const platformNames = educationalPlatforms.map(p => p.name).join('، ');
        const serviceCategoryNames = careServiceCategories.map(sc => sc.name).join('، ');

        const prompt = toPersianDigits(
            `یک خانواده با کودکان در سنین (${childAges}) و وضعیت مراقبت از سالمند (${elderNeeds}) وجود دارد. 
            پلتفرم‌های آموزشی موجود: ${platformNames || 'هیچ پلتفرم آموزشی خاصی لیست نشده'}. 
            دسته‌بندی‌های خدمات مراقبتی موجود: ${serviceCategoryNames || 'هیچ دسته خدمات مراقبتی لیست نشده'}.
            لطفاً ۱ تا ۲ پیشنهاد مرتبط و مفید برای این خانواده از بین پلتفرم‌های آموزشی یا دسته‌بندی‌های خدمات مراقبتی موجود یا مشابه آن‌ها به زبان فارسی ارائه بده. 
            هر پیشنهاد باید شامل "title" (عنوان پیشنهاد)، "text" (توضیح پیشنهاد و دلیل مفید بودن آن)، "xaiRationale" (دلیل عمیق‌تر انتخاب این پیشنهاد برای این خانواده) و "type" ('integration_suggestion') باشد. پاسخ باید یک آرایه JSON باشد.`
        );
        
        const response: GenerateContentResponse = await geminiAI.models.generateContent({ model: AI_MODEL_NAME_FAMILY_INTEGRATION, contents: prompt, config: { responseMimeType: "application/json" }});
        const parsedData = parseJsonFromString<AISuggestionFamily[]>(response.text);
        
        if (parsedData && Array.isArray(parsedData)) { 
            setDynamicAiSuggestions(parsedData.map(sugg => ({...sugg, id: `ai-integ-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`})));
            if(parsedData.length === 0) showToast(toPersianDigits("AI پیشنهاد جدیدی برای یکپارچه‌سازی پیدا نکرد."), "info");
        } else { 
            throw new Error("پاسخ نامعتبر از AI برای پیشنهادات یکپارچه‌سازی.");
        }
    } catch (e: any) { 
        setSuggestionsError(toPersianDigits("خطا در دریافت پیشنهادات یکپارچه‌سازی از AI.")); 
        showToast(toPersianDigits("خطا در دریافت پیشنهادات یکپارچه‌سازی از AI."), "error");
        console.error(e); 
    } 
    finally { setIsLoadingSuggestions(false); }
  }, [geminiAI, familyMembers, educationalPlatforms, careServiceCategories, showToast]);

  const suggestionsToDisplay = dynamicAiSuggestions.length > 0 ? dynamicAiSuggestions : initialAiSuggestions;


  return (
    <div className="space-y-6">
      {/* Educational Platforms */}
      <div>
        <h4 className={`text-sm font-semibold ${themeClasses.primaryAccentClass} mb-2 flex items-center`}>
          <AcademicCapIcon className={`w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 ${themeClasses.primaryAccentClass}`} />
          {toPersianDigits("پلتفرم‌های آموزشی معتبر")}
        </h4>
        <p className="text-xs text-gray-500 mb-3">
          {toPersianDigits("دسترسی به محتوای تخصصی تربیت فرزند و مراقبت از منابع معتبر. هوش مصنوعی می‌تواند بر اساس نیازهای شما محتوای مرتبط پیشنهاد دهد.")}
        </p>
        {educationalPlatforms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {educationalPlatforms.map(platform => (
              <EducationalPlatformCard key={platform.id} platform={platform} themeClasses={themeClasses} />
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-500 text-center py-3">{toPersianDigits("در حال حاضر پلتفرم آموزشی برای نمایش وجود ندارد.")}</p>
        )}
      </div>

      {/* Care Services */}
      <div>
        <h4 className={`text-sm font-semibold ${themeClasses.primaryAccentClass} mb-2 flex items-center`}>
          <BuildingOfficeIcon className={`w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 ${themeClasses.primaryAccentClass}`} />
          {toPersianDigits("سرویس‌های کمکی و مراقبتی (اختیاری)")}
        </h4>
        <div className={`p-2.5 bg-yellow-50 rounded-md border border-yellow-200 text-xs text-yellow-700 mb-3 flex items-start gap-2`}>
            <ShieldCheckIcon className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5"/>
            <p>{toPersianDigits("مهم: اتصال به این سرویس‌ها کاملاً اختیاری است و تنها با رضایت کامل و آگاهانه شما و با رعایت تمام مقررات قانونی و اخلاقی انجام خواهد شد. این پلتفرم صرفاً به عنوان یک واسط اطلاعاتی عمل می‌کند.")}</p>
        </div>
        {careServiceCategories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {careServiceCategories.map(category => (
              <CareServiceCategoryCard key={category.id} category={category} themeClasses={themeClasses} />
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-500 text-center py-3">{toPersianDigits("در حال حاضر دسته‌بندی سرویس مراقبتی برای نمایش وجود ندارد.")}</p>
        )}
      </div>

      {/* AI Suggestions related to integrations */}
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
            <h5 className={`text-sm font-medium ${themeClasses.primaryAccentClass} flex items-center`}>
                 <SparklesIconNav className={`w-4 h-4 mr-1.5 rtl:ml-1.5 rtl:mr-0 text-yellow-500`} />
                {toPersianDigits("پیشنهادات مرتبط از هوش مصنوعی:")}
            </h5>
            <button 
                onClick={fetchAIIntegrationSuggestionsInternal} 
                disabled={isLoadingSuggestions || !geminiAI} 
                className={`p-1 rounded-full hover:bg-opacity-20 ${themeClasses.buttonHoverBgClass.replace('hover:bg-','')} disabled:opacity-50`} 
                title={toPersianDigits("بارگذاری مجدد پیشنهادات AI")}
            >
                <ArrowPathIcon className="w-3.5 h-3.5"/>
            </button>
        </div>
         {isLoadingSuggestions && <div className="flex justify-center py-2"><LoadingSpinner size="sm"/></div>}
         {suggestionsError && <p className="text-xs text-red-500 bg-red-50 p-2 rounded-md">{suggestionsError}</p>}
         {!isLoadingSuggestions && !suggestionsError && suggestionsToDisplay.length === 0 && (
            <p className="text-xs text-gray-500 text-center">{toPersianDigits("در حال حاضر پیشنهاد جدیدی از AI برای یکپارچه‌سازی وجود ندارد.")}</p>
         )}
        {suggestionsToDisplay.length > 0 && (
            <div className="space-y-2">
                {suggestionsToDisplay.map(sugg => (
                <FamilyAISuggestionCard
                    key={sugg.id}
                    suggestion={sugg}
                    onAccept={() => showToast(toPersianDigits(`پیشنهاد '${sugg.title}' پذیرفته شد (شبیه‌سازی).`), 'success')}
                    onDecline={() => showToast(toPersianDigits(`پیشنهاد '${sugg.title}' رد شد.`), 'info')}
                    onShowRationale={(rationale) => onShowXai(sugg.title || 'پیشنهاد هوشمند', rationale)}
                    primaryAccentClass={themeClasses.primaryAccentClass}
                    secondaryAccentClass={themeClasses.secondaryAccentClass}
                />
                ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default ExternalIntegrationsSection;