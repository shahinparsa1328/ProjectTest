
import React from 'react';

export interface FeatureCardProps {
  icon: React.ReactElement<{ className?: string }>; // Changed to be more specific
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-slate-800 p-8 rounded-xl shadow-xl hover:shadow-sky-500/40 border border-slate-700 hover:border-sky-500 transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center">
      <div className="flex-shrink-0 p-3 mb-5 rounded-full bg-sky-500/10 text-sky-400">
        {React.cloneElement(icon, { className: "w-10 h-10" })}
      </div>
      <h3 className="text-xl font-semibold text-sky-300 mb-3 text-center">{title}</h3>
      <p className="text-gray-400 text-sm text-center leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
