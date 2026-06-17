/* Biomarkr — Technology page, Section 1: the Technology Stack.
   A scroll-driven build: as the reader scrolls the pinned section, three
   layers assemble bottom-up — silicon photonic Hardware (the enabler),
   Personalized Immune Data, then the AI Analysis layer that sits on top.
   Hardware is the foundation (always present); Data then Intelligence
   drop into place. Monochrome tonal stack (ink → grey → paper).
   Reduced-motion / no-JS: all three render assembled. */

/* Reveal global from chrome.jsx; design-system components read off window inside fns */

/* ---- Per-layer visual motifs (small, monochrome) ---- */
function MotifHardware() {
  const xs = [0, 1, 2, 3, 4, 5, 6, 7], ys = [0, 1, 2, 3];
  return (
    <svg width="118" height="78" viewBox="0 0 118 78" style={{ display: 'block' }}>
      <rect x="1" y="1" width="116" height="76" rx="6" fill="none" stroke="var(--paper-a25, rgba(255,255,255,0.28))" strokeWidth="1" />
      {ys.map((r) => xs.map((c) => (
        <circle key={r + '-' + c} cx={14 + c * 13} cy={16 + r * 16} r="2.4" fill="currentColor" opacity={r === 0 && c < 5 ? 0.95 : 0.4} />
      )))}
      {[0, 1, 2, 3].map((r) => <line key={r} x1="8" y1={16 + r * 16} x2="110" y2={16 + r * 16} stroke="currentColor" strokeWidth="0.7" opacity="0.25" />)}
    </svg>
  );
}
function MotifData() {
  const pts = [[10, 44], [22, 40], [34, 46], [46, 38], [58, 42], [70, 34], [82, 40], [94, 30], [106, 36]];
  return (
    <svg width="118" height="78" viewBox="0 0 118 78" style={{ display: 'block' }}>
      <rect x="6" y="30" width="106" height="22" fill="currentColor" opacity="0.08" />
      <line x1="6" y1="41" x2="112" y2="41" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />
      {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.6" fill="currentColor" opacity="0.85" />)}
    </svg>
  );
}
function MotifAI() {
  return (
    <svg width="118" height="78" viewBox="0 0 118 78" style={{ display: 'block' }}>
      <polyline points="8,56 24,52 40,54 56,44 70,46 84,34" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* prediction cone */}
      <path d="M84 34 L112 16 L112 40 Z" fill="currentColor" opacity="0.12" />
      <polyline points="84,34 112,26" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" strokeLinecap="round" />
      <circle cx="84" cy="34" r="3" fill="currentColor" />
      <circle cx="112" cy="26" r="3" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

const LAYERS = [
  { key: 'hw', tag: 'Layer 01 — Hardware', role: 'The enabler', title: 'Silicon photonic measurement at the point of need', body: 'A disposable cartridge and palm-sized reader run quantitative multiplex immunoassays from 10 µL of whole blood in under ten minutes — making frequent, personal immune data possible in the first place.', motif: MotifHardware, tone: 'ink' },
  { key: 'data', tag: 'Layer 02 — Personalized immune data', role: 'The substrate', title: 'A multi-dimensional personal baseline', body: 'Every fingerstick adds calibrated Core Inflammation Panel measurements — IL-6, TNF-α, IL-1β, IFN-γ, IL-10 — to a secure, circadian-aware map of the individual’s inflammatory baseline.', motif: MotifData, tone: 'mid' },
  { key: 'ai', tag: 'Layer 03 — AI analysis', role: 'The intelligence', title: 'Intelligence over longitudinal trends', body: 'Deep-learning anomaly detection and trend forecasting read each patient’s immune trajectory, turning subtle deviations into proactive prevention rather than after-the-fact diagnosis.', motif: MotifAI, tone: 'paper' },
];

/* A single stacked plate. assembled: 0..1 (drop-in progress). i: stack index. */
function Plate({ layer, i, assembled, active }) {
  const Motif = layer.motif;
  const restY = -i * 62;                 // higher layers sit higher
  const dropY = restY - (1 - assembled) * 230;
  const palette = {
    ink:   { bg: 'var(--surface-inverse)', fg: 'var(--text-inverse)', sub: 'var(--grey-350)', border: 'transparent' },
    mid:   { bg: 'var(--grey-200)',        fg: 'var(--text-primary)', sub: 'var(--text-secondary)', border: 'var(--border-default)' },
    paper: { bg: 'var(--surface-page)',    fg: 'var(--text-primary)', sub: 'var(--text-secondary)', border: 'var(--border-default)' },
  }[layer.tone];
  return (
    <div style={{
      position: 'absolute', left: '50%', bottom: 90, width: 'min(460px, 90%)',
      transform: `translateX(-50%) translateY(${dropY}px)`,
      opacity: assembled, zIndex: 10 + i,
      transition: 'box-shadow .3s var(--ease-out)',
      willChange: 'transform, opacity',
    }}>
      <div style={{
        background: palette.bg, color: palette.fg,
        border: '1px solid ' + palette.border,
        borderRadius: 'var(--radius-lg, 16px)',
        boxShadow: active ? '0 24px 60px rgba(0,0,0,0.18)' : '0 10px 30px rgba(0,0,0,0.10)',
        padding: '22px 26px', display: 'flex', alignItems: 'center', gap: 20,
        outline: active ? '1px solid ' + (layer.tone === 'ink' ? 'var(--paper-a25, rgba(255,255,255,0.3))' : 'var(--text-primary)') : '1px solid transparent',
        outlineOffset: '-1px',
        transition: 'box-shadow .35s var(--ease-out), outline-color .35s var(--ease-out)',
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="eyebrow" style={{ fontSize: 9.5, color: palette.sub, marginBottom: 8 }}>{layer.tag}</div>
          <div style={{ fontSize: 16.5, fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.25 }}>{layer.title}</div>
        </div>
        <div style={{ color: palette.fg, opacity: 0.85, flexShrink: 0 }}><Motif /></div>
      </div>
    </div>
  );
}

function TechStack() {
  const wrapRef = React.useRef(null);
  const [narrow, setNarrow] = React.useState(typeof window !== 'undefined' && window.innerWidth < 880);
  const reduce = (typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches) || narrow;
  const [p, setP] = React.useState(reduce ? 1 : 0);

  React.useEffect(() => {
    const onResize = () => setNarrow(window.innerWidth < 880);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  React.useEffect(() => { if (reduce) setP(1); }, [reduce]);

  React.useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = wrapRef.current; if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const prog = total > 0 ? (-rect.top) / total : 0;
        setP(Math.max(0, Math.min(1, prog)));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [reduce]);

  // base always assembled; data then AI driven by scroll
  const clamp01 = (x) => Math.max(0, Math.min(1, x));
  const assembled = [
    1,
    clamp01((p - 0.12) / 0.32),
    clamp01((p - 0.50) / 0.32),
  ];
  const active = p < 0.40 ? 0 : p < 0.74 ? 1 : 2;

  return (
    <section ref={wrapRef} className="hairline-top" style={{ position: 'relative', height: reduce ? 'auto' : '320vh' }}>
      <div style={{ position: reduce ? 'static' : 'sticky', top: 0, minHeight: reduce ? 0 : '100vh', display: 'flex', alignItems: 'center', padding: reduce ? '6.5rem 0' : '0', overflow: 'hidden' }}>
        <div className="wrap r-split" style={{ gap: 'clamp(40px,6vw,88px)', alignItems: 'center', width: '100%' }}>
          {/* Left — narrative */}
          <div>
            <span className="rule" style={{ marginBottom: 22 }} />
            <span className="eyebrow" style={{ marginBottom: 14, display: 'block' }}><span style={{ color: 'var(--text-tertiary)' }}>01 ·</span> The technology stack</span>
            <h2 style={{ margin: 0, fontSize: 'clamp(30px,4vw,46px)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1.1, maxWidth: 520 }}>Hardware enables data. Data enables intelligence.</h2>
            <p className="prose" style={{ maxWidth: 480, marginTop: 22 }}>Biomarkr is three stacked layers. The silicon photonic hardware is necessary — but the value compounds as you move up the stack, from measurement, to a personal baseline, to prediction.</p>
            <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {LAYERS.map((l, i) => {
                const on = reduce || active === i;
                return (
                  <div key={l.key} style={{ padding: '14px 0', borderTop: i ? '1px solid var(--border-subtle)' : 'none', opacity: on ? 1 : 0.4, transition: 'opacity .35s var(--ease-out)' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                      <span className="tabular" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-tertiary)' }}>{String(i + 1).padStart(2, '0')}</span>
                      <div>
                        <div style={{ fontSize: 16, fontWeight: 600 }}>{l.tag.split(' — ')[1]}</div>
                        <div className="eyebrow" style={{ fontSize: 9.5, margin: '3px 0 0' }}>{l.role}</div>
                        <p style={{ margin: '8px 0 0', fontSize: 13.5, lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: 420, height: on ? 'auto' : 0, overflow: 'hidden', opacity: on ? 1 : 0, transition: 'opacity .3s var(--ease-out)' }}>{l.body}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Right — the assembling stack */}
          <div style={{ position: 'relative', height: 'min(440px, 60vh)', minHeight: 360 }}>
            {LAYERS.map((l, i) => <Plate key={l.key} layer={l} i={i} assembled={reduce ? 1 : assembled[i]} active={!reduce && active === i} />)}
            {/* ground line */}
            <div style={{ position: 'absolute', bottom: 78, left: '50%', transform: 'translateX(-50%)', width: 'min(420px,82%)', height: 1, background: 'var(--border-subtle)' }} />
            <div style={{ position: 'absolute', bottom: 54, left: 0, right: 0, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.08em', color: 'var(--text-tertiary)' }}>FINGERSTICK → TRAJECTORY → PREDICTION</div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.TechStack = TechStack;
