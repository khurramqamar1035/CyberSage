import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileCheck, ArrowLeft, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import SageAI from '../../components/SageAI';

const ComplianceAudit = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <nav className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button onClick={() => navigate('/security')} variant="ghost" className="text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Security Services
            </Button>
            <div className="flex items-center gap-3">
              <img 
                src="https://customer-assets.emergentagent.com/job_83508210-49e2-4693-89fb-e881ef07bca3/artifacts/0n25qd68_Gemini_Generated_Image_jkwstijkwstijkws-removebg-preview.png" 
                alt="CyberSage" 
                className="w-10 h-10 object-contain"
              />
              <h1 className="text-xl font-bold text-white">CyberSage</h1>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 mb-6">
            <FileCheck className="w-5 h-5 text-amber-400" />
            <span className="text-sm text-amber-300 font-medium">COMPLIANCE AUDIT</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Compliance Audit</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Ensure your systems meet industry regulatory requirements
          </p>
          <div className="mt-6">
            <span className="text-4xl font-bold text-amber-400">$200</span>
            <span className="text-slate-400 ml-2">• 7 day delivery</span>
          </div>
        </div>

        <Card className="bg-slate-900/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
              What is a Compliance Audit?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300 space-y-4">
            <p className="text-lg leading-relaxed">
              A Compliance Audit is a comprehensive evaluation of your organization's adherence to specific regulatory frameworks and industry standards. We assess your security controls, policies, procedures, and technical implementations against requirements like GDPR, HIPAA, PCI DSS, SOC 2, and ISO 27001.
            </p>
            <p className="leading-relaxed">
              Compliance isn't just about avoiding fines—it's about demonstrating to customers, partners, and regulators that you take data protection and security seriously. Our audit identifies gaps between your current state and compliance requirements, providing a clear roadmap to achieve and maintain compliance.
            </p>
            <p className="leading-relaxed">
              We don't just tell you what's wrong—we explain why it matters, what the risks are, and provide step-by-step guidance to fix issues. Our goal is to help you achieve compliance in the most efficient, cost-effective way possible.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-amber-400" />
              Compliance Frameworks We Cover
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'GDPR (General Data Protection Regulation)',
                  description: 'EU data protection law covering personal data of EU citizens. Fines up to €20M or 4% of global revenue.',
                  scope: 'Required for: Any business handling EU citizen data'
                },
                {
                  title: 'HIPAA (Health Insurance Portability)',
                  description: 'US healthcare data protection standard for protected health information (PHI).',
                  scope: 'Required for: Healthcare providers, insurers, and their vendors'
                },
                {
                  title: 'PCI DSS (Payment Card Industry)',
                  description: 'Security standards for organizations that handle credit card information.',
                  scope: 'Required for: E-commerce, payment processors, merchants'
                },
                {
                  title: 'SOC 2 (Service Organization Control)',
                  description: 'Framework for managing customer data based on five trust principles.',
                  scope: 'Required for: SaaS companies, cloud providers, tech vendors'
                },
                {
                  title: 'ISO 27001',
                  description: 'International standard for information security management systems (ISMS).',
                  scope: 'Recommended for: Enterprise software vendors, B2B services'
                },
                {
                  title: 'CCPA (California Consumer Privacy Act)',
                  description: 'California data privacy law giving consumers control over personal information.',
                  scope: 'Required for: Businesses serving California residents'
                }
              ].map((item, index) => (
                <div key={index} className="bg-slate-800/50 p-5 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 mb-3 text-sm">{item.description}</p>
                  <div className="text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded px-2 py-1 inline-block">
                    {item.scope}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-amber-400" />
              What Our Audit Includes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 text-slate-300">
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  'Documentation Review',
                  'Technical Controls Assessment',
                  'Policy & Procedure Analysis',
                  'Data Flow Mapping',
                  'Access Control Review',
                  'Encryption Standards',
                  'Incident Response Plans',
                  'Employee Training Programs',
                  'Vendor Management',
                  'Audit Trail Verification',
                  'Data Retention Policies',
                  'Business Continuity Plans'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-slate-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-4">Deliverables</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2"></div>
                    <span><strong className="text-white">Compliance Gap Analysis:</strong> Detailed report showing where you meet requirements and where gaps exist</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2"></div>
                    <span><strong className="text-white">Risk Assessment:</strong> Evaluation of compliance risks with severity ratings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2"></div>
                    <span><strong className="text-white">Remediation Roadmap:</strong> Step-by-step action plan to achieve compliance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2"></div>
                    <span><strong className="text-white">Policy Templates:</strong> Pre-written policies customized for your organization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2"></div>
                    <span><strong className="text-white">Evidence Collection Guide:</strong> Documentation needed for official audits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2"></div>
                    <span><strong className="text-white">30-Day Follow-up:</strong> Support as you implement recommendations</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Why Compliance Matters</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
                    <p className="text-red-300 font-semibold mb-2">Avoid Massive Fines</p>
                    <p className="text-sm text-slate-400">GDPR fines can reach €20M. HIPAA violations: $50K per record. PCI DSS: up to $500K/month.</p>
                  </div>
                  <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4">
                    <p className="text-amber-300 font-semibold mb-2">Win Enterprise Deals</p>
                    <p className="text-sm text-slate-400">Large customers require SOC 2, ISO 27001, or industry-specific compliance before purchase.</p>
                  </div>
                  <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                    <p className="text-green-300 font-semibold mb-2">Build Customer Trust</p>
                    <p className="text-sm text-slate-400">Compliance certifications demonstrate your commitment to data protection and security.</p>
                  </div>
                  <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
                    <p className="text-blue-300 font-semibold mb-2">Reduce Legal Risk</p>
                    <p className="text-sm text-slate-400">Documented compliance efforts reduce liability in case of data breaches or incidents.</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white text-lg px-8 py-6">
            Start Compliance Audit - $200
          </Button>
          <p className="text-slate-400 mt-4">7-day delivery • Comprehensive report • Remediation roadmap • 30-day support</p>
        </div>
      </div>

      <SageAI />
    </div>
  );
};

export default ComplianceAudit;