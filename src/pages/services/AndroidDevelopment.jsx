import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, ArrowLeft, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import SageAI from '../../components/SageAI';

const AndroidDevelopment = () => {
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
            <span className="text-sm text-amber-300 font-medium">ANDROID DEVELOPMENT</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Android Development</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Native Android apps built with Kotlin and modern architecture
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
              What is Android Development?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300 space-y-4">
            <p className="text-lg leading-relaxed">
              Android Development is the process of creating mobile applications specifically for the Android operating system, which powers over 70% of smartphones worldwide. We build native Android apps using Kotlin (Google's preferred language) and modern Android development tools to create fast, secure, and user-friendly applications.
            </p>
            <p className="leading-relaxed">
              Our Android development follows Material Design guidelines and leverages the latest Android features including Jetpack Compose for modern UI, Room for local database, WorkManager for background tasks, and comprehensive security implementations. We build apps that feel native to Android users while maintaining high performance across different device sizes and Android versions.
            </p>
            <p className="leading-relaxed">
              Whether you're building a consumer app, enterprise solution, or internal tool, we deliver production-ready Android applications with clean architecture, comprehensive testing, and full Play Store deployment support.
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
                  title: 'Modern UI with Jetpack Compose',
                  description: 'Beautiful, responsive interfaces using the latest declarative UI toolkit from Google'
                },
                {
                  title: 'Secure Backend Integration',
                  description: 'RESTful API integration, GraphQL, real-time data sync with proper security'
                },
                {
                  title: 'Offline-First Architecture',
                  description: 'Apps that work without internet connection, syncing when connectivity returns'
                },
                {
                  title: 'Payment Integration',
                  description: 'Google Pay, Stripe, PayPal, and other payment gateway implementations'
                },
                {
                  title: 'Push Notifications',
                  description: 'Firebase Cloud Messaging for engaging user notifications'
                },
                {
                  title: 'Location Services',
                  description: 'GPS tracking, geofencing, maps integration with Google Maps'
                },
                {
                  title: 'Media Handling',
                  description: 'Camera, video recording, audio playback, image processing'
                },
                {
                  title: 'Authentication',
                  description: 'Google Sign-In, biometric auth, OAuth, JWT token management'
                }
              ].map((item, index) => (
                <div key={index} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-slate-800/50 p-6 rounded-lg border border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-4">Our Development Process</h3>
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { step: '1', title: 'Discovery', desc: 'Requirements gathering and technical planning' },
                  { step: '2', title: 'Design', desc: 'UI/UX mockups following Material Design' },
                  { step: '3', title: 'Development', desc: 'Agile sprints with weekly progress updates' },
                  { step: '4', title: 'Launch', desc: 'Play Store submission and deployment' }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mx-auto mb-3">
                      <span className="text-amber-400 font-bold text-lg">{item.step}</span>
                    </div>
                    <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-400">{item.desc}</p>
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
              Why Choose Our Android Development
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 text-slate-300">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Technical Excellence</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2"></div>
                    <span><strong className="text-white">Kotlin-First:</strong> Using Google's recommended language for best performance and safety</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2"></div>
                    <span><strong className="text-white">Clean Architecture:</strong> MVVM pattern with proper separation of concerns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2"></div>
                    <span><strong className="text-white">Comprehensive Testing:</strong> Unit tests, integration tests, and UI tests included</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2"></div>
                    <span><strong className="text-white">Security Built-In:</strong> Encryption, secure storage, certificate pinning, ProGuard</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Perfect For</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4">
                    <p className="text-amber-300 font-semibold mb-2">Startups & MVPs</p>
                    <p className="text-sm text-slate-400">Launch fast with a solid foundation that scales as you grow</p>
                  </div>
                  <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4">
                    <p className="text-amber-300 font-semibold mb-2">E-commerce</p>
                    <p className="text-sm text-slate-400">Secure payment processing and inventory management</p>
                  </div>
                  <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4">
                    <p className="text-amber-300 font-semibold mb-2">Social Networks</p>
                    <p className="text-sm text-slate-400">Real-time messaging, feeds, and user interactions</p>
                  </div>
                  <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4">
                    <p className="text-amber-300 font-semibold mb-2">Enterprise Apps</p>
                    <p className="text-sm text-slate-400">Internal tools, CRM, field service applications</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-green-300 mb-3">✓ What's Included</h3>
                <p className="text-slate-300">
                  Source code • Full documentation • Play Store deployment • 30-day post-launch support • Analytics integration • Crash reporting setup • Performance optimization
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white text-lg px-8 py-6">
            Get Custom Quote
          </Button>
          <p className="text-slate-400 mt-4">Free consultation • Flexible pricing • Transparent development process</p>
        </div>
      </div>

      <SageAI />
    </div>
  );
};

export default AndroidDevelopment;
