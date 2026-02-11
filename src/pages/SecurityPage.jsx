import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Search, Lock, Zap, Users, FileCheck, Code, GraduationCap, Mail, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import SageAI from '../components/SageAI';

const SecurityPage = () => {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const securityServices = [
    {
      icon: Search,
      title: 'AI Security Audit',
      description: 'Comprehensive AI-powered security assessment of your digital infrastructure',
      price: '$20',
      delivery: '24 hours',
      features: ['Automated vulnerability scanning', 'AI-powered threat detection', 'Detailed security report'],
      link: '/services/AiSecurityAudit'
    },
    {
      icon: Shield,
      title: 'Vulnerability Assessment',
      description: 'Deep dive analysis to identify security weaknesses in your systems',
      price: '$50',
      delivery: '48 hours',
      features: ['Manual security testing', 'Code review', 'Network analysis'],
      link: '/services/VulnerabilityAssessment'
    },
    {
      icon: Lock,
      title: 'Penetration Testing',
      description: 'Ethical hacking to identify and exploit security vulnerabilities',
      price: '$150',
      delivery: '5 days',
      features: ['Full penetration testing', 'Exploit demonstration', 'Remediation guidance'],
      link: '/services/PenetrationTesting'
    },
    {
      icon: Zap,
      title: 'Real-time Monitoring',
      description: '24/7 threat detection and alerting system for your infrastructure',
      price: '$99/mo',
      delivery: 'Instant setup',
      features: ['24/7 monitoring', 'Instant alerts', 'Monthly reports'],
      link: '/services/RealtimeMonitoring'
    },
    {
      icon: Users,
      title: 'Security Consultation',
      description: 'Expert guidance tailored to your specific security needs',
      price: '$75',
      delivery: 'Flexible',
      features: ['One-on-one consultation', 'Custom security strategy', 'Implementation support'],
      link: '/services/SecurityConsultation'
    },
    {
      icon: FileCheck,
      title: 'Compliance Audit',
      description: 'Ensure your systems meet industry regulatory requirements',
      price: '$200',
      delivery: '7 days',
      features: ['GDPR/HIPAA compliance', 'Documentation review', 'Compliance roadmap'],
      link: '/services/ComplianceAudit'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'CTO, TechStart Inc',
      text: 'CyberSage identified critical vulnerabilities we never knew existed. Their AI-powered approach saved us weeks of manual testing.'
    },
    {
      name: 'Michael Roberts',
      role: 'Founder, SecureApp',
      text: 'The threat report was incredibly detailed yet easy to understand. Implementation was straightforward with their clear recommendations.'
    },
    {
      name: 'Emily Watson',
      role: 'Product Manager, CloudSafe',
      text: 'Enterprise-grade security at a fraction of the cost. CyberSage gave us peace of mind without breaking our budget.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      {/* Header */}
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
                <Button onClick={() => navigate('/development')} variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300">
                  <Code className="w-4 h-4 mr-1" /> Development
                </Button>
                <Button onClick={() => navigate('/training')} variant="ghost" size="sm" className="text-green-400 hover:text-green-300">
                  <GraduationCap className="w-4 h-4 mr-1" /> Training
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <Shield className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-400 font-medium">CYBER SECURITY SERVICES</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Protecting Your Digital Assets</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">AI-powered cybersecurity solutions for startups, small businesses, and freelancers. Fast, actionable, and accessible.</p>
        </div>
      </div>

      {/* Services Section */}
      <div id="services" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Our Security Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card 
                  key={index} 
                  className="bg-slate-900/60 border-slate-700 hover:border-blue-500/50 transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(service.link)}
                >
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-xl text-white">{service.title}</CardTitle>
                      <span className="text-lg font-bold text-blue-400">{service.price}</span>
                    </div>
                    <CardDescription className="text-slate-400">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                      <span>Delivery: {service.delivery}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div id="testimonials" className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">What Our Clients Say</h2>
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

      {/* Contact Section */}
      <div id="contact" className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Secure Your Assets?</h2>
          <p className="text-xl text-gray-400 mb-8">Get in touch with our security experts today</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Mail className="w-4 h-4 mr-2" />
              contact@cybersage.ai
            </Button>
            <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
              <MessageSquare className="w-4 h-4 mr-2" />
              Schedule Consultation
            </Button>
          </div>
        </div>
      </div>

      <SageAI />
    </div>
  );
};

export default SecurityPage;