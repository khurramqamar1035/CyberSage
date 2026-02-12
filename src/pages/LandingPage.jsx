import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Code, GraduationCap, Info } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

const LandingPage = () => {
  const navigate = useNavigate();
  const [aboutOpen, setAboutOpen] = useState(false);

  const services = [
    {
      id: "security",
      icon: Shield,
      title: "Cyber Security",
      description:
        "Protect your digital assets with AI-powered security solutions",
      path: "/security",
    },
    {
      id: "development",
      icon: Code,
      title: "Development",
      description:
        "Build secure and scalable applications with expert guidance",
      path: "/development",
    },
    {
      id: "training",
      icon: GraduationCap,
      title: "Training",
      description: "Master cybersecurity skills with comprehensive courses",
      path: "/training",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-x-hidden">
      {/* Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src="https://customer-assets.emergentagent.com/job_83508210-49e2-4693-89fb-e881ef07bca3/artifacts/0n25qd68_Gemini_Generated_Image_jkwstijkwstijkws-removebg-preview.png"
            alt="CyberSage Logo"
            className="w-24 h-24 sm:w-28 sm:h-28 object-contain"
          />
        </div>

        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-4">
            Welcome to CyberSage
          </h1>
          <p className="text-slate-400 text-base sm:text-lg">
            Your Digital Guardian — Choose Your Path
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Card
                key={service.id}
                onClick={() => navigate(service.path)}
                className="bg-slate-900/60 border border-slate-700 hover:border-amber-500/50 transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer p-2"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-amber-400" />
                  </div>

                  <CardTitle className="text-white text-lg sm:text-xl">
                    {service.title}
                  </CardTitle>

                  <CardDescription className="text-slate-400 text-sm leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <Button
                    variant="ghost"
                    className="w-full text-amber-400 hover:bg-white/10"
                  >
                    Explore Services
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* About Section */}
        <div className="mt-12 flex justify-center">
          <Button
            variant="outline"
            className="bg-slate-900/50 border-slate-700 text-white hover:bg-slate-800 hover:border-amber-500/50"
            onClick={() => navigate("/about")} // <-- Redirect to your About Us page
          >
            <Info className="w-4 h-4 mr-2" />
            About Us
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
