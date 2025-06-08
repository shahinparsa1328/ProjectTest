import React from 'react';

// Icon for Comprehensive Testing Section
const BugAntIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a2.25 2.25 0 002.25-2.25H9.75A2.25 2.25 0 0012 21z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.75V18M16.5 9.75A4.5 4.5 0 117.5 9.75a4.5 4.5 0 019 0zM18.75 9.75h.375c.621 0 1.125.504 1.125 1.125V15c0 .621-.504 1.125-1.125 1.125h-.375m-13.5 0h-.375C4.104 16.125 3.6 15.621 3.6 15V10.875c0-.621.504-1.125 1.125-1.125h.375" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 6H12A2.25 2.25 0 009.75 3.75V3M12.75 6V3.75A2.25 2.25 0 0115 6h-2.25z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12c0 .665.25 1.266.667 1.706M2.25 12a9.721 9.721 0 012.06-5.922" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 12c0 .665-.25 1.266-.667 1.706M21.75 12a9.721 9.721 0 00-2.06-5.922" />
  </svg>
);


const InfoListItemTesting: React.FC<{ title?: string; children: React.ReactNode; className?: string }> = ({ title, children, className = "text-gray-300 text-sm" }) => (
  <li className={`list-disc list-inside ml-2 ${className}`}>
    {title && <strong className="text-sky-400">{title}: </strong>}
    {children}
  </li>
);

const SectionBlockTesting: React.FC<{ title: string; children: React.ReactNode; className?: string; note?: string }> = ({ title, children, className = "bg-slate-800 p-6 rounded-xl shadow-xl", note }) => (
    <div className={className}>
        <h3 className="text-xl font-semibold text-sky-300 mb-4">{title}</h3>
        {children}
        {note && <p className="text-xs text-gray-500 mt-3 italic">{note}</p>}
    </div>
);

const ComprehensiveTestingSection: React.FC = () => {
  const testCaseGeneration = [
    { title: "Comprehensive Scope", description: "AI analyzes requirements, user scenarios, and API specifications to generate a wide array of automated test cases." },
    { title: "Test Types", description: "Includes Unit Tests, Integration Tests, System Tests, Regression Tests, tests for Edge Cases, and Performance Tests (Load & Stress)." },
  ];

  const automatedExecution = [
    { title: "Continuous Integration/Delivery (CI/CD)", description: "AI continuously executes generated test cases with every code change or as part of the CI/CD pipeline using frameworks like Jest, Pytest, Selenium, Cypress." },
    { title: "Reporting & Visualization", description: "Analyzes test reports, visually presents results (e.g., code coverage charts, pass/fail rates), and promptly reports findings to the development team." },
  ];
  
  const errorAnalysis = [
    { title: "Proactive Monitoring", description: "Continuously monitors system logs, error reports, and performance monitoring data." },
    { title: "Root Cause Analysis", description: "Identifies recurring error patterns and, by analyzing code, change history, and system dependencies, diagnoses the root cause (e.g., 'Error X likely due to change Y in module Z')." },
    { title: "Solution Proposal & Patch Generation", description: "Proposes potential solutions for bug fixing and can even generate initial code patches for developer review and approval." }
  ];
  
  const securityTesting = [
    { title: "Continuous Automated Scanning", description: "AI implements and executes AI-powered Static Application Security Testing (SAST) and Dynamic Application Security Testing (DAST) tools for ongoing scanning of source code and deployed infrastructure." },
    { title: "Vulnerability Identification", description: "Identifies insecure code patterns, code injections (SQLi, XSS), security misconfigurations, and other common vulnerabilities." },
    { title: "Reporting & Mitigation", description: "Generates comprehensive security reports and proposes risk mitigation strategies to the security and development teams." }
  ];

  return (
    <section id="comprehensive-testing" className="py-16 md:py-24 bg-slate-900"> {/* Section background */}
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <BugAntIcon className="w-16 h-16 text-sky-400 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-4">
            Phase 6.1: Comprehensive Testing & Bug Fixing
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Simulated design of AI-enhanced processes to ensure product quality through rigorous, automated testing and efficient bug resolution.
          </p>
        </div>

        <div className="space-y-12">
          <SectionBlockTesting title="AI-Generated Comprehensive Test Cases" className="bg-slate-800 p-6 rounded-xl shadow-xl" note="AI analyzes requirements and user stories to create a thorough test suite.">
            <ul className="space-y-3">
              {testCaseGeneration.map((item, index) => (
                <InfoListItemTesting key={index} title={item.title}>{item.description}</InfoListItemTesting>
              ))}
            </ul>
          </SectionBlockTesting>

          <SectionBlockTesting title="Automated Test Execution & Reporting" className="bg-slate-800 p-6 rounded-xl shadow-xl" note="AI integrates with CI/CD pipelines for continuous testing and provides actionable reports.">
            <ul className="space-y-3">
              {automatedExecution.map((item, index) => (
                <InfoListItemTesting key={index} title={item.title}>{item.description}</InfoListItemTesting>
              ))}
            </ul>
          </SectionBlockTesting>

          <SectionBlockTesting title="AI-Driven Error Analysis & Bug Fixing Assistance" className="bg-slate-800 p-6 rounded-xl shadow-xl" note="AI identifies error patterns, suggests root causes, and can even propose code fixes.">
            <ul className="space-y-3">
              {errorAnalysis.map((item, index) => (
                <InfoListItemTesting key={index} title={item.title}>{item.description}</InfoListItemTesting>
              ))}
            </ul>
          </SectionBlockTesting>
          
          <SectionBlockTesting title="Automated Security Testing (Continuous)" className="bg-slate-800 p-6 rounded-xl shadow-xl" note="AI employs SAST/DAST tools to continuously scan for vulnerabilities and report findings.">
            <ul className="space-y-3">
              {securityTesting.map((item, index) => (
                <InfoListItemTesting key={index} title={item.title}>{item.description}</InfoListItemTesting>
              ))}
            </ul>
          </SectionBlockTesting>
        </div>
        
        <p className="text-xs text-gray-400 mt-12 text-center">
          Simulated Outputs: Comprehensive test reports (unit, integration, regression, performance, security), bug-free (or with minimal, documented known bugs) and thoroughly tested code, detailed error analysis reports, and actionable bug-fixing suggestions. AI ensures high test coverage and helps maintain a low bug rate.
        </p>
      </div>
    </section>
  );
};

export default ComprehensiveTestingSection;