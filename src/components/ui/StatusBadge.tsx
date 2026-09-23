"use client";

import { profile } from "@/data";

/** Small DevOps-flavored live status chip — not a full terminal theme. */
export function StatusBadge({ className = "" }: { className?: string }) {
  return (
    <div
      className={`inline-flex max-w-full items-center gap-1.5 rounded-xl border border-accent-400/40 bg-white/80 px-2.5 py-1.5 font-mono text-[11px] text-ink-700 shadow-sm backdrop-blur sm:gap-2 sm:px-3 sm:text-xs dark:border-accent-500/30 dark:bg-ink-900/70 dark:text-ink-200 ${className}`}
      role="status"
      aria-label={`System status: ${profile.status.detail}`}
    >
      <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-60" />
        <span className="relative inline-flex h-2 w-2 animate-pulse-dot rounded-full bg-accent-500" />
      </span>
      <span className="shrink-0 text-accent-700 dark:text-accent-400">{profile.status.label}</span>
      <span className="shrink-0 text-ink-400">·</span>
      <span className="truncate">{profile.status.detail}</span>
      <span className="hidden shrink-0 text-ink-400 md:inline">·</span>
      <span className="hidden shrink-0 text-brand-700 md:inline dark:text-brand-300">
        uptime {profile.status.uptime}
      </span>
    </div>
  );
}
