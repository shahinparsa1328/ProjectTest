
import React from 'react';
import { RocketLaunchIcon } from '../shared/AppIcons'; // Import from AppIcons

const InfoListItemDeploy: React.FC<{ title?: string; children: React.ReactNode; className?: string }> = ({ title, children, className = "text-gray-300 text-sm" }) => (
  <li className={`list-disc list-inside ml-2 ${className}`}>
    {title && <strong className="text-sky-400">{title}: </strong>}
    {children}
  </li>
);

const SectionBlockDeploy: React.FC<{ title: string; children: React.ReactNode; className?: string; note?: string }> = ({ title, children, className = "bg-slate-700 p-6 rounded-xl shadow-xl", note }) => (
    <div className={className}>
        <h3 className="text-xl font-semibold text-sky-300 mb-4">{title}</h3>
        {children}
        {note && <p className="text-xs text-gray-500 mt-3 italic">{note}</p>}
    </div>
);

const DeploymentPrepSection: React.FC = () => {
  const asoGeneration = [
    { title: "Keyword & Trend Analysis", description: "AI analyzes high-volume keywords, market trends, and competitor App Store Optimization (ASO) strategies." },
    { title: "Optimized Content Creation", description: "Generates engaging and persuasive app descriptions, titles, subtitles, and keywords for Apple App Store & Google Play Store, aiming to improve discoverability and conversion rates." },
  ];

  const promotionalContent = [
    { title: "Idea Generation", description: "AI provides ideas for promotional screenshots and videos based on key product features, user personas, and app marketing best practices." },
    { title: "Initial Designs (Conceptual)", description: "Generates initial storyboards or wireframes for visual content. Future potential: AI uses generative models (e.g., DALL-E, Imagen) for initial visual asset creation from UI renders." },
    { title: "A/B Testing Proposals", description: "Suggests different versions of promotional content (e.g., various taglines, visuals, calls-to-action) for A/B testing to optimize marketing effectiveness." }
  ];
  
  const releaseChecklist = [
    { title: "Technical Preparation", description: "Certificate generation & management, code signing, build configurations for different platforms, final smoke testing on target devices." },
    { title: "Store Information & Assets", description: "Completing all product information forms, selecting appropriate categories, providing contact information, uploading privacy policies, and ensuring all required screenshots/videos meet store specifications." },
    { title: "Compliance & Guidelines", description: "Thorough review to ensure adherence to all Apple App Store and Google Play Store guidelines and policies." },
    { title: "Strategic Release Timing", description: "AI can analyze market data and competitor release schedules to suggest optimal launch windows for maximum visibility." }
  ];
  

  return (
    <section id="deployment-prep" className="py-16 md:py-24 bg-slate-800"> {/* Section background */}
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <RocketLaunchIcon className="w-16 h-16 text-sky-400 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-4">
            Phase 6.2: Deployment & Release Preparation
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Simulated design of AI-assisted processes for preparing LifeOrchestrator AI for a successful launch on app stores and the web.
          </p>
        </div>

        <div className="space-y-12">
          <SectionBlockDeploy title="AI-Generated App Store Optimization (ASO)" className="bg-slate-700 p-6 rounded-xl shadow-xl" note="AI uses NLP and market analysis to craft compelling store listings.">
            <ul className="space-y-3">
              {asoGeneration.map((item, index) => (
                <InfoListItemDeploy key={index} title={item.title}>{item.description}</InfoListItemDeploy>
              ))}
            </ul>
          </SectionBlockDeploy>

          <SectionBlockDeploy title="AI-Proposed Promotional Screenshots & Videos" className="bg-slate-700 p-6 rounded-xl shadow-xl" note="AI assists in conceptualizing marketing visuals and suggests A/B testing strategies.">
            <ul className="space-y-3">
              {promotionalContent.map((item, index) => (
                <InfoListItemDeploy key={index} title={item.title}>{item.description}</InfoListItemDeploy>
              ))}
            </ul>
          </SectionBlockDeploy>

          <SectionBlockDeploy title="AI-Generated Comprehensive Release Checklist" className="bg-slate-700 p-6 rounded-xl shadow-xl" note="AI creates a detailed checklist covering all technical, informational, and compliance steps for app store submission.">
            <ul className="space-y-3">
              {releaseChecklist.map((item, index) => (
                <InfoListItemDeploy key={index} title={item.title}>{item.description}</InfoListItemDeploy>
              ))}
            </ul>
          </SectionBlockDeploy>
        </div>
        
        <p className="text-xs text-gray-400 mt-12 text-center">
          Simulated Outputs: Final product version ready for release (conceptual binary files, installation packages), marketing content for release (ASO-optimized descriptions, screenshot/video concepts), and a comprehensive release checklist. AI performs a final review of all release assets for compliance and quality.
        </p>
      </div>
    </section>
  );
};

export default DeploymentPrepSection;
