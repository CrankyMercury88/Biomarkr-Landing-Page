/* Biomarkr, Home, Variation A: "The Trajectory Argument".
   Editorial, problem-led. Leads with the snapshot fallacy and walks the
   ARPA story (problem → trajectory platform → signatures → circadian →
   use cases) as a restrained, text-forward argument. Composes chrome.jsx
   + arpa-sections.jsx. */

const { Card, Badge, Avatar } = window.BiomarkrDesignSystem_734cca;
/* globals from chrome.jsx: SiteHeader, SiteFooter, Lockup, Reveal, ArrowRight, BM_CTABand
   globals from arpa-sections.jsx: ARPA_*
   globals from tweaks-panel.jsx: useTweaks, TweaksPanel, Tweak* */

const TRAJ_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroFace": "sans",
  "rhythm": "regular",
  "chartFill": false,
  "showDevice": true
} /*EDITMODE-END*/;

const RHYTHM_PAD = { compact: '4.5rem', regular: '7rem', spacious: '9.5rem' };

const SPY_SECTIONS = [
{ id: 'sec-hero', label: 'Overview' },
{ id: 'sec-problem', label: 'The problem' },
{ id: 'sec-platform', label: 'The platform' },
{ id: 'sec-signal', label: 'The signal' },
{ id: 'sec-confound', label: 'Circadian' },
{ id: 'sec-usecases', label: 'Use cases' },
{ id: 'sec-team', label: 'Team' }];


/* Numbered section opener in brand style (rule + eyebrow + light title). */
function SectionOpen({ num, eyebrow, title, sub, align = 'left', style = {} }) {
  return (
    <header style={{ display: 'flex', flexDirection: 'column', alignItems: align === 'center' ? 'center' : 'flex-start', textAlign: align, ...style }}>
      <span className="rule" style={{ marginBottom: 20 }} />
      <span className="eyebrow" style={{ marginBottom: 14 }}><span style={{ color: 'var(--text-tertiary)' }}>{num} ·</span> {eyebrow}</span>
      <h2 style={{ margin: 0, fontSize: 'clamp(30px,4vw,46px)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1.1, maxWidth: 760 }}>{title}</h2>
      {sub && <p className="prose" style={{ maxWidth: 640, marginTop: 20, marginBottom: 0, textAlign: align }}>{sub}</p>}
    </header>);

}

function HeroTrajectory({ heroFace }) {
  return (
    <section id="sec-hero" style={{ position: 'relative', minHeight: '88vh', display: 'flex', alignItems: 'center', padding: '14vh 0 8vh' }}>
      <div className="wrap r-hero" style={{ gap: 'clamp(40px,6vw,88px)', alignItems: 'center', gridTemplateColumns: 'minmax(0,1.18fr) minmax(0,0.92fr)' }}>
        <Reveal>
          <div className="eyebrow" style={{ marginBottom: 24 }}>INFLAMMATION MONITORING</div>
          <h1 style={{ margin: 0, fontFamily: heroFace === 'serif' ? 'var(--font-serif)' : 'var(--font-sans)', fontSize: 'clamp(40px,5.4vw,72px)', fontWeight: 300, letterSpacing: heroFace === 'serif' ? '-0.02em' : '-0.035em', lineHeight: 1.02 }}>
            Medicine reads one snapshot at a time. <br /><span style={{ color: 'var(--text-tertiary)', fontFamily: "Inter" }}>We see the entire&nbsp;story.</span>
          </h1>
          <p className="lead" style={{ maxWidth: 500, marginTop: 28, color: 'var(--text-secondary)' }}>A single measurement means nothing on its own, not unless you know whether it rose in six hours or has held steady for two weeks. Biomarkr measures five cytokines from a fingerstick, again and again, against your own baseline.

          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 34, flexWrap: 'wrap' }}>
            <a className="btn btn-primary" href="/cytokines">See the model <ArrowRight /></a>
            <a className="btn btn-ghost" href="/technology">How Biomarkr works</a>
          </div>
        </Reveal>
        <Reveal delay={140}>
          <Card padding="lg" elevation="float" style={{ background: 'var(--surface-page)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8, gap: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.04em' }}>One reading, two truths</div>
              <Badge tone="caution" dot>Same value</Badge>
            </div>
            <p style={{ margin: '0 0 8px', fontSize: 12.5, color: 'var(--text-tertiary)' }}>The snapshot is identical. The trajectory is the diagnosis.</p>
            <ARPA_SnapshotChart width={560} height={320} />
          </Card>
        </Reveal>
      </div>
    </section>);

}

/* ============================================================
   06, Team and advisors
   ============================================================ */
function HomeTeam() {
  const { LinkedIn } = window.BM_Icons;
  const LI = ({ href, label }) =>
  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
  style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--text-tertiary)', textDecoration: 'none', transition: 'color .2s var(--ease-out)' }}
  onMouseEnter={(e) => {e.currentTarget.style.color = 'var(--text-primary)';}}
  onMouseLeave={(e) => {e.currentTarget.style.color = 'var(--text-tertiary)';}}>
      <LinkedIn size={15} />
    </a>;

  const team = [
  { src: 'assets/team-dylan.jpg', name: 'Dylan Brownstein', title: 'Chief Executive Officer', bio: 'Serial entrepreneur. Previously founded a VC-backed, AI-driven SaaS company. Former investor at Karcher Ventures.', li: 'https://www.linkedin.com/in/dylan-brownstein/' },
  { src: 'assets/team-reuven.jpg', name: 'Dr. Reuven Duer, PhD', title: 'Chief Science Officer', bio: 'Inventor of the Q-SENS platform. PhD in Physics, Technion. 22 issued US patents. Led BARDA-funded prototype development.', li: 'https://www.linkedin.com/in/reuvenduer/' },
  { src: 'assets/team-aren.jpg', name: 'Dr. Aren Giske, MD', title: 'Chief Operating Officer', bio: 'Twice-appointed medical director. Board member, Kadlec Medical Center. Occupational and Environmental Medicine specialist.', li: 'https://www.linkedin.com/in/arengiske/' }];

  const advisors = [
  { src: 'assets/advisor-torsten.jpg', name: 'Torsten Fiebig', bio: 'Senior R&D leader and applied biophysical chemist. Postdoctoral fellow at Caltech; acting VP for Assay Development at Proactive Dx, with experience across diagnostics and life sciences.', li: 'https://www.linkedin.com/in/torsten-fiebig-78461935/' },
  { src: 'assets/advisor-ilhui.jpg', name: 'Ilhui Hernandez', bio: 'Biologist with an MSc in Chemical Engineering. EU Erasmus Mundus scholar; specializes in bioactive compounds, longevity science, and preventive health innovation.', li: 'https://www.linkedin.com/in/ilhui-hernandez-021b1417a/' },
  { src: 'assets/advisor-larry.jpg', name: 'Larry Zulch', bio: 'Serial entrepreneur and former CEO of Photometics and PLC Diagnostics. Officer at EMC Corporation following the acquisition of Dantz Development, the company he co-founded.', li: 'https://www.linkedin.com/in/larryzulch/' }];

  return (
    <section id="sec-team" className="hairline-top" style={{ padding: 'var(--sec-pad) 0' }}>
      <div className="wrap">
        <Reveal><SectionOpen num="06" eyebrow="The team" title="A founder team built for this problem." sub="Spanning silicon photonics, medicine, and company building, backed by an ISO 13485 manufacturing partner and an IQVIA regulatory team." /></Reveal>
        <div className="r-3" style={{ gap: '40px 36px', marginTop: 52 }}>
          {team.map((m, i) =>
          <Reveal key={m.name} delay={i * 90}>
              <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                <Avatar src={m.src} name={m.name} size="lg" />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ fontSize: 16, fontWeight: 600 }}>{m.name}</div>
                    <LI href={m.li} label={m.name + ' on LinkedIn'} />
                  </div>
                  <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-secondary)', margin: '2px 0 8px' }}>{m.title}</div>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--text-secondary)' }}>{m.bio}</p>
                </div>
              </div>
            </Reveal>
          )}
        </div>
        <div className="hairline-top" style={{ marginTop: 64, paddingTop: 56 }}>
          <Reveal>
            <span className="rule" style={{ marginBottom: 18 }} />
            <span className="eyebrow">Advisors</span>
          </Reveal>
          <div className="r-3" style={{ gap: '36px 36px', marginTop: 30 }}>
            {advisors.map((a, i) =>
            <Reveal key={a.name} delay={i * 80}>
                <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                  <Avatar src={a.src} name={a.name} size="lg" />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ fontSize: 16, fontWeight: 600 }}>{a.name}</div>
                      <LI href={a.li} label={a.name + ' on LinkedIn'} />
                    </div>
                    <p style={{ margin: '6px 0 0', fontSize: 14, lineHeight: 1.6, color: 'var(--text-secondary)' }}>{a.bio}</p>
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>);

}

function HomeTrajectory() {
  const CTABand = window.BM_CTABand;
  const ScrollSpy = window.BM_ScrollSpy;
  const [t, setTweak] = useTweaks(TRAJ_TWEAK_DEFAULTS);
  const secPad = RHYTHM_PAD[t.rhythm] || RHYTHM_PAD.regular;
  const sec = { padding: 'var(--sec-pad) 0' };
  return (
    <div style={{ '--sec-pad': secPad }}>
      <SiteHeader active="home" />
      <ScrollSpy sections={SPY_SECTIONS} />
      <HeroTrajectory heroFace={t.heroFace} />

      {/* 01, The problem */}
      <section id="sec-problem" className="hairline-top" style={sec}>
        <div className="wrap">
          <Reveal><SectionOpen num="01" eyebrow="The problem" title="Medicine is blind to immune trajectories." /></Reveal>
          <div className="r-split" style={{ gap: 'clamp(40px,6vw,88px)', alignItems: 'start', marginTop: 48 }}>
            <Reveal>
              <p className="lead" style={{ marginTop: 0 }}>Chronic inflammatory disease touches <strong>100 million Americans</strong> and costs more than <strong>$800 billion</strong> a year, yet it's managed with tools structurally mismatched to the biology.</p>
              <div className="prose" style={{ marginTop: 22 }}>
                <p>Immune states are dynamic, personal, and trajectory-dependent. Every existing diagnostic returns a single snapshot. So flares go undetected until they're severe, treatments continue past the point of efficacy, and dose changes follow symptom reports instead of biological evidence.</p>
                <p>This is an engineering problem, not a scientific one. The biology is understood. The measurement infrastructure does not exist.</p>
              </div>
            </Reveal>
            <div className="r-2" style={{ gap: 1, background: 'var(--border-subtle)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md, 12px)', overflow: 'hidden' }}>
              {ARPA_PROBLEMS.map((p, i) =>
              <Reveal key={p.label} delay={i * 80} style={{ background: 'var(--surface-page)', padding: '22px 22px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--signal-critical)', marginBottom: 10 }}>{p.label}</div>
                  <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: 'var(--text-secondary)' }}>{p.body}</p>
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 02, From snapshot to trajectory */}
      <section id="sec-platform" className="hairline-top" style={sec}>
        <div className="wrap">
          <div className={t.showDevice ? 'r-split' : ''} style={{ gap: 'clamp(40px,6vw,80px)', alignItems: 'center' }}>
            <Reveal><SectionOpen num="02" eyebrow="The platform" title="Biomarkr turns a snapshot into a trajectory." sub="A handheld silicon photonic biosensor, 22 issued patents, no moving parts, that runs a quantitative five-cytokine immunoassay from a 10 µL fingerstick in under ten minutes. The cytokine equivalent of continuous glucose monitoring." /></Reveal>
            {t.showDevice &&
            <Reveal delay={120}>
              <img src="/assets/device-reader.png" alt="The Biomarkr reader" style={{ width: '100%', maxWidth: 380, margin: '0 auto', display: 'block', filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.14))' }} />
            </Reveal>
            }
          </div>
          <Reveal delay={80} style={{ marginTop: 56 }}><ARPA_SpecRow /></Reveal>
          <div className="hairline-top" style={{ marginTop: 64, paddingTop: 56 }}>
            <Reveal><p className="lead" style={{ maxWidth: 720, marginTop: 0, marginBottom: 48 }}>Frequent, low-cost, multiplexed measurement at home unlocks three capabilities no single-timepoint test can offer.</p></Reveal>
            <ARPA_CapabilityRow />
          </div>
        </div>
      </section>

      {/* 03, Signatures */}
      <section id="sec-signal" className="hairline-top" style={sec}>
        <div className="wrap">
          <Reveal><SectionOpen num="03" eyebrow="The signal" title="Disease lives in the pattern, not the number." sub="The five cytokines span four immune axes, innate initiation, systemic amplification, adaptive effector function, and counter-regulation. Each condition writes a characteristic signature in how those markers move together over time." /></Reveal>
          <div className="r-3" style={{ gap: 24, marginTop: 52 }}>
            {['sepsis', 'ra', 'longcovid'].map((k, i) =>
            <Reveal key={k} delay={i * 110}><ARPA_SignatureCard sig={ARPA_SIGNATURES[k]} prefix={'sigA-' + k} fill={t.chartFill} /></Reveal>
            )}
          </div>
          <Reveal delay={120}>
            <p className="prose" style={{ maxWidth: 760, marginTop: 40, fontSize: 17, lineHeight: 1.7 }}>The same absolute IL-6 carries opposite clinical meaning depending on whether it's rising, stable, or falling, and whether it's a 2-fold or 10-fold move from that individual's baseline. <strong>No single-timepoint test, however sensitive, can extract this.</strong></p>
          </Reveal>
        </div>
      </section>

      {/* 04, Circadian */}
      <section id="sec-confound" className="hairline-top" style={sec}>
        <div className="wrap">
          <Reveal><SectionOpen num="04" eyebrow="The confound" title="The circadian problem, and its solution." /></Reveal>
          <Reveal delay={80} style={{ marginTop: 52 }}><ARPA_CircadianBlock /></Reveal>
        </div>
      </section>

      {/* 05, Use cases */}
      <section id="sec-usecases" className="hairline-top" style={sec}>
        <div className="wrap">
          <Reveal><SectionOpen num="05" eyebrow="Where it changes outcomes" title="One platform, many trajectories." sub="Biomarkr is horizontal. These are the highest-priority applications, each with an established unmet need and a clear cytokine rationale." /></Reveal>
          <div style={{ marginTop: 52 }}><ARPA_UseCaseGrid /></div>
          <Reveal delay={120} style={{ marginTop: 48 }}>
            <a className="btn btn-primary" href="/use-cases">See it in practice <ArrowRight /></a>
          </Reveal>
        </div>
      </section>

      <HomeTeam />
      <CTABand
        title="The CGM transformed diabetes by turning a snapshot into a trajectory. Biomarkr does the same for the immune system."
        body="We're partnering with pharma and biotech for research programs. If immune trajectory is the missing layer, let's talk."
        primary="Request a conversation" primaryHref="mailto:dylan@biomarkr.health"
        secondary="See it in practice" secondaryHref="/use-cases" />
      <SiteFooter />
      <TweaksPanel>
        <TweakSection label="Hero" />
        <TweakRadio label="Headline face" value={t.heroFace} options={['sans', 'serif']} onChange={(v) => setTweak('heroFace', v)} />
        <TweakSection label="Layout" />
        <TweakRadio label="Section rhythm" value={t.rhythm} options={['compact', 'regular', 'spacious']} onChange={(v) => setTweak('rhythm', v)} />
        <TweakToggle label="Show device photo" value={t.showDevice} onChange={(v) => setTweak('showDevice', v)} />
        <TweakSection label="Charts" />
        <TweakToggle label="Signature area fill" value={t.chartFill} onChange={(v) => setTweak('chartFill', v)} />
      </TweaksPanel>
    </div>);

}

window.HomeTrajectory = HomeTrajectory;