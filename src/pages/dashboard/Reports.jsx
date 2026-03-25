import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Download, ChevronDown, ChevronUp, CheckCircle, AlertCircle } from 'lucide-react';

const Reports = () => {
  const [expandedReport, setExpandedReport] = useState(null);

  // Mock Data
  const reports = [
    {
      id: "REP-2024-10-A",
      serviceName: "AI Security Audit",
      date: "October 24, 2024",
      riskLevel: "Low", // Low, Medium, High
      executiveSummary: "The AI Security Audit revealed a generally strong security posture. Model endpoints are properly authenticated and rate-limited. Two minor findings regarding data handling in cache were identified and remediated during the audit window.",
      details: [
        "Endpoint authentication verified across all exported AI services.",
        "Rate limiting correctly applied to prevent abuse.",
        "Minor finding: Temporary data retention in redis cache exceeded policy by 2 hours.",
        "Recommendation: Implement strict TTL on all intermediate processing caches."
      ]
    },
    {
      id: "REP-2024-09-V",
      serviceName: "Vulnerability Assessment",
      date: "September 15, 2024",
      riskLevel: "Medium",
      executiveSummary: "Assessment of the core web infrastructure identified 12 actionable items. 1 High, 4 Medium, and 7 Low severity issues. The critical finding involved an outdated dependency in the payment processing microservice which has since been patched.",
      details: [
        "High: Outdated library in 'payment-service' susceptible to CVE-2023-XXXX.",
        "Medium: Insecure headers (missing HSTS) on staging environments.",
        "Medium: Verbose error pages exposing stack traces on internal endpoints.",
        "Low: SSL certificate expiring in 30 days."
      ]
    },
    {
      id: "REP-2025-01-P",
      serviceName: "AI-Powered Penetration Testing",
      date: "Generated on 2 Jan 2025",
      riskLevel: "Low",
      executiveSummary: "The penetration test revealed a well-secured infrastructure with only minor vulnerabilities detected. All critical systems passed security validation. Three low-severity issues were identified and recommendations have been provided.",
      details: [
        "Minor finding: Temporary data retention in redis cache exceeded policy by 2 hours.",
        "Low: SSL certificate expiring in 30 days.",
        "Low: Missing HSTS headers on non-critical subdomain."
      ]
    }
  ];

  const stats = [
    { label: "Total Reports", value: "3", icon: FileText, color: "text-blue-500", bgColor: "bg-[#13192B]" },
    { label: "Low Risk", value: "2", icon: CheckCircle, color: "text-emerald-500", bgColor: "bg-[#13192B]" },
    { label: "Needs Attention", value: "1", icon: AlertCircle, color: "text-amber-500", bgColor: "bg-[#13192B]" }
  ];

  const getRiskIcon = (risk) => {
    return <FileText className="w-6 h-6 text-blue-500" />;
  };

  const getRiskBadgeClass = (risk) => {
    switch (risk) {
      case 'High':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'Medium':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'Low':
      default:
        return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
    }
  };

  const riskLevelToLabel = (risk) => {
    switch (risk) {
      case 'High':
        return 'High Risk';
      case 'Medium':
        return 'Medium Risk';
      case 'Low':
      default:
        return 'Low Risk';
    }
  };


  const toggleExpand = (id) => {
    if (expandedReport === id) {
      setExpandedReport(null);
    } else {
      setExpandedReport(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-2">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 tracking-tight">Reports</h1>
          <p className="text-slate-400 mt-1">View and download your security assessment reports</p>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-[#13192B] border border-[#1C212E] p-6 rounded-xl flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">{stat.label}</p>
              <h3 className={`text-4xl font-bold ${stat.color === 'text-slate-400' ? 'text-slate-100' : stat.color}`}>
                {stat.value}
              </h3>
            </div>
            <stat.icon className={`w-8 h-8 ${stat.color}`} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {reports.map((report) => (
          <div key={report.id} className="bg-[#0B0F19] border border-[#1C212E] rounded-xl overflow-hidden transition-all duration-300">
            {/* Card Header & Summary */}
            <div className="p-6 pb-2">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-500/10 rounded-xl">
                    {getRiskIcon(report.riskLevel)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-100">{report.serviceName}</h3>
                    <p className="text-sm text-slate-500 mt-0.5">{report.date}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 self-start mt-2 md:mt-0">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-semibold border ${getRiskBadgeClass(report.riskLevel)}`}>
                    {riskLevelToLabel(report.riskLevel)}
                  </span>
                </div>
              </div>

              <div className="bg-[#13192B] border border-[#1C212E] rounded-xl p-5 mb-5 mt-2">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Executive Summary</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {report.executiveSummary}
                </p>
              </div>

              <div className="mb-4">
                <Link 
                  to="/demo-report" 
                  target="_blank" 
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </Link>
              </div>

              {/* Expand Toggle */}
              <button 
                onClick={() => toggleExpand(report.id)}
                className="w-full flex items-center justify-between py-4 text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors border-t border-[#1C212E] mt-4"
              >
                <span>View Detailed Findings ({report.details.length})</span>
                {expandedReport === report.id ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Expandable Details Section */}
            {expandedReport === report.id && (
              <div className="px-6 pb-6 pt-0 bg-[#0B0F19]">
                <h4 className="text-sm font-semibold text-slate-300 mb-3 mt-4">Key Findings & Recommendations</h4>
                <ul className="space-y-2">
                  {report.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-slate-400">
                      <div className="mt-1 flex-shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      </div>
                      <span className="leading-relaxed">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
