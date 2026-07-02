import { motion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = HTMLMotionProps<"div"> & { children: ReactNode; interactive?: boolean };

export function GlassCard({ children, className, interactive, ...rest }: Props) {
  return (
    <motion.div
      whileHover={interactive ? { y: -6 } : undefined}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={cn(
        "glass relative rounded-2xl p-6",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl",
        "before:[background:linear-gradient(135deg,color-mix(in_oklab,var(--primary)_30%,transparent),transparent_40%,color-mix(in_oklab,var(--purple)_25%,transparent))]",
        "before:[mask:linear-gradient(black,black)_content-box,linear-gradient(black,black)] before:[mask-composite:exclude] before:p-px",
        interactive && "hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3),_0_0_20px_rgba(34,211,238,0.15)] transition-shadow duration-500",
        className,
      )}
      {...rest}
    >
      <div className="relative">{children}</div>
    </motion.div>
  );
}
