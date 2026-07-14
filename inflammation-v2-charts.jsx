/* Biomarkr — Why inflammation v2. Branded editorial chart set.
   Pure-SVG, responsive (viewBox), monochrome + functional signal
   color used to MEAN something: positive=healthy/baseline,
   caution=drift/chronic, critical=danger threshold. Exports to window. */

/* functional palette (DS tokens) — applied via style so var() resolves in SVG */
const C = {
  ink:    'var(--text-primary)',
  ink2:   'var(--text-secondary)',
  ink3:   'var(--text-tertiary)',
  grid:   'var(--border-subtle)',
  rule:   'var(--border-default)',
  good:   'var(--signal-positive)',   /* #2f7d52 */
  warn:   'var(--signal-caution)',    /* #9a6a00 */
  bad:    'var(--signal-critical)',   /* #a23b32 */
  info:   'var(--signal-info)',       /* #36506b */
};
const MONO = 'var(--font-mono)';

/* small helper: a tracked mono axis label */
function Ax({ x, y, children, anchor = 'middle', fill = C.ink3, size = 10 }) {
  return <text x={x} y={y} textAnchor={anchor} style={{ fontFamily: MONO, fontSize: size, fill, letterSpacing: '0.04em' }}>{children}</text>;
}

/* ============================================================
   1 · ACUTE vs CHRONIC — one mechanism, two trajectories
   ============================================================ */
function AcuteChronicChart() {
  return (
    <svg width="100%" viewBox="0 0 620 250" style={{ display: 'block', overflow: 'visible' }} role="img"
      aria-label="Acute inflammation spikes then resolves to baseline; chronic inflammation rises and stays elevated for years.">
      {/* baseline */}
      <line x1="40" y1="196" x2="600" y2="196" style={{ stroke: C.rule }} strokeWidth="1" strokeDasharray="3 5" />
      <Ax x={600} y={212} anchor="end">baseline</Ax>
      {/* y label */}
      <text x="16" y="110" transform="rotate(-90 16 110)" textAnchor="middle" style={{ fontFamily: MONO, fontSize: 10, fill: C.ink3, letterSpacing: '0.04em' }}>inflammation</text>
      {/* off-switch marker */}
      <line x1="300" y1="60" x2="300" y2="190" style={{ stroke: C.grid }} strokeWidth="1" strokeDasharray="2 4" />
      <Ax x={300} y={50}>off-switch fires</Ax>
      {/* acute (positive) */}
      <path d="M40,196 C96,194 122,58 158,46 C198,30 240,184 300,195 L600,195" fill="none"
        style={{ stroke: C.good }} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {/* chronic (caution) */}
      <path d="M40,196 C114,196 156,150 220,144 C312,136 372,154 446,146 C520,138 562,150 600,144" fill="none"
        style={{ stroke: C.warn }} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="600" cy="144" r="3.5" style={{ fill: C.warn }} />
      {/* series labels */}
      <text x="158" y="34" textAnchor="middle" style={{ fontSize: 13, fontWeight: 600, fill: C.good }}>Acute</text>
      <text x="486" y="132" textAnchor="middle" style={{ fontSize: 13, fontWeight: 600, fill: C.warn }}>Chronic</text>
      <Ax x={40} y={238} anchor="start">time →</Ax>
    </svg>
  );
}

/* ============================================================
   2 · DISEASE WEB — interactive. Inflammation sits (small) at the
   center of a living web of inflammation-linked diseases. The web
   drifts and rotates on scroll; hovering a disease expands it and
   flushes its connections red-orange.
   ============================================================ */
const HUB_W = 760, HUB_H = 520, HUB_CX = 380, HUB_CY = 262, HUB_RX = 248, HUB_RY = 182;
const HOT = '#d2622e'; /* red-orange — interaction highlight only */
/* placed clockwise from top so consecutive indices form the outer ring */
const HUB = [
  { label: 'Cardiovascular disease', a: -90, tone: C.bad },
  { label: 'Type 2 diabetes',        a: -54, tone: C.warn },
  { label: 'Obesity',                a: -18, tone: C.warn },
  { label: 'Cancer',                 a: 18,  tone: C.bad },
  { label: 'Osteoarthritis',         a: 54,  tone: C.warn },
  { label: 'Alzheimer\u2019s & dementia', a: 90, tone: C.info },
  { label: 'Asthma & COPD',          a: 126, tone: C.info },
  { label: 'Depression',             a: 162, tone: C.info },
  { label: 'Kidney & liver disease', a: 198, tone: C.info },
  { label: 'Autoimmune disease',     a: 234, tone: C.warn },
];
function DiseaseHubChart() {
  const svgRef = React.useRef(null);
  const dotRefs = React.useRef([]);
  const labelRefs = React.useRef([]);
  const spokeRefs = React.useRef([]);
  const ringRefs = React.useRef([]);

  React.useEffect(() => {
    const svg = svgRef.current;
    const N = HUB.length;
    const baseA = HUB.map((n) => (n.a * Math.PI) / 180);
    const cur = HUB.map((n) => ({
      x: HUB_CX + HUB_RX * Math.cos((n.a * Math.PI) / 180),
      y: HUB_CY + HUB_RY * Math.sin((n.a * Math.PI) / 180),
      r: 5,
    }));
    const mouse = { x: 0, y: 0, on: false };
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

    let raf = 0, t = 0, last = performance.now();
    const frame = (now) => {
      t += Math.min(0.05, (now - last) / 1000); last = now;
      const rect = svg.getBoundingClientRect();
      if (mouse._e) { mouse.x = ((mouse._e.clientX - rect.left) / rect.width) * HUB_W; mouse.y = ((mouse._e.clientY - rect.top) / rect.height) * HUB_H; }
      const vh = window.innerHeight || 800;
      const prog = clamp(((rect.top + rect.height / 2) - vh * 0.5) / (vh * 0.85), -1, 1);
      const rot = reduce ? 0 : -prog * 0.4;
      const amp = reduce ? 0 : 5;

      /* which disease is hovered (nearest within hit radius) */
      let hov = -1, best = 54;
      if (mouse.on) {
        for (let i = 0; i < N; i++) {
          const d = Math.hypot(cur[i].x - mouse.x, cur[i].y - mouse.y);
          if (d < best) { best = d; hov = i; }
        }
      }

      for (let i = 0; i < N; i++) {
        const ang = baseA[i] + rot;
        let bx = HUB_CX + HUB_RX * Math.cos(ang) + Math.sin(t * 0.8 + i * 1.7) * amp;
        let by = HUB_CY + HUB_RY * Math.sin(ang) + Math.cos(t * 0.7 + i * 1.1) * amp;
        if (i === hov) { bx += Math.cos(ang) * 18; by += Math.sin(ang) * 18; } /* expand outward */
        cur[i].x += (bx - cur[i].x) * 0.14;
        cur[i].y += (by - cur[i].y) * 0.14;
        cur[i].r += ((i === hov ? 11 : 5) - cur[i].r) * 0.2;

        const p = cur[i], dot = dotRefs.current[i], lab = labelRefs.current[i], sp = spokeRefs.current[i];
        if (dot) { dot.setAttribute('cx', p.x); dot.setAttribute('cy', p.y); dot.setAttribute('r', p.r); dot.style.fill = i === hov ? HOT : HUB[i].tone; }
        if (sp) {
          sp.setAttribute('x2', p.x); sp.setAttribute('y2', p.y);
          const on = i === hov; sp.style.stroke = on ? HOT : C.rule; sp.style.strokeWidth = on ? '2' : '1.1';
          sp.style.opacity = hov >= 0 && !on ? '0.4' : '1';
        }
        if (lab) {
          const mid = Math.abs(p.y - HUB_CY) < 60;
          let anchor, lx, ly;
          if (mid) { if (p.x < HUB_CX) { anchor = 'end'; lx = p.x - 14; } else { anchor = 'start'; lx = p.x + 14; } ly = p.y + 4; }
          else { anchor = 'middle'; lx = p.x; ly = p.y < HUB_CY ? p.y - 16 : p.y + 24; }
          lab.setAttribute('text-anchor', anchor); lab.setAttribute('x', lx); lab.setAttribute('y', ly);
          lab.style.fontWeight = i === hov ? '700' : '500';
          lab.style.fontSize = i === hov ? '15px' : '13px';
          lab.style.fill = i === hov ? C.ink : (hov >= 0 ? C.ink3 : C.ink);
        }
      }
      /* ring */
      for (let i = 0; i < N; i++) {
        const a = cur[i], b = cur[(i + 1) % N], ln = ringRefs.current[i];
        if (!ln) continue;
        ln.setAttribute('x1', a.x); ln.setAttribute('y1', a.y); ln.setAttribute('x2', b.x); ln.setAttribute('y2', b.y);
        const on = hov === i || hov === (i + 1) % N;
        ln.style.stroke = on ? HOT : C.rule; ln.style.strokeWidth = on ? '1.8' : '0.9';
        ln.style.opacity = hov >= 0 && !on ? '0.4' : '1';
      }
      raf = requestAnimationFrame(frame);
    };
    const toSvg = (e) => { mouse._e = e; mouse.on = true; };
    const off = () => { mouse.on = false; mouse._e = null; };
    svg.addEventListener('pointermove', toSvg);
    svg.addEventListener('pointerleave', off);
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); svg.removeEventListener('pointermove', toSvg); svg.removeEventListener('pointerleave', off); };
  }, []);

  const init = HUB.map((n) => ({
    x: HUB_CX + HUB_RX * Math.cos((n.a * Math.PI) / 180),
    y: HUB_CY + HUB_RY * Math.sin((n.a * Math.PI) / 180),
  }));
  const r = 40;
  return (
    <svg ref={svgRef} width="100%" viewBox={`0 0 ${HUB_W} ${HUB_H}`} style={{ display: 'block', overflow: 'visible', cursor: 'crosshair', touchAction: 'pan-y' }} role="img"
      aria-label="Interactive web: chronic inflammation at the center, linked to ten inflammation-driven diseases. Hover a disease to expand it and highlight its connections.">
      <defs>
        <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={C.warn} stopOpacity="0.16" />
          <stop offset="100%" stopColor={C.warn} stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* ring web */}
      {HUB.map((n, i) => (
        <line key={'r' + i} ref={(el) => (ringRefs.current[i] = el)}
          x1={init[i].x} y1={init[i].y} x2={init[(i + 1) % HUB.length].x} y2={init[(i + 1) % HUB.length].y}
          style={{ stroke: C.rule }} strokeWidth="0.9" />
      ))}
      {/* spokes */}
      {HUB.map((n, i) => (
        <line key={'s' + i} ref={(el) => (spokeRefs.current[i] = el)}
          x1={HUB_CX} y1={HUB_CY} x2={init[i].x} y2={init[i].y}
          style={{ stroke: C.rule }} strokeWidth="1.1" />
      ))}
      {/* center node (small) */}
      <circle cx={HUB_CX} cy={HUB_CY} r={r + 30} fill="url(#hubGlow)" />
      <circle cx={HUB_CX} cy={HUB_CY} r={r} fill="var(--surface-inverse)" />
      <circle cx={HUB_CX} cy={HUB_CY} r={r} fill="none" style={{ stroke: C.warn }} strokeWidth="1.5" />
      <text x={HUB_CX} y={HUB_CY - 4} textAnchor="middle" style={{ fontSize: 11.5, fontWeight: 600, fill: 'var(--surface-page)' }}>Chronic</text>
      <text x={HUB_CX} y={HUB_CY + 11} textAnchor="middle" style={{ fontSize: 11.5, fontWeight: 600, fill: 'var(--surface-page)' }}>inflammation</text>
      {/* disease nodes + labels */}
      {HUB.map((n, i) => {
        const mid = Math.abs(init[i].y - HUB_CY) < 60;
        const anchor = mid ? (init[i].x < HUB_CX ? 'end' : 'start') : 'middle';
        const lx = mid ? (init[i].x < HUB_CX ? init[i].x - 14 : init[i].x + 14) : init[i].x;
        const ly = mid ? init[i].y + 4 : (init[i].y < HUB_CY ? init[i].y - 16 : init[i].y + 24);
        return (
          <g key={'n' + i}>
            <circle ref={(el) => (dotRefs.current[i] = el)} cx={init[i].x} cy={init[i].y} r="5" style={{ fill: n.tone }} />
            <text ref={(el) => (labelRefs.current[i] = el)} x={lx} y={ly} textAnchor={anchor}
              style={{ fontSize: 13, fill: C.ink, fontWeight: 500 }}>{n.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

/* ============================================================
   3 · BLIND SPOT — a fast process, sampled slowly
   ============================================================ */
function BlindSpotChart() {
  const ticks = [['hours', 92], ['days', 196], ['weeks', 312], ['months', 432], ['a year', 568]];
  return (
    <svg width="100%" viewBox="0 0 620 210" style={{ display: 'block', overflow: 'visible' }} role="img"
      aria-label="Inflammation changes over hours to days, but is measured only every few months — a large unobserved gap.">
      {/* how fast it changes (good) */}
      <Ax x={150} y={28} anchor="middle" fill={C.ink3}>how fast it changes</Ax>
      <rect x="78" y="36" width="144" height="30" rx="15" style={{ fill: C.good }} />
      <text x="150" y="56" textAnchor="middle" style={{ fontSize: 12.5, fontWeight: 500, fill: '#fff' }}>hours to days</text>
      {/* how often we look (ink) */}
      <Ax x={470} y={28} anchor="middle" fill={C.ink3}>how often we look</Ax>
      <rect x="392" y="36" width="190" height="30" rx="15" fill="var(--surface-inverse)" />
      <text x="487" y="56" textAnchor="middle" style={{ fontSize: 12.5, fontWeight: 500, fill: 'var(--surface-page)' }}>every few months</text>
      {/* blind spot bracket */}
      <line x1="222" y1="98" x2="392" y2="98" style={{ stroke: C.warn }} strokeWidth="1.4" />
      <line x1="222" y1="92" x2="222" y2="104" style={{ stroke: C.warn }} strokeWidth="1.4" />
      <line x1="392" y1="92" x2="392" y2="104" style={{ stroke: C.warn }} strokeWidth="1.4" />
      <text x="307" y="90" textAnchor="middle" style={{ fontFamily: MONO, fontSize: 10.5, fill: C.warn, letterSpacing: '0.04em' }}>the blind spot</text>
      {/* axis */}
      <line x1="60" y1="150" x2="600" y2="150" style={{ stroke: C.rule }} strokeWidth="1" />
      {ticks.map(([lab, x], i) => (
        <g key={i}>
          <line x1={x} y1="150" x2={x} y2="157" style={{ stroke: C.rule }} strokeWidth="1" />
          <Ax x={x} y={172}>{lab}</Ax>
        </g>
      ))}
    </svg>
  );
}

/* ============================================================
   3b · EARLY ACTION — repeatable testing reveals the climb
        before symptoms, removing the blind spot
   ============================================================ */
function EarlyActionChart() {
  /* curve points (x → y); y smaller = higher inflammation */
  const dots = [[200, 196], [250, 186], [300, 160], [350, 135], [400, 112], [450, 90], [490, 78]];
  return (
    <svg width="100%" viewBox="0 0 640 272" style={{ display: 'block', overflow: 'visible' }} role="img"
      aria-label="Inflammation climbs for weeks before symptoms emerge. Repeatable testing samples the rise and opens a window for early action — the old blind spot, removed.">
      {/* y label */}
      <text x="18" y="135" transform="rotate(-90 18 135)" textAnchor="middle" style={{ fontFamily: MONO, fontSize: 10, fill: C.ink3, letterSpacing: '0.04em' }}>inflammation</text>

      {/* window for early action (shaded) */}
      <rect x="200" y="56" width="300" height="164" style={{ fill: C.warn }} opacity="0.08" />

      {/* personal baseline band */}
      <rect x="56" y="200" width="544" height="18" style={{ fill: C.good }} opacity="0.13" />
      <text x="62" y="213" style={{ fontFamily: MONO, fontSize: 9.5, fill: C.good, letterSpacing: '0.04em' }}>personal baseline</text>

      {/* symptoms threshold */}
      <line x1="500" y1="56" x2="500" y2="220" style={{ stroke: C.bad }} strokeWidth="1.2" strokeDasharray="4 5" />
      <text x="500" y="46" textAnchor="middle" style={{ fontSize: 12, fontWeight: 600, fill: C.bad }}>symptoms emerge</text>

      {/* inflammation curve */}
      <path d="M56,208 C140,206 175,202 200,196 C250,186 290,166 340,140 C390,114 440,92 500,74 C540,62 565,58 596,55"
        fill="none" style={{ stroke: C.warn }} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

      {/* in-window note */}
      <text x="300" y="80" textAnchor="middle" style={{ fontFamily: MONO, fontSize: 10.5, fill: C.warn, letterSpacing: '0.03em' }}>rising — caught on the way up</text>

      {/* repeatable test dots */}
      {dots.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4.5" style={{ fill: C.warn }} />)}
      {/* emphasized "act here" point */}
      <circle cx="250" cy="186" r="9" fill="none" style={{ stroke: C.warn }} strokeWidth="1.6" />
      <text x="250" y="166" textAnchor="middle" style={{ fontSize: 11, fontWeight: 600, fill: C.warn }}>act here</text>

      {/* current single snapshot — too late */}
      <circle cx="500" cy="74" r="6" fill="var(--surface-page)" style={{ stroke: C.ink }} strokeWidth="2" />
      <line x1="508" y1="76" x2="556" y2="86" style={{ stroke: C.ink3 }} strokeWidth="1" />
      <text x="560" y="90" textAnchor="start" style={{ fontSize: 10.5, fill: C.ink2 }}>single test, too late</text>

      {/* axis */}
      <line x1="56" y1="220" x2="600" y2="220" style={{ stroke: C.rule }} strokeWidth="1" />
      <Ax x={56} y={240} anchor="start">weeks before symptoms →</Ax>

      {/* window bracket */}
      <line x1="200" y1="252" x2="500" y2="252" style={{ stroke: C.warn }} strokeWidth="1.4" />
      <line x1="200" y1="246" x2="200" y2="252" style={{ stroke: C.warn }} strokeWidth="1.4" />
      <line x1="500" y1="246" x2="500" y2="252" style={{ stroke: C.warn }} strokeWidth="1.4" />
      <text x="350" y="266" textAnchor="middle" style={{ fontFamily: MONO, fontSize: 10.5, fill: C.warn, letterSpacing: '0.04em' }}>window for early action — once the blind spot</text>
    </svg>
  );
}

/* ============================================================
   4 · IBD RELAPSE — a relapse builds between visits
   ============================================================ */
function RelapseChart() {
  return (
    <svg width="100%" viewBox="0 0 580 170" style={{ display: 'block', overflow: 'visible' }} role="img"
      aria-label="Between checkups 8 to 12 weeks apart, a relapse builds and crosses the relapse threshold before the next visit.">
      <rect x="44" y="42" width="492" height="46" style={{ fill: C.bad }} opacity="0.09" />
      <line x1="44" y1="50" x2="536" y2="50" style={{ stroke: C.bad }} strokeWidth="1" strokeDasharray="4 5" />
      <Ax x={532} y={40} anchor="end" fill={C.bad}>relapse threshold</Ax>
      <line x1="44" y1="128" x2="556" y2="128" style={{ stroke: C.rule }} strokeWidth="1" />
      {/* curve */}
      <path d="M94,124 C176,124 216,120 258,108 C310,94 350,56 424,40 C444,35 466,33 488,32" fill="none"
        style={{ stroke: C.warn }} strokeWidth="3" strokeLinecap="round" />
      <text x="300" y="80" textAnchor="middle" style={{ fontSize: 11.5, fontWeight: 600, fill: C.warn }}>biologic quietly stops working</text>
      {/* visit dots */}
      <circle cx="94" cy="128" r="5" style={{ fill: C.ink }} />
      <circle cx="488" cy="128" r="5" style={{ fill: C.ink }} />
      <Ax x={94} y={150} anchor="middle">visit</Ax>
      <Ax x={556} y={150} anchor="end">next visit · 8–12 weeks later</Ax>
    </svg>
  );
}

/* ============================================================
   5 · RA SUBCLINICAL — remission by score, still inflamed
   ============================================================ */
function SubclinicalChart() {
  return (
    <svg width="100%" viewBox="0 0 580 170" style={{ display: 'block', overflow: 'visible' }} role="img"
      aria-label="The clinical activity score drops into the remission zone while subclinical inflammation stays elevated underneath.">
      <rect x="44" y="104" width="512" height="30" style={{ fill: C.good }} opacity="0.12" />
      <text x="52" y="123" style={{ fontFamily: MONO, fontSize: 10, fill: C.good, letterSpacing: '0.04em' }}>remission zone (by score)</text>
      <line x1="44" y1="134" x2="556" y2="134" style={{ stroke: C.rule }} strokeWidth="1" />
      {/* clinical score drops into remission */}
      <path d="M52,44 C148,50 220,104 312,114 C394,121 472,116 556,116" fill="none"
        style={{ stroke: C.ink }} strokeWidth="3" strokeLinecap="round" />
      {/* subclinical stays elevated */}
      <path d="M52,74 C156,78 238,76 330,79 C414,81 484,78 556,80" fill="none"
        style={{ stroke: C.warn }} strokeWidth="2.6" strokeDasharray="7 5" strokeLinecap="round" />
      <text x="120" y="34" style={{ fontSize: 11.5, fontWeight: 600, fill: C.ink }}>clinical score</text>
      <text x="540" y="68" textAnchor="end" style={{ fontSize: 11.5, fontWeight: 600, fill: C.warn }}>inflammation still active</text>
      <Ax x={52} y={158} anchor="start">time →</Ax>
    </svg>
  );
}

/* ============================================================
   6 · FREQUENCY — quarterly snapshot vs continuous slope
   ============================================================ */
function FrequencyChart() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
        <span className="eyebrow" style={{ fontSize: 11 }}>Quarterly draw</span>
        <span style={{ fontFamily: MONO, fontSize: 12, color: 'var(--text-tertiary)' }}>4 points / year</span>
      </div>
      <svg width="100%" viewBox="0 0 600 64" preserveAspectRatio="none" style={{ display: 'block' }} role="img" aria-label="Four isolated data points across a year — no visible trend.">
        <line x1="8" y1="46" x2="592" y2="46" style={{ stroke: C.rule }} strokeWidth="1" />
        {[[60, 34], [230, 40], [400, 28], [555, 38]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4.5" style={{ fill: C.ink3 }} />)}
      </svg>
      <div style={{ height: 1, background: 'var(--border-subtle)', margin: '22px 0' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
        <span className="eyebrow" style={{ fontSize: 11 }}>Continuous readout</span>
        <span style={{ fontFamily: MONO, fontSize: 12, color: 'var(--text-tertiary)' }}>a visible slope</span>
      </div>
      <svg width="100%" viewBox="0 0 600 72" preserveAspectRatio="none" style={{ display: 'block' }} role="img" aria-label="A continuous curve that rises and falls, revealing a trend over time.">
        <path d="M0,50 C80,48 120,44 170,34 S260,8 330,18 S430,58 490,48 S560,36 600,34" fill="none" style={{ stroke: C.warn }} strokeWidth="2.6" strokeLinecap="round" />
      </svg>
    </div>
  );
}

Object.assign(window, {
  IV2_AcuteChronic: AcuteChronicChart,
  IV2_DiseaseHub: DiseaseHubChart,
  IV2_BlindSpot: BlindSpotChart,
  IV2_EarlyAction: EarlyActionChart,
  IV2_Relapse: RelapseChart,
  IV2_Subclinical: SubclinicalChart,
  IV2_Frequency: FrequencyChart,
});
