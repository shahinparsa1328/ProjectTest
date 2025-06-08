
export interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  dob: string; // YYYY-MM-DD
  avatarUrl?: string;
  role?: 'والد' | 'فرزند' | 'همسر' | 'مراقب' | 'سالمند تحت مراقبت' | string;
  foodPreferences?: string; 
  medicalRestrictions?: string; 
}

export type EventType = 'پزشکی' | 'مدرسه' | 'تولد' | 'دورهمی' | 'واکسیناسیون' | 'سایر';

export interface CalendarEvent {
  id: string;
  title: string;
  start: string; // ISO string or YYYY-MM-DDTHH:mm
  end?: string; // ISO string or YYYY-MM-DDTHH:mm
  allDay?: boolean;
  description?: string;
  eventType: EventType;
  color?: string;
  relatedMemberId?: string;
  recurring?: 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  isBirthday?: boolean;
  isRecurringInstance?: boolean;
  masterEventId?: string;
}

export interface SharedListItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface SharedList {
  id: string;
  name: string;
  items: SharedListItem[];
  sharedWithMemberIds?: string[] | 'all'; 
}

export type MilestoneType =
  | 'اولین لبخند'
  | 'غلت زدن'
  | 'نشستن بدون کمک'
  | 'چهار دست و پا رفتن'
  | 'اولین کلمات'
  | 'اولین قدم‌ها'
  | 'قد و وزن دوره‌ای'
  | 'چکاپ پزشکی'
  | 'واکسیناسیون'
  | 'مهارت اجتماعی جدید'
  | 'موفقیت تحصیلی'
  | 'سایر';

export const milestoneTypesList: MilestoneType[] = [
  'اولین لبخند', 'غلت زدن', 'نشستن بدون کمک', 'چهار دست و پا رفتن',
  'اولین کلمات', 'اولین قدم‌ها', 'قد و وزن دوره‌ای', 'چکاپ پزشکی',
  'واکسیناسیون', 'مهارت اجتماعی جدید', 'موفقیت تحصیلی', 'سایر'
];

export interface DevelopmentMilestone {
  id: string;
  childMemberId: string; 
  type: MilestoneType;
  date: string; // YYYY-MM-DD
  value?: string; 
  description?: string;
  notes?: string;
  photoUrl?: string; 
}

export type CareReminderType = 'medication' | 'appointment' | 'activity' | 'hygiene' | 'checkup' | 'other';

export const careReminderTypesList: { value: CareReminderType; label: string }[] = [
  { value: 'medication', label: 'دارو' },
  { value: 'appointment', label: 'قرار ملاقات' },
  { value: 'activity', label: 'فعالیت (مانند قدم زدن)' },
  { value: 'hygiene', label: 'بهداشت شخصی' },
  { value: 'checkup', label: 'چکاپ (قند خون، فشار خون)' },
  { value: 'other', label: 'سایر' },
];

export interface CareReminder {
  id: string;
  elderMemberId: string; 
  reminderType: CareReminderType;
  title: string;
  dateTime: string; // ISO string
  notes?: string;
  completed: boolean;
  recurring?: 'none' | 'daily' | 'weekly';
}

export interface CareNote {
  id: string;
  elderMemberId: string;
  date: string; // ISO string
  text: string;
  tags?: string[]; 
}

export type AISuggestionType =
  | 'calendar_conflict'
  | 'chore_assignment'
  | 'elder_care_observation'
  | 'activity_suggestion' 
  | 'parenting_tip'
  | 'game_idea'
  | 'meal_plan_suggestion' 
  | 'well_being_check_in_setup'
  | 'educational_resource'
  | 'child_health_alert' 
  | 'elderly_care_environmental_adjustment' 
  | 'elderly_critical_alert_setup' 
  | 'memory_reminder_prompt' 
  | 'external_educational_content' 
  | 'external_care_service_info' 
  | string; 

export interface AISuggestion {
  id: string;
  type: AISuggestionType;
  title: string;
  description: string;
  xaiRationale: string; 
  proposedActionDetails?: any; 
  relatedMemberId?: string; 
  relatedElderId?: string;
  relatedChildId?: string;
}

export interface AISuggestionFamily { 
  id: string;
  title?: string; 
  text: string;
  xaiRationale: string;
  type: 'coordination' | 'balance_work_life' | 'household_chore_management' | 'integration_suggestion' | 'memory_reminder'; // Added integration_suggestion & memory_reminder type
  relatedMemberId?: string; 
  detailsAction?: any; 
}

export interface QualityTimeActivity {
  id: string;
  title: string;
  description: string;
  suggestedTime: string;
  relevantMembers?: string[]; 
  xaiRationale?: string; 
}

export interface WellbeingFactor {
    id: string;
    name: string;
    impact: 'positive' | 'negative' | 'neutral';
    description: string;
    score?: number; 
    detailsLink?: string; 
}

export interface ChatMessage {
  id: string;
  senderId: string; 
  receiverIdOrGroupId: string; 
  text: string;
  imageUrl?: string; 
  timestamp: string; // ISO string
}

export interface Photo { 
  id: string;
  url: string;
  caption?: string;
  uploadedBy: string; 
  uploadedAt: string; 
}

export interface PhotoAlbum {
  id: string;
  name: string;
  description?: string;
  createdById: string; 
  photoUrls: string[]; 
}

export type BulletinPostColor = 'yellow' | 'pink' | 'blue' | 'green' | 'purple';

export interface BulletinPost {
  id: string;
  authorId: string; 
  text: string;
  color: BulletinPostColor;
  timestamp: string; // ISO String
}

export interface Recipe {
  id: string;
  name: string;
  description?: string;
  ingredients: { name: string; quantity: string }[]; 
  instructions: string; 
  prepTime?: string; 
  cookTime?: string; 
  servings?: number;
  category?: string; 
  cuisine?: string; 
  imageUrl?: string;
  sourceUrl?: string; 
  userSaved?: boolean; 
}

export type MealPlanSlot = 'صبحانه' | 'ناهار' | 'شام';

export interface MealPlanEntry {
  date: string; // YYYY-MM-DD
  slot: MealPlanSlot;
  recipeId: string | null; 
  customMealText?: string; 
}

export interface MealPlan {
  id: string; 
  startDate: string; 
  entries: MealPlanEntry[];
}

export interface SleepLog {
  id: string;
  childMemberId: string;
  date: string; 
  startTime: string; 
  endTime: string; 
  durationMinutes?: number; 
  quality?: 'خوب' | 'متوسط' | 'ضعیف';
  notes?: string; 
}

export type MealType = 'صبحانه' | 'ناهار' | 'شام' | 'میان‌وعده صبح' | 'میان‌وعده عصر' | 'سایر';
export const mealTypesList: MealType[] = ['صبحانه', 'ناهار', 'شام', 'میان‌وعده صبح', 'میان‌وعده عصر', 'سایر'];

export interface NutritionLog {
  id: string;
  childMemberId: string;
  date: string; 
  mealType: MealType;
  foodItems: string; 
  portionSize?: string; 
  notes?: string; 
}

export interface ActivitySuggestion {
  id: string;
  childMemberId: string;
  title: string;
  description: string;
  ageAppropriateness: string; 
  benefits: string[]; 
  materialsNeeded?: string[];
  link?: string; 
  xaiRationale: string;
}

export interface ParentingTip {
  id: string;
  title: string;
  category: string; 
  tipText: string;
  source?: string; 
  link?: string;
  xaiRationale?: string; 
  isAISuggestion?: boolean; 
}

export interface GameIdea {
  id: string;
  title: string;
  description: string;
  ageRange: string; 
  category: string; 
  materialsNeeded?: string[];
  xaiRationale: string;
}

export type ElderlyHealthDataType = 'heart_rate' | 'sleep_pattern' | 'fall_detection' | 'activity_level' | 'medication_taken' | 'blood_pressure';

export interface ElderlyHealthDataPoint {
  id: string;
  elderMemberId: string;
  timestamp: string; // ISO string
  type: ElderlyHealthDataType;
  value: string | number; 
  unit?: string;
  notes?: string; 
}

export type ElderlyAISuggestionType = 
  | 'environment_adjustment' 
  | 'care_plan_change' 
  | 'activity_recommendation'
  | 'health_observation_alert' 
  | 'medication_reminder_follow_up'; 

export interface ElderlyAISuggestion {
  id: string;
  elderMemberId: string;
  suggestionText: string; 
  rationale: string; 
  type: AISuggestionType; 
  alertType?: ElderlyAISuggestionType; 
  severity?: 'info' | 'warning' | 'critical'; 
  relatedDataPointId?: string; 
}

export interface ElderlyHealthTrend {
    id: string;
    elderMemberId: string;
    dataType: ElderlyHealthDataType;
    period: 'daily' | 'weekly' | 'monthly';
    trendDescription: string; 
    chartData?: any; 
}

export interface TimeCapsuleItem {
  id: string;
  title: string;
  contentType: 'text' | 'photo_url' | 'video_url'; 
  content: string; 
  recipientMemberId?: string; 
  openDate: string; // YYYY-MM-DD
  opened: boolean; 
  creatorId: string; 
}

export interface FamilyTreeNode {
  id: string;
  name: string;
  relationshipToRoot?: string; 
  birthDate?: string; // YYYY-MM-DD
  deathDate?: string; // YYYY-MM-DD, optional
  story?: string; 
  avatarUrl?: string;
  parentId?: string | null; 
  partnerId?: string | null; 
}

export interface FamilyMemoryReminder {
  id: string;
  title: string; 
  description: string; 
  memoryDate: string; // Original date of the memory, YYYY-MM-DD
  mediaUrl?: string; 
  xaiRationale?: string; 
  sourceType?: 'calendar' | 'album' | 'manual'; 
}

export interface EducationalPlatform {
  id: string;
  name: string;
  description: string;
  logoUrl?: string;
  websiteUrl: string;
  relevantTopics: string[]; 
}

export interface CareServiceCategory {
  id: string;
  name: string;
  description: string;
  iconName?: string; 
  exampleServices?: string[]; 
}

// New Type for Child Health Alerts
export interface ChildHealthAlert {
  id: string;
  childMemberId: string;
  childName?: string; // Added for easier display
  alertText: string;
  recommendation: string;
  severity: 'info' | 'warning' | 'critical';
  timestamp: string; // ISO string
  xaiRationale?: string;
  relatedDataSummary?: string; // e.g., "Sleep duration 2 hours less than average"
}
