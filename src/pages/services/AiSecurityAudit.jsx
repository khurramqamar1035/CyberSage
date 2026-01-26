import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowLeft, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import SageAI from '../../components/SageAI';

const AiSecurityAudit = () => {
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
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/20 border border-blue-500/30 mb-6">
            <Shield className="w-5 h-5 text-blue-400" />
            <span className="text-sm text-blue-300 font-medium">AI SECURITY AUDIT</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">AI Security Audit</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Comprehensive AI-powered security assessment of your digital infrastructure
          </p>
          <div className="mt-6">
            <span className="text-4xl font-bold text-blue-400">$20</span>
            <span className="text-slate-400 ml-2">• 24 hour delivery</span>
          </div>
        </div>

        {/* What is it */}
        <Card className="bg-slate-900/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-blue-400" />
              What is an AI Security Audit?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300 space-y-4">
            <p className="text-lg leading-relaxed">
              An AI Security Audit is an automated, comprehensive assessment of your digital infrastructure using cutting-edge artificial intelligence and machine learning algorithms. Our AI systems scan, analyze, and identify potential security vulnerabilities across your entire digital ecosystem in hours, not weeks.
            </p>
            <p className="leading-relaxed">
              Unlike traditional manual audits that can take days or weeks, our AI-powered solution leverages advanced pattern recognition, threat intelligence databases, and behavioral analysis to provide rapid, accurate security assessments. The system continuously learns from millions of security incidents worldwide, making it smarter and more effective with each scan.
            </p>
          </CardContent>
        </Card>

        {/* What We Do */}
        <Card className="bg-slate-900/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-blue-400" />
              What We Do
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Automated Vulnerability Scanning',
                  description: 'Our AI scans all entry points, APIs, databases, and applications for known and zero-day vulnerabilities'
                },
                {
                  title: 'AI-Powered Threat Detection',
                  description: 'Machine learning algorithms identify suspicious patterns, anomalies, and potential security breaches'
                },
                {
                  title: 'Code Analysis',
                  description: 'Deep analysis of your codebase to identify security flaws, insecure practices, and potential backdoors'
                },
                {
                  title: 'Network Assessment',
                  description: 'Comprehensive review of network architecture, firewall rules, and access controls'
                },
                {
                  title: 'Compliance Checking',
                  description: 'Verification against industry standards like OWASP Top 10, PCI DSS, and GDPR requirements'
                },
                {
                  title: 'Detailed Security Report',
                  description: 'Easy-to-understand report with risk ratings, vulnerability details, and step-by-step remediation guidance'
                }
              ].map((item, index) => (
                <div key={index} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400">{item.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Why You Need It */}
        <Card className="bg-slate-900/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-blue-400" />
              Why You Need This Service
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 text-slate-300">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">For Startups & Small Businesses</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2"></div>
                    <span><strong className="text-white">Budget-Friendly:</strong> Get enterprise-grade security at a fraction of traditional audit costs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2"></div>
                    <span><strong className="text-white">Fast Results:</strong> Don't wait weeks - get your security assessment in 24 hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2"></div>
                    <span><strong className="text-white">Build Trust:</strong> Show customers and investors you take security seriously</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">For Freelancers & Solo Developers</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2"></div>
                    <span><strong className="text-white">Peace of Mind:</strong> Know your applications are secure before deployment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2"></div>
                    <span><strong className="text-white">Competitive Advantage:</strong> Offer security-audited projects to clients</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2"></div>
                    <span><strong className="text-white">Learn & Improve:</strong> Understand security best practices through detailed reports</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Critical Protection Against</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
                    <p className="text-red-300 font-semibold">Data Breaches</p>
                    <p className="text-sm text-slate-400 mt-1">Average cost: $4.45M per breach</p>
                  </div>
                  <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
                    <p className="text-red-300 font-semibold">Ransomware Attacks</p>
                    <p className="text-sm text-slate-400 mt-1">Growing threat to all businesses</p>
                  </div>
                  <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
                    <p className="text-red-300 font-semibold">Regulatory Fines</p>
                    <p className="text-sm text-slate-400 mt-1">GDPR fines up to €20M or 4% revenue</p>
                  </div>
                  <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
                    <p className="text-red-300 font-semibold">Reputation Damage</p>
                    <p className="text-sm text-slate-400 mt-1">Lost customer trust is priceless</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6">
            Get Your AI Security Audit - $20
          </Button>
          <p className="text-slate-400 mt-4">24-hour delivery • Detailed report • Actionable recommendations</p>
        </div>
      </div>

      <SageAI />
    </div>
  );
};

export default AiSecurityAudit;