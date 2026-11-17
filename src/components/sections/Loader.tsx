"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { useIsMobile, usePrefersReducedMotion } from "@/lib/hooks";

export function Loader({ onDone }: { onDone: () => void }) {
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Skip long intro on mobile / reduced motion — get to content fast
    if (reduced || mobile) {
      setProgress(100);
      setVisible(false);
      onDone();
      return;
    }

    let frame = 0;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    const start = performance.now();
    const duration = 900;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        timeout = setTimeout(() => {
          setVisible(false);
          onDone();
        }, 180);
      }
    };

    frame = requestAnimationFrame(tick);

    const failsafe = setTimeout(() => {
      setProgress(100);
      setVisible(false);
      onDone();
    }, 2200);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(failsafe);
      if (timeout) clearTimeout(timeout);
    };
  }, [mounted, mobile, onDone, reduced]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[11000] flex flex-col items-center justify-center bg-bg"
          exit={{ opacity: 0, transition: { duration: 0.35 } }}
        >
          <p className="display mb-8 text-5xl text-fg sm:text-7xl md:text-8xl">
            {site.firstName}
            <span className="text-accent">.</span>
          </p>
          <div className="h-[2px] w-48 overflow-hidden bg-border sm:w-64">
            <div
              className="h-full bg-accent"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-4 font-mono text-xs tabular-nums text-fg-muted">
            {String(progress).padStart(3, "0")}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
