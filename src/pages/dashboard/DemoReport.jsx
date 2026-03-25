import React from 'react';
import { ShieldCheck, Server, AlertTriangle, CheckCircle, FileText, Download, ArrowLeft } from 'lucide-react';

const DemoReport = () => {
  return (
    <div className="min-h-screen bg-[#06080A] text-slate-300 font-sans p-8 md:p-16 selection:bg-red-500/30">
      
      {/* Header Controls */}
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-8">
        <button 
          onClick={() => window.close()}
          className="text-slate-400 hover:text-white flex items-center transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </button>
        <button 
          onClick={() => window.print()}
          className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center text-sm font-bold shadow-lg shadow-red-900/20 transition-all uppercase tracking-wider"
        >
          <Download className="w-4 h-4 mr-2" /> Save PDF
        </button>
      </div>

      {/* Report Document Shell */}
      <div className="max-w-4xl mx-auto bg-[#0B0F19] border border-[#1C212E] shadow-2xl rounded-2xl overflow-hidden print:bg-white print:text-black print:border-none print:shadow-none">
        
        {/* Report Header */}
        <div className="bg-[#13192B] p-10 border-b border-[#1C212E] print:bg-slate-100 print:border-slate-300">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="w-10 h-10 text-red-500 print:text-red-700" />
                <h1 className="text-3xl font-black text-white tracking-tight print:text-slate-900">CyberSage AI</h1>
              </div>
              <h2 className="text-2xl font-bold text-slate-200 mt-2 print:text-slate-800">Automated Security Audit Report</h2>
              <p className="text-slate-400 mt-1 font-mono text-sm print:text-slate-600">ID: REP-CS-2026-89A1B</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-400 font-bold uppercase tracking-wider print:text-slate-500">Prepared For</p>
              <p className="text-xl font-bold text-white print:text-slate-900">Stark Industry</p>
              <p className="text-slate-500 text-sm mt-1 print:text-slate-600">Date: October 24, 2026</p>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="p-10 space-y-10">
          <section>
            <h3 className="text-xl font-bold text-white border-b border-[#1C212E] pb-2 mb-4 flex items-center gap-2 print:text-slate-900 print:border-slate-300">
              <FileText className="w-5 h-5 text-blue-500" /> Executive Summary
            </h3>
            <p className="text-slate-300 leading-relaxed print:text-slate-700">
              The CyberSage AI diagnostic engine performed a comprehensive external and internal vulnerability sweep of the Stark Industry infrastructure perimeter. The overall security posture is evaluated as <strong className="text-emerald-400 print:text-emerald-700">STRONG</strong>, achieving a proprietary resilience score of 82/100. However, three medium-severity vectors were identified in legacy subdomains and require immediate patching to prevent theoretical exfiltration.
            </p>
          </section>

          {/* Quick Stats Grid */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <div className="bg-[#13192B] p-4 rounded-xl border border-[#1C212E] print:bg-slate-50 print:border-slate-200">
               <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Endpoints Scanned</p>
               <p className="text-2xl font-black text-white mt-1 print:text-slate-900">1,048</p>
             </div>
             <div className="bg-[#13192B] p-4 rounded-xl border border-[#1C212E] print:bg-slate-50 print:border-slate-200">
               <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Critical Threats</p>
               <p className="text-2xl font-black text-emerald-400 mt-1 print:text-emerald-700">0</p>
             </div>
             <div className="bg-[#13192B] p-4 rounded-xl border border-[#1C212E] print:bg-slate-50 print:border-slate-200">
               <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">High Vectors</p>
               <p className="text-2xl font-black text-amber-500 mt-1 print:text-amber-600">3</p>
             </div>
             <div className="bg-[#13192B] p-4 rounded-xl border border-[#1C212E] print:bg-slate-50 print:border-slate-200">
               <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Resilience Score</p>
               <p className="text-2xl font-black text-blue-400 mt-1 print:text-blue-700">82/100</p>
             </div>
          </section>

          {/* Detailed Findings */}
          <section>
            <h3 className="text-xl font-bold text-white border-b border-[#1C212E] pb-2 mb-6 flex items-center gap-2 print:text-slate-900 print:border-slate-300">
              <Server className="w-5 h-5 text-red-500" /> Key Vulnerability Findings
            </h3>
            
            <div className="space-y-4">
              {/* Threat 1 */}
              <div className="bg-[#13192B] border border-amber-500/30 p-5 rounded-xl flex items-start print:bg-amber-50 print:border-amber-200">
                <AlertTriangle className="w-6 h-6 text-amber-500 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-bold text-amber-400 print:text-amber-700">Outdated OpenSSL Implementation on Gateway 4</h4>
                  <p className="text-sm text-slate-400 mt-1 print:text-slate-700">Identified OpenSSL 1.1.1 on `<span className="font-mono text-xs bg-slate-800 px-1 rounded print:bg-slate-200">eu-gateway-04.stark.com</span>`. This version is susceptible to specific padding oracle attacks under heavy load conditions.</p>
                  <div className="mt-3 p-3 bg-[#0B0F19] rounded-lg border border-[#1C212E] print:bg-white print:border-slate-200">
                    <p className="text-xs font-bold text-white uppercase tracking-wider mb-1 print:text-slate-800">AI Recommendation:</p>
                    <p className="text-sm text-emerald-400 print:text-emerald-700">Upgrade OpenSSL packages to 3.0.x series immediately via automated patch management.</p>
                  </div>
                </div>
              </div>

              {/* Threat 2 */}
              <div className="bg-[#13192B] border border-amber-500/30 p-5 rounded-xl flex items-start print:bg-amber-50 print:border-amber-200">
                <AlertTriangle className="w-6 h-6 text-amber-500 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-bold text-amber-400 print:text-amber-700">Exposed RDP Port on Legacy Staging Server</h4>
                  <p className="text-sm text-slate-400 mt-1 print:text-slate-700">Port 3389 is globally accessible on IP `192.168.x.x` mapped to an old QA environment. Brute-force telemetry detected 45 failed login attempts in the last 24 hours.</p>
                  <div className="mt-3 p-3 bg-[#0B0F19] rounded-lg border border-[#1C212E] print:bg-white print:border-slate-200">
                    <p className="text-xs font-bold text-white uppercase tracking-wider mb-1 print:text-slate-800">AI Recommendation:</p>
                    <p className="text-sm text-emerald-400 print:text-emerald-700">Enforce strict Security Group rules restricting Port 3389 exclusively to Corporate VPN IP ranges.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Compliance */}
          <section>
             <h3 className="text-xl font-bold text-white border-b border-[#1C212E] pb-2 mb-4 flex items-center gap-2 print:text-slate-900 print:border-slate-300">
              <CheckCircle className="w-5 h-5 text-emerald-500" /> Compliance Status
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="flex items-center gap-3 p-3 bg-[#13192B] rounded-lg border border-[#1C212E] print:bg-slate-50 print:border-slate-200">
                 <CheckCircle className="w-5 h-5 text-emerald-500" />
                 <span className="font-medium text-slate-200 print:text-slate-800">GDPR Data Processing Validation</span>
               </div>
               <div className="flex items-center gap-3 p-3 bg-[#13192B] rounded-lg border border-[#1C212E] print:bg-slate-50 print:border-slate-200">
                 <CheckCircle className="w-5 h-5 text-emerald-500" />
                 <span className="font-medium text-slate-200 print:text-slate-800">ISO 27001 Control Framework Alignment</span>
               </div>
               <div className="flex items-center gap-3 p-3 bg-[#13192B] rounded-lg border border-[#1C212E] print:bg-slate-50 print:border-slate-200">
                 <CheckCircle className="w-5 h-5 text-emerald-500" />
                 <span className="font-medium text-slate-200 print:text-slate-800">SOC 2 Type II Telemetry</span>
               </div>
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="bg-[#06080A] p-6 text-center border-t border-[#1C212E] print:bg-white print:border-slate-200">
          <p className="text-xs text-slate-500 print:text-slate-400">Generated automatically by CyberSage AI Core v4.2. Strictly Confidential.</p>
          <p className="text-xs font-mono text-slate-600 mt-1 print:text-slate-300">HASH: 9A8B7C6D5E4F3G2H1I0J</p>
        </div>

      </div>
    </div>
  );
};

export default DemoReport;
