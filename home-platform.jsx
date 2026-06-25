/* Biomarkr — Home, Variation B: "The Platform".
   Data-forward, solution-led. Leads with Q-SENS the product, states the
   problem as hard numbers, and makes the disease-signature section
   interactive. Composes chrome.jsx + arpa-sections.jsx. */

const { Card, Badge } = window.BiomarkrDesignSystem_734cca;
/* globals: SiteHeader, SiteFooter, Lockup, Reveal, ArrowRight, BM_CTABand, ARPA_* */

function SectionOpenB({ num, eyebrow, title, sub, align = 'left', style = {} }) {
  return (
    <header style={{ display: 'flex', flexDirection: 'column', alignItems: align === 'center' ? 'center' : 'flex-start', textAlign: align, ...style }}>
      <span className="rule" style={{ marginBottom: 20 }} />
      <span className="eyebrow" style={{ marginBottom: 14 }}><span style={{ color: 'var(--text-tertiary)' }}>{num} ·</span> {eyebrow}</span>
      <h2 style={{ margin: 0, fontSize: 'clamp(30px,4vw,46px)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1.1, maxWidth: 760 }}>{title}</h2>
      {sub && <p className="prose" style={{ maxWidth: 640, marginTop: 20, marginBottom: 0, textAlign: align }}>{sub}</p>}
    </header>
  );
}

/* Hero — product-led: the reader, a tight value statement, specs strip. */
function HeroPlatform() {
  return (
    <section style={{ position: 'relative', minHeight: '90vh', display: 'flex', alignItems: 'center', padding: '13vh 0 7vh', overflow: 'hidden' }}>
      <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'minmax(320px,1.05fr) minmax(300px,0.95fr)', gap: 'clamp(36px,5vw,80px)', alignItems: 'center' }}>
        <Reveal>
          <div className="eyebrow" style={{ marginBottom: 24 }}>The Q-SENS platform</div>
          <h1 style={{ margin: 0, fontSize: 'clamp(40px,5.2vw,68px)', fontWeight: 300, letterSpacing: '-0.035em', lineHeight: 1.03 }}>
            A laboratory immunoassay, miniaturized to a fingerstick.
          </h1>
          <p className="lead" style={{ maxWidth: 500, marginTop: 28, color: 'var(--text-secondary)' }}>
            Q-SENS reads five cytokines from 10 µL of whole blood in under ten minutes — at home or at the point of care. Longitudinal immune monitoring, built on 22 issued silicon-photonic patents.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 34, flexWrap: 'wrap' }}>
            <a className="btn btn-primary" href="/technology">Inside the platform <ArrowRight/></a>
            <a className="btn btn-ghost" href="/cytokines">See the model</a>
          </div>
        </Reveal>
        <Reveal delay={140} style={{ position: 'relative' }}>
          <img src="/assets/device-reader.png" alt="Q-SENS reader" style={{ width: '100%', maxWidth: 460, margin: '0 auto', display: 'block', filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.14))', animation: 'heroRise 1.3s var(--ease-out) both' }} />
        </Reveal>
      </div>
    </section>
  );
}

/* Problem as data — metric band on inverse-adjacent hairline. */
function ProblemMetrics() {
  const stats = [
    ['100M', 'Americans with chronic inflammatory disease'],
    ['$800B', 'annual US cost of inflammatory conditions'],
    ['$200–800', 'per central-lab cytokine panel today'],
    ['24–72 hr', 'turnaround — too late to act on'],
  ];
  return (
    <section className="hairline-top" style={{ padding: '6rem 0' }}>
      <div className="wrap">
        <Reveal><SectionOpenB num="01" eyebrow="The problem" title="The tools are mismatched to the biology." sub="Cytokine testing means a central lab, venipuncture, days of waiting, and hundreds of dollars — for a single snapshot that can't tell a rising flare from a resolving one." /></Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '40px 32px', marginTop: 56 }}>
          {stats.map((s, i) => (
            <Reveal key={s[0]} delay={i * 80}>
              <div className="tabular" style={{ fontSize: 'clamp(40px,4.4vw,60px)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1 }}>{s[0]}</div>
              <div className="prose" style={{ marginTop: 14, fontSize: 14, maxWidth: 220 }}>{s[1]}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Interactive disease-signature switcher (one large chart, three tabs). */
function SignatureExplorer() {
  const keys = ['sepsis', 'ra', 'longcovid'];
  const [active, setActive] = React.useState('sepsis');
  const sig = ARPA_SIGNATURES[active];
  return (
    <Card padding="lg" style={{ background: 'var(--surface-page)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
        <div>
          <div className="eyebrow" style={{ fontSize: 10.5, marginBottom: 8 }}>{sig.eyebrow}</div>
          <div style={{ fontSize: 'clamp(22px,2.4vw,30px)', fontWeight: 300, letterSpacing: '-0.02em' }}>{sig.title}</div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {keys.map((k) => (
            <button key={k} onClick={() => setActive(k)}
              style={{ cursor: 'pointer', border: '1px solid ' + (active === k ? 'var(--border-strong)' : 'var(--border-default)'), background: active === k ? 'var(--text-primary)' : 'transparent', color: active === k ? 'var(--surface-page)' : 'var(--text-secondary)', borderRadius: 'var(--radius-pill)', fontSize: 12.5, fontWeight: 500, padding: '7px 16px', transition: 'all .2s var(--ease-out)' }}>
              {ARPA_SIGNATURES[k].eyebrow.split(' · ')[0]}
            </button>
          ))}
        </div>
      </div>
      <ARPA_LineChart width={900} height={300} series={sig.series} xTicks={sig.xTicks} xLabel={sig.xLabel} yMax={sig.yMax} yTicks={sig.yTicks} prefix={'sigB-' + active} fill />
      <ARPA_MarkerLegend keys={sig.series.map((s) => s.key)} uln={false} style={{ marginTop: 16 }} />
      <p style={{ margin: '16px 0 0', fontSize: 14, lineHeight: 1.65, color: 'var(--text-secondary)', maxWidth: 760 }}>{sig.note}</p>
    </Card>
  );
}

function HomePlatform() {
  const CTABand = window.BM_CTABand;
  return (
    <div>
      <SiteHeader active="home" />
      <HeroPlatform />
      <ProblemMetrics />

      {/* 02 — Capabilities */}
      <section className="hairline-top" style={{ padding: '7rem 0' }}>
        <div className="wrap">
          <Reveal><SectionOpenB num="02" eyebrow="What the trajectory unlocks" title="Three capabilities no snapshot test provides." /></Reveal>
          <Reveal delay={80} style={{ marginTop: 56 }}><ARPA_CapabilityRow /></Reveal>
          <div className="hairline-top" style={{ marginTop: 64, paddingTop: 56 }}>
            <ARPA_SpecRow />
          </div>
        </div>
      </section>

      {/* 03 — Interactive signatures */}
      <section className="hairline-top" style={{ padding: '7rem 0' }}>
        <div className="wrap">
          <Reveal><SectionOpenB num="03" eyebrow="The signal" title="Each disease writes a temporal signature." sub="Five cytokines, four immune axes. Switch conditions to see how the markers move together — the discrimination that only longitudinal monitoring reveals." /></Reveal>
          <Reveal delay={80} style={{ marginTop: 48 }}><SignatureExplorer /></Reveal>
          <Reveal delay={120}>
            <p className="prose" style={{ maxWidth: 760, marginTop: 36, fontSize: 17, lineHeight: 1.7 }}>These signatures are <strong>trajectory-dependent, not threshold-dependent</strong>. The same IL-6 means opposite things depending on its direction and its distance from the patient's own baseline.</p>
          </Reveal>
        </div>
      </section>

      {/* 04 — Circadian */}
      <section className="hairline-top" style={{ padding: '7rem 0' }}>
        <div className="wrap">
          <Reveal><SectionOpenB num="04" eyebrow="The confound" title="Circadian rhythm contaminates every reading." /></Reveal>
          <Reveal delay={80} style={{ marginTop: 52 }}><ARPA_CircadianBlock /></Reveal>
        </div>
      </section>

      {/* 05 — Use cases */}
      <section className="hairline-top" style={{ padding: '7rem 0' }}>
        <div className="wrap">
          <Reveal><SectionOpenB num="05" eyebrow="Where it changes outcomes" title="One horizontal platform." sub="The highest-priority clinical and research applications — each with an established unmet need and a clear cytokine rationale." /></Reveal>
          <div style={{ marginTop: 52 }}><ARPA_UseCaseGrid /></div>
        </div>
      </section>

      <CTABand
        title="A platform bet, not a product bet. The cytokine panel validated here is the template for everything that follows."
        body="We're partnering with pharma and biotech for research programs, and meeting investors for our seed round. If immune trajectory is the missing layer, let's talk."
        primary="Request a conversation" primaryHref="mailto:dylan@biomarkr.health"
        secondary="See it in practice" secondaryHref="/use-cases" />
      <div style={{ padding: '20px 8%', textAlign: 'center', borderTop: '1px solid var(--border-subtle)' }}>
        <a href="Home — Trajectory.html" className="eyebrow" style={{ textDecoration: 'none', color: 'var(--text-tertiary)' }}>← Compare · Variation A — Trajectory</a>
      </div>
      <SiteFooter />
    </div>
  );
}

window.HomePlatform = HomePlatform;
