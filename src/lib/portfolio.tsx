import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

/* ---------- Data ---------- */

export type CaseStudy = {
  slug: string;
  title: string;
  tag: string;
  category: "Digital Transformation" | "AI" | "Analytics" | "Product" | "Strategy" | "Leadership" | "Marketing";
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
    slug: "keppel-pm",
    title: "Keppel Data Centres",
    tag: "Enterprise · Project Management",
    category: "Digital Transformation",
    summary:
      "Redesigning 30+ project workflows across 14 stakeholders, then translating them into digital solutions using the Power Platform.",
    metrics: [
      { label: "Workflows", value: "30+" },
      { label: "Stakeholders", value: "15" },
      { label: "Incoming Interns", value: "4" },
    ],
    tools: [
      "Power BI",
      "Power Apps",
      "Power Automate",
      "Figma",
      "Workflow Design",
    ],
    problem:
      "Project delivery in data centres is highly operational and involves numerous stakeholders, workflows, and manual processes. Improving transparency requires digitizing these processes without losing sight of how work actually happens on site.",
    approach: [
      "Mapped existing project management workflows across 14 stakeholder groups to understand processes, dependencies, and pain points.",
      "Redesigned workflows before digitizing them, focusing on where technology could improve visibility and reduce manual coordination.",
      "Designed solutions using Power BI, Power Apps, Power Automate, and Figma across 30+ project workflows.",
      "Built structured recruitment and onboarding processes for incoming interns to support continuity of the transformation initiatives.",
    ],
    impact: [
      "Digitizing 30+ project management workflows across 14 stakeholder groups.",
      "Creating greater structure and transparency across project management processes.",
      "Recruited and onboarded 3 incoming interns to support continuity and scale the initiatives.",
    ],
    learnings: [
      "Digital transformation starts with understanding the workflow, not choosing the technology.",
      "The best solution has to work for teams operating in the field, not just look good on a screen.",
      "Transformation only scales when the process can continue without the person who designed it.",
    ],
    accent:
      "linear-gradient(135deg, oklch(0.72 0.17 250), oklch(0.75 0.19 190))",
  },

  {
    slug: "png-analytics",
    title: "Procter & Gamble",
    tag: "Consumer Insights",
    category: "Analytics",
    summary:
      "Translated campaign data and market insights into execution-ready content playbooks for Thailand and Australia.",
    metrics: [
      { label: "Markets", value: "2" },
      { label: "Gaps Identified", value: "6" },
      { label: "New Campaigns", value: "4" },
    ],
    tools: [
      "Creator Strategy",
      "Consumer Insights",
      "Market Research",
      "Content Strategy",
    ],
    problem:
      "Campaign data and market insights only create value when local teams can translate them into concrete execution decisions.",
    approach: [
      "Analyzed campaign performance and market context to identify actionable patterns.",
      "Connected analytical findings with the practical content decisions facing local market teams.",
      "Structured insights into execution-ready content playbooks for Thailand and Australia.",
    ],
    impact: [
      "Converted campaign and market analysis into practical recommendations for two markets.",
      "Created execution-ready playbooks that connected analytical insight with content decisions.",
    ],
    learnings: [
      "Insight is only valuable when someone knows what to do differently because of it.",
      "The same data can lead to different actions depending on the market context.",
    ],
    accent:
      "linear-gradient(135deg, oklch(0.72 0.17 250), oklch(0.72 0.19 20))",
  },

  {
    slug: "sinarmas-cepsa",
    title: "Sinarmas Cepsa",
    tag: "Market Intelligence · Commercial Strategy",
    category: "Analytics",
    summary:
      "Analyzed 100,000+ global oleochemical trade flows alongside operating rates and supply-demand dynamics across 100+ markets.",
    metrics: [
      { label: "Trade Flows", value: "100K+" },
      { label: "Markets", value: "100+" },
      { label: "Scope", value: "Global" },
    ],
    tools: [
      "Data Analysis",
      "Market Intelligence",
      "Trade Data",
      "Supply-Demand Analysis",
    ],
    problem:
      "Understanding a global commodity market requires connecting fragmented trade, production, operating-rate, and supply-demand signals across countries.",
    approach: [
      "Analyzed more than 100,000 global oleochemical trade flows across 100+ markets.",
      "Combined trade patterns with operating rates and broader supply-demand dynamics.",
      "Structured large volumes of market information into a coherent view of global market movements.",
    ],
    impact: [
      "Built a structured view of trade and supply-demand dynamics across 100+ markets.",
      "Converted large-scale market data into decision-oriented market intelligence.",
    ],
    learnings: [
      "Market intelligence comes from connecting signals, not analyzing datasets in isolation.",
      "The useful question is rarely what changed — it is why it changed and what that implies.",
    ],
    accent:
      "linear-gradient(135deg, oklch(0.75 0.19 190), oklch(0.72 0.17 250))",
  },

  {
    slug: "freestand-growth",
    title: "Head of Growth & Partnerships",
    tag: "Growth · Partnerships",
    category: "Strategy",
    summary:
      "Built partnerships, campaign operations, and technology-enabled execution for a B2B SaaS marketplace serving major FMCG brands.",
    metrics: [
      { label: "Revenue", value: "$150K+" },
      { label: "Partnerships", value: "15+" },
      { label: "Campaigns Executed", value: "50+" },
    ],
    tools: [
      "Growth Strategy",
      "Partnerships",
      "Campaign Operations",
      "AI Workflows",
    ],
    problem:
      "Scaling a B2B sampling marketplace required more than building the technology — it needed repeatable commercial partnerships and campaign operations capable of delivering at scale.",
    approach: [
      "Led innovation initiatives and partnerships with e-commerce vendors and enterprise FMCG brands.",
      "Built and supervised a campaign operations team to execute 20+ marketing campaigns.",
      "Developed partnerships for clients including P&G, L'Oréal, Nestlé, and Unilever.",
      "Designed AI-enabled campaign execution and analytics workflows across e-commerce and retail channels.",
    ],
    impact: [
      "Contributed to $150K+ in revenue through innovation initiatives and partnerships.",
      "Secured 15+ vendor and brand partnerships while executing 20+ campaigns.",
      "Supported the distribution of more than 1 million product samples.",
    ],
    learnings: [
      "Building the product and building the business are two different engineering problems.",
      "Operations become a competitive advantage when they are designed to be repeatable.",
      "Technology creates the most leverage when it disappears into the operating model.",
    ],
    accent:
      "linear-gradient(135deg, oklch(0.78 0.14 90), oklch(0.72 0.19 20))",
  },

  {
    slug: "freestand-engineering",
    title: "Founding Engineer",
    tag: "B2B · SaaS · 0 → 1",
    category: "Product",
    summary:
      "Built the tech & data infrastructure and automation layer behind a VC-backed B2B SaaS marketplace for FMCG product sampling.",
    metrics: [
      { label: "Funding", value: "$400K" },
      { label: "Data Pipelines", value: "20+" },
      { label: "Deployments", value: "10+" },
    ],
    tools: [
      "React",
      "Node.js",
      "PostgreSQL",
      "REST APIs",
      "Git",
      "Docker",
      "AWS",
    ],
    problem:
      "Product sampling was operationally fragmented, requiring a technology layer capable of connecting enterprise campaigns, digital media, payments, data, and campaign logistics.",
    approach: [
      "Built the SaaS marketplace platform using React, Node.js, and PostgreSQL.",
      "Developed agentic workflows and external integrations with platforms including Meta Ads and Google Ads.",
      "Automated payment, digital media, and campaign logistics workflows.",
      "Led the data function, establishing 20+ data pipelines and 10+ scalable deployment workflows.",
    ],
    impact: [
      "Built the core technology behind an enterprise B2B SaaS marketplace.",
      "Supported the company in raising $400K in funding.",
      "Created the data and deployment infrastructure required to scale campaign operations.",
    ],
    learnings: [
      "Building from zero forces you to optimize for the problem, not the technology.",
      "Good infrastructure creates options long before the business knows it needs them.",
      "Engineering decisions become business decisions surprisingly quickly in a startup.",
    ],
    accent:
      "linear-gradient(135deg, oklch(0.72 0.19 20), oklch(0.72 0.17 250))",
  },

  {
    slug: "covidkhoj",
    title: "Founder & CEO",
    tag: "Entrepreneur · 0 → 1",
    category: "Leadership",
    summary:
      "Founded a crowdsourced platform during India's COVID-19 crisis to make critical medical resources more accessible.",
    metrics: [
      { label: "People Helped", value: "50K+" },
      { label: "Developers", value: "5" },
      { label: "Model", value: "Volunteer" },
    ],
    tools: [
      "Product",
      "Leadership",
      "Community",
      "Operations",
    ],
    problem:
      "During India's COVID-19 crisis, people needed fast access to critical resources while information was fragmented across communities and online channels.",
    approach: [
      "Founded a crowdsourced database and platform to make COVID-related resources easier to access.",
      "Built and coordinated a volunteer team of 5 software developers.",
      "Mobilized financial and in-kind support through community networks including the Sikh Chamber of Commerce.",
    ],
    impact: [
      "Helped more than 50,000 people access COVID-related resources.",
      "Raised more than $500 in funds and secured $300 in in-kind donations.",
      "Built a volunteer technology team during a rapidly evolving crisis.",
    ],
    learnings: [
      "In a crisis, speed and usefulness matter more than polish.",
      "People will organize around a clear mission even when formal authority does not exist.",
      "Technology can create disproportionate impact when it removes an immediate information bottleneck.",
    ],
    accent:
      "linear-gradient(135deg, oklch(0.72 0.19 20), oklch(0.75 0.19 60))",
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

      {/* {extras.map((n, i) => (
        <circle
          key={`e-${i}`}
          cx={n.x}
          cy={n.y}
          r={2.5}
          fill="oklch(0.75 0.19 190)"
          opacity={0.35}
          style={{ animation: `pulse-node ${3 + (i % 4)}s ease-in-out ${n.d}s infinite` }}
        />
      ))} */}

      {/* {nodes.map((n, i) => (
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
      ))} */}
    </svg>
  );
}

/* ---------- Recruiter Mode ---------- */

export function useRecruiterMode() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    try {
      setOn(localStorage.getItem("recruiter-mode") === "1");
    } catch { }
  }, []);
  const toggle = () => {
    setOn((v) => {
      const next = !v;
      try { localStorage.setItem("recruiter-mode", next ? "1" : "0"); } catch { }
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
    { cmd: "> email", label: "Send an email", hint: "lakshay.agrawal@u.nus.edu", action: () => (window.location.href = "mailto:lakshay.agrawal@u.nus.edu") },
    { cmd: "> linkedin", label: "Open LinkedIn", action: () => window.open("https://www.linkedin.com/in/lakshay-agrawal/", "_blank") },
    { cmd: "> github", label: "Open GitHub", action: () => window.open("https://github.com/LA1709", "_blank") },
    { cmd: "> resume", label: "View resume", action: () => window.open(`${import.meta.env.BASE_URL}resume.pdf`, "_blank") },
    { cmd: "> schedule", label: "Schedule a call", action: () => window.open("https://calendar.app.google/efQATa1Rmv3HRdkFA", "_blank") },
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
          <span className="font-mono text-xs text-muted-foreground">{">"}</span>
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
            className={`chip ${recruiter.on ? "!text-brand !border-brand/40" : ""} cursor-pointer`}
            title="Toggle Recruiter Mode"
          >
            <span className={`h-1.5 w-1.5 rounded-full ${recruiter.on ? "bg-brand" : "bg-muted-foreground"}`} />
            Recruiter mode
          </button>
          <button onClick={onOpenPalette} className="btn-ghost !py-1.5 !text-xs font-mono cursor-pointer">
            Ctrl + K
          </button>
        </div>
      </div>
    </header>
  );
}
