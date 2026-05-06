import { ArrowRight } from "lucide-react";

export function Hero({
  staticLinks,
}: {
  staticLinks: Record<string, string>;
}) {
  return (
    <section className="relative px-6 pt-28 pb-12 md:pt-32">
      <div className="mx-auto grid max-w-7xl auto-rows-[minmax(140px,auto)] grid-cols-1 gap-3 md:grid-cols-4">
        {/* [04] Manifesto */}
        <div className="rounded-2xl border border-border bg-card p-8 md:col-start-1 md:col-end-4 md:row-start-1 md:row-end-3 md:p-12">
          <h1 className="text-balance text-4xl font-black leading-[0.95] tracking-tight text-foreground md:text-6xl lg:text-7xl">
            I build digital products{" "}
            <span className="text-accent">that ship.</span>
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Software engineer. 7+ years shipping production code. Full-stack
            with a bias for clarity over cleverness.
          </p>
          <p className="mt-6 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            [ value for biz · simple for users ]
          </p>
        </div>

        {/* [05] Photo placeholder — TODO: foto real + glitch animation Sprint 2 */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-secondary md:col-start-4 md:row-start-1 md:row-end-5">
          <div className="flex aspect-[3/4] items-center justify-center md:aspect-auto md:h-full">
            <div className="flex flex-col items-center gap-3 px-4 text-center">
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-muted">
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  photo
                </span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                [ placeholder · sprint 1 ]
              </span>
            </div>
          </div>
        </div>

        {/* [06] Status pill */}
        <div className="rounded-2xl border border-border bg-card p-5 md:col-start-1 md:row-start-3">
          <div className="mb-3 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Open to
            </span>
          </div>
          <ul className="space-y-1 text-sm font-semibold text-foreground">
            <li>Full-time roles</li>
            <li>Freelance projects</li>
          </ul>
          <p className="mt-3 font-mono text-[10px] text-muted-foreground">
            [ upd. 2026-05 ]
          </p>
        </div>

        {/* [07] Stack chips */}
        <div className="rounded-2xl border border-border bg-card p-5 md:col-start-2 md:col-end-4 md:row-start-3">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "Go",
              "TypeScript",
              "React",
              "Next.js",
              "Node",
              "Postgres",
              "AWS",
              "Docker",
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* [08] Featured project (Antojo) */}
        <div className="rounded-2xl border border-border bg-card p-5 md:col-start-1 md:row-start-4">
          <div className="mb-3 flex aspect-video items-center justify-center rounded-lg bg-secondary">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              [ screenshot ]
            </span>
          </div>
          <h3 className="text-lg font-bold text-foreground">Antojo</h3>
          <p className="mb-3 text-sm text-muted-foreground">
            Group decisions, faster.
          </p>
          <div className="flex gap-3 font-mono text-xs text-muted-foreground">
            <span>[ live ]</span>
            <span>[ source ]</span>
          </div>
        </div>

        {/* [10] CTA dual — focal point en forest green */}
        <div className="flex flex-col justify-center gap-3 rounded-2xl bg-primary p-6 text-primary-foreground md:col-start-2 md:col-end-4 md:row-start-4">
          <a
            href={staticLinks.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between rounded-xl bg-accent px-6 py-4 text-base font-bold text-accent-foreground transition hover:bg-accent/90"
          >
            <span>Hire me · Full-time</span>
            <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            className="group flex items-center justify-between rounded-xl border-2 border-primary-foreground/30 px-6 py-4 text-base font-bold text-primary-foreground transition hover:border-primary-foreground hover:bg-primary-foreground/10"
          >
            <span>Hablemos · Proyecto</span>
            <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
          </a>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-primary-foreground/70">
            linkedin · email · cal
          </p>
        </div>
      </div>
    </section>
  );
}
