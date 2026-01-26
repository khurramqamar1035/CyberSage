import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for reaching out! We will contact you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      <section className="relative py-20 px-4 md:py-32">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-slate-400">Have questions? Our team is here to help.</p>
        </div>
      </section>

      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <Card className="bg-slate-900/60 border-slate-700">
                <CardContent className="pt-6 flex items-start gap-4">
                  <Mail className="w-6 h-6 text-amber-400" />
                  <div>
                    <h3 className="font-semibold text-white">Email</h3>
                    <a href="mailto:contact@cybersage.ai" className="text-amber-400">contact@cybersage.ai</a>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="bg-slate-900/60 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Send Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Name" className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded text-white" />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Email" className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded text-white" />
                    <input type="text" name="subject" value={formData.subject} onChange={handleChange} required placeholder="Subject" className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded text-white" />
                    <textarea name="message" value={formData.message} onChange={handleChange} required rows="5" placeholder="Message" className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded text-white resize-none" />
                    <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white">Send</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
