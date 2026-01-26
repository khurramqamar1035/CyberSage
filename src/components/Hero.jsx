import React from 'react';
import { Shield, Code, GraduationCap, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

const Hero = ({ onServiceSelect }) => {
  const services = [
    {
      id: 'security',
      icon: Shield,
      title: 'Cyber Security',
      description: 'Protect your digital assets with AI-powered security solutions',
      color: 'from-blue-500/20 to-cyan-500/20',
      iconColor: 'text-blue-400',
      borderColor: 'hover:border-blue-400/50'
    },
    {
      id: 'development',
      icon: Code,
      title: 'Development',
      description: 'Build secure and scalable applications with expert guidance',
      color: 'from-purple-500/20 to-pink-500/20',
      iconColor: 'text-purple-400',
      borderColor: 'hover:border-purple-400/50'
    },
    {
      id: 'training',
      icon: GraduationCap,
      title: 'Training',
      description: 'Master cybersecurity skills with comprehensive courses',
      color: 'from-green-500/20 to-emerald-500/20',
      iconColor: 'text-green-400',
      borderColor: 'hover:border-green-400/50'
    }
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-20">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
            <span className="text-sm text-blue-400 font-medium">SYSTEM ONLINE</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            CyberSage
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
            Your Digital Guardian - Choose Your Path
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <Card
                key={service.id}
                className={`group relative overflow-hidden bg-gray-900/50 border-gray-800 ${service.borderColor} transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer`}
                onClick={() => onServiceSelect(service.id)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                <CardHeader className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gray-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-8 h-8 ${service.iconColor}`} />
                  </div>
                  <CardTitle className="text-2xl text-white">{service.title}</CardTitle>
                  <CardDescription className="text-gray-400 text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="relative z-10">
                  <Button
                    variant="ghost"
                    className="w-full group-hover:bg-white/10 transition-colors duration-300"
                  >
                    <span>Explore Services</span>
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto">
          {[
            { label: 'Active Users', value: '2,500+' },
            { label: 'Threats Blocked', value: '48K+' },
            { label: 'Success Rate', value: '99.9%' },
            { label: 'Response Time', value: '24h' }
          ].map((stat, index) => (
            <div key={index} className="text-center p-4 rounded-lg bg-gray-900/30 border border-gray-800">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;