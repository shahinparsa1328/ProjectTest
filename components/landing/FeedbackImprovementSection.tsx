import React from 'react';

// Icon for Feedback & Continuous Improvement Section
const ArrowPathIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);

const InfoListItemFeedback: React.FC<{ title?: string; children: React.ReactNode; className?: string }> = ({ title, children, className = "text-gray-300 text-sm" }) => (
  <li className={`list-disc list-inside ml-2 ${className}`}>
    {title && <strong className="text-sky-400">{title}: </strong>}
    {children}
  </li>
);

const SectionBlockFeedback: React.FC<{ title: string; children: React.ReactNode; className?: string; note?: string }> = ({ title, children, className = "bg-slate-800 p-6 rounded-xl shadow-xl", note }) => (
    <div className={className}>
        <h3 className="text-xl font-semibold text-sky-300 mb-4">{title}</h3>
        {children}
        {note && <p className="text-xs text-gray-500 mt-3 italic">{note}</p>}
    </div>
);

const FeedbackImprovementSection: React.FC = () => {
  const feedbackAnalysis = [
    { title: "Multi-Channel Monitoring", description: "AI continuously monitors feedback from app stores (user reviews), social media mentions, and in-app feedback channels (surveys, support tickets)." },
    { title: "NLP & Sentiment Analysis", description: "Utilizes Natural Language Processing and Sentiment Analysis to automatically identify, categorize, and prioritize recurring themes, reported bugs, feature requests, and overall user sentiment." },
    { title: "Actionable Reporting", description: "Generates summarized reports and dashboards highlighting key feedback trends for the product and development teams." },
  ];

  const usageAnalysis = [
    { title: "Behavioral Analytics Integration", description: "AI analyzes anonymized app usage data from integrated tools (e.g., Google Analytics, Mixpanel, Firebase Analytics)." },
    { title: "Insight Generation", description: "Identifies user journeys, most/least used features, drop-off points in key funnels (e.g., onboarding, task completion), and A/B test results." },
    { title: "UX Weakness Identification", description: "Helps pinpoint areas of friction in the user experience and opportunities for optimizing user flows and feature discoverability." }
  ];
  
  const productImprovements = [
    { title: "Data-Driven Suggestions", description: "AI proposes future product improvements based on a comprehensive analysis of user feedback and app usage data." },
    { title: "Types of Improvements", description: "Includes enhancing existing features for better usability, suggesting new functionalities based on popular requests or identified needs, and optimizing UX flows." },
    { title: "Prioritization Assistance", description: "AI can help prioritize suggested improvements by estimating their potential impact on user satisfaction, engagement, and retention, balanced against estimated development complexity." },
    { title: "Roadmap Alignment", description: "Ensures proposed improvements align with the overall product vision and strategic roadmap, contributing to sustainable growth." }
  ];

  const supportChatbot = [
     { title: "Knowledge-Based Assistance", description: "An AI-powered chatbot trained on a dynamic knowledge base (product documentation, FAQs, resolved support conversations) to answer frequently asked user questions." },
     { title: "Automated Common Issue Resolution", description: "Provides instant responses and troubleshooting steps for common issues, available 24/7." },
     { title: "Seamless Escalation", description: "If unable to resolve an issue, the chatbot can intelligently gather relevant information and seamlessly escalate the conversation to a human support agent."}
  ];

  const aiCollaborationPoints = [
    "Clarity and Precision in Instructions: The more precise and clear the instructions for AI, the higher the quality of output you will receive.",
    "Continuous Feedback: Providing constructive and accurate feedback to AI is essential to help it learn and improve its performance.",
    "Iteration and Refinement: Do not expect AI to provide a complete and perfect output on the first try. The process of iteration and refinement is crucial.",
    "Combination of Human and Artificial Intelligence: The best results are achieved when AI acts as a powerful tool alongside human creativity, critical thinking, and experience."
  ];
  

  return (
    <section id="feedback-improvement" className="py-16 md:py-24 bg-slate-900"> {/* Section background */}
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <ArrowPathIcon className="w-16 h-16 text-sky-400 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-4">
            Phase 6.3: Feedback & Continuous Improvement
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Simulated design of AI-assisted processes for collecting user feedback post-release and leveraging it for ongoing product enhancement and evolution.
          </p>
        </div>

        <div className="space-y-12">
          <SectionBlockFeedback title="AI-Driven Feedback Analysis" className="bg-slate-800 p-6 rounded-xl shadow-xl" note="AI uses NLP and sentiment analysis to process feedback from multiple channels.">
            <ul className="space-y-3">
              {feedbackAnalysis.map((item, index) => (
                <InfoListItemFeedback key={index} title={item.title}>{item.description}</InfoListItemFeedback>
              ))}
            </ul>
          </SectionBlockFeedback>

          <SectionBlockFeedback title="AI-Powered App Usage Analysis" className="bg-slate-800 p-6 rounded-xl shadow-xl" note="AI analyzes behavioral data to identify UX weaknesses and feature engagement patterns.">
            <ul className="space-y-3">
              {usageAnalysis.map((item, index) => (
                <InfoListItemFeedback key={index} title={item.title}>{item.description}</InfoListItemFeedback>
              ))}
            </ul>
          </SectionBlockFeedback>

          <SectionBlockFeedback title="AI-Proposed Product Improvements" className="bg-slate-800 p-6 rounded-xl shadow-xl" note="AI synthesizes feedback and usage data to suggest and help prioritize future enhancements.">
            <ul className="space-y-3">
              {productImprovements.map((item, index) => (
                <InfoListItemFeedback key={index} title={item.title}>{item.description}</InfoListItemFeedback>
              ))}
            </ul>
          </SectionBlockFeedback>

           <SectionBlockFeedback title="Optional: AI Support Chatbot (Conceptual)" className="bg-slate-800 p-6 rounded-xl shadow-xl" note="AI can power an initial support layer, reducing human agent workload and providing quick answers.">
            <ul className="space-y-3">
              {supportChatbot.map((item, index) => (
                <InfoListItemFeedback key={index} title={item.title}>{item.description}</InfoListItemFeedback>
              ))}
            </ul>
          </SectionBlockFeedback>

           <SectionBlockFeedback title="Key Points for Successful Collaboration with AI" className="bg-sky-900/50 border border-sky-700 p-6 rounded-xl shadow-xl" note="These principles guide the entire AI-assisted development process.">
            <ul className="space-y-3">
              {aiCollaborationPoints.map((item, index) => (
                <InfoListItemFeedback key={index} className="text-sky-200 text-sm">{item}</InfoListItemFeedback>
              ))}
            </ul>
          </SectionBlockFeedback>
        </div>
        
        <p className="text-xs text-gray-400 mt-12 text-center">
          Simulated Outputs: User feedback reports (summarized and categorized by AI), a continuously updated product roadmap with AI-suggested improvements and prioritizations, and (if implemented) an initial support chatbot module (code and knowledge base). The cycle of feedback, development, testing, and release becomes a continuous loop.
        </p>
      </div>
    </section>
  );
};

export default FeedbackImprovementSection;