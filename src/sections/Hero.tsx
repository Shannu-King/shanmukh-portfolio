import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiArrowRight } from "react-icons/fi";
import { SiLeetcode, SiCodechef } from "react-icons/si";
import { profile, links } from "@/config/portfolio";
import { useState, useEffect } from "react";

const socials = [
  { icon: FiGithub, href: links.github, label: "GitHub" },
  { icon: FiLinkedin, href: links.linkedin, label: "LinkedIn" },
  { icon: FiMail, href: links.email, label: "Email" },
  { icon: SiLeetcode, href: links.leetcode, label: "LeetCode" },
  { icon: SiCodechef, href: links.codechef, label: "CodeChef" },
];

const roles = [
  "Full Stack Developer",
  "Competitive Programmer",
  "Knight @ LeetCode",
  "Problem Solver",
  "Campus Mantri @ GFG",
];

function RotatingRoles() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="inline-block h-[1.3em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          initial={{ y: 30, opacity: 0, rotateX: -80 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          exit={{ y: -30, opacity: 0, rotateX: 80 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block gradient-text text-glow"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

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

            {/* Title & Stats */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4"
            >
              <div className="text-xl sm:text-2xl font-display font-semibold tracking-tight gradient-text text-glow">
                Full Stack Developer & Competitive Programmer
              </div>
              <div className="mt-2 text-sm sm:text-base font-medium text-[var(--cyan)]">
                React • Node.js • Java • C++ • MySQL
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-5 text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed"
            >
              {profile.summary}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--cyan)] text-background px-6 py-3.5 text-base font-semibold shadow-elegant hover:scale-[1.02] transition-transform"
              >
                View Projects
                <FiArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href={links.resume}
                download
                className="inline-flex items-center gap-2 rounded-xl glass shadow-elegant px-6 py-3.5 text-base font-medium hover:bg-white/10 transition-colors"
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

            {/* Quick Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {[
                { value: "600+", label: "Problems" },
                { value: "1853", label: "LeetCode Rating" },
                { value: "Top 6%", label: "Global" },
                { value: "9.15", label: "CGPA" }
              ].map(stat => (
                <div key={stat.label} className="flex flex-col">
                  <span className="font-display text-xl font-bold text-foreground">{stat.value}</span>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Portrait / circle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative mx-auto flex flex-col items-center gap-6"
          >
            {/* Glow behind circle */}
            <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-[var(--primary)]/30 via-[var(--cyan)]/20 to-[var(--purple)]/30 blur-3xl" />

            {/* Gradient border ring + image */}
            <div className="relative h-56 w-56 sm:h-64 sm:w-64 lg:h-72 lg:w-72 rounded-full bg-gradient-to-br from-[var(--primary)] via-[var(--cyan)] to-[var(--purple)] p-[3px] shadow-elegant">
              <div className="h-full w-full rounded-full overflow-hidden">
                <img
                  src="/profile.jpg"
                  alt={profile.name}
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </div>

            {/* Info below circle */}
            <div className="relative text-center space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full glass-strong px-4 py-1.5 text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
                  <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Final Year · CSE
              </div>
              <div className="font-display text-xl font-bold gradient-text text-glow">{profile.university}</div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
