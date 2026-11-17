"use client";

import Image from "next/image";
import { site } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

export function About() {
  return (
    <section id="about" className="section-pad relative py-24 md:py-36">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-5">
          <p className="mb-4 text-xs uppercase tracking-[0.28em] text-fg-muted">
            01 — About
          </p>
          <h2 className="display text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            Full stack that
            <br />
            <span className="text-accent">ships</span> product.
          </h2>
        </Reveal>

        <div className="flex flex-col gap-6 lg:col-span-4 lg:pt-16">
          {site.bio.map((line, i) => (
            <Reveal key={line} delay={0.1 * i}>
              <p className="text-base leading-relaxed text-fg-muted sm:text-lg">
                {line}
              </p>
            </Reveal>
          ))}
        </div>

        {/* Portrait — body-focused crop + design overlays */}
        <div className="relative lg:col-span-3 lg:row-span-2">
          <div className="relative aspect-[3/4] overflow-hidden bg-bg-elevated">
            <Image
              src="/portrait-close.jpg"
              alt={`${site.name} — ${site.role}`}
              fill
              sizes="(max-width: 1024px) 80vw, 320px"
              quality={97}
              className="object-cover object-center"
              priority
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_42%,color-mix(in_oklab,var(--bg)_55%,transparent)_82%,var(--bg)_100%)]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,color-mix(in_oklab,var(--volt)_22%,transparent)_0%,transparent_45%,color-mix(in_oklab,var(--ember)_18%,transparent)_100%)] opacity-45 mix-blend-soft-light dark:opacity-40"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-border/60"
              aria-hidden
            />
            <div className="absolute inset-0 flex flex-col justify-between p-5">
              <span className="font-mono text-[10px] uppercase tracking-widest text-fg/80">
                Portrait · 01
              </span>
              <div>
                <p className="display text-4xl text-fg md:text-5xl">
                  {site.firstName.charAt(0)}
                  {site.name.split(" ")[1]?.charAt(0) ?? ""}
                </p>
                <p className="mt-2 text-xs text-fg-muted">{site.role}</p>
              </div>
            </div>
            <div className="pointer-events-none absolute -bottom-3 -right-3 h-full w-full border border-accent/40" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 border-t border-border pt-10 lg:col-span-9">
          {site.stats.map((stat) => (
            <Reveal key={stat.label}>
              <p className="display text-3xl text-accent sm:text-5xl md:text-6xl">
                <AnimatedCounter value={stat.value} />
                <span className="text-2xl sm:text-3xl">+</span>
              </p>
              <p className="mt-2 text-xs uppercase tracking-wider text-fg-muted sm:text-sm">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
