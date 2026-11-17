"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/data/site";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/cn";

const links = [
  { href: "#about", label: "About", index: "01" },
  { href: "#skills", label: "Skills", index: "02" },
  { href: "#work", label: "Work", index: "03" },
  { href: "#orbit", label: "Orbit", index: "04" },
  { href: "#experience", label: "Path", index: "05" },
  { href: "#contact", label: "Contact", index: "06" },
];

const initials =
  `${site.firstName.charAt(0)}${site.name.split(" ")[1]?.charAt(0) ?? ""}`.toUpperCase();

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="pointer-events-none fixed top-0 left-0 right-0 z-50">
        <div
          className={cn(
            "section-pad pointer-events-none mx-auto flex max-w-[1400px] items-start justify-between gap-3 pt-4 transition-all duration-500 md:pt-5",
            scrolled && "pt-3 md:pt-3",
          )}
        >
          {/* ── Brand mark ── */}
          <motion.a
            href="#top"
            className={cn(
              "pointer-events-auto group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-border bg-bg/70 p-1.5 pr-4 shadow-[0_8px_40px_rgba(0,0,0,0.06)] backdrop-blur-2xl transition-all duration-500 dark:shadow-[0_8px_40px_rgba(0,0,0,0.35)]",
              scrolled && "pr-3",
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            data-cursor="hover"
          >
            <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-fg text-bg">
              <span className="display text-sm tracking-tight">{initials}</span>
              <span className="absolute inset-0 translate-y-full bg-accent transition-transform duration-300 group-hover:translate-y-0" />
              <span className="display absolute text-sm tracking-tight text-bg opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {initials}
              </span>
            </span>
            <span
              className={cn(
                "flex flex-col transition-all duration-300",
                scrolled && "max-w-0 overflow-hidden opacity-0 pr-0",
              )}
            >
              <span className="display text-[15px] leading-none tracking-tight">
                {site.firstName}
                <span className="text-accent">.</span>
              </span>
              <span className="mt-1 text-[10px] uppercase tracking-[0.18em] text-fg-muted">
                Portfolio
              </span>
            </span>
          </motion.a>

          {/* ── Floating signal dock (desktop) ── */}
          <nav
            className={cn(
              "pointer-events-auto absolute left-1/2 top-4 hidden -translate-x-1/2 items-center lg:flex",
              scrolled && "top-3",
            )}
            onMouseLeave={() => setHovered(null)}
          >
            <div
              className={cn(
                "relative flex items-center gap-0.5 rounded-full border border-border bg-bg/75 p-1.5 shadow-[0_12px_48px_rgba(0,0,0,0.08)] backdrop-blur-2xl transition-all duration-500 dark:shadow-[0_12px_48px_rgba(0,0,0,0.45)]",
                scrolled && "scale-[0.96] bg-bg/85",
              )}
            >
              {/* Ambient accent glow behind dock */}
              <span
                className="pointer-events-none absolute -inset-px rounded-full opacity-60"
                style={{
                  background:
                    "linear-gradient(120deg, transparent, color-mix(in oklab, var(--accent) 35%, transparent), transparent)",
                }}
                aria-hidden
              />

              {links.map((l) => {
                const isHot = hovered === l.href;
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    onMouseEnter={() => setHovered(l.href)}
                    className="relative z-10 px-3.5 py-2.5 text-[13px] font-medium tracking-wide text-fg-muted transition-colors hover:text-fg xl:px-4"
                    data-cursor="hover"
                  >
                    {isHot && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-fg"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 32,
                        }}
                      />
                    )}
                    <span
                      className={cn(
                        "relative z-10 flex items-center gap-1.5 transition-colors",
                        isHot && "text-bg",
                      )}
                    >
                      <span
                        className={cn(
                          "font-mono text-[9px] opacity-0 transition-opacity",
                          isHot && "opacity-70",
                        )}
                      >
                        {l.index}
                      </span>
                      {l.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </nav>

          {/* ── Right cluster ── */}
          <div className="pointer-events-auto ml-auto flex items-center gap-2 md:gap-3">
            {/* Live availability */}
            <a
              href="#contact"
              className={cn(
                "group hidden items-center gap-2.5 rounded-full border border-border bg-bg/70 py-2 pl-3 pr-4 shadow-[0_8px_32px_rgba(0,0,0,0.06)] backdrop-blur-2xl transition-all duration-300 hover:border-accent md:flex dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)]",
                scrolled && "py-1.5",
              )}
              data-cursor="hover"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute hidden h-full w-full animate-ping rounded-full bg-accent opacity-60 md:inline-flex" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-fg-muted group-hover:text-fg">
                Available
              </span>
            </a>

            {/* Day / night morph switch */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              className="relative flex h-11 w-[4.25rem] items-center rounded-full border border-border bg-bg/70 p-1 shadow-[0_8px_32px_rgba(0,0,0,0.06)] backdrop-blur-2xl dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
              data-cursor="hover"
            >
              <motion.span
                className="absolute flex h-9 w-9 items-center justify-center rounded-full bg-fg text-bg"
                animate={{ x: theme === "dark" ? 26 : 0 }}
                transition={{ type: "spring", stiffness: 420, damping: 28 }}
              >
                {theme === "dark" ? <SunIcon /> : <MoonIcon />}
              </motion.span>
              <span className="sr-only">Toggle theme</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              type="button"
              className="relative z-[60] flex h-11 items-center gap-2 rounded-full border border-border bg-fg px-4 text-bg lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              data-cursor="hover"
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">
                {open ? "Close" : "Menu"}
              </span>
              <span className="relative flex h-3 w-4 flex-col justify-between">
                <span
                  className={cn(
                    "block h-[1.5px] w-full bg-bg transition-transform duration-300",
                    open && "translate-y-[5px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "block h-[1.5px] w-full bg-bg transition-opacity duration-300",
                    open && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "block h-[1.5px] w-full bg-bg transition-transform duration-300",
                    open && "-translate-y-[5px] -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-bg lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background:
                  "radial-gradient(ellipse at 80% 10%, color-mix(in oklab, var(--accent) 40%, transparent), transparent 50%), radial-gradient(ellipse at 10% 90%, color-mix(in oklab, var(--ember) 30%, transparent), transparent 45%)",
              }}
              aria-hidden
            />

            <div className="section-pad relative flex flex-1 flex-col justify-between pb-10 pt-28">
              <ul className="flex flex-col gap-1">
                {links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.08 + i * 0.05,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline gap-4 border-b border-border py-4"
                      data-cursor="hover"
                    >
                      <span className="font-mono text-xs text-accent">
                        {l.index}
                      </span>
                      <span className="display text-5xl transition-colors group-hover:text-accent sm:text-6xl">
                        {l.label}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                className="flex flex-col gap-4 border-t border-border pt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
              >
                <p className="text-sm text-fg-muted">{site.email}</p>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                  </span>
                  <span className="text-xs uppercase tracking-[0.16em] text-fg-muted">
                    Open for collaborations
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function SunIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M21 14.5A8.5 8.5 0 1 1 9.5 3 7 7 0 0 0 21 14.5z" />
    </svg>
  );
}
