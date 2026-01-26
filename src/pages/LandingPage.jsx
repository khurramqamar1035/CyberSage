import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Code, GraduationCap, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';

const LandingPage = () => {
  const navigate = useNavigate();
  const [aboutOpen, setAboutOpen] = useState(false);

  const services = [
    {
      id: 'security',
      icon: Shield,
      title: 'Cyber Security',
      description: 'Protect your digital assets with AI-powered security solutions',
      iconColor: 'text-amber-400',
      borderColor: 'hover:border-amber-500/50',
      path: '/security'
    },
    {
      id: 'development',
      icon: Code,
      title: 'Development',
      description: 'Build secure and scalable applications with expert guidance',
      iconColor: 'text-amber-400',
      borderColor: 'hover:border-amber-500/50',
      path: '/development'
    },
    {
      id: 'training',
      icon: GraduationCap,
      title: 'Training',
      description: 'Master cybersecurity skills with comprehensive courses',
      iconColor: 'text-amber-400',
      borderColor: 'hover:border-amber-500/50',
      path: '/training'
    }
  ];

  return (
    <div className="relative h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col items-center justify-center h-full py-8">
        {/* Logo */}
        <div className="mb-6">
          <img 
            src="https://customer-assets.emergentagent.com/job_83508210-49e2-4693-89fb-e881ef07bca3/artifacts/0n25qd68_Gemini_Generated_Image_jkwstijkwstijkws-removebg-preview.png" 
            alt="CyberSage Logo" 
            className="w-32 h-32 object-contain mx-auto"
          />
        </div>
        
        {/* Welcome Text */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-3">
            Welcome to CyberSage
          </h1>
          <p className="text-lg md:text-xl text-slate-400">
            Your Digital Guardian - Choose Your Path
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-6 w-full max-w-5xl">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <Card
                key={service.id}
                className={`group relative overflow-hidden bg-slate-900/60 border-slate-700 ${service.borderColor} transition-all duration-300 hover:scale-105 cursor-pointer`}
                onClick={() => navigate(service.path)}
              >
                <CardHeader className="relative z-10 pb-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className={`w-6 h-6 ${service.iconColor}`} />
                  </div>
                  <CardTitle className="text-xl text-white mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-slate-400 text-sm leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="relative z-10 pt-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full group-hover:bg-white/10 transition-colors duration-300 text-amber-400"
                  >
                    Explore Services
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* About Us Button */}
        <div className="text-center">
          <Dialog open={aboutOpen} onOpenChange={setAboutOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-slate-900/50 border-slate-700 text-white hover:bg-slate-800 hover:border-amber-500/50">
                <Info className="w-4 h-4 mr-2" />
                About Us
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl mb-4 text-amber-400">About CyberSage</DialogTitle>
                <DialogDescription className="text-slate-300 space-y-4 text-left">
                  <p className="text-base leading-relaxed">
                    CyberSage is your trusted partner in digital security, development, and training. 
                    We help startups, small businesses, and freelancers secure their digital assets 
                    using AI-powered tools and workflows.
                  </p>
                  
                  <div className="pt-4 border-t border-slate-700">
                    <h4 className="text-lg font-semibold text-white mb-4">Our Founders</h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                          <span className="text-amber-400 font-semibold">K</span>
                        </div>
                        <div>
                          <h5 className="font-semibold text-white">Khurram</h5>
                          <p className="text-sm text-slate-400">Co-Founder & CEO</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                          <span className="text-amber-400 font-semibold">P</span>
                        </div>
                        <div>
                          <h5 className="font-semibold text-white">Peeyush</h5>
                          <p className="text-sm text-slate-400">Co-Founder & CTO</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                          <span className="text-amber-400 font-semibold">A</span>
                        </div>
                        <div>
                          <h5 className="font-semibold text-white">Abhinav</h5>
                          <p className="text-sm text-slate-400">Co-Founder & Sr SME</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;