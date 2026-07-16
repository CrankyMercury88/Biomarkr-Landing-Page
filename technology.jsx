/* Biomarkr, Technology page. Rebuilt from the CSO's technical write-up
   (sections 2–7; the overview is intentionally skipped). Design is the
   brand's own monochrome system, not the draft's palette. Section 1 is the
   scroll-driven Technology Stack (technology-stack.jsx); diagrams come from
   technology-diagrams.jsx. Globals: Reveal, Lockup, PageHero, CTABand,
   SiteHeader, SiteFooter, ArrowRight (chrome.jsx). */

const { Card, Badge, Tag } = window.BiomarkrDesignSystem_734cca;

/* ============================================================
   Section opener (numbered, brand lockup)
   ============================================================ */
function SectionOpen({ num, eyebrow, title, sub, style = {} }) {
  return (
    <header style={{ ...style }}>
      <span className="rule" style={{ marginBottom: 20 }} />
      <span className="eyebrow" style={{ marginBottom: 14, display: 'block' }}><span style={{ color: 'var(--text-tertiary)' }}>{num} ·</span> {eyebrow}</span>
      <h2 style={{ margin: 0, fontSize: 'clamp(28px,3.6vw,42px)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1.12, maxWidth: 760 }}>{title}</h2>
      {sub && <p className="prose" style={{ maxWidth: 660, marginTop: 20, marginBottom: 0 }}>{sub}</p>}
    </header>);

}

/* ============================================================
   02, Detection: evanescent-wave biosensing + the sandwich assay
   ============================================================ */
const ASSAY = [
['Capture antibody immobilization', 'Analyte-specific antibodies are pre-bound to defined sensing regions on the chip, one region per biomarker.'],
['Sample introduction', 'Whole blood enters the cartridge and target cytokines bind their capture antibodies. No centrifugation or serum separation.'],
['Detection antibody binding', 'Fluorescently-labelled detection antibodies bind the captured analytes, forming the sandwich: capture → biomarker → detection.'],
['Optical excitation', 'The waveguide excites only fluorophores near the surface, so signal comes from genuine surface-bound complexes, not free label in the bulk.'],
['Quantitation', 'Measured fluorescence intensity is converted to concentration through calibration algorithms applied in the cloud.']];

function Detection() {
  const { TECH_Figure, TECH_EvanescentDiagram } = window;
  return (
    <section className="hairline-top" style={{ padding: '6.5rem 0' }}>
      <div className="wrap">
        <Reveal><SectionOpen num="02" eyebrow="The core technology" title="Evanescent-wave biosensing" sub="A planar optical waveguide confines light to a thin layer on the chip. A small portion extends just beyond the surface as an evanescent field that reaches only ~50–150 nm, exciting labels bound at the surface while leaving everything deeper in the sample dark." /></Reveal>

        <Reveal delay={80} style={{ marginTop: 48 }}>
          <TECH_Figure title="Selective surface excitation, why whole blood works without separation"
          note="Only labels within roughly 50–150 nm of the surface are excited, so background fluorescence from cells and bulk plasma is dramatically reduced, laboratory-grade sensitivity from an unprocessed whole-blood drop.">
            <TECH_EvanescentDiagram />
          </TECH_Figure>
        </Reveal>

        <Reveal delay={60}>
          <div className="r-3" style={{ gap: 28, marginTop: 44, alignItems: 'center' }}>
            <div>
              <div className="tabular" style={{ fontSize: 'clamp(28px,3.6vw,42px)', fontWeight: 300, letterSpacing: '-0.02em' }}>50–150 <span style={{ fontSize: '0.5em', color: 'var(--text-tertiary)' }}>nm</span></div>
              <div className="prose" style={{ fontSize: 14, marginTop: 8 }}>evanescent field reach</div>
            </div>
            <div>
              <div className="tabular" style={{ fontSize: 'clamp(28px,3.6vw,42px)', fontWeight: 300, letterSpacing: '-0.02em' }}>10–15 <span style={{ fontSize: '0.5em', color: 'var(--text-tertiary)' }}>nm</span></div>
              <div className="prose" style={{ fontSize: 14, marginTop: 8 }}>an antibody, inside the field</div>
            </div>
            <div>
              <div className="tabular" style={{ fontSize: 'clamp(28px,3.6vw,42px)', fontWeight: 300, letterSpacing: '-0.02em' }}>6,000+ <span style={{ fontSize: '0.5em', color: 'var(--text-tertiary)' }}>nm</span></div>
              <div className="prose" style={{ fontSize: 14, marginTop: 8 }}>a red blood cell, outside it entirely</div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <p className="prose" style={{ maxWidth: 720, marginTop: 40 }}>Proprietary cartridge design further directs blood cells away from the sensing surface, sharpening the signal-to-background advantage — the subject of one of two recently filed provisional patents that extend the company's 22 issued patents. Each sensing region carries an immobilized capture antibody specific to one analyte; the assay is a standard fluorescence sandwich, run entirely inside the cartridge.</p>
        </Reveal>

        <div style={{ marginTop: 40, maxWidth: 880 }}>
          {ASSAY.map((s, i) =>
          <Reveal key={i} delay={i * 50}>
              <div style={{ display: 'flex', gap: 22, padding: '20px 0', borderTop: '1px solid var(--border-subtle)', alignItems: 'flex-start' }}>
                <div className="tabular" style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-tertiary)', flexShrink: 0, width: 28, paddingTop: 2 }}>{String(i + 1).padStart(2, '0')}</div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600 }}>{s[0]}</div>
                  <p style={{ margin: '6px 0 0', fontSize: 14, lineHeight: 1.65, color: 'var(--text-secondary)', maxWidth: 640 }}>{s[1]}</p>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>);

}

/* ============================================================
   03, Multiplex architecture
   ============================================================ */
function Multiplex() {
  const { TECH_Figure, TECH_MultiplexMatrix } = window;
  const specs = [['4 × 8', 'input × output waveguide matrix'], ['32', 'independent sensing sites per chip'], ['5', 'cytokines in the Core Inflammation Panel'], ['1', 'cartridge, fully self-calibrating']];
  return (
    <section className="hairline-top" style={{ padding: '6.5rem 0' }}>
      <div className="wrap">
        <Reveal><SectionOpen num="03" eyebrow="Multiplex architecture" title="32 measurements on one chip" sub="The waveguide matrix crosses 4 optical inputs with 8 outputs, 4 × 8 = 32 independent sensing locations. That capacity is spent on analytes, replicates, controls, and on-chip calibration standards, so a single fingerstick returns a full panel with built-in quality control." /></Reveal>
        <Reveal delay={80} style={{ marginTop: 48 }}>
          <TECH_Figure title="Waveguide matrix, 4 inputs × 8 outputs = 32 sensing sites"
          note="The Core Inflammation Panel occupies five sites; remaining capacity carries replicates, controls, and calibration standards, or expands the menu toward the full 32-analyte ceiling.">
            <TECH_MultiplexMatrix />
          </TECH_Figure>
        </Reveal>
        <div className="r-4" style={{ gap: '36px 28px', marginTop: 48 }}>
          {specs.map((s, i) =>
          <Reveal key={i} delay={i * 70}>
              <div className="tabular" style={{ fontSize: 'clamp(32px,4.2vw,50px)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1 }}>{s[0]}</div>
              <div className="prose" style={{ marginTop: 12, fontSize: 14, maxWidth: 200 }}>{s[1]}</div>
            </Reveal>
          )}
        </div>
      </div>
    </section>);

}

/* ============================================================
   04, Platform attributes + comparison table
   ============================================================ */
const ATTRS = [
['Direct whole blood', 'No centrifugation, no serum separation', 'A 10 µL fingerstick drop is read directly, which also preserves cytokines that degrade rapidly after collection, improving biological accuracy.'],
['Sensitivity', 'Single-digit pg/mL detection', 'The platform targets single-digit pg/mL sensitivity for cytokines such as IL-6, TNF-α, and IFN-γ, approaching or exceeding many centralized lab systems.'],
['Self-calibration', 'Standards built into every cartridge', 'Each site is measured twice, unknown sample, then an on-cartridge standard. Per-sensor calibration with internal controls reduces device-to-device variation.'],
['Speed', 'Results in under 10 minutes', 'Typical turnaround is 5–10 minutes at the point of need, fast enough for in-visit decisions and serial monitoring across hours where cytokines move quickly.'],
['Manufacturing', 'Semiconductor-compatible fabrication', 'The silicon photonic chip is built with semiconductor-compatible processes, supporting low-cost, high-volume manufacturing as the menu and install base scale.'],
['Setting', 'Decentralized and at home', 'The same device fits emergency departments, clinics, physician offices, resource-limited settings, and the home, the primary frame for chronic inflammation monitoring.']];

const COMPARE = [
['Sample', '10 µL fingerstick whole blood', 'Venous draw, serum or plasma'],
['Pre-processing', 'None', 'Centrifugation and separation'],
['Time to result', 'Under 10 minutes', '24–72 hours'],
['Multiplexing', 'Up to 32 analytes per chip', 'Single-plex ELISA to lab-bound Luminex'],
['Setting', 'Point of care and home', 'Centralized laboratory'],
['Calibration', 'On-cartridge, self-calibrating', 'Instrument and operator dependent'],
['Output', 'Longitudinal, cloud-tracked trajectory', 'Isolated single-timepoint snapshot']];

function Attributes() {
  return (
    <section className="hairline-top" style={{ padding: '6.5rem 0' }}>
      <div className="wrap">
        <Reveal><SectionOpen num="04" eyebrow="Platform attributes" title="Each choice removes a barrier" sub="Every design decision dismantles a constraint that keeps cytokine testing locked inside centralized laboratories." /></Reveal>
        <div className="r-cards" style={{ gap: 20, marginTop: 52 }}>
          {ATTRS.map((a, i) =>
          <Reveal key={a[0]} delay={i % 3 * 80}>
              <Card padding="lg" style={{ height: '100%' }}>
                <div className="eyebrow" style={{ fontSize: 11, color: 'var(--signal-info)', marginBottom: 10 }}>{a[0]}</div>
                <h3 style={{ fontSize: 17, fontWeight: 600, margin: '0 0 10px' }}>{a[1]}</h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: 'var(--text-secondary)' }}>{a[2]}</p>
              </Card>
            </Reveal>
          )}
        </div>

        <Reveal delay={80}>
          <div style={{ marginTop: 56, overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <div style={{ border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', minWidth: 560 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr 1.3fr', background: 'var(--surface-tint)', borderBottom: '1px solid var(--border-default)' }}>
              {['Specification', 'Biomarkr', 'Conventional lab cytokine testing'].map((h, i) =>
                <div key={i} className="eyebrow" style={{ padding: '16px 22px', fontSize: 11, color: i === 1 ? 'var(--text-primary)' : 'var(--text-tertiary)' }}>{h}</div>
                )}
            </div>
            {COMPARE.map((r, i) =>
              <div key={r[0]} style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr 1.3fr', borderBottom: i < COMPARE.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                <div style={{ padding: '16px 22px', fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)' }}>{r[0]}</div>
                <div style={{ padding: '16px 22px', fontSize: 14, color: 'var(--text-primary)', background: 'var(--surface-tint)' }}>{r[1]}</div>
                <div style={{ padding: '16px 22px', fontSize: 14, color: 'var(--text-tertiary)' }}>{r[2]}</div>
              </div>
              )}
          </div>
          </div>
        </Reveal>
      </div>
    </section>);

}

/* ============================================================
   05, Cloud + AI infrastructure
   ============================================================ */
const PIPELINE = [
['Stage 1', 'Signal extraction', 'Raw optical signal is cleaned of artifacts and corrected for nonspecific background fluorescence.'],
['Stage 2', 'Calibration + QC', 'Calibration curves convert intensity to concentration; automated QC validates each assay using on-chip standards.'],
['Stage 3', 'Longitudinal data layer', 'Each result is stored against the patient’s history, building a personal, circadian-aware baseline over time.'],
['Stage 4', 'AI trajectory models', 'Models read rate of change and deviation from personal baseline to flag immune events and surface clinical reports.']];

const AI_CARDS = [
['Personal baselines', 'Deviation, not absolute value', 'Repeated measurement establishes each individual’s baseline, so future readings are interpreted as movement relative to that person, not a population reference range.'],
['Trajectory signal', 'Rate of change and dynamics', 'Rate of change, time-to-peak, resolution velocity, and cytokine ratios encode information invisible to any single measurement.'],
['Predictive models', 'Pre-symptomatic detection', 'Models trained on personal trajectories aim to detect immune deviations before symptoms appear, the logic that made CGM more useful than isolated glucose readings.'],
['App + reporting', 'Patient and clinician views', 'The mobile app delivers results, trends, and alerts to patients while routing clinical reports and population analytics to physicians.']];

function CloudAI() {
  const { TECH_Figure, TECH_SnapshotTrajectoryChart } = window;
  return (
    <section style={{ background: 'var(--surface-tint)', padding: '6.5rem 0' }}>
      <div className="wrap">
        <Reveal><SectionOpen num="05" eyebrow="Cloud and AI infrastructure" title="The intelligence lives in software." sub="The reader captures raw optical signal and hands the heavy work to the cloud, where every measurement is processed, calibrated, quality-checked, and stored against the patient’s history. That is what turns Biomarkr from a testing device into a monitoring platform, the value is the trajectory analysis, not any single reading." /></Reveal>

        <div className="r-4" style={{ gap: 16, marginTop: 52 }}>
          {PIPELINE.map((s, i) =>
          <Reveal key={i} delay={i * 70}>
              <Card padding="lg" tone="page" style={{ height: '100%', position: 'relative' }}>
                <div className="eyebrow" style={{ fontSize: 11, color: 'var(--signal-info)', marginBottom: 10 }}>{s[0]}</div>
                <h3 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 8px' }}>{s[1]}</h3>
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: 'var(--text-secondary)' }}>{s[2]}</p>
              </Card>
            </Reveal>
          )}
        </div>

        <Reveal>
          <p className="prose" style={{ maxWidth: 720, marginTop: 40 }}>Because the intelligence lives in software, analytical performance improves continuously without recalling or modifying a single device. Calibration refinements, new QC rules, and better predictive models reach the entire install base through over-the-air updates.</p>
        </Reveal>

        <div className="r-4" style={{ gap: 20, marginTop: 36 }}>
          {AI_CARDS.map((c, i) =>
          <Reveal key={c[0]} delay={i % 2 * 80}>
              <Card padding="lg" tone="page" style={{ height: '100%' }}>
                <div className="eyebrow" style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 8 }}>{c[0]}</div>
                <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 9px' }}>{c[1]}</h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: 'var(--text-secondary)' }}>{c[2]}</p>
              </Card>
            </Reveal>
          )}
        </div>

        <Reveal delay={80} style={{ marginTop: 40 }}>
          <TECH_Figure title="Snapshot vs. trajectory, why frequent measurement changes the signal"
          note="Illustrative. The same absolute value carries opposite meaning depending on direction and rate of change. A lab snapshot sees one point; cloud-tracked monitoring sees the curve and the deviation from an individual baseline.">
            <TECH_SnapshotTrajectoryChart />
          </TECH_Figure>
        </Reveal>
      </div>
    </section>);

}

/* ============================================================
   06, Validation and performance
   ============================================================ */
function Validation() {
  const specs = [
  ['5-plex', 'panel validated, IL-6, TNF-α, IL-1β, IFN-γ, IL-10'],
  ['<20%', 'CV at 500 pg/mL across 5 instruments, 50 cartridges'],
  ['0', 'failures recorded across that run'],
  ['R² 0.999', 'Luminex equivalency for IL-10 (0.965 for IL-6), Stanford HIMC']];

  return (
    <section className="hairline-top" style={{ padding: '6.5rem 0' }}>
      <div className="wrap">
        <Reveal>
          <SectionOpen num="06" eyebrow="Validation and performance" title="Developed in part with BARDA DRIVe" sub="Under BARDA the platform demonstrated a validated 5-plex panel and strong agreement with established laboratory methods." />
          <div style={{ marginTop: 18 }}><Badge tone="positive" dot>Luminex equivalency confirmed</Badge></div>
        </Reveal>
        <div className="r-4" style={{ gap: '40px 32px', marginTop: 52 }}>
          {specs.map((s, i) =>
          <Reveal key={i} delay={i * 70}>
              <div className="tabular" style={{ fontSize: 'clamp(32px,4.2vw,50px)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1 }}>{s[0]}</div>
              <div className="prose" style={{ marginTop: 12, fontSize: 14, maxWidth: 230 }}>{s[1]}</div>
            </Reveal>
          )}
        </div>
        <Reveal>
          <p className="prose" style={{ maxWidth: 760, marginTop: 48 }}>The Core Inflammation Panel (IL-6, IL-1β, TNF-α, IFN-γ, IL-10) anchors the regulatory path, with fingerstick CRP incorporated as a market-entry wedge. The longer-term menu extends to infectious disease, cardiovascular markers such as NT-proBNP and troponin, maternal-health markers including PlGF and sFlt-1, oncology, and companion diagnostics, all on the same reader and cartridge architecture.</p>
        </Reveal>
        <Reveal delay={80}>
          <blockquote className="serif" style={{ margin: '44px 0 0', maxWidth: 820, fontSize: 'clamp(22px,2.6vw,30px)', fontWeight: 300, lineHeight: 1.4, letterSpacing: '-0.01em', borderLeft: '2px solid var(--text-primary)', paddingLeft: 28 }}>
            The biology of inflammation is understood and the cytokines are validated. What has been missing is the measurement infrastructure to make immune monitoring frequent, quantitative, and personal. That is the engineering problem Biomarkr solves.
          </blockquote>
        </Reveal>
      </div>
    </section>);

}

/* ============================================================
   Page
   ============================================================ */
function TechnologyPage() {
  return (
    <div>
      <SiteHeader active="technology" />
      <PageHero eyebrow="Technology" title={<span>Laboratory-grade inflammation measurement, <em style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 300 }}>reduced to a fingerstick.</em></span>}
      lead="Biomarkr is a cloud-connected, silicon-photonic biosensor platform that performs quantitative multiplex immunoassays directly from 10 µL of whole blood, results in under ten minutes, without centrifugation, serum separation, or laboratory infrastructure.">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 28px', marginTop: 32 }}>
          {[['Modality', 'Evanescent-wave fluorescence'], ['Sample', '10 µL fingerstick whole blood'], ['Time to result', 'Under 10 minutes'], ['Multiplex capacity', 'Up to 32 analytes per chip']].map((m) =>
          <div key={m[0]} style={{ paddingRight: 28, borderRight: '1px solid var(--border-subtle)' }}>
              <div className="eyebrow" style={{ fontSize: 11, marginBottom: 6 }}>{m[0]}</div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{m[1]}</div>
            </div>
          )}
        </div>
      </PageHero>
      <TechStack />
      <Detection />
      <Multiplex />
      <Attributes />
      <CloudAI />
      <Validation />
      <CTABand title="See the immune signatures the platform is built to read." body="An interactive simulator of the cytokine trajectories Biomarkr detects, across inflammatory, oncologic, and acute-threat conditions." primary="Open the model" primaryHref="/cytokines" secondary="Why inflammation" secondaryHref="/inflammation" />
      <SiteFooter />
    </div>);

}
window.TechnologyPage = TechnologyPage;