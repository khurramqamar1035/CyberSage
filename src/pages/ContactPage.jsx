import React, { useState } from "react";
import { PageHero, Guides } from "../components/site/ServiceTemplates";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const WRAP = "max-w-[1400px] mx-auto px-6 md:px-10";
const FIELD = "w-full bg-white border border-[rgba(7,9,13,0.25)] rounded-[1px] px-4 py-3 text-[15px] text-[#07090D] placeholder:text-[#8B95A5] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]";
const LABEL = "block text-[14px] font-medium mb-2";

const gmail = (to) => `https://mail.google.com/mail/?view=cm&fs=1&to=${to}`;

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    enquiry: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // { ok: boolean, text: string }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitContactForm = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);
    try {
      const res = await fetch(`${BACKEND_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus({ ok: true, text: "Thank you. Your enquiry has been sent and the team will reply by email." });
        setFormData({ firstName: "", lastName: "", email: "", phone: "", enquiry: "" });
      } else {
        setStatus({ ok: false, text: "We could not send your enquiry. Please check the required fields and try again." });
      }
    } catch {
      setStatus({ ok: false, text: "We could not send your enquiry. Please try again, or email us directly." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="cs-sans text-[#07090D]">
      <PageHero
        crumbs={[{ label: "CyberSage", to: "/" }, { label: "Contact" }]}
        word="CONTACT"
        title="Talk to the team."
        intro="Questions about a product, a service or a training course? Send us a message or email us directly."
      />

      <section className="relative s-paper overflow-hidden">
        <Guides />
        <div className={`${WRAP} relative py-16 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12`}>
          {/* Direct contacts */}
          <div className="lg:col-span-4 flex flex-col gap-10">
            <div>
              <h2 className="m-0 t-wide font-[250] text-[28px] md:text-[36px] leading-[1.05] tracking-[-0.03em]">Email</h2>
              <dl className="m-0 mt-6 border-t border-[#07090D]">
                <div className="py-4 border-b border-[rgba(7,9,13,0.14)]">
                  <dt className="cs-meta text-[#5B6575]">General enquiries</dt>
                  <dd className="m-0 mt-1.5"><a href={gmail("cybersageuk@gmail.com")} target="_blank" rel="noopener noreferrer" className="cs-link text-[17px]">cybersageuk@gmail.com</a></dd>
                </div>
              </dl>
            </div>

            <div>
              <h2 className="m-0 t-wide font-[250] text-[28px] md:text-[36px] leading-[1.05] tracking-[-0.03em]">Business enquiries</h2>
              <div className="mt-6 pt-6 border-t border-[#07090D] flex items-start gap-5">
                <img
                  src="/manish.jpg"
                  alt="Manish, Business Manager"
                  className="w-24 h-28 object-cover object-top shrink-0 bg-[#E6E9ED]"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
                <div className="min-w-0">
                  <div className="text-[18px] font-medium">Mr Manish</div>
                  <div className="text-[14px] text-[#5B6575]">Business Manager</div>
                  <p className="m-0 mt-2 text-[14px] text-[#3E4555]">Business and partnership enquiries</p>
                  <div className="mt-3 flex flex-col gap-1.5 text-[15px]">
                    <a href="tel:+918797670011" className="cs-link w-fit">+91 8797670011</a>
                    <a href={gmail("mkumar@cybersage.uk")} target="_blank" rel="noopener noreferrer" className="cs-link w-fit">mkumar@cybersage.uk</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 lg:col-start-6">
            <h2 className="m-0 t-wide font-[250] text-[28px] md:text-[36px] leading-[1.05] tracking-[-0.03em]">Send a message</h2>
            <form onSubmit={submitContactForm} className="mt-6 pt-6 border-t border-[#07090D] grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="c-first" className={LABEL}>First name</label>
                <input id="c-first" type="text" name="firstName" value={formData.firstName} onChange={handleChange} required autoComplete="given-name" className={FIELD} />
              </div>
              <div>
                <label htmlFor="c-last" className={LABEL}>Last name</label>
                <input id="c-last" type="text" name="lastName" value={formData.lastName} onChange={handleChange} required autoComplete="family-name" className={FIELD} />
              </div>
              <div>
                <label htmlFor="c-email" className={LABEL}>Email</label>
                <input id="c-email" type="email" name="email" value={formData.email} onChange={handleChange} required autoComplete="email" className={FIELD} />
              </div>
              <div>
                <label htmlFor="c-phone" className={LABEL}>Phone <span className="text-[#5B6575] font-normal">(optional)</span></label>
                <input id="c-phone" type="text" name="phone" value={formData.phone} onChange={handleChange} autoComplete="tel" className={FIELD} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="c-enquiry" className={LABEL}>Your enquiry</label>
                <textarea id="c-enquiry" name="enquiry" value={formData.enquiry} onChange={handleChange} required rows="6" className={`${FIELD} resize-y`} />
              </div>
              <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center gap-4">
                <button type="submit" disabled={isSubmitting} className="cs-btn cs-btn-primary w-full sm:w-auto justify-center disabled:opacity-60">
                  {isSubmitting ? "Sending…" : "Send enquiry"}
                </button>
                <p role="status" aria-live="polite" className={`m-0 text-[14px] ${status ? (status.ok ? "border-l-2 border-[#2563EB] pl-3 text-[#07090D]" : "text-[#C93C40]") : ""}`}>
                  {status ? status.text : ""}
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
