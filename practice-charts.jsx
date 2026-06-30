/* Biomarkr. Use cases. Modeled CIP (Core Inflammation Panel) trajectory
   charts for the RA and Crohn's flare scenarios. Pure-SVG, responsive,
   monochrome with functional-signal color used to MEAN something:
   the lead drug-target cytokine in ink, the rest in grey, PCT dashed,
   and the critical signal reserved for the symptomatic-flare band.
   Trajectories are biologically-informed model output, not device data.
   Exports to window for practice.jsx. */

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

Object.assign(window, {
  UC_CipPanel: CipPanel,
  UC_RA_MARKERS: RA_MARKERS,
  UC_IBD_MARKERS: IBD_MARKERS,
});
