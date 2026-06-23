/* Biomarkr, Home page. Three switchable hero concepts (for review),
   then thesis, metrics, hardware/software teasers, device showcase,
   in-practice teaser, team, and CTA. Composes design-system primitives
   plus the shared chrome. */

const { Avatar, BiomarkerReadout, Card, Badge } = window.BiomarkrDesignSystem_734cca;
/* ArrowRight, Reveal, Lockup, SiteHeader, SiteFooter are global declarations from chrome.jsx */

/* ArrowRight, Reveal, Lockup, SiteHeader, SiteFooter, Trajectory are global declarations from chrome.jsx */

/* Core Inflammation Panel, modeled fold-elevation over a 14-day flare,
   colored with the design-system functional signals (the same muted
   register the cytokine model uses). */
const HERO_PANEL = [
  { key: 'IL-6', color: 'var(--signal-critical)', dash: '0', data: [1, 1, 1.3, 2.2, 4, 7.5, 12, 16, 15, 11, 7.5, 5, 3.4, 2.4] },
  { key: 'TNF-α', color: 'var(--signal-caution)', dash: '0', data: [1, 1.1, 1.6, 3, 5.5, 9, 11, 10.5, 8.5, 6.5, 4.8, 3.7, 3, 2.6] },
  { key: 'IFN-γ', color: 'var(--signal-positive)', dash: '0', data: [1, 1, 1.1, 1.6, 3, 5.5, 8, 9.2, 8.5, 6.8, 5, 4, 3.4, 3] },
  { key: 'IL-10', color: 'var(--signal-info)', dash: '5 4', data: [1, 1, 1, 1.2, 2, 3.8, 6, 8.2, 9.4, 8.8, 7.5, 6, 4.8, 3.8] },
];

/* ---------- Detailed multi-cytokine panel chart (SVG) ---------- */
function PanelChart({ width = 580, height = 300 }) {
  const pad = { l: 34, r: 14, t: 16, b: 28 };
  const n = HERO_PANEL[0].data.length;
  const max = 18;
  const px = (i) => pad.l + (i * (width - pad.l - pad.r)) / (n - 1);
  const py = (v) => height - pad.b - (Math.min(v, max) / max) * (height - pad.t - pad.b);
  const toLine = (d) => d.map((v, i) => `${i ? 'L' : 'M'} ${px(i).toFixed(1)} ${py(v).toFixed(1)}`).join(' ');
  const toArea = (d) => `${toLine(d)} L ${px(n - 1).toFixed(1)} ${py(0).toFixed(1)} L ${px(0).toFixed(1)} ${py(0).toFixed(1)} Z`;
  const yticks = [1, 5, 10, 15];
  const xlabels = { 0: 'Day 1', 4: 'Day 4', 7: 'Day 7', 10: 'Day 10', 13: 'Day 14' };
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        {HERO_PANEL.map((p, i) => (
          <linearGradient key={i} id={`hp-fill-${i}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={p.color} stopOpacity="0.13" />
            <stop offset="100%" stopColor={p.color} stopOpacity="0" />
          </linearGradient>
        ))}
      </defs>
      {yticks.map((g) => (
        <g key={g}>
          <line x1={pad.l} x2={width - pad.r} y1={py(g)} y2={py(g)} stroke="var(--border-subtle)" strokeWidth="1" />
          <text x={pad.l - 8} y={py(g) + 3} fontSize="9" fontFamily="var(--font-mono)" fill="var(--text-tertiary)" textAnchor="end">{g}×</text>
        </g>
      ))}
      <line x1={pad.l} x2={width - pad.r} y1={py(1)} y2={py(1)} stroke="var(--border-strong)" strokeWidth="1" strokeDasharray="4 4" />
      <text x={width - pad.r} y={py(1) - 5} fontSize="8.5" fontFamily="var(--font-mono)" fill="var(--text-tertiary)" textAnchor="end" letterSpacing="0.06em">ULN</text>
      {HERO_PANEL.map((p, i) => <path key={'a' + i} d={toArea(p.data)} fill={`url(#hp-fill-${i})`} />)}
      {HERO_PANEL.map((p, i) => (
        <g key={'l' + i}>
          <path d={toLine(p.data)} fill="none" stroke={p.color} strokeWidth="2" strokeDasharray={p.dash} strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={px(n - 1)} cy={py(p.data[n - 1])} r="3" fill={p.color} />
        </g>
      ))}
      {Object.entries(xlabels).map(([i, t]) => (
        <text key={i} x={px(+i)} y={height - 6} fontSize="9" fontFamily="var(--font-mono)" fill="var(--text-tertiary)" textAnchor={+i === 0 ? 'start' : +i === n - 1 ? 'end' : 'middle'}>{t}</text>
      ))}
    </svg>
  );
}

/* ============================================================
   HERO CONCEPT 01, The hand (refined current site)
   ============================================================ */
function HeroHand() {
  const lines = ['Save 30M lives each year.', 'Catch disease before symptoms.', 'Make blood testing daily.'];
  const [i, setI] = React.useState(0);
  React.useEffect(() => { const t = setInterval(() => setI((p) => (p + 1) % lines.length), 3400); return () => clearInterval(t); }, []);
  return (
    <section style={{ position: 'relative', minHeight: '90vh', overflow: 'hidden', paddingBottom: '14vh' }}>
      <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', height: '80vh', display: 'flex', alignItems: 'flex-end', zIndex: 1 }}>
        <img src="/assets/website-hand.png" alt="" style={{ height: '100%', width: 'auto', objectFit: 'contain', objectPosition: 'bottom center', filter: 'drop-shadow(0 24px 60px rgba(0,0,0,0.12))', animation: 'heroRise 1.4s var(--ease-out) both' }} />
      </div>
      <div className="bm-mist" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '50vh', zIndex: 3, pointerEvents: 'none' }} />
      <div className="wrap" style={{ position: 'absolute', left: 0, right: 0, top: '64vh', zIndex: 10, display: 'flex', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap' }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Biomarkr</div>
          <div style={{ fontSize: 'clamp(26px,3vw,34px)', fontWeight: 300, lineHeight: 1.25, letterSpacing: '-0.02em' }}>Immune monitoring</div>
          <div className="eyebrow" style={{ marginTop: 10 }}>For biological intelligence</div>
        </div>
        <div style={{ width: 360, maxWidth: '100%' }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Our mission is to</div>
          <div style={{ position: 'relative', height: '2.6em' }}>
            {lines.map((l, idx) => (
              <div key={idx} style={{ position: 'absolute', top: 0, left: 0, fontSize: 'clamp(24px,2.6vw,30px)', fontWeight: 300, lineHeight: 1.25, letterSpacing: '-0.02em', opacity: i === idx ? 1 : 0, transform: i === idx ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity .6s var(--ease-out), transform .6s var(--ease-out)' }}>{l}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   HERO CONCEPT 02, Editorial statement + device
   ============================================================ */
function HeroStatement() {
  return (
    <section style={{ position: 'relative', minHeight: '88vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', overflow: 'hidden', padding: '14vh 8% 0' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 64%, var(--surface-raised) 0%, var(--surface-page) 70%)', zIndex: 0 }} />
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1000 }}>
        <div className="eyebrow" style={{ marginBottom: 26 }}>Proactive healthcare · silicon photonics</div>
        <h1 style={{ margin: 0, fontSize: 'clamp(44px,8vw,108px)', fontWeight: 300, letterSpacing: '-0.035em', lineHeight: 0.98 }}>
          From reactive<br/>to <span className="serif" style={{ fontWeight: 300, fontStyle: 'italic' }}>proactive.</span>
        </h1>
        <p className="lead" style={{ maxWidth: 580, margin: '32px auto 0', color: 'var(--text-secondary)' }}>
          A laboratory-grade immunoassay on a chip the size of a fingernail. A five-cytokine panel from a finger-prick, in under ten minutes.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 34, flexWrap: 'wrap' }}>
          <a className="btn btn-primary" href="technology.html">Explore the technology <ArrowRight/></a>
          <a className="btn btn-ghost" href="inflammation.html">Why inflammation</a>
        </div>
      </div>
      <img src="/assets/device-reader.png" alt="Q-SENS reader" style={{ position: 'relative', zIndex: 2, width: 'min(560px,80%)', marginTop: 'clamp(24px,5vh,64px)', filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.14))', animation: 'heroRise 1.3s var(--ease-out) both' }} />
    </section>
  );
}

/* ============================================================
   HERO CONCEPT 03, The signal (data forward)
   ============================================================ */
function HeroSignal() {
  return (
    <section style={{ position: 'relative', minHeight: '84vh', display: 'flex', alignItems: 'center', padding: '12vh 0 8vh' }}>
      <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'minmax(320px,1fr) minmax(380px,1.1fr)', gap: 'clamp(40px,6vw,90px)', alignItems: 'center' }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 22 }}>Inflammation monitoring</div>
          <h1 style={{ margin: 0, fontSize: 'clamp(38px,5vw,64px)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.04 }}>
            Inflammation drives three in five deaths. <span style={{ color: 'var(--text-tertiary)' }}>We made it measurable.</span>
          </h1>
          <p className="lead" style={{ maxWidth: 490, marginTop: 26, color: 'var(--text-secondary)' }}>
            Biomarkr reads a five-cytokine inflammation panel from a finger-prick in under ten minutes, turning a single snapshot into a personal immune trajectory, measured against your own baseline.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
            <a className="btn btn-primary" href="cytokine.html">See the model <ArrowRight/></a>
            <a className="btn btn-ghost" href="inflammation.html">Why inflammation</a>
          </div>
        </div>
        <Card padding="lg" elevation="float" style={{ background: 'var(--surface-page)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18, gap: 16 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.04em' }}>Core Inflammation Panel</div>
              <div style={{ fontSize: 11.5, color: 'var(--text-tertiary)', marginTop: 3 }}>Fold-elevation vs. baseline · 14-day flare</div>
            </div>
            <Badge tone="caution" dot>Active flare</Badge>
          </div>
          <PanelChart width={580} height={300} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '9px 18px', marginTop: 18 }}>
            {HERO_PANEL.map((p) => (
              <span key={p.key} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 11.5, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                <span style={{ width: 16, height: 2, background: p.color, borderRadius: 2, opacity: p.dash === '0' ? 1 : 0.9, ...(p.dash !== '0' ? { background: 'none', borderTop: '2px dashed ' + p.color, height: 0 } : {}) }} /> {p.key}
              </span>
            ))}
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 11.5, color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
              <span style={{ width: 16, height: 0, borderTop: '1px dashed var(--border-strong)' }} /> ULN
            </span>
          </div>
        </Card>
      </div>
    </section>
  );
}

const HEROES = [
  { key: 'hand', label: 'The hand', node: HeroHand },
  { key: 'statement', label: 'Statement', node: HeroStatement },
  { key: 'signal', label: 'The signal', node: HeroSignal },
];

/* ---------- Hero switcher (review affordance) ---------- */
function HeroSwitcher({ value, onChange }) {
  return (
    <div style={{ position: 'fixed', left: 20, bottom: 20, zIndex: 150, display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px 8px 14px', background: 'var(--surface-overlay)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-pill)', boxShadow: 'var(--shadow-md)' }}>
      <span className="eyebrow" style={{ fontSize: 10 }}>Hero</span>
      <div style={{ display: 'flex', gap: 3 }}>
        {HEROES.map((h, i) => (
          <button key={h.key} onClick={() => onChange(h.key)} title={h.label}
            style={{ cursor: 'pointer', border: '1px solid ' + (value === h.key ? 'var(--border-strong)' : 'var(--border-default)'), background: value === h.key ? 'var(--text-primary)' : 'transparent', color: value === h.key ? 'var(--surface-page)' : 'var(--text-secondary)', borderRadius: 'var(--radius-pill)', fontSize: 12, fontWeight: 600, padding: '5px 11px', fontFamily: 'var(--font-mono)' }}>
            {String(i + 1).padStart(2, '0')}
          </button>
        ))}
      </div>
    </div>
  );
}

const STATS = [
  ['25×', 'faster & cheaper than central-lab testing'],
  ['<10 min', 'from finger-prick to five-cytokine result'],
  ['32', 'biomarkers measurable per single chip'],
  ['97.5%', 'accuracy validated against Luminex'],
];

/* ---------- Teaser row (alternating) ---------- */
function Teaser({ eyebrow, title, body, href, cta, children, flip }) {
  return (
    <section className="hairline-top" style={{ padding: '6.5rem 0' }}>
      <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px,6vw,88px)', alignItems: 'center' }}>
        <Reveal style={{ order: flip ? 2 : 1 }}>
          <Lockup eyebrow={eyebrow} title={title} />
          <div className="prose" style={{ marginTop: 24, maxWidth: 460 }}>{body}</div>
          <a className="btn btn-ghost" href={href} style={{ marginTop: 30 }}>{cta} <ArrowRight/></a>
        </Reveal>
        <Reveal delay={120} style={{ order: flip ? 1 : 2 }}>{children}</Reveal>
      </div>
    </section>
  );
}

/* ---------- Team ---------- */
function LinkedInLink({ href, label, withText }) {
  const { LinkedIn } = window.BM_Icons;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--text-tertiary)', textDecoration: 'none', fontSize: 12.5, transition: 'color .2s var(--ease-out)' }}
      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-tertiary)'; }}>
      <LinkedIn size={withText ? 14 : 16} />{withText && <span>LinkedIn</span>}
    </a>
  );
}

function Team() {
  const team = [
    { src: 'assets/team-dylan.jpg', name: 'Dylan Brownstein', title: 'Chief Executive Officer', bio: 'Serial entrepreneur. Previously founded a VC-backed, AI-driven SaaS company. Former investor at Karcher Ventures.', li: 'https://www.linkedin.com/in/dylan-brownstein/' },
    { src: 'assets/team-reuven.jpg', name: 'Dr. Reuven Duer, PhD', title: 'Chief Science Officer', bio: 'Inventor of the Q-SENS platform. PhD in Physics, Technion. 22 issued US patents. Led BARDA-funded prototype development.', li: 'https://www.linkedin.com/in/reuvenduer/' },
    { src: 'assets/team-aren.jpg', name: 'Dr. Aren Giske, MD', title: 'Chief Operating Officer', bio: 'Twice-appointed medical director. Board member, Kadlec Medical Center. Occupational & Environmental Medicine specialist.', li: 'https://www.linkedin.com/in/arengiske/' },
  ];
  const advisors = [
    { src: 'assets/advisor-torsten.jpg', name: 'Torsten Fiebig', bio: 'Senior R&D leader and applied biophysical chemist. Postdoctoral fellow at Caltech; acting VP for Assay Development at Proactive Dx with prior experience across diagnostics and life sciences.', li: 'https://www.linkedin.com/in/torsten-fiebig-78461935/' },
    { src: 'assets/advisor-ilhui.jpg', name: 'Ilhui Hernandez', bio: 'Biologist with an MSc in Chemical Engineering. EU Erasmus Mundus scholar; specializes in bioactive compounds, longevity science, and preventive health innovation.', li: 'https://www.linkedin.com/in/ilhui-hernandez-021b1417a/' },
    { src: 'assets/advisor-larry.jpg', name: 'Larry Zulch', bio: 'Serial entrepreneur and former CEO of Photometics and PLC Diagnostics. Officer at EMC Corporation following the acquisition of Dantz Development, the company he co-founded.', li: 'https://www.linkedin.com/in/larryzulch/' },
  ];
  return (
    <section className="hairline-top" style={{ padding: '6.5rem 0' }}>
      <div className="wrap">
        <Reveal><Lockup eyebrow="Our" title="Executive team" sub="A founder team spanning silicon photonics, medicine, and company building, backed by an ISO 13485 manufacturing partner and an IQVIA regulatory team." /></Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '40px 36px', marginTop: 56 }}>
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 90}>
              <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                <Avatar src={m.src} name={m.name} size="lg" />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ fontSize: 16, fontWeight: 600 }}>{m.name}</div>
                    <LinkedInLink href={m.li} label={m.name + ' on LinkedIn'} />
                  </div>
                  <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-secondary)', margin: '2px 0 8px' }}>{m.title}</div>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--text-secondary)' }}>{m.bio}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        {/* Advisors */}
        <div className="hairline-top" style={{ marginTop: 64, paddingTop: 56 }}>
          <Reveal>
            <span className="rule" style={{ marginBottom: 18 }} />
            <span className="eyebrow">Advisors</span>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '36px 36px', marginTop: 30 }}>
            {advisors.map((a, i) => (
              <Reveal key={a.name} delay={i * 80}>
                <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                  <Avatar src={a.src} name={a.name} size="lg" />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ fontSize: 16, fontWeight: 600 }}>{a.name}</div>
                      <LinkedInLink href={a.li} label={a.name + ' on LinkedIn'} />
                    </div>
                    <p style={{ margin: '6px 0 0', fontSize: 14, lineHeight: 1.6, color: 'var(--text-secondary)' }}>{a.bio}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Device showcase ---------- */
function DeviceShowcase() {
  return (
    <section style={{ position: 'relative', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '6rem 8%', background: 'var(--surface-page)' }}>
      <h2 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 'clamp(4rem,12vw,11rem)', fontWeight: 300, opacity: 0.1, textAlign: 'center', lineHeight: 1.1, letterSpacing: '-0.03em', margin: 0, zIndex: 1, pointerEvents: 'none', whiteSpace: 'nowrap' }}>From Reactive<br/>to Proactive</h2>
      <img src="/assets/device-reader.png" alt="Q-SENS reader" style={{ position: 'relative', zIndex: 2, maxWidth: 720, width: '100%' }} />
    </section>
  );
}

/* ---------- CTA ---------- */
function CTA() {
  return (
    <section style={{ background: 'var(--surface-inverse)', color: 'var(--text-inverse)', padding: '7rem 8%' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 48, alignItems: 'center' }}>
        <div>
          <span className="rule" style={{ background: 'var(--white)', marginBottom: 24 }} />
          <h2 style={{ margin: 0, fontSize: 'clamp(32px,4.4vw,52px)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1.08, color: 'var(--white)' }}>Biomarkr is what proactive healthcare actually looks like.</h2>
        </div>
        <div>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--grey-250)', marginTop: 0 }}>We're partnering with pharma and biotech for research programs, and meeting investors for our seed round. If immune trajectory is the missing layer, let's talk.</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 26, flexWrap: 'wrap' }}>
            <a className="btn" href="mailto:dylan@biomarkr.health" style={{ background: 'var(--white)', color: 'var(--black)' }}>Request a conversation <ArrowRight/></a>
            <a className="btn" href="practice.html" style={{ border: '1px solid var(--paper-a12)', color: 'var(--white)' }}>See it in practice</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PAGE
   ============================================================ */
function HomePage() {
  const HeroNode = HeroSignal;
  return (
    <div>
      <SiteHeader active="home" />
      <HeroNode />
      {/* Thesis + Metrics */}
      <section className="hairline-top" style={{ padding: '6.5rem 0' }}>
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(48px,7vw,100px)', alignItems: 'center' }}>
          <div>
            <Reveal><Lockup eyebrow="Our" title="Thesis" /></Reveal>
            <Reveal delay={80}>
              <p className="lead" style={{ marginTop: 36 }}>The future of healthcare is proactive, continuous, and personalized, diseases caught before they become harmful.</p>
              <div className="prose" style={{ marginTop: 22 }}>
                <p>We believe inflammation holds the key. The WHO ranks chronic inflammation as the greatest threat to human health globally, <strong>three out of five people</strong> die from inflammation-driven conditions. Yet it's managed reactively: a flare presents, a treatment is adjusted, and damage has already occurred.</p>
                <p>The CGM transformed diabetes not because glucose was a new biomarker, but because frequency turned a snapshot into a trajectory. <strong>Biomarkr does the same for the immune system.</strong></p>
              </div>
            </Reveal>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '52px 28px' }}>
            {STATS.map((s, i) => (
              <Reveal key={s[0]} delay={120 + i * 80}>
                <div style={{ fontSize: 'clamp(34px,3.2vw,50px)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1 }} className="tabular">{s[0]}</div>
                <div className="prose" style={{ marginTop: 12, fontSize: 14, lineHeight: 1.6, maxWidth: 190 }}>{s[1]}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <Teaser eyebrow="Technology" title="Hardware" href="technology.html" cta="Inside the chip"
        body={<React.Fragment><p style={{ marginTop: 0 }}>We miniaturized a laboratory-grade immunoassay onto a silicon photonic chip the size of a fingernail, <strong>ELISA on a chip</strong>, manufactured at semiconductor scale.</p><p>Single pg/mL sensitivity in whole blood, no centrifuge, no cold chain, no lab.</p></React.Fragment>}>
        <img src="/assets/device-reader.png" alt="Q-SENS reader" style={{ width: '100%', maxWidth: 460, margin: '0 auto', display: 'block', filter: 'drop-shadow(0 24px 50px rgba(0,0,0,0.12))' }} />
      </Teaser>
      <Teaser flip eyebrow="Technology" title="Software" href="cytokine.html" cta="Open the model"
        body={<React.Fragment><p style={{ marginTop: 0 }}><strong>AI that gets smarter with every test.</strong> A single cytokine value is meaningless without context, it depends on your baseline, age, stress, and time of day.</p><p>We build personalized immune intelligence from high-frequency longitudinal data, measured against your unique baseline.</p></React.Fragment>}>
        <div style={{ display: 'grid', gap: 14 }}>
          <BiomarkerReadout marker="IL-6" name="Interleukin-6" value="22" status="elevated" series={[8, 9, 7, 10, 12, 18, 22]} />
          <BiomarkerReadout marker="TNF-α" name="Tumor Necrosis Factor" value="9.3" status="watch" series={[7, 7, 8, 8, 9, 9, 9.3]} />
          <BiomarkerReadout marker="IL-10" name="Interleukin-10" value="4.1" status="low" series={[6, 5.5, 5, 4.8, 4.4, 4.2, 4.1]} />
        </div>
      </Teaser>
      <DeviceShowcase />
      {/* In practice teaser */}
      <section className="hairline-top" style={{ padding: '6.5rem 0' }}>
        <div className="wrap">
          <Reveal><Lockup eyebrow="Use cases" title="What it looks like" sub="Illustrative scenarios that show how a cytokine trajectory changes a decision, at 2 AM in an ED, and on a Monday morning at home." /></Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 24, marginTop: 52 }}>
            {[
              { tag: 'Emergency · biothreat', title: 'The hour that mattered', body: 'A returning traveler with hours-old fever. PCR is days from reliable, but a cytokine trajectory paired with a flat procalcitonin rules out bacterial sepsis and triggers isolation 18 hours early.', href: 'practice.html#ebola' },
              { tag: 'Chronic · at home', title: 'The space between flares', body: "A 23-year-old managing Crohn's switches biologics. Four weeks in, her weekly read shows TNF-α falling and IL-10 rising, her doctor calls it working, three months before symptoms would.", href: 'practice.html#ibd' },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 100}>
                <a href={c.href} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                  <Card padding="lg" interactive style={{ height: '100%' }}>
                    <span className="pill-tag">{c.tag}</span>
                    <h3 style={{ fontSize: 24, fontWeight: 300, letterSpacing: '-0.02em', margin: '20px 0 12px' }}>{c.title}</h3>
                    <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{c.body}</p>
                    <div style={{ marginTop: 20, display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13.5, fontWeight: 500 }}>Read the scenario <ArrowRight size={15}/></div>
                  </Card>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <Team />
      <CTA />
      <SiteFooter />

    </div>
  );
}

window.HomePage = HomePage;
