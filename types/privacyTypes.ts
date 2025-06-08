
import React from 'react';
import { PageName } from '../App'; // Assuming PageName is in App.tsx or a shared types file

// Defines the structure for controlling AI access to data within different application modules.
// Matches the structure in App.tsx
export interface ModuleDataAccessSettings {
  goals: { goalTitles: boolean; goalDescriptions: boolean; goalActionPlans: boolean };
  tasks: { taskTitles: boolean; taskDescriptions: boolean; taskDueDates: boolean; taskPriority: boolean };
  health: { sleepPatterns: boolean; activityLevel: boolean; nutritionLog: boolean };
  learning: { completedCourses: boolean; learningInterests: boolean };
  // Allow for other modules to be added with string keys
  [moduleId: string]: {
    [dataItemId: string]: boolean;
  };
}

// Structure for data that might be viewed in ModuleDataViewerModal
export interface ViewableModuleData {
  id: string;
  timestamp: string; // ISO string or human-readable
  type: string; // e.g., "ایجاد هدف", "تکمیل وظیفه", "گزارش خواب"
  summary: string; // Short summary of the data point
  details?: string | Record<string, any>; // More detailed content, can be string or structured object
}

// Data point information for PrivacyFeatureCard (specifically for data modules)
export interface DataPoint {
  name: string; // Persian name of the data point
  reason: string; // Why this data is collected/used (Persian)
  benefit: string; // How it benefits the user (Persian)
  xaiKey?: string; // Optional key for a more detailed XAI explanation for this specific point
}

// Information for a privacy feature card (OS permission or Data Module access)
export interface PrivacyFeatureInfo {
  id: string; // Unique identifier for the feature/permission
  icon: React.ReactElement<{ className?: string }>; // Icon component
  name: string; // Persian name of the feature/permission
  description: string; // Persian description
  
  // For Data Modules (when type is 'data-module')
  dataPoints?: DataPoint[]; 
  
  // For OS Permissions (when type is 'permission')
  permissionKey?: 'camera' | 'microphone' | 'geolocation' | string; // Key if it's an OS permission
  currentStatus?: boolean; // Current status of the permission (true = enabled)
  onToggleStatus?: () => void; // Handler to toggle permission (if applicable)
  impactIfNotGranted?: string; // What happens if permission is denied (Persian)
}

// --- Gamified Privacy Learning Hub Types ---
export interface PrivacyQuizQuestionOption {
  id: string;
  text: string;
}
export interface PrivacyQuizQuestion {
  id: string;
  questionText: string;
  options: PrivacyQuizQuestionOption[];
  correctAnswerId: string; 
  explanation?: string; // Explanation for the correct answer
  points?: number; 
}

export interface LearningResourceProps { // Base props used in LearningResourceCard
  id: string; // Added ID to uniquely identify resources
  title: string;
  description: string;
  type: 'article' | 'video' | 'quiz';
  iconName?: 'DocumentTextIcon' | 'CameraIcon' | 'AcademicCapIcon'; 
  url?: string; // Optional now, as quiz won't have a URL
  pointsAwarded: number; // Points for completing/passing
  badgeAwardedOnCompletion?: string; // ID of badge awarded
  quiz?: PrivacyQuizQuestion[]; // Quiz questions if type is 'quiz'
}

export interface PrivacyBadge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactElement<{ className?: string }>;
  criteria?: string; // How to earn it (display purpose)
  // isEarned will be determined by checking against PrivacyLearningState.earnedBadgeIds
}

export interface PrivacyLearningState {
  points: number;
  earnedBadgeIds: string[]; // Store as array for easier JSON serialization
}

// Structure for AI Privacy Advisor messages
export interface PrivacyAdvisorMessage {
  id: string;
  type: 'alert' | 'advice'; // 'alert' for more critical, 'advice' for general tips
  icon?: React.ReactNode; // To be set client-side based on 'type' and AI response
  title: string;          // From AI
  message: string;        // From AI
  actionText?: string;     // From AI, e.g., "بازبینی تنظیمات"
  onAction?: () => void;   // To be constructed client-side based on actionTarget
  actionTargetPage?: PageName | string; // Suggests a page to navigate to
  actionTargetSection?: string;     // Suggests an HTML element ID to scroll to on the target page
}
