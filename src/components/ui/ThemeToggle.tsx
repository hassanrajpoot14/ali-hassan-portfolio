"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-ink-200/80 bg-white/70 text-ink-500 dark:border-ink-700 dark:bg-ink-900/70"
        aria-label="Toggle color theme"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-ink-200/80 bg-white/70 text-ink-700 transition hover:border-brand-400 hover:text-brand-700 dark:border-ink-700 dark:bg-ink-900/70 dark:text-ink-200 dark:hover:border-brand-400 dark:hover:text-brand-300"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun className="h-4.5 w-4.5" size={18} /> : <Moon size={18} />}
    </button>
  );
}
