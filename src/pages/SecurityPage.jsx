import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  Search,
  Lock,
  Zap,
  Users,
  FileCheck,
  Mail,
  MessageSquare,
  Menu,
  X,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import SageAI from "../components/SageAI";

const SecurityPage = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false); // close menu on click
  };

  const securityServices = [
    {
      icon: Search,
      title: "AI Security Audit",
      description:
        "Comprehensive AI-powered security assessment of your digital infrastructure",
      price: "$20",
      delivery: "24 hours",
      features: [
        "Automated vulnerability scanning",
        "AI-powered threat detection",
        "Detailed security report",
      ],
      link: "/services/AiSecurityAudit",
    },
    {
      icon: Shield,
      title: "Vulnerability Assessment",
      description:
        "Deep dive analysis to identify security weaknesses in your systems",
      price: "$50",
      delivery: "48 hours",
      features: ["Manual security testing", "Code review", "Network analysis"],
      link: "/services/VulnerabilityAssessment",
    },
    {
      icon: Lock,
      title: "Penetration Testing",
      description:
        "Ethical hacking to identify and exploit security vulnerabilities",
      price: "$150",
      delivery: "5 days",
      features: [
        "Full penetration testing",
        "Exploit demonstration",
        "Remediation guidance",
      ],
      link: "/services/PenetrationTesting",
    },
    {
      icon: Zap,
      title: "Real-time Monitoring",
      description:
        "24/7 threat detection and alerting system for your infrastructure",
      price: "$99/mo",
      delivery: "Instant setup",
      features: ["24/7 monitoring", "Instant alerts", "Monthly reports"],
      link: "/services/RealtimeMonitoring",
    },
    {
      icon: Users,
      title: "Security Consultation",
      description: "Expert guidance tailored to your specific security needs",
      price: "$75",
      delivery: "Flexible",
      features: [
        "One-on-one consultation",
        "Custom security strategy",
        "Implementation support",
      ],
      link: "/services/SecurityConsultation",
    },
    {
      icon: FileCheck,
      title: "Compliance Audit",
      description: "Ensure your systems meet industry regulatory requirements",
      price: "$200",
      delivery: "7 days",
      features: [
        "GDPR/HIPAA compliance",
        "Documentation review",
        "Compliance roadmap",
      ],
      link: "/services/ComplianceAudit",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO, TechStart Inc",
      text: "CyberSage identified critical vulnerabilities we never knew existed. Their AI-powered approach saved us weeks of manual testing.",
    },
    {
      name: "Michael Roberts",
      role: "Founder, SecureApp",
      text: "The threat report was incredibly detailed yet easy to understand. Implementation was straightforward with their clear recommendations.",
    },
    {
      name: "Emily Watson",
      role: "Product Manager, CloudSafe",
      text: "Enterprise-grade security at a fraction of the cost. CyberSage gave us peace of mind without breaking our budget.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <img
                src="https://customer-assets.emergentagent.com/job_83508210-49e2-4693-89fb-e881ef07bca3/artifacts/0n25qd68_Gemini_Generated_Image_jkwstijkwstijkws-removebg-preview.png"
                alt="CyberSage"
                className="w-10 h-10 object-contain"
              />
              <h1 className="text-xl font-bold text-white">CyberSage</h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => scrollToSection("services")}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Testimonials
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Contact
              </button>
              <button
                onClick={() => navigate("/blog")}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Blog
              </button>
              <button
                onClick={() => navigate("/faq")}
                className="text-gray-300 hover:text-white transition-colors"
              >
                FAQ
              </button>
              <button
                onClick={() => navigate("/about")}
                className="text-gray-300 hover:text-white transition-colors"
              >
                About
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-300 hover:text-white"
              >
                {menuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? "max-h-96 py-2" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-2 px-4 bg-gray-900 border-t border-gray-800">
            <button
              onClick={() => scrollToSection("services")}
              className="text-gray-300 hover:text-white text-left w-full"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-gray-300 hover:text-white text-left w-full"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-gray-300 hover:text-white text-left w-full"
            >
              Contact
            </button>
            <button
              onClick={() => navigate("/blog")}
              className="text-gray-300 hover:text-white text-left w-full"
            >
              Blog
            </button>
            <button
              onClick={() => navigate("/faq")}
              className="text-gray-300 hover:text-white text-left w-full"
            >
              FAQ
            </button>
            <button
              onClick={() => navigate("/about")}
              className="text-gray-300 hover:text-white text-left w-full"
            >
              About
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6 mx-auto">
            <Shield className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-400 font-medium">
              CYBER SECURITY SERVICES
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Protecting Your Digital Assets
          </h1>
          <p className="text-base sm:text-lg text-gray-400 mx-auto">
            AI-powered cybersecurity solutions for startups, small businesses,
            and freelancers. Fast, actionable, and accessible.
          </p>
        </div>
      </div>

      {/* Services */}
      <div id="services" className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-8">
            Our Security Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card
                  key={index}
                  className="bg-slate-900/60 border-slate-700 hover:border-blue-500/50 cursor-pointer"
                  onClick={() => navigate(service.link)}
                >
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="flex items-start justify-between mb-2 flex-wrap">
                      <CardTitle className="text-lg sm:text-xl text-white">
                        {service.title}
                      </CardTitle>
                      <span className="text-blue-400 font-bold">
                        {service.price}
                      </span>
                    </div>
                    <CardDescription className="text-slate-400 text-sm">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1 mb-3">
                      {service.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-xs sm:text-sm text-slate-300"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                      <span>Delivery: {service.delivery}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div id="testimonials" className="py-12 px-4 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-8">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Card key={i} className="bg-gray-900/50 border-gray-800">
                <CardContent className="pt-6">
                  <p className="text-gray-300 mb-4 italic text-sm sm:text-base">
                    "{t.text}"
                  </p>
                  <div>
                    <p className="font-semibold text-white text-sm sm:text-base">
                      {t.name}
                    </p>
                    <p className="text-gray-400 text-xs sm:text-sm">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Contact */}
      <div id="contact" className="py-12 px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Secure Your Assets?
          </h2>
          <p className="text-base sm:text-lg text-gray-400 mb-6">
            Get in touch with our security experts today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="border-gray-700 text-white hover:bg-gray-800 w-full sm:w-auto"
              onClick={() =>
                window.open(
                  "https://mail.google.com/mail/?view=cm&fs=1&to=peeyushk2198@gmail.com",
                  "_blank"
                )
              }
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              cybersageuk@gmail.com
            </Button>
            {/* <Button
              variant="outline"
              className="w-full sm:w-auto border-gray-700 text-white hover:bg-gray-800 flex items-center justify-center"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Schedule Consultation
            </Button> */}
          </div>
        </div>
      </div>

      <SageAI />
    </div>
  );
};

export default SecurityPage;
