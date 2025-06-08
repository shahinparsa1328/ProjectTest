import React from 'react';
import Navbar from './shared/Navbar';
import HeroSection from './landing/HeroSection';
import PhilosophySection from './landing/PhilosophySection';
import CoreFeaturesSection from './landing/CoreFeaturesSection';
import PhaseOneAnalysisOutputSection from './landing/PhaseOneAnalysisOutputSection';
import MarketAnalysisSection from './landing/MarketAnalysisSection';
import RoadmapMVPSection from './landing/RoadmapMVPSection';
import SystemArchitectureSection from './landing/SystemArchitectureSection';
import UXUIDesignSection from './landing/UXUIDesignSection';
import NLUEngineSection from './landing/NLUEngineSection';
import NLGEngineSection from './landing/NLGEngineSection';
import MLEngineSection from './landing/MLEngineSection';
import ReasoningEngineSection from './landing/ReasoningEngineSection';
import AIPersonaEngineSection from './landing/AIPersonaEngineSection';
import { CoreAIAssistantSection } from './landing/CoreAIAssistantSection'; // Changed to named import
import GoalProjectTaskSection from './landing/GoalProjectTaskSection';
import HabitEngineeringSection from './landing/HabitEngineeringSection';
import HealthWellbeingSection from './landing/HealthWellbeingSection';
import LifelongLearningSection from './landing/LifelongLearningSection';
import FinancialManagementSection from './landing/FinancialManagementSection';
import SmartTravelSection from './landing/SmartTravelSection';
import SmartHomeSection from './landing/SmartHomeSection';
import SmartFamilySection from './landing/SmartFamilySection';
import FamilyPagePhaseThreePlanSection from './FamilyPagePhaseThreePlanSection';
import FamilyPagePhaseThreePlanSectionCommunity from './FamilyPagePhaseThreePlanSectionCommunity';
import FamilyPagePhaseThreePlanSectionIntegration from './FamilyPagePhaseThreePlanSectionIntegration';
import FamilyPagePhaseThreePlanSectionFinal from './FamilyPagePhaseThreePlanSectionFinal';
import CommunityPagePhaseOnePlanSection from './landing/CommunityPagePhaseOnePlanSection'; 
import CommunityUserProfilePlanSection from './landing/CommunityUserProfilePlanSection';
import CommunityForumsPlanSection from './landing/CommunityForumsPlanSection';
import CommunityAIIntegrationPlanSection from './landing/CommunityAIIntegrationPlanSection';
import CommunityPhaseOneTechDesignSection from './landing/CommunityPhaseOneTechDesignSection';
import CommunityAdvancedProfilePlanSection from './landing/CommunityAdvancedProfilePlanSection'; 
import CommunityAdvancedForumsPlanSection from './landing/CommunityAdvancedForumsPlanSection';
import CommunitySpecializedGroupsPlanSection from './landing/CommunitySpecializedGroupsPlanSection';
import CommunityUGCTemplatesPlanSection from './landing/CommunityUGCTemplatesPlanSection';
import CommunityGroupEventsPlanSection from './landing/CommunityGroupEventsPlanSection';
import CommunityAdvancedAIFacilitationPlanSection from './landing/CommunityAdvancedAIFacilitationPlanSection';
import CommunityTechDesignEnhancementsPlanSection from './landing/CommunityTechDesignEnhancementsPlanSection';
import CommunityAdvancedCollaborationPlanSection from './landing/CommunityAdvancedCollaborationPlanSection';
import CommunityMentorshipPlanSection from './landing/CommunityMentorshipPlanSection'; 
import CommunityHealthManagementPlanSection from './landing/CommunityHealthManagementPlanSection'; 
import CommunityDeepIntegrationPlanSection from './landing/CommunityDeepIntegrationPlanSection'; 
import CommunityRewardsPlanSection from './landing/CommunityRewardsPlanSection';
import CommunityLargeEventsPlanSection from './landing/CommunityLargeEventsPlanSection'; // New
import CommunityFinalOptimizationPlanSection from './landing/CommunityFinalOptimizationPlanSection'; // New
import CommunityOverallConclusionSection from './landing/CommunityOverallConclusionSection'; // New
import UserExperienceCommunitySection from './landing/UserExperienceCommunitySection';
import InfrastructureSecurityBusinessSection from './landing/InfrastructureSecurityBusinessSection';
import ComprehensiveTestingSection from './landing/ComprehensiveTestingSection';
import DeploymentPrepSection from './landing/DeploymentPrepSection';
import FeedbackImprovementSection from './landing/FeedbackImprovementSection';
import SecuritySection from './landing/SecuritySection';
import StartJourneySection from './landing/StartJourneySection'; 
import CallToActionSection from './landing/CallToActionSection';
import Footer from './shared/Footer';

const LandingPageLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <PhilosophySection />
        <CoreFeaturesSection />
        <PhaseOneAnalysisOutputSection />
        <MarketAnalysisSection />
        <RoadmapMVPSection />
        <SystemArchitectureSection />
        <UXUIDesignSection />
        <NLUEngineSection />
        <NLGEngineSection />
        <MLEngineSection />
        <ReasoningEngineSection />
        <AIPersonaEngineSection />
        <CoreAIAssistantSection />
        <GoalProjectTaskSection />
        <HabitEngineeringSection />
        <HealthWellbeingSection />
        <LifelongLearningSection />
        <FinancialManagementSection />
        <SmartTravelSection />
        <SmartHomeSection />
        <SmartFamilySection />
        <FamilyPagePhaseThreePlanSection />
        <FamilyPagePhaseThreePlanSectionCommunity />
        <FamilyPagePhaseThreePlanSectionIntegration />
        <FamilyPagePhaseThreePlanSectionFinal />
        {/* Community Page Development Plan Sections */}
        <CommunityPagePhaseOnePlanSection />
        <CommunityUserProfilePlanSection />
        <CommunityForumsPlanSection /> 
        <CommunityAIIntegrationPlanSection />
        <CommunityPhaseOneTechDesignSection />
        <CommunityAdvancedProfilePlanSection />
        <CommunityAdvancedForumsPlanSection />
        <CommunitySpecializedGroupsPlanSection />
        <CommunityUGCTemplatesPlanSection />
        <CommunityGroupEventsPlanSection />
        <CommunityAdvancedAIFacilitationPlanSection />
        <CommunityTechDesignEnhancementsPlanSection />
        <CommunityAdvancedCollaborationPlanSection />
        <CommunityMentorshipPlanSection /> 
        <CommunityHealthManagementPlanSection /> 
        <CommunityDeepIntegrationPlanSection /> 
        <CommunityRewardsPlanSection />
        <CommunityLargeEventsPlanSection /> {/* New */}
        <CommunityFinalOptimizationPlanSection /> {/* New */}
        <CommunityOverallConclusionSection /> {/* New */}
        {/* General Platform Plan Sections Continue */}
        <UserExperienceCommunitySection />
        <InfrastructureSecurityBusinessSection />
        <ComprehensiveTestingSection />
        <DeploymentPrepSection />
        <FeedbackImprovementSection />
        <SecuritySection />
        <StartJourneySection /> 
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPageLayout;