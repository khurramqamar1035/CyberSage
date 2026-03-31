import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, User, Building2, Mail, Lock, Loader2 } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Clear stale localStorage on every signup page load
  useEffect(() => {
    console.log('[SIGNUP] Clearing any stale localStorage data...');
    localStorage.removeItem('signupData');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('companyName');
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');

    console.log('[SIGNUP] Form submitted with:', {
      name: formData.name,
      companyName: formData.companyName,
      email: formData.email,
      password: formData.password ? `[PROVIDED - ${formData.password.length} chars]` : '[MISSING]',
    });

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      console.warn('[SIGNUP] Validation failed:', {
        name: !!formData.name,
        email: !!formData.email,
        password: !!formData.password,
      });
      setError('Please fill in all required fields.');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);

    // Save fresh data to localStorage
    localStorage.setItem('signupData', JSON.stringify(formData));
    localStorage.setItem('userName', formData.name);

    console.log('[SIGNUP] Saved to localStorage:', {
      signupData: formData,
      userName: formData.name,
    });

    // Verify it was saved correctly
    const saved = JSON.parse(localStorage.getItem('signupData'));
    console.log('[SIGNUP] Verified localStorage after save:', {
      name: saved?.name,
      companyName: saved?.companyName,
      email: saved?.email,
      password: saved?.password ? `[PROVIDED - ${saved.password.length} chars]` : '[MISSING]',
    });

    setTimeout(() => {
      setIsLoading(false);
      navigate('/onboarding');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#06080A] flex flex-col justify-center items-center p-4">
      <div className="mb-8 flex flex-col items-center">
        <Shield className="w-12 h-12 text-blue-500 mb-4" strokeWidth={1.5} />
        <h1 className="text-3xl font-bold text-white tracking-tight">Create an Account</h1>
        <p className="text-slate-400 mt-2 text-sm">Join CyberSage to secure your infrastructure</p>
      </div>

      <div className="w-full max-w-md bg-[#0B0F19] border border-[#1C212E] rounded-2xl p-8 shadow-2xl">
        <form onSubmit={handleSignup} className="space-y-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-lg text-center">
              {error}
            </div>
          )}

          {/* Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Full Name</label>
            <div className="relative">
              <User className="w-5 h-5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full bg-[#13192B] border border-[#2A3441] text-slate-200 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Company Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Company Name</label>
            <div className="relative">
              <Building2 className="w-5 h-5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                placeholder="Stark Industry"
                className="w-full bg-[#13192B] border border-[#2A3441] text-slate-200 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Work Email</label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="admin@stark.com"
                className="w-full bg-[#13192B] border border-[#2A3441] text-slate-200 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Password</label>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full bg-[#13192B] border border-[#2A3441] text-slate-200 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 flex justify-center items-center bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-blue-500/25"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Sign Up & Continue'
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:text-blue-400 font-medium transition-colors">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;