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
            
          </Routes>
        </main>
        <ChatBot />
      </div>
    </Router>
  );
}
export default App;