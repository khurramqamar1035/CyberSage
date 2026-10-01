import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Guides } from '../components/site/ServiceTemplates';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
const WRAP = 'max-w-[1400px] mx-auto px-6 md:px-10';

const BlogDetailPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`${API}/blogs/${slug}`);
      setPost(response.data);
    } catch {
      // silently fail
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

  const crumbs = (
    <nav aria-label="Breadcrumb" className="cs-meta text-[#5B6575] flex flex-wrap items-center gap-2.5">
      <Link to="/" className="hover:text-[#ECEEF1] transition-colors">CyberSage</Link><span aria-hidden="true">/</span>
      <Link to="/blog" className="hover:text-[#ECEEF1] transition-colors">Blog</Link>
    </nav>
  );

  if (loading || !post) {
    return (
      <main className="cs-sans">
        <section className="relative s-black tx-grain overflow-hidden text-[#ECEEF1] min-h-[60vh]">
          <Guides dark />
          <div className={`${WRAP} relative pt-10 md:pt-14 pb-20`}>
            {crumbs}
            {loading ? (
              <div aria-busy="true" aria-label="Loading post" className="mt-12 max-w-[760px] space-y-4">
                <div className="h-3 bg-[#1A1F2A] w-32" /><div className="h-10 bg-[#1A1F2A] w-full" /><div className="h-10 bg-[#1A1F2A] w-2/3" />
              </div>
            ) : (
              <div className="mt-12">
                <h1 className="m-0 t-wide font-[250] text-[34px] md:text-[48px] leading-[1.05] tracking-[-0.035em]">Post not found.</h1>
                <p className="m-0 mt-4 text-[16px] text-[#A9B8D0]">It may have been moved or removed.</p>
                <Link to="/blog" className="cs-btn cs-btn-on-dark mt-8">Back to the blog</Link>
              </div>
            )}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="cs-sans text-[#07090D]">
      <section className="relative s-black tx-grain overflow-hidden text-[#ECEEF1]">
        <Guides dark />
        <div className={`${WRAP} relative pt-10 md:pt-14 pb-14 md:pb-20`}>
          {crumbs}
          <div className="mt-12 max-w-[920px]">
            {post.category && <div className="cs-meta text-[#A9B8D0]">{post.category}</div>}
            <h1 className="m-0 mt-4 t-wide font-[250] text-[34px] sm:text-[46px] lg:text-[58px] leading-[1.04] tracking-[-0.035em]">{post.title}</h1>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-[15px] text-[#A9B8D0]">
              {post.author && <span>By {post.author}</span>}
              {post.created_at && <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>}
            </div>
          </div>
        </div>
      </section>

      <article className="relative s-paper overflow-hidden">
        <Guides />
        <div className={`${WRAP} relative py-14 md:py-20`}>
          {post.featured_image && (
            <div className="max-w-[1100px] aspect-[16/9] overflow-hidden bg-[#E6E9ED] -mt-2 mb-12 md:mb-16">
              <img src={post.featured_image} alt="" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="max-w-[68ch] text-[17px] leading-[1.75] text-[#1F2430] whitespace-pre-wrap">
            {post.content}
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="max-w-[68ch] mt-12 pt-6 border-t border-[#07090D] flex flex-wrap gap-x-5 gap-y-2">
              {post.tags.map((tag, index) => <span key={index} className="cs-meta text-[#5B6575]">#{tag}</span>)}
            </div>
          )}

          <div className="max-w-[68ch] mt-12">
            <Link to="/blog" className="cs-row-link inline-flex items-center gap-3 text-[15px] font-medium">
              <svg className="cs-btn-arrow rotate-180" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><path d="M1 8h13M9 3l5 5-5 5" /></svg>
              <span className="cs-row-title transition-colors">All posts</span>
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
};

export default BlogDetailPage;
