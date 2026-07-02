import { motion } from "framer-motion";
import { type ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}
    >
      {eyebrow && (
        <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium text-[var(--cyan)] tracking-wide uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--cyan)] shadow-[0_0_12px_var(--cyan)]" />
          {eyebrow}
        </div>
      )}
      <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      {subtitle && <p className="mt-8 text-base text-muted-foreground leading-relaxed">{subtitle}</p>}
    </motion.div>
  );
}

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-24 py-20 sm:py-28 ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  );
}
