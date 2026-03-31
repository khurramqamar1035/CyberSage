import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Code, Server, Search, CheckCircle2, Loader2 } from 'lucide-react';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Onboarding = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'there';

  const [availableServices, setAvailableServices] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch services from backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        console.log('[ONBOARDING] Fetching services from backend...');
        const res = await fetch(`${BACKEND_URL}api/services`);
        if (!res.ok) throw new Error('Failed to fetch services');
        const data = await res.json();

        console.log('[ONBOARDING] Services fetched:', data);
        setAvailableServices(data);

        // Auto-select default services
        const defaults = data
          .filter(service => service.defaultSelected)
          .map(service => service._id);

        console.log('[ONBOARDING] Default selected IDs:', defaults);
        setSelected(defaults);
      } catch (err) {
        console.error('[ONBOARDING] Error fetching services:', err);
      }
    };

    fetchServices();
  }, []);

  // Toggle service selection
  const toggleService = (id) => {
    setSelected(prev => {
      const updated = prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id];
      console.log('[ONBOARDING] Selected services updated:', updated);
      return updated;
    });
  };

  // Handle final account creation
  const handleCreateAccount = async () => {
    const signupData = JSON.parse(localStorage.getItem('signupData'));

    console.log('[ONBOARDING] signupData from localStorage:', signupData);
    console.log('[ONBOARDING] Selected service IDs:', selected);

    if (!signupData) {
      alert('Signup data missing. Please fill the signup form again.');
      navigate('/signup');
      return;
    }

    if (selected.length === 0) {
      alert('Please select at least one service.');
      return;
    }

    const payload = {
      ...signupData,
      services: selected,
    };

    console.log('[ONBOARDING] Final payload being sent to backend:', {
      ...payload,
      password: payload.password ? `[PROVIDED - ${payload.password.length} chars]` : '[MISSING]',
    });

    setIsLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('[ONBOARDING] Backend response status:', response.status);
      console.log('[ONBOARDING] Backend response data:', data);

      if (!response.ok) throw new Error(data.message || 'Failed to create account');

      alert('Account created successfully! Please check your email to verify.');

      // Cleanup localStorage
      localStorage.removeItem('signupData');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('companyName');

      console.log('[ONBOARDING] localStorage cleared, redirecting to login...');
      navigate('/login');
    } catch (err) {
      console.error('[ONBOARDING] Account creation error:', err.message);
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const iconMap = {
    1: Shield,
    2: Search,
    3: Server,
    4: Code,
  };

  return (
    <div className="min-h-screen bg-[#06080A] flex flex-col justify-center items-center p-4 py-12">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            Welcome, {userName}!
          </h1>
          <p className="text-slate-400 text-lg">
            Let's customize your CyberSage experience. Select the services you want to activate.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {availableServices.map((service) => {
            const isSelected = selected.includes(service._id);
            const Icon = iconMap[service.serviceId] || Shield;

            return (
              <div
                key={service._id}
                onClick={() => toggleService(service._id)}
                className={`relative p-6 rounded-2xl border cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'bg-blue-600/10 border-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.15)]'
                    : 'bg-[#13192B] border-[#2A3441] hover:border-slate-500'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${isSelected ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-800 text-slate-400'}`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="flex-1">
                    <h3 className={`text-lg font-bold mb-1 ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                      {service.name}
                    </h3>
                    <p className="text-sm text-slate-400">{service.description}</p>
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

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-[#1C212E] pt-6">
          <p className="text-slate-400 text-sm">
            You have selected <span className="font-bold text-white">{selected.length}</span> services.
          </p>

          <button
            onClick={handleCreateAccount}
            disabled={selected.length === 0 || isLoading}
            className="w-48 h-12 flex justify-center items-center bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-blue-500/25"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;