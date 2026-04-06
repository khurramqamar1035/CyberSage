import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Bot } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [chatLocked, setChatLocked] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    enquiry: '',
  });
  const [formSubmitting, setFormSubmitting] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading || chatLocked) return;

    const userMsg = { role: 'user', content: inputValue.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg], questionCount }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
      if (data.limitReached) {
        setChatLocked(true);
      } else {
        setQuestionCount((prev) => prev + 1);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '⚠️ Something went wrong. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const submitContactForm = async () => {
    const { firstName, lastName, email, enquiry } = formData;
    if (!firstName || !lastName || !email || !enquiry) {
      alert('Please fill in all required fields.');
      return;
    }
    setFormSubmitting(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert('✅ Enquiry sent! Our team will get back to you soon.');
        setShowForm(false);
        setFormData({ firstName: '', lastName: '', email: '', phone: '', enquiry: '' });
      } else {
        alert('❌ Failed to send enquiry. Please try again.');
      }
    } catch {
      alert('❌ Failed to send enquiry. Please try again.');
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating toggle button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-cyan-600 hover:bg-cyan-500 rounded-full text-white flex items-center justify-center shadow-2xl transition-all hover:scale-105 active:scale-95"
          aria-label="Open chat"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="w-96 h-[540px] bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 bg-cyan-700 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2 text-white">
              <Bot size={18} />
              <span className="font-semibold text-sm">CyberSage AI</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Welcome message */}
          {messages.length === 0 && (
            <div className="px-4 pt-4 pb-2 flex-shrink-0">
              <div className="bg-slate-800 border border-cyan-500/20 rounded-xl p-3 text-slate-300 text-sm leading-relaxed">
                👋 Hi! I'm CyberSage AI. Ask me anything about our cybersecurity, development, or training services.
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-cyan-600 text-white rounded-br-sm'
                      : 'bg-slate-800 text-slate-200 border border-cyan-500/20 rounded-bl-sm'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-cyan-400 text-sm">
                <Loader2 size={16} className="animate-spin" />
                <span>Thinking...</span>
              </div>
            )}

            {chatLocked && (
              <div className="text-center p-4 border border-cyan-500/30 rounded-xl bg-cyan-500/10">
                <p className="text-cyan-300 text-sm mb-3 font-medium">
                  🔒 Free AI limit reached
                </p>
                <p className="text-slate-400 text-xs mb-3">
                  Contact our team for further assistance.
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-cyan-600 hover:bg-cyan-500 px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors"
                >
                  Contact Us
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input bar */}
          <div className="px-3 py-3 border-t border-cyan-500/20 flex gap-2 flex-shrink-0">
            <input
              disabled={chatLocked || isLoading}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder={chatLocked ? 'Chat limit reached' : 'Ask about cybersecurity...'}
              className="flex-1 bg-slate-800 text-white text-sm px-3 py-2.5 rounded-xl border border-cyan-500/20 focus:outline-none focus:border-cyan-500/60 placeholder-slate-500 disabled:opacity-50"
            />
            <button
              disabled={chatLocked || isLoading || !inputValue.trim()}
              onClick={sendMessage}
              className="bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 p-2.5 rounded-xl text-white transition-colors"
              aria-label="Send"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Contact form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/20">
              <h2 className="text-white font-semibold">Contact CyberSage</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input
                  placeholder="First Name *"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-3 py-2.5 bg-slate-800 text-white text-sm border border-cyan-500/20 rounded-xl focus:outline-none focus:border-cyan-500/60 placeholder-slate-500"
                />
                <input
                  placeholder="Last Name *"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-3 py-2.5 bg-slate-800 text-white text-sm border border-cyan-500/20 rounded-xl focus:outline-none focus:border-cyan-500/60 placeholder-slate-500"
                />
              </div>
              <input
                type="email"
                placeholder="Email *"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2.5 bg-slate-800 text-white text-sm border border-cyan-500/20 rounded-xl focus:outline-none focus:border-cyan-500/60 placeholder-slate-500"
              />
              <input
                placeholder="Phone (optional)"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2.5 bg-slate-800 text-white text-sm border border-cyan-500/20 rounded-xl focus:outline-none focus:border-cyan-500/60 placeholder-slate-500"
              />
              <textarea
                placeholder="Your enquiry *"
                rows={4}
                value={formData.enquiry}
                onChange={(e) => setFormData({ ...formData, enquiry: e.target.value })}
                className="w-full px-3 py-2.5 bg-slate-800 text-white text-sm border border-cyan-500/20 rounded-xl focus:outline-none focus:border-cyan-500/60 placeholder-slate-500 resize-none"
              />
            </div>

            <div className="flex gap-3 px-6 pb-6">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 py-2.5 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitContactForm}
                disabled={formSubmitting}
                className="flex-1 py-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {formSubmitting && <Loader2 size={14} className="animate-spin" />}
                {formSubmitting ? 'Sending...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
