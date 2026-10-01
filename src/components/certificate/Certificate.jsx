import React, { useLayoutEffect, useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

/*
  The CyberSage certificate, drawn in HTML so it can be rendered from a record
  entered in the admin panel. Matches the printed certificate layout.
  Fixed 1536×1024 artboard, scaled to fit its container.
*/

export const CERT_W = 1536;
export const CERT_H = 1024;
const INK = '#16233A';
const BLUE = '#2F6DB5';
const MONT = "'Montserrat', 'Archivo', system-ui, sans-serif";
const SCRIPT = "'Great Vibes', 'Brush Script MT', cursive";

// Defaults per certificate type (copied from the issued certificates)
export const CERT_TEMPLATES = {
  completion: {
    label: 'Internship completion',
    title: 'INTERNSHIP COMPLETION',
    leadIn: 'THIS IS TO CERTIFY THAT',
    body: 'has successfully completed the CyberSage Internship Program, demonstrating dedication, aptitude and a strong commitment to learning in the field of cybersecurity.',
    durationLabel: 'INTERNSHIP DURATION',
    tagline: false,
    medal: false,
  },
  best: {
    label: 'Best performer',
    title: 'BEST PERFORMER',
    leadIn: 'AWARDED TO',
    body: 'In recognition of your outstanding performance, dedication, and exceptional contribution during the CyberSage Internship Program.\nYour commitment, skills and drive have set a benchmark for excellence. Keep building, keep achieving!',
    durationLabel: 'INTERNSHIP DURATION',
    tagline: true,
    medal: true,
  },
};

const MONTHS = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
const ord = (n) => { const s = ['th', 'st', 'nd', 'rd']; const v = n % 100; return n + (s[(v - 20) % 10] || s[v] || s[0]); };
export const certDate = (iso) => {
  if (!iso) return '';
  const d = new Date(`${String(iso).slice(0, 10)}T00:00:00`);
  if (Number.isNaN(d.getTime())) return '';
  return `${ord(d.getDate())} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
};

// Merge a stored record with its template defaults
export function resolveCertificate(rec) {
  const t = CERT_TEMPLATES[rec.type] || CERT_TEMPLATES.completion;
  return {
    ...t,
    ...Object.fromEntries(Object.entries(rec).filter(([, v]) => v !== undefined && v !== null && v !== '')),
  };
}

function Rule({ w = 80 }) { return <span style={{ display: 'inline-block', width: w, height: 1.5, background: BLUE, opacity: 0.8 }} />; }

function Laurel({ flip }) {
  const leaves = Array.from({ length: 7 }, (_, i) => i);
  return (
    <svg width="70" height="150" viewBox="0 0 70 150" style={{ transform: flip ? 'scaleX(-1)' : 'none' }} aria-hidden="true">
      <path d="M52 146 C 22 120, 14 70, 34 6" fill="none" stroke={BLUE} strokeWidth="2.5" strokeLinecap="round" />
      {leaves.map((i) => {
        const t = i / 6; const y = 136 - t * 120; const x = 46 - Math.sin(t * 2.6) * 22;
        return (
          <g key={i} transform={`translate(${x} ${y})`}>
            <ellipse cx="-9" cy="-4" rx="11" ry="4.5" transform="rotate(-35)" fill={BLUE} />
            <ellipse cx="9" cy="-6" rx="10" ry="4" transform="rotate(-70)" fill="#4E86C8" />
          </g>
        );
      })}
    </svg>
  );
}

export function CertificateArt({ cert, verifyBase = 'https://cybersage.uk/verify' }) {
  const c = resolveCertificate(cert);
  const qr = `${verifyBase}?code=${encodeURIComponent(c.code || '')}`;
  const duration = c.from && c.to ? `${certDate(c.from)} to ${certDate(c.to)}` : '';
  const titleSize = c.title.length > 18 ? 76 : (c.medal ? 80 : 86);
  const tight = !!c.medal; // the best-performer layout carries more content
  return (
    <div style={{ position: 'relative', width: CERT_W, height: CERT_H, background: 'linear-gradient(180deg,#F7F8FA 0%,#F1F3F6 100%)', color: INK, overflow: 'hidden', fontFamily: MONT }}>
      {/* watermark */}
      <div aria-hidden="true" style={{ position: 'absolute', right: -170, top: 250, width: 560, height: 370, overflow: 'hidden', opacity: 0.05 }}>
        <img src="/brand/cert/logo.png" alt="" style={{ width: 560, display: 'block' }} />
      </div>
      {/* frame */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: '24px 28px 28px 28px', border: `2px solid ${INK}`, borderRadius: 10, clipPath: 'polygon(150px 0, 100% 0, 100% calc(100% - 150px), calc(100% - 150px) 100%, 0 100%, 0 150px)' }} />
      {/* corner stripes */}
      <svg aria-hidden="true" width="230" height="200" style={{ position: 'absolute', left: 0, top: 0 }}>
        <polygon points="0,0 130,0 0,120" fill="#1F2633" />
        <polygon points="150,0 172,0 0,160 0,140" fill={BLUE} />
        <polygon points="105,62 120,62 0,170 0,155" fill={BLUE} opacity="0.9" />
      </svg>
      <svg aria-hidden="true" width="230" height="200" style={{ position: 'absolute', right: 0, bottom: 0, transform: 'rotate(180deg)' }}>
        <polygon points="0,0 130,0 0,120" fill="#1F2633" />
        <polygon points="150,0 172,0 0,160 0,140" fill={BLUE} />
        <polygon points="105,62 120,62 0,170 0,155" fill={BLUE} opacity="0.9" />
      </svg>

      {/* top corners */}
      <div style={{ position: 'absolute', left: 106, top: 82, paddingLeft: 18, borderLeft: `2px solid ${BLUE}`, fontSize: 15, letterSpacing: '0.32em', lineHeight: 1.5, fontWeight: 500 }}>LEARN<br />PRACTICE<br />PROTECT</div>
      <div style={{ position: 'absolute', right: 76, top: 76, paddingRight: 14, borderRight: `2px solid ${BLUE}`, fontSize: 13, letterSpacing: '0.24em', fontWeight: 500, height: 30, display: 'flex', alignItems: 'center' }}>CYBERSAGE.UK</div>

      {/* logo */}
      <img src="/brand/cert/logo.png" alt="CyberSage" style={{ position: 'absolute', left: '50%', top: 44, height: 214, transform: 'translateX(-50%)' }} />

      <div style={{ position: 'absolute', left: 0, right: 0, top: c.tagline ? 290 : 280, textAlign: 'center' }}>
        {c.tagline && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 28, fontSize: 14, letterSpacing: '0.32em', fontWeight: 500, color: '#28456E', marginBottom: 16 }}>
            <Rule w={70} />BUILDING A SAFER CYBER REALM<Rule w={70} />
          </div>
        )}
        <div style={{ fontSize: titleSize, fontWeight: 800, letterSpacing: '0.01em', lineHeight: 1 }}>{c.title}</div>
        <div style={{ marginTop: tight ? 12 : 18, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 34 }}>
          <Rule w={170} /><span style={{ fontSize: tight ? 30 : 34, fontWeight: 600, letterSpacing: '0.42em', marginRight: '-0.42em' }}>CERTIFICATE</span><Rule w={170} />
        </div>
        <div style={{ marginTop: tight ? 24 : 40, fontSize: 17, letterSpacing: '0.3em', fontWeight: 500, color: '#203D66' }}>{c.leadIn}</div>

        <div style={{ position: 'relative', margin: '0 auto', width: 620 }}>
          {c.medal && <div style={{ position: 'absolute', left: -96, top: -26, transform: 'scale(0.8)', transformOrigin: 'top' }}><Laurel /></div>}
          {c.medal && <div style={{ position: 'absolute', right: -96, top: -26, transform: 'scale(0.8)', transformOrigin: 'top' }}><Laurel flip /></div>}
          <div style={{ fontFamily: SCRIPT, fontSize: c.name && c.name.length > 22 ? 70 : (tight ? 80 : 88), lineHeight: tight ? 1.18 : 1.25, color: '#0F1A2D', whiteSpace: 'nowrap' }}>{c.name || 'Recipient name'}</div>
          <div style={{ height: 1.5, background: BLUE, opacity: 0.7, marginTop: -6 }} />
        </div>

        <div style={{ margin: `${tight ? 14 : 22}px auto 0`, maxWidth: tight ? 720 : 820, fontSize: tight ? 19 : 21, lineHeight: tight ? 1.5 : 1.6, letterSpacing: '0.01em', color: '#1C3458' }}>
          {String(c.body || '').split('\n').filter(Boolean).map((para, i) => <p key={i} style={{ margin: i ? '12px 0 0' : 0, fontSize: i ? (tight ? 17 : 19) : undefined }}>{para}</p>)}
        </div>
        {c.medal && (
          <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
            <Rule w={76} />
            <span style={{ width: 46, height: 46, borderRadius: 99, border: `2.5px solid ${INK}`, display: 'grid', placeItems: 'center' }}>
              <svg width="26" height="26" viewBox="0 0 24 24"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.5 1.3 6.6L12 17.2l-5.9 3.3 1.3-6.6-4.9-4.5 6.6-.8z" fill={INK} /></svg>
            </span>
            <Rule w={76} />
          </div>
        )}
      </div>

      {/* signature */}
      <div style={{ position: 'absolute', left: 172, bottom: 70, width: 344, textAlign: 'center' }}>
        <img src="/brand/cert/signature.png" alt="Signature of Khurram Qamar" style={{ height: 92, display: 'block', margin: '0 auto -6px', transform: 'translateX(-30px)' }} />
        <div style={{ height: 1.5, background: INK }} />
        <div style={{ marginTop: 12, fontSize: 21, fontWeight: 500, letterSpacing: '0.04em' }}>Khurram Qamar</div>
        <div style={{ marginTop: 6, fontSize: 14, letterSpacing: '0.3em', fontWeight: 500 }}>CEO</div>
        <div style={{ marginTop: 8, fontSize: 14, letterSpacing: '0.3em', fontWeight: 600 }}>CYBERSAGE</div>
      </div>

      {/* duration */}
      {duration && (
        <div style={{ position: 'absolute', left: 590, bottom: 150, display: 'flex', gap: 22, alignItems: 'flex-start' }}>
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="1.6" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /><circle cx="8" cy="14" r=".6" fill={BLUE} /><circle cx="12" cy="14" r=".6" fill={BLUE} /><circle cx="16" cy="14" r=".6" fill={BLUE} /><circle cx="8" cy="17.5" r=".6" fill={BLUE} /><circle cx="12" cy="17.5" r=".6" fill={BLUE} /></svg>
          <div>
            <div style={{ fontSize: 16, letterSpacing: '0.28em', fontWeight: 500, color: '#203D66' }}>{c.durationLabel} :-</div>
            <div style={{ marginTop: 8, fontSize: 19, fontWeight: 600, letterSpacing: '0.04em' }}>{duration}</div>
          </div>
        </div>
      )}

      {/* QR + ID */}
      <div style={{ position: 'absolute', right: 200, bottom: 74, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <QRCodeSVG value={qr} size={102} level="M" bgColor="transparent" fgColor="#0F1A2D" />
        <div style={{ paddingTop: 6 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#203D66' }}>CERTIFICATE ID</div>
          <div style={{ marginTop: 8, fontSize: 19, fontWeight: 700, letterSpacing: '0.01em' }}>{c.code || 'CS-XXX-0000-XXXXXX'}</div>
          <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.45, color: '#2B4366' }}>Scan or verify at<br />cybersage.uk/verify</div>
        </div>
      </div>
    </div>
  );
}

// Scales the fixed artboard to the width of its container
export default function Certificate({ cert, className = '' }) {
  const box = useRef(null);
  const [s, setS] = useState(1);
  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return undefined;
    const set = () => setS(el.clientWidth / CERT_W);
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={box} className={`relative w-full overflow-hidden ${className}`} style={{ height: CERT_H * s }}>
      <div className="absolute left-0 top-0 origin-top-left" style={{ transform: `scale(${s})` }}>
        <CertificateArt cert={cert} />
      </div>
    </div>
  );
}
