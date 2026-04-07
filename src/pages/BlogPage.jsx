import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Calendar, User, ArrowRight } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const BlogPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/blogs`);
      setPosts(Array.isArray(response.data) ? response.data : []);
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
      {/* Hero */}
      <div className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 mb-6">
            <span className="text-sm text-amber-300 font-medium">CYBERSAGE BLOG</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Latest Insights &amp; Updates
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Stay informed with the latest cybersecurity news, development tips, and industry insights
          </p>
        </div>
      </div>

      {/* Posts grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-slate-900/60 border border-slate-700 rounded-lg overflow-hidden animate-pulse">
                <div className="aspect-video bg-slate-800" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-slate-700 rounded w-1/4" />
                  <div className="h-5 bg-slate-700 rounded w-3/4" />
                  <div className="h-4 bg-slate-700 rounded w-full" />
                  <div className="h-4 bg-slate-700 rounded w-2/3" />
                </div>
              </div>
            ))}
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
                key={post.id || post._id}
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
                    <Button
                      variant="ghost"
                      className="w-full text-amber-400 hover:bg-amber-500/10 flex justify-center items-center"
                    >
                      Read More <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
