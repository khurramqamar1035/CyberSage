import React from 'react';
import { CreditCard, CheckCircle, Download } from 'lucide-react';

const Billing = () => {
  // Mock Data
 /* const activeSubscription = {
    plan: "Enterprise Security Retainer",
    status: "Active",
    price: "£2499",
    interval: "monthly",
    nextBillingDate: "1 Feb 2025",
    cardLast4: "4242",
    brand: "Visa"
  };*/

  const paymentHistory = [
    {
      id: "INV_001",
      description: "Enterprise Plan - January 2025",
      date: "1 Jan 2025",
      amount: "£2,499",
      status: "paid",
      invoiceUrl: "#"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-2">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 tracking-tight">Billing</h1>
          <p className="text-slate-400 mt-1">Manage your subscriptions and billing history</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Current Plan Section */}
        <div className="bg-[#13192B] border border-[#1C212E] rounded-xl p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-100 mb-1">Current Plan</h2>
              <p className="text-sm text-slate-400">Your subscription details</p>
            </div>
            <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              Active
            </span>
          </div>

          <div className="bg-[#1C253C] border border-[#2A3441] rounded-xl overflow-hidden mb-6 relative">
            {/* Subtle Gradient background matching design */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent pointer-events-none"></div>
            
            <div className="p-6 relative">
              <div className="flex justify-between items-center border-b border-[#2A3441] pb-6 mb-6">
                <h3 className="text-2xl font-bold text-slate-100">Enterprise</h3>
                <div className="text-right">
                  <span className="text-2xl font-bold text-slate-100">£2499</span>
                  <span className="text-sm text-slate-400">/monthly</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <div>
                  <p className="text-slate-500 mb-1">Started</p>
                  <p className="text-slate-300">15 Jun 2024</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-500 mb-1">Next Billing</p>
                  <p className="text-slate-300">1 Feb 2025</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button className="flex-1 py-3 px-4 bg-transparent border border-[#2A3441] text-slate-200 hover:bg-[#1C253C] text-sm font-medium rounded-lg transition-colors">
              Change Plan
            </button>
            <button className="flex-1 py-3 px-4 bg-transparent border border-red-500/30 text-red-400 hover:bg-red-500/10 text-sm font-medium rounded-lg transition-colors">
              Cancel Subscription
            </button>
          </div>
        </div>

        {/* Payment Method Section */}
        <div className="bg-[#13192B] border border-[#1C212E] rounded-xl p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-100 mb-1">Payment Method</h2>
            <p className="text-sm text-slate-400">Your saved payment details</p>
          </div>

          {/* Interactive Credit Card UI */}
          <div className="w-full max-w-sm mx-auto aspect-[1.586/1] rounded-2xl p-6 relative overflow-hidden bg-gradient-to-br from-[#2A3441] to-[#0B0F19] border border-[#2A3441] shadow-2xl mb-6">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
            
            <div className="relative h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="w-12 h-9 bg-yellow-600 rounded flex items-center justify-center opacity-80 overflow-hidden">
                  <div className="w-full h-px bg-yellow-700 absolute top-1/2 -translate-y-1/2"></div>
                  <div className="w-px h-full bg-yellow-700 absolute left-1/2 -translate-x-1/2"></div>
                </div>
                <div className="text-xl italic font-bold text-slate-200 opacity-80">Visa</div>
              </div>

              <div>
                <div className="text-xl tracking-[0.2em] font-mono text-slate-200 mb-4">
                  •••• •••• •••• 4242
                </div>
                <div className="flex justify-between text-xs text-slate-400 font-mono uppercase tracking-wider">
                  <div>
                    <span className="block opacity-60 text-[10px] mb-1">Expires</span>
                    12/2027
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <button className="w-full py-3 px-4 bg-transparent border border-[#2A3441] text-slate-200 hover:bg-[#1C253C] text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
            <CreditCard className="w-4 h-4" />
            Update Payment Method
          </button>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-[#13192B] border border-[#1C212E] rounded-xl p-6 mt-6">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-slate-100 mb-1">Invoice History</h2>
          <p className="text-sm text-slate-400">Your past payments and invoices</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="border-b border-[#1C212E] text-xs text-slate-500 font-normal">
              <tr>
                <th scope="col" className="pb-4 font-normal">Invoice</th>
                <th scope="col" className="pb-4 font-normal">Date</th>
                <th scope="col" className="pb-4 font-normal">Amount</th>
                <th scope="col" className="pb-4 font-normal">Status</th>
                <th scope="col" className="pb-4 text-right font-normal">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1C212E]">
              {paymentHistory.map((payment) => (
                <tr key={payment.id} className="hover:bg-[#1C253C]/50 transition-colors">
                  <td className="py-5 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-200">{payment.id}</span>
                      <span className="text-xs text-slate-500 mt-1">{payment.description}</span>
                    </div>
                  </td>
                  <td className="py-5 whitespace-nowrap text-slate-300">{payment.date}</td>
                  <td className="py-5 whitespace-nowrap font-medium text-slate-200">{payment.amount}</td>
                  <td className="py-5 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      <CheckCircle className="w-3.5 h-3.5" />
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-5 whitespace-nowrap text-right">
                    <a href={payment.invoiceUrl} className="inline-flex items-center gap-1.5 text-blue-500 hover:text-blue-400 transition-colors text-xs font-semibold drop-shadow-lg">
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Billing;
