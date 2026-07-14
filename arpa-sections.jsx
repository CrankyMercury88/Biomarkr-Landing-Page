/* Biomarkr, shared content + SVG charts for the ARPA-derived home page
   variations. Data and copy are distilled from the ARPA-H solution summary
   (sections 1–5). Charts are hand-built SVG in the design-system's muted
   functional-signal register (color = data, never decoration). Everything
   is exported to window for the two page files to compose differently. */

/* Cytokine → design-system functional signal (the cytokine model's register) */
const MARKER_COLOR = {
  'IL-6': 'var(--signal-critical)',
  'TNF-α': 'var(--signal-caution)',
  'IFN-γ': 'var(--signal-positive)',
  'IL-10': 'var(--signal-info)',
  'IL-1β': '#5d4b8c',
};

/* ---------- Disease trajectory signatures (fold vs. baseline) ---------- */
const SIGNATURES = {
  sepsis: {
    eyebrow: 'Sepsis · hours',
    title: 'Cytokine storm',
    note: 'TNF-α and IL-1β spike within hours; IL-6 rises and persists; a counter-regulatory IL-10 surge follows while IFN-γ stays suppressed, the immunoparalysis signature.',
    xLabel: 'Hours from onset',
    xTicks: { 0: '0h', 4: '12h', 6: '24h', 9: '48h', 11: '72h' },
    yMax: 34, yTicks: [1, 10, 20, 30],
    series: [
      { key: 'IL-6', data: [1, 4, 18, 28, 32, 24, 18, 14, 10, 7, 5, 4] },
      { key: 'TNF-α', data: [1, 12, 22, 15, 8, 5, 3, 2.5, 2, 1.8, 1.5, 1.2] },
      { key: 'IL-1β', data: [1, 8, 16, 12, 7, 4, 2.5, 2, 1.8, 1.5, 1.2, 1] },
      { key: 'IL-10', data: [1, 1.5, 3, 8, 14, 20, 16, 12, 9, 6, 4, 3], dash: '5 4' },
      { key: 'IFN-γ', data: [1, 1, 1.2, 1.3, 1.2, 1.1, 1, 0.9, 0.8, 0.8, 0.9, 1] },
    ],
  },
  ra: {
    eyebrow: 'RA flare · days',
    title: 'Pre-symptomatic rise',
    note: 'IL-6 and TNF-α climb 3–5 days before the clinical flare. IL-10 stays insufficient to suppress, explaining the breakthrough, while IFN-γ shows modest Th1 involvement.',
    xLabel: 'Days (0 = symptom onset)',
    xTicks: { 0: '−5d', 5: '0', 10: '+5d', 15: '+10d' },
    yMax: 5.2, yTicks: [1, 2, 3, 4, 5],
    series: [
      { key: 'IL-6', data: [1, 1.1, 1.3, 1.6, 2.0, 2.8, 3.8, 4.5, 4.8, 4.6, 4.2, 3.8, 3.2, 2.6, 2.1, 1.7] },
      { key: 'TNF-α', data: [1, 1.1, 1.2, 1.5, 1.9, 2.6, 3.4, 4.2, 4.5, 4.3, 3.9, 3.4, 2.9, 2.4, 2.0, 1.6] },
      { key: 'IL-1β', data: [1, 1, 1.1, 1.3, 1.5, 1.9, 2.5, 3.0, 3.2, 3.0, 2.7, 2.4, 2.0, 1.7, 1.5, 1.3] },
      { key: 'IFN-γ', data: [1, 1, 1.1, 1.2, 1.4, 1.8, 2.2, 2.4, 2.3, 2.1, 1.9, 1.7, 1.5, 1.3, 1.2, 1.1] },
      { key: 'IL-10', data: [1, 1, 1.1, 1.2, 1.3, 1.5, 1.7, 1.8, 1.8, 1.8, 1.7, 1.6, 1.5, 1.4, 1.3, 1.2], dash: '5 4' },
    ],
  },
  longcovid: {
    eyebrow: 'Long COVID · weeks',
    title: 'Persistent dysregulation',
    note: 'IL-6 and IFN-γ stay elevated but variable, an episodic flaring pattern. A blunted IL-10 response distinguishes it from recovery; TNF-α smolders chronically.',
    xLabel: 'Weeks post-enrollment',
    xTicks: { 0: 'wk 0', 4: 'wk 4', 8: 'wk 8', 12: 'wk 12' },
    yMax: 3.6, yTicks: [1, 2, 3],
    series: [
      { key: 'IL-6', data: [2.1, 2.4, 1.9, 2.8, 2.3, 3.1, 2.0, 2.6, 2.2, 3.0, 2.4, 2.1, 2.3], dot: true },
      { key: 'IFN-γ', data: [1.8, 2.1, 1.6, 2.5, 1.9, 2.7, 1.7, 2.3, 1.8, 2.6, 2.1, 1.7, 2.0], dot: true },
      { key: 'TNF-α', data: [1.6, 1.7, 1.5, 1.9, 1.7, 2.0, 1.6, 1.8, 1.6, 1.9, 1.7, 1.6, 1.7], dot: true },
      { key: 'IL-1β', data: [1.3, 1.4, 1.2, 1.5, 1.3, 1.6, 1.2, 1.4, 1.3, 1.5, 1.3, 1.2, 1.3], dot: true },
      { key: 'IL-10', data: [1.1, 1.2, 1.1, 1.2, 1.1, 1.2, 1.1, 1.2, 1.1, 1.2, 1.1, 1.1, 1.2], dash: '5 4' },
    ],
  },
};

/* ---------- Circadian rhythm (fold vs. individual nadir) ---------- */
const CIRCADIAN = {
  xLabel: 'Time from wake (hours)',
  xTicks: { 0: 'Wake', 6: '+6h', 12: 'Noon', 18: '+18h', 24: 'Sleep' },
  yMax: 3.8, yMin: 0.6, yTicks: [1, 2, 3],
  series: [
    { key: 'IL-6', data: [1.0, 1.4, 2.1, 2.8, 3.2, 2.9, 2.4, 1.9, 1.5, 1.2, 1.0, 0.9, 0.8, 0.8, 0.85, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.3, 1.1, 1.0] },
    { key: 'IL-6', data: [1.0, 1.2, 1.7, 2.2, 2.5, 2.3, 1.9, 1.5, 1.2, 1.0, 0.9, 0.85, 0.8, 0.82, 0.88, 0.95, 1.05, 1.15, 1.2, 1.3, 1.35, 1.3, 1.2, 1.1, 1.0], dash: '5 4', label: 'IL-6 · Patient B' },
    { key: 'TNF-α', data: [1.0, 1.6, 2.4, 3.1, 3.4, 3.0, 2.3, 1.7, 1.3, 1.1, 0.95, 0.85, 0.8, 0.82, 0.9, 0.98, 1.1, 1.2, 1.3, 1.4, 1.5, 1.45, 1.35, 1.15, 1.0] },
    { key: 'IL-1β', data: [1.0, 1.3, 1.9, 2.5, 2.8, 2.5, 2.0, 1.5, 1.2, 1.0, 0.88, 0.8, 0.78, 0.8, 0.85, 0.9, 1.0, 1.1, 1.15, 1.22, 1.28, 1.25, 1.15, 1.05, 1.0] },
  ],
};

/* ---------- The four structural failures (section 1) ---------- */
const PROBLEMS = [
  { label: 'Latency & cost', body: 'Cytokine testing needs a central lab, venipuncture, and 24–72 hours, at $200–800 per panel. Results arrive too late to act on. Most patients are never tested at all.' },
  { label: 'The snapshot', body: 'A single-timepoint reading cannot tell a rising flare from a resolving one, a treatment responder from a non-responder, or an early deviation from noise.' },
  { label: 'Population references', body: 'Normal ranges come from population statistics. A patient whose IL-6 doubles from their own baseline, while still “in range”, gets no alert.' },
  { label: 'Circadian confound', body: 'IL-6, TNF-α, and IL-1β swing 2–4× within a single day. No clinical protocol corrects for it, contaminating every measurement taken.' },
];

/* ---------- Biomarkr platform specs (section 2) ---------- */
const SPECS = [
  ['5', 'cytokines at once', 'IL-6 · TNF-α · IL-1β · IFN-γ · IL-10'],
  ['10 µL', 'fingerstick whole blood', 'no venipuncture, no lab'],
  ['<10', 'min to result', 'at home or point of care'],
  ['32', 'biomarkers per chip', 'platform architecture ceiling'],
];

/* ---------- Three capabilities no snapshot test provides (section 2) ---------- */
const CAPABILITIES = [
  { n: '01', title: 'Personalized baseline', body: 'Repeated measurement in health builds each person’s circadian-calibrated cytokine baseline, so future readings are interpreted as deviations, not absolute values.' },
  { n: '02', title: 'Trajectory signal extraction', body: 'Rate of change, time-to-peak, resolution velocity, and ratio dynamics encode information that is invisible to any single measurement.' },
  { n: '03', title: 'Pre-symptomatic prediction', body: 'Longitudinal models trained on personal trajectories detect immune deviations days before clinical symptoms appear.' },
];

/* ---------- Primary use cases (section 5) ---------- */
const USE_CASES = [
  { tag: 'RA / Autoimmune', title: 'Biologic monitoring & flare prediction', stat: '1.5M', statLabel: 'US RA patients on biologics', body: 'No objective home monitoring exists today. Trajectories detect treatment response within days and predict flares 5–7 days before clinical presentation, enabling dose adjustment before joint damage.' },
  { tag: 'Long COVID / ME-CFS', title: 'Objective immune phenotyping', stat: '17M', statLabel: 'Americans, no validated biomarker', body: 'Longitudinal cytokine trajectories, particularly episodic IFN-γ and IL-6 patterns, provide the first objective immune fingerprint of post-acute sequelae for trial stratification and monitoring.' },
  { tag: 'IBD', title: 'Response monitoring between infusions', stat: '3M+', statLabel: 'patients on biologics', body: 'Patients are assessed every 8–12 weeks. Monitoring between visits catches secondary loss-of-response before relapse, proactive switching instead of reactive escalation.' },
  { tag: 'Pharma / DCT', title: 'Decentralized trial pharmacodynamics', stat: 'PD', statLabel: 'between site visits', body: 'Continuous remote pharmacodynamic data between visits compresses trial timelines and enables proof-of-concept at lower N with higher confidence.' },
  { tag: 'Research', title: 'Immune baseline population studies', stat: 'ELISA', statLabel: 'replaced at the bench', body: 'Exercise, nutrition, sleep, aging, and vaccine-response studies move off lab-bound ELISA and Luminex to frequent, multi-site, standardized ambulatory collection.' },
  { tag: 'Proactive health', title: 'Pre-clinical immune surveillance', stat: 'Early', statLabel: 'before organ damage', body: 'High cardiovascular risk, cancer survivors, and post-surgical patients carry smoldering inflammation invisible to standard labs. Monitoring catches it before damage, at a fraction of downstream cost.' },
];

/* ============================================================
   CHART PRIMITIVES
   ============================================================ */

/* Flexible multi-series line chart (SVG). series: [{key,data,dash,dot}].
   `prefix` must be unique per instance for gradient ids. */
function LineChart({ width = 560, height = 250, series, xTicks = {}, xLabel, yMax, yMin = 0, yTicks = [1], prefix = 'c', fill = false, strokeWidth = 2 }) {
  const pad = { l: 30, r: 16, t: 16, b: xLabel ? 34 : 24 };
  const n = series[0].data.length;
  const max = yMax || Math.max(...series.flatMap((s) => s.data)) * 1.08;
  const px = (i) => pad.l + (i * (width - pad.l - pad.r)) / (n - 1);
  const py = (v) => height - pad.b - ((Math.min(Math.max(v, yMin), max) - yMin) / (max - yMin)) * (height - pad.t - pad.b);
  const toLine = (d) => d.map((v, i) => `${i ? 'L' : 'M'} ${px(i).toFixed(1)} ${py(v).toFixed(1)}`).join(' ');
  const toArea = (d) => `${toLine(d)} L ${px(n - 1).toFixed(1)} ${py(yMin).toFixed(1)} L ${px(0).toFixed(1)} ${py(yMin).toFixed(1)} Z`;
  const color = (s) => MARKER_COLOR[s.key] || 'var(--text-primary)';
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        {fill && series.map((s, i) => (
          <linearGradient key={i} id={`${prefix}-f-${i}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color(s)} stopOpacity="0.12" />
            <stop offset="100%" stopColor={color(s)} stopOpacity="0" />
          </linearGradient>
        ))}
      </defs>
      {yTicks.map((g) => (
        <g key={g}>
          <line x1={pad.l} x2={width - pad.r} y1={py(g)} y2={py(g)} stroke="var(--border-subtle)" strokeWidth="1" />
          <text x={pad.l - 7} y={py(g) + 3} fontSize="9" fontFamily="var(--font-mono)" fill="var(--text-tertiary)" textAnchor="end">{g}×</text>
        </g>
      ))}
      <line x1={pad.l} x2={width - pad.r} y1={py(1)} y2={py(1)} stroke="var(--border-strong)" strokeWidth="1" strokeDasharray="4 4" />
      {fill && series.map((s, i) => <path key={'a' + i} d={toArea(s.data)} fill={`url(#${prefix}-f-${i})`} />)}
      {series.map((s, i) => (
        <g key={'l' + i}>
          <path d={toLine(s.data)} fill="none" stroke={color(s)} strokeWidth={strokeWidth} strokeDasharray={s.dash || '0'} strokeLinecap="round" strokeLinejoin="round" opacity={s.dash ? 0.92 : 1} />
          {s.dot && s.data.map((v, j) => <circle key={j} cx={px(j)} cy={py(v)} r="1.7" fill={color(s)} />)}
          <circle cx={px(n - 1)} cy={py(s.data[n - 1])} r="3" fill={color(s)} />
        </g>
      ))}
      {Object.entries(xTicks).map(([i, t]) => (
        <text key={i} x={px(+i)} y={height - (xLabel ? 18 : 6)} fontSize="9" fontFamily="var(--font-mono)" fill="var(--text-tertiary)" textAnchor={+i === 0 ? 'start' : +i === n - 1 ? 'end' : 'middle'}>{t}</text>
      ))}
      {xLabel && <text x={(pad.l + width - pad.r) / 2} y={height - 3} fontSize="9.5" fill="var(--text-tertiary)" textAnchor="middle" letterSpacing="0.02em">{xLabel}</text>}
    </svg>
  );
}

/* Marker legend, one swatch per distinct marker present (+ optional ULN). */
function MarkerLegend({ keys, uln = true, style = {} }) {
  const seen = [];
  keys.forEach((k) => { if (!seen.includes(k)) seen.push(k); });
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px', ...style }}>
      {seen.map((k) => (
        <span key={k} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
          <span style={{ width: 16, height: 2, background: MARKER_COLOR[k] || 'var(--text-primary)', borderRadius: 2 }} /> {k}
        </span>
      ))}
      {uln && (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 11, color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
          <span style={{ width: 16, height: 0, borderTop: '1px dashed var(--border-strong)' }} /> Baseline
        </span>
      )}
    </div>
  );
}

/* The hero argument chart: two patients, one reading, opposite trajectories. */
function SnapshotChart({ width = 560, height = 320 }) {
  const pad = { l: 16, r: 16, t: 24, b: 28 };
  const rising = [3, 3.4, 4, 4.8, 6, 7.6, 9.6, 12, 15, 18.5, 22];
  const stable = [15.4, 15, 14.6, 15.2, 15, 14.7, 15.1, 15, 14.8, 15, 15.2];
  const n = rising.length;
  const max = 24, min = 0;
  const hit = 8; // index where both read ~15
  const px = (i) => pad.l + (i * (width - pad.l - pad.r)) / (n - 1);
  const py = (v) => height - pad.b - ((v - min) / (max - min)) * (height - pad.t - pad.b);
  const toLine = (d) => d.map((v, i) => `${i ? 'L' : 'M'} ${px(i).toFixed(1)} ${py(v).toFixed(1)}`).join(' ');
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ display: 'block', overflow: 'visible' }}>
      {[5, 10, 15, 20].map((g) => (
        <g key={g}>
          <line x1={pad.l} x2={width - pad.r} y1={py(g)} y2={py(g)} stroke="var(--border-subtle)" strokeWidth="1" />
          <text x={pad.l + 2} y={py(g) - 4} fontSize="8.5" fontFamily="var(--font-mono)" fill="var(--text-tertiary)">{g}</text>
        </g>
      ))}
      {/* the single shared reading */}
      <line x1={px(hit)} x2={px(hit)} y1={pad.t} y2={height - pad.b} stroke="var(--border-default)" strokeWidth="1" strokeDasharray="3 3" />
      <path d={toLine(stable)} fill="none" stroke="var(--text-tertiary)" strokeWidth="2" strokeDasharray="5 4" strokeLinecap="round" />
      <path d={toLine(rising)} fill="none" stroke="var(--signal-critical)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={px(hit)} cy={py(15)} r="7" fill="none" stroke="var(--text-primary)" strokeWidth="2" />
      <circle cx={px(hit)} cy={py(15)} r="2.6" fill="var(--text-primary)" />
      <text x={px(hit)} y={py(15) - 14} fontSize="10.5" fontFamily="var(--font-mono)" fill="var(--text-primary)" textAnchor="middle" fontWeight="600">IL-6 · 15 pg/mL</text>
      <text x={px(n - 1)} y={py(rising[n - 1]) - 8} fontSize="10" fill="var(--signal-critical)" textAnchor="end" fontWeight="600">Rising flare</text>
      <text x={px(0)} y={py(stable[0]) - 10} fontSize="10" fill="var(--text-tertiary)" textAnchor="start">Stable for weeks</text>
    </svg>
  );
}

/* ============================================================
   SHARED CONTENT BLOCKS
   ============================================================ */

/* Disease signature card (white surface, chart + note). */
function SignatureCard({ sig, prefix, fill = false }) {
  const { Card } = window.BiomarkrDesignSystem_734cca;
  return (
    <Card padding="lg" style={{ background: 'var(--surface-page)', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="eyebrow" style={{ fontSize: 11, marginBottom: 10 }}>{sig.eyebrow}</div>
      <div style={{ fontSize: 20, fontWeight: 300, letterSpacing: '-0.02em', marginBottom: 14 }}>{sig.title}</div>
      <LineChart width={420} height={210} series={sig.series} xTicks={sig.xTicks} yMax={sig.yMax} yTicks={sig.yTicks} prefix={prefix} fill={fill} />
      <MarkerLegend keys={sig.series.map((s) => s.key)} uln={false} style={{ margin: '14px 0 16px' }} />
      <p style={{ margin: '0', fontSize: 14, lineHeight: 1.6, color: 'var(--text-secondary)' }}>{sig.note}</p>
    </Card>
  );
}

/* Circadian block: wide chart card + the signal-to-noise argument. */
function CircadianBlock() {
  const { Card } = window.BiomarkrDesignSystem_734cca;
  return (
    <div className="r-wide" style={{ gap: 'clamp(32px,5vw,64px)', alignItems: 'center' }}>
      <Card padding="lg" style={{ background: 'var(--surface-page)' }}>
        <div className="eyebrow" style={{ fontSize: 11, marginBottom: 12 }}>24-hour cycle · wake-normalized</div>
        <LineChart width={560} height={260} series={CIRCADIAN.series} xTicks={CIRCADIAN.xTicks} xLabel={CIRCADIAN.xLabel} yMax={CIRCADIAN.yMax} yMin={CIRCADIAN.yMin} yTicks={CIRCADIAN.yTicks} prefix="circ" />
        <MarkerLegend keys={CIRCADIAN.series.map((s) => s.key)} uln={false} style={{ marginTop: 14 }} />
        <p style={{ margin: '12px 0 0', fontSize: 12, fontStyle: 'italic', color: 'var(--text-tertiary)', lineHeight: 1.5 }}>Peak-to-nadir amplitude varies between individuals (solid vs. dashed), so population-level correction fails.</p>
      </Card>
      <div>
        <p className="prose" style={{ marginTop: 0 }}>IL-6, TNF-α, and IL-1β swing <strong>2–4× within a single day</strong>, peaking before dawn, bottoming out in the afternoon. A morning 8 pg/mL and an afternoon 4 pg/mL can mean the same immune state, or opposite ones.</p>
        <p className="prose">Biomarkr runs a dedicated <strong>circadian characterization phase</strong>: test every four hours for 14 days, normalized to wake time. Every later reading is phase-corrected against that personal map.</p>
        <div className="r-2" style={{ gap: '28px 28px', marginTop: 28 }}>
          <div>
            <div className="tabular" style={{ fontSize: 'clamp(32px,4.2vw,50px)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1 }}>40%</div>
            <div className="prose" style={{ marginTop: 8, fontSize: 14 }}>of apparent “deviations” are circadian noise without correction</div>
          </div>
          <div>
            <div className="tabular" style={{ fontSize: 'clamp(32px,4.2vw,50px)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1 }}>3–5×</div>
            <div className="prose" style={{ marginTop: 8, fontSize: 14 }}>signal-to-noise gain once trajectories are phase-corrected</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Use-case grid (section 5). compact=true tightens it for the dense layout. */
function UseCaseGrid() {
  const { Card } = window.BiomarkrDesignSystem_734cca;
  return (
    <div className="r-cards" style={{ gap: 24 }}>
      {USE_CASES.map((u, i) => (
        <Reveal key={u.title} delay={(i % 3) * 90}>
          <Card padding="lg" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
              <span className="pill-tag">{u.tag}</span>
              <div style={{ textAlign: 'right' }}>
                <div className="tabular" style={{ fontSize: 24, fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1 }}>{u.stat}</div>
              </div>
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-tertiary)', textAlign: 'right', marginTop: 4, letterSpacing: '0.02em' }}>{u.statLabel}</div>
            <h3 style={{ fontSize: 20, fontWeight: 300, letterSpacing: '-0.02em', margin: '18px 0 10px' }}>{u.title}</h3>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: 'var(--text-secondary)' }}>{u.body}</p>
          </Card>
        </Reveal>
      ))}
    </div>
  );
}

/* Three capabilities row (section 2). */
function CapabilityRow() {
  return (
    <div className="r-3" style={{ gap: 'clamp(28px,4vw,52px)' }}>
      {CAPABILITIES.map((c, i) => (
        <Reveal key={c.n} delay={i * 90}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-tertiary)', letterSpacing: '0.1em', marginBottom: 16 }}>{c.n}</div>
          <h3 style={{ fontSize: 20, fontWeight: 300, letterSpacing: '-0.02em', margin: '0 0 12px' }}>{c.title}</h3>
          <p className="prose" style={{ margin: 0, fontSize: 14 }}>{c.body}</p>
        </Reveal>
      ))}
    </div>
  );
}

/* Spec strip (section 2). */
function SpecRow() {
  return (
    <div className="r-4" style={{ gap: '36px 28px' }}>
      {SPECS.map((s, i) => (
        <Reveal key={s[1]} delay={i * 70}>
          <div className="tabular" style={{ fontSize: 'clamp(38px,4.7vw,60px)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1 }}>{s[0]}</div>
          <div style={{ marginTop: 12, fontSize: 15, fontWeight: 500, color: 'var(--text-primary)' }}>{s[1]}</div>
          <div className="prose" style={{ marginTop: 4, fontSize: 13 }}>{s[2]}</div>
        </Reveal>
      ))}
    </div>
  );
}

Object.assign(window, {
  ARPA_MARKER_COLOR: MARKER_COLOR,
  ARPA_SIGNATURES: SIGNATURES,
  ARPA_CIRCADIAN: CIRCADIAN,
  ARPA_PROBLEMS: PROBLEMS,
  ARPA_SPECS: SPECS,
  ARPA_CAPABILITIES: CAPABILITIES,
  ARPA_USE_CASES: USE_CASES,
  ARPA_LineChart: LineChart,
  ARPA_MarkerLegend: MarkerLegend,
  ARPA_SnapshotChart: SnapshotChart,
  ARPA_SignatureCard: SignatureCard,
  ARPA_CircadianBlock: CircadianBlock,
  ARPA_UseCaseGrid: UseCaseGrid,
  ARPA_CapabilityRow: CapabilityRow,
  ARPA_SpecRow: SpecRow,
});
