import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white hover:text-cyan-500 transition">
            <span className="text-3xl">⚔️</span>
            <span>CyberSage</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            <Link to="/" className="text-gray-300 hover:text-cyan-500 transition font-medium">
              Home
            </Link>
            <Link to="/security" className="text-gray-300 hover:text-cyan-500 transition font-medium">
              Services
            </Link>
            <a href="#testimonials" className="text-gray-300 hover:text-cyan-500 transition font-medium">
              Testimonials
            </a>
            <Link to="/contact" className="btn-primary text-sm">
              Contact
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-cyan-500"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 border-t border-cyan-500/20">
            <Link
              to="/"
              className="block px-4 py-2 text-gray-300 hover:text-cyan-500 hover:bg-cyan-500/10 rounded transition"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/security"
              className="block px-4 py-2 text-gray-300 hover:text-cyan-500 hover:bg-cyan-500/10 rounded transition"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/development"
              className="block px-4 py-2 text-gray-300 hover:text-cyan-500 hover:bg-cyan-500/10 rounded transition ml-4"
              onClick={() => setIsOpen(false)}
            >
              Development
            </Link>
            <Link
              to="/training"
              className="block px-4 py-2 text-gray-300 hover:text-cyan-500 hover:bg-cyan-500/10 rounded transition ml-4"
              onClick={() => setIsOpen(false)}
            >
              Training
            </Link>
            <Link
              to="/contact"
              className="block px-4 py-2 btn-primary text-sm mt-2"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
