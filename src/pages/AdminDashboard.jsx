import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { useToast } from '../hooks/use-toast';
import { Lock, Plus, Edit, Trash2, FileText, HelpCircle, LogOut } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('admin_token'));
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  
  // Blog state
  const [blogs, setBlogs] = useState([]);
  const [blogForm, setBlogForm] = useState({
    title: '', slug: '', content: '', excerpt: '', author: '', category: '', tags: '', featured_image: '', published: true
  });
  const [editingBlog, setEditingBlog] = useState(null);
  
  // FAQ state
  const [faqs, setFaqs] = useState([]);
  const [faqForm, setFaqForm] = useState({ question: '', answer: '', category: '', order: 0 });
  const [editingFaq, setEditingFaq] = useState(null);

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
      fetchBlogs();
      fetchFaqs();
    }
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API}/admin/login`, loginForm);
      setToken(response.data.token);
      localStorage.setItem('admin_token', response.data.token);
      setIsAuthenticated(true);
      toast({ title: "Login successful", description: "Welcome to admin dashboard" });
    } catch (error) {
      toast({ title: "Login failed", description: "Invalid credentials", variant: "destructive" });
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
    navigate('/');
  };

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${API}/blogs?published_only=false`);
      setBlogs(response.data);
    } catch {
      // silently fail
    }
  };

  const fetchFaqs = async () => {
    try {
      const response = await axios.get(`${API}/faq`);
      setFaqs(response.data);
    } catch {
      // silently fail
    }
  };

  const handleCreateBlog = async () => {
    try {
      const data = { ...blogForm, tags: blogForm.tags.split(',').map(t => t.trim()) };
      await axios.post(`${API}/blogs`, data, { headers: { Authorization: `Bearer ${token}` } });
      toast({ title: "Blog created successfully" });
      setBlogForm({ title: '', slug: '', content: '', excerpt: '', author: '', category: '', tags: '', featured_image: '', published: true });
      fetchBlogs();
    } catch (error) {
      toast({ title: "Error creating blog", variant: "destructive" });
    }
  };

  const handleUpdateBlog = async () => {
    try {
      if (!editingBlog) return; // safety check
  
      // Prepare only the fields allowed for update
      const data = {
        title: blogForm.title,
        content: blogForm.content,
        excerpt: blogForm.excerpt,
        author: blogForm.author,
        category: blogForm.category,
        tags: blogForm.tags ? blogForm.tags.split(',').map(t => t.trim()) : [],
        featured_image: blogForm.featured_image,
        published: blogForm.published,
      };
  
      // PUT request using the blog's ID in the URL
      await axios.put(`${API}/blogs/${editingBlog}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      toast({ title: "Blog updated successfully" });
  
      // Reset form and editing state
      setEditingBlog(null);
      setBlogForm({
        title: '',
        slug: '',
        content: '',
        excerpt: '',
        author: '',
        category: '',
        tags: '',
        featured_image: '',
        published: true,
      });
  
      // Refresh blog list
      fetchBlogs();
    } catch {
      toast({ title: "Error updating blog", variant: "destructive" });
    }
  };
  

  const handleDeleteBlog = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    try {
      await axios.delete(`${API}/blogs/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      toast({ title: "Blog deleted successfully" });
      fetchBlogs();
    } catch (error) {
      toast({ title: "Error deleting blog", variant: "destructive" });
    }
  };

  const handleCreateFaq = async () => {
    try {
      await axios.post(`${API}/faq`, { ...faqForm, order: parseInt(faqForm.order) }, { headers: { Authorization: `Bearer ${token}` } });
      toast({ title: "FAQ created successfully" });
      setFaqForm({ question: '', answer: '', category: '', order: 0 });
      fetchFaqs();
    } catch (error) {
      toast({ title: "Error creating FAQ", variant: "destructive" });
    }
  };

  const handleUpdateFaq = async () => {
    try {
      await axios.put(`${API}/faq/${editingFaq}`, { ...faqForm, order: parseInt(faqForm.order) }, { headers: { Authorization: `Bearer ${token}` } });
      toast({ title: "FAQ updated successfully" });
      setEditingFaq(null);
      setFaqForm({ question: '', answer: '', category: '', order: 0 });
      fetchFaqs();
    } catch (error) {
      toast({ title: "Error updating FAQ", variant: "destructive" });
    }
  };

  const handleDeleteFaq = async (id) => {
    if (!window.confirm('Are you sure you want to delete this FAQ?')) return;
    try {
      await axios.delete(`${API}/faq/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      toast({ title: "FAQ deleted successfully" });
      fetchFaqs();
    } catch (error) {
      toast({ title: "Error deleting FAQ", variant: "destructive" });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
        <Card className="bg-slate-900/90 border-slate-700 w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-amber-500/20 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-amber-400" />
            </div>
            <CardTitle className="text-2xl text-white">Admin Login</CardTitle>
            <CardDescription className="text-slate-400">Enter your credentials to access the dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  placeholder="Username"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white"
                  required
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600">
                Login
              </Button>
              
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <nav className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img 
                src="https://customer-assets.emergentagent.com/job_83508210-49e2-4693-89fb-e881ef07bca3/artifacts/0n25qd68_Gemini_Generated_Image_jkwstijkwstijkws-removebg-preview.png" 
                alt="CyberSage" 
                className="w-10 h-10 object-contain"
              />
              <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={() => navigate('/')} variant="ghost" className="text-slate-300">
                View Site
              </Button>
              <Button onClick={handleLogout} variant="ghost" className="text-red-400">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <Tabs defaultValue="blogs" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 bg-slate-800 mb-8">
            <TabsTrigger value="blogs" className="data-[state=active]:bg-amber-500">
              <FileText className="w-4 h-4 mr-2" />
              Blog Posts
            </TabsTrigger>
            <TabsTrigger value="faqs" className="data-[state=active]:bg-amber-500">
              <HelpCircle className="w-4 h-4 mr-2" />
              FAQs
            </TabsTrigger>
          </TabsList>

          {/* Blog Management */}
          <TabsContent value="blogs" className="space-y-6">
            <Card className="bg-slate-900/60 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Create/Edit Blog Post</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder="Title" value={blogForm.title} onChange={(e) => setBlogForm({...blogForm, title: e.target.value})} className="bg-slate-800 border-slate-700 text-white" />
                  <Input placeholder="Slug (URL)" value={blogForm.slug} onChange={(e) => setBlogForm({...blogForm, slug: e.target.value})} className="bg-slate-800 border-slate-700 text-white" />
                </div>
                <Textarea placeholder="Excerpt" value={blogForm.excerpt} onChange={(e) => setBlogForm({...blogForm, excerpt: e.target.value})} className="bg-slate-800 border-slate-700 text-white" rows={2} />
                <Textarea placeholder="Content" value={blogForm.content} onChange={(e) => setBlogForm({...blogForm, content: e.target.value})} className="bg-slate-800 border-slate-700 text-white" rows={6} />
                <div className="grid md:grid-cols-3 gap-4">
                  <Input placeholder="Author" value={blogForm.author} onChange={(e) => setBlogForm({...blogForm, author: e.target.value})} className="bg-slate-800 border-slate-700 text-white" />
                  <Input placeholder="Category" value={blogForm.category} onChange={(e) => setBlogForm({...blogForm, category: e.target.value})} className="bg-slate-800 border-slate-700 text-white" />
                  <Input placeholder="Tags (comma-separated)" value={blogForm.tags} onChange={(e) => setBlogForm({...blogForm, tags: e.target.value})} className="bg-slate-800 border-slate-700 text-white" />
                </div>
                <Input placeholder="Featured Image URL" value={blogForm.featured_image} onChange={(e) => setBlogForm({...blogForm, featured_image: e.target.value})} className="bg-slate-800 border-slate-700 text-white" />
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-white">
                    <input type="checkbox" checked={blogForm.published} onChange={(e) => setBlogForm({...blogForm, published: e.target.checked})} className="w-4 h-4" />
                    Published
                  </label>
                  {editingBlog ? (
                    <div className="flex gap-2">
                      <Button onClick={handleUpdateBlog} className="bg-amber-500 hover:bg-amber-600">Update Blog</Button>
                      <Button onClick={() => { setEditingBlog(null); setBlogForm({ title: '', slug: '', content: '', excerpt: '', author: '', category: '', tags: '', featured_image: '', published: true }); }} variant="outline">Cancel</Button>
                    </div>
                  ) : (
                    <Button onClick={handleCreateBlog} className="bg-amber-500 hover:bg-amber-600"><Plus className="w-4 h-4 mr-2" />Create Blog</Button>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {blogs.map((blog) => (
                <Card key={blog.id} className="bg-slate-900/60 border-slate-700">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-white">{blog.title}</h3>
                          <Badge className={blog.published ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}>{blog.published ? 'Published' : 'Draft'}</Badge>
                        </div>
                        <p className="text-slate-400 text-sm mb-2">{blog.excerpt}</p>
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span>By {blog.author}</span>
                          <span>•</span>
                          <span>{blog.category}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => { setEditingBlog(blog.id); setBlogForm({...blog, tags: blog.tags.join(', ')}); }} variant="ghost" className="text-amber-400"><Edit className="w-4 h-4" /></Button>
                        <Button size="sm" onClick={() => handleDeleteBlog(blog.id)} variant="ghost" className="text-red-400"><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* FAQ Management */}
          <TabsContent value="faqs" className="space-y-6">
            <Card className="bg-slate-900/60 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Create/Edit FAQ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Question" value={faqForm.question} onChange={(e) => setFaqForm({...faqForm, question: e.target.value})} className="bg-slate-800 border-slate-700 text-white" />
                <Textarea placeholder="Answer" value={faqForm.answer} onChange={(e) => setFaqForm({...faqForm, answer: e.target.value})} className="bg-slate-800 border-slate-700 text-white" rows={4} />
                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder="Category" value={faqForm.category} onChange={(e) => setFaqForm({...faqForm, category: e.target.value})} className="bg-slate-800 border-slate-700 text-white" />
                  <Input type="number" placeholder="Order" value={faqForm.order} onChange={(e) => setFaqForm({...faqForm, order: e.target.value})} className="bg-slate-800 border-slate-700 text-white" />
                </div>
                {editingFaq ? (
                  <div className="flex gap-2">
                    <Button onClick={handleUpdateFaq} className="bg-amber-500 hover:bg-amber-600">Update FAQ</Button>
                    <Button onClick={() => { setEditingFaq(null); setFaqForm({ question: '', answer: '', category: '', order: 0 }); }} variant="outline">Cancel</Button>
                  </div>
                ) : (
                  <Button onClick={handleCreateFaq} className="bg-amber-500 hover:bg-amber-600"><Plus className="w-4 h-4 mr-2" />Create FAQ</Button>
                )}
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {faqs.map((faq) => (
                <Card key={faq.id} className="bg-slate-900/60 border-slate-700">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                          <Badge className="bg-amber-500/20 text-amber-400">{faq.category}</Badge>
                        </div>
                        <p className="text-slate-400 text-sm">{faq.answer}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => { setEditingFaq(faq.id); setFaqForm(faq); }} variant="ghost" className="text-amber-400"><Edit className="w-4 h-4" /></Button>
                        <Button size="sm" onClick={() => handleDeleteFaq(faq.id)} variant="ghost" className="text-red-400"><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
