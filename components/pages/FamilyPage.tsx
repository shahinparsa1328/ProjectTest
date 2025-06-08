
import React, { useState, useCallback, useEffect } from 'react';
import { toPersianDigits, parseJsonFromString } from '../../../utils';
import { FamilyIcon, CalendarDaysIcon, ListIcon as ListIconFamily, HeartIcon as WellbeingScoreIcon, UserCircleIcon as ProfileIcon, SparklesIconNav as QualityTimeIcon, LightbulbIcon, PlusIcon, ChevronDownIcon, ChevronUpIcon, AcademicCapIcon, ShieldCheckIcon, CheckCircleIcon as CheckIconFromApp, XCircleIcon as XCircleIconFromApp, BedIcon, PuzzlePieceIcon, ShieldExclamationIcon, PhoneIcon, CameraIcon as AlbumIcon, MegaphoneIcon, BookIcon as RecipeBookIcon, PaintBrushIcon, XMarkIcon, AdjustmentsVerticalIcon as OrchestrationIcon, ChatBubbleOvalLeftEllipsisIcon, ArchiveBoxIcon, UserGroupIcon as FamilyTreeIcon, LinkIcon as IntegrationsIcon, BuildingOfficeIcon, CogIcon, SparklesIconNav, ArrowPathIcon } from '../../shared/AppIcons'; // Added CogIcon, SparklesIconNav, ArrowPathIcon
import CollapsibleSection from '../../shared/CollapsibleSection';
import ToastNotification from '../../shared/ToastNotification';
import { FamilyMember, CalendarEvent, SharedList, DevelopmentMilestone, CareReminder, AISuggestionFamily, QualityTimeActivity, WellbeingFactor, PhotoAlbum, BulletinPost, MealPlan, Recipe, ChatMessage, MealPlanSlot, SleepLog, NutritionLog, ActivitySuggestion, ParentingTip, GameIdea, ElderlyHealthDataPoint, ElderlyAISuggestion, ElderlyHealthTrend, TimeCapsuleItem, FamilyTreeNode, FamilyMemoryReminder, EducationalPlatform, CareServiceCategory, AISuggestion, EventType, MealPlanEntry, SharedListItem, ChildHealthAlert, ElderlyHealthDataType } from '../../../types/familyTypes'; 
import { GoogleGenAI, GenerateContentResponse } from "@google/genai"; 
import FamilyPageHeader from './FamilyPageHeader'; 
import LoadingSpinner from '../../shared/LoadingSpinner'; // Added LoadingSpinner

// Import new components for Phase 3.1
import FamilyWellbeingScoreCard from './family/FamilyWellbeingScoreCard';
import WellbeingReportModal from './family/WellbeingReportModal';
import FamilyAISuggestionCard from './family/FamilyAISuggestionCard';
import QualityTimePlannerCard from './family/QualityTimePlannerCard';
import XAIModal from '../../shared/XAIModal'; 

// Import new components for Phase 3.2
import ChildDevelopmentSection from './family/ChildDevelopmentSection';
import ElderlyCareSection from './family/ElderlyCareSection';

// Import new components for Phase 3.3
import TimeCapsuleSection from './family/timecapsule/TimeCapsuleSection';
import FamilyTreeSection from './FamilyTreeSection';
import FamilyMemoryReminderCard from './family/FamilyMemoryReminderCard';

// Import new components for Phase 3.5
import ExternalIntegrationsSection from './family/integrations/ExternalIntegrationsSection';

// Import new component for Phase 3.6
import FamilyPageCommitmentSection from './family/FamilyPageCommitmentSection';


// Placeholder Modals (to be created later)
import AddFamilyMemberModal from './family/AddFamilyMemberModal';
import AddEventModal from './family/AddEventModal';
import AddSharedListModal from './family/AddSharedListModal';
import AddMilestoneModal from './family/AddMilestoneModal';
import AddCareReminderModal from './family/AddCareReminderModal';
// Placeholder for FamilyMessenger and Album components
import FamilyMessenger from './family/messenger/FamilyMessenger';
import PhotoAlbumsDashboard from './family/albums/PhotoAlbumsDashboard';
import AlbumView from './family/albums/AlbumView';
import AddAlbumModal from './family/albums/AddAlbumModal';
import BulletinBoard from './family/bulletin/BulletinBoard';
import AddBulletinPostModal from './family/bulletin/AddBulletinPostModal';
// Placeholder for Meal Planner components
import WeeklyMealCalendar from './family/mealplanner/WeeklyMealCalendar';
import RecipeDetailModal from './family/mealplanner/RecipeDetailModal';
import AddUserRecipeModal from './family/mealplanner/AddUserRecipeModal';
import AssignRecipeToSlotModal from './family/mealplanner/AssignRecipeToSlotModal';
// Placeholder for logging modals
import AddSleepLogModal from './AddSleepLogModal';
import AddNutritionLogModal from './AddNutritionLogModal';
// Placeholder for card components
import FamilyMemberCard from './FamilyMemberCard';
import MilestoneCard from './MilestoneCard';
import CareReminderCard from './CareReminderCard';
import SharedListCard from './SharedListCard';
import RecipeCard from './family/mealplanner/RecipeCard';
import MonthView from './MonthView';
import WeekView from './WeekView';
import DayView from './DayView';
import CalendarControls from './CalendarControls';

// --- Sub-components that were missing from the provided files but are implied by FamilyPage structure ---

// FamilyCalendar Placeholder (Basic structure)
const FamilyCalendar: React.FC<{events: CalendarEvent[], onAddEvent: () => void, onEventClick: (event: CalendarEvent) => void, themeClasses: FamilyPageThemeSettingsInternal, familyMembers: FamilyMember[]}> = ({events, onAddEvent, onEventClick, themeClasses, familyMembers}) => (
  <CollapsibleSection title={toPersianDigits("تقویم خانواده")} icon={<CalendarDaysIcon className={`w-5 h-5 ${themeClasses.primaryAccentClass}`} />} isOpen={true} onToggle={()=>{}}
    className={`bg-white p-3 rounded-lg shadow-sm border ${themeClasses.secondaryAccentClass}`} titleColorClass={`text-sm font-semibold ${themeClasses.primaryAccentClass}`}>
    <div className="h-40 bg-gray-100 flex items-center justify-center text-xs text-gray-400 rounded">{toPersianDigits("تقویم در اینجا نمایش داده می‌شود.")}</div>
    <button onClick={onAddEvent} className={`mt-2 w-full text-xs py-1.5 ${themeClasses.buttonBgClass} ${themeClasses.buttonHoverBgClass} text-white rounded-md flex items-center justify-center`}>
      <PlusIcon className="w-3.5 h-3.5 mr-1"/> {toPersianDigits("افزودن رویداد جدید")}
    </button>
  </CollapsibleSection>
);

// SharedListsSection Placeholder
const SharedListsSection: React.FC<{sharedLists: SharedList[], onAddList: () => void, onDeleteItem: (listId: string, itemId: string) => void, onToggleItem: (listId: string, itemId: string) => void, onAddItem: (listId: string, itemText: string) => void, onDeleteList: (listId: string) => void, themeClasses: FamilyPageThemeSettingsInternal}> = ({sharedLists, onAddList, onDeleteItem, onToggleItem, onAddItem, onDeleteList, themeClasses}) => (
  <CollapsibleSection title={toPersianDigits("لیست‌های مشترک")} icon={<ListIconFamily className={`w-5 h-5 ${themeClasses.primaryAccentClass}`} />} isOpen={false} onToggle={()=>{}}
    className={`bg-white p-3 rounded-lg shadow-sm border ${themeClasses.secondaryAccentClass}`} titleColorClass={`text-sm font-semibold ${themeClasses.primaryAccentClass}`}>
    {sharedLists.length === 0 ? <p className="text-xs text-gray-500 text-center py-2">{toPersianDigits("لیستی وجود ندارد.")}</p> : 
    <div className="space-y-2 max-h-48 overflow-y-auto pr-1 scrollbar-thin"> {sharedLists.map(list => <SharedListCard key={list.id} list={list} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} onAddItem={onAddItem} onDeleteList={onDeleteList}/>)} </div>}
     <button onClick={onAddList} className={`mt-2 w-full text-xs py-1.5 ${themeClasses.buttonBgClass} ${themeClasses.buttonHoverBgClass} text-white rounded-md flex items-center justify-center`}>
      <PlusIcon className="w-3.5 h-3.5 mr-1"/> {toPersianDigits("ایجاد لیست جدید")}
    </button>
  </CollapsibleSection>
);

// FamilyMembersSection Placeholder
const FamilyMembersSection: React.FC<{familyMembers: FamilyMember[], onAddMember: () => void, onEditMember: (member: FamilyMember) => void, onDeleteMember: (memberId: string) => void, themeClasses: FamilyPageThemeSettingsInternal}> = ({familyMembers, onAddMember, onEditMember, onDeleteMember, themeClasses}) => (
  <CollapsibleSection title={toPersianDigits("اعضای خانواده")} icon={<ProfileIcon className={`w-5 h-5 ${themeClasses.primaryAccentClass}`} />} isOpen={true} onToggle={()=>{}}
    className={`bg-white p-3 rounded-lg shadow-sm border ${themeClasses.secondaryAccentClass}`} titleColorClass={`text-sm font-semibold ${themeClasses.primaryAccentClass}`}>
    {familyMembers.length === 0 ? <p className="text-xs text-gray-500 text-center py-2">{toPersianDigits("عضوی ثبت نشده.")}</p> : 
    <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1 scrollbar-thin"> {familyMembers.map(member => <FamilyMemberCard key={member.id} member={member} onEdit={() => onEditMember(member)} onDelete={() => onDeleteMember(member.id)} />)} </div> }
    <button onClick={onAddMember} className={`mt-2 w-full text-xs py-1.5 ${themeClasses.buttonBgClass} ${themeClasses.buttonHoverBgClass} text-white rounded-md flex items-center justify-center`}>
      <PlusIcon className="w-3.5 h-3.5 mr-1"/> {toPersianDigits("افزودن عضو جدید")}
    </button>
  </CollapsibleSection>
);

// MilestonesSection Placeholder
const MilestonesSection: React.FC<{milestones: DevelopmentMilestone[], familyMembers: FamilyMember[], onAddMilestone: () => void, onEditMilestone: (milestone: DevelopmentMilestone) => void, onDeleteMilestone: (milestoneId: string) => void, themeClasses: FamilyPageThemeSettingsInternal}> = ({milestones, familyMembers, onAddMilestone, onEditMilestone, onDeleteMilestone, themeClasses}) => (
  <CollapsibleSection title={toPersianDigits("نقاط عطف رشد")} icon={<AcademicCapIcon className={`w-5 h-5 ${themeClasses.primaryAccentClass}`} />} isOpen={false} onToggle={()=>{}}
    className={`bg-white p-3 rounded-lg shadow-sm border ${themeClasses.secondaryAccentClass}`} titleColorClass={`text-sm font-semibold ${themeClasses.primaryAccentClass}`}>
    {milestones.length === 0 ? <p className="text-xs text-gray-500 text-center py-2">{toPersianDigits("نقطه عطفی ثبت نشده.")}</p> : 
    <div className="space-y-2 max-h-48 overflow-y-auto pr-1 scrollbar-thin"> {milestones.map(m => <MilestoneCard key={m.id} milestone={m} childName={familyMembers.find(fm => fm.id === m.childMemberId)?.name || ''} onEdit={() => onEditMilestone(m)} onDelete={() => onDeleteMilestone(m.id)} />)} </div>}
    <button onClick={onAddMilestone} className={`mt-2 w-full text-xs py-1.5 ${themeClasses.buttonBgClass} ${themeClasses.buttonHoverBgClass} text-white rounded-md flex items-center justify-center`}>
      <PlusIcon className="w-3.5 h-3.5 mr-1"/> {toPersianDigits("ثبت نقطه عطف جدید")}
    </button>
  </CollapsibleSection>
);

// CareRemindersSection Placeholder
const CareRemindersSection: React.FC<{reminders: CareReminder[], familyMembers: FamilyMember[], onAddReminder: () => void, onEditReminder: (reminder: CareReminder) => void, onDeleteReminder: (reminderId: string) => void, onToggleComplete: (reminderId: string) => void, themeClasses: FamilyPageThemeSettingsInternal}> = ({reminders, familyMembers, onAddReminder, onEditReminder, onDeleteReminder, onToggleComplete, themeClasses}) => (
   <CollapsibleSection title={toPersianDigits("یادآورهای مراقبت")} icon={<ShieldCheckIcon className={`w-5 h-5 ${themeClasses.primaryAccentClass}`} />} isOpen={false} onToggle={()=>{}}
    className={`bg-white p-3 rounded-lg shadow-sm border ${themeClasses.secondaryAccentClass}`} titleColorClass={`text-sm font-semibold ${themeClasses.primaryAccentClass}`}>
    {reminders.length === 0 ? <p className="text-xs text-gray-500 text-center py-2">{toPersianDigits("یادآوری ثبت نشده.")}</p> : 
    <div className="space-y-2 max-h-48 overflow-y-auto pr-1 scrollbar-thin"> {reminders.map(r => <CareReminderCard key={r.id} reminder={r} onEdit={() => onEditReminder(r)} onDelete={() => onDeleteReminder(r.id)} onToggleComplete={() => onToggleComplete(r.id)} />)} </div>}
     <button onClick={onAddReminder} className={`mt-2 w-full text-xs py-1.5 ${themeClasses.buttonBgClass} ${themeClasses.buttonHoverBgClass} text-white rounded-md flex items-center justify-center`}>
      <PlusIcon className="w-3.5 h-3.5 mr-1"/> {toPersianDigits("افزودن یادآور جدید")}
    </button>
  </CollapsibleSection>
);

// MealPlannerSection Placeholder
const MealPlannerSection: React.FC<{recipes: Recipe[], mealPlan: MealPlanEntry[], onAddRecipe: () => void, onAssignRecipe: (date: string, slot: MealPlanSlot) => void, onViewRecipe: (recipe: Recipe) => void, onEditRecipe: (recipe: Recipe) => void, onDeleteRecipe: (recipeId: string) => void, themeClasses: FamilyPageThemeSettingsInternal}> = ({recipes, mealPlan, onAddRecipe, onAssignRecipe, onViewRecipe, onEditRecipe, onDeleteRecipe, themeClasses}) => (
  <CollapsibleSection title={toPersianDigits("برنامه‌ریز هوشمند غذا")} icon={<RecipeBookIcon className={`w-5 h-5 ${themeClasses.primaryAccentClass}`} />} isOpen={false} onToggle={()=>{}}
    className={`bg-white p-3 rounded-lg shadow-sm border ${themeClasses.secondaryAccentClass}`} titleColorClass={`text-sm font-semibold ${themeClasses.primaryAccentClass}`}>
    <WeeklyMealCalendar currentDate={new Date()} mealPlanEntries={mealPlan} recipes={recipes} onAssignRecipe={onAssignRecipe} onGenerateAIMealPlan={()=>{}} onGenerateShoppingList={()=>{}} onViewRecipe={onViewRecipe}/>
    <div className="mt-2 text-xs">
        <div className="flex justify-between items-center mb-1">
             <h6 className="font-medium">{toPersianDigits("دستور پخت‌های شما:")} ({toPersianDigits(recipes.length.toString())})</h6>
             <button onClick={onAddRecipe} className={`text-xs py-1 px-2 rounded-md text-white ${themeClasses.buttonBgClass} ${themeClasses.buttonHoverBgClass} flex items-center`}><PlusIcon className="w-3 h-3 mr-1"/>{toPersianDigits("افزودن")}</button>
        </div>
        {recipes.length === 0 ? <p className="text-gray-500 text-center py-1">{toPersianDigits("دستور پختی اضافه نشده.")}</p> : <div className="flex overflow-x-auto gap-2 pb-1 scrollbar-thin"> {recipes.map(r => <div key={r.id} className="flex-shrink-0 w-28"><RecipeCard recipe={r} onViewDetail={() => onViewRecipe(r)} onEditRecipe={onEditRecipe} onDeleteRecipe={onDeleteRecipe} /></div> )} </div>}
    </div>
  </CollapsibleSection>
);

// PhotoAlbumSection Placeholder
const PhotoAlbumSection: React.FC<{albums: PhotoAlbum[], onSelectAlbum: (albumId: string) => void, onOpenAddAlbumModal: (albumToEdit?: PhotoAlbum | null) => void, onDeleteAlbum: (albumId: string) => void, viewingAlbum: PhotoAlbum | undefined, onUploadPhoto: (albumId: string, photoDataUrl: string, photoName: string) => void, onBackToDashboard: () => void, themeClasses: FamilyPageThemeSettingsInternal}> = ({albums, onSelectAlbum, onOpenAddAlbumModal, onDeleteAlbum, viewingAlbum, onUploadPhoto, onBackToDashboard, themeClasses}) => (
  <CollapsibleSection title={toPersianDigits("آلبوم‌های عکس خانوادگی")} icon={<AlbumIcon className={`w-5 h-5 ${themeClasses.primaryAccentClass}`} />} isOpen={false} onToggle={()=>{}}
    className={`bg-white p-3 rounded-lg shadow-sm border ${themeClasses.secondaryAccentClass}`} titleColorClass={`text-sm font-semibold ${themeClasses.primaryAccentClass}`}>
     {viewingAlbum ? (
        <AlbumView album={viewingAlbum} onBackToDashboard={onBackToDashboard} onUploadPhoto={onUploadPhoto}/>
    ) : (
        <PhotoAlbumsDashboard albums={albums} onSelectAlbum={onSelectAlbum} onOpenAddAlbumModal={onOpenAddAlbumModal} onDeleteAlbum={onDeleteAlbum}/>
    )}
  </CollapsibleSection>
);

// FamilyBulletinBoardSection Placeholder
const FamilyBulletinBoardSection: React.FC<{posts: BulletinPost[], onOpenAddPostModal: (postToEdit?: BulletinPost | null) => void, onDeletePost: (postId: string) => void, themeClasses: FamilyPageThemeSettingsInternal}> = ({posts, onOpenAddPostModal, onDeletePost, themeClasses}) => (
  <CollapsibleSection title={toPersianDigits("تابلوی اعلانات خانواده")} icon={<MegaphoneIcon className={`w-5 h-5 ${themeClasses.primaryAccentClass}`} />} isOpen={false} onToggle={()=>{}}
    className={`bg-white p-3 rounded-lg shadow-sm border ${themeClasses.secondaryAccentClass}`} titleColorClass={`text-sm font-semibold ${themeClasses.primaryAccentClass}`}>
    <BulletinBoard posts={posts} onOpenAddPostModal={onOpenAddPostModal} onDeletePost={onDeletePost} />
  </CollapsibleSection>
);


// --- End of Sub-components ---


export interface FamilyPageThemeSettingsInternal { 
    backgroundClass: string;
    primaryAccentClass: string;
    secondaryAccentClass: string; 
    buttonBgClass: string;
    buttonHoverBgClass: string;
}

export interface FamilyPageProps { 
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  geminiAI?: GoogleGenAI | null; // Make optional for simpler testing without AI key
  currentUserId: string; 
  themeClasses: FamilyPageThemeSettingsInternal; 
  onShowXai: (title: string, explanation: string) => void; 
}


export const themeSettings: Record<string, FamilyPageThemeSettingsInternal> = {
    rose: { 
        backgroundClass: 'bg-rose-50', 
        primaryAccentClass: 'text-rose-600',
        secondaryAccentClass: 'border-rose-200', 
        buttonBgClass: 'bg-rose-500', 
        buttonHoverBgClass: 'hover:bg-rose-600' 
    },
    default: { 
        backgroundClass: 'bg-family-page', 
        primaryAccentClass: 'text-indigo-600', 
        secondaryAccentClass: 'border-indigo-200', 
        buttonBgClass: 'bg-indigo-500', 
        buttonHoverBgClass: 'hover:bg-indigo-600' 
    }
};

const AI_MODEL_NAME_FAMILY = "gemini-2.5-flash-preview-04-17";


export const FamilyPage: React.FC<FamilyPageProps> = ({ 
    showToast, 
    geminiAI = null, 
    currentUserId, 
    themeClasses, 
    onShowXai 
}) => {
  const activeTheme = themeClasses; 
  const [familyName, setFamilyName] = useState<string | undefined>(toPersianDigits("احمدی"));

  // --- State for Modals ---
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<FamilyMember | null>(null);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [isAddListModalOpen, setIsAddListModalOpen] = useState(false);
  const [isAddMilestoneModalOpen, setIsAddMilestoneModalOpen] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<DevelopmentMilestone | null>(null);
  const [isAddCareReminderModalOpen, setIsAddCareReminderModalOpen] = useState(false);
  const [editingCareReminder, setEditingCareReminder] = useState<CareReminder | null>(null);
  const [isAddRecipeModalOpen, setIsAddRecipeModalOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [isAssignRecipeModalOpen, setIsAssignRecipeModalOpen] = useState(false);
  const [assignRecipeTarget, setAssignRecipeTarget] = useState<{date: string, slot: MealPlanSlot} | null>(null);
  const [viewingRecipe, setViewingRecipe] = useState<Recipe | null>(null);
  const [isAddAlbumModalOpen, setIsAddAlbumModalOpen] = useState(false);
  const [editingAlbum, setEditingAlbum] = useState<PhotoAlbum | null>(null);
  const [viewingAlbumId, setViewingAlbumId] = useState<string | null>(null);
  const [isAddPostModalOpen, setIsAddPostModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BulletinPost | null>(null);
  const [isAddSleepLogModalOpen, setIsAddSleepLogModalOpen] = useState(false);
  const [editingSleepLog, setEditingSleepLog] = useState<SleepLog | null>(null);
  const [isAddNutritionLogModalOpen, setIsAddNutritionLogModalOpen] = useState(false);
  const [editingNutritionLog, setEditingNutritionLog] = useState<NutritionLog | null>(null);
  
  // --- Main Data States ---
  const [familyMembersData, setFamilyMembersData] = useState<FamilyMember[]>([]);
  const [calendarEventsData, setCalendarEventsData] = useState<CalendarEvent[]>([]);
  const [sharedListsData, setSharedListsData] = useState<SharedList[]>([]);
  const [developmentMilestonesData, setDevelopmentMilestonesData] = useState<DevelopmentMilestone[]>([]);
  const [careRemindersData, setCareRemindersData] = useState<CareReminder[]>([]);
  const [userRecipes, setUserRecipes] = useState<Recipe[]>([]);
  const [mealPlanEntries, setMealPlanEntries] = useState<MealPlanEntry[]>([]);
  const [photoAlbumsData, setPhotoAlbumsData] = useState<PhotoAlbum[]>([]);
  const [bulletinPostsData, setBulletinPostsData] = useState<BulletinPost[]>([]);
  const [sleepLogsData, setSleepLogsData] = useState<SleepLog[]>([]);
  const [nutritionLogsData, setNutritionLogsData] = useState<NutritionLog[]>([]);
  
  // --- Elderly Care Data (Phase 3.2) ---
  const [elderlyHealthData, setElderlyHealthData] = useState<ElderlyHealthDataPoint[]>([
    {id:'ehd1', elderMemberId:'elder1', timestamp: new Date(Date.now() - 86400000 * 2).toISOString(), type:'heart_rate', value:75, unit:'bpm'},
    {id:'ehd2', elderMemberId:'elder1', timestamp: new Date(Date.now() - 86400000).toISOString(), type:'activity_level', value: 2500, unit: 'قدم'},
    {id:'ehd3', elderMemberId:'elder1', timestamp: new Date().toISOString(), type:'sleep_pattern', value: '۷ ساعت، ۲ بار بیداری', notes: 'خواب نسبتا خوب بود.'}
  ]);
  const [dynamicElderlyCareSuggestions, setDynamicElderlyCareSuggestions] = useState<ElderlyAISuggestion[]>([]);
  const [isLoadingElderlyAISuggestions, setIsLoadingElderlyAISuggestions] = useState(false);
  const [elderlyAISuggestionError, setElderlyAISuggestionError] = useState<string | null>(null);
  const [elderlyHealthTrends, setElderlyHealthTrends] = useState<ElderlyHealthTrend[]>([{id:'eht1', elderMemberId:'elder1', dataType:'activity_level', period:'weekly', trendDescription:'سطح فعالیت این هفته نسبت به هفته گذشته ۱۰٪ کاهش داشته است.'}]);


  // --- Child Development AI Data (Phase 3.2) ---
  const [dynamicParentingTips, setDynamicParentingTips] = useState<ParentingTip[]>([]);
  const [isLoadingParentingTips, setIsLoadingParentingTips] = useState(false);
  const [parentingTipsError, setParentingTipsError] = useState<string | null>(null);
  const [childHealthAlerts, setChildHealthAlerts] = useState<ChildHealthAlert[]>([]);
  const [isLoadingChildHealthAlerts, setIsLoadingChildHealthAlerts] = useState(false);
  const [childHealthAlertsError, setChildHealthAlertsError] = useState<string | null>(null);
  const [activitySuggestions, setActivitySuggestions] = useState<ActivitySuggestion[]>([{id:'as1', childMemberId:'child1', title: 'بازی با لگو', description:'ساختن برج با لگوهای رنگی.', ageAppropriateness:'۲-۳ سال', benefits:['مهارت حرکتی ظریف'], xaiRationale:'برای تقویت خلاقیت و هماهنگی دست و چشم.'}]);
  const [gameIdeas, setGameIdeas] = useState<GameIdea[]>([{id:'gi1', title:'قایم باشک', description:'یک بازی کلاسیک و شاد برای تمام سنین.', ageRange:'۳+ سال', category:'داخل خانه', xaiRationale:'برای افزایش فعالیت بدنی و تعامل اجتماعی.'}]);

  // --- Other states (from original component) ---
  const [familyWellbeingScore, setFamilyWellbeingScore] = useState(78);
  const [wellbeingFactors, setWellbeingFactors] = useState<WellbeingFactor[]>([ { id: 'wf1', name: toPersianDigits("زمان با کیفیت مشترک"), impact: 'positive', description: toPersianDigits("هفته گذشته ۳ فعالیت مشترک ثبت شده است.") }, { id: 'wf2', name: toPersianDigits("توزیع وظایف خانه"), impact: 'neutral', description: toPersianDigits("وظایف به طور نسبی تقسیم شده‌اند اما برخی اعضا بار بیشتری دارند.") }, ]);
  const [isWellbeingReportModalOpen, setIsWellbeingReportModalOpen] = useState(false);
  const [isXaiModalOpen, setIsXaiModalOpen] = useState(false);
  const [xaiModalContent, setXaiModalContent] = useState({ title: '', explanation: '' });
  const [familyMemoryReminders, setFamilyMemoryReminders] = useState<FamilyMemoryReminder[]>([ { id: 'mem1', title: 'سالگرد ازدواج شما!', description: 'یادتان هست ۱۰ سال پیش در چنین روزی چه خاطره زیبایی ساختید؟ یک جشن کوچک چطور است؟', memoryDate: new Date(new Date().setDate(new Date().getDate() - 365*10)).toISOString().split('T')[0], xaiRationale: 'این تاریخ از پروفایل شما استخراج شده است.', sourceType: 'manual' }, { id: 'mem2', title: 'اولین روز مدرسه پسرم', description: 'امروز سالگرد اولین روز مدرسه رفتن پسرتان است. چقدر زود بزرگ شد!', memoryDate: new Date(new Date().setFullYear(new Date().getFullYear() - 3)).toISOString().split('T')[0], xaiRationale: 'این رویداد از تقویم خانوادگی شما یادآوری شده است.', sourceType: 'calendar' } ]);
  const [educationalPlatforms, setEducationalPlatforms] = useState<EducationalPlatform[]>([ { id: 'edu1', name: 'آکادمی والدین هوشمند', description: 'دوره‌ها و مقالات تخصصی تربیت فرزند از نوزادی تا نوجوانی.', logoUrl: 'https://picsum.photos/seed/parentacademy/40/40', websiteUrl: '#', relevantTopics: ['تربیت کودک', 'رشد کودک'] }, { id: 'edu2', name: 'مرکز سلامت سالمندان ایران', description: 'منابع آموزشی و راهنمایی برای مراقبت بهتر از سالمندان عزیز.', logoUrl: 'https://picsum.photos/seed/eldercarehub/40/40', websiteUrl: '#', relevantTopics: ['مراقبت از سالمند', 'بیماری‌های سالمندی'] }, ]);
  const [careServiceCategories, setCareServiceCategories] = useState<CareServiceCategory[]>([ { id: 'cs1', name: 'خدمات مراقبت از کودک', description: 'یافتن پرستار یا مهدکودک معتبر در نزدیکی شما.', iconName: 'ChildIcon', exampleServices: ['پرستار کودک در منزل', 'مهدکودک‌های مورد تایید'] }, { id: 'cs2', name: 'خدمات مراقبت از سالمند', description: 'دسترسی به پرستاران متخصص سالمند و خدمات کمکی در منزل.', iconName: 'ShieldCheckIcon', exampleServices: ['مراقبت ۲۴ ساعته در منزل', 'فیزیوتراپی در منزل'] }, ]);
  const [aiIntegrationSuggestions, setAiIntegrationSuggestions] = useState<AISuggestionFamily[]>([]);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ orchestration: true, childDevelopment: false, elderlyCare: false, timeCapsule: false, familyTree: false, memoryReminders: false, integrations: false, mainTools: true });
  
  // For calendar
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());
  const [calendarViewMode, setCalendarViewMode] = useState<'month' | 'week' | 'day'>('month');

  // --- AI Orchestration State (Phase 3.1) ---
  const [aiFamilyOrchestrationSuggestions, setAiFamilyOrchestrationSuggestions] = useState<AISuggestionFamily[]>([]);
  const [isLoadingOrchestration, setIsLoadingOrchestration] = useState(false);
  const [orchestrationError, setOrchestrationError] = useState<string | null>(null);
  
  // --- AI Quality Time Planning State (Phase 3.1) ---
  const [aiQualityTimeSuggestions, setAiQualityTimeSuggestions] = useState<QualityTimeActivity[]>([]);
  const [isLoadingQualityTimeSuggestions, setIsLoadingQualityTimeSuggestions] = useState(false);
  const [qualityTimeError, setQualityTimeError] = useState<string | null>(null);


  // --- CRUD Handlers ---
  // Placeholder save/load functions for local storage
  const saveToLocalStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };
  const loadFromLocalStorage = <T,>(key: string, defaultValue: T): T => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  };

  // Family Members
  const LS_FAMILY_MEMBERS = 'family_members_data';
  const handleSaveFamilyMember = (memberData: Omit<FamilyMember, 'id'> | FamilyMember) => {
    if ('id' in memberData) { // Editing
      setFamilyMembersData(prev => {
        const updated = prev.map(m => m.id === memberData.id ? memberData : m);
        saveToLocalStorage(LS_FAMILY_MEMBERS, updated);
        return updated;
      });
      showToast(toPersianDigits("عضو خانواده با موفقیت ویرایش شد."), "success");
    } else { // Adding new
      const newMember: FamilyMember = { ...memberData, id: `fm-${Date.now()}` };
      setFamilyMembersData(prev => {
        const updated = [newMember, ...prev];
        saveToLocalStorage(LS_FAMILY_MEMBERS, updated);
        return updated;
      });
      showToast(toPersianDigits("عضو جدید به خانواده اضافه شد."), "success");
    }
    setIsAddMemberModalOpen(false);
    setEditingMember(null);
  };
  const handleDeleteFamilyMember = (memberId: string) => {
    if (window.confirm(toPersianDigits("آیا از حذف این عضو خانواده مطمئن هستید؟"))) {
      setFamilyMembersData(prev => {
        const updated = prev.filter(m => m.id !== memberId);
        saveToLocalStorage(LS_FAMILY_MEMBERS, updated);
        return updated;
      });
      showToast(toPersianDigits("عضو خانواده حذف شد."), "info");
    }
  };

  // Calendar Events
  const LS_CALENDAR_EVENTS = 'family_calendar_events';
  const handleSaveCalendarEvent = (eventData: Omit<CalendarEvent, 'id' | 'color'> | CalendarEvent) => {
     const eventTypeColorMapping: Record<EventType, string> = {
      'پزشکی': 'event-medical', 'مدرسه': 'event-school', 'تولد': 'event-birthday', 
      'دورهمی': 'event-gathering', 'واکسیناسیون': 'event-واکسیناسیون', 'سایر': 'event-other'
    };
    const color = eventTypeColorMapping[eventData.eventType] || 'event-other';

    if ('id' in eventData) { // Editing
      setCalendarEventsData(prev => {
        const updated = prev.map(e => e.id === eventData.id ? {...eventData, color } : e);
        saveToLocalStorage(LS_CALENDAR_EVENTS, updated);
        return updated;
      });
      showToast(toPersianDigits("رویداد با موفقیت ویرایش شد."), "success");
    } else { // Adding new
      const newEvent: CalendarEvent = { ...eventData, id: `ce-${Date.now()}`, color };
      setCalendarEventsData(prev => {
        const updated = [newEvent, ...prev];
        saveToLocalStorage(LS_CALENDAR_EVENTS, updated);
        return updated;
      });
      showToast(toPersianDigits("رویداد جدید به تقویم اضافه شد."), "success");
    }
    setIsAddEventModalOpen(false);
    setEditingEvent(null);
  };
  const handleDeleteCalendarEvent = (eventId: string) => {
     if (window.confirm(toPersianDigits("آیا از حذف این رویداد مطمئن هستید؟"))) {
        setCalendarEventsData(prev => {
            const updated = prev.filter(e => e.id !== eventId);
            saveToLocalStorage(LS_CALENDAR_EVENTS, updated);
            return updated;
        });
        showToast(toPersianDigits("رویداد حذف شد."), "info");
     }
  };
  const handleEventClick = (event: CalendarEvent) => {
    setEditingEvent(event);
    setIsAddEventModalOpen(true);
  };


  // Shared Lists
  const LS_SHARED_LISTS = 'family_shared_lists';
  const handleSaveSharedList = (listName: string) => { // For adding new list
    const newList: SharedList = { id: `sl-${Date.now()}`, name: listName, items: [] };
    setSharedListsData(prev => {
      const updated = [newList, ...prev];
      saveToLocalStorage(LS_SHARED_LISTS, updated);
      return updated;
    });
    showToast(toPersianDigits(`لیست "${listName}" ایجاد شد.`), "success");
    setIsAddListModalOpen(false);
  };
  const handleDeleteSharedList = (listId: string) => {
    if (window.confirm(toPersianDigits("آیا از حذف این لیست مطمئن هستید؟ تمام آیتم‌های آن نیز حذف خواهند شد."))) {
      setSharedListsData(prev => {
        const updated = prev.filter(l => l.id !== listId);
        saveToLocalStorage(LS_SHARED_LISTS, updated);
        return updated;
      });
      showToast(toPersianDigits("لیست حذف شد."), "info");
    }
  };
  const handleAddItemToSharedList = (listId: string, itemText: string) => {
    const newItem: SharedListItem = { id: `sli-${Date.now()}`, text: itemText, completed: false };
    setSharedListsData(prev => {
      const updated = prev.map(list => list.id === listId ? { ...list, items: [...list.items, newItem] } : list);
      saveToLocalStorage(LS_SHARED_LISTS, updated);
      return updated;
    });
  };
  const handleToggleSharedListItem = (listId: string, itemId: string) => {
    setSharedListsData(prev => {
      const updated = prev.map(list => 
        list.id === listId ? { ...list, items: list.items.map(item => item.id === itemId ? { ...item, completed: !item.completed } : item) } : list
      );
      saveToLocalStorage(LS_SHARED_LISTS, updated);
      return updated;
    });
  };
  const handleDeleteSharedListItem = (listId: string, itemId: string) => {
    setSharedListsData(prev => {
      const updated = prev.map(list => 
        list.id === listId ? { ...list, items: list.items.filter(item => item.id !== itemId) } : list
      );
      saveToLocalStorage(LS_SHARED_LISTS, updated);
      return updated;
    });
  };


  // Development Milestones
  const LS_MILESTONES = 'family_milestones';
  const handleSaveMilestone = (milestoneData: Omit<DevelopmentMilestone, 'id'> | DevelopmentMilestone) => {
    if ('id' in milestoneData) { // Editing
        setDevelopmentMilestonesData(prev => {
            const updated = prev.map(m => m.id === milestoneData.id ? milestoneData : m);
            saveToLocalStorage(LS_MILESTONES, updated);
            return updated;
        });
        showToast(toPersianDigits("نقطه عطف با موفقیت ویرایش شد."), "success");
    } else { // Adding new
        const newMilestone: DevelopmentMilestone = { ...milestoneData, id: `dm-${Date.now()}` };
        setDevelopmentMilestonesData(prev => {
            const updated = [newMilestone, ...prev];
            saveToLocalStorage(LS_MILESTONES, updated);
            return updated;
        });
        showToast(toPersianDigits("نقطه عطف جدید ثبت شد."), "success");
    }
    setIsAddMilestoneModalOpen(false);
    setEditingMilestone(null);
  };
  const handleDeleteMilestone = (milestoneId: string) => {
     if (window.confirm(toPersianDigits("آیا از حذف این نقطه عطف مطمئن هستید؟"))) {
        setDevelopmentMilestonesData(prev => {
            const updated = prev.filter(m => m.id !== milestoneId);
            saveToLocalStorage(LS_MILESTONES, updated);
            return updated;
        });
        showToast(toPersianDigits("نقطه عطف حذف شد."), "info");
     }
  };


  // Care Reminders
  const LS_CARE_REMINDERS = 'family_care_reminders';
  const handleSaveCareReminder = (reminderData: Omit<CareReminder, 'id' | 'completed'> | CareReminder) => {
     if ('id' in reminderData) { // Editing
        setCareRemindersData(prev => {
            const updated = prev.map(r => r.id === reminderData.id ? reminderData : r);
            saveToLocalStorage(LS_CARE_REMINDERS, updated);
            return updated;
        });
        showToast(toPersianDigits("یادآور مراقبت با موفقیت ویرایش شد."), "success");
    } else { // Adding new
        const newReminder: CareReminder = { ...reminderData, id: `cr-${Date.now()}`, completed: false };
        setCareRemindersData(prev => {
            const updated = [newReminder, ...prev];
            saveToLocalStorage(LS_CARE_REMINDERS, updated);
            return updated;
        });
        showToast(toPersianDigits("یادآور مراقبت جدید ثبت شد."), "success");
    }
    setIsAddCareReminderModalOpen(false);
    setEditingCareReminder(null);
  };
  const handleDeleteCareReminder = (reminderId: string) => {
    if (window.confirm(toPersianDigits("آیا از حذف این یادآور مراقبت مطمئن هستید؟"))) {
        setCareRemindersData(prev => {
            const updated = prev.filter(r => r.id !== reminderId);
            saveToLocalStorage(LS_CARE_REMINDERS, updated);
            return updated;
        });
        showToast(toPersianDigits("یادآور مراقبت حذف شد."), "info");
    }
  };
  const handleToggleCareReminderCompletion = (reminderId: string) => {
    setCareRemindersData(prev => {
        const updated = prev.map(r => r.id === reminderId ? { ...r, completed: !r.completed } : r);
        saveToLocalStorage(LS_CARE_REMINDERS, updated);
        return updated;
    });
  };


  // User Recipes (Meal Planner)
  const LS_USER_RECIPES = 'family_user_recipes';
  const handleSaveUserRecipe = (recipeData: Omit<Recipe, 'id'| 'userSaved'>) => {
    if (editingRecipe) {
        setUserRecipes(prev => {
            const updated = prev.map(r => r.id === editingRecipe.id ? { ...editingRecipe, ...recipeData } : r);
            saveToLocalStorage(LS_USER_RECIPES, updated);
            return updated;
        });
        showToast(toPersianDigits("دستور پخت با موفقیت ویرایش شد."), "success");
    } else {
        const newRecipe: Recipe = { ...recipeData, id: `ur-${Date.now()}`, userSaved: true };
        setUserRecipes(prev => {
            const updated = [newRecipe, ...prev];
            saveToLocalStorage(LS_USER_RECIPES, updated);
            return updated;
        });
        showToast(toPersianDigits("دستور پخت جدید اضافه شد."), "success");
    }
    setIsAddRecipeModalOpen(false);
    setEditingRecipe(null);
  };
  const handleDeleteUserRecipe = (recipeId: string) => {
     if (window.confirm(toPersianDigits("آیا از حذف این دستور پخت مطمئن هستید؟"))) {
        setUserRecipes(prev => {
            const updated = prev.filter(r => r.id !== recipeId);
            saveToLocalStorage(LS_USER_RECIPES, updated);
            return updated;
        });
        setMealPlanEntries(prevEntries => { // Also remove from meal plan
            const updatedEntries = prevEntries.map(entry => entry.recipeId === recipeId ? {...entry, recipeId: null, customMealText: toPersianDigits("حذف شده")} : entry);
            saveToLocalStorage(LS_MEAL_PLAN, updatedEntries);
            return updatedEntries;
        });
        showToast(toPersianDigits("دستور پخت حذف شد."), "info");
     }
  };

  // Meal Plan Entries
  const LS_MEAL_PLAN = 'family_meal_plan';
  const handleAssignRecipeToSlot = (date: string, slot: MealPlanSlot, recipeId: string | null) => {
    setMealPlanEntries(prevEntries => {
      const existingEntryIndex = prevEntries.findIndex(e => e.date === date && e.slot === slot);
      let updatedEntries;
      if (recipeId === null) { // Clearing the slot
        if (existingEntryIndex > -1) {
          updatedEntries = prevEntries.filter((_, index) => index !== existingEntryIndex);
        } else {
          updatedEntries = [...prevEntries]; // No change needed
        }
      } else if (existingEntryIndex > -1) {
        updatedEntries = prevEntries.map((e, index) => index === existingEntryIndex ? { ...e, recipeId, customMealText: undefined } : e);
      } else {
        updatedEntries = [...prevEntries, { date, slot, recipeId, customMealText: undefined }];
      }
      saveToLocalStorage(LS_MEAL_PLAN, updatedEntries);
      return updatedEntries;
    });
    setIsAssignRecipeModalOpen(false);
  };


  // Photo Albums
  const LS_PHOTO_ALBUMS = 'family_photo_albums';
  const handleSavePhotoAlbum = (albumData: Pick<PhotoAlbum, 'name' | 'description'>, albumId?: string) => {
    if (albumId) { // Editing
        setPhotoAlbumsData(prev => {
            const updated = prev.map(a => a.id === albumId ? { ...a, ...albumData } : a);
            saveToLocalStorage(LS_PHOTO_ALBUMS, updated);
            return updated;
        });
        showToast(toPersianDigits("آلبوم با موفقیت ویرایش شد."), "success");
    } else { // Adding new
        const newAlbum: PhotoAlbum = { ...albumData, id: `pa-${Date.now()}`, createdById: currentUserId, photoUrls: [] };
        setPhotoAlbumsData(prev => {
            const updated = [newAlbum, ...prev];
            saveToLocalStorage(LS_PHOTO_ALBUMS, updated);
            return updated;
        });
        showToast(toPersianDigits("آلبوم جدید ایجاد شد."), "success");
    }
    setIsAddAlbumModalOpen(false);
    setEditingAlbum(null);
  };
  const handleUploadPhotoToAlbum = (albumId: string, photoDataUrl: string, photoName: string) => {
    setPhotoAlbumsData(prev => {
        const updated = prev.map(album => 
            album.id === albumId ? { ...album, photoUrls: [...album.photoUrls, photoDataUrl] } : album
        );
        saveToLocalStorage(LS_PHOTO_ALBUMS, updated);
        return updated;
    });
    showToast(toPersianDigits(`عکس "${photoName}" به آلبوم اضافه شد.`), 'success');
  };
  const handleDeletePhotoAlbum = (albumId: string) => {
    if (window.confirm(toPersianDigits("آیا از حذف این آلبوم و تمام عکس‌های آن مطمئن هستید؟"))) {
        setPhotoAlbumsData(prev => {
            const updated = prev.filter(a => a.id !== albumId);
            saveToLocalStorage(LS_PHOTO_ALBUMS, updated);
            return updated;
        });
        showToast(toPersianDigits("آلبوم حذف شد."), "info");
        if(viewingAlbumId === albumId) setViewingAlbumId(null); // Go back to dashboard view if current album deleted
    }
  };

  // Bulletin Posts
  const LS_BULLETIN_POSTS = 'family_bulletin_posts';
  const handleSaveBulletinPost = (postData: Pick<BulletinPost, 'text' | 'color'>, postId?: string) => {
    if (postId) { // Editing
        setBulletinPostsData(prev => {
            const updated = prev.map(p => p.id === postId ? { ...p, ...postData, timestamp: new Date().toISOString() } : p);
            saveToLocalStorage(LS_BULLETIN_POSTS, updated);
            return updated;
        });
        showToast(toPersianDigits("یادداشت ویرایش شد."), "success");
    } else { // Adding new
        const newPost: BulletinPost = { ...postData, id: `bp-${Date.now()}`, authorId: currentUserId, timestamp: new Date().toISOString() };
        setBulletinPostsData(prev => {
            const updated = [newPost, ...prev];
            saveToLocalStorage(LS_BULLETIN_POSTS, updated);
            return updated;
        });
        showToast(toPersianDigits("یادداشت جدید به تابلو اضافه شد."), "success");
    }
    setIsAddPostModalOpen(false);
    setEditingPost(null);
  };
  const handleDeleteBulletinPost = (postId: string) => {
    setBulletinPostsData(prev => {
        const updated = prev.filter(p => p.id !== postId);
        saveToLocalStorage(LS_BULLETIN_POSTS, updated);
        return updated;
    });
    showToast(toPersianDigits("یادداشت از تابلو حذف شد."), "info");
  };

  // Sleep Logs
  const LS_SLEEP_LOGS = 'family_sleep_logs';
  const handleSaveSleepLog = (logData: Omit<SleepLog, 'id'>) => {
    if (editingSleepLog) {
        setSleepLogsData(prev => {
            const updated = prev.map(log => log.id === editingSleepLog.id ? { ...editingSleepLog, ...logData } : log);
            saveToLocalStorage(LS_SLEEP_LOGS, updated);
            return updated;
        });
        showToast(toPersianDigits("گزارش خواب ویرایش شد."), "success");
    } else {
        const newLog: SleepLog = { ...logData, id: `sl-${Date.now()}` };
        setSleepLogsData(prev => {
            const updated = [newLog, ...prev];
            saveToLocalStorage(LS_SLEEP_LOGS, updated);
            return updated;
        });
        showToast(toPersianDigits("گزارش خواب جدید ثبت شد."), "success");
    }
    setIsAddSleepLogModalOpen(false);
    setEditingSleepLog(null);
  };
  const handleDeleteSleepLog = (logId: string) => {
    setSleepLogsData(prev => {
        const updated = prev.filter(log => log.id !== logId);
        saveToLocalStorage(LS_SLEEP_LOGS, updated);
        return updated;
    });
    showToast(toPersianDigits("گزارش خواب حذف شد."), "info");
  };


  // Nutrition Logs
  const LS_NUTRITION_LOGS = 'family_nutrition_logs';
  const handleSaveNutritionLog = (logData: Omit<NutritionLog, 'id'>) => {
     if (editingNutritionLog) {
        setNutritionLogsData(prev => {
            const updated = prev.map(log => log.id === editingNutritionLog.id ? { ...editingNutritionLog, ...logData } : log);
            saveToLocalStorage(LS_NUTRITION_LOGS, updated);
            return updated;
        });
        showToast(toPersianDigits("گزارش تغذیه ویرایش شد."), "success");
    } else {
        const newLog: NutritionLog = { ...logData, id: `nl-${Date.now()}` };
        setNutritionLogsData(prev => {
            const updated = [newLog, ...prev];
            saveToLocalStorage(LS_NUTRITION_LOGS, updated);
            return updated;
        });
        showToast(toPersianDigits("گزارش تغذیه جدید ثبت شد."), "success");
    }
    setIsAddNutritionLogModalOpen(false);
    setEditingNutritionLog(null);
  };
  const handleDeleteNutritionLog = (logId: string) => {
    setNutritionLogsData(prev => {
        const updated = prev.filter(log => log.id !== logId);
        saveToLocalStorage(LS_NUTRITION_LOGS, updated);
        return updated;
    });
    showToast(toPersianDigits("گزارش تغذیه حذف شد."), "info");
  };

  // Elderly Health Data
  const LS_ELDERLY_HEALTH_DATA = 'family_elderly_health_data';
  // CRUD for ElderlyHealthDataPoint can be added here if needed

  // --- Other handlers (from original component) ---
  const toggleSection = (sectionName: string) => { setOpenSections(prev => ({ ...prev, [sectionName]: !prev[sectionName] })); };
  const handleShowXAIInternal = (title: string, explanation: string) => { if(onShowXai) { onShowXai(title, explanation); } else { setXaiModalContent({ title, explanation }); setIsXaiModalOpen(true); } };
  const handleAcceptFamilySuggestion = (id: string) => { showToast(toPersianDigits(`پیشنهاد پذیرفته شد (شبیه‌سازی).`), 'success'); setAiFamilyOrchestrationSuggestions(prev => prev.filter(s => s.id !== id)); setAiIntegrationSuggestions(prev => prev.filter(s => s.id !== id));  };
  const handleDeclineFamilySuggestion = (id: string) => { showToast(toPersianDigits("پیشنهاد رد شد."), 'info'); setAiFamilyOrchestrationSuggestions(prev => prev.filter(s => s.id !== id)); setAiIntegrationSuggestions(prev => prev.filter(s => s.id !== id)); };
  
  const handleAddToCalendar = (activityId: string) => {
    const activity = aiQualityTimeSuggestions.find(a => a.id === activityId); // Use aiQualityTimeSuggestions
    if (activity) {
        // Placeholder: Create a new calendar event from this activity
        const newEvent: Omit<CalendarEvent, 'id' | 'color'> = {
            title: activity.title,
            start: new Date().toISOString(), // Placeholder, should use activity.suggestedTime
            description: activity.description,
            eventType: 'دورهمی', // Example type
            allDay: false, // Example
        };
        handleSaveCalendarEvent(newEvent); // This function adds to calendarEventsData and localStorage
        showToast(toPersianDigits(`فعالیت "${activity.title}" به تقویم خانواده اضافه شد.`), 'success');
    }
  };

   // --- AI Features Logic (Phase 3.1 & 3.2) ---
   const calculateWellbeingScore = useCallback(() => {
    const qualityTimeEvents = calendarEventsData.filter(e => e.eventType === 'دورهمی' && new Date(e.start) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length;
    const qualityTimeScore = Math.min(100, qualityTimeEvents * 20 + 40); 

    const completedReminders = careRemindersData.filter(r => r.completed).length;
    const totalReminders = careRemindersData.length;
    const carePlanAdherenceScore = totalReminders > 0 ? Math.round((completedReminders / totalReminders) * 100) : 70; 

    const mockedChoreDistributionScore = 70; 
    const mockedCommunicationSentimentScore = 90; 

    const newScore = Math.round((qualityTimeScore + carePlanAdherenceScore + mockedChoreDistributionScore + mockedCommunicationSentimentScore) / 4);
    setFamilyWellbeingScore(newScore);

    setWellbeingFactors([
        { id: 'wf1_dyn', name: toPersianDigits("زمان با کیفیت مشترک"), score: qualityTimeScore, impact: qualityTimeScore >= 70 ? 'positive' : 'neutral', description: toPersianDigits(`تعداد فعالیت‌های مشترک ثبت شده در هفته گذشته: ${qualityTimeEvents} مورد.`) },
        { id: 'wf2_dyn', name: toPersianDigits("توزیع وظایف خانه"), score: mockedChoreDistributionScore, impact: 'neutral', description: toPersianDigits("بر اساس گزارش‌های هفتگی وظایف (شبیه‌سازی شده).") },
        { id: 'wf3_dyn', name: toPersianDigits("پایبندی به برنامه مراقبت"), score: carePlanAdherenceScore, impact: carePlanAdherenceScore >= 80 ? 'positive' : (carePlanAdherenceScore < 50 ? 'negative' : 'neutral'), description: toPersianDigits(`تکمیل ${completedReminders} از ${totalReminders} یادآور مراقبتی.`) },
        { id: 'wf4_dyn', name: toPersianDigits("احساسات ارتباطی"), score: mockedCommunicationSentimentScore, impact: 'positive', description: toPersianDigits("تحلیل احساسات پیام‌های خانوادگی (شبیه‌سازی شده).") },
    ]);
  }, [calendarEventsData, careRemindersData]);

  const fetchFamilyOrchestrationSuggestions = useCallback(async () => {
    if (!geminiAI) { setOrchestrationError(toPersianDigits("سرویس AI در دسترس نیست.")); return; }
    setIsLoadingOrchestration(true); setOrchestrationError(null);
    try {
      const prompt = toPersianDigits(`یک خانواده با ${familyMembersData.length} عضو و امتیاز تندرستی ${familyWellbeingScore}% وجود دارد. چند رویداد مهم آتی (شبیه‌سازی شده): "امتحان فرزند اول هفته آینده"، "سالگرد ازدواج". یک یا دو پیشنهاد برای بهبود تعادل و هماهنگی خانواده به زبان فارسی ارائه بده. هر پیشنهاد باید شامل "title"، "text" (متن پیشنهاد)، "xaiRationale" و "type" (مثلاً "coordination", "balance_work_life") باشد. پاسخ باید یک آرایه JSON باشد.`);
      const response: GenerateContentResponse = await geminiAI.models.generateContent({ model: AI_MODEL_NAME_FAMILY, contents: prompt, config: { responseMimeType: "application/json" }});
      const parsedData = parseJsonFromString<AISuggestionFamily[]>(response.text);
      if (parsedData) { setAiFamilyOrchestrationSuggestions(parsedData.map(s => ({...s, id: `ai-orch-${Date.now()}-${Math.random()}`}))); } 
      else { throw new Error("پاسخ نامعتبر از AI");}
    } catch (e: any) { setOrchestrationError(toPersianDigits("خطا در دریافت پیشنهادات ارکستراسیون.")); console.error(e); } 
    finally { setIsLoadingOrchestration(false); }
  }, [geminiAI, familyMembersData.length, familyWellbeingScore]);


  const fetchAIQualityTimeSuggestions = useCallback(async () => {
    if (!geminiAI) { setQualityTimeError(toPersianDigits("سرویس AI در دسترس نیست.")); return; }
    setIsLoadingQualityTimeSuggestions(true); setQualityTimeError(null);
    try {
        const simulatedFreeTimes = [toPersianDigits("شنبه بعد از ظهر"), toPersianDigits("چهارشنبه عصر")];
        const simulatedFamilyInterests = familyMembersData.flatMap(m => m.foodPreferences?.split(',').map(p => p.trim()) || []).filter(Boolean);
        const uniqueInterests = Array.from(new Set(simulatedFamilyInterests)).join("، ") || toPersianDigits("فعالیت عمومی");
        
        const prompt = toPersianDigits(
            `شما یک برنامه‌ریز فعالیت‌های خانوادگی هستید. برای یک خانواده با علایق '${uniqueInterests}'، فعالیت‌های مناسب برای زمان‌های آزاد مشترک زیر پیشنهاد دهید: '${simulatedFreeTimes.join("', '")}'. لطفاً ۱ تا ۲ پیشنهاد در قالب یک آرایه JSON به زبان فارسی ارائه دهید. هر آیتم باید شامل کلیدهای "title" (عنوان فعالیت)، "description" (توضیح کوتاه)، "suggestedTime" (یکی از زمان‌های آزاد ارائه شده) و "xaiRationale" (دلیل کوتاه برای پیشنهاد این فعالیت) باشد.`
        );

        const response: GenerateContentResponse = await geminiAI.models.generateContent({
            model: AI_MODEL_NAME_FAMILY,
            contents: prompt,
            config: { responseMimeType: "application/json" }
        });

        const parsedData = parseJsonFromString<Omit<QualityTimeActivity, 'id'>[]>(response.text);

        if (parsedData && Array.isArray(parsedData)) {
            const suggestionsWithIds: QualityTimeActivity[] = parsedData.map((item, index) => ({
                ...item,
                id: `qt-${Date.now()}-${index}`
            }));
            setAiQualityTimeSuggestions(suggestionsWithIds);
        } else {
            setAiQualityTimeSuggestions([{id: 'qt-fallback', title: 'گردش در پارک محلی', description: 'هوای خوب است، یک پیاده‌روی کوتاه چطور است؟', suggestedTime: 'جمعه عصر', xaiRationale: 'فعالیت ساده و در دسترس برای همه.'}]);
        }
    } catch (e: any) {
        console.error("AI Quality Time Suggestion Error:", e);
        setQualityTimeError(toPersianDigits("خطا در دریافت پیشنهادات زمان با کیفیت."));
        setAiQualityTimeSuggestions([{id: 'qt-fallback', title: 'گردش در پارک محلی', description: 'هوای خوب است، یک پیاده‌روی کوتاه چطور است؟', suggestedTime: 'جمعه عصر', xaiRationale: 'فعالیت ساده و در دسترس برای همه.'}]);
    } finally {
        setIsLoadingQualityTimeSuggestions(false);
    }
  }, [geminiAI, familyMembersData]);


  // --- Phase 3.2 AI Fetch Functions ---
  const fetchDynamicParentingTips = useCallback(async () => {
    const child = familyMembersData.find(m => m.role === 'فرزند'); // Simplified: uses first child
    if (!geminiAI || !child) { 
        setParentingTipsError(toPersianDigits("کودکی برای دریافت پیشنهاد ثبت نشده یا سرویس AI در دسترس نیست."));
        return; 
    }
    setIsLoadingParentingTips(true); setParentingTipsError(null);
    try {
        const childAge = child.dob ? new Date().getFullYear() - new Date(child.dob).getFullYear() : 3; // Default age if no DOB
        const childMilestones = developmentMilestonesData.filter(m => m.childMemberId === child.id).map(m => m.type).join(', ') || 'هیچ نقطه عطف اخیری';
        const prompt = toPersianDigits(`برای والدین یک کودک ${childAge} ساله که اخیراً نقاط عطف "${childMilestones}" را داشته، ۱ تا ۲ نکته تربیتی کوتاه، عملی و مرتبط با سن به زبان فارسی ارائه بده. هر نکته باید شامل "title" (عنوان نکته)، "category" (مثلاً "خواب", "تغذیه", "بازی", "رفتار"), "tipText" (متن نکته) و "xaiRationale" (دلیل اهمیت نکته) باشد. پاسخ باید یک آرایه JSON باشد.`);
        const response: GenerateContentResponse = await geminiAI.models.generateContent({ model: AI_MODEL_NAME_FAMILY, contents: prompt, config: { responseMimeType: "application/json" }});
        const parsedData = parseJsonFromString<Omit<ParentingTip, 'id' | 'isAISuggestion'>[]>(response.text);
        if (parsedData) { 
            setDynamicParentingTips(parsedData.map((tip, idx) => ({...tip, id: `ai-tip-${Date.now()}-${idx}`, isAISuggestion: true}))); 
        } else { throw new Error("پاسخ نامعتبر برای نکات تربیتی.");}
    } catch (e: any) { setParentingTipsError(toPersianDigits("خطا در دریافت نکات تربیتی.")); console.error(e); } 
    finally { setIsLoadingParentingTips(false); }
  }, [geminiAI, familyMembersData, developmentMilestonesData]);

  const fetchChildHealthAlerts = useCallback(async () => {
    const child = familyMembersData.find(m => m.role === 'فرزند');
    if (!geminiAI || !child) { 
        setChildHealthAlertsError(toPersianDigits("کودکی برای دریافت هشدار ثبت نشده یا سرویس AI در دسترس نیست."));
        return; 
    }
    setIsLoadingChildHealthAlerts(true); setChildHealthAlertsError(null);
    try {
        const recentSleep = sleepLogsData.filter(s => s.childMemberId === child.id).slice(0,3).map(s => `خواب: ${s.startTime}-${s.endTime}, کیفیت: ${s.quality || 'نامشخص'}`).join('؛ ');
        const recentNutrition = nutritionLogsData.filter(n => n.childMemberId === child.id).slice(0,3).map(n => `وعده ${n.mealType}: ${n.foodItems}`).join('؛ ');
        const prompt = toPersianDigits(`با توجه به داده‌های سلامت اخیر یک کودک (خواب: "${recentSleep || 'داده‌ای نیست'}"؛ تغذیه: "${recentNutrition || 'داده‌ای نیست'}"), ۱ تا ۲ هشدار یا نکته بهداشتی مهم (در صورت وجود) به زبان فارسی ارائه بده. هر مورد باید شامل "alertText", "recommendation", "severity" ('info', 'warning', 'critical') و "xaiRationale" باشد. پاسخ باید یک آرایه JSON باشد.`);
        const response: GenerateContentResponse = await geminiAI.models.generateContent({ model: AI_MODEL_NAME_FAMILY, contents: prompt, config: { responseMimeType: "application/json" }});
        const parsedData = parseJsonFromString<Omit<ChildHealthAlert, 'id' | 'childMemberId' | 'childName' | 'timestamp'>[]>(response.text);
        if (parsedData) { 
            setChildHealthAlerts(parsedData.map((alert, idx) => ({...alert, id: `ai-alert-${Date.now()}-${idx}`, childMemberId: child.id, childName: child.name, timestamp: new Date().toISOString()}))); 
        } else { setChildHealthAlerts([]); /* No alerts or error */ }
    } catch (e: any) { setChildHealthAlertsError(toPersianDigits("خطا در دریافت هشدارهای سلامت کودک.")); console.error(e); } 
    finally { setIsLoadingChildHealthAlerts(false); }
  }, [geminiAI, familyMembersData, sleepLogsData, nutritionLogsData]);

  const fetchDynamicElderlyCareAlerts = useCallback(async () => {
    const elder = familyMembersData.find(m => m.role === 'سالمند تحت مراقبت');
    if (!geminiAI || !elder) { 
        setElderlyAISuggestionError(toPersianDigits("سالمندی برای دریافت پیشنهاد ثبت نشده یا سرویس AI در دسترس نیست."));
        return; 
    }
    setIsLoadingElderlyAISuggestions(true); setElderlyAISuggestionError(null);
    try {
        const recentHealthData = elderlyHealthData.filter(d => d.elderMemberId === elder.id).slice(-5).map(d => `${d.type}: ${d.value} ${d.unit || ''} (${new Date(d.timestamp).toLocaleTimeString('fa-IR')})`).join('؛ ') || 'داده‌ای نیست';
        const prompt = toPersianDigits(`داده‌های سلامت اخیر یک سالمند: "${recentHealthData}". آیا ناهنجاری یا پیشنهاد مراقبتی فوری وجود دارد؟ ۱ تا ۲ مورد به زبان فارسی شامل "suggestionText" (متن پیشنهاد/هشدار), "rationale", "type" (نوع پیشنهاد/هشدار کلی از AISuggestionType), "alertType" (نوع دقیقتر از ElderlyAISuggestionType) و "severity" ('info', 'warning', 'critical') ارائه بده. پاسخ باید آرایه JSON باشد.`);
        const response: GenerateContentResponse = await geminiAI.models.generateContent({ model: AI_MODEL_NAME_FAMILY, contents: prompt, config: { responseMimeType: "application/json" }});
        const parsedData = parseJsonFromString<Omit<ElderlyAISuggestion, 'id' | 'elderMemberId'>[]>(response.text);
        if (parsedData) { 
            setDynamicElderlyCareSuggestions(parsedData.map((sugg, idx) => ({...sugg, id: `ai-elder-${Date.now()}-${idx}`, elderMemberId: elder.id }))); 
        } else { setDynamicElderlyCareSuggestions([]); }
    } catch (e: any) { setElderlyAISuggestionError(toPersianDigits("خطا در دریافت پیشنهادات مراقبت از سالمند.")); console.error(e); } 
    finally { setIsLoadingElderlyAISuggestions(false); }
  }, [geminiAI, familyMembersData, elderlyHealthData]);

  const simulateNewElderlySensorData = () => {
    const elder = familyMembersData.find(m => m.role === 'سالمند تحت مراقبت');
    if (!elder) { showToast(toPersianDigits("ابتدا یک سالمند در لیست اعضا اضافه کنید."), "info"); return; }
    
    const randomDataType: ElderlyHealthDataType[] = ['heart_rate', 'activity_level', 'sleep_pattern', 'blood_pressure'];
    const type = randomDataType[Math.floor(Math.random() * randomDataType.length)];
    let value: string | number = '';
    let unit: string | undefined = '';
    let notes: string | undefined = '';

    switch(type) {
        case 'heart_rate': value = Math.floor(Math.random() * 40) + 60; unit = 'bpm'; break; // 60-99
        case 'activity_level': value = Math.floor(Math.random() * 5000) + 500; unit = 'قدم'; break;
        case 'sleep_pattern': value = `${Math.floor(Math.random() * 5) + 4} ساعت، ${Math.floor(Math.random() * 3)} بار بیداری`; notes = 'خواب سبک بود'; break;
        case 'blood_pressure': value = `${Math.floor(Math.random() * 40) + 100}/${Math.floor(Math.random() * 30) + 60}`; unit = 'mmHg'; break;
        default: value = 'N/A';
    }

    const newDataPoint: ElderlyHealthDataPoint = {
        id: `ehd-sim-${Date.now()}`,
        elderMemberId: elder.id,
        timestamp: new Date().toISOString(),
        type: type,
        value: value,
        unit: unit,
        notes: notes
    };
    setElderlyHealthData(prev => {
        const updated = [newDataPoint, ...prev.slice(0, 19)];
        saveToLocalStorage(LS_ELDERLY_HEALTH_DATA, updated); // Save to LS
        return updated;
    }); 
    showToast(toPersianDigits(`داده جدید سنسور (${type}) برای ${elder.name} شبیه‌سازی شد.`), "info");
    fetchDynamicElderlyCareAlerts(); // Re-analyze with new data
  };


  useEffect(() => {
    setFamilyMembersData(loadFromLocalStorage(LS_FAMILY_MEMBERS, []));
    setCalendarEventsData(loadFromLocalStorage(LS_CALENDAR_EVENTS, []));
    setSharedListsData(loadFromLocalStorage(LS_SHARED_LISTS, []));
    setDevelopmentMilestonesData(loadFromLocalStorage(LS_MILESTONES, []));
    setCareRemindersData(loadFromLocalStorage(LS_CARE_REMINDERS, []));
    setUserRecipes(loadFromLocalStorage(LS_USER_RECIPES, []));
    setMealPlanEntries(loadFromLocalStorage(LS_MEAL_PLAN, []));
    setPhotoAlbumsData(loadFromLocalStorage(LS_PHOTO_ALBUMS, []));
    setBulletinPostsData(loadFromLocalStorage(LS_BULLETIN_POSTS, []));
    setSleepLogsData(loadFromLocalStorage(LS_SLEEP_LOGS, []));
    setNutritionLogsData(loadFromLocalStorage(LS_NUTRITION_LOGS, []));
    setElderlyHealthData(loadFromLocalStorage(LS_ELDERLY_HEALTH_DATA, [ // Load or use default mock if not present
        {id:'ehd1_default', elderMemberId:'elder1', timestamp: new Date(Date.now() - 86400000 * 2).toISOString(), type:'heart_rate', value:75, unit:'bpm'},
        {id:'ehd2_default', elderMemberId:'elder1', timestamp: new Date(Date.now() - 86400000).toISOString(), type:'activity_level', value: 2500, unit: 'قدم'},
        {id:'ehd3_default', elderMemberId:'elder1', timestamp: new Date().toISOString(), type:'sleep_pattern', value: '۷ ساعت، ۲ بار بیداری', notes: 'خواب نسبتا خوب بود.'}
    ]));


    const mockIntegrationSuggestions: AISuggestionFamily[] = [ { id: 'aisf-edu1', title: 'محتوای آموزشی مرتبط', text: 'با توجه به اینکه فرزند شما ۲ ساله است، مطالعه مقالاتی در مورد "رشد کودک نوپا" از پلتفرم‌های آموزشی می‌تواند مفید باشد.', xaiRationale: 'هوش مصنوعی سن فرزند شما را از پروفایل خانواده تشخیص داده و محتوای مرتبط پیشنهاد می‌کند.', type: 'coordination' },  ];
    setAiIntegrationSuggestions(mockIntegrationSuggestions);
    
    calculateWellbeingScore(); 
    fetchFamilyOrchestrationSuggestions();
    fetchAIQualityTimeSuggestions();
    fetchDynamicParentingTips();
    fetchChildHealthAlerts();
    fetchDynamicElderlyCareAlerts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  useEffect(() => { 
    calculateWellbeingScore();
  }, [calendarEventsData, careRemindersData, calculateWellbeingScore]);


  const viewingAlbum = photoAlbumsData.find(album => album.id === viewingAlbumId);

  return (
    <div className={`page ${activeTheme.backgroundClass} pb-8`}>
      {isXaiModalOpen && <XAIModal isOpen={isXaiModalOpen} onClose={() => setIsXaiModalOpen(false)} title={xaiModalContent.title}><p>{xaiModalContent.explanation}</p></XAIModal>}
      {isWellbeingReportModalOpen && ( <WellbeingReportModal isOpen={isWellbeingReportModalOpen} onClose={() => setIsWellbeingReportModalOpen(false)} score={familyWellbeingScore} factors={wellbeingFactors} primaryAccentClass={activeTheme.primaryAccentClass} /> )}
      <AddFamilyMemberModal isOpen={isAddMemberModalOpen} onClose={() => { setIsAddMemberModalOpen(false); setEditingMember(null); }} onSave={handleSaveFamilyMember} initialData={editingMember} />
      <AddEventModal isOpen={isAddEventModalOpen} onClose={() => { setIsAddEventModalOpen(false); setEditingEvent(null); }} onSave={handleSaveCalendarEvent} initialData={editingEvent} familyMembers={familyMembersData} />
      <AddSharedListModal isOpen={isAddListModalOpen} onClose={() => setIsAddListModalOpen(false)} onAddList={handleSaveSharedList} />
      <AddMilestoneModal isOpen={isAddMilestoneModalOpen} onClose={() => { setIsAddMilestoneModalOpen(false); setEditingMilestone(null); }} onSave={handleSaveMilestone} initialData={editingMilestone} familyMembers={familyMembersData}/>
      <AddCareReminderModal isOpen={isAddCareReminderModalOpen} onClose={() => { setIsAddCareReminderModalOpen(false); setEditingCareReminder(null); }} onSave={handleSaveCareReminder} initialData={editingCareReminder} familyMembers={familyMembersData} />
      <AddUserRecipeModal isOpen={isAddRecipeModalOpen} onClose={() => { setIsAddRecipeModalOpen(false); setEditingRecipe(null); }} onSave={handleSaveUserRecipe} initialData={editingRecipe} />
      {assignRecipeTarget && (<AssignRecipeToSlotModal isOpen={isAssignRecipeModalOpen} onClose={() => setIsAssignRecipeModalOpen(false)} recipes={userRecipes} onAssignRecipe={(recipeId) => handleAssignRecipeToSlot(assignRecipeTarget.date, assignRecipeTarget.slot, recipeId)} targetDate={assignRecipeTarget.date} targetSlot={assignRecipeTarget.slot} /> )}
      {viewingRecipe && <RecipeDetailModal isOpen={!!viewingRecipe} onClose={() => setViewingRecipe(null)} recipe={viewingRecipe} onAddIngredientsToShoppingList={() => showToast("افزودن به لیست خرید (نمایشی)", "info")} />}
      <AddAlbumModal isOpen={isAddAlbumModalOpen} onClose={() => { setIsAddAlbumModalOpen(false); setEditingAlbum(null);}} onSave={handleSavePhotoAlbum} initialData={editingAlbum} />
      <AddBulletinPostModal isOpen={isAddPostModalOpen} onClose={() => { setIsAddPostModalOpen(false); setEditingPost(null);}} onSave={handleSaveBulletinPost} initialData={editingPost} />
      <AddSleepLogModal isOpen={isAddSleepLogModalOpen} onClose={() => { setIsAddSleepLogModalOpen(false); setEditingSleepLog(null); }} onSave={handleSaveSleepLog} familyMembers={familyMembersData} initialData={editingSleepLog} />
      <AddNutritionLogModal isOpen={isAddNutritionLogModalOpen} onClose={() => { setIsAddNutritionLogModalOpen(false); setEditingNutritionLog(null); }} onSave={handleSaveNutritionLog} familyMembers={familyMembersData} initialData={editingNutritionLog} />
      

      <FamilyPageHeader 
        familyName={familyName} 
        familyAverageWellbeing={familyWellbeingScore} 
        onOpenSettings={() => showToast(toPersianDigits("باز کردن تنظیمات صفحه خانواده (شبیه‌سازی شده)"), "info")} 
        activeTheme={activeTheme} 
      />

      {/* Orchestration Section */}
      <CollapsibleSection title={toPersianDigits("ارکستراسیون و تندرستی خانواده")} icon={<OrchestrationIcon className={`w-5 h-5 ${activeTheme.primaryAccentClass}`} />} isOpen={openSections.orchestration} onToggle={() => toggleSection('orchestration')} className={`mb-5 bg-white p-4 rounded-xl shadow-sm border ${activeTheme.secondaryAccentClass}`} titleColorClass={`text-md font-semibold ${activeTheme.primaryAccentClass}`} >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FamilyWellbeingScoreCard score={familyWellbeingScore} onOpenReport={() => setIsWellbeingReportModalOpen(true)} primaryAccentClass={activeTheme.primaryAccentClass} secondaryAccentClass={activeTheme.secondaryAccentClass} />
            <div className={`p-3 rounded-lg border ${activeTheme.secondaryAccentClass} bg-white`}>
                <div className="flex justify-between items-center mb-2">
                    <h5 className={`text-sm font-semibold ${activeTheme.primaryAccentClass} flex items-center`}> <LightbulbIcon className={`w-4 h-4 mr-1.5 rtl:ml-1.5 rtl:mr-0 ${activeTheme.primaryAccentClass}`} /> {toPersianDigits("پیشنهادات هوشمند خانواده")} </h5>
                    <button onClick={fetchFamilyOrchestrationSuggestions} disabled={isLoadingOrchestration || !geminiAI} className={`p-1 rounded-full hover:bg-opacity-20 ${activeTheme.buttonHoverBgClass.replace('hover:bg-','')} disabled:opacity-50`} title={toPersianDigits("دریافت پیشنهاد جدید")}><ArrowPathIcon className="w-3.5 h-3.5"/></button>
                </div>
                {isLoadingOrchestration ? <LoadingSpinner size="sm" /> : orchestrationError ? <p className="text-xs text-red-500">{orchestrationError}</p> :
                aiFamilyOrchestrationSuggestions.length > 0 ? ( <div className="space-y-2"> {aiFamilyOrchestrationSuggestions.map(sugg => ( <FamilyAISuggestionCard key={sugg.id} suggestion={sugg} onAccept={() => handleAcceptFamilySuggestion(sugg.id)} onDecline={() => handleDeclineFamilySuggestion(sugg.id)} onShowRationale={(rationale) => handleShowXAIInternal(sugg.title || 'پیشنهاد هوشمند', rationale)} primaryAccentClass={activeTheme.primaryAccentClass} secondaryAccentClass={activeTheme.secondaryAccentClass} /> ))} </div> ) : ( <p className="text-xs text-gray-500 text-center">{toPersianDigits("در حال حاضر پیشنهاد جدیدی برای شما وجود ندارد.")}</p> )}
            </div>
        </div>
         <div className={`mt-4 p-3 rounded-lg border ${activeTheme.secondaryAccentClass} bg-white`}>
            <div className="flex justify-between items-center mb-2">
                <h5 className={`text-sm font-semibold ${activeTheme.primaryAccentClass} flex items-center`}> <QualityTimeIcon className={`w-4 h-4 mr-1.5 rtl:ml-1.5 rtl:mr-0 ${activeTheme.primaryAccentClass}`} /> {toPersianDigits("برنامه‌ریز زمان با کیفیت")} </h5>
                <button onClick={fetchAIQualityTimeSuggestions} disabled={isLoadingQualityTimeSuggestions || !geminiAI} className={`p-1 rounded-full hover:bg-opacity-20 ${activeTheme.buttonHoverBgClass.replace('hover:bg-','')} disabled:opacity-50`} title={toPersianDigits("دریافت پیشنهاد جدید")}><ArrowPathIcon className="w-3.5 h-3.5"/></button>
            </div>
            {isLoadingQualityTimeSuggestions ? <LoadingSpinner size="sm" /> : qualityTimeError ? <p className="text-xs text-red-500">{qualityTimeError}</p> :
            <QualityTimePlannerCard 
                suggestions={aiQualityTimeSuggestions} 
                onAddToCalendar={handleAddToCalendar} 
                primaryAccentClass={activeTheme.primaryAccentClass} 
                secondaryAccentClass={activeTheme.secondaryAccentClass} 
                onShowXai={(title, explanation) => handleShowXAIInternal(title, explanation)} 
                onRefreshSuggestions={fetchAIQualityTimeSuggestions} 
            />}
        </div>
      </CollapsibleSection>
      
      {/* Main Tools Section */}
      <CollapsibleSection title={toPersianDigits("ابزارهای اصلی خانواده")} icon={<CogIcon className={`w-5 h-5 ${activeTheme.primaryAccentClass}`} />} isOpen={openSections.mainTools} onToggle={() => toggleSection('mainTools')} className={`mb-5 bg-white p-4 rounded-xl shadow-sm border ${activeTheme.secondaryAccentClass}`} titleColorClass={`text-md font-semibold ${activeTheme.primaryAccentClass}`} >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FamilyMembersSection familyMembers={familyMembersData} onAddMember={() => {setEditingMember(null); setIsAddMemberModalOpen(true);}} onEditMember={(member) => {setEditingMember(member); setIsAddMemberModalOpen(true);}} onDeleteMember={handleDeleteFamilyMember} themeClasses={activeTheme} />
          <div className={`bg-white p-3 rounded-lg shadow-sm border ${activeTheme.secondaryAccentClass}`}>
            <div className="flex justify-between items-center mb-2">
                 <h5 className={`text-sm font-semibold ${activeTheme.primaryAccentClass} flex items-center`}><CalendarDaysIcon className={`w-4 h-4 mr-1.5 ${activeTheme.primaryAccentClass}`}/>{toPersianDigits("تقویم خانواده")}</h5>
                <button onClick={() => {setEditingEvent(null); setIsAddEventModalOpen(true);}} className={`text-xs py-1 px-2 rounded-md text-white ${activeTheme.buttonBgClass} ${activeTheme.buttonHoverBgClass} flex items-center`}><PlusIcon className="w-3 h-3 mr-1"/>{toPersianDigits("رویداد جدید")}</button>
            </div>
            <CalendarControls currentDate={currentCalendarDate} setCurrentDate={setCurrentCalendarDate} viewMode={calendarViewMode} setViewMode={setCalendarViewMode} />
            {calendarViewMode === 'month' && <MonthView date={currentCalendarDate} events={calendarEventsData} onDateClick={(date) => { setCurrentCalendarDate(date); setCalendarViewMode('day');}} onEventClick={handleEventClick} />}
            {calendarViewMode === 'week' && <WeekView date={currentCalendarDate} events={calendarEventsData} onDateClick={(date) => { setCurrentCalendarDate(date); setCalendarViewMode('day');}} onEventClick={handleEventClick} />}
            {calendarViewMode === 'day' && <DayView date={currentCalendarDate} events={calendarEventsData.filter(e => new Date(e.start).toDateString() === currentCalendarDate.toDateString())} onEventClick={handleEventClick} />}
          </div>
          <SharedListsSection sharedLists={sharedListsData} onAddList={() => setIsAddListModalOpen(true)} onDeleteItem={handleDeleteSharedListItem} onToggleItem={handleToggleSharedListItem} onAddItem={handleAddItemToSharedList} onDeleteList={handleDeleteSharedList} themeClasses={activeTheme}/>
          <MealPlannerSection recipes={userRecipes} mealPlan={mealPlanEntries} onAddRecipe={() => {setEditingRecipe(null); setIsAddRecipeModalOpen(true);}} onAssignRecipe={(date, slot) => {setAssignRecipeTarget({date, slot}); setIsAssignRecipeModalOpen(true);}} onViewRecipe={(recipe) => setViewingRecipe(recipe)} onEditRecipe={(recipe) => {setEditingRecipe(recipe); setIsAddRecipeModalOpen(true);}} onDeleteRecipe={handleDeleteUserRecipe} themeClasses={activeTheme}/>
          <PhotoAlbumSection albums={photoAlbumsData} onSelectAlbum={(albumId) => setViewingAlbumId(albumId)} onOpenAddAlbumModal={(albumToEdit) => {setEditingAlbum(albumToEdit || null); setIsAddAlbumModalOpen(true);}} onDeleteAlbum={handleDeletePhotoAlbum} viewingAlbum={viewingAlbum} onUploadPhoto={handleUploadPhotoToAlbum} onBackToDashboard={() => setViewingAlbumId(null)} themeClasses={activeTheme} />
          <FamilyBulletinBoardSection posts={bulletinPostsData} onOpenAddPostModal={(postToEdit) => {setEditingPost(postToEdit || null); setIsAddPostModalOpen(true);}} onDeletePost={handleDeleteBulletinPost} themeClasses={activeTheme} />
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <MilestonesSection milestones={developmentMilestonesData} familyMembers={familyMembersData} onAddMilestone={() => {setEditingMilestone(null); setIsAddMilestoneModalOpen(true);}} onEditMilestone={(milestone) => {setEditingMilestone(milestone); setIsAddMilestoneModalOpen(true);}} onDeleteMilestone={handleDeleteMilestone} themeClasses={activeTheme}/>
          <CareRemindersSection reminders={careRemindersData} familyMembers={familyMembersData} onAddReminder={() => {setEditingCareReminder(null); setIsAddCareReminderModalOpen(true);}} onEditReminder={(reminder) => {setEditingCareReminder(reminder); setIsAddCareReminderModalOpen(true);}} onDeleteReminder={handleDeleteCareReminder} onToggleComplete={handleToggleCareReminderCompletion} themeClasses={activeTheme} />
        </div>
      </CollapsibleSection>

      {/* Child Development Section */}
      <CollapsibleSection title={toPersianDigits("رشد و مراقبت از کودک")} icon={<AcademicCapIcon className={`w-5 h-5 ${activeTheme.primaryAccentClass}`} />} isOpen={openSections.childDevelopment} onToggle={() => toggleSection('childDevelopment')} className={`mb-5 bg-white p-4 rounded-xl shadow-sm border ${activeTheme.secondaryAccentClass}`} titleColorClass={`text-md font-semibold ${activeTheme.primaryAccentClass}`} >
         <ChildDevelopmentSection 
            familyMembers={familyMembersData} 
            sleepLogs={sleepLogsData} 
            nutritionLogs={nutritionLogsData} 
            activitySuggestions={activitySuggestions} 
            parentingTips={dynamicParentingTips} 
            gameIdeas={gameIdeas} 
            onAddSleepLog={() => {setEditingSleepLog(null); setIsAddSleepLogModalOpen(true);}} 
            onAddNutritionLog={() => {setEditingNutritionLog(null); setIsAddNutritionLogModalOpen(true);}} 
            onShowXai={(rationale) => handleShowXAIInternal(toPersianDigits("منطق پیشنهاد AI"), rationale)} 
            primaryAccentClass={activeTheme.primaryAccentClass} 
            childHealthAlerts={childHealthAlerts} 
            isLoadingParentingTips={isLoadingParentingTips}
            isLoadingChildHealthAlerts={isLoadingChildHealthAlerts}
            parentingTipsError={parentingTipsError}
            childHealthAlertsError={childHealthAlertsError}
            onRefreshAIParentingInsights={fetchDynamicParentingTips}
            onRefreshAIChildHealthAlerts={fetchChildHealthAlerts}
          />
      </CollapsibleSection>

      {/* Elderly Care Section */}
      <CollapsibleSection title={toPersianDigits("مراقبت و پشتیبانی از سالمند")} icon={<ShieldCheckIcon className={`w-5 h-5 ${activeTheme.primaryAccentClass}`} />} isOpen={openSections.elderlyCare} onToggle={() => toggleSection('elderlyCare')} className={`mb-5 bg-white p-4 rounded-xl shadow-sm border ${activeTheme.secondaryAccentClass}`} titleColorClass={`text-md font-semibold ${activeTheme.primaryAccentClass}`} >
        <ElderlyCareSection 
          healthData={elderlyHealthData} 
          aiSuggestions={dynamicElderlyCareSuggestions} 
          healthTrends={elderlyHealthTrends} 
          onShowXai={(rationale) => handleShowXAIInternal(toPersianDigits("منطق پیشنهاد AI"), rationale)} 
          primaryAccentClass={activeTheme.primaryAccentClass} 
          isLoadingAISuggestions={isLoadingElderlyAISuggestions}
          aiSuggestionError={elderlyAISuggestionError}
          onRefreshAIAnalysis={simulateNewElderlySensorData} 
        />
      </CollapsibleSection>

      {/* Memory Reminders Section */}
      <CollapsibleSection title={toPersianDigits("یادآوری‌های خاطرات خانوادگی")} icon={<QualityTimeIcon className={`w-5 h-5 ${activeTheme.primaryAccentClass}`} />} isOpen={openSections.memoryReminders} onToggle={() => toggleSection('memoryReminders')} className={`mb-5 bg-white p-4 rounded-xl shadow-sm border ${activeTheme.secondaryAccentClass}`} titleColorClass={`text-md font-semibold ${activeTheme.primaryAccentClass}`} >
         {familyMemoryReminders.length > 0 ? ( <div className="space-y-3"> {familyMemoryReminders.map(reminder => ( <FamilyMemoryReminderCard key={reminder.id} reminder={reminder} themeClasses={activeTheme} onShowXai={(rationale) => handleShowXAIInternal(toPersianDigits("منطق یادآوری"), rationale)}/> ))} </div> ) : ( <p className="text-xs text-gray-500 text-center">{toPersianDigits("هیچ یادآور خاطره فعالی وجود ندارد.")}</p> )}
      </CollapsibleSection>

      {/* Time Capsule Section */}
      <CollapsibleSection title={toPersianDigits("کپسول زمان دیجیتال")} icon={<ArchiveBoxIcon className={`w-5 h-5 ${activeTheme.primaryAccentClass}`} />} isOpen={openSections.timeCapsule} onToggle={() => toggleSection('timeCapsule')} className={`mb-5 bg-white p-4 rounded-xl shadow-sm border ${activeTheme.secondaryAccentClass}`} titleColorClass={`text-md font-semibold ${activeTheme.primaryAccentClass}`} >
        <TimeCapsuleSection themeClasses={activeTheme} familyMembers={familyMembersData} showToast={showToast} currentUserId={currentUserId} />
      </CollapsibleSection>
      
      {/* Family Tree Section */}
      <CollapsibleSection title={toPersianDigits("درخت زندگی تعاملی خانواده")} icon={<FamilyTreeIcon className={`w-5 h-5 ${activeTheme.primaryAccentClass}`} />} isOpen={openSections.familyTree} onToggle={() => toggleSection('familyTree')} className={`mb-5 bg-white p-4 rounded-xl shadow-sm border ${activeTheme.secondaryAccentClass}`} titleColorClass={`text-md font-semibold ${activeTheme.primaryAccentClass}`} >
        <FamilyTreeSection themeClasses={activeTheme} />
      </CollapsibleSection>

      {/* External Integrations Section */}
      <CollapsibleSection title={toPersianDigits("یکپارچه‌سازی با اکوسیستم‌های خارجی")} icon={<IntegrationsIcon className={`w-5 h-5 ${activeTheme.primaryAccentClass}`} />} isOpen={openSections.integrations} onToggle={() => toggleSection('integrations')} className={`mb-5 bg-white p-4 rounded-xl shadow-sm border ${activeTheme.secondaryAccentClass}`} titleColorClass={`text-md font-semibold ${activeTheme.primaryAccentClass}`} >
        <ExternalIntegrationsSection educationalPlatforms={educationalPlatforms} careServiceCategories={careServiceCategories} aiSuggestions={aiIntegrationSuggestions} themeClasses={activeTheme} onShowXai={(title, rationale) => handleShowXAIInternal(title, rationale)} geminiAI={geminiAI} familyMembers={familyMembersData} showToast={showToast} />
      </CollapsibleSection>
      
      <FamilyPageCommitmentSection themeClasses={activeTheme} />


    </div>
  );
};
