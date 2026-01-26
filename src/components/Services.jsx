import React from 'react';
import { Shield, Lock, Search, Zap, Users, FileCheck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const Services = () => {
  const securityServices = [
    {
      icon: Search,
      title: 'AI Security Audit',
      description: 'Comprehensive AI-powered security assessment',
      price: '$20',
      delivery: '24 hours'
    },
    {
      icon: Shield,
      title: 'Vulnerability Assessment',
      description: 'Deep dive into system vulnerabilities',
      price: '$50',
      delivery: '48 hours'
    },
    {
      icon: Lock,
      title: 'Penetration Testing',
      description: 'Ethical hacking to identify weak points',
      price: '$150',
      delivery: '5 days'
    },
    {
      icon: Zap,
      title: 'Real-time Monitoring',
      description: '24/7 threat detection and alerting',
      price: '$99/mo',
      delivery: 'Instant setup'
    },
    {
      icon: Users,
      title: 'Security Consultation',
      description: 'Expert guidance for your security needs',
      price: '$75',
      delivery: 'Flexible'
    },
    {
      icon: FileCheck,
      title: 'Compliance Audit',
      description: 'Ensure regulatory compliance',
      price: '$200',
      delivery: '7 days'
    }
  ];

  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-500/10 text-blue-400 border-blue-500/20">
            OUR SERVICES
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Comprehensive Security Solutions
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Enterprise-grade security at affordable prices. Fast, actionable, and accessible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityServices.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card
                key={index}
                className="group bg-gray-900/50 border-gray-800 hover:border-blue-500/50 transition-all duration-300 hover:scale-105"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                    <IconComponent className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl text-white">{service.title}</CardTitle>
                    <span className="text-lg font-bold text-blue-400">{service.price}</span>
                  </div>
                  <CardDescription className="text-gray-400">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
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
  );
};

export default Services;