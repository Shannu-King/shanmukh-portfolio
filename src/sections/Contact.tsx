import { useState, useRef, useCallback } from "react";
import { Section, SectionHeading } from "@/components/Section";
import { GlassCard } from "@/components/GlassCard";
import { links } from "@/config/portfolio";
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiSend, FiCheckCircle } from "react-icons/fi";
import { SiLeetcode, SiCodechef } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import { trackEvent } from "@/lib/analytics";

/* ---------- Confetti Particle ---------- */
function ConfettiParticle({ index }: { index: number }) {
  const colors = [
    "var(--primary)",
    "var(--cyan)",
    "var(--purple)",
    "#f59e0b",
    "#10b981",
    "#ec4899",
    "#6366f1",
  ];
  const color = colors[index % colors.length];
  const xEnd = (Math.random() - 0.5) * 300;
  const yEnd = -(Math.random() * 200 + 80);
  const rotation = Math.random() * 720 - 360;
  const size = Math.random() * 6 + 4;
  const shape = index % 3;

  return (
    <motion.div
      initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
      animate={{
        x: xEnd,
        y: [0, yEnd, yEnd + 120],
        opacity: [1, 1, 0],
        scale: [0, 1.2, 0.6],
        rotate: rotation,
      }}
      transition={{ duration: 1.4, ease: "easeOut" }}
      style={{
        position: "absolute",
        width: shape === 2 ? size * 2 : size,
        height: size,
        borderRadius: shape === 1 ? "50%" : shape === 2 ? "2px" : "1px",
        background: color,
        left: "50%",
        top: "50%",
        pointerEvents: "none",
      }}
    />
  );
}

/* ---------- Success Overlay ---------- */
function SuccessAnimation({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      style={{ background: "color-mix(in oklab, var(--surface) 92%, transparent)" }}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <ConfettiParticle key={i} index={i} />
        ))}
      </div>

      <motion.div
        initial={{ y: 40, x: -20, rotate: 10, opacity: 0, scale: 0.5 }}
        animate={{
          y: [-20, -80],
          x: [-20, 60],
          rotate: [10, -15],
          opacity: [0, 1, 1, 0],
          scale: [0.5, 1.2, 1.2, 0.3],
        }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-4xl mb-2"
      >
        ✈️
      </motion.div>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 12 }}
        className="relative"
      >
        <motion.div
          className="h-16 w-16 rounded-full flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, var(--primary), var(--cyan))",
            boxShadow: "0 0 30px color-mix(in oklab, var(--primary) 40%, transparent)",
          }}
          animate={{
            boxShadow: [
              "0 0 20px color-mix(in oklab, var(--primary) 30%, transparent)",
              "0 0 40px color-mix(in oklab, var(--cyan) 50%, transparent)",
              "0 0 20px color-mix(in oklab, var(--primary) 30%, transparent)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <FiCheckCircle className="h-8 w-8 text-background" />
        </motion.div>
      </motion.div>

      <motion.p
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.85, duration: 0.4 }}
        className="mt-4 font-display font-semibold text-lg text-center"
      >
        Message Sent!
      </motion.p>
      <motion.p
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.4 }}
        className="mt-1 text-sm text-muted-foreground text-center max-w-[220px]"
      >
        I'll get back to you soon ✨
      </motion.p>

      <motion.button
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.4 }}
        onClick={onComplete}
        className="mt-5 text-xs font-medium text-[var(--cyan)] hover:underline cursor-pointer"
      >
        Send another message →
      </motion.button>
    </motion.div>
  );
}

/* ---------- Main Contact Section ---------- */
export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [copied, setCopied] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleIframeLoad = useCallback(() => {
    if (status === "sending") {
      setStatus("success");
      trackEvent("submit_contact_form", "engagement", "Success");
    }
  }, [status]);

  const copyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText("tarunturpudi@gmail.com");
    setCopied(true);
    trackEvent("copy_email", "engagement", "Contact Section");
    setTimeout(() => setCopied(false), 2000);
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message) return;
    if (!/^\S+@\S+\.\S+$/.test(email)) return;

    setStatus("sending");
    e.currentTarget.submit();
  }

  function resetForm() {
    setStatus("idle");
    formRef.current?.reset();
  }

  return (
    <Section id="contact">
      <SectionHeading
        eyebrow="Contact"
        title={<>Let's build <span className="gradient-text">something real.</span></>}
        subtitle="Open to internships, full-time SDE roles, and conversations about software engineering."
      />

      {/* Badges container */}
      <div className="mt-8 flex flex-wrap gap-2.5">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3.5 py-1 text-[11px] font-semibold text-emerald-400 border border-emerald-500/10">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          Available for SDE Roles & Internships
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3.5 py-1 text-[11px] font-medium text-zinc-300">
          📍 Andhra Pradesh, India
        </div>
      </div>

      <div className="mt-8 grid lg:grid-cols-2 gap-6 items-start">
        <div className="grid sm:grid-cols-2 gap-3 content-start">
          {/* Email card */}
          <a
            href={links.email}
            onClick={() => trackEvent("click_contact_method", "engagement", "Email")}
            className="group"
          >
            <GlassCard interactive className="!p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[var(--primary)]/25 to-[var(--purple)]/25 text-white">
                  <FiMail className="h-4.5 w-4.5" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-mono">
                    Email
                  </div>
                  <div className="text-xs font-medium text-zinc-200 group-hover:text-[var(--cyan)] transition-colors">
                    tarunturpudi@gmail.com
                  </div>
                </div>
              </div>
              <button
                onClick={copyEmail}
                className="rounded bg-white/5 border border-white/10 px-2 py-1 text-[9px] font-bold text-zinc-400 hover:text-white hover:bg-white/10 transition-all flex items-center gap-1 shrink-0"
              >
                {copied ? "✓ Copied" : "📋 Copy"}
              </button>
            </GlassCard>
          </a>

          {/* LinkedIn card */}
          <a
            href={links.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            onClick={() => trackEvent("click_contact_method", "engagement", "LinkedIn")}
            className="group"
          >
            <GlassCard interactive className="!p-4 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[var(--primary)]/25 to-[var(--purple)]/25 text-white">
                <FiLinkedin className="h-4.5 w-4.5" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-mono">
                  LinkedIn
                </div>
                <div className="text-xs font-semibold text-zinc-400 group-hover:text-[var(--cyan)] transition-colors">
                  View Profile →
                </div>
              </div>
            </GlassCard>
          </a>

          {/* GitHub card */}
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer noopener"
            onClick={() => trackEvent("click_contact_method", "engagement", "GitHub")}
            className="group"
          >
            <GlassCard interactive className="!p-4 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[var(--primary)]/25 to-[var(--purple)]/25 text-white">
                <FiGithub className="h-4.5 w-4.5" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-mono">
                  GitHub
                </div>
                <div className="text-xs font-semibold text-zinc-400 group-hover:text-[var(--cyan)] transition-colors">
                  View GitHub →
                </div>
              </div>
            </GlassCard>
          </a>

          {/* LeetCode card */}
          <a
            href={links.leetcode}
            target="_blank"
            rel="noreferrer noopener"
            onClick={() => trackEvent("click_contact_method", "engagement", "LeetCode")}
            className="group"
          >
            <GlassCard interactive className="!p-4 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[var(--primary)]/25 to-[var(--purple)]/25 text-white">
                <SiLeetcode className="h-4.5 w-4.5 text-[#FFA116]" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-mono">
                  LeetCode
                </div>
                <div className="text-xs font-semibold text-zinc-400 group-hover:text-[var(--cyan)] transition-colors">
                  View Profile →
                </div>
              </div>
            </GlassCard>
          </a>

          {/* CodeChef card */}
          <a
            href={links.codechef}
            target="_blank"
            rel="noreferrer noopener"
            onClick={() => trackEvent("click_contact_method", "engagement", "CodeChef")}
            className="group"
          >
            <GlassCard interactive className="!p-4 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[var(--primary)]/25 to-[var(--purple)]/25 text-white">
                <SiCodechef className="h-4.5 w-4.5 text-orange-400" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-mono">
                  CodeChef
                </div>
                <div className="text-xs font-semibold text-zinc-400 group-hover:text-[var(--cyan)] transition-colors">
                  View Profile →
                </div>
              </div>
            </GlassCard>
          </a>

          {/* Resume card */}
          <a
            href={links.resume}
            download
            onClick={() => trackEvent("download_resume", "engagement", "Contact Section")}
            className="group"
          >
            <GlassCard interactive className="!p-4 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[var(--primary)]/25 to-[var(--purple)]/25 text-white">
                <FiDownload className="h-4.5 w-4.5 animate-pulse" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-mono">
                  Resume
                </div>
                <div className="text-xs font-semibold text-zinc-400 group-hover:text-[var(--cyan)] transition-colors">
                  Download Resume (PDF)
                </div>
              </div>
            </GlassCard>
          </a>
        </div>

        <GlassCard className="relative overflow-hidden">
          <iframe
            ref={iframeRef}
            name="web3forms-iframe"
            onLoad={handleIframeLoad}
            style={{ display: "none" }}
            title="form-target"
          />

          <AnimatePresence>
            {status === "success" && (
              <SuccessAnimation onComplete={resetForm} />
            )}
          </AnimatePresence>

          <form
            ref={formRef}
            className="grid gap-4"
            action="https://api.web3forms.com/submit"
            method="POST"
            target="web3forms-iframe"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="access_key" value="646ff4e7-5b83-4b0a-abbc-753938547817" />
            <Field label="Name" name="name" placeholder="Your full name" />
            <Field label="Email" name="email" type="email" placeholder="you@domain.com" />
            <div>
              <label htmlFor="message" className="text-[11px] uppercase tracking-wider font-mono text-muted-foreground">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                maxLength={1000}
                placeholder="Tell me what you're working on…"
                className="mt-1.5 w-full rounded-xl glass px-3.5 py-2.5 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--cyan)] text-background px-5 py-3 text-sm font-semibold shadow-elegant hover:scale-[1.01] transition-transform disabled:opacity-70 disabled:hover:scale-100"
            >
              {status === "sending" ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="inline-block"
                  >
                    ⏳
                  </motion.span>
                  Sending...
                </>
              ) : (
                <>
                  Send Message <FiSend />
                </>
              )}
            </button>
          </form>
        </GlassCard>
      </div>
    </Section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-[11px] uppercase tracking-wider font-mono text-muted-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        maxLength={200}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl glass px-3.5 py-2.5 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
      />
    </div>
  );
}
