import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, ArrowLeft, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import SageAI from '../../components/SageAI';

const SecurityConsultation = () => {
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
            <Users className="w-5 h-5 text-amber-400" />
            <span className="text-sm text-amber-300 font-medium">SECURITY CONSULTATION</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Security Consultation</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Expert guidance tailored to your specific security needs
          </p>
          <div className="mt-6">
            <span className="text-4xl font-bold text-amber-400">$75</span>
            <span className="text-slate-400 ml-2">• Flexible scheduling</span>
          </div>
        </div>

        <Card className="bg-slate-900/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
              What is Security Consultation?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300 space-y-4">
            <p className="text-lg leading-relaxed">
              Our Security Consultation service provides you with direct access to experienced cybersecurity professionals who understand the unique challenges facing startups, small businesses, and growing companies. We offer personalized, one-on-one guidance to help you make informed decisions about your security strategy.
            </p>
            <p className="leading-relaxed">
              Whether you're just starting to think about security, preparing for a compliance audit, responding to a security incident, or planning your security roadmap, our consultants provide practical, actionable advice that fits your budget and business needs.
            </p>
            <p className="leading-relaxed">
              Unlike generic security advice, we take time to understand your specific situation—your technology stack, business model, compliance requirements, and risk tolerance—to provide recommendations that actually work for you.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-amber-400" />
              What We Cover
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Security Strategy & Roadmap',
                  description: 'Develop a comprehensive security plan aligned with your business goals and budget'
                },
                {
                  title: 'Architecture Review',
                  description: 'Evaluate your system architecture for security best practices and vulnerabilities'
                },
                {
                  title: 'Compliance Guidance',
                  description: 'Navigate GDPR, HIPAA, PCI DSS, SOC 2, and other regulatory requirements'
                },
                {
                  title: 'Incident Response Planning',
                  description: 'Create incident response procedures and disaster recovery plans'
                },
                {
                  title: 'Security Tool Selection',
                  description: 'Choose the right security tools and vendors for your needs and budget'
                },
                {
                  title: 'Team Training Needs',
                  description: 'Identify security training requirements for your development and operations teams'
                },
                {
                  title: 'Third-Party Risk',
                  description: 'Assess security risks from vendors, APIs, and third-party integrations'
                },
                {
                  title: 'Security Policy Development',
                  description: 'Create security policies, procedures, and employee guidelines'
                }
              ].map((item, index) => (
                <div key={index} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-amber-900/20 border border-amber-700/30 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-amber-300 mb-4">Consultation Format</h3>
              <div className="space-y-3 text-slate-300">
                <p>• 60-minute video call with a senior security consultant</p>
                <p>• Screen sharing for real-time review of your systems/documentation</p>
                <p>• Follow-up summary document with key recommendations</p>
                <p>• 2 weeks of email support for follow-up questions</p>
                <p>• Optional: additional hours available at the same rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-amber-400" />
              Why Choose Our Consultation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 text-slate-300">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Common Use Cases</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                    <h4 className="font-semibold text-white mb-2">Pre-Launch Security Review</h4>
                    <p className="text-sm text-slate-400">Get your app security-ready before launch. We'll review your architecture, identify risks, and provide a launch checklist.</p>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                    <h4 className="font-semibold text-white mb-2">Investor Due Diligence</h4>
                    <p className="text-sm text-slate-400">Prepare for security questions from investors. We'll help you document your security posture and address concerns.</p>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                    <h4 className="font-semibold text-white mb-2">Enterprise Sales Support</h4>
                    <p className="text-sm text-slate-400">Landing enterprise clients? We'll help you complete security questionnaires and prepare for vendor assessments.</p>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                    <h4 className="font-semibold text-white mb-2">Incident Investigation</h4>
                    <p className="text-sm text-slate-400">Something suspicious happened? We'll help you understand what occurred and how to prevent it from happening again.</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Why Businesses Choose Us</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2"></div>
                    <span><strong className="text-white">Startup-Friendly:</strong> We understand resource constraints and provide practical, budget-conscious advice</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2"></div>
                    <span><strong className="text-white">No Jargon:</strong> We explain security concepts in plain English that anyone can understand</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2"></div>
                    <span><strong className="text-white">Actionable Advice:</strong> Every recommendation comes with concrete next steps you can implement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2"></div>
                    <span><strong className="text-white">Experienced Consultants:</strong> Our team has worked with hundreds of startups and small businesses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2"></div>
                    <span><strong className="text-white">Flexible Scheduling:</strong> Book consultations at times that work for your schedule, including evenings and weekends</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-green-300 mb-3">✅ Perfect For</h3>
                <p className="text-slate-300">
                  Founders without security background • CTOs planning security roadmap • Developers implementing security features • Teams preparing for audits • Anyone with security questions
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white text-lg px-8 py-6">
            Book Consultation - $75
          </Button>
          <p className="text-slate-400 mt-4">60-minute session • Expert guidance • Follow-up document • Email support</p>
        </div>
      </div>

      <SageAI />
    </div>
  );
};

export default SecurityConsultation;