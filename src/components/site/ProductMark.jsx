import React from 'react';
import { productBySlug } from '../../data/ecosystem';

// The products' own published marks. Products without a published mark get a plain
// colour swatch in their key colour rather than an invented logo.
const MARKS = {
  nexus: '/brand/products/nexus-mark.png',
  vault: '/brand/products/vault-eagle.webp',
  sentinel: '/brand/products/sentinel-emblem.png',
};
const RATIO = { nexus: 1, vault: 540 / 480, sentinel: 333 / 192 };

export default function ProductMark({ slug, size = 24, className = '' }) {
  const src = MARKS[slug];
  if (src) {
    return <img src={src} alt="" aria-hidden="true" width={Math.round(size * RATIO[slug])} height={size} className={`block shrink-0 object-contain ${className}`} style={{ height: size, width: 'auto' }} />;
  }
  const p = productBySlug(slug);
  const s = Math.round(size * 0.5);
  return <span aria-hidden="true" className={`inline-block shrink-0 ${className}`} style={{ width: s, height: s, background: p ? p.key : '#2563EB', margin: (size - s) / 2 }} />;
}
