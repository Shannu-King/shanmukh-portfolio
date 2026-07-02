import { useState } from "react";
import { Section, SectionHeading } from "@/components/Section";
import { GlassCard } from "@/components/GlassCard";
import { projects, type Project } from "@/config/portfolio";
import { FiGithub, FiExternalLink, FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

function MockUI({ type, projectTitle }: { type: string; projectTitle: string }) {
  switch (type) {
    case "landing":
      return (
        <div className="w-full max-w-[280px] bg-zinc-900/90 rounded-lg p-3 border border-white/10 shadow-xl flex flex-col gap-3 font-sans select-none pointer-events-none scale-90 sm:scale-100 transition-transform">
          <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
            <span className="text-[9px] font-bold tracking-wider text-[var(--cyan)] uppercase">{projectTitle}</span>
            <div className="flex gap-1.5 text-[8px] text-zinc-500">
              <span>Home</span>
              <span>About</span>
            </div>
          </div>
          <div className="text-center py-2">
            <div className="text-[11px] font-bold leading-tight text-white">
              {projectTitle === "Pecup.in" && "Your academic hub, unified."}
              {projectTitle === "Krida Verse" && "Sports management, digitized."}
              {projectTitle === "SGPA Calculator" && "Fast, private GPA calculation."}
            </div>
            <p className="text-[7px] text-zinc-400 mt-1">Built by builders for students.</p>
          </div>
          <div className="h-6 rounded bg-gradient-to-r from-[var(--primary)] to-[var(--cyan)] flex items-center justify-center text-[9px] font-bold text-background shadow-[0_0_8px_rgba(34,211,238,0.2)]">
            Get Started Free
          </div>
        </div>
      );
    case "dashboard":
      return (
        <div className="w-full max-w-[280px] bg-zinc-900/90 rounded-lg p-3 border border-white/10 shadow-xl flex gap-2 font-sans select-none pointer-events-none scale-90 sm:scale-100 transition-transform">
          <div className="w-6 border-r border-white/5 flex flex-col gap-2 pt-1">
            <div className="h-2 w-full rounded-sm bg-white/10" />
            <div className="h-2 w-full rounded-sm bg-[var(--cyan)]/20" />
            <div className="h-2 w-full rounded-sm bg-white/5" />
            <div className="h-2 w-full rounded-sm bg-white/5" />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex justify-between items-center pb-1 border-b border-white/5">
              <span className="text-[8px] text-zinc-400">Dashboard / Overview</span>
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <div className="bg-white/5 rounded p-1 border border-white/5">
                <span className="text-[6px] text-zinc-500 block">Total Teams</span>
                <span className="text-[10px] font-bold text-white block mt-0.5">
                  {projectTitle === "Pecup.in" ? "540 Users" : projectTitle === "Krida Verse" ? "24 Teams" : "1,200 Hits"}
                </span>
              </div>
              <div className="bg-white/5 rounded p-1 border border-white/5">
                <span className="text-[6px] text-zinc-500 block">Tournaments</span>
                <span className="text-[10px] font-bold text-[var(--cyan)] block mt-0.5">
                  {projectTitle === "Krida Verse" ? "8 Live" : "Optimal"}
                </span>
              </div>
            </div>
            <div className="bg-white/5 rounded p-1.5 border border-white/5 flex flex-col gap-1">
              <span className="text-[6px] text-zinc-400">Live Fixtures</span>
              <div className="flex flex-col gap-1 text-[7px]">
                <div className="flex justify-between items-center bg-white/5 px-1 py-0.5 rounded">
                  <span>CSE Kings</span>
                  <span className="font-bold text-[var(--cyan)]">2 - 1</span>
                  <span className="text-zinc-500">ECE Titans</span>
                </div>
                <div className="flex justify-between items-center bg-white/5 px-1 py-0.5 rounded">
                  <span>Mech Bulls</span>
                  <span className="font-bold text-zinc-500">0 - 0</span>
                  <span className="text-zinc-500">Civil Giants</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
}

function ProjectCard({ p, index }: { p: Project; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.05 }}
    >
      <GlassCard className="!p-0 overflow-hidden">
        <div className="grid lg:grid-cols-[1.25fr_1fr]">
          {/* Visual Showcase (Dashboard Screenshot/Mock) */}
          <div className="relative aspect-[16/10] lg:aspect-auto bg-zinc-950/20 p-6 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-white/5 overflow-hidden">
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
            {p.image ? (
              <img
                src={p.image}
                alt={`${p.title} Dashboard`}
                className="w-full max-h-[300px] object-contain rounded-lg shadow-2xl border border-white/10"
              />
            ) : (
              <MockUI type="dashboard" projectTitle={p.title} />
            )}
          </div>

          {/* Content */}
          <div className="p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs text-[var(--cyan)]">Project · 0{index + 1}</div>
              <h3 className="mt-1.5 font-display text-2xl sm:text-3xl font-bold leading-tight text-white mb-4">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] font-medium text-foreground/85"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2">
              {p.stats.map((st) => (
                <div key={st.label} className="rounded-lg glass px-2 py-2 text-center">
                  <div className="text-sm font-semibold">{st.value}</div>
                  <div className="text-[10px] text-muted-foreground">{st.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              {p.github && (
                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 rounded-lg glass px-3 py-2 text-xs font-medium hover:bg-white/10"
                >
                  <FiGithub /> Code
                </a>
              )}

              {p.demo && (
                p.isMaintenance ? (
                  <span
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 border border-white/10 text-muted-foreground px-3 py-2 text-xs font-semibold cursor-not-allowed select-none"
                    title="This project is currently under maintenance."
                  >
                    🔧 Under Maintenance
                  </span>
                ) : (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-foreground text-background px-3 py-2 text-xs font-semibold hover:bg-foreground/90"
                  >
                    <FiExternalLink /> Live Demo
                  </a>
                )
              )}

              <button
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                className="ml-auto inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground"
              >
                {open ? "Hide details" : "Engineering details"}
                <FiChevronDown className={`transition-transform ${open ? "rotate-180" : ""}`} />
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="overflow-hidden border-t border-white/10"
            >
              <div className="p-6 sm:p-7 grid md:grid-cols-2 gap-6 bg-[color-mix(in_oklab,var(--surface)_40%,transparent)]">
                <Block title="Problem">
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.problem}</p>
                </Block>
                <Block title="Features">
                  <ul className="grid grid-cols-2 gap-1.5 text-sm">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-foreground/85">
                        <span className="h-1 w-1 rounded-full bg-[var(--cyan)]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </Block>
                {p.architecture && (
                  <Block title="Architecture">
                    <div className="font-mono text-xs space-y-1 text-foreground/80">
                      {p.architecture.map((n, i, arr) => (
                        <div key={n}>
                          <div className="rounded-md glass inline-block px-2.5 py-1">{n}</div>
                          {i < arr.length - 1 && <div className="text-muted-foreground pl-3">↓</div>}
                        </div>
                      ))}
                    </div>
                  </Block>
                )}
                <Block title="Challenges">
                  <ul className="space-y-1.5 text-sm">
                    {p.challenges.map((c) => (
                      <li key={c} className="text-muted-foreground leading-relaxed">— {c}</li>
                    ))}
                  </ul>
                </Block>
                <Block title="Key Learnings">
                  <ul className="space-y-1.5 text-sm">
                    {p.learnings.map((l) => (
                      <li key={l} className="text-muted-foreground leading-relaxed">— {l}</li>
                    ))}
                  </ul>
                </Block>
                <Block title="Future Improvements">
                  <ul className="space-y-1.5 text-sm">
                    {p.future.map((f) => (
                      <li key={f} className="text-muted-foreground leading-relaxed">— {f}</li>
                    ))}
                  </ul>
                </Block>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    </motion.div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wider font-mono text-[var(--cyan)]">{title}</div>
      <div className="mt-2">{children}</div>
    </div>
  );
}

export function Projects() {
  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Featured Projects"
        title={<>Built to <span className="gradient-text">solve, not to demo.</span></>}
        subtitle="Each project below tells the full story — the problem, the architecture, the trade-offs, and what I learned from shipping it."
      />
      <div className="mt-12 grid gap-5">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} p={p} index={i} />
        ))}
      </div>
    </Section>
  );
}
