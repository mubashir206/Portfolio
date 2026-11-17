"use client";

import { site } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";

export function Experience() {
  return (
    <section id="experience" className="section-pad py-24 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p className="mb-4 text-xs uppercase tracking-[0.28em] text-fg-muted">
            05 — Path
          </p>
          <h2 className="display mb-16 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            Timeline of
            <br />
            deliberate craft.
          </h2>
        </Reveal>

        <div className="relative pl-8 md:pl-0">
          <div className="absolute left-[11px] top-0 h-full w-[2px] bg-accent/40 md:left-1/2 md:-translate-x-px" />

          <ul className="space-y-14 md:space-y-20">
            {site.experience.map((item, i) => {
              const left = i % 2 === 0;
              return (
                <Reveal key={`${item.title}-${item.period}`}>
                  <li className="relative grid md:grid-cols-2 md:gap-12">
                    <span
                      className="absolute left-[-1.55rem] top-1 z-10 h-3.5 w-3.5 rounded-full border-2 border-accent bg-bg md:left-1/2 md:-translate-x-1/2"
                      aria-hidden
                    />
                    <div
                      className={
                        left
                          ? "md:col-start-1 md:pr-12 md:text-right"
                          : "md:col-start-2 md:pl-12"
                      }
                    >
                      <p className="font-mono text-xs text-accent">
                        {item.period}
                      </p>
                      <h3 className="display mt-2 text-2xl md:text-3xl">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-fg">
                        {item.org}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                        {item.detail}
                      </p>
                    </div>
                    {left ? <div className="hidden md:block" /> : null}
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
