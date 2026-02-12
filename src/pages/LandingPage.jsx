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
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col items-center justify-center py-10 sm:py-14">
        {/* Logo */}
        <div className="mb-6 sm:mb-8">
          <img 
            src="https://customer-assets.emergentagent.com/job_83508210-49e2-4693-89fb-e881ef07bca3/artifacts/0n25qd68_Gemini_Generated_Image_jkwstijkwstijkws-removebg-preview.png" 
            alt="CyberSage Logo" 
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain mx-auto"
          />
        </div>
        
        {/* Welcome Text */}
        <div className="text-center mb-8 px-2">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-3">
            Welcome to CyberSage
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-400">
            Your Digital Guardian - Choose Your Path
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8 w-full max-w-5xl">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <Card
                key={service.id}
                className={`group relative overflow-hidden bg-slate-900/60 border-slate-700 ${service.borderColor} transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer`}
                onClick={() => navigate(service.path)}
              >
                <CardHeader className="relative z-10 pb-3">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 ${service.iconColor}`} />
                  </div>
                  <CardTitle className="text-lg sm:text-xl text-white mb-2">
                    {service.title}
                  </CardTitle>
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
              <Button
                variant="outline"
                className="bg-slate-900/50 border-slate-700 text-white hover:bg-slate-800 hover:border-amber-500/50"
              >
                <Info className="w-4 h-4 mr-2" />
                About Us
              </Button>
            </DialogTrigger>

            <DialogContent className="bg-slate-900 border-slate-700 text-white w-[95%] sm:max-w-2xl max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl sm:text-2xl mb-4 text-amber-400">
                  About CyberSage
                </DialogTitle>

                <DialogDescription className="text-slate-300 space-y-4 text-left">
                  <p className="text-sm sm:text-base leading-relaxed">
                    CyberSage is your trusted partner in digital security, development, and training.
                    We help startups, small businesses, and freelancers secure their digital assets
                    using AI-powered tools and workflows.
                  </p>
                  
                  <div className="pt-4 border-t border-slate-700">
                    <h4 className="text-base sm:text-lg font-semibold text-white mb-4">
                      Our Founders
                    </h4>
                    
                    <div className="space-y-4">
                      {[
                        { initial: 'K', name: 'Khurram', role: 'Co-Founder & CEO' },
                        { initial: 'P', name: 'Peeyush', role: 'Co-Founder & CTO' },
                        { initial: 'A', name: 'Shashank Jaiswal', role: 'Investor / CEO' }
                      ].map((founder, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                            <span className="text-amber-400 font-semibold">
                              {founder.initial}
                            </span>
                          </div>
                          <div>
                            <h5 className="font-semibold text-white text-sm sm:text-base">
                              {founder.name}
                            </h5>
                            <p className="text-xs sm:text-sm text-slate-400">
                              {founder.role}
                            </p>
                          </div>
                        </div>
                      ))}
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
