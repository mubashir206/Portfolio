"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/cn";
import { useFancyMotion } from "@/lib/hooks";

type Props = {
  children: ReactNode;
  className?: string;
  strength?: number;
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  target?: string;
  rel?: string;
};

export function MagneticButton({
  children,
  className,
  strength = 0.28,
  href,
  type = "button",
  disabled,
  onClick,
  target,
  rel,
}: Props) {
  const fancy = useFancyMotion();
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 24 });
  const springY = useSpring(y, { stiffness: 260, damping: 24 });

  const sharedClass = cn(
    "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-colors",
    className,
  );

  // Plain elements on mobile — zero spring / rAF cost
  if (!fancy) {
    if (href) {
      return (
        <a
          href={href}
          className={sharedClass}
          target={target}
          rel={rel}
          data-cursor="hover"
        >
          {children}
        </a>
      );
    }
    return (
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={sharedClass}
        data-cursor="hover"
      >
        {children}
      </button>
    );
  }

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={sharedClass}
        target={target}
        rel={rel}
        style={{ x: springX, y: springY }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        data-cursor="hover"
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={sharedClass}
      style={{ x: springX, y: springY }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor="hover"
    >
      {children}
    </motion.button>
  );
}
