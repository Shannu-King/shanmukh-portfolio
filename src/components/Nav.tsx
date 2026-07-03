import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navItems } from "@/config/portfolio";
import { cn } from "@/lib/utils";
import { trackEvent, trackPageView } from "@/lib/analytics";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const sectionPath = active === "home" ? "/" : `/#${active}`;
      const sectionName = active.charAt(0).toUpperCase() + active.slice(1);
      trackPageView(sectionPath, `Shanmukh Tharun - ${sectionName}`);
    }, 1200);

    return () => clearTimeout(timer);
  }, [active]);

  useEffect(() => {
    const ids = navItems
      .map((n) => n.href.slice(1))
      .filter((id) => id && !id.includes("/") && !id.includes("."));

    const handleScroll = () => {
      // 1. Top of the page triggers "home" (no highlighted pill)
      if (window.scrollY < 120) {
        setActive("home");
        return;
      }

      // 2. Near bottom of the page forces "contact" active
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 120;
      if (isAtBottom) {
        setActive("contact");
        return;
      }

      // 3. Find which section covers the main content area (y = 180px)
      let currentActive = "home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180 && rect.bottom > 180) {
            currentActive = id;
            break;
          }
        }
      }
      setActive(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div
          className={cn(
            "flex items-center justify-between rounded-2xl px-4 sm:px-5 py-3 transition-all",
            scrolled ? "glass-strong shadow-elegant" : "bg-transparent",
          )}
        >
          <a
            href="#home"
            onClick={() => trackEvent("click_navigation", "navigation", "Navbar - Logo")}
            className="flex items-center gap-2 group"
          >
            <img
              src="/logo.png"
              alt="Logo"
              className="h-8 w-8 rounded-lg object-cover shadow-elegant"
            />
            <span className="font-display font-bold tracking-wider hidden sm:inline gradient-text text-glow uppercase">
              SHANMUKH
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((n) => {
              const isActive = active === n.href.slice(1);
              return (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => trackEvent("click_navigation", "navigation", `Navbar - ${n.label}`)}
                  className={cn(
                    "relative rounded-lg px-3 py-1.5 text-sm transition-colors",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg bg-[color-mix(in_oklab,var(--primary)_18%,transparent)] border border-[color-mix(in_oklab,var(--primary)_30%,transparent)]"
                      transition={{ type: "spring", stiffness: 320, damping: 30 }}
                    />
                  )}
                  <span className="relative">{n.label}</span>
                </a>
              );
            })}
          </nav>

          <a
            href="#contact"
            onClick={() => trackEvent("click_navigation", "navigation", "Navbar - Let's talk")}
            className="hidden lg:inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-4 py-2 text-sm font-medium hover:bg-foreground/90 transition-colors"
          >
            Let's talk
          </a>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden grid h-10 w-10 place-items-center rounded-lg glass"
          >
            <div className="relative h-4 w-5">
              <span
                className={cn(
                  "absolute left-0 top-0 h-0.5 w-full bg-foreground transition-transform",
                  open && "translate-y-1.5 rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1.5 h-0.5 w-full bg-foreground transition-opacity",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-3 h-0.5 w-full bg-foreground transition-transform",
                  open && "-translate-y-1.5 -rotate-45",
                )}
              />
            </div>
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-2 lg:hidden glass-strong rounded-2xl p-3 flex flex-col"
            >
              {navItems.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => {
                    setOpen(false);
                    trackEvent("click_navigation", "navigation", `Mobile Navbar - ${n.label}`);
                  }}
                  className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5"
                >
                  {n.label}
                </a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
