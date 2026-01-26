import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, ArrowLeft, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import SageAI from '../../components/SageAI';

const AdvancedTraining = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <nav className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button onClick={() => navigate('/training')} variant="ghost" className="text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Training Programs
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
            <Award className="w-5 h-5 text-amber-400" />
            <span className="text-sm text-amber-300 font-medium">ADVANCED CYBERSECURITY</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Advanced Cybersecurity Training</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Expert-level training with real-world scenarios and capstone project
          </p>
          <div className="mt-6">
            <span className="text-4xl font-bold text-amber-400">$699</span>
            <span className="text-slate-400 ml-2">• 12 weeks • Advanced level</span>
          </div>
        </div>

        <Card className="bg-slate-900/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
              What is Advanced Training?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300 space-y-4">
            <p className="text-lg leading-relaxed">
              Our Advanced Cybersecurity Training is a comprehensive 12-week program designed for experienced security professionals ready to master advanced attack techniques, threat hunting, malware analysis, and enterprise security architecture.
            </p>
            <p className="leading-relaxed">
              This elite program includes advanced penetration testing methodologies, red team operations, security architecture design, compliance frameworks, and a real-world capstone project. Graduate job-ready for senior security roles with portfolio-worthy projects.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-amber-400" />
              12-Week Curriculum
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { weeks: 'Weeks 1-3', title: 'Advanced Penetration Testing', topics: ['Advanced exploitation', 'Privilege escalation', 'Lateral movement', 'Active Directory attacks'] },
                { weeks: 'Weeks 4-6', title: 'Threat Hunting & Analysis', topics: ['Threat intelligence', 'Malware analysis', 'Reverse engineering', 'IOC identification'] },
                { weeks: 'Weeks 7-9', title: 'Security Architecture', topics: ['Zero trust design', 'Cloud security', 'Network segmentation', 'Defense in depth'] },
                { weeks: 'Weeks 10-12', title: 'Capstone Project', topics: ['Real-world scenario', 'Full assessment', 'Report writing', 'Presentation'] }
              ].map((module, index) => (
                <div key={index} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                  <div className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 inline-block mb-2">
                    <span className="text-amber-400 font-semibold text-sm">{module.weeks}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{module.title}</h3>
                  <ul className="space-y-1">
                    {module.topics.map((topic, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5"></div>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-amber-400" />
              Senior-Level Career Paths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 text-slate-300">
              <div className="grid md:grid-cols-3 gap-4">
                {['Senior Security Engineer', 'Security Architect', 'Red Team Lead', 'Threat Hunter', 'CISO Track', 'Security Consultant'].map((role, idx) => (
                  <div key={idx} className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4 text-center">
                    <p className="text-amber-300 font-semibold">{role}</p>
                  </div>
                ))}
              </div>

              <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-green-300 mb-3">✓ Premium Package</h3>
                <p className="text-slate-300">
                  60+ hours content • Advanced labs • Capstone project • OSCP prep • Certificate • Resume review • Interview coaching • Job placement support
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white text-lg px-8 py-6">
            Enroll Now - $699
          </Button>
          <p className="text-slate-400 mt-4">12-week program • Capstone project • Career support • Lifetime access</p>
        </div>
      </div>

      <SageAI />
    </div>
  );
};

export default AdvancedTraining;
