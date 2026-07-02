import { Section, SectionHeading } from "@/components/Section";
import { GlassCard } from "@/components/GlassCard";
import { motion } from "framer-motion";

const story = [
  {
    icon: "💡",
    title: "Curiosity",
    body:
      "I wrote my first program out of curiosity—not because a syllabus required it. Seeing code solve a real problem made me want to understand how computers actually work.",
  },
  {
    icon: "🧩",
    title: "Problem Solving",
    body:
      "C and C++ taught me how memory and control flow actually work. 600+ problems solved and a Knight badge later, patterns became second nature.",
  },
  {
    icon: "🚀",
    title: "Building Products",
    body:
      "Solving problems on a judge is fun, but shipping something a real user can touch is better. Full stack work is where engineering becomes tangible.",
  },
  {
    icon: "📚",
    title: "Learning",
    body:
      "Now I'm studying system design, performance, and the trade-offs senior engineers think about. The stack will keep changing; the habit of learning won't.",
  },
];

export function About() {
  return (
    <Section id="about">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <SectionHeading
          eyebrow="About"
          title={<>Engineer first, <span className="gradient-text">student second.</span></>}
          subtitle="A short version of how I got here — told through what I've actually done."
        />
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden lg:grid grid-cols-2 gap-x-8 gap-y-4 text-right mb-2"
        >
          <div>
            <div className="font-display text-xl font-bold text-foreground">600+</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Problems</div>
          </div>
          <div>
            <div className="font-display text-xl font-bold text-foreground">Knight</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Badge</div>
          </div>
          <div>
            <div className="font-display text-xl font-bold text-foreground">2★</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">CodeChef</div>
          </div>
          <div>
            <div className="font-display text-xl font-bold text-foreground">Final Year</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">CSE</div>
          </div>
        </motion.div>
      </div>
      <div className="mt-12 grid md:grid-cols-2 gap-4">
        {story.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
          >
            <GlassCard interactive className="h-full group">
              <div className="flex items-center gap-2">
                <motion.span 
                  className="text-base inline-block"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {s.icon}
                </motion.span>
                <span className="text-xs font-mono text-[var(--cyan)]">0{i + 1}</span>
              </div>
              <h3 className="mt-2 font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-zinc-200 leading-relaxed">{s.body}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="mt-10 text-center text-sm text-muted-foreground max-w-2xl mx-auto italic leading-relaxed"
      >
        "I believe software should solve real problems. Clean architecture, continuous learning, and consistency matter more than chasing trends."
      </motion.p>
    </Section>
  );
}
