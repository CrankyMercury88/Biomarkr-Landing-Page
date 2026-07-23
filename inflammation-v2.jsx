/* Biomarkr — Why inflammation, v2 (editorial).
   Dr. Giske's writeup, composed in the live site's full-width
   rhythm: numbered section openers, .r-split / .r-3 grids, charts
   placed beside text, white sections on hairline dividers, dark
   accent sections. Functional signal color used only to mean
   something. Globals from chrome.jsx; charts from inflammation-v2-charts.jsx. */

const { Card, Badge } = window.BiomarkrDesignSystem_734cca;
/* Reveal, SiteHeader, SiteFooter, ArrowRight global; CTABand/ScrollSpy on window.BM_* */
const { IV2_AcuteChronic, IV2_DiseaseHub, IV2_BlindSpot, IV2_EarlyAction, IV2_Relapse, IV2_Subclinical, IV2_Frequency } = window;

function Ref({ n, id }) {
  return <sup className="iv2-ref"><a href={'#r' + n} id={id}>{n}</a></sup>;
}

/* numbered section opener — matches home's SectionOpen */
function SectionOpen({ num, eyebrow, title, sub, align = 'left', maxTitle = 820, style = {} }) {
  return (
    <header className="iv2-open" style={{ display: 'flex', flexDirection: 'column', alignItems: align === 'center' ? 'center' : 'flex-start', textAlign: align, ...style }}>
      <span className="rule" style={{ marginBottom: 20 }} />
      <span className="eyebrow" style={{ marginBottom: 15 }}><span className="n">{num} ·</span> {eyebrow}</span>
      {title && <window.BM_SplitText as="h2" text={typeof title === 'string' ? title : ''} style={{ margin: 0, fontSize: 'clamp(32px,4.2vw,50px)', fontWeight: 300, letterSpacing: '-0.028em', lineHeight: 1.08, maxWidth: maxTitle }} />}
      {sub && <p className="prose" style={{ maxWidth: 660, marginTop: 22, marginBottom: 0, fontSize: 17, textAlign: align }}>{sub}</p>}
    </header>
  );
}

function FigCard({ label, children, legend }) {
  return (
    <div className="iv2-fig-card">
      <div className="iv2-fig-label">{label}</div>
      {children}
      {legend && (
        <div className="iv2-legend">
          {legend.map((l, i) => <span className="k" key={i}><span className="sw" style={{ background: l.color }} />{l.text}</span>)}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   HERO — split, like the home hero (text + anchored chart card)
   ============================================================ */
function Hero() {
  return (
    <section className="iv2-hero">
      <div className="wrap r-hero" style={{ gap: 'clamp(40px,6vw,88px)', alignItems: 'center', gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,0.9fr)' }}>
        <Reveal>
          <div className="eyebrow" style={{ marginBottom: 22 }}>Why inflammation</div>
          <window.BM_SplitText as="h1" stagger={40} style={{ margin: 0, fontSize: 'clamp(42px,5.6vw,80px)', fontWeight: 300, letterSpacing: '-0.035em', lineHeight: 1.0 }}
          segments={[{ text: 'Inflammation is the' }, { text: 'throughline', em: true }, { text: 'of chronic disease.' }]} />
          <p className="lead" style={{ maxWidth: 520, marginTop: 28, color: 'var(--text-secondary)' }}>The same biological process that protects us from infection and injury becomes the quiet driver of the conditions that cause most death and disability — once it stops switching off. We can treat it. We barely measure it.</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 34, flexWrap: 'wrap' }}>
            <a className="btn btn-primary" href="/cytokines">See the model <ArrowRight /></a>
            <a className="btn btn-ghost" href="/technology">How Biomarkr works</a>
          </div>
        </Reveal>
        <Reveal delay={140}>
          <Card padding="lg" elevation="float" style={{ background: 'var(--surface-page)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8, gap: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.04em' }}>One mechanism, two outcomes</div>
              <Badge tone="caution" dot>Chronic</Badge>
            </div>
            <p style={{ margin: '0 0 14px', fontSize: 13, color: 'var(--text-tertiary)' }}>Acute resolves. Chronic never switches off.</p>
            <IV2_AcuteChronic />
          </Card>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   01 · THE BIOLOGY
   ============================================================ */
const ACUTE = [['Protective.', 'Clears infection and injury.'], ['Short-lived.', 'Resolves in hours to days.'], ['Self-limiting.', 'An off-switch is built in.'], ['Localized.', 'Confined to the affected tissue.'], ['Necessary.', 'We cannot heal without it.']];
const CHRONIC = [['Damaging.', 'Erodes tissue over time.'], ['Persistent.', 'Runs for months to years.'], ['Unresolved.', 'The off-switch has failed.'], ['Systemic.', 'Active across the whole body.'], ['Silent.', 'Often no day-to-day symptom.']];
function Biology() {
  return (
    <section id="biology" className="hairline-top" style={{ padding: 'var(--sec-pad) 0' }}>
      <div className="wrap">
        <Reveal><SectionOpen num="01" eyebrow="The biology" title="One mechanism, two very different outcomes." /></Reveal>
        <div className="r-split" style={{ gap: 'clamp(40px,6vw,80px)', alignItems: 'start', marginTop: 52 }}>
          <Reveal>
            <p className="lead" style={{ marginTop: 0 }}>Acute inflammation is one of the body's most useful responses — fast, local, and self-limiting.</p>
            <div className="prose" style={{ marginTop: 22 }}>
              <p>When tissue is injured or infected, the immune system floods the site with signaling proteins and immune cells to clear the threat and begin repair. Built into that same response is an active program that shuts it down once the work is done.<Ref n={1} id="c1" /></p>
              <p>Trouble begins when the off-switch fails. Inflammation settles into a low-grade, body-wide hum that can persist for years — driven by aging, chronic stress, poor diet, inactivity, and environmental exposure, and damaging tissue the entire time it runs.<Ref n={2} id="c2" /></p>
              <p><strong>That difference is the whole reason measurement is hard.</strong> Acute inflammation announces itself. Chronic inflammation is subtle by design — which is precisely why a once-a-year snapshot tends to miss it.</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="iv2-faces stack">
              <div className="iv2-face"><h4><span className="tick" />Acute inflammation</h4><ul>{ACUTE.map((r, i) => <li key={i}><b>{r[0]}</b> {r[1]}</li>)}</ul></div>
              <div className="iv2-face warn"><h4><span className="tick" />Chronic inflammation</h4><ul>{CHRONIC.map((r, i) => <li key={i}><b>{r[0]}</b> {r[1]}</li>)}</ul></div>
            </div>
          </Reveal>
        </div>
        <Reveal delay={80} style={{ marginTop: 56 }}>
          <FigCard label="One mechanism, two trajectories"
            legend={[
              { color: 'var(--signal-positive)', text: 'Acute — spikes to clear a threat, then resolves on its own' },
              { color: 'var(--signal-caution)', text: 'Chronic — the off-switch fails, so it stays elevated and keeps doing damage' },
            ]}>
            <IV2_AcuteChronic />
          </FigCard>
          <p className="iv2-cap" style={{ maxWidth: 'none' }}>Same signaling machinery, opposite stories. The danger of chronic inflammation is that it stays just above baseline for years without ever producing the dramatic spike a single test is built to catch.</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   02 · THE STAKES — big number + hub diagram, split
   ============================================================ */
function Stakes() {
  return (
    <section id="stakes" className="hairline-top" style={{ padding: 'var(--sec-pad) 0' }}>
      <div className="wrap">
        <Reveal><SectionOpen num="02" eyebrow="The stakes" title="The common thread behind the diseases that matter most." /></Reveal>
        <div className="r-split" style={{ gap: 'clamp(40px,6vw,80px)', alignItems: 'center', marginTop: 52 }}>
          <Reveal>
            <p className="iv2-bignum">3<span className="slash">/</span>5</p>
            <p className="iv2-say">Three of every five deaths worldwide trace to inflammation-driven conditions.</p>
            <p className="prose" style={{ marginTop: 28, maxWidth: 460 }}>Cardiovascular disease, cancer, diabetes, kidney and liver disease, autoimmune conditions, and neurodegeneration look like separate problems and sit in separate clinics. A growing body of research places the same driver upstream of all of them — carrying information about risk long before damage shows up on a scan.<Ref n={2} id="c2b" /></p>
          </Reveal>
          <Reveal delay={120}>
            <IV2_DiseaseHub />
            <p className="iv2-cap" style={{ textAlign: 'center', marginTop: 4 }}>Hover any disease to trace its link to chronic inflammation.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   03 · THE GAP — split prose + blind-spot chart, then quote
   ============================================================ */
function Gap() {
  return (
    <section id="gap" className="hairline-top" style={{ padding: 'var(--sec-pad) 0' }}>
      <div className="wrap">
        <Reveal><SectionOpen num="03" eyebrow="The gap" title="We can act on inflammation. We just cannot see it." /></Reveal>
        <div className="r-split" style={{ gap: 'clamp(40px,6vw,80px)', alignItems: 'center', marginTop: 52 }}>
          <Reveal>
            <div className="prose" style={{ marginTop: 0 }}>
              <p style={{ marginTop: 0 }}>Two facts sit uncomfortably next to each other.</p>
              <p><strong>First, we already have therapies that work.</strong> Anti-inflammatory and immune-modulating drugs can genuinely change the course of many of these diseases.</p>
              <p><strong>Second, we have almost no way to watch inflammation as it behaves.</strong> CRP and its kin move on a timescale of hours to days, yet they are checked only a few times a year. We manage a fast, dynamic process with slow, infrequent snapshots — and disease gets caught reactively, after the damage is done.</p>
              <p>The gap is not a shortage of drugs. It is the absence of a way to track immune dynamics in everyday life.</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <FigCard label="Catching the climb before symptoms"
              legend={[
                { color: 'var(--signal-caution)', text: 'Repeatable testing — sees the climb in real time' },
                { color: 'var(--text-primary)', text: 'Single snapshot — only catches it once symptoms show' },
              ]}>
              <IV2_EarlyAction />
            </FigCard>
            <p className="iv2-cap">Inflammation climbs for weeks before symptoms surface. Test often enough and that hidden rise becomes a window to act — the blind spot, removed.</p>
          </Reveal>
        </div>
        <Reveal delay={80} style={{ marginTop: 'clamp(56px,7vw,88px)' }}>
          <blockquote className="iv2-quote">A single cytokine value, read on its own, is close to meaningless. It depends on your baseline, your age, your stress, the time of day. <span style={{ color: 'var(--signal-caution)' }}>The meaning is in the movement.</span></blockquote>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   04 · IN PRACTICE — alternating split deep-dives
   ============================================================ */
function Dive({ tag, title, lead, children, flip }) {
  return (
    <div className="iv2-dive">
      <div className="r-split" style={{ gap: 'clamp(36px,5vw,72px)', alignItems: 'center' }}>
        <Reveal style={{ order: flip ? 2 : 1 }}>
          <span className="tag">{tag}</span>
          <h3>{title}</h3>
          <p className="dive-lead">{lead}</p>
        </Reveal>
        <Reveal delay={100} style={{ order: flip ? 1 : 2 }}>{children}</Reveal>
      </div>
    </div>
  );
}
function Practice() {
  return (
    <section id="practice" className="hairline-top" style={{ padding: 'var(--sec-pad) 0' }}>
      <div className="wrap">
        <Reveal><SectionOpen num="04" eyebrow="In practice" title="The same signal, across very different diseases." /></Reveal>

        <Dive tag="Cardiovascular disease"
          title="Inflammation does not ride along with heart disease. It helps cause it."
          lead={<>For decades, heart-attack risk was framed almost entirely around cholesterol. The CANTOS trial reframed it: blocking a single inflammatory signal lowered future cardiovascular events, with no change in cholesterol at all.<Ref n={3} id="c3" /></>}>
          <div className="iv2-ev">
            <div className="iv2-ev-stats">
              <div className="iv2-ev-stat"><div className="n">~50<span className="u">%</span></div><span className="c">of heart attacks occur in people whose cholesterol is not high</span></div>
              <div className="iv2-ev-stat"><div className="n">10k<span className="u">+</span></div><span className="c">post-heart-attack patients with elevated CRP studied in CANTOS</span></div>
              <div className="iv2-ev-stat"><div className="n">0<span className="u">%</span></div><span className="c">change in cholesterol, yet events still fell</span></div>
            </div>
            <p className="iv2-ev-note">Inflammation was not a passenger — it was <b>part of the engine</b>. The catch: this smoldering vascular inflammation stays invisible to standard labs until something breaks.</p>
          </div>
        </Dive>

        <Dive tag="Inflammatory bowel disease" flip
          title="The targets are inflammatory markers. The cadence is the problem."
          lead={<>Crohn's and ulcerative colitis are managed by treating to a target — measurable control of inflammation, not just symptom relief. Guidelines name CRP normalization and a drop in fecal calprotectin as the markers to chase.<Ref n={4} id="c4" /> The catch is frequency.</>}>
          <FigCard label="A relapse builds between checkups">
            <IV2_Relapse />
          </FigCard>
        </Dive>

        <Dive tag="Rheumatoid arthritis"
          title="Even patients in remission can have inflammation the monitoring misses."
          lead={<>Therapy is steered by disease-activity scores that include CRP, reviewed every one to three months while disease is active.<Ref n={5} id="c5" /> Many patients counted as in remission still have subclinical joint inflammation that predicts future flares and joint damage.</>}>
          <FigCard label="In remission by score, still inflamed">
            <IV2_Subclinical />
          </FigCard>
        </Dive>

        <Reveal delay={60}>
          <p className="prose" style={{ marginTop: 'clamp(48px,6vw,72px)', fontSize: 20, lineHeight: 1.6, color: 'var(--text-primary)', maxWidth: 820, fontWeight: 300 }}>The lesson repeats across all three: inflammation is the thing that matters, and we measure it too rarely, and too bluntly, to keep up with it.</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   05 · THE OPPORTUNITY
   ============================================================ */
function Opportunity() {
  return (
    <section id="opportunity" className="hairline-top" style={{ padding: 'var(--sec-pad) 0' }}>
      <div className="wrap r-split" style={{ gap: 'clamp(40px,6vw,80px)', alignItems: 'center' }}>
        <Reveal>
          <SectionOpen num="05" eyebrow="The opportunity" title="Frequency turns a snapshot into a trajectory." />
          <div className="prose" style={{ marginTop: 26, maxWidth: 500 }}>
            <p style={{ marginTop: 0 }}>Continuous glucose monitoring transformed diabetes care. Glucose was not a new biomarker — what changed was how often it was measured. Read continuously against a person's own baseline, a single number became a trajectory people could act on.</p>
            <p><strong>The same opportunity is open for inflammation.</strong> Measured often enough to reveal the slope, the same handful of markers stop being a post-mortem and start being an early-warning system. Is a treatment working? Is a flare building? Those are questions about direction — and direction only appears when you measure more than once.</p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <Card padding="lg">
            <IV2_Frequency />
            <p className="iv2-cap" style={{ marginTop: 18 }}>The biomarker is the same. The difference is how often you look. Four points a year describe a snapshot; frequent readings describe a direction.</p>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   CLOSING — full-bleed centered statement
   ============================================================ */
function Closing() {
  return (
    <section className="hairline-top" style={{ padding: 'clamp(88px,13vh,150px) 0' }}>
      <div className="wrap" style={{ textAlign: 'center' }}>
        <Reveal>
          <span className="rule" style={{ margin: '0 auto 24px' }} />
          <div className="eyebrow" style={{ marginBottom: 24 }}>The takeaway</div>
          <p className="serif" style={{ fontSize: 'clamp(32px,4.2vw,50px)', fontWeight: 300, lineHeight: 1.22, letterSpacing: '-0.02em', margin: '0 auto', maxWidth: 1000 }}>
            Inflammation is measurable, treatable, and sits upstream of the diseases that define modern chronic illness. The missing piece was never the biology — it was the ability to read the immune system <span style={{ color: 'var(--text-tertiary)' }}>often enough, and personally enough, to act before the damage is done.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   WHERE IT MATTERS (dark)
   ============================================================ */
const APPS = [
  ['Rheumatoid arthritis', '1.5M', 'US patients on biologics with no objective home monitoring. Trajectories detect response within days and predict flares 5–7 days before clinical presentation.'],
  ['Long COVID / ME-CFS', '17M+', 'Americans with no FDA-cleared objective biomarker. Episodic IFN-γ and IL-6 patterns provide the first immune fingerprint for stratification and monitoring.'],
  ['Inflammatory bowel disease', '3M+', 'Patients assessed every 8–12 weeks. Q-SENS detects secondary loss-of-response before clinical relapse — proactive switching, not reactive escalation.'],
  ['Cardiovascular & metabolic', '', 'Chronic low-grade inflammation invisible to standard labs. Longitudinal monitoring detects smoldering activation before organ damage.'],
  ['Post-surgical & survivorship', '', 'Cancer survivors and post-surgical patients carry quiet inflammation. A personal baseline surfaces deviations standard panels miss.'],
  ['Research & clinical trials', '', 'Exercise, nutrition, aging, sleep, and vaccine response — standardized, ambulatory 5-plex cytokine collection at scale, between site visits.'],
];
function Matters() {
  return (
    <section id="matters" className="iv2-matters" style={{ padding: 'var(--sec-pad) 0' }}>
      <div className="wrap">
        <Reveal>
          <span className="rule" style={{ marginBottom: 22 }} />
          <div className="eyebrow" style={{ marginBottom: 16 }}>Where it matters</div>
          <h2 style={{ margin: 0, fontSize: 'clamp(32px,4.2vw,50px)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1.1, maxWidth: 880 }}>The same five cytokines, across the diseases that define chronic illness.</h2>
        </Reveal>
        <div className="iv2-apps">
          {APPS.map((a, i) => (
            <Reveal key={a[0]} delay={i * 50}>
              <div className="iv2-app">
                <div className="head"><h3>{a[0]}</h3>{a[1] ? <span className="stat">{a[1]}</span> : <span className="dash" />}</div>
                <p>{a[2]}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   REFERENCES — two-column
   ============================================================ */
const REFS = [
  ['Medzhitov R. Origin and physiological roles of inflammation. ', 'Nature', '. 2008;454(7203):428–435.', 'https://doi.org/10.1038/nature07201', 'doi:10.1038/nature07201'],
  ['Furman D, Campisi J, Verdin E, et al. Chronic inflammation in the etiology of disease across the life span. ', 'Nature Medicine', '. 2019;25(12):1822–1832.', 'https://doi.org/10.1038/s41591-019-0675-0', 'doi:10.1038/s41591-019-0675-0'],
  ['Ridker PM, Everett BM, Thuren T, et al. Antiinflammatory therapy with canakinumab for atherosclerotic disease (CANTOS). ', 'New England Journal of Medicine', '. 2017;377(12):1119–1131.', 'https://doi.org/10.1056/NEJMoa1707914', 'doi:10.1056/NEJMoa1707914'],
  ['Turner D, Ricciuto A, Lewis A, et al. STRIDE-II: an update on the Selecting Therapeutic Targets in IBD initiative of the IOIBD. ', 'Gastroenterology', '. 2021;160(5):1570–1583.', 'https://doi.org/10.1053/j.gastro.2020.12.031', 'doi:10.1053/j.gastro.2020.12.031'],
  ['Smolen JS, Breedveld FC, Burmester GR, et al. Treating rheumatoid arthritis to target: 2014 update of an international task force.', 'Annals of the Rheumatic Diseases', '. 2016;75(1):3–15.', 'https://doi.org/10.1136/annrheumdis-2015-207524', 'doi:10.1136/annrheumdis-2015-207524'],
];
function References() {
  return (
    <section className="iv2-refs hairline-top" style={{ padding: 'clamp(56px,8vh,88px) 0' }}>
      <div className="wrap">
        <Reveal>
          <span className="rule" style={{ marginBottom: 20 }} />
          <div className="eyebrow" style={{ marginBottom: 14 }}>References</div>
          <h2 style={{ margin: 0, fontSize: 'clamp(22px,2.6vw,30px)', fontWeight: 300, letterSpacing: '-0.02em' }}>Sources</h2>
          <ol>
            {REFS.map((r, i) => <li key={i} id={'r' + (i + 1)}>{r[0]}<i>{r[1]}</i>{r[2]} <a href={r[3]} target="_blank" rel="noopener">{r[4]}</a></li>)}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   PAGE
   ============================================================ */
const IV2_SECTIONS = [
  { id: 'biology', label: 'The biology' },
  { id: 'stakes', label: 'The stakes' },
  { id: 'gap', label: 'The gap' },
  { id: 'practice', label: 'In practice' },
  { id: 'opportunity', label: 'The opportunity' },
  { id: 'matters', label: 'Where it matters' },
];
function InflammationV2Page() {
  const CTABand = window.BM_CTABand;
  const ScrollSpy = window.BM_ScrollSpy;
  return (
    <div className="iv2 bm-page">
      <SiteHeader active="inflammation" />
      <ScrollSpy sections={IV2_SECTIONS} />
      <Hero />
      <Biology />
      <Stakes />
      <Gap />
      <Practice />
      <Opportunity />
      <Closing />
      <Matters />
      <References />
      <CTABand title="See what the immune signature looks like." body="Explore modeled cytokine trajectories across inflammatory, oncologic, and acute-threat conditions in the interactive model." primary="Open the model" primaryHref="/cytokines" secondary="How the technology works" secondaryHref="/technology" />
      <SiteFooter />
    </div>
  );
}
window.InflammationV2Page = InflammationV2Page;
