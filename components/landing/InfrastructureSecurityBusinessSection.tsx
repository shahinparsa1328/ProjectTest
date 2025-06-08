import React from 'react';

// Icon for Infrastructure, Security & Business Section
const ServerStackIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

const InfoListItemInfra: React.FC<{ title?: string; children: React.ReactNode; className?: string }> = ({ title, children, className = "text-gray-300 text-sm" }) => (
  <li className={`list-disc list-inside ml-2 ${className}`}>
    {title && <strong className="text-sky-400">{title}: </strong>}
    {children}
  </li>
);

const SectionBlockInfra: React.FC<{ title: string; children: React.ReactNode; className?: string; note?: string }> = ({ title, children, className = "bg-slate-700 p-6 rounded-xl shadow-xl", note }) => (
    <div className={className}>
        <h3 className="text-xl font-semibold text-sky-300 mb-4">{title}</h3>
        {children}
        {note && <p className="text-xs text-gray-500 mt-3 italic">{note}</p>}
    </div>
);

const InfrastructureSecurityBusinessSection: React.FC = () => {
  const cloudOptimization = [
    { title: "Continuous Monitoring", description: "AI monitors traffic patterns, resource utilization (CPU, memory, network, I/O), and system performance in the cloud environment (e.g., AWS, GCP, Azure)." },
    { title: "Predictive Scaling", description: "Identifies traffic patterns (peak hours, seasonal growth) and predicts future resource needs. Suggests optimal auto-scaling configurations (e.g., Kubernetes HPA, AWS Auto Scaling Groups) to ensure responsiveness and efficiency." },
    { title: "Cost Optimization Strategies", description: "Proposes infrastructure adjustments to reduce cloud costs, such as leveraging Spot Instances, rightsizing resources, and optimizing database storage and queries." },
  ];

  const systemSecurity = [
    { title: "Static Application Security Testing (SAST)", description: "AI scans source code for insecure patterns, common errors (SQLi, XSS, cryptographic vulnerabilities), and misuse of security APIs." },
    { title: "Dynamic Application Security Testing (DAST)", description: "AI tests the running application to identify vulnerabilities that appear at runtime (insecure API endpoints, session management issues, configuration errors)." },
    { title: "Misconfiguration Detection", description: "Reviews configurations of cloud services, databases, servers, and firewalls for insecure settings." },
    { title: "Anomaly Detection & Alerting", description: "Monitors network traffic, user behavior, and system logs to identify suspicious activities or anomalies indicative of cyberattacks, issuing immediate alerts." },
    { title: "AI-Assisted Threat Modeling", description: "Helps create threat models for the system and identify potential vulnerability points based on architecture and data flows." },
    { title: "Important Limitation Note", description: "AI security tools augment, but do not replace, human expert penetration testing and deep security audits. AI is best at identifying common vulnerabilities and known patterns." }
  ];
  
  const businessModelRevenue = [
    { title: "Revenue Model Simulation", description: "AI models different revenue scenarios for the Freemium model, multi-tiered subscriptions, and potential future marketplace features. Considers market data, user behavior predictions, and economic models." },
    { title: "Sensitivity Analysis", description: "Analyzes the impact of variables like pricing strategies, Freemium-to-paid conversion rates, and user retention rates on overall revenue." },
    { title: "Revenue Forecasting", description: "Predicts future revenue streams based on various user growth scenarios and selected pricing strategies." },
    { title: "Optimization Suggestions", description: "Proposes optimizations for the revenue model to maximize value generation and ensure long-term sustainability." },
    { title: "Competitor Business Model Analysis", description: "Analyzes business models of competitors to identify opportunities for differentiation and unique value propositions for LifeOrchestrator AI." }
  ];
  
  return (
    <section id="infra-security-business" className="py-16 md:py-24 bg-slate-800"> {/* Section background */}
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <ServerStackIcon className="w-16 h-16 text-sky-400 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-4">
            Phase 5.2: Infrastructure, Security & Business Model
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Simulated design and considerations for robust infrastructure, comprehensive security, and effective business model implementation for LifeOrchestrator AI.
          </p>
        </div>

        <div className="space-y-12">
          <SectionBlockInfra title="Cloud Infrastructure Optimization (AI-Assisted)" className="bg-slate-700 p-6 rounded-xl shadow-xl" note="AI generates configuration suggestions for cloud auto-scaling, resource monitoring scripts, and cost optimization reports.">
            <ul className="space-y-3">
              {cloudOptimization.map((item, index) => (
                <InfoListItemInfra key={index} title={item.title}>{item.description}</InfoListItemInfra>
              ))}
            </ul>
          </SectionBlockInfra>

          <SectionBlockInfra title="System Security (AI-Driven Scanning & Analysis)" className="bg-slate-700 p-6 rounded-xl shadow-xl" note="AI leverages SAST/DAST tools, generates security scan reports, and assists in defining security policies and threat models.">
            <ul className="space-y-3">
              {systemSecurity.map((item, index) => (
                <InfoListItemInfra key={index} title={item.title}>{item.description}</InfoListItemInfra>
              ))}
            </ul>
          </SectionBlockInfra>

          <SectionBlockInfra title="Business Model & Revenue Scenario Modeling (AI-Assisted)" className="bg-slate-700 p-6 rounded-xl shadow-xl" note="AI generates financial models for revenue forecasting, sensitivity analysis reports, and code for integrating with payment gateways (e.g., Stripe, Paddle) for subscription management.">
            <ul className="space-y-3">
              {businessModelRevenue.map((item, index) => (
                <InfoListItemInfra key={index} title={item.title}>{item.description}</InfoListItemInfra>
              ))}
            </ul>
          </SectionBlockInfra>
        </div>
        
        <p className="text-xs text-gray-400 mt-12 text-center">
          Simulated Outputs: Conceptual deployed and optimized cloud infrastructure (configuration specifications, Infrastructure-as-Code scripts like Terraform/CloudFormation), implemented security systems (security scan reports, security policy specifications), payment and subscription management modules (backend and frontend code for integration with payment gateways), and a comprehensive revenue modeling and business suggestions report. AI plays a crucial role in analysis, suggestion, and automation across these domains.
        </p>
      </div>
    </section>
  );
};

export default InfrastructureSecurityBusinessSection;