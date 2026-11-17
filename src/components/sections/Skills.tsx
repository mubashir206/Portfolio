"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { site } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { usePrefersReducedMotion } from "@/lib/hooks";

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = usePrefersReducedMotion();

  return (
    <div ref={ref} className="group">
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <span className="text-sm font-medium sm:text-base">{name}</span>
        <span className="font-mono text-xs text-fg-muted tabular-nums">{level}%</span>
      </div>
      <div className="h-[3px] overflow-hidden bg-border">
        <motion.div
          className="h-full bg-accent origin-left"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: reduced ? 1 : level / 100 } : { scaleX: 0 }}
          transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

export function Skills() {
  const reduced = usePrefersReducedMotion();
  const row = [...site.techMarquee, ...site.techMarquee];

  return (
    <section id="skills" className="overflow-hidden py-24 md:py-36">
      <div className="section-pad mx-auto max-w-[1400px]">
        <Reveal>
          <p className="mb-4 text-xs uppercase tracking-[0.28em] text-fg-muted">
            02 — Capabilities
          </p>
          <h2 className="display mb-14 max-w-[10ch] text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            Tools I bend
            <br />
            into <span className="outline-text">signal</span>.
          </h2>
        </Reveal>

        <div className="grid gap-10 md:grid-cols-2 md:gap-x-16 md:gap-y-8">
          {site.skills.map((skill, i) => (
            <SkillBar
              key={skill.name}
              name={skill.name}
              level={skill.level}
              delay={reduced ? 0 : i * 0.06}
            />
          ))}
        </div>
      </div>

      {/* Infinite marquee */}
      <div className="mt-20 border-y border-border py-5">
        <div className={`flex w-max gap-10 ${reduced ? "" : "marquee-track"}`}>
          {row.map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="display whitespace-nowrap text-3xl text-fg-muted/50 sm:text-4xl md:text-5xl"
            >
              {tech}
              <span className="mx-6 text-accent">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
