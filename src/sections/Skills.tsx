import { Section, SectionHeading } from "@/components/Section";
import { GlassCard } from "@/components/GlassCard";
import { skillCategories } from "@/config/portfolio";
import { motion } from "framer-motion";
import {
  SiCplusplus, SiPython, SiJavascript, SiHtml5, SiBootstrap, SiReact, SiTailwindcss, SiTypescript, SiNodedotjs, SiExpress, SiMysql, SiMongodb, SiSupabase, SiGit, SiGithub, SiPostman, SiVite, SiDocker
} from "react-icons/si";
import { FaCode, FaServer, FaDatabase, FaNetworkWired, FaTerminal, FaLaptopCode, FaCogs, FaJava, FaCss3Alt } from "react-icons/fa";

const iconMap: Record<string, React.ReactNode> = {
  "C++": <SiCplusplus className="text-[#00599C]" />,
  "Java": <FaJava className="text-[#007396]" />,
  "Python": <SiPython className="text-[#3776AB]" />,
  "JavaScript": <SiJavascript className="text-[#F7DF1E]" />,
  "C": <FaCode className="text-gray-400" />,
  "React": <SiReact className="text-[#61DAFB]" />,
  "TypeScript": <SiTypescript className="text-[#3178C6]" />,
  "Tailwind CSS": <SiTailwindcss className="text-[#06B6D4]" />,
  "HTML": <SiHtml5 className="text-[#E34F26]" />,
  "CSS": <FaCss3Alt className="text-[#1572B6]" />,
  "Bootstrap": <SiBootstrap className="text-[#7952B3]" />,
  "Node.js": <SiNodedotjs className="text-[#339933]" />,
  "Express.js": <SiExpress />,
  "REST APIs": <FaServer className="text-gray-400" />,
  "JWT": <FaCode className="text-purple-400" />,
  "MySQL": <SiMysql className="text-[#4479A1]" />,
  "MongoDB": <SiMongodb className="text-[#47A248]" />,
  "Supabase": <SiSupabase className="text-[#3ECF8E]" />,
  "Git": <SiGit className="text-[#F05032]" />,
  "GitHub": <SiGithub />,
  "VS Code": <FaLaptopCode className="text-[#007ACC]" />,
  "Linux": <FaTerminal className="text-yellow-500" />,
  "Postman": <SiPostman className="text-[#FF6C37]" />,
  "Vite": <SiVite className="text-[#646CFF]" />,
  "System Design": <FaCogs className="text-indigo-400" />,
  "Docker": <SiDocker className="text-[#2496ED]" />,
  "Cloud Computing": <FaServer className="text-sky-400" />,
  "Operating Systems": <FaCogs className="text-gray-400" />,
  "DBMS": <FaDatabase className="text-gray-400" />,
  "Computer Networks": <FaNetworkWired className="text-gray-400" />,
  "OOP": <FaCode className="text-gray-400" />,
};

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        eyebrow="Skills"
        title={<>The toolkit I <span className="gradient-text">reach for.</span></>}
        subtitle="Technologies I use regularly to build full-stack applications and solve engineering problems."
      />
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skillCategories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            <GlassCard interactive className="h-full flex flex-col group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">{cat.icon}</span>
                  <h3 className="font-display text-lg font-semibold">{cat.title}</h3>
                </div>
                <span className="text-xs font-mono text-[var(--cyan)]">{cat.experience}</span>
              </div>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {cat.items.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1.5 rounded-lg glass px-3 py-1.5 text-xs font-medium text-foreground/90 border border-white/10 hover:border-[var(--cyan)] hover:shadow-[0_0_12px_rgba(34,211,238,0.25)] hover:scale-105 hover:text-white transition-all duration-300 cursor-default"
                  >
                    <span className="text-sm opacity-90">{iconMap[s] || <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--cyan)] opacity-70" />}</span>
                    {s}
                  </span>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
