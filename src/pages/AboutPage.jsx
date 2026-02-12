import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Badge } from "../components/ui/badge";
import { MapPin, Users, Building2, Menu, X } from "lucide-react";
import SageAI from "../components/SageAI";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AboutPage = () => {
  const navigate = useNavigate();

  const [teamMembers, setTeamMembers] = useState([]);
  const [offices, setOffices] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const [teamRes, officeRes] = await Promise.all([
          axios.get(`${BACKEND_URL}/api/about/team`),
          axios.get(`${BACKEND_URL}/api/about/offices`),
        ]);

        setTeamMembers(teamRes.data);
        setOffices(officeRes.data);
      } catch (err) {
        console.error("Failed to load about data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400">
        Loading About Page...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-x-hidden">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => {
              navigate("/");
              setMenuOpen(false);
            }}
            className="cursor-pointer"
          >
            <h1 className="text-lg sm:text-xl font-bold text-white">
              CyberSage
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-4 sm:gap-6 text-sm sm:text-base text-slate-300">
            <button
              onClick={() => navigate("/about")}
              className="text-amber-400"
            >
              About
            </button>
            <button
              onClick={() => navigate("/services")}
              className="hover:text-white transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => navigate("/team")}
              className="hover:text-white transition-colors"
            >
              Team
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="hover:text-white transition-colors"
            >
              Contact
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {menuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-max-height duration-300 ease-in-out overflow-hidden ${
            menuOpen ? "max-h-64 mt-2" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-2 py-2 px-2 bg-slate-900 border-t border-slate-800">
            <button
              onClick={() => {
                navigate("/about");
                setMenuOpen(false);
              }}
              className="text-amber-400 w-full text-left py-2 px-2 rounded"
            >
              About
            </button>
            <button
              onClick={() => {
                navigate("/services");
                setMenuOpen(false);
              }}
              className="text-slate-300 w-full text-left py-2 px-2 rounded hover:text-white"
            >
              Services
            </button>
            <button
              onClick={() => {
                navigate("/team");
                setMenuOpen(false);
              }}
              className="text-slate-300 w-full text-left py-2 px-2 rounded hover:text-white"
            >
              Team
            </button>
            <button
              onClick={() => {
                navigate("/contact");
                setMenuOpen(false);
              }}
              className="text-slate-300 w-full text-left py-2 px-2 rounded hover:text-white"
            >
              Contact
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="py-16 sm:py-20 text-center px-4">
        <div className="inline-flex gap-2 items-center px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full mb-6">
          <Users className="text-amber-400 w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-amber-300 text-xs sm:text-sm">
            ABOUT CYBERSAGE
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          Our Story
        </h1>
        <p className="text-slate-400 text-base sm:text-lg md:text-xl">
          Born from passion, driven by innovation
        </p>
      </section>

      {/* TEAM SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-10 sm:mb-12">
          Leadership Team
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {teamMembers.map((member) => (
            <div
              key={member._id}
              onClick={() => setSelectedMember(member)}
              className="cursor-pointer group text-center"
            >
              <div className="rounded-2xl overflow-hidden mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  className="w-full aspect-square object-cover group-hover:scale-110 transition duration-300"
                />
              </div>
              <h3 className="text-white font-semibold text-sm sm:text-base">
                {member.name}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm">
                {member.position}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* OFFICES SECTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        <div className="text-center mb-10">
          <div className="inline-flex gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full mb-4">
            <Building2 className="text-amber-400 w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-amber-300 text-xs sm:text-sm">
              GLOBAL PRESENCE
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Our Offices
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {offices.map((office) => (
            <Card key={office._id} className="bg-slate-900 border-slate-700">
              <CardHeader>
                <MapPin className="text-amber-400 mb-3" />
                <Badge className="w-fit bg-amber-500/20 text-amber-400">
                  {office.type}
                </Badge>
                <CardTitle className="text-white">{office.city}</CardTitle>
                <p className="text-slate-400">{office.country}</p>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 text-sm">{office.address}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* TEAM MEMBER MODAL */}
      <Dialog
        open={!!selectedMember}
        onOpenChange={() => setSelectedMember(null)}
      >
        {selectedMember && (
          <DialogContent className="bg-slate-900 border-slate-700 w-[95%] sm:max-w-2xl max-h-[90vh] overflow-y-auto text-white">
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl">
                {selectedMember.name}
              </DialogTitle>
              <p className="text-amber-400">{selectedMember.position}</p>
            </DialogHeader>

            <p className="text-slate-300 mt-4">{selectedMember.bio}</p>

            <div className="mt-6">
              <h4 className="font-semibold mb-2">Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {selectedMember.expertise?.map((skill, i) => (
                  <Badge key={i} className="bg-amber-500/20 text-amber-400">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <p className="text-slate-400 mt-4">{selectedMember.education}</p>
          </DialogContent>
        )}
      </Dialog>

      <SageAI />
    </div>
  );
};

export default AboutPage;
