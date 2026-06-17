/* Biomarkr, Why inflammation. The thesis page: inflammation as the
   through-line of chronic disease, the cost of reactive care, why
   frequency changes everything, and the conditions where trajectory
   monitoring matters. Globals come from chrome.jsx. */

const { Card, Badge } = window.BiomarkrDesignSystem_734cca;
/* PageHero, CTABand, Reveal, Lockup, Trajectory, SiteHeader, SiteFooter, ArrowRight global */

/* ---- Big pull stat ---- */
function PullStat() {
  return (
    <section className="hairline-top" style={{ padding: 'clamp(64px,9vh,110px) 0' }}>
      <div className="wrap r-split" style={{ gap: 'clamp(40px,6vw,80px)', alignItems: 'center' }}>
        <Reveal>
          <div className="tabular" style={{ fontSize: 'clamp(96px,15vw,200px)', fontWeight: 200, letterSpacing: '-0.04em', lineHeight: 0.86 }}>3<span style={{ color: 'var(--text-tertiary)' }}>/</span>5</div>
        </Reveal>
        <Reveal delay={120}>
          <p className="serif" style={{ fontSize: 'clamp(24px,3vw,34px)', fontWeight: 300, lineHeight: 1.32, letterSpacing: '-0.01em', margin: 0 }}>
            Three out of five people die from inflammation-driven conditions. The WHO ranks chronic inflammation as the single greatest threat to human health globally.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---- Reactive problem ---- */
function ReactiveProblem() {
  return (
    <section style={{ background: 'var(--surface-tint)', padding: '6.5rem 0' }}>
      <div className="wrap column">
        <Reveal><Lockup eyebrow="The problem" title="Caught too late, every time" /></Reveal>
        <Reveal delay={80}>
          <p className="lead" style={{ marginTop: 36 }}>Chronic inflammatory disease, RA, IBD, Long COVID, cardiovascular disease, affects more than 100 million Americans and costs over $800 billion a year.</p>
          <div className="prose" style={{ marginTop: 22 }}>
            <p>The root cause isn't a lack of effective drugs. It's the absence of a tool that can track immune dynamics in daily life. So disease is managed reactively: <strong>a flare presents, a treatment is adjusted, and damage has already occurred.</strong></p>
            <p>Cytokine levels swing on timescales of hours to days. A quarterly clinic visit, even a monthly blood draw, is structurally unable to capture the immune trajectory that determines whether a biologic is working, whether a flare is building, or whether an immune system is recovering or deteriorating.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---- CGM analogy ---- */
const CGM_LINES = [
  { data: [10, 11, 10, 12, 11, 10, 13, 12, 11, 12], dash: '0' },
];
function FrequencyMatters() {
  return (
    <section className="hairline-top" style={{ padding: '6.5rem 0' }}>
      <div className="wrap r-split" style={{ gap: 'clamp(40px,6vw,80px)', alignItems: 'center' }}>
        <Reveal delay={120} style={{ order: 2 }}>
          <Card padding="lg">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
              <span className="eyebrow" style={{ fontSize: 10.5 }}>Quarterly draw</span>
              <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>4 points / year</span>
            </div>
            <svg width="100%" viewBox="0 0 520 90" style={{ display: 'block' }}>
              <line x1="8" x2="512" y1="45" y2="45" stroke="var(--border-subtle)" strokeWidth="1" />
              {[40, 200, 340, 500].map((x, i) => <circle key={i} cx={x} cy={[55, 30, 60, 38][i]} r="4" fill="var(--text-primary)" />)}
            </svg>
            <div style={{ height: 1, background: 'var(--border-subtle)', margin: '20px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
              <span className="eyebrow" style={{ fontSize: 10.5 }}>Q-SENS trajectory</span>
              <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>continuous</span>
            </div>
            <Trajectory width={520} height={110} baseline={false} lines={[{ data: [11, 10, 12, 11, 13, 12, 14, 18, 26, 34, 30, 22, 16, 13], dash: '0' }]} />
          </Card>
        </Reveal>
        <Reveal style={{ order: 1 }}>
          <Lockup eyebrow="The shift" title="Frequency turns a snapshot into a trajectory" />
          <div className="prose" style={{ marginTop: 24, maxWidth: 460 }}>
            <p style={{ marginTop: 0 }}>The CGM transformed diabetes management, not because glucose was a new biomarker, but because the frequency of measurement turned a snapshot into actionable trajectory data.</p>
            <p><strong>Biomarkr does the same for the immune system.</strong> Measured against your own baseline, often enough to see the slope, the same five cytokines become an early-warning system instead of a post-mortem.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---- Conditions ---- */
const CONDITIONS = [
  ['Rheumatoid arthritis', '1.5M', 'US patients on biologics with no objective home monitoring. Trajectories detect response within days and predict flares 5–7 days before clinical presentation.'],
  ['Long COVID / ME-CFS', '17M+', 'Americans with no FDA-cleared objective biomarker. Episodic IFN-γ and IL-6 patterns provide the first immune fingerprint for stratification and monitoring.'],
  ['Inflammatory bowel disease', '3M+', 'Patients assessed every 8–12 weeks. Q-SENS detects secondary loss-of-response before clinical relapse, proactive switching, not reactive escalation.'],
  ['Cardiovascular & metabolic', '', 'Chronic low-grade inflammation invisible to standard labs. Longitudinal monitoring detects smoldering activation before organ damage.'],
  ['Post-surgical & survivorship', '', 'Cancer survivors and post-surgical patients carry quiet inflammation. A personal baseline surfaces deviations standard panels miss.'],
  ['Research & clinical trials', '', 'Exercise, nutrition, aging, sleep, and vaccine response, standardized, ambulatory 5-plex cytokine collection at scale, between site visits.'],
];
function Conditions() {
  return (
    <section style={{ background: 'var(--surface-inverse)', color: 'var(--text-inverse)', padding: '6.5rem 0' }}>
      <div className="wrap">
        <Reveal>
          <span className="rule" style={{ background: 'var(--white)', marginBottom: 22 }} />
          <div className="eyebrow" style={{ marginBottom: 14 }}>Where it matters</div>
          <h2 style={{ margin: 0, fontSize: 'clamp(30px,4vw,46px)', fontWeight: 300, letterSpacing: '-0.025em', color: 'var(--white)', maxWidth: 760, lineHeight: 1.1 }}>The same five cytokines, across the diseases that define chronic illness.</h2>
        </Reveal>
        <div className="r-cards" style={{ gap: 24, marginTop: 56 }}>
          {CONDITIONS.map((c, i) => (
            <Reveal key={c[0]} delay={i * 60}>
              <div style={{ borderTop: '1px solid var(--paper-a12)', paddingTop: 22, height: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 500, color: 'var(--white)', margin: 0 }}>{c[0]}</h3>
                  <span className="tabular" style={{ fontSize: 22, fontWeight: 300, color: 'var(--grey-350)', whiteSpace: 'nowrap' }}>{c[1]}</span>
                </div>
                <p style={{ margin: '12px 0 0', fontSize: 14, lineHeight: 1.7, color: 'var(--grey-350)' }}>{c[2]}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Baseline meaning ---- */
function BaselineMeaning() {
  return (
    <section className="hairline-top" style={{ padding: 'clamp(64px,9vh,110px) 0' }}>
      <div className="wrap column" style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
        <Reveal>
          <span className="rule" style={{ margin: '0 auto 26px' }} />
          <p className="serif" style={{ fontSize: 'clamp(26px,3.6vw,44px)', fontWeight: 300, lineHeight: 1.28, letterSpacing: '-0.015em', margin: 0 }}>
            “A single cytokine value is meaningless. It depends on your baseline, your age, your stress, the time of day.<br/>
            <span style={{ color: 'var(--text-tertiary)' }}>The meaning is in the movement.”</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function InflammationPage() {
  return (
    <div>
      <SiteHeader active="inflammation" />
      <PageHero eyebrow="Why inflammation" title="Inflammation is the through-line of chronic disease."
        lead="At Biomarkr, we believe inflammation holds the key. It quietly drives the conditions that kill most of us, and it's almost entirely managed after the damage is done." />
      <PullStat />
      <ReactiveProblem />
      <FrequencyMatters />
      <Conditions />
      <BaselineMeaning />
      <CTABand title="See what the immune signature looks like." body="Explore modeled cytokine trajectories across inflammatory, oncologic, and acute-threat conditions in the interactive model." primary="Open the model" primaryHref="cytokine.html" secondary="How the technology works" secondaryHref="technology.html" />
      <SiteFooter />
    </div>
  );
}
window.InflammationPage = InflammationPage;
