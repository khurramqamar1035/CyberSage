import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthShell, { FIELD, LABEL } from '../../components/site/AuthShell';

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

  // Clear stale localStorage on every signup page load
  useEffect(() => {
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

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
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

    setTimeout(() => {
      setIsLoading(false);
      navigate('/onboarding');
    }, 500);
  };

  return (
    <AuthShell word="ACCESS" title="Create an account" intro="Set up access to the CyberSage client portal for your organisation."
      footer={<>Already have an account? <Link to="/login" className="cs-link font-medium">Sign in</Link></>}>
      <h2 className="m-0 t-wide font-[250] text-[30px] leading-[1.05] tracking-[-0.03em]">Your details</h2>
      <form onSubmit={handleSignup} className="mt-8 flex flex-col gap-5">
        {error && <p role="alert" className="m-0 text-[14px] text-[#C93C40] border-l-2 border-[#C93C40] pl-3">{error}</p>}
        <div>
          <label htmlFor="su-name" className={LABEL}>Full name</label>
          <input id="su-name" type="text" name="name" value={formData.name} onChange={handleChange} autoComplete="name" className={FIELD} />
        </div>
        <div>
          <label htmlFor="su-company" className={LABEL}>Company name</label>
          <input id="su-company" type="text" name="companyName" value={formData.companyName} onChange={handleChange} autoComplete="organization" className={FIELD} />
        </div>
        <div>
          <label htmlFor="su-email" className={LABEL}>Work email</label>
          <input id="su-email" type="email" name="email" value={formData.email} onChange={handleChange} autoComplete="email" className={FIELD} />
        </div>
        <div>
          <label htmlFor="su-pass" className={LABEL}>Password <span className="text-[#5B6575] font-normal">(at least 6 characters)</span></label>
          <input id="su-pass" type="password" name="password" value={formData.password} onChange={handleChange} autoComplete="new-password" className={FIELD} />
        </div>
        <button type="submit" disabled={isLoading} className="cs-btn cs-btn-primary w-full justify-center mt-2 disabled:opacity-60 disabled:cursor-not-allowed">
          {isLoading ? 'Continuing…' : 'Sign up and continue'}
        </button>
      </form>
    </AuthShell>
  );
};

export default Signup;