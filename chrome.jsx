/* Biomarkr, shared site chrome. Header nav, footer, theme toggle,
   scroll-reveal, and small shared lockups. Composes the design-system
   components (Button, IconButton). Exports everything to window so each
   page's script can mount it. */

const { Button, IconButton } = window.BiomarkrDesignSystem_734cca;

/* ---------- Icons (2px stroke, brand line style) ---------- */
const Sun = (p) => <svg width={p.size || 20} height={p.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>;
const Moon = (p) => <svg width={p.size || 20} height={p.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>;
const ArrowRight = (p) => <svg width={p.size || 16} height={p.size || 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>;
const Menu = (p) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>;
const Close = (p) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>;
const LinkedIn = (p) => <svg width={p.size || 18} height={p.size || 18} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>;

const Mail = (p) => <svg width={p.size || 20} height={p.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>;
const Phone = (p) => <svg width={p.size || 20} height={p.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>;
const MapPin = (p) => <svg width={p.size || 20} height={p.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>;

const NAV = [
{ key: 'home', label: 'Home', href: '/' },
{ key: 'technology', label: 'Technology', href: '/technology' },
{ key: 'inflammation', label: 'Why inflammation', href: '/inflammation' },
{ key: 'practice', label: 'Use cases', href: '/use-cases' }];


/* ---------- Theme hook (persisted, no flash) ---------- */
function useTheme() {
  const [theme, setTheme] = React.useState(() => document.documentElement.getAttribute('data-theme') || 'light');
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.setProperty('--logo-invert', theme === 'dark' ? 1 : 0);
    try {localStorage.setItem('bm-theme', theme);} catch (e) {}
  }, [theme]);
  return [theme, () => setTheme((t) => t === 'light' ? 'dark' : 'light')];
}

/* ---------- Scroll reveal ---------- */
function Reveal({ children, delay = 0, as = 'div', style = {}, className = '' }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;if (!el) return;
    let done = false;
    const show = () => {
      if (done) return;done = true;
      el.classList.add('in');
      // Safety: if transitions are frozen (throttled/background render), force the
      // final visible state so content is never stuck hidden.
      setTimeout(() => {
        if (parseFloat(getComputedStyle(el).opacity) < 0.9) {
          el.style.transition = 'none';el.style.opacity = '1';el.style.transform = 'none';
        }
      }, 1500);
    };
    let io;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver((es) => {
        es.forEach((e) => {if (e.isIntersecting) {show();io.disconnect();}});
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      io.observe(el);
    }
    // In/near viewport at mount → reveal almost immediately (short delay lets the transition play).
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
      const t = setTimeout(show, 60);
      return () => {clearTimeout(t);if (io) io.disconnect();};
    }
    // Below the fold → IO reveals on scroll, with a safety net if IO stays silent.
    const t = setTimeout(show, 2600);
    return () => {clearTimeout(t);if (io) io.disconnect();};
  }, []);
  return React.createElement(as, { ref, className: 'reveal ' + className, style: { transitionDelay: delay + 'ms', ...style } }, children);
}

/* ---------- Eyebrow + rule lockup ---------- */
function Lockup({ eyebrow, title, align = 'left', sub, style = {} }) {
  return (
    <header style={{ display: 'flex', flexDirection: 'column', alignItems: align === 'center' ? 'center' : 'flex-start', textAlign: align, ...style }}>
      <span className="rule" style={{ marginBottom: 22 }} />
      {eyebrow && <span className="eyebrow" style={{ marginBottom: 14 }}>{eyebrow}</span>}
      {title && <h2 style={{ margin: 0, fontSize: 'clamp(28px,3.6vw,42px)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1.12 }}>{title}</h2>}
      {sub && <p className="prose" style={{ maxWidth: 620, marginTop: 20, marginBottom: 0, textAlign: align }}>{sub}</p>}
    </header>);

}

/* ---------- Header ---------- */
/* ---------- Contact modal ---------- */
function ContactModal({ open, onClose }) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {if (e.key === 'Escape') onClose();};
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {document.removeEventListener('keydown', onKey);document.body.style.overflow = prev;};
  }, [open, onClose]);
  if (!open) return null;
  const rows = [
  { icon: <Mail size={19} />, label: 'Email', value: 'info@biomarkr.health', href: 'mailto:info@biomarkr.health', ext: false },
  { icon: <Phone size={19} />, label: 'Phone', value: '510-225-5415', href: 'tel:+15102255415', ext: false },
  { icon: <MapPin size={19} />, label: 'Location', value: '1176 Tourmaline Drive, Thousand Oaks, CA 91360', href: 'https://www.google.com/maps/search/?api=1&query=1176+Tourmaline+Drive+Thousand+Oaks+CA+91360', ext: true }];

  return (
    <div className="contact-overlay" onClick={onClose}>
      <div className="contact-card" role="dialog" aria-modal="true" aria-label="Get in touch" onClick={(e) => e.stopPropagation()}>
        <button className="contact-close" onClick={onClose} aria-label="Close"><Close /></button>
        <span className="rule" style={{ marginBottom: 16 }} />
        <h2 className="contact-title">Get in touch</h2>
        <p className="contact-sub">We're talking with research partners and clinicians. Reach us directly.</p>
        <div className="contact-rows">
          {rows.map((r) =>
          <a key={r.label} className="contact-row" href={r.href} target={r.ext ? '_blank' : undefined} rel={r.ext ? 'noopener noreferrer' : undefined}>
              <span className="contact-ic">{r.icon}</span>
              <span className="contact-text">
                <span className="contact-label">{r.label}</span>
                <span className="contact-value">{r.value}</span>
              </span>
            </a>
          )}
        </div>
      </div>
    </div>);

}

function SiteHeader({ active }) {
  React.useEffect(() => {document.documentElement.setAttribute('data-theme', 'light');document.documentElement.style.setProperty('--logo-invert', '0');}, []);
  const [open, setOpen] = React.useState(false);
  const [contactOpen, setContactOpen] = React.useState(false);
  React.useEffect(() => {document.body.style.overflow = open ? 'hidden' : '';}, [open]);
  return (
    <React.Fragment>
      <header className="site-header">
        <a href="/" aria-label="Biomarkr home" style={{ display: 'flex', alignItems: 'center' }}>
          <img className="brandmark" src="/assets/logo-wordmark-black.png" alt="biomarkr" />
        </a>
        <nav className="navpill center">
          {NAV.map((n) =>
          <a key={n.key} href={n.href} className={'navlink' + (active === n.key ? ' active' : '')}>{n.label}</a>
          )}
        </nav>
        <div className="nav-right">
          <button className="btn btn-primary nav-email" onClick={() => setContactOpen(true)}>Get in touch</button>
          <button className="mobile-toggle btn btn-ghost" style={{ padding: 10 }} aria-label="Menu" onClick={() => setOpen(true)}><Menu /></button>
        </div>
      </header>
      <div className={'mobile-sheet' + (open ? ' open' : '')}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <img className="brandmark" src="/assets/logo-wordmark-black.png" alt="biomarkr" />
          <button className="btn btn-ghost" style={{ padding: 10 }} aria-label="Close" onClick={() => setOpen(false)}><Close /></button>
        </div>
        {NAV.map((n) => <a key={n.key} href={n.href}>{n.label}</a>)}
        <a href="/cytokines">Cytokine model</a>
        <a href="/faq">FAQ</a>
        <button onClick={() => {setOpen(false);setContactOpen(true);}} style={{ border: 'none', background: 'none', padding: 0, marginTop: 20, textAlign: 'left', cursor: 'pointer' }}>
          <span className="btn btn-primary">Get in touch</span>
        </button>
      </div>
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </React.Fragment>);

}

/* ---------- Footer ---------- */
function SiteFooter() {
  const cols = [
  { h: 'Explore', items: [['Technology', '/technology'], ['Why inflammation', '/inflammation'], ['Use cases', '/use-cases'], ['Cytokine model', '/cytokines']] },
  { h: 'Company', items: [['FAQ', '/faq'], ['Contact', 'mailto:info@biomarkr.health']] },
  { h: 'Contact', items: [['info@biomarkr.health', 'mailto:info@biomarkr.health'], ['1176 Tourmaline Drive, Thousand Oaks, CA 91360', null], ['LinkedIn', 'https://www.linkedin.com/company/biomarkr/']] }];

  return (
    <footer className="site-footer">
      <div style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '64px 48px', justifyContent: 'space-between' }}>
        <div style={{ flex: '1 1 280px', minWidth: 240 }}>
          <img src="/assets/logo-wordmark-white.png" alt="biomarkr" style={{ height: 26 }} />
          <p className="serif" style={{ fontSize: 20, lineHeight: 1.4, color: 'var(--grey-250)', margin: '26px 0 0', maxWidth: 320 }}>Monitor, detect, prevent.</p>
          <p style={{ fontSize: 14, color: 'var(--grey-400)', lineHeight: 1.7, marginTop: 18, maxWidth: 340 }}>Silicon photonic biosensors making blood testing roughly 25× faster and cheaper, building a personal immune baseline with the goal of catching disease before symptoms appear.</p>
        </div>
        <div style={{ display: 'flex', gap: '56px', flexWrap: 'wrap' }}>
          {cols.map((c) =>
          <div key={c.h}>
              <h4>{c.h}</h4>
              {c.items.map(([label, href]) => href ? <a key={label} href={href}>{label}</a> : <span key={label} style={{ color: 'var(--grey-350)', fontSize: 14, display: 'block', padding: '5px 0', maxWidth: 220 }}>{label}</span>)}
            </div>
          )}
        </div>
      </div>
      <div style={{ maxWidth: 1240, margin: '56px auto 0', paddingTop: 28, borderTop: '1px solid var(--paper-a10)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontSize: 13, color: 'var(--grey-400)' }}>
        <span>© 2026 Biomarkr · Proactive Dx Inc.</span>
        <span style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>Monitor, detect, prevent.</span>
      </div>
    </footer>);

}

/* ---------- Interior page hero ---------- */
function PageHero({ eyebrow, title, lead, children }) {
  return (
    <section style={{ padding: 'clamp(60px,10vh,120px) 0 clamp(40px,6vh,72px)' }}>
      <div className="wrap">
        <Reveal>
          <span className="rule" style={{ marginBottom: 26 }} />
          <div className="eyebrow" style={{ marginBottom: 18 }}>{eyebrow}</div>
          <h1 style={{ margin: 0, fontSize: 'clamp(42px,5.6vw,80px)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.02, maxWidth: 980 }}>{title}</h1>
          {lead && <p className="lead" style={{ maxWidth: 660, marginTop: 28, color: 'var(--text-secondary)' }}>{lead}</p>}
          {children}
        </Reveal>
      </div>
    </section>);

}

/* ---------- Inline CTA band ---------- */
function CTABand({ title, body, primary, primaryHref, secondary, secondaryHref }) {
  return (
    <section style={{ background: 'var(--surface-inverse)', color: 'var(--text-inverse)', padding: 'clamp(64px,9vh,104px) 8%' }}>
      <div className="r-cta" style={{ maxWidth: 1240, margin: '0 auto', gap: 48, alignItems: 'center' }}>
        <div>
          <span className="rule" style={{ background: 'var(--white)', marginBottom: 22 }} />
          <h2 style={{ margin: 0, fontSize: 'clamp(32px,4.2vw,50px)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1.1, color: 'var(--white)' }}>{title}</h2>
        </div>
        <div>
          {body && <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--grey-250)', marginTop: 0 }}>{body}</p>}
          <div style={{ display: 'flex', gap: 12, marginTop: 26, flexWrap: 'wrap' }}>
            <a className="btn" href={primaryHref} style={{ background: 'var(--white)', color: 'var(--black)' }}>{primary} <ArrowRight /></a>
            {secondary && <a className="btn" href={secondaryHref} style={{ border: '1px solid var(--paper-a12)', color: 'var(--white)' }}>{secondary}</a>}
          </div>
        </div>
      </div>
    </section>);

}

/* ---------- Monochrome longitudinal trajectory (SVG) ---------- */
function Trajectory({ width = 520, height = 230, lines, baseline = true, labels, bandLabel }) {
  const pad = { l: 8, r: 8, t: 14, b: 18 };
  const all = lines.flatMap((l) => l.data);
  const max = Math.max(...all) * 1.08,min = 0;
  const n = lines[0].data.length;
  const px = (i) => pad.l + i * (width - pad.l - pad.r) / (n - 1);
  const py = (v) => height - pad.b - (v - min) / (max - min) * (height - pad.t - pad.b);
  const toPath = (d) => d.map((v, i) => `${i ? 'L' : 'M'} ${px(i).toFixed(1)} ${py(v).toFixed(1)}`).join(' ');
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ display: 'block', overflow: 'visible' }}>
      {[0.25, 0.5, 0.75].map((g) =>
      <line key={g} x1={pad.l} x2={width - pad.r} y1={pad.t + g * (height - pad.t - pad.b)} y2={pad.t + g * (height - pad.t - pad.b)} stroke="var(--border-subtle)" strokeWidth="1" />
      )}
      {baseline && <rect x={pad.l} y={py(max * 0.22)} width={width - pad.l - pad.r} height={py(0) - py(max * 0.22)} fill="var(--surface-tint)" opacity="0.7" />}
      {baseline && <line x1={pad.l} x2={width - pad.r} y1={py(max * 0.22)} y2={py(max * 0.22)} stroke="var(--border-default)" strokeWidth="1" strokeDasharray="3 3" />}
      {lines.map((l, li) =>
      <g key={li}>
          <path d={toPath(l.data)} fill="none" stroke={li === 0 ? 'var(--text-primary)' : 'var(--text-tertiary)'} strokeWidth={li === 0 ? 2 : 1.4} strokeDasharray={l.dash || '0'} strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={px(n - 1)} cy={py(l.data[n - 1])} r="3" fill={li === 0 ? 'var(--text-primary)' : 'var(--text-tertiary)'} />
        </g>
      )}
      {labels && labels.map((t, i) =>
      <text key={i} x={px(i)} y={height - 4} fontSize="9" fontFamily="var(--font-mono)" fill="var(--text-tertiary)" textAnchor={i === 0 ? 'start' : i === labels.length - 1 ? 'end' : 'middle'} letterSpacing="0.04em">{t}</text>
      )}
    </svg>);

}

/* ---------- Scroll-spy section indicator ---------- */
function ScrollSpy({ sections }) {
  const [active, setActive] = React.useState(0);
  const [hidden, setHidden] = React.useState(false);
  React.useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const els = sections.map((s) => document.getElementById(s.id));
        const mid = window.innerHeight * 0.4;
        let idx = 0;
        els.forEach((el, i) => {if (el && el.getBoundingClientRect().top <= mid) idx = i;});
        setActive(idx);
        const last = els[els.length - 1];
        setHidden(!!last && last.getBoundingClientRect().bottom < window.innerHeight * 0.5);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {window.removeEventListener('scroll', onScroll);window.removeEventListener('resize', onScroll);if (raf) cancelAnimationFrame(raf);};
  }, [sections]);
  const go = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 8, behavior: 'smooth' });
  };
  return (
    <nav className="scrollspy" aria-label="Section navigation" style={{ opacity: hidden ? 0 : 1, pointerEvents: hidden ? 'none' : 'auto' }}>
      {sections.map((s, i) =>
      <button key={s.id} className={'scrollspy-dot' + (i === active ? ' active' : '')} onClick={() => go(s.id)} aria-current={i === active ? 'true' : undefined} aria-label={s.label}>
          <span className="scrollspy-mark" />
          <span className="scrollspy-label">{s.label}</span>
        </button>
      )}
    </nav>);

}

Object.assign(window, { BM_useTheme: useTheme, BM_Reveal: Reveal, BM_Lockup: Lockup, BM_PageHero: PageHero, BM_CTABand: CTABand, BM_Trajectory: Trajectory, BM_ScrollSpy: ScrollSpy, SiteHeader, SiteFooter, BM_Icons: { Sun, Moon, ArrowRight, Menu, Close, LinkedIn }, BM_NAV: NAV });