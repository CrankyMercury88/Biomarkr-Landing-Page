/* Biomarkr. Use cases. Chronic inflammatory disease: reading the flare
   before the patient feels it. Two parallel use cases (RA and Crohn's/IBD),
   each with thesis, evidence cards + references, a modeled CIP trajectory,
   and an illustrative case story. Content tracks the live use-cases page;
   visual system unchanged (design-system components + site chrome).
   Globals from chrome.jsx and practice-charts.jsx. */

const { Card, Badge } = window.BiomarkrDesignSystem_734cca;
/* PageHero, Reveal, SiteHeader, SiteFooter, BM_ScrollSpy, ArrowRight global from chrome.jsx. */

/* ============================================================
   Modeled CIP (Core Inflammation Panel) trajectory charts
   (merged in so this page has no extra file dependency).
   ============================================================ */
const UC = {
  ink:  'var(--text-primary)',
  ink2: 'var(--text-secondary)',
  ink3: 'var(--text-tertiary)',
  grid: 'var(--border-subtle)',
  rule: 'var(--border-default)',
  good: 'var(--signal-positive)',
  warn: 'var(--signal-caution)',
  bad:  'var(--signal-critical)',
  info: 'var(--signal-info)',
};
const UC_MONO = 'var(--font-mono)';

/* logistic rise from t0, exponential decay after peak. Value in ×ULN */
function ucCurve(t, m) {
  const up = 1 / (1 + Math.exp(-(t - m.t0) / m.rise));
  const down = t <= m.peak ? 1 : Math.exp(-(t - m.peak) / m.decay);
  return m.base + m.amp * up * down;
}

/* one plot panel (full or zoom). Renders grid, baseline band, symptomatic-
   flare band, threshold rule, early-warning bracket (full only) and lines. */
function UcPlot({ markers, tMax, thresholdDay, leaveDay, bandLabel, zoom }) {
  const W = 600, H = 250;
  const pad = { l: 30, r: 16, t: 22, b: 34 };
  const steps = zoom ? 56 : 90;
  const xs = Array.from({ length: steps + 1 }, (_, i) => i * tMax / steps);
  let yMax = 0;
  markers.forEach((m) => xs.forEach((t) => { const v = ucCurve(t, m); if (v > yMax) yMax = v; }));
  yMax = Math.ceil(yMax / 5) * 5 * 1.04;
  const px = (t) => pad.l + t / tMax * (W - pad.l - pad.r);
  const py = (v) => H - pad.b - v / yMax * (H - pad.t - pad.b);
  const path = (m) => xs.map((t, i) => `${i ? 'L' : 'M'} ${px(t).toFixed(1)} ${py(ucCurve(t, m)).toFixed(1)}`).join(' ');
  const xticks = zoom ? [0, 1, 2, 3, 4, 5, 6, 7] : [0, 15, 30, 45, 60, 75, 90];
  const yticks = [0, 10, 20, 30].filter((v) => v <= yMax);
  const labelRight = thresholdDay / tMax > 0.6;

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block', overflow: 'visible' }} role="img"
      aria-label="Modeled Core Inflammation Panel trajectory; cytokines leave baseline before the symptomatic flare threshold.">
      {/* symptomatic-flare band: from threshold day to end */}
      <rect x={px(thresholdDay)} y={pad.t} width={W - pad.r - px(thresholdDay)} height={H - pad.t - pad.b} style={{ fill: UC.bad }} opacity="0.06" />
      <line x1={px(thresholdDay)} y1={pad.t} x2={px(thresholdDay)} y2={H - pad.b} style={{ stroke: UC.bad }} strokeWidth="1.1" strokeDasharray="4 5" />
      <text x={px(thresholdDay) + (labelRight ? -6 : 6)} y={pad.t + 12} textAnchor={labelRight ? 'end' : 'start'} style={{ fontSize: 10.5, fontWeight: 600, fill: UC.bad }}>Symptomatic flare</text>
      {bandLabel && <text x={px(thresholdDay) + (labelRight ? -6 : 6)} y={pad.t + 26} textAnchor={labelRight ? 'end' : 'start'} style={{ fontFamily: UC_MONO, fontSize: 9, fill: UC.bad, letterSpacing: '0.02em' }}>{bandLabel}</text>}

      {/* y grid + ticks (×ULN) */}
      {yticks.map((v) => (
        <g key={v}>
          <line x1={pad.l} x2={W - pad.r} y1={py(v)} y2={py(v)} style={{ stroke: UC.grid }} strokeWidth="1" />
          <text x={pad.l - 6} y={py(v) + 3} textAnchor="end" style={{ fontFamily: UC_MONO, fontSize: 9, fill: UC.ink3 }}>{v}</text>
        </g>
      ))}
      <text x="12" y={(pad.t + H - pad.b) / 2} transform={`rotate(-90 12 ${(pad.t + H - pad.b) / 2})`} textAnchor="middle" style={{ fontFamily: UC_MONO, fontSize: 9.5, fill: UC.ink3, letterSpacing: '0.03em' }}>×ULN</text>

      {/* baseline reference band (~0–3× ULN) */}
      <rect x={pad.l} y={py(3)} width={W - pad.l - pad.r} height={py(0) - py(3)} style={{ fill: UC.good }} opacity="0.08" />
      <line x1={pad.l} x2={W - pad.r} y1={py(3)} y2={py(3)} style={{ stroke: UC.good }} strokeWidth="1" strokeDasharray="3 4" opacity="0.7" />

      {/* early-warning bracket: leave-baseline day → threshold day (full only) */}
      {!zoom && (
        <g>
          <line x1={px(leaveDay)} y1={H - pad.b + 14} x2={px(thresholdDay)} y2={H - pad.b + 14} style={{ stroke: UC.warn }} strokeWidth="1.3" />
          <line x1={px(leaveDay)} y1={H - pad.b + 10} x2={px(leaveDay)} y2={H - pad.b + 18} style={{ stroke: UC.warn }} strokeWidth="1.3" />
          <line x1={px(thresholdDay)} y1={H - pad.b + 10} x2={px(thresholdDay)} y2={H - pad.b + 18} style={{ stroke: UC.warn }} strokeWidth="1.3" />
        </g>
      )}
      {zoom && (
        <g>
          <line x1={px(leaveDay)} y1={pad.t} x2={px(leaveDay)} y2={H - pad.b} style={{ stroke: UC.warn }} strokeWidth="1" strokeDasharray="2 4" />
          <text x={px(leaveDay) + 5} y={H - pad.b - 6} style={{ fontFamily: UC_MONO, fontSize: 9, fill: UC.warn }}>leaves baseline</text>
        </g>
      )}

      {/* x axis */}
      <line x1={pad.l} x2={W - pad.r} y1={H - pad.b} y2={H - pad.b} style={{ stroke: UC.rule }} strokeWidth="1" />
      {xticks.map((t) => (
        <g key={t}>
          <line x1={px(t)} y1={H - pad.b} x2={px(t)} y2={H - pad.b + 4} style={{ stroke: UC.rule }} strokeWidth="1" />
          <text x={px(t)} y={H - pad.b + 16} textAnchor="middle" style={{ fontFamily: UC_MONO, fontSize: 9, fill: UC.ink3 }}>{zoom ? t : `d${t}`}</text>
        </g>
      ))}

      {/* cytokine lines */}
      {markers.map((m) => (
        <g key={m.key}>
          <path d={path(m)} fill="none"
            style={{ stroke: m.lead ? UC.ink : (m.pct ? UC.ink3 : UC.ink3) }}
            strokeWidth={m.lead ? 2.4 : m.pct ? 1.3 : 1.5}
            strokeDasharray={m.pct ? '4 4' : '0'} strokeLinecap="round" strokeLinejoin="round"
            opacity={m.lead ? 1 : m.pct ? 0.85 : 0.6} />
          <circle cx={px(tMax)} cy={py(ucCurve(tMax, m))} r={m.lead ? 3 : 2.2} style={{ fill: m.lead ? UC.ink : UC.ink3 }} opacity={m.lead ? 1 : 0.7} />
        </g>
      ))}
    </svg>
  );
}

/* legend chip row */
function UcLegend({ markers }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 18px', alignItems: 'center' }}>
      {markers.map((m) => (
        <span key={m.key} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 11.5, color: m.lead ? 'var(--text-primary)' : 'var(--text-tertiary)', fontFamily: UC_MONO, fontWeight: m.lead ? 600 : 400 }}>
          <span style={{ width: 16, height: 0, borderTop: `${m.lead ? 2.4 : 1.6}px ${m.pct ? 'dashed' : 'solid'} ${m.lead ? 'var(--text-primary)' : 'var(--text-tertiary)'}` }} />
          {m.label}
        </span>
      ))}
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 11.5, color: 'var(--signal-critical)', fontFamily: UC_MONO }}>
        <span style={{ width: 14, height: 11, background: 'var(--signal-critical)', opacity: 0.16, border: '1px solid var(--signal-critical)' }} />
        Symptomatic flare
      </span>
    </div>
  );
}

/* full panel: legend + A (full) + B (zoom) + caption */
function CipPanel({ heading, markers, thresholdDay, leaveDay, bandLabel, caption }) {
  return (
    <div style={{ border: '1px solid var(--border-default)', borderRadius: 16, overflow: 'hidden', background: 'var(--surface-page)' }}>
      <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 14 }}>{heading}</div>
        <UcLegend markers={markers} />
      </div>
      <div className="r-wide" style={{ gap: 0 }}>
        <div style={{ padding: '20px 24px', borderRight: '1px solid var(--border-subtle)' }}>
          <div className="eyebrow" style={{ fontSize: 10.5, marginBottom: 12 }}>A · Full CIP trajectory · 0–90 days</div>
          <UcPlot markers={markers} tMax={90} thresholdDay={thresholdDay} leaveDay={leaveDay} bandLabel={bandLabel} />
        </div>
        <div style={{ padding: '20px 24px' }}>
          <div className="eyebrow" style={{ fontSize: 10.5, marginBottom: 12 }}>B · Zoom · first 7 days</div>
          <UcPlot markers={markers} tMax={7} thresholdDay={thresholdDay} leaveDay={leaveDay} bandLabel="" zoom />
        </div>
      </div>
      {caption && (
        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border-subtle)', background: 'var(--surface-tint)' }}>
          <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.65, color: 'var(--text-tertiary)' }}>{caption}</p>
        </div>
      )}
    </div>
  );
}

/* marker configs (×ULN model params) */
const RA_MARKERS = [
  { key: 'il6',  label: 'IL-6',  base: 2.6, amp: 30, t0: 6.2, rise: 1.5, peak: 15, decay: 20, lead: true },
  { key: 'tnf',  label: 'TNF-α', base: 2.4, amp: 25, t0: 6.4, rise: 1.6, peak: 16, decay: 22, lead: true },
  { key: 'il1b', label: 'IL-1β', base: 2.0, amp: 9,  t0: 7.0, rise: 1.7, peak: 17, decay: 20 },
  { key: 'ifng', label: 'IFN-γ', base: 1.8, amp: 6,  t0: 7.5, rise: 1.8, peak: 18, decay: 22 },
  { key: 'il10', label: 'IL-10', base: 1.6, amp: 7,  t0: 9.5, rise: 2.2, peak: 24, decay: 28 },
  { key: 'pct',  label: 'PCT* (not in CIP)', base: 1.0, amp: 0.6, t0: 8, rise: 2, peak: 20, decay: 30, pct: true },
];

const IBD_MARKERS = [
  { key: 'tnf',  label: 'TNF-α', base: 2.4, amp: 27, t0: 5.4, rise: 1.5, peak: 15, decay: 22, lead: true },
  { key: 'il6',  label: 'IL-6',  base: 2.2, amp: 14, t0: 6.0, rise: 1.6, peak: 16, decay: 20 },
  { key: 'il1b', label: 'IL-1β', base: 1.9, amp: 8,  t0: 6.5, rise: 1.7, peak: 17, decay: 20 },
  { key: 'ifng', label: 'IFN-γ', base: 2.0, amp: 16, t0: 5.8, rise: 1.6, peak: 16, decay: 22 },
  { key: 'il10', label: 'IL-10', base: 1.6, amp: 6,  t0: 9.0, rise: 2.2, peak: 23, decay: 28 },
  { key: 'pct',  label: 'PCT* (not in CIP)', base: 1.0, amp: 2.2, t0: 7, rise: 1.8, peak: 16, decay: 26, pct: true },
];

/* ---------- small shared pieces ---------- */

function Ref({ n }) {
  return <sup style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6em', color: 'var(--signal-info)', fontWeight: 600, marginLeft: 1, lineHeight: 0 }}>[{n}]</sup>;
}

function ExtLink({ href, children }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--signal-info)', textDecoration: 'underline', textUnderlineOffset: '2px' }}>{children}</a>;
}

/* a row of label / value stats under a top rule (hero + patient profile) */
function StatRow({ items, compact }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', borderTop: '1px solid var(--border-default)' }}>
      {items.map((it, i) => (
        <div key={i} style={{ flex: compact ? '1 1 130px' : '1 1 200px', minWidth: compact ? 120 : 180, padding: compact ? '16px 22px 16px 0' : '22px 28px 22px 0', borderLeft: i ? '1px solid var(--border-subtle)' : 'none', paddingLeft: i ? (compact ? 22 : 28) : 0 }}>
          <div className="eyebrow" style={{ fontSize: 10.5, marginBottom: 9 }}>{it.label}</div>
          <div style={{ fontSize: compact ? 14 : 15.5, color: 'var(--text-primary)', lineHeight: 1.45, fontFamily: it.mono ? 'var(--font-mono)' : 'inherit', letterSpacing: it.mono ? '-0.01em' : 0 }}>{it.value}</div>
        </div>
      ))}
    </div>
  );
}

function InfoCard({ title, children }) {
  return (
    <Card padding="lg">
      <div className="eyebrow" style={{ fontSize: 10.5, marginBottom: 13 }}>{title}</div>
      <p className="prose" style={{ fontSize: 14.5, lineHeight: 1.75, margin: 0 }}>{children}</p>
    </Card>
  );
}

function RefList({ items }) {
  return (
    <div style={{ marginTop: 44 }}>
      <div className="eyebrow" style={{ fontSize: 10.5, marginBottom: 16 }}>References</div>
      <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 820 }}>
        {items.map((it, i) => (
          <li key={i} style={{ display: 'grid', gridTemplateColumns: '22px 1fr', gap: 10, fontSize: 13, lineHeight: 1.65, color: 'var(--text-secondary)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>{i + 1}</span>
            <span>{it}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* vertical day-by-day timeline */
function Timeline({ steps }) {
  return (
    <div>
      {steps.map((s, i) => {
        const last = i === steps.length - 1;
        return (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '74px 1fr', gap: 4 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, fontWeight: 600, color: 'var(--text-primary)', paddingTop: 1, whiteSpace: 'nowrap' }}>{s.day}</div>
            <div style={{ position: 'relative', borderLeft: last ? '1px solid transparent' : '1px solid var(--border-default)', paddingLeft: 26, paddingBottom: last ? 0 : 26 }}>
              <span style={{ position: 'absolute', left: -4.5, top: 5, width: 8, height: 8, borderRadius: '50%', background: 'var(--text-primary)' }} />
              <p className="prose" style={{ fontSize: 14.5, lineHeight: 1.7, margin: 0 }}>{s.body}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* illustrative patient case story */
function CaseStory({ title, profile, intro, steps, outcome, disclaimer }) {
  return (
    <Card padding="lg" style={{ marginTop: 56 }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <span className="pill-tag" style={{ marginBottom: 18 }}><span className="dot" style={{ background: 'var(--signal-info)' }} /> Case story · illustrative, hypothetical patient</span>
        <h3 style={{ fontSize: 'clamp(24px,3vw,32px)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.15, margin: '0 0 24px' }}>{title}</h3>
        <StatRow items={profile} compact />
        <p className="prose" style={{ fontSize: 15.5, lineHeight: 1.8, margin: '28px 0 36px', maxWidth: 760 }}>{intro}</p>
        <Timeline steps={steps} />
        <div style={{ borderTop: '1px solid var(--border-default)', marginTop: 36, paddingTop: 26 }}>
          <div className="eyebrow" style={{ fontSize: 10.5, marginBottom: 12 }}>Outcome</div>
          <p className="prose" style={{ fontSize: 15.5, lineHeight: 1.8, margin: 0, color: 'var(--text-primary)' }}>{outcome}</p>
        </div>
        <p style={{ fontSize: 12.5, color: 'var(--text-tertiary)', lineHeight: 1.7, marginTop: 24, fontStyle: 'italic', maxWidth: 760 }}>{disclaimer}</p>
      </div>
    </Card>
  );
}

/* ---------- one full use-case block ---------- */
function UseCase({ num, title, thesis, cards, chart, refs, story, tint }) {
  return (
    <section id={num === '01' ? 'ra' : 'ibd'} className="hairline-top" style={{ padding: 'clamp(64px,9vh,104px) 0', background: tint ? 'var(--surface-tint)' : 'var(--surface-page)', scrollMarginTop: 90 }}>
      <div className="wrap">
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 18 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 600, color: 'var(--text-tertiary)', letterSpacing: '0.04em' }}>{num}</span>
            <span className="rule" style={{ alignSelf: 'center' }} />
          </div>
          <h2 style={{ fontSize: 'clamp(30px,4.2vw,50px)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1.08, margin: 0, maxWidth: 880 }}>{title}</h2>
          <p className="prose" style={{ fontSize: 17, lineHeight: 1.75, maxWidth: 720, marginTop: 24 }}><strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Thesis. </strong>{thesis}</p>
        </Reveal>

        <Reveal>
          <div className="r-split" style={{ gap: 20, marginTop: 48 }}>
            {cards.map((c, i) => <InfoCard key={i} title={c.title}>{c.body}</InfoCard>)}
          </div>
        </Reveal>

        <Reveal>
          <div style={{ marginTop: 56 }}>
            <CipPanel heading={chart.heading} markers={chart.markers} thresholdDay={chart.thresholdDay} leaveDay={4} bandLabel={chart.bandLabel} caption={chart.caption} />
          </div>
        </Reveal>

        <Reveal><RefList items={refs} /></Reveal>

        <Reveal><CaseStory {...story} /></Reveal>
      </div>
    </section>
  );
}

/* ---------- page ---------- */
function PracticePage() {
  const SPY = [
    { id: 'overview', label: 'Overview' },
    { id: 'ra', label: 'Rheumatoid arthritis' },
    { id: 'ibd', label: "Crohn's / IBD" },
    { id: 'validation', label: 'Validation' },
  ];

  const TAGS = ['Longitudinal monitoring', 'Drug-target cytokines', 'Flare vs. infection', 'At-home fingerstick'];

  const RA = {
    num: '01',
    title: 'Rheumatoid Arthritis: Catching the Flare Early',
    thesis: <>An RA flare is driven by a measurable cytokine surge, led by IL-6 and TNF-α, that begins before the patient feels it. A fingerstick panel that tracks that surge at home could flag flares earlier and make biologic therapy <strong style={{ color: 'var(--text-primary)' }}>measurable rather than inferred</strong>.</>,
    cards: [
      { title: 'The gap', body: <>RA is monitored with CRP and ESR, which are slow and non-specific. CRP reads normal in roughly half of patients with active synovial inflammation, and becomes unreliable in patients on IL-6-blocking biologics, the group hardest to manage.<Ref n={1} /> Flares are often confirmed only after joint damage is underway.</> },
      { title: 'The signal', body: <>IL-6 and TNF-α are not just markers of RA; they are its central drivers and the direct targets of its leading biologics (tocilizumab, sarilumab, adalimumab, infliximab, etanercept). Cytokine perturbations are documented to precede clinical RA.<Ref n={2} /></> },
      { title: 'The product fit', body: <>Q-SENS measures the five-marker CIP from a 10 µL fingerstick in under 10 minutes, with no laboratory, making frequent at-home monitoring practical for the first time. PCT stays flat in an autoimmune flare, separating a true flare from joint infection. Measuring the drug targets directly lets serial readings time dosing and detect non-response.</> },
      { title: 'The opportunity', body: <>RA affects roughly 1% of adults, and biologics are among the largest drug-spend categories in medicine. A low-cost home test that detects flares earlier and makes costly therapy measurable speaks to both patient outcomes and payer cost. The trajectory is the hypothesis; the next step is prospective validation.</> },
    ],
    chart: {
      heading: 'Modeled CIP trajectory across a moderate RA flare',
      markers: RA_MARKERS,
      thresholdDay: 7,
      bandLabel: 'IL-6 / TNF-α ≥ 10× ULN',
      caption: 'Cytokines leave baseline near day 4; clinically evident inflammation (shaded band, IL-6 / TNF-α ≥ 10× upper limit of normal) begins around day 7. The panel rises measurably about three days before symptoms cross the clinical threshold, an illustrative early-warning window that warrants prospective testing. Generated from the Q-SENS cytokine simulator, not device data.',
    },
    refs: [
      <>Orr CK et al. The Utility and Limitations of CRP, ESR and DAS28-CRP in Appraising Disease Activity in Rheumatoid Arthritis. <ExtLink href="https://www.frontiersin.org/journals/medicine/articles/10.3389/fmed.2018.00185/full">Front Med (Lausanne) 2018;5:185.</ExtLink></>,
      <>Cytokine perturbations precede clinical RA onset: <ExtLink href="https://www.biorxiv.org/content/10.1101/2024.10.25.620344.full.pdf">systemic inflammation and lymphocyte activation preceding RA (preprint, 2024)</ExtLink> and <ExtLink href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12470862/">reviews of the pathogenic role of cytokines in RA (2025)</ExtLink>.</>,
    ],
    story: {
      title: 'Margaret: a flare intercepted three days early',
      profile: [
        { label: 'Age', value: '54', mono: true },
        { label: 'Sex', value: 'Female' },
        { label: 'BMI', value: '27.4', mono: true },
        { label: 'Diagnosis', value: 'Seropositive RA, 6 yrs' },
        { label: 'Therapy', value: 'Adalimumab + MTX' },
      ],
      intro: "Margaret's RA has been well controlled on an anti-TNF biologic plus methotrexate, but she has had two damaging flares in the past, each confirmed only after a week of swollen, painful hands, by which point a rescue steroid course and a missed work fortnight were unavoidable. She now does a Q-SENS fingerstick twice a week and her readings sit at a stable personal baseline.",
      steps: [
        { day: 'Day 0', body: <>Routine fingerstick. IL-6 and TNF-α sit at her usual baseline (~2–3× ULN). She feels well. <strong>No action.</strong></> },
        { day: 'Day 4', body: <>Her scheduled test shows IL-6 and TNF-α climbing past 5× ULN while PCT stays flat. The app flags a <strong>rising-trajectory alert</strong>. She still feels normal, no joint symptoms yet.</> },
        { day: 'Day 5', body: <>A confirmatory test the next morning shows the rise continuing. The trend, not a single value, and the flat PCT point to an <strong>autoimmune flare, not an infection</strong>. The data is shared with her rheumatology team.</> },
        { day: 'Day 5–6', body: <>Her rheumatologist acts <strong>before</strong> symptom onset: a short, low-dose oral corticosteroid bridge is started and the next biologic dose is brought forward, with the plan to reassess once the cytokine trend turns down.</> },
        { day: 'Day 10', body: <>Repeat fingersticks show IL-6 and TNF-α bending back toward baseline. The clinical flare she would normally have felt around day 7 stays sub-threshold.</> },
      ],
      outcome: 'The flare is blunted at the cytokine stage rather than the joint-damage stage. Margaret avoids a full symptomatic flare, a high-dose steroid rescue, and lost work days, and the episode leaves a documented trajectory her team can use to decide whether her maintenance regimen needs adjusting.',
      disclaimer: 'Illustrative scenario only. Margaret is fictional and the numbers are biologically-informed model output, not measured patient data. This is not medical advice, and Q-SENS is not yet a cleared diagnostic; any change to therapy is a clinician\u2019s decision.',
    },
  };

  const IBD = {
    num: '02',
    title: "Inflammatory Bowel Disease (Crohn's): Flare vs. Infection",
    thesis: <>A Crohn's flare is driven by a measurable Th1 cytokine surge, led by TNF-α, that begins before the patient feels it. A fingerstick serum panel that tracks that surge at home could flag flares earlier, <strong style={{ color: 'var(--text-primary)' }}>separate a flare from infection</strong>, and make anti-TNF therapy measurable rather than inferred.</>,
    cards: [
      { title: 'The gap', body: <>Crohn's is monitored with colonoscopy (invasive, infrequent) and fecal calprotectin (stool collection plus lab turnaround). CRP, the convenient serum option, is insensitive to mucosal activity. Calprotectin can rise months before a clinical flare, so subclinical activity is detectable, but the sampling burden limits how often patients are actually monitored.<Ref n={1} /></> },
      { title: 'The signal', body: <>TNF-α is the dominant effector in Crohn's and the target of its first-line biologics (infliximab, adalimumab); elevated IFN-γ marks the Th1 polarization characteristic of Crohn's. Serum Th1 cytokines correlate with fecal calprotectin and mucosal disease activity.<Ref n={2} /></> },
      { title: 'The product fit', body: <>Q-SENS measures the five-marker CIP from a 10 µL fingerstick in under 10 minutes, no laboratory and no stool sample. PCT rises only mildly in a pure flare; a sharp PCT spike instead flags an infectious complication such as abscess or perforation, a critical decision point in Crohn's. Measuring the anti-TNF target directly lets serial readings confirm response and detect non-response sooner than symptom scores.</> },
      { title: 'The opportunity', body: <>IBD affects millions of patients across the US and Europe, and anti-TNF and newer biologics are among the largest specialty-drug spends in medicine. A convenient home test that detects flares earlier, separates flare from infection, and makes costly therapy measurable speaks to both patient outcomes and payer cost.</> },
    ],
    chart: {
      heading: "Modeled CIP trajectory across a moderate Crohn's flare",
      markers: IBD_MARKERS,
      thresholdDay: 6,
      bandLabel: 'TNF-α ≥ 10× ULN',
      caption: 'Cytokines leave baseline near day 4; clinically evident inflammation (shaded band, TNF-α ≥ 10× ULN) begins around day 6. The panel rises measurably about two days before symptoms cross the clinical threshold. Note that PCT rises moderately here, a much sharper PCT spike would instead signal an infectious complication. Generated from the Q-SENS cytokine simulator, not device data.',
    },
    refs: [
      <>Fecal calprotectin reflects real-time mucosal activity and rises months before clinical flare, whereas CRP is insensitive: <ExtLink href="https://pmc.ncbi.nlm.nih.gov/articles/PMC5369738/">mapping of Crohn's outcomes to faecal calprotectin (2017)</ExtLink> and <ExtLink href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5578578/">meta-analysis of calprotectin for predicting relapse in Crohn's (2017)</ExtLink>.</>,
      <><ExtLink href="https://pmc.ncbi.nlm.nih.gov/articles/PMC5821357/">Serum Th1/Th17-associated cytokines (incl. TNF-α, IFN-γ) correlate with fecal calprotectin and mucosal disease activity in Crohn's disease (2018)</ExtLink>.</>,
    ],
    story: {
      title: 'Daniel: distinguishing a flare from an infection in time',
      profile: [
        { label: 'Age', value: '32', mono: true },
        { label: 'Sex', value: 'Male' },
        { label: 'BMI', value: '22.6', mono: true },
        { label: 'Diagnosis', value: 'Ileal Crohn\u2019s, 8 yrs' },
        { label: 'Therapy', value: 'Infliximab maintenance' },
      ],
      intro: "Daniel is in clinical remission on an anti-TNF biologic, infused every eight weeks. His past flares crept up between infusions and were twice mistaken, once for a stomach bug that delayed treatment, once treated as a flare when it was actually a small abscess. He tracks his CIP with a weekly fingerstick.",
      steps: [
        { day: 'Day 0', body: <>Baseline fingerstick, five weeks after his last infusion. TNF-α and IFN-γ at his usual low level; PCT normal. <strong>No action.</strong></> },
        { day: 'Day 4', body: <>An extra test, prompted by mild fatigue, shows <strong>TNF-α and IFN-γ rising together</strong> (the Th1 signature) past 5× ULN, while PCT rises only mildly. The pattern reads as a <strong>Crohn's flare, not an infection</strong>.</> },
        { day: 'Day 5', body: <>The flat-ish PCT is reassuring: had it spiked sharply, the team would have investigated for an abscess or perforation before touching the biologic. Here the data supports treating inflammation, not infection.</> },
        { day: 'Day 5–6', body: <>Because the surge is being caught between infusions, his gastroenterologist <strong>shortens the infusion interval</strong> and orders a trough drug-level check rather than waiting for the next scheduled dose, intercepting the flare before the symptom threshold around day 6.</> },
        { day: 'Day 12', body: <>Follow-up fingersticks show TNF-α and IFN-γ turning back down. A full symptomatic flare, and the steroid course or hospitalization it might have required, is averted.</> },
      ],
      outcome: <>Two questions that usually take days of stool tests, blood work, and clinic visits: <em>is this a flare?</em> and <em>is this an infection?</em> are answered from a single trajectory in time to act. Daniel's anti-TNF dosing is adjusted proactively rather than after mucosal damage, and an unnecessary delay or misdirected treatment is avoided.</>,
      disclaimer: 'Illustrative scenario only. Daniel is fictional and the numbers are biologically-informed model output, not measured patient data. PCT behavior in flare vs. infection is a hypothesis under study. This is not medical advice, and Q-SENS is not yet a cleared diagnostic; any change to therapy is a clinician\u2019s decision.',
    },
  };

  return (
    <div>
      <SiteHeader active="practice" />
      <BM_ScrollSpy sections={SPY} />

      <div id="overview">
        <PageHero
          eyebrow="Use cases · Chronic inflammatory disease"
          title={<>Reading the flare <em style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 300 }}>before the patient feels it</em></>}
          lead="In rheumatoid arthritis and inflammatory bowel disease, the inflammatory surge that drives a flare is measurable in blood days before symptoms appear. The Q-SENS Core Inflammation Panel turns that surge into a number a patient can track from home, and a signal a clinician can act on while there is still time to adjust therapy." />
      </div>

      {/* overview: stat row + shared idea */}
      <section style={{ paddingBottom: 'clamp(48px,7vh,84px)' }}>
        <div className="wrap">
          <Reveal>
            <StatRow items={[
              { label: 'Conditions', value: "Rheumatoid arthritis · Crohn's / IBD" },
              { label: 'Panel', value: 'IL-6, TNF-α, IL-1β, IFN-γ, IL-10', mono: true },
              { label: 'Sample', value: '10 µL fingerstick · under 10 min' },
            ]} />
          </Reveal>
          <Reveal>
            <div className="r-wide" style={{ gap: 'clamp(32px,5vw,72px)', marginTop: 56, alignItems: 'start' }}>
              <div>
                <span className="rule" style={{ marginBottom: 18 }} />
                <h2 style={{ fontSize: 'clamp(24px,3vw,34px)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.15, margin: 0 }}>The shared idea</h2>
              </div>
              <div>
                <p className="prose" style={{ fontSize: 16.5, lineHeight: 1.8, marginTop: 0 }}>Both diseases share a pattern: a relapsing course punctuated by flares, biologic drugs that target specific cytokines, and monitoring tools that are either too slow, too non-specific, or too invasive to catch a flare early. Each fingerstick adds a calibrated point to a personal inflammatory trajectory. The two use cases below apply that idea to RA and to IBD, first the thesis and the evidence, then an illustrative patient story of how earlier detection could change a treatment decision.</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 22 }}>
                  {TAGS.map((t) => (
                    <span key={t} style={{ display: 'inline-flex', alignItems: 'center', fontSize: 12.5, fontWeight: 500, color: 'var(--text-secondary)', border: '1px solid var(--border-default)', borderRadius: 999, padding: '6px 14px' }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <UseCase {...RA} />
      <UseCase {...IBD} tint />

      {/* closing: from hypothesis to validation */}
      <section id="validation" className="hairline-top" style={{ padding: 'clamp(72px,11vh,128px) 0', scrollMarginTop: 90 }}>
        <div className="wrap">
          <Reveal>
            <div style={{ maxWidth: 880 }}>
              <span className="rule" style={{ marginBottom: 22 }} />
              <div className="eyebrow" style={{ marginBottom: 16 }}>From hypothesis to validation</div>
              <h2 style={{ fontSize: 'clamp(28px,3.8vw,46px)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1.12, margin: 0 }}>The trajectories shown here are models, not clinical results.</h2>
              <p className="prose" style={{ fontSize: 17, lineHeight: 1.8, marginTop: 28, maxWidth: 780 }}>Both use cases rest on the same testable claim: the cytokines that drive RA and Crohn's flares, and that their biologics target, move measurably before symptoms do, and a fingerstick can read that movement often enough to matter. The next step is prospective validation against longitudinal patient data, pairing serial Q-SENS readings with established measures (DAS28-CRP and fecal calprotectin) and clinical flare endpoints.</p>
              <p className="serif" style={{ fontSize: 'clamp(20px,2.4vw,27px)', lineHeight: 1.5, marginTop: 36, color: 'var(--text-primary)', maxWidth: 720 }}>The goal is not another snapshot. It is a continuous, personal inflammatory trajectory, read early enough that a clinician can adjust therapy while a flare is still a number, not yet a symptom.</p>
              <div style={{ display: 'flex', gap: 12, marginTop: 40, flexWrap: 'wrap' }}>
                <a className="btn btn-primary" href="/cytokines">Open the model <ArrowRight /></a>
                <a className="btn btn-ghost" href="/inflammation">Why inflammation</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
window.PracticePage = PracticePage;
