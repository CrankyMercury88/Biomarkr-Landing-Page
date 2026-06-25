/* Biomarkr, In practice. Two illustrative scenarios (not real patients):
   the Ebola ED vignette with a serial-reading table, and the IBD at-home
   monitoring vignette with a trajectory chart. Globals from chrome.jsx. */

const { Card, Badge } = window.BiomarkrDesignSystem_734cca;
/* PageHero, CTABand, Reveal, Lockup, Trajectory, SiteHeader, SiteFooter, ArrowRight global */

const UP = (n) => '↑'.repeat(n);

/* ---- Ebola serial table ---- */
const EBOLA_ROWS = [
  ['2:15 AM', 1, 1, 0, 0, 0, 0, 'Early innate alarm. Cytokines rising; PCT flat, bacterial infection effectively ruled out. Escalate precautions.'],
  ['4:15 AM', 2, 2, 1, 0, 0, 0, 'Trajectory climbing fast. PCT still normal, inconsistent with bacterial sepsis. Viral etiology. ID on call now.'],
  ['6:15 AM', 3, 3, 3, 0, 1, 0, 'Steep acceleration. Anti-inflammatory counter-response still absent. PCT flat. Contact tracing activated.'],
  ['8:15 AM', 3, 3, 3, 1, 2, 0, 'IL-10 rising, body braking its own storm. Pattern consistent with viral hemorrhagic fever. Command center notified.'],
];
const MARKER_COLS = ['IL-6', 'TNF-α', 'IL-1β', 'IL-10', 'IFN-γ', 'PCT'];

function Cell({ n }) {
  return <span className="tabular" style={{ fontSize: 14, color: n === 0 ? 'var(--text-tertiary)' : 'var(--text-primary)', fontWeight: n >= 3 ? 600 : 500, fontFamily: 'var(--font-mono)' }}>{n === 0 ? '0' : UP(n)}</span>;
}

function EbolaVignette() {
  return (
    <section id="ebola" className="hairline-top" style={{ padding: 'clamp(64px,9vh,104px) 0', scrollMarginTop: 90 }}>
      <div className="wrap">
        <Reveal>
          <span className="pill-tag" style={{ marginBottom: 22 }}><span className="dot" style={{ background: 'var(--signal-critical)' }} /> Emergency · biothreat</span>
          <h2 style={{ fontSize: 'clamp(32px,4.4vw,52px)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1.05, margin: 0, maxWidth: 760 }}>The hour that mattered</h2>
          <p className="lead" style={{ maxWidth: 680, marginTop: 24, color: 'var(--text-secondary)' }}>2:00 AM, a university hospital ED. Marcus, 34, presents with fever and myalgias that began hours ago, six days after returning from a humanitarian mission in central Africa.</p>
        </Reveal>
        <div className="r-split" style={{ gap: 'clamp(36px,5vw,72px)', marginTop: 56, alignItems: 'start' }}>
          <Reveal>
            <div className="prose" style={{ maxWidth: 480 }}>
              <p style={{ marginTop: 0 }}>Ebola is undetectable by PCR for up to three days after symptom onset. Marcus has been symptomatic for hours. The specimen ships frozen as a Category A substance; the team is flying blind for days, and has no way to rule out a bacterial process that might need aggressive treatment of its own.</p>
              <p><strong>Now run it again with Q-SENS.</strong> At 2:15 AM, while triage is still underway, a fingerstick drop goes onto the cartridge. The first readout returns in ten minutes, and crucially, it includes procalcitonin, the body's most reliable early signal of bacterial infection.</p>
              <p>The PCT at 2:15 delivers the first decision: <strong>this is not bacterial sepsis.</strong> PCT stays flat across all four readings while the pro-inflammatory cytokines accelerate. That combination is a signature.</p>
              <p>By 8:15 AM, four serial readings have painted an unmistakable picture. The PCR confirmation arrives two days later. It is positive, but the hospital's response had already been running for eighteen hours.</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <Card padding="none" style={{ overflow: 'hidden' }}>
              <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--border-default)' }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>Serial Q-SENS readings</div>
                <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 3 }}>A trajectory, not a snapshot</div>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 420 }}>
                  <thead>
                    <tr style={{ background: 'var(--surface-tint)' }}>
                      <th style={{ textAlign: 'left', padding: '10px 14px', fontSize: 11, fontWeight: 600, color: 'var(--text-tertiary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Time</th>
                      {MARKER_COLS.map((m) => <th key={m} style={{ padding: '10px 6px', fontSize: 10.5, fontWeight: 600, color: m === 'PCT' ? 'var(--text-primary)' : 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>{m}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {EBOLA_ROWS.map((r, i) => (
                      <tr key={r[0]} style={{ borderTop: '1px solid var(--border-subtle)' }}>
                        <td style={{ padding: '14px 14px', fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>{r[0]}</td>
                        {r.slice(1, 7).map((n, j) => <td key={j} style={{ textAlign: 'center', padding: '14px 6px' }}><Cell n={n} /></td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ padding: '16px 22px', borderTop: '1px solid var(--border-default)', background: 'var(--surface-tint)' }}>
                <div style={{ display: 'flex', gap: 18, fontSize: 11.5, color: 'var(--text-tertiary)', flexWrap: 'wrap' }}>
                  <span>0 = normal</span><span>↑ rising</span><span>↑↑↑ steep</span>
                  <span style={{ marginLeft: 'auto', color: 'var(--text-secondary)' }}>PCT flat throughout → not bacterial</span>
                </div>
              </div>
            </Card>
            <p style={{ fontSize: 13, color: 'var(--text-tertiary)', lineHeight: 1.6, marginTop: 16 }}>A rising cytokine trajectory paired with a flat PCT, read serially over six hours, says two things at once: how fast the fire is spreading, and that antibiotics alone won't put it out.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---- IBD vignette ---- */
const IBD_TNF = [{ data: [30, 29, 28, 24, 20, 17, 14, 12], dash: '0' }, { data: [10, 11, 12, 14, 16, 19, 22, 24], dash: '5 5' }];
function IbdVignette() {
  return (
    <section id="ibd" style={{ background: 'var(--surface-tint)', padding: 'clamp(64px,9vh,104px) 0', scrollMarginTop: 90 }}>
      <div className="wrap">
        <Reveal>
          <span className="pill-tag" style={{ marginBottom: 22 }}><span className="dot" style={{ background: 'var(--signal-positive)' }} /> Chronic · at home</span>
          <h2 style={{ fontSize: 'clamp(32px,4.4vw,52px)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1.05, margin: 0, maxWidth: 760 }}>The space between flares</h2>
          <p className="lead" style={{ maxWidth: 680, marginTop: 24, color: 'var(--text-secondary)' }}>Maya is 23, finishing grad school and managing Crohn's. The frustrating part isn't the disease, it's the waiting. Every medication change is a stone dropped into a well, listening for a splash that might come in six weeks, or eight, or not at all.</p>
        </Reveal>
        <div className="r-split" style={{ gap: 'clamp(36px,5vw,72px)', marginTop: 56, alignItems: 'center' }}>
          <Reveal delay={120} style={{ order: 2 }}>
            <Card padding="lg" tone="page">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>Four weeks after switching biologics</div>
                <Badge tone="positive" dot>Responding</Badge>
              </div>
              <Trajectory width={520} height={210} baseline={false} lines={IBD_TNF} labels={['wk 0', '', '', '', '', '', '', 'wk 7']} />
              <div style={{ display: 'flex', gap: 20, marginTop: 16, fontSize: 11.5, color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}><span style={{ width: 16, height: 2, background: 'var(--text-primary)' }} /> TNF-α falling</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}><span style={{ width: 16, height: 0, borderTop: '2px dashed var(--text-tertiary)' }} /> IL-10 rising</span>
              </div>
            </Card>
          </Reveal>
          <Reveal style={{ order: 1 }}>
            <div className="prose" style={{ maxWidth: 480 }}>
              <p style={{ marginTop: 0 }}>Q-SENS measures her five-cytokine panel from a fingerstick every Monday morning, before her first class. It takes less time than her coffee. Six stable weeks become her personal baseline, not a population average. Hers.</p>
              <p>Four weeks into a switch from adalimumab to ustekinumab, her symptoms haven't changed. But the read tells a different story: <strong>TNF-α is trending down, IL-10 is quietly climbing.</strong> Her gastroenterologist calls it before either expected to, this one's working. They don't wait three months to find out.</p>
              <p>Weeks later, during thesis deadlines and a respiratory infection, her IL-6 spikes on a Tuesday. Not a full flare cascade, yet. They adjust her dosing interval. By the following Monday, the number is coming back down. <strong>The flare that was building doesn't fully arrive.</strong></p>
              <p>She went from reacting to anticipating. From waiting six weeks for a maybe, to knowing in three.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function PracticePage() {
  return (
    <div>
      <SiteHeader active="practice" />
      <PageHero eyebrow="Use cases" title="What it looks like when the data arrives first."
        lead="Two illustrative scenarios, built from published immunopathology, not real patients, that show how a cytokine trajectory changes a decision. One at 2 AM in an emergency department, one on a Monday morning at home." />
      <EbolaVignette />
      <IbdVignette />
      <CTABand title="Explore the signatures behind the scenarios." body="The interactive model shows the modeled cytokine trajectories for these conditions and many more, adjustable by patient profile and time." primary="Open the model" primaryHref="/cytokines" secondary="Why inflammation" secondaryHref="/inflammation" />
      <SiteFooter />
    </div>
  );
}
window.PracticePage = PracticePage;
