import React, { useState } from "react";
import { Mail, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    enquiry: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitContactForm = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert("✅ Enquiry sent!");
        setFormData({ firstName: "", lastName: "", email: "", phone: "", enquiry: "" });
      } else {
        alert("❌ Failed to send enquiry, missing fields or server error");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Failed to send enquiry");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Header */}
      <section className="relative py-20 px-4 md:py-32">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-slate-400">Have questions? Our team is here to help.</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Email Card */}
            <div>
              <Card className="bg-slate-900/60 border-slate-700">
                <CardContent className="pt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Mail className="w-6 h-6 text-amber-400" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-2 sm:mb-0">Email</h3>
                    <Button
                      className="border-gray-700 text-white hover:bg-gray-800 w-full sm:w-auto flex items-center justify-center gap-2"
                      onClick={() =>
                        window.open(
                          "https://mail.google.com/mail/?view=cm&fs=1&to=contact@cybersage.ai",
                          "_blank"
                        )
                      }
                    >
                      <MessageSquare className="w-4 h-4" />
                      contact@cybersage.ai
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="bg-slate-900/60 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Send Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={submitContactForm} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        placeholder="First Name"
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded text-white"
                      />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        placeholder="Last Name"
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded text-white"
                      />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Email"
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded text-white"
                    />
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone (optional)"
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded text-white"
                    />
                    <textarea
                      name="enquiry"
                      value={formData.enquiry}
                      onChange={handleChange}
                      required
                      rows="5"
                      placeholder="Your enquiry..."
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded text-white resize-none"
                    />
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
                    >
                      {isSubmitting ? "Sending..." : "Send"}
                    </Button>
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
