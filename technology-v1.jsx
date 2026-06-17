/* Biomarkr — Technology page. Silicon photonic biosensor, how it works,
   spec comparison, the trajectory thesis + AI/ML, the five-cytokine panel,
   and platform scalability. Globals (Reveal, Lockup, PageHero, CTABand,
   Trajectory, SiteHeader, SiteFooter, ArrowRight) come from chrome.jsx. */

const { Card, Badge, Tag } = window.BiomarkrDesignSystem_734cca;
/* PageHero, CTABand, Trajectory, Reveal, Lockup, SiteHeader, SiteFooter, ArrowRight are globals from chrome.jsx */

/* ---- How it works steps ---- */
function HowItWorks() {
  const steps = [
    ['01', 'A finger-prick', '10 µL of unprocessed whole blood meets the cartridge. No venipuncture, no centrifuge, no dilution, no sample prep of any kind.'],
    ['02', 'Silicon photonic chip', 'The cartridge carries a chip with 32 sensors, each functionalized with a cytokine-specific capture antibody — a laboratory immunoassay, miniaturized.'],
    ['03', 'A fluorescent sandwich', 'When a cytokine binds, a fluorescently-labelled secondary antibody binds to it. Evanescent-wave excitation reads the growing signal in real time — no wash steps, no enzymatic amplification.'],
    ['04', 'A result in minutes', 'Five cytokines, quantified at single pg/mL sensitivity in whole blood, validated head-to-head against Luminex — in under ten minutes, anywhere.'],
  ];
  return (
    <section className="hairline-top" style={{ padding: '6.5rem 0' }}>
      <div className="wrap">
        <Reveal><Lockup eyebrow="How it works" title="ELISA on a chip" sub="Detection is based on evanescent-wave optical sensing on a silicon photonic chip — the gold-standard immunoassay, rebuilt at semiconductor scale." /></Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 28, marginTop: 56 }}>
          {steps.map((s, i) => (
            <Reveal key={s[0]} delay={i * 80}>
              <div style={{ borderTop: '2px solid var(--text-primary)', paddingTop: 20, height: '100%' }}>
                <div className="tabular" style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600, color: 'var(--text-tertiary)', letterSpacing: '0.1em' }}>{s[0]}</div>
                <h3 style={{ fontSize: 20, fontWeight: 400, letterSpacing: '-0.015em', margin: '14px 0 10px' }}>{s[1]}</h3>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{s[2]}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Spec comparison ---- */
function SpecTable() {
  const rows = [
    ['Analytes', '5 cytokines simultaneously', 'One per ELISA, or lab-bound 5-plex'],
    ['Sample', '10 µL fingerstick, no prep', '2–5 mL venipuncture + centrifuge'],
    ['Sensitivity', 'Single pg/mL in whole blood', '1–10 pg/mL in separated serum'],
    ['Time to result', 'Under 10 minutes', '24–72 hours (central lab)'],
    ['Cost per panel', '~$15 at scale', '$200–$800'],
    ['Infrastructure', 'Patient-operable, ambient storage', 'Lab, operator, cold chain'],
  ];
  return (
    <section className="hairline-top" style={{ padding: '6.5rem 0' }}>
      <div className="wrap">
        <Reveal><Lockup eyebrow="Performance" title="Lab results, without the lab" /></Reveal>
        <Reveal delay={100}>
          <div style={{ marginTop: 48, border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.3fr 1.3fr', background: 'var(--surface-tint)', borderBottom: '1px solid var(--border-default)' }}>
              {['', 'Q-SENS', 'Current lab standard'].map((h, i) => (
                <div key={i} className="eyebrow" style={{ padding: '16px 22px', fontSize: 11, color: i === 1 ? 'var(--text-primary)' : 'var(--text-tertiary)' }}>{h}</div>
              ))}
            </div>
            {rows.map((r, i) => (
              <div key={r[0]} style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.3fr 1.3fr', borderBottom: i < rows.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                <div style={{ padding: '18px 22px', fontSize: 13.5, fontWeight: 600, color: 'var(--text-secondary)' }}>{r[0]}</div>
                <div style={{ padding: '18px 22px', fontSize: 14.5, color: 'var(--text-primary)', background: 'var(--surface-tint)' }}>{r[1]}</div>
                <div style={{ padding: '18px 22px', fontSize: 14.5, color: 'var(--text-tertiary)' }}>{r[2]}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---- Trajectory thesis ---- */
const RA_LINES = [
  { data: [11, 12, 11, 13, 12, 14, 18, 26, 34, 30], dash: '0' },
  { data: [10, 11, 10, 11, 10, 11, 11, 12, 11, 12], dash: '5 5' },
];
function TrajectoryThesis() {
  return (
    <section className="hairline-top" style={{ padding: '6.5rem 0' }}>
      <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px,6vw,80px)', alignItems: 'center' }}>
        <Reveal>
          <Lockup eyebrow="The thesis" title="A snapshot can't see a trajectory" />
          <div className="prose" style={{ marginTop: 24, maxWidth: 480 }}>
            <p style={{ marginTop: 0 }}>A single cytokine value is meaningless. Levels swing on timescales of hours to days, and depend on your baseline, age, stress, and time of day. A quarterly blood draw is structurally blind to the immune dynamics that actually matter.</p>
            <p><strong>The clinically meaningful signal lives in the trajectory</strong> — the rate of change against your personal baseline, the ratios between markers, the way the whole system co-evolves. That's what Q-SENS is built to capture.</p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <Card padding="lg">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>IL-6 · pre-symptomatic flare</div>
              <Badge tone="caution" dot>Rising 5 days early</Badge>
            </div>
            <Trajectory width={520} height={220} lines={RA_LINES} labels={['−9d', '', '', '', '', '', 'flare', '', '', '+1d']} />
            <p style={{ margin: '14px 0 0', fontSize: 12.5, color: 'var(--text-tertiary)', lineHeight: 1.6 }}>Cytokines rise 3–5 days before a clinical RA flare declares — invisible to single-timepoint testing, the window where intervention still works.</p>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}

/* ---- AI/ML enabler ---- */
function MLLayer() {
  const feats = [
    ['Personal baselines', 'Circadian-normalized, wake-corrected references built per individual — not a population average. Up to 40% of apparent deviations are circadian noise without it.'],
    ['Rate of change', 'How fast each cytokine is moving relative to your own baseline — the earliest signal of a flare building or a therapy taking hold.'],
    ['Cytokine ratios', 'IL-6 : IL-10 as a measure of counter-regulatory balance. IFN-γ : TNF-α as a Th1-versus-innate signature. Meaning lives in the relationships.'],
    ['System co-evolution', 'Five analytes moving together over weeks form a temporal signature no single-analyte rule — and no physician reading snapshots — can extract.'],
  ];
  return (
    <section style={{ background: 'var(--surface-tint)', padding: '6.5rem 0' }}>
      <div className="wrap">
        <Reveal><Lockup eyebrow="Software" title="AI that gets smarter with every test" sub="Longitudinal cytokine trajectories are high-dimensional. The signal isn't in any one reading — it requires algorithmic extraction. Frequency is what makes the model possible." /></Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, marginTop: 52 }}>
          {feats.map((f, i) => (
            <Reveal key={f[0]} delay={i * 70}>
              <Card padding="lg" tone="page" style={{ height: '100%' }}>
                <h3 style={{ fontSize: 17, fontWeight: 600, margin: '0 0 10px' }}>{f[0]}</h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{f[1]}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- The panel ---- */
const PANEL = [
  ['IL-6', 'Interleukin-6', 'Acute-phase initiator', 'Produced within hours by macrophages and T-cells in response to infection, trauma, and inflammatory flare. Its amplitude and rate of rise gauge severity.'],
  ['TNF-α', 'Tumor Necrosis Factor-α', 'Vascular alarm', 'Drives endothelial activation and vascular permeability. The primary therapeutic target of anti-TNF biologics in RA and IBD.'],
  ['IL-1β', 'Interleukin-1β', 'Inflammasome sensor', 'Released via NLRP3 inflammasome activation. Rises early in cellular damage, infection, and metabolic inflammation.'],
  ['IFN-γ', 'Interferon-γ', 'Pathogen discriminator', 'The single most discriminating marker. Elevated in viral and intracellular bacterial infection; suppressed in T-cell exhaustion and cancer.'],
  ['IL-10', 'Interleukin-10', 'Counter-regulator', 'The primary anti-inflammatory cytokine. Sustained elevation signals immunoparalysis; a blunted response distinguishes disease from recovery.'],
];
function Panel() {
  return (
    <section className="hairline-top" style={{ padding: '6.5rem 0' }}>
      <div className="wrap">
        <Reveal>
          <Lockup eyebrow="The panel" title="Five cytokines, one fingerstick" sub="Each marker was chosen for a distinct biological role and broad relevance across inflammatory, oncologic, and acute-threat states." />
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 28 }}>
            {PANEL.map((m) => <Tag key={m[0]}>{m[0]}</Tag>)}
            <Tag>PCT — expandable</Tag>
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20, marginTop: 44 }}>
          {PANEL.map((m, i) => (
            <Reveal key={m[0]} delay={i * 60}>
              <div style={{ borderLeft: '2px solid var(--text-primary)', paddingLeft: 22, height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                  <span style={{ fontSize: 19, fontWeight: 600, letterSpacing: '0.02em' }}>{m[0]}</span>
                  <span style={{ fontSize: 12.5, color: 'var(--text-tertiary)' }}>{m[1]}</span>
                </div>
                <div className="eyebrow" style={{ marginTop: 8, fontSize: 10.5 }}>{m[2]}</div>
                <p style={{ margin: '12px 0 0', fontSize: 14, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{m[3]}</p>
              </div>
            </Reveal>
          ))}
          <Reveal delay={PANEL.length * 60}>
            <Card padding="lg" tone="tint" style={{ height: '100%' }}>
              <div style={{ fontSize: 19, fontWeight: 600 }}>+ PCT</div>
              <div className="eyebrow" style={{ marginTop: 8, fontSize: 10.5 }}>Available expansion</div>
              <p style={{ margin: '12px 0 0', fontSize: 14, lineHeight: 1.7, color: 'var(--text-secondary)' }}>Procalcitonin discriminates bacterial from viral aetiology. Not in the standard panel — but the 32-sensor chip makes adding it a cartridge reformulation, with no hardware change.</p>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---- Scalability ---- */
function Scalability() {
  const stats = [['32', 'sensors per chip — 5 cytokines occupy 5 clusters today'], ['1', 'reader for every future panel — CVD, oncology, pandemic'], ['0', 'hardware redesign to add a panel: cartridge reformulation only'], ['22', 'issued US patents underpinning the platform']];
  return (
    <section style={{ background: 'var(--surface-inverse)', color: 'var(--text-inverse)', padding: '6.5rem 0' }}>
      <div className="wrap">
        <Reveal>
          <span className="rule" style={{ background: 'var(--white)', marginBottom: 22 }} />
          <div className="eyebrow" style={{ marginBottom: 14 }}>Platform</div>
          <h2 style={{ margin: 0, fontSize: 'clamp(30px,4vw,46px)', fontWeight: 300, letterSpacing: '-0.025em', color: 'var(--white)', maxWidth: 720, lineHeight: 1.1 }}>One reader. An expanding library of panels.</h2>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '36px 28px', marginTop: 56 }}>
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 70}>
              <div className="tabular" style={{ fontSize: 'clamp(40px,5vw,58px)', fontWeight: 300, color: 'var(--white)', letterSpacing: '-0.03em' }}>{s[0]}</div>
              <div style={{ marginTop: 12, fontSize: 14, lineHeight: 1.6, color: 'var(--grey-350)', maxWidth: 220 }}>{s[1]}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechnologyPage() {
  return (
    <div>
      <SiteHeader active="technology" />
      <PageHero eyebrow="Technology" title={<span>A laboratory in the palm of your hand.</span>}
        lead="Q-SENS is a palm-sized silicon photonic biosensor that quantifies five cytokines from a 10 µL fingerstick in under ten minutes — validated against Luminex, with no lab, no centrifuge, and no cold chain." />
      <HowItWorks />
      <SpecTable />
      <TrajectoryThesis />
      <MLLayer />
      <Panel />
      <Scalability />
      <CTABand title="Explore the cytokine intelligence model." body="An interactive simulator of the immune signatures Q-SENS is designed to detect — across inflammatory, oncologic, and acute-threat conditions." primary="Open the model" primaryHref="cytokine.html" secondary="Why inflammation" secondaryHref="inflammation.html" />
      <SiteFooter />
    </div>
  );
}
window.TechnologyPage = TechnologyPage;
