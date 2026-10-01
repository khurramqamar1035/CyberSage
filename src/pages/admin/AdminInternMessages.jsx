import React from 'react';
import { MessageSquareQuote } from 'lucide-react';
import AdminCollection from './AdminCollection';

const FIELDS = [
  { name: 'name', label: 'Name', required: true },
  { name: 'message', label: 'Their testimonial', type: 'textarea', rows: 7, required: true, hint: 'Paste what they wrote, in their own words.' },
  { name: 'role', label: 'Role', placeholder: 'Optional, shown under the name' },
  { name: 'cohort', label: 'Organisation', placeholder: 'Optional, shown under the name' },
    { name: 'linkedin', label: 'LinkedIn URL (optional)', placeholder: 'https://www.linkedin.com/in/…' },
  { name: 'order', label: 'Display order', type: 'number', default: 0, hint: 'Lower numbers appear first in the row.' },
  { name: 'published', label: 'Published', type: 'checkbox', checkboxLabel: 'Show on the website', default: true },
];

export default function AdminInternMessages() {
  return (
    <AdminCollection
      title="Testimonials (scrolling)"
      icon={MessageSquareQuote}
      collection="testimonials"
      fields={FIELDS}
      empty="No testimonials added yet"
      help="Shown in the moving Testimonials row at the bottom of the home page. Only add testimonials the person has agreed to share."
      renderItem={(it, actions) => (
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-white text-sm font-semibold">{it.name}</span>
              <span className="text-slate-500 text-xs">{[it.role, it.cohort].filter(Boolean).join(' · ')}</span>
              {it.published === false && <span className="bg-slate-800 text-slate-400 text-xs px-2 py-0.5 rounded-lg">Hidden</span>}
            </div>
            <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">{it.message}</p>
          </div>
          {actions}
        </div>
      )}
    />
  );
}
