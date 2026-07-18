import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useMemo, useState } from "react";
import { CASE_STUDIES } from "@/lib/portfolio";

const CATEGORIES = ["All", "Analytics", "AI", "Product", "Strategy", "Marketing", "Leadership"] as const;

export default function ProjectExplorer() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");


  const filtered = useMemo(
    () =>
      CASE_STUDIES.filter((c) => (cat === "All" ? true : c.category === cat)).filter(
        (c) =>
          (c.title + c.summary + c.tools.join(" ") + c.tag)
            .toLowerCase()
            .includes(q.toLowerCase()),
      ),
    [q, cat],
  );

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Project explorer — Portfolio</title>
        <meta name="description" content="Filterable, searchable index of case studies across analytics, AI, product, and strategy." />
      </Helmet>
      <div className="border-b border-border/60">
        <div className="container-page py-4 flex items-center justify-between text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">← Back home</Link>
          <span className="font-mono">/projects</span>
        </div>
      </div>

      <section className="container-page py-16 md:py-24">
        <div className="chip mb-4">Project explorer</div>
        <h1 className="text-4xl md:text-5xl font-semibold max-w-2xl">
          Find the work most relevant to your role.
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Filter by domain or search by tool. Everything links to a full case study.
        </p>

        <div className="mt-10 flex flex-col md:flex-row gap-3 md:items-center">
          <div className="glass rounded-lg px-4 py-2.5 flex items-center gap-3 flex-1">
            <span className="text-brand font-mono text-xs">{'>'}</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search title, tool, or tag…"
              className="flex-1 bg-transparent outline-none text-sm font-mono placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`chip cursor-pointer ${cat === c ? "!text-brand !border-brand/40 !bg-brand/10" : "hover:!text-foreground"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {filtered.map((c) => (
            <Link
              key={c.slug}
              to={`/work/${c.slug}`}
              className="card-elevated p-5 group hover:-translate-y-0.5 transition-transform relative overflow-hidden"
            >
              <div
                className="absolute -top-16 -right-16 h-48 w-48 rounded-full opacity-20 blur-3xl group-hover:opacity-40 transition-opacity"
                style={{ background: c.accent }}
              />
              <div className="flex items-center gap-2">
                <span className="chip">{c.category}</span>
                <span className="text-xs text-muted-foreground">{c.tag}</span>
              </div>
              <div className="mt-3 text-xl font-semibold">{c.title}</div>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{c.summary}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {c.tools.slice(0, 5).map((t) => (
                  <span key={t} className="chip !py-0.5">{t}</span>
                ))}
              </div>
              <div className="mt-4 text-xs text-brand">Open →</div>
            </Link>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center text-sm text-muted-foreground py-16">
              Nothing matches — try a different filter.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
