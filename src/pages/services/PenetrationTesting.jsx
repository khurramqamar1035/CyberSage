import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowLeft, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import SageAI from '../../components/SageAI';

const PenetrationTesting = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <nav className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button onClick={() => navigate('/security')} variant="ghost" className="text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Security Services
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/20 border border-blue-500/30 mb-6">
            <Lock className="w-5 h-5 text-blue-400" />
            <span className="text-sm text-blue-300 font-medium">PENETRATION TESTING</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Penetration Testing</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Ethical hacking to identify and exploit security vulnerabilities before attackers do
          </p>
          <div className="mt-6">
            <span className="text-4xl font-bold text-blue-400">$150</span>
            <span className="text-slate-400 ml-2">• 5 day delivery</span>
          </div>
        </div>

        <Card className="bg-slate-900/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-blue-400" />
              What is Penetration Testing?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300 space-y-4">
            <p className="text-lg leading-relaxed">
              Penetration Testing (Pen Testing) is a simulated cyber attack against your system, performed by certified ethical hackers to identify exploitable vulnerabilities. We think like hackers, act like hackers, but work for you—not against you.
            </p>
            <p className="leading-relaxed">
              Our team uses the same tools, techniques, and procedures (TTPs) that real attackers use, including social engineering, network exploitation, and application-level attacks. The goal is to find and demonstrate security weaknesses before malicious actors can exploit them.
            </p>
            <p className="leading-relaxed">
              We follow industry-standard methodologies like OWASP, PTES (Penetration Testing Execution Standard), and NIST guidelines to ensure comprehensive coverage and professional-grade results.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-blue-400" />
              What We Do
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Our Testing Process</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      phase: 'Reconnaissance',
                      description: 'Information gathering about your systems, network architecture, and potential attack surfaces'
                    },
                    {
                      phase: 'Scanning & Enumeration',
                      description: 'Active probing to identify live hosts, open ports, services, and potential entry points'
                    },
                    {
                      phase: 'Vulnerability Analysis',
                      description: 'Deep assessment to identify specific weaknesses in applications, networks, and configurations'
                    },
                    {
                      phase: 'Exploitation',
                      description: 'Attempting to exploit identified vulnerabilities to gain unauthorized access (safely and ethically)'
                    },
                    {
                      phase: 'Post-Exploitation',
                      description: 'Determining the impact of successful exploits and potential lateral movement within systems'
                    },
                    {
                      phase: 'Reporting',
                      description: 'Comprehensive documentation with proof-of-concept, risk ratings, and remediation steps'
                    }
                  ].map((item, index) => (
                    <div key={index} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                          <span className="text-blue-400 font-bold">{index + 1}</span>
                        </div>
                        <h4 className="text-lg font-semibold text-white">{item.phase}</h4>
                      </div>
                      <p className="text-slate-400">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Testing Coverage</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    'Web Applications',
                    'Mobile Applications',
                    'Network Infrastructure',
                    'APIs & Web Services',
                    'Cloud Environments',
                    'Wireless Networks',
                    'Social Engineering',
                    'Physical Security',
                    'Employee Endpoints'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2 bg-slate-800/30 p-3 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-blue-400" />
              Why You Need Penetration Testing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 text-slate-300">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Compliance Requirements</h3>
                <p className="mb-3">Many regulatory standards mandate regular penetration testing:</p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-3">
                    <p className="text-blue-300 font-semibold">PCI DSS Requirement 11.3</p>
                    <p className="text-sm text-slate-400">Annual pen testing for payment systems</p>
                  </div>
                  <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-3">
                    <p className="text-blue-300 font-semibold">HIPAA Security Rule</p>
                    <p className="text-sm text-slate-400">Regular testing for healthcare systems</p>
                  </div>
                  <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-3">
                    <p className="text-blue-300 font-semibold">SOC 2 Compliance</p>
                    <p className="text-sm text-slate-400">Required for security certifications</p>
                  </div>
                  <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-3">
                    <p className="text-blue-300 font-semibold">ISO 27001</p>
                    <p className="text-sm text-slate-400">Information security management standard</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Business Benefits</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2"></div>
                    <span><strong className="text-white">Validate Security Investments:</strong> Verify your security controls actually work against real-world attacks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2"></div>
                    <span><strong className="text-white">Prioritize Remediation:</strong> Understand which vulnerabilities pose the greatest risk and fix them first</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2"></div>
                    <span><strong className="text-white">Avoid Costly Breaches:</strong> The average data breach costs $4.45M—far more than penetration testing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2"></div>
                    <span><strong className="text-white">Build Customer Trust:</strong> Demonstrate security commitment to clients, partners, and investors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2"></div>
                    <span><strong className="text-white">Meet Due Diligence:</strong> Essential for M&A, funding rounds, and enterprise sales</span>
                  </li>
                </ul>
              </div>

              <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-amber-300 mb-3">⚠️ Did You Know?</h3>
                <p className="text-slate-300">
                  60% of small businesses that suffer a cyber attack go out of business within 6 months. 
                  Penetration testing helps you find and fix vulnerabilities before attackers exploit them.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6">
            Schedule Penetration Test - $150
          </Button>
          <p className="text-slate-400 mt-4">5-day comprehensive testing • Detailed report with proof-of-concept • Remediation guidance</p>
        </div>
      </div>

      <SageAI />
    </div>
  );
};

export default PenetrationTesting;