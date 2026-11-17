"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { Loader } from "@/components/sections/Loader";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";

/* Below-fold sections load after first paint — smaller initial JS */
const About = dynamic(
  () => import("@/components/sections/About").then((m) => m.About),
  { ssr: true },
);
const Skills = dynamic(
  () => import("@/components/sections/Skills").then((m) => m.Skills),
  { ssr: true },
);
const Projects = dynamic(
  () => import("@/components/sections/Projects").then((m) => m.Projects),
  { ssr: true },
);
const OrbitWorkbench = dynamic(
  () =>
    import("@/components/signature/OrbitWorkbench").then(
      (m) => m.OrbitWorkbench,
    ),
  { ssr: true },
);
const Experience = dynamic(
  () =>
    import("@/components/sections/Experience").then((m) => m.Experience),
  { ssr: true },
);
const Testimonials = dynamic(
  () =>
    import("@/components/sections/Testimonials").then((m) => m.Testimonials),
  { ssr: true },
);
const Contact = dynamic(
  () => import("@/components/sections/Contact").then((m) => m.Contact),
  { ssr: true },
);

export function Portfolio() {
  const [ready, setReady] = useState(false);
  const onLoaderDone = useCallback(() => setReady(true), []);

  return (
    <>
      <Loader onDone={onLoaderDone} />
      <div
        className={`noise min-h-screen transition-opacity duration-500 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      >
        <Navbar />
        <main>
          <Hero />
          <div className="cv-auto">
            <About />
          </div>
          <div className="cv-auto">
            <Skills />
          </div>
          <div className="cv-auto">
            <Projects />
          </div>
          <div className="cv-auto">
            <OrbitWorkbench />
          </div>
          <div className="cv-auto">
            <Experience />
          </div>
          <div className="cv-auto">
            <Testimonials />
          </div>
          <div className="cv-auto">
            <Contact />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
