import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { PageHero, Guides } from '../components/site/ServiceTemplates';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const WRAP = 'max-w-[1400px] mx-auto px-6 md:px-10';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/blogs`);
      setPosts(Array.isArray(response.data) ? response.data : []);
    } catch {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <main className="cs-sans text-[#07090D]">
      <PageHero
        crumbs={[{ label: 'CyberSage', to: '/' }, { label: 'Blog' }]}
        word="RESEARCH"
        title="Research, guides and company news."
        intro="Writing from the CyberSage team on security, development and the products we build."
      />

      <section className="relative s-paper overflow-hidden">
        <Guides />
        <div className={`${WRAP} relative py-16 md:py-20`}>
          {loading ? (
            <div aria-busy="true" aria-label="Loading posts" className="border-t border-[#07090D]">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="py-8 border-b border-[rgba(7,9,13,0.14)] grid grid-cols-1 md:grid-cols-[200px_minmax(0,1fr)_260px] gap-6">
                  <div className="h-3 bg-[#E6E9ED] w-24" /><div className="space-y-3"><div className="h-5 bg-[#E6E9ED] w-3/4" /><div className="h-4 bg-[#E6E9ED] w-full" /></div><div className="hidden md:block aspect-[16/10] bg-[#E6E9ED]" />
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <p className="m-0 py-10 border-t border-[#07090D] text-[16px] text-[#3E4555]">No posts have been published yet. Check back soon.</p>
          ) : (
            <ul className="m-0 p-0 list-none border-t border-[#07090D]">
              {posts.map((post) => (
                <li key={post.id || post._id}>
                  <Link to={`/blog/${post.slug}`} className="cs-row-link grid grid-cols-1 md:grid-cols-[200px_minmax(0,1fr)_280px] gap-x-8 gap-y-3 py-8 border-b border-[rgba(7,9,13,0.14)]">
                    <div className="flex md:flex-col gap-x-4 gap-y-1.5">
                      {post.category && <span className="cs-meta text-[#2563EB]">{post.category}</span>}
                      {post.created_at && <span className="cs-meta text-[#5B6575]">{formatDate(post.created_at)}</span>}
                    </div>
                    <div className="min-w-0">
                      <h2 className="cs-row-title m-0 text-[24px] md:text-[28px] leading-[1.15] font-normal tracking-[-0.02em] transition-colors">{post.title}</h2>
                      {post.excerpt && <p className="m-0 mt-3 text-[16px] leading-relaxed text-[#3E4555] line-clamp-3">{post.excerpt}</p>}
                      {post.author && <p className="m-0 mt-4 text-[14px] text-[#5B6575]">By {post.author}</p>}
                    </div>
                    {post.featured_image && (
                      <div className="aspect-[16/10] overflow-hidden bg-[#E6E9ED] order-first md:order-none">
                        <img src={post.featured_image} alt="" loading="lazy" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
};

export default BlogPage;
