"use client";

import { useEffect, useRef, useState } from "react";
import { useIsDesktopPointer, usePrefersReducedMotion } from "@/lib/hooks";

export function CustomCursor() {
  const isDesktop = useIsDesktopPointer();
  const reduced = usePrefersReducedMotion();
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const follower = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    if (!isDesktop || reduced) {
      document.documentElement.classList.remove("has-custom-cursor");
      return;
    }

    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest(
        "a, button, input, textarea, select, [data-cursor='hover']",
      );
      setHovered(Boolean(interactive));
    };

    const tick = () => {
      follower.current.x += (pos.current.x - follower.current.x) * 0.15;
      follower.current.y += (pos.current.y - follower.current.y) * 0.15;
      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${follower.current.x}px, ${follower.current.y}px) translate(-50%, -50%)`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    raf.current = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf.current);
    };
  }, [isDesktop, reduced]);

  if (!isDesktop || reduced) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor ${hovered ? "hovered" : ""}`}
        aria-hidden
      />
      <div
        ref={followerRef}
        className={`custom-cursor-follower ${hovered ? "hovered" : ""}`}
        aria-hidden
      />
    </>
  );
}
