
import React, { useState, useEffect, useCallback } from 'react';
import { toPersianDigits } from '../../utils';
import { PageName } from '../../App';
// import { LearningContent } from '../../types/learningTypes'; // Removed unused import
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { 
    AnomalyAlert, 
    Scenario, 
    AIScenarioSuggestion, 
    Routine, 
    AutomationRule, 
    AIRuleSuggestion, 
    EnergySavingSuggestion, 
    MaintenanceSchedule,
    UserEnergyData,
    CommunityComparisonData,
    CommunityFeedItem,
    AIActionLogEntry,
    PresenceStatus
} from '../../types/smartHomeTypes';
import CollapsibleSection from '../shared/CollapsibleSection';
import { 
    HomeModernIcon as PageIcon, 
    LightbulbIcon, 
    SparklesIconNav as AiIcon, 
    BoltIcon, 
    WrenchScrewdriverIcon,
    ClipboardDocumentListIcon,
    UserGroupIcon,
    BellIcon, 
    UsersIcon, CogIcon
} from '../shared/AppIcons';
import DeviceCard, { Device, DeviceStatus, DeviceType } from '../smarthome/DeviceCard'; // Device related types are from DeviceCard
import ScenarioCard from '../smarthome/ScenarioCard';
import AISuggestionCard from '../smarthome/AISuggestionCard';
import RoutineCard from '../smarthome/RoutineCard';
import AutomationRuleCard from '../smarthome/AutomationRuleCard';
import { RuleBuilderModalInstance } from '../smarthome/AutomationRuleBuilderModal'; // Renamed import
import AIRuleSuggestionCard from '../smarthome/AIRuleSuggestionCard';
import EnergySavingSuggestionCard from '../smarthome/EnergySavingSuggestionCard';
import MaintenanceTaskItem from '../smarthome/MaintenanceTaskItem';
import HomeHealthScoreWidget from '../smarthome/HomeHealthScoreWidget';
import HomeHealthScoreDetailModal, { HomeHealthScoreFactor } from '../smarthome/HomeHealthScoreDetailModal';
import AnomalyAlertCard from '../smarthome/AnomalyAlertCard'; // Already in App.tsx, but good for consistency if used here
import CommunityComparisonCard from '../smarthome/CommunityComparisonCard';
import EnergyConsumptionComparisonCard from '../smarthome/EnergyConsumptionComparisonCard';
import ShareItemModal from '../smarthome/ShareItemModal';
import CommunityFeedItemCard from '../smarthome/CommunityFeedItemCard';
import LoadingSpinner from '../shared/LoadingSpinner'; // Added
import XAIModal from '../shared/XAIModal'; // Added

const AI_MODEL_NAME = 'gemini-2.5-flash-preview-04-17';

interface SmartHomePageProps {
  userName: string;
  navigateTo: (page: PageName | string, params?: any) => void;
  learningContentForSuggestions?: any[]; // Keeping this general as its specific type from LearningPage is not critical here
  geminiAI: GoogleGenAI | null;
  addGlobalAlert: (alert: AnomalyAlert) => void;
  dismissGlobalAlert: (alertId: string) => void;
  showGlobalToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

export const SmartHomePage: React.FC<SmartHomePageProps> = ({
  userName,
  navigateTo,
  learningContentForSuggestions,
  geminiAI,
  addGlobalAlert,
  dismissGlobalAlert,
  showGlobalToast
}) => {
  const [isDevicesSectionOpen, setIsDevicesSectionOpen] = useState(true);
  const [isScenariosSectionOpen, setIsScenariosSectionOpen] = useState(false);
  const [isEnergySectionOpen, setIsEnergySectionOpen] = useState(false);

  // Placeholder for Smart Home Page content
  // You would add your device cards, scenario controls, etc., here.

  return (
    <div className="page">
      <header className="text-center mb-6 p-4 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl shadow-lg text-white">
        <PageIcon className="w-10 h-10 mx-auto mb-2" />
        <h1 className="text-xl font-bold">{toPersianDigits("خانه هوشمند شما")}</h1>
        <p className="text-xs opacity-90">{toPersianDigits(`سلام ${userName}، به مرکز کنترل خانه هوشمند خوش آمدید.`)}</p>
      </header>

      <CollapsibleSection
        title={toPersianDigits("دستگاه‌های من")}
        isOpen={isDevicesSectionOpen}
        onToggle={() => setIsDevicesSectionOpen(!isDevicesSectionOpen)}
        icon={<LightbulbIcon className="w-5 h-5 text-yellow-500" />}
        className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-4"
        titleColorClass="text-md font-semibold text-gray-700"
      >
        <p className="text-xs text-gray-600">{toPersianDigits("لیست دستگاه‌های هوشمند شما در اینجا نمایش داده می‌شود.")}</p>
        {/* Example: Map through devices here */}
      </CollapsibleSection>

      <CollapsibleSection
        title={toPersianDigits("سناریوهای هوشمند")}
        isOpen={isScenariosSectionOpen}
        onToggle={() => setIsScenariosSectionOpen(!isScenariosSectionOpen)}
        className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-4"
        titleColorClass="text-md font-semibold text-gray-700"
      >
        <p className="text-xs text-gray-600">{toPersianDigits("سناریوهای از پیش تعریف شده و سفارشی شما.")}</p>
        {/* Example: Map through scenarios here */}
      </CollapsibleSection>

      <CollapsibleSection
        title={toPersianDigits("مصرف انرژی")}
        isOpen={isEnergySectionOpen}
        onToggle={() => setIsEnergySectionOpen(!isEnergySectionOpen)}
        className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-4"
        titleColorClass="text-md font-semibold text-gray-700"
      >
        <p className="text-xs text-gray-600">{toPersianDigits("نمودارها و اطلاعات مصرف انرژی.")}</p>
        {/* Example: Display energy consumption data */}
      </CollapsibleSection>

      {/* Add more sections and Smart Home specific content here */}
    </div>
  );
};

// If you intended a default export originally for SmartHomePage:
// export default SmartHomePage;
// However, App.tsx imports it as a named export: import { SmartHomePage } from ...
// So, the named export 'export const SmartHomePage' is correct.
