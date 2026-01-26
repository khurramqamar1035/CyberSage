import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ArrowLeft, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import SageAI from '../../components/SageAI';
console.log ("hi");
const BasicTraining = () => {
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
            <BookOpen className="w-5 h-5 text-amber-400" />
            <span className="text-sm text-amber-300 font-medium">BASIC CYBERSECURITY</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Basic Cybersecurity Training</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Foundation course for beginners in cybersecurity - Start your journey here
          </p>
          <div className="mt-6">
            <span className="text-4xl font-bold text-amber-400">$199</span>
            <span className="text-slate-400 ml-2">• 4 weeks • Beginner level</span>
          </div>
        </div>

        <Card className="bg-slate-900/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
              What is Basic Cybersecurity Training?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300 space-y-4">
            <p className="text-lg leading-relaxed">
              Our Basic Cybersecurity Training is a comprehensive 4-week program designed for complete beginners. This course covers fundamental security concepts, common threats, and basic protection techniques that form the foundation of all cybersecurity knowledge.
            </p>
            <p className="leading-relaxed">
              Whether you're a developer wanting to write more secure code, an IT professional looking to specialize in security, or someone considering a career change, this course provides essential knowledge to understand how cyberattacks work and how to defend against them.
            </p>
            <p className="leading-relaxed">
              100% online with video lectures, hands-on labs, quizzes, and real-world case studies. Learn at your own pace with lifetime access and receive a certificate of completion.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-amber-400" />
              4-Week Curriculum
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { week: 'Week 1', title: 'Security Fundamentals', topics: ['CIA Triad concepts', 'Types of cyber threats', 'Security terminology', 'Risk management basics'] },
                { week: 'Week 2', title: 'Common Threats', topics: ['Malware & ransomware', 'Phishing attacks', 'Password attacks', 'Network threats'] },
                { week: 'Week 3', title: 'Protection Techniques', topics: ['Password security & MFA', 'Encryption basics', 'Firewall & antivirus', 'Safe browsing practices'] },
                { week: 'Week 4', title: 'Best Practices', topics: ['Secure development', 'Data backup', 'Incident response', 'Security policies'] }
              ].map((module, index) => (
                <div key={index} className="bg-slate-800/50 p-5 rounded-lg border border-slate-700">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30">
                      <span className="text-amber-400 font-semibold text-sm">{module.week}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white">{module.title}</h3>
                  </div>
                  <ul className="space-y-2">
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
              Why Take This Course?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 text-slate-300">
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: 'Career Changers', desc: 'Start your cybersecurity career' },
                  { title: 'Developers', desc: 'Write more secure code' },
                  { title: 'IT Professionals', desc: 'Add security to your skillset' },
                  { title: 'Business Owners', desc: 'Understand threats to your business' }
                ].map((item, idx) => (
                  <div key={idx} className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4">
                    <p className="text-amber-300 font-semibold mb-2">{item.title}</p>
                    <p className="text-sm text-slate-400">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-green-300 mb-3">✓ Course Includes</h3>
                <p className="text-slate-300">
                  20+ hours video • Practice labs • Quizzes • Certificate • Lifetime access • Student community • Instructor support
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white text-lg px-8 py-6">
            Enroll Now - $199
          </Button>
          <p className="text-slate-400 mt-4">4-week program • Self-paced • Certificate • Money-back guarantee</p>
        </div>
      </div>

      <SageAI />
    </div>
  );
};

export default BasicTraining;
