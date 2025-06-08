
import React from 'react';
import { 
    Theme, 
    FontScale, 
    AvatarId, 
    VoiceId, 
    CommunicationStyle, 
    PersonalityArchetype, 
    ResponseLength, 
    EmojiUsage, 
    JargonUsage, 
    ClarificationLevel, 
    NotificationPreferences, 
    Modality, 
    RatedInteraction, 
    AssistantEvolutionDataPoint, 
    AssistantLearningReport, 
    PersonaContextSettings, 
    CustomCommand, 
    AssistantMemory, 
    ModulePermissions, 
    InterModuleDataSharingConfig, 
    AssistantOverallRole, 
    AIInference, 
    AISavedLearningPoint 
} from '../../App'; // Assuming App.tsx is two levels up

export type PersonalizationLevel = 'minimal' | 'balanced' | 'full';

export interface PersonalizationPageProps {
  userName: string;
  currentTheme: Theme; 
  setCurrentTheme: (theme: Theme) => void;
  currentFontScale: FontScale; 
  setCurrentFontScale: (scale: FontScale) => void;
  currentAssistantName: string; 
  setCurrentAssistantName: (name: string) => void;
  currentSelectedAvatarId: AvatarId; 
  setCurrentSelectedAvatarId: (id: AvatarId) => void;
  currentSelectedVoiceId: VoiceId; 
  setCurrentSelectedVoiceId: (id: VoiceId) => void;
  currentCommunicationStyle: CommunicationStyle; 
  setCurrentCommunicationStyle: (style: CommunicationStyle) => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  
  currentPersonalityArchetype: PersonalityArchetype; 
  setCurrentPersonalityArchetype: (archetype: PersonalityArchetype) => void;
  currentHumorLevel: number; 
  setCurrentHumorLevel: (level: number) => void;
  currentEmpathyLevel: number; 
  setCurrentEmpathyLevel: (level: number) => void;
  currentFormalityLevel: number; 
  setCurrentFormalityLevel: (level: number) => void;
  currentCuriosityLevel: number; 
  setCurrentCuriosityLevel: (level: number) => void;
  currentResponseLength: ResponseLength; 
  setCurrentResponseLength: (length: ResponseLength) => void;
  currentEmojiUsage: EmojiUsage; 
  setCurrentEmojiUsage: (usage: EmojiUsage) => void;
  currentJargonUsage: JargonUsage; 
  setCurrentJargonUsage: (usage: JargonUsage) => void;
  currentClarificationLevel: ClarificationLevel; 
  setCurrentClarificationLevel: (level: ClarificationLevel) => void;

  notificationPreferences: NotificationPreferences;
  setNotificationPreferences: (prefsOrFn: NotificationPreferences | ((prev: NotificationPreferences) => NotificationPreferences)) => void;


  defaultInputModality: Modality;
  setDefaultInputModality: (modality: Modality) => void;
  defaultOutputModality: Modality;
  setDefaultOutputModality: (modality: Modality) => void;
  smartMuteEnabled: boolean;
  setSmartMuteEnabled: (enabled: boolean) => void;
  smartMuteWorkHoursOnly: boolean;
  setSmartMuteWorkHoursOnly: (enabled: boolean) => void;
  
  personalizationLevel: PersonalizationLevel; 
  setPersonalizationLevel: (level: PersonalizationLevel) => void;

  currentRatedInteractions: RatedInteraction[];
  setCurrentRatedInteractions: (interactionsOrFn: RatedInteraction[] | ((prev: RatedInteraction[]) => RatedInteraction[])) => void;

  assistantEvolutionData: AssistantEvolutionDataPoint[];
  setAssistantEvolutionData: (dataOrFn: AssistantEvolutionDataPoint[] | ((prev: AssistantEvolutionDataPoint[]) => AssistantEvolutionDataPoint[])) => void;
  assistantLearningReports: AssistantLearningReport[];
  setAssistantLearningReports: (reportsOrFn: AssistantLearningReport[] | ((prev: AssistantLearningReport[]) => AssistantLearningReport[])) => void;

  enableContextualPersonaShifts: boolean;
  setEnableContextualPersonaShifts: (enabled: boolean) => void;
  personaContextSettings: PersonaContextSettings;
  setPersonaContextSettings: (settingsOrFn: PersonaContextSettings | ((prev: PersonaContextSettings) => PersonaContextSettings)) => void;

  customCommands: CustomCommand[];
  setCustomCommands: (commandsOrFn: CustomCommand[] | ((prev: CustomCommand[]) => CustomCommand[])) => void;
  assistantMemory: AssistantMemory;
  setAssistantMemory: (memoryOrFn: AssistantMemory | ((prev: AssistantMemory) => AssistantMemory)) => void;
  
  modulePermissions: ModulePermissions;
  setModulePermissions: (permissionsOrFn: ModulePermissions | ((prev: ModulePermissions) => ModulePermissions)) => void;

  interModuleDataSharing: InterModuleDataSharingConfig;
  setInterModuleDataSharing: (configOrFn: InterModuleDataSharingConfig | ((prev: InterModuleDataSharingConfig) => InterModuleDataSharingConfig)) => void;
  assistantOverallRole: AssistantOverallRole;
  setAssistantOverallRole: (role: AssistantOverallRole) => void;

  aiInferences: AIInference[]; 
  setAiInferences: (inferencesOrFn: AIInference[] | ((prev: AIInference[]) => AIInference[])) => void; 
  
  aiLearningHistory: AISavedLearningPoint[]; 
  setAiLearningHistory: (historyOrFn: AISavedLearningPoint[] | ((prev: AISavedLearningPoint[]) => AISavedLearningPoint[])) => void;
  
  resetAIPersonalizationToDefaults: () => void;
}

const PersonalizationPage: React.FC<PersonalizationPageProps> = (props) => {
  // Dummy implementation for now, real implementation will use props to display and manage settings
  return (
    <div className="page">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">شخصی‌سازی دستیار</h1>
      <p className="text-sm text-gray-600">تنظیمات شخصی‌سازی در اینجا نمایش داده خواهند شد.</p>
      {/* Example of using a prop: */}
      <div className="mt-4 p-2 bg-gray-100 rounded">
        <p className="text-xs">نام دستیار فعلی: {props.currentAssistantName}</p>
        <p className="text-xs">تم فعلی: {props.currentTheme}</p>
         <p className="text-xs">سطح شخصی‌سازی: {props.personalizationLevel}</p>
      </div>
    </div>
  );
};

export default PersonalizationPage;
```
    </content>
  </change>
  <change>
    <file>App.tsx</file>
    <description>Correct prop passing to PersonalizationPage and other minor type fixes. Ensure 'personalizationLevel' is passed from appState to PersonalizationPage. Also adjusted type for setNotificationPreferences to accept callback function.</description>
    <content><![CDATA[
import React, { useState, useEffect, useCallback } from 'react';
import BottomNavigationBar from './components/shared/BottomNavigationBar';
import FloatingActionButton from './components/shared/FloatingActionButton';
import DashboardPage from './components/pages/DashboardPage';
import GoalsPage, { GoalsPageProps } from './components/pages/GoalsPage';
import TasksPage from './components/pages/TasksPage';
import HabitsPage, { HabitsPageProps } from './components/pages/HabitsPage';
import HealthPage from './components/pages/HealthPage';
import LearningPage, { LearningPageProps as LearningPageActualProps } from './components/pages/LearningPage'; // Aliased to avoid conflict
import { FinancePage } from './components/pages/FinancePage'; 
import TravelPage from './components/pages/TravelPage';
import { SmartHomePage } from './components/pages/SmartHomePage'; 
import { FamilyPage, FamilyPageProps, themeSettings as familyPageThemeSettings } from './components/pages/family/FamilyPage'; // Updated import
import type { FamilyPageThemeSettingsInternal } from './components/pages/family/FamilyPage'; // Import type
import { CommunityPage, CommunityPageProps as CommunityPageActualProps } from './components/pages/CommunityPage'; // Changed to named import & aliased
import PersonalizationPage, { PersonalizationPageProps as PersonalizationPageActualProps, PersonalizationLevel } from './components/pages/PersonalizationPage'; // Added PersonalizationLevel
import PrivacyPage, { PrivacyPageProps as PrivacyPageActualProps } from './components/pages/PrivacyPage'; 
import InfrastructurePage from './components/pages/InfrastructurePage';
import ReportsPage from './components/pages/ReportsPage';
import MoreNavigationPanel from './components/shared/MoreNavigationPanel';
import LifeProjectsPage from './components/pages/LifeProjectsPage'; 
import { toPersianDigits } from './utils'; 
import { LearningPath, LearningContent, Badge, Skill } from './types/learningTypes'; // Added Badge and Skill
import { GoogleGenAI } from "@google/genai";
import AnomalyAlertCard from './components/smarthome/AnomalyAlertCard'; 
import { AnomalyAlert } from './types/smartHomeTypes'; 
import ToastNotification from './components/shared/ToastNotification';
import ErrorBoundary from './components/shared/ErrorBoundary';
import XAIModal from './components/shared/XAIModal'; 
import { ModuleDataAccessSettings, PrivacyLearningState } from './types/privacyTypes';


// Main App Component Type Definitions
export type PageName =
  | 'Dashboard' | 'Goals' | 'Tasks' | 'Habits' | 'Health'
  | 'Learning' | 'Finance' | 'Travel' | 'SmartHome' | 'Family'
  | 'Community' | 'Personalization' | 'Privacy' | 'Infrastructure' | 'Reports'
  | 'LifeProjects'; 

export type Theme = 'default' | 'ocean' | 'forest' | 'rose'; 
export type FontScale = 0.9 | 1.0 | 1.1 | 1.2;

// AI Assistant Types
export type AvatarId = 'avatar_default' | 'avatar_orb_blue' | 'avatar_abstract_lines' | 'avatar_friendly_bot' | string;
export type VoiceId = 'voice_female_calm' | 'voice_male_energetic' | 'voice_neutral_standard' | string;
export type CommunicationStyle = 'formal' | 'friendly';
export type PersonalityArchetype = 'coach' | 'analyst' | 'companion' | 'friend' | null;
export type ResponseLength = 'concise' | 'detailed';
export type EmojiUsage = 'use' | 'dont_use';
export type JargonUsage = 'use_jargon' | 'avoid_jargon';
export type ClarificationLevel = 'minimal_questions' | 'ensure_understanding';

export type NotificationArea = 'goals' | 'tasks' | 'habits' | 'health' | 'learning' | 'finance';
export type NotificationPriority = 'critical' | 'helpful' | 'friendly';
export interface NotificationSetting { 
  enabled: boolean;
  priority: NotificationPriority;
}
export type NotificationPreferences = Record<NotificationArea, NotificationSetting>;

export type Modality = 'text' | 'voice';

export interface RatedInteraction {
  id: string;
  interactionText: string; 
  userRating: 'like' | 'dislike'; 
  timestamp: string; 
  aiLearnedExplanation?: string; 
}

export interface AssistantEvolutionDataPoint {
  date: string; 
  alignmentScore: number; 
}
export interface AssistantLearningReport {
  id: string;
  title: string;
  date: string; 
  summary: string;
  fullReportUrl?: string; 
}
export type ContextName = 'work' | 'leisure' | 'health';
export interface ContextualPersonaSetting {
  tone: 'formal' | 'friendly' | 'concise' | 'default'; 
  proactivity: 'low' | 'medium' | 'high' | 'default';
}
export type PersonaContextSettings = Record<ContextName, ContextualPersonaSetting>;

export interface CustomCommand {
    id: string;
    commandText: string;
    actionType: 'run_routine' | 'show_summary' | 'navigate_to_page' | 'custom_ai_task';
    actionDetails?: any; 
}
export interface AssistantMemory {
    importantPeople?: string[];
    favoriteTopics?: string[];
    dietaryRestrictions?: string[];
    neverMentionTopics?: string[];
    freeTextNotes?: string;
}
export type ModulePermissionLevel = 'no_access' | 'view_only' | 'suggest_only' | 'autonomous_action_with_approval' | 'full_autonomy';
export type ModuleName = 'Health' | 'Learning' | 'Tasks' | 'Goals' | 'Finance' | 'Family' | 'Community'; 
export type ModulePermissions = Record<ModuleName, ModulePermissionLevel>;

export type InterModuleDataFlow = 'disabled' | 'anonymized_suggestions_only' | 'full_context_for_suggestions' | 'allow_ai_orchestration';
export interface InterModuleDataSharingConfig {
    health_to_learning?: InterModuleDataFlow;
    tasks_to_health?: InterModuleDataFlow;
    finance_to_goals?: InterModuleDataFlow;
}
export type AssistantOverallRole = 'suggestive_guide' | 'active_collaborator' | 'executive_manager';

export interface AIInference {
  id: string;
  inferenceText: string; 
  userCorrection?: string; 
  status: 'pending_confirmation' | 'confirmed' | 'corrected';
  correctedByUser?: boolean; 
  timestamp?: string; 
}
export interface AISavedLearningPoint {
  id: string;
  timestamp: string; 
  description: string; 
  settingsSnapshot?: any; 
}

export interface XAIModalData {
  title: string;
  explanation: string;
}

export type { ModuleDataAccessSettings };


const mockLearningPathsForSuggestions: LearningPath[] = [
  { id: 'lp1', title: 'مدیریت زمان و انرژی', description: 'مسیر جامع برای بهبود بهره وری.', categoryIds: ['cat1'], learningObjectives: [], modules: [], estimatedTime: '3 ساعت', difficultyLevel: 'Intermediate', overallProgress: 0 },
  { id: 'lp-dm', title: 'اصول بازاریابی دیجیتال', description: 'یادگیری مبانی بازاریابی آنلاین.', categoryIds: ['cat3'], learningObjectives: [], modules: [], estimatedTime: '10 ساعت', difficultyLevel: 'Beginner', overallProgress: 0 },
  { id: 'lp-fl', title: 'سواد مالی شخصی', description: 'بهبود دانش مالی و بودجه بندی.', categoryIds: ['cat3'], learningObjectives: [], modules: [], estimatedTime: '5 ساعت', difficultyLevel: 'Beginner', overallProgress: 0 },
  { id: 'lp-creativewriting', title: 'مسیر جامع نویسندگی خلاق', description: 'مهارت‌های داستان‌سرایی و تکنیک‌های نویسندگی خود را تقویت کنید.', categoryIds: ['cat_creative'], learningObjectives: ['شناخت عناصر داستان', 'تمرین نوشتن روزانه'], modules: [], estimatedTime: '۲۰ ساعت', difficultyLevel: 'Intermediate', overallProgress: 0 },
];
const mockLearningContentForSuggestions: LearningContent[] = [
  { id: 'lc-med', title: 'مقاله: فواید مدیتیشن روزانه', type: 'article', categoryIds: ['cat5'], description: 'چگونه مدیتیشن به کاهش استرس کمک می کند.', tags: ['مدیتیشن', 'آرامش'], estimatedTime: '۱۰ دقیقه', difficultyLevel: 'Easy' },
  { id: 'lc-prio', title: 'ویدیو: تکنیک‌های اولویت‌بندی وظایف', type: 'video', categoryIds: ['cat1'], description: 'یادگیری اولویت بندی کارها.', tags: ['اولویت بندی', 'بهره وری'], estimatedTime: '۱۵ دقیقه', difficultyLevel: 'Medium' },
  { id: 'lc-energy', title: 'مقاله: ۵ روش علمی برای افزایش انرژی روزانه', type: 'article', categoryIds: ['cat5', 'cat1'], description: 'راهکارهای عملی برای مقابله با خستگی و افزایش نشاط.', tags: ['انرژی', 'سلامت', 'بهره وری', 'energy'], estimatedTime: '۱۲ دقیقه', difficultyLevel: 'Easy'},
  { id: 'lc-smart-tech', title: 'دوره کوتاه: آشنایی با فناوری‌های نوین خانه هوشمند', type: 'course', categoryIds: ['cat_smarthome'], description: 'مروری بر آخرین دستاوردهای IoT و کاربرد آنها در زندگی روزمره.', tags: ['خانه هوشمند', 'فناوری', 'IoT', 'smart home tech'], estimatedTime: '۲ ساعت', difficultyLevel: 'Easy'},
];

const loadJSONFromStorage = <T,>(key: string, defaultValue: T): T => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
        try {
            const parsed = JSON.parse(storedValue);
            return parsed as T;
        } catch (e) {
            console.warn(`Error parsing ${key} from localStorage:`, e, "\nStored value was:", storedValue);
            localStorage.removeItem(key); 
            return defaultValue;
        }
    }
    return defaultValue;
};

const loadStringFromStorage = (key: string, defaultValue: string): string => {
    return localStorage.getItem(key) || defaultValue;
};

const loadNumberFromStorage = (key: string, defaultValue: number): number => {
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) {
        const num = parseFloat(storedValue);
        if (!isNaN(num)) {
            return num;
        }
    }
    return defaultValue;
};

const loadBooleanFromStorage = (key: string, defaultValue: boolean): boolean => {
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) {
        return storedValue === 'true';
    }
    return defaultValue;
};

const loadEnumFromStorage = <T extends string | number>(
  key: string,
  defaultValue: T,
  validValues: readonly T[]
): T => {
  const storedValue = localStorage.getItem(key);
  if (storedValue !== null) {
    if (typeof defaultValue === 'number' || (validValues.length > 0 && typeof validValues[0] === 'number')) {
      const numValue = parseFloat(storedValue);
      if (!isNaN(numValue) && validValues.includes(numValue as T)) {
        return numValue as T;
      }
    } else if (typeof defaultValue === 'string' || (validValues.length > 0 && typeof validValues[0] === 'string')) {
      if (validValues.includes(storedValue as T)) {
        return storedValue as T;
      }
    }
  }
  return defaultValue;
};

export interface AppProps {
    defaultPage?: PageName;
}

const initialAppState = {
  theme: 'default' as Theme,
  fontScale: 1.0 as FontScale,
  assistantName: "دستیار هوشمند", 
  selectedAvatarId: 'avatar_default' as AvatarId,
  selectedVoiceId: 'voice_female_calm' as VoiceId,
  communicationStyle: 'friendly' as CommunicationStyle,
  isFabMenuOpen: false,
  isAddGoalModalOpen: false,
  isAddTaskModalOpen: false,
  isAddHabitModalOpen: false,
  isMorePanelOpen: false,
  globalAlerts: [] as AnomalyAlert[],
  selectedPersonalityArchetype: null as PersonalityArchetype,
  humorLevel: 50,
  empathyLevel: 70,
  formalityLevel: 30,
  curiosityLevel: 60, 
  responseLength: 'concise' as ResponseLength,
  emojiUsage: 'use' as EmojiUsage,
  jargonUsage: 'avoid_jargon' as JargonUsage,
  clarificationLevel: 'minimal_questions' as ClarificationLevel,
  notificationPreferences: {
    goals: { enabled: true, priority: 'helpful' as NotificationPriority },
    tasks: { enabled: true, priority: 'critical' as NotificationPriority },
    habits: { enabled: true, priority: 'friendly' as NotificationPriority },
    health: { enabled: false, priority: 'helpful' as NotificationPriority },
    learning: { enabled: true, priority: 'helpful' as NotificationPriority },
    finance: { enabled: false, priority: 'critical' as NotificationPriority },
  } as NotificationPreferences,
  defaultInputModality: 'text' as Modality,
  defaultOutputModality: 'text' as Modality,
  smartMuteEnabled: false,
  smartMuteWorkHoursOnly: true,
  ratedInteractions: [] as RatedInteraction[],
  assistantEvolutionData: [] as AssistantEvolutionDataPoint[],
  assistantLearningReports: [] as AssistantLearningReport[],
  enableContextualPersonaShifts: true,
  personaContextSettings: {
    work: { tone: 'formal', proactivity: 'medium' } as ContextualPersonaSetting,
    leisure: { tone: 'friendly', proactivity: 'low' } as ContextualPersonaSetting,
    health: { tone: 'concise', proactivity: 'medium' } as ContextualPersonaSetting,
  } as PersonaContextSettings,
  customCommands: [] as CustomCommand[],
  assistantMemory: {
    importantPeople: [], favoriteTopics: [], dietaryRestrictions: [], neverMentionTopics: [], freeTextNotes: ''
  } as AssistantMemory,
  modulePermissions: { 
    Health: 'full_autonomy', Learning: 'full_autonomy', Tasks: 'full_autonomy',
    Goals: 'full_autonomy', Finance: 'suggest_only', Family: 'view_only', Community: 'view_only',
  } as ModulePermissions,
  interModuleDataSharing: {
    health_to_learning: 'anonymized_suggestions_only',
    tasks_to_health: 'full_context_for_suggestions',
    finance_to_goals: 'allow_ai_orchestration',
  } as InterModuleDataSharingConfig,
  assistantOverallRole: 'active_collaborator' as AssistantOverallRole,
  aiInferences: [] as AIInference[],
  aiLearningHistory: [] as AISavedLearningPoint[],
  moduleDataAccessSettings: {
    goals: { goalTitles: true, goalDescriptions: true, goalActionPlans: true },
    tasks: { taskTitles: true, taskDescriptions: true, taskDueDates: true, taskPriority: true },
    health: { sleepPatterns: false, activityLevel: false, nutritionLog: false }, 
    learning: { completedCourses: true, learningInterests: true },
  } as ModuleDataAccessSettings,
  privacyLearningState: { 
    points: 0,
    earnedBadgeIds: [],
  } as PrivacyLearningState,
  personalizationLevel: 'balanced' as PersonalizationLevel, 
};


const APP_STATE_LOCAL_STORAGE_KEYS: string[] = [
  'appTheme', 'appFontScale', 'assistantName', 'selectedAvatarId', 'selectedVoiceId',
  'communicationStyle', 'personalityArchetype', 'humorLevel', 'empathyLevel',
  'formalityLevel', 'curiosityLevel', 'responseLength', 'emojiUsage', 'jargonUsage',
  'clarificationLevel', 'notificationPreferences_v1', 'defaultInputModality',
  'defaultOutputModality', 'smartMuteEnabled', 'smartMuteWorkHoursOnly',
  'ratedInteractions_v1', 'assistantEvolutionData_v1', 'assistantLearningReports_v1',
  'enableContextualPersonaShifts_v1', 'personaContextSettings_v1', 'customCommands_v1',
  'assistantMemory_v1', 'modulePermissions_v1', 'interModuleDataSharing_v1',
  'assistantOverallRole_v1', 'aiInferences_v1', 'aiLearningHistory_v1',
  'moduleDataAccessSettings_v1', 'privacyLearningState_v1', 'personalizationLevel_v1'
];


export const App: React.FC<AppProps> = ({ defaultPage = 'Dashboard' }) => {
  const [currentPage, setCurrentPage] = useState<PageName>(defaultPage);
  const [appState, setAppState] = useState(() => {
    const savedTheme = loadEnumFromStorage('appTheme', initialAppState.theme, ['default', 'ocean', 'forest', 'rose']);
    const savedFontScale = loadNumberFromStorage('appFontScale', initialAppState.fontScale) as FontScale; 
    const savedAssistantName = loadStringFromStorage('assistantName', initialAppState.assistantName);
    const savedAvatarId = loadStringFromStorage('selectedAvatarId', initialAppState.selectedAvatarId) as AvatarId;
    const savedVoiceId = loadStringFromStorage('selectedVoiceId', initialAppState.selectedVoiceId) as VoiceId;
    const savedCommStyle = loadEnumFromStorage('communicationStyle', initialAppState.communicationStyle, ['formal', 'friendly']);
    
    const savedPersonalityArchetype = loadEnumFromStorage('personalityArchetype', initialAppState.selectedPersonalityArchetype, ['coach', 'analyst', 'companion', 'friend', null]);
    const savedHumorLevel = loadNumberFromStorage('humorLevel', initialAppState.humorLevel);
    const savedEmpathyLevel = loadNumberFromStorage('empathyLevel', initialAppState.empathyLevel);
    const savedFormalityLevel = loadNumberFromStorage('formalityLevel', initialAppState.formalityLevel);
    const savedCuriosityLevel = loadNumberFromStorage('curiosityLevel', initialAppState.curiosityLevel);
    const savedResponseLength = loadEnumFromStorage('responseLength', initialAppState.responseLength, ['concise', 'detailed']);
    const savedEmojiUsage = loadEnumFromStorage('emojiUsage', initialAppState.emojiUsage, ['use', 'dont_use']);
    const savedJargonUsage = loadEnumFromStorage('jargonUsage', initialAppState.jargonUsage, ['use_jargon', 'avoid_jargon']);
    const savedClarificationLevel = loadEnumFromStorage('clarificationLevel', initialAppState.clarificationLevel, ['minimal_questions', 'ensure_understanding']);

    const savedNotificationPreferences = loadJSONFromStorage<NotificationPreferences>('notificationPreferences_v1', initialAppState.notificationPreferences);
    const savedDefaultInputModality = loadEnumFromStorage<Modality>('defaultInputModality', initialAppState.defaultInputModality, ['text', 'voice']);
    const savedDefaultOutputModality = loadEnumFromStorage<Modality>('defaultOutputModality', initialAppState.defaultOutputModality, ['text', 'voice']);
    const savedSmartMuteEnabled = loadBooleanFromStorage('smartMuteEnabled', initialAppState.smartMuteEnabled);
    const savedSmartMuteWorkHoursOnly = loadBooleanFromStorage('smartMuteWorkHoursOnly', initialAppState.smartMuteWorkHoursOnly);
    const savedPersonalizationLevel = loadEnumFromStorage<PersonalizationLevel>('personalizationLevel_v1', initialAppState.personalizationLevel, ['minimal', 'balanced', 'full']);

    const savedRatedInteractions = loadJSONFromStorage<RatedInteraction[]>('ratedInteractions_v1', initialAppState.ratedInteractions);

    const savedAssistantEvolutionData = loadJSONFromStorage<AssistantEvolutionDataPoint[]>('assistantEvolutionData_v1', initialAppState.assistantEvolutionData);
    const savedAssistantLearningReports = loadJSONFromStorage<AssistantLearningReport[]>('assistantLearningReports_v1', initialAppState.assistantLearningReports);
    const savedEnableContextualPersonaShifts = loadBooleanFromStorage('enableContextualPersonaShifts_v1', initialAppState.enableContextualPersonaShifts);
    const savedPersonaContextSettings = loadJSONFromStorage<PersonaContextSettings>('personaContextSettings_v1', initialAppState.personaContextSettings);
    
    const savedCustomCommands = loadJSONFromStorage<CustomCommand[]>('customCommands_v1', initialAppState.customCommands);
    const savedAssistantMemory = loadJSONFromStorage<AssistantMemory>('assistantMemory_v1', initialAppState.assistantMemory);
    const savedModulePermissions = loadJSONFromStorage<ModulePermissions>('modulePermissions_v1', initialAppState.modulePermissions);
    
    const savedInterModuleDataSharing = loadJSONFromStorage<InterModuleDataSharingConfig>('interModuleDataSharing_v1', initialAppState.interModuleDataSharing);
    const savedAssistantOverallRole = loadEnumFromStorage<AssistantOverallRole>('assistantOverallRole_v1', initialAppState.assistantOverallRole, ['suggestive_guide', 'active_collaborator', 'executive_manager']);
    
    const savedAiInferences = loadJSONFromStorage<AIInference[]>('aiInferences_v1', initialAppState.aiInferences);
    const savedAiLearningHistory = loadJSONFromStorage<AISavedLearningPoint[]>('aiLearningHistory_v1', initialAppState.aiLearningHistory);
    
    const savedModuleDataAccessSettings = loadJSONFromStorage<ModuleDataAccessSettings>('moduleDataAccessSettings_v1', initialAppState.moduleDataAccessSettings);
    const savedPrivacyLearningState = loadJSONFromStorage<PrivacyLearningState>('privacyLearningState_v1', initialAppState.privacyLearningState);


    return {
      ...initialAppState,
      theme: savedTheme,
      fontScale: savedFontScale,
      assistantName: savedAssistantName,
      selectedAvatarId: savedAvatarId,
      selectedVoiceId: savedVoiceId,
      communicationStyle: savedCommStyle,
      selectedPersonalityArchetype: savedPersonalityArchetype,
      humorLevel: savedHumorLevel,
      empathyLevel: savedEmpathyLevel,
      formalityLevel: savedFormalityLevel,
      curiosityLevel: savedCuriosityLevel,
      responseLength: savedResponseLength,
      emojiUsage: savedEmojiUsage,
      jargonUsage: savedJargonUsage,
      clarificationLevel: savedClarificationLevel,
      notificationPreferences: savedNotificationPreferences,
      defaultInputModality: savedDefaultInputModality,
      defaultOutputModality: savedDefaultOutputModality,
      smartMuteEnabled: savedSmartMuteEnabled,
      smartMuteWorkHoursOnly: savedSmartMuteWorkHoursOnly,
      personalizationLevel: savedPersonalizationLevel,
      ratedInteractions: savedRatedInteractions,
      assistantEvolutionData: savedAssistantEvolutionData,
      assistantLearningReports: savedAssistantLearningReports,
      enableContextualPersonaShifts: savedEnableContextualPersonaShifts,
      personaContextSettings: savedPersonaContextSettings,
      customCommands: savedCustomCommands,
      assistantMemory: savedAssistantMemory,
      modulePermissions: savedModulePermissions,
      interModuleDataSharing: savedInterModuleDataSharing,
      assistantOverallRole: savedAssistantOverallRole,
      aiInferences: savedAiInferences,
      aiLearningHistory: savedAiLearningHistory,
      moduleDataAccessSettings: savedModuleDataAccessSettings,
      privacyLearningState: savedPrivacyLearningState,
    };
  });

  const [isAddGoalModalOpen, setIsAddGoalModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isAddHabitModalOpen, setIsAddHabitModalOpen] = useState(false);
  const [isMorePanelOpen, setIsMorePanelOpen] = useState(false);
  const [isFabMenuOpen, setIsFabMenuOpen] = useState(false); 
  
  const [xaiModalData, setXaiModalData] = useState<XAIModalData | null>(null);
  const [toastData, setToastData] = useState<{ id: number; text: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showGlobalToast = useCallback((text: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToastData({ id: Date.now(), text, type });
  }, []);

  useEffect(() => {
    if (toastData) {
      const timer = setTimeout(() => setToastData(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toastData]);

  const handleShowXaiModal = (title: string, explanation: string) => {
    setXaiModalData({ title, explanation });
  };


  useEffect(() => { localStorage.setItem('appTheme', appState.theme); }, [appState.theme]);
  useEffect(() => { localStorage.setItem('appFontScale', String(appState.fontScale)); }, [appState.fontScale]);
  useEffect(() => { localStorage.setItem('assistantName', appState.assistantName); }, [appState.assistantName]);
  useEffect(() => { localStorage.setItem('selectedAvatarId', appState.selectedAvatarId); }, [appState.selectedAvatarId]);
  useEffect(() => { localStorage.setItem('selectedVoiceId', appState.selectedVoiceId); }, [appState.selectedVoiceId]);
  useEffect(() => { localStorage.setItem('communicationStyle', appState.communicationStyle); }, [appState.communicationStyle]);
  
  useEffect(() => { localStorage.setItem('personalityArchetype', String(appState.selectedPersonalityArchetype)); }, [appState.selectedPersonalityArchetype]);
  useEffect(() => { localStorage.setItem('humorLevel', String(appState.humorLevel)); }, [appState.humorLevel]);
  useEffect(() => { localStorage.setItem('empathyLevel', String(appState.empathyLevel)); }, [appState.empathyLevel]);
  useEffect(() => { localStorage.setItem('formalityLevel', String(appState.formalityLevel)); }, [appState.formalityLevel]);
  useEffect(() => { localStorage.setItem('curiosityLevel', String(appState.curiosityLevel)); }, [appState.curiosityLevel]);
  useEffect(() => { localStorage.setItem('responseLength', appState.responseLength); }, [appState.responseLength]);
  useEffect(() => { localStorage.setItem('emojiUsage', appState.emojiUsage); }, [appState.emojiUsage]);
  useEffect(() => { localStorage.setItem('jargonUsage', appState.jargonUsage); }, [appState.jargonUsage]);
  useEffect(() => { localStorage.setItem('clarificationLevel', appState.clarificationLevel); }, [appState.clarificationLevel]);
  useEffect(() => { localStorage.setItem('notificationPreferences_v1', JSON.stringify(appState.notificationPreferences)); }, [appState.notificationPreferences]);
  useEffect(() => { localStorage.setItem('defaultInputModality', appState.defaultInputModality); }, [appState.defaultInputModality]);
  useEffect(() => { localStorage.setItem('defaultOutputModality', appState.defaultOutputModality); }, [appState.defaultOutputModality]);
  useEffect(() => { localStorage.setItem('smartMuteEnabled', String(appState.smartMuteEnabled)); }, [appState.smartMuteEnabled]);
  useEffect(() => { localStorage.setItem('smartMuteWorkHoursOnly', String(appState.smartMuteWorkHoursOnly)); }, [appState.smartMuteWorkHoursOnly]);
  useEffect(() => { localStorage.setItem('personalizationLevel_v1', appState.personalizationLevel); }, [appState.personalizationLevel]);

  useEffect(() => { localStorage.setItem('ratedInteractions_v1', JSON.stringify(appState.ratedInteractions)); }, [appState.ratedInteractions]);
  useEffect(() => { localStorage.setItem('assistantEvolutionData_v1', JSON.stringify(appState.assistantEvolutionData)); }, [appState.assistantEvolutionData]);
  useEffect(() => { localStorage.setItem('assistantLearningReports_v1', JSON.stringify(appState.assistantLearningReports)); }, [appState.assistantLearningReports]);
  useEffect(() => { localStorage.setItem('enableContextualPersonaShifts_v1', String(appState.enableContextualPersonaShifts)); }, [appState.enableContextualPersonaShifts]);
  useEffect(() => { localStorage.setItem('personaContextSettings_v1', JSON.stringify(appState.personaContextSettings)); }, [appState.personaContextSettings]);
  useEffect(() => { localStorage.setItem('customCommands_v1', JSON.stringify(appState.customCommands)); }, [appState.customCommands]);
  useEffect(() => { localStorage.setItem('assistantMemory_v1', JSON.stringify(appState.assistantMemory)); }, [appState.assistantMemory]);
  useEffect(() => { localStorage.setItem('modulePermissions_v1', JSON.stringify(appState.modulePermissions)); }, [appState.modulePermissions]);
  useEffect(() => { localStorage.setItem('interModuleDataSharing_v1', JSON.stringify(appState.interModuleDataSharing)); }, [appState.interModuleDataSharing]);
  useEffect(() => { localStorage.setItem('assistantOverallRole_v1', appState.assistantOverallRole); }, [appState.assistantOverallRole]);
  useEffect(() => { localStorage.setItem('aiInferences_v1', JSON.stringify(appState.aiInferences)); }, [appState.aiInferences]);
  useEffect(() => { localStorage.setItem('aiLearningHistory_v1', JSON.stringify(appState.aiLearningHistory)); }, [appState.aiLearningHistory]);

  useEffect(() => { localStorage.setItem('moduleDataAccessSettings_v1', JSON.stringify(appState.moduleDataAccessSettings)); }, [appState.moduleDataAccessSettings]);
  useEffect(() => { localStorage.setItem('privacyLearningState_v1', JSON.stringify(appState.privacyLearningState)); }, [appState.privacyLearningState]);


  useEffect(() => {
    document.body.className = `theme-${appState.theme}`;
    document.documentElement.style.fontSize = `${appState.fontScale * 16}px`; 
  }, [appState.theme, appState.fontScale]);


  const navigateTo = (page: PageName) => {
    setCurrentPage(page);
    setIsMorePanelOpen(false); 
    window.scrollTo(0, 0); 
  };

  const addGlobalAlert = useCallback((alert: Omit<AnomalyAlert, 'id'> & { id?: string }) => {
    setAppState(prev => ({
      ...prev,
      globalAlerts: [...prev.globalAlerts, { ...alert, id: alert.id || `alert-${Date.now().toString()}` }]
    }));
  }, []);
  

  const dismissGlobalAlert = useCallback((alertId: string) => {
    setAppState(prev => ({
      ...prev,
      globalAlerts: prev.globalAlerts.filter(a => a.id !== alertId)
    }));
  }, []);

  const resetAIPersonalizationToDefaults = () => {
    setAppState(prev => ({
      ...prev,
      selectedPersonalityArchetype: initialAppState.selectedPersonalityArchetype,
      humorLevel: initialAppState.humorLevel,
      empathyLevel: initialAppState.empathyLevel,
      formalityLevel: initialAppState.formalityLevel,
      curiosityLevel: initialAppState.curiosityLevel,
      responseLength: initialAppState.responseLength,
      emojiUsage: initialAppState.emojiUsage,
      jargonUsage: initialAppState.jargonUsage,
      clarificationLevel: initialAppState.clarificationLevel,
      notificationPreferences: initialAppState.notificationPreferences, 
      defaultInputModality: initialAppState.defaultInputModality,
      defaultOutputModality: initialAppState.defaultOutputModality,
      smartMuteEnabled: initialAppState.smartMuteEnabled,
      smartMuteWorkHoursOnly: initialAppState.smartMuteWorkHoursOnly,
      personalizationLevel: initialAppState.personalizationLevel, 
      ratedInteractions: initialAppState.ratedInteractions,
      assistantEvolutionData: initialAppState.assistantEvolutionData,
      assistantLearningReports: initialAppState.assistantLearningReports,
      enableContextualPersonaShifts: initialAppState.enableContextualPersonaShifts,
      personaContextSettings: initialAppState.personaContextSettings,
      customCommands: initialAppState.customCommands,
      assistantMemory: initialAppState.assistantMemory,
      modulePermissions: initialAppState.modulePermissions, 
      interModuleDataSharing: initialAppState.interModuleDataSharing,
      assistantOverallRole: initialAppState.assistantOverallRole,
      aiInferences: initialAppState.aiInferences,
      aiLearningHistory: initialAppState.aiLearningHistory,
    }));
    showGlobalToast(toPersianDigits("تنظیمات شخصی‌سازی هوش مصنوعی به پیش‌فرض بازنشانی شد."), "info");
  };

  const setCurrentTheme = (theme: Theme) => setAppState(s => ({...s, theme}));
  const setCurrentFontScale = (scale: FontScale) => setAppState(s => ({...s, fontScale: scale}));
  const setCurrentAssistantName = (name: string) => setAppState(s => ({...s, assistantName: name}));
  const setCurrentSelectedAvatarId = (id: AvatarId) => setAppState(s => ({...s, selectedAvatarId: id}));
  const setCurrentSelectedVoiceId = (id: VoiceId) => setAppState(s => ({...s, selectedVoiceId: id}));
  const setCurrentCommunicationStyle = (style: CommunicationStyle) => setAppState(s => ({...s, communicationStyle: style}));
  
  const setCurrentPersonalityArchetype = (archetype: PersonalityArchetype) => setAppState(s => ({...s, selectedPersonalityArchetype: archetype}));
  const setCurrentHumorLevel = (level: number) => setAppState(s => ({...s, humorLevel: level}));
  const setCurrentEmpathyLevel = (level: number) => setAppState(s => ({...s, empathyLevel: level}));
  const setCurrentFormalityLevel = (level: number) => setAppState(s => ({...s, formalityLevel: level}));
  const setCurrentCuriosityLevel = (level: number) => setAppState(s => ({...s, curiosityLevel: level}));
  const setCurrentResponseLength = (length: ResponseLength) => setAppState(s => ({...s, responseLength: length}));
  const setCurrentEmojiUsage = (usage: EmojiUsage) => setAppState(s => ({...s, emojiUsage: usage}));
  const setCurrentJargonUsage = (usage: JargonUsage) => setAppState(s => ({...s, jargonUsage: usage}));
  const setCurrentClarificationLevel = (level: ClarificationLevel) => setAppState(s => ({...s, clarificationLevel: level}));
  
  const setNotificationPreferences = (prefsOrCallback: NotificationPreferences | ((prev: NotificationPreferences) => NotificationPreferences)) => {
    setAppState(s => ({ ...s, notificationPreferences: typeof prefsOrCallback === 'function' ? prefsOrCallback(s.notificationPreferences) : prefsOrCallback }));
  };

  const setDefaultInputModality = (modality: Modality) => setAppState(s => ({...s, defaultInputModality: modality}));
  const setDefaultOutputModality = (modality: Modality) => setAppState(s => ({...s, defaultOutputModality: modality}));
  const setSmartMuteEnabled = (enabled: boolean) => setAppState(s => ({...s, smartMuteEnabled: enabled}));
  const setSmartMuteWorkHoursOnly = (enabled: boolean) => setAppState(s => ({...s, smartMuteWorkHoursOnly: enabled}));
  const setPersonalizationLevel = (level: PersonalizationLevel) => setAppState(s => ({...s, personalizationLevel: level }));

  const setCurrentRatedInteractions = (interactionsOrCallback: RatedInteraction[] | ((prev: RatedInteraction[]) => RatedInteraction[])) => {
    setAppState(s => ({ ...s, ratedInteractions: typeof interactionsOrCallback === 'function' ? interactionsOrCallback(s.ratedInteractions) : interactionsOrCallback }));
  };
  
  const setAssistantEvolutionData = (dataCallback: AssistantEvolutionDataPoint[] | ((prev: AssistantEvolutionDataPoint[]) => AssistantEvolutionDataPoint[])) => {
    setAppState(s => ({ ...s, assistantEvolutionData: typeof dataCallback === 'function' ? dataCallback(s.assistantEvolutionData) : dataCallback }));
  };
  const setAssistantLearningReports = (reportsCallback: AssistantLearningReport[] | ((prev: AssistantLearningReport[]) => AssistantLearningReport[])) => {
    setAppState(s => ({ ...s, assistantLearningReports: typeof reportsCallback === 'function' ? reportsCallback(s.assistantLearningReports) : reportsCallback }));
  };
  const setEnableContextualPersonaShifts = (enabled: boolean) => setAppState(s => ({...s, enableContextualPersonaShifts: enabled}));
  const setPersonaContextSettings = (settingsCallback: PersonaContextSettings | ((prev: PersonaContextSettings) => PersonaContextSettings)) => {
    setAppState(s => ({ ...s, personaContextSettings: typeof settingsCallback === 'function' ? settingsCallback(s.personaContextSettings) : settingsCallback }));
  };
  const setCustomCommands = (commandsCallback: CustomCommand[] | ((prev: CustomCommand[]) => CustomCommand[])) => {
    setAppState(s => ({ ...s, customCommands: typeof commandsCallback === 'function' ? commandsCallback(s.customCommands) : commandsCallback }));
  };
  const setAssistantMemory = (memoryCallback: AssistantMemory | ((prev: AssistantMemory) => AssistantMemory)) => {
    setAppState(s => ({ ...s, assistantMemory: typeof memoryCallback === 'function' ? memoryCallback(s.assistantMemory) : memoryCallback }));
  };
  const setModulePermissions = (permissionsCallback: ModulePermissions | ((prev: ModulePermissions) => ModulePermissions)) => {
    setAppState(s => ({ ...s, modulePermissions: typeof permissionsCallback === 'function' ? permissionsCallback(s.modulePermissions) : permissionsCallback }));
  };
  const setInterModuleDataSharing = (configCallback: InterModuleDataSharingConfig | ((prev: InterModuleDataSharingConfig) => InterModuleDataSharingConfig)) => {
     setAppState(s => ({ ...s, interModuleDataSharing: typeof configCallback === 'function' ? configCallback(s.interModuleDataSharing) : configCallback }));
  };
  const setAssistantOverallRole = (role: AssistantOverallRole) => setAppState(s => ({...s, assistantOverallRole: role}));
  const setAiInferences = (inferencesCallback: AIInference[] | ((prev: AIInference[]) => AIInference[])) => {
    setAppState(s => ({ ...s, aiInferences: typeof inferencesCallback === 'function' ? inferencesCallback(s.aiInferences) : inferencesCallback }));
  };
  const setAiLearningHistory = (historyCallback: AISavedLearningPoint[] | ((prev: AISavedLearningPoint[]) => AISavedLearningPoint[])) => {
    setAppState(s => ({ ...s, aiLearningHistory: typeof historyCallback === 'function' ? historyCallback(s.aiLearningHistory) : historyCallback }));
  };
  const setModuleDataAccessSettings = (settingsCallback: ModuleDataAccessSettings | ((prev: ModuleDataAccessSettings) => ModuleDataAccessSettings)) => {
    setAppState(s => ({ ...s, moduleDataAccessSettings: typeof settingsCallback === 'function' ? settingsCallback(s.moduleDataAccessSettings) : settingsCallback }));
  };

  const handleCompletePrivacyResource = (resourceId: string, pointsAwarded: number, badgeIdToAward?: string) => {
    setAppState(prev => {
      const newPoints = prev.privacyLearningState.points + pointsAwarded;
      let newBadgeIds = [...prev.privacyLearningState.earnedBadgeIds];
      if (badgeIdToAward && !newBadgeIds.includes(badgeIdToAward)) {
        newBadgeIds.push(badgeIdToAward);
      }
      return {
        ...prev,
        privacyLearningState: {
          points: newPoints,
          earnedBadgeIds: newBadgeIds,
        }
      };
    });
    showGlobalToast(toPersianDigits(`شما ${pointsAwarded} امتیاز کسب کردید!`), 'success');
    if (badgeIdToAward && !appState.privacyLearningState.earnedBadgeIds.includes(badgeIdToAward)) {
      showGlobalToast(toPersianDigits("شما یک نشان جدید کسب کردید!"), 'success');
    }
  };

  const handleDownloadUserData = () => {
    try {
      const dataToDownload = { ...appState };
      const jsonString = JSON.stringify(dataToDownload, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'life_orchestrator_ai_my_data.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showGlobalToast(toPersianDigits("داده‌های شما با موفقیت برای دانلود آماده شد."), 'success');
    } catch (error) {
      console.error("Error preparing user data for download:", error);
      showGlobalToast(toPersianDigits("خطا در آماده‌سازی داده‌ها برای دانلود."), 'error');
    }
  };

  const handleDeleteAccountAndData = () => {
    APP_STATE_LOCAL_STORAGE_KEYS.forEach(key => {
      localStorage.removeItem(key);
    });
    setAppState(initialAppState); 
    setCurrentPage('Dashboard'); 
    showGlobalToast(toPersianDigits("حساب کاربری و تمام داده‌های مرتبط با موفقیت حذف شدند. برنامه به حالت اولیه بازنشانی شد."), 'info');
  };


  const openAddGoalModal = () => setIsAddGoalModalOpen(true);
  const closeAddGoalModal = () => setIsAddGoalModalOpen(false);

  const openAddTaskModal = () => setIsAddTaskModalOpen(true); 
  const closeAddTaskModal = () => setIsAddTaskModalOpen(false);

  const openAddHabitModal = () => setIsAddHabitModalOpen(true);
  const closeAddHabitModal = () => setIsAddHabitModalOpen(false);


  const renderPage = () => {
    let familyThemeClasses: FamilyPageThemeSettingsInternal;
    if (appState.theme === 'rose' && familyPageThemeSettings.rose) {
        familyThemeClasses = familyPageThemeSettings.rose;
    } else if (appState.theme === 'default' && familyPageThemeSettings.default) {
        familyThemeClasses = familyPageThemeSettings.default;
    } else {
        familyThemeClasses = familyPageThemeSettings.rose || familyPageThemeSettings.default || { backgroundClass: 'bg-family-page', primaryAccentClass: 'text-pink-600', secondaryAccentClass: 'border-pink-200', buttonBgClass: 'bg-pink-500', buttonHoverBgClass: 'hover:bg-pink-600'};
    }


    switch (currentPage) {
      case 'Dashboard':
        return <DashboardPage userName={appState.assistantName} navigateTo={navigateTo} />;
      case 'Goals':
        return <GoalsPage isAddGoalModalOpen={isAddGoalModalOpen} openAddGoalModal={openAddGoalModal} closeAddGoalModal={closeAddGoalModal} navigateTo={navigateTo} learningPaths={mockLearningPathsForSuggestions} learningContent={mockLearningContentForSuggestions} />;
      case 'Tasks':
        return <TasksPage learningPaths={mockLearningPathsForSuggestions} learningContent={mockLearningContentForSuggestions} navigateTo={navigateTo} />;
      case 'Habits':
        return <HabitsPage openAddGoalModal={openAddGoalModal} />;
      case 'Health':
        return <HealthPage learningPaths={mockLearningPathsForSuggestions} learningContent={mockLearningContentForSuggestions} navigateTo={navigateTo} />;
      case 'Learning':
        return <LearningPage userName={appState.assistantName} navigateToAppPage={navigateTo} />;
      case 'Finance':
        return <FinancePage learningPaths={mockLearningPathsForSuggestions} learningContent={mockLearningContentForSuggestions} navigateTo={navigateTo} />;
      case 'Travel':
        return <TravelPage userName={appState.assistantName} navigateTo={navigateTo} />;
      case 'SmartHome':
        return <SmartHomePage userName={appState.assistantName} navigateTo={navigateTo} learningContentForSuggestions={mockLearningContentForSuggestions} geminiAI={null} addGlobalAlert={addGlobalAlert} dismissGlobalAlert={dismissGlobalAlert} showGlobalToast={showGlobalToast} />;
      case 'Family':
         return <FamilyPage 
                    showToast={showGlobalToast} 
                    geminiAI={null} 
                    currentUserId={"user_app_id"} 
                    themeClasses={familyThemeClasses}
                    onShowXai={handleShowXaiModal}
                  />;
      case 'Community':
        return <CommunityPage 
                    userName={appState.assistantName} 
                    navigateTo={navigateTo} 
                    showToast={showGlobalToast} 
                    geminiAIInstance={null} 
                    earnedBadges={appState.privacyLearningState.earnedBadgeIds.map(id => ({id, name: `نشان ${toPersianDigits(String(id))}`, description:''}))} 
                    skills={[]}     
                />;
      case 'Personalization':
        return <PersonalizationPage 
                userName={appState.assistantName}
                currentTheme={appState.theme} setCurrentTheme={setCurrentTheme}
                currentFontScale={appState.fontScale} setCurrentFontScale={setCurrentFontScale}
                currentAssistantName={appState.assistantName} setCurrentAssistantName={setCurrentAssistantName}
                currentSelectedAvatarId={appState.selectedAvatarId} setCurrentSelectedAvatarId={setCurrentSelectedAvatarId}
                currentSelectedVoiceId={appState.selectedVoiceId} setCurrentSelectedVoiceId={setCurrentSelectedVoiceId}
                currentCommunicationStyle={appState.communicationStyle} setCurrentCommunicationStyle={setCurrentCommunicationStyle}
                showToast={showGlobalToast}
                currentPersonalityArchetype={appState.selectedPersonalityArchetype} setCurrentPersonalityArchetype={setCurrentPersonalityArchetype}
                currentHumorLevel={appState.humorLevel} setCurrentHumorLevel={setCurrentHumorLevel}
                currentEmpathyLevel={appState.empathyLevel} setCurrentEmpathyLevel={setCurrentEmpathyLevel}
                currentFormalityLevel={appState.formalityLevel} setCurrentFormalityLevel={setCurrentFormalityLevel}
                currentCuriosityLevel={appState.curiosityLevel} setCurrentCuriosityLevel={setCurrentCuriosityLevel}
                currentResponseLength={appState.responseLength} setCurrentResponseLength={setCurrentResponseLength}
                currentEmojiUsage={appState.emojiUsage} setCurrentEmojiUsage={setCurrentEmojiUsage}
                currentJargonUsage={appState.jargonUsage} setCurrentJargonUsage={setCurrentJargonUsage}
                currentClarificationLevel={appState.clarificationLevel} setCurrentClarificationLevel={setCurrentClarificationLevel}
                notificationPreferences={appState.notificationPreferences} setNotificationPreferences={setNotificationPreferences}
                defaultInputModality={appState.defaultInputModality} setDefaultInputModality={setDefaultInputModality}
                defaultOutputModality={appState.defaultOutputModality} setDefaultOutputModality={setDefaultOutputModality}
                smartMuteEnabled={appState.smartMuteEnabled} setSmartMuteEnabled={setSmartMuteEnabled}
                smartMuteWorkHoursOnly={appState.smartMuteWorkHoursOnly} setSmartMuteWorkHoursOnly={setSmartMuteWorkHoursOnly}
                personalizationLevel={appState.personalizationLevel} setPersonalizationLevel={setPersonalizationLevel}
                currentRatedInteractions={appState.ratedInteractions} setCurrentRatedInteractions={setCurrentRatedInteractions}
                assistantEvolutionData={appState.assistantEvolutionData} setAssistantEvolutionData={setAssistantEvolutionData}
                assistantLearningReports={appState.assistantLearningReports} setAssistantLearningReports={setAssistantLearningReports}
                enableContextualPersonaShifts={appState.enableContextualPersonaShifts} setEnableContextualPersonaShifts={setEnableContextualPersonaShifts}
                personaContextSettings={appState.personaContextSettings} setPersonaContextSettings={setPersonaContextSettings}
                customCommands={appState.customCommands} setCustomCommands={setCustomCommands}
                assistantMemory={appState.assistantMemory} setAssistantMemory={setAssistantMemory}
                modulePermissions={appState.modulePermissions} setModulePermissions={setModulePermissions}
                interModuleDataSharing={appState.interModuleDataSharing} setInterModuleDataSharing={setInterModuleDataSharing}
                assistantOverallRole={appState.assistantOverallRole} setAssistantOverallRole={setAssistantOverallRole}
                aiInferences={appState.aiInferences} setAiInferences={setAiInferences}
                aiLearningHistory={appState.aiLearningHistory} setAiLearningHistory={setAiLearningHistory}
                resetAIPersonalizationToDefaults={resetAIPersonalizationToDefaults}
               />;
      case 'Privacy':
        return <PrivacyPage 
                  userName={appState.assistantName} 
                  assistantName={appState.assistantName}
                  navigateTo={navigateTo} 
                  showToast={showGlobalToast} 
                  geminiAI={null} 
                  theme={appState.theme}
                  moduleDataAccessSettings={appState.moduleDataAccessSettings}
                  onToggleModuleDataControl={(moduleId, dataItemId, isEnabled) => {
                    setModuleDataAccessSettings(prev => ({
                      ...prev,
                      [moduleId]: {
                        ...(prev[moduleId] || {}),
                        [dataItemId]: isEnabled
                      }
                    }));
                  }}
                  onShowXai={handleShowXaiModal}
                  privacyLearningState={appState.privacyLearningState}
                  onCompletePrivacyResource={handleCompletePrivacyResource}
                  onDownloadUserData={handleDownloadUserData}
                  onDeleteAccountAndData={handleDeleteAccountAndData}
                  personalizationLevel={appState.personalizationLevel}
                />;
      case 'Infrastructure':
        return <InfrastructurePage userName={appState.assistantName} navigateTo={navigateTo} />;
      case 'Reports':
        return <ReportsPage />;
      case 'LifeProjects':
        return <LifeProjectsPage navigateTo={navigateTo} learningPaths={mockLearningPathsForSuggestions} learningContent={mockLearningContentForSuggestions} />;
      default:
        return <DashboardPage userName={appState.assistantName} navigateTo={navigateTo} />;
    }
  };
  
  const fabActionsProps = {
    onAddGoalClick: () => { navigateTo('Goals'); openAddGoalModal(); },
    onAddTaskClick: () => { navigateTo('Tasks'); /* openAddTaskModal(); */ },
    onAddHabitClick: () => { navigateTo('Habits'); /* openAddHabitModal(); */ },
  };

  return (
    <ErrorBoundary fallbackMessage={toPersianDigits("متاسفانه مشکلی در بارگذاری برنامه رخ داده است.")}>
      <div className={`app-container theme-${appState.theme}`}>
        <main className="app-main-content pb-20 print:pb-0">
          {appState.globalAlerts.length > 0 && (
            <div className="global-alerts-container">
                {appState.globalAlerts.map(alert => (
                <AnomalyAlertCard key={alert.id} alert={alert} onDismiss={dismissGlobalAlert} />
                ))}
            </div>
          )}
          {renderPage()}
        </main>
        <FloatingActionButton {...fabActionsProps} />
        <BottomNavigationBar currentPage={currentPage} navigateTo={navigateTo} onMoreClick={() => setIsMorePanelOpen(true)} />
        {isMorePanelOpen && <MoreNavigationPanel isOpen={isMorePanelOpen} onClose={() => setIsMorePanelOpen(false)} navigateTo={navigateTo} currentPage={currentPage} />}
        {xaiModalData && <XAIModal isOpen={!!xaiModalData} onClose={() => setXaiModalData(null)} title={xaiModalContent.title}><p>{xaiModalContent.explanation}</p></XAIModal>}
        {toastData && <ToastNotification message={toastData.text} type={toastData.type} isVisible={!!toastData} onClose={() => setToastData(null)} />}
      </div>
    </ErrorBoundary>
  );
};
```
    </content>
  </change>
  <change>
    <file>components/shared/AppIcons.tsx</file>
    <description>Recreate AppIcons.tsx with valid React functional components for all SVG icons used or aliased in the application. This resolves a large number of syntax errors caused by corrupted content in the previous version of this file.</description>
    <content><![CDATA[
import React from 'react';

// --- Shared IconProps Interface ---
export interface IconProps {
  className?: string;
  title?: string; 
  fill?: string;
  strokeWidth?: string | number;
  [key: string]: any; // Allow any other prop to be more permissive for type checking
}

// --- Navigation & Core Icons ---

export const Squares2X2Icon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25A2.25 2.25 0 0113.5 8.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 15.75V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
  </svg>
);

export const HomeIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);
export const SmartHomeIcon = HomeIcon; 

export const HomeModernIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
  </svg>
);


export const TargetIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => ( 
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} {...props}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);
export const GoalsWidgetIcon = TargetIcon;


export const ListIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => ( 
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h7.5M8.25 12h7.5m-7.5 5.25h7.5M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 17.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
  </svg>
);
export const ListBulletIcon = ListIcon; 
export const TasksWidgetIcon = ListBulletIcon;
export const ListIconFamily = ListIcon; 
export const ListUnorderedIcon = ListIcon; 
export const ListOrderedIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => ( 
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2 6h.01M2 12h.01M2 18h.01" /> 
  </svg>
);


export const RepeatIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => ( 
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2.086a7.5 7.5 0 00-12.346-6.172M4.088 15.914a7.5 7.5 0 0012.346 6.172M20 20v-5h-.581" />
  </svg>
);
export const HabitsWidgetIcon = RepeatIcon;

export const HeartIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => ( 
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);
export const WellbeingScoreIcon = HeartIcon;
export const FoodIcon = HeartIcon;

export const HeartPulseIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 10.5h2.25V15H10.5V10.5h-3M16.5 10.5H18V15h-1.5v-2.25H15V15h-1.5v-4.5h3z" />
  </svg>
);

export const BookIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => ( 
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);
export const BookOpenIcon = BookIcon;
export const JournalIcon = BookIcon;
export const RecipeBookIcon = BookIcon;
export const UserGuideIcon = BookIcon;
export const ArticleIcon = BookIcon;

export const BrainIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => ( 
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846-.813a4.5 4.5 0 00-3.09 3.09zM18.25 12L17 14.25l-1.25-2.25L13.5 11l2.25-1.25L17 7.5l1.25 2.25L20.5 11l-2.25 1.25z" />
  </svg>
);

export const ChatBubbleLeftRightIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-2.184-2.183a1.125 1.125 0 00-.8-.331H6.75A2.25 2.25 0 014.5 15V6.75A2.25 2.25 0 016.75 4.5h7.5a2.25 2.25 0 012.25 2.25v2.25m0 0H15M3.75 15H7.5m9-6h3.75m-3.75 0a1.125 1.125 0 01-1.125-1.125V7.5c0-.621.504-1.125 1.125-1.125h.007" />
    </svg>
);
export const QAndAIcon = ChatBubbleLeftRightIcon;

export const ChatBubbleBottomCenterTextIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 16.023H7.977a4.5 4.5 0 01-4.5-4.5V6.75a4.5 4.5 0 014.5-4.5h3.968c1.968 0 3.74 1.02 4.783 2.581M16.023 16.023V21M16.023 16.023H18.75a3 3 0 003-3V9.75M7.977 12h6m-6 3h3.977M7.977 18h3.977m0 0v-4.5m0 4.5H12" />
    </svg>
);
export const QuoteIcon = ChatBubbleBottomCenterTextIcon; 

export const GlobeAltIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
  </svg>
);

export const PlusIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);
export const AddTopicIcon = PlusIcon;

export const CheckCircleIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const XCircleIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const LightbulbIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.354a15.055 15.055 0 01-4.5 0M12 18v-5.25m0 0a6.008 6.008 0 001.036-4.135M12 18v-5.25m0 0A6.008 6.008 0 0110.964 8.615m0 0A15.054 15.054 0 0112 3.75m0 0v.008m0 0H12m0 0L12 3.75M12 3.75L12 3.75m0 0A15.055 15.055 0 0116.5 8.615M12 3.75a15.055 15.055 0 00-4.5 4.865m9 0a15.055 15.055 0 01-4.5 4.865M12 3.75V8.615m0 0A6.006 6.006 0 0112 12.75m0 0v5.25" />
  </svg>
);
export const InterestsIcon = LightbulbIcon;
export const OfferingHelpIcon = LightbulbIcon;
export const TopicSuggestionIcon = LightbulbIcon;
export const LightBulbOutlineIcon = LightbulbIcon; 
export const AskAICon = LightbulbIcon; 

export const UserCircleIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
export const ProfileIcon = UserCircleIcon; 
export const AvatarPlaceholder = UserCircleIcon; 
export const SpeakerIcon = UserCircleIcon; 
export const ModerationRolesIcon = UserCircleIcon; 
export const RecognitionIcon = UserCircleIcon; 
export const AIPersonalizedFeedIcon = UserCircleIcon; 

export const StarIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.31h5.518a.562.562 0 01.329.89l-4.203 3.072a.563.563 0 00-.184.53l1.644 5.186a.563.563 0 01-.812.622l-4.39-3.196a.563.563 0 00-.666 0l-4.39 3.196a.563.563 0 01-.812-.622l1.644-5.186a.563.563 0 00-.184-.53L2.586 9.89a.562.562 0 01.329-.89h5.518a.563.563 0 00.475-.31L11.48 3.5z" />
  </svg>
);
export const AwardsIcon = StarIcon; 
export const RatingIcon = StarIcon;

export const ArrowRightIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);
export const ViewAllIcon = ArrowRightIcon;

export const PaperAirplaneIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
  </svg>
);

export const SparklesIconNav: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846-.813a4.5 4.5 0 00-3.09 3.09zM18.25 12L17 14.25l-1.25-2.25L13.5 11l2.25-1.25L17 7.5l1.25 2.25L20.5 11l-2.25 1.25z" />
  </svg>
);
export const AiIcon = SparklesIconNav; 
export const AiSparkleIcon = SparklesIconNav; 
export const QualityTimeIcon = SparklesIconNav; 
export const AIWelcomeIcon = SparklesIconNav; 
export const AISuggestionIcon = SparklesIconNav; 
export const FriendlyIconographyIcon = SparklesIconNav; 
export const AIConnectIcon = SparklesIconNav; 
export const AIExpertIcon = SparklesIconNav; 
export const InnovationIcon = SparklesIconNav; 
export const AISummaryIcon = SparklesIconNav; 
export const AISupportIcon = SparklesIconNav;
export const AIIntegrationIcon = SparklesIconNav;

export const WalletIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 12m18 0v6.243A2.25 2.25 0 0118.75 20.25H5.25A2.25 2.25 0 013 18.243V12m18 0V5.625A2.25 2.25 0 0018.75 3.375H5.25A2.25 2.25 0 003 5.625V12m15-3.375C18 8.25 16.025 9 13.5 9c-2.672 0-4.604-.81-5.625-1.625m11.25 0c.261.205.516.42.768.657m-11.25-.657a2.487 2.487 0 00-.768.657M3 12c0 1.24.983 2.25 2.22 2.25h13.56c1.238 0 2.22-1.01 2.22-2.25M5.25 12h13.5" />
  </svg>
);
export const CurrencyDollarIcon = WalletIcon;

export const ClockIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const PlayIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
  </svg>
);

export const AdjustmentsVerticalIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h3m-3 6h3m-3 6h3m-5.25-12h10.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25H5.25a2.25 2.25 0 01-2.25-2.25V8.25a2.25 2.25 0 012.25-2.25z" />
  </svg>
);
export const LevelIcon = AdjustmentsVerticalIcon; 
export const FilterAdjustIcon = AdjustmentsVerticalIcon; 
export const OrchestrationIcon = AdjustmentsVerticalIcon; 
export const PlatformIcon = AdjustmentsVerticalIcon; 
export const UITabsIcon = AdjustmentsVerticalIcon; 
export const SmartSuggestionsIcon = AdjustmentsVerticalIcon; 
export const UIToolsIcon = AdjustmentsVerticalIcon; 

export const SettingsIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.646.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.333.183-.582.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.137-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
export const CogIcon = SettingsIcon; 
export const AdminToolsIcon = CogIcon; 
export const AutomatedSystemsIcon = CogIcon; 
export const PersonalizationIcon = CogIcon; 

export const XMarkIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const ActivityLogIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => ( 
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 4.006 4.006 0 00-3.662-.138C11.453 2.046 10.232 2 9 2c-1.232 0-2.453.046-3.662.138a4.006 4.006 0 00-3.7 3.7 4.006 4.006 0 00-.138 3.662C2.046 10.547 2 11.768 2 13.5v1.293c0 .539.21.99.583 1.325l1.58 1.105A3.714 3.714 0 016.03 18.5H18a3 3 0 002.865-2.087c.22-.625.335-1.285.335-1.913V12z" />
  </svg>
);

export const BriefcaseIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.098a2.25 2.25 0 01-2.25 2.25h-12a2.25 2.25 0 01-2.25-2.25v-4.098m16.5 0a2.25 2.25 0 00-2.25-2.25h-12a2.25 2.25 0 00-2.25 2.25m16.5 0v-2.25A2.25 2.25 0 0016.5 9.75h-1.875a.375.375 0 11-.75 0h-1.875A2.25 2.25 0 009.75 12v2.25m6.75-4.5H9.75" />
  </svg>
);
export const CollaborationToolsIcon = BriefcaseIcon; 

export const UserGroupIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-3.741-3.741M21 12a9 9 0 11-18 0 9 9 0 0118 0zM15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);
export const RelationshipIcon = UserGroupIcon; 
export const FamilyIcon = UserGroupIcon; 
export const CommunityIcon = UserGroupIcon; 
export const GrowthIcon = UserGroupIcon; 
export const CreateEventsIcon = UserGroupIcon; 
export const FamilyTreeIcon = UserGroupIcon; 
export const MentorIcon = UserGroupIcon; 
export const StudyGroupsTabIcon = UserGroupIcon;
export const UsersIcon = UserGroupIcon;

export const TrashIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.56 0c.342.052.682.107 1.022.166m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

export const PencilIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
  </svg>
);
export const ReviewIcon = PencilIcon; 

export const PlayIconSquare: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
    </svg>
);
export const PlayCircleIcon = PlayIconSquare; 
export const WebinarsTabIcon = PlayCircleIcon;

export const PauseIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
  </svg>
);
export const PauseSpeakerIcon = PauseIcon; 

export const AcademicCapIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
  </svg>
);
export const LearningHubIcon = AcademicCapIcon; 
export const ExpertiseIcon = AcademicCapIcon; 
export const QuizIcon = AcademicCapIcon;
export const CourseIcon = AcademicCapIcon;
export const GrowingPlantIcon = AcademicCapIcon;

export const ChevronDownIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);
export const ArrowDownIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => ( 
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l-6.75-6.75M12 19.5l6.75-6.75" />
  </svg>
); 

export const ChevronUpIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
  </svg>
);
export const ArrowUpIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => ( 
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
  </svg>
); 

export const MicrophoneIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
  </svg>
);
export const SmartSpeakerIcon = MicrophoneIcon; 

export const CameraIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
  </svg>
);
export const SmartHomeCameraIcon = CameraIcon; 
export const AlbumIcon = CameraIcon; 
export const VideoIcon = CameraIcon; 

export const FunnelIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.572a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
  </svg>
);

export const MapPinIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);
export const MapIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => ( 
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m0-8.25L12.75 3m0 0L16.5 6.75M12.75 3v11.25" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 6.75V15m0-8.25L18.75 3m0 0L22.5 6.75M18.75 3v11.25" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 6.75L9 12m0 0l4.5-5.25M9 12v7.5m0-7.5L4.5 6.75M6 12a2.25 2.25 0 00-2.25 2.25v3.75a2.25 2.25 0 002.25 2.25h1.5a2.25 2.25 0 002.25-2.25v-3.75a2.25 2.25 0 00-2.25-2.25H6z" />
  </svg>
);


export const ChallengeIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => ( 
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
  </svg>
);
export const TrophyIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-4.5A3.375 3.375 0 0012.75 9.75H11.25A3.375 3.375 0 007.5 13.125V18.75m3.75 0A3.75 3.75 0 0012 22.5c1.892 0 3.518-.956 4.5-2.25m-9 0A3.75 3.75 0 007.5 22.5c-1.892 0-3.518-.956-4.5-2.25M12 12.75a3 3 0 100-6 3 3 0 000 6z" />
  </svg>
);
export const GiftIcon = TrophyIcon; 

export const DocumentArrowUpIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25" />
  </svg>
);
export const FileDownloadIcon = DocumentArrowUpIcon;

export const ClipboardListIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => ( 
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const LightbulbMultipleIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => ( 
    <LightbulbIcon className={className} {...props} />
);

export const PencilSquareIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
  </svg>
);
export const RichTextIcon = PencilSquareIcon; 

export const ShieldExclamationIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
  </svg>
);
export const AIModerationIcon = ShieldExclamationIcon; 

export const TrendingUpIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
  </svg>
);

export const DocumentTextIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);
export const ReportsIcon = DocumentTextIcon;


export const FolderIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
  </svg>
);
export const GroupFeaturesIcon = FolderIcon; 
export const SubCommunitiesIcon = FolderIcon; 

export const LinkIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
  </svg>
);
export const IntegrationsIcon = LinkIcon; 
export const AttachmentIcon = LinkIcon;

export const ResetIconFromApp: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => ( 
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);
export const ResetIcon = ResetIconFromApp; 

export const ArrowPathIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);
export const BugAntIcon = ArrowPathIcon; 

export const EyeIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
export const EyeSlashIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
  </svg>
);

export const TagIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
  </svg>
);

export const KeyIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
  </svg>
);

export const ServerStackIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
  </svg>
);
export const InfrastructureIcon = ServerStackIcon; 

export const DatabaseIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => ( 
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
  </svg>
);


export const CubeTransparentIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
  </svg>
);

export const ExclamationTriangleIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);

export const ArchiveBoxIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10.5 11.25h3M12 15V7.5m0 0a1.5 1.5 0 00-3 0m3 0a1.5 1.5 0 01-3 0m0 0a1.5 1.5 0 013 0m0 0H9.75m3 7.5H9.75M14.25 15h-3" />
  </svg>
);

export const SunIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  </svg>
);
export const MoonIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
  </svg>
);

export const RocketLaunchIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a6 6 0 01-7.38 5.84m2.56-5.84V3m6.12 3.033a6.005 6.005 0 00-5.84-5.84M3 15.591V21a6.002 6.002 0 005.84 5.84M14.37 15.59a6 6 0 017.38 5.84M18.375 3.033a6.006 6.006 0 00-5.84-5.84m5.84 5.84V3m-5.84 5.84H3" />
    </svg>
);

export const BookmarkOutlineIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c.1.128.22.256.339.386s.23.261.35.395l.356.371a8.378 8.378 0 011.247 5.46V18a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18V9.934a8.378 8.378 0 011.247-5.46l.356-.371a1.5 1.5 0 01.35-.395.858.858 0 01.339-.386M17.593 3.322L12 9.162 6.407 3.322m11.186 0L12 6.978l-5.593-3.656" />
  </svg>
);
export const BookmarkIcon = BookmarkOutlineIcon; 

export const BookmarkSolidIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M17.593 3.322c.1.128.22.256.339.386s.23.261.35.395l.356.371a8.378 8.378 0 011.247 5.46V18a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18V9.934a8.378 8.378 0 011.247-5.46l.356-.371a1.5 1.5 0 01.35-.395.858.858 0 01.339-.386L12 9.162l5.593-5.84z" />
  </svg>
);

export const FilmIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
  </svg>
);
export const MeetingsIcon = FilmIcon; 

export const ChartPieIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
  </svg>
);
export const GamificationIcon = ChartPieIcon; 
export const ChartBarIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A2.25 2.25 0 011.5 18.75v-5.625M3 13.125V3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v9.75M3 13.125H1.5m1.5 0H4.5m5.25 0V7.5H11.25m0 0V3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v16.5c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V7.5m5.25 0V3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v16.5c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V7.5m0 0H12.75m5.25 0H18" />
  </svg>
);


export const PlusCircleIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const ShieldCheckIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
  </svg>
);
export const PrivacyIcon = ShieldCheckIcon; 

export const SpeakerWaveIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5l.415-.207a.75.75 0 011.085.67V10.5m0 0h6m-6 0H6.375a1.125 1.125 0 01-1.125-1.125V6.375c0-.621.504-1.125 1.125-1.125H9.75m0 0H12m0 0V5.25A2.25 2.25 0 009.75 3H6.375A2.25 2.25 0 004.125 5.25v5.25c0 1.242 1.008 2.25 2.25 2.25H8.25M12 10.5a2.25 2.25 0 002.25 2.25h1.5A2.25 2.25 0 0018 10.5V7.5a2.25 2.25 0 00-2.25-2.25h-1.5m-3 0A2.25 2.25 0 009.75 3H9.75M15 19.5v-3.75m0 0a2.25 2.25 0 012.25-2.25h1.5A2.25 2.25 0 0121 15.75v3.75m-3.75 0h.375A2.25 2.25 0 0020.25 21v-3.75m-3.75 0H15M6.75 19.5v-3.75m0 0a2.25 2.25 0 00-2.25-2.25h-1.5A2.25 2.25 0 00.75 15.75v3.75m3-7.5H3.75m3 0h.375m0 0a2.25 2.25 0 012.25 2.25v5.25A2.25 2.25 0 016.75 21v-3.75m0 0H6.75" />
  </svg>
);

export const FireIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 4.5c-1.897 0-3.64.767-4.888 2.014M15.362 5.214C15.94 5.594 16.5 6 17.096 6c.68 0 1.217-.429 1.513-.976" />
  </svg>
);
export const BoltIcon = FireIcon; 

export const PowerIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
  </svg>
);

export const LockClosedIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

export const LockOpenIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m11.25 4.5H3.75V9A2.25 2.25 0 016 6.75h1.5" />
  </svg>
);

export const AirPurifierIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => ( 
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h12A2.25 2.25 0 0020.25 14.25V3M3.75 14.25h16.5m-16.5 0V21m16.5-6.75v6.75m0 0H3.75" />
  </svg>
);

export const ArrowRightOnRectangleIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
  </svg>
);

export const WrenchScrewdriverIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.217-.266.274-.627.149-.95l-.592-1.448a.75.75 0 00-1.342-.385l-.592 1.448c-.125.323-.069.684.149.95l2.496 3.03zM14.25 10.286c.832.832 2.176.832 3.008 0l.043-.043c.832-.832.832-2.176 0-3.008L14.25 4.5M11.42 15.17L14.25 10.286" />
  </svg>
);

export const ClipboardDocumentListIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-.668-.287-1.265-.779-1.68a1.99 1.99 0 00-2.196-.353l-6.357 3.318a1.99 1.99 0 00-1.126 1.789v6.975a1.99 1.99 0 001.126 1.789l6.357 3.318a1.99 1.99 0 002.196-.353c.492-.414.779-1.012.779-1.68v-1.177M15.25 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  </svg>
);

export const ClipboardDocumentCheckIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75M9.06 4.5l1.414-1.414a1.5 1.5 0 112.121 2.121L9.06 7.5M9.06 4.5L7.5 6M9.06 4.5l.75 .75M17.25 9L12 14.25l-2.25-2.25" />
  </svg>
);
export const SharingTemplatesIcon = ClipboardDocumentCheckIcon; 

export const PaintBrushIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
  </svg>
);
export const UiUxIcon = PaintBrushIcon; 
export const ResponsiveDesignIcon = PaintBrushIcon; 
export const AttractiveDesignIcon = PaintBrushIcon; 

export const BellIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
  </svg>
);
export const NotificationSystemIcon = BellIcon; 
export const NotificationIcon = BellIcon; 
export const AlertIcon = BellIcon; 

export const QuestionMarkCircleIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
  </svg>
);

export const ActivityFeedIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => ( 
    <ListBulletIcon className={className} {...props} />
);

export const ChatBubbleOvalLeftEllipsisIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.306 3 12c0 4.556 4.03 8.25 9 8.25z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 12h.008v.008h-.008V12zm3 0h.008v.008h-.008V12zm3 0h.008v.008h-.008V12zM7.5 12h.008v.008H7.5V12z" />
  </svg>
);
export const ForumIcon = ChatBubbleOvalLeftEllipsisIcon; 
export const ForumTabIcon = ChatBubbleOvalLeftEllipsisIcon; 

export const PaperClipIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.122 2.122l7.81-7.81" />
  </svg>
);

export const CalendarDaysIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
  </svg>
);

export const MegaphoneIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 3.94A1.5 1.5 0 0112 5.25v13.5A1.5 1.5 0 0110.34 20.06L7.012 16.5H5.25A2.25 2.25 0 013 14.25V9.75A2.25 2.25 0 015.25 7.5h1.762l3.328-3.56zM16.5 12c0-1.828-.89-3.525-2.336-4.598m2.336 4.598c0 1.828-.89 3.525-2.336 4.598m2.336-4.598L19.5 12m-3-2.399A7.502 7.502 0 0016.5 12M21 12a8.955 8.955 0 01-2.998 6.428" />
  </svg>
);

export const BuildingOfficeIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h6M9 12h6m-6 5.25h6M5.25 6.75h.008v.008H5.25V6.75zm0 5.25h.008v.008H5.25V12zm0 5.25h.008v.008H5.25v-.008zm13.5-5.25h.008v.008h-.008V12zm0 5.25h.008v.008h-.008v-.008zm0-10.5h.008v.008h-.008V6.75z" />
  </svg>
);

export const ScaleIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.286-1.64A1.125 1.125 0 0021 3.252V3L12 3l-9 0v.252c0 .503.324.964.814 1.098l2.286 1.64m13.5 0V6.75h-1.5V4.97m-10.5 0V6.75h-1.5V4.97M12 6.75v10.5" />
    </svg>
);

export const ChevronLeftIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

export const BedIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5V18M3 7.5V18M3 16.875h18M3 12h18m-9-3.75h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
  </svg>
);

// --- New Icons Added ---
export const SearchIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);
export const MagnifyingGlassIcon = SearchIcon; 

export const InformationCircleIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
  </svg>
);

export const CalculatorIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.1 0-2.15.166-3.203.46-1.052.295-2.052.738-2.908 1.32C5.042 4.59 4.655 5.012 4.275 5.475c-.38.462-.696.968-.948 1.495A8.985 8.985 0 003 9.75c0 .792.107 1.558.31 2.282C3.517 12.75 3.91 13.35 4.375 13.875c.465.525.988.978 1.548 1.362a9.033 9.033 0 001.872.84C8.41 16.53 9.06 16.75 9.75 17.008v2.25a2.25 2.25 0 002.25 2.25h.008a2.25 2.25 0 002.25-2.25v-2.25c.69-.258 1.34-.478 1.973-.732.632-.255 1.23-.577 1.782-.947a9.007 9.007 0 001.484-1.23c.41-.47.745-.977 1-1.513A9.016 9.016 0 0021 9.75c0-.792-.107-1.558-.31-2.282-.202-.724-.49-1.392-.842-1.995a8.996 8.996 0 00-1.176-1.618c-.44-.54-.923-1.002-1.435-1.395A9.015 9.015 0 0012 2.25z" />
  </svg>
);

export const RobotIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.03 1.121 0 1.131.094 1.976 1.057 1.976 2.192V7.5M8.25 7.5h7.5M8.25 7.5V9m7.5 V9m-7.5 0h.008v.008H8.25V9zm0 3h.008v.008H8.25v-.008zm0 3h.008v.008H8.25v-.008zm0 3h.008v.008H8.25v-.008zm3 0h.008v.008h-.008v-.008zm0-3h.008v.008h-.008v-.008zm0-3h.008v.008h-.008v-.008zm0-3h.008v.008h-.008V9zm3 9h.008v.008h-.008v-.008zm0-3h.008v.008h-.008v-.008zm0-3h.008v.008h-.008v-.008zm0-3h.008v.008h-.008V9zm-7.5 9h7.5m-7.5 0A1.5 1.5 0 016.75 18v-1.5m9 1.5A1.5 1.5 0 0017.25 18v-1.5M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
  </svg>
);

export const ShareIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
  </svg>
);

export const PuzzlePieceIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 7.756a4.5 4.5 0 100 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const PhoneIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);

export const UserPlusIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
  </svg>
);

export const UserMinusIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 19.5v-3m0 0v-3m0 3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
  </svg>
);

export const RssIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 19.5v-.75c0-.935.375-1.837.937-2.499l.387-.44c.19-.215.356-.45.496-.703.14-.252.21-.528.21-.808v-.75c0-.935-.375-1.837-.937-2.499l-.387-.44a3.75 3.75 0 00-4.995 0l-.387.44c-.562.662-.937 1.564-.937 2.499v.75c0 .28.07.556.21.808.14.253.306.488.496.703l.387.44c.562.662.937 1.564.937 2.499v.75M19.5 19.5v-.75c0-2.008-.703-3.896-1.859-5.367l-.387-.44a7.503 7.503 0 00-10.51 0l-.387.44C5.203 14.854 4.5 16.742 4.5 18.75v.75" />
  </svg>
);

export const BoldIcon: React.FC<IconProps> = ({ className = "w-5 h-5", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h10c2.21 0 4 1.79 4 4s-1.79 4-4 4H4V4zm0 8h12c2.21 0 4 1.79 4 4s-1.79 4-4 4H4v-8z" />
  </svg>
);

export const ItalicIcon: React.FC<IconProps> = ({ className = "w-5 h-5", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 4L6 20M18 4l-4 16" />
  </svg>
);

export const FriendSystemIcon: React.FC<IconProps> = UserGroupIcon;

// Icons for Phase 3: Advanced Collaboration Tools
export const DocumentDuplicateIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75M9.06 4.5l1.414-1.414a1.5 1.5 0 112.121 2.121L9.06 7.5M9.06 4.5L7.5 6M9.06 4.5l.75.75M17.25 9V5.25A2.25 2.25 0 0015 3H6.75A2.25 2.25 0 004.5 5.25v13.5A2.25 2.25 0 006.75 21h8.25a2.25 2.25 0 002.25-2.25V17.25M16.5 12.75H12.75" />
  </svg>
);

export const ListCheckIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M20.25 12H3.75m16.5 4.5H3.75m16.5 4.5H3.75" />
  </svg>
);

export const ArrowsPointingOutIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
  </svg>
);

export const DevicePhoneMobileIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75A2.25 2.25 0 0015.75 1.5h-2.25m-3.75 0h3.75M10.5 1.5H12m0 0V3m0 0H9.75m2.25 0H12m0 0V1.5m0 0H10.5m2.25-1.5V3m0 18.75V16.5M12 16.5h.008v.008H12v-.008Z" />
  </svg>
);

export const WifiIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038C9.565 14.22 11.254 14 12.5 14c1.247 0 2.936.22 4.212.962m-8.424 0c.29.16.596.305.915.433m7.594-.433a9.017 9.017 0 01-.915.433m-8.424 0V12a2.25 2.25 0 012.25-2.25h3.75a2.25 2.25 0 012.25 2.25v3.038m0 0V12a2.25 2.25 0 00-2.25-2.25h-3.75a2.25 2.25 0 00-2.25 2.25v3.038m0 0A17.903 17.903 0 0012.5 21c1.342 0 2.65-.156 3.906-.445M3.691 10.503A17.9 17.9 0 0112.5 3c1.342 0 2.65.156 3.906.445m0 0a17.903 17.903 0 014.803 6.61M3.691 10.503a17.9 17.9 0 00-1.042 6.553M19.212 17.056a17.9 17.9 0 01-1.042-6.553m-14.479 0a2.998 2.998 0 012.998-2.998h8.964a2.998 2.998 0 012.998 2.998M5.809 15.038a3.734 3.734 0 012.479-1.288M15.712 13.75a3.734 3.734 0 012.479 1.288" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12.5 16.125a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" />
  </svg>
);

// Added AdjustmentsVerticalIcon as BlindsIcon placeholder
export const BlindsIcon: React.FC<IconProps> = AdjustmentsVerticalIcon;
// Added WrenchScrewdriverIcon as ApplianceIcon placeholder
export const ApplianceIcon: React.FC<IconProps> = WrenchScrewdriverIcon;

// Added from Smart Home Page (used by DeviceCard)
export { CogIcon as SmartHomeCogIcon }; // Alias to avoid conflict
export { PlayIcon as PlaySpeakerIcon }; // Alias for speaker play
export { PauseIcon as PauseSpeakerIcon }; // Alias for speaker pause
```
    </content>
  </change>
  <change>
    <file>components/pages/goals/GoalsPage.tsx</file>
    <description>Correct import for AddGoalModalProps alias. Change filterStatus type casting to `Goal['status'] | 'all'`. Update type imports for Goal and LearningSuggestion to be from 'types/learningTypes.ts'.</description>
    <content><![CDATA[
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { toPersianDigits, parseJsonFromString } from '../../../utils';
import { 
  TargetIcon as PageIcon, 
  PlusIcon, 
  CheckCircleIcon as CompletedIcon, 
  AdjustmentsVerticalIcon,
  SparklesIconNav as AiIcon,
  LightbulbIcon,
  TrashIcon,
  PencilIcon,
  PlayIcon,
  PauseIcon,
  BookIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  AcademicCapIcon,
  ChartPieIcon // For dashboard stats
} from '../../shared/AppIcons';
import AddGoalModal, { AddGoalModalProps as AddGoalModalActualProps } from './AddGoalModal'; 
import GoalCard from './GoalCard'; 
import LoadingSpinner from '../../shared/LoadingSpinner';
import ToastNotification from '../../shared/ToastNotification';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { LearningPath, LearningContent, LearningSuggestion, Goal, GoalActionPlanTask } from '../../../types/learningTypes'; 
import { PageName } from '../../../App';
import AISmartLearningSuggestionCard from '../../learning/AISmartLearningSuggestionCard';
import CollapsibleSection from '../../shared/CollapsibleSection';


const AI_MODEL_NAME = 'gemini-2.5-flash-preview-04-17';
const GOALS_LOCAL_STORAGE_KEY = 'lifeOrchestrator_goalsData_v2';


export interface GoalsPageProps {
    isAddGoalModalOpen: boolean;
    openAddGoalModal: () => void;
    closeAddGoalModal: () => void;
    navigateTo: (pageName: PageName | string, params?: any) => void;
    learningPaths?: LearningPath[];
    learningContent?: LearningContent[];
}

const GoalsPage: React.FC<GoalsPageProps> = ({ 
    isAddGoalModalOpen, 
    openAddGoalModal, 
    closeAddGoalModal, 
    navigateTo,
    learningPaths = [],
    learningContent = [] 
}) => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [toast, setToast] = useState<{id: number, message: string, type: 'success'|'error'|'info'} | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filterStatus, setFilterStatus] = useState<Goal['status'] | 'all'>('active'); 
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const ai = process.env.API_KEY ? new GoogleGenAI({ apiKey: process.env.API_KEY }) : null;
  
  const showToast = useCallback((message: string, type: 'success'|'error'|'info' = 'info') => {
    setToast({ id: Date.now(), message: toPersianDigits(message), type });
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Load goals from localStorage
  useEffect(() => {
    setIsLoading(true);
    try {
        const storedGoals = localStorage.getItem(GOALS_LOCAL_STORAGE_KEY);
        if (storedGoals) {
            setGoals(JSON.parse(storedGoals));
        } else {
            const mockGoals: Goal[] = [
              { id: 'g1', title: toPersianDigits('یادگیری زبان فرانسه تا سطح B1'), progress: 65, status: 'active', category: "یادگیری", dueDate: "1403-09-30", description: toPersianDigits("توانایی مکالمه روان در مورد موضوعات روزمره و درک مطلب خوب."), learningSuggestions: [ {id: 'lsg1', type:'path', itemId:'lp-french', title:toPersianDigits('مسیر کامل یادگیری زبان فرانسه'), description:toPersianDigits('از مبتدی تا پیشرفته زبان فرانسه را بیاموزید.'), sourceModule:'Goals', triggerContext:toPersianDigits('هدف: یادگیری فرانسه')} ] },
              { id: 'g2', title: toPersianDigits('افزایش آمادگی جسمانی'), progress: 30, status: 'active', category: "سلامتی", dueDate: "1403-06-30", description: toPersianDigits("حداقل ۳ بار در هفته ورزش و رعایت رژیم غذایی سالم."), actionPlanTasks: [{id: 'g2t1', title: toPersianDigits('ثبت نام در باشگاه'), completed: true, estimatedDurationMinutes: 60}, {id: 'g2t2', title: toPersianDigits('برنامه ورزشی هفتگی'), completed: false, estimatedDurationMinutes: 30}] },
            ];
            setGoals(mockGoals);
        }
    } catch (error) {
        console.error("Failed to load goals from localStorage:", error);
        showToast(toPersianDigits("خطا در بارگذاری اهداف از حافظه محلی."), "error");
    }
    setIsLoading(false);
  }, [showToast]);

  // Save goals to localStorage whenever they change
  useEffect(() => {
    try {
        localStorage.setItem(GOALS_LOCAL_STORAGE_KEY, JSON.stringify(goals));
    } catch (error) {
        console.error("Failed to save goals to localStorage:", error);
        showToast(toPersianDigits("خطا در ذخیره اهداف در حافظه محلی."), "error");
    }
  }, [goals, showToast]);


  const handleSaveGoal = (goalData: Omit<Goal, 'id' | 'progress' | 'status'>) => {
    if (editingGoal) {
      setGoals(goals.map(g => g.id === editingGoal.id ? { ...editingGoal, ...goalData, progress: g.progress, status: g.status } : g));
      showToast(toPersianDigits("هدف با موفقیت ویرایش شد."), "success");
    } else {
      const newGoal: Goal = {
        ...goalData,
        id: String(Date.now()),
        progress: 0,
        status: 'active', 
      };
      setGoals(prevGoals => [newGoal, ...prevGoals]);
      showToast(toPersianDigits("هدف جدید با موفقیت اضافه شد."), "success");
    }
    closeAddGoalModal();
    setEditingGoal(null);
  };
  
  const handleEditGoal = (goal: Goal) => {
    setEditingGoal(goal);
    openAddGoalModal();
  };

  const handleDeleteGoal = (goalId: string) => {
    if (window.confirm(toPersianDigits("آیا از حذف این هدف مطمئن هستید؟"))) {
      setGoals(goals.filter(g => g.id !== goalId));
      showToast(toPersianDigits("هدف حذف شد."), "info");
    }
  };

  const handleToggleStatus = (goalId: string, newStatus: Goal['status']) => {
    setGoals(goals.map(g => g.id === goalId ? { ...g, status: newStatus, progress: newStatus === 'completed' ? 100 : g.progress } : g));
    if (newStatus === 'completed') {
      showToast(toPersianDigits("تبریک! هدف شما تکمیل شد."), "success");
    }
  };
  
  const handleUpdateProgress = (goalId: string, newProgress: number) => {
     setGoals(goals.map(g => g.id === goalId ? { ...g, progress: newProgress, status: newProgress === 100 ? 'completed' : g.status } : g));
  };

  const handleNavigateToLearningItem = (type: LearningSuggestion['type'], itemId: string) => {
    if (navigateTo) {
        navigateTo('Learning', { view: 'detail', type, itemId });
    } else {
      console.warn("navigateTo function is not provided to GoalsPage");
      alert(toPersianDigits(`مشاهده ${type === 'path' ? 'مسیر' : 'محتوا'} با شناسه ${itemId} (شبیه‌سازی شده)`));
    }
  };

  const filteredGoals = goals.filter(goal => {
    const statusMatch = filterStatus === 'all' || goal.status === filterStatus;
    const categoryMatch = filterCategory === 'all' || goal.category === filterCategory;
    return statusMatch && categoryMatch;
  });
  
  const goalCategoriesForFilter = useMemo(() => {
    const uniqueCategories = new Set(goals.map(g => g.category).filter((category): category is string => typeof category === 'string' && category.trim() !== ''));
    return Array.from(uniqueCategories).map(cat => ({value: cat, label: cat }));
  }, [goals]);

  // Productivity Stats
  const totalGoals = goals.length;
  const activeGoalsCount = goals.filter(g => g.status === 'active').length;
  const completedGoalsCount = goals.filter(g => g.status === 'completed').length;
  const averageProgress = totalGoals > 0 ? Math.round(goals.reduce((sum, g) => sum + g.progress, 0) / totalGoals) : 0;


  return (
    <div className="page">
      {toast && <ToastNotification message={toast.message} type={toast.type} isVisible={!!toast} onClose={() => setToast(null)} />}
      <AddGoalModal 
        isOpen={isAddGoalModalOpen} 
        onClose={() => {closeAddGoalModal(); setEditingGoal(null);}} 
        onSaveGoal={handleSaveGoal} 
        initialGoalData={editingGoal}
      />

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
        <div className="flex items-center">
            <PageIcon className="w-7 h-7 text-indigo-600 mr-3 rtl:ml-3 rtl:mr-0" />
            <h1 className="text-2xl font-semibold text-gray-800">{toPersianDigits("اهداف من")}</h1>
        </div>
        <button
            onClick={() => { setEditingGoal(null); openAddGoalModal(); }}
            className="w-full sm:w-auto flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition-colors shadow hover:shadow-md"
        >
            <PlusIcon className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />
            {toPersianDigits("افزودن هدف جدید")}
        </button>
      </div>

       {/* Productivity Dashboard Section */}
      <CollapsibleSection title="داشبورد بهره‌وری اهداف" icon={<ChartPieIcon />} isOpen={true} onToggle={() => {}} className="mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-200/80" titleColorClass="text-gray-700">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
          <div className="p-2 bg-indigo-50 rounded-md">
            <p className="font-semibold text-indigo-700 text-lg">{toPersianDigits(String(totalGoals))}</p>
            <p className="text-gray-600">{toPersianDigits("کل اهداف")}</p>
          </div>
          <div className="p-2 bg-green-50 rounded-md">
            <p className="font-semibold text-green-700 text-lg">{toPersianDigits(String(activeGoalsCount))}</p>
            <p className="text-gray-600">{toPersianDigits("فعال")}</p>
          </div>
          <div className="p-2 bg-blue-50 rounded-md">
            <p className="font-semibold text-blue-700 text-lg">{toPersianDigits(String(completedGoalsCount))}</p>
            <p className="text-gray-600">{toPersianDigits("تکمیل شده")}</p>
          </div>
          <div className="p-2 bg-yellow-50 rounded-md">
            <p className="font-semibold text-yellow-700 text-lg">{toPersianDigits(String(averageProgress))}%</p>
            <p className="text-gray-600">{toPersianDigits("میانگین پیشرفت")}</p>
          </div>
        </div>
      </CollapsibleSection>


      <button onClick={() => setShowFilters(!showFilters)} className="w-full flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-gray-200 mb-4 text-sm text-gray-700 hover:bg-gray-50">
        <span className="font-medium">{toPersianDigits("فیلترها و مرتب‌سازی")}</span>
        {showFilters ? <ChevronUpIcon className="w-5 h-5"/> : <ChevronDownIcon className="w-5 h-5"/>}
      </button>

      {showFilters && (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <label htmlFor="filterStatus" className="block text-xs font-medium text-gray-700 mb-1">{toPersianDigits("وضعیت:")}</label>
            <select id="filterStatus" value={filterStatus} onChange={e => setFilterStatus(e.target.value as Goal['status'] | 'all')} className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white">
              <option value="all">{toPersianDigits("همه وضعیت‌ها")}</option>
              <option value="active">{toPersianDigits("فعال")}</option>
              <option value="paused">{toPersianDigits("متوقف شده")}</option>
              <option value="completed">{toPersianDigits("تکمیل شده")}</option>
              <option value="planning">{toPersianDigits("در حال برنامه‌ریزی")}</option>
            </select>
          </div>
          <div>
            <label htmlFor="filterCategory" className="block text-xs font-medium text-gray-700 mb-1">{toPersianDigits("دسته‌بندی:")}</label>
            <select id="filterCategory" value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white">
              <option value="all">{toPersianDigits("همه دسته‌بندی‌ها")}</option>
              {goalCategoriesForFilter.map(cat => <option key={cat.value} value={cat.value}>{toPersianDigits(cat.label)}</option>)}
            </select>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-64"><LoadingSpinner size="lg" /></div>
      ) : filteredGoals.length === 0 ? (
         <div className="text-center py-10 bg-gray-100 rounded-xl shadow-inner border border-gray-200 min-h-[300px] flex flex-col justify-center items-center">
            <PageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4 opacity-70" />
            <p className="text-gray-600 font-semibold">{toPersianDigits("هنوز هدفی با این فیلترها یافت نشد.")}</p>
            <p className="text-sm text-gray-500 mt-1">{toPersianDigits("یک هدف جدید اضافه کنید یا فیلترها را تغییر دهید.")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGoals.map(goal => (
            <GoalCard 
              key={goal.id} 
              goal={goal} 
              onEdit={handleEditGoal}
              onDelete={handleDeleteGoal}
              onToggleStatus={handleToggleStatus}
              onUpdateProgress={handleUpdateProgress}
              navigateToLearningItem={handleNavigateToLearningItem}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GoalsPage;
```
  </change>
  <change>
    <file>components/pages/goals/GoalCard.tsx</file>
    <description>Correct import for Goal from 'types/learningTypes'. Update LearningSuggestion type for onViewSuggestion to `LearningSuggestion['type']`. Ensure onToggleStatus prop correctly matches the Goal['status'] type which now includes 'planning'.</description>
    <content><![CDATA[
import React, { useState } from 'react';
import { toPersianDigits } from '../../../utils';
import { 
    TargetIcon as DefaultGoalIcon, 
    SparklesIconNav as SparklesIcon, 
    PencilIcon, 
    TrashIcon, 
    PlayIcon, 
    PauseIcon,
    BookIcon, 
    BriefcaseIcon, 
    HeartIcon, 
    WalletIcon, 
    CheckCircleIcon,
    ChevronDownIcon, 
    ChevronUpIcon,   
    AcademicCapIcon, 
} from '../../shared/AppIcons';
import { Goal, LearningSuggestion } from '../../../types/learningTypes'; 
import AISmartLearningSuggestionCard from '../../learning/AISmartLearningSuggestionCard';
import { PageName } from '../../../App';

interface GoalCardProps {
  goal: Goal; 
  onEdit: (goal: Goal) => void;
  onDelete: (goalId: string) => void;
  onToggleStatus: (goalId: string, newStatus: Goal['status']) => void; 
  onUpdateProgress?: (goalId: string, newProgress: number) => void;
  navigateToLearningItem?: (type: LearningSuggestion['type'], itemId: string) => void; 
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, onEdit, onDelete, onToggleStatus, onUpdateProgress, navigateToLearningItem }) => {
  const [showSkills, setShowSkills] = useState(false);
  
  const getCategoryIcon = (category?: string) => {
    const iconClass = "w-5 h-5"; 
    switch (category) {
        case "یادگیری": return <BookIcon className={`${iconClass} text-blue-500`} />;
        case "شغلی": return <BriefcaseIcon className={`${iconClass} text-purple-500`} />;
        case "سلامتی": return <HeartIcon className={`${iconClass} text-red-500`} />;
        case "مالی": return <WalletIcon className={`${iconClass} text-green-500`} />;
        case "سفر": return <DefaultGoalIcon className={`${iconClass} text-cyan-500`} />; 
        case "رشد شخصی": return <DefaultGoalIcon className={`${iconClass} text-teal-500`} />; 
        case "روابط": return <DefaultGoalIcon className={`${iconClass} text-pink-500`} />; 
        case "پروژه خلاق": return <DefaultGoalIcon className={`${iconClass} text-orange-500`} />; 
        default: return <DefaultGoalIcon className={`${iconClass} text-indigo-500`} />;
    }
  };

  const progressColorClass = () => {
    if (goal.progress >= 80) return 'bg-green-500';
    if (goal.progress >= 50) return 'bg-blue-500';
    if (goal.progress >= 20) return 'bg-yellow-500';
    return 'bg-indigo-500'; 
  };
  
  const isOverdue = goal.dueDate && new Date(goal.dueDate) < new Date(new Date().setHours(0,0,0,0)) && goal.status !== 'completed';

  return (
    <div className={`goal-card bg-white p-4 sm:p-5 rounded-xl shadow-md border ${isOverdue ? 'border-red-400 bg-red-50/50' : 'border-gray-200 hover:border-indigo-300'} transition-all duration-300`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center min-w-0"> 
          <div className={`p-2 rounded-full mr-3 rtl:ml-3 rtl:mr-0 ${goal.status === 'completed' ? 'bg-gray-200' : 'bg-indigo-100'}`}>
            {getCategoryIcon(goal.category)}
          </div>
          <div className="flex-grow min-w-0"> 
            <h3 className={`text-md sm:text-lg font-semibold truncate ${goal.status === 'completed' ? 'text-gray-500 line-through' : 'text-indigo-700'}`}>{toPersianDigits(goal.title)}</h3>
            {goal.category && <p className="text-xs text-gray-500">{toPersianDigits(goal.category)}</p>}
          </div>
        </div>
        {goal.dueDate && <p className={`text-xs ${isOverdue ? 'text-red-600 font-semibold' : 'text-gray-500'} whitespace-nowrap`}>{toPersianDigits(`سررسید: ${new Date(goal.dueDate).toLocaleDateString('fa-IR')}`)}</p>}
      </div>

      {goal.description && <p className="text-sm text-gray-600 mb-3 leading-relaxed line-clamp-2">{toPersianDigits(goal.description)}</p>}

      {goal.status !== 'completed' && (
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>{toPersianDigits("پیشرفت")}</span>
            <span>{`${toPersianDigits(String(goal.progress))}%`}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 relative overflow-hidden">
            <div
              className={`h-2.5 rounded-full transition-all duration-500 ease-out ${progressColorClass()}`}
              style={{ width: `${goal.progress}%` }}
              role="progressbar"
              aria-valuenow={goal.progress}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
          </div>
        </div>
      )}
      {goal.status === 'completed' && (
        <div className="text-center py-2 my-2 bg-green-50 text-green-700 rounded-md text-sm font-medium flex items-center justify-center">
            <CheckCircleIcon className="w-5 h-5 ml-2"/> {toPersianDigits("این هدف تکمیل شده است!")}
        </div>
      )}

      {goal.aiNextStep && goal.status !== 'completed' && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <h4 className="text-xs font-semibold text-indigo-600 mb-1 flex items-center">
              <SparklesIcon className="w-4 h-4 mr-1.5 text-yellow-500" />
              {toPersianDigits("قدم بعدی پیشنهادی هوش مصنوعی:")}
          </h4>
          <p className="text-xs text-gray-600">{toPersianDigits(goal.aiNextStep)}</p>
          {goal.aiNextStepRationale && <p className="text-[10px] text-gray-500 italic mt-0.5">{toPersianDigits(`(${goal.aiNextStepRationale})`)}</p>}
        </div>
      )}

      {goal.learningSuggestions && goal.learningSuggestions.length > 0 && goal.status !== 'completed' && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <button
            onClick={() => setShowSkills(!showSkills)}
            className="w-full flex justify-between items-center text-xs font-semibold text-sky-600 hover:text-sky-700 py-1"
            aria-expanded={showSkills}
          >
            <span className="flex items-center">
              <AcademicCapIcon className="w-4 h-4 mr-1.5" />
              {toPersianDigits("مهارت‌های مورد نیاز پیشنهادی AI")}
            </span>
            {showSkills ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />}
          </button>
          {showSkills && (
            <div className="mt-2 space-y-2">
              {goal.learningSuggestions.map(suggestion => (
                <AISmartLearningSuggestionCard 
                  key={suggestion.id} 
                  suggestion={suggestion} 
                  onViewSuggestion={(type, itemId) => navigateToLearningItem && navigateToLearningItem(type, itemId)}
                />
              ))}
            </div>
          )}
        </div>
      )}


      <div className="mt-4 flex flex-wrap gap-2 justify-end text-xs">
        {goal.status !== 'completed' && (
          <>
            <button onClick={() => onEdit(goal)} className="py-1.5 px-3 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded-md transition-colors flex items-center">
              <PencilIcon className="w-3.5 h-3.5 mr-1"/>{toPersianDigits("ویرایش")}
            </button>
            <button 
              onClick={() => onToggleStatus(goal.id, goal.status === 'active' ? 'paused' : 'active')} 
              className={`py-1.5 px-3 rounded-md transition-colors flex items-center ${goal.status === 'paused' ? 'bg-green-100 hover:bg-green-200 text-green-700' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
              >
              {goal.status === 'paused' ? <PlayIcon className="w-3.5 h-3.5 mr-1"/> : <PauseIcon className="w-3.5 h-3.5 mr-1"/>}
              {toPersianDigits(goal.status === 'paused' ? "فعال کردن" : "متوقف کردن")}
            </button>
            <button onClick={() => onToggleStatus(goal.id, 'completed')} className="py-1.5 px-3 bg-teal-100 hover:bg-teal-200 text-teal-700 rounded-md transition-colors flex items-center">
                <CheckCircleIcon className="w-3.5 h-3.5 mr-1"/>{toPersianDigits("تکمیل هدف")}
            </button>
          </>
        )}
        <button onClick={() => onDelete(goal.id)} className="py-1.5 px-3 bg-red-100 hover:bg-red-200 text-red-700 rounded-md transition-colors flex items-center">
          <TrashIcon className="w-3.5 h-3.5 mr-1"/>{toPersianDigits("حذف")}
        </button>
      </div>
    </div>
  );
};

export default GoalCard;
```
    </content>
  </change>
  <change>
    <file>components/learning/AISmartLearningSuggestionCard.tsx</file>
    <description>Adjust onViewSuggestion prop in AISmartLearningSuggestionCard to accept the broader `LearningSuggestion['type']` which includes 'exercise' and 'challenge'. Update the icon logic to reflect this, providing a default icon for new types.</description>
    <content><![CDATA[
import React from 'react';
import { toPersianDigits } from '../../utils';
import { LearningSuggestion } from '../../types/learningTypes';
import { LightbulbIcon, BookIcon, AcademicCapIcon, ArrowRightIcon, TrophyIcon as ChallengeIcon, PencilIcon as ExerciseIcon } from '../shared/AppIcons'; // Added ChallengeIcon, ExerciseIcon
import { PageName } from '../../App';

interface AISmartLearningSuggestionCardProps {
  suggestion: LearningSuggestion;
  onViewSuggestion: (type: LearningSuggestion['type'], itemId: string) => void; 
  onDismissSuggestion?: (suggestionId: string) => void; // Optional: if dismissal is handled locally
}

const AISmartLearningSuggestionCard: React.FC<AISmartLearningSuggestionCardProps> = ({
  suggestion,
  onViewSuggestion,
  onDismissSuggestion,
}) => {
  const IconComponent = 
    suggestion.type === 'path' ? AcademicCapIcon : 
    suggestion.type === 'exercise' ? ExerciseIcon :
    suggestion.type === 'challenge' ? ChallengeIcon :
    BookIcon; // Default for content

  return (
    <div className="bg-sky-50 p-3.5 rounded-lg shadow-sm border border-sky-200 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 p-2 bg-sky-100 rounded-full text-sky-600">
          <LightbulbIcon className="w-5 h-5" />
        </div>
        <div className="flex-grow min-w-0">
          <h4 className="text-sm font-semibold text-sky-700 mb-1">{toPersianDigits("پیشنهاد یادگیری هوشمند")}</h4>
          <p className="text-xs text-gray-600 mb-1">
            {toPersianDigits(`برای کمک به شما در "${suggestion.triggerContext}", یادگیری زیر پیشنهاد می‌شود:`)}
          </p>
          <div 
            className="mt-2 p-2.5 bg-white rounded-md border border-sky-300 cursor-pointer hover:bg-sky-100 transition-colors"
            onClick={() => onViewSuggestion(suggestion.type, suggestion.itemId)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && onViewSuggestion(suggestion.type, suggestion.itemId)}
          >
            <div className="flex items-center">
              <IconComponent className="w-4 h-4 text-sky-600 mr-2 rtl:ml-2 rtl:mr-0 flex-shrink-0" />
              <span className="text-xs font-medium text-sky-700 truncate">{toPersianDigits(suggestion.title)}</span>
            </div>
            {suggestion.description && <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">{toPersianDigits(suggestion.description)}</p>}
          </div>
        </div>
      </div>
      <div className="mt-2.5 flex justify-end items-center gap-2">
        {onDismissSuggestion && (
          <button 
            onClick={() => onDismissSuggestion(suggestion.id)}
            className="text-xs text-gray-500 hover:text-gray-700 py-1 px-2 rounded-md"
          >
            {toPersianDigits("نادیده گرفتن")}
          </button>
        )}
        <button
          onClick={() => onViewSuggestion(suggestion.type, suggestion.itemId)}
          className="flex items-center text-xs bg-sky-500 hover:bg-sky-600 text-white py-1 px-2.5 rounded-md transition-colors"
        >
          {toPersianDigits("مشاهده جزئیات")}
          <ArrowRightIcon className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0 transform scale-x-[-1]" />
        </button>
      </div>
    </div>
  );
};

export default AISmartLearningSuggestionCard;
```
    </content>
  </change>
  <change>
    <file>components/pages/tasks/EditTaskModal.tsx</file>
    <description>Update Task type import path to `../../../types/learningTypes`. Add estimatedDurationMinutes field to the form and saving logic. Ensure `relatedGoalId` is used instead of `relatedGoal`.</description>
    <content><![CDATA[
import React, { useState, useEffect } from 'react';
import { toPersianDigits } from '../../../utils';
import { XMarkIcon, TrashIcon } from '../../shared/AppIcons';
import { Task } from '../../../types/learningTypes'; 

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskToEdit: Task;
  onSaveTask: (updatedTask: Task) => void;
  // lifeProjects?: LifeProject[]; // Would be needed for a dropdown
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ isOpen, onClose, taskToEdit, onSaveTask }) => {
  const [title,