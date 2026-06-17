/* Biomarkr, Founder's notes. An editorial writing index: a featured
   essay, a list of notes, and a quiet subscribe row. The entries are a
   starting editorial set drawn from the company's own themes, swap in
   real posts. Globals from chrome.jsx. */

const { Card, Input, Avatar, Badge } = window.BiomarkrDesignSystem_734cca;
/* PageHero, Reveal, Lockup, SiteHeader, SiteFooter, ArrowRight global */

const AUTHORS = {
  dylan: { name: 'Dylan Brownstein', role: 'CEO', src: 'assets/team-dylan.jpg' },
  reuven: { name: 'Reuven Duer', role: 'CSO', src: 'assets/team-reuven.jpg' },
  aren: { name: 'Aren Giske', role: 'COO', src: 'assets/team-aren.jpg' },
};

const POSTS = [
  { id: 1, featured: true, topic: 'Thesis', title: 'A CGM for the immune system', date: 'June 2026', read: '6 min', author: 'dylan',
    excerpt: 'The CGM didn\'t invent glucose. It changed how often we measured it, and in doing so, turned diabetes from a disease you react to into one you steer. The immune system is waiting for the same shift. Here is why we think cytokine trajectory is the missing layer of proactive health.' },
  { id: 2, topic: 'Science', title: 'A single number is a lie', date: 'May 2026', read: '5 min', author: 'reuven',
    excerpt: 'IL-6 of 15 pg/mL means nothing on its own. It depends on your baseline, your age, the time of day you measured. Up to 40% of apparent deviations are just circadian noise. Why personalized, wake-normalized baselines are the real product.' },
  { id: 3, topic: 'Technology', title: 'ELISA, on a chip', date: 'May 2026', read: '7 min', author: 'reuven',
    excerpt: 'How evanescent-wave optical sensing lets a fingernail-sized silicon chip do what a plate reader and a centrifuge used to, single pg/mL sensitivity in whole blood, no wash steps, no cold chain.' },
  { id: 4, topic: 'Medicine', title: 'The cost of waiting six weeks', date: 'April 2026', read: '4 min', author: 'aren',
    excerpt: 'Every biologic switch is a stone dropped into a well. For the patient, the wait for the splash is measured in cancelled plans and missed shifts. What changes when the data arrives before the crisis does.' },
  { id: 5, topic: 'Clinical', title: 'What procalcitonin tells you that cytokines can\'t', date: 'April 2026', read: '5 min', author: 'reuven',
    excerpt: 'A flat PCT in the face of a cytokine storm is one of the most useful signals in acute medicine: it says viral, not bacterial. On the dissociation that rules out sepsis at the bedside.' },
  { id: 6, topic: 'Company', title: 'From BARDA to ARPA-H: building the trajectory layer', date: 'March 2026', read: '6 min', author: 'dylan',
    excerpt: 'BARDA proved home-based cytokine testing is feasible. The next layer, circadian-normalized baselines and pre-symptomatic flare prediction, is the pre-competitive work we\'re building now.' },
];

function AuthorLine({ id, date, read }) {
  const a = AUTHORS[id];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <Avatar src={a.src} name={a.name} size="sm" />
      <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{a.name}</span>
      <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>· {date} · {read}</span>
    </div>
  );
}

function Featured({ post }) {
  return (
    <section style={{ padding: '8px 0 0' }}>
      <div className="wrap">
        <Reveal>
          <a href="#" style={{ textDecoration: 'none', display: 'block' }}>
            <Card padding="none" interactive style={{ overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr' }}>
                <div style={{ padding: 'clamp(28px,4vw,52px)' }}>
                  <span className="pill-tag" style={{ marginBottom: 20 }}>Latest · {post.topic}</span>
                  <h2 style={{ fontSize: 'clamp(28px,3.6vw,44px)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1.08, margin: '0 0 18px' }}>{post.title}</h2>
                  <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-secondary)', margin: '0 0 26px' }}>{post.excerpt}</p>
                  <AuthorLine id={post.author} date={post.date} read={post.read} />
                </div>
                <div style={{ background: 'var(--surface-inverse)', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 280, position: 'relative', overflow: 'hidden' }}>
                  <svg width="80%" viewBox="0 0 400 240" style={{ overflow: 'visible' }}>
                    {[0.3, 0.5, 0.7].map((g) => <line key={g} x1="10" x2="390" y1={g * 240} y2={g * 240} stroke="var(--paper-a10)" strokeWidth="1" />)}
                    <path d="M 10 180 L 60 175 L 110 182 L 160 165 L 210 168 L 260 140 L 310 96 L 360 60" fill="none" stroke="var(--white)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="360" cy="60" r="4" fill="var(--white)" />
                  </svg>
                </div>
              </div>
            </Card>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function PostGrid({ posts }) {
  return (
    <section style={{ padding: 'clamp(48px,7vh,80px) 0' }}>
      <div className="wrap">
        <Reveal><Lockup eyebrow="More notes" title="The archive" /></Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 'clamp(24px,3vw,40px)', marginTop: 48 }}>
          {posts.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 80}>
              <a href="#" style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                <article style={{ borderTop: '1px solid var(--border-default)', paddingTop: 24, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <span className="eyebrow" style={{ fontSize: 11 }}>{p.topic}</span>
                  <h3 style={{ fontSize: 23, fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.16, margin: '16px 0 12px' }}>{p.title}</h3>
                  <p style={{ fontSize: 14.5, lineHeight: 1.7, color: 'var(--text-secondary)', margin: '0 0 22px', flex: 1 }}>{p.excerpt}</p>
                  <AuthorLine id={p.author} date={p.date} read={p.read} />
                </article>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Subscribe() {
  const [email, setEmail] = React.useState('');
  return (
    <section style={{ background: 'var(--surface-inverse)', color: 'var(--text-inverse)', padding: 'clamp(56px,8vh,96px) 8%' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
        <span className="rule" style={{ background: 'var(--white)', margin: '0 auto 22px' }} />
        <h2 style={{ fontSize: 'clamp(28px,3.6vw,42px)', fontWeight: 300, letterSpacing: '-0.025em', color: 'var(--white)', margin: 0, lineHeight: 1.12 }}>Notes from the lab, on occasion.</h2>
        <p style={{ fontSize: 16, color: 'var(--grey-250)', marginTop: 18 }}>No cadence promises. We write when there's something worth saying about immune monitoring, the science, or building the company.</p>
        <form onSubmit={(e) => { e.preventDefault(); }} style={{ display: 'flex', gap: 10, maxWidth: 460, margin: '30px auto 0', alignItems: 'flex-end' }}>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <Input label="" placeholder="you@email.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <button type="submit" className="btn" style={{ background: 'var(--white)', color: 'var(--black)', padding: '14px 24px' }}>Subscribe</button>
        </form>
      </div>
    </section>
  );
}

function NotesPage() {
  const featured = POSTS.find((p) => p.featured);
  const rest = POSTS.filter((p) => !p.featured);
  return (
    <div>
      <SiteHeader active="notes" />
      <PageHero eyebrow="Founder's notes" title="Writing on the immune frontier."
        lead="Essays from the founders on immune monitoring, the science behind Q-SENS, and what we're learning while building proactive healthcare." />
      <Featured post={featured} />
      <PostGrid posts={rest} />
      <Subscribe />
      <SiteFooter />
    </div>
  );
}
window.NotesPage = NotesPage;
