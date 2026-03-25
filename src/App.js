import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatBot from './components/ChatBot';
import LandingPage from './pages/LandingPage';
import SecurityPage from './pages/SecurityPage';
import DevelopmentPage from './pages/DevelopmentPage';
import TrainingPage from './pages/TrainingPage';
import ContactPage from './pages/ContactPage';
import BasicTraining from './pages/services/BasicTraining'
import AdvancedTraining from './pages/services/AdvancedTraining';
import IntermediateTraining from './pages/services/IntermediateTraining';
import AiSecurityAudit from './pages/services/AiSecurityAudit'; 
import VulnerabilityAssessment from './pages/services/VulnerabilityAssessment'; 
import PenetrationTesting from './pages/services/PenetrationTesting'; 
import RealTimeMonitoring from './pages/services/RealtimeMonitoring'; 
import SecurityConsultation from './pages/services/SecurityConsultation'; 
import ComplianceAudit from './pages/services/ComplianceAudit';
import AndroidDevelopment from './pages/services/AndroidDevelopment';
import IosDevelopment from './pages/services/IosDevelopment';
import CrossPlatformDevelopment from './pages/services/CrossPlatformDevelopment';
import WebDevelopment from './pages/services/WebDevelopment';
import BlogDetailPage from './pages/BlogDetailPage';
import BlogPage from './pages/BlogPage';
import FAQPage from './pages/FAQPage';
import AdminDashboard from './pages/AdminDashboard';
import AboutPage from './pages/AboutPage';

// Import Dashboard Components
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardHome from './pages/dashboard/DashboardHome';
import MyServices from './pages/dashboard/MyServices';
import Reports from './pages/dashboard/Reports';
import Billing from './pages/dashboard/Billing';
import Settings from './pages/dashboard/Settings';
import DemoReport from './pages/dashboard/DemoReport';

// Import Auth Components
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Onboarding from './pages/auth/Onboarding';

// Import Super Admin View
import SuperAdminDashboard from './pages/superadmin/SuperAdminDashboard';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 flex flex-col">
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="/development" element={<DevelopmentPage />} />
            <Route path="/training" element={<TrainingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/services/BasicTraining" element={<BasicTraining />} />
            <Route path="/services/IntermediateTraining" element={<IntermediateTraining />} />
            <Route path="/services/AdvancedTraining" element={<AdvancedTraining />} />
            <Route path ="/services/AiSecurityAudit" element={<AiSecurityAudit/>}/>             
            <Route path ="/services/PenetrationTesting" element={<PenetrationTesting/>}/>           
            <Route path ="/services/RealtimeMonitoring" element={<RealTimeMonitoring/>}/>           
            <Route path ="/services/SecurityConsultation" element={<SecurityConsultation/>}/>            
            <Route path ="/services/ComplianceAudit" element={<ComplianceAudit/>}/>
            <Route path ="/services/AndroidDevelopment" element={<AndroidDevelopment/>}/>
            <Route path ="/services/IosDevelopment" element={<IosDevelopment/>}/>
            <Route path ="/services/CrossPlatformDevelopment" element={<CrossPlatformDevelopment/>}/>
            <Route path ="/services/WebDevelopment" element={<WebDevelopment/>}/>
            <Route path ="/services/VulnerabilityAssessment" element={<VulnerabilityAssessment/>}/>
            <Route path ="/admin" element={<AdminDashboard/>}/>
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogDetailPage />} />
            <Route path="/FAQ" element={<FAQPage />} />
            <Route path="/about" element={<AboutPage />} />

            {/* Client Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="services" element={<MyServices />} />
              <Route path="reports" element={<Reports />} />
              <Route path="billing" element={<Billing />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* Standalone Fullscreen Report */}
            <Route path="/demo-report" element={<DemoReport />} />

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/onboarding" element={<Onboarding />} />
            
            {/* Super Admin Route */}
            <Route path="/superuseruk" element={<SuperAdminDashboard />} />
            
          </Routes>
        </main>
        <ChatBot />
      </div>
    </Router>
  );
}
export default App;