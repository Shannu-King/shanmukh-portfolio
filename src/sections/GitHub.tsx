import { Section, SectionHeading } from "@/components/Section";
import { GlassCard } from "@/components/GlassCard";
import { FiGithub, FiStar, FiGitBranch, FiExternalLink } from "react-icons/fi";
import { links, projects } from "@/config/portfolio";

export function GitHub() {
  return (
    <Section id="github">
      <SectionHeading
        eyebrow="GitHub"
        title={<>Code that <span className="gradient-text">ships in public.</span></>}
        subtitle="A snapshot of my GitHub presence. Repositories below mirror the projects above."
      />

      <div className="mt-12 grid lg:grid-cols-[1fr_1.4fr] gap-6">
        <GlassCard>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl glass">
                <FiGithub className="h-5 w-5" />
              </div>
              <div>
                <div className="font-display font-semibold">@Shannu-King</div>
                <div className="text-xs text-muted-foreground">GitHub Statistics</div>
              </div>
            </div>
            <a
              href={links.github}
              target="_blank"
              rel="noreferrer noopener"
              className="text-xs font-medium text-[var(--cyan)] hover:underline inline-flex items-center gap-1"
            >
              Visit <FiExternalLink />
            </a>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2">
            {[
              ["Repos", "40+"],
              ["Stars", "12+"],
              ["Followers", "Growing"],
            ].map(([l, v]) => (
              <div key={l} className="rounded-lg glass p-3 text-center">
                <div className="font-semibold">{v}</div>
                <div className="text-[10px] text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>

          {/* Heatmap */}
          <div className="mt-6">
            <div className="text-xs text-muted-foreground mb-2">Contribution activity</div>
            <div className="grid grid-cols-[repeat(26,minmax(0,1fr))] gap-1">
              {Array.from({ length: 26 * 7 }).map((_, i) => {
                const intensity = (Math.sin(i * 1.3) + 1) / 2;
                const a = 0.08 + intensity * 0.6;
                return (
                  <div
                    key={i}
                    className="aspect-square rounded-[2px]"
                    style={{ background: `color-mix(in oklab, var(--primary) ${a * 100}%, transparent)` }}
                  />
                );
              })}
            </div>
            <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
              <span>Less</span>
              <div className="flex gap-1">
                {[0.1, 0.25, 0.45, 0.65, 0.85].map((a) => (
                  <span
                    key={a}
                    className="h-2 w-2 rounded-[2px]"
                    style={{ background: `color-mix(in oklab, var(--primary) ${a * 100}%, transparent)` }}
                  />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>
        </GlassCard>

        <div className="grid sm:grid-cols-2 gap-4">
          {projects.map((p) => (
            <GlassCard key={p.title} interactive>
              <div className="flex items-center gap-2">
                <FiGithub className="text-muted-foreground" />
                <span className="font-mono text-sm font-medium">{p.title.toLowerCase().replace(/\s+/g, "-")}</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-3">{p.description}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-[var(--cyan)]" /> {p.stack[0]}
                  </span>
                  <span className="flex items-center gap-1"><FiStar className="h-3 w-3" /> —</span>
                  <span className="flex items-center gap-1"><FiGitBranch className="h-3 w-3" /> —</span>
                </div>
                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[var(--cyan)] hover:underline"
                >
                  View →
                </a>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </Section>
  );
}
