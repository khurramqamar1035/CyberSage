import React, { useEffect, useState } from 'react';
import { FileText, Download, ChevronDown, ChevronUp, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedReport, setExpandedReport] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/api/reports`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch reports');
        setReports(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleDownload = async (pdfUrl, title, reportId) => {
    try {
      setDownloadingId(reportId);
      const response = await fetch(pdfUrl);
      if (!response.ok) throw new Error('Failed to fetch PDF');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      // Fallback — open in new tab
      window.open(pdfUrl, '_blank');
    } finally {
      setDownloadingId(null);
    }
  };

  const totalReports = reports.length;
  const lowRiskCount = reports.filter(r => r.riskLevel === 'Low').length;
  const needsAttentionCount = reports.filter(r => r.riskLevel === 'Medium' || r.riskLevel === 'High').length;

  const getRiskBadgeClass = (risk) => {
    switch (risk) {
      case 'High': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'Medium': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      default: return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
    }
  };

  const toggleExpand = (id) => {
    setExpandedReport(expandedReport === id ? null : id);
  };

  if (isLoading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-red-400">{error}</p>
    </div>
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-2">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 tracking-tight">Reports</h1>
          <p className="text-slate-400 mt-1">View and download your security assessment reports</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#13192B] border border-[#1C212E] p-6 rounded-xl flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-slate-400 mb-1">Total Reports</p>
            <h3 className="text-4xl font-bold text-blue-500">{totalReports}</h3>
          </div>
          <FileText className="w-8 h-8 text-blue-500" />
        </div>
        <div className="bg-[#13192B] border border-[#1C212E] p-6 rounded-xl flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-slate-400 mb-1">Low Risk</p>
            <h3 className="text-4xl font-bold text-emerald-500">{lowRiskCount}</h3>
          </div>
          <CheckCircle className="w-8 h-8 text-emerald-500" />
        </div>
        <div className="bg-[#13192B] border border-[#1C212E] p-6 rounded-xl flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-slate-400 mb-1">Needs Attention</p>
            <h3 className="text-4xl font-bold text-amber-500">{needsAttentionCount}</h3>
          </div>
          <AlertCircle className="w-8 h-8 text-amber-500" />
        </div>
      </div>

      {/* Reports List */}
      {reports.length === 0 ? (
        <div className="bg-[#0B0F19] border border-[#1C212E] rounded-2xl p-16 text-center">
          <FileText className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-400 mb-2">No Reports Yet</h3>
          <p className="text-slate-600 text-sm">
            Reports will appear here once your services have been completed.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {reports.map((report) => (
            <div
              key={report._id}
              className="bg-[#0B0F19] border border-[#1C212E] rounded-xl overflow-hidden transition-all duration-300"
            >
              <div className="p-6 pb-2">

                {/* Report Header */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-xl">
                      <FileText className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-100">{report.title}</h3>
                      <p className="text-sm text-slate-500 mt-0.5">{report.date}</p>
                      {report.service?.name && (
                        <p className="text-xs text-blue-400 mt-0.5">{report.service.name}</p>
                      )}
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-semibold border self-start ${getRiskBadgeClass(report.riskLevel)}`}>
                    {report.riskLevel} Risk
                  </span>
                </div>

                {/* Executive Summary */}
                <div className="bg-[#13192B] border border-[#1C212E] rounded-xl p-5 mb-5 mt-2">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Executive Summary
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {report.executiveSummary}
                  </p>
                </div>

                {/* Download Button */}
                <div className="mb-4">
                  {report.pdfUrl ? (
                    <button
                      onClick={() => handleDownload(report.pdfUrl, report.title, report._id)}
                      disabled={downloadingId === report._id}
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors shadow-lg"
                    >
                      {downloadingId === report._id ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Downloading...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          Download PDF
                        </>
                      )}
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-700 text-slate-400 text-sm font-medium rounded-lg cursor-not-allowed">
                      <Download className="w-4 h-4" />
                      PDF Not Available
                    </span>
                  )}
                </div>

                {/* Expand Toggle */}
                {report.details?.length > 0 && (
                  <button
                    onClick={() => toggleExpand(report._id)}
                    className="w-full flex items-center justify-between py-4 text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors border-t border-[#1C212E] mt-4"
                  >
                    <span>View Detailed Findings ({report.details.length})</span>
                    {expandedReport === report._id
                      ? <ChevronUp className="w-5 h-5" />
                      : <ChevronDown className="w-5 h-5" />
                    }
                  </button>
                )}
              </div>

              {/* Expandable Details */}
              {expandedReport === report._id && (
                <div className="px-6 pb-6 pt-0 bg-[#0B0F19]">
                  <h4 className="text-sm font-semibold text-slate-300 mb-3 mt-4">
                    Key Findings & Recommendations
                  </h4>
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
      )}
    </div>
  );
};

export default Reports;