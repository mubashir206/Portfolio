"use client";

import { type ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ScrollProgress />
      <CustomCursor />
      {children}
    </ThemeProvider>
  );
}
