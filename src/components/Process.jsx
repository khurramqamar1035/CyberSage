import React from 'react';
import { MessageCircle, FileInput, Cpu, CheckCircle } from 'lucide-react';

const Process = () => {
  const steps = [
    {
      icon: MessageCircle,
      number: '01',
      title: 'Reach Out',
      description: 'Contact us through our form or email to get started with your security journey'
    },
    {
      icon: FileInput,
      number: '02',
      title: 'Share Info',
      description: 'Provide your website URL or system details for comprehensive analysis'
    },
    {
      icon: Cpu,
      number: '03',
      title: 'AI Scan & Analysis',
      description: 'Our AI runs complete assessment with detailed findings and security checks'
    },
    {
      icon: CheckCircle,
      number: '04',
      title: 'Get Results',
      description: 'Receive actionable insights and optional follow-up consultation'
    }
  ];

  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <span className="text-sm text-blue-400 font-medium">PROCESS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Simple, streamlined process to secure your digital assets in just a few steps
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-blue-500/50 to-transparent"></div>
                )}
                
                <div className="relative z-10">
                  {/* Number Badge */}
                  <div className="text-6xl font-bold text-blue-500/20 mb-4">{step.number}</div>
                  
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6">
                    <IconComponent className="w-8 h-8 text-blue-400" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Process;