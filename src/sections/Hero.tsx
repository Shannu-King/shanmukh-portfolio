import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiArrowRight } from "react-icons/fi";
import { SiLeetcode, SiCodechef } from "react-icons/si";
import { profile, links } from "@/config/portfolio";
import { trackEvent } from "@/lib/analytics";


const socials = [
  { icon: FiGithub, href: links.github, label: "GitHub" },
  { icon: FiLinkedin, href: links.linkedin, label: "LinkedIn" },
  { icon: FiMail, href: links.email, label: "Email" },
  { icon: SiLeetcode, href: links.leetcode, label: "LeetCode" },
  { icon: SiCodechef, href: links.codechef, label: "CodeChef" },
];

export function Hero() {
  return (
    <section id="home" className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
      {/* Decorative grid */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.18] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,black,transparent)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in oklab, white 10%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, white 10%, transparent) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-muted-foreground">Available for SDE & internship opportunities</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-6 text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
            >
              {profile.name.split(" ")[0]} <span className="gradient-text text-glow">{profile.name.split(" ").slice(1).join(" ")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-5 text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed"
            >
              <span className="text-foreground font-medium">{profile.headline}</span>
              <br />
              {profile.summary}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--cyan)] text-background px-5 py-3 text-sm font-semibold shadow-elegant hover:scale-[1.02] transition-transform"
              >
                View Projects
                <FiArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href={links.resume}
                onClick={() => trackEvent("download_resume", "engagement", "Hero Section")}
                className="inline-flex items-center gap-2 rounded-xl glass-strong px-5 py-3 text-sm font-medium hover:bg-white/10 transition-colors"
              >
                <FiDownload /> Download Resume
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact Me →
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-10 flex items-center gap-3"
            >
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-lg glass text-muted-foreground hover:text-[var(--cyan)] hover:-translate-y-0.5 transition-all"
                >
                  <s.icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Portrait / glass card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative mx-auto w-full max-w-sm"
          >
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-[var(--primary)]/30 via-[var(--cyan)]/20 to-[var(--purple)]/30 blur-2xl" />
            <div className="relative glass-strong rounded-[1.75rem] p-1.5 shadow-elegant">
              <div className="relative aspect-[4/5] rounded-[1.45rem] overflow-hidden bg-gradient-to-br from-[var(--surface-elevated)] to-[var(--surface)] grid place-items-center">
                <div className="text-center px-6">
                  <div className="mx-auto h-32 w-32 rounded-full bg-gradient-to-br from-[var(--primary)] via-[var(--cyan)] to-[var(--purple)] p-[2px]">
                    <div className="h-full w-full rounded-full bg-[var(--surface)] grid place-items-center text-4xl font-display font-bold">
                      ST
                    </div>
                  </div>
                  <div className="mt-6 text-sm text-muted-foreground">Final Year · CSE</div>
                  <div className="mt-1 font-display text-lg font-semibold">{profile.university}</div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2 text-center text-xs">
                  {[
                    ["500+", "Solved"],
                    ["Knight", "Badge"],
                    ["Top 6%", "Rank"],
                  ].map(([v, l]) => (
                    <div key={l} className="glass rounded-lg px-2 py-2">
                      <div className="font-semibold text-foreground">{v}</div>
                      <div className="text-[10px] text-muted-foreground">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
