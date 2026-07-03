import { useState } from "react";
import { Section, SectionHeading } from "@/components/Section";
import { GlassCard } from "@/components/GlassCard";
import { links } from "@/config/portfolio";
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiSend, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { SiLeetcode, SiCodechef } from "react-icons/si";
import { trackEvent } from "@/lib/analytics";


const channels = [
  { icon: FiMail, label: "Email", value: "shanmukh@example.com", href: links.email },
  { icon: FiLinkedin, label: "LinkedIn", value: "Connect", href: links.linkedin },
  { icon: FiGithub, label: "GitHub", value: "Follow", href: links.github },
  { icon: SiLeetcode, label: "LeetCode", value: "Profile", href: links.leetcode },
  { icon: SiCodechef, label: "CodeChef", value: "Profile", href: links.codechef },
  { icon: FiDownload, label: "Resume", value: "Download", href: links.resume },
];

export function Contact() {
  const [state, setState] = useState<{ status: "idle" | "ok" | "err"; msg?: string }>({ status: "idle" });

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const subject = String(data.get("subject") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (!name || !email || !subject || !message) {
      setState({ status: "err", msg: "Please fill in all fields." });
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setState({ status: "err", msg: "Enter a valid email address." });
      return;
    }
    const mail = `mailto:shanmukh@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      `From: ${name} <${email}>\n\n${message}`,
    )}`;
    window.location.href = mail;
    setState({ status: "ok", msg: "Opening your mail app…" });
    e.currentTarget.reset();
  }

  return (
    <Section id="contact">
      <SectionHeading
        eyebrow="Contact"
        title={<>Let's build <span className="gradient-text">something real.</span></>}
        subtitle="Open to internships, full-time SDE roles, and conversations about software engineering."
      />

      <div className="mt-12 grid lg:grid-cols-2 gap-6 items-start">
        <div className="grid sm:grid-cols-2 gap-3 content-start">
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer noopener"
              className="group"
              onClick={() => {
                if (c.label === "Resume") {
                  trackEvent("download_resume", "engagement", "Contact Section");
                }
              }}
            >
              <GlassCard interactive className="!p-4 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[var(--primary)]/25 to-[var(--purple)]/25">
                  <c.icon className="h-4.5 w-4.5" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-mono">
                    {c.label}
                  </div>
                  <div className="text-sm font-medium group-hover:text-[var(--cyan)] transition-colors">
                    {c.value}
                  </div>
                </div>
              </GlassCard>
            </a>
          ))}
        </div>

        <GlassCard>
          <form className="grid gap-4" onSubmit={submit} noValidate>
            <Field label="Name" name="name" placeholder="Your full name" />
            <Field label="Email" name="email" type="email" placeholder="you@domain.com" />
            <Field label="Subject" name="subject" placeholder="Internship opportunity, collaboration, …" />
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

            {state.status !== "idle" && (
              <div
                role="status"
                className={`flex items-center gap-2 text-xs rounded-lg px-3 py-2 ${
                  state.status === "ok"
                    ? "bg-emerald-500/10 text-emerald-300"
                    : "bg-red-500/10 text-red-300"
                }`}
              >
                {state.status === "ok" ? <FiCheckCircle /> : <FiAlertCircle />}
                {state.msg}
              </div>
            )}

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--cyan)] text-background px-5 py-3 text-sm font-semibold shadow-elegant hover:scale-[1.01] transition-transform"
            >
              Send Message <FiSend />
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
