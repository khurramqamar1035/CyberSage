import React from 'react';
import { Zap, Target, DollarSign, MessageSquare } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const About = () => {
  const features = [
    {
      icon: Zap,
      title: 'Quick AI Scans',
      description: 'AI-powered scans deliver results in hours, not weeks'
    },
    {
      icon: Target,
      title: 'Actionable Reports',
      description: 'Clear recommendations you can implement immediately'
    },
    {
      icon: DollarSign,
      title: 'Affordable Pricing',
      description: 'Enterprise-grade security at freelancer-friendly prices'
    },
    {
      icon: MessageSquare,
      title: 'No Jargon',
      description: 'Reports written in plain English, not tech speak'
    }
  ];

  return (
    <div className="py-20 px-4 bg-gray-900/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-block px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <span className="text-sm text-blue-400 font-medium">ABOUT US</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Protecting Your Digital Future
            </h2>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              We help startups, small businesses, and freelancers secure their digital assets using AI-powered tools and workflows. Our mission is to make cybersecurity fast, actionable, and accessible—even if you don't have a dedicated technical team.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              With years of expertise and cutting-edge technology, we deliver comprehensive security solutions that protect what matters most to your business.
            </p>
          </div>

          {/* Right Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={index}
                  className="bg-gray-900/50 border-gray-800 hover:border-blue-500/50 transition-all duration-300"
                >
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;