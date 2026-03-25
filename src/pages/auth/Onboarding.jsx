import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Code, Server, Search, CheckCircle2, Loader2 } from 'lucide-react';

const Onboarding = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'there';
  const [isLoading, setIsLoading] = useState(false);

  const availableServices = [
    { id: 'sec-audit', name: 'AI Security Audit', desc: 'Comprehensive review of AI models and infrastructure.', icon: Shield, defaultSelected: true },
    { id: 'pentest', name: 'Penetration Testing', desc: 'Simulated cyber attacks targeting your network.', icon: Search, defaultSelected: true },
    { id: 'soc', name: '24/7 SOC Monitoring', desc: 'Round-the-clock defense and real-time alerts.', icon: Server, defaultSelected: true },
    { id: 'dev-secure', name: 'Secure Development', desc: 'Integrating security into your SDLC pipeline.', icon: Code, defaultSelected: false }
  ];

  const [selected, setSelected] = useState(
    availableServices.filter(s => s.defaultSelected).map(s => s.id)
  );

  const toggleService = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(item => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleContinue = () => {
    setIsLoading(true);

    setTimeout(() => {
      // Map selected IDs back to mock structured data for the dashboard
      const selectedData = availableServices
        .filter(s => selected.includes(s.id))
        .map(s => ({
          id: s.id,
          name: s.name,
          risk: 'Pending Validation', // Default mock state for new services
          status: 'Pending'
        }));

      localStorage.setItem('selectedServices', JSON.stringify(selectedData));
      
      // Route to billing to complete purchase flow
      navigate('/dashboard/billing');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#06080A] flex flex-col justify-center items-center p-4 py-12">
      <div className="w-full max-w-3xl">
        
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            Welcome, {userName}!
          </h1>
          <p className="text-slate-400 text-lg">
            Let's customize your CyberSage experience. Select the services you want to activate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {availableServices.map((service) => {
            const isSelected = selected.includes(service.id);
            return (
              <div 
                key={service.id}
                onClick={() => toggleService(service.id)}
                className={`relative p-6 rounded-2xl border cursor-pointer transition-all duration-200 ${
                  isSelected 
                  ? 'bg-blue-600/10 border-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.15)]' 
                  : 'bg-[#13192B] border-[#2A3441] hover:border-slate-500'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${isSelected ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-800 text-slate-400'}`}>
                    <service.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-bold mb-1 ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                      {service.name}
                    </h3>
                    <p className="text-sm text-slate-400">
                      {service.desc}
                    </p>
                  </div>
                </div>

                {isSelected && (
                  <div className="absolute top-4 right-4 text-blue-500">
                    <CheckCircle2 className="w-6 h-6 fill-blue-500/20" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between border-t border-[#1C212E] pt-6">
          <p className="text-slate-400 text-sm">
            You have selected <span className="font-bold text-white">{selected.length}</span> services.
          </p>
          <button 
            onClick={handleContinue}
            disabled={selected.length === 0 || isLoading}
            className="w-48 h-12 flex justify-center items-center bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-blue-500/25"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Continue to Billing"
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Onboarding;
