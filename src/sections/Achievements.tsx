import { Section, SectionHeading } from "@/components/Section";
import { GlassCard } from "@/components/GlassCard";
import { achievements } from "@/config/portfolio";
import { motion } from "framer-motion";

export function Achievements() {
  return (
    <Section id="achievements">
      <SectionHeading
        eyebrow="Achievements"
        title={<>Receipts, <span className="gradient-text">not résumé fluff.</span></>}
      />
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
          >
            <GlassCard interactive className="h-full">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-[var(--primary)]/30 to-[var(--purple)]/30 text-2xl">
                {a.icon}
              </div>
              <h3 className="mt-4 font-display font-semibold">{a.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
