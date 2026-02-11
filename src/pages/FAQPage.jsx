import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { HelpCircle } from 'lucide-react';
import axios from 'axios';
import SageAI from '../components/SageAI';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const FAQPage = () => {
  const navigate = useNavigate();
  const [faqs, setFaqs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFAQs();
    fetchCategories();
  }, []);

  const fetchFAQs = async (category = null) => {
    try {
      const url = category ? `${API}/faq?category=${category}` : `${API}/faq`;
      const response = await axios.get(url);
      setFaqs(response.data);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API}/faq/categories`);
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      fetchFAQs();
    } else {
      fetchFAQs(category);
    }
  };

  const groupedFAQs = faqs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <nav className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
              <img 
                src="https://customer-assets.emergentagent.com/job_83508210-49e2-4693-89fb-e881ef07bca3/artifacts/0n25qd68_Gemini_Generated_Image_jkwstijkwstijkws-removebg-preview.png" 
                alt="CyberSage" 
                className="w-10 h-10 object-contain"
              />
              <h1 className="text-xl font-bold text-white">CyberSage</h1>
            </div>

            <div className="flex items-center space-x-6">
              <button onClick={() => navigate('/security')} className="text-slate-300 hover:text-white transition-colors">Security</button>
              <button onClick={() => navigate('/development')} className="text-slate-300 hover:text-white transition-colors">Development</button>
              <button onClick={() => navigate('/training')} className="text-slate-300 hover:text-white transition-colors">Training</button>
              <button onClick={() => navigate('/faq')} className="text-amber-400 font-semibold">FAQ</button>
              <button onClick={() => navigate('/blog')} className="text-slate-300 hover:text-white transition-colors">Blog</button>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 mb-6">
            <HelpCircle className="w-5 h-5 text-amber-400" />
            <span className="text-sm text-amber-300 font-medium">FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">How Can We Help You?</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Find answers to common questions about our services, pricing, and more
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-20">
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            <Badge 
              className={`cursor-pointer px-4 py-2 ${selectedCategory === 'all' ? 'bg-amber-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
              onClick={() => handleCategoryChange('all')}
            >
              All
            </Badge>
            {categories.map((category) => (
              <Badge 
                key={category}
                className={`cursor-pointer px-4 py-2 ${selectedCategory === category ? 'bg-amber-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        )}

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-400 mt-4">Loading FAQs...</p>
          </div>
        ) : faqs.length === 0 ? (
          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="py-20 text-center">
              <p className="text-slate-400 text-lg">No FAQs available yet. Check back soon!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {selectedCategory === 'all' ? (
              Object.entries(groupedFAQs).map(([category, categoryFaqs]) => (
                <Card key={category} className="bg-slate-900/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white">{category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {categoryFaqs.map((faq, index) => (
                        <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                          <AccordionTrigger className="text-left text-white hover:text-amber-400">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-slate-400">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="bg-slate-900/50 border-slate-700">
                <CardContent className="pt-6">
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq) => (
                      <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                        <AccordionTrigger className="text-left text-white hover:text-amber-400">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-400">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>

      <SageAI />
    </div>
  );
};

export default FAQPage;
