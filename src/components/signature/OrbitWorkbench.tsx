"use client";

/**
 * Signature interactive: the Orbit Workbench.
 * Drag project nodes around a gravity well — a memorable “desk” for the portfolio.
 */

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  type PanInfo,
} from "framer-motion";
import { site, type Project } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { useIsMobile, usePrefersReducedMotion } from "@/lib/hooks";

type NodeState = { id: string; x: number; y: number };

const ORBIT_PROJECTS = site.projects.slice(0, 6);

function initialLayout(count: number, w: number, h: number) {
  const cx = w / 2;
  const cy = h / 2;
  const r = Math.min(w, h) * 0.32;
  return Array.from({ length: count }, (_, i) => {
    const a = (i / count) * Math.PI * 2 - Math.PI / 2;
    return { x: cx + Math.cos(a) * r - 56, y: cy + Math.sin(a) * r - 56 };
  });
}

function OrbitNode({
  project,
  x,
  y,
  onDragEnd,
  onSelect,
  active,
  reduced,
}: {
  project: Project;
  x: number;
  y: number;
  onDragEnd: (id: string, next: { x: number; y: number }) => void;
  onSelect: (p: Project) => void;
  active: boolean;
  reduced: boolean;
}) {
  const mx = useMotionValue(x);
  const my = useMotionValue(y);
  const dragged = useRef(false);

  useEffect(() => {
    mx.set(x);
    my.set(y);
  }, [x, y, mx, my]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const moved =
      Math.abs(info.offset.x) > 4 || Math.abs(info.offset.y) > 4;
    dragged.current = moved;
    onDragEnd(project.id, {
      x: x + info.offset.x,
      y: y + info.offset.y,
    });
  };

  return (
    <motion.button
      type="button"
      drag={!reduced}
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      onClick={() => {
        if (dragged.current) {
          dragged.current = false;
          return;
        }
        onSelect(project);
      }}
      className="absolute left-0 top-0 z-10 flex h-28 w-28 touch-none flex-col items-center justify-center rounded-full border border-border bg-bg-elevated/90 p-3 text-center backdrop-blur-md transition-colors hover:border-accent md:h-32 md:w-32"
      style={{
        x: mx,
        y: my,
        boxShadow: active
          ? `0 0 0 2px ${project.accent}, 0 0 48px var(--glow)`
          : "0 0 40px var(--glow)",
      }}
      whileHover={reduced ? undefined : { scale: 1.06 }}
      whileTap={reduced ? undefined : { scale: 0.96 }}
      data-cursor="hover"
      aria-label={`Open ${project.title}`}
    >
      <span
        className="mb-1 h-2 w-2 rounded-full"
        style={{ background: project.accent }}
      />
      <span className="display text-sm leading-tight md:text-base">
        {project.title}
      </span>
      <span className="mt-1 text-[9px] uppercase tracking-wider text-fg-muted">
        drag me
      </span>
    </motion.button>
  );
}

export function OrbitWorkbench() {
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();
  const stageRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 800, h: 520 });
  const [selected, setSelected] = useState<Project | null>(null);
  const [nodes, setNodes] = useState<NodeState[]>([]);

  useEffect(() => {
    if (mobile) return;
    const el = stageRef.current;
    if (!el) return;

    const apply = () => {
      const w = el.getBoundingClientRect().width;
      const h = Math.max(380, Math.min(520, w * 0.5));
      setSize({ w, h });
      setNodes(
        ORBIT_PROJECTS.map((p, i) => ({
          id: p.id,
          ...initialLayout(ORBIT_PROJECTS.length, w, h)[i],
        })),
      );
    };

    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, [mobile]);

  const onDragEnd = (id: string, next: { x: number; y: number }) => {
    setNodes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...next } : n)),
    );
  };

  const scatter = () => {
    setNodes((prev) =>
      prev.map((n) => ({
        ...n,
        x: 40 + Math.random() * Math.max(80, size.w - 160),
        y: 40 + Math.random() * Math.max(80, size.h - 160),
      })),
    );
  };

  const reset = () => {
    setNodes(
      ORBIT_PROJECTS.map((p, i) => ({
        id: p.id,
        ...initialLayout(ORBIT_PROJECTS.length, size.w, size.h)[i],
      })),
    );
  };

  return (
    <section id="orbit" className="section-pad py-24 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p className="mb-4 text-xs uppercase tracking-[0.28em] text-fg-muted">
            04 — Signature · Orbit Workbench
          </p>
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="display max-w-[14ch] text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              Drag the archive.
              <br />
              <span className="text-accent">Make it yours.</span>
            </h2>
            {!mobile && (
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={scatter}
                  className="rounded-full border border-border px-5 py-2.5 text-sm transition-colors hover:border-accent hover:text-accent"
                  data-cursor="hover"
                >
                  Scatter
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="rounded-full bg-fg px-5 py-2.5 text-sm text-bg transition-colors hover:bg-accent"
                  data-cursor="hover"
                >
                  Re-orbit
                </button>
              </div>
            )}
          </div>
        </Reveal>

        {/* Mobile: simple tap grid (no drag / resize cost) */}
        {mobile ? (
          <div className="grid grid-cols-2 gap-3">
            {ORBIT_PROJECTS.map((project) => (
              <button
                key={project.id}
                type="button"
                onClick={() => setSelected(project)}
                className="flex flex-col items-start gap-2 border border-border bg-bg-elevated p-4 text-left"
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: project.accent }}
                />
                <span className="display text-lg">{project.title}</span>
                <span className="text-[10px] uppercase tracking-wider text-fg-muted">
                  {project.category}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div
            ref={stageRef}
            className="relative overflow-hidden border border-border bg-bg-elevated"
            style={{ height: size.h }}
          >
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[55%] w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-border"
              aria-hidden
            />
            <p className="pointer-events-none absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-widest text-fg-muted">
              Interactive · Drag · Tap to inspect
            </p>

            {nodes.map((node) => {
              const project = ORBIT_PROJECTS.find((p) => p.id === node.id)!;
              return (
                <OrbitNode
                  key={node.id}
                  project={project}
                  x={node.x}
                  y={node.y}
                  onDragEnd={onDragEnd}
                  onSelect={setSelected}
                  active={selected?.id === project.id}
                  reduced={reduced}
                />
              );
            })}
          </div>
        )}

        <AnimatePresence mode="wait">
          {selected && (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="mt-6 flex flex-col gap-4 border border-border bg-bg p-6 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="text-xs uppercase tracking-wider text-fg-muted">
                  {selected.category} · {selected.year}
                </p>
                <h3 className="display mt-1 text-3xl">{selected.title}</h3>
                <p className="mt-2 max-w-xl text-sm text-fg-muted">
                  {selected.description}
                </p>
              </div>
              <div className="flex gap-3">
                <a
                  href={selected.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-accent px-5 py-2.5 text-sm text-bg"
                  data-cursor="hover"
                >
                  Live site
                </a>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="rounded-full border border-border px-5 py-2.5 text-sm"
                  data-cursor="hover"
                >
                  Close
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
