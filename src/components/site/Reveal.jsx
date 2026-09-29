import React, { useEffect, useRef, useState } from 'react';

// Fades content up the first time it scrolls into view. Transitions (not keyframes)
// so it stays interruptible; reduced-motion users see it immediately (see ecosystem.css).
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') { setInView(true); return undefined; }
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); io.disconnect(); } },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-in={inView ? 'true' : 'false'}
      className={`cs-reveal ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
