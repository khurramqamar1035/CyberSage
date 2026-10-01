import React from 'react';
import { MessageSquareQuote } from 'lucide-react';
import AdminCollection from './AdminCollection';

const FIELDS = [
  { name: 'name', label: 'Intern name', required: true },
  { name: 'message', label: 'Their testimonial', type: 'textarea', rows: 7, required: true, hint: 'Paste what they wrote, in their own words.' },
  { name: 'role', label: 'Role or track', placeholder: 'e.g. Security Intern, SOC track' },
  { name: 'cohort', label: 'Cohort', placeholder: 'e.g. Summer 2026' },
  { name: 'photo', label: 'Photo URL (optional)', type: 'image' },
  { name: 'linkedin', label: 'LinkedIn URL (optional)', placeholder: 'https://www.linkedin.com/in/…' },
  { name: 'order', label: 'Display order', type: 'number', default: 0, hint: 'The lowest number is shown as the large featured message.' },
  { name: 'published', label: 'Published', type: 'checkbox', checkboxLabel: 'Show on the website', default: true },
];

export default function AdminInternMessages() {
  return (
    <AdminCollection
      title="Intern testimonials"
      icon={MessageSquareQuote}
      path="intern-messages"
      fields={FIELDS}
      empty="No intern testimonials yet"
      help="Testimonials interns leave before finishing, shown on the Internship and Core team pages. Only add messages the intern has agreed to share publicly."
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
