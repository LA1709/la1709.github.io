import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

/* ---------- Data ---------- */

export type CaseStudy = {
  slug: string;
  title: string;
  tag: string;
  category: "AI" | "Analytics" | "Product" | "Strategy" | "Leadership" | "Marketing";
  summary: string;
  metrics: { label: string; value: string }[];
  tools: string[];
  problem: string;
  approach: string[];
  impact: string[];
  learnings: string[];
  accent: string; // gradient string
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "freestand",
    title: "Freestand",
    tag: "Flagship · AI + Product",
    category: "AI",
    summary:
      "An AI-native product that turns customer signals into decisions — combining LLM workflows, structured data, and opinionated UX.",
    metrics: [
      { label: "Time-to-insight", value: "−82%" },
      { label: "Weekly active users", value: "3.4k" },
      { label: "Agent workflows", value: "12" },
    ],
    tools: ["OpenAI", "Claude", "Node.js", "Python", "Postgres", "Vercel"],
    problem:
      "Operators drown in customer signals — tickets, calls, reviews, product analytics — with no coherent way to turn them into decisions.",
    approach: [
      "Designed an agent workflow: ingestion → structuring → reasoning → recommendation.",
      "Prompt-engineered a taxonomy layer so LLM outputs stay auditable and comparable across weeks.",
      "Shipped an opinionated dashboard: fewer charts, more decisions.",
      "Built a feedback loop so PMs could grade AI outputs and improve the system.",
    ],
    impact: [
      "Cut analyst review time from 6 hours to under 1 per week.",
      "Surfaced 3 product bets that shipped to roadmap.",
      "Became the source of truth for weekly ops reviews.",
    ],
    learnings: [
      "AI wins when the surrounding product does the boring work well.",
      "Structure beats cleverness — a stable taxonomy compounds.",
      "Design for the moment a human overrides the model.",
    ],
    accent: "linear-gradient(135deg, oklch(0.72 0.17 250), oklch(0.75 0.19 190))",
  },
  {
    slug: "png-analytics",
    title: "P&G Analytics & Insights",
    tag: "Analytics · Decision Support",
    category: "Analytics",
    summary:
      "Built KPI monitoring and analytics workflows that shaped commercial decisions across categories.",
    metrics: [
      { label: "Dashboards shipped", value: "20+" },
      { label: "Decision cadence", value: "Weekly" },
      { label: "Stakeholders", value: "Cross-functional" },
    ],
    tools: ["Power BI", "SQL", "DAX", "Excel", "Looker Studio"],
    problem:
      "Category teams needed a single, reliable read on performance — without waiting for one-off pulls.",
    approach: [
      "Modeled a semantic layer for commercial KPIs so every dashboard told the same story.",
      "Standardized weekly business review templates around 5 questions, not 50 charts.",
      "Automated anomaly callouts so leaders opened dashboards already knowing where to look.",
    ],
    impact: [
      "Weekly reviews moved from data-gathering to decision-making.",
      "Reduced ad-hoc pull requests by ~60%.",
      "Enabled category leaders to act on trends within days, not weeks.",
    ],
    learnings: [
      "The best dashboards remove work, not add polish.",
      "A shared vocabulary is worth more than another visualization.",
    ],
    accent: "linear-gradient(135deg, oklch(0.72 0.17 250), oklch(0.72 0.19 20))",
  },
  {
    slug: "covidkhoj",
    title: "COVIDKhoj",
    tag: "Founder · 0→1",
    category: "Leadership",
    summary:
      "Founded a crisis-response platform during COVID-19 that helped thousands find verified medical resources when they needed them most.",
    metrics: [
      { label: "Users served", value: "100k+" },
      { label: "Verified leads", value: "10k+" },
      { label: "Team", value: "Volunteer-led" },
    ],
    tools: ["Product", "Growth", "Ops", "Community"],
    problem:
      "During the second wave, verified medical resources were scattered across WhatsApp, Twitter, and spreadsheets. People were making life-or-death decisions on stale data.",
    approach: [
      "Built a lightweight verification pipeline with a distributed volunteer team.",
      "Prioritized speed and trust over feature depth — freshness was the product.",
      "Designed for the worst-case user: low-bandwidth, high-stress, one shot.",
    ],
    impact: [
      "Served 100k+ users in the peak weeks.",
      "Coordinated a volunteer team across time zones.",
      "Featured in national media as a trusted resource.",
    ],
    learnings: [
      "In a crisis, trust is the moat.",
      "Ownership scales further than authority.",
    ],
    accent: "linear-gradient(135deg, oklch(0.72 0.19 20), oklch(0.75 0.19 60))",
  },
  {
    slug: "sinarmas-cepsa",
    title: "Sinarmas Cepsa",
    tag: "Strategy · Analytics",
    category: "Strategy",
    summary:
      "Partnered with commercial leaders on market analysis and operational insight for a joint-venture business.",
    metrics: [
      { label: "Markets covered", value: "SEA" },
      { label: "Reviews", value: "Monthly" },
      { label: "Scope", value: "Commercial + Ops" },
    ],
    tools: ["Excel", "SQL", "Market research", "Frameworks"],
    problem:
      "Leaders needed a joined-up view across sales, ops, and market context to plan quarterly moves.",
    approach: [
      "Built a rolling market view combining internal and external signals.",
      "Framed decisions around 'what would change your mind' rather than reporting.",
    ],
    impact: [
      "Informed pricing and channel decisions in monthly reviews.",
      "Helped commercial team narrow focus to highest-leverage segments.",
    ],
    learnings: [
      "Analysis is only useful if the decision-maker can act on it this week.",
    ],
    accent: "linear-gradient(135deg, oklch(0.75 0.19 190), oklch(0.72 0.17 250))",
  },
  {
    slug: "dashboard-gallery",
    title: "Analytics Dashboard Gallery",
    tag: "Craft · Visualization",
    category: "Analytics",
    summary:
      "A curated set of dashboarding work across Power BI, Tableau-style layouts, and Excel — sanitized for public sharing.",
    metrics: [
      { label: "Dashboards", value: "20+" },
      { label: "Tools", value: "Power BI · Tableau · Excel" },
      { label: "Domains", value: "CPG · Ops · Growth" },
    ],
    tools: ["Power BI", "Tableau", "Excel", "DAX", "SQL"],
    problem:
      "Most dashboards fail because they answer no specific question. This collection is built around the opposite premise.",
    approach: [
      "Every view opens on a headline number and a 'why'.",
      "Drilldowns follow the analyst's actual reasoning path.",
      "Color, spacing, and hierarchy do the heavy lifting — not novelty.",
    ],
    impact: [
      "Replaced weekly recurring meetings with self-serve reads.",
      "Cut chart count per dashboard by ~40% while raising engagement.",
    ],
    learnings: [
      "A dashboard is a product. Treat it like one.",
    ],
    accent: "linear-gradient(135deg, oklch(0.72 0.17 250), oklch(0.75 0.19 190))",
  },
  {
    slug: "ai-projects",
    title: "AI Experiments & Automations",
    tag: "AI · Workflows",
    category: "AI",
    summary:
      "A collection of LLM applications, prompt-engineering patterns, and automation workflows built to remove real friction from real workflows.",
    metrics: [
      { label: "Workflows shipped", value: "15+" },
      { label: "Hours saved / wk", value: "20+" },
      { label: "Stack", value: "OpenAI · Claude · n8n" },
    ],
    tools: ["OpenAI", "Claude", "Prompt eng.", "n8n", "Python"],
    problem:
      "Most 'AI use cases' are demos. The interesting work is wiring AI into a workflow that survives Monday morning.",
    approach: [
      "Start from the workflow, not the model.",
      "Design prompts as small, testable functions.",
      "Add a human-in-the-loop wherever the cost of a mistake is asymmetric.",
    ],
    impact: [
      "Automated recurring research, reporting, and triage flows.",
      "Made AI outputs auditable so teams could actually trust them.",
    ],
    learnings: [
      "Being 'AI-native' means changing the workflow, not bolting on a chatbot.",
    ],
    accent: "linear-gradient(135deg, oklch(0.72 0.19 20), oklch(0.72 0.17 250))",
  },
];

export const findCase = (slug: string) => CASE_STUDIES.find((c) => c.slug === slug);

/* ---------- Nodes background ---------- */

export function NodesBackground() {
  // deterministic pseudo-random positions
  const nodes = useMemo(() => {
    const groups = [
      { label: "Data", x: 8, y: 30 },
      { label: "Insights", x: 34, y: 62 },
      { label: "Decisions", x: 64, y: 30 },
      { label: "Impact", x: 92, y: 62 },
    ];
    return groups;
  }, []);

  const extras = useMemo(
    () =>
      Array.from({ length: 22 }).map((_, i) => {
        const seed = (i * 9301 + 49297) % 233280;
        const rand = seed / 233280;
        const rand2 = ((i + 3) * 9301 + 49297) % 233280 / 233280;
        return { x: 4 + rand * 92, y: 8 + rand2 * 80, d: (i % 5) * 0.4 };
      }),
    [],
  );

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 100 80"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="line" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="oklch(0.72 0.17 250)" stopOpacity="0" />
          <stop offset="50%" stopColor="oklch(0.75 0.19 190)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="oklch(0.72 0.19 20)" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="glow">
          <stop offset="0%" stopColor="oklch(0.75 0.19 190)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="oklch(0.75 0.19 190)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* main flow */}
      {nodes.slice(0, -1).map((n, i) => {
        const next = nodes[i + 1];
        return (
          <path
            key={`p-${i}`}
            d={`M ${n.x} ${n.y} C ${(n.x + next.x) / 2} ${n.y}, ${(n.x + next.x) / 2} ${next.y}, ${next.x} ${next.y}`}
            stroke="url(#line)"
            strokeWidth="0.25"
            fill="none"
            strokeDasharray="2 3"
            style={{ animation: `dash-flow ${8 + i * 2}s linear infinite` }}
          />
        );
      })}

      {extras.map((n, i) => (
        <circle
          key={`e-${i}`}
          cx={n.x}
          cy={n.y}
          r={2.5}
          fill="oklch(0.75 0.19 190)"
          opacity={0.35}
          style={{ animation: `pulse-node ${3 + (i % 4)}s ease-in-out ${n.d}s infinite` }}
        />
      ))}

      {nodes.map((n, i) => (
        <g key={n.label}>
          <circle cx={n.x} cy={n.y} r={4} fill="url(#glow)" />
          <circle cx={n.x} cy={n.y} r={1.6} fill="oklch(0.98 0.01 250)" />
          <text
            x={n.x}
            y={n.y - 3}
            textAnchor="middle"
            fill="oklch(0.85 0.02 250)"
            fontSize="2.2"
            fontFamily="Inter, sans-serif"
            style={{ letterSpacing: "0.05em" }}
          >
            {n.label.toUpperCase()}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ---------- Recruiter Mode ---------- */

export function useRecruiterMode() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    try {
      setOn(localStorage.getItem("recruiter-mode") === "1");
    } catch {}
  }, []);
  const toggle = () => {
    setOn((v) => {
      const next = !v;
      try { localStorage.setItem("recruiter-mode", next ? "1" : "0"); } catch {}
      return next;
    });
  };
  return { on, toggle };
}

/* ---------- Command Palette ---------- */

type CmdItem = { cmd: string; label: string; action: () => void; hint?: string };

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [open]);

  const items: CmdItem[] = [
    { cmd: "> email", label: "Send an email", hint: "hello@example.com", action: () => (window.location.href = "mailto:hello@example.com") },
    { cmd: "> linkedin", label: "Open LinkedIn", action: () => window.open("https://linkedin.com", "_blank") },
    { cmd: "> github", label: "Open GitHub", action: () => window.open("https://github.com", "_blank") },
    { cmd: "> resume", label: "View resume", action: () => window.open("/resume.pdf", "_blank") },
    { cmd: "> schedule", label: "Schedule a call", action: () => window.open("https://cal.com", "_blank") },
    { cmd: "> work", label: "Explore case studies", action: () => { window.location.hash = "#work"; onClose(); } },
    { cmd: "> ai", label: "How I use AI", action: () => { window.location.hash = "#ai"; onClose(); } },
    { cmd: "> journey", label: "Career journey", action: () => { window.location.hash = "#journey"; onClose(); } },
  ];

  const filtered = items.filter((i) =>
    (i.cmd + " " + i.label).toLowerCase().includes(q.toLowerCase()),
  );

  useEffect(() => { setActive(0); }, [q]);

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => (filtered.length ? (a + 1) % filtered.length : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => (filtered.length ? (a - 1 + filtered.length) % filtered.length : 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const it = filtered[active];
        if (it) { it.action(); onClose(); }
      }
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, filtered, active]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm p-4 pt-24 animate-fade-in" onClick={onClose}>
      <div
        className="glass w-full max-w-xl rounded-xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <span className="font-mono text-xs text-muted-foreground">⌘</span>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Type a command…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground font-mono"
          />
          <kbd className="chip font-mono">esc</kbd>
        </div>
        <ul ref={listRef} className="max-h-80 overflow-auto py-2">
          {filtered.length === 0 && (
            <li className="px-4 py-6 text-center text-sm text-muted-foreground">No matches.</li>
          )}
          {filtered.map((it, idx) => (
            <li key={it.cmd}>
              <button
                data-idx={idx}
                onMouseEnter={() => setActive(idx)}
                onClick={() => { it.action(); onClose(); }}
                className={`flex w-full items-center justify-between gap-4 px-4 py-2.5 text-left transition-colors ${idx === active ? "bg-accent/60" : "hover:bg-accent/40"}`}
              >
                <span className="flex items-center gap-3">
                  <span className="font-mono text-xs text-brand">{it.cmd}</span>
                  <span className="text-sm">{it.label}</span>
                </span>
                {it.hint && <span className="text-xs text-muted-foreground font-mono">{it.hint}</span>}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------- Nav ---------- */

export function TopNav({
  onOpenPalette,
  recruiter,
}: {
  onOpenPalette: () => void;
  recruiter: { on: boolean; toggle: () => void };
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 glass">
      <div className="container-page flex h-14 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="inline-block h-2 w-2 rounded-full bg-brand shadow-[0_0_12px_var(--brand)]" />
          <span>Portfolio<span className="text-muted-foreground">.</span></span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#journey" className="hover:text-foreground transition-colors">Journey</a>
          <a href="#work" className="hover:text-foreground transition-colors">Work</a>
          <a href="#skills" className="hover:text-foreground transition-colors">Skills</a>
          <a href="#ai" className="hover:text-foreground transition-colors">AI</a>
          <a href="#leadership" className="hover:text-foreground transition-colors">Leadership</a>
          <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={recruiter.toggle}
            className={`chip ${recruiter.on ? "!text-brand !border-brand/40" : ""}`}
            title="Toggle Recruiter Mode"
          >
            <span className={`h-1.5 w-1.5 rounded-full ${recruiter.on ? "bg-brand" : "bg-muted-foreground"}`} />
            Recruiter mode
          </button>
          <button onClick={onOpenPalette} className="btn-ghost !py-1.5 !text-xs font-mono">
            ⌘ K
          </button>
        </div>
      </div>
    </header>
  );
}
