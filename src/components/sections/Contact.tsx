"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

/**
 * Contact form uses mailto as a universal fallback.
 * To use Formspree: set NEXT_PUBLIC_FORMSPREE_ID in .env.local
 * and the form will POST instead.
 */
export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;

    setStatus("sending");

    try {
      if (formspreeId) {
        const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: data,
        });
        if (!res.ok) throw new Error("Formspree error");
        setStatus("sent");
        form.reset();
      } else {
        const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
        const body = encodeURIComponent(
          `${message}\n\n— ${name}\n${email}`,
        );
        window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
        setStatus("sent");
      }
    } catch {
      setStatus("error");
    }
  }

  const fieldClass =
    "w-full border-b border-border bg-transparent py-3 text-base outline-none transition-colors placeholder:text-fg-muted/50 focus:border-accent";

  return (
    <section id="contact" className="section-pad py-24 md:py-36">
      <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="mb-4 text-xs uppercase tracking-[0.28em] text-fg-muted">
            07 — Contact
          </p>
          <h2 className="display text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            Let&apos;s build
            <br />
            something solid.
          </h2>
          <p className="mt-6 max-w-sm text-fg-muted">
            Need a Laravel/Vue full-stack build, multi-tenant booking platform,
            ERP/CRM, claims system, or complex API integration? Reach out —
            based in {site.location}.
          </p>

          <ul className="mt-10 space-y-4 text-sm">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-accent"
                data-cursor="hover"
              >
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${site.phone}`}
                className="transition-colors hover:text-accent"
                data-cursor="hover"
              >
                {site.phone}
              </a>
            </li>
            <li>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent"
                data-cursor="hover"
              >
                WhatsApp
              </a>
            </li>
            <li className="flex flex-wrap gap-4 pt-2">
              {Object.entries(site.social).map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target={key === "email" ? undefined : "_blank"}
                  rel={key === "email" ? undefined : "noopener noreferrer"}
                  className="capitalize text-fg-muted transition-colors hover:text-accent"
                  data-cursor="hover"
                >
                  {key}
                </a>
              ))}
            </li>
          </ul>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={0.1}>
          <form onSubmit={onSubmit} className="flex flex-col gap-8">
            <label className="block">
              <span className="text-xs uppercase tracking-wider text-fg-muted">
                Name
              </span>
              <input
                name="name"
                required
                autoComplete="name"
                className={fieldClass}
                placeholder="Your name"
                data-cursor="hover"
              />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-wider text-fg-muted">
                Email
              </span>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                className={fieldClass}
                placeholder="you@studio.com"
                data-cursor="hover"
              />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-wider text-fg-muted">
                Message
              </span>
              <textarea
                name="message"
                required
                rows={4}
                className={`${fieldClass} resize-none`}
                placeholder="Tell me about the project…"
                data-cursor="hover"
              />
            </label>

            <div className="flex flex-wrap items-center gap-4">
              <MagneticButton
                type="submit"
                disabled={status === "sending"}
                className="bg-accent text-bg disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send message"}
              </MagneticButton>
              {status === "sent" && (
                <span className="text-sm text-accent">
                  Thanks — talk soon.
                </span>
              )}
              {status === "error" && (
                <span className="text-sm text-ember">
                  Something went wrong. Try email directly.
                </span>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
