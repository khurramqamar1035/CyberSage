import React from 'react';
import { PRODUCTS } from '../../data/ecosystem';

// Phoenix emblem with the five platforms orbiting it. Chips counter-rotate so labels stay upright.
const POS = [
  [50, 0], [97.6, 34.5], [79.4, 90.5], [20.6, 90.5], [2.4, 34.5],
]; // % positions on the ring, clockwise from top

export default function EcosystemOrbit() {
  return (
    <div className="relative w-[280px] h-[280px] sm:w-[500px] sm:h-[500px] my-6 sm:my-0 shrink-0 mx-auto" aria-hidden="true">
      <svg className="cs-orbit-slow absolute inset-0 w-full h-full" viewBox="0 0 500 500" fill="none"><circle cx="250" cy="250" r="172" stroke="#434655" strokeDasharray="2 7" /></svg>
      <div className="absolute inset-[4%] rounded-full border border-surface-container-high" />
      <div className="absolute inset-[27%] rounded-full bg-surface-container-low border border-surface-container-highest flex items-center justify-center shadow-[0_0_0_12px_rgba(37,99,235,0.06),0_30px_80px_rgba(0,0,0,0.4)]">
        <img src="/brand/emblem.png" alt="" className="cs-emblem-in w-[62%] h-[62%] object-contain" />
      </div>
      <div className="cs-orbit absolute inset-[4%]">
        {PRODUCTS.map((p, i) => (
          <div key={p.slug} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${POS[i][0]}%`, top: `${POS[i][1]}%` }}>
            <div className={`cs-counter flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-md text-[12px] sm:text-[14px] font-semibold whitespace-nowrap ${p.slug === 'brain' ? 'bg-primary-container text-white' : 'bg-surface-container border border-surface-container-highest'}`}>
              <span className="w-2 h-2 rounded-[2px]" style={{ background: p.slug === 'brain' ? '#FFFFFF' : p.color }} />
              {p.slug === 'education' ? 'Education' : p.name.replace('Sage ', '')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
