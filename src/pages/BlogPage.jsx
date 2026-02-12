import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Calendar, User, ArrowRight, Menu, X, Shield, GraduationCap, Code, Layers, Monitor } from 'lucide-react';
import axios from 'axios';
import SageAI from '../components/SageAI';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL; // e.g., http://localhost:5000

const BlogPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/blogs?published_only=true`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { navigate('/'); setMenuOpen(false); }}>
            <img 
              src="https://customer-assets.emergentagent.com/job_83508210-49e2-4693-89fb-e881ef07bca3/artifacts/0n25qd68_Gemini_Generated_Image_jkwstijkwstijkws-removebg-preview.png" 
              alt="CyberSage" 
              className="w-10 h-10 object-contain"
            />
            <h1 className="text-xl font-bold text-white">CyberSage</h1>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6 text-sm sm:text-base text-slate-300">
            <button onClick={() => navigate('/security')} className="hover:text-white flex items-center gap-1">
              <Shield className="w-4 h-4" /> Security
            </button>
            <button onClick={() => navigate('/development')} className="hover:text-white flex items-center gap-1">
              <Code className="w-4 h-4" /> Development
            </button>
            <button onClick={() => navigate('/training')} className="hover:text-white flex items-center gap-1">
              <GraduationCap className="w-4 h-4" /> Training
            </button>
            <button onClick={() => navigate('/faq')} className="hover:text-white">FAQ</button>
            <button onClick={() => navigate('/blog')} className="text-amber-400 font-semibold">Blog</button>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-white focus:outline-none">
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-slate-800 flex flex-col px-4 py-2">
            <button onClick={() => { navigate('/security'); setMenuOpen(false); }} className="text-white text-left py-2 flex items-center gap-2">
              <Shield className="w-4 h-4" /> Security
            </button>
            <button onClick={() => { navigate('/development'); setMenuOpen(false); }} className="text-white text-left py-2 flex items-center gap-2">
              <Code className="w-4 h-4" /> Development
            </button>
            <button onClick={() => { navigate('/training'); setMenuOpen(false); }} className="text-white text-left py-2 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" /> Training
            </button>
            <button onClick={() => { navigate('/faq'); setMenuOpen(false); }} className="text-white text-left py-2">FAQ</button>
            <button onClick={() => { navigate('/blog'); setMenuOpen(false); }} className="text-amber-400 font-semibold text-left py-2">Blog</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 mb-6">
            <span className="text-sm text-amber-300 font-medium">CYBERSAGE BLOG</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Latest Insights & Updates</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Stay informed with the latest cybersecurity news, development tips, and industry insights
          </p>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-400 mt-4">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="py-20 text-center">
              <p className="text-slate-400 text-lg">No blog posts yet. Check back soon!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card 
                key={post.id} 
                className="bg-slate-900/60 border-slate-700 hover:border-amber-500/50 transition-all duration-300 cursor-pointer group"
                onClick={() => navigate(`/blog/${post.slug}`)}
              >
                {post.featured_image && (
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={post.featured_image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                      {post.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-white group-hover:text-amber-400 transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-slate-400 line-clamp-2">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row justify-between text-sm text-slate-500 gap-2">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(post.created_at)}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button variant="ghost" className="w-full text-amber-400 hover:bg-amber-500/10 flex justify-center items-center">
                      Read More <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <SageAI />
    </div>
  );
};

export default BlogPage;
