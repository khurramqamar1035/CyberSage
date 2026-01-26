import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Monitor, ArrowLeft, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import SageAI from '../../components/SageAI';

const WebDevelopment = () => {
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
            <Monitor className="w-5 h-5 text-amber-400" />
            <span className="text-sm text-amber-300 font-medium">WEB DEVELOPMENT</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Web Development</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Modern web applications with responsive design and scalability
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
              What is Modern Web Development?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300 space-y-4">
            <p className="text-lg leading-relaxed">
              Modern Web Development is creating responsive, performant, and scalable web applications using cutting-edge technologies and frameworks. We build everything from simple landing pages to complex SaaS platforms, e-commerce stores, and progressive web apps (PWAs) that work seamlessly across all devices and browsers.
            </p>
            <p className="leading-relaxed">
              Our development stack includes React, Next.js, Vue.js, and Node.js for building lightning-fast, SEO-friendly applications with excellent user experiences. We implement responsive design (mobile-first), progressive enhancement, and accessibility standards to ensure your web app works for everyone, everywhere.
            </p>
            <p className="leading-relaxed">
              From concept to deployment, we handle everything: UI/UX design, frontend development, backend APIs, database architecture, cloud hosting, CDN setup, SSL certificates, and ongoing maintenance. Your web app will be secure, scalable, and ready to handle growth.
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
                  title: 'SaaS Platforms',
                  description: 'Multi-tenant applications with subscription billing, user management, and analytics'
                },
                {
                  title: 'E-commerce Stores',
                  description: 'Online stores with shopping carts, payment processing, inventory management'
                },
                {
                  title: 'Progressive Web Apps',
                  description: 'Web apps that work offline, can be installed, and send push notifications'
                },
                {
                  title: 'Admin Dashboards',
                  description: 'Data visualization, reporting, user management, and business intelligence tools'
                },
                {
                  title: 'Content Management',
                  description: 'Custom CMS, blogs, news sites, and content publishing platforms'
                },
                {
                  title: 'Social Networks',
                  description: 'Community platforms with profiles, feeds, messaging, and user interactions'
                },
                {
                  title: 'Booking Systems',
                  description: 'Appointment scheduling, reservation systems, calendar management'
                },
                {
                  title: 'Real-time Applications',
                  description: 'Chat apps, collaboration tools, live updates with WebSockets'
                }
              ].map((item, index) => (
                <div key={index} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-slate-800/50 p-6 rounded-lg border border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-4">Our Tech Stack</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <h4 className="font-semibold text-white mb-2 text-sm">Frontend</h4>
                  <ul className="space-y-1 text-sm text-slate-400">
                    <li>• React / Next.js</li>
                    <li>• TypeScript</li>
                    <li>• Tailwind CSS</li>
                    <li>• Redux / Zustand</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2 text-sm">Backend</h4>
                  <ul className="space-y-1 text-sm text-slate-400">
                    <li>• Node.js / Express</li>
                    <li>• Python / FastAPI</li>
                    <li>• GraphQL / REST</li>
                    <li>• WebSockets</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2 text-sm">Database</h4>
                  <ul className="space-y-1 text-sm text-slate-400">
                    <li>• PostgreSQL</li>
                    <li>• MongoDB</li>
                    <li>• Redis</li>
                    <li>• Elasticsearch</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2 text-sm">Deployment</h4>
                  <ul className="space-y-1 text-sm text-slate-400">
                    <li>• AWS / Vercel</li>
                    <li>• Docker</li>
                    <li>• CI/CD Pipelines</li>
                    <li>• CloudFlare CDN</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-amber-400" />
              Why Choose Our Web Development
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 text-slate-300">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Performance & SEO</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4">
                    <p className="text-amber-300 font-semibold mb-2">Lightning Fast</p>
                    <p className="text-sm text-slate-400">Sub-second load times with code splitting and lazy loading</p>
                  </div>
                  <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4">
                    <p className="text-amber-300 font-semibold mb-2">SEO Optimized</p>
                    <p className="text-sm text-slate-400">Server-side rendering, meta tags, structured data for Google</p>
                  </div>
                  <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4">
                    <p className="text-amber-300 font-semibold mb-2">Mobile-First</p>
                    <p className="text-sm text-slate-400">Responsive design that works perfectly on all screen sizes</p>
                  </div>
                  <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4">
                    <p className="text-amber-300 font-semibold mb-2">Accessibility</p>
                    <p className="text-sm text-slate-400">WCAG compliant, screen reader friendly, keyboard navigation</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Enterprise Features</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2"></div>
                    <span><strong className="text-white">Scalability:</strong> Architecture that grows from 100 to 1M+ users</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2"></div>
                    <span><strong className="text-white">Security:</strong> SSL, XSS protection, CSRF tokens, rate limiting, data encryption</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2"></div>
                    <span><strong className="text-white">Monitoring:</strong> Error tracking, performance monitoring, user analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2"></div>
                    <span><strong className="text-white">API-First:</strong> Build once, use everywhere (web, mobile, integrations)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-green-300 mb-3">✓ Complete Package</h3>
                <p className="text-slate-300">
                  Custom design • Frontend + Backend • Database setup • Cloud hosting • SSL certificates • Domain setup • Email configuration • Analytics • 90-day support
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white text-lg px-8 py-6">
            Get Custom Quote
          </Button>
          <p className="text-slate-400 mt-4">Free consultation • Detailed proposal • Flexible engagement models</p>
        </div>
      </div>

      <SageAI />
    </div>
  );
};

export default WebDevelopment;