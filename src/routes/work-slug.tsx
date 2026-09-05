import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CASE_STUDIES, findCase } from "@/lib/portfolio";

export default function WorkSlug() {
  const { slug = "" } = useParams();
  const cs = findCase(slug);
  if (!cs) return <NotFoundCase />;
  const others = CASE_STUDIES.filter((c) => c.slug !== cs.slug).slice(0, 3);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{`${cs.title} — Case study`}</title>
        <meta name="description" content={cs.summary} />
        <meta property="og:title" content={`${cs.title} — Case study`} />
        <meta property="og:description" content={cs.summary} />
      </Helmet>

      <div className="border-b border-border/60">
        <div className="container-page py-4 flex items-center justify-between text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">← Back home</Link>
          <span className="font-mono">/work/{cs.slug}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div
          className="absolute -top-40 -right-32 h-[420px] w-[420px] rounded-full opacity-40 blur-3xl"
          style={{ background: cs.accent }}
        />
        <div className="absolute inset-0 grid-bg pointer-events-none opacity-60" />
        <div className="container-page relative py-20 md:py-28">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="chip">{cs.category}</span>
            <span>·</span>
            <span>{cs.tag}</span>
          </div>
          <h1 className="mt-6 text-4xl md:text-6xl font-semibold max-w-4xl leading-[1.05]">
            {cs.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{cs.summary}</p>

          <div className="mt-10 grid grid-cols-3 gap-6 max-w-2xl">
            {cs.metrics.map((m) => (
              <div key={m.label}>
                <div className="text-2xl md:text-3xl font-semibold">{m.value}</div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="container-page py-16 md:py-24 grid gap-12 lg:grid-cols-3">
        <aside className="lg:col-span-1 space-y-6 lg:sticky lg:top-20 self-start">
          <Panel k="Tools">
            <div className="flex flex-wrap gap-1.5">
              {cs.tools.map((t) => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>
          </Panel>
          <Panel k="Category">
            <div className="text-sm">{cs.category}</div>
          </Panel>
          <Panel k="Note on confidentiality">
            <p className="text-xs text-muted-foreground">
              Some artifacts and metrics are sanitized or approximated to respect NDAs.
              Happy to walk through the real thing in an interview.
            </p>
          </Panel>
        </aside>

        <div className="lg:col-span-2 space-y-16">
          <Block title="Problem" body={cs.problem} />
          <BlockList title="Approach" items={cs.approach} />

          <div>
            <BlockHeading title="Architecture" />
            <ArchitectureDiagram accent={cs.accent} />
          </div>

          <div>
            <BlockHeading title="Screenshots" />
            <div className="grid gap-4 sm:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <ScreenshotFrame key={i} n={i} accent={cs.accent} />
              ))}
            </div>
          </div>

          <BlockList title="Impact" items={cs.impact} />
          <BlockList title="Key learnings" items={cs.learnings} />
        </div>
      </section>

      {/* Next */}
      <section className="container-page py-16 border-t border-border/60">
        <div className="flex items-end justify-between mb-8">
          <h3 className="text-2xl font-semibold">More case studies</h3>
          {/* <Link to="/projects" className="btn-ghost !text-xs">Open project explorer →</Link> */}
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {others.map((c) => (
            <Link
              key={c.slug}
              to={`/work/${c.slug}`}
              className="card-elevated p-5 group hover:-translate-y-0.5 transition-transform"
            >
              <div className="chip mb-3">{c.category}</div>
              <div className="text-lg font-semibold">{c.title}</div>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{c.summary}</p>
              <div className="mt-4 text-xs text-brand">Open →</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function NotFoundCase() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="chip mb-4">404</div>
        <h1 className="text-3xl font-semibold">Case study not found</h1>
        <Link to="/" className="btn-primary mt-6">Go home</Link>
      </div>
    </div>
  );
}

function BlockHeading({ title }: { title: string }) {
  return (
    <div className="mb-4">
      <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{title}</div>
      <div className="mt-2 hairline" />
    </div>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <BlockHeading title={title} />
      <p className="text-lg text-foreground/90 leading-relaxed">{body}</p>
    </div>
  );
}

function BlockList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <BlockHeading title={title} />
      <ul className="space-y-3">
        {items.map((it, i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
            <span className="text-foreground/90">{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Panel({ k, children }: { k: string; children: React.ReactNode }) {
  return (
    <div className="card-elevated p-4">
      <div className="text-[11px] uppercase tracking-widest text-muted-foreground mb-2">{k}</div>
      {children}
    </div>
  );
}

function ScreenshotFrame({ n, accent }: { n: number; accent: string }) {
  return (
    <div className="card-elevated overflow-hidden">
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border">
        <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
        <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
        <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
        <span className="ml-2 text-[10px] font-mono text-muted-foreground">view-{n}.png</span>
      </div>
      <div className="relative aspect-video">
        <div className="absolute inset-0" style={{ background: accent, opacity: 0.2 }} />
        <div className="absolute inset-0 grid-bg opacity-70" />
        <div className="absolute inset-4 rounded-lg border border-border/80 bg-surface/60 p-3 flex flex-col gap-2">
          <div className="h-3 w-24 rounded bg-muted" />
          <div className="grid grid-cols-3 gap-2 mt-2">
            <div className="h-14 rounded bg-muted/70" />
            <div className="h-14 rounded bg-muted/70" />
            <div className="h-14 rounded bg-muted/70" />
          </div>
          <div className="mt-2 flex-1 rounded bg-muted/50 relative overflow-hidden">
            <div
              className="absolute inset-x-3 bottom-3 h-16"
              style={{
                background: `linear-gradient(180deg, transparent, ${accent.match(/oklch\([^)]+\)/g)?.[0] ?? "var(--brand)"} 90%)`,
                maskImage:
                  "linear-gradient(to top, black 30%, transparent), radial-gradient(ellipse at bottom, black 60%, transparent)",
                opacity: 0.5,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ArchitectureDiagram({ accent }: { accent: string }) {
  const nodes = [
    { x: 8, y: 50, label: "Source" },
    { x: 32, y: 20, label: "Ingest" },
    { x: 32, y: 80, label: "Validate" },
    { x: 58, y: 50, label: "Reason" },
    { x: 84, y: 30, label: "Decide" },
    { x: 84, y: 70, label: "Act" },
  ];
  const edges: [number, number][] = [
    [0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5],
  ];
  return (
    <div className="card-elevated p-4">
      <svg viewBox="0 0 100 100" className="w-full h-64">
        <defs>
          <linearGradient id="edge" x1="0" x2="1">
            <stop offset="0%" stopColor="oklch(0.72 0.17 250)" />
            <stop offset="100%" stopColor="oklch(0.75 0.19 190)" />
          </linearGradient>
        </defs>
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="url(#edge)"
            strokeWidth="0.5"
            strokeDasharray="1.5 1.5"
            style={{ animation: `dash-flow ${6 + i}s linear infinite` }}
          />
        ))}
        {nodes.map((n) => (
          <g key={n.label}>
            <circle cx={n.x} cy={n.y} r={6} fill="var(--surface-elevated)" stroke="var(--border)" strokeWidth="0.5" />
            <circle cx={n.x} cy={n.y} r={1.5} fill="oklch(0.75 0.19 190)" />
            <text x={n.x} y={n.y + 10} textAnchor="middle" fontSize="3" fill="oklch(0.85 0.02 250)" fontFamily="Inter">
              {n.label}
            </text>
          </g>
        ))}
      </svg>
      <div className="mt-2 text-xs text-muted-foreground text-center">
        Simplified system diagram · illustrative
      </div>
      <div className="hidden" style={{ background: accent }} />
    </div>
  );
}
