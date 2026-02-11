import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Badge } from "../components/ui/badge";
import { MapPin, Users, Building2 } from "lucide-react";
import SageAI from "../components/SageAI";
import axios from 'axios';


const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AboutPage = () => {
  const navigate = useNavigate();

  const [teamMembers, setTeamMembers] = useState([]);
  const [offices, setOffices] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [loading, setLoading] = useState(true);

  

useEffect(() => {
  const fetchAboutData = async () => {
    try {
      const [teamRes, officeRes] = await Promise.all([
        axios.get(`${BACKEND_URL}/api/about/team`),
        axios.get(`${BACKEND_URL}/api/about/offices`)
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
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        Loading About Page...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      
      {/* NAV */}
      <nav className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div onClick={() => navigate("/")} className="flex items-center gap-3 cursor-pointer">
            <h1 className="text-xl font-bold text-white">CyberSage</h1>
          </div>
          <div className="flex gap-6 text-slate-300">
            <button onClick={() => navigate("/about")} className="text-amber-400">About</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="py-20 text-center">
        <div className="inline-flex gap-2 items-center px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full mb-6">
          <Users className="text-amber-400" />
          <span className="text-amber-300 text-sm">ABOUT CYBERSAGE</span>
        </div>
        <h1 className="text-5xl font-bold text-white mb-4">Our Story</h1>
        <p className="text-slate-400 text-xl">Born from passion, driven by innovation</p>
      </section>

      {/* TEAM */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-4xl font-bold text-white text-center mb-12">Leadership Team</h2>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member._id}
              onClick={() => setSelectedMember(member)}
              className="cursor-pointer group"
            >
              <div className="rounded-2xl overflow-hidden mb-4">
              <img
                src={`/images/teams/${member.teamid}.jpg`}
                alt={member.name}
                className="w-full aspect-square object-cover group-hover:scale-110 transition"
               />
              </div>
              <h3 className="text-white font-semibold">{member.name}</h3>
              <p className="text-slate-400 text-sm">{member.position}</p>
            </div>
          ))}
        </div>
      </section>

      {/* OFFICES */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="text-center mb-10">
          <div className="inline-flex gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full mb-4">
            <Building2 className="text-amber-400" />
            <span className="text-amber-300 text-sm">GLOBAL PRESENCE</span>
          </div>
          <h2 className="text-4xl font-bold text-white">Our Offices</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
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

      {/* MODAL */}
      <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
        {selectedMember && (
          <DialogContent className="bg-slate-900 border-slate-700 max-w-2xl text-white">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedMember.name}</DialogTitle>
              <p className="text-amber-400">{selectedMember.position}</p>
            </DialogHeader>

            <p className="text-slate-300 mt-4">{selectedMember.bio}</p>

            <div className="mt-6">
              <h4 className="font-semibold mb-2">Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {selectedMember.expertise.map((skill, i) => (
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
