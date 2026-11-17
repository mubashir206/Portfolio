"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useFancyMotion } from "@/lib/hooks";

function FancyScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[10001] h-[3px] origin-left bg-accent"
      style={{ scaleX }}
      aria-hidden
    />
  );
}

export function ScrollProgress() {
  const fancy = useFancyMotion();

  if (!fancy) {
    return (
      <div
        className="fixed top-0 left-0 right-0 z-[10001] h-[2px] bg-accent/40"
        aria-hidden
      />
    );
  }

  return <FancyScrollProgress />;
}
