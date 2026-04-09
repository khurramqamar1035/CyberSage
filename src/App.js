import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Public layout (new Protope 2 design nav + footer)
import PublicLayout from './components/PublicLayout';

// Public pages
import LandingPage from './pages/LandingPage';
import SecurityPage from './pages/SecurityPage';
import DevelopmentPage from './pages/DevelopmentPage';
import TrainingPage from './pages/TrainingPage';
import CoreTeamPage from './pages/CoreTeamPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import FAQPage from './pages/FAQPage';
import AboutPage from './pages/AboutPage';

// Security sub-pages
import AiSecurityAudit from './pages/services/AiSecurityAudit';
import VulnerabilityAssessment from './pages/services/VulnerabilityAssessment';
import PenetrationTesting from './pages/services/PenetrationTesting';
import RealTimeMonitoring from './pages/services/RealtimeMonitoring';
import SecurityConsultation from './pages/services/SecurityConsultation';
import ComplianceAudit from './pages/services/ComplianceAudit';

// Development sub-pages
import WebDevelopment from './pages/services/WebDevelopment';
import AndroidDevelopment from './pages/services/AndroidDevelopment';
import IosDevelopment from './pages/services/IosDevelopment';
import CrossPlatformDevelopment from './pages/services/CrossPlatformDevelopment';

// Training sub-pages
import BasicTraining from './pages/services/BasicTraining';
import IntermediateTraining from './pages/services/IntermediateTraining';
import AdvancedTraining from './pages/services/AdvancedTraining';
import InternshipPage from './pages/InternshipPage';

// Dashboard
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardHome from './pages/dashboard/DashboardHome';
import MyServices from './pages/dashboard/MyServices';
import Reports from './pages/dashboard/Reports';
import Billing from './pages/dashboard/Billing';
import Settings from './pages/dashboard/Settings';
import DemoReport from './pages/dashboard/DemoReport';

// Auth
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Onboarding from './pages/auth/Onboarding';
import VerifyEmail from './pages/auth/VerifyEmail';

// Admin
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminCompanies from './pages/admin/AdminCompanies';
import AdminCompanyDetail from './pages/admin/AdminCompanyDetail';
import AdminBlogs from './pages/admin/AdminBlogs';
import AdminFAQs from './pages/admin/AdminFAQs';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminClients from './pages/admin/AdminClients';
import AdminInterns from './pages/admin/AdminInterns';
import SuperAdminDashboard from './pages/superadmin/SuperAdminDashboard';

import ChatBot from './components/ChatBot';

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');
  if (!token || adminUser.role !== 'admin') {
    return <Navigate to="/admink" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* ── Public Routes (Protope 2 design with PublicLayout nav + footer) ── */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<LandingPage />} />

          {/* Security */}
          <Route path="security-services" element={<SecurityPage />} />
          <Route path="security-services/ai-audit" element={<AiSecurityAudit />} />
          <Route path="security-services/vulnerability-assessment" element={<VulnerabilityAssessment />} />
          <Route path="security-services/penetration-testing" element={<PenetrationTesting />} />
          <Route path="security-services/real-time-monitoring" element={<RealTimeMonitoring />} />
          <Route path="security-services/security-consultation" element={<SecurityConsultation />} />
          <Route path="security-services/compliance-audit" element={<ComplianceAudit />} />

          {/* Development */}
          <Route path="development-services" element={<DevelopmentPage />} />
          <Route path="development-services/web" element={<WebDevelopment />} />
          <Route path="development-services/android" element={<AndroidDevelopment />} />
          <Route path="development-services/ios" element={<IosDevelopment />} />
          <Route path="development-services/cross-platform" element={<CrossPlatformDevelopment />} />

          {/* Training */}
          <Route path="training" element={<TrainingPage />} />
          <Route path="training/beginner" element={<BasicTraining />} />
          <Route path="training/intermediate" element={<IntermediateTraining />} />
          <Route path="training/advanced" element={<AdvancedTraining />} />
          <Route path="training/internship" element={<InternshipPage />} />

          {/* Other public pages */}
          <Route path="core-team" element={<CoreTeamPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogDetailPage />} />
          <Route path="FAQ" element={<FAQPage />} />
          <Route path="about" element={<AboutPage />} />

          {/* Legacy redirect shims (keeps old links working) */}
          <Route path="security" element={<Navigate to="/security-services" replace />} />
          <Route path="development" element={<Navigate to="/development-services" replace />} />
          <Route path="services/AiSecurityAudit" element={<Navigate to="/security-services/ai-audit" replace />} />
          <Route path="services/VulnerabilityAssessment" element={<Navigate to="/security-services/vulnerability-assessment" replace />} />
          <Route path="services/PenetrationTesting" element={<Navigate to="/security-services/penetration-testing" replace />} />
          <Route path="services/RealtimeMonitoring" element={<Navigate to="/security-services/real-time-monitoring" replace />} />
          <Route path="services/SecurityConsultation" element={<Navigate to="/security-services/security-consultation" replace />} />
          <Route path="services/ComplianceAudit" element={<Navigate to="/security-services/compliance-audit" replace />} />
          <Route path="services/AndroidDevelopment" element={<Navigate to="/development-services/android" replace />} />
          <Route path="services/IosDevelopment" element={<Navigate to="/development-services/ios" replace />} />
          <Route path="services/CrossPlatformDevelopment" element={<Navigate to="/development-services/cross-platform" replace />} />
          <Route path="services/WebDevelopment" element={<Navigate to="/development-services/web" replace />} />
          <Route path="services/BasicTraining" element={<Navigate to="/training/beginner" replace />} />
          <Route path="services/IntermediateTraining" element={<Navigate to="/training/intermediate" replace />} />
          <Route path="services/AdvancedTraining" element={<Navigate to="/training/advanced" replace />} />
        </Route>

        {/* ── Client Dashboard ── */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="services" element={<MyServices />} />
          <Route path="reports" element={<Reports />} />
          <Route path="billing" element={<Billing />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* ── Standalone / Auth ── */}
        <Route path="/demo-report" element={<DemoReport />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />

        {/* ── Admin ── */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/superuseruk" element={<SuperAdminDashboard />} />
        <Route path="/admink" element={<AdminLogin />} />
        <Route path="/admink/*" element={<AdminRoute><AdminLayout /></AdminRoute>}>
          <Route path="companies" element={<AdminCompanies />} />
          <Route path="companies/:userId" element={<AdminCompanyDetail />} />
          <Route path="blogs" element={<AdminBlogs />} />
          <Route path="faqs" element={<AdminFAQs />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="clients" element={<AdminClients />} />
          <Route path="interns" element={<AdminInterns />} />
        </Route>
      </Routes>

      <ChatBot />
    </Router>
  );
}

export default App;
