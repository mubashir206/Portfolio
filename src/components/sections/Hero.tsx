"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/data/site";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useFancyMotion, useIsMobile, usePrefersReducedMotion } from "@/lib/hooks";

const ROLES = [
  site.role,
  "Laravel Engineer",
  "API Integration Specialist",
  "Vue.js Developer",
  "Software Engineer",
];

const LONGEST_ROLE = ROLES.reduce((a, b) => (a.length >= b.length ? a : b));

const SIGNAL_WORDS = [...site.techMarquee];

function WordReveal({
  text,
  className,
  delay = 0,
  fancy,
}: {
  text: string;
  className?: string;
  delay?: number;
  fancy: boolean;
}) {
  if (!fancy) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className} aria-label={text}>
      <span className="inline-block overflow-hidden align-bottom pb-1">
        <motion.span
          className="inline-block"
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          transition={{
            duration: 0.7,
            delay,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {text}
        </motion.span>
      </span>
    </span>
  );
}

function RoleTicker({ fancy }: { fancy: boolean }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!fancy) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(id);
  }, [fancy]);

  const typeClass =
    "display whitespace-nowrap text-xl text-accent sm:text-2xl md:text-3xl";

  if (!fancy) {
    return <span className={typeClass}>{ROLES[0]}</span>;
  }

  return (
    <div className="relative inline-grid text-accent">
      {/* Invisible sizer so full role always fits (no “Digital…” cut-off) */}
      <span className={`${typeClass} invisible col-start-1 row-start-1`} aria-hidden>
        {LONGEST_ROLE}
      </span>
      <span className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={ROLES[index]}
            className={`${typeClass} absolute inset-0`}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-110%", opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {ROLES[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}

/** CSS-driven orbit — spins on desktop even without fancy pointer */
function SignalOrbit({ spin }: { spin: boolean }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[380px] lg:max-w-none">
      <div
        className={`absolute inset-0 rounded-full border border-dashed border-fg/25 ${
          spin ? "orbit-spin-rev" : ""
        }`}
      />
      <div className="absolute inset-[12%] rounded-full border border-border" />
      <div
        className={`absolute inset-[6%] flex items-center justify-center ${
          spin ? "orbit-spin" : ""
        }`}
        aria-hidden
      >
        <svg className="h-full w-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.4"
            strokeDasharray="32 257"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="absolute inset-[28%] flex flex-col items-center justify-center rounded-full bg-[var(--fg)] text-[var(--bg)]">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[color:color-mix(in_oklab,var(--bg)_55%,transparent)]">
          Est.
        </span>
        <span className="display text-4xl leading-none text-[var(--bg)] md:text-5xl">
          {site.orbit.since}
        </span>
        <span className="mt-2 text-[10px] uppercase tracking-[0.2em] text-[color:color-mix(in_oklab,var(--bg)_55%,transparent)]">
          {site.orbit.caption}
        </span>
      </div>

      {site.orbit.nodes.map((label, i) => {
        const angle = (i / site.orbit.nodes.length) * Math.PI * 2 - Math.PI / 2;
        const r = 46;
        const x = 50 + Math.cos(angle) * r;
        const y = 50 + Math.sin(angle) * r;
        return (
          <span
            key={label}
            className="absolute flex h-9 min-w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-bg/90 px-2 text-[8px] font-semibold tracking-wide sm:h-10 sm:min-w-10 sm:text-[9px]"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            {label}
          </span>
        );
      })}
    </div>
  );
}

export function Hero() {
  const fancy = useFancyMotion();
  const mobile = useIsMobile();
  const reduced = usePrefersReducedMotion();
  /* CSS orbit + marquee stay on for mobile; only respect reduced-motion */
  const orbitSpin = !reduced;
  const [first = "Mubashir", ...rest] = site.name.split(" ");
  const last = rest.join(" ") || first;
  const marquee = [...SIGNAL_WORDS, ...SIGNAL_WORDS];

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-28 md:pt-32"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {!mobile && (
          <div
            className="absolute inset-0 opacity-[0.3] dark:opacity-[0.18]"
            style={{
              backgroundImage: `
                linear-gradient(var(--border) 1px, transparent 1px),
                linear-gradient(90deg, var(--border) 1px, transparent 1px)
              `,
              backgroundSize: "72px 72px",
              maskImage:
                "radial-gradient(ellipse at 50% 40%, black 20%, transparent 75%)",
            }}
          />
        )}
        {/* Static blobs — no infinite JS animation (huge win on low-end devices) */}
        <div className="gradient-blob absolute -left-[15%] top-[5%] h-[50vw] max-h-[520px] w-[50vw] max-w-[520px] rounded-full bg-volt/30" />
        <div className="gradient-blob absolute -right-[10%] top-[22%] h-[42vw] max-h-[460px] w-[42vw] max-w-[460px] rounded-full bg-ember/25" />
        <div className="absolute left-[8%] top-[18%] h-px w-[min(38%,320px)] bg-gradient-to-r from-accent via-accent/40 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--bg)_78%)]" />
      </div>

      <div className="section-pad relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col">
        <div className="mb-8 flex items-start justify-between gap-4 md:mb-10">
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-fg-muted sm:text-[11px]">
            <span className="text-accent">01</span>
            <span className="h-px w-8 bg-border" />
            <span>Introduction</span>
          </div>
          <div className="hidden text-right font-mono text-[10px] uppercase tracking-[0.18em] text-fg-muted sm:block sm:text-[11px]">
            <p>{site.location}</p>
            <p className="mt-1 text-accent">3.5+ yrs · Laravel / Vue</p>
          </div>
        </div>

        <div className="grid flex-1 items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-8 xl:gap-12">
          <div className="min-w-0">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="text-xs uppercase tracking-[0.2em] text-fg-muted">
                Currently
              </span>
              <RoleTicker fancy={fancy} />
            </div>

            <h1 className="display relative leading-[0.86] tracking-[-0.05em]">
              {!mobile && (
                <span
                  className="pointer-events-none absolute left-[0.04em] top-[0.06em] select-none text-[clamp(2.4rem,7.5vw,5.75rem)] text-transparent opacity-25"
                  style={{ WebkitTextStroke: "1px var(--fg)" }}
                  aria-hidden
                >
                  <span className="block">{first}</span>
                  <span className="block">
                    {last}
                    <span className="ml-1">.</span>
                  </span>
                </span>
              )}
              <span className="relative block text-[clamp(2.4rem,7.5vw,5.75rem)] text-fg">
                <span className="block">
                  <WordReveal text={first} delay={0.15} fancy={fancy} />
                </span>
                <span className="block">
                  <WordReveal text={last} delay={0.28} fancy={fancy} />
                  <span className="ml-1 text-accent">.</span>
                </span>
              </span>
            </h1>

            <p className="mt-8 max-w-md text-base leading-relaxed text-fg-muted sm:text-lg md:mt-10">
              {site.tagline}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <MagneticButton
                href="#work"
                className="bg-[var(--fg)] px-8 text-[var(--bg)] hover:bg-[var(--accent)] hover:text-[var(--bg)]"
              >
                <span className="text-[var(--bg)]">View selected work</span>
                <span className="text-[var(--bg)]" aria-hidden>
                  →
                </span>
              </MagneticButton>
              <MagneticButton
                href="#contact"
                className="border-2 border-[color:color-mix(in_oklab,var(--fg)_45%,transparent)] bg-transparent text-[var(--fg)] hover:border-accent hover:text-accent"
              >
                <span className="text-[var(--fg)]">Start a project</span>
              </MagneticButton>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[340px] lg:max-w-none">
            <SignalOrbit spin={orbitSpin} />
            <p className="mt-5 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-fg-muted lg:mt-8">
              Signal orbit
            </p>
          </div>
        </div>
      </div>

      {/* Full-bleed tech marquee — true edge-to-edge */}
      <div className="marquee-fade relative mt-10 w-full border-y border-border py-4 md:mt-14 md:py-5">
        <div
          className={`flex w-max gap-8 ${reduced ? "" : "marquee-track"}`}
        >
          {marquee.map((word, i) => (
            <span
              key={`${word}-${i}`}
              className="display whitespace-nowrap text-2xl text-fg/30 sm:text-3xl md:text-4xl"
            >
              {word}
              <span className="mx-5 text-accent">◆</span>
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}
