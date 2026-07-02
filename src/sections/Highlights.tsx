import { motion } from "framer-motion";
import { highlights } from "@/config/portfolio";
import { GlassCard } from "@/components/GlassCard";

export function Highlights() {
  return (
    <section aria-label="Highlights" className="py-6">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {highlights.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <GlassCard interactive className="!p-6 text-center">
                <div className="text-2xl">{h.icon}</div>
                <div className="mt-2 font-display font-semibold text-sm">{h.title}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{h.subtitle}</div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
