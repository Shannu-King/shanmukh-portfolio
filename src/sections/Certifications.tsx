import { Section, SectionHeading } from "@/components/Section";
import { GlassCard } from "@/components/GlassCard";
import { certifications } from "@/config/portfolio";
import { FiExternalLink, FiAward, FiCheckCircle } from "react-icons/fi";
import { SiMongodb, SiCisco, SiRedhat } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { motion } from "framer-motion";

const orgIcon: Record<string, React.ReactNode> = {
  "MongoDB University": <SiMongodb className="text-[#47A248]" />,
  Oracle: <FaJava className="text-[#007396]" />,
  Cisco: <SiCisco className="text-[#1BA0D7]" />,
  "Red Hat Academy": <SiRedhat className="text-[#EE0000]" />,
};

export function Certifications() {
  return (
    <Section id="certifications">
      <SectionHeading
        eyebrow="Certifications"
        title={<>Verified, <span className="gradient-text">not just claimed.</span></>}
        subtitle="Every certification below is backed by an official credential. Click through to verify."
      />
      <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {certifications.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            <GlassCard interactive className="h-full flex flex-col group !p-6 border border-white/5 group-hover:border-[var(--cyan)]/50 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all duration-500">
              <div className="flex items-start justify-between gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-xl glass shadow-elegant text-2xl group-hover:-rotate-6 group-hover:scale-110 transition-transform duration-300">
                  {orgIcon[c.org] || <FiAward className="text-cyan-400" />}
                </div>
                <div className="flex flex-col items-end">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--cyan)]/10 px-2.5 py-1 text-[10px] font-semibold text-[var(--cyan)] uppercase tracking-wider">
                    <FiCheckCircle className="h-3 w-3" /> Verified
                  </span>
                  <span className="mt-1.5 text-[10px] font-mono text-muted-foreground">ID: {c.credentialId}</span>
                </div>
              </div>
              <h3 className="mt-5 font-display text-base font-semibold leading-snug text-foreground group-hover:text-[var(--cyan)] transition-colors duration-300">{c.name}</h3>
              <p className="mt-1 text-xs text-zinc-400 font-medium">{c.org} • Issued {c.date}</p>

              <div className="mt-5 flex flex-wrap gap-2 mb-auto">
                {c.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-md bg-white/5 border border-white/5 px-2.5 py-1 text-[11px] text-zinc-300 transition-colors group-hover:border-[var(--cyan)]/30"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <a
                href={c.link}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs font-semibold text-foreground group-hover:bg-[var(--cyan)] group-hover:text-background group-hover:border-[var(--cyan)] transition-all duration-300"
              >
                View Credential <FiExternalLink className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
