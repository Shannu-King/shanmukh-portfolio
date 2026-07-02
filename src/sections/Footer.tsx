import { FiArrowUp, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { navItems, links, profile } from "@/config/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-white/10 mt-10">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-10 grid gap-8 sm:grid-cols-3 items-start">
        {/* Column 1: Logo & Text */}
        <div>
          <div className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-8 w-8 rounded-lg object-cover"
            />
            <span className="font-display font-semibold text-white">{profile.name}</span>
          </div>
          <p className="mt-3 text-xs text-muted-foreground max-w-xs leading-relaxed">
            Crafted with React, Vite, Tailwind CSS, and Framer Motion, with a focus on performance and user experience.
          </p>
          <p className="mt-2 text-xs text-zinc-500 max-w-xs leading-relaxed">
            Always open to discussing software engineering opportunities and SDE roles.
          </p>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="sm:pt-2">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {navItems.map((n) => (
              <a key={n.href} href={n.href} className="text-muted-foreground hover:text-white transition-colors duration-200">
                {n.label}
              </a>
            ))}
          </div>
        </div>

        {/* Column 3: Social Icons & Back to Top */}
        <div className="flex flex-col items-start sm:items-end justify-between h-full sm:pt-2 gap-4">
          <div className="flex items-center gap-2">
            {[
              { i: FiGithub, h: links.github, l: "GitHub" },
              { i: FiLinkedin, h: links.linkedin, l: "LinkedIn" },
              { i: FiMail, h: links.email, l: "Email" },
            ].map((s) => (
              <a
                key={s.l}
                href={s.h}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={s.l}
                className="grid h-10 w-10 place-items-center rounded-lg glass text-muted-foreground hover:text-[var(--cyan)] hover:border-white/10 transition-colors duration-200"
              >
                <s.i className="h-4.5 w-4.5" />
              </a>
            ))}
          </div>
          <a
            href="#home"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-white transition-colors duration-200"
          >
            Back to top <FiArrowUp />
          </a>
        </div>
      </div>

      {/* Bottom Rights Bar */}
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-5 flex items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
