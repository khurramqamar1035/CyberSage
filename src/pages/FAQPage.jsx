import React, { useState, useEffect } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { HelpCircle } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const FAQPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/faq`);
      setFaqs(Array.isArray(response.data) ? response.data : []);
    } catch {
      setFaqs([]);
    } finally {
      setLoading(false);
    }
  };

  // Derive categories from fetched data (no separate /categories endpoint needed)
  const categories = ['all', ...Array.from(new Set(faqs.map((f) => f.category).filter(Boolean)))];

  const filtered = selectedCategory === 'all'
    ? faqs
    : faqs.filter((f) => f.category === selectedCategory);

  const groupedFAQs = filtered.reduce((acc, faq) => {
    if (!acc[faq.category]) acc[faq.category] = [];
    acc[faq.category].push(faq);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero */}
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

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 pb-20">
        {/* Category filters */}
        {categories.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {categories.map((cat) => (
              <Badge
                key={cat}
                className={`cursor-pointer px-4 py-2 capitalize ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-white hover:bg-amber-500'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === 'all' ? 'All' : cat}
              </Badge>
            ))}
          </div>
        )}

        {loading ? (
          <div className="space-y-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 animate-pulse">
                <div className="h-6 bg-slate-700 rounded w-1/3 mb-6" />
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="py-4 border-t border-slate-800">
                    <div className="h-4 bg-slate-700 rounded w-3/4" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="py-20 text-center">
              <p className="text-slate-400 text-lg">No FAQs available yet. Check back soon!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedFAQs).map(([category, categoryFaqs]) => (
              <Card key={category} className="bg-slate-900/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {categoryFaqs.map((faq) => (
                      <AccordionItem key={faq.id || faq._id} value={`item-${faq.id || faq._id}`}>
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQPage;
