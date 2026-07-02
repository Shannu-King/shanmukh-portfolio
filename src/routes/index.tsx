import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";

import { CursorGlow } from "@/components/CursorGlow";
import { PaperParticles } from "@/components/PaperParticles";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Hero } from "@/sections/Hero";
import { Highlights } from "@/sections/Highlights";
import { About } from "@/sections/About";
import { Skills } from "@/sections/Skills";
import { Certifications } from "@/sections/Certifications";
import { Projects } from "@/sections/Projects";
import { CodingProfiles } from "@/sections/CodingProfiles";
import { Education } from "@/sections/Education";
import { Contact } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";

export const Route = createFileRoute("/")(({
  head: () => ({
    meta: [
      { title: "Shanmukh Tharun — Full Stack Developer & Competitive Programmer" },
      {
        name: "description",
        content:
          "Portfolio of Shanmukh Tharun, a final-year CSE student building scalable web applications. Knight on LeetCode, Top 6% globally, 600+ problems solved.",
      },
      { property: "og:title", content: "Shanmukh Tharun — Full Stack Developer & Competitive Programmer" },
      {
        property: "og:description",
        content:
          "Final-year CSE student. Full Stack Developer. Knight on LeetCode, Top 6%, 600+ problems solved.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Shanmukh Tharun",
          jobTitle: "Full Stack Developer",
          alumniOf: "Aditya University",
          knowsAbout: ["React", "Node.js", "Competitive Programming", "Data Structures", "Algorithms"],
        }),
      },
    ],
  }),
  component: Index,
}));

function Index() {
  return (
    <div className="relative min-h-dvh">
      <CursorGlow />
      <PaperParticles />

      <Nav />
      <main>
        <Hero />

        <ScrollReveal>
          <Highlights />
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <About />
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <Skills />
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <Projects />
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <CodingProfiles />
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <Education />
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <Certifications />
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <Contact />
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  );
}
