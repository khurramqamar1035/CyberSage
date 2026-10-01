import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { PageHero, Guides } from '../components/site/ServiceTemplates';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const WRAP = 'max-w-[1400px] mx-auto px-6 md:px-10';

function Question({ faq }) {
  const [open, setOpen] = useState(false);
  const id = `faq-${faq.id || faq._id}`;
  return (
    <li className="border-b border-[rgba(7,9,13,0.14)]">
      <h3 className="m-0">
        <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}
          className="w-full flex items-start justify-between gap-6 py-5 text-left bg-transparent text-[18px] font-medium tracking-[-0.01em] text-[#07090D] hover:text-[#2563EB] transition-colors min-h-[44px]">
          <span>{faq.question}</span>
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" className="shrink-0 mt-1" style={{ transition: 'transform 200ms cubic-bezier(0.23,1,0.32,1)', transform: open ? 'rotate(45deg)' : 'none' }}>
            <path d="M9 2v14M2 9h14" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </button>
      </h3>
      <div id={id} hidden={!open} className="pb-6 pr-10 text-[16px] leading-relaxed text-[#3E4555] whitespace-pre-line">{faq.answer}</div>
    </li>
  );
}

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
    <main className="cs-sans text-[#07090D]">
      <PageHero
        crumbs={[{ label: 'CyberSage', to: '/' }, { label: 'FAQ' }]}
        word="FAQ"
        title="Questions, answered."
        intro="Common questions about our products, services, pricing and training."
      />

      <section className="relative s-paper overflow-hidden">
        <Guides />
        <div className={`${WRAP} relative py-16 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12`}>
          <aside className="lg:col-span-3">
            {categories.length > 1 && (
              <nav aria-label="FAQ categories" className="lg:sticky lg:top-24">
                <div className="cs-meta text-[#5B6575] mb-3">Categories</div>
                <ul className="m-0 p-0 list-none flex flex-wrap lg:flex-col gap-2 lg:gap-0 lg:border-t lg:border-[#07090D]">
                  {categories.map((cat) => (
                    <li key={cat}>
                      <button type="button" onClick={() => setSelectedCategory(cat)} aria-pressed={selectedCategory === cat}
                        className={`capitalize text-left min-h-[44px] px-4 lg:px-0 lg:w-full lg:py-3 border lg:border-0 lg:border-b border-[rgba(7,9,13,0.14)] bg-transparent text-[15px] transition-colors ${selectedCategory === cat ? 'text-[#2563EB] font-medium' : 'text-[#3E4555] hover:text-[#07090D]'}`}>
                        {cat === 'all' ? 'All questions' : cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </aside>

          <div className="lg:col-span-8 lg:col-start-5">
            {loading ? (
              <div aria-busy="true" aria-label="Loading questions" className="border-t border-[#07090D]">
                {[...Array(6)].map((_, i) => <div key={i} className="py-6 border-b border-[rgba(7,9,13,0.14)]"><div className="h-4 bg-[#E6E9ED] w-3/4" /></div>)}
              </div>
            ) : filtered.length === 0 ? (
              <p className="m-0 py-10 border-t border-[#07090D] text-[16px] text-[#3E4555]">No questions have been published yet. <Link to="/contact" className="cs-link">Ask us directly</Link>.</p>
            ) : (
              <div className="flex flex-col gap-14">
                {Object.entries(groupedFAQs).map(([category, categoryFaqs]) => (
                  <div key={category}>
                    <h2 className="m-0 t-wide font-[250] text-[26px] md:text-[34px] leading-[1.05] tracking-[-0.03em] capitalize">{category}</h2>
                    <ul className="m-0 mt-6 p-0 list-none border-t border-[#07090D]">
                      {categoryFaqs.map((faq) => <Question key={faq.id || faq._id} faq={faq} />)}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default FAQPage;
