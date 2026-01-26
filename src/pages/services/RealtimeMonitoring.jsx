import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, ArrowLeft, CheckCircle, AlertTriangle, TrendingUp, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import SageAI from '../../components/SageAI';

const RealtimeMonitoring = () => {
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
            <Zap className="w-5 h-5 text-amber-400" />
            <span className="text-sm text-amber-300 font-medium">REAL-TIME MONITORING</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">24/7 Real-time Monitoring</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Continuous threat detection and alerting system for your infrastructure
          </p>
          <div className="mt-6">
            <span className="text-4xl font-bold text-amber-400">$99/mo</span>
            <span className="text-slate-400 ml-2">• Instant setup</span>
          </div>
        </div>

        <Card className="bg-slate-900/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
              What is Real-time Security Monitoring?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300 space-y-4">
            <p className="text-lg leading-relaxed">
              Real-time Security Monitoring is a 24/7 surveillance system that continuously watches your digital infrastructure for suspicious activities, security threats, and anomalous behavior. Our AI-powered monitoring platform analyzes millions of events per day to detect and alert you about potential security incidents in real-time.
            </p>
            <p className="leading-relaxed">
              Think of it as having a dedicated security team watching your systems around the clock. The moment something suspicious happens—unusual login attempts, malware activity, data exfiltration attempts, or system compromises—you're immediately notified so you can respond before damage occurs.
            </p>
            <p className="leading-relaxed">
              Our monitoring system integrates with your existing infrastructure (servers, applications, databases, firewalls) and uses machine learning to establish baseline behavior, making it increasingly effective at detecting anomalies specific to your environment.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-amber-400" />
              What We Monitor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  'Intrusion Attempts',
                  'Malware & Ransomware',
                  'DDoS Attacks',
                  'Unauthorized Access',
                  'Data Exfiltration',
                  'Configuration Changes',
                  'Failed Login Attempts',
                  'Network Anomalies',
                  'Application Errors',
                  'Database Queries',
                  'API Abuse',
                  'Privilege Escalation'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-slate-300">{item}</span>
                  </div>
                ))}
              </div>

              <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-amber-400" />
                  Monitoring Features
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    {
                      title: 'Instant Alerts',
                      description: 'Get notified immediately via email, SMS, or Slack when threats are detected'
                    },
                    {
                      title: 'AI-Powered Detection',
                      description: 'Machine learning identifies anomalies and zero-day threats automatically'
                    },
                    {
                      title: 'Detailed Logs',
                      description: 'Complete activity logs for forensic analysis and compliance audits'
                    },
                    {
                      title: 'Custom Dashboards',
                      description: 'Real-time visualization of your security posture and threat landscape'
                    },
                    {
                      title: 'Monthly Reports',
                      description: 'Comprehensive security reports with trends, incidents, and recommendations'
                    },
                    {
                      title: 'Integration Ready',
                      description: 'Works with existing SIEM, logging, and security tools'
                    }
                  ].map((item, index) => (
                    <div key={index}>
                      <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-400">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-amber-400" />
              Why You Need 24/7 Monitoring
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 text-slate-300">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">The Reality of Cyber Threats</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
                    <p className="text-red-300 font-semibold mb-2">Attacks Happen 24/7</p>
                    <p className="text-sm text-slate-400">Cybercriminals don't work 9-5. Most attacks happen outside business hours when nobody's watching.</p>
                  </div>
                  <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
                    <p className="text-red-300 font-semibold mb-2">Speed is Critical</p>
                    <p className="text-sm text-slate-400">The faster you detect a breach, the less damage occurs. Minutes matter in incident response.</p>
                  </div>
                  <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
                    <p className="text-red-300 font-semibold mb-2">Average Detection: 287 Days</p>
                    <p className="text-sm text-slate-400">Without monitoring, breaches go undetected for months while attackers steal data.</p>
                  </div>
                  <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
                    <p className="text-red-300 font-semibold mb-2">Compliance Required</p>
                    <p className="text-sm text-slate-400">PCI DSS, HIPAA, and SOC 2 all mandate continuous security monitoring.</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Perfect For</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2"></div>
                    <span><strong className="text-white">E-commerce Sites:</strong> Protect customer data and payment information 24/7</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2"></div>
                    <span><strong className="text-white">SaaS Companies:</strong> Ensure uptime and protect user data continuously</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2"></div>
                    <span><strong className="text-white">Healthcare Providers:</strong> Meet HIPAA requirements with continuous monitoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2"></div>
                    <span><strong className="text-white">Financial Services:</strong> Detect fraud and unauthorized access in real-time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2"></div>
                    <span><strong className="text-white">Growing Startups:</strong> Enterprise-grade security without hiring a full security team</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white text-lg px-8 py-6">
            Start Monitoring Today - $99/month
          </Button>
          <p className="text-slate-400 mt-4">Instant setup • 24/7 monitoring • Real-time alerts • Cancel anytime</p>
        </div>
      </div>

      <SageAI />
    </div>
  );
};

export default RealtimeMonitoring;