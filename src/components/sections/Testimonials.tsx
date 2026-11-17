"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { useIsMobile, usePrefersReducedMotion } from "@/lib/hooks";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();
  const item = site.testimonials[index];

  useEffect(() => {
    if (reduced || mobile) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % site.testimonials.length);
    }, 6500);
    return () => clearInterval(id);
  }, [mobile, reduced]);

  return (
    <section id="testimonials" className="section-pad py-24 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p className="mb-4 text-xs uppercase tracking-[0.28em] text-fg-muted">
            06 — Voices
          </p>
          <h2 className="display mb-14 text-4xl sm:text-5xl md:text-6xl">
            Words from
            <br />
            collaborators.
          </h2>
        </Reveal>

        <div className="relative min-h-[220px] border-l-2 border-accent pl-6 md:pl-10 md:min-h-[180px]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={item.name}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -16 }}
              transition={{ duration: 0.45 }}
            >
              <p className="display max-w-3xl text-2xl leading-snug sm:text-3xl md:text-4xl">
                “{item.quote}”
              </p>
              <footer className="mt-8">
                <cite className="not-italic">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-fg-muted"> — {item.role}</span>
                </cite>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex gap-2">
          {site.testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              aria-label={`Show testimonial from ${t.name}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 w-10 transition-colors ${
                i === index ? "bg-accent" : "bg-border hover:bg-fg-muted"
              }`}
              data-cursor="hover"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
