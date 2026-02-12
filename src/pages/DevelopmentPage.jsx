import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, Smartphone, Monitor, Layers, Shield, GraduationCap, Mail, MessageSquare, Menu, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import SageAI from '../components/SageAI';

const DevelopmentPage = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const developmentServices = [
    { icon: Smartphone, title: 'Android Development', description: 'Native Android apps built with Kotlin and modern architecture', price: 'Custom Quote', features: ['Native Android apps', 'Material Design', 'Play Store deployment', 'Ongoing support'], link: '/services/AndroidDevelopment' },
    { icon: Smartphone, title: 'iOS Development', description: 'Native iOS apps using Swift and latest Apple technologies', price: 'Custom Quote', features: ['Native iOS apps', 'SwiftUI interface', 'App Store deployment', 'Apple guidelines'], link: '/services/IosDevelopment' },
    { icon: Layers, title: 'Cross-Platform (Both)', description: 'Build once, deploy everywhere with React Native or Flutter', price: 'Custom Quote', features: ['iOS & Android apps', 'Shared codebase', 'Native performance', 'Cost-effective'], link: '/services/CrossPlatformDevelopment' },
    { icon: Monitor, title: 'Web Development', description: 'Modern web applications with responsive design and scalability', price: 'Custom Quote', features: ['Responsive design', 'Modern frameworks', 'Cloud deployment', 'SEO optimized'], link: '/services/WebDevelopment' }
  ];

  const testimonials = [
    { name: 'Alex Johnson', role: 'Startup Founder', text: 'CyberSage built our MVP in record time. The cross-platform app works flawlessly on both iOS and Android.' },
    { name: 'Lisa Park', role: 'Product Manager', text: 'Their web development team delivered a beautiful, fast, and secure application that exceeded our expectations.' },
    { name: 'David Miller', role: 'Tech Lead', text: 'Professional, reliable, and skilled developers. They understood our requirements and delivered exactly what we needed.' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
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
                <Button onClick={() => navigate('/training')} variant="ghost" size="sm" className="text-green-400 hover:text-green-300">
                  <GraduationCap className="w-4 h-4 mr-1" /> Training
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
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6 mx-auto">
            <Code className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-400 font-medium">DEVELOPMENT SERVICES</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Build Your Digital Vision</h1>
          <p className="text-base sm:text-lg text-gray-400 mx-auto">Expert development services for mobile and web applications. Secure, scalable, and user-friendly solutions.</p>
        </div>
      </div>

      {/* Development Services */}
      <div id="services" className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-8">Our Development Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {developmentServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="bg-slate-900/60 border-slate-700 hover:border-amber-500/50 transition-all duration-300 cursor-pointer" onClick={() => navigate(service.link)}>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-amber-400" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl text-white mb-2">{service.title}</CardTitle>
                    <CardDescription className="text-gray-400 text-sm">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1 mb-3">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <span className="text-purple-400 font-bold">{service.price}</span>
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
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-8">Client Success Stories</h2>
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
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Build Your App?</h2>
          <p className="text-base sm:text-lg text-gray-400 mb-6">Let's discuss your project requirements</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 flex items-center justify-center">
              <Mail className="w-4 h-4 mr-2" />
              contact@cybersage.ai
            </Button>
            <Button variant="outline" className="w-full sm:w-auto border-gray-700 text-white hover:bg-gray-800 flex items-center justify-center">
              <MessageSquare className="w-4 h-4 mr-2" />
              Get a Quote
            </Button>
          </div>
        </div>
      </div>

      <SageAI />
    </div>
  );
};

export default DevelopmentPage;
