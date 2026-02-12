import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, BookOpen, Target, Award, Shield, Code, Mail, MessageSquare, Menu, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import SageAI from '../components/SageAI';

const TrainingPage = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false); // close mobile menu
  };

  const trainingPrograms = [
    { icon: BookOpen, title: 'Basic Cybersecurity', description: 'Foundation course for beginners in cybersecurity', price: '$199', duration: '4 weeks', level: 'Beginner', features: ['Security fundamentals', 'Common threats', 'Basic protection', 'Certificate included'], link: '/services/BasicTraining' },
    { icon: Target, title: 'Intermediate Cybersecurity', description: 'Advanced concepts and practical security implementation', price: '$399', duration: '8 weeks', level: 'Intermediate', features: ['Network security', 'Penetration testing', 'Incident response', 'Hands-on labs'], link: '/services/IntermediateTraining' },
    { icon: Award, title: 'Advanced Cybersecurity', description: 'Expert-level training with real-world scenarios', price: '$699', duration: '12 weeks', level: 'Advanced', features: ['Advanced threats', 'Security architecture', 'Compliance', 'Capstone project'], link: '/services/AdvancedTraining' }
  ];

  const testimonials = [
    { name: 'James Wilson', role: 'Security Analyst', text: 'The training program transformed my career. I went from zero knowledge to landing a cybersecurity job in 6 months.' },
    { name: 'Maria Garcia', role: 'IT Manager', text: 'Excellent hands-on training with real-world examples. The instructors are knowledgeable and supportive.' },
    { name: 'Tom Brown', role: 'Freelance Consultant', text: 'Advanced course gave me the skills to offer security consulting services to my clients confidently.' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
              <img 
                src="https://customer-assets.emergentagent.com/job_83508210-49e2-4693-89fb-e881ef07bca3/artifacts/0n25qd68_Gemini_Generated_Image_jkwstijkwstijkws-removebg-preview.png" 
                alt="CyberSage" 
                className="w-10 h-10 object-contain"
              />
              <h1 className="text-xl font-bold text-white">CyberSage</h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4">
              <button onClick={() => scrollToSection('services')} className="text-gray-300 hover:text-white transition-colors">Services</button>
              <button onClick={() => scrollToSection('testimonials')} className="text-gray-300 hover:text-white transition-colors">Testimonials</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-white transition-colors">Contact</button>
              <button onClick={() => navigate('/blog')} className="text-gray-300 hover:text-white transition-colors">Blog</button>
              <button onClick={() => navigate('/faq')} className="text-gray-300 hover:text-white transition-colors">FAQ</button>
              <button onClick={() => navigate('/about')} className="text-gray-300 hover:text-white transition-colors">About</button>
              <div className="flex items-center gap-2">
                <Button onClick={() => navigate('/security')} variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                  <Shield className="w-4 h-4 mr-1" /> Security
                </Button>
                <Button onClick={() => navigate('/development')} variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300">
                  <Code className="w-4 h-4 mr-1" /> Development
                </Button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-300 hover:text-white">
                {menuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden flex flex-col gap-2 py-2 px-2 bg-gray-900 border-t border-gray-800">
              <button onClick={() => scrollToSection('services')} className="text-gray-300 hover:text-white text-left w-full">Services</button>
              <button onClick={() => scrollToSection('testimonials')} className="text-gray-300 hover:text-white text-left w-full">Testimonials</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-white text-left w-full">Contact</button>
              <button onClick={() => navigate('/blog')} className="text-gray-300 hover:text-white text-left w-full">Blog</button>
              <button onClick={() => navigate('/faq')} className="text-gray-300 hover:text-white text-left w-full">FAQ</button>
              <button onClick={() => navigate('/about')} className="text-gray-300 hover:text-white text-left w-full">About</button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero */}
      <div className="py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-green-500/10 border border-green-500/20 mb-6 mx-auto">
            <GraduationCap className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-400 font-medium">TRAINING PROGRAMS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Master Cybersecurity Skills</h1>
          <p className="text-base sm:text-lg text-gray-400 mx-auto">Comprehensive training programs to advance your cybersecurity career. From beginner to expert level.</p>
        </div>
      </div>

      {/* Training Programs */}
      <div id="services" className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-8">Our Training Programs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainingPrograms.map((program, index) => {
              const IconComponent = program.icon;
              return (
                <Card key={index} className="bg-slate-900/60 border-slate-700 hover:border-amber-500/50 transition-all duration-300 cursor-pointer" onClick={() => navigate(program.link)}>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-amber-400" />
                    </div>
                    <div className="mb-2">
                      <div className="inline-block px-2 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-3">
                        <span className="text-xs text-amber-400 font-medium">{program.level}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg sm:text-xl text-white mb-2">{program.title}</CardTitle>
                    <CardDescription className="text-slate-400 text-sm">{program.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1 mb-3">
                      {program.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t border-slate-700 text-sm sm:text-base">
                      <span className="text-amber-400 font-bold">{program.price}</span>
                      <span className="text-slate-500">{program.duration}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div id="testimonials" className="py-12 px-4 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-8">Student Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Card key={i} className="bg-gray-900/50 border-gray-800">
                <CardContent className="pt-6">
                  <p className="text-gray-300 mb-4 italic text-sm sm:text-base">"{t.text}"</p>
                  <div>
                    <p className="font-semibold text-white text-sm sm:text-base">{t.name}</p>
                    <p className="text-gray-400 text-xs sm:text-sm">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Contact */}
      <div id="contact" className="py-12 px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Start Learning?</h2>
          <p className="text-base sm:text-lg text-gray-400 mb-6">Enroll today and take the first step in your cybersecurity journey</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 flex items-center justify-center">
              <Mail className="w-4 h-4 mr-2" />
              contact@cybersage.ai
            </Button>
            <Button variant="outline" className="w-full sm:w-auto border-gray-700 text-white hover:bg-gray-800 flex items-center justify-center">
              <MessageSquare className="w-4 h-4 mr-2" />
              Enroll Now
            </Button>
          </div>
        </div>
      </div>

      <SageAI />
    </div>
  );
};

export default TrainingPage;
