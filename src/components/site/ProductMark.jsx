import React from 'react';

// CyberSage product marks. One geometric idea per product, drawn on a 32px grid
// with a single stroke weight so they read as one family.
//   Nexus      connected workspace: three people-nodes joined through a shared hub
//   Sentinel   telemetry through a hexagonal perimeter, one event marked
//   Brain      decision graph: one input, two paths, one chosen
//   Vault      protected repository: nested containers with a keyed entry
//   Education  connected campus: three institutions on one shared spine

const paths = {
  nexus: (c, a) => (
    <>
      <circle cx="16" cy="16" r="3.2" fill={a} stroke="none" />
      <circle cx="6.5" cy="8" r="2.4" />
      <circle cx="25.5" cy="8" r="2.4" />
      <circle cx="16" cy="27" r="2.4" />
      <path d="M8.4 9.4 L13.4 14.1 M23.6 9.4 L18.6 14.1 M16 19.2 L16 24.6" />
      <path d="M8.9 8 H23.1" strokeDasharray="1.5 2.5" />
    </>
  ),
  sentinel: (c, a) => (
    <>
      <path d="M16 3.5 L26.8 9.75 V22.25 L16 28.5 L5.2 22.25 V9.75 Z" />
      <path d="M8 17 H12 L14 12.5 L17 21 L19 15 L20.5 17 H24" stroke={a} />
      <circle cx="17" cy="21" r="1.3" fill={a} stroke="none" />
    </>
  ),
  brain: (c, a) => (
    <>
      <circle cx="5.5" cy="16" r="2.4" />
      <circle cx="16" cy="8.5" r="2.4" />
      <circle cx="16" cy="23.5" r="2.4" />
      <circle cx="26.5" cy="23.5" r="2.6" fill={a} stroke="none" />
      <path d="M7.6 14.8 L13.9 9.7 M7.6 17.2 L13.9 22.3" />
      <path d="M18.4 23.5 H23.9" stroke={a} />
      <path d="M18.4 8.5 H26.5" strokeDasharray="1.5 2.5" />
    </>
  ),
  vault: (c, a) => (
    <>
      <rect x="4" y="4" width="24" height="24" rx="1.5" />
      <rect x="9.5" y="9.5" width="13" height="13" rx="1" />
      <circle cx="16" cy="16" r="2" fill={a} stroke="none" />
      <path d="M16 4 V9.5" stroke={a} />
    </>
  ),
  education: (c, a) => (
    <>
      <rect x="3.5" y="5" width="6" height="6" rx="0.8" />
      <rect x="13" y="5" width="6" height="6" rx="0.8" />
      <rect x="22.5" y="5" width="6" height="6" rx="0.8" fill={a} stroke={a} />
      <path d="M6.5 11 V17 M16 11 V17 M25.5 11 V17 M4 17 H28" />
      <path d="M16 17 V24" />
      <rect x="11" y="24" width="10" height="4" rx="0.8" />
    </>
  ),
};

export default function ProductMark({ slug, size = 32, color = 'currentColor', accent, className = '', title }) {
  const draw = paths[slug];
  if (!draw) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
      className={className} role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      {draw(color, accent || color)}
    </svg>
  );
}
