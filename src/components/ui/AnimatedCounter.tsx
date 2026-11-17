"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

export function AnimatedCounter({
  value,
  duration = 1600,
}: {
  value: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = usePrefersReducedMotion();
  const decimals = Number.isInteger(value) ? 0 : 1;
  const formatValue = (n: number) =>
    decimals === 0 ? String(Math.round(n)) : n.toFixed(1);
  const [display, setDisplay] = useState(
    reduced ? formatValue(value) : formatValue(0),
  );

  useEffect(() => {
    if (!inView) return;

    const format = (n: number) =>
      decimals === 0 ? String(Math.round(n)) : n.toFixed(1);

    if (reduced) {
      setDisplay(format(value));
      return;
    }

    const start = performance.now();
    let frame = 0;
    const factor = 10 ** decimals;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = Math.round(eased * value * factor) / factor;
      setDisplay(format(next));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [duration, inView, reduced, value, decimals]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
}
