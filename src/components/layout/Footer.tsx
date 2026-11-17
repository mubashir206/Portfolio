"use client";

import { startTransition, useEffect, useState } from "react";
import { site } from "@/data/site";

const COPYRIGHT_YEAR = 2026;

export function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      startTransition(() => {
        setTime(
          new Intl.DateTimeFormat("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
            timeZoneName: "short",
          }).format(new Date()),
        );
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="section-pad border-t border-border pb-10 pt-16">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-fg-muted">
              Available for select projects
            </p>
            <a
              href={`mailto:${site.email}`}
              className="display text-4xl transition-colors hover:text-accent sm:text-5xl md:text-6xl"
              data-cursor="hover"
            >
              Let&apos;s build something
              <br />
              people remember.
            </a>
          </div>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-3 self-start text-sm text-fg-muted transition-colors hover:text-fg md:self-end"
            data-cursor="hover"
          >
            Back to top
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border transition-transform group-hover:-translate-y-1 group-hover:border-accent">
              ↑
            </span>
          </button>
        </div>

        <div className="flex flex-col gap-4 border-t border-border pt-8 text-sm text-fg-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {COPYRIGHT_YEAR} {site.name}. Crafted with obsessive care.
          </p>
          <p className="font-mono tabular-nums" aria-live="polite">
            Local time · {time || "—:—:—"}
          </p>
        </div>
      </div>
    </footer>
  );
}
