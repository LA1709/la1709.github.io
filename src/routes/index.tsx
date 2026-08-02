import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect, useMemo, useState } from "react";
import {
  CASE_STUDIES,
  CommandPalette,
  NodesBackground,
  TopNav,
  useRecruiterMode,
} from "@/lib/portfolio";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Lakshay's Portfolio</title>
        <meta
          name="description"
          content="Enabling Business Growth via Digital Transformation."
        />
      </Helmet>
      <HomeContent />
    </>
  );
}


/* ---------- Sections ---------- */

const JOURNEY = [
  {
    when: "2024 — Now",
    role: "Founder — Freestand",
    org: "AI-native product studio",
    challenge:
      "Operators drown in customer signals with no coherent way to turn them into decisions.",
    approach:
      "Designed agent workflows that ingest, structure, and reason across product data — then surface an opinionated recommendation.",
    impact: "Cut analyst review time by ~82% and shaped roadmap bets that shipped.",
  },
  {
    when: "2022 — 2024",
    role: "Analytics & Insights",
    org: "P&G",
    challenge:
      "Category teams needed one reliable, decision-oriented read on performance.",
    approach:
      "Built a semantic KPI layer, standardized weekly business review templates, and automated anomaly callouts.",
    impact: "Weekly reviews shifted from data-gathering to decision-making; ad-hoc pulls dropped ~60%.",
  },
  {
    when: "2021 — 2022",
    role: "Strategy & Analytics",
    org: "Sinarmas Cepsa",
    challenge:
      "Commercial leaders needed a joined-up view across sales, ops, and market context.",
    approach:
      "Built a rolling market view combining internal + external signals, framed around 'what would change your mind?'.",
    impact: "Informed pricing and channel decisions and narrowed focus to highest-leverage segments.",
  },
  {
    when: "2020 — 2021",
    role: "Founder — COVIDKhoj",
    org: "Volunteer-led crisis platform",
    challenge:
      "During the second wave, verified medical resources were scattered and stale.",
    approach:
      "Built a lightweight verification pipeline, prioritized freshness and trust over feature depth.",
    impact: "Served 100k+ users at peak; coordinated a distributed volunteer team.",
  },
];

const SKILL_CLUSTERS: {
  name: string;
  color: string;
  items: { name: string; projects: string[] }[];
}[] = [
    {
      name: "Analytics",
      color: "oklch(0.72 0.17 250)",
      items: [
        { name: "Power BI", projects: ["png-analytics", "dashboard-gallery"] },
        { name: "SQL", projects: ["png-analytics", "sinarmas-cepsa", "freestand"] },
        { name: "Excel", projects: ["png-analytics", "sinarmas-cepsa"] },
        { name: "Tableau", projects: ["dashboard-gallery"] },
        { name: "DAX", projects: ["png-analytics", "dashboard-gallery"] },
        { name: "Looker Studio", projects: ["png-analytics"] },
      ],
    },
    {
      name: "AI",
      color: "oklch(0.75 0.19 190)",
      items: [
        { name: "LLMs", projects: ["freestand", "ai-projects"] },
        { name: "Prompt engineering", projects: ["freestand", "ai-projects"] },
        { name: "Agent workflows", projects: ["freestand", "ai-projects"] },
        { name: "OpenAI APIs", projects: ["freestand", "ai-projects"] },
        { name: "Claude", projects: ["freestand", "ai-projects"] },
        { name: "AI automation", projects: ["ai-projects"] },
      ],
    },
    {
      name: "Technical",
      color: "oklch(0.72 0.19 20)",
      items: [
        { name: "Python", projects: ["freestand", "ai-projects"] },
        { name: "Node.js", projects: ["freestand"] },
        { name: "React", projects: ["freestand"] },
        { name: "C++", projects: [] },
        { name: "Bash", projects: ["ai-projects"] },
        { name: "Git", projects: ["freestand", "ai-projects"] },
      ],
    },
    {
      name: "Business",
      color: "oklch(0.78 0.14 90)",
      items: [
        { name: "Product strategy", projects: ["freestand", "covidkhoj"] },
        { name: "Growth", projects: ["covidkhoj"] },
        { name: "Market research", projects: ["sinarmas-cepsa"] },
        { name: "Stakeholder mgmt", projects: ["png-analytics", "sinarmas-cepsa"] },
        { name: "Project management", projects: ["png-analytics", "covidkhoj"] },
      ],
    },
  ];

const AI_WORKFLOWS = [
  {
    title: "Research → LLM → Analysis → Dashboard",
    steps: ["Ingest", "Summarize", "Cluster", "Visualize"],
    note: "Turns messy qualitative input into a live decision view.",
  },
  {
    title: "Customer data → AI insights → Recommendations",
    steps: ["Signals", "Structure", "Reason", "Recommend"],
    note: "Agent pipeline that surfaces what to do next, not just what happened.",
  },
  {
    title: "Prompt design → Automation → Decision support",
    steps: ["Prompt", "Test", "Deploy", "Monitor"],
    note: "Prompts treated as testable functions with human-in-the-loop.",
  },
];

/* ---------- Home ---------- */

function HomeContent() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const recruiter = useRecruiterMode();
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  // Ctrl +K binding
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen">
      <TopNav onOpenPalette={() => setPaletteOpen(true)} recruiter={recruiter} />

      {recruiter.on && <RecruiterPanel />}

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div className="absolute inset-0 opacity-70">
          <NodesBackground />
        </div>
        <div className="container-page relative pt-10 pb-10 md:pt-14 md:pb-14">
          <div className="chip mb-6 animate-fade-in">
            <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
            <span className="text-brand">Dual Specialization:</span>
            Analytics & Operations + Strategy & Organisation
          </div>
          <h1 className="max-w-4xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05]">
            Building products that turn{" "}
            <span className="text-gradient">data into decisions</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-base md:text-lg text-muted-foreground">
            I work at the intersection of analytics, AI, product strategy, and business
            growth — designing systems that move teams <span className="text-brand">from information to action.</span>
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            <a href="#work" className="btn-primary">Explore my work →</a>
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn-ghost">Resume</a>
            <a href="https://www.linkedin.com/in/lakshay-agrawal/" target="_blank" rel="noreferrer" className="btn-ghost">LinkedIn</a>
            <a href="mailto:lakshay.agrawal@u.nus.edu" target="_blank" rel="noreferrer" className="btn-ghost">Email</a>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { k: "Case studies", v: "6" },
              { k: "Years shipping", v: "5+" },
              { k: "Users served", v: "100k+" },
              { k: "AI workflows", v: "15+" },
            ].map((s) => (
              <div key={s.k} className="card-elevated p-4">
                <div className="text-2xl font-semibold">{s.v}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.k}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section id="journey" className="container-page py-12 md:py-16">
        <SectionHeader eyebrow="Career journey" title="From data to decisions to systems." />
        <div className="mt-14 relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />
          <ol className="space-y-14">
            {JOURNEY.map((j, i) => (
              <li key={i} className="relative grid md:grid-cols-2 gap-6 md:gap-12">
                <div className={`md:pr-10 ${i % 2 === 1 ? "md:order-2 md:pl-10 md:pr-0" : ""}`}>
                  <div className="chip mb-3">{j.when}</div>
                  <h3 className="text-xl font-semibold">{j.role}</h3>
                  <div className="text-sm text-muted-foreground mt-1">{j.org}</div>
                </div>
                <div className={`card-elevated p-6 relative ${i % 2 === 1 ? "md:order-1" : ""}`}>
                  {/* <span className="absolute left-0 md:left-auto md:right-full top-6 h-3 w-3 rounded-full bg-brand shadow-[0_0_16px_var(--brand)] -translate-x-[calc(1rem+6px)] md:translate-x-[calc(2.5rem-6px)]" /> */}
                  <Row k="Challenge" v={j.challenge} />
                  <Row k="Approach" v={j.approach} />
                  <Row k="Impact" v={j.impact} last />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section id="work" className="container-page py-24 md:py-32">
        <SectionHeader
          eyebrow="Featured case studies"
          title="Six angles on the same discipline: turn a mess into a decision."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {CASE_STUDIES.map((c, i) => (
            <Link
              key={c.slug}
              to={`/work/${c.slug}`}
              className={`group card-elevated p-6 relative overflow-hidden transition-transform hover:-translate-y-0.5 ${i === 0 ? "md:col-span-2" : ""}`}
            >
              <div
                className="absolute -top-24 -right-24 h-64 w-64 rounded-full opacity-30 blur-3xl group-hover:opacity-50 transition-opacity"
                style={{ background: c.accent }}
              />
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="chip">{c.category}</span>
                <span>·</span>
                <span>{c.tag}</span>
              </div>
              <h3 className="mt-4 text-2xl md:text-3xl font-semibold">{c.title}</h3>
              <p className="mt-3 max-w-2xl text-muted-foreground">{c.summary}</p>
              <div className="mt-6 grid grid-cols-3 gap-4 max-w-md">
                {c.metrics.map((m) => (
                  <div key={m.label}>
                    <div className="text-lg font-semibold">{m.value}</div>
                    <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-0.5">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-1.5">
                {c.tools.map((t) => (
                  <span key={t} className="chip !py-0.5">{t}</span>
                ))}
              </div>
              <div className="mt-6 text-sm text-brand flex items-center gap-1">
                Open case study
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link to="/projects" className="btn-ghost">Open project explorer →</Link>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="container-page py-24 md:py-32">
        <SectionHeader
          eyebrow="Skill map"
          title="Click any skill to see where it's been used."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {SKILL_CLUSTERS.map((cluster) => (
            <div key={cluster.name} className="card-elevated p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="h-2 w-2 rounded-full" style={{ background: cluster.color, boxShadow: `0 0 10px ${cluster.color}` }} />
                <h4 className="font-medium">{cluster.name}</h4>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cluster.items.map((s) => {
                  const active = activeSkill === s.name;
                  return (
                    <button
                      key={s.name}
                      onClick={() => setActiveSkill(active ? null : s.name)}
                      className={`chip transition-all ${active ? "!text-brand !border-brand/40 !bg-brand/10" : "hover:!text-foreground"}`}
                    >
                      {s.name}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {activeSkill && (
          <div className="mt-6 card-elevated p-5 animate-fade-in">
            <div className="text-xs text-muted-foreground mb-3">
              Projects using <span className="text-foreground font-medium">{activeSkill}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {(() => {
                const slugs =
                  SKILL_CLUSTERS.flatMap((c) => c.items).find((s) => s.name === activeSkill)?.projects ?? [];
                if (slugs.length === 0)
                  return <span className="text-sm text-muted-foreground">No public case studies yet — ask me about it.</span>;
                return slugs.map((slug) => {
                  const cs = CASE_STUDIES.find((c) => c.slug === slug);
                  if (!cs) return null;
                  return (
                    <Link
                      key={slug}
                      to={`/work/${slug}`}
                      className="btn-ghost !py-1.5 !text-xs"
                    >
                      {cs.title}
                    </Link>
                  );
                });
              })()}
            </div>
          </div>
        )}
      </section>

      {/* AI SECTION */}
      <section id="ai" className="relative py-24 md:py-32 border-y border-border/60">
        <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />
        <div className="container-page relative">
          <SectionHeader eyebrow="How I use AI" title="AI-native, not AI-adjacent." />
          <p className="mt-4 max-w-2xl text-muted-foreground">
            I don't bolt AI on. I redesign the workflow so the model is a component
            of a system that survives Monday morning.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {AI_WORKFLOWS.map((w) => (
              <div key={w.title} className="card-elevated p-6">
                <div className="text-sm font-medium">{w.title}</div>
                <div className="mt-6 space-y-3">
                  {w.steps.map((s, i) => (
                    <div key={s} className="flex items-center gap-3">
                      <div
                        className="h-8 w-8 shrink-0 rounded-lg flex items-center justify-center text-xs font-mono border border-border"
                        style={{ background: "var(--surface-elevated)" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="text-sm">{s}</div>
                      {i < w.steps.length - 1 && (
                        <div className="flex-1 hairline ml-2" />
                      )}
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-xs text-muted-foreground">{w.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section id="leadership" className="container-page py-24 md:py-32">
        <SectionHeader eyebrow="Founder & leadership" title="Ownership scales further than authority." />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <div className="card-elevated p-6 md:col-span-2">
            <div className="chip mb-4">Founder · COVIDKhoj</div>
            <h3 className="text-2xl font-semibold">Built a crisis-response platform used by 100k+ people.</h3>
            <p className="mt-3 text-muted-foreground">
              During India's second COVID-19 wave, I founded a volunteer-led platform to
              verify and surface medical resources in real time. We built a lightweight
              verification pipeline, coordinated across time zones, and prioritized trust
              over polish.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4 max-w-md">
              <Stat k="Users" v="100k+" />
              <Stat k="Verified leads" v="10k+" />
              <Stat k="Coverage" v="National" />
            </div>
          </div>
          <div className="card-elevated p-6">
            <div className="chip mb-4">Head of Growth</div>
            <h3 className="text-xl font-semibold">Turned ambiguous mandates into repeatable rituals.</h3>
            <p className="mt-3 text-muted-foreground text-sm">
              Small teams, clear priorities, weekly reviews, honest metrics — and a bias
              toward shipping the next real thing.
            </p>
          </div>
          <div className="card-elevated p-6 md:col-span-3">
            <div className="chip mb-3">Founder · Freestand</div>
            <h3 className="text-xl font-semibold">AI-native product studio.</h3>
            <p className="mt-2 text-muted-foreground text-sm max-w-3xl">
              Building AI systems that turn customer signals into product decisions. Full
              stack from prompt design to dashboard UX.
            </p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      {/* <section className="container-page py-24 md:py-32">
        <SectionHeader eyebrow="Testimonials" title="What managers, founders, and professors say." />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card-elevated p-6 relative overflow-hidden">
              <div className="absolute inset-0 animate-shimmer opacity-40 pointer-events-none" />
              <div className="relative">
                <div className="chip mb-4">Placeholder</div>
                <p className="text-muted-foreground italic">
                  "A recommendation from a manager, professor, or founder will live here."
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-surface-elevated border border-border" />
                  <div>
                    <div className="text-sm font-medium">Coming soon</div>
                    <div className="text-xs text-muted-foreground">Role · Company</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* CONTACT */}
      <section id="contact" className="relative py-24 md:py-32 border-t border-border/60 overflow-hidden">
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <NodesBackground />
        </div>
        <div className="container-page relative">
          <SectionHeader eyebrow="Contact" title="Reach me like it's a command line." />
          <p className="mt-4 max-w-xl text-muted-foreground">
            Prefer a keyboard? Press <kbd className="chip font-mono">Ctrl + K</kbd> anywhere on
            the site. Or type below.
          </p>
          <div className="mt-10 mx-auto max-w-xl">
            <button
              onClick={() => setPaletteOpen(true)}
              className="w-full glass rounded-xl px-4 py-3 flex items-center justify-between text-left hover:border-brand/40 transition-colors"
            >
              <span className="flex items-center gap-3 text-sm text-muted-foreground font-mono">
                <span className="text-brand">{'>'}</span>
                type a command…
              </span>
              <span className="chip font-mono">Ctrl + K</span>
            </button>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
              <a href="mailto:lakshay.agrawal@u.nus.edu" target="_blank" rel="noreferrer" className="btn-ghost text-xs">{'>'} email</a>
              <a href="https://www.linkedin.com/in/lakshay-agrawal/" target="_blank" rel="noreferrer" className="btn-ghost text-xs">{'>'} linkedin</a>
              <a href="https://github.com/LA1709" target="_blank" rel="noreferrer" className="btn-ghost text-xs">{'>'} github</a>
              <a href="https://calendar.app.google/efQATa1Rmv3HRdkFA" target="_blank" rel="noreferrer" className="btn-ghost text-xs">{'>'} schedule</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/60">
        <div className="container-page py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} — Built as a product, not a resume.</div>
          <div className="font-mono">Press Ctrl + K anywhere</div>
        </div>
      </footer>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  );
}

/* ---------- Small components ---------- */

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <div className="chip mb-4">{eyebrow}</div>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold max-w-3xl">{title}</h2>
    </div>
  );
}

function Row({ k, v, last }: { k: string; v: string; last?: boolean }) {
  return (
    <div className={`py-3 ${last ? "" : "border-b border-border"}`}>
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{k}</div>
      <div className="mt-1 text-sm">{v}</div>
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="text-2xl font-semibold">{v}</div>
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-0.5">{k}</div>
    </div>
  );
}

function RecruiterPanel() {
  return (
    <div className="sticky top-14 border-b border-brand/30 bg-brand/5 z-30">
      <div className="container-page py-4">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
          <div className="chip !text-brand !border-brand/40">Quick Brief</div>
          <Snippet k="Role fit" v="Analytics · Product · Strategy · AI" />
          <Snippet k="Work auth" v="Open to sponsorship" />
          <Snippet k="Graduation" v="MBA · Jan 2027" />
          <Snippet k="Contact" v="lakshay.agrawal@u.nus.edu" />
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn-ghost !py-1.5 !text-xs ml-auto">Resume →</a>
        </div>
      </div>
    </div>
  );
}

function Snippet({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="uppercase tracking-wider text-[10px] text-muted-foreground">{k}</span>
      <span className="text-foreground">{v}</span>
    </div>
  );
}
