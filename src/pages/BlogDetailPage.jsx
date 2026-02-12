import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Calendar, User, ArrowLeft, Menu, X } from 'lucide-react';
import axios from 'axios';
import SageAI from '../components/SageAI';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const BlogDetailPage = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`${API}/blogs/${slug}`);
      setPost(response.data);
    } catch (error) {
      console.error('Error fetching blog post:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-400 mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 text-center">
        <p className="text-slate-400 text-lg mb-4">Blog post not found</p>
        <Button onClick={() => navigate('/blog')} className="bg-amber-500 hover:bg-amber-600">
          Back to Blog
        </Button>
      </div>
    );
  }

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

          {/* Desktop Buttons */}
          <div className="hidden md:flex gap-4">
            <Button onClick={() => navigate('/blog')} variant="ghost" className="text-white flex items-center">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Blog
            </Button>
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
            <Button onClick={() => { navigate('/blog'); setMenuOpen(false); }} variant="ghost" className="text-white w-full text-left mb-1">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Blog
            </Button>
          </div>
        )}
      </nav>

      {/* BLOG CONTENT */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <Card className="bg-slate-900/50 border-slate-700">
          {post.featured_image && (
            <div className="aspect-video w-full overflow-hidden rounded-t-lg">
              <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          <CardContent className="pt-8">
            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 mb-4">
              {post.category}
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              {post.title}
            </h1>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 text-slate-400 mb-8 pb-8 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.created_at)}</span>
              </div>
            </div>

            <div className="prose prose-invert prose-amber max-w-none">
              <div className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                {post.content}
              </div>
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 pt-8 border-t border-slate-700 flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="bg-slate-800 text-slate-300">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <SageAI />
    </div>
  );
};

export default BlogDetailPage;
