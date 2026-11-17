"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

export function useIsDesktopPointer() {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}

/** True on phones / small tablets — used to cut heavy motion. */
export function useIsMobile() {
  return useMediaQuery("(max-width: 767px)");
}

/**
 * Fancy motion only on desktop + when user allows motion.
 * Phones get a lighter experience for battery & smoothness.
 */
export function useFancyMotion() {
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();
  const desktop = useIsDesktopPointer();
  return !reduced && !mobile && desktop;
}
