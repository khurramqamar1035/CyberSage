import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layers, ArrowLeft, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import SageAI from '../../components/SageAI';

const CrossPlatformDevelopment = () => {
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
            <Layers className="w-5 h-5 text-amber-400" />
            <span className="text-sm text-amber-300 font-medium">CROSS-PLATFORM DEVELOPMENT</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Cross-Platform Development</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Build once, deploy everywhere with React Native or Flutter
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
              What is Cross-Platform Development?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300 space-y-4">
            <p className="text-lg leading-relaxed">
              Cross-Platform Development allows you to build mobile applications that run on both iOS and Android using a single codebase. Instead of maintaining two separate native apps, you write code once and deploy to both platforms, dramatically reducing development time and costs while maintaining near-native performance.
            </p>
            <p className="leading-relaxed">
              We specialize in React Native (Facebook's framework using JavaScript/React) and Flutter (Google's framework using Dart). Both frameworks compile to native code, providing excellent performance while sharing 80-95% of code between platforms. This means faster development, easier maintenance, and consistent user experience across devices.
            </p>
            <p className="leading-relaxed">
              Perfect for startups and businesses that need to reach both iOS and Android users quickly without the cost of building two separate apps. You get native performance, platform-specific UI elements, and access to device features, all from a unified codebase.
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
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'React Native Development',
                    description: 'Leverage your web development team with JavaScript and React knowledge'
                  },
                  {
                    title: 'Flutter Development',
                    description: 'Google\'s UI toolkit with beautiful, customizable widgets and fast performance'
                  },
                  {
                    title: 'Shared Business Logic',
                    description: 'Write authentication, API calls, and state management once for both platforms'
                  },
                  {
                    title: 'Platform-Specific Code',
                    description: 'Access native features when needed while maintaining shared codebase'
                  },
                  {
                    title: 'Hot Reload Development',
                    description: 'See changes instantly without recompiling the entire app'
                  },
                  {
                    title: 'Native Performance',
                    description: 'Apps that feel native with smooth animations and gestures'
                  },
                  {
                    title: 'Unified Design System',
                    description: 'Consistent UI/UX across platforms with platform-aware components'
                  },
                  {
                    title: 'Faster Time to Market',
                    description: 'Launch on both platforms simultaneously with a single team'
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-slate-400">{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-4">Framework Comparison</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-blue-300 mb-3">React Native</h4>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li>• JavaScript/TypeScript</li>
                      <li>• Huge ecosystem & community</li>
                      <li>• Used by Facebook, Instagram, Airbnb</li>
                      <li>• Familiar to web developers</li>
                      <li>• Over-the-air updates</li>
                    </ul>
                  </div>
                  <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-purple-300 mb-3">Flutter</h4>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li>• Dart language</li>
                      <li>• Beautiful default widgets</li>
                      <li>• Used by Google, Alibaba, BMW</li>
                      <li>• Faster rendering (Skia engine)</li>
                      <li>• Desktop & web support</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-amber-400" />
              Why Choose Cross-Platform Development
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 text-slate-300">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Cost & Time Savings</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                    <p className="text-green-300 font-semibold mb-2">50-60% Cost Reduction</p>
                    <p className="text-sm text-slate-400">One codebase instead of two separate apps = half the development cost</p>
                  </div>
                  <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                    <p className="text-green-300 font-semibold mb-2">Faster Launch</p>
                    <p className="text-sm text-slate-400">Release on both platforms simultaneously, reaching market faster</p>
                  </div>
                  <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                    <p className="text-green-300 font-semibold mb-2">Easier Maintenance</p>
                    <p className="text-sm text-slate-400">Fix bugs and add features once, deploy everywhere</p>
                  </div>
                  <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                    <p className="text-green-300 font-semibold mb-2">Smaller Team</p>
                    <p className="text-sm text-slate-400">One development team instead of separate iOS and Android teams</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Perfect For</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2"></div>
                    <span><strong className="text-white">MVPs & Startups:</strong> Launch fast and iterate quickly with limited budget</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2"></div>
                    <span><strong className="text-white">Content-Driven Apps:</strong> News, social media, e-commerce, and streaming apps</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2"></div>
                    <span><strong className="text-white">Business Apps:</strong> CRM, productivity tools, internal applications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2"></div>
                    <span><strong className="text-white">Web-to-Mobile:</strong> Converting existing web apps to mobile</span>
                  </li>
                </ul>
              </div>

              <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-amber-300 mb-3">⚡ When NOT to Use Cross-Platform</h3>
                <p className="text-slate-300 mb-2">Consider native development if you need:</p>
                <p className="text-slate-400 text-sm">
                  • Heavy graphics/gaming • Complex animations • Platform-specific features • Maximum performance • Extensive hardware integration
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white text-lg px-8 py-6">
            Get Custom Quote
          </Button>
          <p className="text-slate-400 mt-4">Free consultation • Framework recommendation • Rapid development</p>
        </div>
      </div>

      <SageAI />
    </div>
  );
};

export default CrossPlatformDevelopment;