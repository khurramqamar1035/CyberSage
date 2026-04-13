import React, { useEffect, useState } from 'react';
import { CreditCard, CheckCircle, Download, Loader2, AlertCircle } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

// ------------------ Payment Form Component -----------------
const PaymentForm = ({ clientSecret, serviceName, amount, onSuccess, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage('');

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/dashboard/billing?success=true`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setIsProcessing(false);
    } else {
      onSuccess();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#0B0F19] border border-[#1C212E] rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <h3 className="text-xl font-bold text-white mb-1">Complete Payment</h3>
        <p className="text-slate-400 text-sm mb-2">{serviceName}</p>
        <p className="text-2xl font-bold text-blue-400 mb-6">£{amount}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-[#13192B] border border-[#2A3441] rounded-xl p-4">
            <PaymentElement />
          </div>

          {errorMessage && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {errorMessage}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 h-11 border border-[#2A3441] text-slate-400 hover:text-slate-200 font-medium rounded-lg transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing || !stripe}
              className="flex-1 h-11 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
              ) : (
                `Pay £${amount}`
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ------------------ Main Billing Component ------------------
const Billing = () => {
  const [billingData, setBillingData] = useState({ paid: [], unpaid: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [paymentSession, setPaymentSession] = useState(null); // { clientSecret, serviceName, amount }
  const [payingId, setPayingId] = useState(null);

  useEffect(() => {
    fetchBillingData();

    // Check if returning from Stripe redirect
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === 'true') {
      alert('Payment successful! Your service will be activated shortly.');
      window.history.replaceState({}, '', '/dashboard/billing');
    }
  }, []);

  const fetchBillingData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/billing`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch billing');
      setBillingData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePay = async (userService) => {
    try {
      setPayingId(userService._id);
      const token = localStorage.getItem('token');

      const endpoint = userService.paymentType === 'monthly'
        ? '/api/billing/create-subscription'
        : '/api/billing/create-payment-intent';

      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userServiceId: userService._id }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setPaymentSession({
        clientSecret: data.clientSecret,
        serviceName: data.serviceName,
        amount: data.amount,
      });
    } catch (err) {
      alert(err.message);
    } finally {
      setPayingId(null);
    }
  };

  const handleDownloadInvoice = (invoiceUrl) => {
    window.open(invoiceUrl, '_blank');
  };

  if (isLoading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-red-400">{error}</p>
    </div>
  );

  const { paid, unpaid } = billingData;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-2">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 tracking-tight">Billing</h1>
          <p className="text-slate-400 mt-1">Manage your subscriptions and billing history</p>
        </div>
      </div>

      {/* Unpaid Services */}
      {unpaid.length > 0 && (
        <div className="bg-[#0B0F19] border border-amber-500/20 rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl font-bold text-slate-100 mb-2">Pending Payments</h2>
          <p className="text-slate-500 text-sm mb-6">Complete payment to activate these services</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unpaid.map((us) => (
              <div key={us._id} className="bg-[#13192B] border border-amber-500/20 rounded-xl p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-slate-200">{us.service?.name}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{us.service?.description}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded border ${
                    us.paymentType === 'monthly'
                      ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                  }`}>
                    {us.paymentType === 'monthly' ? 'Monthly' : 'One-time'}
                  </span>
                </div>
                <p className="text-2xl font-bold text-amber-400 mb-4">
                  £{us.price}
                  {us.paymentType === 'monthly' && <span className="text-sm font-normal text-slate-500">/mo</span>}
                </p>
                <button
                  onClick={() => handlePay(us)}
                  disabled={payingId === us._id}
                  className="w-full h-10 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-semibold rounded-lg transition-all text-sm"
                >
                  {payingId === us._id ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Loading...</>
                  ) : (
                    <><CreditCard className="w-4 h-4" /> Pay Now</>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Invoice History */}
      <div className="bg-[#13192B] border border-[#1C212E] rounded-xl p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-100 mb-1">Invoice History</h2>
          <p className="text-sm text-slate-400">Your past payments and invoices</p>
        </div>

        {paid.length === 0 ? (
          <div className="text-center py-10">
            <CreditCard className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-500 text-sm">No payment history yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-400">
              <thead className="border-b border-[#1C212E] text-xs text-slate-500">
                <tr>
                  <th className="pb-4 font-normal">Service</th>
                  <th className="pb-4 font-normal">Type</th>
                  <th className="pb-4 font-normal">Date</th>
                  <th className="pb-4 font-normal">Amount</th>
                  <th className="pb-4 font-normal">Status</th>
                  <th className="pb-4 text-right font-normal">Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C212E]">
                {paid.map((us) => (
                  <tr key={us._id} className="hover:bg-[#1C253C]/50 transition-colors">
                    <td className="py-5 whitespace-nowrap">
                      <span className="font-bold text-slate-200">{us.service?.name}</span>
                    </td>
                    <td className="py-5 whitespace-nowrap">
                      <span className={`text-xs px-2 py-0.5 rounded border ${
                        us.paymentType === 'monthly'
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                          : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                      }`}>
                        {us.paymentType === 'monthly' ? 'Monthly' : 'One-time'}
                      </span>
                    </td>
                    <td className="py-5 whitespace-nowrap text-slate-300">
                      {us.invoiceDate
                        ? new Date(us.invoiceDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                        : 'N/A'}
                    </td>
                    <td className="py-5 whitespace-nowrap font-medium text-slate-200">
                      £{us.price}
                      {us.paymentType === 'monthly' && <span className="text-xs text-slate-500">/mo</span>}
                    </td>
                    <td className="py-5 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        <CheckCircle className="w-3.5 h-3.5" /> Paid
                      </span>
                    </td>
                    <td className="py-5 whitespace-nowrap text-right">
                      {us.invoiceUrl ? (
                        <button
                          onClick={() => handleDownloadInvoice(us.invoiceUrl)}
                          className="inline-flex items-center gap-1.5 text-blue-500 hover:text-blue-400 transition-colors text-xs font-semibold"
                        >
                          <Download className="w-3.5 h-3.5" /> Download
                        </button>
                      ) : (
                        <span className="text-slate-600 text-xs">N/A</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Stripe Payment Modal */}
      {paymentSession && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: paymentSession.clientSecret,
            appearance: {
              theme: 'night',
              variables: {
                colorPrimary: '#3b82f6',
                colorBackground: '#13192B',
                colorText: '#e2e8f0',
                colorDanger: '#ef4444',
                borderRadius: '8px',
              },
            },
          }}
        >
          <PaymentForm
            clientSecret={paymentSession.clientSecret}
            serviceName={paymentSession.serviceName}
            amount={paymentSession.amount}
            onSuccess={() => {
              setPaymentSession(null);
              fetchBillingData();
            }}
            onCancel={() => setPaymentSession(null)}
          />
        </Elements>
      )}
    </div>
  );
};

export default Billing;