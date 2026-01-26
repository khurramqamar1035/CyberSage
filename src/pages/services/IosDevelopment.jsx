import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, ArrowLeft, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import SageAI from '../../components/SageAI';

const IosDevelopment = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <nav className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button onClick={() => navigate('/development')} variant="ghost" className="text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Development Services
            </Button>
            <div className="flex items-center gap-3">
              <img 
                src="https://customer-assets.emergentagent.com/job_83508210-49e2-4693-89fb-e881ef07bca3/artifacts/0n25qd68_Gemini_Generated_Image_jkwstijkwstijkws-removebg-preview.png" 
                alt="CyberSage" 
                className="w-10 h-10 object-contain"
              />
              <h1 className="text-xl font-bold text-white">CyberSage</h1>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 mb-6">
            <Smartphone className="w-5 h-5 text-amber-400" />
            <span className="text-sm text-amber-300 font-medium">iOS DEVELOPMENT</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">iOS Development</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Native iOS apps using Swift and latest Apple technologies
          </p>
          <div className="mt-6">
            <span className="text-4xl font-bold text-amber-400">Custom Quote</span>
            <span className="text-slate-400 ml-2">• Based on project scope</span>
          </div>
        </div>

        <Card className="bg-slate-900/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
              What is iOS Development?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300 space-y-4">
            <p className="text-lg leading-relaxed">
              iOS Development is the art and science of creating applications specifically for Apple's ecosystem—iPhone, iPad, and Apple Watch. We build native iOS apps using Swift (Apple's modern programming language) and SwiftUI for beautiful, fluid user interfaces that feel perfectly at home on Apple devices.
            </p>
            <p className="leading-relaxed">
              iOS users represent a premium market segment with higher engagement and spending rates. Our development follows Apple's Human Interface Guidelines to create apps that leverage iOS-specific features like Face ID, Apple Pay, iCloud sync, widgets, and App Clips. We ensure your app passes App Store review requirements and delivers the polished experience iOS users expect.
            </p>
            <p className="leading-relaxed">
              Whether you're targeting iPhone users globally or building iPad-specific productivity tools, we deliver production-ready iOS applications with smooth animations, responsive gestures, and seamless integration with the Apple ecosystem.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-amber-400" />
              What We Build
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'SwiftUI Interfaces',
                  description: 'Modern, declarative UI with smooth animations and native feel'
                },
                {
                  title: 'Apple Pay Integration',
                  description: 'Seamless payment processing with biometric authentication'
                },
                {
                  title: 'CloudKit & iCloud Sync',
                  description: 'Automatic data synchronization across all user devices'
                },
                {
                  title: 'Face ID / Touch ID',
                  description: 'Biometric authentication for secure, passwordless login'
                },
                {
                  title: 'HealthKit Integration',
                  description: 'Access health and fitness data with user permission'
                },
                {
                  title: 'ARKit Experiences',
                  description: 'Augmented reality features for immersive experiences'
                },
                {
                  title: 'Widgets & App Clips',
                  description: 'Home screen widgets and lightweight app experiences'
                },
                {
                  title: 'WatchOS Apps',
                  description: 'Companion Apple Watch apps for notifications and quick actions'
                }
              ].map((item, index) => (
                <div key={index} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-slate-800/50 p-6 rounded-lg border border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-4">Apple Ecosystem Integration</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  'iPhone Apps',
                  'iPad Optimization',
                  'Apple Watch',
                  'Mac Catalyst',
                  'Apple TV',
                  'CarPlay',
                  'Siri Shortcuts',
                  'HomeKit',
                  'Handoff & Continuity'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 bg-slate-900/50 p-3 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-slate-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-amber-400" />
              Why Choose Our iOS Development
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 text-slate-300">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">iOS User Advantages</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4">
                    <p className="text-amber-300 font-semibold mb-2">Higher Revenue</p>
                    <p className="text-sm text-slate-400">iOS users spend 2.5x more on apps than Android users</p>
                  </div>
                  <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4">
                    <p className="text-amber-300 font-semibold mb-2">Premium Audience</p>
                    <p className="text-sm text-slate-400">Target affluent users who value quality and are willing to pay</p>
                  </div>
                  <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4">
                    <p className="text-amber-300 font-semibold mb-2">Better Engagement</p>
                    <p className="text-sm text-slate-400">iOS users open apps more frequently and stay longer</p>
                  </div>
                  <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4">
                    <p className="text-amber-300 font-semibold mb-2">Unified Platform</p>
                    <p className="text-sm text-slate-400">Fewer device variations = easier testing and support</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Our Expertise</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2"></div>
                    <span><strong className="text-white">Swift & SwiftUI Masters:</strong> Using Apple's latest technologies for best performance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2"></div>
                    <span><strong className="text-white">App Store Optimization:</strong> We know what Apple reviewers look for</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2"></div>
                    <span><strong className="text-white">Performance Focused:</strong> Smooth 60fps animations and instant response</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2"></div>
                    <span><strong className="text-white">Security First:</strong> Keychain, encryption, and App Transport Security</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-green-300 mb-3">✓ Full Service Package</h3>
                <p className="text-slate-300">
                  SwiftUI development • App Store submission • TestFlight beta • Push notifications • Analytics • Crash reporting • 60-day support • Source code included
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white text-lg px-8 py-6">
            Get Custom Quote
          </Button>
          <p className="text-slate-400 mt-4">Free consultation • Competitive pricing • App Store launch support</p>
        </div>
      </div>

      <SageAI />
    </div>
  );
};

export default IosDevelopment;