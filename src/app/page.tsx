import { Suspense } from "react";
import { Portfolio } from "@/components/Portfolio";

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-bg text-fg">
          <p className="display text-4xl">
            Mubashir<span className="text-accent">.</span>
          </p>
        </div>
      }
    >
      <Portfolio />
    </Suspense>
  );
}
