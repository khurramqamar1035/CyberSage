import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Shield, Loader2, CheckCircle2, XCircle } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-[#06080A] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-[#0B0F19] border border-[#1C212E] rounded-2xl p-8 shadow-2xl text-center">
        <Shield className="w-12 h-12 text-blue-500 mb-6 mx-auto" strokeWidth={1.5} />

        {status === 'loading' && (
          <>
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Verifying your email...</h2>
            <p className="text-slate-400 text-sm">Please wait a moment.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Email Verified!</h2>
            <p className="text-slate-400 text-sm">{message}</p>
            <p className="text-slate-500 text-xs mt-3">Redirecting to login in 3 seconds...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className="w-10 h-10 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Verification Failed</h2>
            <p className="text-slate-400 text-sm">{message}</p>
            <button
              onClick={() => navigate('/signup')}
              className="mt-6 w-full h-12 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-all"
            >
              Back to Signup
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;