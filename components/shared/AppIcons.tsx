
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
// export const FriendSystemIcon = UserGroupIcon; // Explicitly defined below if still needed or remove if UserGroupIcon is enough
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
export const ChartBarIcon = ChartPieIcon; 

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
export const CloudIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-2.666-5.43a4.5 4.5 0 00-8.195 2.788c0 1.44.592 2.753 1.562 3.708z" />
  </svg>
);

export const CreditCardIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
  </svg>
);

// Added from Infrastructure Page
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
    <file>types/appStateTypes.ts</file>
    <description>Create types/appStateTypes.ts to define application-wide state types like Theme, FontScale, AI assistant settings, personalization settings, global UI states (modals, toasts), and the main AppState interface.</description>
    <content><![CDATA[
// types/appStateTypes.ts
import { AnomalyAlert } from './smartHomeTypes';
import { PrivacyLearningState, ModuleDataAccessSettings } from './privacyTypes';

export type Theme = 'default' | 'ocean' | 'forest' | 'rose'; 
export type FontScale = 0.9 | 1.0 | 1.1 | 1.2;

// AI Assistant Personalization Types
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

export type PersonalizationLevel = 'minimal' | 'balanced' | 'full';


// Main AppState structure
export interface AppState {
  theme: Theme;
  fontScale: FontScale;
  assistantName: string;
  selectedAvatarId: AvatarId;
  selectedVoiceId: VoiceId;
  communicationStyle: CommunicationStyle;
  globalAlerts: AnomalyAlert[];
  
  // Advanced AI Personalization
  selectedPersonalityArchetype: PersonalityArchetype;
  humorLevel: number;
  empathyLevel: number;
  formalityLevel: number;
  curiosityLevel: number;
  responseLength: ResponseLength;
  emojiUsage: EmojiUsage;
  jargonUsage: JargonUsage;
  clarificationLevel: ClarificationLevel;
  notificationPreferences: NotificationPreferences;
  defaultInputModality: Modality;
  defaultOutputModality: Modality;
  smartMuteEnabled: boolean;
  smartMuteWorkHoursOnly: boolean;
  
  // AI Learning & Evolution
  ratedInteractions: RatedInteraction[];
  assistantEvolutionData: AssistantEvolutionDataPoint[];
  assistantLearningReports: AssistantLearningReport[];

  // Contextual Persona & Custom Commands
  enableContextualPersonaShifts: boolean;
  personaContextSettings: PersonaContextSettings;
  customCommands: CustomCommand[];
  assistantMemory: AssistantMemory;

  // Permissions & Data Sharing
  modulePermissions: ModulePermissions;
  interModuleDataSharing: InterModuleDataSharingConfig;
  assistantOverallRole: AssistantOverallRole;
  
  // AI Inferences & Learning History
  aiInferences: AIInference[];
  aiLearningHistory: AISavedLearningPoint[];
  
  // Privacy specific data (might be moved to a more specific context if it grows large)
  moduleDataAccessSettings: ModuleDataAccessSettings;
  privacyLearningState: PrivacyLearningState;
  personalizationLevel: PersonalizationLevel;
}

// Default state for AppStateContext
export const initialAppStateContext: AppState = {
  theme: 'default',
  fontScale: 1.0,
  assistantName: "دستیار هوشمند",
  selectedAvatarId: 'avatar_default',
  selectedVoiceId: 'voice_female_calm',
  communicationStyle: 'friendly',
  globalAlerts: [],
  selectedPersonalityArchetype: null,
  humorLevel: 50,
  empathyLevel: 70,
  formalityLevel: 30,
  curiosityLevel: 60,
  responseLength: 'concise',
  emojiUsage: 'use',
  jargonUsage: 'avoid_jargon',
  clarificationLevel: 'minimal_questions',
  notificationPreferences: {
    goals: { enabled: true, priority: 'helpful' },
    tasks: { enabled: true, priority: 'critical' },
    habits: { enabled: true, priority: 'friendly' },
    health: { enabled: false, priority: 'helpful' },
    learning: { enabled: true, priority: 'helpful' },
    finance: { enabled: false, priority: 'critical' },
  },
  defaultInputModality: 'text',
  defaultOutputModality: 'text',
  smartMuteEnabled: false,
  smartMuteWorkHoursOnly: true,
  ratedInteractions: [],
  assistantEvolutionData: [],
  assistantLearningReports: [],
  enableContextualPersonaShifts: true,
  personaContextSettings: {
    work: { tone: 'formal', proactivity: 'medium' },
    leisure: { tone: 'friendly', proactivity: 'low' },
    health: { tone: 'concise', proactivity: 'medium' },
  },
  customCommands: [],
  assistantMemory: {
    importantPeople: [], favoriteTopics: [], dietaryRestrictions: [], neverMentionTopics: [], freeTextNotes: ''
  },
  modulePermissions: { 
    Health: 'full_autonomy', Learning: 'full_autonomy', Tasks: 'full_autonomy',
    Goals: 'full_autonomy', Finance: 'suggest_only', Family: 'view_only', Community: 'view_only',
  },
  interModuleDataSharing: {
    health_to_learning: 'anonymized_suggestions_only',
    tasks_to_health: 'full_context_for_suggestions',
    finance_to_goals: 'allow_ai_orchestration',
  },
  assistantOverallRole: 'active_collaborator',
  aiInferences: [],
  aiLearningHistory: [],
  moduleDataAccessSettings: {
    goals: { goalTitles: true, goalDescriptions: true, goalActionPlans: true },
    tasks: { taskTitles: true, taskDescriptions: true, taskDueDates: true, taskPriority: true },
    health: { sleepPatterns: false, activityLevel: false, nutritionLog: false }, 
    learning: { completedCourses: true, learningInterests: true },
  },
  privacyLearningState: { 
    points: 0,
    earnedBadgeIds: [],
  },
  personalizationLevel: 'balanced',
};

export interface AppStateContextType {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  showGlobalToast: (text: string, type?: 'success' | 'error' | 'info') => void;
  addGlobalAlert: (alert: Omit<AnomalyAlert, 'id'> & {id?: string}) => void;
  dismissGlobalAlert: (alertId: string) => void;
  handleShowXaiModal: (title: string, explanation: string) => void;
  // Simplified setters from App.tsx for context
  setCurrentTheme: (theme: Theme) => void;
  setCurrentFontScale: (scale: FontScale) => void;
  setCurrentAssistantName: (name: string) => void;
  setCurrentSelectedAvatarId: (id: AvatarId) => void;
  setCurrentSelectedVoiceId: (id: VoiceId) => void;
  setCurrentCommunicationStyle: (style: CommunicationStyle) => void;
  // Add all other setters from App.tsx that modify appState
  setPersonalizationLevel: (level: PersonalizationLevel) => void;
  setNotificationPreferences: (prefsOrFn: NotificationPreferences | ((prev: NotificationPreferences) => NotificationPreferences)) => void;
  // ... (and many more setters for advanced personalization)
  resetAIPersonalizationToDefaults: () => void;
  setModuleDataAccessSettings: (settingsOrFn: ModuleDataAccessSettings | ((prev: ModuleDataAccessSettings) => ModuleDataAccessSettings)) => void;
  handleCompletePrivacyResource: (resourceId: string, pointsAwarded: number, badgeIdToAward?: string) => void;
  handleDownloadUserData: () => void;
  handleDeleteAccountAndData: () => void;

}
```
    </content>
  </change>
  <change>
    <file>types/navigationTypes.ts</file>
    <description>Define PageName, MorePanelLink, and NavigationContextType in types/navigationTypes.ts.</description>
    <content><![CDATA[
// types/navigationTypes.ts
import React from 'react';

export type PageName =
  | 'Dashboard' | 'Goals' | 'Tasks' | 'Habits' | 'Health'
  | 'Learning' | 'Finance' | 'Travel' | 'SmartHome' | 'Family'
  | 'Community' | 'Personalization' | 'Privacy' | 'Infrastructure' | 'Reports'
  | 'LifeProjects';

export interface MorePanelLink {
  name: PageName;
  label: string;
  icon: React.ReactElement;
  description?: string;
}

export interface NavigationContextType {
  currentPage: PageName;
  navigateTo: (page: PageName, params?: any) => void;
  isMorePanelOpen: boolean;
  openMorePanel: () => void;
  closeMorePanel: () => void;
}
```
    </content>
  </change>
  <change>
    <file>types/uiTypes.ts</file>
    <description>Create types/uiTypes.ts for global UI element states like XAIModalData, ToastData, and modal open states.</description>
    <content><![CDATA[
// types/uiTypes.ts

export interface XAIModalData {
  title: string;
  explanation: string;
}

export interface ToastData {
  id: number;
  text: string;
  type: 'success' | 'error' | 'info';
}

export interface GlobalUIContextType {
  // XAI Modal
  xaiModalData: XAIModalData | null;
  showXaiModal: (title: string, explanation: string) => void;
  closeXaiModal: () => void;

  // Toast Notifications
  toastData: ToastData | null;
  showGlobalToast: (text: string, type?: 'success' | 'error' | 'info') => void;
  closeGlobalToast: () => void;
  
  // Primary Add Modals
  isAddGoalModalOpen: boolean;
  openAddGoalModal: () => void;
  closeAddGoalModal: () => void;

  isAddTaskModalOpen: boolean;
  openAddTaskModal: () => void;
  closeAddTaskModal: () => void;

  isAddHabitModalOpen: boolean;
  openAddHabitModal: () => void;
  closeAddHabitModal: () => void;
  
  // Potentially other global UI states like a loading overlay
  // isLoadingOverlayVisible: boolean;
  // showLoadingOverlay: (message?: string) => void;
  // hideLoadingOverlay: () => void;
}
```
    </content>
  </change>
  <change>
    <file>index.html</file>
    <description>Update import map to include paths for '@/layout/' and '@/routing/' for AppLayout and PageRenderer respectively.</description>
    <content><![CDATA[

<script type="importmap">
{
  "imports": {
    "react": "https://esm.sh/react@^19.1.0",
    "react-dom/": "https://esm.sh/react-dom@^19.1.0/",
    "react/": "https://esm.sh/react@^19.1.0/",
    "@google/genai": "https://esm.sh/@google/genai@^1.3.0",
    "react-transition-group": "https://esm.sh/react-transition-group@^4.4.5",
    "@/": "./components/",
    "@/shared/CollapsibleSection": "./components/shared/CollapsibleSection.tsx",
    "@/shared/AppIcons": "./components/shared/AppIcons.tsx",
    "@/layout/": "./components/layout/",
    "@/routing/": "./components/routing/",
    "@/utils": "./utils.ts",
    "@/contexts/": "./contexts/",
    "@/types/": "./types/"
  }
}
</script>

<!DOCTYPE html>
<html lang="fa" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>LifeOrchestrator AI - Your Life, Orchestrated</title>
    <meta name="description" content="پلتفرم ارکستراسیون زندگی مبتنی بر هوش مصنوعی برای دستیابی به اهداف، ایجاد عادت‌های پایدار و بهبود کیفیت زندگی.">
    <meta name="keywords" content="هوش مصنوعی, ارکستراسیون زندگی, مدیریت وظایف, اهداف, عادت‌ها, بهره‌وری, دستیار شخصی, LifeOrchestrator AI, AI Life Orchestration, Task Management, Goals, Habits, Productivity, Personal Assistant">
    <meta name="theme-color" content="#1e293b"> <!-- slate-800 -->
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <link rel="manifest" href="/manifest.json">

    <style>
      @font-face {
        font-family: 'Vazirmatn';
        src: url('/fonts/Vazirmatn-Regular.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: 'Vazirmatn';
        src: url('/fonts/Vazirmatn-Bold.woff2') format('woff2');
        font-weight: bold;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: 'Vazirmatn';
        src: url('/fonts/Vazirmatn-Medium.woff2') format('woff2');
        font-weight: 500; /* Medium */
        font-style: normal;
        font-display: swap;
      }
       @font-face {
        font-family: 'Vazirmatn';
        src: url('/fonts/Vazirmatn-SemiBold.woff2') format('woff2');
        font-weight: 600; /* SemiBold */
        font-style: normal;
        font-display: swap;
      }

      body {
        font-family: 'Vazirmatn', sans-serif;
        background-color: #f8fafc; /* bg-slate-50 */
        direction: rtl;
        overscroll-behavior-y: contain; /* Prevents pull-to-refresh on body */
      }
      
      /* Global scrollbar styling */
      /* For Webkit browsers (Chrome, Safari) */
      ::-webkit-scrollbar {
        width: 8px; /* width of the entire scrollbar */
        height: 8px; /* height of the entire scrollbar (for horizontal scroll) */
      }

      ::-webkit-scrollbar-track {
        background: #f1f5f9; /* bg-slate-100 - track color */
        border-radius: 10px;
      }

      ::-webkit-scrollbar-thumb {
        background: #94a3b8; /* bg-slate-400 - thumb color */
        border-radius: 10px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: #64748b; /* bg-slate-500 - thumb hover color */
      }

      /* For Firefox */
      html { /* Apply to html for Firefox */
        scrollbar-width: thin;
        scrollbar-color: #94a3b8 #f1f5f9; /* thumb and track color */
      }
      
      /* For Edge and IE (less common now) */
      body {
        -ms-overflow-style: -ms-autohiding-scrollbar;
      }

      /* Placeholder styling for app container if needed */
      #root {
        /* max-width: 480px; /* Example for mobile-first view */
        /* margin: 0 auto; */
        /* background-color: white; */
        /* min-height: 100vh; */
        /* box-shadow: 0 0 20px rgba(0,0,0,0.1); */
      }
      .app-container {
        max-width: 480px; /* Or your desired max-width */
        margin: 0 auto;
        background-color: #f8fafc; /* Default page background */
        min-height: 100vh; /* Full height */
        display: flex;
        flex-direction: column;
        overflow-x: hidden; /* Prevent horizontal scroll on the main container */
      }
      .app-main-content {
        flex-grow: 1;
        padding-bottom: 70px; /* Space for bottom nav */
        overflow-y: auto; /* Allow content to scroll */
        display: flex; /* Added */
        flex-direction: column; /* Added */
      }
      .page {
        padding: 1rem; /* Standard padding for pages */
        flex-grow: 1; /* Added - This will make the .page div expand to fill its parent .app-main-content */
      }
      .bg-dashboard-page { background-color: var(--page-bg-dashboard, #eff6ff); }
      .bg-goals-page { background-color: var(--page-bg-goals, #f0f9ff); }
      .bg-tasks-page { background-color: var(--page-bg-tasks, #f5f3ff); }
      .bg-habits-page { background-color: var(--page-bg-habits, #fdf4ff); }
      .bg-health-page { background-color: var(--page-bg-health, #fef2f2); }
      .bg-learning-page { background-color: var(--page-bg-learning, #f0fdf4); }
      .bg-finance-page { background-color: var(--page-bg-finance, #f0fdfa); }
      .bg-travel-page { background-color: #eff6ff; } 
      .bg-smarthome-page { background-color: var(--page-bg-smarthome, #f1f5f9); }
      .bg-family-page { background-color: #fff1f2; } /* Rose 50, as requested */
      .bg-community-page { background-color: var(--page-bg-community, #ecfdf5); }
      .bg-personalization-page { background-color: var(--page-bg-personalization, #f3f4f6); }
      .bg-privacy-page { background-color: var(--page-bg-privacy, #e0f2fe); } /* Light Sky Blue */
      .bg-infrastructure-page { background-color: var(--page-bg-infrastructure, #f1f5f9); }
      .bg-reports-page { background-color: var(--page-bg-reports, #eef2ff); }
      .bg-sky-50 { background-color: #f0f9ff; } /* Used by LifeProjects */


      /* Dark Theme Variables (Example) - These would be applied via JS to body */
      .theme-ocean {
        --page-bg-dashboard: #0c4a6e; /* sky-800 */
        --color-primary-accent: #0ea5e9; /* sky-500 */
      }
       .theme-forest {
        --page-bg-dashboard: #14532d; /* green-900 */
        --color-primary-accent: #22c55e; /* green-500 */
      }
      
      /* Basic FAB styles */
      .fab-container { position: fixed; bottom: calc(68px + 1rem); /* Above nav bar + margin */ right: 1rem; z-index: 100; display: flex; flex-direction: column-reverse; align-items: center; }
      .fab-button { width: 56px; height: 56px; border-radius: 50%; color: white; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.2); transition: all 0.3s ease-in-out; border: none; cursor: pointer; }
      .fab-option-item { background-color: white; color: #374151; /* gray-700 */ padding: 8px 12px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); margin-bottom: 10px; display: flex; align-items: center; font-size: 0.875rem; cursor: pointer; transition: opacity 0.25s ease-out, transform 0.25s ease-out; white-space: nowrap; border: 1px solid #e5e7eb; /* gray-200 */ }
      .fab-option-item:hover { background-color: #f3f4f6; /* gray-100 */ }
      .fab-options-enter { opacity: 0; transform: translateY(10px) scale(0.95); }
      .fab-options-active { opacity: 1; transform: translateY(0) scale(1); }
      .fab-options-exit { opacity: 1; transform: translateY(0) scale(1); }
      .fab-options-exit-active { opacity: 0; transform: translateY(10px) scale(0.95); }
      .fab-visible { --toast-bottom-spacing: calc(68px + 1rem + 56px + 1rem); }
      body:not(.fab-visible) { --toast-bottom-spacing: calc(68px + 1rem); }

      /* Bottom Navigation Bar */
      .app-footer-nav { box-shadow: 0 -2px 10px rgba(0,0,0,0.08); }
      .nav-item { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 8px 4px; font-size: 10px; color: #6b7280; /* gray-500 */ transition: color 0.2s ease-in-out, transform 0.1s ease-out; border: none; background: none; cursor: pointer; }
      .nav-item > svg { margin-bottom: 2px; transition: transform 0.2s ease-out; }
      .nav-item > span { line-height: 1.2; }
      .nav-item.active { color: #4f46e5; /* indigo-600 */ font-weight: 500; }
      .nav-item.active > svg { transform: scale(1.1); }
      .nav-item:active { transform: scale(0.95); }
      
      /* General Modal Styling (can be improved) */
      .modal-overlay { position: fixed; inset: 0; background-color: rgba(0,0,0,0.6); backdrop-filter: blur(4px); z-index: 1000; display: flex; align-items: center; justify-content: center; opacity: 0; visibility: hidden; transition: opacity 0.3s ease, visibility 0.3s ease; }
      .modal-overlay.active { opacity: 1; visibility: visible; }
      .modal-content { background-color: white; padding: 20px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); width: 90%; max-width: 500px; transform: scale(0.95); transition: transform 0.3s ease; max-height: 85vh; overflow-y: auto; }
      .modal-overlay.active .modal-content { transform: scale(1); }
      
      .full-screen-modal-overlay { position: fixed; inset: 0; background-color: rgba(248, 250, 252, 0.95); /* bg-slate-50 with opacity */ backdrop-filter: blur(5px); z-index: 1000; display: flex; flex-direction: column; opacity: 0; visibility: hidden; transition: opacity 0.3s ease, visibility 0.3s ease; }
      .full-screen-modal-overlay.active { opacity: 1; visibility: visible; }
      .full-screen-modal-content { background-color: #ffffff; /* white */ width: 100%; height: 100%; display: flex; flex-direction: column; padding: 1.25rem; /* p-5 */ transform: translateY(100%); transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1); }
      .full-screen-modal-overlay.active .full-screen-modal-content { transform: translateY(0); }
      .modal-scroll-content { scrollbar-width: thin; scrollbar-color: #cbd5e1 #f1f5f9; /* slate-300 slate-100 */ }
      .modal-scroll-content::-webkit-scrollbar { width: 6px; }
      .modal-scroll-content::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 3px; }
      .modal-scroll-content::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
      .modal-scroll-content::-webkit-scrollbar-thumb:hover { background: #94a3b8; }


      /* AI Parsing Preview Styling */
      .ai-parsing-preview { background-color: #e0e7ff; /* indigo-100 */ border: 1px solid #c7d2fe; /* indigo-200 */ padding: 0.75rem; border-radius: 0.5rem; margin-bottom: 1rem; }
      .ai-parsing-preview-title { font-size: 0.875rem; font-weight: 600; color: #4338ca; /* indigo-700 */ margin-bottom: 0.5rem; display:flex; align-items:center; }
      .ai-parsing-preview-text { font-size: 0.75rem; color: #4f46e5; /* indigo-600 */ margin-bottom: 0.25rem; }
      .ai-parsing-preview-text strong { color: #3730a3; /* indigo-800 */ }
      .ai-parsing-preview-text input, .ai-parsing-preview-text select { font-size: 0.75rem; padding: 0.125rem 0.25rem; border: 1px solid #a5b4fc; /* indigo-300 */ border-radius: 0.25rem; background-color: #eef2ff; /* indigo-50 */ }
      .ai-parsing-preview-xai-button { font-size: 0.625rem; /* text-xs */ color: #4f46e5; /* indigo-600 */ text-decoration: underline; background: none; border: none; cursor: pointer; }
      .ai-parsing-preview-xai-button:hover { color: #3730a3; /* indigo-800 */ }
      
      /* Task Input Icons Styling */
      .task-input-icons { position: absolute; top: 10px; right: 10px; /* LTR */ display: flex; gap: 8px; }
      html[dir="rtl"] .task-input-icons { right: auto; left: 10px; }
      .task-input-icons button { background: none; border: none; cursor: pointer; color: #6b7280; /* gray-500 */ }
      .task-input-icons button:hover { color: #4f46e5; /* indigo-600 */ }
      
      /* Task Breakdown Output Styling */
      .task-breakdown-output { background-color: #f3e8ff; /* purple-50 */ border: 1px solid #e9d5ff; /* purple-200 */ padding: 0.75rem; border-radius: 0.5rem; margin-bottom: 1rem; }
      .task-breakdown-title { font-size: 0.875rem; font-weight: 600; color: #7e22ce; /* purple-700 */ margin-bottom: 0.5rem; }
      .task-breakdown-list { list-style-type: disc; padding-right: 1rem; /* RTL */ }
      html[dir="rtl"] .task-breakdown-list { padding-right: 1rem; padding-left:0; } /* Ensure correct padding for RTL */
      .task-breakdown-list li { font-size: 0.75rem; color: #581c87; /* purple-800 */ }
      
      /* Chat Message Styling */
      .chat-messages-container { scroll-behavior: smooth; }
      .chat-message { padding: 0.5rem 0.75rem; border-radius: 0.75rem; max-width: 80%; word-wrap: break-word; font-size: 0.875rem; line-height: 1.4; }
      .chat-message.user { background-color: #4f46e5; /* indigo-600 */ color: white; margin-left: auto; border-bottom-right-radius: 0.25rem; }
      html[dir="rtl"] .chat-message.user { margin-right: auto; margin-left: 0; border-bottom-left-radius: 0.25rem; border-bottom-right-radius: 0.75rem; }
      .chat-message:not(.user) { background-color: #e5e7eb; /* gray-200 */ color: #1f2937; /* gray-800 */ margin-right: auto; border-bottom-left-radius: 0.25rem; }
      html[dir="rtl"] .chat-message:not(.user) { margin-left: auto; margin-right: 0; border-bottom-right-radius: 0.25rem; border-bottom-left-radius: 0.75rem; }
      
      /* Suggestion Card Feedback Animation */
      .suggestion-button-feedback { display: inline-block; transition: transform 0.3s ease, opacity 0.3s ease; transform: scale(0); opacity: 0; margin-left: 4px; }
      .suggestion-button-feedback.show { transform: scale(1); opacity: 1; }
      .suggestion-card-fade-out { animation: fadeOutAndShrink 0.5s forwards; }
      @keyframes fadeOutAndShrink { 0% { opacity: 1; transform: translateY(0); max-height: 200px; margin-bottom: 1rem; padding: 1rem; border-width: 1px;} 99% { opacity: 0; transform: translateY(-10px); max-height: 0; margin-bottom: 0; padding: 0 1rem; border-width: 1px;} 100% { opacity: 0; transform: translateY(-10px); max-height: 0; margin-bottom: 0; padding: 0; border-width: 0;} }
      
      /* Scrollbar for specific elements */
      .scrollbar-thin { scrollbar-width: thin; scrollbar-color: #cbd5e1 #f1f5f9; /* slate-300 slate-100 for thumb and track */ }
      .scrollbar-thin::-webkit-scrollbar { width: 5px; height: 5px; }
      .scrollbar-thin::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 10px; }
      .scrollbar-thin::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      .scrollbar-thin::-webkit-scrollbar-thumb:hover { background: #94a3b8; }

      /* Ensure app-header and its h1 are styled if Tailwind is not globally applied to App.tsx */
      .app-header {
        padding: 1rem;
        /* background-color: #fff; /* Example background */
        /* border-bottom: 1px solid #e5e7eb; /* Example border */
      }
      .app-header h1 {
         font-size: 1.25rem; /* text-xl */
         font-weight: 700; /* font-bold */
         text-align: center;
         color: #374151; /* gray-700 example */
      }

      /* Global Alerts Container Styling */
      .global-alerts-container {
        position: sticky;
        top: 0;
        left:0;
        right:0;
        z-index: 1500; /* Higher than other elements like FAB or modals that might be 1000 */
        width: 100%;
        max-height: 30vh; /* Limit height to avoid taking too much screen */
        overflow-y: auto; /* Allow scrolling if many alerts */
        /* background-color: rgba(248, 250, 252, 0.8); /* Slight bg to differentiate if needed, but individual cards have bg */
        /* backdrop-filter: blur(2px); */ /* Optional: if a slight blur effect is desired under alerts */
      }
      .global-alerts-container > div { /* Style for individual AnomalyAlertCard inside */
        margin-bottom: 0.5rem; /* Spacing between alerts */
      }
      .global-alerts-container > div:last-child {
        margin-bottom: 0;
      }

      /* Styles for Community Feed Grid */
      .community-feed-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); /* Responsive grid */
        gap: 1rem; /* Space between cards */
      }
      /* Ensure an AnomalyAlertCard inside global-alerts-container is using full width if needed */
      /* .global-alerts-container > .anomaly-alert-card-selector { width: 100%; box-sizing: border-box; } */
      
      .anomaly-alert-card-selector { /* General class for anomaly alert card if you plan to use one */
        /* Add general styling if needed here */
      }

      /* Family Calendar Event Basic Styling */
      .family-calendar-event {
        padding: 2px 4px;
        margin-bottom: 2px;
        border-radius: 4px;
        font-size: 0.65rem; /* text-xs is 0.75rem, this is a bit smaller */
        line-height: 1.2;
        color: white;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
      }
      .event-medical { background-color: #ef4444; } /* red-500 */
      .event-school { background-color: #3b82f6; } /* blue-500 */
      .event-birthday { background-color: #f59e0b; } /* amber-500 */
      .event-gathering { background-color: #10b981; } /* emerald-500 */
      .event-other { background-color: #6b7280; } /* gray-500 */
      .event-واکسیناسیون { background-color: #8b5cf6; } /* violet-500 */

      /* Styles for Family Page - Bulletin Board (Conceptual) */
      .bulletin-board-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 0.75rem; /* 12px */
      }
      .bulletin-post-card {
        padding: 0.75rem; /* 12px */
        border-radius: 0.5rem; /* 8px */
        box-shadow: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06);
        /* Colors are applied via inline style from BulletinPostCard component */
      }
      .bulletin-post-yellow { background-color: #fef9c3; border-left: 4px solid #facc15; } /* yellow-100, yellow-500 */
      .bulletin-post-pink { background-color: #fce7f3; border-left: 4px solid #ec4899; } /* pink-100, pink-500 */
      .bulletin-post-blue { background-color: #dbeafe; border-left: 4px solid #3b82f6; } /* blue-100, blue-500 */
      .bulletin-post-green { background-color: #dcfce7; border-left: 4px solid #22c55e; } /* green-100, green-500 */
      .bulletin-post-purple { background-color: #f3e8ff; border-left: 4px solid #a855f7; } /* purple-100, purple-500 */


      /* Tailwind classes for Animate-fadeIn (from CollapsibleSection) */
      @keyframes fadeIn { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
      .animate-fadeIn { animation: fadeIn 0.3s ease-out; }

      /* IF TAILWIND CDN IS REMOVED, THESE CLASSES NEED TO BE DEFINED OR A BUILD STEP USED */
      /* Minimal necessary Tailwind-like classes if CDN is removed */
      .sticky { position: sticky; }
      .top-0 { top: 0; }
      .bg-white\/80 { background-color: rgba(255, 255, 255, 0.8); }
      .backdrop-blur-md { backdrop-filter: blur(12px); }
      .z-40 { z-index: 40; }
      .shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
      .print\:hidden { @media print { display: none; } }
      .text-lg { font-size: 1.125rem; line-height: 1.75rem; } /* 18px */
      .font-semibold { font-weight: 600; }
      .text-gray-700 { color: #374151; }
      .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
      .text-center { text-align: center; }
      .px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
      /* Add any other critical Tailwind classes used in App.tsx or global layout here if CDN is removed */

    </style>
    <!-- Tailwind CDN and its warning script have been removed. -->
    <!-- For production, ensure Tailwind is compiled via PostCSS or CLI. -->
    <!-- Styles might be affected if utility classes were solely from CDN. -->
    <script type="module" src="./index.tsx"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```
  </change>
  <change>
    <file>App.tsx</file>
    <description>Use externalized context providers (AppStateProvider, NavigationProvider, GlobalUIProvider) and import types from the 'types/' directory. Delegate layout to AppLayout and page rendering to PageRenderer. Pass mock data for learning suggestions to PageRenderer. This matches the user-provided refactored App.tsx.</description>
    <content><![CDATA[
import React from 'react';
import { AppStateProvider } from '@/contexts/AppStateContext';
import { NavigationProvider } from '@/contexts/NavigationContext';
import { GlobalUIProvider } from '@/contexts/GlobalUIContext';
import AppLayout from '@/layout/AppLayout';
import PageRenderer from '@/routing/PageRenderer';
import ErrorBoundary from '@/components/shared/ErrorBoundary';
import { toPersianDigits } from '@/utils';
import { PageName } from '@/types/navigationTypes';
import { LearningPath, LearningContent } from '@/types/learningTypes'; 

// Mock data that will be passed down, not part of global state yet
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

export interface AppProps {
    defaultPage?: PageName;
}

export const App: React.FC<AppProps> = ({ defaultPage = 'Dashboard' }) => {
  return (
    <ErrorBoundary fallbackMessage={toPersianDigits("متاسفانه مشکلی در بارگذاری برنامه رخ داده است.")}>
      <AppStateProvider>
        <NavigationProvider defaultPage={defaultPage}>
          <GlobalUIProvider>
            <AppLayout>
              <PageRenderer 
                learningPathsForSuggestions={mockLearningPathsForSuggestions}
                learningContentForSuggestions={mockLearningContentForSuggestions}
              />
            </AppLayout>
          </GlobalUIProvider>
        </NavigationProvider>
      </AppStateProvider>
    </ErrorBoundary>
  );
};
```
    </content>
  </change>
  <change>
    <file>components/pages/DashboardPage.tsx</file>
    <description>Update import for PageName from `../../types/navigationTypes`. Correct Goal and Task type imports to be from `../../types/learningTypes`. Corrected the getGoalCategoryIcon logic.</description>
    <content><![CDATA[
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { toPersianDigits, parseJsonFromString } from '../../utils';
import { 
  CheckCircleIcon, XCircleIcon, LightbulbIcon, UserCircleIcon as ProfileIcon,
  TargetIcon as GoalsWidgetIcon, 
  ListIcon as TasksWidgetIcon,   
  RepeatIcon as HabitsWidgetIcon, 
  ArrowRightIcon as ViewAllIcon, PaperAirplaneIcon, StarIcon, 
  SparklesIconNav as AiSparkleIcon,
  BookIcon, HeartIcon, WalletIcon,
  ClockIcon, PlayIcon, AdjustmentsVerticalIcon, SettingsIcon, XMarkIcon, ActivityLogIcon, BriefcaseIcon, UserGroupIcon as RelationshipIcon
} from '../shared/AppIcons'; 
import XAIModal from '../shared/XAIModal'; 
import LoadingSpinner from '../shared/LoadingSpinner'; 
import ToastNotification from '../shared/ToastNotification';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { PageName } from '../../types/navigationTypes'; 
import { Goal, Task, LearningSuggestion } from '../../types/learningTypes'; 
import AutonomousActionCard, { AIAutonomousAction } from './dashboard/AutonomousActionCard';   
import InterconnectednessGraph, { DomainNodeData, ConnectionData, CorrelationExplanationData } from './dashboard/InterconnectednessGraph';
import PredictiveInsightCard, { PredictiveInsightAlert } from './dashboard/PredictiveInsightCard';
import ContentFeedCard, { PersonalizedContentItem } from './dashboard/ContentFeedCard';
import HolisticScoreDetailModal, { DomainScore } from './dashboard/HolisticScoreDetailModal';


const AI_MODEL_NAME = 'gemini-2.5-flash-preview-04-17';

interface DashboardPageProps {
  userName: string;
  navigateTo: (page: PageName) => void;
}

interface DashboardWidgetProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onViewAllClick?: () => void;
  viewAllText?: string;
  className?: string;
  contentClassName?: string;
  titleColorClass?: string; 
}

const WidgetCard: React.FC<DashboardWidgetProps> = ({ title, icon, children, onViewAllClick, viewAllText = "مشاهده همه", className = "", contentClassName = "", titleColorClass = "text-gray-800" }) => (
  <div className={`bg-white p-4 rounded-xl shadow-md border border-gray-200/80 ${className} hover:shadow-lg transition-shadow duration-300`}>
    <div className="flex justify-between items-center mb-3">
      <h4 className={`font-semibold ${titleColorClass} flex items-center text-base`}>
        {icon && <span className="ml-2 rtl:mr-0 rtl:ml-2">{icon}</span>}
        {toPersianDigits(title)}
      </h4>
      {onViewAllClick && (
        <button onClick={onViewAllClick} className={`text-xs ${titleColorClass.replace('text-gray-800', 'text-indigo-600').replace('text-blue-800', 'text-blue-600').replace('text-purple-800', 'text-purple-600')} hover:opacity-75 font-medium flex items-center`}>
          {toPersianDigits(viewAllText)} &raquo;
        </button>
      )}
    </div>
    <div className={`space-y-2.5 ${contentClassName}`}>{children}</div>
  </div>
);

interface WelcomeCardProps {
  userName: string;
  moodText: string;
  lifeScore: number;
}
const WelcomeCard: React.FC<WelcomeCardProps> = ({ userName, moodText, lifeScore }) => (
  <div className="flex items-center justify-between mb-6 p-3.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl shadow-lg">
    <div className="flex items-center">
      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center ml-3 rtl:mr-0 rtl:ml-3 shadow-inner">
        <ProfileIcon className="w-8 h-8 text-white" />
      </div>
      <div>
        <h2 id="greeting-message" className="text-lg font-semibold">{userName ? `سلام، ${toPersianDigits(userName)}!` : "سلام!"}</h2>
        <p id="mood-energy-indicator" className="text-sm opacity-90">{toPersianDigits(moodText)}</p>
      </div>
    </div>
    <div className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
      {toPersianDigits(`امتیاز زندگی: ${String(lifeScore)}%`)}
    </div>
  </div>
);

interface GoalProgressItemProps {
  title: string;
  progress: number;
  category?: string;
}

const getGoalCategoryIcon = (category?: string) => {
    const iconProps = { className: "w-3.5 h-3.5" };
    switch (category) {
      case "یادگیری": return <BookIcon {...iconProps} />;
      case "سلامتی": return <HeartIcon {...iconProps} />;
      case "مالی": return <WalletIcon {...iconProps} />;
      default: return <GoalsWidgetIcon {...iconProps} />;
    }
};

const GoalProgressItem: React.FC<GoalProgressItemProps> = ({ title, progress, category }) => {
  const colorClass = progress >= 75 ? "bg-green-500" : progress >= 40 ? "bg-blue-500" : "bg-yellow-500";
  
  return (
    <div className="text-gray-700 text-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <span className="mr-1.5 rtl:ml-1.5 rtl:mr-0 opacity-70">{getGoalCategoryIcon(category)}</span>
          <span className="truncate max-w-[150px] sm:max-w-none">{toPersianDigits(title)}</span>
        </div>
        <span>{`${toPersianDigits(String(progress))}%`}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1 overflow-hidden">
        <div className={`${colorClass} h-1.5 rounded-full transition-all duration-500 ease-out`} style={{ width: `${progress}%` }} role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}></div>
      </div>
    </div>
  );
};

interface TaskDashboardItemProps {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  isCompleted: boolean;
  onToggle: (taskId: string) => void;
}
const TaskDashboardItem: React.FC<TaskDashboardItemProps> = ({ id, title, priority, isCompleted, onToggle }) => {
  const priorityColors = {
    'high': 'text-red-600 bg-red-100 border-red-300',
    'medium': 'text-yellow-600 bg-yellow-100 border-yellow-300',
    'low': 'text-green-600 bg-green-100 border-green-300',
  };
  return (
    <div className="flex items-center justify-between text-gray-700 text-sm py-1">
      <div className="flex items-center">
        <input 
          type="checkbox" 
          className="form-checkbox h-4 w-4 text-indigo-600 rounded-md ml-2 rtl:mr-0 rtl:ml-2 border-gray-300 focus:ring-indigo-500 cursor-pointer"
          checked={isCompleted}
          onChange={() => onToggle(id)}
          aria-labelledby={`task-label-${id}`}
        />
        <span id={`task-label-${id}`} className={`${isCompleted ? "line-through text-gray-400" : ""} truncate max-w-[180px] sm:max-w-none`}>{toPersianDigits(title)}</span>
      </div>
      <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full border ${priorityColors[priority]}`}>
        {toPersianDigits(priority === 'high' ? "بالا" : priority === 'medium' ? "متوسط" : "پایین")}
      </span>
    </div>
  );
};

interface HabitDashboardItemProps {
  id: string;
  title: string;
  weeklyProgressText: string; 
  isCompletedToday: boolean;
  onComplete: (habitId: string) => void;
}
const HabitDashboardItem: React.FC<HabitDashboardItemProps> = ({ id, title, weeklyProgressText, isCompletedToday, onComplete }) => (
  <div className="flex items-center justify-between text-gray-700 text-sm py-1">
    <div className="flex items-center">
      <span className="truncate max-w-[150px] sm:max-w-none">{toPersianDigits(title)}</span>
      <span className="text-purple-600 mr-2 rtl:ml-2 rtl:mr-0 text-xs bg-purple-100 px-1.5 py-0.5 rounded-full">{toPersianDigits(weeklyProgressText)}</span>
    </div>
    <button 
      className={`text-xs px-2.5 py-1 rounded-md transition-colors font-medium ${isCompletedToday ? 'bg-green-100 text-green-700 cursor-not-allowed' : 'bg-purple-500 text-white hover:bg-purple-600'}`}
      onClick={() => onComplete(id)}
      disabled={isCompletedToday}
    >
      {isCompletedToday ? toPersianDigits('تکمیل شد ✅') : toPersianDigits('تکمیل امروز')}
    </button>
  </div>
);

interface Message {
  id: string;
  text: string;
  sender: 'ai' | 'user';
  timestamp: number;
}

interface AISuggestion {
  id: string;
  text: string;
  xaiRationaleKey: string;
}

const xaiExplanationsDb: Record<string, string> = {
  meditation: "هوش مصنوعی تشخیص داد که شما کمتر از حد متوسط خود خوابیده‌اید (۵ ساعت). تحقیقات نشان می‌دهد مدیتیشن می‌تواند به تنظیم مجدد ریتم شبانه‌روزی، کاهش خستگی و افزایش تمرکز در طول روز کمک کند. این یک پیشنهاد فعال برای بهبود بهزیستی شماست.",
  task_priority: "سیستم مهلت‌های نزدیک و نوع وظایف را در نظر می‌گیرد. 'گزارش ماهانه' ۲ روز دیگر سررسید دارد و یک وظیفه تحلیلی است. الگوهای بهره‌وری شما نشان می‌دهد که صبح‌ها برای کارهای تحلیلی مانند گزارش‌نویسی تمرکز بالاتری دارید، لذا اولویت آن افزایش یافت تا اطمینان حاصل شود به موقع تکمیل می‌گردد.",
  autonomous_meditation: "هوش مصنوعی بر اساس الگوهای فعالیت اخیر و سطح استرس گزارش شده (شبیه‌سازی شده)، تشخیص داد که یک جلسه کوتاه مدیتیشن می‌تواند به تمرکز مجدد و کاهش تنش کمک کند. این به صورت خودکار برای راحتی شما شروع شد.",
  autonomous_break: "پس از یک دوره طولانی کار متمرکز (شبیه‌سازی شده از طریق تعامل با برنامه)، هوش مصنوعی یک استراحت کوتاه را برای جلوگیری از فرسودگی شغلی و حفظ بهره‌وری پیشنهاد کرد.",
  autonomous_hydration: "با توجه به زمان سپری شده از آخرین نوشیدنی ثبت شده شما (شبیه‌سازی شده)، هوش مصنوعی یک یادآوری برای نوشیدن آب ارسال کرد تا به هیدراتاسیون مطلوب کمک کند.",
};


const DashboardPage: React.FC<DashboardPageProps> = ({ userName, navigateTo }) => {
  const [moodText, setMoodText] = useState("امروز پرانرژی به نظر می‌رسی! 😊");
  const [lifeScore, setLifeScore] = useState(85);

  const [topGoalsData, setTopGoalsData] = useState<Goal[]>([
    { id: 'g1', title: "یادگیری زبان انگلیسی", progress: 80, category: "یادگیری", status: 'active', actionPlanTasks:[] },
    { id: 'g2', title: "تناسب اندام", progress: 60, category: "سلامتی", status: 'active', actionPlanTasks:[] },
    { id: 'g3', title: "پس‌انداز برای سفر", progress: 45, category: "مالی", status: 'active', actionPlanTasks:[] },
  ]);

  const [importantTasksData, setImportantTasksData] = useState<Task[]>([
    { id: 't1', title: "پاسخ به ایمیل‌های کاری", priority: 'high', completed: false, subTasks:[] },
    { id: 't2', title: "برنامه‌ریزی هفتگی", priority: 'medium', completed: true, subTasks:[] },
    { id: 't3', title: "تماس با مشتری X", priority: 'high', completed: false, subTasks:[] },
  ]);
  
  const [trackedHabitsData, setTrackedHabitsData] = useState([
    { id: 'h1', title: "نوشیدن آب کافی", weeklyProgressText: "۵/۷ روز", isCompletedToday: false, streak: 23, frequency: "daily" as "daily", timeOfDay: "any" as "any", log:[] },
    { id: 'h2', title: "ورزش روزانه", weeklyProgressText: "۳/۷ روز", isCompletedToday: true, streak: 7, frequency: "daily" as "daily", timeOfDay: "any" as "any", log:[] },
  ]);

  const [chatMessages, setChatMessages] = useState<Message[]>([
    { id: 'm1', text: toPersianDigits("سلام! چطور می‌تونم امروز بهت کمک کنم؟"), sender: 'ai', timestamp: Date.now() }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isAiChatLoading, setIsAiChatLoading] = useState(false);
  const chatMessagesEndRef = useRef<HTMLDivElement>(null);

  const [dailyInsight, setDailyInsight] = useState<string | null>(null);
  const [isDailyInsightLoading, setIsDailyInsightLoading] = useState(false);
  
  const [aiSuggestionsData, setAiSuggestionsData] = useState<AISuggestion[]>([
    { id: 'sugg1', text: toPersianDigits("بر اساس الگوی خواب شما در دیشب (۵ ساعت، کمتر از حد معمول)، یک مدیتیشن ۱۰ دقیقه‌ای برای افزایش تمرکز پیشنهاد می‌شود. این می‌تواند به بهبود کیفیت خواب و کاهش خستگی روزانه شما کمک کند."), xaiRationaleKey: 'meditation' },
    { id: 'sugg2', text: toPersianDigits("با توجه به حجم کاری امروز و نزدیک بودن سررسید 'گزارش ماهانه' (۲ روز دیگر)، این وظیفه به بالاترین اولویت شما منتقل شد. AI تشخیص داده که شما در این زمان از روز (صبح) تمرکز بالاتری برای کارهای تحلیلی دارید."), xaiRationaleKey: 'task_priority' },
  ]);
  
  const [suggestionCardStates, setSuggestionCardStates] = useState<Record<string, { visible: boolean; feedbackIcon?: 'accepted' | 'declined' }>>(
    aiSuggestionsData.reduce((acc, sugg) => ({ ...acc, [sugg.id]: { visible: true } }), {})
  );

  const [xaiModalOpen, setXaiModalOpen] = useState(false);
  const [xaiModalContent, setXaiModalContent] = useState({ title: '', explanation: '' });
  const [toastMessage, setToastMessage] = useState<{id: number, text: string, type: 'success' | 'error' | 'info'} | null>(null);

  const [autonomousActions, setAutonomousActions] = useState<AIAutonomousAction[]>([]);
  const [isLoadingAutonomousAction, setIsLoadingAutonomousAction] = useState(false);

  const [domainsData, setDomainsData] = useState<DomainNodeData[]>([]);
  const [connectionsData, setConnectionsData] = useState<ConnectionData[]>([]);
  const [correlationExplanations, setCorrelationExplanations] = useState<CorrelationExplanationData>({});
  const [predictiveInsights, setPredictiveInsights] = useState<PredictiveInsightAlert[]>([]);
  const [isLoadingPredictiveInsights, setIsLoadingPredictiveInsights] = useState(false);
  const [contentFeedItems, setContentFeedItems] = useState<PersonalizedContentItem[]>([]);
  const [isLoadingContentFeed, setIsLoadingContentFeed] = useState(false);
  const [isHolisticScoreModalOpen, setIsHolisticScoreModalOpen] = useState(false);
  const [domainScores, setDomainScores] = useState<DomainScore[]>([]);

  const ai = process.env.API_KEY ? new GoogleGenAI({ apiKey: process.env.API_KEY }) : null;

  const showToast = useCallback((text: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToastMessage({ id: Date.now(), text: toPersianDigits(text), type });
  }, []);

  // --- Data Fetching and Initialization ---
  const fetchDomainsAndConnections = useCallback(async () => {
    setDomainsData([
      { id: 'life', label: 'زندگی', color: 'bg-indigo-500', isCentral: true }, { id: 'health', label: 'سلامت', color: 'bg-red-500' },
      { id: 'work', label: 'کار', color: 'bg-blue-500' }, { id: 'learning', label: 'یادگیری', color: 'bg-purple-500' },
      { id: 'finance', label: 'مالی', color: 'bg-green-500' }, { id: 'relations', label: 'روابط', color: 'bg-pink-500' },
    ]);
    setConnectionsData([
      { sourceId: 'life', targetId: 'health', strength: 2 }, { sourceId: 'life', targetId: 'work', strength: 3 },
      { sourceId: 'life', targetId: 'learning', strength: 1 }, { sourceId: 'life', targetId: 'finance', strength: 2 },
      { sourceId: 'life', targetId: 'relations', strength: 2 }, { sourceId: 'health', targetId: 'work', strength: 2 },
      { sourceId: 'work', targetId: 'finance', strength: 3 }, { sourceId: 'learning', targetId: 'work', strength: 2 },
      { sourceId: 'relations', targetId: 'health', strength: 1 }
    ]);
    setCorrelationExplanations({
        health: { title: toPersianDigits("سلامت و زندگی"), text: toPersianDigits("سلامتی قوی پایه و اساس انرژی و تمرکز در تمام جنبه‌های زندگی است."), relatedDomains: ['life', 'work', 'relations'] },
        work: { title: toPersianDigits("کار و زندگی"), text: toPersianDigits("موفقیت و رضایت شغلی به طور قابل توجهی بر کیفیت کلی زندگی و ثبات مالی تأثیر می‌گذارد."), relatedDomains: ['life', 'finance', 'learning'] },
        learning: { title: toPersianDigits("یادگیری و کار"), text: toPersianDigits("رشد مداوم مهارت‌ها و دانش به پیشرفت شغلی و سازگاری کمک می‌کند."), relatedDomains: ['life', 'work'] },
        finance: { title: toPersianDigits("مالی و کار"), text: toPersianDigits("ثبات مالی استرس را کاهش می‌دهد و امکان تمرکز بهتر بر کار و اهداف شخصی را فراهم می‌کند."), relatedDomains: ['life', 'work'] },
        relations: { title: toPersianDigits("روابط و سلامت"), text: toPersianDigits("روابط اجتماعی قوی و حمایتگر به سلامت روان و جسمی بهتر کمک می‌کند."), relatedDomains: ['life', 'health'] },
        life: { title: toPersianDigits("مرکزیت زندگی"), text: toPersianDigits("تمام حوزه‌ها برای یک زندگی متعادل و شکوفا به هم مرتبط هستند."), relatedDomains: ['health', 'work', 'learning', 'finance', 'relations'] }
    });
  }, []);

  const fetchPredictiveInsights = useCallback(async () => {
    if(!ai) { 
      showToast("کلید API هوش مصنوعی یافت نشد. بینش‌های پیش‌فرض بارگذاری شدند.", "error");
      setPredictiveInsights([
          { id: 'pi1', type: 'warning', icon: <XCircleIcon className="w-5 h-5"/>, title: toPersianDigits('کمبود خواب احتمالی'), text: toPersianDigits('الگوی خواب اخیر شما نشان‌دهنده کمبود استراحت است. این می‌تواند بر تمرکز و انرژی شما تأثیر بگذارد.'), actionText: toPersianDigits('مشاهده نکات بهبود خواب'), actionType: 'navigate', actionTarget: 'Health' },
          { id: 'pi2', type: 'opportunity', icon: <StarIcon className="w-5 h-5"/>, title: toPersianDigits('زمان طلایی برای یادگیری'), text: toPersianDigits('سطح انرژی پیش‌بینی‌شده شما برای ۲ ساعت آینده بالاست. زمان خوبی برای کار روی اهداف یادگیری است.'), actionText: toPersianDigits('مشاهده اهداف یادگیری'), actionType: 'navigate', actionTarget: 'Learning' }
      ]);
      return;
    }
    setIsLoadingPredictiveInsights(true);
    try {
        const prompt = `بر اساس داده‌های فرضی کاربر (مانند الگوی خواب، فعالیت بدنی، وظایف آتی)، ۲ بینش پیش‌بینی‌کننده سلامت یا بهره‌وری به زبان فارسی تولید کن. هر بینش باید شامل type ('warning', 'opportunity', 'forecast'), title, text (متن کامل بینش), actionText (متن دکمه اقدام), actionType ('navigate', 'console'), و actionTarget (نام صفحه یا پیام کنسول) باشد. پاسخ را به صورت آرایه JSON ارائه بده.`;
        const response: GenerateContentResponse = await ai.models.generateContent({ model: AI_MODEL_NAME, contents: prompt, config: { responseMimeType: "application/json" } });
        const data = parseJsonFromString<Omit<PredictiveInsightAlert, 'id' | 'icon'>[]>(response.text);
        
        if (data) {
            const insightsWithIcons: PredictiveInsightAlert[] = data.map((item, index) => {
                let icon: React.ReactNode = <LightbulbIcon className="w-5 h-5"/>;
                if(item.type === 'warning') icon = <XCircleIcon className="w-5 h-5"/>;
                if(item.type === 'opportunity') icon = <StarIcon className="w-5 h-5"/>;
                if(item.type === 'health_insight') icon = <HeartIcon className="w-5 h-5"/>;
                return { ...item, id: `pi-${Date.now()}-${index}`, icon };
            });
            setPredictiveInsights(insightsWithIcons);
        } else {
            throw new Error("Failed to parse JSON response from AI for predictive insights.");
        }
    } catch (error: any) {
        console.error("Error fetching predictive insights:", error);
        if (error.message && error.message.includes("RESOURCE_EXHAUSTED")) {
            showToast("محدودیت استفاده از API هوش مصنوعی برای بینش‌های پیش‌بینی‌کننده اعمال شده است. لطفاً بعداً امتحان کنید یا طرح خود را بررسی کنید.", "error");
        } else {
            showToast("خطا در دریافت بینش‌های پیش‌بینی‌کننده.", "error");
        }
        setPredictiveInsights([
            { id: 'pi1', type: 'warning', icon: <XCircleIcon className="w-5 h-5"/>, title: toPersianDigits('کمبود خواب احتمالی'), text: toPersianDigits('الگوی خواب اخیر شما نشان‌دهنده کمبود استراحت است. این می‌تواند بر تمرکز و انرژی شما تأثیر بگذارد.'), actionText: toPersianDigits('مشاهده نکات بهبود خواب'), actionType: 'navigate', actionTarget: 'Health' },
            { id: 'pi2', type: 'opportunity', icon: <StarIcon className="w-5 h-5"/>, title: toPersianDigits('زمان طلایی برای یادگیری'), text: toPersianDigits('سطح انرژی پیش‌بینی‌شده شما برای ۲ ساعت آینده بالاست. زمان خوبی برای کار روی اهداف یادگیری است.'), actionText: toPersianDigits('مشاهده اهداف یادگیری'), actionType: 'navigate', actionTarget: 'Learning' }
        ]);
    } finally {
        setIsLoadingPredictiveInsights(false);
    }
  }, [ai, showToast]);

  const fetchContentFeed = useCallback(async () => {
    if(!ai) { 
        showToast("کلید API هوش مصنوعی یافت نشد. محتوای پیش‌فرض بارگذاری شد.", "error");
        setContentFeedItems([
            { id: 'cf1', type: 'article', title: 'چگونه تمرکز عمیق را در دنیای پرآشوب امروز پرورش دهیم؟', source: 'وب‌سایت مدیتیشن فردا', url: '#', thumbnailUrl: `https://picsum.photos/seed/article${Date.now()}/300/200` },
            { id: 'cf2', type: 'video', title: 'آموزش تکنیک‌های مدیریت زمان موثر', source: 'کانال یوتیوب بهره‌وری پلاس', url: '#', thumbnailUrl: `https://picsum.photos/seed/video${Date.now()}/300/200` },
            { id: 'cf3', type: 'tip', title: 'نکته روز: برای افزایش خلاقیت، هر روز ۱۵ دقیقه پیاده‌روی کنید.', source: 'LifeOrchestrator AI', url: '#'},
        ]);
        return;
    }
    setIsLoadingContentFeed(true);
    try {
        const interests = topGoalsData.map(g => g.category).join(', ') || 'توسعه فردی';
        const prompt = `بر اساس علایق کاربر (${interests})، ۳ آیتم محتوای شخصی‌سازی شده (مقاله، ویدیو، پادکست، دوره یا نکته) به زبان فارسی پیشنهاد بده. هر آیتم باید شامل type, title, source (منبع) و url باشد. thumbnail_url اختیاری است. پاسخ را به صورت آرایه JSON ارائه بده.`;
        const response: GenerateContentResponse = await ai.models.generateContent({ model: AI_MODEL_NAME, contents: prompt, config: { responseMimeType: "application/json" } });
        const data = parseJsonFromString<Omit<PersonalizedContentItem, 'id'>[]>(response.text);

        if (data) {
            setContentFeedItems(data.map((item, index) => ({...item, id: `cf-${Date.now()}-${index}`})));
        } else {
            throw new Error("Failed to parse JSON response from AI for content feed.");
        }

    } catch (error: any) {
        console.error("Error fetching content feed:", error);
        if (error.message && error.message.includes("RESOURCE_EXHAUSTED")) {
            showToast("محدودیت استفاده از API هوش مصنوعی برای خوراک محتوا اعمال شده است. لطفاً بعداً امتحان کنید یا طرح خود را بررسی کنید.", "error");
        } else {
            showToast("خطا در دریافت خوراک محتوا.", "error");
        }
        setContentFeedItems([
            { id: 'cf1', type: 'article', title: 'چگونه تمرکز عمیق را در دنیای پرآشوب امروز پرورش دهیم؟', source: 'وب‌سایت مدیتیشن فردا', url: '#', thumbnailUrl: `https://picsum.photos/seed/article${Date.now()}/300/200` },
            { id: 'cf2', type: 'video', title: 'آموزش تکنیک‌های مدیریت زمان موثر', source: 'کانال یوتیوب بهره‌وری پلاس', url: '#', thumbnailUrl: `https://picsum.photos/seed/video${Date.now()}/300/200` },
            { id: 'cf3', type: 'tip', title: 'نکته روز: برای افزایش خلاقیت، هر روز ۱۵ دقیقه پیاده‌روی کنید.', source: 'LifeOrchestrator AI', url: '#'},
        ]);
    } finally {
        setIsLoadingContentFeed(false);
    }
  }, [ai, showToast, topGoalsData]);

  const fetchHolisticScoreDetails = useCallback(async () => {
    const simulatedScores: DomainScore[] = [
      { domainName: toPersianDigits("سلامت"), score: Math.floor(Math.random() * 40) + 60, aiRecommendation: toPersianDigits("ادامه دادن به برنامه ورزشی منظم و بررسی بیشتر کیفیت خواب می‌تواند مفید باشد."), icon: <HeartIcon className="w-5 h-5 text-green-400" /> },
      { domainName: toPersianDigits("مالی"), score: Math.floor(Math.random() * 30) + 50, aiRecommendation: toPersianDigits("بررسی مجدد بودجه ماهانه و شناسایی فرصت‌های پس‌انداز بیشتر توصیه می‌شود."), icon: <WalletIcon className="w-5 h-5 text-yellow-400" />},
      { domainName: toPersianDigits("روابط"), score: Math.floor(Math.random() * 20) + 75, aiRecommendation: toPersianDigits("برنامه‌ریزی برای وقت گذراندن با کیفیت با عزیزانتان را در اولویت قرار دهید."), icon: <RelationshipIcon className="w-5 h-5 text-pink-400" /> },
      { domainName: toPersianDigits("کار/بهره‌وری"), score: Math.floor(Math.random() * 40) + 55, aiRecommendation: toPersianDigits("تجزیه وظایف بزرگ به مراحل کوچکتر می‌تواند به مدیریت بهتر حجم کاری کمک کند."), icon: <BriefcaseIcon className="w-5 h-5 text-blue-400" />},
      { domainName: toPersianDigits("یادگیری/رشد"), score: Math.floor(Math.random() * 30) + 65, aiRecommendation: toPersianDigits("اختصاص دادن زمان مشخصی در هفته برای یادگیری مهارت جدید می‌تواند مفید باشد."), icon: <BookIcon className="w-5 h-5 text-purple-400" />},
    ];
    setDomainScores(simulatedScores);
    const overall = Math.round(simulatedScores.reduce((acc, curr) => acc + curr.score, 0) / simulatedScores.length);
    setLifeScore(overall);
  }, []);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  useEffect(() => {
    fetchDomainsAndConnections();
    fetchPredictiveInsights();
    fetchContentFeed();
    fetchHolisticScoreDetails();

    const moods = ["امروز پرانرژی به نظر می‌رسی! 😊", "امیدوارم روز خوبی داشته باشی ✨", "کمی استراحت چطور است؟ ☕"];
    setMoodText(moods[Math.floor(Math.random() * moods.length)]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 
  
  useEffect(() => {
    chatMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);


  const handleSendChatMessage = async () => {
    if (!chatInput.trim() || !ai) return;
    const userMessage: Message = { id: `m${Date.now()}`, text: chatInput, sender: 'user', timestamp: Date.now() };
    setChatMessages(prev => [...prev, userMessage]);
    const currentChatInput = chatInput;
    setChatInput('');
    setIsAiChatLoading(true);

    try {
      const prompt = `کاربر می‌پرسد: "${currentChatInput}". یک پاسخ مفید و دوستانه به زبان فارسی ارائه بده.`;
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: AI_MODEL_NAME,
        contents: prompt,
      });
      const aiResponseText = response.text || toPersianDigits("متاسفانه نتوانستم پاسخ مناسبی پیدا کنم.");
      setChatMessages(prev => [...prev, { id: `m${Date.now() + 1}`, text: aiResponseText, sender: 'ai', timestamp: Date.now() }]);
    } catch (error: any) {
      console.error("AI Chat Error:", error);
      let errorMessageText = toPersianDigits("خطایی در ارتباط با دستیار رخ داد.");
      if (error.message && error.message.includes("RESOURCE_EXHAUSTED")) {
          errorMessageText = toPersianDigits("محدودیت استفاده از API چت هوش مصنوعی اعمال شده است. لطفاً بعداً امتحان کنید.");
          showToast(errorMessageText, "error"); 
      }
      setChatMessages(prev => [...prev, { id: `m${Date.now() + 1}`, text: errorMessageText, sender: 'ai', timestamp: Date.now() }]);
    } finally {
      setIsAiChatLoading(false);
    }
  };

  const handleGenerateDailyInsight = async () => {
    if(!ai) { showToast("کلید API هوش مصنوعی یافت نشد.", "error"); return; }
    setIsDailyInsightLoading(true);
    setDailyInsight(null);
    try {
      const prompt = "یک بینش یا نکته کوتاه و الهام‌بخش برای کاربر در شروع روز به زبان فارسی ارائه بده.";
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: AI_MODEL_NAME,
        contents: prompt,
      });
      setDailyInsight(response.text || toPersianDigits("امروز روز خوبی برای شروعی دوباره است!"));
    } catch (error: any) {
      console.error("Daily Insight Error:", error);
      if (error.message && error.message.includes("RESOURCE_EXHAUSTED")) {
        showToast("محدودیت استفاده از API برای بینش روزانه اعمال شده است.", "error");
        setDailyInsight(toPersianDigits("محدودیت API. لطفاً بعداً دوباره امتحان کنید."));
      } else {
        setDailyInsight(toPersianDigits("خطا در دریافت بینش روزانه."));
      }
    } finally {
      setIsDailyInsightLoading(false);
    }
  };
  
  const handleAISuggestionFeedback = (suggestionId: string, feedback: 'accepted' | 'declined') => {
    setSuggestionCardStates(prev => ({ ...prev, [suggestionId]: { ...prev[suggestionId], feedbackIcon: feedback } }));
    
    setTimeout(() => {
      setSuggestionCardStates(prev => ({ ...prev, [suggestionId]: { ...prev[suggestionId], visible: false } }));
      if (feedback === 'accepted') {
          showToast("پیشنهاد پذیرفته شد.", 'success');
      } else {
          showToast("پیشنهاد رد شد.", 'info');
      }
    }, 1200);
  };

  const handleShowXAI = (title: string, explanation: string) => {
    setXaiModalContent({ title, explanation });
    setXaiModalOpen(true);
  };
  
  const handleToggleTaskCompletion = (taskId: string) => {
    setImportantTasksData(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleCompleteHabitToday = (habitId: string) => {
     setTrackedHabitsData(prevHabits =>
      prevHabits.map(habit =>
        habit.id === habitId ? { ...habit, isCompletedToday: true } : habit
      )
    );
  };

  const triggerAutonomousAction = useCallback(async () => {
    if (isLoadingAutonomousAction || autonomousActions.length > 2 || !ai) return; 

    setIsLoadingAutonomousAction(true);
    try {
      const contexts = [
        "کاربر برای ۲ ساعت بدون وقفه روی وظایف تمرکز کرده است.",
        "کاربر در گزارش خلق و خوی خود، احساس خستگی و استرس کرده است.",
        "زمان زیادی از آخرین باری که کاربر آب نوشیده گذشته است.",
        "هوا آفتابی است و کاربر مدت زیادی در داخل خانه بوده است."
      ];
      const randomContext = contexts[Math.floor(Math.random() * contexts.length)];

      const actionTypes = [
        { type: 'meditation', icon: <LightbulbIcon className="w-5 h-5" />, verb: "شروع کرد", xaiKey: "autonomous_meditation" },
        { type: 'break', icon: <ClockIcon className="w-5 h-5" />, verb: "پیشنهاد کرد", xaiKey: "autonomous_break" },
        { type: 'hydration', icon: <HeartIcon className="w-5 h-5" />, verb: "یادآوری کرد", xaiKey: "autonomous_hydration" },
      ];
      const randomActionType = actionTypes[Math.floor(Math.random() * actionTypes.length)];

      const prompt = `با توجه به زمینه: "${randomContext}", یک اقدام خودمختار سلامتی توسط هوش مصنوعی برای کاربر پیشنهاد شده است. نوع اقدام: ${randomActionType.type}. لطفاً یک متن اقدام ("actionText") مناسب به فارسی بنویس که توضیح دهد هوش مصنوعی چه کاری انجام داده یا پیشنهاد داده است (مثلاً "هوش مصنوعی یک جلسه مدیتیشن ۵ دقیقه‌ای برای شما ${randomActionType.verb}.") و یک دلیل ("xaiReason") کوتاه برای این اقدام ارائه بده. پاسخ را به صورت JSON با کلیدهای "actionText" و "xaiReason" برگردان.`;
      
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: AI_MODEL_NAME,
        contents: prompt,
        config: {responseMimeType: "application/json"}
      });
      
      const parsedData = parseJsonFromString<{actionText: string; xaiReason: string}>(response.text);

      if (parsedData && parsedData.actionText && parsedData.xaiReason) {
        const newAction: AIAutonomousAction = {
          id: `auto-action-${Date.now()}`,
          icon: randomActionType.icon,
          actionText: parsedData.actionText,
          xaiReason: toPersianDigits(parsedData.xaiReason || xaiExplanationsDb[randomActionType.xaiKey] || "هوش مصنوعی این اقدام را برای بهبود سلامتی شما پیشنهاد کرده است."),
          timestamp: new Date().toISOString(),
          cancelActionHandler: () => handleCancelAutonomousAction(`auto-action-${Date.now()}`),
        };
        setAutonomousActions(prev => [newAction, ...prev.slice(0, 2)]); 
        showToast(toPersianDigits(`اقدام جدید توسط AI: ${parsedData.actionText}`), 'info');
      } else {
        throw new Error("Failed to parse JSON response from AI for autonomous action.")
      }
    } catch (error: any) {
      console.error("Error triggering autonomous action:", error);
       if (error.message && error.message.includes("RESOURCE_EXHAUSTED")) {
        showToast("محدودیت API برای اقدامات خودکار AI.", "error");
      }
    } finally {
      setIsLoadingAutonomousAction(false);
    }
  }, [ai, autonomousActions.length, isLoadingAutonomousAction, showToast]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (Math.random() < 0.1) { 
        triggerAutonomousAction();
      }
    }, 30000); 
    return () => clearInterval(intervalId);
  }, [triggerAutonomousAction]);

  const handleCancelAutonomousAction = (actionId: string) => {
    setAutonomousActions(prev => prev.filter(action => action.id !== actionId));
    showToast("اقدام لغو شد.", 'info');
  };

  const handleQuickWellnessAction = (actionType: 'breathing' | 'break' | 'music') => {
    let messageText = ""; 
    switch (actionType) {
      case 'breathing':
        messageText = "تمرین تنفس ۵ دقیقه‌ای شروع شد (شبیه‌سازی شده).";
        break;
      case 'break':
        messageText = " تایمر استراحت ۱۰ دقیقه‌ای فعال شد (شبیه‌سازی شده).";
        break;
      case 'music':
        messageText = "در حال پخش موسیقی تمرکز (شبیه‌سازی شده).";
        break;
    }
    showToast(toPersianDigits(messageText), 'success');
  };

  const handlePredictiveInsightAction = (insight: PredictiveInsightAlert) => {
    if (insight.actionType === 'navigate' && insight.actionTarget) {
      navigateTo(insight.actionTarget as PageName);
    } else if (insight.actionType === 'console') {
      console.log(`Action for insight "${insight.title}": ${insight.actionTarget}`);
      showToast(toPersianDigits(`اقدام برای "${insight.title}" انجام شد (شبیه‌سازی).`), 'info');
    }
  };


  return (
    <div className="page">
      <WelcomeCard userName={userName} moodText={moodText} lifeScore={lifeScore} />
      
      <div className="mb-6">
        <button 
          onClick={() => setIsHolisticScoreModalOpen(true)} 
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3.5 rounded-xl shadow-lg hover:shadow-xl hover:opacity-90 transition-all flex items-center justify-center text-sm font-medium"
        >
            <StarIcon className="w-5 h-5 mr-2"/> {toPersianDigits("مشاهده جزئیات امتیاز جامع زندگی")}
        </button>
      </div>
      
      <h3 className="text-xl font-semibold mb-4 text-gray-800">{toPersianDigits("داشبورد اصلی")}</h3>

      <WidgetCard
        title={toPersianDigits("روتین‌های سریع سلامتی")}
        icon={<HeartIcon className="w-5 h-5 text-pink-600" />}
        titleColorClass="text-pink-700"
        className="border-pink-200/70 mb-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button 
            onClick={() => handleQuickWellnessAction('breathing')}
            className="flex items-center justify-center text-xs py-2 px-3 bg-sky-100 hover:bg-sky-200 text-sky-700 rounded-md transition-colors"
          >
            <AdjustmentsVerticalIcon className="w-4 h-4 mr-1.5 rtl:ml-1.5 rtl:mr-0"/> {toPersianDigits("تمرین تنفس")}
          </button>
          <button 
            onClick={() => handleQuickWellnessAction('break')}
            className="flex items-center justify-center text-xs py-2 px-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-md transition-colors"
          >
            <ClockIcon className="w-4 h-4 mr-1.5 rtl:ml-1.5 rtl:mr-0"/> {toPersianDigits("استراحت کوتاه")}
          </button>
          <button 
            onClick={() => handleQuickWellnessAction('music')}
            className="flex items-center justify-center text-xs py-2 px-3 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-md transition-colors"
          >
            <PlayIcon className="w-4 h-4 mr-1.5 rtl:ml-1.5 rtl:mr-0"/> {toPersianDigits("موسیقی تمرکز")}
          </button>
        </div>
      </WidgetCard>

      {autonomousActions.length > 0 && (
        <WidgetCard
            title={toPersianDigits("اقدامات خودکار AI")}
            icon={<ActivityLogIcon className="w-5 h-5 text-cyan-600" />}
            titleColorClass="text-cyan-700"
            className="border-cyan-200/70 mb-6"
        >
            <div className="space-y-3">
                {autonomousActions