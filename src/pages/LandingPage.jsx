import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/Button";
import { GlassCard } from "../components/GlassCard";

const BACKEND_URL = process.env.REACT_APP_API_URL || process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';

const SERVICES = [
  {
    id: "security",
    icon: "shield_lock",
    iconColor: "text-primary",
    linkColor: "text-primary",
    linkHover: "hover:text-tertiary",
    title: "Security Services",
    description:
      "Deployment of deep-packet offensive auditing and proactive threat mitigation. Our engineers secure your perimeter against advanced persistent threats with millisecond response precision.",
    path: "/security-services",
  },
  {
    id: "development",
    icon: "terminal",
    iconColor: "text-tertiary",
    linkColor: "text-tertiary",
    linkHover: "hover:text-primary",
    title: "Development Services",
    description:
      "Engineering hyper-scalable digital infrastructure with security-first architecture. We build resilient applications that thrive in hostile network environments through rigorous code hardening.",
    path: "/development-services",
  },
  {
    id: "training",
    icon: "school",
    iconColor: "text-secondary",
    linkColor: "text-secondary",
    linkHover: "hover:text-primary",
    title: "Training Academy",
    description:
      "Specialized immersion programs for elite cyber-defense personnel. Transform your internal IT teams into a formidable first-line defense through our sovereign sentry curriculum.",
    path: "/training",
  },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [testimonials, setTestimonials] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Prefetch all endpoints
    fetch(`${BACKEND_URL}/api/about/team`).catch(() => {});
    fetch(`${BACKEND_URL}/api/about/offices`).catch(() => {});
    fetch(`${BACKEND_URL}/api/testimonials`).catch(() => {});
    fetch(`${BACKEND_URL}/api/clients`).catch(() => {});

    // Fetch and set testimonials
    fetch(`${BACKEND_URL}/api/testimonials`)
      .then((res) => res.json())
      .then((data) => setTestimonials(Array.isArray(data) ? data : []))
      .catch(() => {});

    // Fetch and set clients
    fetch(`${BACKEND_URL}/api/clients`)
      .then((res) => res.json())
      .then((data) => setClients(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative min-h-[819px] flex items-center justify-center overflow-hidden px-8">
        <div className="absolute inset-0 hero-gradient" />

        <div className="relative z-10 max-w-5xl text-center flex flex-col items-center">
          <img
            src="/logo.png"
            alt="CyberSage Protocol"
            className="w-56 md:w-80 h-auto mb-10 drop-shadow-[0_0_30px_rgba(255,255,255,0.15)] opacity-95"
          />

          <p className="font-label uppercase tracking-[0.3em] text-secondary text-xs mb-6">
            Established Protocol 2024
          </p>

          <h1 className="font-headline font-black text-6xl md:text-8xl tracking-tighter leading-none mb-8 text-on-surface">
            Unyielding <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary">
              Digital Authority.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-on-surface-variant text-lg md:text-xl font-light leading-relaxed mb-12">
            Architecting sovereign defense perimeters for global enterprises. We
            transform vulnerability into strategic dominance through elite
            intelligence and defensive innovation.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Button variant="primary" onClick={() => navigate("/security-services")}>
              Initiate Protocol
            </Button>
            <Button variant="secondary" onClick={() => navigate("/core-team")}>
              View Intelligence Reports
            </Button>
          </div>
        </div>

        {/* Ambient glows */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-secondary/5 rounded-full blur-[120px]" />
      </section>

      {/* ── Services Grid ── */}
      <section className="py-24 px-8 max-w-[1440px] mx-auto">
        <div className="mb-16">
          <h2 className="font-headline text-4xl font-bold tracking-tight mb-2 text-on-surface">
            Core Competencies
          </h2>
          <div className="h-1 w-20 bg-primary" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <Link
              key={service.id}
              to={service.path}
              className="group block no-underline"
            >
              <GlassCard className="flex flex-col h-full">
                <div className="mb-8">
                  <span
                    className={`material-symbols-outlined text-4xl ${service.iconColor}`}
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {service.icon}
                  </span>
                </div>

                <h3 className="font-headline text-2xl font-bold mb-4 text-on-surface">
                  {service.title}
                </h3>

                <p className="text-on-surface-variant font-light mb-8 flex-grow leading-relaxed">
                  {service.description}
                </p>

                <div
                  className={`flex items-center gap-2 font-label text-[10px] uppercase tracking-[0.15em] ${service.linkColor} ${service.linkHover} transition-colors`}
                >
                  Learn More{" "}
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Origin / About Section ── */}
      <section className="py-32 px-8 bg-surface-container-low overflow-hidden">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-square w-full max-w-lg bg-surface-container-highest overflow-hidden rounded-sm relative z-10">
              <img
                alt="Minimalist server room with blue ambient lighting"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuChfg-CdjjDpS1V3Svxlir1JeTLMiHW3_hSB04KZupS0bfaHH6j2JbNo6XBqaGQHUBqVJXMxF6HZb_RRAbRntT0LSogZyyQdiDG22jTcr3wHD1Byq5cDcZxAJrwMZ4YQ9fNulESpaFM4210qwWz199Zee8_4IrykD95rJh82mqsl7n5tQICal_O0s_icHMHHvwgip69B-RuotebJYrQDXblW_QnPd7CIzsvYwiWAAXGWtSYSfjvhCNDjUjfNETILm6bM5kBWoMuNuY"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 w-full h-full border border-primary/20 -z-10 translate-x-4 translate-y-4" />
          </div>

          {/* Text */}
          <div className="flex flex-col gap-8">
            <span className="font-label text-secondary uppercase tracking-[0.2em] text-[10px]">
              The Cybersage Origin
            </span>
            <h2 className="font-headline text-5xl font-black tracking-tighter leading-tight text-on-surface">
              Built From The Void Up.
            </h2>
            <p className="text-on-surface-variant text-lg font-light leading-relaxed">
              Founded by a collective of security researchers and sovereign
              developers, Cybersage was born from a singular mission: to restore
              digital autonomy to organizations operating in an era of
              unprecedented cyber fragility.
            </p>
            <p className="text-on-surface-variant text-lg font-light leading-relaxed">
              We don't just patch systems; we rebuild the philosophy of
              protection. Our story is written in the code of the world's most
              secure perimeters, defined by a relentless pursuit of technical
              perfection and unyielding integrity.
            </p>
            <div className="pt-8">
              <Button variant="secondary" onClick={() => navigate("/core-team")}>
                Meet The Core Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Clients & Partners Section ── */}
      {clients.length > 0 && (
        <section className="py-24 px-8 max-w-[1440px] mx-auto">
          <div className="mb-16">
            <span className="font-label text-secondary uppercase tracking-[0.2em] text-[10px] block mb-2">
              Trusted By
            </span>
            <h2 className="font-headline text-4xl font-bold tracking-tight text-on-surface">
              Our Clients & Partners
            </h2>
            <div className="h-1 w-20 bg-secondary mt-4" />
          </div>

          <div className="overflow-x-auto pb-4">
            <div className="flex gap-6 min-w-min">
              {clients.map((client, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-56 h-32 bg-surface-container-low border border-primary/10 rounded-md p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                >
                  {client.logo ? (
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <p className="text-on-surface font-headline text-xl font-bold text-center">
                      {client.name}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Testimonials Section ── */}
      {testimonials.length > 0 && (
        <section className="py-24 px-8 bg-surface-container-low">
          <div className="max-w-[1440px] mx-auto">
            <div className="mb-16">
              <span className="font-label text-secondary uppercase tracking-[0.2em] text-[10px] block mb-2">
                Client Testimonials
              </span>
              <h2 className="font-headline text-4xl font-bold tracking-tight text-on-surface">
                What Our Clients Say
              </h2>
              <div className="h-1 w-20 bg-tertiary mt-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, idx) => (
                <GlassCard key={idx} className="flex flex-col h-full">
                  {/* Star Rating */}
                  {testimonial.rating && (
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`material-symbols-outlined text-lg ${
                            i < testimonial.rating
                              ? "text-primary"
                              : "text-on-surface-variant/30"
                          }`}
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Quote */}
                  <p className="text-on-surface-variant font-light text-lg leading-relaxed mb-8 flex-grow">
                    "{testimonial.content}"
                  </p>

                  {/* Author Info */}
                  <div className="border-t border-primary/10 pt-6">
                    <p className="font-headline font-bold text-on-surface mb-1">
                      {testimonial.name}
                    </p>
                    <p className="text-on-surface-variant text-sm font-light">
                      {testimonial.role}
                      {testimonial.company && `, ${testimonial.company}`}
                    </p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default LandingPage;
