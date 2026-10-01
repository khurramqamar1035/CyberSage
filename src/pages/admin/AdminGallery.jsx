import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import AdminCollection from './AdminCollection';

const FIELDS = [
  { name: 'imageUrl', label: 'Image URL', type: 'image', required: true, hint: 'Paste a direct link to the image (e.g. from your image host or CDN). It must open as a picture on its own.' },
  { name: 'caption', label: 'Caption', placeholder: 'e.g. Summer 2026 intern cohort, final presentations' },
  { name: 'album', label: 'Album', placeholder: 'e.g. Internship, Events, Team', suggestions: ['Internship', 'Events', 'Team', 'Office'] },
  { name: 'date', label: 'Date', type: 'date' },
  { name: 'order', label: 'Display order', type: 'number', default: 0, hint: 'Lower numbers show first.' },
  { name: 'published', label: 'Published', type: 'checkbox', checkboxLabel: 'Show on the gallery page', default: true },
];

export default function AdminGallery() {
  return (
    <AdminCollection
      title="Gallery"
      icon={ImageIcon}
      path="gallery"
      fields={FIELDS}
      grid
      empty="No photos yet"
      help="Photos shown on cybersage.uk/gallery. Untick Published to hide a photo without deleting it."
      renderItem={(it, actions) => (
        <div>
          <div className="aspect-[4/3] rounded-lg overflow-hidden bg-black/40 mb-3">
            <img src={it.imageUrl} alt={it.caption || ''} className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-white text-sm font-medium truncate">{it.caption || 'Untitled'}</p>
              <p className="text-slate-500 text-xs mt-0.5">{[it.album, it.published === false ? 'Hidden' : null].filter(Boolean).join(' · ') || '—'}</p>
            </div>
            {actions}
          </div>
        </div>
      )}
    />
  );
}
