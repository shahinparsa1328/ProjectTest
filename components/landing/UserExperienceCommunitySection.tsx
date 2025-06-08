import React from 'react';

// Icon for User Experience & Community Section
const UsersIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-3.741-3.741M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

const InfoListItemUX: React.FC<{ title?: string; children: React.ReactNode; className?: string }> = ({ title, children, className = "text-gray-300 text-sm" }) => (
  <li className={`list-disc list-inside ml-2 ${className}`}>
    {title && <strong className="text-sky-400">{title}: </strong>}
    {children}
  </li>
);

const SectionBlockUX: React.FC<{ title: string; children: React.ReactNode; className?: string; note?: string }> = ({ title, children, className = "bg-slate-800 p-6 rounded-xl shadow-xl", note }) => (
    <div className={className}>
        <h3 className="text-xl font-semibold text-sky-300 mb-4">{title}</h3>
        {children}
        {note && <p className="text-xs text-gray-500 mt-3 italic">{note}</p>}
    </div>
);

const UserExperienceCommunitySection: React.FC = () => {
  const adaptiveUI = [
    { title: "Context-Aware Adaptability", description: "AI uses contextual data (location, time, user activity like driving/studying, device state) and learned preferences to dynamically adjust the UI." },
    { title: "Dynamic UI Adjustments", description: "Includes changing layouts, showing/hiding widgets, altering visual modes (day/night), and adjusting notification tone/urgency (e.g., simpler voice UI if driving, focused learning widgets if studying)." },
    { title: "Responsive Design", description: "Ensures optimal UI performance and appearance across all screen sizes (mobile, tablet, desktop)." },
  ];

  const infinitePersonalization = [
    { title: "Customizable Dashboards", description: "Users can fully customize their dashboards using visual tools like Drag-and-Drop to add, remove, or reorder modules and widgets." },
    { title: "Custom Workflows", description: "Users can define personal workflows (e.g., 'my morning power-up routine' combining tasks, habits, and AI suggestions). AI can suggest optimizations based on usage." },
    { title: "Themes & Styles", description: "Users can select from a variety of visual themes, color palettes, and fonts to personalize the app's appearance." },
    { title: "Simplicity in Personalization", description: "AI ensures that these deep personalization capabilities enhance the user experience without introducing unnecessary complexity." }
  ];
  
  const userCommunityUGC = [
    { title: "UGC Recommender System", description: "AI analyzes user activities and interests within the application to suggest relevant User-Generated Content (UGC) from the community." },
    { title: "Content Suggestion Scope", description: "Includes shared task templates, habit plans, personalized learning paths, or inspiring experiences and routines shared by other users." },
    { title: "Quality Assurance for UGC", description: "A rating and review system allows users to evaluate shared content, ensuring quality and relevance. AI assists in identifying high-quality contributions." },
    { title: "AI-Assisted Content Moderation", description: "Utilizes text and image classification models to help identify and flag inappropriate or spam content within community forums and shared resources, maintaining a positive environment." }
  ];
  

  return (
    <section id="ux-community" className="py-16 md:py-24 bg-slate-900"> {/* Section background */}
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <UsersIcon className="w-16 h-16 text-sky-400 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-4">
            Phase 5.1: Adaptive UX, Deep Personalization & Community
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Simulated development of an adaptive, hyper-personalized user interface, and fostering a vibrant, AI-assisted user community.
          </p>
        </div>

        <div className="space-y-12">
          <SectionBlockUX title="Adaptive UI (Context-Aware)" className="bg-slate-800 p-6 rounded-xl shadow-xl" note="AI generates UI code (React) that dynamically responds to user needs and context, using real-time data.">
            <ul className="space-y-3">
              {adaptiveUI.map((item, index) => (
                <InfoListItemUX key={index} title={item.title}>{item.description}</InfoListItemUX>
              ))}
            </ul>
          </SectionBlockUX>

          <SectionBlockUX title="Infinite Personalization UI/UX" className="bg-slate-800 p-6 rounded-xl shadow-xl" note="AI generates UI/UX code (React) for deep customization of dashboards, workflows, and visual styles.">
            <ul className="space-y-3">
              {infinitePersonalization.map((item, index) => (
                <InfoListItemUX key={index} title={item.title}>{item.description}</InfoListItemUX>
              ))}
            </ul>
          </SectionBlockUX>

          <SectionBlockUX title="User Community & UGC Recommendation" className="bg-slate-800 p-6 rounded-xl shadow-xl" note="AI implements recommender systems for UGC and assists in content moderation; UI code (React) for community features.">
            <ul className="space-y-3">
              {userCommunityUGC.map((item, index) => (
                <InfoListItemUX key={index} title={item.title}>{item.description}</InfoListItemUX>
              ))}
            </ul>
          </SectionBlockUX>
        </div>
        
        <p className="text-xs text-gray-400 mt-12 text-center">
          Simulated Outputs: Final and personalized user interface (UI/UX code for React), user community modules (code for forums, template sharing, UGC recommender system). AI assists in generating responsive UI components, personalization logic, recommendation algorithms, and moderation tools. Extensive A/B testing and user feedback loops are critical.
        </p>
      </div>
    </section>
  );
};

export default UserExperienceCommunitySection;