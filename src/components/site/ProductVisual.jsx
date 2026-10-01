import React, { useState } from 'react';

// Product interfaces for each platform. Names, numbers and events are illustrative
// sample data so visitors can see how each product is used.

const Window = ({ title, meta, dark, children, className = '' }) => (
  <div className={`rounded-[4px] overflow-hidden border ${dark ? 'bg-[#0C1324] border-[#0C1324] text-[#DCE1FB]' : 'bg-white border-[#DCE0E7] text-[#0C1324]'} ${className}`}>
    <div className={`h-10 px-4 flex items-center justify-between text-[12px] border-b ${dark ? 'border-[#1E2638] text-[#AEB6C8]' : 'border-[#E6E9EF] text-[#5F6676]'}`}>
      <span className="flex items-center gap-2">
        <span className="flex gap-1.5" aria-hidden="true">{[0, 1, 2].map((i) => <span key={i} className={`w-2.5 h-2.5 rounded-full ${dark ? 'bg-[#2A3247]' : 'bg-[#E1E5EC]'}`} />)}</span>
        <span className="ml-2 font-medium">{title}</span>
      </span>
      {meta && <span className="cs-mono">{meta}</span>}
    </div>
    {children}
  </div>
);

/* ── Nexus: a real workspace ─────────────────────────────────── */
function Nexus() {
  const channels = [['general', 0], ['q4-planning', 3], ['finance', 0], ['security-notices', 1], ['leadership', 0]];
  return (
    <Window title="Nexus" meta="Northbridge Group">
      <div className="flex min-h-[420px]">
        <aside className="hidden sm:flex w-[180px] shrink-0 flex-col gap-0.5 p-3 bg-[#F7F8FA] border-r border-[#E6E9EF] text-[14px]">
          <div className="px-2 pb-2 text-[12px] text-[#5F6676]">Spaces</div>
          {channels.map(([c, n]) => (
            <div key={c} className={`flex items-center justify-between px-2 py-1.5 rounded-[3px] ${c === 'q4-planning' ? 'bg-[#E6ECFD] text-[#1D4ED8] font-medium' : 'text-[#3E4555]'}`}>
              <span># {c}</span>{n > 0 && <span className="cs-mono text-[11px] px-1.5 rounded-[3px] bg-[#2563EB] text-white">{n}</span>}
            </div>
          ))}
          <div className="px-2 pt-4 pb-2 text-[12px] text-[#5F6676]">Direct messages</div>
          {['Aisha Rahman', 'Tom Hughes'].map((p) => <div key={p} className="px-2 py-1.5 text-[#3E4555]">{p}</div>)}
        </aside>
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="h-11 px-4 flex items-center justify-between border-b border-[#E6E9EF]">
            <span className="text-[14px] font-semibold"># q4-planning</span>
            <span className="text-[12px] text-[#5F6676]">8 members</span>
          </div>
          <div className="flex-1 p-4 flex flex-col gap-4 text-[14px]">
            <div className="flex gap-3">
              <span className="w-8 h-8 shrink-0 rounded-[3px] bg-[#DDE4F0] grid place-items-center text-[12px] font-semibold text-[#3E4555]">AR</span>
              <div className="min-w-0"><div className="font-semibold">Aisha Rahman <span className="cs-mono font-normal text-[11px] text-[#5F6676]">09:12</span></div><p className="m-0 text-[#3E4555]">Budget draft is up. Comments by Friday please; finance signs off Monday.</p>
                <div className="mt-2 flex flex-wrap items-center gap-2 px-3 py-2 rounded-[3px] border border-[#E6E9EF] w-fit max-w-full">
                  <span className="text-[13px] font-medium">Q4-budget-v3.xlsx</span>
                  <span className="text-[11px] px-1.5 py-0.5 rounded-[2px] bg-[#FFF1DC] text-[#8A4F00]">Confidential</span>
                  <span className="text-[12px] text-[#5F6676]">Shared with 8</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="w-8 h-8 shrink-0 rounded-[3px] bg-[#E3EDE8] grid place-items-center text-[12px] font-semibold text-[#3E4555]">TH</span>
              <div><div className="font-semibold">Tom Hughes <span className="cs-mono font-normal text-[11px] text-[#5F6676]">09:31</span></div><p className="m-0 text-[#3E4555]">Booked the review for Thursday 14:00.</p></div>
            </div>
            <div className="rounded-[3px] bg-[#F5F6F8] border border-[#E6E9EF] p-3">
              <div className="text-[12px] font-medium text-[#1D4ED8]">Summary by Sage Brain</div>
              <ul className="m-0 mt-1.5 pl-4 text-[13px] text-[#3E4555] space-y-0.5">
                <li>Budget v3 needs comments by Friday</li><li>Finance sign-off Monday</li><li>Review: Thursday 14:00, 4 attendees</li>
              </ul>
            </div>
            <div className="mt-auto rounded-[3px] border border-[#DCE0E7] px-3 py-2.5 text-[13px] text-[#5F6676]">Message # q4-planning</div>
          </div>
        </div>
      </div>
    </Window>
  );
}

/* ── Sentinel: detections and telemetry ──────────────────────── */
const SEV = { Critical: 'bg-[#4A1C17] text-[#FFB4AB]', High: 'bg-[#3D2A10] text-[#FFB95F]', Medium: 'bg-[#1E2A44] text-[#B4C5FF]', Low: 'bg-[#1B2433] text-[#AEB6C8]' };
function Sentinel() {
  const rows = [
    ['03:07:12', 'Critical', 'Mailbox rule forwards invoices externally', 'finance-user-04', 'Contained'],
    ['03:05:40', 'High', 'Impossible travel: London to Lagos in 17 min', 'finance-user-04', 'Investigating'],
    ['02:58:03', 'Medium', 'Macro-enabled attachment opened', 'LT-2291', 'Isolated'],
    ['02:41:55', 'Medium', 'Lookalike domain in inbound mail', '6 recipients', 'Quarantined'],
    ['01:12:20', 'Low', 'TLS 1.0 still enabled on mail relay', 'mx-02', 'Ticket raised'],
  ];
  const wave = 'M0 40 L20 34 L40 37 L60 30 L80 33 L100 22 L120 28 L140 26 L160 31 L180 18 L200 24 L220 21 L240 29 L260 25 L280 33 L300 27 L320 30 L340 24 L360 28 L380 20 L400 26';
  return (
    <Window title="Sage Sentinel" meta="Detections" dark>
      <div className="p-4 sm:p-5 flex flex-col gap-5">
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-[13px]">
          {[['Open', '14'], ['Investigating', '3'], ['Closed today', '41'], ['Mean time to contain', '6m 40s']].map(([k, v]) => (
            <div key={k}><div className="text-[#8D96AA]">{k}</div><div className="cs-tnum text-[20px] font-semibold text-white">{v}</div></div>
          ))}
        </div>
        <div>
          <div className="flex justify-between text-[12px] text-[#8D96AA]"><span>Events per second, last 60 min</span><span className="cs-mono text-[#DCE1FB]">2,418 eps</span></div>
          <div className="mt-2 h-14 overflow-hidden border-b border-[#1E2638]" aria-hidden="true">
            <svg className="cs-drift h-full" width="200%" viewBox="0 0 800 48" preserveAspectRatio="none">
              <path d={wave} fill="none" stroke="#44D8F1" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              <path d={wave} transform="translate(400 0)" fill="none" stroke="#44D8F1" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
        </div>
        <table className="w-full text-left text-[13px] border-collapse">
          <thead className="text-[12px] text-[#8D96AA]">
            <tr className="border-b border-[#1E2638]"><th className="py-2 pr-3 font-normal">Time</th><th className="py-2 pr-3 font-normal">Severity</th><th className="py-2 pr-3 font-normal">Detection</th><th className="py-2 pr-3 font-normal hidden lg:table-cell">Entity</th><th className="py-2 font-normal hidden sm:table-cell">Status</th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]} className="border-b border-[#161D2D] align-top">
                <td className="cs-mono py-2.5 pr-3 text-[#8D96AA] whitespace-nowrap">{r[0]}</td>
                <td className="py-2.5 pr-3"><span className={`text-[11px] px-1.5 py-0.5 rounded-[2px] ${SEV[r[1]]}`}>{r[1]}</span></td>
                <td className="py-2.5 pr-3 text-[#DCE1FB]">{r[2]}</td>
                <td className="cs-mono py-2.5 pr-3 text-[#AEB6C8] hidden lg:table-cell whitespace-nowrap">{r[3]}</td>
                <td className="py-2.5 text-[#AEB6C8] hidden sm:table-cell whitespace-nowrap">{r[4]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Window>
  );
}

/* ── Brain: a decision with evidence, waiting for approval ───── */
function Brain() {
  const [state, setState] = useState('pending');
  const evidence = [
    ['Nexus', '6 staff opened an email from a lookalike invoice domain at 02:41', 'strong'],
    ['Sentinel', 'finance-user-04 signed in from two countries 17 minutes apart', 'strong'],
    ['Sentinel', 'A new inbox rule forwards invoices to an external address', 'strong'],
    ['Vault', 'Finance team last completed phishing practice 11 months ago', 'context'],
  ];
  return (
    <Window title="Sage Brain" meta="Decision D-2291">
      <div className="p-4 sm:p-5 flex flex-col gap-4 text-[14px]">
        <div>
          <div className="text-[12px] text-[#5F6676]">Question from the SOC</div>
          <p className="m-0 mt-1 text-[16px] font-medium">Is last night&rsquo;s login spike linked to Monday&rsquo;s phishing email?</p>
        </div>
        <div>
          <div className="text-[12px] text-[#5F6676] mb-1.5">Evidence used</div>
          <ul className="m-0 p-0 list-none border-t border-[#E6E9EF]">
            {evidence.map(([src, txt, w], i) => (
              <li key={i} className="flex gap-3 py-2 border-b border-[#E6E9EF]">
                <span className="w-16 shrink-0 text-[12px] font-medium text-[#3E4555]">{src}</span>
                <span className="flex-1 text-[#3E4555]">{txt}</span>
                <span className={`hidden sm:inline text-[11px] self-start mt-0.5 ${w === 'strong' ? 'text-[#0C1324]' : 'text-[#5F6676]'}`}>{w}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[3px] bg-[#F5F6F8] border border-[#E6E9EF] p-3.5">
          <div className="flex flex-wrap items-baseline justify-between gap-2"><span className="font-semibold">Likely account takeover</span><span className="cs-mono text-[12px] text-[#3E4555]">confidence 0.86</span></div>
          <p className="m-0 mt-1 text-[#3E4555]">Proposed: reset credentials for 4 accounts, remove the forwarding rule, and assign the Vault phishing investigation to finance.</p>
        </div>
        {state === 'pending' && (
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" className="cs-btn cs-btn-primary" onClick={() => setState('approved')}>Approve actions</button>
            <button type="button" className="cs-btn cs-btn-secondary" onClick={() => setState('rejected')}>Reject</button>
            <span className="text-[12px] text-[#5F6676]">Needs approval: affects user accounts</span>
          </div>
        )}
        {state === 'approved' && (
          <div className="cs-swap flex flex-wrap items-center justify-between gap-2 rounded-[3px] border border-[#BFE6EC] bg-[#EAF7F9] px-3.5 py-2.5 text-[13px] text-[#0B5E6B]">
            <span>Approved. Sentinel playbook PB-07 is resetting 4 accounts; the Vault exercise is assigned.</span>
            <button type="button" className="cs-link text-[13px]" onClick={() => setState('pending')}>Undo</button>
          </div>
        )}
        {state === 'rejected' && (
          <div className="cs-swap flex flex-wrap items-center justify-between gap-2 rounded-[3px] border border-[#DCE0E7] bg-white px-3.5 py-2.5 text-[13px] text-[#3E4555]">
            <span>Rejected. No changes made; the case stays open for an analyst.</span>
            <button type="button" className="cs-link text-[13px]" onClick={() => setState('pending')}>Undo</button>
          </div>
        )}
      </div>
    </Window>
  );
}

/* ── Vault: a lab in progress ────────────────────────────────── */
function Vault() {
  const tasks = [
    ['Find the account with the most failed logins', true],
    ['Identify the source IP range', true],
    ['Confirm whether any login succeeded', true],
    ['Block the range on the edge firewall', false],
    ['Write a two-line incident summary', false],
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-3">
      <div className="rounded-[4px] border border-[#DCE0E7] bg-white p-4 sm:p-5 flex flex-col gap-4">
        <div className="flex items-baseline justify-between gap-3"><span className="text-[12px] text-[#5F6676]">Lab 3 of SOC Analyst Fundamentals</span><span className="cs-mono text-[12px] text-[#8A4F00]">34:12 left</span></div>
        <div className="text-[17px] font-semibold leading-snug">SSH brute force on a public server</div>
        <ol className="m-0 pl-0 list-none flex flex-col">
          {tasks.map(([t, done], i) => (
            <li key={i} className="flex gap-3 py-2 border-b border-[#E6E9EF] text-[14px]">
              <span className={`mt-0.5 w-4 h-4 shrink-0 rounded-[2px] border grid place-items-center ${done ? 'bg-[#0C1324] border-[#0C1324]' : 'border-[#C5CBD6]'}`} aria-hidden="true">
                {done && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><path d="M5 12l4 4 10-10" /></svg>}
              </span>
              <span className={done ? 'text-[#5F6676] line-through decoration-[#C5CBD6]' : 'text-[#0C1324]'}>{t}</span>
            </li>
          ))}
        </ol>
        <div className="text-[13px] text-[#5F6676]">3 of 5 complete. Scored on what you did in the environment, not on quiz answers.</div>
      </div>
      <Window title="analyst@vault-lab-03" meta="ubuntu 22.04" dark>
        <pre className="cs-mono m-0 p-4 text-[12.5px] leading-[1.7] text-[#C9D2E6] whitespace-pre-wrap break-words min-h-[300px]">
<span className="text-[#44D8F1]">$</span> grep "Failed password" /var/log/auth.log | wc -l{'\n'}
<span className="text-white">4127</span>{'\n'}
<span className="text-[#44D8F1]">$</span> grep "Failed password" /var/log/auth.log | awk '{'{'}print $11{'}'}' | sort | uniq -c | sort -rn | head -3{'\n'}
<span className="text-white">   3982 203.0.113.47{'\n'}     91 203.0.113.52{'\n'}     54 10.0.4.18</span>{'\n'}
<span className="text-[#44D8F1]">$</span> grep "Accepted" /var/log/auth.log | grep 203.0.113{'\n'}
<span className="text-[#8D96AA]">(no output)</span>{'\n'}
<span className="text-[#44D8F1]">$</span> sudo ufw deny from 203.0.113.0/24<span className="cs-caret inline-block w-2 h-4 align-[-2px] ml-0.5 bg-[#DCE1FB]" />
        </pre>
      </Window>
    </div>
  );
}

/* ── Education: institutional architecture ───────────────────── */
function Education() {
  const tenants = [
    { name: "St. Xavier's College", colour: '#7A1F2B', mods: ['Admissions', 'Assessment', 'Finance', 'Library'] },
    { name: 'Ridgeview University', colour: '#1F5A3A', mods: ['Admissions', 'Campus', 'Placements', 'Hostel', 'Transport'] },
    { name: 'Your institution', colour: null, mods: ['Choose modules'] },
  ];
  const Layer = ({ label, children }) => (
    <div className="grid grid-cols-1 sm:grid-cols-[120px_minmax(0,1fr)] gap-2 sm:gap-4 items-start">
      <div className="text-[12px] text-[#5F6676] sm:pt-3">{label}</div>
      {children}
    </div>
  );
  return (
    <div className="rounded-[4px] border border-[#DCE0E7] bg-white p-4 sm:p-6 flex flex-col gap-5">
      <Layer label="Tenants">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {tenants.map((t) => (
            <div key={t.name} className={`rounded-[3px] p-3 border ${t.colour ? 'border-[#DCE0E7]' : 'border-dashed border-[#C5CBD6]'}`}>
              <div className="flex items-center gap-2 text-[14px] font-semibold">
                <span className="w-3 h-3 rounded-[2px]" style={{ background: t.colour || 'transparent', border: t.colour ? 'none' : '1px dashed #C5CBD6' }} />{t.name}
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {t.mods.map((m) => <span key={m} className="text-[12px] px-1.5 py-0.5 rounded-[2px] bg-[#F1F3F6] text-[#3E4555]">{m}</span>)}
              </div>
              <div className="mt-2 text-[11px] text-[#5F6676]">{t.colour ? 'Own domain, own branding' : 'Onboarded in weeks, not terms'}</div>
            </div>
          ))}
        </div>
      </Layer>
      <Layer label="Modules">
        <div className="flex flex-wrap gap-1.5">
          {['Admissions', 'Campus', 'Communication', 'Assessment', 'Finance', 'Placements', 'Library', 'Hostel', 'Transport'].map((m) => (
            <span key={m} className="text-[13px] px-2.5 py-1.5 rounded-[3px] border border-[#DCE0E7] text-[#0C1324]">{m}</span>
          ))}
        </div>
      </Layer>
      <Layer label="Shared core">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#DCE0E7] border border-[#DCE0E7] rounded-[3px] overflow-hidden text-[13px]">
          {['Identity and roles', 'Tenant data isolation', 'Messaging via Nexus', 'Audit log'].map((c) => <div key={c} className="bg-[#F7F8FA] px-3 py-2.5">{c}</div>)}
        </div>
      </Layer>
      <Layer label="Infrastructure">
        <div className="rounded-[3px] bg-[#0C1324] text-[#DCE1FB] px-3 py-2.5 text-[13px] flex flex-wrap items-center justify-between gap-2">
          <span>Hosted platform, monitored by Sage Sentinel</span>
          <span className="flex items-center gap-2 text-[12px] text-[#AEB6C8]"><span className="cs-live w-1.5 h-1.5 rounded-full bg-[#44D8F1]" />Monitoring</span>
        </div>
      </Layer>
    </div>
  );
}

const VISUALS = { nexus: Nexus, education: Education, vault: Vault, sentinel: Sentinel, brain: Brain };

export default function ProductVisual({ product, caption = true }) {
  const V = VISUALS[product.slug];
  return (
    <figure className="m-0">
      <V />
      {caption && <figcaption className="mt-3 text-[13px] leading-relaxed text-[#5F6676]">{product.figure} Sample data.</figcaption>}
    </figure>
  );
}
