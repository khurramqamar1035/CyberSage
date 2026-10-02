import React, { useState } from 'react';
import { KeyRound } from 'lucide-react';
import { getContentKey, setContentKey } from './contentApi';

// Asks for the admin content key (set as ADMIN_CONTENT_KEY in Vercel) before showing the editor.
export default function ContentKeyGate({ children }) {
  const [key, setKey] = useState(getContentKey());
  const [draft, setDraft] = useState('');
  if (key) return children({ resetKey: () => { setContentKey(''); setKey(''); } });
  return (
    <div className="max-w-md bg-base border border-edge rounded-2xl p-6 space-y-4">
      <div className="flex items-center gap-3 text-white font-semibold"><KeyRound className="w-5 h-5 text-red-400" /> Admin content key</div>
      <p className="text-slate-400 text-sm">Enter the content key (ADMIN_CONTENT_KEY in Vercel). It is kept only for this browser session.</p>
      <form onSubmit={(e) => { e.preventDefault(); if (draft.trim()) { setContentKey(draft.trim()); setKey(draft.trim()); } }} className="flex gap-2">
        <input type="password" value={draft} onChange={(e) => setDraft(e.target.value)} autoComplete="off"
          className="flex-1 bg-void border border-edge text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-red-500/50" />
        <button type="submit" className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-medium">Continue</button>
      </form>
    </div>
  );
}
