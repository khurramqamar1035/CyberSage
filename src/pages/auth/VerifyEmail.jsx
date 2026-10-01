import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthShell from '../../components/site/AuthShell';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const url = `${BACKEND_URL}/api/auth/verify-email/${token}`;
        const res = await fetch(url);

        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          await res.text();
          throw new Error('Unexpected server response');
        }

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Verification failed');

        setStatus('success');
        setMessage(data.message || 'Email verified successfully!');

        setTimeout(() => navigate('/login'), 3000);
      } catch (err) {
        setStatus('error');
        setMessage(err.message || 'Verification failed. Link may have expired.');
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setStatus('error');
      setMessage('No verification token found in the URL.');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const heading = status === 'loading' ? 'Verifying your email…' : status === 'success' ? 'Email verified.' : 'Verification failed.';
  return (
    <AuthShell word="VERIFY" title="Email verification" intro="Confirming the link we sent to your inbox.">
      <div role="status" aria-live="polite">
        <h2 className="m-0 t-wide font-[250] text-[30px] leading-[1.05] tracking-[-0.03em]">{heading}</h2>
        <p className="m-0 mt-4 text-[16px] leading-relaxed text-[#3E4555]">{status === 'loading' ? 'Please wait a moment.' : message}</p>
        {status === 'success' && <p className="m-0 mt-3 text-[14px] text-[#5B6575]">Taking you to sign in shortly.</p>}
        {status === 'error' && (
          <button type="button" onClick={() => navigate('/signup')} className="cs-btn cs-btn-primary mt-8">Back to sign up</button>
        )}
      </div>
    </AuthShell>
  );
};

export default VerifyEmail;