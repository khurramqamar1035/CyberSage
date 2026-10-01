import React from 'react';
import { MessageSquareQuote } from 'lucide-react';
import AdminCollection from './AdminCollection';

const FIELDS = [
  { name: 'name', label: 'Name', required: true },
  { name: 'message', label: 'Their testimonial', type: 'textarea', rows: 7, required: true, hint: 'Paste what they wrote, in their own words.' },
  { name: 'role', label: 'Role', placeholder: 'e.g. Security Intern, Client, Partner' },
  { name: 'cohort', label: 'Batch or organisation', placeholder: 'e.g. Intern 2026, Acme Ltd' },
  { name: 'photo', label: 'Photo URL (optional)', type: 'image' },
  { name: 'linkedin', label: 'LinkedIn URL (optional)', placeholder: 'https://www.linkedin.com/in/…' },
  { name: 'order', label: 'Display order', type: 'number', default: 0, hint: 'Lower numbers appear first in the row.' },
  { name: 'published', label: 'Published', type: 'checkbox', checkboxLabel: 'Show on the website', default: true },
];

export default function AdminInternMessages() {
  return (
    <AdminCollection
      title="Testimonials (scrolling)"
      icon={MessageSquareQuote}
      path="intern-messages"
      fields={FIELDS}
      empty="No testimonials added yet"
      help="Shown in the moving Testimonials row on the Internship and Core team pages, next to the three built in. Add anyone: interns, clients or partners. Adding someone with the same name as a built-in one replaces it. Only add testimonials the person has agreed to share."
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
