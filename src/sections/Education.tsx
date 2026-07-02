import { Section, SectionHeading } from "@/components/Section";
import { GlassCard } from "@/components/GlassCard";
import { profile, coursework, journey, currentLearning, philosophy } from "@/config/portfolio";
import { motion } from "framer-motion";

export function Education() {
  return (
    <>

      <Section id="journey">
        <SectionHeading
          eyebrow="Learning Journey"
          title={<>From <span className="gradient-text">curious to capable.</span></>}
          subtitle="The path that brought me here — in milestones, not platitudes."
        />
        <div className="mt-14 relative">
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent" />
          <div className="space-y-6">
            {journey.map((j, i) => {
              const side = i % 2 === 0;
              return (
                <motion.div
                  key={j.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.03 }}
                  className={`relative pl-12 sm:pl-0 sm:grid sm:grid-cols-2 sm:gap-10 ${side ? "" : "sm:[&>*:first-child]:order-2"}`}
                >
                  <div className={side ? "sm:text-right sm:pr-10" : "sm:pl-10"}>
                    <GlassCard interactive className="!p-4">
                      <div className="text-[10px] font-mono text-[var(--cyan)] font-bold tracking-wider">{j.year}</div>
                      <h4 className="mt-1 font-display font-semibold text-white">{j.title}</h4>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{j.desc}</p>
                    </GlassCard>
                  </div>
                  <div className="hidden sm:block" />
                  <span className="absolute left-4 sm:left-1/2 top-4 -translate-x-1/2 h-3 w-3 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--cyan)] ring-4 ring-background" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>
    </>
  );
}
