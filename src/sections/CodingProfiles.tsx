import { Section, SectionHeading } from "@/components/Section";
import { GlassCard } from "@/components/GlassCard";
import { dsaTopics, links } from "@/config/portfolio";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import { SiLeetcode, SiCodechef } from "react-icons/si";

function Bar({ topic, count }: { topic: string; count: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  
  // Calculate percentage relative to a target of 150 problems
  const target = 150;
  const percentage = Math.min((count / target) * 100, 100);

  return (
    <div ref={ref} className="group/bar space-y-1.5">
      <div className="flex items-center justify-between text-xs transition-colors duration-300">
        <span className="font-semibold text-zinc-300 group-hover/bar:text-white transition-colors">{topic}</span>
        <span className="text-zinc-500 font-mono transition-colors">
          <span className="text-white font-bold group-hover/bar:text-[var(--cyan)] transition-colors">{count}</span> Solved
        </span>
      </div>
      <div className="h-[5px] rounded-full bg-white/5 overflow-hidden transition-colors duration-300">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] via-[var(--cyan)] to-[var(--purple)] group-hover/bar:shadow-[0_0_8px_rgba(34,211,238,0.6)] transition-shadow duration-300"
        />
      </div>
    </div>
  );
}

function Counter({ to }: { to: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1200;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.floor(p * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  
  return <span ref={ref}>{n}</span>;
}

export function CodingProfiles() {
  return (
    <Section id="coding">
      <SectionHeading
        eyebrow="Problem Solving"
        title={<>Competitive Programming <span className="gradient-text">Journey.</span></>}
        subtitle={
          <>
            Daily problem solving is how I keep my algorithmic fundamentals sharp. Currently tracking{" "}
            <span className="text-white font-semibold">600+ LeetCode problems</span>,{" "}
            <span className="text-white font-semibold">50+ CodeChef contests</span>, and{" "}
            <span className="text-white font-semibold">10 core DSA topics</span>.
          </>
        }
      />

      <div className="mt-12 grid lg:grid-cols-[1.2fr_1fr] gap-8 items-start">
        {/* Profiles */}
        <div className="grid sm:grid-cols-2 gap-6">
          {/* LeetCode Card */}
          <GlassCard interactive className="flex flex-col justify-between p-6 group hover:border-[var(--cyan)]/45 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)] transition-all duration-500">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SiLeetcode className="h-6 w-6 text-[#FFA116] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
                  <span className="font-display text-lg font-bold text-white">LeetCode</span>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-1 text-[10px] font-bold text-[#FFA116] uppercase tracking-wider">
                  Knight
                </span>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-white/5 border border-white/5 p-3 group-hover:border-white/10 transition-colors">
                  <div className="font-display text-xl font-bold text-white">
                    <Counter to={1853} />
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Max Rating</div>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/5 p-3 group-hover:border-white/10 transition-colors">
                  <div className="font-display text-xl font-bold text-white">
                    <Counter to={600} />+
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Problems Solved</div>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/5 p-3 group-hover:border-white/10 transition-colors">
                  <div className="font-display text-xl font-bold text-[var(--cyan)]">
                    Top 6%
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Global Ranking</div>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/5 p-3 group-hover:border-white/10 transition-colors">
                  <div className="font-display text-xl font-bold text-[var(--purple)]">
                    C++
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Primary Language</div>
                </div>
              </div>
            </div>

            <a
              href={links.leetcode}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#FFA116]/5 border border-[#FFA116]/30 px-4 py-2.5 text-xs font-semibold text-[#FFA116] hover:bg-[#FFA116] hover:text-background hover:border-[#FFA116] transition-all duration-300"
            >
              Visit Profile <FiExternalLink />
            </a>
          </GlassCard>

          {/* CodeChef Card */}
          <GlassCard interactive className="flex flex-col justify-between p-6 group hover:border-[var(--cyan)]/45 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)] transition-all duration-500">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SiCodechef className="h-6 w-6 text-orange-400 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
                  <span className="font-display text-lg font-bold text-white">CodeChef</span>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 px-2.5 py-1 text-[10px] font-bold text-orange-400 uppercase tracking-wider">
                  2★ Coder
                </span>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-white/5 border border-white/5 p-3 group-hover:border-white/10 transition-colors">
                  <div className="font-display text-xl font-bold text-white">
                    <Counter to={1550} />
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Max Rating</div>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/5 p-3 group-hover:border-white/10 transition-colors">
                  <div className="font-display text-xl font-bold text-white">
                    <Counter to={50} />+
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Rated Contests</div>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/5 p-3 group-hover:border-white/10 transition-colors">
                  <div className="font-display text-xl font-bold text-[var(--cyan)]">
                    Active
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Global Status</div>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/5 p-3 group-hover:border-white/10 transition-colors">
                  <div className="font-display text-xl font-bold text-white font-mono">
                    2024
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Active Since</div>
                </div>
              </div>
            </div>

            <a
              href={links.codechef}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500/5 border border-orange-500/30 px-4 py-2.5 text-xs font-semibold text-orange-400 hover:bg-orange-500 hover:text-background hover:border-orange-500 transition-all duration-300"
            >
              Visit Profile <FiExternalLink />
            </a>
          </GlassCard>
        </div>

        {/* DSA Topics Card */}
        <GlassCard className="p-6 border border-white/5 group hover:border-white/10 transition-all duration-500">
          <div className="text-xs font-mono text-[var(--cyan)] uppercase tracking-wider">Algorithmic Focus</div>
          <div className="mt-1.5 font-display text-lg font-semibold text-white">Topics Solved</div>
          <div className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-4">
            {dsaTopics.map((t) => (
              <Bar key={t.topic} {...t} />
            ))}
          </div>
        </GlassCard>
      </div>
    </Section>
  );
}
