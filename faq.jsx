/* Biomarkr, FAQ. Grouped accordion drawn from the deck, ARPA-H summary,
   and product copy. Open/close toggles content (no height animation) so it
   is robust in any render context. Globals from chrome.jsx. */

const { Card } = window.BiomarkrDesignSystem_734cca;
/* PageHero, CTABand, Reveal, Lockup, SiteHeader, SiteFooter, ArrowRight global */

const FAQ_GROUPS = [
  { group: 'The technology', items: [
    ['What does Biomarkr actually measure?', 'A five-cytokine panel, IL-6, TNF-α, IL-1β, IFN-γ, and IL-10, from a 10 µL fingerstick of whole blood, with results in under ten minutes. These cytokines are the signaling molecules that coordinate the immune response.'],
    ['How is it different from a normal blood test?', 'A central-lab cytokine panel needs a 2–5 mL venipuncture, a centrifuge, a cold chain, 24–72 hours, and $200–$800. Q-SENS needs a finger-prick, no sample prep, no lab, ten minutes, and roughly $15 per panel at scale.'],
    ['How accurate is it?', 'Q-SENS achieves single pg/mL sensitivity in unprocessed whole blood, validated head-to-head against Luminex, the current lab gold standard. An order-of-magnitude further improvement is expected in the final optimized design.'],
    ['How does the chip work?', 'A silicon photonic chip carries 32 sensors, each functionalized with a cytokine-specific capture antibody. When a cytokine binds, a fluorescently-labelled secondary antibody forms a "sandwich," and evanescent-wave excitation reads the growing fluorescence in real time, no wash steps, no enzymatic amplification, no reagent handling.'],
    ['Can it measure things beyond these five cytokines?', 'Yes. The 32-sensor chip supports up to 32 biomarkers. The current panel occupies five sensor clusters; adding a panel, cardiovascular, oncology, pandemic preparedness, or procalcitonin, is a cartridge reformulation with no hardware redesign of the reader.'],
  ] },
  { group: 'The science', items: [
    ['Why cytokines, and why these five?', 'Each marker carries a distinct biological role: IL-6 (acute-phase initiator), TNF-α (vascular alarm and biologic-therapy target), IL-1β (inflammasome sensor), IFN-γ (the most discriminating marker for viral vs. bacterial), and IL-10 (the counter-regulatory brake). Together they cover the inflammatory axis from a single fingerstick.'],
    ['What do you mean by "trajectory"?', 'A single cytokine value is meaningless without context, it depends on your baseline, age, stress, and time of day. The clinically meaningful signal lives in how values move over time: the rate of change, the ratios between markers, and how the whole system co-evolves. Frequency turns a snapshot into a trajectory.'],
    ['Why does a personal baseline matter?', 'Cytokines vary 2–4× over the day on an individual circadian rhythm. Without a wake-normalized personal baseline, up to 40% of apparent deviations are just circadian noise. Your baseline is established over a stable window and becomes your own reference, not a population average.'],
    ['Where does the AI come in?', 'Longitudinal cytokine data is high-dimensional: five analytes, measured repeatedly, each with its own noise and dynamics. Machine-learning models trained on personalized longitudinal data extract the features, rate of change, cytokine ratios, temporal signatures, that no single-threshold rule can.'],
  ] },
  { group: 'Availability & use', items: [
    ['Can I buy a Q-SENS device today?', 'Not yet. Q-SENS is currently for research use only (RUO). We are partnering with pharma and biotech organizations for research programs, and meeting with investors for our seed round, while advancing the clinical and regulatory path.'],
    ['Is it FDA cleared?', 'Not yet. We are working with MCRA (an IQVIA business) on the regulatory strategy and submissions, a 510(k) for hsCRP and a De Novo pathway for the five-cytokine panel. The platform was validated at prototype stage through a prior BARDA DRIVe award.'],
    ['Is it for clinical or diagnostic use?', 'Not currently. Everything shown today, including the interactive cytokine model, is illustrative and research-grade. Modeled trajectories are based on published immunopathology literature, not device output, and are not for clinical, diagnostic, or research use as presented.'],
    ['Who is Q-SENS for right now?', 'Today: research partners, decentralized clinical trials, and academic labs that need frequent, standardized, ambulatory cytokine collection. The long-term vision is direct-to-consumer immune monitoring, a personal baseline that catches disease before symptoms appear.'],
  ] },
  { group: 'The company', items: [
    ['Who is behind Biomarkr?', 'A founder team spanning silicon photonics, medicine, and company building: Dr. Reuven Duer (CSO, inventor of Q-SENS, 22 issued US patents), Dylan Brownstein (CEO), and Dr. Aren Giske (COO). We work with an ISO 13485 manufacturing partner (SMC Ltd.) and an IQVIA regulatory team.'],
    ['What is the funding story?', 'A prior BARDA DRIVe award validated home-based cytokine testing at prototype stage. We are pursuing ARPA-H funding for the trajectory-intelligence layer, the pre-competitive engineering and clinical feasibility work, alongside a seed round.'],
    ['How do I get involved?', 'Reach out at info@biomarkr.health. We are looking to talk with investors, pharma and biotech research partners, and clinicians working in inflammatory disease, oncology, and pandemic preparedness.'],
  ] },
];

function FaqItem({ q, a, open, onToggle }) {
  return (
    <div style={{ borderTop: '1px solid var(--border-default)' }}>
      <button onClick={onToggle} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, padding: '24px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--text-primary)' }}>
        <span style={{ fontSize: 20, fontWeight: 400, letterSpacing: '-0.01em', lineHeight: 1.35 }}>{q}</span>
        <span style={{ flexShrink: 0, width: 28, height: 28, borderRadius: '50%', border: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: 'var(--text-secondary)' }}>{open ? '–' : '+'}</span>
      </button>
      {open && <p style={{ margin: '0 0 26px', paddingRight: 48, fontSize: 15, lineHeight: 1.8, color: 'var(--text-secondary)', maxWidth: 760 }}>{a}</p>}
    </div>
  );
}

function FaqGroup({ group, items, id }) {
  const [open, setOpen] = React.useState(null);
  return (
    <section id={id} className="hairline-top" style={{ padding: 'clamp(48px,6vh,72px) 0', scrollMarginTop: 90 }}>
      <div className="wrap r-faq" style={{ gap: 'clamp(24px,4vw,64px)', alignItems: 'start' }}>
        <Reveal>
          <window.BM_SplitText as="h2" text={group} className="bm-title faq-sticky" style={{ position: 'sticky', top: 110, fontSize: 24, fontWeight: 300, letterSpacing: '-0.02em', margin: 0 }} />
        </Reveal>
        <Reveal delay={80}>
          <div>
            {items.map(([q, a], i) => (
              <FaqItem key={q} q={q} a={a} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const FAQ_SECTIONS = [
  { id: 'faq-overview', label: 'Overview' },
  ...FAQ_GROUPS.map((g, i) => ({ id: 'faq-g' + i, label: g.group })),
];

function FaqPage() {
  const ScrollSpy = window.BM_ScrollSpy;
  return (
    <div className="bm-page">
      <SiteHeader active="faq" />
      <ScrollSpy sections={FAQ_SECTIONS} />
      <div id="faq-overview"><PageHero eyebrow="FAQ" title="Questions, answered plainly."
        lead="What Biomarkr measures, how the science works, where it stands today, and how to get involved. Numbers do the persuading." /></div>
      {FAQ_GROUPS.map((g, i) => <FaqGroup key={g.group} id={'faq-g' + i} group={g.group} items={g.items} />)}
      <CTABand title="Still have a question?" body="If you're an investor, a research partner, or a clinician working in inflammatory disease, we'd like to hear from you." primary="Get in touch" primaryHref="mailto:info@biomarkr.health" />
      <SiteFooter />
    </div>
  );
}
window.FaqPage = FaqPage;
