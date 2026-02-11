import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, BookOpen, Target, Award, Shield, Code, Mail, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import SageAI from '../components/SageAI';



const TrainingPage = () => {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const trainingPrograms = [
    {
      icon: BookOpen,
      title: 'Basic Cybersecurity',
      description: 'Foundation course for beginners in cybersecurity',
      price: '$199',
      duration: '4 weeks',
      level: 'Beginner',
      features: ['Security fundamentals', 'Common threats', 'Basic protection', 'Certificate included'],
      link: '/services/BasicTraining'
    },
    {
      icon: Target,
      title: 'Intermediate Cybersecurity',
      description: 'Advanced concepts and practical security implementation',
      price: '$399',
      duration: '8 weeks',
      level: 'Intermediate',
      features: ['Network security', 'Penetration testing', 'Incident response', 'Hands-on labs'],
      link: '/services/IntermediateTraining'
    },
    {
      icon: Award,
      title: 'Advanced Cybersecurity',
      description: 'Expert-level training with real-world scenarios',
      price: '$699',
      duration: '12 weeks',
      level: 'Advanced',
      features: ['Advanced threats', 'Security architecture', 'Compliance', 'Capstone project'],
      link: '/services/AdvancedTraining'
    }
  ];

  const testimonials = [
    {
      name: 'James Wilson',
      role: 'Security Analyst',
      text: 'The training program transformed my career. I went from zero knowledge to landing a cybersecurity job in 6 months.'
    },
    {
      name: 'Maria Garcia',
      role: 'IT Manager',
      text: 'Excellent hands-on training with real-world examples. The instructors are knowledgeable and supportive.'
    },
    {
      name: 'Tom Brown',
      role: 'Freelance Consultant',
      text: 'Advanced course gave me the skills to offer security consulting services to my clients confidently.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <nav className="sticky top-0 z-40 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
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

            <div className="flex items-center space-x-6">
              <button onClick={() => scrollToSection('services')} className="text-gray-300 hover:text-white transition-colors">Services</button>
              <button onClick={() => scrollToSection('testimonials')} className="text-gray-300 hover:text-white transition-colors">Testimonials</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-white transition-colors">Contact</button>
              <button onClick={() => navigate('/blog')} className="text-gray-300 hover:text-white transition-colors">Blog</button>
              <button onClick={() => navigate('/faq')} className="text-gray-300 hover:text-white transition-colors">FAQ</button>
              <div className="flex items-center gap-2">
                <Button onClick={() => navigate('/security')} variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                  <Shield className="w-4 h-4 mr-1" /> Security
                </Button>
                <Button onClick={() => navigate('/development')} variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300">
                  <Code className="w-4 h-4 mr-1" /> Development
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
            <GraduationCap className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-400 font-medium">TRAINING PROGRAMS</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Master Cybersecurity Skills</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">Comprehensive training programs to advance your cybersecurity career. From beginner to expert level.</p>
        </div>
      </div>

      <div id="services" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Our Training Programs</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {trainingPrograms.map((program, index) => {
              const IconComponent = program.icon;
              return (
                <Card 
                  key={index} 
                  className="bg-slate-900/60 border-slate-700 hover:border-amber-500/50 transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(program.link)}
                >
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-amber-400" />
                    </div>
                    <div className="mb-2">
                      <div className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-3">
                        <span className="text-xs text-amber-400 font-medium">{program.level}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl text-white mb-2">{program.title}</CardTitle>
                    <CardDescription className="text-slate-400">{program.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      {program.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                      <span className="text-lg font-bold text-amber-400">{program.price}</span>
                      <span className="text-sm text-slate-500">{program.duration}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      <div id="testimonials" className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Student Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gray-900/50 border-gray-800">
                <CardContent className="pt-6">
                  <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div id="contact" className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Learning?</h2>
          <p className="text-xl text-gray-400 mb-8">Enroll today and take the first step in your cybersecurity journey</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-green-600 hover:bg-green-700">
              <Mail className="w-4 h-4 mr-2" />
              contact@cybersage.ai
            </Button>
            <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
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
