/* Biomarkr — Technology page diagrams. Hand-built SVG in the brand's
   monochrome register: ink / paper / grey, with var(--signal-info) used
   only for the optical/active elements and critical/positive reserved for
   biomarker direction. Replaces the CSO draft's navy/teal sketches.
   Exports to window for technology.jsx to compose. */

/* ---- Figure shell: card + mono caption + note (matches site cards) ---- */
function Figure({ title, note, children, padded = true }) {
  const { Card } = window.BiomarkrDesignSystem_734cca;
  return (
    <Card padding="lg" style={{ background: 'var(--surface-page)' }}>
      {title && <div className="eyebrow" style={{ fontSize: 10.5, marginBottom: 18 }}>{title}</div>}
      <div style={{ padding: padded ? '4px 0' : 0 }}>{children}</div>
      {note && <p style={{ margin: '18px 0 0', fontSize: 12.5, fontStyle: 'italic', color: 'var(--text-tertiary)', lineHeight: 1.6 }}>{note}</p>}
    </Card>
  );
}

/* ============================================================
   1 — Evanescent-wave selective excitation
   Why whole blood works without separation.
   ============================================================ */
function EvanescentDiagram() {
  // blood cells scattered in the bulk (outside the field)
  const cells = [
    [150, 70, 26, 16], [300, 56, 24, 15], [455, 76, 27, 16], [620, 54, 24, 15],
    [770, 84, 26, 16], [228, 104, 22, 14], [545, 110, 24, 15], [690, 108, 22, 14], [380, 116, 20, 13],
  ];
  const complexX = [250, 470, 690];
  return (
    <svg width="100%" viewBox="0 0 900 300" style={{ display: 'block', overflow: 'visible' }} fontFamily="var(--font-sans)">
      {/* bulk sample region */}
      <rect x="20" y="18" width="860" height="156" fill="var(--surface-tint)" stroke="var(--border-subtle)" strokeWidth="1" rx="4" />
      <text x="38" y="40" fontSize="12" fill="var(--text-tertiary)" fontStyle="italic">Whole-blood sample — cells sit outside the light entirely</text>
      {/* blood cells: outline biconcave discs */}
      {cells.map(([cx, cy, rx, ry], i) => (
        <g key={i}>
          <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke="var(--text-tertiary)" strokeWidth="1.4" opacity="0.7" />
          <ellipse cx={cx} cy={cy} rx={rx * 0.42} ry={ry * 0.42} fill="none" stroke="var(--text-tertiary)" strokeWidth="1.1" opacity="0.45" />
        </g>
      ))}
      <text x="770" y="150" fontSize="10.5" fill="var(--text-tertiary)" textAnchor="middle" fontFamily="var(--font-mono)">RBC · 6–8 µm</text>

      {/* evanescent field band ~50-150nm — the active zone (info accent) */}
      <rect x="20" y="174" width="860" height="24" fill="var(--signal-info)" opacity="0.16" />
      <rect x="20" y="174" width="860" height="12" fill="var(--signal-info)" opacity="0.26" />
      <text x="38" y="190" fontSize="11" fill="var(--signal-info)" fontWeight="600" fontFamily="var(--font-mono)" letterSpacing="0.04em">EVANESCENT FIELD · ~50–150 nm</text>

      {/* waveguide */}
      <rect x="20" y="198" width="860" height="34" fill="var(--text-primary)" />
      <line x1="34" y1="215" x2="862" y2="215" stroke="var(--signal-info)" strokeWidth="2.5" opacity="0.9" />
      <polygon points="868,215 854,210 854,220" fill="var(--signal-info)" />
      <text x="38" y="225" fontSize="9.5" fill="var(--grey-350)" fontFamily="var(--font-mono)">Guided excitation light · silicon planar waveguide</text>
      {/* chip base */}
      <rect x="20" y="232" width="860" height="20" fill="var(--grey-900, #111)" opacity="0.92" />
      <rect x="20" y="232" width="860" height="20" fill="var(--text-primary)" />
      <text x="450" y="246" fontSize="10" fill="var(--grey-400)" textAnchor="middle" fontFamily="var(--font-mono)" letterSpacing="0.06em">SILICON PHOTONIC CHIP</text>

      {/* immunocomplexes: capture Y + antigen + detection Y + fluorophore */}
      {complexX.map((x, i) => (
        <g key={i} stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round">
          {/* capture antibody (Y rooted on surface) */}
          <path d={`M${x} 198 l-7 -17 M${x} 198 l7 -17`} fill="none" />
          {/* antigen */}
          <circle cx={x} cy="178" r="5.5" fill="var(--text-secondary)" stroke="none" />
          {/* detection antibody */}
          <path d={`M${x} 173 l-7 -15 M${x} 173 l7 -15`} fill="none" />
          {/* fluorophore, excited (info) */}
          <circle cx={x} cy="156" r="5" fill="var(--signal-info)" stroke="none" />
          <circle cx={x} cy="156" r="11" fill="none" stroke="var(--signal-info)" strokeWidth="1" opacity="0.5" />
          <circle cx={x} cy="156" r="16" fill="none" stroke="var(--signal-info)" strokeWidth="0.8" opacity="0.25" />
        </g>
      ))}
      <text x="690" y="128" fontSize="10.5" fill="var(--text-secondary)" textAnchor="middle">fluorophore excited at the surface</text>
    </svg>
  );
}

/* ============================================================
   2 — Waveguide matrix: 4 inputs × 8 outputs = 32 sites
   ============================================================ */
function MultiplexMatrix() {
  const rows = [60, 112, 164, 216];
  const cols = [110, 190, 270, 350, 430, 510, 590, 670];
  const cip = ['IL-6', 'TNF-α', 'IL-1β', 'IFN-γ', 'IL-10'];
  return (
    <svg width="100%" viewBox="0 0 760 300" style={{ display: 'block', overflow: 'visible' }} fontFamily="var(--font-sans)">
      <text x="34" y="22" fontSize="11" fill="var(--text-tertiary)" fontWeight="600" fontFamily="var(--font-mono)" letterSpacing="0.06em">4 OPTICAL INPUTS</text>
      {/* input lines (horizontal) */}
      {rows.map((y, i) => (
        <g key={'r' + i}>
          <line x1="70" y1={y} x2="690" y2={y} stroke="var(--text-tertiary)" strokeWidth="2" opacity="0.55" />
          <text x="44" y={y + 4} fontSize="10" fill="var(--text-tertiary)" fontFamily="var(--font-mono)">in{i + 1}</text>
        </g>
      ))}
      {/* output lines (vertical) */}
      {cols.map((x, i) => <line key={'c' + i} x1={x} y1="40" x2={x} y2="248" stroke="var(--text-tertiary)" strokeWidth="2" opacity="0.4" />)}
      <text x="690" y="270" fontSize="11" fill="var(--text-tertiary)" fontWeight="600" textAnchor="end" fontFamily="var(--font-mono)" letterSpacing="0.06em">8 OUTPUTS</text>
      {/* 32 nodes */}
      {rows.map((y, ri) => cols.map((x, ci) => {
        const isCip = ri === 0 && ci < 5;
        return (
          <g key={ri + '-' + ci}>
            {isCip
              ? <g><circle cx={x} cy={y} r="6.5" fill="var(--text-primary)" /><circle cx={x} cy={y} r="12" fill="none" stroke="var(--text-primary)" strokeWidth="1.4" /></g>
              : <circle cx={x} cy={y} r="4.5" fill="var(--text-tertiary)" opacity="0.6" />}
          </g>
        );
      }))}
      {/* CIP labels */}
      {cip.map((m, i) => <text key={m} x={cols[i]} y="288" fontSize="9.5" fill="var(--text-secondary)" textAnchor="middle" fontFamily="var(--font-mono)">{m}</text>)}
      <text x={cols[6]} y="285" fontSize="9" fill="var(--text-tertiary)" textAnchor="middle" fontFamily="var(--font-mono)">controls /</text>
      <text x={cols[6]} y="296" fontSize="9" fill="var(--text-tertiary)" textAnchor="middle" fontFamily="var(--font-mono)">standards</text>
    </svg>
  );
}

/* ============================================================
   3 — Snapshot vs trajectory
   One reading, two possible futures.
   ============================================================ */
function SnapshotTrajectoryChart() {
  const W = 720, H = 300, pad = { l: 56, r: 30, t: 28, b: 60 };
  const n = 13;
  const rising = [1, 1.1, 1.3, 1.6, 2.0, 2.6, 3.3, 4.0, 4.45, 4.55, 4.35, 3.9, 3.4];
  const falling = [4.55, 4.0, 3.5, 3.0, 2.6, 2.2, 1.9, 1.7, 1.5, 1.4, 1.3, 1.2, 1.15];
  const max = 5, min = 0.5;
  const hit = 6; // both ≈ 3.3 here
  const px = (i) => pad.l + (i * (W - pad.l - pad.r)) / (n - 1);
  const py = (v) => H - pad.b - ((v - min) / (max - min)) * (H - pad.t - pad.b);
  const line = (d) => d.map((v, i) => `${i ? 'L' : 'M'} ${px(i).toFixed(1)} ${py(v).toFixed(1)}`).join(' ');
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block', overflow: 'visible' }} fontFamily="var(--font-sans)">
      {[1, 2, 3, 4, 5].map((g) => (
        <g key={g}>
          <line x1={pad.l} x2={W - pad.r} y1={py(g)} y2={py(g)} stroke="var(--border-subtle)" strokeWidth="1" />
          <text x={pad.l - 10} y={py(g) + 3} fontSize="10" fill="var(--text-tertiary)" textAnchor="end" fontFamily="var(--font-mono)">{g}×</text>
        </g>
      ))}
      <line x1={pad.l} x2={pad.l} y1={pad.t} y2={H - pad.b} stroke="var(--border-default)" strokeWidth="1" />
      {/* x ticks */}
      {[0, 2, 4, 6, 8, 10, 12].map((d) => (
        <text key={d} x={px(d)} y={H - pad.b + 18} fontSize="10" fill="var(--text-tertiary)" textAnchor="middle" fontFamily="var(--font-mono)">{d}</text>
      ))}
      <text x={(pad.l + W - pad.r) / 2} y={H - pad.b + 36} fontSize="10.5" fill="var(--text-tertiary)" textAnchor="middle">Days of monitoring</text>
      {/* decision line at snapshot */}
      <line x1={px(hit)} x2={px(hit)} y1={pad.t} y2={H - pad.b} stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
      {/* two trajectories */}
      <path d={line(rising)} fill="none" stroke="var(--signal-critical)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d={line(falling)} fill="none" stroke="var(--signal-positive)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      {/* the single shared reading */}
      <rect x={px(hit) - 6.5} y={py(3.3) - 6.5} width="13" height="13" rx="1.5" fill="var(--text-primary)" transform={`rotate(45 ${px(hit)} ${py(3.3)})`} />
      <text x={px(hit)} y={py(3.3) - 16} fontSize="10" fill="var(--text-primary)" textAnchor="middle" fontWeight="600">one reading, two futures</text>
      <text x={px(n - 1)} y={py(rising[n - 1]) - 8} fontSize="10" fill="var(--signal-critical)" textAnchor="end" fontWeight="600">Rising · flare</text>
      <text x={px(n - 1)} y={py(falling[n - 1]) + 16} fontSize="10" fill="var(--signal-positive)" textAnchor="end" fontWeight="600">Falling · resolving</text>
    </svg>
  );
}

Object.assign(window, {
  TECH_Figure: Figure,
  TECH_EvanescentDiagram: EvanescentDiagram,
  TECH_MultiplexMatrix: MultiplexMatrix,
  TECH_SnapshotTrajectoryChart: SnapshotTrajectoryChart,
});
