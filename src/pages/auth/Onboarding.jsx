import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthShell from '../../components/site/AuthShell';
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
        const res = await fetch(`${BACKEND_URL}/api/services`);
        if (!res.ok) throw new Error('Failed to fetch services');
        const data = await res.json();

        setAvailableServices(data);

        // Auto-select default services
        const defaults = data
          .filter(service => service.defaultSelected)
          .map(service => service._id);

        setSelected(defaults);
      } catch {
        // silently fail — services grid stays empty
      }
    };

    fetchServices();
  }, []);

  // Toggle service selection
  const toggleService = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Handle final account creation
  const handleCreateAccount = async () => {
    const signupData = JSON.parse(localStorage.getItem('signupData'));

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

    setIsLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to create account');

      alert('Account created successfully! Please check your email to verify.');

      // Cleanup localStorage
      localStorage.removeItem('signupData');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('companyName');

      navigate('/login');
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell wide word="SERVICES" title={`Welcome, ${userName}.`} intro="Choose the services you want to activate. You can change this later.">
      <h2 className="m-0 t-wide font-[250] text-[30px] leading-[1.05] tracking-[-0.03em]">Select services</h2>
      <ul className="m-0 mt-8 p-0 list-none border-t border-[#07090D]">
        {availableServices.map((service) => {
          const isSelected = selected.includes(service._id);
          return (
            <li key={service._id}>
              <button type="button" role="checkbox" aria-checked={isSelected} onClick={() => toggleService(service._id)}
                className={`w-full grid grid-cols-[28px_minmax(0,1fr)] gap-4 items-start text-left py-5 px-1 border-b border-[rgba(7,9,13,0.14)] bg-transparent transition-colors ${isSelected ? 'bg-[#EEF3FE]' : 'hover:bg-white'}`}>
                <span aria-hidden="true" className={`mt-0.5 w-5 h-5 border flex items-center justify-center ${isSelected ? 'bg-[#2563EB] border-[#2563EB]' : 'border-[rgba(7,9,13,0.35)] bg-white'}`}>
                  {isSelected && <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2.5 6.2l2.2 2.2 4.8-5" fill="none" stroke="#fff" strokeWidth="1.8" /></svg>}
                </span>
                <span>
                  <span className="block text-[17px] font-medium">{service.name}</span>
                  {service.description && <span className="block mt-1 text-[14px] leading-relaxed text-[#3E4555]">{service.description}</span>}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="m-0 text-[15px] text-[#3E4555]"><span className="font-medium text-[#07090D]">{selected.length}</span> selected</p>
        <button type="button" onClick={handleCreateAccount} disabled={selected.length === 0 || isLoading} className="cs-btn cs-btn-primary justify-center disabled:opacity-50 disabled:cursor-not-allowed">
          {isLoading ? 'Creating account…' : 'Create account'}
        </button>
      </div>
    </AuthShell>
  );
};

export default Onboarding;