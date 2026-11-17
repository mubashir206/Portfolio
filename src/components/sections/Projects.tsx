"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site, type Project, type ProjectCategory } from "@/data/site";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { useIsDesktopPointer, usePrefersReducedMotion } from "@/lib/hooks";

const categories: ProjectCategory[] = [
  "All",
  "Travel / SaaS",
  "Realtime",
  "Claims",
  "ERP",
  "HRM",
  "Marketing",
  "Admin / Dashboard",
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isDesktop = useIsDesktopPointer();
  const reduced = usePrefersReducedMotion();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!isDesktop || reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (py - 0.5) * -10, y: (px - 0.5) * 12 });
  };

  return (
    <motion.article
      layout
      className="group relative flex flex-col overflow-hidden border border-border bg-bg-elevated"
      style={
        isDesktop && !reduced
          ? {
              transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: "transform 0.15s ease-out",
            }
          : undefined
      }
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      data-cursor="hover"
    >
      <div
        className="relative aspect-[16/10] overflow-hidden"
        style={{
          background: `linear-gradient(145deg, ${project.accent}33 0%, transparent 55%), linear-gradient(var(--bg-elevated), var(--bg))`,
        }}
      >
        <div
          className="absolute inset-0 scale-100 transition-transform duration-700 group-hover:scale-110"
          style={{
            backgroundImage: `
              radial-gradient(circle at 30% 40%, ${project.accent}55, transparent 45%),
              radial-gradient(circle at 70% 70%, ${project.accent}22, transparent 40%)
            `,
          }}
        />
        <div className="absolute inset-0 flex items-end justify-between p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="font-mono text-xs text-fg">{project.year}</span>
        
        </div>
        <span className="absolute left-5 top-5 display text-6xl text-fg/10 transition-colors group-hover:text-fg/20">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="display text-2xl md:text-3xl">{project.title}</h3>
          <span className="shrink-0 text-[10px] uppercase tracking-wider text-fg-muted">
            {project.category}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-fg-muted">{project.description}</p>
        <ul className="mt-auto flex flex-wrap gap-2 pt-2">
          {project.tech.map((t) => (
            <li
              key={t}
              className="border border-border px-2 py-0.5 text-[11px] text-fg-muted"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<ProjectCategory>("All");
  const filtered =
    filter === "All"
      ? site.projects
      : site.projects.filter((p) => p.category === filter);

  return (
    <section id="work" className="section-pad py-24 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p className="mb-4 text-xs uppercase tracking-[0.28em] text-fg-muted">
            03 — Selected work
          </p>
          <h2 className="display mb-10 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            Projects that
            <br />
            earn the scroll.
          </h2>
        </Reveal>

        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((cat) => {
            const count =
              cat === "All"
                ? site.projects.length
                : site.projects.filter((p) => p.category === cat).length;
            if (cat !== "All" && count === 0) return null;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={cn(
                  "rounded-full border px-4 py-2 text-xs transition-colors sm:text-sm",
                  filter === cat
                    ? "border-accent bg-accent text-bg"
                    : "border-border text-fg-muted hover:border-fg hover:text-fg",
                )}
                data-cursor="hover"
              >
                {cat}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="popLayout">
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, i) => (
              <StaggerItem key={project.id}>
                <ProjectCard project={project} index={i} />
              </StaggerItem>
            ))}
          </Stagger>
        </AnimatePresence>
      </div>
    </section>
  );
}
